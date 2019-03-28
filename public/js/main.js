// eslint-disable-next-line max-len
document.querySelector('bcb-navbar').addEventListener('bcbnavbar', (e) => navigate( e.detail ));
const content = document.getElementById('bcbcontent');

const navigate = (e) => {
  switch (e) {
    case 'Posts':
      content.slot = 'slot1';
      break;

    case 'Profile':
      content.slot = 'slot2';
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
