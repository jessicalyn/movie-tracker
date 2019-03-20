import { moviesReducer } from './moviesReducer'
import * as actions from '../Actions'

describe('moviesReducer', () => {
  it('should return the initial state', () => {
    const expected = []
    const result = moviesReducer(undefined, {})

    expect(result).toEqual(expected)
  })

  it('should return the state with a movies array added', () => {
    const initialState = []
    const mockMovies = [
      {title: "Cars", poster_path: "car.jpg"},
      {title: "How To Train Your Dragon", poster_path: "dragon.jpg"}
    ]
    const action = actions.addMovies(mockMovies)
    const expected = [
      {title: "Cars", poster_path: "car.jpg"},
      {title: "How To Train Your Dragon", poster_path: "dragon.jpg"}
    ]
    const result = moviesReducer(initialState, action)

    expect(result).toEqual(expected)
  })
})