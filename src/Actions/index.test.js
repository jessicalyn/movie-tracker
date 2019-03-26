import * as actions from './index'

describe('actions', () => {
  it('should return a type of ADD_MOVIES with the movie array', () => {
    const movies = [
      {title: "Cars", poster_path: "car.jpg"},
      {title: "How To Train Your Dragon", poster_path: "dragon.jpg"}
    ]
    const expected = {
      type: 'ADD_MOVIES',
      movies
    }
    const result = actions.addMovies(movies)
    
    expect(result).toEqual(expected)
  })

  it('should return a type of LOGIN_USER with the users id', () => {
    const id = 1
    const expected = {
      type: 'LOGIN_USER',
      id
    }
    const result = actions.loginUser(id)

    expect(result).toEqual(expected)
  })

  it('should return a type of LOGOUT_USER to logout', () => {
    const expected = {
      type: 'LOGOUT_USER'
    }
    const result = actions.logOutUser()

    expect(result).toEqual(expected)
  })
})