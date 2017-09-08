const fs = require('fs');

var jsonData = fs.readFileSync('./../agentAi/resources/predefinedAnswers.json');

var predefinedAnswers = JSON.parse(jsonData).data;


var getText = (lang, title, param) => {
  var text = undefined;


  predefinedAnswers.title.forEach((item) => {
    if(item == title) {
      text = predefinedAnswers.text;
      if(param){
        var textArray = predefinedAnswers.text.split(' ');
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
      word.replace(word, param);
    }
    text += word;
  });
  return text;
}

module.exports = {
  getText
}
