import MouseStalker from "../module/_mouseStalker";
import Accordion from "../module/_accordion";
import ScrollLock from "../module/_scrollLock";

/**
 * スクロールロック
 */
const scrollLock = new ScrollLock(null, {
  disable: {
    sp: false,
    pc: false
  }
});
scrollLock.lock();


/**
 * マウスストーカー
 */
MouseStalker('js-mouseStalker',{
  target: document.getElementById('js-mouseStalkerArea')
});


/**
 * アコーディオン
 */
[].slice.call(document.getElementsByClassName('js-accordionBtn')).forEach((v, i) => {
  v.addEventListener('click', () => {
    new Accordion(`js-readtext${i}`);
  });
});


/**
 * loadイベント
 */
window.addEventListener('load', () => {
  // transition無効解除
  document.body.classList.add('add-loaded');

  // スクロールロック解除
  scrollLock.unLock();
});