/* eslint-disable require-jsdoc */
// eslint-disable-next-line max-len
import {LitElement, html} from '../node_modules/@polymer/lit-element/lit-element.js';
import {Styles} from './bcb-welcome-css.js';
export class BcbWelcome extends LitElement {
  static get properties() {
    return {
      user: String,
    };
  }

  constructor() {
    super();
    this.socket = io.connect('/');
    this.socket.emit('welcome');
    this.socket.on('welcome', (data) => {
      if(!data) window.location.href ="/"
      this.user = data.name;
      delete data.password;
      localStorage.setItem('data', JSON.stringify(data));
    });
  }

  render() {
    return html`
  ${Styles}
  <h2>Welcome <br> ${this.user}</h2>
    `;
  }
}
customElements.define('bcb-welcome', BcbWelcome);
