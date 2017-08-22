
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
  doLogin((conn) => {
    building += "__c";
    building[0].toUpperCase();

    var query = "SELECT Id, Name, price__c, photo__c, link__c FROM "+ building +" WHERE type__c = '"+ operation +"'";
    if(minPrice && maxPrice) {
      query += " AND price__c >=" + minPrice + " AND price__c <= " + maxPrice;
    }
    if(nbrRooms){
      //'"+res+"'"
      query += " AND nbrRooms__c = " + nbrRooms ;
    }
    if(city){
      query +="  AND city__c = '" + city + "'";
    }
    if(neighborhood){
      query += " AND neighborhood = '" + neighborhood + "'";
    }

    conn.query(query, (err, res) => {
      if (err) { return console.error(err); }

        var elements=[];
        for (var i=0; i<res.records.length; i++) {
          var record = res.records[i];

          var title= record.Name;
          var price= record.Price__c;
          var photo= record.Photo__c;
          var link= record.Link__c;

          var element= {
              title: title,
              subtitle: price,
              image_url: photo,

              buttons: [{
                type: "web_url",
                url: link,
                title: "Voir détails"
                }, {
                type: "postback",
                title: "Contacter",
                payload: "CONTACT_PAYLOAD",
              }]
             };

            elements.push(element);
        }

        if(elements.length>0){
          sendTextMessageWithDelai(senderID, text);
          sendGenericMessage(senderID, elements);
        }
        else{
          var messages = [];
          messages[0] = text;
          messages[1] = 'Je suis désolé. Je n\'ai pas trouvé ce que vous voulez.';
          sendBulkTextMessagesWithDelai(senderID, messages);
        }

      });
    });
};

module.exports = {
  sendCatalogue
}
