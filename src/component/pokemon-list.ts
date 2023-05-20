import { PokeApi } from '../data/pokemon-api';
import { Pokemon, PokemonInfo } from '../models/pokemon';
import { Component } from './component';

export class PokemonList extends Component {
  pokemons: PokemonInfo[];
  pokeRepo: PokeApi;
  itemsPerPage: number;
  offset: number;

  constructor(selector: string) {
    super(selector);
    this.pokemons = [];
    this.pokeRepo = new PokeApi();
    this.itemsPerPage = 20;
    this.offset = 0;
    this.handleLoad(this.itemsPerPage, this.offset);
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

  async handleDisplayPokemon(selectedValue: string) {
    console.log('Selected value:', selectedValue);
  }

  async handleLoad(limit: number, offset: number) {
    this.pokemons = await this.pokeRepo.getAll(limit, offset);
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
      <section>
        <ul></ul>
        <div>
          <label for="poke-items">Pokemons per page
            <select name="poke" id="poke-items">
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
              <option value="150">150</option>
            </select>
          </label>
        </div>
      </section>
      <h2>Pokedex</h2>
      <section class="pokemon-list">
        <ul>${pokeList}</ul>
      </section>
    `;
  }
}
