
const fs = require('fs');

const {findMatch} = require('./../match/findMatch');
const {findExactMatch} = require('./../match/findExactMatch');
const {getAnswer} = require('./../answer/handleAnswer');

// var jsonData = fs.readFileSync('./agentAi/resources/data.json');
// var ignorable = fs.readFileSync('./agentAi/resources/ignorable.json');
//
// var data = JSON.parse(jsonData).data;

// handling input, returning action + possible answers + parameters
var handleMessage = (request) => {

  var lang  = request.lang;

  console.log('FILE NAME: ', './agentAi/resources/'+ lang + '/data.json');

  var jsonData = fs.readFileSync('./agentAi/resources/'+ lang + '/data.json');
  var ignorable = fs.readFileSync('./agentAi/resources/'+ lang + '/ignorable.json');

  var data = JSON.parse(jsonData).data;

  if (request.text) {

    //Exact Match
    var result = findExactMatch(request);

    if (result) {
      // generating random answer
      return getAnswer(result);

    } else {
      result = findMatch(request);
      if (result) {
        // generating random answer
        return getAnswer(result);

      } else {
        var unknownaction = {entry: data.find((entry) => entry.action === 'unknown-action'), params: undefined};
        return getAnswer(unknownaction);
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
