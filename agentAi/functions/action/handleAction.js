const fs = require('fs');

var getAction = (actionName, lang) => {

  var jsonData = fs.readFileSync('./agentAi/resources/' + lang + '/data.json');

  var data = JSON.parse(jsonData).data;

  var toReturn = data.find((item) => {
    if (item.action == actionName) return true;
    return false;
  });
  return toReturn;
};

module.exports = {
  getAction
};
