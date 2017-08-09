
const {handleAiResponse} = require('./../../received/ai/handleAiResponse');


var sendToAi = (answer) => {
	handleAiResponse(answer.recipientID, answer);
}


module.exports={
    sendToAi
}
