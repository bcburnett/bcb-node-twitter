import { html } from "../node_modules/@polymer/lit-element/lit-element.js";
export const Styles = html`
<link rel="stylesheet" href="css/all.css">
<!-- css -->
<style>
:host{
margin:0;
font-size:1rem;
margin-top:15px;
}

.wrapper{
  border: 1px solid #000;
  width:350px;
  margin:10px auto;
  border-radius:10px;
  padding:5px;
}

input, textarea{
  background: transparent;
  border: 1px solid black;
  border-radius: 3px;
  color: inherit;
}

textarea{
  width:250px;
}

button{
  background-color:dodgerblue;
}

</style>
`;