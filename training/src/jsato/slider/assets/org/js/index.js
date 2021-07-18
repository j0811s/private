import { ItemCard } from './itemCard';


[].slice.call(document.querySelectorAll('.js-lpc-itemCard')).forEach((target, i) => {
  target.className += i;
  new ItemCard(`.js-lpc-itemCard${i}`);
});

// new ItemCard(`.js-lpc-test`, {
//   slideToScroll: 2
// });