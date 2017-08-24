
const {sendButtonMessage} = require('./../../send/fbApi/sendButtonMessage');

const {sendFileMessage} = require('./../../send/fbApi/sendFileMessage');
const {sendGenericMessage} = require('./../../send/fbApi/sendGenericMessage');
const {sendImageMessage} = require('./../../send/fbApi/sendImageMessage');
const {sendQuickReplies} = require('./../../send/fbApi/sendQuickReplies');
const {sendTextMessage} = require('./../../send/fbApi/sendTextMessage');
const {sendTextMessageWithDelai} = require('./../../send/fbApi/sendTextMessage');
const {sendBulkTextMessagesWithDelai} = require('./../../send/fbApi/sendBulkTextMessages');
const {sendBulkTextMessages} = require('./../../send/fbApi/sendBulkTextMessages');

const {handleParameters} = require('./handleAiParameters');


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
    case "catalogue-city-action":
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
    case "operation-action":
    case "refuse-fixing-price-action":
    case "fixing-city-action":
    case "refuse-city-action":
    case "search-operation-building-action":
      var replies = ["Oui", "Non"];
      sendQuickReplies(senderID, text, replies);
      break;
    //Fin scénario
    case "refuse-nbr-rooms-action":
    case "fixing-nbr-rooms-action":
      //sendTextMessageWithDelai(senderID, text);
      if(params){
        handleParameters(senderID, text, params, "send catalogue");
      }
      break;

		default:
			//unhandled action, just send back the text
			sendTextMessage(senderID, text);

	}
}


module.exports={
    handleAiAction
}
