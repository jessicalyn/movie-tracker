import React from 'react';
import ReactDOM from 'react-dom';
import { Login, mapStateToProps, mapDispatchToProps, } from './Login'
import { shallow } from 'enzyme';

describe ('Login', () => {
    describe('Login', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallow(<Login/>)
        })

        it('should match the snapshot with all data passed in', () => {
            expect(wrapper).toMatchSnapshot()
        })
        it('should update email when handle change is invoked', () => {
           const mockEvent=  {
                target: {
                    name: 'email',
                    value:'abc@gmail.com'
                }
            }
            expect(wrapper.state("email")).toEqual("");
            wrapper.instance().handleChange(mockEvent);
            expect(wrapper.state("email")).toEqual("abc@gmail.com");
        })
        it("should update password when handle change is invoked", ()=> {
            const mockEvent = {
                target: {
                    name:'password',
                    value: '1234'
                }
            }
            expect(wrapper.state("password")).toEqual("")
            wrapper.instance().handleChange(mockEvent);
            expect(wrapper.state("password")).toEqual("1234")
            
        })

        it("it should validate user on submit", async () => {

            const mockData = {
                email: "abc@gmail.com",
                password: "1234"
            }
            wrapper.instance().setState({email: mockData.email, password: mockData.password})
            const expectedUrl = 'http://localhost:3000/api/users'
            const mockOptions = {
                method: 'POST',
                body: JSON.stringify(mockData),
                headers:{
                  'Content-Type': 'application/json'
                }
              }
            const mockEvent =  {preventDefault: () => {}}

            window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
                ok: true,
                status: 200,
                json: () => Promise.resolve(mockData),
              }));
            wrapper.instance().validateUser(mockEvent)  
            expect(window.fetch).toHaveBeenCalledWith(expectedUrl, mockOptions)
        })

        it("should login user if response status is success", () => {
            const mockData = {
                email: "niroz.aryal11@gmail.com",
                password: "password"
            }
            wrapper.instance().setState({email: mockData.email, password: mockData.password})
            const mockLoginUser = jest.fn()
            const expectedUrl = 'http://localhost:3000/api/users'
            const mockOptions = {
                method: 'POST',
                body: JSON.stringify(mockData),
                headers:{
                  'Content-Type': 'application/json'
                }
              }
            const mockEvent =  {preventDefault: () => {}}

            window.fetch = jest.fn()
            .mockImplementation(() => Promise.resolve({
                ok: false,
                status: 400,
                json: () => Promise.resolve(mockData),
              }));
            wrapper.instance().validateUser(mockEvent)  
            expect(window.fetch).toHaveBeenCalledWith(expectedUrl, mockOptions)
            wrapper.instance().setState({error: "Email and Password do not match. Please try again or Signup."})
        })
            
            



            
    })
})
