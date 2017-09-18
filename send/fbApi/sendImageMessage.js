/*
  * @author    MITA Oumaïma, SYOUMI El Mahdi
  * @since       JULY 10, 2017
  * @desc       All the logic for sending image message
  */
const {callSendAPI} = require('./sendViaFaceBookAPI');

/*
  * @desc      Send Image message
	* @param     recipientID : user's facebookId
  * @param     imageUrl : image's url
  * @return    void
  */
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
};


module.exports = {
  sendImageMessage
};
