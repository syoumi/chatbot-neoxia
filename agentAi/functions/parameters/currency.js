/*
  * @author    MITA Oumaïma, SYOUMI El Mahdi
  * @since       JULY 10, 2017
  * @desc        Extract parameter currency from user's text
  */

/*
  * @desc      Extract currency from user's text
  * @param     text : user's text (Request.text)
  * @return    Building
  */
var extractCurrency = (text) => {
  var possibleCurrencies = [];
  var digits = '0123456789';
  for (var i = 0; i < text.length; i++) {
    if (digits.indexOf(text[i]) != -1) {
      var nb = '';
      var containsDecimalPoint = false;
      do {
        if (text[i] == '.' || text[i] == ',') {
          if (containsDecimalPoint) {
            i++;
            break;
          } else {
            nb += '.';
            containsDecimalPoint = true;
          }
        } else {
          nb += text[i];
        }
        i++;
      } while (digits.indexOf(text[i]) != -1 || text[i] == ',' || text[i] == '.');
      possibleCurrencies.push(nb);
    }
  }
  var currencyFound = undefined;
  var maxCurrency = -999;
  for (var i = 0; i < possibleCurrencies.length; i++) {
    if (isCurrency(possibleCurrencies[i])) {
      currencyFound = parseFloat(possibleCurrencies[i]);
      if (currencyFound > maxCurrency) {
        maxCurrency = currencyFound;
      }
    }
  }
  return currencyFound ? maxCurrency : undefined;
};

/*
  * @desc     Check if a word is currency
  * @param     word : word from user's text
  * @return    Boolean
  */
var isCurrency = (curr) => {
  return !isNaN(parseFloat(curr));
};

module.exports = {
  extractCurrency,
  isCurrency
};
