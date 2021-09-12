// closest polyfill
if (!Element.prototype.matches) {
  Element.prototype.matches = Element.prototype.msMatchesSelector ||
                              Element.prototype.webkitMatchesSelector;
}

if (!Element.prototype.closest) {
  Element.prototype.closest = function(s) {
    var el = this;

    do {
      if (Element.prototype.matches.call(el, s)) return el;
      el = el.parentElement || el.parentNode;
    } while (el !== null && el.nodeType === 1);
    return null;
  };
}

export class Modal {
  constructor(config) {
    const ua = window.navigator.userAgent.toLowerCase();
    this.isiOS = ua.indexOf('iphone') > -1 || ua.indexOf('ipad') > -1 || ua.indexOf('macintosh') > -1 && 'ontouchend' in document;
  
    // モーダル設定
    this.config = {
      modal: '.js-lpc-modal',
      trigger: {
        open: '.js-lpc-modal_trigger',
        noCloseSelectorNames: [],
        noCloseClassNames: []
      },
      // on: {
      //   beforeOpen(e) {
      //     console.log('beforeOpen sample')
      //   },
      //   afterOpen(e) {
      //     console.log('afterOpen sample')
      //   },
      //   beforeClose(e) {
      //     console.log('beforeClose sample')
      //   },
      //   afterClose(e) {
      //     console.log('afterClose sample')
      //   }
      // }
    }
    // 引数の設定で上書き
    this.extend(this.config, config);

    // モーダルコンテンツ要素
    this.modalName = this.config.modal;
    this.modalWrapper = document.querySelectorAll(this.modalName);
    // モーダルを開くトリガー要素
    this.openTrigger = document.querySelectorAll(this.config.trigger.open);
    // モーダルを閉じる処理を除外するセレクター・クラス名
    this.noCloseSelectorNames = this.config.trigger.noCloseSelectorNames;
    this.noCloseClassNames = this.config.trigger.noCloseClassNames;
    
    // コールバック
    if (this.config.on) {
      // 開く前後
      this.beforeOpen = this.config.on.beforeOpen;
      this.afterOpen = this.config.on.afterOpen;
      // 閉じる前後
      this.beforeClose = this.config.on.beforeClose;
      this.afterClose = this.config.on.afterClose;
    }

    // スクロール位置保存
    this.scrollPosition;

    // 実行
    this.execute();
  }

  /** 配列風に変換してforEach */
  nodeEach(nodeList, callback) {
    [].slice.call(nodeList).forEach(callback);
  }

  /** プロパティを上書き */
  extend(dest, src) {
    for (const property in src) {
      dest[property] = src[property]
    }
  
    return dest
  }

  bodyFixedOn() {
    if (this.isiOS) {
      this.scrollPosition = window.pageYOffset;
      document.body.classList.add('is-m_fixed');
      document.body.style.top = `-${this.scrollPosition}px`;
    } else {
      document.body.classList.add('is-m_hidden');
    }
  }

  bodyFixedOff() {
    if (this.isiOS) {
      document.body.classList.remove('is-m_fixed');
      document.body.style.removeProperty('top');
      window.scrollTo(0, this.scrollPosition);
    } else {
      document.body.classList.remove('is-m_hidden');
    }
  }

  /** モーダルを開く処理 */
  setOpen() {
    this.nodeEach(this.openTrigger, (_t, i) => {
      _t.addEventListener('click', e => {
        e.preventDefault();
        
        if (this.beforeOpen) this.beforeOpen(e);
        this.bodyFixedOn();
        this.modalWrapper[i].classList.add('is-open');
        if (this.afterOpen) this.afterOpen(e);
      });
    });
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

  /** モーダルを閉じる処理 */
  setClose() {
    this.nodeEach(this.modalWrapper, _t => {
      _t.addEventListener('click', e => {
        if (this.isExclusionSelector(e) || this.isExclusionClass(e)) {
          e.preventDefault();
          return false
        }

        if (this.beforeClose) this.beforeClose(e);
        this.bodyFixedOff();
        _t.classList.remove('is-open');
        if (this.afterClose) this.afterClose(e);
      });
    });
  }

  /** 実行処理をまとめる */
  execute() {
    this.setOpen();
    this.setClose();
  }
}