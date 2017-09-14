const {extractEmail} = require('./email');
const {extractPhoneNumber} = require('./phone');
const {extractCity} = require('./city');
const {extractNeighborhood} = require('./neighborhood');
const {extractOperation} = require('./operation');
const {extractBuilding} = require('./building');
const {extractCurrency} = require('./currency');
const {extractNumber} =  require('./number');



var extractParameters = (messageText, keywordParam, lang) => {
  var name = keywordParam.split('|')[0].replace('#', '');
  var type = keywordParam.split('|')[1].replace('#', '');
  var param = {
    name,
    type,
    value: undefined
  };

  switch (type) {
    case 'email':
      param.value = extractEmail(messageText);
      break;
    case 'phone':
      param.value = extractPhoneNumber(messageText);
      break;
    case 'city':
      param.value = extractCity(messageText, lang);
      break;
    case 'neighborhood':
      param.value = extractNeighborhood(messageText, lang);
      break;
    case 'operation':
      param.value = extractOperation(messageText, lang);
      break;
    case 'building':
      param.value = extractBuilding(messageText, lang);
      break;
    case 'currency':
      param.value = extractCurrency(messageText);
      break;
    case 'number':
      param.value = extractNumber(messageText);
      break;
    default:
      //TODO
  }

  return param;
};

module.exports = {
  extractParameters
};
