
const fs = require('fs');

const {findMatch} = require('./../match/findMatch');
const {findExactMatch} = require('./../match/findExactMatch');
const {getAnswer} = require('./../answer/handleAnswer');


// handling input, returning action + possible answers + parameters
var handleMessage = (request) => {


  var jsonData = fs.readFileSync('./agentAi/resources/'+ request.lang + '/data.json');
  var ignorable = fs.readFileSync('./agentAi/resources/'+ request.lang + '/ignorable.json');

  var data = JSON.parse(jsonData).data;

  if (request.text) {

    //Exact Match
    var result = findExactMatch(request);

    console.log("RESULT FIND EXACT MATCH: ", result);
    
    if (result) {
      // generating random answer
      return getAnswer(result, request.lang);

    } else {
      result = findMatch(request);
      if (result) {
        // generating random answer
        return getAnswer(result, request.lang);

      } else {
        var unknownaction = {entry: data.find((entry) => entry.action === 'unknown-action'), params: undefined};
        return getAnswer(unknownaction, request.lang);
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
