/* eslint-disable require-jsdoc */
import {LitElement, html} from '../node_modules/@polymer/lit-element/lit-element.js';
import {Styles} from './bcb-process-image-css.js';
export class BcbProcessImage extends LitElement {
  static get properties() {
    return {
      image: {
        type: String,
        attribute: true,
        reflected: true,
      },
      data: {
        type: String,
      },
      thumbnail: {
        type: String,
      },
      reset: {
        type: Function,
        attribute: true,
        reflected: true,
      },
      scale: String,
    };
  }

  constructor() {
    super();
    this.image = `/img/noImageSelected.jpg`;
  }

  render() {
    return html`
  ${Styles}
  <img src="${this.image}" alt="placeholder"  id="postDisplay" />
  <br />
  <input type="file" name="file" id="file" @change="${(e) => this.processFile(this.shadowRoot.querySelector('#file'))}" />
    `;
  }

  processFile(e) {
    const postDisplay = this.shadowRoot.querySelector('#postDisplay');
    const reader = new FileReader();
    reader.readAsDataURL(e.files[0]);
    reader.onload = (e) => {
      console.log(e);
      const img = new Image();
      img.src = e.target.result;
      img.onload = () => {
        const elem = document.createElement('canvas');
        const scale = this.scale/Math.max(img.width, img.height);
        elem.width = img.width * scale;
        elem.height = img.height * scale;
        const ctx = elem.getContext('2d');
        // img.width and img.height will contain the original dimensions
        ctx.drawImage(img, 0, 0, img.width * scale, img.height * scale);
        const data = ctx.canvas.toDataURL(img, 'image/webp', 1);
        postDisplay.setAttribute('src', data);
        this.image = data;
        this.width = postDisplay.clientWidth;
        this.height = postDisplay.clientHeight;
        this.sendEvent();
      };
    };
  }

  sendEvent() {
    this.dispatchEvent(new CustomEvent('bcbprocessimage', {
      detail: {
        image: this.image,
        width: this.width,
        height: this.height,
      },
    }));
  }

  updated(changedProperties) {
    const file = this.shadowRoot.querySelector('#file');
    file.value = '';
  }
}
customElements.define('bcb-process-image', BcbProcessImage);
