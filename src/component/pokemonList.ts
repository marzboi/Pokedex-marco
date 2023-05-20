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
    const element = event.target;
    const url = element.dataset.id;
    const one = await this.pokeRepo.getPokemon(url);
    console.log(one);
  }

  createTemplate() {}
}
