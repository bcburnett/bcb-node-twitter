/* eslint-disable require-jsdoc */
// eslint-disable-next-line max-len
import {LitElement, html} from '../node_modules/@polymer/lit-element/lit-element.js';
import {Styles} from './bcb-video-css.js';
export class BcbVideo extends LitElement {
  static get properties() {
    return {};
  }

  constructor() {
    super();
    this.socket = SOCKET;
    this.socket.on('stream', (image) => {
      this.shadowRoot.querySelector('#play').setAttribute('src', image);
    });
  }

  render() {
    return html`
  ${Styles}
  <h3>video</h3>
  <h4>preview</h4>
  <video
  src=""
  id="video"
  style="max-width:200px; max-height: 150px;"
  autoplay="true"></video>
  <audio
  src=""
  id="audio"
  style="max-width:200px; max-height: 150px;"
  autoplay="true"></audio>
  <h4>Reflected</h4>
  <img id="play" style="max-width:200px; max-height: 150px;">
  <button
  @click="${(e) => this.setup('start')}"
  >start</button>
  <button
  @click="${(e) => this.setup('stop')}"
  >stop</button>
    `;
  }

  setup(operation) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 200;
    canvas.height = 150;
    context.width = canvas.width;
    context.height = canvas.height;
    const video = this.shadowRoot.getElementById('video');

    const viewVideo = async (video, context) => {
      Promise.resolve().then((e) => {
        context.drawImage(video, 0, 0, context.width, context.height);
        this.socket.emit('stream', canvas.toDataURL('image/webp'));
      });
    };

    const startStream = (control) => {
      if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        }).then((stream) => video.srcObject = stream)
            .catch((error) => console.log(error.message));
      }

      this.interval = setInterval(function() {
        viewVideo(video, context);
      }, 5000);
    };

    const stopStream = () => {
      const stream = video.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      video.srcObject = null;
    };

    if (operation === 'stop') {
      stopStream();
      return;
    } else {
      startStream();
      return;
    }
  }
}
customElements.define('bcb-video', BcbVideo);
