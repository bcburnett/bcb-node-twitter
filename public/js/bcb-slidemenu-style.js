import { html } from "../node_modules/@polymer/lit-element/lit-element.js";
export const Styles = html`

      <style>
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

.bars {
  display: flex;
  flex-flow: column;
  padding:10px 0;
}

.bar {
    width: 20px;
    height: 2px;
    background-color:white;
    margin: 3px 0;
    border-radius: 50%;
}

.menu__float{
  position: fixed;
  top:75px;
  left:0;
  background-color:rgba(0,0,0,.75);
  padding:0 10px;
  border-radius: 50%;

}

.menu__slider{
  position:absolute;
  background-color: rgba(0,0,0,.5);
  padding:20px;
  top:0;
  left:-200px;
  width: max-content;
  animation-name: fadeOut;
  animation-duration: 1s;
  animation-fill-mode: both;
  text-align: left;
  font-size:1.5rem;
}

.menu__float:hover .menu__slider{
  animation-name: fadeIn;
  animation-duration: 1s;
  animation-fill-mode: both;
}

@keyframes fadeIn {
  0% {left: -100px;}
  100% {left: 0;}
}

.menu__float:hover::after .menu__slider{
  content:'';
  animation-name: fadeOut;
  animation-duration: 1s;
  animation-fill-mode: both;
}

@keyframes fadeOut {
  0% {left: 0px;}
  100% {left: -200;}
}

.main-nav__item__link {
  display:block;
  text-decoration: none;
  color: var(--primary-color);
  background-color: var(--primary-light);
  cursor: pointer;
  transition: background-color 300ms ease-in;
  padding: 2px;
  outline:none;
  margin: 5px;
}
.main-nav__item__link:hover,
.main-nav__branding__link:hover {
  background-color: var(--highlight-color);
}

.active{
  background-color: var(--highlight-color);
}


  </style>

`;