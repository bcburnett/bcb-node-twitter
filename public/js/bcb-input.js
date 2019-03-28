/* eslint-disable require-jsdoc */
// eslint-disable-next-line max-len
import {LitElement, html} from '../node_modules/@polymer/lit-element/lit-element.js';
export class BcbInput extends LitElement {
  static get properties() {
    return {
      label: String,
      bg: {
        type: String,
        reflect: true,
      },
      name: String,
      type: {
        type: String,
        attribute: true,
        reflect: true,
      },
      width: Number,
      value: {
        type: String,
        attribute: true,
      },
      max: Number,
      min: Number,
      title: String,
    };
  }

  connectedCallback() {
    super.connectedCallback();
    const input = document.createElement('input');
    input.id = this.name;
    input.name = this.name;
    input.type = this.type;
    this.appendChild(input);
  }

  constructor() {
    super();
    this.value = '';
    this.bg = 'transparent';
    this.width = '75px';
    this.name = '';
    this.type = 'text';
    this.max = Number.MAX_VALUE;
    this.min = Number.MIN_VALUE;
  }

  render() {
    return html`
    <style>
:host {
  --form-width:${this.width};
  margin:10px 0;
  padding:0;
  display:block;
  width: var(--form-width);
  height: 23px;
  margin-top:1rem;
  box-sizing: border-box;
  cursor: pointer;
  margin-left: -50%;
  color:black;
}

    .form-group {
  position: relative;
  font-size: 1rem;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  text-align:center;
}

.form-control-placeholder {
  position: absolute;
  top: 0px;
  padding: 9px 0 0 13px;
  transition: all 200ms;
  opacity: .5;
  cursor:pointer;
  width: max-content;
  font-size: 10px;
  margin-left:-12px;
  color:white;
  font-size: 98%;
}

.form-control{
  position:absolute;
  top: 10px;
  border:0;
  border-bottom: 1px solid grey;
  background:${this.bg};
  outline: none;
  width: var(--form-width);
  color: white;
  cursor:pointer;
}


.form-control:focus + .form-control-placeholder,
.form-control:valid + .form-control-placeholder {
  transform: translate3d(0, -90%, 0);
  font-size: 80%;
  opacity: 1;
}

input[type=range] {
  -webkit-appearance: none;
  width: 100%;
  margin: 10.8px 0;
}
input[type=range]:focus {
  outline: none;
}
input[type=range]::-webkit-slider-runnable-track {
  width: 100%;
  height: 5px;
  cursor: pointer;
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  background: var(--primary-light);
  border-radius: 1.3px;
  border: 0.2px solid #010101;
}
input[type=range]::-webkit-slider-thumb {
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  border: 1px solid #000000;
  height: 20px;
  width: 6px;
  border-radius: 3px;
  background: var(--primary-color);
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -11px;
}
input[type=range]:focus::-webkit-slider-runnable-track {
  background: var(--primary-light);
}
input[type=range]::-moz-range-track {
  width: 100%;
  height: 8.4px;
  cursor: pointer;
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  background: var(--primary-light);
  border-radius: 1.3px;
  border: 0.2px solid #010101;
}
input[type=range]::-moz-range-thumb {
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  border: 1px solid #000000;
  height: 30px;
  width: 16px;
  border-radius: 3px;
  background: #c2ffff;
  cursor: pointer;
}
    </style>
      <div class="form-group">
        <input
        autocomplete="on"
        type="${this.type}"
        id="input"
        class="form-control"
        value=""
        max="${this.max}"
        min="${this.min}"
        @input="${this.input}"
        @change="${this.change}"
        title="${this.value}"
        name="this.name"
        required>
        <label
          class="form-control-placeholder"
          for="input">
          ${this.label}
        </label>
      </div>

    `;
  }

  input(e) {
    this.value = this.shadowRoot.getElementById('input').value;
    this.childNodes[1].value = this.value;
    this.title = this.value;

    if (this.type === 'checkbox') {
      // eslint-disable-next-line max-len
      this.childNodes[1].checked = this.shadowRoot.getElementById('input').checked;
      this.value = this.childNodes[1].checked ? 'false' : 'true';
      this.getElementById(this.name).value = this.value;
    }

    this.dispatchEvent(new CustomEvent('bcbinputinput', {
      detail: {
        value: this.value,
      },
    }));
  }

  change(e) {
    this.value = this.shadowRoot.getElementById('input').value;
    this.childNodes[1].value = this.value;
    this.title = this.value;

    if (this.type === 'checkbox') {
      // eslint-disable-next-line max-len
      this.childNodes[1].checked = this.shadowRoot.getElementById('input').checked;
      this.value = this.childNodes[1].checked ? 'false' : 'true';
      this.getElementById(this.name).value = this.value;
    }

    this.dispatchEvent(new CustomEvent('bcbinputchange', {
      detail: {
        value: this.value,
      },
    }));
  }
}
customElements.define('bcb-input', BcbInput);
