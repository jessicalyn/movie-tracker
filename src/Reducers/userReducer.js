export const userReducer = (state=[], action) => {
  switch (action.type){
    case 'LOGIN_USER':
        return {
          id: action.id,
          name: "", 
          favorites: []
        }

    case 'ADD_USER':
      return action.user
    
    case 'LOGOUT_USER':
      return {
        id: "",
        name: "", 
        favorites: []
      }

    default:
      return state
  }
}