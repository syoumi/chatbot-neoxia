/*
  * @author    MITA Oumaïma, SYOUMI El Mahdi
  * @since       JULY 10, 2017
  * @desc        Handle Tasks
  */
const {doLogin} = require('./login');

const {getContact} = require('./handleContacts');

const {sendQuote} = require('./sendQuote');

const {sendTextMessageWithDelay} = require('./../../send/fbApi/sendTextMessage');

const {getText} = require('./../../utils/getPredefinedAnswers');

var tasks = new Map();

/*
  * @desc      Save task in map before insert it
  * @param     senderID : contact's facebookId
  * @param     salesmanID : salesman's Id
  * @param     productID : product's Id choose by contact
  * @param     subject : task's subject
  * @return    void
  */
var saveTask = (senderID, salesmanID, productID, subject)=> {
 var data = {
   salesmanID,
   productID,
   subject
 }
 tasks.set(senderID, data);
 console.log('TASK SAVED: ', data);
}

/*
  * @desc      Insert task
  * @param     senderID : contact's facebookId
  * @return    void
  */
var addTask = (senderID) => {
  //Ask user to wait
  sendTextMessageWithDelay(senderID, getText('fr', 'Ask to wait', undefined));

  var task = tasks.get(senderID);
  //console.log('TASK FOUND :', task);

  if(task){
    switch(task.subject){

      case "Envoyer devis":
        doLogin((conn) => {
          getContact(senderID, (contact) => {
            console.log('CONTACT FOUND: ', contact);
            if(contact){
              conn.sobject("Task").create({OwnerId: task.salesmanID, Status: 'Not Started', Subject: task.subject, WhoId : contact.Id, WhatId: task.productID}, function(err, res) {
                if (err) { return console.error(err); }
                tasks.delete(senderID);
                console.log('TASK DELETED');

                //Send Quote
                sendQuote(contact, task.productID, 1);

                //Message to send
                var salutation = contact.Salutation;
                if(!salutation) salutation = '';
                sendTextMessageWithDelay(senderID, getText('fr', 'Task send quote', salutation + ' ' + contact.Name + ','));
              });
            }
          });
        });
        break;


      case "Contacter client":
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
              });
            }
          });
        });
        break;

    }
  }

};

module.exports = {
  saveTask, addTask
};
