/*
  * @author    MITA Oumaïma, SYOUMI El Mahdi
  * @since       JULY 10, 2017
  * @desc       Handle AgentAI's Parameterss
  */
const {sendCatalogue} = require('./../../data/salesforce/sendCatalogue');

const {addRequest} = require('./../../data/salesforce/handleRequests');

const {updateContact} = require('./../../data/salesforce/handleContacts');
const {updateContactLanguage} = require('./../../data/salesforce/handleContacts');

const {updateLeadLanguage} = require('./../../data/salesforce/handleLeads');

const {sendTextMessageWithDelay} = require('./../../send/fbApi/sendTextMessage');

/*
  * @desc      Handle AgentAI's parameters
  * @param     senderID : user's facebookId
  * @param     text: Text to send to user as an answer
  * @param     params: user's params
  * @param     action: action found 's name
  * @param     lang : language
  * @return    void
  */
var handleParameters = (senderID, text, params, action, lang) => {
  switch(action){

    //Catalogue
    case 'send catalogue':
      var building = undefined;
      var operation = undefined;
      var minPrice = undefined;
      var maxPrice = undefined;
      var nbrRooms = undefined;
      var city = undefined;
      var neighborhood = undefined;

      //Extract params
      params.forEach((param) => {
        switch(param.name){
          case 'building':
            building = param.value;
            break;
          case 'operation':
            operation = param.value;
            break;
          case 'minPrice':
            minPrice = param.value;
            break;
          case 'maxPrice':
            maxPrice = param.value;
            break;
          case 'nbrRooms':
            nbrRooms = param.value;
            break;
          case 'city':
            city = param.value;
            break;
          case 'neighborhood':
            neighborhood = param.value;
            break;
        }
      });

      if(maxPrice < minPrice){
        var tmp = maxPrice;
        minPrice = maxPrice;
        maxPrice= tmp;
      }

      //sendCatalogue
      sendCatalogue(senderID, text, building, operation, minPrice, maxPrice, nbrRooms, city, neighborhood, 3, lang);
      //Add request
      addRequest(senderID, building, operation, minPrice, maxPrice, nbrRooms, city, neighborhood, false);

      break;

    //Edit Email
    case "edit email":
      var email = undefined;
      params.forEach((param) => {
        if(param.name == 'email'){
          email = param.value;
        }
      });
      updateContact(senderID, undefined, undefined, undefined, undefined, email, undefined);
      sendTextMessageWithDelay(senderID, text);
      break;

    //Edit Number phone
    case "edit phone":
      var phone = undefined;
      params.forEach((param) => {
        if(param.name == 'phone'){
          phone = param.value;
        }
      });
      updateContact(senderID, undefined, undefined, undefined, undefined, undefined, phone);
      sendTextMessageWithDelay(senderID, text);
      break;

  //Edit Language
   case "edit language":
     var language = undefined;
     params.forEach((param) => {
      if(param.name == 'language'){
        language = param.value;
      }
     });
    updateLeadLanguage(senderID, language);
    updateContactLanguage(senderID, language);
    sendTextMessageWithDelay(senderID, text);
    break;

  }
};

module.exports = {
  handleParameters
};
