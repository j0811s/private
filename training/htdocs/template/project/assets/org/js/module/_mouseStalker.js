import {extend} from './_util';

export default function MouseStalker(id, _config) {
  /**
   * ターゲット・設定
   */
  const MOUSE_STALKER = document.getElementById(id);
  const CONFIG = {
    target: null, // document.body
    callback: null // () => {}
  }
  extend(CONFIG, _config);

  const isPointerDevice = window.matchMedia( "(pointer: fine)" ).matches;
  const TARGET = CONFIG.target != null ? CONFIG.target : document;
  

  /**
   * マウスストーカーとポインターの位置情報
   */
  const POSITION = {
    stalker: {
      x: document.documentElement.clientWidth / 2,
      y: document.documentElement.clientHeight / 2
    },
    pointer: {
      x: document.documentElement.clientWidth / 2,
      y: document.documentElement.clientHeight / 2
    }
  }


  /**
   * マウスストーカー イベント
   */
  const setMouseStalker = () => {
    MOUSE_STALKER.classList.add('add-active');

    // マウスポインター位置更新
    TARGET.addEventListener('mousemove', e => {
      POSITION.pointer.x = e.clientX;
      POSITION.pointer.y = e.clientY;
    });

    // アニメーション開始
    requestAnimationFrame(update);
  }
  

  /**
   * マウスストーカー位置更新
   */
  const update = () => {
    POSITION.stalker.x += (POSITION.pointer.x - POSITION.stalker.x) * 0.1;
    POSITION.stalker.y += (POSITION.pointer.y - POSITION.stalker.y) * 0.1;

    const x = Math.round(POSITION.stalker.x * 10) / 10;
    const y = Math.round(POSITION.stalker.y * 10) / 10;
    MOUSE_STALKER.style.transform = `translate3d(${x}px, ${y}px, 0)`;

    requestAnimationFrame(update);
  }

  
  /**
   * マウスポインターがある端末でイベント登録
   */
  if (isPointerDevice) TARGET.addEventListener ("mousemove", setMouseStalker);


  /**
   * コールバック関数
   */
  if (CONFIG.callback != null) CONFIG.callback();
}