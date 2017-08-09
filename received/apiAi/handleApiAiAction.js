/**
 *
 *
 */

const {sendButtonMessage} = require('./../../send/fbApi/sendButtonMessage');

const {sendFileMessage} = require('./../../send/fbApi/sendFileMessage');
const {sendGenericMessage} = require('./../../send/fbApi/sendGenericMessage');
const {sendImageMessage} = require('./../../send/fbApi/sendImageMessage');
const {sendQuickReplies} = require('./../../send/fbApi/sendQuickReplies');
const {sendTextMessage} = require('./../../send/fbApi/sendTextMessage');

const {getLastAccounts} = require('./../../data/salesforce/getLastAccounts');


//By action
var handleApiAiAction= (senderID, action, responseText, contexts, parameters) => {
	switch (action) {

		case "catalogue-appart-achat":
			//sendCatalogueAppartVente(senderID, responseText);
		break;

    case "say-c":
      sendTextMessage(senderID, 'You said c');
    break;

    case 'test-sf':
      getLastAccounts(senderID);
      break;

		default:
			// Unhandled action, just send back the text
			sendTextMessage(senderID, responseText);
	}
}


module.exports={
    handleApiAiAction
}
