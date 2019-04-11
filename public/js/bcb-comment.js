/* eslint-disable require-jsdoc */
// eslint-disable-next-line max-len
import {LitElement, html} from '../node_modules/@polymer/lit-element/lit-element.js';
import './bcb-input.js';
import {Styles} from './bcb-comment-css.js';
export class BcbComment extends LitElement {
  static get properties() {
    return {
      data: {
        type:Object,
        attribute:true
      }
    };
  }

  constructor() {
    super();
    this.socket = SOCKET;
    this.userdata = JSON.parse(localStorage.getItem('data'))
  }

  render() {
    return html`
  ${Styles}
  <div id="commentbutton">
    <button
      style="width: 97%; height:36px"
      @click="${this.showform}"
    >Leave A Comment</button>
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
      @click="${this.submitform}"
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
    this.shadowRoot.querySelector('textarea').value='';
    this.shadowRoot.querySelector('textarea').focus();
  }

  hideform() {
    this.shadowRoot.querySelector('#wrapper').classList.add('hidden');
    this.shadowRoot.querySelector('#commentbutton').classList.remove('hidden');
  }

  submitform() {
    this.hideform();
    const data = {};
    data.comment = this.shadowRoot.querySelector('textarea').value;
    data.post = this.data.post_id;
    data.userid = this.data.user_id;
    data.currentUser = this.data.currentUser;
    data.poster = this.data.poster;
    data.name = this.userdata.name;
    console.log(data);
    this.socket.emit('postComment', data);
    // this.dispatchEvent(new CustomEvent('bcbnavbar', {
    //   detail: data,
    // }));
  }
}
customElements.define('bcb-comment', BcbComment);
