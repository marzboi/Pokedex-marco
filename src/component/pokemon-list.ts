import { PokeApi } from '../data/pokemon-api';
import { Pokemon, PokemonInfo } from '../models/pokemon';
import { Component } from './component';
import { Navigation } from './navigation';

export class PokemonList extends Component {
  pokemons: PokemonInfo[];
  pokeRepo: PokeApi;
  itemsPerPage: number;
  offset: number;
  pokemonArrayInfo!: object[];

  constructor(selector: string) {
    super(selector);
    this.pokemons = [];
    this.pokeRepo = new PokeApi();
    this.itemsPerPage = 20;
    this.offset = 0;
    // eslint-disable-next-line no-new
    new Navigation('main');
    this.handleEventListeners();
    this.handleLoad();
  }

  async render(): Promise<void> {
    super.cleanHtml();
    this.template = await this.createTemplate();
    this.pokemonArrayInfo = await this.createPokemonInfo();
    super.render();
    document.querySelectorAll('.poke-info').forEach((item) => {
      item.addEventListener('click', () => console.log(true));
    });
  }

  async handleEventListeners() {
    document
      .querySelector('#poke-items')!
      .addEventListener('change', (event) => {
        const selectedValue = (event.target as HTMLSelectElement).value;
        this.handleDisplayPokemon(selectedValue);
      });

    document
      .querySelector('.next')
      ?.addEventListener('click', this.handleNextButton.bind(this));

    document
      .querySelector('.prev')
      ?.addEventListener('click', this.handlePrevButton.bind(this));

    document
      .querySelector('.return')
      ?.addEventListener('click', this.handleReturnButton.bind(this));
  }

  async handleReturnButton() {
    this.offset = 0;
    this.handleLoad();
  }

  async handleNextButton() {
    if (this.offset >= 1281) this.offset = 1280;
    this.offset = this.itemsPerPage + this.offset;
    this.handleLoad();
  }

  async handlePrevButton() {
    if (this.offset === 0) return;
    this.offset -= this.itemsPerPage;
    if (this.offset < 0) this.offset = 0;
    this.handleLoad();
  }

  async handleDisplayPokemon(selectedValue: string) {
    this.itemsPerPage = Number(selectedValue);
    this.handleLoad();
  }

  async handleLoad() {
    this.pokemons = await this.pokeRepo.getAll(this.itemsPerPage, this.offset);
    this.render();
  }

  async handleGetOnePokemonInfo(url: string) {
    return this.pokeRepo.getPokemon(url);
  }

  async createPokemonInfo() {
    const promiseArray: Promise<Pokemon>[] = [];

    this.pokemons.forEach((element) => {
      promiseArray.push(this.handleGetOnePokemonInfo(element.url));
    });

    return Promise.all(promiseArray);
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
            <p>${item.name.toUpperCase()}</p><span>Index # ${item.id}</span>
            <img src="${item.imgUrl}" class="poke-info">
            <span>Type I: ${item.type.mainType}</span>
            <span>Type II: ${
              item.type.secondaryType
                ? item.type.secondaryType
                : item.type.mainType
            }</span>
            
          </li>
          `
      )
      .join('');

    return `
      <section class="pokemon-list">
      <h2>Pokedex</h2>
        <ul>${pokeList}</ul>
      </section>
    `;
  }
}
