
const {addQuote} = require('./handleQuotes');
const {getQuote} = require('./handleQuotes');
const {updateQuote} = require('./handleQuotes');
const {addQuoteLineItem} = require('./handleQuotes');

const {getOpportunity} = require('./handleOpportunities');
const {updateOpportunity} = require('./handleOpportunities');

const {getPriceBookEntry} = require('./handlePriceBookEntry');

//Send Quote
var sendQuote = (contact, productID, quantity) => {
  //Look for PriceBookEntryId First
  getPriceBookEntry(productID, (pricebookEntry) => {

    if(pricebookEntry){
      //Then, Get opportunity
      getOpportunity(contact.AccountId, (opportunity)  => {
        //Update Opportunity
        updateOpportunity(opportunity, pricebookEntry.Id);
        //Then, Add Quote
        addQuote(contact, opportunity, (quoteID) => {
          console.log('QUOTE ID: ', quoteID);
          if(quoteID !=''){
            //Add Quote Line Item and send Quote by Email
            // addQuoteLineItem(quoteID, productID, quantity);
            // updateQuote(quoteID);
          }
        });

      });
    }

  });

}

module.exports = {
  sendQuote
}
