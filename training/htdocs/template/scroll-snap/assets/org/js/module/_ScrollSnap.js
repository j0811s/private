import { mergeDeep } from './_mergeDeep';
import { setFillHeight } from './_setFillHeight';

export default class ScrollSnap {
  #container;
  #navAnchors;
  #isScrolling;
  #translateY;

  constructor(container, config) {
    // 設定
    this.config = {
      init: true, // インスタンス生成時にイベントリスナーに登録する
      ignoreClassName: 'js-ssIgnore', // フル表示の対象外クラス名
      animation: {
        duration: 500, // #isScrollingの切り替え時間
        interval: 500, //コンテンツ遷移までのインターバル
        ease: 'ease',
        type: 'normal' // 'card'でカードめくり風にする
      },
      navigation: {
        container: 'js-ssNavigation',
        anchors: null // 配列で個別指定
      }
    };
    mergeDeep(this.config, config);

    // 対象要素
    this.#container = document.getElementById(container);
    this.#navAnchors = document.querySelectorAll(`#${this.config.navigation.container} a`);

    // ステータス
    this.timerId;
    this.#isScrolling = false;

    // 位置情報
    this.touchStart, this.touchMove, this.touchEnd;

    // セクション要素情報
    this.currentIndex = 0;
    this.wh = window.innerHeight;
    this.sectionAll = this.getContainer.childNodes;
    this.#translateY = 0;
    this.sectionData = {};

    // 関数
    this.getVerticalMovement = this.#getVerticalMovement.bind(this);
    this.setTouchStart = this.#setTouchStart.bind(this);
    this.setTouchMove = this.#setTouchMove.bind(this);
    this.setTouchEnd = this.#setTouchEnd.bind(this);
    this.updateSectionHeight = this.#updateSectionHeight.bind(this);

    // 初期化
    this.init();
  }

  /**
   * 初期化
   */
  init() {
    this.#setBaseStyle();
    this.#addAnkerValue();
    this.#setSectionHeight();
    this.#updateActive();
    this.#anckerEvent();
    setFillHeight();

    if (this.config.init) this.addEvent();

    if (this.config.animation.type === 'card') {
      this.#setCardStyle();
    }
  }

  /**
   * コンテナー要素取得
   */
  get getContainer() {
    return this.#container;
  }

  /**
   * アンカーリンク要素取得
   */
  get getNavAnchors() {
    return this.#navAnchors;
  }

  /**
   * 状態情報の取得
   */
  get getState() {
    return {
      isScrolling: this.#isScrolling
    };
  }

  /**
   * タッチデバイス判定
   * @returns Boolean
   */
  get getTouchDevice() {
    return (
      !!(
        typeof window !== 'undefined' &&
        ('ontouchstart' in window ||
          (window.DocumentTouch && typeof document !== 'undefined' && document instanceof window.DocumentTouch))
      ) || !!(typeof navigator !== 'undefined' && (navigator.maxTouchPoints || navigator.msMaxTouchPoints))
    );
  }

  /**
   * イベントタイプ
   * @returns イベント名のプロパティ
   */
  get getEventType() {
    return {
      start: this.getTouchDevice ? 'touchstart' : 'mousedown',
      move: this.getTouchDevice ? 'touchmove' : 'mousemove',
      end: this.getTouchDevice ? 'touchend' : 'mouseup'
    };
  }

  /**
   * 移動先のセクションの高さを取得
   * @returns height情報
   */
  #getSectionRect(index) {
    const _i = index != null ? index : this.currentIndex;
    const currentSection = this.#getSectionElement(_i);

    // 1つ前のセクション
    const prevHeight =
      currentSection.previousElementSibling == null
        ? null
        : currentSection.previousElementSibling.getBoundingClientRect().height;

    // 現在のセクション
    const currentHeight = currentSection.getBoundingClientRect().height;

    // 1つ後のセクション
    const nextHeight =
      currentSection.nextElementSibling == null
        ? null
        : currentSection.nextElementSibling.getBoundingClientRect().height;

    // Rect
    const prevRect = currentSection.getBoundingClientRect();
    const currentRect = currentSection.getBoundingClientRect();
    const nextRect = currentSection.getBoundingClientRect();

