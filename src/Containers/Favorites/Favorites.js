import React from "react"
import { Component } from "react"
import { connect } from "react-redux"
import Card from '../../Components/Card/Card'
import PropTypes from 'prop-types'

export class Favorites extends Component {
  
  render() {
    const { user } = this.props
    const favoriteCards = user.favorites.map(movie => {
      return <Card key={movie.id} movie={movie} />
    })
    return(
      <section className="movie-container">
        { favoriteCards }
      </section>
    )
  }
}

export const mapStateToProps = (state) => ({
  user: state.user
})

export default connect(mapStateToProps)(Favorites)

Favorites.propTypes = {
  user: PropTypes.object.isRequired
}