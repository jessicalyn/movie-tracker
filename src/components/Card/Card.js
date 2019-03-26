import React from "react"
import { Component } from "react"
import { connect } from "react-redux"
import { fetchOptionsCreator } from '../../Utils/fetchOptionsCreator'
import { fetchData } from '../../Utils/fetchData'
import { hasError } from '../../Actions'

export class Card extends Component {

  addFavorites = async () => {
    if (this.props.user.id) {
      return await this.fetchFavorites()
    } else {
      const message = "Please login or sign up to favorite movies."
      return this.props.hasError(message)
    }
  }

  validateFavorites = async () => {
    const { favorites } = this.props.user
    const existing = await favorites.find(favorite => favorite.movie_id === this.props.movie.id)
    if(existing === undefined){
      this.fetchFavorites()
    } else 
      this.deleteFavorite()
  }

  fetchFavorites = async () => {
    const { movie, user } = this.props;
    const body = {
      movie_id: movie.id,
      user_id: user.id,
      title: movie.title,
      poster_path: movie.poster_path,
      release_date: movie.release_date,
      vote_average: movie.vote_average,
      overview: movie.overview
    }
    const url = "http://localhost:3000/api/users/favorites/new"
    try {
      const options = await fetchOptionsCreator('POST', body)
      const result = await fetchData(url, options)
      if(result.status === "success"){
        const message = result.message
        return this.props.hasError(message)
      }
    } catch(error) {
      const message = "Sorry something went wrong, please refresh and try again."
      return this.props.hasError(message)
    }
  }
  
  deleteFavorite = async () => {
    const { user, movie } = this.props
    const url = `http://localhost:3000/api/users/${user.id}/favorites/${movie.id}`
    const body = { user_id: user.id, movie_id: movie.id}
    try {
      const options = await fetchOptionsCreator('DELETE', body)
      const result = await fetchData(url, options)
      if(result.status === "success"){
        console.log("successful delete", result)
      }
    } catch(error) {
      console.log("delete error", error)
    }
  }

  render() {
    const { movie } = this.props
    const poster = movie.poster_path
    const path = `https://image.tmdb.org/t/p/w185/${poster}`
    return (
      <section className="card">
        <h3>{movie.title}</h3>
        <img src={path} alt={movie.title} />
        <button onClick={this.validateFavorites}>Favorite</button>
      </section>
    )
  }
}

export const mapStateToProps = (state) => ({
    user: state.user,
    error: state.error
})

export const mapDispatchToProps = (dispatch) => ({
  hasError: (message) => dispatch(hasError(message))
})

export default connect(mapStateToProps, mapDispatchToProps)(Card)
