/**
 * In this file, we put all the logic to execute whenever an event
 * of type message is sent to the backend app
 */

const {sendTextMessage} = require('./../../send/fbApi/sendTextMessage');
const {sendToApiAi} = require('./../../send/apiAi/sendViaApiAi');
const {sendToAi} = require('./../../send/ai/sendToAi');

const {getWaiting} = require('./../../utils/waiting');
const {setNotWaiting} = require('./../../utils/waiting');



/**
 * Message event handler
 */
var receivedMessage = (event) => {
  // Extracting event informations
  // sender PID (page scooped ID)
  var senderID = event.sender.id;
  // recipient facebook ID
  var recipientID = event.recipient.id;
  // timestamp of sending message
  var timeOfMessage = event.timestamp;
  // message object
  var message = event.message;

  console.log(`### Message event informations ###`);
  console.log(`| senderID : ${senderID}`);
  console.log(`| recipientID ${recipientID}`);
  console.log(`| timeOfMessage ${timeOfMessage}`);
  console.log(`################end MEI ################`);

  // The bot is no longer waiting for answer
  setNotWaiting();

  // getting more informations
  // message unique ID
  var messageID = message.mid;
  // text proprety of the message object
  var messageText = message.text;
  // attachments object
  var messageAttachments = message.attachments;


  if (messageText) {
    // sendToApiAi(senderID, messageText);
    sendToAi(messageText);

  } else if (messageAttachments) {
   sendTextMessage(senderID, 'Pièce jointe bien reçue <3 ^_^ !');
  }

};

module.exports = {
  receivedMessage
}
