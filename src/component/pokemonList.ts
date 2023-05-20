import { PokeAki } from '../data/pokemon-api';
import { PokemonInfo } from '../models/pokemon';
import { Component } from './component';

// TEMP import './tasks.list.css';

export class PokemonList extends Component {
  pokemons: PokemonInfo[];
  pokeRepo: PokeAki;
  constructor(selector: string) {
    super(selector);
    this.pokemons = [];
    this.pokeRepo = new PokeAki();
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
    const element = event.target;
    const url = element.dataset.id as string;
    this.pokeRepo.getPokemon(url);
  }

  createTemplate() {
    console.log(this.pokemons);
    const balls = this.pokemons.results
      .map(
        (item) => `
    <li>
      <p>${item.name}</p>
      <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${
        item.url.split('/')[6]
      }.gif" heigh=100 width=100>
      <span data-id="${item.url}">Combat Info</span>
    </li>`
      )
      .join('');

    return `
    <h2>Pokedex</h2>
    <section class="pokemon-list"><ul>${balls}</ul></section>`;
  }
}
