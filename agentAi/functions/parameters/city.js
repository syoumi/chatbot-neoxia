/*
  * @author    MITA Oumaïma, SYOUMI El Mahdi
  * @since       JULY 10, 2017
  * @desc        Extract parameter city from user's text
  */
const fs = require('fs');

const {splitMessage} = require('./../treatment/splitMessage');
const {checkEquality} = require('./../match/checkEquality');

/*
  * @desc      Extract city from user's text
  * @param     text : user's text (Request.text)
  * @param     lang : language
  * @return    City
  */
var extractCity = (text, lang) => {
  var jsonCities = fs.readFileSync('./agentAi/resources/' + lang + '/cities.json');
  var list = JSON.parse(jsonCities).list;

  var cityFound = undefined;
  var cities = [];

  text = text.toLowerCase();

  list.forEach((element) => {
    cities.push(element.city.toLowerCase());
  });

  for(var i = 0 ; i<cities.length ; i++ ){
    var city = cities[i];

    //Check if city exists on user's text
    if(text.indexOf(city)!=-1){
      cityFound = city;
      break;
    }

  }

  //If still there's no city, check if there's a synonym or user did a mistake while writing city
  if(!cityFound){
    var words = splitMessage(text, lang);
    words.forEach((word)=> {
      for(var i = 0 ; i<cities.length ; i++ ){
        var city = cities[i];
        if(checkEquality(word, city, lang)){
          cityFound = city;
          break;
        }
      }
    });
  }

  return cityFound;
};

/*
  * @desc     Check if a word is city
  * @param     word : word from user's text
  * @param     lang : language
  * @return    Boolean
  */
var isCity = (word, lang) => {

  var jsonCities = fs.readFileSync('./agentAi/resources/' + lang + '/cities.json');
  var list = JSON.parse(jsonCities).list;

  var cities = [];
  list.forEach((element) => {
    cities.push(element.city.toLowerCase());
  });

  if(cities.indexOf(word)!=-1){
    return true;
  }

  return false;
};

/*
  * @desc      Get city from word
  * @param     word : word from user's text
  * @param     lang : language
  * @return    City
  */
var getCity = (word, lang) => {
  var jsonCities = fs.readFileSync('./agentAi/resources/' + lang + '/cities.json');
  var list = JSON.parse(jsonCities).list;

  var cityFound = undefined;
  var cities = [];

  list.forEach((element) => {
    cities.push(element.city.toLowerCase());
  });

  for(var i = 0 ; i<cities.length ; i++ ){
    var city = cities[i];
    if(checkEquality(word, city, lang)){
      cityFound = city;
      break;
    }
  }

  return cityFound;
};


module.exports = {
  extractCity, getCity, isCity
};
