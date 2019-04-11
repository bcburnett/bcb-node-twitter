/* eslint-disable require-jsdoc */
// eslint-disable-next-line max-len
import {LitElement, html} from '../node_modules/@polymer/lit-element/lit-element.js';
import {Styles} from './bcb-chat-css.js';
import './bcb-input.js';
export class BcbChat extends LitElement {
  static get properties() {
    return {
      chat: Array,
      display: {
        type: String,
        attribute: true,
        reflect: true,
      },
    };
  }

  constructor() {
    super();
    this.chat = [];
    this.display='';
    this.socket = SOCKET;
    this.socket.on('hello', (data) => {
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
    <div class="chatDivWrapper">
      <div  class="chatDiv" id="chatDiv">
        ${this.chat}
      </div>
      <bcb-input
      fg="black"
      name="bcb-input1"
      id="bcbinput1"
      label="Chat Here"
      width="75%"
      type="text"
      value="${this.display}"
      @bcbinputchange="${(e) => this.doChat(e)}" />
    </div>

  </div>
    `;
  }

  doChat(e, f) {
    const value = e.detail.value;
    console.log(value);
    this.display = value;
    if (!value) return;
    this.socket.emit('hello', value);
    this.display = '';
  }
}
customElements.define('bcb-chat', BcbChat);
