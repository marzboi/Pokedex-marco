import { Pokemon, PokemonInfo } from '../models/pokemon';

export class PokeApi {
  pokeUrl: string;
  repoUrl: string;
  constructor() {
    this.pokeUrl = 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0';
    this.repoUrl = 'http://localhost:3000/pokemon';
  }

  async getAll() {
    const response = await fetch(this.pokeUrl);
    const pokemonList = await response.json();
    return pokemonList.results;
  }

  async getPokemon(url: PokemonInfo['url']) {
    const response = await fetch(url);
    return response.json();
  }
}
