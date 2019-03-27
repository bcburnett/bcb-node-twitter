/* eslint-disable require-jsdoc */
// eslint-disable-next-line max-len
import {LitElement, html} from '../node_modules/@polymer/lit-element/lit-element.js';
import {Styles} from './bcb-feed-css.js';
import './bcb-post.js';
export class BcbFeed extends LitElement {
  static get properties() {
    return {
      posts: Array,
    };
  }

  constructor() {
    super();
    this.posts = [];

    this.socket = io.connect('/');

    this.socket.on('newPost', async (e) => {
      console.log(e);
      const comments = await fetch(`/users/getComments?post=${e.data.post_id}`);
      const commentsData=await comments.json() || {};
      const data = e.data;
      data.comments = commentsData;
      data.currentUser = e.currentUser;
      console.log(this.posts);
      this.posts = [...this.posts, data].sort((a, b)=>{
        return new Date(b.date) - new Date(a.date);
      });
    });

    this.socket.on('newComment', (data)=>{
      const id = this.posts.map((item) => item.post_id).indexOf(data.post);
      this.posts[id].comments = [...this.posts[id].comments, data];
      this.posts = [...this.posts];
    });

    this.socket.on('deleteComment', (data)=>{
      const id = this.posts.map((item) => item.post_id).indexOf(data.post);
      const commentId = this.posts[id].comments.map((item) => item._id).indexOf(data.id);
      this.posts[id].comments.splice(commentId, 1);
      this.posts = [...this.posts];
    });

    this.socket.on('dele', (data)=>{
      const id = this.posts.map((item) => item.post_id).indexOf(data);
      this.posts.splice(id, 1);
      this.posts = [...this.posts];
    });

    this.socket.emit('loadPosts');
  }

  render() {
    const posts = this.posts.map((data)=>{
      return html`
      <bcb-post data="${JSON.stringify(data)}"></bcb-post>
      `;
    });
    return html`
  ${Styles}
  <div>
    ${posts}
  </div>
    `;
  }
}
customElements.define('bcb-feed', BcbFeed);
