
const {doLogin} = require('./login');

const {getUserInfos} = require("./../../utils/getUserInfos");
const {getContact} = require("./handleContacts");
const {addContact} = require("./handleContacts");
const {upsertAccount} = require("./handleAccounts");
const {addOpportunity} = require("./handleOpportunities");


//Extract lead
var getLead = (senderID, callback) => {
  doLogin((conn) => {
      var lead = undefined;
      var query = "SELECT Name, company, MobilePhone, LeadSource, FacebookId__c, Email FROM Lead";
      conn.query(query, (err, res) => {
        if (err) { return console.error(err); }

          for (var i=0; i<res.records.length; i++) {
            var record = res.records[i];

            if(senderID == record.FacebookId__c){
              lead = record;
            }
          }
        callback(lead);
      });
    });

}


//Insert lead
var addLead = (senderID) => {

  //Verify if lead  doesn't exist
  getLead(senderID, (lead) => {
    if(!lead){

      //Verify if lead was not Converted
      getContact(senderID, undefined, (contact) => {
        if(!contact){

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
      });

    }
  });

}


//update lead
var updateLead = (senderID, fname, lname, company, city, country, email, phone, callback) => {

  getLead(senderID, (leadFound) => {
    if(leadFound){
      doLogin((conn) => {
        var query = "SELECT Id, firstName, lastName, facebookId__c, company,  city, country, email, MobilePhone FROM lead WHERE FacebookID__c= '" + senderID + "'";
        conn.query(query)
            .update({ firstName : fname, lastName : lname, company : company, city : city, country: country, email : email, MobilePhone : phone }, 'Lead', function(err, rets) {
              if (err) { return console.error(err); }
              console.log(rets);

            });
        callback(leadFound);
      });
    }
  });

}

//Convert lead to Contact, account and opportunity
var convertLead = (senderID) => {

}



module.exports = {
  getLead, addLead, updateLead, convertLead
}
