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
    const likes = data.likes.map((like)=>{
      return html`${like.name} <br> `;
    });

    const image = data.postImage;
    return html`
  ${Styles}
  <div class="container">

    <div class="data">
      <h2>
        ${data.postTitle}
      </h2>
      <p>
        Posted by: &nbsp;${data.poster}
        <img src="${data.avatar}"
        style="
          width:50px;
          height: 50px;
          border-radius:50%;
        "
        >

      </p>
      <img src="${image}">
      ${textDiv}
      <bcb-comment-module data="${JSON.stringify(data)}" style="display:inline-block;"></bcb-comment-module>


      ${data.user_id === this.userdata._id ? html`
      <button @click="${(e) => this.editPost(data)}">Edit</button>
      <button @click="${(e) => this.deletePost(data)}">Delete</button>
      <br>
      ` : ''}
      <br>
      <br>
      <div class="dropdown" @click="${(e) => this.likePost(data)}">
        ${data.likes.length}
        <i class="fas fa-heart" style="color:red; margin-left:5px">
        </i>
        <div class="dropdown-content">${likes}</div>
      </div>
    </div>
  </div>
    `;
  }

  editPost(e) {
    const form = document.querySelector('bcb-post-form');
    const data = e;
    data.action = 'edit';
    form.setAttribute('data', JSON.stringify(data));
  }

  deletePost(e) {
    e.comments.forEach((e) => {
      this.socket.emit('deleteComment', {id: e._id, post: e.post});
    });
    this.socket.emit('deleteLikes', e.post_id);
    this.socket.emit('dele', e.post_id);
  }

  likePost(e) {
    const like = {};
    like.userid = this.userdata._id;
    like.post = e.post_id;
    like.name = this.userdata.name;
    this.socket.emit('like', like);
  }
}
customElements.define('bcb-post', BcbPost);
