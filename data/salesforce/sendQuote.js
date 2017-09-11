
const {addQuote} = require('./handleQuotes');
const {getQuote} = require('./handleQuotes');
const {updateQuote} = require('./handleQuotes');
const {addQuoteLineItem} = require('./handleQuotes');

const {getOpportunity} = require('./handleOpportunities');
const {updateOpportunity} = require('./handleOpportunities');

//Send Quote
var sendQuote = (contact, productID, quantity) => {

    //Get opportunity First
    getOpportunity(contact.AccountId, (opportunity)  => {

      //Then, Look for PriceBookEntryId
      getPriceBookEntry(product.Id, (pricebookEntry) => {

        if(pricebookEntry){
          //Update Opportunity
          updateOpportunity(opportunity, pricebookEntry.Id, () => {
            //Then, Add Quote
            addQuote(contact, opportunity, () => {

              getQuote(opportunity, (quote) => {
                if(quote){

                  //Add Quote Line Item and send Quote by Email
                  addQuoteLineItem(quote, productID, quantity);
                  updateQuote(quote);
                }
              });

            });



          });
        }
      });

    });
}

module.exports = {
  sendQuote
}
