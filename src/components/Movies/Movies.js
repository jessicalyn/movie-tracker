import React from 'react'
import { Component } from 'react'
import { Card } from '../Card/Card'
import { connect } from 'react-redux'
import './Movies.css'

export class Movies extends Component {

  render(){
    const { movies } = this.props
    const movieCards = movies.map(movie => {
      return <Card key={movie.id} movie={movie} />
    })
    return(
      <section className="movie-container">
        { movieCards }
      </section>
    )
  }
}

export const mapStateToProps = (state) => ({
  movies: state.movies
})

export default connect(mapStateToProps)(Movies)
