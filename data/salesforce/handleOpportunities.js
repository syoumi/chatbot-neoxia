
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
var updateOpportunity = (accountId, pricebookID, callback) => {
  doLogin((conn) => {
    var query = "SELECT Id, Name, AccountId, Pricebook2Id FROM Quote WHERE AccountId= '" + accountId + "'";
    conn.query(query)
        .update({ Pricebook2Id: pricebookID }, 'Opportunity', function(err, res) {
          if (err) { return console.error(err); }
          callback();
    });
  });
}


module.exports = {
  getOpportunity, updateOpportunity
}
