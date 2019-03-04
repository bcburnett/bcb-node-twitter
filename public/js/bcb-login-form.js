import { LitElement, html } from "../node_modules/@polymer/lit-element/lit-element.js";
import "./bcb-input.js";
export class BcbLoginForm extends LitElement {
  static get properties() {
    return {
      submit: String,
      width: Number,
      method: String,
      tooltip: String
    };
  }

  constructor() {
    super();
  }

  render() {
    return html`
      <style>
    :host {
      display:block;
      color: #333333;
      font: 16px Arial, sans-serif;
      width:${this.width};
      margin:0;
      background: rgba(0,0,0,.7);
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
      background: rgba(0,0,0,.5);
      border: 1px solid dkgrey;
      box-shadow: rgba(0,0,0,.7);
      border-radius: 4px;
      width: 100%;
      text-align: center;
      border-color: grey;
    }

    .container {
      max-width: 300px;
      padding: 0 10px 10px 10px;
      border: 1px solid grey;
      border-radius: 10px;
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

  <div class="container ${this.tooltip ? 'tooltip' : ''}"><span class="${this.tooltip ? '' : 'hidden'}">${this.tooltip}</span>
    <form action="${this.submit}" method="${this.method}">
      <p>
        <bcb-input
        tooltip="Enter Your E-Mail Address"
        name="email"
        id="bcb-input1"
        label="E Mail Address"
        width="100%"
        type="text"
        />
      </p>
      <p>
        <bcb-input
        tooltip="Enter Your Password"
        name="password"
        id="bcb-input2"
        label="Password"
        width="100%"
        type="password"
        />
      </p>
      <p>
        <button @click="${this.clickListener}" >Login</button>
      </p>
      <p class="footnote">Not registered? <a href="#">Create an account</a></p>
    </form>
  </div>
    `;
  }

  clickListener(e) {
    console.log(e);
  }

}
customElements.define('bcb-login-form', BcbLoginForm);