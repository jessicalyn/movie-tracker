import React from 'react';
import ReactDOM from 'react-dom';
import { Card, mapStateToProps } from './Card'
import { shallow } from 'enzyme';

describe('Card', ()=> {
    describe('Login', () => {
        let wrapper; 
        beforeEach(() => {
            wrapper = shallow(<Card/>)
        })

        it('should match the snapshot with all data passed in', () => {
            expect(wrapper).toMatchSnapshot()
        })
    })
})