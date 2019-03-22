export const userReducer = (state=[], action) => {
  switch (action.type){
    case 'LOGIN_USER':
    console.log("logging in user")
        return action.id

    case 'ADD_USER':
      return action.user
    
    default:
      return state
  }
}