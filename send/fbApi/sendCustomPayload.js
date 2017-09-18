/*
  * @author    MITA Oumaïma, SYOUMI El Mahdi
  * @since       JULY 10, 2017
  * @desc        All the logic for sending custom playload 
  */
const {callSendAPI} = require('./../../send/fbApi/sendViaFaceBookAPI');

/*
  * @desc      Handle AgentAI's Response
  * @param     recipientID : user's facebookId
  * @param     message: message to send
  * @return    void
  */
var sendCustomPayload = (recipientID, message) => {
  var messageData = {
    recipient: {
      id: recipientID
    },
    message: message.payload.facebook
  };

  setTimeout(() => {callSendAPI(messageData);}, 3000);
};


module.exports={
    sendCustomPayload
};
