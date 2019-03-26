import React from "react";
import { Component } from "react"
import { connect } from "react-redux"
import { loginUser, hasError } from "../../Actions/index"
import { Route, Redirect } from 'react-router'
import { fetchData } from '../../Utils/fetchData'
import { fetchOptionsCreator } from '../../Utils/fetchOptionsCreator'
import './Signup.css'

export class Signup extends Component {
    constructor(){
        super();
        this.state = {
            name: "",
            email: "",
            password: ""
        }
    }

    handleChange = (event) => {
        const { name, value } = event.target
        this.setState({ [name]: value })
    }

    handleSubmit = async (event) => {
      event.preventDefault()
      const url = "http://localhost:3000/api/users/new"
      const body = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      }
      try {
      const options = await fetchOptionsCreator('POST', body)
      const result = await fetchData(url, options)
        if(result.status === "success"){
         return this.props.loginUser(result.id)
        }
       } catch(error) {
        const message = "Email has already been used, please Login."
        return this.props.hasError(message)
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
          <button className="signup-button">Sign up</button>
        </form>
        {this.props.error && this.props.error}
        <Route exact path ='/Signup' render={()=> (
          this.props.user.id && <Redirect to="/"/>
        )}/>
        </section>
      )
    }
}
export const mapStateToProps = (state) => ({
  user: state.user,
  error: state.error
})

export const mapDispatchToProps = (dispatch) => ({
    loginUser: (userId) => dispatch(loginUser(userId)),
    hasError: (message) => dispatch(hasError(message))
  })

export default connect(mapStateToProps, mapDispatchToProps)(Signup)
