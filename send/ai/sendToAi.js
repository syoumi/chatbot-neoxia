
const {receiveMessage} = require('./../../agentAi/agent');

const {handleAiResponse} = require('./../../received/ai/handleAiResponse');


var sendToAi = (senderID, messageText) => {
	var request = {
		senderID: senderID,
		text : messageText
	}

	var answer = receiveMessage(request);
	handleAiResponse(answer.recipientID, answer);

	console.log('Request is ' , request);
	console.log('Answer is ' , answer);
}


module.exports={
    sendToAi
}
