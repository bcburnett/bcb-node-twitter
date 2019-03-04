/* eslint-disable quotes */
/* eslint-disable require-jsdoc */
class XImg extends HTMLImageElement {
  constructor() {
    super();

    setTimeout(() => {
      // eslint-disable-next-line max-len
      this.src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAADzklEQVRoQ+2abUyNYRjH/6c0M2qr0Du9aFGtotSK3hZZYqTZhBEfamJpTbEUm1DZyAeLWB/0ZuVtjD6IoiRmMqVi8xIK6W1KlDrnuO8zpynnnKdzP892zrN1fTzn3Oe+fs913dd9Xf9zJEvjL8hlcjnEaAYSCSTeceflUpk4AQwNpgB0m3hTEVD3/D2dLBC2xAFONqYwMjTA5+4feNT8CVXP2zAqlQkWNsEjYGU2C4djg+G3yEalkx3d/cgsrMWT1g5BIAQFWDjPHHlJq2FqPEOjc1KZDFkldbha08obQjAAS/LkS9OjOJ1XekzvnZSzlYqU4mOCAeQnR8JXTdqoc7B/cBhRGeXoHfjFzCAIQIjXfOTuXsXkxOX7zThO0onVBAEoSF2LJc5WTD4Mj4wiPKUENBosxhuAVp3b2TGQkJ6E1TILa3Ct9hXTct4AGwIXImNbENPmykX3Gt5jHznQLMYbIH1rIKKDF7HsPbbmc88AIg9cYvoO3gB5SRHwd7Nj2ly5iN4LfrsKwNIR8wYoSlsPd4e5vADo4pCki/jOcJB5AxQfjIKb/RzxAtDWwd/NlheATlNI9IdY9GVU9BcZTX5RtxKKEuhJmrk9Im7mKAR7O11G2ukh5irG+x5Q7kwHmhIy0JhxTGPKz+vdQEMdE/VIqXyyiqF+OxnqXdUM9V1kqC/S06H+30T2ILLKir+yyjSFrDJAZJV2VOu7rMJ8GhkXCnaI6UBGpzLZJEViAyLKgujJfFVxZgAL05nwdrGCh6OFohtdYG2G+pZ2pObf5VTeaErlxIUhwN0Obzp60dLWhcZ3nXj2+gu+9g1qFQutAGxmG2PdMheELraHk7Wpyjm4tvEjUs5VYnhEqtKR6UaGOBG/AkHk8ptocqIVvfvSh6qGNtyoe40Ocm64bNIAidG+2LbSA4bk6XFZ49tOJOfdQU//eL3HzGQGTiWEg+qmXCYl+mnJvSacvvIEmn57mRTAGn9nZO4M5dpz3PvfSCocKXyAupftitcDyMxwiJRXmnra2MnyehRXNqldwglAD+fNY5tgO8dEm33HPtvyoUtxWF0Zp7aBn8OI2F+KwaERlftzAlCV+RyRDXVpR8nFp04I5gRI27IcG0Ncdek/HpPqtiu3gi0Ct7JiQKuPLo3Kj0F7L+K3isqmMQJW5rNQkb1Zl76P7R2bfQMvSHWbaBoBwn0ckUNqtj5YdulDlFW3aAeQuMEXOyK89MF/lFc3I6v0fxleYwQS1vlgsbOlXgDQ9Dlz/al2EdALzzmc4Cyj+g4xBaDrCCkiIPa/2/wB/f1NtzlbEWgAAAAASUVORK5CYII=";
    }, 5000);

    this.observer = new MutationObserver(function(mutations) {
      mutations.forEach((mutation) => {
        if (mutation.type == 'attributes') {
          console.log(mutation);
        }
      });
    });

    observer.observe(this, {attributes: true});

    this.onerror = (e) => {
      this.src =
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';
    };
  }
}
customElements.define('x-img', XImg, {extends: 'source'});
