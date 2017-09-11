

const {doLogin} = require('./login');


//Create new Price Book Entry for a product
var addPriceBookEntry = (product, name, callback) => {
  getPriceBook(name, (pricebook) => {
    doLogin((conn) => {
      conn.sobject("PricebookEntry").create({Product2Id: product.Id, PriceBook2Id: pricebook.Id, UnitPrice: product.Amount__c, isActive: true}, function(err, res) {
        if (err) { return console.error(err); }
       callback(res.id);
      });
    });
  });

}

//Get Price Book by it's name
var getPriceBook = (name, callback) => {
  doLogin((conn) => {
    var pricebook = undefined;
    var query = "SELECT Id, Name FROM Pricebook2 WHERE Name ='" + name + "' LIMIT 1";
    conn.query(query, (err, res) => {
      if (err) { return console.error(err); }
      if(res.records.length > 0){
       pricebook= res.records[0];
      }
      callback(pricebook);
    });
  });
}

//Get Price Book Entry by it's ID
var getPriceBookEntry = (PriceBookEntryId, callback) => {
  doLogin((conn) => {
    var pricebookEntry = undefined;
    var query = "SELECT Id, Pricebook2Id, Product2Id, UnitPrice FROM PricebookEntry WHERE Id='" + PriceBookEntryId + "' LIMIT 1";
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
  addPriceBookEntry, getPriceBookEntry, getPriceBook
}
