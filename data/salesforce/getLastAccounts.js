/**
 *
 *
 */

 const {doLogin} = require('./login');
 const {sendTextMessageWithDelai} = require('./../../send/fbApi/sendTextMessage');
 const {sendBulkTextMessagesWithDelai} = require('./../../send/fbApi/sendBulkTextMessages');
 const {sendBulkTextMessages} = require('./../../send/fbApi/sendBulkTextMessages');

 var getLastAccounts = (senderID) => {
   doLogin((link) => {
     var records = [];
     link.query("SELECT Id, Name FROM Account LIMIT 3")
         .on('record', (record) => {
           records.push(record);
         })
         .on('end', () => {
           console.log('Getting last accounts finished');
         })
         .on('error', (err) => {
           console.error('Error occured while getting last 3 accounts...');
         })
         .run({autoFetch: true}, (err, response) => {
           if (err) {
             return console.error('Error occured while executing query');
           }

           var messagesToSend = [];
           if (response.records[0]) {
             messagesToSend.push(`The name of the first account is : ${response.records[0].Name}`);
           }
           if (response.records[1]) {
             messagesToSend.push(`The name of the second account is : ${response.records[1].Name}`);
           }
           if (response.records[2]) {
             messagesToSend.push(`The name of the third account is : ${response.records[2].Name}`);
           }
           console.log('Messages to send lenght ' , messagesToSend.length);
           sendBulkTextMessagesWithDelai(senderID, messagesToSend);
         });
   });
 };

 module.exports = {
   getLastAccounts
 }
