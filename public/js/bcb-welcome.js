/* eslint-disable no-tabs */
/* eslint-disable require-jsdoc */
// eslint-disable-next-line max-len
import {LitElement, html} from '../node_modules/@polymer/lit-element/lit-element.js';
import {Styles} from './bcb-welcome-css.js';
export class BcbWelcome extends LitElement {
  static get properties() {
    return {
      user: String,
      profile: Object,

    };
  }

  constructor() {
    super();
    this.profile ={
      facebook: '',
      twitter: '',
      hobbies: '',
      image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNiYAAAAAkAAxkR2eQAAAAASUVORK5CYII=',
    };
    this.socket = SOCKET;
    this.socket.emit('welcome');
    this.socket.on('welcome', (data) => {
      if (!data) window.location ='/users/login';
      this.user = data.name;
      delete data.password;
      localStorage.setItem('data', JSON.stringify(data));
    });
    this.socket.on('login', (e)=> window.location = '/users/login');
  }

  render() {
    return html`
  ${Styles}
  <style>
    p{
      font-size:.6rem;
    }
  </style>
  <img src="${this.profile.image}" style="
  width:75px;
  height: 75px;
  border-radius:50%;
  margin-bottom: 0;
  margin-top: 10px;
  ">
  <h2>Welcome <br> ${this.user}</h2>
  <p>${this.profile.facebook}</p>
  <p>${this.profile.twitter}</p>
  <p>${this.profile.hobbies}</p>
  <!-- <ul>
		<li>
      <a href="#"
      data-ajax="?link1=timeline&amp;u=bcburnett">
				<img src="https://www.mumblit.com/upload/photos/d-avatar.jpg?cache=0" style="width: 24px; border-radius: 50%; margin-right: 5px;">
				 			</a>
		</li>
		<li>
      <a href="#"
      target="new">
				<img src="https://www.mumblit.com/icons/nav/How-to.png" style="margin-right: 5px;">
				Help/Support
			</a>
		</li>
		<li>
			<a href="#" data-ajax="?link1=albums">
				<img src="https://www.mumblit.com/icons/nav/iconfinder_Camera_132207.png" style="margin-right: 5px;">
				Albums			</a>
		</li>
		<li>
			<a href="#">
				<img src="https://www.mumblit.com/icons/nav/iconfinder_Mail_132273.png" style="margin-right: 5px;">
				Invite Friends
			</a>
		</li>
		<li>
			<a href="#" data-ajax="?link1=saved-posts">
				<img src="https://www.mumblit.com/icons/nav/iconfinder_Save_as_132230.png" style="margin-right: 5px;">
				Saved Mumbls			</a>
		</li>
		<li>
			<a href="#" data-ajax="?link1=poke">
				<img src="https://www.mumblit.com/icons/nav/iconfinder_Comment_132229.png" style="margin-right: 5px;">
				<span>Notifications</span>
			</a>
		</li>
				<li>
			<a href="#" data-ajax="?link1=groups">
				<img src="https://www.mumblit.com/icons/nav/iconfinder_User_group_132235.png" style="margin-right: 5px;">
				My Groups			</a>
		</li>
						<li>
			<a href="#" data-ajax="?link1=pages">
				<img src="https://www.mumblit.com/icons/nav/iconfinder_Clien_list_132301.png" style="margin-right: 5px;">
				My Pages			</a>
		</li>
						<li>
		<a href="#">
			<img src="https://www.mumblit.com/icons/nav/iconfinder_Unordered_list_132287.png" style="margin-right: 5px;">
				Blogs
			</a>
		</li>
						<li>
			<a href="#" data-ajax="?link1=my-blogs">
				<img src="https://www.mumblit.com/icons/nav/iconfinder_Lists_132198.png" style="margin-right: 5px;">
				My articles			</a>
		</li>
						<li>
			<a href="#">
				<img src="https://www.mumblit.com/icons/nav/iconfinder_Remove_from_basket_132222.png" style="margin-right: 5px;">
				Market			</a>
		</li>
						<li>
			<a href="#" data-ajax="?link1=my-products">
				<img src="https://www.mumblit.com/icons/nav/iconfinder_Price_list_132262.png" style="margin-right: 5px;">
				My Products			</a>
		</li>
		        <li>
			<a href="#">
				<img src="https://www.mumblit.com/icons/nav/iconfinder_Search_132289.png" style="margin-right: 5px;">
				Explore			</a>
		</li>
				<li>
			<a href="#" data-ajax="?link1=most_liked">
				<img src="https://www.mumblit.com/icons/nav/iconfinder_Best_132205.png" style="margin-right: 5px;">
				Popular Posts			</a>
		</li>
		        		<li>
			<a href="#">
				<img src="https://www.mumblit.com/icons/nav/iconfinder_Calendar_132204.png" style="margin-right: 5px;">
				Events			</a>
		</li>
						<li>
			<a href="#" data-ajax="?link1=new-game">
				<img src="https://www.mumblit.com/icons/nav/iconfinder_Game_controller_132310.png" style="margin-right: 5px;">
				Games			</a>
		</li>
						<li>
			<a href="#">
				<img src="https://www.mumblit.com/icons/nav/iconfinder_Notes_132293.png" style="margin-right: 5px;">
				Forum			</a>
		</li>
						<li>
			<a href="#">
				<img src="https://www.mumblit.com/icons/nav/iconfinder_Bricks_132349.png" style="margin-right: 5px;">
				Find friends			</a>
		</li>
					</ul> -->
    `;
  }
}
customElements.define('bcb-welcome', BcbWelcome);
