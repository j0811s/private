import { extend } from './_util';

export default class ScrollSnap {
  #container;
  #navAnker;
  #isScrolling;

  constructor(container, config) {
    // 設定
    this.config = {
      init: true, // インスタンス生成時にイベントリスナーに登録する
      duration: 1000, // #isScrollingの切り替え時間
      interval: 1500, //コンテンツ遷移までのインターバル
      ease: 'ease-in-out',
      anker: null, // 配列で個別指定
      ignoreClassName: 'js-ssIgnore', // フル表示の対象外クラス名
      type: 'normal', // 'card'でカードめくり風にする
      navContainer: 'js-ssNavigation'
    };
    extend(this.config, config);

    // 対象要素
    this.#container = document.getElementById(container);
    this.#navAnker = document.querySelectorAll(`#${this.config.navContainer} a`);

    // ステータス
    this.timerId;
    this.#isScrolling = false;

    // 位置情報
    this.pageY;
    this.touchStart, this.touchMove, this.touchEnd;

    // セクション要素情報
    this.wh = window.innerHeight;
    this.currentIndex = 0;
    this.sectionAll = this.getContainer.childNodes;

    // 関数
    this.getVerticalMovement = this.#getVerticalMovement.bind(this);
    this.setTouchStart = this.#setTouchStart.bind(this);
    this.setTouchMove = this.#setTouchMove.bind(this);
    this.setTouchEnd = this.#setTouchEnd.bind(this);
    this.resize = this.#resize.bind(this);

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
    if (this.config.init) this.addEvent();

    if (this.config.type === 'card') {
      this.#setCardStyle();
    }

    window.addEventListener('resize', this.resize);

    this.getNavAnker.forEach((btn, i) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const value = `-${this.wh * i}px`;
        this.getContainer.style.setProperty('transform', `translate3d(0, ${value}, 0)`);
        this.currentIndex = i;
      });
    });
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

    // アクティブ要素更新
    this.#updateActive();

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
   * タッチ座標をリセット
   */
  #resetTouchPosition() {
    this.touchStart = null;
    this.touchMove = null;
    this.touchEnd = null;
  }

  /**
   * 上移動
   */
  #moveUp() {
    if (this.currentIndex === 0) return;
    this.currentIndex--;
    const value = `-${this.wh * this.currentIndex}px`;
    this.getContainer.style.setProperty('transform', `translate3d(0, ${value}, 0)`);
  }

  /**
   * 下移動
   */
  #moveDown() {
    if (this.currentIndex === this.sectionAll.length - 1) return;
    this.currentIndex++;
    const value = `-${this.wh * this.currentIndex}px`;
    this.getContainer.style.setProperty('transform', `translate3d(0, ${value}, 0)`);
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
   * アクティブ情報更新
   */
  #updateActive() {
    this.#addContainerIndex();
    this.#addCurrentClass();
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
   * アンカーリンク用のdata属性追加
   */
  #addAnkerValue() {
    this.sectionAll.forEach((sec, i) => {
      sec.dataset.ssAnker = this.config.anker === null ? i : this.config.anker[i];
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
  }

  /**
   * リサイズ
   */
  #resize() {
    this.wh = window.innerHeight;
    this.#setSectionHeight();
  }
}
