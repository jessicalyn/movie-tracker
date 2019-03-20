import React from 'react'
import { fetchData } from './fetchData'
import { shallow } from 'enzyme'

describe('fetchData', () => {
  let mockData

  beforeEach(() => {

    const mockData = [
      {title: "Cars", poster_path: "car.jpg"},
      {title: "How To Train Your Dragon", poster_path: "dragon.jpg"}
    ]

    fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      status: 200,
      json: () => Promise.resolve()
    }))
  })

  it('should take an expected url', () => {
    const url = "www.movies.com"

    fetchData(url)
    expect(fetch).toHaveBeenCalledWith(url)
  })
})