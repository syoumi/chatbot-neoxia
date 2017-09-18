/*
  * @author    MITA Oumaïma, SYOUMI El Mahdi
  * @since       JULY 10, 2017
  * @desc        Extract parameter operation from user's text
  */
const fs = require('fs');

const {splitMessage} = require('./../treatment/splitMessage');
const {checkEquality} = require('./../match/checkEquality');

/*
  * @desc      Extract operation from user's text
  * @param     text : user's text (Request.text)
  * @param     lang : language
  * @return    Operation
  */
var extractOperation = (text, lang) => {

  var jsonOperations = fs.readFileSync('./agentAi/resources/' + lang + '/operations.json');
  var list = JSON.parse(jsonOperations).list;

  var operationFound = undefined;

  text = text.toLowerCase();

  for(var i = 0 ; i<list.length ; i++ ){
    var op = list[i].toLowerCase();

    //Check if city exists on user's text
    if(text.indexOf(op)!=-1){
      operationFound = op;
      break;
    }

  }

  //If still there's no city, check if there's a synonym or user did a mistake while writing city
  if(!operationFound){
    var words = splitMessage(text, lang);
    words.forEach((word)=> {
      for(var i = 0 ; i<list.length ; i++ ){
        var op = list[i].toLowerCase();
        if(checkEquality(word, op, lang)){
          operationFound = op;
          break;
        }
      }
    });
  }

  return operationFound;
};

/*
  * @desc     Check if a word is operation
  * @param     word : word from user's text
  * @param     lang : language
  * @return    Boolean
  */
var isOperation = (word, lang) => {

  var jsonOperations = fs.readFileSync('./agentAi/resources/' + lang + '/operations.json');
  var list = JSON.parse(jsonOperations).list;

  if(list.indexOf(word)!=-1){
    return true;
  }

  return false;
};

/*
  * @desc      Get operation from word
  * @param     word : word from user's text
  * @param     lang : language
  * @return    Operation
  */
var getOperation= (word, lang) => {
  var jsonOperations = fs.readFileSync('./agentAi/resources/' + lang + '/operations.json');
  var list = JSON.parse(jsonOperations).list;

  var operationFound = undefined;


  for(var i = 0 ; i<list.length ; i++ ){
    var op = list[i].toLowerCase();
    if(checkEquality(word, op, lang)){
      operationFound = op;
      break;
    }
  }

  return operationFound;
};


module.exports = {
  extractOperation, getOperation, isOperation
};
