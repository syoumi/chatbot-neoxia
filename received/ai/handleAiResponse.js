
const {handleAiAction} = require('./handleAiAction');

const {sendTextMessage} = require('./../../send/fbApi/sendTextMessage');
const {sendTypingOff} = require('./../../send/fbApi/sendTypingOnOff');

const {addLead} = require('./../../data/salesforce/handleLeads');


var handleAiResponse = (senderID, answer, lang) => {

  sendTypingOff(senderID);

  //Add User as lead if he doesn't exist or he isn't a contact
  addLead(senderID);

	if (answer.action === 'unknown-action') {
		sendTextMessage(senderID, answer.answer);
	}
	else {
    handleAiAction(senderID, answer, lang);
  }

}



module.exports={
  handleAiResponse
}
