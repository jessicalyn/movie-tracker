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
  });

  it('should return a type of UPDATE_USER with the users id, name, and favorites array', () => {
    const id = 1
    const name = "Archie"
    const favorites = [
      {title: "Cars", poster_path: "car.jpg"},
      {title: "How To Train Your Dragon", poster_path: "dragon.jpg"}
    ]
    const expected = {
      type: 'UPDATE_USER',
      id,
      name,
      favorites
    }
    const result = actions.updateUser({id, name, favorites})

    expect(result).toEqual(expected)
  });

  it('should return a type of LOGOUT_USER to logout', () => {
    const expected = {
      type: 'LOGOUT_USER'
    }
    const result = actions.logOutUser()

    expect(result).toEqual(expected)
  });

  it('should return a type of HAS_ERROR with message', () => {
    const message = "Sorry something went wrong"
    const expected = {
      type: "HAS_ERROR",
      message
    }
    const result = actions.hasError(message)

    expect(result).toEqual(expected)
  })
})