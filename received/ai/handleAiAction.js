
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

	switch (action) {


    /*
     * Scénario 1 : consulter catalogue d'un logement pour achat ou location avec ou sans critères
     */

    //Catalogue ---> Demander quel type logement
		case "catalogue-action":
			//sendCatalogueAppartVente(senderID, text);
      var replies = ["Appartement", "Maison", "Villa", "Studio"];
      sendQuickReplies(senderID, text, replies);
		  break;
    //Type logement ---> Demander quelle opération
    case "type-logement-action":
      var replies = ["Acheter", "Louer"];
      sendQuickReplies(senderID, text, replies);
  		break;
    //Opération ---> Demander fixer fourchette
    case "operation-action":
      //sendCatalogueAppartVente(senderID, text);
      var replies = ["Oui", "Non"];
      sendQuickReplies(senderID, text, replies);
      break;
    //Accepte fourchette ---> Demander prix min
    case "accept-fourchette-action":
      sendTextMessage(senderID, text);
      break;
    //Prix min ---> Demander prix max
    case "min-fourchette-action":
      sendTextMessage(senderID, text);
      break;
    //Prix max/Refuser fourchette ---> Demander spéficier nbr chambres
    case "max-fourchette-action", "refuse-fourchette-action":
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
