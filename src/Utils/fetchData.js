import React from 'react'

export const fetchData = async (url) => {
  try {
  const response = await fetch(url)
    return await response.json()
  } catch (error) {
    throw new Error(error.message)
  }
}

