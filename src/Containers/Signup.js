import React from "react";
import { Component } from "react"
import { connect } from "react-redux"
import { loginUser } from "../Actions/index"
import { Route, Redirect } from 'react-router'
import  user  from '../images/user.png'
import email from '../images/email-icon.png'
import password from '../images/pwd.png'
import './Movies/Signup.css'

export class Signup extends Component {
    constructor(){
        super();
        this.state={
            name: "",
            email: "",
            password: "",
            error: ""
        }
    }

    handleChange = (event) => {
        const { name, value } = event.target
        this.setState({ [name]: value })
    }

    handleSubmit = async (event) => {
      event.preventDefault()
      const url = "http://localhost:3000/api/users/new"
      const userInfo = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      }
       const response = await fetch(url, {
          method: 'POST',
          body: JSON.stringify(userInfo),
          headers:{
            'Content-Type': 'application/json'
          }
        })
        const result = await response.json()
        console.log(result, "response")
        if(result.status === "success"){
         return this.props.loginUser(result.id)
        }else {
          this.setState({
            error: "Email has already been used, please Login."
          })
        }
    }

    render(){
      return (
        <section className="signup">
        <div className="signup-box">
        <form onSubmit={this.handleSubmit}>
          <div className="signup-header">
              <h3>One step and you're done!
              We hate paperwork, too.</h3>
          </div>
              <div className="user-name input-box">
                <img alt="user-icon" src={user}></img>
                <input
                  type="text"
                  name="name"
                  placeholder="name"
                  value= {this.state.name}
                  onChange={this.handleChange}
            />
            </div>
          <div className="email input-box">
          <img alt="user-icon" src={email}></img>
              <input
                type="text"
                name="email"
                placeholder="email"
                value= {this.state.email}
                onChange={this.handleChange}
          />
          </div>
          <div className="password input-box">
          <img alt="user-icon" src={password}></img>
          <input
            type="text"
            name="password"
            placeholder="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          </div>
          <button class="signup-btn">Sign up</button>
        </form>
        </div>
        {this.state.error && this.state.error}
        <Route exact path ='/Signup' render={()=> (
          this.props.user.id && <Redirect to="/"/>
        )}/>
      </section>
        )
    }
}
export const mapStateToProps = (state) => ({
  user: state.user
})

export const mapDispatchToProps = (dispatch) => ({
    loginUser: (user) => dispatch(loginUser(user))
  })

export default connect(mapStateToProps, mapDispatchToProps)(Signup)
