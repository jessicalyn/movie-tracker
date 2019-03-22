import React from "react";
import { Component } from "react";
import { fetchData } from "../Utils/fetchData";
import { addUser } from "../Actions/index";
import { connect } from "react-redux";

export class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      error: "",
      
    };
  }

  handleChange = e => {
    const { name, value } = e.target;
    if (e.target.name === "email") {
      const email = value.toLowerCase();
      this.setState({ email });
    } else {
      this.setState({ [name]: value });
    }
  };

  handleSubmit = async e => {
    e.preventDefault();
    var url = "http://localhost:3000/api/users";
    var data = {
      
      email: this.state.email,
      password: this.state.password
    };
    fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(response => console.log("Success:", JSON.stringify(response)))
      .catch(error => this.setState({ error: error.message }));
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
          {this.state.error && (
            <p>Error logging in, please try again! Or SignUp</p>
          )}
        </form>
      </section>
    );
  }
}

export const mapStateToProps = (state) => ({
  users: state.users
})

export const mapDispatchToProps = (dispatch) => ({
  users: () => dispatch(addUser(users))
})

export default connect(mapStateToProps,mapDispatchToProps)(Login)
