
const {getContext} = require('./functions/handleContext');
const {setContext} = require('./functions/handleContext');
const {cleanContext} = require('./functions/handleContext');
const {getParameters} = require('./functions/handleContext');
const {saveUndefinedAnswer} = require('./functions/saveUndefinedAnswer');
const {handleMessage} = require('./functions/handleMessage');
const {handleContextMessage} = require('./functions/handleMessage');
const {getEntry} = require('./functions/handleAnswer');
const {getAnswer} = require('./functions/handleAnswer');
const {verifyParam} = require('./functions/handleParams');
const {getCurrentParameter} = require('./functions/handleContext');


var receiveMessage = (request) => {
  console.log(`Received message from ${request.senderID}, content ${request.text}`);
  var answer = undefined;
  var originalText = request.text;
  //Check if there's a context for that user
  var context = getContext(request.senderID);

  if(context){
    console.log('HandleContextMessage');

    var current = getCurrentParameter(request.senderID);
    if(current){
        request.text = "#" + current + "#";

        console.log('MUST LOOK FOR CURRENT PARAM: ', request.text);
    }

    //Looking for an answer with answer.context.id
    answer = handleContextMessage(request, context);
  }

  if(!answer){
      console.log('HandleMessage');

      //Looking for an answer
      answer = handleMessage(request);

      // if this is unknown message, save the message in json file
      if(answer.action === 'unknown-action') {
        saveUndefinedAnswer(request.text);
      } else {
        // console.log(`Answer: ${answer.answer}`);

        if(context){
          if(context.output != answer.context.input){
            //if user's out of context
            cleanContext(request.senderID);
            answer = getAnswer(getEntry('out-of-context'));
          }
        } else {
          if (answer.context.input) {
            //if user's out of context
            answer = getAnswer(getEntry('out-of-context'));
          }
        }
    }
  }

  //if answer got an output
  if(answer.context.output){

    if( (context) && (current) ){
      var param = verifyParam(answer.parameters[answer.parameters.length-1].type, originalText);
      if(param) {
        answer.parameters[answer.parameters.length-1].value = param;
        console.log('Param to push: ', param);
      }
    }

    console.log('NEEEXT: ', answer.next);

    setContext(request.senderID, answer.context, answer.parameters[answer.parameters.length-1], answer.next);
  }

  //Update answer's parameters
  answer.parameters = getParameters(request.senderID);

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
