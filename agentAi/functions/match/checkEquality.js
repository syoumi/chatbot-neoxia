/*
  * @author    MITA Oumaïma, SYOUMI El Mahdi
  * @since       JULY 10, 2017
  * @desc        Check if two words are equals or similar or synonyms
  */
const fs = require('fs');

const {similarity} = require('./similarity');

const {MIN_SIMILARITY_PERCENT} = require('./../../include/config');

/*
  * @desc      Check equality of two strings
  * @param     s1 : String 1 (String)
  * @param     s2 : String 2 (String)
  * @param     lang : Language  (String)
  * @return    Boolean
  */
var checkEquality = (s1, s2, lang) => {
  s1 = s1.toLowerCase();
  s2 = s2.toLowerCase();
  var areEquals = false;

  //check if both strings are equals
  if (s1 === s2) {
    areEquals = true;

  } else {
    //check if both strings are synonyms
    if (areSynonyms(s1, s2, lang)) {
      areEquals = true;
    }
    //check if both strings are similar
    else {
      var similarityPercent = similarity(s1, s2) * 100;
      areEquals = (similarityPercent >= MIN_SIMILARITY_PERCENT);
    }
  }
  return areEquals;
};

/*
  * @desc      Check equality of two strings
  * @param     s1 : String 1 (String)
  * @param     s2 : String 2 (String)
  * @param     lang : Language  (String)
  * @return    Boolean
  */
var areSynonyms = (s1, s2, lang) => {
  var dico = fs.readFileSync('./agentAi/resources/' + lang + '/synonyms.json');
  var dicoObj = JSON.parse(dico);
  var data = dicoObj.data;
  var synonyms = false;
  data.forEach((entry) => {
    var found1 = entry.synonyms.find((item) => item == s1);
    var found2 = entry.synonyms.find((item) => item == s2);
    if (found1 && found2) {
      synonyms = true;
    }
  });
  return synonyms;
};

module.exports = {
  checkEquality
};
