/*
  * @author    MITA Oumaïma, SYOUMI El Mahdi
  * @since       JULY 10, 2017
  * @desc        Get specific actions
  */
const {getUser} = require('./../user/handleUser');
const {removeParams} = require('./../user/handleUser');
const {getAction} = require('./handleAction');

/*
  * @desc        Get all next actions of user's previous action
  * @param     senderID : senderID (String)
  * @param     lang : Language of this action (String)
  * @return      Array of actions
  */
var lookForSpecificActions = (senderID, lang) => {
  var actions = undefined;
  var user = getUser(senderID);
  if (user) {
    if (user.previousAction && user.previousAction != '') {
      var action = getAction(user.previousAction, lang);
      if(action.nextActions.length == 0) {
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
