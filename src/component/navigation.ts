import { Component } from './component';

export class Navigation extends Component {
  constructor(selector: string) {
    super(selector);
    this.template = this.createTemplate();
    this.render();
  }

  createTemplate() {
    return `
      <section class="list-generator">
        <ul class="nav-buttons">
          <li><button>Previous</button></li>
          <li><button>Next</button></li>
        </ul>
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
    `;
  }
}
