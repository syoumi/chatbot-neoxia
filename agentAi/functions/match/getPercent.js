/*
  * @author    MITA Oumaïma, SYOUMI El Mahdi
  * @since       JULY 10, 2017
  * @desc        Get percent of matching and params (if there's params on Entry)
  */
const {checkEquality} = require('./checkEquality');

const {extractParameters} = require('./../parameters/extractParameters');

const {splitMessage} = require('./../treatment/splitMessage');

/*
  * @desc      Get percent of matching user's text and words
  * @param     text: user's text
  * @param     keywords: array of disctincts words in Entry.keywords
  * @param     hasParam: if Entry has params == 1 , else == 0
  * @param     lang: Language
  * @return    Percent and Params
  */
var getPercent= (text, keywords, hasParam, lang)=> {
  var counter = 0;
  var params = [];

  if (hasParam == '1') {
    // Extract parameters from text
    for(var i = 0; i<keywords.length; i++){
      var keyword = keywords[i];

      while (keyword.indexOf('#') != keyword.lastIndexOf('#') && keyword.indexOf('#') != -1) {
        var fstSharp = keyword.indexOf('#');
        var scdSharp = keyword.indexOf('#', fstSharp + 1);
        var paramKeyword = keyword.substr(fstSharp, scdSharp - fstSharp + 1);
        var param = extractParameters(text, paramKeyword, lang);
        if (param.value) {
          params.push(param);
          text = text.replace(param.value, '');
          keyword = keyword.replace(paramKeyword, '');
          counter++;
        } else {
          return {percent: 0, params: undefined};
        }
      }
    }
  }

  // var keywordArray = keyword.split(' ').filter((item) => {
  //   return item != '' && !(isIgnorable(item));
  // });

  var words = splitMessage(text, lang);

  words.forEach((word) => {
    keywords.forEach((keyword) => {
      if (checkEquality(word, keyword, lang)) {
        counter++;
        console.log(`found ${word}`);
      }
    });
  });

  var wordsPercent = counter * 100 / words.length + params.length;
  var keywordsPercent = counter * 100 / keywords.length + params.length;


  var result = {
    percent : ( wordsPercent + keywordsPercent ) / 2,
    params
  }
  console.log('RESULT TO SEND: ', result);
  return result ;
  // return wordsPercent and params
};

module.exports= {
  getPercent
};
