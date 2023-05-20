import { Pokemon, PokemonInfo } from '../models/pokemon';

export class PokeAki {
  pokeUrl: string;
  repoUrl: string;
  constructor() {
    this.pokeUrl = 'https://pokeapi.co/api/v2/pokemon?limit=150&offset=0';
    this.repoUrl = 'http://localhost:3000/pokemon';
  }

  async getAll() {
    const response = await fetch(this.pokeUrl);
    return response.json();
  }

  async getPokemon(url: PokemonInfo['url']) {
    const response = await fetch(url);
    console.log(response);
    return response.json();
  }
}
