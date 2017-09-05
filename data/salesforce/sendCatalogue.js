
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

const {addRequest} = require('./handleRequests');



var sendCatalogue = (senderID, text, building, operation, minPrice, maxPrice, nbrRooms, city, neighborhood) => {

   //Send text first
    sendTextMessage(senderID, text);
    doLogin((conn) => {
    //Search for building
    var query = "SELECT Id, Name, amount__c, image__c, link__c, Description__c, Salesman__r.Id, Salesman__r.Name, Salesman__r.MobilePhone  FROM product2 WHERE type__c='"+ building +"' AND operation__c = '"+ operation +"'";

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

    var elements = getProductRecords(conn, query);

    setTimeout(() => {
      if(elements.length!=0){
        sendGenericMessage(senderID, elements);
      }

    else{

      //Add request
      //addRequest(senderID, building, operation, minPrice, maxPrice, nbrRooms, city, neighborhood, false);

      //Try to find something may be interested to sind to the client
      text = `Nous sommes désolés. Des ${building}s avec les critères mentionnés ci-dessus ne sont pas disponible pour l'instant.\nSi vous n'êtes pas pressé, vous pouvez nous envoyer vos coordonnées afin de vous contacter une fois votre demande est disponible.\nSinon, nous vous proposons des ${building}s qui pourront vous intéresser.`
      sendTextMessageWithDelai(senderID, text);

      console.log("SEARCHING...");

      //Search building in specific neighborhood, if client fixed it
      if(neighborhood){
        query = "SELECT Id, Name, amount__c, image__c, link__c, Description__c, Salesman__r.Id, Salesman__r.Name, Salesman__r.MobilePhone FROM product2 WHERE type__c='"+ building +"' AND operation__c = '"+ operation +"' AND neighborhood__c = '" + neighborhood + "'";
        elements = getProductRecords(conn, query);
        setTimeout(() => {
          if(elements.length!=0){
            sendGenericMessage(senderID, elements);
          }
          else {
              neighborhood = undefined;
          }
        }, 30000);
      }

      //Search building in specific city, if client fixed it
      if(city && (!neighborhood)){
        query = "SELECT Id, Name, amount__c, image__c, link__c, Description__c, Salesman__r.Id, Salesman__r.Name, Salesman__r.MobilePhone FROM product2 WHERE type__c='"+ building +"' AND operation__c = '"+ operation +"' AND city__c = '" + city + "'";
        elements = getProductRecords(conn, query);
        setTimeout(() => {
          if(elements.length!=0){
            sendGenericMessage(senderID, elements);
          }
          else {
              city = undefined;
          }
        }, 30000);

      }

      //Search all buildings with specific operation
      if((!city) && (!neighborhood)){
        console.log("SEARCH ALL...");
        query = "SELECT Id, Name, amount__c, image__c, link__c, Description__c, Salesman__r.Id, Salesman__r.Name, Salesman__r.MobilePhone  FROM product2 WHERE type__c='"+ building +"' AND operation__c = '"+ operation +"'";
        elements = getProductRecords(conn, query);
        setTimeout(() => {
          console.log("ELEMENTS: ", elements);
          if(elements.length!=0){
            sendGenericMessage(senderID, elements);
          }
        }, 30000);

      }
    }
  }, 3000);
  });
};


var getProductRecords = (conn, query) => {
 var elements=[];

    conn.query(query, (err, res) => {
      if (err) { return console.error(err); }

        for (var i=0; i<res.records.length; i++) {
          var record = res.records[i];

          var id = record.Id;
          var title= record.Name;
          var price= record.Amount__c +"DH";
          var photo= record.Image__c;
          var description= "DESCRIPTION_PAYLOAD|" + record.Description__c;
          //var link= record.Link__c;
          var contact = "CONTACT_PAYLOAD|" + record.Salesman__r.Id + "|" + record.Salesman__r.Name + "|" + record.Salesman__r.MobilePhone + "|" + id;


          var element= {
              title: title,
              subtitle: price,
              image_url: photo,

              buttons: [
                {
                  type: "postback",
                  title: "Détails",
                  payload: description
                },
                {
                  type: "postback",
                  title: "Contacter",
                  payload: contact
              }]
          };

          console.log("TITRE: ", title );
          elements.push(element);

        }

  });
  return elements;
}

module.exports = {
  sendCatalogue
}
