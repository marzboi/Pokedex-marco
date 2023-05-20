import { PokeApi } from '../data/pokemon-api';
import { Pokemon, PokemonInfo } from '../models/pokemon';
import { Component } from './component';

export class PokemonList extends Component {
  pokemons: PokemonInfo[];
  pokeRepo: PokeApi;

  constructor(selector: string) {
    super(selector);
    this.pokemons = [];
    this.pokeRepo = new PokeApi();
    this.handleLoad();
  }

  async render(): Promise<void> {
    super.cleanHtml();
    this.template = await this.createTemplate();
    super.render();
    this.element
      .querySelectorAll('img')
      .forEach((item) =>
        item.addEventListener('click', this.displayPokemon.bind(this))
      );
  }

  async displayPokemon() {
    console.log(true);
  }

  async handleLoad() {
    this.pokemons = await this.pokeRepo.getAll();
    this.render();
  }

  async handleGetOnePokemonInfo(url: string) {
    return this.pokeRepo.getPokemon(url);
  }

  async createTemplate() {
    const promiseArray: Promise<Pokemon>[] = [];

    this.pokemons.forEach((element) => {
      promiseArray.push(this.handleGetOnePokemonInfo(element.url));
    });

    const pokemonInformation = await Promise.all(promiseArray);

    const pokeList = pokemonInformation
      .map(
        (item) =>
          `
          <li>
            <p>${item.name}</p>
            <img src="${item.imgUrl}" width="170" height="150">
            <span>Combat Info</span>
          </li>
          `
      )
      .join('');

    return `
      <h2>Pokedex</h2>
      <section class="pokemon-list">
        <ul>${pokeList}</ul>
      </section>
    `;
  }
}
