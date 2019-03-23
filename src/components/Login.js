import React from "react";
import { Component } from "react";
import { fetchData } from "../Utils/fetchData";
import { addUser } from "../Actions/index";
import { loginUser } from "../Actions/index";
import { connect } from "react-redux";

export class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      error: "",
      welcomeMessage: ""
    };
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const { email, password } = this.state;
    const url = "http://localhost:3000/api/users";
    const data = { email: email.toLowerCase(), password: password };
    const validator = await this.validateUser(url, data);
    console.log(validator, "hello");
    if (typeof validator === "object") {
      this.props.loginUser(validator);
    }
  };

  validateUser = async (url, data) => {
    console.log("validate");
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      });
      const success = await response.json();
      console.log(success.data, "success data login");
      this.setState({
        welcomeMessage: `Welcome ${success.data.name}`
      })
      return success.data;
    } catch (error) {
      return this.setState({ error: "Please sign up or try again"
                              
     });
    }
  };

  render() {
    return (
      <section>
        <form onSubmit={this.handleSubmit}>
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
          {this.state.error && <p>{this.state.error}</p>}
          {this.state.welcomeMessage && <p>{this.state.welcomeMessage}</p>}
        </form>
      </section>
    );
  }
}

export const mapDispatchToProps = dispatch => ({
  loginUser: email => dispatch(loginUser(email))
});

export default connect(
  null,
  mapDispatchToProps
)(Login);
