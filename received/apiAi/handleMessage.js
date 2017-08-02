/**
  *
  *
  */

const {sendButtonMessage} = require('./../../send/fbApi/sendButtonMessage');
const {sendFileMessage} = require('./../../send/fbApi/sendFileMessage');
const {sendGenericMessage} = require('./../../send/fbApi/sendGenericMessage');
const {sendImageMessage} = require('./../../send/fbApi/sendImageMessage');
const {sendQuickReplies} = require('./../../send/fbApi/sendQuickReplies');
const {sendTextMessage} = require('./../../send/fbApi/sendTextMessage');
//const {sendCardMessage}= require('./../../send/fbApi/sendCardMessage');

const {sendTypingOn} = require('./../../send/fbApi/sendTypingOnOff');
const {sendTypingOff} = require('./../../send/fbApi/sendTypingOnOff');


const {callSendAPI} = require('./../../send/fbApi/sendViaFaceBookAPI');


  var handleMessage = (message, senderID) => {

  	switch (message.type) {
  		case 0: //text
  			sendTextMessage(senderID, message.speech);
  			break;
  		case 1: //card
  			//sendCardMessage(message, senderID);
  			break;
  		case 2: //quick replies
  			let replies = [];
  			for (var b = 0; b < message.replies.length; b++) {
  				let reply =
  				{
  					"content_type": "text",
  					"title": message.replies[b],
  					"payload": message.replies[b]
  				}
  				replies.push(reply);
  			}
  			sendQuickReply(senderID, message.title, replies);
  			break;
  		case 3: //image
  			sendImageMessage(senderID, message.imageUrl);
  			break;
  		//Still have problem here
  		case 4:
  			// custom payload
  			var messageData = {
  				recipient: {
  					id: senderID
  				},
  				message: message.payload.facebook

  			};

  			callSendAPI(messageData);

  			break;
  	}
  }


  module.exports={
       handleMessage
  }
