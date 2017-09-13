const {doLogin} = require('./login');


var getContact = (senderID, callback) => {

  doLogin((conn) => {
    var contact = undefined;
    var query = "SELECT Id, Salutation, Name, AccountId, MobilePhone, LeadSource, FacebookId__c, email FROM Contact WHERE FacebookId__c='" + senderID + "' LIMIT 1";
    conn.query(query, (err, res) => {
      if (err) { return console.error(err); }
      if(res.records.length > 0){
        contact = res.records[0];
      }
      callback(contact);
    });
  });

}


//Update Contact
var updateContact = (senderID, fname, lname, company, city, country, email, phone) => {
  //TODO if there's quote ---> update Quote's Email
  doLogin((conn) => {
    var query = "SELECT Id, firstName, lastName, facebookId__c, company,  city, country, email, Phone FROM Contact WHERE FacebookID__c= '" + senderID + "'";
    conn.query(query)
        .update({ firstName : fname, lastName : lname, company : company, city : city, country: country, email : email, Phone : phone }, 'Contact', function(err, rets) {
          if (err) { return console.error(err); }
        });
  });

}

module.exports = {
  getContact, updateContact
}
