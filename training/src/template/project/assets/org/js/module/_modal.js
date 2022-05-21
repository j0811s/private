import './_closest';
import {userAgent, isHTMLCollection, nodeEach, extend, mediaQuery} from './_util';
import ScrollLock from "./_scrollLock";

// config 記述サンプル
// {
//   modal: '.js-lpc-modal',
//   bodyClassName: 'mod-modalBody',
//   trigger: {
//     open: '.js-lpc-modal_trigger',
//     noCloseSelectorNames: ['a', 'figure', 'img'],
//     noCloseClassNames: ['mod-noModalClose', 'mod-sample']
//   },
//   on: {
//     beforeClose(e) {
//       document.body.classList.add('add-afterOpen');
//     },
//     afterClose(e) {
//       setTimeout(() => {
//         document.body.classList.remove('add-afterOpen');
//       }, 1000)
//     }
//   }
// }

export class Modal {
  constructor(config) {
    // 要素の初期設定
    this.config = {
      modal: '.js-lpc-modal',
      trigger: {
        open: '.js-lpc-modal_trigger',
        noCloseSelectorNames: [],
        noCloseClassNames: []
      },
      on: {}
    }

    // コールバック関数の初期設定（下で使用しているextend関数では引数にない関数が削除されてしまうため分けて対応）
    this.on = {
      beforeOpen(e) {},
      afterOpen(e) {},
      beforeClose(e) {},
      afterClose(e) {},
      resize: {
        query: undefined, // ex. '(min-width: 960px)'
        callback: undefined // ex. (matches) => { matches ? 'PC' : 'SP' }
      }
    }

    // 引数の設定で上書きして、コールバックをconfigにマージ
    extend(this.config, config);
    if (config && config.on) extend(this.on, config.on);
    Object.assign(this.config.on, this.on);

    // モーダルコンテンツ要素
    const modalName = this.removeFirstLetter(this.config.modal);
    this.modalWrapper = this.isTypeId(this.config.modal) 
      ? document.getElementById(modalName) 
      : document.getElementsByClassName(modalName);
    
    // モーダルを開くトリガー要素
    const triggerName = this.removeFirstLetter(this.config.trigger.open);
    this.openTrigger = this.isTypeId(this.config.trigger.open) 
      ? document.getElementById(triggerName) 
      : document.getElementsByClassName(triggerName);
      
    // モーダルを閉じる処理を除外するセレクター・クラス名
    this.noCloseSelectorNames = this.config.trigger.noCloseSelectorNames;
    this.noCloseClassNames = this.config.trigger.noCloseClassNames;
    
    // コールバック
    this.beforeOpen = this.config.on.beforeOpen;
    this.beforeClose = this.config.on.beforeClose;
    this.afterOpen = this.config.on.afterOpen;
    this.afterClose = this.config.on.afterClose;
    this.resize = this.config.on.resize;

    // スクロール位置保存
    this.scrollPosition;

    // 実行
    this.execute();
  }

  /** 先頭の#か.を削除 */
  removeFirstLetter(string, reg = /^[.#]?/g) {
    return string.replace(reg, '');
  }

  /** 先頭文字でidか真偽値を返す */
  isTypeId(string) {
    return string.slice(0, 1) === '#' ? true : false;
  }

  // /** 背景固定 */
  // setBodyFixed() {
  //   if (userAgent.isiOS) {
  //     this.scrollPosition = window.pageYOffset;
  //     document.body.classList.add('is-fixed_ios');
  //     document.body.style.top = `-${this.scrollPosition}px`;
  //   } else {
  //     document.body.classList.add('is-fixed');
  //   }
  // }

  // /** 背景固定解除 */
  // setBodyStatic() {
  //   if (userAgent.isiOS) {
  //     document.body.classList.remove('is-fixed_ios');
  //     document.body.style.removeProperty('top');
  //     window.scrollTo(0, this.scrollPosition);
  //   } else {
  //     document.body.classList.remove('is-fixed');
  //   }
  // }

  /** モーダル開くクリックイベント */
  setOpen(target, index = undefined) {
    target.addEventListener('click', e => {
      e.preventDefault();
      this.beforeOpen(e);
      // this.setBodyFixed();
      new ScrollLock(this.modalWrapper).lock();
      index === undefined ? this.modalWrapper.classList.add('is-open') : this.modalWrapper[index].classList.add('is-open');
      this.afterOpen(e);
    });
  }

  /** モーダルを開く操作 */
  handleOpen() {
    if (isHTMLCollection(this.modalWrapper)) {
      nodeEach(this.openTrigger, (_t, i) => {
        this.setOpen(_t, i);
      });
    } else {
      this.setOpen(this.openTrigger);
    }
  }

  /** 除外セレクター名がある */
  isExclusionSelector(e) {
    if (this.noCloseSelectorNames === undefined) return
    return this.noCloseSelectorNames.includes(e.target.localName)
  }

  /** 除外クラス名がある */
  isExclusionClass(e) {
    if (this.noCloseClassNames === undefined) return
    return e.target.className.split(' ').some(className => this.noCloseClassNames.includes(className))
  }

  /** モーダルを閉じるクリックイベント */
  setClose(target) {
    target.addEventListener('click', e => {
      if (this.isExclusionSelector(e) || this.isExclusionClass(e)) return
      e.preventDefault();
      this.beforeClose(e);
      // this.setBodyStatic();
      new ScrollLock(this.modalWrapper).unLock();
      e.currentTarget.classList.remove('is-open');
      this.afterClose(e);
    });
  }

  /** モーダルを閉じる操作 */
  handleClose() {
    if (isHTMLCollection(this.modalWrapper)) {
      nodeEach(this.modalWrapper, _t => {
        this.setClose(_t);
      });
    } else {
      this.setClose(this.modalWrapper);
    }
  }

  /** リサイズ設定有無の真偽値 */
  hasResizeConfig() {
    return this.resize.query && this.resize.callback
  }

  /** リサイズ処理 */
  handleResize() {
    if (this.hasResizeConfig()) mediaQuery(this.resize);
  }

  /** 実行処理をまとめる */
  execute() {
    this.handleOpen();
    this.handleClose();
    this.handleResize();
  }
}