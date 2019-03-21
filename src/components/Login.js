import React from 'react'
import { Component } from 'react'
import { fetchData } from '../Utils/fetchData'

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
    e.preventDefault()
    var url = 'http://localhost:3000/api/users';
    var data = { email: this.state.email, password: this.state.password };
      fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
      .then(response => console.log('Success:', JSON.stringify(response)))
      .catch(error => this.setState({ error: error.message}))
  }

  render() {
    return(
      <section>
        <form onSubmit={ this.handleSubmit }>
          <input type="text" name="email" value={ this.state.email } onChange={ this.handleChange }></input>
          <input type="text" name="password" value={ this.state.password } onChange={ this.handleChange }></input>
          <button>Submit</button>
          {this.state.error && <p>Error logging in, please try again!</p>}
        </form>
      </section>
    )
  }
}