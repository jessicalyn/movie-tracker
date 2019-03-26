export const userReducer = (state=[], action) => {
  switch (action.type){
    case 'LOGIN_USER':
    console.log("check")
        return {
          
          id: action.id,
          name: "", 
          favorites: []
        }
    
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