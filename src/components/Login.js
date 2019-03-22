
import React from "react";
import { Component } from "react"
import { loginUser } from '../Actions/index'
import { connect } from 'react-redux'


export class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      error: ""
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  validateUser = async (e) => {
    e.preventDefault()
    const { email, password} = this.state
    const url = 'http://localhost:3000/api/users'
    const data = { email: email.toLowerCase(), password: password }
    const checkUser = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers:{
        'Content-Type': 'application/json'
      }
    })
    const response = await checkUser.json()
    if(response.status === "success"){
      console.log("login response", response)
      return this.props.loginUser(response.data.id)
    } else {
      console.log("login response", response)
      return this.setState({ error: "Error logging in, please try again!"})
    }
  }

  render() {
    return (
      <section>
        <form onSubmit={this.validateUser}>
          <input
            type="text"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <button>Submit</button>
          {this.state.error}
        </form>
      </section>
    );
  }
}

export const mapDispatchToProps = (dispatch) => ({
  loginUser: (email) => dispatch(loginUser(email))
})

export default connect(null, mapDispatchToProps)(Login)