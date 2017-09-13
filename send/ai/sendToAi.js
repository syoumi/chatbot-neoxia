
const {receiveMessage} = require('./../../agentAi/agent');

const {handleAiResponse} = require('./../../received/ai/handleAiResponse');

const {getLead} = require('./../../data/salesforce/handleLeads')

var sendToAi = (senderID, messageText) => {

	var lang = 'fr';

	getLead(senderID, (lead) => {

		if(lead && lead.Language__c != '') {
			lang = lead.Language__c;
		}

		var request = {
			senderID: senderID,
			text : messageText,
			lang
		}

		var answer = receiveMessage(request);

		console.log('Request is ' , request);
		console.log('Answer is ' , answer);


		handleAiResponse(answer.recipientID, answer);

	});


}


module.exports={
    sendToAi
}
