
const {doLogin} = require('./login');

var addRequest = (senderID, building, operation, minPrice, maxPrice, nbrRooms, city, neighborhood, isTreated) => {
    doLogin((conn) => {
      conn.query("Request").create({Name: operation+building+senderID }, function(err, res) {
        if (err) { return console.error(err); }
      });
    });
}


var editRequest = () => {

}

module.exports = {
  addRequest, editRequest
}
