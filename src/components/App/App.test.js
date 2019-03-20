import React from 'react';
import ReactDOM from 'react-dom';
import { App, mapDispatchToProps } from './App'
import { addMovies } from '../../Actions'

describe('App', () => {

  describe('mapDispatchToProps', () => {
    it('should call dispatch when using a function from mapDispatchToProps', () => {
      const mockDispatch = jest.fn()
      const mockMovies = [
        {title: "Cars", poster_path: "car.jpg"},
        {title: "How To Train Your Dragon", poster_path: "dragon.jpg"}
      ]
      const actionToDispatch = addMovies(mockMovies)
      const mappedProps = mapDispatchToProps(mockDispatch)

      mappedProps.addMovies(mockMovies)

      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })
  })
})