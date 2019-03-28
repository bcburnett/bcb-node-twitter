/* eslint-disable require-jsdoc */
/* eslint-disable max-len */
import {LitElement, html} from '../node_modules/@polymer/lit-element/lit-element.js';
import {beforeNextRender} from '../node_modules/@polymer/polymer/lib/utils/render-status.js';
// style sheet
import {bcbNavbarStyle} from './bcb-navbar-style.js';
// navbar buttons file (see file for format)
import {Buttons} from './bcb-navbar-data.js';

// main class
export class BcbNavbar extends LitElement {
  // watch variables (triggers render on change)
  static get properties() {
    return {
      btnactive: Object,
      branding: String,
      arry: {
        type: Array,
        reflect: true,
        attribute: true,
      },
      e: String,
      tooltip: String,
      nonav: String,
    };
  }

  // setup set buttons and branding title
  constructor() {
    super();
    // setup set buttons and branding title
    this.arry = Buttons;
    this.branding = this.branding || '';
    // disable buttons and hamburger menu if no buttons are defined
    if (this.arry.length !== 0) {
      beforeNextRender(this, (e) => {
        this.shadowRoot.getElementById([this.arry[0].id]).classList.add('active');
        this.shadowRoot.getElementById([this.arry[0].id] + 's').classList.add('active');
      });
    } else {
      document.documentElement.style.setProperty('--float-button', 'none');
    }
  }

  render() {
    // render the dropdown menu items to an array
    const dropdownItems = () => {
      return this.arry.map((e) => e ? html`
        <span  style="display:block;" @click="${this.btnClick}" class="main-nav__item__link ${e.icon}" id="${e.id}s" >
          ${e.id}
        </span >` : '');
    };

    // render the nav buttons to an array
    const navItems = () => {
      if (this.arry === []) return;
      return this.arry.map((e) => e ? html`
        <li class="main-nav__item hide_me ">
          <button @click="${this.btnClick}" class="main-nav__item__link ${e.icon}" id="${e.id}">
            ${e.id}
          </button>
        </li>` : '');
    };
    return html`
${bcbNavbarStyle}
<div class="navbar ${this.tooltip ? 'tooltip' : ''}"><span class="${this.tooltip ? '' : 'hidden'}">${this.tooltip}</span>
  <header class="main-title">
    <nav class="main-nav">
      <ul class="main-nav__items">
         <li>
          <div class="dropdown">
            <span class="bars" @click="e=>e.stopPropagation()" >
              ${[1, 2, 3].map((e) => html`<div class="bar"></div>`)}
            </span>
            <div class="dropdown-content">

              ${this.nonav !=='nonav'?dropdownItems(): document.documentElement.style.setProperty('--float-button', 'none')}

            </div>
          </div>
        </li>
        <li class=" main-nav__item main-nav__branding">
          <a href="${document.URL}" class="main-nav__branding__link">${html([this.branding])}</a>
        </li>
        <li>
          <div class="main-nav__menu">

                ${this.nonav !=='nonav'?navItems():''}
          </div>
        </li>
      </ul>
    </nav>
  </header>
  </div>
    `;
  }

  // on button click dispatch an event with the data of the button name
  btnClick(e) {
    this.btnactive = e.path[0];
    this.setactive(this.btnactive);
    let id = e.path[0].id;
    if (e.path[0].nodeName === 'SPAN') id = id.substring(0, id.length - 1);
    this.dispatchEvent(new CustomEvent('bcbnavbar', {
      detail: id,
    }));
  }

  // sets the class of the dropdown and the button to active
  setactive(active) {
    this.shadowRoot.querySelectorAll('button').forEach((button) => {
      button.classList.remove('active');
    });
    this.shadowRoot.querySelectorAll('span').forEach((span) => {
      span.classList.remove('active');
    });
    const id = active.id;
    let oActive = {};

    if (active.nodeName === 'SPAN') {
      oActive = this.shadowRoot.getElementById(id.substring(0, id.length - 1));
    } else {
      oActive = this.shadowRoot.getElementById(id + 's');
    }

    active.classList.add('active');
    oActive.classList.add('active');
  }
}
customElements.define('bcb-navbar', BcbNavbar);
