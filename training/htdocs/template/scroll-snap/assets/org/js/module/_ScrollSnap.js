export default class ScrollSnap {
  #container;
  #isScrolling;

  constructor(container, config) {
    this.#container = container ? document.getElementById(container) : document.documentElement;
    this.config = config;

    this.timerId;
    this.#isScrolling = false;

    this.pageY;
    this.touchStart, this.touchMove, this.touchEnd;

    this.#setEvents();
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
   * イベント登録
   */
  #setEvents() {
    // タッチポイント有無のイベント分岐
    if (!this.getTouchPoints) this.getContainer.addEventListener('wheel', this.#getVerticalMovement.bind(this));

    this.getContainer.addEventListener(this.getEvent.start, (e) => {
      this.touchStart = e.pageY;
    });

    this.getContainer.addEventListener(this.getEvent.move, (e) => {
      this.touchMove = e.pageY;
    });

    this.getContainer.addEventListener(this.getEvent.end, (e) => {
      this.touchEnd = this.touchStart - this.touchMove;
      // touchMoveがなければ処理中止
      if (this.touchMove == null) return;
      this.touchMove = null;
      this.#getVerticalMovement(e);
    });
  }
}
