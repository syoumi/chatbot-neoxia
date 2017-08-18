/**
 * In this file, we put all the logic to execute whenever an event
 * of type PostBack is sent to the backend app
 */

const {sendTextMessage} = require('./../../send/fbApi/sendTextMessage');
const {sendButtonMessage} = require('./../../send/fbApi/sendButtonMessage');

/**
 * Postback event handler
 */
var receivedPostBack = (event) => {
  var senderID = event.sender.id;
  var recipientID = event.recipient.id;
  var timeOfPostBack = event.timestamp;

  // Getting the payload unique name defined later
  var payload = event.postback.payload;

  console.log(`### Postback recieved informations ###`);
  // console.log(`| senderID : ${senderID}`);
  // console.log(`| recipientID ${recipientID}`);
  // console.log(`| timeOfPostBack ${timeOfPostBack}`);
  // console.log('#################END PRI##############');

  //by payload
  switch(payload){
    case "CONTACT_PAYLOAD":
      var buttons = [
        {
          "type":"phone_number",
          "title":"Appeler",
          "payload":"+15105551234"
       }
     ];
      sendButtonMessage(senderID, 'Vous pouvez contacter Monsieur XXXX pour plus de renseignements.', buttons);
      break;

    default:
        sendTextMessage(senderID, `Postback ${payload} reçu :D`);
  }

};

module.exports = {
  receivedPostBack
}
