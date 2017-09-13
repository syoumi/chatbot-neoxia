const fs = require('fs');

var getAnswer = (result, lang) => {

  var jsonData = fs.readFileSync('./agentAi/resources/' + lang + '/data.json');

  var data = JSON.parse(jsonData).data;

  // generating random index
  var index = parseInt(Math.random() * result.entry.answers.length);
  return {
    action: result.entry.action,
    parameters: result.params,
    answer: result.entry.answers[index]
  };
};

module.exports= {
  getAnswer
}
