/* eslint-disable require-jsdoc */
// eslint-disable-next-line max-len
import {LitElement, html} from '../node_modules/@polymer/lit-element/lit-element.js';
// import {setContent} from './bcb-content-data';

export class BcbContent extends LitElement {
  static get properties() {
    return {slot: {
      type: String,
      attribute: true,
      reflected: true,
    },
    };
  }

  constructor() {
    super();
    // setContent();
  }

  render() {
    console.log(this.slot)
    return html`<slot name="${this.slot}">${this.slot}</slot>`;
  }
}

customElements.define('bcb-content', BcbContent);
