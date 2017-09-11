
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
      console.log("PRICE BOOK ENTRY: ", pricebookEntry);
        //Update Opportunity
        updateOpportunity(contact.AccountId, pricebookEntry.Id, () => {
          //Get Opportunity
          getOpportunity(contact.AccountId, (opportunity) => {
            console.log('OPP UPD: ', opportunity);
            //Then, Add Quote
            addQuote(contact, opportunity, (quoteID) => {
              console.log('QUOTE ID: ', quoteID);
              if(quoteID && quoteID != ''){
                //Add Quote Line Item and send Quote by Email
                addQuoteLineItem(quoteID, pricebookEntry, quantity);
                updateQuote(quoteID);
              }
            });
          });

        });

    }

  });

}

module.exports = {
  sendQuote
}
