
const request = require('request');

const {FB_PAGE_TOKEN} = require('./../include/config');
const {FB_PAGE_ID} = require('./../include/config');
const {FB_ADMIN_TOKEN} = require('./../include/config');

var sharePhoto = (text, image) => {
  request({
    uri: 'https://graph.facebook.com/2027653890797502/feed',
    qs: {
      access_token: FB_ADMIN_TOKEN,
      message: text
    },
    method: 'POST'
  }, (error, response, body) => {
    if (error) {
      console.log('Error occured while posting to facebook page.');
      return console.error('Error occured while posting to facebook page.');
    }

    console.log('Posted to facebook with status ' , response.statusCode);
  });
}

var shareStatus = (text) => {
  request({
    uri: 'https://graph.facebook.com/2027653890797502/feed',
    qs: {
      access_token: FB_ADMIN_TOKEN,
      message: text
    },
    method: 'POST'
  }, (error, response, body) => {
    if (error) {
      console.log('Error occured while posting to facebook page.');
      return console.error('Error occured while posting to facebook page.');
    }

    console.log('Posted to facebook with status ' , response.statusCode);
  });
}



module.exports = {
  sharePhoto, shareStatus
}
