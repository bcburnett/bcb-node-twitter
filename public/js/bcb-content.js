/* eslint-disable require-jsdoc */
// eslint-disable-next-line max-len
import {LitElement, html} from '../node_modules/@polymer/lit-element/lit-element.js';

export class BcbContent extends LitElement {
  static get properties() {
    return {slot: {
      type: String,
      attribute: true,
      reflected: true,
    },
    };
  }

  render() {
    return html`<slot name="${this.slot}">${this.slot}</slot>`;
  }
}

customElements.define('bcb-content', BcbContent);
