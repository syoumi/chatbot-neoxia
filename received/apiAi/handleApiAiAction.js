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
	

}


module.exports={
    handleApiAiAction
}
