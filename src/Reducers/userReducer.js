export const userReducer = (state=[], action) => {
  switch (action.type){
    case 'LOGIN_USER':
    console.log("does this work")
      const usersState = state.map(user => {
        if(user.email === action.email){
          user.loggedIn = true
        }
        return user
      })
      console.log("usersReducer", usersState)
      return usersState

    case 'ADD_USER':
      return action.user
    
    default:
    console.log("default reducer")
      return state
  }
}