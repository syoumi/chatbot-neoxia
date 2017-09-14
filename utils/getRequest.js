

const {sendProduct} = require('./../data/salesforce/sendCatalogue');

const {getProduct} = require('./../data/salesforce/handleProducts');

const {sharePhoto} = require('./shareOnFB');
const {shareStatus} = require('./shareOnFB');
const {shareAlbum} = require('./shareOnFB');

const {FB_PAGE_TOKEN} = require('./../include/config');
const {FB_PAGE_ID} = require('./../include/config');
const {FB_ADMIN_TOKEN} = require('./../include/config');

var FB = require('fb');


var getRequestSF = (req) => {
    //TODO Get lead/contact's language
    sendProduct(req.senderID, req.productID, 'fr');
}

var getRequestFB = (req) => {
  var productID =  req.productID;
  console.log(productID);
  //SHARE Product on FB
  getProduct(productID, (product) => {
    console.log(FB_PAGE_TOKEN);
    FB.setAccessToken(FB_PAGE_TOKEN);
    /*console.log(FB_PAGE_ID);
    if(product){
      FB.api('/' + FB_PAGE_ID + '/feed', 'post', { message: 'NOUVEAUTE'}, function (res) {
					if(!res || res.error) {
						console.log(!res ? 'error occurred' : res.error);
						return;
					}
					console.log('Post Id: ' + res.id);
		   });
     }*/

    request({
      uri: 'https://graph.facebook.com/'+ FB_PAGE_ID + '/feed',
      qs: {
        access_token: FB_ADMIN_TOKEN,
        message: 'NOUVEAUTE'
      },
      method: 'POST'
    }, (error, response, body) => {
      if (error) {
        return console.error('Error occured while posting to facebook page.');
      }
      console.log('Posted to facebook with status ' , response.statusCode);
    });


  });
}

module.exports = {
  getRequestSF, getRequestFB
}
