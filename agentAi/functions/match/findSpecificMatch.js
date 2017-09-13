const fs = require('fs');

const {checkEquality} = require('./checkEquality');
const {removePunctuation} = require('./../treatment/removePunctuation');
const {wordsFound} = require('./wordsFound');
const {getDistinct} = require('./getDistinct');
const {getPercent} = require('./getPercent');
const {isIgnorable} = require('./../treatment/ignoreWords');
const {getUser} = require('./../user/handleUser');
const {getAction} = require('./../action/handleAction');

const {MIN_STEP_TWO_PERCENT} = require('./../../include/config');
const {MIN_STEP_THREE_PERCENT} = require('./../../include/config');



//Find match context: looking for intent that matchs text
var findSpecificMatch = (request, actions) => {

  var jsonData = fs.readFileSync('./agentAi/resources/' + request.lang + '/data.json');
  var ignorable = fs.readFileSync('./agentAi/resources/' + request.lang +'/ignorable.json');

  var data = JSON.parse(jsonData).data;

  var user = getUser(request.senderID);
  console.log('COUNTER ' , user.counter);

  var intents = [];
  // getting all the specific intents to look in
  for(var i = 0; i < actions.length; i++){
    intents.push(getAction(actions[i], request.lang));
  };

  var maxActionPercent = 0;
  var maxActionIndex = 0;
  var params = [];

  for (var i = 0; i < intents.length; i++) {
    var maxEntryPercent = 0;
    var intent = intents[i];
    for (var j = 0; j < intent.keywords.length; j++) {
      var result = wordsFound(request.text.toLowerCase(), intent.keywords[j], intent.hasParam, request.lang);
      var percent = result.percent;
      if (percent > maxEntryPercent) {
        maxEntryPercent = percent;
      }
    }

    if (maxEntryPercent > maxActionPercent) {
      maxActionPercent = maxEntryPercent;
      maxActionIndex = i;
      params = result.params;
    }
  }

  // console.log(`CONTEXT STEP TWO RESULT : Action ${data[maxActionIndex].action} , percent ${maxActionPercent}`);

  if (maxActionPercent >= MIN_STEP_TWO_PERCENT) {
    user.counter = 2;
    return {entry: intents[maxActionIndex], params};

  }
  else {
    // If percentage is not enough use next method
    var maxPercent = 0;
    var maxIndex = 0;
    var params = [];

    for (var i = 0; i < intents.length; i++) {
      var intent = intents[i];
      var distincts = getDistinct(intent.keywords, request.lang);
      var result = getPercent(request.text, distincts, intent.hasParam, request.lang);
      console.log('RESULT: ', result);
      var percent = result.percent;
      if (percent > maxPercent) {
        maxPercent = percent;
        maxIndex = i;
        params = result.params;
      }
    }


    if(maxPercent >= MIN_STEP_THREE_PERCENT){
      user.counter = 2;
      return {entry: intents[maxIndex], params};
    } else {
      user.counter--;
      if (user.counter == 0) {
        user.counter = 2;
        user.previousAction = '';

        return undefined;
      } else {
        return undefined;
      }
    }
  }
}

module.exports = {
  findSpecificMatch
}
