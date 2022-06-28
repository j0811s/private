import ScrollSnap from '../module/_ScrollSnap';

const scrollSnap = new ScrollSnap('js-scrollSnap', {
  init: true,
  duration: 1000,
  // delay: 2000,
  ease: 'ease'
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
