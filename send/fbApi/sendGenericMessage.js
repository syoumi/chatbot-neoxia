/*
  * @author    MITA Oumaïma, SYOUMI El Mahdi
  * @since       JULY 10, 2017
  * @desc        All the logic for sending generic message
  */
const {callSendAPI} = require('./sendViaFaceBookAPI');

const {sendTypingOn} = require('./sendTypingOnOff');

/*
  * @desc      Send generic message
  * @param     recipientID : user's facebookId
  * @param     elements: Elements to send (contains photo and buttons)
  * @return    void
  */
var sendGenericMessage= (recipientId, elements)=> {
  var messageData = {
    recipient : {
    id: recipientId
    },
    message : {
      attachment: {
        type : "template",
        payload : {
          template_type : "generic",
          elements : elements
        }
      }
    }
  };
  sendTypingOn(recipientId);
  setTimeout(() => {callSendAPI(messageData);}, 3000);
};

/*
  * @desc      Send generic message with long delay
  * @param     recipientID : user's facebookId
  * @param     elements: Elements to send (contains photo and buttons)
  * @param     delay: delay to wait before sending
  * @return    void
  */
var sendGenericMessageWithDelay = (recipientId, elements, delay) => {
  var messageData = {
    recipient : {
    id: recipientId
    },
    message : {
      attachment: {
        type : "template",
        payload : {
          template_type : "generic",
          elements : elements
        }
      }
    }
  };
  setTimeout(() => {
    sendTypingOn(recipientId);
  }, 1000);
  setTimeout(() => {
    callSendAPI(messageData);
  }, delay);
};


module.exports = {
  sendGenericMessage,
  sendGenericMessageWithDelay
};
