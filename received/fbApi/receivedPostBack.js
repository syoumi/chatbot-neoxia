/**
 * In this file, we put all the logic to execute whenever an event
 * of type PostBack is sent to the backend app
 */

const {sendTextMessage} = require('./../../send/fbApi/sendTextMessage');

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
  console.log(`| senderID : ${senderID}`);
  console.log(`| recipientID ${recipientID}`);
  console.log(`| timeOfPostBack ${timeOfPostBack}`);
  console.log('#################END PRI##############');

  sendTextMessage(senderID, `Postback ${payload} reçu :D`);
};

module.exports = {
  receivedPostBack
}
