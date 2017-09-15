
const request = require('request');

const {FB_PAGE_TOKEN} = require('./../include/config');
const {FB_PAGE_ID} = require('./../include/config');
const {FB_ADMIN_TOKEN} = require('./../include/config');


//Share photo on FB page
var sharePhoto = (text, image) => {
  request({
    uri: 'https://graph.facebook.com/2027653890797502/photos',
    qs: {
      access_token: FB_ADMIN_TOKEN,
      message: text,
      url: image
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

//Post status on FB page
var shareStatus = (text) => {
  var link = 'https://graph.facebook.com/' + FB_PAGE_ID + '/feed';
  request({
    uri: link,
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
