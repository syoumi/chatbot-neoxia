const {getUser} = require('./../user/handleUser');
const {removeParams} = require('./../user/handleUser');
const {getAction} = require('./handleAction');

var lookForSpecificActions = (senderID) => {
  var actions = undefined;
  var user = getUser(senderID);
  if (user) {
    if (user.previousAction && user.previousAction != '') {
      var action = getAction(user.previousAction);
      if(action.previousActions.length == 0) {
        removeParams(user);
      }
      actions = action.nextActions;
    }
    else{
        removeParams(user);
    }
  }
  return actions;
};

module.exports = {
  lookForSpecificActions
};
