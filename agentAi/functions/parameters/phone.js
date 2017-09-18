/*
  * @author    MITA Oumaïma, SYOUMI El Mahdi
  * @since       JULY 10, 2017
  * @desc        Extract parameter phone from user's text
  */


/*
  * @desc      Extract phone from user's text
  * @param     text : user's text (Request.text)
  * @return    Phone
  */
var extractPhoneNumber = (text) => {
  var possibleNumbers = [];
  var digits = '1234567890';
  for (var i = 0; i < text.length; i++) {
    if (digits.indexOf(text[i]) != -1 || (text[i] == '+')) {
      var number = '';
      do {
        number = number.concat(text[i]);
        i++;
      } while (digits.indexOf(text[i]) != -1 || text[i] == '+' || text[i] == '.' || text[i] == '-' || text[i] == ' ' || text[i] == '(' || text[i] == ')');
      possibleNumbers.push(number);
    }
  }
  console.log(possibleNumbers);
  var phoneNumber = undefined;
  for (var i = 0; i < possibleNumbers.length; i++) {
    if (isMobilePhone(possibleNumbers[i])) {
      phoneNumber = possibleNumbers[i];
      break;
    }
    /* if (phone(possibleNumbers[i])) {
      phoneNumber = possibleNumbers[i];
    }  */
  }
  //console.log('PHONE NUMBER: ', phoneNumber);
  return phoneNumber;
};


/*
  * @desc     Check if a word is phone number
  * @param     word : word from user's text
  * @return    Boolean
  */
var isMobilePhone = (phone) => {
  var isValid = (phone.length >= 8) ? true : false;
  if (!(phone[0] == '+' || phone[0] == '0')) {
    isValid = false;
  } else {
    if (phone[0] == '+' && (phone.length < 12 || phone.length > 20)) {
      isValid = false;
    } else if (phone[0]) {
      if (phone[1] == '0' && (phone.length < 12 || phone.length > 22)) {
        isValid = false;
      } else if (phone[1] != '0' && (phone.length < 8 || phone.length > 20)) {
        isValid = false;
      }
    }
  }
  return isValid;
};

module.exports = {
  extractPhoneNumber, isMobilePhone
};
