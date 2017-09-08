
const {doLogin} = require('./login');

const {getContact} = require('./handleContacts');

const {sendTextMessageWithDelay} = require('./../../send/fbApi/sendTextMessage');

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


  sendTextMessage(senderID, "Attendez, s'il vous plaît.");

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
                sendTextMessageWithDelay(senderID,  `${contact.Salutation} ${contact.Name}, votre demande est bien enregistrée.\nL'agent commercial vous appelera le plutôt possible.`);
                sendTextMessageWithDelay(senderID, "Nous sommes toujours à votre disposition si vous avez de nouvelles demandes :D.");
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
