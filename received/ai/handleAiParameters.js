const {sendCatalogue} = require('./../../data/salesforce/sendCatalogue');

const {addRequest} = require('./../../data/salesforce/handleRequests');

const {updateContact} = require('./../../data/salesforce/handleContacts');

const {sendTextMessageWithDelay} = require('./../../send/fbApi/sendTextMessage');


var handleParameters = (senderID, text, params, action) => {
  switch(action){

    case 'send catalogue':
      var building = undefined;
      var operation = undefined;
      var minPrice = undefined;
      var maxPrice = undefined;
      var nbrRooms = undefined;
      var city = undefined;
      var neighborhood = undefined;

      //Extract params
      params.forEach((param) => {
        switch(param.name){
          case 'building':
            building = param.value;
            break;
          case 'operation':
            operation = param.value;
            break;
          case 'minPrice':
            minPrice = param.value;
            break;
          case 'maxPrice':
            maxPrice = param.value;
            break;
          case 'nbrRooms':
            nbrRooms = param.value;
            break;
          case 'city':
            city = param.value;
            break;
          case 'neighborhood':
            neighborhood = param.value;
            break;
        }
      });

      if(maxPrice < minPrice){
        var tmp = maxPrice;
        minPrice = maxPrice;
        maxPrice= tmp;
      }

      //sendCatalogue
      sendCatalogue(senderID, text, building, operation, minPrice, maxPrice, nbrRooms, city, neighborhood, 3);
      //Add request
      addRequest(senderID, building, operation, minPrice, maxPrice, nbrRooms, city, neighborhood, false);

      break;

    case "edit email":
      var email = undefined;
      params.forEach((param) => {
        if(param.name == 'email'){
          email = param.value;
        }
      });
      updateContact(senderID, undefined, undefined, undefined, undefined, email, undefined);
      sendTextMessageWithDelay(senderID, text);
      break;

    case "edit phone":
      var phone = undefined;
      params.forEach((param) => {
        if(param.name == 'phone'){
          phone = param.value;
        }
      });
      updateContact(senderID, undefined, undefined, undefined, undefined, undefined, phone);
      sendTextMessageWithDelay(senderID, text);
      break;

  }
}

module.exports = {
  handleParameters
}
