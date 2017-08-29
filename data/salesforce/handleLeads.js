
const {doLogin} = require('./login');

const {getUserInfos} = require("./../../utils/getUserInfos");
const {isContact} = require("./handleContacts");
const {addContact} = require("./handleContacts");
const {upsertAccount} = require("./handleAccounts");
const {addOpportunity} = require("./handleOpportunities");

var isLead = (senderID, email) => {
  var res = false;

  if(isContact(senderID, email)){
    res = true;
  }
  return res;
}

var addLead = (senderID, lastName, firstName, email, phone) => {
  doLogin((conn) => {
    //Verify if lead was not Converted
    if(!isContact(senderID, email)){

      getUserInfos(senderID, (fname, lname, ppicture, locale, timezone, gender) => {
    				var salutation= 'Mr.';
    				if(gender=='female') salutation= 'Mrs.';
            if(lname!=lastName) lname = lastName;
            if(fname!=firstName) fname = firstName;
            var description = "From Facebook - Chatbot";
            var status = "Working - Contacted ";
            var company  = "UNKOWN";
            //email; mobile
            var query = "INSERT INTO Lead (firstname, photourl, description, lastname, status, company, salutation, facebookId__c)" +
                         "VALUES ('" + fname + "', '" + ppicture + "', '" +  description + "', '" +  company + "', '" + salutation  + "', " +  senderID + ")";
            conn.query(query, (err) => {
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
  isLead, addLead, updateLead, convertLead
}
