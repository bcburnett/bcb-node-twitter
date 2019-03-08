/* eslint-disable require-jsdoc */
import { LitElement, html } from "../node_modules/@polymer/lit-element/lit-element.js";
import { Styles } from './bcb-process-image-css.js';
export class BcbProcessImage extends LitElement {
  static get properties() {
    return {
      image: {
        type: String,
        attribute: true,
        reflected: true
      },
      data: {
        type: String
      },
      thumbnail: {
        type: String
      },
      reset: {
        type: Function,
        attribute: true,
        reflected: true
      }
    };
  }

  constructor() {
    super();
    this.image = `/img/noImageSelected.jpg`;
  }

  render() {
    return html`
  ${Styles}
  <img
  src="${this.image}"
  alt="placeholder"
  style="max-width:300px;max-height:300px"
  id="postDisplay"
  />
    <br />
  <input
  type="file"
  name="file"
  id="file"
  @change="${e => this.processFile(this.shadowRoot.querySelector('input'))}"
  />
    `;
  }

  processFile(e) {
    const postDisplay = this.shadowRoot.querySelector('#postDisplay');
    const reader = new FileReader();

    reader.onload = e => {
      postDisplay.setAttribute('src', e.target.result);
      this.image = e.target.result;
      this.width = postDisplay.clientWidth;
      this.height = postDisplay.clientHeight;
      this.sendEvent();
    };

    console.log(e);
    reader.readAsDataURL(e.files[0]);
  }

  sendEvent() {
    this.dispatchEvent(new CustomEvent('bcbprocessimage', {
      detail: {
        image: this.image,
        width: this.width,
        height: this.height
      }
    }));
  }

  updated(changedProperties) {
    const file = this.shadowRoot.querySelector('#file');
    file.value = '';
  }

}
customElements.define('bcb-process-image', BcbProcessImage);