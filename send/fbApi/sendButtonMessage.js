/*
  * @author    MITA Oumaïma, SYOUMI El Mahdi
  * @since       JULY 10, 2017
  * @desc        All the logic for sending button message
  */
const {callSendAPI} = require('./sendViaFaceBookAPI');

/*
  * @desc      Send button message to user
  * @param     recipicientID : user's facebookId
  * @param     text: text send to user with button
  * @param     buttons: buttons to send
  * @return    void
  */
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
};


module.exports = {
  sendButtonMessage
};
