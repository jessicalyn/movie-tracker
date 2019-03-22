export const userReducer = (state=[], action) => {
  switch (action.type){
    case 'LOGIN_USER':
    console.log("logging in user", action)
        return {
          id: action.id,
          name: "", 
          favorites: []
        }

    case 'ADD_USER':
      return action.user
    
    default:
      return state
  }
}