
const {sendButtonMessage} = require('./../../send/fbApi/sendButtonMessage');

const {sendFileMessage} = require('./../../send/fbApi/sendFileMessage');
const {sendGenericMessage} = require('./../../send/fbApi/sendGenericMessage');
const {sendImageMessage} = require('./../../send/fbApi/sendImageMessage');
const {sendQuickReplies} = require('./../../send/fbApi/sendQuickReplies');
const {sendTextMessage} = require('./../../send/fbApi/sendTextMessage');

const {sendCatalogueAppartementVente} = require('./../../data/salesforce/sendCatalogueAppartement');


//By action
var handleAiAction= (senderID, answer) => {
  var action = answer.action;
  var text = answer.answer;
  var context = answer.context;
  var params = answer.parameters;

	switch (action) {

    /**
      * Démarrage
      */
    case "catalogue-action":
    case "price-action":
      var options= ['Garçonnière', 'Appartement', 'Maison', 'Villa'];
     sendQuickReplies(senderID, text, options);
      break;

    //Type logement ---> Demander opération
    case "type-building-action":
      var replies = ["Acheter", "Louer"];
      sendQuickReplies(senderID, text, replies);
  		break;


    //Opération, fixer fourchette, refuser fourchette, fixer nbr chambres, refuser nbr chambres, fixer nom-ville
    case "max-price-action":
    case "refuse-fixing-price-action":
    case "fixing-nbr-rooms-action":
    case "refuse-nbr-rooms-action":
    case "fixing-city-action":
      var replies = ["Oui", "Non"];
      sendQuickReplies(senderID, text, replies);
      break;
    //Fin scénario
    case "refuse-city-action":
    case "refuse-neighborhood-action":
    case "fixing-neighborhood-action":
      sendTextMessage(senderID, text);
      sendTextMessage(senderID, 'Params?');
      if(params){
       //just a test
        params.forEach((param)=> {
          var tt = "Name: " + param.name + ";Type: " + param.type + "; Value: " + param.value;
          sendTextMessage(senderID, tt);
        });
      }
      //sendCatalogueAppartementVente(senderID, text);
      break;

		default:
			//unhandled action, just send back the text
			sendTextMessage(senderID, text);


      //sendCatalogueAppartVente(senderID, text);
	}
}


module.exports={
    handleAiAction
}
