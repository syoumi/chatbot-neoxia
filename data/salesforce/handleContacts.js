const {doLogin} = require('./login');


var getContact = (senderID, callback) => {
  var contact = undefined;
  doLogin((conn) => {
    var query = "SELECT Id, Name, AccountId, MobilePhone, LeadSource, FacebookId__c, email FROM Contact";
    conn.query(query, (err, res) => {
      if (err) { return console.error(err); }

        for (var i=0; i<res.records.length; i++) {
          var record = res.records[i];
          console.log('RECORD: ', record);
          if(senderID == record.FacebookId__c){
            contact = record;
          }
        }
        callback(contact);
    });
  });

}



var updateContact = (senderID) => {

}

module.exports = {
  getContact, updateContact
}
