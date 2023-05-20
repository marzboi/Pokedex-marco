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
  }

  async handleChange() {}
  async handleDelete() {}

  async handleLoad() {
    this.pokemons = await this.pokeRepo.getAll();
    this.render();
  }

  createTemplate() {
    const imgUrl = '';
    const balls = this.pokemons.results
      .map(
        (item) => `
    <li>
      <span>${item.name}</span>
      <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${
        item.url.split('/')[6]
      }.gif" heigh=100 width=100>
      <span><a href="${item.url}">Combat Info</a></span>
    </li>`
      )
      .join('');

    return `
    <h2>Pokedex</h2>
    <section class="pokemon-list"><ul>${balls}</ul></section>`;
  }
}
