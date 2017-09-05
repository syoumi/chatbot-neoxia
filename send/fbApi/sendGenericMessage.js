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

var sendGenericMessageWithDelai = (recipientId, elements, delai) => {

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

        setTimeout(() => {
          sendTypingOn(recipientId);          
        }, 1000);

        setTimeout(() => {
          callSendAPI(messageData);
        }, delai);

}

module.exports = {
  sendGenericMessage,
  sendGenericMessageWithDelai
};
