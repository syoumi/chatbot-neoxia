
const {doLogin} = require('./login');

var addTask = (senderID, salesmanID, productID, subject)=> {

  switch(subject){

    case "Envoyer devis":
      doLogin((conn) => {
        conn.sobject("Task").create({OwnerId: salesmanID, Status: 'Not Started', Subject: subject}, function(err, res) {
          if (err) { return console.error(err); }
        });
      });
      break;


    case "Appeler client":
      doLogin((conn) => {
        conn.sobject("Task").create({OwnerId: salesmanID, Status: 'Not Started', Subject: subject}, function(err, res) {
          if (err) { return console.error(err); }
        });
      });
      break;

  }
}

module.exports = {
  addTask
}
