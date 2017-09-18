/*
  * @author    MITA Oumaïma, SYOUMI El Mahdi
  * @since       JULY 10, 2017
  * @desc       Handle sharing on Facebook page
  */
const request = require('request');

const {FB_PAGE_TOKEN} = require('./../include/config');
const {FB_PAGE_ID} = require('./../include/config');
const {FB_ADMIN_TOKEN} = require('./../include/config');

/*
  * @desc      Share photo on Facebook page
  * @param     text : Text to post with image as description
  * @param     image : image to share
  * @return    void
  */
var sharePhoto = (text, image) => {
  var link = 'https://graph.facebook.com/' + FB_PAGE_ID + '/photos';
  request({
    uri: link,
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
};

/*
  * @desc      Post status on Facebook page
  * @param     text : Text to post / status
  * @return    void
  */
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
};


module.exports = {
  sharePhoto, shareStatus
};
