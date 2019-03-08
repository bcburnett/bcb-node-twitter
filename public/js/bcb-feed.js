/* eslint-disable require-jsdoc */
import { LitElement, html } from "../node_modules/@polymer/lit-element/lit-element.js";
import { Styles } from './bcb-feed-css.js';
export class BcbFeed extends LitElement {
  static get properties() {
    return {
      posts: Array
    };
  }

  constructor() {
    super();
    this.posts = [];
    this.socket = io.connect('/');
    this.socket.on('newPost', e => {
      const data = e.data;
      const currentUser = e.currentUser;
      const myhtml = html`
        <div style="
                        width:100%;
                        min-height:100px;
                        border: 1px solid #000;
                        padding-top:5px;
                        margin:10px auto;
                        border-radius:10px;
                        display:flex;
                        flex-direction:row;
                        overflow:hidden;
                        padding:10px;
                        justify-content:center;
                        ">
          <img src="${data.postImage}">
        <div class="data">
        <h2>
            ${data.poster} |
            ${data.postTitle}
          </h2>
          <textarea readonly name="postText" id="postText" placeholder="What's going on?">${data.postText}</textarea>
          <br />
          <center>

            <br />
            ${data.user_id === currentUser ? html`
            <button @click="${e => this.editPost(data)}">Edit</button>
            <button @click="${e => this.deletePost(data)}">Delete</button>
            <br>
            <br>
            ` : ''}
        </div>
        </div>
      `;
      this.posts = [...this.posts.reverse(), myhtml].reverse();
    });
    this.socket.on('dele', data => {
      this.posts = [];
      this.socket.emit('loadPosts');
    });
    this.socket.emit('loadPosts');
  }

  render() {
    return html`
  ${Styles}
  <div>
    ${this.posts}
  </div>
    `;
  }

  editPost(e) {
    const form = document.querySelector('bcb-post-form');
    form.setAttribute('data', JSON.stringify(e));
  }

  deletePost(e) {
    this.socket.emit('dele', e.post_id);
  }

}
customElements.define('bcb-feed', BcbFeed);
