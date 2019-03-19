import React from 'react'

export const Card = ({ movie }) => {
  const poster = movie.poster_path
  const path = `https://image.tmdb.org/t/p/w185/${poster}`

  return(
    <section className="card">
      <h3>{ movie.title }</h3>
      <img src={ path } alt={ movie.title } />
      <button>Favorite</button>
    </section>
  )
}