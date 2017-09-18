/*
  * @author    MITA Oumaïma, SYOUMI El Mahdi
  * @since       JULY 10, 2017
  * @desc        Handle Contacts
  */
const {doLogin} = require('./login');

/*
  * @desc      Get Contact by his FacebookId
  * @param     senderID : contact's facebookId
  * @return    Contact
  */
var getContact = (senderID, callback) => {
  doLogin((conn) => {
    var contact = undefined;
    var query = "SELECT Id, Salutation, Name, AccountId, MobilePhone, LeadSource, FacebookId__c, email, Language__c FROM Contact WHERE FacebookId__c='" + senderID + "' LIMIT 1";
    conn.query(query, (err, res) => {
      if (err) { return console.error(err); }
      if(res.records.length > 0){
        contact = res.records[0];
      }
      callback(contact);
    });
  });
};

/*
  * @desc      Update contact
  * @param     senderID : contact's facebookId
  * @param     fname : first name
  * @param     lname : last name
  * @param     city : city
  * @param     country : country
  * @param     email : email
  * @param     phone : phone
  * @return    void
  */
var updateContact = (senderID, fname, lname, city, country, email, phone) => {
  //TODO if there's quote ---> update Quote's Email
  doLogin((conn) => {
    var query = "SELECT Id, FirstName, LastName, FacebookId__c, MailingCity, MailingCountry, Email, Phone, Language__c FROM Contact WHERE FacebookID__c= '" + senderID + "'";
    conn.query(query)
        .update({ FirstName : fname, LastName : lname, MailingCity : city, MailingCountry: country, Email : email, Phone : phone }, 'Contact', function(err, rets) {
          if (err) { return console.error(err); }
        });
  });
};

/*
  * @desc      Update contact's language
  * @param     senderID : contact's facebookId
  * @param     language : language
  * @return    void
  */
var updateContactLanguage = (senderID, language) => {
  doLogin((conn) => {
    var query = "SELECT Id, Language__c FROM Contact WHERE FacebookID__c= '" + senderID + "'";
    conn.query(query)
        .update({ Language__c: language }, 'Contact', function(err, rets) {
          if (err) { return console.error(err); }
        });
  });
};


module.exports = {
  getContact, updateContact, updateContactLanguage
};
