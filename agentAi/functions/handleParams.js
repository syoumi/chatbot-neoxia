
var verifyParam = (type, text) => {
  var param=undefined;

  switch(type){
    case 'number':
      param = 'return number';
      break;
    case 'currency':
      param = 'return currency';
      break;
    case 'phone-number':
      param = 'return phone-number';
      break;
    case 'email':
      param = 'return email';
      break;
    default :
      param = 'return any';
  }

  return param;
}




module.exports = {
  verifyParam
}
