/*
  * @author    MITA Oumaïma, SYOUMI El Mahdi
  * @since       JULY 10, 2017
  * @desc        Handle actions
  */
const fs = require('fs');

/*
  * @desc        Get Action by it's name and language
  * @param     actionName : Action's name (String)
  * @param     lang : Language of this action (String)
  * @return      Action
  */
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
