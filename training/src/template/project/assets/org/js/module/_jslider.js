import { getDeviceEvent, extend } from './_util';

export class Jslider {
  constructor(container, option) {
    /**
     * コンテナー
     */
    this.container = document.querySelector(container);

    /**
     * オプション
     */
    this.option = {
      initialSlide: 0, // 初期インデックス
      slidesToShow: 1, // 表示数
      slidesToScroll: 1, // 移動量
      loop: false, // ループ
      autoplay: false, // 自動再生
      autoplaySpeed: 5000, // 自動再生速度
      arrows: true, // 矢印
      arrowsClassName: 'jslider_arrows', // 矢印_親クラス名
      arrowClassName: 'jslider_arrow', // 矢印_子クラス名
      dots: true, // ドット
      dotsClassName: 'jslider_dots', // ドット_親クラス名
      dotClassName: 'jslider_dot', // ドット_子クラス名
      swipe: true, // スワイプ(ドラッグ)操作
      breakpoints: null // ブレークポイント
    }
    extend(this.option, option);

    /**
     * スライド要素
     */
    this.slide = this.container.querySelector('.js-jslider_list');
    this.slideItem = this.slide.children;

    /**
     * スライド幅・位置
     */
    this.slideItemWidth = `${Math.floor(this.slide.offsetWidth / this.option.slidesToShow)}`;
    this.slideContainerWidth = `${Math.floor(this.slide.offsetWidth / this.option.slidesToShow * this.slideItem.length)}`;
    this.slideItemAxis;

    /**
     * ナビゲーション要素
     */
    this.arrowsElement = undefined;
    this.dotsElement = undefined;

    /**
     * グローバル位置情報
     */
    this.centerAxis = Math.floor(this.slide.offsetWidth / 2);
    this.startX;
    this.startY;
    this.moveX;
    this.moveY;
    this.currentIndex = this.option.initialSlide;
    this.translateX = -(Math.floor(this.slide.offsetWidth / this.option.slidesToShow * this.currentIndex));
    this.translate3d = `translate3d(${this.translateX}px, 0, 0)`;

    /**
     * 実行
     */
    this.init();
  }

  /**
   * 初期化
   */
  init() {
    // スライド
    this.setSlideContainer();
    this.setSlideItem();

    // ナビゲーション
    if (this.option.arrows) this.setArrows();
    if (this.option.dots) this.setDots();

    // スワイプ
    if (this.option.swipe) this.setSwipe(this.container);
  }

  /**
   * スライド設定
   */
  setSlideContainer() {
    // width
    this.slide.style.setProperty('width', this.slideContainerWidth + 'px', '');
    // transform
    this.slide.style.setProperty('transform', this.translate3d, '');
  }

  /**
   * スライドアイテム設定
   */
  setSlideItem() {
    // 初回アクティブスライド
    this.slideItem[this.option.initialSlide].classList.add('is-active');

    // width
    for (let i = 0; i < this.slideItem.length; i++) {
      this.slideItem[i].style.setProperty('width', this.slideItemWidth + 'px', '');
    }
  }

  /**
   * 矢印生成
   */
  setArrows() {
    for (let i = 0; i < 2; i++) {
      const arrows = document.createElement('button');
      arrows.className = this.option.arrowsClassName;
      arrows.classList.add(i === 0 ? 'mod-prev' : 'mod-next');

      const div = document.createElement('div');
      div.className = this.option.arrowClassName;
      arrows.appendChild(div);

      this.container.parentNode.insertBefore(arrows, this.container.nextElementSibling);
    }

    this.arrowsElement = document.querySelectorAll(`.${this.option.arrowClassName}`);
  }

  /**
   * ドット生成
   */
  setDots() {
    const dots = document.createElement('ul');
    dots.className = this.option.dotsClassName;
    for (let i = 0; i < this.slideItem.length; i++) {
      const li = document.createElement('li');
      li.className = this.option.dotClassName;
      if (i === this.option.initialSlide) li.classList.add('is-active');
      dots.appendChild(li);
    }
    this.container.parentNode.insertBefore(dots, this.container.nextElementSibling);
    this.dotsElement = document.querySelectorAll(`.${this.option.dotClassName}`);
  }

