/* eslint-disable require-jsdoc */
// eslint-disable-next-line max-len
import {LitElement, html} from '../node_modules/@polymer/lit-element/lit-element.js';
import './bcb-input.js';
import {Styles} from './bcb-comment-css.js';
export class BcbComment extends LitElement {
  static get properties() {
    return {};
  }

  constructor() {
    super();
  }

  render() {
    return html`
  ${Styles}
  <div id="commentbutton">
    <button
      @click="${this.showform}"
    >Comment</button>
  </div>
  <div id="wrapper" class="wrapper hidden">
    <textarea
    name="comment"
    id="comment"
    cols="30"
    rows="2"
    placeholder="Comment Here"
    ></textarea>
    <button
      @click="${}"
    >Submit</button>
    <button
      @click="${this.hideform}"
    >Cancel</button>
    </div>
    `;
  }

  showform() {
    this.shadowRoot.querySelector('#wrapper').classList.remove('hidden');
    this.shadowRoot.querySelector('#commentbutton').classList.add('hidden');
  }

  hideform() {
    this.shadowRoot.querySelector('#wrapper').classList.add('hidden');
    this.shadowRoot.querySelector('#commentbutton').classList.remove('hidden');
  }
}
customElements.define('bcb-comment', BcbComment);
