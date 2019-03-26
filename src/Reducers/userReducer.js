export const userReducer = (state={}, action) => {
  switch (action.type){
    case 'LOGIN_USER':
        return {
          id: action.id,
          name: action.name, 
          favorites: action.favorites
        }

    case 'UPDATE_FAVS':
        return {
          id: state.id,
          name: state.name
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