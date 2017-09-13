const {isIgnorable} = require('./../treatment/ignoreWords');

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
}



module.exports={
  getDistinct
}
