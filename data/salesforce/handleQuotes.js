/*
  * @author    MITA Oumaïma, SYOUMI El Mahdi
  * @since       JULY 10, 2017
  * @desc        Handle Quotes
  */
const {doLogin} = require('./login');

const {getProduct} = require('./handleProducts');

const {getPriceBookEntry} = require('./handlePriceBookEntries');

/*
  * @desc      Create new quote
  * @param     contact : contact
  * @param     opportunity : opportunity
  * @return    Quote's Id
  */
var addQuote = (contact, opportunity, callback) => {
  doLogin((conn) => {
    var name = 'Devis initial ' + contact.FacebookId__c;
    conn.sobject("Quote").create({Name: name, ContactId: contact.Id, OpportunityId: opportunity.Id, Email : contact.Email,  Phone: contact.MobilePhone, BillingName: opportunity.Name, ShippingName: opportunity.Name,  BillingCity: contact.City, BillingCountry: contact.Country, ShippingCity: contact.City, ShippingCountry: contact.Country, PriceBook2Id: opportunity.Pricebook2Id}, function(err, res) {
      if (err) { return console.error(err); }
     callback(res.id);
    });
  });
};

/*
  * @desc      Create new Quote Line Item related to quote
  * @param     quoteID : quote's Id
  * @param     pricebookEntry : Price Book Entry
  * @param     product : product choose by contact
  * @param     quantity : Quantity of product
  * @return    Quote's Id
  */
var addQuoteLineItem= (quoteID, pricebookEntry, product, quantity, callback) => {
    //Create new Quote Line Item
    doLogin((conn) => {
      conn.sobject("QuoteLineItem").create({Product2Id: product.Id, QuoteId: quoteID, Quantity: quantity, UnitPrice: product.Amount__c, PriceBookEntryId : pricebookEntry.Id}, function(err, res) {
        if (err) { return console.error(err); }
        callback();
      });
    });
};

/*
  * @desc      Look for quote by opportunity
  * @param     opportunity : opportunity
  * @return    Quote
  */
var getQuote = (opportunity, callback) => {
    doLogin((conn) => {
      var quote = undefined;
      var query = "SELECT Id, Name, OpportunityId, ContactId, Email, Phone, ToSend__c FROM Quote ORDER BY CreatedDate DESC LIMIT 1";
      conn.query(query, (err, res) => {
        if (err) { return console.error(err); }
        if(res.records.length > 0){
          quote = res.records[0];
        }
        callback(quote);
      });
    });
};

/*
  * @desc      Update Quote's ToSend__c so that quote pdf will be generated and sent to contact's email
  * @param     quoteID : quote's Id
  * @return    void
  */
var updateQuote = (quoteID) => {
  doLogin((conn) => {
    var query = "SELECT Id, ToSend__c FROM Quote WHERE Id= '" + quoteID + "'";
    conn.query(query)
        .update({ ToSend__c: true }, 'Quote', function(err, rets) {
          if (err) { return console.error(err); }
          console.log("Quote updated: ", rets);
        });
  });
};


module.exports = {
  addQuote, addQuoteLineItem, getQuote, updateQuote
};
