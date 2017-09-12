
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

  //1- Look for product first
  getProduct(productID, (product) => {

    //2- Then, create a new Price Book Entry for product
    addPriceBookEntry(product, 'Standard Price Book', (pricebookEntryId) => {

      //3- Get Price Book Entry
      getPriceBookEntry(pricebookEntryId, (pricebookEntry) => {
        console.log('PRICE BOOK ENTRY : ', pricebookEntry);

        //4- Update Opportunity
        updateOpportunity(contact.AccountId, pricebookEntry, () => {

          //5- Get Opportunity
          getOpportunity(contact.AccountId, (opportunity) => {
            //6- Then, Add Quote
            addQuote(contact, opportunity, (quoteID) => {
              console.log('QUOTE ID: ', quoteID);
              if(quoteID && quoteID != ''){
                //7- Add Quote Line Item
                addQuoteLineItem(quoteID, pricebookEntry, product, quantity, () => {
                    //8- Create and Send Quote PDF using Trigger 
                    updateQuote(quoteID);
                });//7
              }
            });//6
          });//5

        });//4

      });//3
    });//2

  });//1



}

module.exports = {
  sendQuote
}
