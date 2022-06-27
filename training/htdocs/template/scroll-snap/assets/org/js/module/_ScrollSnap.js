export default class ScrollSnap {
  #container;
  #isScrolling;

  constructor(container, config) {
    // 引数
    this.#container = container ? document.getElementById(container) : document.documentElement;
    this.config = config;

    // ステータス
    this.timerId;
    this.#isScrolling = false;

    // 位置情報
    this.pageY;
    this.touchStart, this.touchMove, this.touchEnd;

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
    this.addEvent();
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
  get getEvent() {
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

    // 上方向
    if (this.pageY < 0) {
      console.log('UP');
    }
    // 下方向
    else {
      console.log('DOWN');
    }

    // スクロール中をリセット
    clearTimeout(this.timerId);
    this.timerId = setTimeout(() => {
      this.#isScrolling = false;
    }, 1000);
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
    // touchMoveがなければ処理中止
    if (this.touchMove == null) return;
    this.touchMove = null;
    this.#getVerticalMovement(e);
  }

  /**
   * イベント登録
   */
  addEvent() {
    if (!this.getTouchPoints) this.getContainer.addEventListener('wheel', this.getVerticalMovement);
    this.getContainer.addEventListener(this.getEvent.start, this.setTouchStart);
    this.getContainer.addEventListener(this.getEvent.move, this.setTouchMove);
    this.getContainer.addEventListener(this.getEvent.end, this.setTouchEnd);
  }

  /**
   * イベント削除
   */
  removeEvent() {
    if (!this.getTouchPoints) this.getContainer.removeEventListener('wheel', this.getVerticalMovement);
    this.getContainer.removeEventListener(this.getEvent.start, this.setTouchStart);
    this.getContainer.removeEventListener(this.getEvent.move, this.setTouchMove);
    this.getContainer.removeEventListener(this.getEvent.end, this.setTouchEnd);
  }
}
