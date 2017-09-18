/*
  * @author    MITA Oumaïma, SYOUMI El Mahdi
  * @since       JULY 10, 2017
  * @desc        Extract parameter email from user's text
  */
const validator = require('validator');

/*
  * @desc      Extract email from user's text
  * @param     text : user's text (Request.text)
  * @return    Email
  */
var extractEmail = (text) => {
  var tab = text.trim().split(/[ ,;?!:/\\*+'"<>]+/).filter((item) => {
    return item != '';
  });
  var validEmail = undefined;
  for (var i = 0; i < tab.length; i++) {
    if (validator.isEmail(tab[i])) {
      validEmail = tab[i];
      break;
    }
  }
  return validEmail;
};

module.exports = {
  extractEmail
};
