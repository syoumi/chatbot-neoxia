
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
    case "prix-action":
      var options= ['Garçonnière', 'Appartement', 'Maison', 'Villa'];
     sendQuickReplies(senderID, text, options);
      break;

    //Type logement ---> Demander opération
    case "search-appartement-action":
      var replies = ["Acheter", "Louer"];
      sendQuickReplies(senderID, text, replies);
  		break;


    //Opération, fixer fourchette, refuser fourchette, fixer nbr chambres, refuser nbr chambres, fixer nom-ville
    case "achat-appartement-action":
    case "location-appartement-action":
    case "max-fourchette-action":
    case "refuse-fourchette-action":
    case "def-nbr-chambres-action":
    case "refuse-nbr-chambres-action":
    case "nom-ville-action":
      var replies = ["Oui", "Non"];
      sendQuickReplies(senderID, text, replies);
      break;
    //Fin scénario
    case "refuse-ville-action":
    case "refuse-quartier-action":
    case "nom-quartier-action":
      sendTextMessage(senderID, text);
      sendTextMessage(senderID, 'Params?');
      if(params){
        sendTextMessage(senderID, "Vous avez choisi: " + params);
      }
      //sendCatalogueAppartementVente(senderID, text);
      break;
     //just a test
    case "operation-operation-action":
    sendTextMessage(senderID, text);
    sendTextMessage(senderID, 'Params?');
    if(params){
      sendTextMessage(senderID, "Vous avez choisi: " + params);
    }
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
