const fs = require('fs');

const {splitMessage} = require('./../treatment/splitMessage');
const {checkEquality} = require('./../match/checkEquality');


var extractBuilding = (text, lang) => {

  var jsonBuildings = fs.readFileSync('./agentAi/resources/' + lang + '/buildings.json');
  var list = JSON.parse(jsonBuildings).list;

  var buildingFound = undefined;

  text = text.toLowerCase();

  for(var i = 0 ; i<list.length ; i++ ){
    var building = list[i].toLowerCase();

    //Check if city exists on user's text
    if(text.indexOf(building)!=-1){
      buildingFound = building;
      break;
    }

  }

  //If still there's no city, check if there's a synonym or user did a mistake while writing city
  if(!buildingFound){
    var words = splitMessage(text, lang);
    words.forEach((word)=> {
      for(var i = 0 ; i<list.length ; i++ ){
        var building = list[i].toLowerCase();
        if(checkEquality(word, building, lang)){
          buildingFound = building;
          break;
        }
      }
    });
  }

  return buildingFound;
}

var isBuilding = (word, lang) => {

  var jsonBuildings = fs.readFileSync('./agentAi/resources/' + lang + '/buildings.json');
  var list = JSON.parse(jsonBuildings).list;

  if(list.indexOf(word)!=-1){
    return true;
  }

  return false;
}

var getBuilding = (word, lang) => {

  var jsonBuildings = fs.readFileSync('./agentAi/resources/' + lang + '/buildings.json');
  var list = JSON.parse(jsonBuildings).list;

  var buildingFound = undefined;

  for(var i = 0 ; i<list.length ; i++ ){
    var building = list[i].toLowerCase();
    if(checkEquality(word, building, lang)){
      buildingFound = building;
      break;
    }
  }

  return buildingFound;
}


module.exports = {
  extractBuilding, getBuilding, isBuilding
}
