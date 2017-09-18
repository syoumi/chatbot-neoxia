/*
  * @author    MITA Oumaïma, SYOUMI El Mahdi
  * @since       JULY 10, 2017
  * @desc       Handle predefined answers from Agent AI
  */
const fs = require('fs');

/*
  * @desc      Get predefined answer
  * @param     lang : language
  * @param     title : Answer's title
  * @param     param : parameter's value
  * @return    predefined answer's text
  */
var getText = (lang, title, param) => {
  var jsonData = fs.readFileSync('./agentAi/resources/' + lang + '/predefinedAnswers.json');
  var predefinedAnswers = JSON.parse(jsonData).data;

  var text = undefined;

  predefinedAnswers.forEach((answer) => {
    if(answer.title == title) {
      text = answer.text;
      if(param){
        var textArray = answer.text.split(' ');
        text = replaceParam(textArray, param);
      }
    }
  });

  return text;
};

/*
  * @desc      Replace parameter in answer's text with its value
  * @param     textArray : Array of Answer's text (split)
  * @param     param : parameter's value
  * @return    predefined answer's text with param
  */
var replaceParam = (textArray, param) => {
  var text = '';
  textArray.forEach((word) => {
    if(word[0]=='#' && (word[word.length-1]=='#' || word[word.length-2]=='#') ){
      word = word.replace(word, param);
    }
    text += ' ' + word;
  });
  return text;
};


module.exports = {
  getText
};
