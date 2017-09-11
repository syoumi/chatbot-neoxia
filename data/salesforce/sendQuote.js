
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
    addPriceBookEntry(product, 'Standard Price Book', (pricebookEntryId) => {

      //Get Price Book Entry
      getPriceBookEntry(pricebookEntryId, (pricebookEntry) => {
        console.log('PRICE BOOK ENTRY : ', pricebookEntry);

        //Update Opportunity
        updateOpportunity(contact.AccountId, pricebookEntry, (opportunity) => {
            console.log('---> Opportunity: ', opportunity);
            //Then, Add Quote
            addQuote(contact, opportunity, (quoteID) => {
              console.log('QUOTE ID: ', quoteID);
              if(quoteID && quoteID != ''){
                //Add Quote Line Item and send Quote by Email
                addQuoteLineItem(quoteID, pricebookEntry, product, quantity);
                updateQuote(quoteID);
              }
            });

        });

      });

    });

  });



}

module.exports = {
  sendQuote
}
