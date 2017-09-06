
const {doLogin} = require('./login');

const {getUserInfos} = require("./../../utils/getUserInfos");
const {isContact} = require("./handleContacts");
const {addContact} = require("./handleContacts");
const {upsertAccount} = require("./handleAccounts");
const {addOpportunity} = require("./handleOpportunities");


var isLead = (senderID) => {
  var res = false;
  getLead(senderID, (lead) => {
    console.log("LEAD RETURNED: ", lead);
    if(lead){
      res = true;
    }
  });
  console.log('IS LEAD? ', res);
  return res;
}


var getLead = (senderID, callback) => {
  doLogin((conn) => {
      var lead = undefined;
      var query = "SELECT Name, company, MobilePhone, LeadSource, FacebookId__c, Email FROM Lead";
      conn.query(query, (err, res) => {
        if (err) { return console.error(err); }

          for (var i=0; i<res.records.length; i++) {
            var record = res.records[i];
              console.log('SENDER ID: ' + senderID + '; fbID: ' + record.FacebookId__c);
            if(senderID == record.FacebookId__c){
              lead = record;
            }
          }
        callback(lead);
      });
    });

}

var addLead = (senderID) => {

  console.log("RETURN IS LEAD : ", isLead(senderID) );

  //Verify if lead was not Converted or doesn't exist
  if( (!isLead(senderID)) && (!isContact(senderID, undefined)) ){
    getUserInfos(senderID, (fname, lname, ppicture, locale, timezone, gender) => {
    	var salutation= 'Mr.';
    	if(gender=='female') salutation= 'Mrs.';
      var status = "Working - Contacted";
      var leadSource = "Facebook";
      var company  = "UNKOWN";

      doLogin((conn) => {
        conn.sobject("Lead").create({FacebookId__c: senderID, LeadSource: leadSource, Status: status, FirstName: fname, LastName: lname, company: company}, function(err, res) {
          if (err) { return console.error(err); }
        });
      });

    });
  }
}

var updateLead = (senderID) => {

}

var convertLead = (senderID) => {

}


module.exports = {
  isLead, getLead, addLead, updateLead, convertLead
}
