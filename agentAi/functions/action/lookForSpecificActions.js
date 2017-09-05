const {getUser} = require('./../user/handleUser');
const {removeParams} = require('./../user/handleUser');
const {getAction} = require('./handleAction');

var lookForSpecificActions = (senderID) => {
  var actions = undefined;
  var user = getUser(senderID);
  if (user) {
    if (user.previousAction && user.previousAction != '') {
      var action = getAction(user.previousAction);
      if(action.previousAction == '') {
        removeParams(user);
      }
      actions = action.nextActions;
    }
  }
  return actions;
};

module.exports = {
  lookForSpecificActions
};
