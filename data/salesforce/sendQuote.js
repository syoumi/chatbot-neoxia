
const {getOpportunity} = require('./handleOpportunities');

const {addQuote} = require('./handleQuotes');
const {getQuote} = require('./handleQuotes');
const {updateQuote} = require('./handleQuotes');
const {addQuoteLineItem} = require('./handleQuotes');

//Send Quote
var sendQuote = (contact, productID, quantity) => {
    getOpportunity(contact.AccountId, (opportunity)  => {

      addQuote(contact, opportunity, () => {

        getQuote(opportunity, (quote) => {
          if(quote){
            addQuoteLineItem(quote, productID, quantity);
            updateQuote(quote);
          }
        });

      });
    });
}

module.exports = {
  sendQuote
}
