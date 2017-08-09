
const {userExists} = require('./handleUser');
const {getUser} = require('./handleUser');
const {setUser} = require('./handleUser');
const {removeUser} = require('./handleUser');

//Get the actual context of user
var getContext = (senderID) => {
  var context= undefined;

  if(userExists(senderID)){
    var user = getUser(senderID);
    if(user){
      context= user.context;
    }
  }

  return context;
}


//Set the actual context of user
var setContext = (senderID, context, params) => {

  //if user already exists, update context and parameters
  if(userExists(senderID)){
    var user = getUser(senderID);
    user.context.input = user.context.output;
    user.context.output = context.output;

    if(params.name == ''){
      user.parameters['none'] = params.value;
    }
    else {
      user.parameters[params.name] = params.value;
    }

    user.currentParameter = params.name;


    setUser(senderID, user.context, user.parameters);
  }

  //if user doesn't exists, add new user
  else {
    var parameters = [];
    if(params.name == ''){
      parameters['none'] = params.value;
    }
    else{
      parameters[params.name] = params.value;
    }
    current = params.name;

    setUser(senderID, context, parameters, current);
  }
}

//Delete user when he's out of context
var cleanContext = (senderID) => {
  removeUser(senderID);
}

//Get all user's parameters
var getParameters = (senderID) => {
  var params= [];
  if(userExists(senderID)){
    var user = getUser(senderID);
    params = user.parameters;
  }
  return params;
}

//Get user.next params
var getCurrentParameter = (senderID) => {
  var current = '';
  if(userExists(senderID)){
    var user = getUser(senderID);
   current = user.currentParameter;
  }
  return current;
}


module.exports= {
  getContext, setContext, cleanContext, getParameters, getCurrentParameter
}
