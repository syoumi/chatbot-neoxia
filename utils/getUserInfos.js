const {FB_PAGE_TOKEN} = require('./../include/config');
const request = require('request');


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
