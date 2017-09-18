/*
  * @author    MITA Oumaïma, SYOUMI El Mahdi
  * @since       JULY 10, 2017
  * @desc       Handle user's request saved on Salesforce
  */
const {sendProduct} = require('./../data/salesforce/sendCatalogue');

const {getProduct} = require('./../data/salesforce/handleProducts');

const {sharePhoto} = require('./shareOnFB');
const {shareStatus} = require('./shareOnFB');

/*
  * @desc      Get request send from Salesforce when a new product is valable and matchs a request none treated
  * @param     req : Http request
  * @return    void
  */
var getRequestSF = (req) => {
    //TODO Get lead/contact's language
    sendProduct(req.senderID, req.productID, 'fr');
};

/*
  * @desc      Get request from Salesforce and share product on Facebook
  * @param     req : Http request
  * @return    void
  */
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
};


module.exports = {
  getRequestSF, getRequestFB
};
