import React, { Component } from 'react';
import './App.css';
import { fetchData } from '../../Utils/fetchData'
// import Movies from './Movies/Movies'

class App extends Component {
  constructor(){
    super()
    this.state = {
      movies: {}
    }
  }

  componentDidMount = async () => {
    const fetchMovies = await fetchData("https://api.themoviedb.org/3/movie/popular?api_key=93b214404de014118b64ce033e70ac99&language=en-US&page=1")
    this.setState({ movies: fetchMovies})
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Movie Tracker</h1>
        </header>
      </div>
    );
  }
}

export default App;
