import React from 'react'
import { Component } from 'react'
import  Card  from '../../Components/Card/Card'
import { connect } from 'react-redux'
import './Movies.css'
import PropTypes from 'prop-types'

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

Movies.propsTypes = {
  movies: PropTypes.array.isRequired
}