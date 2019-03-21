import React from 'react'
import { Component } from 'react'
import { loginUser } from '../Actions'
import { connect } from 'react-redux'

export class Login extends Component {
  constructor() {
    super()
    this.state = {
      email: "",
      password: "",
      error: ""
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  handleSubmit = async (e) => {
    const { email, password} = this.state
    e.preventDefault()
    const url = 'http://localhost:3000/api/users'
    const data = { email: email.toLowerCase(), password: password }
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
          'Content-Type': 'application/json'
        }
      })
      const success = await response.json()
      return console.log('Success:', JSON.stringify(success))
    } catch(error) {
        return this.setState({ error: error.message})
    }
  }

  render() {
    return(
      <section>
        <form onSubmit={ this.handleSubmit }>
          <input type="text" name="email" value={ this.state.email } onChange={ this.handleChange }></input>
          <input type="text" name="password" value={ this.state.password } onChange={ this.handleChange }></input>
          <button>Submit</button>
          {this.state.error && <p>Error logging in, please try again! Or SignUp</p>}
        </form>
      </section>
    )
  }
}

export const mapDispatchToProps = (dispatch) => ({
  loginUser: (email) => dispatch(loginUser(email))
})

export default connect(null, mapDispatchToProps)(Login)