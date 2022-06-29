import ScrollSnap from '../module/_ScrollSnap';

const scrollSnap = new ScrollSnap('js-scrollSnap', {
  init: true,
  animation: {
    // duration: 500,
    // interval: 1200
    // ease: 'ease-in-out'
  },
  // type: 'card',
  navigation: {
    anker: ['kv', 'about', 'info', 'contact', 'mail']
  }
});

console.log(scrollSnap.getTouchPoints);

// window.addEventListener('scroll', (e) => {
// console.log(scrollSnap.getState.isScrolling);
// });

// setTimeout(() => {
//   scrollSnap.addEvent();
//   scrollSnap.removeEvent();
// }, 2000);
