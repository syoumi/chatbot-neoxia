
const {sendButtonMessage} = require('./../../send/fbApi/sendButtonMessage');

const {sendFileMessage} = require('./../../send/fbApi/sendFileMessage');
const {sendGenericMessage} = require('./../../send/fbApi/sendGenericMessage');
const {sendImageMessage} = require('./../../send/fbApi/sendImageMessage');
const {sendQuickReplies} = require('./../../send/fbApi/sendQuickReplies');
const {sendTextMessage} = require('./../../send/fbApi/sendTextMessage');


//By action
var handleAiAction= (senderID, answer) => {
  var action = answer.action;
  var text = answer.answer;
  var context = answer.context;
  var params = answer.parameters;

  console.log('************* ANSWER:', answer);
	switch (action) {

    /**
      * Démarrage
      */

    case "start-action":
    case "salutations-action":
      var replies = ["Consulter catalogue", "Voir nouveautés", "Poser une question", "Autre"];
      sendQuickReplies(senderID, text, replies);
      break;

    /**
      * Scénario 1 : consulter catalogue d'un logement pour achat ou location avec ou sans critères
      */

    //Catalogue ---> Demander type logement
		case "catalogue-action":
      var replies = ["Appartement", "Maison", "Villa", "Studio"];
      sendQuickReplies(senderID, text, replies);
		  break;
    //Type logement ---> Demander opération
    case "type-logement-action":
      var replies = ["Acheter", "Louer"];
      sendQuickReplies(senderID, text, replies);
  		break;
    //Opération, fixer fourchette, refuser fourchette, fixer nbr chambres, refuser nbr chambres, fixer nom-ville
    case "operation-action":
    case "max-fourchette-action":
    case "refuse-fourchette-action":
    case "def-nbr-chambres-action":
    case "refuse-nbr-chambres-action":
    case "nom-ville-action":
      var replies = ["Oui", "Non"];
      sendQuickReplies(senderID, text, replies);
      break;
    //Fin scénario
    case "envoyer-catalogue-action":
      sendTextMessage(senderID, text);
      var type = params[0];
      var op = params[1];
      console.log("TYYYYYYYPE: " + type + "; OP: " + op);
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
