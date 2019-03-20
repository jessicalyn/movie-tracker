import React, { Component } from 'react';
import './App.css';
import { fetchData } from '../../Utils/fetchData'
import Movies from '../Movies/Movies'
import { APIkey } from '../../Utils/APIkey';
import { addMovies } from '../../Actions/index'
import { connect } from 'react-redux'


export class App extends Component {

  componentDidMount = async () => {
    this.fetchMovies()
  }

  fetchMovies = async () => {
    const movies = await fetchData(APIkey)
    this.props.addMovies(movies.results)
  }

  render() {
   
    return (
      <div className="App">
        <header className="App-header">
          <h1>Movie Tracker</h1>
        </header>
        <Movies />
      </div>
    );
  }
}

export const mapDispatchToProps = (dispatch) => ({
  addMovies: (movies) => dispatch(addMovies(movies))
})

export default connect(null, mapDispatchToProps)(App);


