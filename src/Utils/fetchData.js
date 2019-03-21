import React from 'react'

export const fetchData = async (url, options) => {
  try {
  const response = await fetch(url, options)
    console.log(response)
    return await response.json()
  } catch (error) {
    throw new Error(error.message)
  }
}

