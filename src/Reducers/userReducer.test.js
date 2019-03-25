import React from 'react';
import ReactDOM from 'react-dom';
import { userReducer } from './userReducer';
import * as actions from '../Actions/index';
import { shallow } from 'enzyme';

describe ('userReducer', () => {
    

      it('should return an empty array by default ', () => {
        const expected = []
        const result = userReducer(undefined, {})
        expect(result).toEqual(expected)
      })

      it('should return state with current user info', ()=> {
          const currentUser = {
              id: 3,
              name: "", 
              favorites: []
            
          }
          const result = userReducer(undefined, actions.loginUser(currentUser.id))
          expect(result).toEqual(currentUser)
      })

     it('should clear state when user logs out', () => {
         const expected = {
            id: "",
            name: "", 
            favorites: []
         }

         const result = userReducer(undefined, actions.logOutUser())
         expect(result).toEqual(expected)
     })
          

      
})