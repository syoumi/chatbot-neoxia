
const {doLogin} = require('./login');

const {getContact} = require('./handleContacts');

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

  var task = tasks.get(senderID);

  console.log('TASK FOUND :', task);

  if(task){

    switch(task.subject){

      case "Envoyer devis":
        doLogin((conn) => {
          conn.sobject("Task").create({OwnerId: task.salesmanID, Status: 'Not Started', Subject: task.subject}, function(err, res) {
            if (err) { return console.error(err); }
          });
        });
        break;


      case "Contacter client":
        console.log("NEW TASK");
        doLogin((conn) => {

          getContact(senderID, undefined, (contact) => {
            if(contact){
              conn.sobject("Task").create({OwnerId: task.salesmanID, Status: 'Not Started', Subject: task.subject, WhoId : contact.Id, WhatId: task.productID}, function(err, res) {
                if (err) { return console.error(err); }
                tasks.delete(senderID);
                console.log('TASK DELETED');
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
