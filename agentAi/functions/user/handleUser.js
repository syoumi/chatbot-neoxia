/*
  * @author    MITA Oumaïma, SYOUMI El Mahdi
  * @since       JULY 10, 2017
  * @desc        Handle user
  */
var users = new Map();

/*
  * @desc      Insert or update user
  * @param     senderID : user's senderID
  * @param     action : Name of action to set for user's previous action
  * @param     params : All user's params
  * @return    void
  */
var setUser = (senderID, action, params) => {

  var user = getUser(senderID);
  var counter = 2;

  if(user){
    //parameters
    params = handleParams(user, params);

    //Counter
    counter = user.counter;
  }else{
      if(!params) params = [];
  }

  //Data
  var data = {
    previousAction: action,
    parameters: params,
    counter
  };

  users.set(senderID, data);
};

/*
  * @desc      Get user using his senderID
  * @param     senderID : user's senderID
  * @return    User
  */
var getUser = (senderID) => {
  return (users.has(senderID)) ? users.get(senderID) : undefined;
};

/*
  * @desc      Remove user from map
  * @param     senderID : user's senderID
  * @return    void
  */
var removeUser = (senderID) => {
  if (users.has(senderID))
      users.delete(senderID);
};

/*
  * @desc      Handle user's parameters
  * @param     user : user
  * @param     params : new params to push on user's params
  * @return    User's params
  */
var handleParams = (user, params) => {
  if(params){
    //For each param in params, check if it already exists on userParams
     params.forEach((param) => {
       var paramFound = user.parameters.find((userParam) => userParam.name == param.name);
       //Update param if already exists
       if(paramFound){
         var index = user.parameters.indexOf(paramFound);
         user.parameters[index]= param;
       }
       //ELse push new param
       else{
         user.parameters.push(param);
       }
     });
   }
   return user.parameters;
};

/*
  * @desc     Remove some user's params
  * @param     user : user
  * @return    void
  */
var removeParams = (user) => {
  if(user.parameters){
     user.parameters.forEach((param) => {
       if(param.type != 'email' && param.type != 'phone' && param.type != 'building' && param.type != 'operation'){
         param.value = undefined;
       }
     });
   }
};


module.exports= {
  setUser, getUser, removeUser, removeParams
};
