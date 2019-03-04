/* eslint-disable require-jsdoc */
class StarRating extends HTMLElement {
  get value() {
    return this.getAttribute('value') || 0;
  }

  set value(val) {
    this.setAttribute('value', val);
    this.highlight(this.value - 1);
  }

  get number() {
    return this.getAttribute('number') || 5;
  }

  set number(val) {
    this.setAttribute('number', val);

    this.stars = [];

    while (this.firstChild) {
      this.removeChild(this.firstChild);
    }

    for (let i = 0; i < this.number; i++) {
      const s = document.createElement('div');
      s.className = 'star';
      this.appendChild(s);
      this.stars.push(s);
    }

    this.value = this.value;
  }

  highlight(index) {
    this.stars.forEach((star, i) => {
      star.classList.toggle('full', i <= index);
    });
  }

  constructor() {
    super();

    this.number = this.number;

    this.addEventListener('mousemove', (e) => {
      const box = this.getBoundingClientRect();
      const starIndex = Math.floor((e.pageX - box.left) / box.width * this.stars.length);
      console.log(starIndex);
      this.highlight(starIndex);
    });

    this.addEventListener('mouseout', () => {
      this.value = this.value;
    });

    this.addEventListener('click', (e) => {
      const box = this.getBoundingClientRect();
      const starIndex = Math.floor((e.pageX - box.left) / box.width * this.stars.length);

      this.value = starIndex + 1;

      const rateEvent = new Event('rate');
      this.dispatchEvent(rateEvent);
    });
  }
}

customElements.define('x-star-rating', StarRating);
