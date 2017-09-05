/**
  *
  *
  */

const {callSendAPI} = require('./sendViaFaceBookAPI');

const {sendTypingOn} = require('./sendTypingOnOff');


var sendGenericMessage= (recipientId, elements)=> {

      var messageData = {
        recipient: {
          id: recipientId
        },
        message: {
          attachment: {
            type: "template",
            payload: {
              template_type: "generic",
              elements: elements
            }
          }
        }
      };

      sendTypingOn(recipientId);
      setTimeout(() => {callSendAPI(messageData);}, 3000);

};

module.exports = {
  sendGenericMessage
};
