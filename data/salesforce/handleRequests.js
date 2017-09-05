
const {doLogin} = require('./login');

var addRequest = (senderID, building, operation, minPrice, maxPrice, nbrRooms, city, neighborhood, isTreated) => {
    doLogin((conn) => {
      var query = "INSERT INTO lead (type__c, operation__c, name) VALUES ('"+ building + "', '" +  operation+ "', '" + operation + building + "')";
      conn.query(query, (err, res) => {
        if (err) { return console.error(err); }
      });
    });
}


var editRequest = () => {

}

module.exports = {
  addRequest, editRequest
}
