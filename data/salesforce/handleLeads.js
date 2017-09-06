
const {doLogin} = require('./login');

const {getUserInfos} = require("./../../utils/getUserInfos");
const {isContact} = require("./handleContacts");
const {addContact} = require("./handleContacts");
const {upsertAccount} = require("./handleAccounts");
const {addOpportunity} = require("./handleOpportunities");


var isLead = (senderID) => {
  console.log("is Lead?");
  getLead(senderID, (lead) => {
    console.log("LEAD RETURNED: ", lead);
    if(lead){
      return true;
    }
    else{
      return false;
    }
  });
}


var getLead = (senderID, callback) => {
  console.log("GET LEAD");
   var lead = undefined;
    doLogin((conn) => {
      var query = "SELECT Name, company, MobilePhone, LeadSource, FacebookId__c, Email FROM Lead";
      conn.query(query, (err, res) => {
        if (err) { return console.error(err); }

          for (var i=0; i<res.records.length; i++) {
            var record = res.records[i];

            if(senderID == record.FacebookId__c){
              console.log('FOUUUUUND!!');
               lead = record;
            }
          }
        console.log("LEAD FOUND: ", lead);
        callback(lead);
      });
    });

}

var addLead = (senderID) => {
  console.log("ADD LEAD");
  doLogin((conn) => {
    //Verify if lead was not Converted or doesn't exist
    if( (!isLead(senderID) && (!isContact(senderID, undefined)) ){
      console.log("NEW LEAD TO ADD");
      getUserInfos(senderID, (fname, lname, ppicture, locale, timezone, gender) => {
    				var salutation= 'Mr.';
    				if(gender=='female') salutation= 'Mrs.';
            var status = "Working - Contacted";
            var leadSource = "Facebook";
            var company  = "UNKOWN";
            conn.sobject("Lead").create({FacebookId__c: senderID, LeadSource: leadSource, Status: status, FirstName: fname, LastName: lname, company: company}, function(err, res) {
              if (err) { return console.error(err); }
            });
    	});
    }

  });

}

var updateLead = (senderID) => {

}

var convertLead = (senderID) => {

}


module.exports = {
  isLead, getLead, addLead, updateLead, convertLead
}
