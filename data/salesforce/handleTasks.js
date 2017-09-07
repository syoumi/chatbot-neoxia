
const {doLogin} = require('./login');

const {getContact} = require('./handleContacts');

var addTask = (senderID, salesmanID, productID, subject)=> {

  switch(subject){

    case "Envoyer devis":
      doLogin((conn) => {
        conn.sobject("Task").create({OwnerId: salesmanID, Status: 'Not Started', Subject: subject}, function(err, res) {
          if (err) { return console.error(err); }
        });
      });
      break;


    case "Contacter client":
      doLogin((conn) => {

        getContact(senderID, undefined, (contact) => {
          if(contact){
            conn.sobject("Task").create({OwnerId: salesmanID, Status: 'Not Started', Subject: subject, WhoId : contact.Id, WhatId: productID}, function(err, res) {
              if (err) { return console.error(err); }
            });
          }
        });

      });
      break;

  }
}

module.exports = {
  addTask
}
