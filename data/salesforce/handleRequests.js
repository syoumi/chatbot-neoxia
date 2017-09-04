
const {doLogin} = require('./login');

var addRequest = (senderID, building, operation, minPrice, maxPrice, nbrRooms, city, neighborhood, isTreated) => {
    doLogin((conn) => {
//       INSERT INTO table_name (column1, column2, column3, ...)
// VALUES (value1, value2, value3, ...);
      var query = "INSERT INTO Request__c (name, operation__c, isTreated__c, neighborhood__c, city__c, number_of_rooms__c, type__c, maximum_price__c, minimum_price__c, FacebookID__c) VALUES ('" + operation + building + senderID + "', '" + operation + "', " +  isTreated +", '" + neighborhood + "', '" + city +"', " +  nbrRooms +", " +  maxPrice + ", " + minPrice + ", " + senderID + ")";
      conn.query(query, (err) => {
        if (err) { return console.error(err); }
      });
    });
}


var editRequest = () => {

}

module.exports = {
  addRequest, editRequest
}
