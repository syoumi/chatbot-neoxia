/**
 *
 */


const {callSendAPI} = require('./sendViaFaceBookAPI');


var sendImageMessage= (recipientId, imageUrl)=> {

	var messageData = {
		recipient: {
			id: recipientId
		},
		message: {
			attachment: {
				type: "image",
				payload: {
					url: imageUrl
				}
			}
		}
	};

	sendTypingOn(recipientId);
	setTimeout(() => {callSendAPI(messageData);}, 3000);
}



module.exports = {
  sendImageMessage
};
