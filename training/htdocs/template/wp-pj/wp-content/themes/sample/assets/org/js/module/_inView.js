import {extend, nodeEach} from './_util';

/**
 * インスタンスはloadイベント内を推奨（コンテンツの高さが可変するなら）
 */
export class InView {
  constructor(selector, option) {
    // ターゲット
    this.selector = selector ? selector : document.getElementsByClassName('js-inView');
    // デフォルトオプション
    this.option = {
      addClassName: 'add-inView', // 可視範囲に入ったときのクラス名
      trigger: 'top', // どのくらい要素が見えた時にするか 'top', 'middle', 'bottom'
      once: true // 一度だけの発火にするか
    }

    // 引数があれば上書き
    extend(this.option, option);
    
    this.init();
  }

  // 初期化
  init() {
    this._handleScroll();
    window.addEventListener('scroll', this._handleScroll.bind(this));
  }

  // 破棄
  destroy() {
    window.removeEventListener('scroll', this._handleScroll.bind(this));
  }

  // スクロール量を取得
  _getScrollValue() {
    return window.pageYOffset || document.documentElement.scrollTop;
  }

  // ターゲットのoffset.top
  _getOffsetTop() {
    return [].slice.call(this.selector).map(selector => selector.getBoundingClientRect().top + this._getScrollValue());
  }

  // ブラウザの高さ取得
  _getWindowHeight() {
    return window.innerHeight;
  }

  // オプションのタイプで判定の差分数値を決定
  _getViewTriggerValue(i) {
    let value = 0;
    switch(this.option.trigger) {
      case 'top':
        value = this._getWindowHeight();
        break;
      case 'middle':
        value = this._getWindowHeight() / 2;
        break;
      case 'bottom':
        value = this._getWindowHeight() - this.selector[i].offsetHeight;
        break;
      default:
        value = this._getWindowHeight();
        break;
    }
    return value;
  }

  // 要素を表示するクラス追加
  _addViewClass(i) {
    this.selector[i].classList.add(this.option.addClassName);
  }

  // 要素を非表示にするクラス削除
  _removeViewClass(i) {
    if (!this.option.once) {
      this.selector[i].classList.remove(this.option.addClassName);
    }
  }

  // スクロールイベント
  _handleScroll() {
    nodeEach(this.selector, (selector, i) => {
      // 画面内に要素があるか判定
      const viewTop = this._getScrollValue() + this._getViewTriggerValue(i) > this._getOffsetTop()[i];

      const triggerMiddleVlaue = this.option.trigger === 'top' || this.option.trigger === 'bottom' ? 0 : this._getViewTriggerValue(i);
      const triggerBottomValue = this._getWindowHeight() - selector.offsetHeight;
      const viewBottom = this._getScrollValue() + triggerMiddleVlaue + triggerBottomValue < this._getOffsetTop()[i] + selector.offsetHeight;

      // クラス付け替え
      viewTop && viewBottom ? this._addViewClass(i) : this._removeViewClass(i);
    });
  }
}