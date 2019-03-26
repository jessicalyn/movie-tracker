export const addMovies = (movies) => ({
  type: "ADD_MOVIES",
  movies
})

export const loginUser = ({id, name, favorites}) => ({
  type: "LOGIN_USER",
  id,
  name,
  favorites
})

export const logOutUser = () => ({
  type: "LOGOUT_USER"
})

export const userFavorites = (id) => ({
  type: "USER_FAVORITES",
  id
})

export const hasError = (message) => ({
  type: "HAS_ERROR",
  message
})