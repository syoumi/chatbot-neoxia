
const {doLogin} = require('./login');

//Create new request
var addRequest = (senderID, building, operation, minPrice, maxPrice, nbrRooms, city, neighborhood, isTreated) => {
    doLogin((conn) => {
      var reqName = operation+building+senderID;
      conn.sobject("Request__c").create({Name: reqName, type__c: building, operation__c: operation, Minimum_price__c: minPrice}, function(err, res) {
        if (err) { return console.error(err); }
      });
    });
}


//Modify existing request
var editRequest = () => {

}

module.exports = {
  addRequest, editRequest
}
