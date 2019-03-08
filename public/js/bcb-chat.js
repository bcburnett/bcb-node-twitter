/* eslint-disable require-jsdoc */
import { LitElement, html } from "../node_modules/@polymer/lit-element/lit-element.js";
import { Styles } from './bcb-chat-css.js';
import "./bcb-input.js";
export class BcbChat extends LitElement {
  static get properties() {
    return {
      chat: Array
    };
  }

  constructor() {
    super();
    this.chat = [];
    this.socket = io.connect('/');
    this.socket.emit('getLastFiveMessages');
    this.socket.on('hello', data => {
      const myData = html`
      <p> ${data} </p>
      `;
      this.chat = [...this.chat, myData];
      setTimeout(() => {
        const elem = this.shadowRoot.querySelector('#chatDiv');
        elem.scrollTop = elem.scrollHeight;
      }, 0);
    });
  }

  render() {
    return html`
  ${Styles}
  <div>
    <h2>Chat</h2>
    <div class="chatDiv" id="chatDiv">
    ${this.chat}
    </div>
    <input
        name="bcb-input1"
        id="bcb-input1"
        label="Chat Here"
        width="350px"
        type="text"
        @change="${e => this.doChat(e, this)}"
        placeholder="Say Something"
        />
  </div>
    `;
  }

  doChat(e, f) {
    console.log(e, f);
    let value;

    if (e.path) {
      value = e.path[0];
    }

    if (e.explicitOriginalTarget) {
      value = e.explicitOriginalTarget;
    }

    const value1 = value.value;
    if (!value1) return;
    this.socket.emit('hello', value1);
    value.value = '';
  }

}
customElements.define('bcb-chat', BcbChat);
