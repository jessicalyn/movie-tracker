import React, { Component } from 'react';
import './App.css';
import { fetchData } from '../../Utils/fetchData'
import Movies from '../Movies/Movies'
import { APIkey } from '../../Utils/APIkey';
import { addMovies } from '../../Actions/index'
import { connect } from 'react-redux'
import { NavLink, Route, Redirect } from 'react-router-dom'
import Signup from '../Signup'
import Login  from '../../Components/Login';



export class App extends Component {

  componentDidMount = () => {
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
        <Route exact path='/login' component={Login}/>
        <Route exact path='/signup' render={()=> (
          this.props.user > 0 ? (
            <Redirect to='/'/>
          ):(<Signup/>)
        )}/>
        
      </div>
    );
  }
}
export const mapStateToProps = (state) => ({
  user: state.user
})
export const mapDispatchToProps = (dispatch) => ({
  addMovies: (movies) => dispatch(addMovies(movies))
})

export default connect(mapStateToProps, mapDispatchToProps)(App)