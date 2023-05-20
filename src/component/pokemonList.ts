import { PokeAki } from '../data/pokemon-api';
import { Pokemon } from '../models/pokemon';
import { Component } from './component';

// TEMP import './tasks.list.css';

export class PokemonList extends Component {
  pokemons: Pokemon[];
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
      .querySelectorAll('i.button')
      .forEach((item) =>
        item.addEventListener('click', this.handleDelete.bind(this))
      );
    this.element
      .querySelectorAll('input')
      .forEach((item) =>
        item.addEventListener('change', this.handleChange.bind(this))
      );
  }

  async handleChange() {}
  async handleDelete() {}

  async handleLoad() {
    this.pokemons = await this.pokeRepo.getAll();
    this.render();
  }

  createTemplate() {
    const balls = this.pokemons.results
      .map(
        (item) => `
    <li>
      <span>${item.name}</span>
      <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
        item.url.split('/')[6]
      }.png" heigh=120 width=120>
      <span><a href="${item.url}">Details</a></span>
    </li>`
      )
      .join('');

    return `
    <h2>Pokedex</h2>
    <section class="pokemon-list"><ul>${balls}</ul></section>`;
  }
}
