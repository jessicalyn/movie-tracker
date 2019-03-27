import { userReducer } from './userReducer'
import * as actions from '../Actions'

describe('userReducer', () => {
  it('should return the initial state', () => {
    const expected = {}
    const result = userReducer({}, {})

    expect(result).toEqual(expected)
  })

  it('should return the state with a user object added when UPDATE_USER type', () => {
    const initialState = {}
    const mockUser = {
      id: 1,
      name: "Archie",
      favorites: [
        {title: "Cars", poster_path: "car.jpg"},
        {title: "How To Train Your Dragon", poster_path: "dragon.jpg"}
      ]
    }
    const action = actions.updateUser(mockUser)
    const expected = {
      id: 1,
      name: "Archie",
      favorites: [
        {title: "Cars", poster_path: "car.jpg"},
        {title: "How To Train Your Dragon", poster_path: "dragon.jpg"}
      ]
    }
    const result = userReducer(initialState, action)

    expect(result).toEqual(expected)
  })
})