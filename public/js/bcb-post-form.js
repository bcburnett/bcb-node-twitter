/* eslint-disable require-jsdoc */
// eslint-disable-next-line max-len
import {LitElement, html} from '../node_modules/@polymer/lit-element/lit-element.js';
import {Styles} from './bcb-post-form-css.js';
import './bcb-process-image.js';
export class BcbPostForm extends LitElement {
  static get properties() {
    return {
      error: String,
      text: {
        type: String,
        attribute: true,
        reflected: true,
      },
      postTitle: {
        type: String,
        attribute: true,
        reflected: true,
      },
      image: {
        type: String,
        attribute: true,
        reflected: true,
      },
      data: {
        type: Object,
        attribute: true,
      },
    };
  }

  constructor() {
    super();
    this.socket = SOCKET;
    this.text = '';
    this.postTitle = '';
    this.image = '/img/noImageSelected.jpg';
    this.updatedata = {};
  }

  render() {
    return html`
${Styles}
<h2>Post Form</h2>
<div class="wrapper" >

        <div id="post-textarea">
          <div>${this.error}</div>

          <input
          type="text"
          name="postTitle"
          id="postTitle"
          placeholder="Post Title"
          @change="${(e) => this.postTitle = this.shadowRoot.querySelector('input').value}"
           value="${this.postTitle}" />
          <textarea
          name="postText"
          id="postText"
          placeholder="What's going on?"
          style="height: 75px; width: 95%; margin: 5px 7px;"
           @change="${(e) => this.text = this.shadowRoot.querySelector('textarea').value}"
           >${this.text ? this.text : ''}</textarea>
          <!--Add Image-->
        </div>
        <bcb-process-image
        @bcbprocessimage="${(e) => this.imageLoaded(e)}"
        image="${this.image || '/img/noImageSelected.jpg'}"
        scale="300"
        >
        </bcb-process-image>

        <button @click="${(e) => this.submitForm(e)}">submit</button>
        <button @click="${(e) => this.clearForm()}">cancel</button>
      </div>
    `;
  }

  imageLoaded(e) {
    this.image = e.detail.image;
  }

  submitForm(e) {
    if (this.updatedata.action) {
      const data = this.updatedata;
      data.postText = this.text;
      data.postTitle = this.postTitle;
      data.postImage = this.image;
      this.socket.emit('editPost', data);
      this.clearForm();
      return;
    }
    if (this.postTitle === '' || this.text === '') {
      this.error = 'text or title fields Empty';
      return;
    }

    if (this.image === 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNiYAAAAAkAAxkR2eQAAAAASUVORK5CYII=') {
      this.image = '';
    }

    this.error = undefined;
    const responseObject = {
      text: this.text,
      title: this.postTitle,
      image: this.image,
    };
    this.socket.emit('dele', this.postid);
    this.socket.emit('newPost', responseObject);
    this.clearForm();
  }

  clearForm() {
    this.text = '';
    this.postTitle = '';
    this.image = '';
    this.postid = '';
    this.shadowRoot.querySelector('#postTitle').value = '';
    this.shadowRoot.querySelector('#postText').value = '';
    this.shadowRoot.querySelector('bcb-process-image').setAttribute('image', '');
    this.shadowRoot.querySelector('bcb-process-image').setAttribute('image', '/img/noImageSelected.jpg');
    this.setAttribute('data', JSON.stringify({
      postText: '',
      postTitle: '',
    }));
    this.updatedata = {};
  }

  async updateProps(e) {
    const data = await e;
    this.updatedata = data;
    this.shadowRoot.querySelector('#postTitle').value = data.postTitle;
    this.shadowRoot.querySelector('#postText').value = data.postText;
    this.postTitle = data.postTitle;
    this.image = data.postImage;
    this.postid = data.post_id;
    this.text = data.postText;
  }

  updated(changedProperties) {
    if (changedProperties.has('data')) {
      this.updateProps(this.data);
    }
  }
}
customElements.define('bcb-post-form', BcbPostForm);
