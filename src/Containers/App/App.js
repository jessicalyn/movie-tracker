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
import Favorites from '../Favorites/Favorites'
import PropTypes from 'prop-types'

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
          <div className="header-box">
            <h1>Movie Tracker</h1>
          </div>
          <div className="nav-box">
            { !this.props.user.id && <NavLink to="/login" className="nav">Login</NavLink> }
            { !this.props.user.id && <NavLink to="/signup" className="nav">Sign up </NavLink> }
            { this.props.user.id && <NavLink to="/favorites" className="nav">Favorites</NavLink> }
            <NavLink to='/' className="nav">Home</NavLink>
            { this.props.user.id && <button onClick={this.logOutUser}>Log Out</button> }
          </div>
          { this.props.error && <p>{ this.props.error }</p> }
          </header>
          <Route exact path='/' component={Movies} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/signup' component={Signup}/>
          <Route exact path='/favorites' component={Favorites} />
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

App.propTypes = {
  user: PropTypes.object.isRequired,
  error: PropTypes.string,
  hasError: PropTypes.func,
  logOutUser: PropTypes.func.isRequired,
  addMovies: PropTypes.func.isRequired
}