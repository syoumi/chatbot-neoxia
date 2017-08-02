/**
 *
 *
 */

// const {sendGenericMessage} = require('./../../send/fbApi/sendGenericMessage');
const {sendTextMessage} = require('./../../send/fbApi/sendTextMessage');
const {sendTextMessageWithDelai} = require('./../../send/fbApi/sendTextMessage');
// const {sendQuickReplies} = require('./../../send/fbApi/sendQuickReplies');
const {sendTypingOn} = require('./../../send/fbApi/sendTypingOnOff');
const {sendTypingOff} = require('./../../send/fbApi/sendTypingOnOff');
// const {sendPictureMessage} = require('./../../send/fbApi/sendPictureMessage');
const {sendBulkTextMessages} = require('./../../send/fbApi/sendBulkTextMessages');

// const {getUserInfos} = require('./../../utils/getUserInfos');
const {getWaiting} = require('./../../utils/waiting');

// const {getAllAccounts} = require('./../../data/salesforce/getAllAccounts');
const {getLastAccounts} = require('./../../data/salesforce/getLastAccounts');

/**
 *
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

    switch (messageText) {
    //  case 'generic':
     //
    //    sendGenericMessage(senderID);
    //    break;
     //
    //  case 'QCM':
     //
    //    var choices = [
    //      {
    //        content_type: 'text',
    //        title: 'Nice',
    //        payload: 'NICE_CUSTOM_POSTBACK'
    //      },
    //      {
    //        content_type: 'text',
    //        title: 'Not bad',
    //        payload: 'NOT_BAD_CUSTOM_POSTBACK'
    //      },
    //      {
    //        content_type: 'text',
    //        title: 'Not nice',
    //        payload: 'NOT_NICE_CUSTOM_POSTBACK'
    //      }
    //    ];
     //
    //    sendQuickReplies(senderID, choices);
     //
    //    break;
     //
    //  case 'Tu me connais?':
     //
    //    sendTextMessage(senderID, 'Je pense que oui ...');
     //
    //    setTimeout(function () {
    //      sendTypingOn(senderID);
    //    }, 1000);
     //
    //    setTimeout(function () {
    //      getUserInfos(senderID, (fname, lname, ppicture, locale) => {
    //        sendTextMessage(senderID, `Vous êtes ${fname} ${lname}`);
    //        sendPictureMessage(senderID, ppicture);
    //      });
    //    }, 3000);
     //
    //    break;
     //
    //  case 'login':
    //    getAllAccounts(senderID);
    //    break;

     case 'last accounts':
       getLastAccounts(senderID);
       break;

     default:

       sendTextMessageWithDelai(senderID, messageText);
       break;
   }
  } else if (messageAttachments) {

   sendTextMessage(senderID, 'Pièce jointe bien reçue <3 ^_^ !');
  }

};

module.exports = {
  receivedMessage
}
