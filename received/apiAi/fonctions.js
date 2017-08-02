/**
 *
 *
 */


const {sendButtonMessage} = require('./../../send/fbApi/sendButtonMessage');
const {sendFileMessage} = require('./../../send/fbApi/sendFileMessage');
const {sendGenericMessage} = require('./../../send/fbApi/sendGenericMessage');
const {sendImageMessage} = require('./../../send/fbApi/sendImageMessage');
const {sendQuickReply} = require('./../../send/fbApi/sendQuickReply');
const {sendTextMessage} = require('./../../send/fbApi/sendTextMessage');
//const {sendCardMessage}= require('./../../send/fbApi/sendCardMessage');

const {sendTypingOn} = require('./../../send/fbApi/sendTypingOnOff');
const {sendTypingOff} = require('./../../send/fbApi/sendTypingOnOff');


const {callSendAPI} = require('./../../send/fbApi/sendViaFaceBookAPI');


//Response API AI
var handleApiAiResponse = (sender, response) => {

	let responseText = response.result.fulfillment.speech;
	let responseData = response.result.fulfillment.data;
	let messages = response.result.fulfillment.messages;
	let action = response.result.action;
	let contexts = response.result.contexts;
	let parameters = response.result.parameters;

	sendTypingOff(sender);


	//didn't really understand this part
	//if we delete it: every quick replies (for example) sent from API AI won't be shown to user
	if ((messages) && (messages.length == 1 && messages[0].type != 0 || messages.length > 1)) {

		let timeoutInterval = 1100;
		let previousType ;
		let cardTypes = [];
		let timeout = 0;


		for (var i = 0; i < messages.length; i++) {

			/*if ( previousType == 1 && (messages[i].type != 1 || i == messages.length - 1)) {

				timeout = (i - 1) * timeoutInterval;
				setTimeout(handleCardMessages.bind(null, cardTypes, sender), timeout);
				cardTypes = [];
				timeout = i * timeoutInterval;
				setTimeout(sendCardMessage.bind(null, messages[i], sender), timeout);
			} else if ( messages[i].type == 1 && i == messages.length - 1) {
				cardTypes.push(messages[i]);
                		timeout = (i - 1) * timeoutInterval;
                		setTimeout(sendCardMessage.bind(null, cardTypes, sender), timeout);
                		cardTypes = [];
			} else if ( messages[i].type == 1 ) {
				cardTypes.push(messages[i]);
			} else {*/
				timeout = i * timeoutInterval;
				setTimeout(handleMessage.bind(null, messages[i], sender), timeout);
			//}

			previousType = messages[i].type;

		}
	}


	//If responseText is empty and there's no action
	if (responseText == '' && (!action)) {
		//api ai could not evaluate input.
		console.log('Unknown query' + response.result.resolvedQuery);
		sendTextMessage(sender, "Pouvez-vous être plus spécifique, s'il vous plaît !");
	}
	//if there's an action (reponseText can be empty or not)
	else if ((action)) {
		//if(responseText) sendTextMessage(sender, responseText);
		handleApiAiAction(sender, action, responseText, contexts, parameters);
	}
	//
	else if ((responseData) && (responseData.facebook)) {
		try {
			console.log('Response as formatted message' + responseData.facebook);
			sendTextMessage(sender, responseData.facebook);
		} catch (err) {
			sendTextMessage(sender, err.message);
		}
	}
	//if there's only responseText
	else if (responseText) {
		sendTextMessage(sender, responseText);
	}
}


//By action
var handleApiAiAction= (sender, action, responseText, contexts, parameters) => {
	switch (action) {


		case "catalogue-appart-achat":
			//sendCatalogueAppartVente(sender, responseText);
		break;
		default:
			//unhandled action, just send back the text
			sendTextMessage(sender, responseText);
	}
}



var handleMessage = (message, sender) => {

	switch (message.type) {
		case 0: //text
			sendTextMessage(sender, message.speech);
			break;
		case 1: //card
			//sendCardMessage(message, sender);
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
			sendQuickReply(sender, message.title, replies);
			break;
		case 3: //image
			sendImageMessage(sender, message.imageUrl);
			break;
		//Still have problem here
		case 4:
			// custom payload
			var messageData = {
				recipient: {
					id: sender
				},
				message: message.payload.facebook

			};

			callSendAPI(messageData);

			break;
	}
}




module.exports={
    handleApiAiAction, handleApiAiResponse, handleMessage, handleCardMessages
}
