/* eslint-disable require-jsdoc */
// eslint-disable-next-line max-len
import {LitElement, html} from '../node_modules/@polymer/lit-element/lit-element.js';
import {Styles} from './bcb-comment-module-css.js';
import './bcb-comment.js';
export class BcbCommentModule extends LitElement {
  static get properties() {
    return {
      data: {
        type: Object,
        attribute: true,
      },
    };
  }

  constructor() {
    super();
  }

  render() {
    return html`
  ${Styles}
  <bcb-comment></bcb-comment>
    `;
  }
}
customElements.define('bcb-comment-module', BcbCommentModule);
