import { fetchOptionsCreator } from './fetchOptionsCreator'
import { fetchData } from './fetchData'

export const fetchUserFavorites = async (id) => {
  const url = `http://localhost:3000/api/users/${id}/favorites`
  try {
    const options = await fetchOptionsCreator('GET')
    const result = await fetchData(url, options)
    if(result.status === "success"){
      const favorites = result.data
      return favorites
    }
  } catch(error) {
    const message = "Error finding favorite movies, please refresh page and try again."
    this.props.hasError(message)
      setTimeout(() => {
        this.props.hasError("")
      }, 3000)
    }
}