import React from 'react';
import ReactDOM from 'react-dom';
import  { Card } from './Card'
import { shallow } from 'enzyme';

describe('Card', ()=> {
    describe('Login', () => {
        let wrapper; 
        beforeEach(() => {
            let mockMovie = {
                movie_id: 1,
                title: "movie.title",
                poster_path: "movie.poster_path",
                release_date: 2/3/2015,
                vote_average: "movie.vote_average",
                overview: "movie.overview",
            }
            let mockUser = {
                id: 1
            }
            wrapper = shallow(<Card user={mockUser} movie={mockMovie} />)
        })

        it('should match the snapshot with all data passed in', () => {
            expect(wrapper).toMatchSnapshot()
        })

        it('should invoke addfavorites', () => {

           wrapper.instance().fetchFavorites = jest.fn()
            wrapper.instance().addFavorites()
            expect(wrapper.instance().fetchFavorites).toBeCalled()
        })

        it('should add message if user id is not defined', () => {
            wrapper.setProps({user: 'null'})
            wrapper.instance().fetchFavorites = jest.fn()
            wrapper.instance().addFavorites()
            //  expect(wrapper.instance().fetchFavorites).toBeCalled()
             expect(wrapper.state('message')).toEqual("Please login or sign up to favorite movies.")
         })

         it('should add movie to favorites', () => {
             
             let mockUrl = 'www.google.com'
             const mockOptions = {
                method: 'POST',
                body: JSON.stringify(wrapper.movie),
                headers:{
                  'Content-Type': 'application/json'
                }
              }

              window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
                ok: true,
                status: 200,
                json: () => Promise.resolve(wrapper.movie),
              }));
              wrapper.instance().fetchFavorites()
              expect(wrapper.state('message')).toEqual("Please")


         })


    })
})