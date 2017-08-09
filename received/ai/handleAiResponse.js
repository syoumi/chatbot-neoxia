
const {handleAiAction} = require('./handleAiAction');

const {sendTextMessage} = require('./../../send/fbApi/sendTextMessage');
const {sendTypingOff} = require('./../../send/fbApi/sendTypingOnOff');



var handleAiResponse = (senderID, answer) => {

  sendTypingOff(senderID);

	if (answer.action === 'unknown-action') {
		sendTextMessage(senderID, answer.answer);
	}
	else {
    handleAiAction(senderID, answer);
  }

}



module.exports={
  handleAiResponse
}
