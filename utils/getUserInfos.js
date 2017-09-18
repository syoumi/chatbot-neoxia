/*
  * @author    MITA Oumaïma, SYOUMI El Mahdi
  * @since       JULY 10, 2017
  * @desc       Handle user's request saved on Salesforce
  */
const {FB_PAGE_TOKEN} = require('./../include/config');
const request = require('request');

/*
  * @desc      Get user's informations such as his facebook's name, his gender, his photo profil, timezone and local by his id using graph API
  * @param     userID: user's facebook ID
  * @return    user's informations
  */
var getUserInfos = (userID, callback) => {
  request({
    uri: `https://graph.facebook.com/v2.6/${userID}`,
    qs: {
      fields: 'first_name,last_name,profile_pic,locale,timezone,gender',
      access_token: FB_PAGE_TOKEN
    },
    method: 'GET'
  }, (error, response, body) => {
    if (!error && response.statusCode == 200) {
	  var bodyObj= JSON.parse(body);
      callback(bodyObj.first_name, bodyObj.last_name, bodyObj.profile_pic, bodyObj.locale, bodyObj.timezone, bodyObj.gender);
    } else {
      console.error('### ERROR WHILE RETRIEVING USER INFOS ###');
      console.error(error);
      console.error('### END ERROR USER INFOS ###');
    }
  });
};


module.exports = {
  getUserInfos
}
