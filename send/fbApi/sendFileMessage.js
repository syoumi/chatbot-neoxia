/*
  * @author    MITA Oumaïma, SYOUMI El Mahdi
  * @since       JULY 10, 2017
  * @desc      All the logic for sending file 
  */
const {callSendAPI} = require('./sendViaFaceBookAPI');

/*
  * @desc      Send file to user
  * @param     recipientID : user's facebookId
  * @param     fileUrl : file's url
  * @return    void
  */
var sendFileMessage= (recipientId, fileUrl) => {
	var messageData = {
		recipient: {
			id: recipientId
		},
		message: {
			attachment: {
				type: "file",
				payload: {
					url: fileUrl
				}
			}
		}
	};
	setTimeout(() => {callSendAPI(messageData);}, 3000);
};


module.exports = {
  sendFileMessage
};
