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
      elements.foreach((element)=> {
        console.log("ELEMENT: ", element.title);
      });
      sendTypingOn(recipientId);
      setTimeout(() => {callSendAPI(messageData);}, 1000);

};

module.exports = {
  sendGenericMessage
};
