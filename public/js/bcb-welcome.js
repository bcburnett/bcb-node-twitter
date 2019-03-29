/* eslint-disable require-jsdoc */
// eslint-disable-next-line max-len
import {LitElement, html} from '../node_modules/@polymer/lit-element/lit-element.js';
import {Styles} from './bcb-welcome-css.js';
export class BcbWelcome extends LitElement {
  static get properties() {
    return {
      user: String,
      profile: Object,

    };
  }

  constructor() {
    super();
    this.profile ={
      facebook: '',
      twitter: '',
      hobbies: '',
      image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNiYAAAAAkAAxkR2eQAAAAASUVORK5CYII=',
    };
    this.socket = SOCKET;
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
  <style>
    p{
      font-size:.6rem;
    }
  </style>
  <img src="${this.profile.image}" style="
  width:75px;
  height: 75px;
  border-radius:50%;
  margin-bottom: 0;
  margin-top: 10px;
  ">
  <h2>Welcome <br> ${this.user}</h2>
  <p>${this.profile.facebook}</p>
  <p>${this.profile.twitter}</p>
  <p>${this.profile.hobbies}</p>
    `;
  }
}
customElements.define('bcb-welcome', BcbWelcome);
