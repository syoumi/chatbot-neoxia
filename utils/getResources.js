/*
  * @author    MITA Oumaïma, SYOUMI El Mahdi
  * @since       JULY 10, 2017
  * @desc       Handle resources
  */
const fs = require('fs');

/*
  * @desc      Get operations by language
  * @param     lang : language
  * @return    Operations (Array of strings)
  */
var getOperations = (lang) => {
  var jsonOperations = fs.readFileSync('./agentAi/resources/' + lang + '/operations.json');
  return JSON.parse(jsonOperations).list;
};

/*
  * @desc      Get types of buildings by language
  * @param     lang : language
  * @return    Buildings  (Array of strings)
  */
var getBuildings = (lang) => {
  var jsonOperations = fs.readFileSync('./agentAi/resources/' + lang + '/buildings.json');
  return JSON.parse(jsonOperations).list;
};

/*
  * @desc      Get yes/no by language
  * @param     lang : language
  * @return    Yes, no (Array of strings)
  */
var getYesNo = (lang) => {
  var yesno = [];
  switch(lang) {
    case "fr":
      yesno = ['Oui', 'Non' ];
      break;

    case "ar":
      yesno[0] =  'نعم';
      yesno[1] = 'لا';
      break;

    case "ma":
      yesno = [ 'Ah',  'La' ];
      break;
  }

  return yesno;
};

/*
  * @desc      Get filter/skip by language
  * @param     lang : language
  * @return    Filter, skip (Array of strings)
  */
var getFilterSkip = (lang) => {
  var filterskip = [];
  switch(lang) {
    case "fr":
      filterskip = ['Filtrer', 'Sauter' ];
      break;

    case "ar":
      filterskip[0] = ''
      filterskip[1] = '';
      break;

    case "ma":
      filterskip = ['', ''];
      break;
  }

  return filterskip;
};

/*
  * @desc      Get actions for contact by language
  * @param     lang : language
  * @return    Call, send request, send quote (Array of strings)
  */
var getActionsContact = (lang) => {
  var actionsContact = [];
  switch(lang) {
    case "fr":
      actionsContact = ["Appeler", "Envoyer demande", "Envoyer devis"];
      break;

    case "ar":
      actionsContact[0] = 'أتصل '
      actionsContact[1] = 'اتصلوا بي';
      actionsContact[3] = 'أرسلوا الفاتورة';
      break;

    case "ma":
      actionsContact = ["Ana n3ayt lih", "Huwa y3ayt liya", "Sifto liya le devis"];
      break;
  }

  return actionsContact;
};

/*
  * @desc      Get form's title by language
  * @param     lang : language
  * @return    Form's title (String)
  */
var getFormTitle = (lang) => {
  var title = 'Formulaire';
  switch(lang) {
    case "fr":
      title = 'Formulaire';
      break;

    case "ar":
      title = 'الاستمارة';
      break;

    case "ma":
      title = 'Formulaire';
      break;
  }

  return title;
};


module.exports =  {
  getOperations, getBuildings, getYesNo, getFilterSkip, getActionsContact, getFormTitle
};
