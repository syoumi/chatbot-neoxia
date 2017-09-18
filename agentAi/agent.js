/*
  * @author    MITA Oumaïma, SYOUMI El Mahdi
  * @since       JULY 10, 2017
  * @desc        Agent (orchestre) that receives user's message and returns an answer
  */
const {saveUndefinedAnswer} = require('./functions/message/saveUndefinedAnswer');
const {handleMessage} = require('./functions/message/handleMessage');
const {findSpecificMatch} = require('./functions/match/findSpecificMatch');
const {lookForSpecificActions} = require('./functions/action/lookForSpecificActions');
const {setUser} = require('./functions/user/handleUser');
const {getUser} = require('./functions/user/handleUser');
const {removeParams} = require('./functions/user/handleUser');
const {getAnswer} = require('./functions/answer/handleAnswer');

/*
  * @desc      Receive user's message
  * @param     request :contains SenderID, text and language
  * @return    Answer :   contains recipientID, action, answer and parameters
  */
var receiveMessage = (request) => {
  console.log(`Received message from ${request.senderID}, content ${request.text}, language ${request.lang}`);

  var answer = undefined;

  var specificActions = lookForSpecificActions(request.senderID, request.lang);
  if (specificActions && specificActions.length != 0) {
    var result = findSpecificMatch(request, specificActions);
    answer = (result) ? getAnswer(result, request.lang) : undefined;
  }

  if (!answer) {
    // Looking for a std answer
    answer = handleMessage(request);
    //if (answer.answer) {}
  }

  // if this is unknown message, save the message in json file
  if(answer.action === 'unknown-action') {
    saveUndefinedAnswer(request.text);
  } else {
    //console.log(`SET USER; Answer: ${answer.answer}`);
    var user = getUser(request.senderID);
    if(user && specificActions.indexOf(answer.action)<0){
      removeParams(user);
    }

    setUser(request.senderID, answer.action, answer.parameters);

    if(getUser(request.senderID)){
      answer.parameters = getUser(request.senderID).parameters;
    }
  }

  // Update answer's parameters
  // answer.parameters = getParameters(request.senderID);
  console.log('USER OBJECT: ' , getUser(request.senderID));
  var response = sendAnswer(request.senderID, answer);
  return response;
};

/*
  * @desc      Send custom answer
  * @param     recipientID : recipientID
  * @param     answer: result of matching
  * @return    Answer :   contains recipientID, action, answer and parameters
  */
var sendAnswer = (recipientID, answer) => {
  var toSend = {
    recipientID,
    action: answer.action,
    answer: answer.answer,
    parameters: answer.parameters
  };
  return toSend;
};

module.exports = {
  receiveMessage
};
