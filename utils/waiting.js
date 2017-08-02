/**
 *
 *
 */

var waitingForAnswer = false;

var setWaiting = () => {
  waitingForAnswer = true;
};

var setNotWaiting = () => {
  waitingForAnswer = false;
};

var getWaiting = () => waitingForAnswer;

module.exports = {
  setWaiting,
  setNotWaiting,
  getWaiting
}
