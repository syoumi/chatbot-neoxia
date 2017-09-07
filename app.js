/**
 * Chatbot for facebook messenger
 * Created by : Neoxia
 * Version 1.0 beta - August 2017
 */

const express = require('express');
const bodyParser = require('body-parser');

const {PORT} = require('./include/config');
const {VERIFY_TOKEN} = require('./include/config');

const {receivedMessage} = require('./received/fbApi/receivedMessage');
const {receivedPostBack} = require('./received/fbApi/receivedPostBack');
const {receivedSeen} = require('./received/fbApi/receivedSeen');
const {receivedDelivery} = require('./received/fbApi/receivedDelivery');


var app = express();

// Adding some middlewares to fix some bugs
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// GET /webhook : Facebook first verification
app.get('/webhook', (req, res) => {

  if (req.query['hub.mode'] === 'subscribe' && req.query['hub.verify_token'] === VERIFY_TOKEN) {
      console.log("Validating webhook");
      res.status(200).send(req.query['hub.challenge']);

    } else {

      console.error("Failed validation webhook. Make sure the validation tokens match.");
      res.sendStatus(403);
    }
});

// POST /webhook : Receive all FB incoming requests
app.post('/webhook', (req, res) => {
  var data = req.body;

  // object proprety MUST BE 'page'
  if (data.object === 'page') {

    data.entry.forEach((oneEntry) => {
      var pageID = oneEntry.id;
      var timeOfEvent = oneEntry.time;

      oneEntry.messaging.forEach((event) => {

        if (event.message) {
          receivedMessage(event);

        } else if (event.postback) {
          receivedPostBack(event);

        } else if (event.read) {
          receivedSeen(event);

        } else if (event.delivery) {
					receivedDelivery(event);

        } else {
          console.log("Webhook received unknown event : ", event);
        }
      });
    });

    // We have to send satatus 200 OK as fast as we can
    // to avoid facebook alert
    res.sendStatus(200);
  }
});

//Form : Web to Lead
app.set('view engine', 'html');
app.set('views', './views');
app.use(express.static(__dirname + '/views'));

app.get("/formWTL", function(req, res){
  var senderID = req.param("senderID");
  console.log("SENDER ID: " , senderID);
  res.sendfile('./views/formWTL.html');
  console.log("REQ BODY form: ", req.body);
});


app.post("/completeFormWTL", function(req, res){

  res.sendfile('./views/completeFormWTL.html');
  console.log("REQ BODY Complete form: ", req.body);
});




// Let the server listening to incoming connections
app.listen(PORT, () => {
  console.log(`Listening to incoming connections on port ${PORT} ...`);
});
