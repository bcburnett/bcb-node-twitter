import {html} from '../node_modules/@polymer/lit-element/lit-element.js';
export const Styles = html`
<link rel="stylesheet" href="css/all.css">
<!-- css -->
<style>
:host{
margin:0;
font-size:1rem;
color:inherit;

}

.wrapper{
  display:flex;
  flex-direction: row;
}

textarea{
  background-color: transparent;
  color: var(--primary-color);
  border: 1px solid black;
  border-radius: 3px;
}

button{
  height:20px;
  margin: 0px 5px;
  justify-self: right;
}

.hidden{
  display:none;
}






</style>
`;
