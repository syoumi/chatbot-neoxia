/*
  * @author    MITA Oumaïma, SYOUMI El Mahdi
  * @since       JULY 10, 2017
  * @desc        Handle Price Book Entries
  */
const {doLogin} = require('./login');

/*
  * @desc     Create new Price Book Entry for a product
  * @param     product : product
  * @param     name : PriceBook's name
  * @return    Price Book Entry's Id
  */
var addPriceBookEntry = (product, name, callback) => {
  //Check if Price Book Entry for that product doesn't already exist
  checkPriceBookEntry(product.Id, (pricebookEntry) => {
    if(!pricebookEntry){
      getPriceBook(name, (pricebook) => {
        doLogin((conn) => {
          conn.sobject("PricebookEntry").create({Product2Id: product.Id, PriceBook2Id: pricebook.Id, UnitPrice: product.Amount__c, isActive: true}, function(err, res) {
            if (err) { return console.error(err); }
           callback(res.id);
          });
        });
      });
    }
    else {
      callback(pricebookEntry.Id);
    }
  });
};

/*
  * @desc     Get Price Book by it's name
  * @param     name : PriceBook's name
  * @return    Price Book
  */
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
};

/*
  * @desc    Get Price Book Entry by it's ID
  * @param     pricebookEntryId : PriceBookEntry's Id
  * @return    Price Book Entry
  */
var getPriceBookEntry = (pricebookEntryId, callback) => {
    doLogin((conn) => {
      var pricebookEntry = undefined;
      var query = "SELECT Id, Pricebook2Id, Product2Id, UnitPrice FROM PricebookEntry WHERE Id ='" + pricebookEntryId + "'  LIMIT 1";
      conn.query(query, (err, res) => {
        if (err) { return console.error(err); }
        if(res.records.length > 0){
         pricebookEntry = res.records[0];
        }
        callback(pricebookEntry);
      });
    });
};

/*
  * @desc    Check existing of Price Book Entry
  * @param     productID : product's Id
  * @return    Price Book Entry
  */
var checkPriceBookEntry = (productID, callback) => {
  doLogin((conn) => {
    var pricebookEntry = undefined;
    var query = "SELECT Id, Pricebook2Id, Product2Id, UnitPrice FROM PricebookEntry WHERE Product2Id ='" + productID + "'  LIMIT 1";
    conn.query(query, (err, res) => {
      if (err) { return console.error(err); }
      if(res.records.length > 0){
       pricebookEntry = res.records[0];
      }
      callback(pricebookEntry);
    });
  });
};

module.exports = {
  addPriceBookEntry, getPriceBookEntry, getPriceBook, checkPriceBookEntry
};
