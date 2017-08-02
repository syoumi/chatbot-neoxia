/**
 *
 *
 */

const {callSendAPI} = require('./sendViaFaceBookAPI');

const {setWaiting} = require('./../../utils/waiting');
const {getWaiting} = require('./../../utils/waiting');
const {sendTypingOn} = require('./sendTypingOnOff');


var sendTextMessage = (reciepientID, textMessage) => {

  // Constructing JSON data to send
  var messageData = {
   recipient: {
     id: reciepientID
   },
   message: {
     text: textMessage
   }
  };

  // If it is an important message, we set waiting to true
  if (textMessage === 'Test?') {
   setWaiting();
  }

  // We send data object via facebook API
  callSendAPI(messageData);
};

var sendTextMessageWithDelai = (recipientID, textMessage) => {
  // We will pick up a random delai between 50 and 500 Milliseconds / character
  // to simulate bot is typing on
  var delai = parseInt(Math.random() * ( 500 - 50 ) + 50) * textMessage.length;

  sendTypingOn(recipientID);

  setTimeout(() => {

   sendTextMessage(recipientID, textMessage);

  }, delai);
};

module.exports = {
  sendTextMessageWithDelai,
  sendTextMessage
};
