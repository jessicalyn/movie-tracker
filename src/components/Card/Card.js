import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import './Card.css'
import heart from '../../images/add.png'

export class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ""
    }
  }

  addFavorites = async () => {
    if (this.props.user.id) {
      return await this.fetchFavorites();
    } else {
      this.setState({
        message: "Please login or sign up to favorite movies."
      })
    }
  }
  
  fetchFavorites = async () => {
    const { movie, user } = this.props;
    let data = {
      movie_id: movie.id,
      user_id: user.id,
      title: movie.title,
      poster_path: movie.poster_path,
      release_date: movie.release_date,
      vote_average: movie.vote_average,
      overview: movie.overview,
    }
    
    const url = "http://localhost:3000/api/users/favorites/new"
    try{
    const addFav = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
    
    const response = await addFav.json();
    this.setState({
      message: response.message
    })
  }  catch(error){
      this.setState({
        message: "Sorry something went wrong, please try again."
      })
    }
  }

  render() {
    const { movie } = this.props
    const poster = movie.poster_path
    const path = `https://image.tmdb.org/t/p/w185/${poster}`
    return (
      <section className="card">
        {/* <h3>{movie.title}</h3> */}
        <img src={path} alt={movie.title} />
        <button onClick={this.addFavorites}>
          <img src={heart}></img>
        </button>
        <p>{this.state.message && this.state.message}</p>
      </section>
    )
  }
}

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps)(Card)
