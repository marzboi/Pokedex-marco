import { Pokemon, PokemonInfo } from '../models/pokemon';

export class PokeApi {
  pokeUrl: string;
  repoUrl: string;
  constructor() {
    this.pokeUrl = 'https://pokeapi.co/api/v2/pokemon?limit=';
    this.repoUrl = 'http://localhost:3000/pokemon';
  }

  async getAll(limit: number = 20, offset: number = 0) {
    const response = await fetch(this.pokeUrl + limit + '&offset=' + offset);
    const pokemonList = await response.json();
    return pokemonList.results;
  }

  async getPokemon(url: PokemonInfo['url']) {
    const response = await fetch(url);
    const search = await response.json();
    const pokemon: Pokemon = {
      id: search.id,
      name: search.name,
      imgUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${search.id}.gif`,
      size: { weight: search.weight, height: search.height },
      stats: {
        hp: search.stats[0].base_stat,
        attack: search.stats[1].base_stat,
        defense: search.stats[2].base_stat,
        specialA: search.stats[3].base_stat,
        specialD: search.stats[4].base_stat,
        speed: search.stats[5].base_stat,
      },
    };
    return pokemon;
  }
}
