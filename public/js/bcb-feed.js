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
      const comments = await fetch(`/users/getComments?post=${e.data.post_id}`);
      const commentsData=await comments.json() || [];
      const likes = await fetch(`/users/getLikes?post=${e.data.post_id}`);
      const likesData=await likes.json() || [];
      const avatar = await fetch(`/users/getProfileImage?user=${e.data.user_id}`);
      let avatarData=await avatar.text();
      avatarData = avatarData!=='false'? avatarData : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNiYAAAAAkAAxkR2eQAAAAASUVORK5CYII=';
      const data = e.data;
      data.likes = likesData;
      data.comments = commentsData;
      data.currentUser = e.currentUser;
      data.avatar = avatarData;
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

    this.socket.on('editPost', (data)=>{
      const id = this.posts.map((item) => item.post_id).indexOf(data.post_id);
      this.posts.splice(id, 1);
      this.posts = [...this.posts, data].sort((a, b)=>{
        return new Date(b.date) - new Date(a.date);
      });
    });

    this.socket.on('like', (data)=>{
      const id = this.posts.map((item) => item.post_id).indexOf(data.post);
      this.posts[id].likes = [...this.posts[id].likes, data];
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
  <h2>Posts</h2>
    ${posts}
  </div>
    `;
  }
}
customElements.define('bcb-feed', BcbFeed);
