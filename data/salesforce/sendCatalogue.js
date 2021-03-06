/*
  * @author    MITA Oumaïma, SYOUMI El Mahdi
  * @since       JULY 10, 2017
  * @desc        Send Catalogue of products to user
  */
const {getProductRecords} = require('./handleProducts');
const {getProduct} = require('./handleProducts');
const {getElements} = require('./handleProducts');

const {updateRequest} = require('./handleRequests');

const {sendTextMessageWithDelay} = require('./../../send/fbApi/sendTextMessage');
const {sendBulkTextMessagesWithDelay} = require('./../../send/fbApi/sendBulkTextMessages');
const {sendBulkTextMessages} = require('./../../send/fbApi/sendBulkTextMessages');
const {sendButtonMessage} = require('./../../send/fbApi/sendButtonMessage');
const {sendFileMessage} = require('./../../send/fbApi/sendFileMessage');
const {sendGenericMessage} = require('./../../send/fbApi/sendGenericMessage');
const {sendGenericMessageWithDelay} = require('./../../send/fbApi/sendGenericMessage');
const {sendImageMessage} = require('./../../send/fbApi/sendImageMessage');
const {sendQuickReply} = require('./../../send/fbApi/sendQuickReplies');
const {sendTextMessage} = require('./../../send/fbApi/sendTextMessage');

const {getText} = require('./../../utils/getPredefinedAnswers');

/*
  * @desc      Send catalogue of products
  * @param     senderID : contact's facebookId
  * @param     text : text to send with catalogue
  * @param     building : Building choose by user
  * @param     operation : Operation choose by user
  * @param     minPrice : minimum price choose by user
  * @param     maxPrice : maximum price choose by user
  * @param     nbrRooms : number of rooms choose by user
  * @param     city : city choose by user
  * @param     neighborhood : neighborhood choose by user
  * @param     count : counter, how many time that method was called
  * @param     lang : language
  * @return    void
  */
var sendCatalogue = (senderID, text, building, operation, minPrice, maxPrice, nbrRooms, city, neighborhood, count, lang) => {

    //Search for building
    var query = "SELECT Id, Name, amount__c, image__c, link__c, Description__c, Salesman__r.Id, Salesman__r.Name, Salesman__r.MobilePhone FROM product2 WHERE type__c='"+ building +"' AND Operation__c = '"+ operation +"'";

    if(minPrice && maxPrice) {
      query += " AND amount__c >=" + minPrice + " AND amount__c <= " + maxPrice;
    }
    if(nbrRooms){
      query += " AND number_of_rooms__c = " + nbrRooms ;
    }
    if(city){
      query +="  AND city__c = '" + city + "'";
    }
    if(neighborhood){
      query += " AND neighborhood__c = '" + neighborhood + "'";
    }

    var delay = 15000;
    if(count < 3){
      delay = 35000;
    }

    //First research
    getProductRecords(query, (elements) => {
      if(elements.length!=0){
        sendTextMessageWithDelay(senderID, text);
        sendGenericMessageWithDelay(senderID, elements, delay);
        //update request
        if(count == 3){
          updateRequest(senderID, true);
        }
      }
      else{
        //Try to find something may be interested to send to the client
        //text = `Nous sommes désolés. Des ${building}s avec les critères mentionnés ci-dessus ne sont pas disponible pour l'instant.\nSi vous n'êtes pas pressé, vous pouvez nous envoyer vos coordonnées afin de vous contacter une fois votre demande est disponible.\nSinon, nous vous proposons des ${building}s qui pourront vous intéresser.`;
        text = getText(lang, "Buildig not found", building + "s");

        count--;
        if(count == 2){
          sendCatalogue(senderID, text, building, operation, undefined, undefined, undefined, city, neighborhood, count, lang);
        }
        else if(count == 1){
          sendCatalogue(senderID, text, building, operation, undefined, undefined, undefined, city, undefined, count, lang);
        }
        else if(count == 0){
          sendCatalogue(senderID, text, building, operation, undefined, undefined, undefined, undefined, undefined, count, lang);
        }
      }
    });
};

/*
  * @desc      Send Product to User
  * @param     senderID : contact's facebookId
  * @param     productID : product's Id
  * @param     lang : language
  * @return    void
  */
var sendProduct = (senderID, productID, lang) => {
  console.log("SENDING PRODUCT TO USER");
  getProduct(productID, (product) => {
    var products = [];
    products.push(product);
    getElements(products, (elements) => {
      if(elements.length!=0){
        var text = getText(lang, 'Building request found' , product.Type__c +'s');
        sendTextMessageWithDelay(senderID, text);
        sendGenericMessageWithDelay(senderID, elements, 15000);
        //update request
        updateRequest(senderID, true);
      }
    });
  });
};


module.exports = {
  sendCatalogue, sendProduct
};
