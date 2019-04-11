/* eslint-disable valid-jsdoc */
/* eslint-disable require-jsdoc */
// eslint-disable-next-line max-len
import {LitElement, html} from '../node_modules/@polymer/lit-element/lit-element.js';
import {Styles} from './bcb-slidemenu-style.js';
export class BcbSlideMenu extends LitElement {
  static get properties() {
    return {
      arry: Array,
    };
  }

  constructor() {
    super();
  }
  /**
   * *Main Routine to render the web component
   *  @param {string} Styles - Imported from ./bcb-slide-menu-styles.js.
   *  @param {function} this.makeBars - Generates the 3 bars in the floating menu component
   *  @param {function} this.makeMenuItems -Generates the menu items from this.arry.
   */


  render() {
    /**
     * * makeBars
     * @function {makeBars} -Generates the 3 bars in the floating menu button.
     */
    const makeBars = () => {
      return [1, 2, 3].map((e) => {
        return html`
        <div class="bar"></div>
        `;
      });
    };
    /**
     * * makeMenuItems
     * @function {makeMenuItems} -Generates the menu items from this.arry.
     * @param {this.arry} -class variable that holds the menu items definition array, set from external js
     */


    const makeMenuItems = () => {
      return this.arry.map((e) => {
        return html`
        <span @click="${this.btnClick}" class="main-nav__item__link" id="${e.id}" >
          <i class="${e.icon}" ></i> ${e.id}
        </span >`;
      });
    };
    /**
      * * Render Function Return
      * * Renders the html for the element
      */


    return html`
    <link rel="stylesheet" href="css/all.css">
    ${Styles}
<div class="menu__float"><!-- Menu Float-->
  <div class="bars"><!-- Bars-->
  ${makeBars()}
</div><!-- Bars-->
  <div class="menu__slider"><!-- Menu Slider-->
${makeMenuItems()}
  </div><!-- Menu Slider-->
</div><!-- Menu Float-->

    `;
  }
  /**
   * * btnClick
   * @function {btnClick} -handles a click event from the menu.
   * * sets the selected button as the only one with the active class
   * * fires an event with the choice LISTEN in the form of:
   * @function document.querySelector('bcb-slide-menu').addEventListener('bcb-slide-menu', e =>console.log(e))
   * @param {string} {e} - contains the click event from the menu item
   */


  btnClick(e) {
    const id = e.path[0].id;
    this.setactive(e.path[0]);
    this.dispatchEvent(new CustomEvent('bcb-slide-menu', {
      detail: id,
    }));
  }
  /**
    * * setactive
    * @function {setactive} -sets the selected button as the only one with the active class.
    * @param {string} {active} - contains the click event menu item
    */


  setactive(active) {
    this.shadowRoot.querySelectorAll('span').forEach((span) => {
      span.classList.remove('active');
    });
    active.classList.add('active');
  }
}
customElements.define('bcb-slide-menu', BcbSlideMenu);
