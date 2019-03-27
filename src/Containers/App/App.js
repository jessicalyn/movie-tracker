import React, { Component } from 'react';
import './App.css';
import { fetchData } from '../../Utils/fetchData'
import Movies from '../Movies/Movies'
import { APIkey } from '../../Utils/APIkey';
import { addMovies, logOutUser, hasError } from '../../Actions/index'
import { connect } from 'react-redux'
import { NavLink, Route } from 'react-router-dom'
import Signup from '../Signup/Signup'
import Login  from '../../Components/Login'
import { fetchOptionsCreator } from '../../Utils/fetchOptionsCreator'

export class App extends Component {

  componentDidMount = () => {
    this.fetchMovies()
  }

  fetchMovies = async () => {
    try {
      const options = await fetchOptionsCreator('GET')
      const movies = await fetchData(APIkey, options)
      return this.props.addMovies(movies.results)
    } catch(error) {
      this.props.hasError(error.message)
        setTimeout(() => {
          this.props.hasError("")
        }, 2000)
      }
    }

  logOutUser = (e) => {
    e.preventDefault()
    this.props.logOutUser()
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Movie Tracker</h1>
          <NavLink to="/login" className="nav">Login</NavLink>
          <NavLink to="/signup">Sign up</NavLink>
          <button onClick={this.logOutUser}>Log Out</button>
          {this.props.user.id && <h4>Welcome {this.props.user.name}!</h4>}
          { this.props.error && <p>{ this.props.error }</p>}
          </header>
          <Route exact path='/' component={Movies} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/signup' component={Signup}/>
      </div>
    );
  }
}

export const mapStateToProps = (state) => ({
  user: state.user,
  error: state.error
})

export const mapDispatchToProps = (dispatch) => ({
  addMovies: (movies) => dispatch(addMovies(movies)),
  logOutUser: () => dispatch(logOutUser()),
  hasError: (message) => dispatch(hasError(message))
})

export default connect(mapStateToProps, mapDispatchToProps)(App)