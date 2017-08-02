/**
 * This file contains a variable indicating if the bot is waiting for
 * users reply or not, with its getter/setters
 */

// Variable indicating if the bot is waiting for
var waitingForAnswer = false;

// Sets waiting indicator to true
var setWaiting = () => {
  waitingForAnswer = true;
};

// Sets waiting indicator to false
var setNotWaiting = () => {
  waitingForAnswer = false;
};

// Gets the value of waiting indicator
var getWaiting = () => waitingForAnswer;

module.exports = {
  setWaiting,
  setNotWaiting,
  getWaiting
}
