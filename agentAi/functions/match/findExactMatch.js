const fs = require('fs');

const {checkEquality} = require('./checkEquality');
const {removePunctuation} = require('./../treatment/removePunctuation');
const {isIgnorable} = require('./../treatment/ignoreWords');
const {getUser} = require('./../user/handleUser');
const {setUser} = require('./../user/handleUser');
const {getParameter} = require('./../parameters/getParameter');
const {splitMessage} = require('./../treatment/splitMessage');



var findExactMatch = (request) => {

  var jsonData = fs.readFileSync('./agentAi/resources/' + request.lang + '/data.json');

  var data = JSON.parse(jsonData).data;


  //user
  var user = getUser(request.senderID);

  //message text

  var words = splitMessage(request.text, request.lang);

  var foundEntry = undefined;

  data.forEach((entry) => {
    var go = false;
    if (entry.previousActions && entry.previousActions.length != 0) {
      if (user && entry.previousActions.indexOf(user.previousAction) != -1) {
        go = true;
      }
    } else {
      go = true;
    }
    if (go) {
      //Foreach keyword in keywords (Sentence in keywords)
      entry.keywords.forEach((keyword) => {
        var params = [];

        //Foreach word in one keyword
        var keywordsArray = keyword.split(' ').filter((item) => {
          return item != '' && !(isIgnorable(item, request.lang));
        });

        if (keywordsArray.length === words.length) {
          var areEquals = true;
          var params = [];

          for (var i = 0; i < words.length; i++) {
            //Check if this word in keyword should be a param
            if (keywordsArray[i][0] == '#' && keywordsArray[i][keywordsArray.length - 1] == '#') {
                var param = getParameter(words[i], keywordsArray[i], request.lang);
                if(param.value){
                  params.push(param);
                  //console.log("Param: ", param);
                } else {
                  areEquals = false;
                  params = [];
                  break;
                }
            }
            else if (!checkEquality(words[i], keywordsArray[i], request.lang)){
              areEquals = false;
            }
          }
          if (areEquals) {
            foundEntry = {
              entry,
              params
            };
            // console.log(`STEP ONE RESULT : action ${entry.action}`);
          }
        }
      });
    }
  });
  return foundEntry;
};

module.exports = {
  findExactMatch
};
