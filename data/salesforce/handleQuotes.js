
const {doLogin} = require('./login');

const {getProduct} = require('./handleProducts');

//Create new quote
var addQuote = (contact, opportunity, callback) => {
  doLogin((conn) => {
    var name = 'Devis initial ' + contact.FacebookId__c;
    conn.sobject("Quote").create({Name: name, ContactId: contact.Id, OpportunityId: opportunity.Id, Email : contact.Email,  Phone: contact.MobilePhone, BillingName: opportunity.Name, ShippingName: opportunity.Name,  BillingCity: contact.City, BillingCountry: contact.Country, ShippingCity: contact.City, ShippingCountry: contact.Country}, function(err, res) {
      if (err) { return console.error(err); }
      callback();
    });
  });
}

//Create new Quote Line Item related to quote
var addQuoteLineItem= (quote, productID, quantity) => {
  getProduct(productID, (product) => {
    if(product){
      doLogin((conn) => {
        conn.sobject("QuoteLineItem").create({Product2Id: productID, QuoteId: quote.Id, Quantity: quantity, UnitPrice: product.Amount__c, PriceBookEntryId : 1}, function(err, res) {
          if (err) { return console.error(err); }
        });
      });
    }
  });

}


//Look for quote by opportunity
var getQuote = (opportunity, callback) => {
    doLogin((conn) => {
      var quote = undefined;
      var query = "SELECT Id, Name, OpportunityId, ContactId, Email, Phone, ToSend__c FROM Quote ORDER BY CreatedDate DESC LIMIT 1";
      conn.query(query, (err, res) => {
        if (err) { return console.error(err); }
        quote = res.records[0];
        callback(quote);
      });
    });
}

//Update ToSend__c
var updateQuote = (quote) => {
  doLogin((conn) => {
    var query = "SELECT Id, ToSend__c FROM Quote WHERE Id= " + quote.Id;
    conn.query(query)
        .update({ ToSend__c: true }, 'Quote', function(err, rets) {
          if (err) { return console.error(err); }
          console.log(rets);
        });
  });
}

module.exports = {
  addQuote, addQuoteLineItem, getQuote, updateQuote
}
