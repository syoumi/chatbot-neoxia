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
      sendButtonMessage(senderID, 'Vous pouvez contacter notre agent commercial ' + postback[2]  + ' associé à ce logement soit en l\'appelant ou en lui envoyant une demande afin qu\'il vous appelle.\nComme vous pouvez recevoir le devis directement sur votre boîte mail, si vous le souhaitez.' , buttons);
      break;


    case "CONTACT_SALESMAN":
      //postback = "CONTACT_SALESMAN" + "CONTACT_PAYLOAD"  + Salesman.Id + Salesman.Name + Salesman.MobilePhone + Product.Id
      var buttons = [
        {
                  "type":"web_url",
                  "url":"https://desolate-dusk-64146.herokuapp.com/formWTL/"+senderID,
                  "title":"Formulaire",
                  "webview_height_ratio": "full",
                  "messenger_extensions": true
        }
      ];
      //Check if user is not a contac if so send the form else save task and insert it directly
      getContact(senderID, (contact) => {
        saveTask(senderID, postback[2], postback[5], 'Contacter client');
        if(!contact){
          sendTextMessage(senderID, "Nous avons besoin de récupérer vos coordonnées telles que votre nom, votre prénom votre email et votre numéro de téléphone pour que l'agent commercial puisse vous appeler le plus tôt possible.");
          sendButtonMessage(senderID, 'Veuillez remplir le formulaire.', buttons);
        }
        else{
          console.log('ADD TASK');
          addTask(senderID);
        }
      });
      break;

    case "SEND_QUOTE":
      //postback = "SEND_QUOTE" + "CONTACT_PAYLOAD"  + Salesman.Id + Salesman.Name + Salesman.MobilePhone + Product.Id
      var buttons = [
        {
                  "type":"web_url",
                  "url":"https://desolate-dusk-64146.herokuapp.com/formWTL/"+senderID,
                  "title":"Formulaire",
                  "webview_height_ratio": "full",
                  "messenger_extensions": true
        }
      ];
      getContact(senderID, (contact) => {
        //saveTask(senderID, postback[2], postback[5], 'Envoyer devis', '');
        if(!contact){
          sendTextMessage(senderID, "Nous avons besoin de récupérer vos coordonnées telles que votre nom, votre prénom votre email et votre numéro de téléphone.");
          sendButtonMessage(senderID, 'Veuillez remplir le formulaire.', buttons);
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
        sendTextMessage(senderID, `Postback ${payload} reçu :D`);
  }

};

module.exports = {
  receivedPostBack
}
