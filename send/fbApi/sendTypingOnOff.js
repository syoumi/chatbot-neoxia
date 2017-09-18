/*
  * @author    MITA Oumaïma, SYOUMI El Mahdi
  * @since       JULY 10, 2017
  * @desc      This file is responsible for notifying the user that the bot, is typing ON / OFF, or has seen the message
  */
const {callSendAPI} = require('./sendViaFaceBookAPI');

/*
  * @desc      Function that sends typing on indicator
  * @param     recipientID : user's facebookId
  * @return    void
  */
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

/*
  * @desc      Function that sends typing off indicator
  * @param     recipientID : user's facebookId
  * @return    void
  */
var sendTypingOff = (recipientID) => {
 var messageData = {
   recipient: {
     id: recipientID
   },
   sender_action: 'typing_off'
 };

 callSendAPI(messageData);
};


/*
  * @desc      Function that sends seen indicator
  * @param     recipientID : user's facebookId
  * @return    void
  */
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
};
