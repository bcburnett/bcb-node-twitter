/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import {LitElement, html} from '../node_modules/@polymer/lit-element/lit-element.js';
import './bcb-input.js';
export class BcbRegisterForm extends LitElement {
  static get properties() {
    return {
      submit: String,
      width: Number,
      method: String,
      tooltip: String,
      emailerror: String,
      nameerror: String,
      passworderror: String,
    };
  }

  constructor() {
    super();
    this.emailerror = undefined;
    this.nameerror = undefined;
    this.passworderror = undefined;
  }

  render() {
    return html`
      <style>
    :host {
      display:block;
      color: inherit;
      font: 16px Arial, sans-serif;
      max-width:350px;
      margin:0 auto;
      border-radius: 10px;
      background: rgba(0,0,0,.7);
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
      max-width: 300px;
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

h1{
  color: white;
}

  </style>
  ${this.errors}

  <div class="container ${this.tooltip ? 'tooltip' : ''}"><span class="${this.tooltip ? '' : 'hidden'}">${this.tooltip}</span>
    <h1 >
      <i class="fas fa-user-plus"></i> Register
    </h1>
    <form
    id="register"
    action="${this.submit}"
    method="${this.method}"
    @submit="${this.validateForm}"
    >
      <p>
        <bcb-input
        tooltip="Enter Your E-Mail Address"
        name="email"
        id="email"
        label="E Mail Address"
        width="100%"
        type="email"
        @bcbinputchange="${this.checkemail}"
        fg="grey"
        />
      </p>
      <div style="color:#f55;">${this.emailerror}</div>
      <p>
        <bcb-input
        tooltip="Enter Your User Name"
        name="name"
        id="name"
        label="User Name"
        width="100%"
        type="name"
        @bcbinputchange="${this.checkusername}"
        fg="grey"
        />
      </p>
      <div style="color:#f55;">${this.nameerror}</div>
      <p>
        <bcb-input
        tooltip="Enter Your Password"
        name="password"
        id="password"
        label="Password"
        width="100%"
        type="text"
        fg="grey"
        />
      </p>
      <p>
        <bcb-input
        tooltip="RepeatPassword"
        name="password2"
        id="password2"
        label="Repeat Password"
        width="100%"
        type="text"
        fg="grey"
        />
      </p>
      <div style="color:#f55;">${this.passworderror}</div>
      <p>
        <button
        type="submit"
        >Register</button>
      </p>
      <p class="footnote">Already registered? <a href="/users/login">Login</a></p>
</form>
  </div>
    `;
  }


  checkemail(e) {
    const email = e.detail.value;
    this.validateEmail(email);
  }

  async validateEmail(email) {
    if (!email) {
      this.emailerror = html`<br> Please enter a valid email`;
      this.shadowRoot.getElementById('email').shadowRoot.getElementById('input').focus();
      return false;
    };
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(email)) {
      const result = await fetch(`/users/checkemail?email=${email}`)
          .then((res) => res.json())
          .then((text) => {
            if (text._id) {
              this.emailerror = html`<br> Email is already Registered`;
              this.shadowRoot.getElementById('email').shadowRoot.getElementById('input').focus();
              return false;
            } else {
              this.emailerror = undefined;
              return true;
            }
          });
      return result;
    } else {
      this.emailerror = html`<br> Please enter a valid email`;
      this.shadowRoot.getElementById('email').shadowRoot.getElementById('input').focus();
      return false;
    }
  }

  checkusername(e) {
    const name = e.detail.value;
    this.validateName(name);
  }

  async validateName(name) {
    if (name.length < 6) {
      this.nameerror = html`<br> User Name must be at least 6 characters`;
      this.shadowRoot.getElementById('name').shadowRoot.getElementById('input').focus();
      return false;
    }
    const result = await fetch(`/users/checkname?name=${name}`)
        .then((res) => res.json())
        .then((text) => {
          if (text._id) {
            this.nameerror = html`<br> User Name is already Registered`;
            this.shadowRoot.getElementById('name').shadowRoot.getElementById('input').focus();
            return false;
          } else {
            this.nameerror = undefined;
            return true;
          }
        });
    return result;
  }

  validateForm(e) {
    const email = this.shadowRoot.getElementById('email').value;
    const name = this.shadowRoot.getElementById('name').value;
    const password = this.shadowRoot.getElementById('password').value;
    const password2 = this.shadowRoot.getElementById('password2').value;
    let result = true;
    if (!this.validateEmail(email) || !email) {
      e.preventDefault();
      result = false;
      return false;
    };
    if (!this.validateName(name) || !name) {
      e.preventDefault();
      result = false;
      return false;
    };
    if (password !== password2 || !password || !password2) {
      e.preventDefault();
      result = false;
      this.passworderror = html`<br> Passwords must match`;
      return false;
    };
    return result;
  }
}

customElements.define('bcb-register-form', BcbRegisterForm);
