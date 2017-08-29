/**
 * In this file, we put all the logic to execute whenever an event
 * of type PostBack is sent to the backend app
 */

const {sendTextMessage} = require('./../../send/fbApi/sendTextMessage');
const {sendTextMessageWithDelai} = require('./../../send/fbApi/sendTextMessage');

const {sendQuickReplies} = require('./../../send/fbApi/sendQuickReplies');

const {sendButtonMessage} = require('./../../send/fbApi/sendButtonMessage');

const {addTask} = require('./../../data/salesforce/handleTasks');


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

  //by payload
  switch(payload){
    case "CONTACT_PAYLOAD":
    //postback = "CONTACT_PAYLOAD"  + Salesman.Id + Salesman.Name + Salesman.MobilePhone + Product.Id
      buttons: [
        {
          "type": "postback",
          "title": "Contacter commercial",
          "payload": "CONTACT_SALESMAN|" + postback
        }];
      sendButtonMessage(senderID, 'Voulez-vous contacter directement le commercial en l\'appelant ou bien recevoir le devis sur votre boîte email?', buttons);
      break;

    //   {
    //     "type": "postback",
    //     "title": "Envoyer devis",
    //     "payload": "SEND_QUOTE|" + postback
    // }

    case "CONTACT_SALESMAN":
      //postback = "CONTACT_SALESMAN" + "CONTACT_PAYLOAD"  + Salesman.Id + Salesman.Name + Salesman.MobilePhone + Product.Id
        var buttons = [
        {
          "type":"phone_number",
          "title":"Appeler",
          "payload": postback[4]
        }
        ];
        sendButtonMessage(senderID, 'Vous pouvez contacter ' + postback[3] + ' pour plus de renseignements.', buttons);
        sendTextMessage(senderID, "Nous avons besoin de récupérer certaines coordonnées telles que votre email, votre vrai nom, prénom et votre numéro de téléphone.\nVoulez-vous remplir un formulaire ou répondre ici?");
        //envoyer quickreplies
        //addTask(senderID, postback[2], postback[5], 'Contacter client');
        break;

    case "SEND_QUOTE":
        sendTextMessage(senderID, "Nous avons besoin de récupérer certaines coordonnées telles que votre email, votre vrai nom, prénom et votre numéro de téléphone.\nVoulez-vous remplir un formulaire ou répondre ici?");
        //envoyer quickreplies
        //addTask(senderID, postback[2], postback[5], 'Envoyer devis');
        break;

   case "DESCRIPTION_PAYLOAD":
      sendTextMessage(senderID, postback[1]);
      sendTextMessageWithDelai(senderID, postback[1]);
      break;

    default:
        sendTextMessage(senderID, `Postback ${payload} reçu :D`);
  }

};

module.exports = {
  receivedPostBack
}
