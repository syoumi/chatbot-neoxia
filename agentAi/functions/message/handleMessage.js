
const fs = require('fs');

const {findMatch} = require('./../match/findMatch');
const {findExactMatch} = require('./../match/findExactMatch');
const {getAnswer} = require('./../answer/handleAnswer');


// handling input, returning action + possible answers + parameters
var handleMessage = (request) => {

  var lang  = request.lang;

  var jsonData = fs.readFileSync('./agentAi/resources/'+ lang + '/data.json');
  var ignorable = fs.readFileSync('./agentAi/resources/'+ lang + '/ignorable.json');

  var data = JSON.parse(jsonData).data;

  if (request.text) {

    //Exact Match
    var result = findExactMatch(request);

    if (result) {
      // generating random answer
      return getAnswer(result, lang);

    } else {
      result = findMatch(request);
      if (result) {
        // generating random answer
        return getAnswer(result, lang);

      } else {
        var unknownaction = {entry: data.find((entry) => entry.action === 'unknown-action'), params: undefined};
        return getAnswer(unknownaction, lang);
      }
    }
  } else {
    console.log('no text');
    return undefined;
  }
};

module.exports = {
  handleMessage
};