    return {
      prevHeight,
      currentHeight,
      nextHeight,
      prevRect,
      currentRect,
      nextRect
    };
  }

  /**
   * セクション要素を取得
   * @param  {Number} index
   */
  #getSectionElement(index) {
    const _i = index === undefined ? this.currentIndex : index;
    return this.sectionAll[_i];
  }

  /**
   * touchstart or mousedownイベントの座標取得
   */
  #setTouchStart(e) {
    if (this.getState.isScrolling) return;
    this.touchStart = e.type === 'touchstart' ? e.changedTouches[0].pageY : e.pageY;
  }

  /**
   * touchmove or mousemoveイベントの座標取得
   */
  #setTouchMove(e) {
    if (this.touchStart === undefined) return;
    this.touchMove = e.type === 'touchmove' ? e.changedTouches[0].pageY : e.pageY;
  }

  /**
   * touchend or mouseupイベントの座標取得
   */
  #setTouchEnd(e) {
    if (this.touchMove === this.touchStart || this.touchMove === undefined) {
      this.#resetTouchValue();
      return;
    }

    this.touchEnd = this.touchStart - this.touchMove;
    if (this.currentIndex === 0 && this.touchEnd + this.wh / 5 < 0) location.reload();
    this.#getVerticalMovement(e);
    this.#resetTouchValue();
  }

  /**
   * 座標リセット
   */
  #resetTouchValue() {
    this.touchStart = undefined;
    this.touchMove = undefined;
    this.touchEnd = undefined;
  }

  /**
   * 上移動
   */
  #moveUp() {
    if (this.currentIndex === 0 || this.sectionData.prevHeight === null) return;
    // 現在のtranslateY - 戻り先の高さ = 次のtranslateY
    this.#translateY = Math.abs(this.#translateY - this.sectionData.prevHeight);
    this.getContainer.style.setProperty('transform', `translate3d(0, -${this.#translateY}px, 0)`);
    this.currentIndex--;
  }

  /**
   * 下移動
   */
  #moveDown() {
    if (this.currentIndex === this.sectionAll.length - 1 || this.sectionData.nextHeight === null) return;
    // 現在のtranslateY + 現在の要素の高さ = 次のtranslateY
    this.#translateY = Math.abs(this.#translateY + this.sectionData.currentHeight);
    this.getContainer.style.setProperty('transform', `translate3d(0, -${this.#translateY}px, 0)`);
    this.currentIndex++;
  }

  /**
   * 垂直方向の移動判定
   */
  #getVerticalMovement(e) {
    // スクロール中なら中断
    if (this.getState.isScrolling) return;

    // スクロールフラグを有効
    this.#isScrolling = true;

    // 上下スクロール判定
    if (e.type === 'keydown') {
      if (e.keyCode === 38) this.#moveUp();
      if (e.keyCode === 40) this.#moveDown();
    } else {
      const pageY = e.type === 'wheel' ? e.deltaY : this.touchEnd;
      pageY < 0 ? this.#moveUp() : this.#moveDown();
    }

    // アクティブ要素更新
    this.#updateActive();

    // height情報更新
    this.sectionData = this.#getSectionRect();

    // スクロール中をリセット
    clearTimeout(this.timerId);
    this.timerId = setTimeout(() => {
      this.#isScrolling = false;
    }, this.config.animation.interval);
  }

  /**
   * 現在のインデックスをbodyのdata属性に追加
   */
  #addContainerIndex() {
    document.body.dataset.currentIndex = this.currentIndex;
  }

  /**
   * セクションにアクティブクラス追加
   */
  #addCurrentClass() {
    this.sectionAll.forEach((sec, i) => {
      if (i === this.currentIndex) {
        sec.classList.add('add-current');
      } else if (i !== this.currentIndex && sec.classList.contains('add-current')) {
        sec.classList.remove('add-current');
      }
    });
  }

  /**
   * セクションにアクティブクラス追加
   */
  #addNavigationCurrentClass() {
    if (this.getNavAnchors == null) return;
    this.getNavAnchors.forEach((a, i) => {
      if (i === this.currentIndex) {
        a.classList.add('add-current');
      } else if (i !== this.currentIndex && a.classList.contains('add-current')) {
        a.classList.remove('add-current');
      }
    });
  }

  /**
   * URLハッシュ更新
   */
  #updateHash() {
    if (this.config.navigation.anchors == null) return;
    location.hash = this.config.navigation.anchors[this.currentIndex];
  }

  /**
   * アクティブ情報更新
   */
  #updateActive() {
    this.#addContainerIndex();
    this.#addCurrentClass();
    this.#addNavigationCurrentClass();
    this.#updateHash();
  }

  /**
   * アンカーリンク用のdata属性追加
   */
  #addAnkerValue() {
    this.sectionAll.forEach((sec, i) => {
      if (this.config.navigation.anchors === null) return;
      sec.dataset.ssAnchors = this.config.navigation.anchors[i];
    });
  }

  /**
   * アンカーリンクのクリックイベント
   */
  #anckerEvent() {
    if (this.getNavAnchors == null) return;

    this.getNavAnchors.forEach((btn, i) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (i === this.currentIndex) return;

        // 移動方向を決定
        this.sectionData = this.#getSectionRect(i);
        const up = Math.abs(i > 0 ? this.#translateY + this.sectionData.prevRect.top : 0);
        const down = Math.abs(this.#translateY + this.sectionData.currentRect.top);
        this.#translateY = i > this.currentIndex ? down : up;

        // 状態を更新
        this.currentIndex = i;
        this.#updateActive();
        this.getContainer.style.setProperty('transform', `translate3d(0, -${this.#translateY}px, 0)`);
      });
    });
  }

  /**
   * スタイル追加
   */
  #setBaseStyle() {
    document.documentElement.style.setProperty('overflow', 'hidden');
    document.documentElement.style.setProperty('height', '100%');

    document.body.style.setProperty('overflow', 'hidden');
    document.body.style.setProperty('height', '100%');
    document.body.style.setProperty('min-height', 'calc(var(--vh, 1vh) * 100)');

    this.getContainer.style.setProperty('position', 'relative');
    this.getContainer.style.setProperty('transform', `translate3d(0, 0, 0)`);
    this.getContainer.style.setProperty('transition-property', 'transform');
    this.getContainer.style.setProperty('transition-duration', `${this.config.animation.duration}ms`);
    this.getContainer.style.setProperty('transition-timing-function', this.config.animation.ease);
  }

  /**
   * type: 'card'の追加スタイル
   */
  #setCardStyle() {
    this.getContainer.style.setProperty('height', `${this.wh}px`);
    this.sectionAll.forEach((sec, i) => {
      sec.style.setProperty('position', 'absolute');
      sec.style.setProperty('top', '0');
      sec.style.setProperty('left', '0');
      sec.style.setProperty('z-index', -i);
      sec.style.setProperty('width', '100%');
      sec.style.setProperty('height', '100%');
    });
  }

  /**
   * セクション用のheightプロパティ設定
   */
  #setSectionHeight() {
    this.sectionAll.forEach((sec, i) => {
      if (sec.classList.contains(this.config.ignoreClassName)) return;
      sec.style.setProperty('height', `${this.wh}px`);
    });

    this.sectionData = this.#getSectionRect();
  }

  /**
   * セクション関連の高さ更新
   */
  #updateSectionHeight() {
    this.wh = window.innerHeight;
    this.#setSectionHeight();

    // 全体 - (全体 - 指定セクション親からの距離)
    this.#translateY = Math.abs(
      this.getContainer.getBoundingClientRect().height -
        (this.getContainer.getBoundingClientRect().height - this.sectionAll[this.currentIndex].offsetTop)
    );
    this.getContainer.style.setProperty('transform', `translate3d(0, -${this.#translateY}px, 0)`);
  }

  /**
   * イベント登録
   */
  addEvent() {
    document.addEventListener('keydown', this.getVerticalMovement);
    this.getContainer.addEventListener('wheel', this.getVerticalMovement);
    this.getContainer.addEventListener(this.getEventType.start, this.setTouchStart);
    this.getContainer.addEventListener(this.getEventType.move, this.setTouchMove);
    this.getContainer.addEventListener(this.getEventType.end, this.setTouchEnd);

    window.addEventListener('resize', this.updateSectionHeight);
    window.addEventListener('resize', setFillHeight);
  }

  /**
   * イベント削除
   */
  removeEvent() {
    document.removeEventListener('keydown', this.getVerticalMovement);
    this.getContainer.removeEventListener('wheel', this.getVerticalMovement);
    this.getContainer.removeEventListener(this.getEventType.start, this.setTouchStart);
    this.getContainer.removeEventListener(this.getEventType.move, this.setTouchMove);
    this.getContainer.removeEventListener(this.getEventType.end, this.setTouchEnd);

    window.removeEventListener('resize', this.updateSectionHeight);
    window.removeEventListener('resize', setFillHeight);
  }
}
