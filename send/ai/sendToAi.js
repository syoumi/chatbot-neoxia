/*
  * @author    MITA Oumaïma, SYOUMI El Mahdi
  * @since       JULY 10, 2017
  * @desc       Send message to Agent AI
  */
const {receiveMessage} = require('./../../agentAi/agent');

const {handleAiResponse} = require('./../../received/ai/handleAiResponse');

const {getLead} = require('./../../data/salesforce/handleLeads');

const {getContact} = require('./../../data/salesforce/handleContacts');
/*
  * @desc      Send message to Agent AI
  * @param     senderID : user's facebookId
  * @param     messageText: user's message
  * @return    void
  */
var sendToAi = (senderID, messageText) => {
	var lang = 'fr';

	//Get lead or contact's language; Default language is french
	getLead(senderID, (lead) => {
		getContact(senderID, (contact) => {
			if(contact && contact.Language__c){
				lang = contact.Language__c;
			}
			else if(lead && lead.Language__c) {
				lang = lead.Language__c;
			}

			console.log('LANGUAGE: ', lang);

			var request = {
				senderID,
				text : messageText,
				lang
			}

			var answer = receiveMessage(request);

			console.log('Request is ' , request);
			console.log('Answer is ' , answer);

			handleAiResponse(answer.recipientID, answer, lang);
		});
	});
};


module.exports={
    sendToAi
};
