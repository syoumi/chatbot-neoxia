const fs = require('fs');


const {splitMessage} = require('./../treatment/splitMessage');
const {checkEquality} = require('./../match/checkEquality');


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
}

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
}

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
}


module.exports = {
  extractRegion, getRegion, isRegion
}
