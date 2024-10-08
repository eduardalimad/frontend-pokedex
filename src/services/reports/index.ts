import { http } from '../config/index'

export default {
  getItens: async (limit: number, offset: number) => {
    return await http.get(`pokemon?limit=${limit}&offset=${offset}`)
  },
  getPokemon: async (id:number) => {
    return await http.get(`pokemon-species/${id}/`)
  },
  getEvolution: async (id:number) => {
    return await http.get(`evolution-chain/${id}/`)
  },
  getPokemonById: async (id:number) => {
    return await http.get(`pokemon/${id}/`)
  },
  getGroupPokemonByType: async (id:number) => {
    return await http.get(`type/${id}/`)
  },
}