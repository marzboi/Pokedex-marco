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
          <li><button class="prev">Previous</button></li>
          <li><button class="next">Next</button></li>
        </ul>
        <div>
          <label for="poke-items">Pokemons per page
            <select name="poke" id="poke-items">
              <option value="20">20</option>
              <option value="40">40</option>
              <option value="60">60</option>
            </select>
          </label>
        </div>
      </section>
    `;
  }
}
