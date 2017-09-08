
const {doLogin} = require('./login');

const {getContact} = require('./handleContacts');

const {sendTextMessageWithDelay} = require('./../../send/fbApi/sendTextMessage');

const {getText} = require('./../../utils/getPredefinedAnswers');


var tasks = new Map();

//Save task in map before insert it
var saveTask = (senderID, salesmanID, productID, subject)=> {

 var data = {
   salesmanID,
   productID,
   subject
 }

 tasks.set(senderID, data);

 console.log('TASK SAVED: ', tasks);

}


//Insert task
var addTask = (senderID) => {

  sendTextMessageWithDelay(senderID, getText('fr', 'Ask to wait', undefined));

  var task = tasks.get(senderID);

  console.log('TASK FOUND :', task);

  if(task){

    switch(task.subject){

      case "Envoyer devis":
        doLogin((conn) => {
          conn.sobject("Task").create({OwnerId: task.salesmanID, Status: 'Not Started', Subject: task.subject}, function(err, res) {
            if (err) { return console.error(err); }
            //TODO vérifier que le devis a été bien envoyé et selon le cas envoyer un message au client
          });
        });
        break;


      case "Contacter client":
        console.log("NEW TASK");
        doLogin((conn) => {

          getContact(senderID, (contact) => {
            console.log('CONTACT FOUND: ', contact);
            if(contact){
              conn.sobject("Task").create({OwnerId: task.salesmanID, Status: 'Not Started', Subject: task.subject, WhoId : contact.Id, WhatId: task.productID}, function(err, res) {
                if (err) { return console.error(err); }
                tasks.delete(senderID);
                console.log('TASK DELETED');

                //Message to send
                var salutation = contact.Salutation;
                if(!salutation) salutation = '';
                sendTextMessageWithDelay(senderID, getText('fr', 'Task call salesman', salutation + ' ' + contact.Name + ','));
                sendTextMessageWithDelay(senderID, getText('fr', 'Ask for something else', undefined));
                
              });
            }
          });


        });
        break;

    }
  }


}

module.exports = {
  saveTask, addTask
}
