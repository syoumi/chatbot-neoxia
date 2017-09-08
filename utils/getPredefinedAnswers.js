const fs = require('fs');

var jsonData = fs.readFileSync('./agentAi/resources/predefinedAnswers.json');

var predefinedAnswers = JSON.parse(jsonData).data;


var getText = (lang, title, param) => {
  var text = undefined;

  predefinedAnswers.forEach((answer) => {
    if(answer.title == title) {
      text = answer.text;
      if(param){
        console.log('PARAM: ', param);
        var textArray = answer.text.split(' ');
        text = replaceParam(textArray, param);
      }
    }
  });

  return text;
}

var replaceParam = (textArray, param) => {
  var text = '';
  textArray.forEach((word) => {
    if(word[0]=='#' && word[word.length-1]=='#'){
      console.log('FIRST LETTER =', word[0]);
      console.log('LAST LETTER= ', word[word.length-1]);
      word.replace(word, param + "s");
      console.log('WORD REPLACED: ', word);
    }
    text += ' ' + word;
  });
  return text;
}

module.exports = {
  getText
}
