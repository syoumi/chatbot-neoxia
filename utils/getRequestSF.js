

const {sendProduct} = require('./../data/salesforce/sendCatalogue');

var getRequestSF = (req) => {
    //TODO Get lead/contact's language
    console.log(req.senderID + '; ' + req.productID);
    sendProduct(req.senderID, req.productID, 'fr');
}

module.exports = {
  getRequestSF
}
