/*
  * @author    MITA Oumaïma, SYOUMI El Mahdi
  * @since       JULY 10, 2017
  * @desc        Split message using some characters
  */
const {removePunctuation} = require('./removePunctuation');
const {isIgnorable} = require('./ignoreWords');

/*
  * @desc      Split message using some characters
  * @param     message : Message to split
  * @param     lang : language
  * @return    Array of message's words
  */
var splitMessage = (message, lang) => {
  var text = message.toLowerCase().trim();
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
