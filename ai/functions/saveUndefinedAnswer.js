const fs = require('fs');

var unsaved = fs.readFileSync('./ai/resources/unsaved.json');

var messages= JSON.parse(unsaved);

//save undefined answer only once
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
   fs.writeFile('./ai/resources/unsaved.json', JSON.stringify(messages), 'utf8');
 }

}

module.exports= {
  saveUndefinedAnswer
}
