
var {updateLead} = require('./../data/salesforce/handleLeads');
var {convertLead} = require('./../data/salesforce/handleLeads');

var {addTask} = require('./../data/salesforce/handleTasks');


var getFormLead = (req, callback) => {
  var result = undefined;

  var senderID = req.senderID;
  var fname = req.first_name;
  var lname = req.last_name;
  var company = req.company;
  var city = req.city;
  var country = req.country;
  var email = req.email;
  var phone = req.phone ;

  updateLead(senderID, fname, lname, company, city, country, email, phone, (lead) => {

    if(lead){
      result = lead;
      console.log('UPDATE LEAD FOUND');

      //It's time to convert lead :D
      convertLead(senderID);

      /*setTimeout(() => {
          addTask(senderID);
      }, 10000);*/

    }
  });


  callback(result);
}

module.exports  = {
  getFormLead
}
