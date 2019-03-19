import React from 'react'
import { Component } from 'react'
import { Card } from '../Card/Card'

import './Movies.css'

export default class Movies extends Component {
  constructor(props) {
    super(props)
  }

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

