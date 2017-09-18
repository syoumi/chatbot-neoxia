/*
  * @author    MITA Oumaïma, SYOUMI El Mahdi
  * @since       JULY 10, 2017
  * @desc        Handle answer
  */
const fs = require('fs');

/*
  * @desc      Get random answer from result of matching
  * @param     result : Result of matching that contains Entry and Params 
  * @param     lang : Language  (String)
  * @return    Answer
  */
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
