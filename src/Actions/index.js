export const addMovies = (movies) => ({
  type: "ADD_MOVIES",
  movies
})

export const loginUser = (id) => ({
  type: "LOGIN_USER",
  id
})

export const logOutUser = () => ({
  type: "LOGOUT_USER"
})