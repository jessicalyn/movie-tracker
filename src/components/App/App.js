import React, { Component } from 'react';
import './App.css';
import { fetchData } from '../../Utils/fetchData'
import Movies from '../Movies/Movies'
import { APIkey } from '../../Utils/APIkey'

class App extends Component {
  constructor(){
    super()
    this.state = {
      movies: []
    }
  }

  componentDidMount = async () => {
    const fetchMovies = await fetchData(APIkey)
    this.setState({ movies: fetchMovies.results})
  }

  render() {
    const { movies } = this.state
    return (
      <div className="App">
        <header className="App-header">
          <h1>Movie Tracker</h1>
        </header>
        <Movies movies={movies} />
      </div>
    );
  }
}

export default App;
