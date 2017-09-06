/**
 * All the logic for sending one text message
 */

const {callSendAPI} = require('./sendViaFaceBookAPI');

const {setWaiting} = require('./../../utils/waiting');
const {getWaiting} = require('./../../utils/waiting');
const {sendTypingOn} = require('./sendTypingOnOff');

/**
 * Immediatly sends a text message to recipient
 */
var sendTextMessage = (recipientID, textMessage) => {

  // Constructing JSON data to send
  var messageData = {
   recipient: {
     id: recipientID
   },
   message: {
     text: textMessage
   }
  };

  // If it is an important message, we set waiting to true
  if (textMessage === 'Test?') {
   setWaiting();
  }

  sendTypingOn(recipientID);

  callSendAPI(messageData);
};

/**
 * Sends a text message to recipient with a typing random delai
 */
var sendTextMessageWithDelay = (recipientID, textMessage) => {
  // We will pick up a random delai between 50 and 500 Milliseconds / character
  // to simulate bot is typing on
  var delay = parseInt(Math.random() * ( 100 - 50 ) + 50) * textMessage.length;

  console.log("MESSAGE WILL BE SENT IN: ", delai);

  setTimeout(() => {
    sendTypingOn(recipientID);
  }, 1000);


  setTimeout(() => {

   sendTextMessage(recipientID, textMessage);

 }, delay);
};

module.exports = {
  sendTextMessageWithDelay,
  sendTextMessage
};
