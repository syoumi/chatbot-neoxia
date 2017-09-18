/*
  * @author    MITA Oumaïma, SYOUMI El Mahdi
  * @since       JULY 10, 2017
  * @desc        Find exact match between user's text and action's keywords
  */
const fs = require('fs');

const {checkEquality} = require('./checkEquality');
const {removePunctuation} = require('./../treatment/removePunctuation');
const {isIgnorable} = require('./../treatment/ignoreWords');
const {getUser} = require('./../user/handleUser');
const {setUser} = require('./../user/handleUser');
const {getParameter} = require('./../parameters/getParameter');
const {splitMessage} = require('./../treatment/splitMessage');

/*
  * @desc      Get entry contains a keyword that matchs exactly user's text
  * @param     request : Contains senderID, text and lang
  * @return    Entry
  */
var findExactMatch = (request) => {
  var jsonData = fs.readFileSync('./agentAi/resources/' + request.lang + '/data.json');
  var data = JSON.parse(jsonData).data;

  console.log('REQUEST: ', request);
  //user
  var user = getUser(request.senderID);

  //message text
  var words = splitMessage(request.text, request.lang);

  var foundEntry = undefined;

  data.forEach((entry) => {
    var go = false;
    //IF (entry has previousActions) --> [ then look, IF it's the same as user.previousAction, then search match on this entry, ELSE give up ], ELSE search match on this entry
    if (entry.previousActions && entry.previousActions.length != 0) {
      if (user && entry.previousActions.indexOf(user.previousAction) != -1) {
        go = true;
      }
    }
    else {
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

  console.log('ENTRY FOUND EXACT MATCH: ', foundEntry);
  return foundEntry;
};

module.exports = {
  findExactMatch
};
