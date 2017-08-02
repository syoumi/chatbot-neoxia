/**
 *
 *
 */

 const request = require('request');
 const {FB_PAGE_TOKEN} = require('./../../include/config');

 var callSendAPI = (messageData) => {
   // We are using request package to send HTTP request to FB API
   request({
     uri: 'https://graph.facebook.com/v2.6/me/messages',
     qs: {
       access_token: FB_PAGE_TOKEN
     },
     method: 'POST',
     json: messageData
   }, (error, response, body) => {
     if (!error && response.statusCode === 200) {

       var recipientID = body.recipient_id;
       var messageID = body.message_id;

       console.log(`#### Message sent informations ####`);
       console.log(`| recipientID ${recipientID}`);
       console.log(`| messageID ${messageID}`);
       console.log(`################END MSI############`);
     } else {

       console.error(`#### Message sent errors ####`);
       console.error(error);
       console.error(`################END MSE######`);
     }

   });
 };

 var syncCallSendAPI = (messageData, callback) => {
   request({
     uri: 'https://graph.facebook.com/v2.6/me/messages',
     qs: {
       access_token: FB_PAGE_TOKEN
     },
     method: 'POST',
     json: messageData
   }, (error, response, body) => {

     // We call callback to give the green light for the next asynchronous operation
     callback();

     console.log('Response recieved');
     if (!error && response.statusCode === 200) {

       var recipientID = body.recipient_id;
       var messageID = body.message_id;

       console.log(`#### Message sent informations ####`);
       console.log(`| recipientID ${recipientID}`);
       console.log(`| messageID ${messageID}`);
       console.log(`################END MSI############`);
     } else {

       console.error(`#### Message sent errors ####`);
       console.error(error);
       console.error(`################END MSE######`);
     }


   });
 }

 module.exports = {
   callSendAPI,
   syncCallSendAPI
 };
