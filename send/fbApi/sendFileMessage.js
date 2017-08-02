const {callSendAPI} = require('./sendViaFaceBookAPI');


var sendFileMessage= (recipientId, fileName) => {
  
	var messageData = {
		recipient: {
			id: recipientId
		},
		message: {
			attachment: {
				type: "file",
				payload: {
					url: fileName
				}
			}
		}
	};

	setTimeout(() => {callSendAPI(messageData);}, 3000);
}


module.exports = {
  sendFileMessage
};
