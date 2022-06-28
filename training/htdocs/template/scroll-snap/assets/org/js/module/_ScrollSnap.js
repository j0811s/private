import { extend } from './_util';

export default class ScrollSnap {
  #container;
  #isScrolling;

  constructor(container, config) {
    // 対象要素
    this.#container = document.getElementById(container);

    // 設定
    this.config = {
      init: true, // インスタンス生成時にイベントリスナーに登録する
      duration: 1000, // #isScrollingの切り替え時間
      interval: 1500, //コンテンツ遷移までのインターバル
      ease: 'ease-in-out',
      type: 'normal' // 'card'でカードめくり風にする
    };
    extend(this.config, config);

    // ステータス
    this.timerId;
    this.#isScrolling = false;

    // 位置情報
    this.pageY;
    this.touchStart, this.touchMove, this.touchEnd;

    // セクション要素情報
    this.wh = window.innerHeight;
    this.currentSection = 1;
    this.sectionAll = this.getContainer.childNodes;

    // 関数
    this.getVerticalMovement = this.#getVerticalMovement.bind(this);
    this.setTouchStart = this.#setTouchStart.bind(this);
    this.setTouchMove = this.#setTouchMove.bind(this);
    this.setTouchEnd = this.#setTouchEnd.bind(this);

    // 初期化
    this.init();
  }

  /**
   * 初期化
   */
  init() {
    this.#setBaseStyle();
    this.#addSectionClassName();
    this.#setSectionHeight();
    if (this.config.init) this.addEvent();

    if (this.config.type === 'card') {
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
   * 垂直方向の移動判定
   */
  #getVerticalMovement(e) {
    // スクロール中なら中断
    if (this.getState.isScrolling) return;

    // スクロールフラグを有効
    this.#isScrolling = true;

    // 現在地を代入
    this.pageY = this.getTouchPoints || e.type === 'mouseup' ? this.touchEnd : e.deltaY;

    // 上下スクロール
    this.pageY < 0 ? this.#moveUp() : this.#moveDown();

    // スクロール中をリセット
    clearTimeout(this.timerId);
    this.timerId = setTimeout(() => {
      this.#isScrolling = false;
    }, this.config.interval);
  }

  /**
   * touchstart or mousedownイベントの座標取得
   */
  #setTouchStart(e) {
    this.touchStart = e.pageY;
  }

  /**
   * touchmove or mousemoveイベントの座標取得
   */
  #setTouchMove(e) {
    this.touchMove = e.pageY;
  }

  /**
   * touchend or mouseupイベントの座標取得
   */
  #setTouchEnd(e) {
    this.touchEnd = this.touchStart - this.touchMove;
    if (this.touchMove == null) return;
    this.touchMove = null;
    this.#getVerticalMovement(e);
  }

  /**
   * イベント登録
   */
  addEvent() {
    if (!this.getTouchPoints) this.getContainer.addEventListener('wheel', this.getVerticalMovement);
    this.getContainer.addEventListener(this.getEventType.start, this.setTouchStart);
    this.getContainer.addEventListener(this.getEventType.move, this.setTouchMove);
    this.getContainer.addEventListener(this.getEventType.end, this.setTouchEnd);
  }

  /**
   * イベント削除
   */
  removeEvent() {
    if (!this.getTouchPoints) this.getContainer.removeEventListener('wheel', this.getVerticalMovement);
    this.getContainer.removeEventListener(this.getEventType.start, this.setTouchStart);
    this.getContainer.removeEventListener(this.getEventType.move, this.setTouchMove);
    this.getContainer.removeEventListener(this.getEventType.end, this.setTouchEnd);
  }

  /**
   * スタイル追加
   */
  #setBaseStyle() {
    document.body.style.setProperty('overflow', 'hidden');
    document.body.style.setProperty('height', '100%');
    this.getContainer.style.setProperty('transform', `translate3d(0, 0, 0)`);
    this.getContainer.style.setProperty('transition-property', 'transform');
    this.getContainer.style.setProperty('transition-duration', `${this.config.duration}ms`);
    this.getContainer.style.setProperty('transition-timing-function', this.config.ease);
  }

  /**
   * 上移動
   */
  #moveUp() {
    if (this.currentSection === 1) return;
    this.currentSection--;
    const value = `-${this.wh * (this.currentSection - 1)}px`;
    this.getContainer.style.setProperty('transform', `translate3d(0, ${value}, 0)`);
  }

  /**
   * 下移動
   */
  #moveDown() {
    if (this.currentSection === this.sectionAll.length) return;
    this.currentSection++;
    const value = `-${this.wh * (this.currentSection - 1)}px`;
    this.getContainer.style.setProperty('transform', `translate3d(0, ${value}, 0)`);
  }

  /**
   * type: 'card'の追加スタイル
   */
  #setCardStyle() {
    this.getContainer.style.setProperty('position', 'relative');
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
   * セクション用のdata属性追加
   */
  #addSectionClassName() {
    this.sectionAll.forEach((sec, i) => {
      sec.dataset.ssSection = i;
    });
  }

  /**
   * セクション用のheightプロパティ設定
   */
  #setSectionHeight() {
    this.sectionAll.forEach((sec, i) => {
      sec.style.setProperty('height', `${this.wh}px`);
    });
  }
}
