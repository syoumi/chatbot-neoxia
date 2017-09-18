/*
  * @author    MITA Oumaïma, SYOUMI El Mahdi
  * @since       JULY 10, 2017
  * @desc        Find out if a word must be ignored
  */
const fs = require('fs');

/*
  * @desc      Find out if a word must be ignored
  * @param     word : word from user's text
  * @param     lang : language
  * @return    Boolean
  */
var isIgnorable = (word, lang) => {
  var ignorable = fs.readFileSync('./agentAi/resources/' + lang + '/ignorable.json');
  var ignorableWords = JSON.parse(ignorable).words;

  return (ignorableWords.indexOf(word) != -1);
};

module.exports = {
  isIgnorable
};
