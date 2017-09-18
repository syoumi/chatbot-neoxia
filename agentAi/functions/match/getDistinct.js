/*
  * @author    MITA Oumaïma, SYOUMI El Mahdi
  * @since       JULY 10, 2017
  * @desc        Get distinct words of entry's keywords
  */
const {isIgnorable} = require('./../treatment/ignoreWords');

/*
  * @desc      Get distinct words of entry's keywords
  * @param     keywords : Entry's keywords / user says
  * @return    Array of distinct words (Array of String)
  */
var getDistinct= (keywords, lang) => {
  var distincts= [];

  keywords.forEach((keyword) => {
    var tab = keyword.split(' ');
    tab.forEach((word)=> {
      if (distincts.indexOf(word.toLowerCase()) == -1) distincts.push(word.toLowerCase());
    });
  });

  distincts = distincts.filter((item) => {
    return item != '' && !(isIgnorable(item, lang));
  });

  return distincts;
};



module.exports={
  getDistinct
};
