import React from 'react';
import ReactDOM from 'react-dom';
import { App, mapDispatchToProps } from './App'
import { addMovies } from '../../Actions'
import { shallow } from 'enzyme'
import { fetchData } from '../../Utils/fetchData'

jest.mock('../../Utils/fetchData')

describe('App', () => {
  describe('App', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(<App addMovies={jest.fn()}/>)
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

    it.only('should fetch the movies data and call addMovies', async () => {
      const mockMovies = [
        {title: "Cars", poster_path: "car.jpg"},
        {title: "How To Train Your Dragon", poster_path: "dragon.jpg"}
      ]
      fetchData.mockImplementation(() => Promise.resolve(mockMovies))
      await wrapper.instance().fetchMovies()
      expect(wrapper.instance().props.addMovies).toHaveBeenCalledWith(mockMovies)

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