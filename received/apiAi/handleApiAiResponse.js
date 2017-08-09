/**
 *
 *
 */

const {handleApiAiAction} = require('./handleApiAiAction');
const {handleMessage} = require('./handleMessage');

const {sendTextMessage} = require('./../../send/fbApi/sendTextMessage');
const {sendTypingOff} = require('./../../send/fbApi/sendTypingOnOff');

//Response API AI
var handleApiAiResponse = (senderID, response) => {

	let responseText = response.result.fulfillment.speech;
	let responseData = response.result.fulfillment.data;
	let messages = response.result.fulfillment.messages;
	let action = response.result.action;
	let contexts = response.result.contexts;
	let parameters = response.result.parameters;

	sendTypingOff(senderID);


	//If there's messages
	if ((messages) && (messages.length == 1 && messages[0].type != 0 || messages.length > 1)) {

		for (var i = 0; i < messages.length; i++) {
				handleMessage(messages[i], senderID);
		}
	}


	//If responseText is empty and there's no action
	if (responseText == '' && (!action)) {
		//api ai could not evaluate input.
		console.log('Unknown query' + response.result.resolvedQuery);
		sendTextMessage(senderID, "Pouvez-vous être plus spécifique, s'il vous plaît !");
	}
	//if there's an action (reponseText can be empty or not)
	else if ((action)) {
		//if(responseText) sendTextMessage(senderID, responseText);
		handleApiAiAction(senderID, action, responseText, contexts, parameters);
	}
	//
	else if ((responseData) && (responseData.facebook)) {
		try {
			console.log('Response as formatted message' + responseData.facebook);
			sendTextMessage(senderID, responseData.facebook);
		} catch (err) {
			sendTextMessage(senderID, err.message);
		}
	}
	//if there's only responseText
	else if (responseText) {
		sendTextMessage(senderID, responseText);
	}
}

module.exports={
  handleApiAiResponse
}
