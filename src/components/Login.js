import React from 'react'
import { Component } from 'react'

export class Login extends Component {
  constructor() {
    super()
    this.state = {
      email: "",
      password: ""
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    
  }

  render() {
    return(
      <section>
        <form onSubmit={ this.handleSubmit }>
          <input type="text" name="email" value={ this.state.email } onChange={ this.handleChange }></input>
          <input type="text" name="password" value={ this.state.password } onChange={ this.handleChange }></input>
          <button>Submit</button>
        </form>
      </section>
    )
  }
}