
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

//Get last user's request
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
  getRequest(senderID, (request) => {

    if(request){

      doLogin((conn) => {
        conn.sobject('Request__c')
            .find({ 'FacebookID__c' : senderID })
            .update({isTreated__c: isTreated }, function(err, rets) {
              if (err) { console.log("ERROR", err); return console.error(err); }
              console.log('REQUEST UPDATED');
            });
      });

    }

  });

}

module.exports = {
  addRequest, updateRequest, getRequest
}
