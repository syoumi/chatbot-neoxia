/*
  * @author    MITA Oumaïma, SYOUMI El Mahdi
  * @since       JULY 10, 2017
  * @desc        All the logic for sending quick replies 
  */
const {callSendAPI} = require('./sendViaFaceBookAPI');

const {sendTypingOn} = require('./sendTypingOnOff');

/*
  * @desc      Send quick replies to user
  * @param     recipientID : user's facebookId
  * @param     text: Text to send with quick replies
  * @param     data : replies
  * @param     metadata : metadata
  * @return    void
  */
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
};


module.exports = {
  sendQuickReplies
};
