const {removePunctuation} = require('./removePunctuation');
const {isIgnorable} = require('./ignoreWords');

var splitMessage = (str, lang) => {
  var text = str.toLowerCase().trim();
  var wordsTab = text.split(/[ ,;.+:]+/);

  for (var i = 0; i < wordsTab.length; i++) {
    wordsTab[i] = removePunctuation(wordsTab[i]);
  }

  var words = wordsTab.filter((element) => {
    return element != '' && !(isIgnorable(element, lang));
  });

  return words;
};

module.exports = {
  splitMessage
};
