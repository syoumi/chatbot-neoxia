
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

}


//Insert task
var addTask = (senderID) => {

  var task = tasks.has(senderID);

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
        doLogin((conn) => {

          getContact(senderID, undefined, (contact) => {
            if(contact){
              conn.sobject("Task").create({OwnerId: task.salesmanID, Status: 'Not Started', Subject: task.subject, WhoId : contact.Id, WhatId: task.productID}, function(err, res) {
                if (err) { return console.error(err); }
                tasks.delete(senderID);
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
