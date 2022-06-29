import { mergeDeep } from './_mergeDeep';
import { setFillHeight } from './_setFillHeight';

export default class ScrollSnap {
  #container;
  #navAnker;
  #isScrolling;
  #translateY;

  constructor(container, config) {
    // 設定
    this.config = {
      init: true, // インスタンス生成時にイベントリスナーに登録する
      ignoreClassName: 'js-ssIgnore', // フル表示の対象外クラス名
      animation: {
        duration: 500, // #isScrollingの切り替え時間
        interval: 1000, //コンテンツ遷移までのインターバル
        ease: 'ease-in-out',
        type: 'normal' // 'card'でカードめくり風にする
      },
      navigation: {
        container: 'js-ssNavigation',
        anker: null // 配列で個別指定
      }
    };
    mergeDeep(this.config, config);

    // 対象要素
    this.#container = document.getElementById(container);
    this.#navAnker = document.querySelectorAll(`#${this.config.navigation.container} a`);

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
    this.sectionRectData = {};

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

    window.addEventListener('resize', this.updateSectionHeight);
    window.addEventListener('resize', setFillHeight);
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
  get getNavAnker() {
    return this.#navAnker;
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
  get getTouchPoints() {
    return window.ontouchstart !== undefined && 0 < navigator.maxTouchPoints;
  }

  /**
   * イベントタイプ
   * @returns イベント名のプロパティ
   */
  get getEventType() {
    return {
      start: this.getTouchPoints ? 'touchstart' : 'mousedown',
      move: this.getTouchPoints ? 'touchmove' : 'mousemove',
      end: this.getTouchPoints ? 'touchend' : 'mouseup'
    };
  }

  /**
   * 移動先のセクションの高さを取得
   * @returns height情報
   */
  #getSectionRect(index) {
    const currentSection = this.#getSectionElement(index);

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
    this.touchStart = e.pageY;
  }

  /**
   * touchmove or mousemoveイベントの座標取得
   */
  #setTouchMove(e) {
    if (this.touchStart === undefined) return;
    this.touchMove = e.pageY;
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
    if (this.currentIndex === 0 || this.sectionRectData.prevHeight === null) return;
    // 現在のtranslateY - 戻り先の高さ = 次のtranslateY
    this.#translateY = Math.abs(this.#translateY - this.sectionRectData.prevHeight);
    this.getContainer.style.setProperty('transform', `translate3d(0, -${this.#translateY}px, 0)`);
    this.currentIndex--;
  }

  /**
   * 下移動
   */
  #moveDown() {
    if (this.currentIndex === this.sectionAll.length - 1 || this.sectionRectData.nextHeight === null) return;
    // 現在のtranslateY + 現在の要素の高さ = 次のtranslateY
    this.#translateY = Math.abs(this.#translateY + this.sectionRectData.currentHeight);
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
      const pageY = this.getTouchPoints || e.type === 'mouseup' ? this.touchEnd : e.deltaY;
      pageY < 0 ? this.#moveUp() : this.#moveDown();
    }

    // アクティブ要素更新
    this.#updateActive();

    // height情報更新
    this.sectionRectData = this.#getSectionRect();

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
    if (this.getNavAnker == null) return;
    this.getNavAnker.forEach((a, i) => {
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
    if (this.config.navigation.anker == null) return;
    location.hash = this.config.navigation.anker[this.currentIndex];
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
      sec.dataset.ssAnker = this.config.navigation.anker === null ? `section-${i}` : this.config.navigation.anker[i];
    });
  }

  /**
   * アンカーリンクのクリックイベント
   */
  #anckerEvent() {
    if (this.getNavAnker == null) return;

    this.getNavAnker.forEach((btn, i) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (i === this.currentIndex) return;

        // 移動方向を決定
        this.sectionRectData = this.#getSectionRect(i);
        const pageYOffset = window.pageYOffset || document.documentElement.scrollTop;
        const up = Math.abs(this.#translateY + this.sectionRectData.prevRect.top - pageYOffset);
        const down = Math.abs(this.#translateY + this.sectionRectData.currentRect.top + pageYOffset);
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
    // document.body.style.setProperty('min-height', '100vh');
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

    this.sectionRectData = this.#getSectionRect();
  }

  /**
   * セクション関連の高さ更新
   */
  #updateSectionHeight() {
    this.wh = window.innerHeight;
    this.#setSectionHeight();

    const value = `-${this.wh * this.currentIndex}px`;
    this.getContainer.style.setProperty('transform', `translate3d(0, ${value}, 0)`);
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
  }
}
