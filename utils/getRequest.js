

const {sendProduct} = require('./../data/salesforce/sendCatalogue');

const {getProduct} = require('./../data/salesforce/handleProducts');

const {sharePhoto} = require('./shareOnFB');
const {shareStatus} = require('./shareOnFB');
const {shareAlbum} = require('./shareOnFB');

const {FB_PAGE_TOKEN} = require('./../include/config');
const {FB_PAGE_ID} = require('./../include/config');
const {FB_ADMIN_TOKEN} = require('./../include/config');

const request = require('request');


var getRequestSF = (req) => {
    //TODO Get lead/contact's language
    sendProduct(req.senderID, req.productID, 'fr');
}

var getRequestFB = (req) => {
  var productID =  req.productID;
  //SHARE Product on FB
  getProduct(productID, (product) => {
    console.log("POST PRODUCT");
    if(product){
      var text = '**NOUVEAUTE**\n' + product.Name + '\n' + product.Description__c;
      request({
        uri: 'https://graph.facebook.com/2027653890797502/feed',
        qs: {
          access_token: FB_ADMIN_TOKEN,
          message: text
        },
        method: 'POST'
      }, (error, response, body) => {
        if (error) {
          console.log('Error occured while posting to facebook page.');
          return console.error('Error occured while posting to facebook page.');
        }

        console.log('Posted to facebook with status ' , response.statusCode);
      });

    }


  });
}

module.exports = {
  getRequestSF, getRequestFB
}
