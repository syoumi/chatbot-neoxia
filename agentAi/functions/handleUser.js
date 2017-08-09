
var users = new Map();

var userExists = (senderID)=> {
  return users.has(senderID);
}


//Insert or update user
var setUser = (senderID, context, params, current) => {
  var data = {
    context: context,
    parameters: params,
    currentParameter: current
  }
  users.set(senderID, data);
}

//Get user
var getUser = (senderID) => {
  return users.get(senderID);
}

//Remove user from map
var removeUser = (senderID) => {
  if (users.has(senderID))
      users.delete(senderID);
}


module.exports= {
  userExists, setUser, getUser, removeUser
}
