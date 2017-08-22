const {sendCatalogue} = require('./../../data/salesforce/sendCatalogue');


var handleParameters = (senderID, params, action) => {
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
      sendCatalogue(senderID, building, operation, minPrice, maxPrice, nbrRooms, city, neighborhood);
      break;
  }
}

module.exports = {
  handleParameters
}
