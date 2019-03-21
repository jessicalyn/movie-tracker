export const fetchData = async (url, options) => {
  try {
  const response = await fetch(url, options)
    return response.json()
  } catch (error) {
    throw new Error(error.message)
  }
}

