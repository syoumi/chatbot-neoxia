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
      var delai = 100 * textMessage.length;
      setTimeout(() => {callSendAPI(messageData);}, delai);

};

module.exports = {
  sendGenericMessage
};
