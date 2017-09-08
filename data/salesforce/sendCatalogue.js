
const {getProductRecords} = require('./handleProducts');

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



var sendCatalogue = (senderID, text, building, operation, minPrice, maxPrice, nbrRooms, city, neighborhood, count) => {

    //Search for building
    var query = "SELECT Id, Name, amount__c, image__c, link__c, Description__c, Salesman__r.Id, Salesman__r.Name, Salesman__r.MobilePhone  FROM product2 WHERE type__c='"+ building +"' AND operation__c = '"+ operation +"'";

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
      delay = 30000;
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
        text = getText("fr", "Buildig not found", building);
        console.log('TEXT: ', text);
        //text = `Nous sommes désolés. Des ${building}s avec les critères mentionnés ci-dessus ne sont pas disponible pour l'instant.\nSi vous n'êtes pas pressé, vous pouvez nous envoyer vos coordonnées afin de vous contacter une fois votre demande est disponible.\nSinon, nous vous proposons des ${building}s qui pourront vous intéresser.`;

        count--;
        if(count == 2){
          sendCatalogue(senderID, text, building, operation, undefined, undefined, undefined, city, neighborhood, count);
        }
        else if(count == 1){
          sendCatalogue(senderID, text, building, operation, undefined, undefined, undefined, city, undefined, count);
        }
        else if(count == 0){
          sendCatalogue(senderID, text, building, operation, undefined, undefined, undefined, undefined, undefined, count);
        }
        else {
          text = `Nous sommes désolés. Des ${building}s avec les critères mentionnés ci-dessus ne sont pas disponible pour l'instant.\nSi vous n'êtes pas pressé, vous pouvez nous envoyer vos coordonnées afin de vous contacter une fois votre demande est disponible.`;
          sendTextMessageWithDelay(senderID, text);
        }

      }
    });
};



module.exports = {
  sendCatalogue
}
