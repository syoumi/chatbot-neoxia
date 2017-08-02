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


//By action
var handleApiAiAction= (senderID, action, responseText, contexts, parameters) => {
	switch (action) {

		case "catalogue-appart-achat":
			//sendCatalogueAppartVente(senderID, responseText);
		break;

		default:
			//unhandled action, just send back the text
			sendTextMessage(senderID, responseText);
	}
}


module.exports={
    handleApiAiAction
}
