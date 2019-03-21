import React from "react";
import { Component } from "react"

export class Signup extends Component {
    constructor(){
        super();
        this.state={
            name: "",
            email: "",
            password: ""
        }
    }
    handleChange = (event) => {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const url = "http://localhost:3000/api/users/new"
        const data = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        }
        fetch(url)
    }

    render(){
        return (
            <section>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="name"
            value= {this.state.name}
            onChange={this.handleChange}
            
            
          />
          <input
            type="text"
            name="email"
            placeholder="email"
            value= {this.state.email}
            onChange={this.handleChange}
            
            
          />
          <input
            type="text"
            name="password"
            placeholder="password"
            value={this.state.password}
            onChange={this.handleChange}
            
            
          />
          

          <button>Sign up</button>
          
        </form>
      </section>
        )
    }
}
