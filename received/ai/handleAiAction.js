
const {sendButtonMessage} = require('./../../send/fbApi/sendButtonMessage');
const {sendFileMessage} = require('./../../send/fbApi/sendFileMessage');
const {sendGenericMessage} = require('./../../send/fbApi/sendGenericMessage');
const {sendImageMessage} = require('./../../send/fbApi/sendImageMessage');
const {sendQuickReplies} = require('./../../send/fbApi/sendQuickReplies');
const {sendTextMessage} = require('./../../send/fbApi/sendTextMessage');
const {sendTextMessageWithDelay} = require('./../../send/fbApi/sendTextMessage');
const {sendBulkTextMessagesWithDelay} = require('./../../send/fbApi/sendBulkTextMessages');
const {sendBulkTextMessages} = require('./../../send/fbApi/sendBulkTextMessages');

const {handleParameters} = require('./handleAiParameters');

const {addLead} = require('./../../data/salesforce/handleLeads');


//By action
var handleAiAction= (senderID, answer) => {
  var action = answer.action;
  var text = answer.answer;
  var context = answer.context;
  var params = answer.parameters;

  console.log('**SENDER ID: ', senderID);
  console.log('**PARAMS: ', params);

  //Add User as lead if he doesn't exist or he isn't a contact
  addLead(senderID);

	switch (action) {

    /**
      * Démarrage
      */
    case "catalogue-action":
    case "price-action":
    case "catalogue-city-action":
    case "catalogue-neighborhood-action":
    case "catalogue-city-neighborhood-action":
      var options= ['Studio', 'Appartement', 'Maison', 'Villa'];
      sendQuickReplies(senderID, text, options);
      break;

    //Type logement ---> Demander opération
    case "type-building-action":
    case "type-building-v2-action":
    case "catalogue-building-action":
    case "catalogue-building-city-neighborhood-action":
      var replies = ["Acheter", "Louer"];
      sendQuickReplies(senderID, text, replies);
  		break;


    //Opération, fixer fourchette, refuser fourchette, fixer nbr chambres, refuser nbr chambres, fixer nom-ville
    case "refuse-neighborhood-action":
    case "fixing-neighborhood-action" :
      var replies = ["Oui", "Non"];
      sendQuickReplies(senderID, text, replies);
      break;

    //Asking about neighborhood or number of rooms
    case "fixing-city-action":
    case "max-price-action":
    case "refuse-fixing-price-action":
    case "accept-neighborhood-action":
    case "accept-fixing-price-action":
    case "fixing-price-action":
      var replies = ["Non"];
      sendQuickReplies(senderID, text, replies);
      break;

    //Skip or filter
    case "catalogue-building-operation-action":
    case "catalogue-building-operation-city-action":
    case "catalogue-building-operation-neighborhood-action":
    case "catalogue-building-operation-city-neighborhood-action":
    case "catalogue-sell-building-action":
    case "operation-action":
    case "operation-v2-action":
    case "operation-v3-action":
      var replies = ["Filtrer", "Sauter"];
      sendQuickReplies(senderID, text, replies);
      break;


    //Send catalogue
    case "refuse-nbr-rooms-action":
    case "fixing-nbr-rooms-action":
    case "skip-city-action":
    case "skip-neighborhood-action":
    case "skip-fixing-price-action":
      if(params){
        handleParameters(senderID, text, params, "send catalogue");
      }
      break;

    case "test-action":
      var buttons = [
        {
                  "type":"web_url",
                  "url":"https://desolate-dusk-64146.herokuapp.com/formWTL",
                  "title":"Formulaire",
                  "webview_height_ratio": "full",
                  "messenger_extensions": true,
                  "fallback_url": "https://desolate-dusk-64146.herokuapp.com/formWTL"
        }
      ];
      sendButtonMessage(senderID, 'Veuillez remplir le formulaire.', buttons);
      break;


		default:
			//unhandled action, just send back the text
			sendTextMessageWithDelay(senderID, text);

	}
}


module.exports={
    handleAiAction
}
