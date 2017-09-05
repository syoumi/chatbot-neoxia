
const {doLogin} = require('./login');

var addRequest = (senderID, building, operation, minPrice, maxPrice, nbrRooms, city, neighborhood, isTreated) => {
    doLogin((conn) => {
      var reqName = operation+building+senderID;
      conn.sobject("Request__c").create({Name: reqName, type__c: building}, function(err, res) {
        if (err) { return console.error(err); }
      });
    });
}


var editRequest = () => {

}

module.exports = {
  addRequest, editRequest
}
