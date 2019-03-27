import React from "react"
import { Component } from "react"
import { connect } from "react-redux"
import { fetchOptionsCreator } from '../../Utils/fetchOptionsCreator'
import { fetchData } from '../../Utils/fetchData'
import { hasError, updateUser } from '../../Actions'
import { fetchUserFavorites } from "../../Utils/fetchFavorites"
import './Card.css'
import heart from '../../images/heart-active.png'

export class Card extends Component {

  addFavorites = () => {
    if (this.props.user.id) {
      return this.validateFavorites()
    } else {
      const message = "Please login or sign up to favorite movies."
      this.props.hasError(message)
      return setTimeout(() => {
          this.props.hasError("")
        }, 2000)
    }
  }

  validateFavorites = async () => {
    const { favorites } = this.props.user
    const existing = await favorites.find(favorite => favorite.movie_id === this.props.movie.id)
    return (existing ? this.deleteFavorite() : this.fetchFavorites())
  }

  fetchFavorites = async () => {
    const { movie, user } = this.props;
    const url = "http://localhost:3000/api/users/favorites/new"
    const body = {
      movie_id: movie.id,
      user_id: user.id,
      title: movie.title,
      poster_path: movie.poster_path,
      release_date: movie.release_date,
      vote_average: movie.vote_average,
      overview: movie.overview
    }
    try {
      const options = await fetchOptionsCreator('POST', body)
      const result = await fetchData(url, options)
      if(result.status === "success"){
        const favorites = await fetchUserFavorites(user.id)
        return this.props.updateUser({id: user.id, name: user.name, favorites})
      }
    } catch(error) {
      const message = "Sorry something went wrong, please refresh and try again."
      this.props.hasError(message)
      return setTimeout(() => {
          this.props.hasError("")
        }, 2000)
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
        const favorites = await fetchUserFavorites(user.id)
        return this.props.updateUser({id: user.id, name: user.name, favorites})
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
        <img src={path} alt={movie.title} />
        <button onClick={this.addFavorites}>
          <img src={heart} alt="favorite movie button"></img>
        </button>
        <p>{this.props.error && this.props.error}</p>
      </section>
    )
  }
}

export const mapStateToProps = (state) => ({
    user: state.user,
    error: state.error
})

export const mapDispatchToProps = (dispatch) => ({
  hasError: (message) => dispatch(hasError(message)),
  updateUser: (id, name, favorites) => dispatch(updateUser(id, name, favorites))
})

export default connect(mapStateToProps, mapDispatchToProps)(Card)
