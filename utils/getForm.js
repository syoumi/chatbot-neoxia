
var {upsertLead} = require('./../data/salesforce/handleLeads');

var getLead = (req, callback) => {
  var result = undefined;

  var senderID = req.senderID;
  var fname = req.first_name;
  var lname = req.last_name;
  var company = req.company;
  var city = req.city;
  var email = req.email;
  var phone = req.mobile ;

  upsertLead(senderID, fname, lname, company, city, email, phone, (lead) => {
    if(lead){
      result = lead;
    }
  });

  callback(result);
}

module.exports  = {
  getLead
}
