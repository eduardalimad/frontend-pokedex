import axios from 'axios'

const http = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/',
  headers: {
    Accept: 'application/json',
    Content: 'application/json'
  }
})

export { http }