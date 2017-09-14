

const {sendProduct} = require('./../data/salesforce/sendCatalogue');

const {getProduct} = require('./../data/salesforce/handleProducts');

const {sharePhoto} = require('./shareOnFB');
const {shareStatus} = require('./shareOnFB');
const {shareAlbum} = require('./shareOnFB');

const {VERIFY_TOKEN} = require('./../include/config');

var FB = require('fb');


var getRequestSF = (req) => {
    //TODO Get lead/contact's language
    sendProduct(req.senderID, req.productID, 'fr');
}

var getRequestFB = (req) => {
  var productID =  req.ProductID;

  //SHARE Product on FB
  getProduct(productID, (product) => {
    FB.setAccessToken(VERIFY_TOKEN);
    FB.api('me/photos', 'post', {
    message: product.Name,
    url: product.Image__c
    }, function(response){

        if (!response || response.error) {
          console.log('ERROR: ', response);
        } else {
          console.log('Post ID: ' + response.id);
        }

    });
  });
}

module.exports = {
  getRequestSF, getRequestFB
}
