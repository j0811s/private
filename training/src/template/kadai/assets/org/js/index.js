import 'npms/slick-carousel';
import 'npms/magnific-popup';
import {importTest} from './ex';

console.log(importTest);

class Test {
  constructor(arg) {
    this.arg = arg;
    this.log(this.arg);
  }

  log() {
    console.log(this.arg);
  }
}
new Test('class test');

const arrow = () => 'arrow test';
console.log(arrow());


//jQueryテスト
$(window).on('load', () => {
  $('#test').addClass('is-loaded');
});

//slick
$('.slick-test').slick({
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1
});

//magnificPopup
$('.test-popup-link').magnificPopup({
  type: 'image'
});