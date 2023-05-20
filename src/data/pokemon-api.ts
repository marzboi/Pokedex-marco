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
    const search = await response.json();
    console.log(search);
    const pokemon: Pokemon = {
      id: search.id,
      name: search.name,
      imgUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${search.id}.gif`,
      size: { weight: search.weight, height: search.height },
    };
    return pokemon;
  }
}
