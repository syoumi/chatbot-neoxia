/**
  *
  *
  */


const {callSendAPI} = require('./sendViaFaceBookAPI');

const {sendTypingOn} = require('./sendTypingOnOff');


var sendQuickReplies= (recipientId, text, replies, metadata) => {

	var messageData = {
		recipient: {
			id: recipientId
		},
		message: {
			text: text,
			metadata: (metadata)?metadata:'',
			quick_replies: replies
		}
	};

    sendTypingOn(recipientId);
    setTimeout(() => {callSendAPI(messageData);}, 5000);
}


module.exports = {
  sendQuickReplies
};
