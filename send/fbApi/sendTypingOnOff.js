/**
 * This file is responsible for notifying the user that the bot
 * is typing ON / OFF, or has seen the message
 */

const {callSendAPI} = require('./sendViaFaceBookAPI');

// Function that sends typing on indicator
var sendTypingOn = (recipientID) => {
 var messageData = {
   recipient: {
     id: recipientID
   },
   // concerned proprety
   sender_action: 'typing_on'
 };

 callSendAPI(messageData);
};

// Function that sends typing off indicator
var sendTypingOff = (recipientID) => {
 var messageData = {
   recipient: {
     id: recipientID
   },
   sender_action: 'typing_off'
 };

 callSendAPI(messageData);
};

// Function that sends seen indicator
var sendSeen = (recipientID) => {
  var messageData = {
   recipient: {
     id: recipientID
   },
   sender_action: 'mark_seen'
  };

  callSendAPI(messageData);
};

module.exports = {
  sendTypingOn,
  sendTypingOff,
  sendSeen
}
