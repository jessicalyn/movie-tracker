import { Route, Redirect } from 'react-router'
import React from "react";
import { Component } from "react"
import { loginUser, hasError } from '../Actions/index'
import { connect } from 'react-redux'
import  user  from '../images/user.png'
import password from '../images/password-icon.png'
import './Login.css';
import { fetchData } from '../Utils/fetchData'
import { fetchOptionsCreator } from '../Utils/fetchOptionsCreator'

export class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
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
    const body = { email: email.toLowerCase(), password: password }
    try {
      const options = await fetchOptionsCreator('POST', body)
      const result = await fetchData(url, options)
      if(result.status === "success"){
        return this.fetchUserFavorites(result.data.id, result.data.name)
      }
    } catch(error) {
      const message = "Email and Password do not match. Please try again or Signup."
      this.props.hasError(message)
        setTimeout(() => {
          this.props.hasError("")
        }, 3000)
    }
  }

  fetchUserFavorites = async (id, name) => {
    const url = `http://localhost:3000/api/users/${id}/favorites`
    try {
      const options = await fetchOptionsCreator('GET')
      const result = await fetchData(url, options)
      if(result.status === "success"){
        const favorites = result.data
        return this.props.loginUser({id, name, favorites})
      }
    } catch(error) {
      const message = "Error finding favorite movies, please refresh page and try again."
      this.props.hasError(message)
        setTimeout(() => {
          this.props.hasError("")
        }, 3000)
      }
  }

  render() {
    return (
      <div className="login">
        <div className="login-box">
        <form onSubmit={this.validateUser}>
            <div className="login-header">
                <h3>Please Log in</h3>
            </div>
            <div className="username-input input-box">
                <img alt="user-icon" src={user}></img>
                <input
                  type="text"
                  name="email"
                  value={this.state.email}
                  placeholder={"Enter your email address"}
                  onChange={this.handleChange}
                />
            </div>   
          <div className="password-input input-box">
                <img alt="password-icon" src={password}></img>
                <input
                  type="text"
                  name="password"
                  placeholder={"Enter your password"}
                  value={this.state.password}
                  onChange={this.handleChange}
                />
              </div>
          <button>Submit</button>
          <p className="error-message">{this.props.error}</p>
        </form>
        </div>
        <Route exact path='/login' render={() => (
          this.props.user.id && <Redirect to="/"/>
        )} />
      </div>
    )
  }
}

export const mapStateToProps = (state) => ({
  user: state.user,
  error: state.error
})

export const mapDispatchToProps = (dispatch) => ({
  loginUser: (email) => dispatch(loginUser(email)),
  hasError: (message) => dispatch(hasError(message))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)