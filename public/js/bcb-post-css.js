import { html } from "../node_modules/@polymer/lit-element/lit-element.js";
export const Styles = html`
<link rel="stylesheet" href="css/all.css">
<!-- css -->
<style>
:host{
margin:0;
font-size:1rem;
background-color:dodgerblue;
}

.container{
  width:95%;
  min-height:100px;
  border: 1px solid #000;
  padding-top:5px;
  margin:10px auto;
  border-radius:10px;
  display:flex;
  flex-direction:column;
  overflow:hidden;
  padding:10px;
  justify-content:center;
}
img{
  border-radius: 4px;
  max-width:300px;
  max-height:300px;
  margin: 0 auto;
  align-self:center;
}

textarea{
  background: transparent;
  border: 1px solid black;
  border-radius: 3px;
  color: inherit;
  height: 75px;
  margin: 5px 7px;
  width:350px;
  outline:none;
  padding:5px;
}

.data{
  margin: 0 auto;
  align-self:center;
}

button{
  height:20px;
  margin: 0px 3px;
}

.dropdown {
  z-index: 100;
  cursor: pointer;
}

.dropdown-content {
  display:none;
  opacity: 0;
  transition: opacity 400ms linear,
              visibility 400ms linear;
  text-align: left;
  width:max-content;

}

.dropdown:hover .dropdown-content {
  opacity: 1;
  display: block;
}
</style>
`;
