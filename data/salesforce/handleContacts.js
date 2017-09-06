const {doLogin} = require('./login');


var isContact = (senderID, email) => {
  var res = false;
  doLogin((conn) => {
    var query = "SELECT FacebookId__c, email FROM Contact";
    conn.query(query, (err, res) => {
      if (err) { return console.error(err); }

        for (var i=0; i<res.records.length; i++) {
          var record = res.records[i];
          if( (senderID == record.FacebookId__c) || (email && email == record.email) ){
            res = true;
          }
        }
    });
  });
  return res;
}

var getContact = (senderID, email) => {
  var contact = undefined;
  doLogin((conn) => {
    var query = "SELECT Name, AccountId, Description, Languages, MobilePhone, DoNotCall, LeadSource, FacebookId__c, email FROM Contact";
    conn.query(query, (err, res) => {
      if (err) { return console.error(err); }

        for (var i=0; i<res.records.length; i++) {
          var record = res.records[i];
          if( (senderID == record.FacebookId__c) || (email && email == record.email) ){
            contact = record;
          }
        }
    });
  });
  return contact;
}

var addContact = (senderID) => {

}


var updateContact = (senderID) => {

}

module.exports = {
  isContact, getContact, addContact, updateContact
}
