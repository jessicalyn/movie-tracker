import React, { Component } from 'react';
import './App.css';
import { fetchData } from '../../Utils/fetchData'
import Movies from '../Movies/Movies'
import { APIkey } from '../../Utils/APIkey';
import { addMovies, logOutUser } from '../../Actions/index'
import { connect } from 'react-redux'
import { NavLink, Route } from 'react-router-dom'
import Signup from '../Signup/Signup'
import Login  from '../../Components/Login'

export class App extends Component {

  componentDidMount = () => {
    this.fetchMovies()
  }

  fetchMovies = async () => {
    const movies = await fetchData(APIkey)
    this.props.addMovies(movies.results)
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
          <NavLink to="/signup">Sign up </NavLink>
          <button onClick={this.logOutUser}>Log Out</button>
          {this.props.user.id && <h4>Welcome {this.props.user.name}!</h4>}
        </header>
        <Route exact path='/' component={Movies} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/signup' component={Signup}/>
      </div>
    );
  }
}
export const mapStateToProps = (state) => ({
  user: state.user
})

export const mapDispatchToProps = (dispatch) => ({
  addMovies: (movies) => dispatch(addMovies(movies)),
  logOutUser: () => dispatch(logOutUser())
})

export default connect(mapStateToProps, mapDispatchToProps)(App)