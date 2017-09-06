const {doLogin} = require('./login');


var getContact = (senderID, email, callback) => {
  var contact = undefined;
  doLogin((conn) => {
    var query = "SELECT Name, AccountId, MobilePhone, LeadSource, FacebookId__c, email FROM Contact";
    conn.query(query, (err, res) => {
      if (err) { return console.error(err); }

        for (var i=0; i<res.records.length; i++) {
          var record = res.records[i];
          if( (senderID == record.FacebookId__c) || (email && email == record.email) ){
            contact = record;
          }
        }
        callback(contact);
    });
  });

}

var addContact = (senderID) => {

}


var updateContact = (senderID) => {

}

module.exports = {
getContact, addContact, updateContact
}
