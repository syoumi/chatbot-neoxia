
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

const {getText} = require('./../../utils/getPredefinedAnswers');

const {getContact} = require('./../../data/salesforce/handleContacts');


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
    case "don't-know-action":
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

    //Edit form
    case "form-action":
      var buttons = [
        {
                  "type":"web_url",
                  "url":"https://desolate-dusk-64146.herokuapp.com/formToEdit/"+senderID,
                  "title":"Formulaire",
                  "webview_height_ratio": "full",
                  "messenger_extensions": true
        }
      ];
      sendButtonMessage(senderID, text , buttons);
      break;

    //Edit Email
    case "email-action":
        if(params){
          handleParameters(senderID, text, params, "edit email");
        }
        break;

    //Edit Email
    case "phone-action":
        if(params){
          handleParameters(senderID, text, params, "edit phone");
        }
        break;

    //Ask about email
    case "ask-email-action":
      sendTextMessageWithDelay(senderID, text);
      getContact(senderID, (contact) => {
        if(contact){
          text = getText('fr', 'Ask about email', contact.Email);
          sendTextMessageWithDelay(senderID, text);
        }
        else{
          text = getText('fr', 'Contact does not exist', undefined);
          var buttons = [
            {
                      "type":"web_url",
                      "url":"https://desolate-dusk-64146.herokuapp.com/form/"+senderID,
                      "title":"Formulaire",
                      "webview_height_ratio": "full",
                      "messenger_extensions": true
            }
          ];
          sendButtonMessage(senderID, text , buttons);
        }
      });
      break;

    //Ask about number phone
    case "ask-phone-action":
    sendTextMessageWithDelay(senderID, text);
    getContact(senderID, (contact) => {
      if(contact){
        text = getText('fr', 'Ask about phone', contact.phone);
        sendTextMessageWithDelay(senderID, text);
      }
      else{
        text = getText('fr', 'Contact does not exist', undefined);
        var buttons = [
          {
                    "type":"web_url",
                    "url":"https://desolate-dusk-64146.herokuapp.com/form/"+senderID,
                    "title":"Formulaire",
                    "webview_height_ratio": "full",
                    "messenger_extensions": true
          }
        ];
        sendButtonMessage(senderID, text , buttons);
      }
      });
      break;


    //Waiting for call
    case "call-information-action":
      getContact(senderID, (contact) => {
        if(contact){
          text = text + ' ' + getText('fr', 'Waiting for call', contact.Phone);
          sendTextMessageWithDelay(senderID, text);
        }
        else{
          text = getText('fr', 'Contact does not exist', undefined);
          var buttons = [
            {
                      "type":"web_url",
                      "url":"https://desolate-dusk-64146.herokuapp.com/form/"+senderID,
                      "title":"Formulaire",
                      "webview_height_ratio": "full",
                      "messenger_extensions": true
            }
          ];
          sendButtonMessage(senderID, text , buttons);
        }
      });
      break;

    //Check if there's no error while sending quote
    case "quote-error-action":
      sendTextMessageWithDelay(senderID, text);
      getContact(senderID, (contact) => {
        if(contact){
          text = text + ' ' + getText('fr', 'Ask about email', contact.Email);
          sendTextMessageWithDelay(senderID, text);
        }
        else{
          text = getText('fr', 'Contact does not exist', undefined);
          var buttons = [
            {
                      "type":"web_url",
                      "url":"https://desolate-dusk-64146.herokuapp.com/form/"+senderID,
                      "title":"Formulaire",
                      "webview_height_ratio": "full",
                      "messenger_extensions": true
            }
          ];
          sendButtonMessage(senderID, text , buttons);
        }
      });
      break;




		default:
			//unhandled action, just send back the text
			sendTextMessageWithDelay(senderID, text);

	}
}


module.exports={
    handleAiAction
}
