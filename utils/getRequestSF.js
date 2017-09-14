

const {sendProduct} = require('./../data/salesforce/sendCatalogue');

var getRequestSF = (req) => {
    //TODO Get lead/contact's language
    sendProduct(req.senderID, req.product, 'fr');
}

module.exports = {
  getRequestSF
}
