export const addMovies = (movies) => ({
  type: "ADD_MOVIES",
  movies
})

export const addUser = (user) => ({
  type: "ADD_USER",
  user
})

export const loginUser = (id) => ({
  type: "LOGIN_USER",
  id
})

export const logOutUser = () => ({
  type: "LOGOUT_USER"
})