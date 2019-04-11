/* eslint-disable require-jsdoc */
// eslint-disable-next-line max-len
import {LitElement, html} from '../node_modules/@polymer/lit-element/lit-element.js';
import './bcb-input.js';
import './bcb-process-image.js';

export class BcbProfile extends LitElement {
  static get properties() {
    return {
      facebook: {
        type: String,
        attribute: true,
      },
      twitter: {
        type: String,
        attribute: true,
      },
      hobbies: {
        type: String,
        attribute: true,
      },
      image: {
        type: String,
        attribute: true,
      },
    };
  }

  constructor() {
    super();
    setTimeout(()=>{
      this.userdata = JSON.parse(localStorage.getItem('data'));
      this.socket.emit('loadProfile', this.userdata._id);
    }, 1000);

    this.socket = SOCKET;
    this.socket.on('loadProfile', (data)=>{
      if (!data) return;
      this.facebook = data.facebook;
      this.twitter = data.twitter;
      this.hobbies = data.hobbies;
      this.shadowRoot.querySelector('#facebook').shadowRoot.querySelector('input').value = data.facebook;
      this.shadowRoot.querySelector('#twitter').shadowRoot.querySelector('input').value = data.twitter;
      this.shadowRoot.querySelector('#hobbies').shadowRoot.querySelector('input').value = data.hobbies;
      this.image = data.image;
      localStorage.setItem('profile', JSON.stringify(data));
      document.querySelector('bcb-welcome').profile = data;
      document.querySelector('bcb-navbar').branding = this.userdata.name;
    });
  }

  render() {
    return html`
      <style>
    :host {
      display:block;
      color: inherit;
      font: 16px Arial, sans-serif;
      max-width:750px;
      margin:0 auto;
      border-radius: 10px;
    }

    .hidden{
      display:none;
    }

    p {
      margin: 0;
    }

    p + p {
      margin-top: 15px;
    }

    a {
      color: #1f66e5;
    }


    button {
      font: ${this.width / 10}vw Arial, sans-serif;
      color: white;
      background: rgba(0,125,0,.5);
      border: 1px solid dkgrey;
      box-shadow: rgba(0,0,0,.7);
      border-radius: 4px;
      width: 100%;
      text-align: center;
      border-color: grey;
      margin-top:15px;
      height: 25px;
    }

    .container {
      max-width: 750px;
      padding: 0 10px 10px 10px;
      border-radius: 10px;
      margin: 10px auto;
    }

    .footnote, a {
      font-size: .7rem;
      text-align: center;
      color: white;
    }

    form{
      margin:0;
      padding:0;
    }

    .tooltip{
  position: relative;
  z-index: 20 ;
}

.tooltip > span{display:none}

.tooltip:hover{z-index: 21;}

.tooltip:hover > span{
  display:block;
  min-width:50px;
  padding:5px;
  color: #fff;
  background: rgba(0,0,0,.5);
  font-size: 11px;
  position:absolute;
  border-radius:5px;
  top:100%;
  left:40%;
  animation-name: fadeIn;
  animation-duration: 1s;
  animation-fill-mode: both;
  text-align:center;
}

@keyframes fadeIn {
  0% {opacity: 0;}
  100% {opacity: 1;}
}
.tooltip:hover > span:after{
  position: absolute;
  width: 10px;
  height: 10px;
  top:0;
  left: 50%;
  margin-left: -25px;
  content: '';
  transform: rotate(45deg);
  margin-top: -5px;
}



  </style>
  ${this.errors}

  <div class="container ${this.tooltip ? 'tooltip' : ''}">
  <span class="${this.tooltip ? '' : 'hidden'}">${this.tooltip}</span>
    <h2>
      <i class="fas fa-address-card"></i>Update Profile
    </h2>
      <p>
        <bcb-input
        tooltip="Facebook"
        name="facebook"
        id="facebook"
        label="Facebook"
        width="100%"
        type="text"
        @bcbinputchange="${(e)=>this.facebook = e.detail.value}"
        fg="black"
        />
      </p>
      <p>
        <bcb-input
        tooltip="Twitter"
        name="twitter"
        id="twitter"
        label="Twitter"
        width="100%"
        type="text"
        value="${this.twitter}"
        @bcbinputchange="${(e)=>this.twitter = e.detail.value}"
        fg="black"
        />
      </p>
      <p>
        <bcb-input
        tooltip="Hobbies"
        name="hobbies"
        id="hobbies"
        label="Hobbies"
        width="100%"
        type="text"
        value="this.hobbies"
        @bcbinputchange="${(e)=>this.hobbies = e.detail.value}"
        fg="black"
        />
      </p>
      <p>
        <h2>Avatar</h2>
      <bcb-process-image
      @bcbprocessimage="${(e) => this.image=e.detail.image}"
      image="${this.image || '/img/noImageSelected.jpg'}"
      scale="100"
      ></bcb-process-image>
        <button
        type="submit"
        @click="${(e)=>this.submitProfile(e)}"
        >Submit</button>
      </p>
  </div>
    `;
  }

  submitProfile(e) {
    const data = {};
    data.facebook = this.facebook;
    data.twitter = this.twitter;
    data.hobbies = this.hobbies;
    data.image = this.image;
    data.userid = this.userdata._id;
    this.socket.emit('submitProfile', data);
  }
}

customElements.define('bcb-profile', BcbProfile);

/*
      facebook: String,
      twitter: String,
      hobbies: String,
      image: String,
      userid: String
*/
