
const {doLogin} = require('./login');

//Create new request
var addRequest = (senderID, building, operation, minPrice, maxPrice, nbrRooms, city, neighborhood, isTreated) => {
    doLogin((conn) => {
      var reqName = operation + '_' + building + '_' + senderID;
      conn.sobject("Request__c").create({Name: reqName, type__c: building, operation__c: operation, Minimum_price__c: minPrice, Maximum_price__c: maxPrice, Number_of_rooms__c: nbrRooms, City__c: city, Neighborhood__c: neighborhood, isTreated__c: isTreated, FacebookID__c: senderID}, function(err, res) {
        if (err) { return console.error(err); }
      });
    });
}


//Modify existing request
var editRequest = (senderID, requestID, isTreated) => {
  doLogin((conn) => {

  });
}

module.exports = {
  addRequest, editRequest
}
