
const {receiveMessage} = require('./../../agentAi/agent');

const {handleAiResponse} = require('./../../received/ai/handleAiResponse');


var sendToAi = (senderID, messageText) => {
	var request = {
		senderID: senderID,
		text : messageText
	}

	var answer = receiveMessage(request);

	console.log('Request is ' , request);
	console.log('Answer is ' , answer);

	
	handleAiResponse(answer.recipientID, answer);


}


module.exports={
    sendToAi
}
