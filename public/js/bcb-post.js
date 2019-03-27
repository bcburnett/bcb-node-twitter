/* eslint-disable require-jsdoc */
// eslint-disable-next-line max-len
import {LitElement, html} from '../node_modules/@polymer/lit-element/lit-element.js';
import {Styles} from './bcb-post-css.js';
import './bcb-comment-module.js';
export class BcbPost extends LitElement {
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
    this.socket = io.connect('/');
    this.data = JSON.parse(this.getAttribute('data'));
    this.userdata = JSON.parse(localStorage.getItem('data'));
  }

  render() {
    const data = this.data;
    const textDiv = document.createElement('pre');
    textDiv.style.textAlign = 'left';
    textDiv.innerHTML = data.postText;
    return html`
  ${Styles}
  <div class="container">

    <div class="data">
      <h2>
        ${data.postTitle}
      </h2>
      <p>
        ${data.poster}
      </p>
      <img src="${data.postImage}">
      ${textDiv}
      <bcb-comment-module data="${JSON.stringify(data)}" style="display:inline-block;"></bcb-comment-module>
      ${data.user_id === this.userdata._id ? html`
      <button @click="${(e) => this.editPost(data)}">Edit</button>
      <button @click="${(e) => this.deletePost(data)}">Delete</button>
      <br>
      ` : ''}
    </div>
  </div>
    `;
  }

  editPost(e) {
    const form = document.querySelector('bcb-post-form');
    form.setAttribute('data', JSON.stringify(e));
  }

  deletePost(e) {
    console.log(e.comments);
    e.comments.forEach((e)=>{
      this.socket.emit('deleteComment', {id: e._id, post: e.post});
    });
    this.socket.emit('dele', e.post_id);
  }
}
customElements.define('bcb-post', BcbPost);
