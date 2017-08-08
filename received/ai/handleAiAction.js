
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

  console.log(`************* ANSWER: ${answer} ****************`);
	switch (action) {

    /*
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
    case "operation-action", "max-fourchette-action", "refuse-fourchette-action", "def-nbr-chambres-action", "refuse-nbr-chambres-action", "nom-ville-action":
      var replies = ["Oui", "Non"];
      sendQuickReplies(senderID, text, replies);
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
