/**
  *
  *
  */


//apiai: plugin allows integrating agents from the Api.ai natural language processing service with
//Node.js application.
const apiai = require('apiai');

//A universal unique identifier (UUID) is a standard of generating identifiers
const uuid= require('uuid');

const {API_AI_CLIENT_ACCESS_TOKEN} = require('./../../include/config');

const {handleApiAiResponse} = require('./../../received/apiAi/fonctions');


var sessionIds = new Map();


//Get/Build the app (API AI)
//For non-english agent: must mention language
const apiAiService = apiai(API_AI_CLIENT_ACCESS_TOKEN, {
	language: "fr",
	requestSource: "fb"
});


//Make a Request to API AI
//Send to Api.AI ID of sender (session ID) and text query.
var sendToApiAi = (sender, text) => {

	//Add sender to sessionIds if doesn't exist
	if (!sessionIds.has(sender)) {
		//uuid.v1: Generate a v1 (timestamp-based) ID.
		sessionIds.set(sender, uuid.v1());
	}

    //Request
	let apiaiRequest = apiAiService.textRequest(text, {
        sessionId: sessionIds.get(sender)
	});

	//Wait for response, once it's received ---> handle it
	apiaiRequest.on('response', (response) => {
		if (response.result) {
			handleApiAiResponse(sender, response);
		}
	});

	apiaiRequest.on('error', (error) => console.error(error));
	apiaiRequest.end();
}


module.exports={
    sendToApiAi
}
