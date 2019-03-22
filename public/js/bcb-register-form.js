/* eslint-disable max-len */

/* eslint-disable require-jsdoc */
import { LitElement, html } from "../node_modules/@polymer/lit-element/lit-element.js";
import './bcb-input.js';
export class BcbRegisterForm extends LitElement {
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
    this.socket = io.connect('https://localhost:5000');
    this.socket.emit('errors');
    this.socket.on('errors', data => {
      this.errors = data.map(err => {
        return html`
        <p style = "background-color:pink;">${err}</p>
        `;
      });
    });
  }

  render() {
    return html`
      <style>
    :host {
      display:block;
      color: inherit;
      font: 16px Arial, sans-serif;
      width:${this.width};
      margin:0;
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
      margin-top:5px;
      height: 25px;
    }

    .container {
      max-width: 300px;
      padding: 0 10px 10px 10px;
      border: 1px solid black;
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

  <div class="container ${this.tooltip ? 'tooltip' : ''}"><span class="${this.tooltip ? '' : 'hidden'}">${this.tooltip}</span>
    <h1 >
      <i class="fas fa-user-plus"></i> Register
    </h1>
    <form action="${this.submit}" method="${this.method}">
      <p>
        <bcb-input
        tooltip="Enter Your E-Mail Address"
        name="email"
        id="bcb-input1"
        label="E Mail Address"
        width="100%"
        type="email"
        />
      </p>
      <p>
        <bcb-input
        tooltip="Enter Your Uesr Name"
        name="name"
        id="bcb-input3"
        label="User Name"
        width="100%"
        type="name"
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
        <bcb-input
        tooltip="RepeatPassword"
        name="password2"
        id="bcb-input4"
        label="Repeat Password"
        width="100%"
        type="password"
        />
      </p>
      <p>
        <button type="submit">Register</button>
      </p>
      <p class="footnote">Already registered? <a href="/users/login">Login</a></p>
    </form>
  </div>
    `;
  }

  clickListener(e) {
    console.log(e);
  }

} //   <h1>bcb-register-form</h1>
//   <div class="row mt-5">
//   <div class="col-md-6 m-auto">
//     <div class="card card-body">
//       <h1 class="text-center mb-3">
//         <i class="fas fa-user-plus"></i> Register
//       </h1>
//       <% include ./partials/messages %>
//       <form action="/users/register" method="POST">
//         <div class="form-group">
//           <label for="name">Name</label>
//           <input
//             type="name"
//             id="name"
//             name="name"
//             class="form-control"
//             placeholder="Enter Name"
//             value="<%= typeof name != 'undefined' ? name : '' %>"
//           />
//         </div>
//         <div class="form-group">
//           <label for="email">Email</label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             class="form-control"
//             placeholder="Enter Email"
//             value="<%= typeof email != 'undefined' ? email : '' %>"
//           />
//         </div>
//         <div class="form-group">
//           <label for="password">Password</label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             class="form-control"
//             placeholder="Create Password"
//             value="<%= typeof password != 'undefined' ? password : '' %>"
//           />
//         </div>
//         <div class="form-group">
//           <label for="password2">Confirm Password</label>
//           <input
//             type="password"
//             id="password2"
//             name="password2"
//             class="form-control"
//             placeholder="Confirm Password"
//             value="<%= typeof password2 != 'undefined' ? password2 : '' %>"
//           />
//         </div>
//         <button type="submit" class="btn btn-primary btn-block">
//           Register
//         </button>
//       </form>
//       <p class="lead mt-4">Have An Account? <a href="/users/login">Login</a></p>
//     </div>
//   </div>
// </div>
//     `;
//   }
// }

customElements.define('bcb-register-form', BcbRegisterForm);