import axios from 'axios';

export const reqResPokemonApi =  axios.create({
  baseURL: 'https://pokeapi.co/api/v2/pokemon'
});