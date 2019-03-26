import React from 'react';
import ReactDOM from 'react-dom';
import { App, mappStateToProps, mapDispatchToProps } from './App'
import { addMovies } from '../../Actions'
import { shallow } from 'enzyme'
import * as API from '../../Utils/fetchData'

// jest.mock('../../Utils/fetchData')

describe('App', () => {
  describe('App', () => {
    let wrapper;
    const mockMovies = [
      {title: "Cars", poster_path: "car.jpg"},
      {title: "How To Train Your Dragon", poster_path: "dragon.jpg"}
    ]
    const mockUser = { id: 1, name: "Taylor" }
    const mockAddMovies = jest.fn()

    beforeEach(() => {
      wrapper = shallow(<App addMovies={mockAddMovies} user={mockUser}/>)
      API.fetchData = jest.fn().mockImplementation(() => Promise.resolve({results: mockMovies}))
    })

    it('should match the snapshot with all data passed in', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should invoke fetchMovies when component mounts', () => {
      const appInstance = wrapper.instance()
      appInstance.fetchMovies = jest.fn()
      appInstance.componentDidMount()
      expect(appInstance.fetchMovies).toBeCalled()
    })

    it('should fetch the movies data and call addMovies', async () => {
      await wrapper.instance().fetchMovies()
      expect(mockAddMovies).toHaveBeenCalledWith(mockMovies)
    })

    it('should show an error when everything is not okay with fetchData', async () => {
      const mockError = "This didn't work"
      API.fetchData = jest.fn().mockImplementation(() => {throw new Error(mockError)})
      await wrapper.instance().fetchMovies()
      expect(wrapper.state("error")).toEqual(mockError)
    })
  });

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