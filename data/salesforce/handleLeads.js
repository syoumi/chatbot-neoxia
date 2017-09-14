
const {doLogin} = require('./login');

const {getUserInfos} = require("./../../utils/getUserInfos");

const {getContact} = require("./handleContacts");



//Extract lead
var getLead = (senderID, callback) => {
  doLogin((conn) => {
      var lead = undefined;
      var query = "SELECT Name, company, MobilePhone, LeadSource, FacebookId__c, Email, Language__c FROM Lead WHERE FacebookId__c='" + senderID + "' LIMIT 1";
      conn.query(query, (err, res) => {
        if (err) { return console.error(err); }
        if(res.records.length > 0){
          lead = res.records[0];
        }
        callback(lead);
      });

    });

}


//Insert lead
var addLead = (senderID) => {

  //Verify if lead  doesn't exist and wasn't converted
  getLead(senderID, (lead) => {
    if(!lead){
      //Extract user's informations from Facebook
      getUserInfos(senderID, (fname, lname, ppicture, locale, timezone, gender) => {
          var salutation= 'Mr.';
          if(gender=='female') salutation= 'Mrs.';
            var status = "Working - Contacted";
            var leadSource = "Facebook";
            var company  = "UNKOWN";

            doLogin((conn) => {
              conn.sobject("Lead").create({Salutation : salutation, FacebookId__c: senderID, LeadSource: leadSource, Status: status, FirstName: fname, LastName: lname, company: company}, function(err, res) {
                if (err) { return console.error(err); }
              });
            });

      });
    }
  });

}


//update lead
var updateLead = (senderID, fname, lname, company, city, country, email, phone, callback) => {
    //TODO Search if there's a contact with the same email: IF so update contact's facebookId__c and delete lead,  Else update lead
    doLogin((conn) => {
      var query = "SELECT Id, firstName, lastName, facebookId__c, company,  city, country, email, Phone, ToConvert__c FROM lead WHERE FacebookID__c= '" + senderID + "'";
      conn.query(query)
          .update({ firstName : fname, lastName : lname, company : company, city : city, country: country, email : email, Phone : phone }, 'Lead', function(err, rets) {
            if (err) { return console.error(err); }
            console.log('LEAD UPDATED');
            callback(rets);
          });
    });
}

//Update lead's language
var updateLeadLanguage = (senderID, language) => {
    doLogin((conn) => {
      var query = "SELECT Id, Language__c FROM lead WHERE FacebookID__c= '" + senderID + "'  AND ToConvert__c = false";
      conn.query(query)
          .update({ Language__c: language }, 'Lead', function(err, rets) {
            if (err) { return console.error(err); }
          });
    });
}

//Convert lead to Contact, account and opportunity
var convertLead = (senderID, callback) => {
  console.log('TRYING TO CONVERT LEAD');
  doLogin((conn) => {
    var query = "SELECT Id, ToConvert__c FROM lead WHERE FacebookID__c= '" + senderID + "' AND ToConvert__c = false";
    conn.query(query)
        .update({ ToConvert__c : true }, 'Lead', function(err, rets) {
          if (err) { return console.error(err); }
          callback();
        });
  });
}



module.exports = {
  getLead, addLead, updateLead, convertLead, updateLeadLanguage
}
