import ScrollSnap from '../module/_ScrollSnap';

const scrollSnap = new ScrollSnap('js-scrollSnap', {
  init: true,
  duration: 500,
  delay: 1000,
  // ease: 'ease',
  anker: ['kv', 'about', 'info', 'contact']
  // type: 'card'
});

console.log(scrollSnap.getTouchPoints);

// window.addEventListener('scroll', (e) => {
// console.log(scrollSnap.getState.isScrolling);
// });

// setTimeout(() => {
//   scrollSnap.addEvent();
//   scrollSnap.removeEvent();
// }, 2000);
