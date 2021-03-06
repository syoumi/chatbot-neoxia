/*
  * @author    MITA Oumaïma, SYOUMI El Mahdi
  * @since       JULY 10, 2017
  * @desc       In this file, we put all the logic for sending HTTP request to FB API
  */
 const request = require('request');
 const {FB_PAGE_TOKEN} = require('./../../include/config');

/*
  * @desc      Create a JSON object and send it to Facebook via HTTP request
  * @param     messageData : message data to send
  * @return    void
  */
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
      //  console.log(`| recipientID ${recipientID}`);
      //  console.log(`| messageID ${messageID}`);
      //  console.log(`################END MSI############`);
     } else {
       console.error(`#### Message sent errors ####`);
       console.error(error);
     }

  });
};

/*
  * @desc      Create a JSON object and send it to Facebook via HTTP request. This function accepts a callback as a parameter in order that async module make the operation synchronous
  * @param     messageData : message data to send
  * @return    void
  */
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

     console.log("***********APPEL: syncCallSendAPI********");

     console.log('Response recieved');
     if (!error && response.statusCode === 200) {

       var recipientID = body.recipient_id;
       var messageID = body.message_id;

      //  console.log(`#### Message sent informations ####`);
      //  console.log(`| recipientID ${recipientID}`);
      //  console.log(`| messageID ${messageID}`);
      //  console.log(`################END MSI############`);
     } else {
      //  console.error(`#### Message sent errors ####`);
      //  console.error(error);
      //  console.error(`################END MSE######`);
     }
  });
};


 module.exports = {
   callSendAPI,
   syncCallSendAPI
 };
