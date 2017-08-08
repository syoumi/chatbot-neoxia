
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

		case "catalogue-action":
			//sendCatalogueAppartVente(senderID, text);
      var replies = ["Appartement", "Maison", "Villa", "Studio"];
      sendQuickReplies(senderID, text, replies);
		  break;

		default:
			//unhandled action, just send back the text
			sendTextMessage(senderID, text);
	}
}


module.exports={
    handleAiAction
}
