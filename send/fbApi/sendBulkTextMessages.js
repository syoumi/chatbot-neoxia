/*
  * @author    MITA Oumaïma, SYOUMI El Mahdi
  * @since       JULY 10, 2017
  * @desc       All the logic for sending Bulk text messages
  */
const async = require('async');

const {setWaiting} = require('./../../utils/waiting');
const {getWaiting} = require('./../../utils/waiting');
const {sendTypingOn} = require('./sendTypingOnOff');
const {sendTextMessage} = require('./sendTextMessage');
const {syncCallSendAPI} = require('./sendViaFaceBookAPI');

/*
  * @desc      Immediatly sends list of text messages to recipient
  * @param     recipientID : user's facebookId
  * @param     messages: messages to send
  * @return    void
  */
var sendBulkTextMessages = (recipientID, messages) => {
  async.eachSeries(messages, (message, callback) => {
    var messageData = {
     recipient: {
       id: recipientID
     },
     message: {
       text: message
     }
    };

    // If it's an important message, we will be waiting for answer
    if (message === 'Test?') {
     setWaiting();
    }
    console.log('Sending to API ...');
    syncCallSendAPI(messageData, callback);
  });
};

/*
  * @desc      Sends list of text messages to recipient one by one, this function will make a random delai before sending each text message
  * @param     recipientID : user's facebookId
  * @param     messages: messages to send
  * @return    void
  */
var sendBulkTextMessagesWithDelay = (recipientID, messages) => {
  async.eachSeries(messages, (message, callback) => {
    // Assuming thet the bot will be typing 3 characters per second, the delay will be:
    var delay = ( message.length / 3 ) * 1000; // in Milliseconds
    sendTypingOn(recipientID);
    setTimeout(() => {
     var messageData = {
       recipient: {
         id: recipientID
       },
       message: {
         text: message
       }
    };

    // If it's an important message, we will be waiting for answer
    // if (message === 'Test?') {
    //  setWaiting();
    // }
    syncCallSendAPI(messageData, callback);
  }, delay);
  });
};


module.exports = {
  sendBulkTextMessages,
  sendBulkTextMessagesWithDelay
};
