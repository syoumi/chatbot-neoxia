/**
  *
  *
  */


const {callSendAPI} = require('./sendViaFaceBookAPI');

const {sendTypingOn} = require('./sendTypingOnOff');


var sendQuickReplies= (recipientId, text, data, metadata) => {

	let replies= [];
	for (var i = 0; i < data.length; i++) {
		let reply =
		{
			"content_type": "text",
			"title": data[i],
			"payload": data[i]
		}
		replies.push(reply);
	}

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
    setTimeout(() => {callSendAPI(messageData);}, 3000);
}


module.exports = {
  sendQuickReplies
};
