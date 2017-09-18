/*
  * @author    MITA Oumaïma, SYOUMI El Mahdi
  * @since       JULY 10, 2017
  * @desc        Remove punctuation from a word
  */

/*
  * @desc     Remove punctuation from a word
  * @param     word : word from user's text
  * @return    Word without punctuation
  */
var removePunctuation = (word) => {
  return word.replace(/[,;.?!@()#:/]+/, "");
};

module.exports = {
  removePunctuation
};
