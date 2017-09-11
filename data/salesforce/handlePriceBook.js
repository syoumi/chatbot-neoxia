const {doLogin} = require('./login');


//Get Price Book Entry by Product's ID
var getPriceBookEntry = (productID, callback) => {
  doLogin((conn) => {
    var pricebookEntry = undefined;
    var query = "SELECT Id, Pricebook2Id, Product2Id, UnitPrice FROM PricebookEntry WHERE Product2Id='" + productID + "' LIMIT 1";
    conn.query(query, (err, res) => {
      if (err) { return console.error(err); }
      if(res.records.length > 0){
       pricebookEntry = res.records[0];
      }
      callback(pricebookEntry);
    });
  });
}

module.exports = {
  getPriceBookEntry
}
