const {sendProduct} = require('./../data/salesforce/sendCatalogue');

const {getProduct} = require('./../data/salesforce/handleProducts');

const {sharePhoto} = require('./shareOnFB');
const {shareStatus} = require('./shareOnFB');


var getRequestSF = (req) => {
    //TODO Get lead/contact's language
    sendProduct(req.senderID, req.productID, 'fr');
}


//Get request from SF and share product on FB
var getRequestFB = (req) => {
  var productID =  req.productID;
  getProduct(productID, (product) => {
    console.log("POST PRODUCT");
    if(product){
      var text = '**NOUVEAUTE**\n' + product.Name + '\n' + product.Description__c;
      var image = product.Image__c;
      //shareStatus(text);
      sharePhoto(text, image);
    }
  });
}

module.exports = {
  getRequestSF, getRequestFB
}
