const fs = require('fs');

var jsonData = fs.readFileSync('./agentAi/resources/data.json');

var data = JSON.parse(jsonData).data;



var getAnswer = (entry) => {
  // generating random index
  var index = parseInt(Math.random() * entry.answers.length);
  return {
    action: entry.action,
    context: entry.context,
    parameters: [
      {
        "name" : entry.parameters.name,
        "type" : entry.parameters.type,
        "value" : ''
      }
    ],
    next : entry.parameters.next,
    answer: entry.answers[index]
  };
};

var getEntry = (actionName) => {
  var toReturn = data.find((item) => {
    if (item.action == actionName) return true;
    return false;
  });
  console.log('RETURNIIIIING ' , toReturn);
  return toReturn;
};

module.exports= {
  getAnswer,
  getEntry
}
