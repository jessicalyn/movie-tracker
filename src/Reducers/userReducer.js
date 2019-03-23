export const userReducer = (state = [], action) => {
  switch (action.type) {
    case "LOGIN_USER":
      console.log(action, "emailll");
      return {name:action.email.name, id:action.email.id, email:action.email.email}; // change naming of email
    // const usersState = state.map(user => {
    //   if(user.email === action.email){
    //     user.loggedIn = true
    //   }
    //   return user
    // })
    // console.log("usersReducer", usersState)
    // return usersState

    case "ADD_USER":
      // console.log(action.user.email, "action user")

      return [action.user];
    // console.log(action.user.name, "action user")
    // console.log(state, "state user")
    //   return action.user

    default:
      console.log("default reducer");
      return state;
  }
};
