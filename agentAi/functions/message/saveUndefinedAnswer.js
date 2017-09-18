/*
  * @author    MITA Oumaïma, SYOUMI El Mahdi
  * @since       JULY 10, 2017
  * @desc        Save undefined answer
  */
const fs = require('fs');

var unsaved = fs.readFileSync('./agentAi/resources/unsaved.json');
var messages= JSON.parse(unsaved);

/*
  * @desc      Save undefined answer only once
  * @param     message : user's text (Request.text)
  * @return    void
  */
var saveUndefinedAnswer= (message)=> {
  var index= -1;
  for (var i= 0; i< messages.length; i++) {
   var msg= messages[i];
   if(msg === message){
    index=i;
    break;
   }
 }
 if(index == -1){
   messages.push(message);
   fs.writeFile('./agentAi/resources/unsaved.json', JSON.stringify(messages), 'utf8');
 }

};

module.exports= {
  saveUndefinedAnswer
};
