import { PokeApi } from '../data/pokemon-api';
import { PokemonInfo } from '../models/pokemon';
import { Component } from './component';

// TEMP import './tasks.list.css';

export class PokemonList extends Component {
  pokemons: PokemonInfo[];
  pokeRepo: PokeApi;
  constructor(selector: string) {
    super(selector);
    this.pokemons = [];
    this.pokeRepo = new PokeApi();
    this.handleLoad();
  }

  render(): void {
    super.cleanHtml();
    this.template = this.createTemplate();
    super.render();
    this.element
      .querySelectorAll('span')
      .forEach((item) =>
        item.addEventListener('click', this.handleGetOne.bind(this))
      );
  }

  async handleLoad() {
    this.pokemons = await this.pokeRepo.getAll();
    this.render();
  }

  async handleGetOne(event: Event) {
    const element = event.target as HTMLSpanElement;
    if (!element) return;

    const url = element.dataset.id;

    if (!url) return;
    const pokemon = await this.pokeRepo.getPokemon(url);
    console.log(pokemon);
  }

  createTemplate() {
    const pokemons = this.pokemons
      .map(
        (item) => `
        <li>
          <p>${item.name}</p>
          <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${
            item.url.split('/')[6]
          }.gif" width="170" height="150">
          <span data-id="${item.url}">Combat Info</span>
        </li>`
      )
      .join('');

    return `
    <h2>Pokedex</h2>
    <section class="pokemon-list"><ul>${pokemons}}</ul></section>`;
  }
}
