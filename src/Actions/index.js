export const addMovies = (movies) => ({
  type: "ADD_MOVIES",
  movies
})

export const updateUser = ({id, name, favorites}) => ({
  type: "UPDATE_USER",
  id,
  name,
  favorites
})

export const logOutUser = () => ({
  type: "LOGOUT_USER"
})

export const hasError = (message) => ({
  type: "HAS_ERROR",
  message
})