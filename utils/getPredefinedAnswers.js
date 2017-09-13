const fs = require('fs');



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
}

var replaceParam = (textArray, param) => {
  var text = '';
  textArray.forEach((word) => {
    if(word[0]=='#' && word[word.length-1]=='#'){
      word = word.replace(word, param);
    }
    text += ' ' + word;
  });
  return text;
}

module.exports = {
  getText
}
