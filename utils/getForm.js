
const {updateLead} = require('./../data/salesforce/handleLeads');
const {convertLead} = require('./../data/salesforce/handleLeads');

const {getContact} = require('./../data/salesforce/handleContacts');
const {updateContact} = require('./../data/salesforce/handleContacts');

const {addTask} = require('./../data/salesforce/handleTasks');



//Get Form Lead
var getFormLead = (req) => {

  //Fields
  var senderID = req.senderID;
  var fname = req.first_name;
  var lname = req.last_name;
  var company = req.company;
  var city = req.city;
  var country = req.country;
  var email = req.email;
  var phone = req.phone ;

  //TODO Verify Company doesn't exist

  updateLead(senderID, fname, lname, company, city, country, email, phone, (lead) => {

    if(lead){
      //Check if lead's alrealy converted
      getContact(senderID, (contact) => {
        if(!contact){
          //It's time to convert lead if he's not converted yet :D
          convertLead(senderID, () => {
            console.log('LEAD CONVERTED');
            addTask(senderID);
          });
        }
        else {
          //Just update contact
          console.log('UPDATE CONTACT');
          updateContact(senderID, fname, lname, company, city, country, email, phone);
        }
      });
    }

  });


}

//Get Form Lead
var getFormContact = (req) => {

  //Fields
  var senderID = req.senderID;
  var fname = req.first_name;
  var lname = req.last_name;
  var city = req.city;
  var country = req.country;
  var email = req.email;
  var phone = req.phone ;

  //Update Lead (Hidden Lead) and Contact
  getContact(senderID, (contact) => {
        updateLead(senderID, fname, lname, contact.company, city, country, email, phone, (lead) => {
          if(contact){
            updateContact(senderID, fname, lname, city, country, email, phone);
          }
        });
  });

}



module.exports  = {
  getFormLead, getFormContact
}
