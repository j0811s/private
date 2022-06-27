import ScrollSnap from '../module/_ScrollSnap';

const scrollSnap = new ScrollSnap();

console.log(scrollSnap.getTouchPoints);

window.addEventListener('wheel', (e) => {
  console.log(scrollSnap.getState.isScrolling);
});
