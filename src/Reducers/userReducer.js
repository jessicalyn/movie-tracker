export const userReducer = (state=[], action) => {
  switch (action.type){
    case 'LOGIN_USER':
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
      return state
  }
}