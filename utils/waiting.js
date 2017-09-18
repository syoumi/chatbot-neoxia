/*
  * @author    MITA Oumaïma, SYOUMI El Mahdi
  * @since       JULY 10, 2017
  * @desc       This file contains a variable indicating if the bot is waiting for,  users reply or not, with its getter/setters
  */

// Variable indicating if the bot is waiting for
var waitingForAnswer = false;

/*
  * @desc      Sets waiting indicator to true
  * @return    void
  */
var setWaiting = () => {
  waitingForAnswer = true;
};

/*
  * @desc      Sets waiting indicator to false
  * @return    void
  */
var setNotWaiting = () => {
  waitingForAnswer = false;
};

/*
  * @desc      Gets the value of waiting indicator
  * @return    Boolean
  */
var getWaiting = () => waitingForAnswer;


module.exports = {
  setWaiting,
  setNotWaiting,
  getWaiting
};
