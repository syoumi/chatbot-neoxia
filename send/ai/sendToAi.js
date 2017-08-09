
const {receiveMessage} = require('./../../agentAi/agent');

const {handleAiResponse} = require('./../../received/ai/handleAiResponse');


var sendToAi = (messageText) => {
	var request = {
		senderID: senderID,
		text : messageText
	}

	var answer = receiveMessage(request);
	handleAiResponse(answer.recipientID, answer);
}


module.exports={
    sendToAi
}
