import React, { Component } from 'react';
import './App.css';
import { fetchData } from '../../Utils/fetchData'
import Movies from '../Movies/Movies'
import { APIkey } from '../../Utils/APIkey';
import { addMovies } from '../../Actions/index'
import { connect } from 'react-redux'
import { NavLink, Route } from 'react-router-dom'
import { Login } from '../../Components/Login'
import Signup from '../Signup'

export class App extends Component {

  componentDidMount = async () => {
    this.fetchMovies()
  }

  fetchMovies = async () => {
    const movies = await fetchData(APIkey)
    this.props.addMovies(movies.results)
  }

  render() {
    console.log(this.props, "app props")
    return (
      <div className="App">
        <header className="App-header">
          <h1>Movie Tracker</h1>
          <NavLink to="/login" className="nav">Login</NavLink>
          <NavLink to="/signup">Sign up </NavLink>
        </header>
        <Route exact path='/' component={Movies} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/signup' component={Signup}/>
      </div>
    );
  }
}

export const mapDispatchToProps = (dispatch) => ({
  addMovies: (movies) => dispatch(addMovies(movies))
})

export default connect(null, mapDispatchToProps)(App);


