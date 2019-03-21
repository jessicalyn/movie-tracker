import React from 'react'
import { Component } from 'react'
import { fetchData } from '../Utils/fetchData'

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

  handleSubmit = async (e) => {
    e.preventDefault()
    const user = this.state
    const validUser = await fetchData("http://localhost:3000/api/users", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    console.log("user", validUser)
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