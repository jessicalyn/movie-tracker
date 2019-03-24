import React from 'react'
import { Movies, mapStateToProps } from './Movies'
import { shallow } from 'enzyme'

describe('Movies', () => {
  describe('Movies', () => {
    let wrapper

    beforeEach(() => {
      const mockMovies = [
        { id: 1, title: "Us" },
        { id: 2, title: "Cars" },
        { id: 3, title: "A League of their Own" }
      ]
      wrapper = shallow(<Movies movies={ mockMovies }/>)
    })

    it('should match the snapshot with all data passed in', () => {
      expect(wrapper).toMatchSnapshot()
    })
  })
  
  describe('mapStateToProps', () => {
    it('should return an object with a movies array', () => {
      const mockState = {
        movies: [
          {title: "Cars", poster_path: "car.jpg"},
          {title: "How To Train Your Dragon", poster_path: "dragon.jpg"}
        ],
        filter: 'SHOW_FAVORITES'
      }
      const expected = {
        movies: [
          {title: "Cars", poster_path: "car.jpg"},
          {title: "How To Train Your Dragon", poster_path: "dragon.jpg"}
        ]
      }
      const mappedProps = mapStateToProps(mockState)

      expect(mappedProps).toEqual(expected)
    })
  })
})