//TODO ./functions/findExactMatch integrating parameters

const {saveUndefinedAnswer} = require('./functions/message/saveUndefinedAnswer');
const {handleMessage} = require('./functions/message/handleMessage');
const {findSpecificMatch} = require('./functions/match/findSpecificMatch');
const {lookForSpecificActions} = require('./functions/action/lookForSpecificActions');
const {setUser} = require('./functions/user/handleUser');
const {getUser} = require('./functions/user/handleUser');
const {removeParams} = require('./functions/user/handleUser');
const {getAnswer} = require('./functions/answer/handleAnswer');


var receiveMessage = (request) => {

  console.log(`Received message from ${request.senderID}, content ${request.text}`);
  var answer = undefined;
  var specificActions = lookForSpecificActions(request.senderID);
  if (specificActions && specificActions.length != 0) {
    var result = findSpecificMatch(request, specificActions);
    answer = (result) ? getAnswer(result) : undefined;
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

var sendAnswer = (recipientID, answer) => {
  var toSend = {
    recipientID,
    action: answer.action,
    answer: answer.answer,
    parameters: answer.parameters
  };
  return toSend;
}

module.exports = {
  receiveMessage
}
