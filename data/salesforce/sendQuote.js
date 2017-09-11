
const {addQuote} = require('./handleQuotes');
const {getQuote} = require('./handleQuotes');
const {updateQuote} = require('./handleQuotes');
const {addQuoteLineItem} = require('./handleQuotes');

const {getOpportunity} = require('./handleOpportunities');
const {updateOpportunity} = require('./handleOpportunities');

const {addPriceBookEntry} = require('./handlePriceBookEntries');
const {getPriceBookEntry} = require('./handlePriceBookEntries');

const {getProduct} = require('./handleProducts');

//Send Quote
var sendQuote = (contact, productID, quantity) => {

  //Look for product first
  getProduct(productID, (product) => {

    //Then, create a new Price Book Entry for product
    addPriceBookEntry(product, 'Standard Price Book', (priceBookEntryId) => {

      //Get Price Book Entry
      getPriceBookEntry(priceBookEntryId, (priceBookEntry) => {
        console.log('PRICE BOOK ENTRY : ', pricebookEntry);
        
        //Update Opportunity
        updateOpportunity(contact.AccountId, priceBookEntry, () => {

          //Get Opportunity
          getOpportunity(contact.AccountId, (opportunity) => {
            //Then, Add Quote
            addQuote(contact, opportunity, (quoteID) => {
              console.log('QUOTE ID: ', quoteID);
              if(quoteID && quoteID != ''){
                //Add Quote Line Item and send Quote by Email
                addQuoteLineItem(quoteID, priceBookEntry, product, quantity);
                updateQuote(quoteID);
              }
            });
          });

        });

      });

    });

  });



}

module.exports = {
  sendQuote
}
