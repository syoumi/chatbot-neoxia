/**
 *
 */

const {callSendAPI} = require('./sendViaFaceBookAPI');


var sendButtonMessage= (recipientId, text, buttons) => {

	var messageData = {
		recipient: {
			id: recipientId
		},
		message: {
			attachment: {
				type: "template",
				payload: {
					template_type: "button",
					text: text,
					buttons: buttons
				}
			}
		}
	};

	 setTimeout(() => {callSendAPI(messageData);}, 6000);
}






module.exports = {
  sendButtonMessage
};
