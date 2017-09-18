/*
  * @author    MITA Oumaïma, SYOUMI El Mahdi
  * @since       JULY 10, 2017
  * @desc        Handle Requests
  */
const {doLogin} = require('./login');

/*
  * @desc      Create new request
  * @param     senderID : user's facebookId
  * @param     building : Building choose by user
  * @param     operation : Operation choose by user
  * @param     minPrice : minimum price choose by user
  * @param     maxPrice : maximum price choose by user
  * @param     nbrRooms : number of rooms choose by user
  * @param     city : city choose by user
  * @param     neighborhood : neighborhood choose by user
  * @param     isTreated : isTreated
  * @return    void
  */
var addRequest = (senderID, building, operation, minPrice, maxPrice, nbrRooms, city, neighborhood, isTreated) => {
  getRequest(senderID, (request) => {
    console.log('REQUEST__C FOUND: ', request);
    if(!checkRequest(building, operation, city, neighborhood, request)) {
      doLogin((conn) => {
        var reqName = operation + '_' + building + '_' + senderID;
        conn.sobject("Request__c").create({Name: reqName, type__c: building, operation__c: operation, Minimum_price__c: minPrice, Maximum_price__c: maxPrice, Number_of_rooms__c: nbrRooms, City__c: city, Neighborhood__c: neighborhood, isTreated__c: isTreated, FacebookID__c: senderID}, function(err, res) {
          if (err) { return console.error(err); }
        });
      });
    }
  });
};

/*
  * @desc      Get user's last request
  * @param     senderID : user's facebookId
  * @return    Request
  */
var getRequest = (senderID, callback) => {
    doLogin((conn) => {
      var request = undefined;
      var query = "SELECT Name, FacebookId__c, isTreated__c, City__c, Neighborhood__c, Type__c, Operation__c FROM Request__c WHERE FacebookId__c = '" + senderID + "' ORDER BY CreatedDate DESC LIMIT 1 ";
      conn.query(query, (err, res) => {
        if (err) { return console.error(err); }
        if(res.records.length > 0){
          request = res.records[0];
        }
        callback(request);
      });
    });
};

/*
  * @desc      Get all user's requests
  * @param     senderID : user's facebookId
  * @return    Request
  */
var getAllRequests = (senderID, callback) => {
    doLogin((conn) => {
      var requests = [];
      var query = "SELECT Name, FacebookId__c, isTreated__c FROM Request__c WHERE FacebookId__c = '" + senderID + "' ORDER BY CreatedDate DESC ";
      conn.query(query, (err, res) => {
        if (err) { return console.error(err); }
        res.records.forEach( (record) => {
          requests.push(record);
        });
        callback(requests);
      });
    });
};

/*
  * @desc      Update request is Treated or not
  * @param     senderID : user's facebookId
  * @param     isTreated : isTreated
  * @return    void
  */
var updateRequest = (senderID, isTreated) => {
      doLogin((conn) => {
        var query = "SELECT Id, isTreated__c, FacebookId__c FROM Request__c WHERE FacebookId__c= '" + senderID + "' ORDER BY CreatedDate DESC LIMIT 1";
        conn.query(query)
            .update({ isTreated__c : isTreated }, 'Request__c', function(err, rets) {
              if (err) { return console.error(err); }
              console.log(rets);
            });
      });
};

/*
  * @desc      Check if request already exists or not
  * @param     building : building
  * @param     operation : operation
  * @param     city : city
  * @param     neighborhood : neighborhood
  * @param     request : user's last request
  * @return    Boolean
  */
var checkRequest = (building, operation, city, neighborhood, request) => {
  if(request){
    if(request.Type__c.toLowerCase() == building.toLowerCase() && request.Operation__c.toLowerCase() == operation.toLowerCase()) {
      if(city && neighborhood){
        return ( (request.City__c.toLowerCase() == city.toLowerCase()) && (request.Neighborhood__c.toLowerCase() == Neighborhood__c.toLowerCase()) );
      }
      else if(city) {
        return (request.City__c.toLowerCase() == city.toLowerCase());
      }
      else if(neighborhood){
          return (request.neighborhood__c.toLowerCase() == neighborhood.toLowerCase());
      }
      else {
        return true;
      }
    }
    return false;
  }
  return false;
};


module.exports = {
  addRequest, updateRequest, getRequest, getAllRequests
};
