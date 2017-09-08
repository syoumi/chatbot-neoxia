const {doLogin} = require('./login');


var getContact = (senderID, callback) => {

  doLogin((conn) => {
    var contact = undefined;
    var query = "SELECT Id, Name, AccountId, MobilePhone, LeadSource, FacebookId__c, email FROM Contact WHERE FacebookId__c='" + senderID + "' LIMIT 1";
    conn.query(query, (err, res) => {
      if (err) { return console.error(err); }
      if(res.records.length > 0){
        contact = res.records[0];
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
