const fs = require('fs');

var jsonData = fs.readFileSync('./agentAi/resources/data.json');

var data = JSON.parse(jsonData).data;



var getAnswer = (entry) => {
  // generating random index
  var index = parseInt(Math.random() * entry.answers.length);
  return {
    action: entry.action,
    context:
    {
      "id": entry.context.id,
      "input": entry.context.input,
      "output": entry.context.output
    },
    parameters: entry.parameters,
    answer: entry.answers[index]
  };
};

var getEntry = (actionName) => {
  var toReturn = data.find((item) => item.action = actionName);
  console.log('RETURNIIIIING ' , toReturn);
  return toReturn;
};

module.exports= {
  getAnswer,
  getEntry
}
