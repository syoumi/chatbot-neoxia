/*
  * @author    MITA Oumaïma, SYOUMI El Mahdi
  * @since       JULY 10, 2017
  * @desc        Extract parameter neighborhood from user's text
  */
const fs = require('fs');

const {splitMessage} = require('./../treatment/splitMessage');
const {checkEquality} = require('./../match/checkEquality');

/*
  * @desc      Extract neighborhood from user's text
  * @param     text : user's text (Request.text)
  * @param     lang : language
  * @return    Neighborhood
  */
var extractNeighborhood = (text, lang) => {

  var jsonCities = fs.readFileSync('./agentAi/resources/' + lang + '/cities.json');
  var list = JSON.parse(jsonCities).list;

  var neighborhoodFound = undefined;
  var neighborhoods = [];

  text = text.toLowerCase();

  list.forEach((element) => {
    neighborhoods = neighborhoods.concat(element.neighborhoods);
  });

  for(var i = 0 ; i<neighborhoods.length ; i++ ){
    var neighborhood = neighborhoods[i].toLowerCase();

    //Check if neighborhood exists on user's text
    if(text.indexOf(neighborhood)!=-1){
      neighborhoodFound = neighborhood;
      break;
    }

  }

  //If still there's no neighborhood, check if there's a synonym or user did a mistake while writing neighborhood
  if(!neighborhoodFound){
    var words = splitMessage(text, lang);
    words.forEach((word)=> {
      for(var i = 0 ; i<neighborhoods.length ; i++ ){
        var neighborhood = neighborhoods[i].toLowerCase();
        if(checkEquality(word, neighborhood, lang)){
          neighborhoodFound = neighborhood;
          break;
        }
      }
    });
  }

  return neighborhoodFound;
};


/*
  * @desc     Check if a word is neighborhood
  * @param     word : word from user's text
  * @param     lang : language
  * @return    Boolean
  */
var isNeighborhood = (word, lang) => {

  var jsonCities = fs.readFileSync('./agentAi/resources/' + lang + '/cities.json');
  var list = JSON.parse(jsonCities).list;

  var neighborhoods = [];

  list.forEach((element) => {
    neighborhoods = neighborhoods.concat(element.neighborhoods);
  });

  //TOlowerCase
  if(neighborhoods.indexOf(word)!=-1){
    return true;
  }

  return false;
};

/*
  * @desc      Get neighborhood from word
  * @param     word : word from user's text
  * @param     lang : language
  * @return    Neighborhood
  */
var getNeighborhood = (word, lang) => {

  var jsonCities = fs.readFileSync('./agentAi/resources/' + lang + '/cities.json');
  var list = JSON.parse(jsonCities).list;

  var neighborhoodFound = undefined;
  var neighborhoods = [];

  list.forEach((element) => {
    neighborhoods = neighborhoods.concat(element.neighborhoods);
  });

  for(var i = 0 ; i<neighborhoods.length ; i++ ){
    var neighborhood = neighborhoods[i].toLowerCase();
    if(checkEquality(word, neighborhood, lang)){
      neighborhoodFound = neighborhood;
      break;
    }
  }

  return neighborhoodFound;
};


module.exports = {
  extractNeighborhood, getNeighborhood, isNeighborhood
};
