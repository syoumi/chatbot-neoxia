/**
 * In this file, we put all the logic to execute whenever an event
 * of type PostBack is sent to the backend app
 */

const {sendTextMessage} = require('./../../send/fbApi/sendTextMessage');
const {sendTextMessageWithDelay} = require('./../../send/fbApi/sendTextMessage');

const {sendQuickReplies} = require('./../../send/fbApi/sendQuickReplies');

const {sendButtonMessage} = require('./../../send/fbApi/sendButtonMessage');

const {saveTask} = require('./../../data/salesforce/handleTasks');
const {addTask} = require('./../../data/salesforce/handleTasks');

const {getContact} = require('./../../data/salesforce/handleContacts');

const {getText} = require('./../../utils/getPredefinedAnswers');


/**
 * Postback event handler
 */
var receivedPostBack = (event) => {
  var senderID = event.sender.id;
  var recipientID = event.recipient.id;
  var timeOfPostBack = event.timestamp;
  var postback = event.postback.payload.split('|');

  // Getting the payload unique name defined later
  var payload = postback[0];

  console.log(`### Postback recieved informations ###`);
  // console.log(`| senderID : ${senderID}`);
  // console.log(`| recipientID ${recipientID}`);
  // console.log(`| timeOfPostBack ${timeOfPostBack}`);
  // console.log('#################END PRI##############');
  //console.log("POSTBACK: ", postback);

  //by payload
  switch(payload){

    case "CONTACT_PAYLOAD":
    //postback = "CONTACT_PAYLOAD"  + Salesman.Id + Salesman.Name + Salesman.MobilePhone + Product.Id
      var buttons = [
        {
          "type":"phone_number",
          "title":"Appeler",
          "payload": postback[3]
        },
        {
          "type":"postback",
          "title":"Envoyer demande",
          "payload": "CONTACT_SALESMAN|" + event.postback.payload
        },
        {
          "type":"postback",
          "title":"Envoyer devis",
          "payload": "SEND_QUOTE|" + event.postback.payload
        }
      ];
      var text = getText('fr', 'Send contact', postback[2]);
      sendButtonMessage(senderID, text , buttons);
      break;


    case "CONTACT_SALESMAN":
      //postback = "CONTACT_SALESMAN" + "CONTACT_PAYLOAD"  + Salesman.Id + Salesman.Name + Salesman.MobilePhone + Product.Id
      var buttons = [
        {
                  "type":"web_url",
                  "url":"https://desolate-dusk-64146.herokuapp.com/form/"+senderID,
                  "title":"Formulaire",
                  "webview_height_ratio": "full",
                  "messenger_extensions": true
        }
      ];
      //Check if user is not a contact:  IF so send the form, ELSE save task and insert it directly
      getContact(senderID, (contact) => {
        console.log('CONTACT POSTBACK FOUND: ', contact);
        saveTask(senderID, postback[2], postback[5], 'Contacter client');
        if(!contact){
          var text = getText('fr', 'Send form call', undefined);
          sendTextMessage(senderID, text);
          text = getText('fr', 'Ask to complete form', undefined);
          sendButtonMessage(senderID, text, buttons);
        }
        else{
          addTask(senderID);
        }
      });
      break;

    case "SEND_QUOTE":
      //postback = "SEND_QUOTE" + "CONTACT_PAYLOAD"  + Salesman.Id + Salesman.Name + Salesman.MobilePhone + Product.Id
      var buttons = [
        {
                  "type":"web_url",
                  "url":"https://desolate-dusk-64146.herokuapp.com/form/"+senderID,
                  "title":"Formulaire",
                  "webview_height_ratio": "full",
                  "messenger_extensions": true
        }
      ];
      //Check if user is not a contact:  IF so send the form, ELSE save task and insert it directly
      getContact(senderID, (contact) => {
        saveTask(senderID, postback[2], postback[5], 'Envoyer devis');
        if(!contact){
          var text = getText('fr', 'Send form quote', undefined);
          sendTextMessage(senderID, text);
          text = getText('fr', 'Ask to complete form', undefined);
          sendButtonMessage(senderID, text, buttons);
        }
        else{
          addTask(senderID);
        }

      });
      break;

   case "DESCRIPTION_PAYLOAD":
      sendTextMessage(senderID, postback[1]);
      //sendTextMessageWithDelay(senderID, postback[1]);
      break;

    default:
        sendTextMessage(senderID, ':D');
  }

};

module.exports = {
  receivedPostBack
}
