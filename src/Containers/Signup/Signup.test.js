import React from 'react'
import { Signup, mapStateToProps, mapDispatchToProps } from './Signup'
import { shallow } from 'enzyme'
import { loginUser } from '../../Actions'
import { Route, Redirect } from 'react-router'

describe('Signup', () => {
  describe('Signup', () => {
    let wrapper

    beforeEach(() => {
      const mockUser = { id: 1, name: "Taylor" }
      wrapper = shallow(
        <Signup 
          loginUser={ jest.fn() } 
          user={ mockUser } 
        />
      )
    })

    it('should match the snapshot with all data passed in', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should have the proper default state', () => {
      const mockState = {
        name: "",
        email: "",
        password: "",
        error: ""
      }
      expect(wrapper.state()).toEqual(mockState)
    })

    it('should update state when handleChange is called', () => {
      const mockEvent = {
        target: {
          name: "email",
          value: "archie@gmail.com"
        }
      }
      expect(wrapper.state('email')).toEqual("")
      wrapper.instance().handleChange(mockEvent)
      expect(wrapper.state('email')).toEqual("archie@gmail.com")
    })

    it('should invoke handleSubmit when form button is clicked', () => {
      const mockHandleSubmit = jest.fn()
      wrapper.find('.signup-button').simulate('click')
      expect(wrapper.instance().handleSubmit()).toBeCalled()
    })

    fetchPost
  })

    describe('mapStateToProps', () => {
      it('should return an object with the current user', () => {
        const mockState = {
          movies: [
            {title: "Cars", poster_path: "car.jpg"},
            {title: "How To Train Your Dragon", poster_path: "dragon.jpg"}
          ],
          user: {
            id: 1,
            name: "Taylor"
          }
        }
        const expected = { user: { id: 1, name: "Taylor"} }

        const mappedProps = mapStateToProps(mockState)

        expect(mappedProps).toEqual(expected)
      })
    })

    describe('mapDispatchToProps', () => {
      it('should call dispatch when using loginUser within mapDispatchToProps', () => {
        const mockDispatch = jest.fn()
        const actionToDispatch = loginUser(1)
        const mappedProps = mapDispatchToProps(mockDispatch)

        mappedProps.loginUser(1)

        expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
      })
    })
})