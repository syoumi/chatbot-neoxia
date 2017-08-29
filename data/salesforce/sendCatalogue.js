
const {doLogin} = require('./login');

const {sendTextMessageWithDelai} = require('./../../send/fbApi/sendTextMessage');
const {sendBulkTextMessagesWithDelai} = require('./../../send/fbApi/sendBulkTextMessages');
const {sendBulkTextMessages} = require('./../../send/fbApi/sendBulkTextMessages');
const {sendButtonMessage} = require('./../../send/fbApi/sendButtonMessage');
const {sendFileMessage} = require('./../../send/fbApi/sendFileMessage');
const {sendGenericMessage} = require('./../../send/fbApi/sendGenericMessage');
const {sendImageMessage} = require('./../../send/fbApi/sendImageMessage');
const {sendQuickReply} = require('./../../send/fbApi/sendQuickReplies');
const {sendTextMessage} = require('./../../send/fbApi/sendTextMessage');



var sendCatalogue = (senderID, text, building, operation, minPrice, maxPrice, nbrRooms, city, neighborhood) => {

   //Send text first
    sendTextMessage(senderID, text);

    //Search for building
    var query = "SELECT Id, Name, amount__c, image__c, link__c FROM product2 WHERE type__c='"+ building +"' AND operation__c = '"+ operation +"'";

    if(minPrice && maxPrice) {
      query += " AND amount__c >=" + minPrice + " AND amount__c <= " + maxPrice;
    }
    if(nbrRooms){
      //'"+res+"'"
      query += " AND number_of_rooms__c = " + nbrRooms ;
    }
    if(city){
      query +="  AND city__c = '" + city + "'";
    }
    if(neighborhood){
      query += " AND neighborhood__c = '" + neighborhood + "'";
    }

    var elements = getRecords(query);

    if(elements){
      sendGenericMessage(senderID, elements);
    }
    else{
      text = `Nous sommes désolés. Des ${building}s avec les critères mentionnés ci-dessus ne sont pas disponible pour l'instant.\nSi vous n'êtes pas pressé, vous pouvez nous envoyer vos coordonnées afin de vous contacter une fois votre demande est disponible.\nSinon, nous vous proposons des ${building}s qui pourront vous intéresser.`
      sendTextMessagesWithDelai(senderID, text);

      //Try to find something may be interested to sind to the client
      //Search building in specific city, if client fixed it
      if(city){
        query = "SELECT Id, Name, amount__c, image__c, link__c FROM product2 WHERE type__c='"+ building +"' AND operation__c = '"+ operation +"' AND city__c = '" + city + "'";
        elements = getRecords(query);
        if(elements){
          sendGenericMessage(senderID, elements);
        }
        else {
          city = undefined;
        }
      }
      //Search building in specific neighborhood, if client fixed it
      if(neighborhood){
        query = "SELECT Id, Name, amount__c, image__c, link__c FROM product2 WHERE type__c='"+ building +"' AND operation__c = '"+ operation +"' AND neighborhood__c = '" + neighborhood + "'";
        elements = getRecords(query);
        if(elements){
          sendGenericMessage(senderID, elements);
        }
        else{
          neighborhood = undefined;
        }
      }
      //Search all buildings with specific operation
      if(!city && !neighborhood){
        query = "SELECT Id, Name, amount__c, image__c, link__c FROM product2 WHERE type__c='"+ building +"' AND operation__c = '"+ operation +"'";
        elements = getRecords(query);
        if(elements){
          sendGenericMessage(senderID, elements);
        }
      }
    }
};


var getRecords = (query) => {
  doLogin((conn) => {
    conn.query(query, (err, res) => {
      if (err) { return console.error(err); }

        var elements=[];
        for (var i=0; i<res.records.length; i++) {
          var record = res.records[i];

          var title= record.Name;
          var price= record.Amount__c;
          var photo= record.Image__c;
          var link= record.Link__c;

          var element= {
              title: title,
              subtitle: price,
              image_url: photo,

              buttons: [{
                type: "web_url",
                url: link,
                title: "Détails"
                }, {
                type: "postback",
                title: "Contacter",
                payload: "CONTACT_PAYLOAD",
              }]
          };

            elements.push(element);
        }

        return elements;
    });
  });
}

module.exports = {
  sendCatalogue
}
