// eslint-disable-next-line max-len
document.querySelector('bcb-navbar').addEventListener('bcbnavbar', (e) => navigate( e.detail ));

const navigate = (e) => {
  switch (e) {
    case 'Top of Page':
      document.documentElement.scrollTop = 0;
      break;

    case 'Middle of Page':
      window.scrollTo(0, document.body.scrollHeight / 4);
      break;

    case 'Bottom of Page':
      window.scrollTo(0, document.body.scrollHeight);
      break;

    case 'logout':
      window.location = '/users/logout';
      break;
  }
};

let scrollPos = 0;
document.addEventListener('scroll', function() {
  if (document.body.getBoundingClientRect().top > scrollPos) {
    document.querySelector('bcb-navbar').classList.remove('hidden');
  } else {
    document.querySelector('bcb-navbar').classList.add('hidden');
  }

  scrollPos = document.body.getBoundingClientRect().top;
});
