/* eslint-disable require-jsdoc */
// eslint-disable-next-line max-len
import {LitElement, html} from '../node_modules/@polymer/lit-element/lit-element.js';
import {Styles} from './bcb-comment-module-css.js';
import './bcb-comment.js';
export class BcbCommentModule extends LitElement {
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
    this.data=JSON.parse(this.getAttribute('data'));
    this.userdata = JSON.parse(localStorage.getItem('data'));
  }

  render() {
    console.log(this.data)
    const comments = this.data.comments;
    const myhtml = comments.map((comment)=>{
      return html`
        <p>${comment.comment}
        <br> <span style="font-size: .75rem;">${comment.name}
        ${(comment.currentUser === this.userdata._id || this.userdata._id === this.data.user_id)? html`
          <button style="height:13px;font-size: .5rem;" @click="${(e)=>this.deleteComment(comment)}">Delete</button>
        `: ''}</span></p>
      `;
    });
    return html`
  ${Styles}
  ${myhtml}
  <bcb-comment data="${JSON.stringify(this.data)}"></bcb-comment>
    `;
  }

  deleteComment(comment) {
    this.socket.emit('deleteComment', {id: comment._id, post: comment.post});
  }
}
customElements.define('bcb-comment-module', BcbCommentModule);
