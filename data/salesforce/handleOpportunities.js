
const {doLogin} = require('./login');



//Look for opportunity by account's Id
var getOpportunity = (accountId, callback) => {
  doLogin((conn) => {
    var opportunity= undefined;
    var query = "SELECT Id, Name, AccountId, Pricebook2Id FROM Opportunity WHERE AccountId = '" + accountId + "' LIMIT 1";
    conn.query(query, (err, res) => {
      if (err) { return console.error(err); }
      if(res.records.length > 0){
        opportunity = res.records[0];
      }
      callback(opportunity);
    });
  });
}

//Update Price Book ID
var updateOpportunity = (accountId, pricebookEntry, callback) => {
  console.log('----->PricebookEntry: ', pricebookEntry);
  doLogin((conn) => {
    var query = "SELECT Id, Name, AccountId, Pricebook2Id FROM Quote WHERE AccountId= '" + accountId + "'";
    conn.query(query)
        .update({ Pricebook2Id: pricebookEntry.Pricebook2Id }, 'Opportunity', function(err, res) {
          if (err) { return console.error(err); }
          console.log('OPP UPDATED: ', res);
          callback();
    });
  });
}


module.exports = {
  getOpportunity, updateOpportunity
}
