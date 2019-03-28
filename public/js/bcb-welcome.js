/* eslint-disable require-jsdoc */
// eslint-disable-next-line max-len
import {LitElement, html} from '../node_modules/@polymer/lit-element/lit-element.js';
import {Styles} from './bcb-welcome-css.js';
export class BcbWelcome extends LitElement {
  static get properties() {
    return {
      user: String,
      image: String,
    };
  }

  constructor() {
    super();
    this.socket = io.connect('/');
    this.socket.emit('welcome');
    this.socket.on('welcome', (data) => {
      if (!data) window.location ='/users/login';
      this.user = data.name;
      delete data.password;
      localStorage.setItem('data', JSON.stringify(data));
    });
    this.socket.on('login', (e)=> window.location = '/users/login');
  }

  render() {
    return html`
  ${Styles}
  <img src="${this.image}" style="
  width:75px;
  height: 75px;
  border-radius:50%;
  margin-bottom: 0;
  margin-top: 10px;
  ">
  <h2>Welcome <br> ${this.user}</h2>
    `;
  }
}
customElements.define('bcb-welcome', BcbWelcome);
