var validator = require('validator');

var getCurrencyParam = (text) => {
  var possibleCurr = [];
  var digits = '1234567890';
  for (var i = 0; i < text.length; i++) {
    if (digits.indexOf(text[i]) != -1) {
      var curr = '';
      do {
        curr = (text[i] == '.' || text[i] == ',') ? curr.concat('.') : curr.concat(text[i]);
        i++;
      } while (digits.indexOf(text[i]) != -1 || [',', '.'].indexOf(text[i]) != -1);
      possibleCurr.push(parseFloat(curr));
    }
  }
  return Math.max.apply(null, possibleCurr);
};

module.exports = {
  getCurrencyParam
};
