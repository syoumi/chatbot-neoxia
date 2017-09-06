
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

//Get user's last request
var getRequest = (senderID, callback) => {
    doLogin((conn) => {
      var request = undefined;
      var query = "SELECT Name, FacebookId__c, isTreated__c FROM Request__c";
      conn.query(query, (err, res) => {
        if (err) { return console.error(err); }

          for (var i=0; i<res.records.length; i++) {
            var record = res.records[i];

            if(senderID == record.FacebookId__c){
              request = record;
            }
          }
        callback(request);
      });
    });
}

//Update request is Treated or not
var updateRequest = (senderID, isTreated) => {
      doLogin((conn) => {
        var query = "SELECT isTreated__c, FacebookID__c FROM Request__c WHERE FacebookID__c= '" + senderID + "' ORDER BY CreatedDate DESC LIMIT 1";
        conn.query(query)
            .update({ isTreated__c : isTreated }, 'Request__c', function(err, rets) {
              if (err) { return console.error(err); }
              console.log(rets);

            });
      });
}

module.exports = {
  addRequest, updateRequest, getRequest
}
