/*
  * @author    MITA Oumaïma, SYOUMI El Mahdi
  * @since       JULY 10, 2017
  * @desc        Get parameter from word
  */
const {isMobilePhone} = require('./phone');
const {getCity} = require('./city');
const {getNeighborhood} = require('./neighborhood');
const {getOperation} = require('./operation');
const {getBuilding} = require('./building');
const {isCurrency} = require('./currency');
const {isNumber} = require('./number');

/*
  * @desc      Get parameter from word
  * @param     userWord : one word on user's text
  * @param     keywordParam: Parameter extract from keyword
  * @param     lang : language
  * @return    Parameter
  */
var getParameter = (userWord, keywordParam, lang) => {
  var name = keywordParam.split('|')[0].replace('#', '');
  var type = keywordParam.split('|')[1].replace('#', '');
  var param = {
    name,
    type,
    value: undefined
  };

  switch (type) {
    case 'phone':
      param.value = isMobilePhone(userWord)? userWord : undefined;
      break;
    case 'city':
      param.value = getCity(userWord, lang);
      break;
    case 'neighborhood':
      param.value = getNeighborhood(userWord, lang);
      break;
    case 'operation':
      param.value = getOperation(userWord, lang);
      break;
    case 'building':
      param.value = getBuilding(userWord, lang);
      break;
    case 'currency':
      param.value = isCurrency(userWord)? userWord : undefined;
      break;
    case 'number':
      param.value = isNumber(userWord)? userWord : undefined;
      break;
    default:
      //TODO
  }

  return param;
};


module.exports = {
  getParameter
};
