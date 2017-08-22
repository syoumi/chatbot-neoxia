
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



var sendCatalogue = (senderID, building, operation, minPrice, maxPrice, nbrRooms, city, neighborhood) => {
  doLogin((conn) => {

    var query = "SELECT Id, Name FROM '"+building+"' WHERE type__c = '"+operation+"'";
    if(minPrice && maxPrice) {
      query += " AND price__c BETWEEN " + minPrice + " AND " + maxPrice;
    }
    if(nbrRooms){
      //'"+res+"'"
      query += " AND  +  nbrRooms__c ='"+nbrRooms+"'";
    }
    if(city){
      query += ` AND city = ${city}`;
    }
    if(neighborhood){
      query += ` AND neighborhood = ${neighborhood}`;
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
            sendTextMessage(senderID, title);
        }


        sendGenericMessage(senderID, elements);
      });
    });
};

module.exports = {
  sendCatalogue
}
