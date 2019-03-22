import React from "react";
import { Component } from "react"
import { connect } from "react-redux"
import { addUser } from "../Actions/index"

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
        this.setState({
            [name]: value
        })
    }

    handleSubmit = async (event) => {
        event.preventDefault()
        const url = "http://localhost:3000/api/users/"
        const userInfo = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        }
            fetch(url,{
            method: "POST",
            body: JSON.stringify(userInfo),
            headers: {
              "Content-Type": "application/json"
            }
          })
            .then(response => response.json())
            .then(response => JSON.stringify(response))
            .catch(error => this.setState({error: error.message}))
            this.props.addUser(userInfo)
         
    }

   

    render(){
        console.log(this.props, "heyy")
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


export const mapDispatchToProps = (dispatch) => ({
    addUser: (user) => dispatch(addUser(user))
  })

  
export default connect(null, mapDispatchToProps)(Signup);
  
