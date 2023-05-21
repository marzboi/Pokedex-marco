/* eslint-disable no-unused-vars */
import { Component } from './component';

export class Footer extends Component {
  constructor(selector: string) {
    super(selector);
    this.template = this.createTemplate();
    this.render();
  }

  createTemplate() {
    return `
    <footer>
      <address>ISDI coders - 2023 - Marco Fratini</address>
    </footer>
    `;
  }
}
