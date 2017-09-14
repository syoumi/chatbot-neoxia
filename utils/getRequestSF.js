

const {sendProduct} = require('./../data/salesforce/sendCatalogue');

var getRequestSF = (senderID, productID) => {
    //TODO Get lead/contact's language
    sendProduct(senderID, product, 'fr');
}

module.exports = {
  getRequestSF
}
