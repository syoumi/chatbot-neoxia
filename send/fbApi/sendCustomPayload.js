/**
  *
  *
  */

const {callSendAPI} = require('./../../send/fbApi/sendViaFaceBookAPI');

const {sendTypingOn} = require('./../../send/fbApi/sendTypingOnOff');


var sendCustomPayload = (senderID, message){
  var messageData = {
    recipient: {
      id: senderID
    },
    message: message.payload.facebook
  };

  setTimeout(() => {callSendAPI(messageData);}, 3000);
}


module.exports={
    sendCustomPayload
}
