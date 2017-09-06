
const {doLogin} = require('./login');

const {getUserInfos} = require("./../../utils/getUserInfos");
const {isContact} = require("./handleContacts");
const {addContact} = require("./handleContacts");
const {upsertAccount} = require("./handleAccounts");
const {addOpportunity} = require("./handleOpportunities");


var isLead = (senderID, email) => {
  if(isContact(senderID, email)){
    return false;
  }
  else if(getLead(senderID, email)){
    return true;
  }
  return false;
}


var getLead = (senderID, email) => {
   var lead = undefined;
    doLogin((conn) => {
      var query = "SELECT Name, company, Description, Languages, MobilePhone, DoNotCall, LeadSource, FacebookId__c, email FROM Lead";
      conn.query(query, (err, res) => {
        if (err) { return console.error(err); }

          for (var i=0; i<res.records.length; i++) {
            var record = res.records[i];
            if( (senderID == record.FacebookId__c) || (email && email == record.email) ){
               lead = record;
            }
          }

      });
    });
    return lead;
}

var addLead = (senderID) => {
  doLogin((conn) => {
    //Verify if lead was not Converted or doesn't exist
    if( (!isLead(senderID, undefined)) && (!isContact(senderID, undefined)) ){
      getUserInfos(senderID, (fname, lname, ppicture, locale, timezone, gender) => {
    				var salutation= 'Mr.';
    				if(gender=='female') salutation= 'Mrs.';
            var status = "Working - Contacted";
            var leadSource = "Facebook";
            var company  = "UNKOWN";
            conn.sobject("Lead").create({FacebookId__c: senderID, LeadSource: leadSource, Status: status, FirstName: fname, LastName: lname, company: company, MobilePhone: phone, Email: email}, function(err, res) {
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
