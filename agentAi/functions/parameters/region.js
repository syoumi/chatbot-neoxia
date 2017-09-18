/*
  * @author    MITA Oumaïma, SYOUMI El Mahdi
  * @since       JULY 10, 2017
  * @desc        Extract parameter region from user's text
  */
const fs = require('fs');

const {splitMessage} = require('./../treatment/splitMessage');
const {checkEquality} = require('./../match/checkEquality');

/*
  * @desc      Extract region from user's text
  * @param     text : user's text (Request.text)
  * @param     lang : language
  * @return    Region
  */
var extractRegion = (text, lang) => {
  var jsonCities = fs.readFileSync('./agentAi/resources/' + lang + '/cities.json');
  var list = JSON.parse(jsonCities).list;

  var regionFound = undefined;
  var regions = [];

  text = text.toLowerCase();

  list.forEach((element) => {
    regions.push(element.region.toLowerCase());
  });

  for(var i = 0 ; i<regions.length ; i++ ){
    var region = regions[i];

    //Check if region exists on user's text
    if(text.indexOf(region)!=-1){
      regionFound = city;
      break;
    }

  }

  //If still there's no region, check if there's a synonym or user did a mistake while writing region
  if(!regionFound){
    var words = splitMessage(text, lang);
    words.forEach((word)=> {
      for(var i = 0 ; i<regions.length ; i++ ){
        var region = regions[i];
        if(checkEquality(word, region, lang)){
          regionFound = region;
          break;
        }
      }
    });
  }

  return regionFound;
};

/*
  * @desc     Check if a word is region
  * @param     word : word from user's text
  * @param     lang : language
  * @return    Boolean
  */
var isRegion = (word, lang) => {
  var jsonCities = fs.readFileSync('./agentAi/resources/' + lang + '/cities.json');
  var list = JSON.parse(jsonCities).list;

  var regions = [];
  list.forEach((element) => {
    regions.push(element.region.toLowerCase());
  });

  if(regions.indexOf(word)!=-1){
    return true;
  }

  return false;
};

/*
  * @desc      Get region from word
  * @param     word : word from user's text
  * @param     lang : language
  * @return    Region
  */
var getRegion= (word, lang) => {
  var jsonCities = fs.readFileSync('./agentAi/resources/' + lang + '/cities.json');
  var list = JSON.parse(jsonCities).list;

  var regionFound = undefined;
  var regions = [];

  list.forEach((element) => {
    regions.push(element.region.toLowerCase());
  });

  for(var i = 0 ; i<regions.length ; i++ ){
    var region = regions[i];
    if(checkEquality(word, region, lang)){
      regionFound = region;
      break;
    }
  }

  return regionFound;
};


module.exports = {
  extractRegion, getRegion, isRegion
};
