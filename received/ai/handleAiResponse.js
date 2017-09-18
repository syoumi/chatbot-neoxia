/*
  * @author    MITA Oumaïma, SYOUMI El Mahdi
  * @since       JULY 10, 2017
  * @desc       Handle AgentAI's Response
  */
const {handleAiAction} = require('./handleAiAction');

const {sendTextMessage} = require('./../../send/fbApi/sendTextMessage');
const {sendTypingOff} = require('./../../send/fbApi/sendTypingOnOff');

const {addLead} = require('./../../data/salesforce/handleLeads');

/*
  * @desc      Handle AgentAI's Response
  * @param     senderID : user's facebookId
  * @param     answer: AgentAI's answer
  * @param     lang : language
  * @return    void
  */
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
};



module.exports={
  handleAiResponse
};
