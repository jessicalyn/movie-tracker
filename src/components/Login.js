import { Route, Redirect } from 'react-router'
import React from "react";
import { Component } from "react"
import { loginUser } from '../Actions/index'
import { connect } from 'react-redux'
import  user  from '../images/user.png'
import password from '../images/password-icon.png'
import './Login.css';



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
    try {
      const checkUser = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
          'Content-Type': 'application/json'
        }
      })
      const response = await checkUser.json()
      if(response.status === "success"){
        return this.props.loginUser(response.data.id)
      }
    } catch(error) {
      return this.setState({ error: "Email and Password do not match. Please try again or Signup."})
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
          <p className="password-link">Forgot your password?</p>
          <p className="error-message">{this.state.error}</p>
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
  user: state.user
})

export const mapDispatchToProps = (dispatch) => ({
  loginUser: (email) => dispatch(loginUser(email))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)