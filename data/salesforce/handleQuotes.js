
const {doLogin} = require('./login');

const {getProduct} = require('./handleProducts');

const {getPriceBookEntry} = require('./handlePriceBookEntries');

//Create new quote
var addQuote = (contact, opportunity, callback) => {
  doLogin((conn) => {
    var name = 'Devis initial ' + contact.FacebookId__c;
    conn.sobject("Quote").create({Name: name, ContactId: contact.Id, OpportunityId: opportunity.Id, Email : contact.Email,  Phone: contact.MobilePhone, BillingName: opportunity.Name, ShippingName: opportunity.Name,  BillingCity: contact.City, BillingCountry: contact.Country, ShippingCity: contact.City, ShippingCountry: contact.Country, PriceBook2Id: opportunity.Pricebook2Id}, function(err, res) {
      if (err) { return console.error(err); }
     callback(res.id);
    });
  });
}


//Create new Quote Line Item related to quote
var addQuoteLineItem= (quoteID, pricebookEntry, product, quantity, callback) => {
    //Create new Quote Line Item
    doLogin((conn) => {
      conn.sobject("QuoteLineItem").create({Product2Id: product.Id, QuoteId: quoteID, Quantity: quantity, UnitPrice: product.Amount__c, PriceBookEntryId : pricebookEntry.Id}, function(err, res) {
        if (err) { return console.error(err); }
        callback();
      });
    });
}


//Look for quote by opportunity
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
}

//Update ToSend__c
var updateQuote = (quoteID) => {
  doLogin((conn) => {
    var query = "SELECT Id, ToSend__c FROM Quote WHERE Id= '" + quoteID + "'";
    conn.query(query)
        .update({ ToSend__c: true }, 'Quote', function(err, rets) {
          if (err) { return console.error(err); }
          console.log("Quote updated: ", rets);
        });
  });
}

module.exports = {
  addQuote, addQuoteLineItem, getQuote, updateQuote
}
