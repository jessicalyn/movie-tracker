import React from 'react'
import { Favorites, mapStateToProps } from './Favorites'
import { shallow } from 'enzyme'

describe('Favorites', () => {
  describe('Favorites', () => {
    let wrapper

    beforeEach(() => {
      const mockUser = {
        id: 1,
        name: "Archie",
        favorites: [
        { id: 1, title: "Us" },
        { id: 2, title: "Cars" },
        { id: 3, title: "A League of their Own" }
      ]}
      wrapper = shallow(<Favorites user={ mockUser }/>)
    })

    it('should match the snapshot with all data passed in', () => {
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('mapStateToProps', () => {
    it('should return an object with a user object', () => {
      const mockState = {
        movies: [
          {title: "Cars", poster_path: "car.jpg"},
          {title: "How To Train Your Dragon", poster_path: "dragon.jpg"}
        ],
        user: {
          id: 1,
          name: "Taylor",
          favorites: [
            {title: "Cars", poster_path: "car.jpg"},
            {title: "How To Train Your Dragon", poster_path: "dragon.jpg"}
          ]
        }
      }
      const expected = {
        user: {
          id: 1,
          name: "Taylor",
          favorites: [
            {title: "Cars", poster_path: "car.jpg"},
            {title: "How To Train Your Dragon", poster_path: "dragon.jpg"}
          ]
        }
      }
      const mappedProps = mapStateToProps(mockState)

      expect(mappedProps).toEqual(expected)
    })
  })
})