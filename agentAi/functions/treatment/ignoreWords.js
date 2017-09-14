const fs = require('fs');


var isIgnorable = (word, lang) => {
  var ignorable = fs.readFileSync('./agentAi/resources/' + lang + '/ignorable.json');
  var ignorableWords = JSON.parse(ignorable).words;

  return (ignorableWords.indexOf(word) != -1);
};

module.exports = {
  isIgnorable
};