  /**
   * スワイプ処理
   */
  setSwipe() {
    // DOWN
    const slideDownEvent = (e) => {
      e.preventDefault();
      if (this.slide.classList.contains('is-move')) this.slide.classList.remove('is-move');
      this.startX = this.getTouchesX(e);

      this.container.addEventListener(getDeviceEvent().touchmove, slideMoveEvent, false);
      this.container.addEventListener(getDeviceEvent().touchend, slideUpEvent, false);
      // this.container.addEventListener('mouseout', () => {
      //   this.container.removeEventListener(getDeviceEvent().touchmove, slideMoveEvent, false);
      // }, false);
    }

    // MOVE
    const slideMoveEvent = (e) => {
      e.preventDefault();
      this.moveX = this.getChangeTouchesX(e);

      // もともとのtranslateと移動量の差分を合算
      const newTranslateX = Math.floor(this.translateX + (this.moveX - this.startX) * 0.05);

      // 始点と終点座標を超えないようにする
      if (newTranslateX >= 0) {
        this.translateX = 0;
      } else if (newTranslateX < 0 && newTranslateX <= -(this.slideContainerWidth - this.slideItemWidth)) {
        this.translateX = -(this.slideContainerWidth - this.slideItemWidth);
      } else {
        this.translateX = newTranslateX;
      }

      // transformに代入
      this.translate3d = `translate3d(${this.translateX}px, 0, 0)`;
      this.slide.style.setProperty('transform', this.translate3d, '');
    }

    // UP
    const slideUpEvent = (e) => {
      // 開始と終了の座標が異なれば続ける
      if (this.startX !== e.clientX) {
        // 座標移動するときのイージング
        this.slide.classList.add('is-move');

        // インデックス更新
        this.setUpdateIndex();

        // アクティブなスライドアイテムの中心軸
        this.slideItemAxis = Math.floor(-this.slideItemWidth * this.currentIndex);

        // コンテナーの中心軸に近いスライドアイテムに移動
        /**
         * 引っ張った数値がどのスライドアイテムのleft + widthを超えているか判定して、
         * どこまで移動するか決めたい。
         * 初期化の時に配列でそれぞれの座標を格納して比較する？インデックスも同じような条件式で変更させる。
         * そのためここの処理とsetUpdateIndex()は、同等にする必要ありそう。
         */
        this.translateX = this.slideItemAxis;
        this.translate3d = `translate3d(${this.slideItemAxis}px, 0, 0)`;
        this.slide.style.setProperty('transform', this.translate3d, '');
      }

      // イベントリスナー削除
      this.container.removeEventListener('mousemove', slideMoveEvent, false);
      this.container.removeEventListener('mouseup', slideDownEvent, false);
    }

    // イベントリスナー登録
    this.container.addEventListener(getDeviceEvent().touchstart, slideDownEvent);
  }

  getTouchesX(e) {
    return typeof e.touches === "undefined" ? e.pageX : e.touches[0].pageX;
  }
  getTouchesY(e) {
    return typeof e.touches === "undefined" ? e.pageY : e.touches[0].pageY;
  }
  getChangeTouchesX(e) {
    return typeof e.touches === "undefined" ? e.pageX : e.changedTouches[0].pageX;
  }
  getChangeTouchesY(e) {
    return typeof e.touches === "undefined" ? e.pageY : e.changedTouches[0].pageY;
  }
  setUpdateIndex() {
    // インデックス更新前に現在のアクティブを削除
    if (this.dotsElement) this.dotsElement[this.currentIndex].classList.remove('is-active');
    this.slideItem[this.currentIndex].classList.remove('is-active');

    // インデックス更新
    /**
     * 式を変更する必要あり
     * 移動量がどのスライドアイテムの座標を超えているかを判定したい
     * アイテムの横幅が半分以上見えているものをアクティブとする？
     */
    if (this.startX > this.moveX && this.startX > this.moveX && this.currentIndex < this.slideItem.length - 1) {
      this.currentIndex++;
    } else if (this.startX < this.moveX && this.startX < this.moveX && this.currentIndex > 0) {
      this.currentIndex--;
    }

    // インデックス更新後に新しいアクティブを追加
    if (this.dotsElement) this.dotsElement[this.currentIndex].classList.add('is-active');
    this.slideItem[this.currentIndex].classList.add('is-active');
  }
}