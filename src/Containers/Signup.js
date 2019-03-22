import React from "react";
import { Component } from "react"
import { connect } from "react-redux"
import { addUser, loginUser } from "../Actions/index"
import { Login } from "../Components/Login";


export class Signup extends Component {
    constructor(){
        super();
        this.state={
            name: "",
            email: "",
            password: "",
            error: "",
            redirect: false
        }
    }

    handleChange = (event) => {
        const { name, value } = event.target
        this.setState({
          [name]: value
        })
    }

    handleSubmit = async (event) => {
      event.preventDefault()
      const url = "http://localhost:3000/api/users/new"
      const userInfo = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      }
      const validateEmail = await this.validateEmail(url, userInfo)
      if(validateEmail.status === 'success'){
        console.log(validateEmail, "validate")
        console.log(userInfo.name, "name")
         this.props.loginUser(validateEmail.id )
         this.setState({
            redirect: true
        })
     }
    }

    validateEmail= async (url,data) => {
        try {
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(data),
                headers:{
                  'Content-Type': 'application/json'
                }
              })
              const success = await response.json()
              console.log(success, "success data")
              return success;
        }catch(error){
            return this.setState({ error: "Email already exists"})
        }
    }

    render(){
      return (
        <section>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="name"
            value= {this.state.name}
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="email"
            placeholder="email"
            value= {this.state.email}
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="password"
            placeholder="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <button>Sign up</button>
        </form>
        {this.state.redirect  && <Login/>}
      </section>
        )
    }
}


export const mapDispatchToProps = (dispatch) => ({
    addUser: (user) => dispatch(addUser(user)),
    loginUser: (user) => dispatch(loginUser(user))
  })

export default connect(null, mapDispatchToProps)(Signup)