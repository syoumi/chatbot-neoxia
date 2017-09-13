const fs = require('fs');

var getOperations = (lang) => {
  var jsonOperations = fs.readFileSync('./agentAi/resources/' + lang + '/operations.json');
  return JSON.parse(jsonOperations).list;
}

var getBuildings = (lang) => {
  var jsonOperations = fs.readFileSync('./agentAi/resources/' + lang + '/buildings.json');
  return JSON.parse(jsonOperations).list;
}



var getYesNo = (lang) => {
  var yesno = [];
  switch(lang) {
    case "fr":
      yesno[0] = 'Oui';
      yesno[1] = 'Non';
      break;

    case "ar":
      yesno[0] =  'نعم';
      yesno[1] = 'لا';
      break;

    case "ma":
      yesno[0] ='Ah';
      yesno[1] = 'La';
      break;
  }

  return yesno;
}

var getFilterSkip = (lang) => {
  var filterskip = [];
  switch(lang) {
    case "fr":
      filterskip[0] = 'Filtrer';
      filterskip[1] = 'Sauter';
      break;

    case "ar":
      filterskip[0] = ''
      filterskip[1] = '';
      break;

    case "ma":
      filterskip[0] ='';
      filterskip[1] = '';
      break;
  }

  return filterskip;
}

module.exports =  {
  getOperations, getBuildings, getYesNo, getFilterSkip
}
