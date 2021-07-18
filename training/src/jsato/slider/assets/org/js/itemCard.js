export class ItemCard {
  constructor(selector, config) {
    // 設定
    this.selector = selector;
    this.config = {
      slideToScroll: 4,
      dots: true,
      arrow: true,
      marginRight: 10,
      speed: 400,
      responsive: [
        {
          breakpoint: 960,
          settings: {
            slideToScroll: 4
          }
        },
        {
          breakpoint: 1280,
          settings: {
            slideToScroll: 4
          }
        },
        {
          breakpoint: 1600,
          settings: {
            slideToScroll: 6
          }
        }
      ]
    }

    // 引数の設定があれば上書き
    if (config) this._extend(this.config, config);

    // PCメディアクエリ
    const mqPC = matchMedia('(min-width: 960px)');

    // 対象要素
    this.itemCard = document.querySelectorAll(this.selector);

    // スライド要素
    this.itemCardList = document.querySelectorAll(`${this.selector} .js-lpc-itemCard_list`);
    this.itemCardSlide = document.querySelectorAll(`${this.selector} .js-lpc-itemCard_item`);
    
    // スライド総数
    this.totalNum = document.querySelectorAll(`${this.selector} .js-lpc-itemCard_item`).length;

    // スライド移動関係
    this.slideToScroll = this.config.slideToScroll;
    this.slideIndex = [];
    this.slidePosition = [];
    this.speed = this.config.speed;

    // スライドの現在枚数
    this.currentNum = 0;

    // スライドのmargin-right, border設定
    this.marginRight = this.config.marginRight;
    [].slice.call(this.itemCardSlide).forEach(slide => {
      slide.style.marginRight = this.marginRight + 'px';
    });
    this.border = this.isPC(mqPC) ? 2 : 0;
    mqPC.addListener(this.isPC);
    console.log(this.border)
    
    // レスポンシブ設定
    this.responsive = this.config.responsive;

    // ドット・矢印の有無
    this.isDots = this.config.dots;
    this.isArrow = this.config.arrow;

    // 矢印要素
    this.arrows = document.querySelectorAll(`${this.selector} .js-lpc-itemCard_arrowWrap`);
    this.prevArrow = document.querySelectorAll(`${this.selector} .js-lpc-itemCard_prevArrow`);
    this.nextArrow = document.querySelectorAll(`${this.selector} .js-lpc-itemCard_nextArrow`);

    // ドット要素
    this.dots = document.querySelectorAll(`${this.selector} .js-lpc-itemCard_dots`);
    this.dot = document.querySelectorAll(`${this.selector} .js-lpc-itemCard_dot`);

    // ドット数 = スライド総数 ÷ スライド移動量
    this.dotLength = Math.ceil(this.totalNum / this.slideToScroll);

    this.clicked = false;

    // 初期化
    this.init();
  }

  // プロパティの上書き
  _extend(dest, src) {
    for (let property in src) {
      dest[property] = src[property];
    }
    return dest;
  }

  // イージング jswing 
  easing(t, b, c, d) {
    return c * (0.5 - Math.cos(t / d * Math.PI) / 2) + b;
  }


  isPC(mq) {
    if (mq.matches) return true;
  }

  // 矢印の表示管理
  toggleViewArrow(e) {
    //左矢印
    if (e.target.scrollLeft === 0) {
      [].slice.call(this.prevArrow).forEach(prev => {
        prev.classList.add('is-disabled');
      });
    } else {
      [].slice.call(this.prevArrow).forEach(prev => {
        prev.classList.remove('is-disabled');
      });
    }
    
    //右矢印
    if (e.target.scrollWidth - e.target.scrollLeft <= e.target.clientWidth + this.marginRight) {
      [].slice.call(this.nextArrow).forEach(next => {
        next.classList.add('is-disabled');
      });
    } else {
      [].slice.call(this.nextArrow).forEach(next => {
        next.classList.remove('is-disabled');
      });
    }
  }

  // スライドを戻る
  slidePrev() {
    if (this.currentNum > 0) this.currentNum--;
    console.log(this.currentNum);
    [].slice.call(this.itemCardList).forEach(target => {
      const speed = this.speed;
      const easing = this.easing;
      const scrollFrom = this.itemCardList[0].scrollLeft + this.marginRight;
      let targetPosition;
      if (this.currentNum === 0 ) {
        targetPosition = 0;
      } else if (this.currentNum === this.slideIndex.length - 2) {
        targetPosition = this.slidePosition[this.slideIndex.length - 1] - this.itemCardList[0].scrollLeft;
      } else { 
        targetPosition = this.slidePosition[this.currentNum] - this.itemCardList[0].scrollLeft;
      }
      const startTime = Date.now();
      console.log(targetPosition);

      (function loop() {
        var currentTime = Date.now() - startTime;
        if(currentTime < speed) {
          target.scrollTo(easing(currentTime, scrollFrom, targetPosition, speed), 0);
          window.requestAnimationFrame(loop);
        } else {
          target.scrollTo(targetPosition + scrollFrom, 0);
        }
      })();
    });
  }

  // スライドを進む
  slideNext() {
    if (this.currentNum < this.slideIndex.length - 1) this.currentNum++;
    [].slice.call(this.itemCardList).forEach(target => {
      const speed = this.speed;
      const easing = this.easing;
      const scrollFrom = this.itemCardList[0].scrollLeft + this.marginRight;
      let targetPosition;
      if (this.currentNum === 0 ) {
        targetPosition = this.slidePosition[1]  - this.itemCardList[0].scrollLeft;
      } else if (this.currentNum === this.slideIndex.length - 2) {
        targetPosition = this.slidePosition[this.slideIndex.length - 1] - this.itemCardList[0].scrollLeft;
      } else { 
        targetPosition = this.slidePosition[this.currentNum] - this.itemCardList[0].scrollLeft;
      }
      const startTime = Date.now();

      (function loop() {
        var currentTime = Date.now() - startTime;
        if(currentTime < speed) {
          target.scrollTo(easing(currentTime, scrollFrom, targetPosition, speed), 0);
          window.requestAnimationFrame(loop);
        } else {
          target.scrollTo(targetPosition + scrollFrom, 0);
        }
      })();
    });
  }

  // ドットを表示
  showDots() {

  }

  // ドットを非表示
  hideDots() {

  }

  // ドットを追加
  addDot() {

  }

  // ドットを削除
  removeDot() {

  }

  // スライドにインデックス付与
  setScrollTargetActive() {
    [].slice.call(this.itemCardSlide).forEach((slide, i) => {
      slide.dataset.slideNum = i;
      if (slide.dataset.slideNum % this.slideToScroll === 0 || +slide.dataset.slideNum === this.totalNum - 1) {
        slide.dataset.toSlide = '';
      }
    });
    
    [].slice.call(document.querySelectorAll(`${this.selector} [data-to-slide='']`)).forEach((val, i) => {
      val.dataset.toSlide = i;
    });

    this.slideIndex = [].slice.call(document.querySelectorAll(`${this.selector} [data-to-slide]`)).map((slide, i) => {
      return +slide.dataset.toSlide
    }).filter(v => v !== undefined);
  }

  // スライド移動先の座標
  setSlidePositon() {
    this.slidePosition = [].slice.call(document.querySelectorAll(`${this.selector} [data-to-slide]`)).map((slide, i) => {
      return (slide.clientWidth + this.marginRight) * this.slideToScroll * i;
    });

    console.log(this.slidePosition)
  }

  // 現在のインデックス更新
  updateIndex(e) {
    this.slidePosition.forEach((position, i) => {
      if (e.target.scrollLeft >= position - this.itemCardList[0].clientWidth + this.marginRight) {
        this.currentNum = this.slideIndex[i];
        if (this.currentNum >= this.slideIndex.length - 2) this.currentNum = this.slideIndex[this.slideIndex.length - 2];
        
      }
    });
    
    console.log(this.currentNum)

  }

  // リサイズ
  responsive(breakpoint) {

  }

  // 初期化
  init() {

    /** 読み込みイベント */
    this.setScrollTargetActive();
    this.setSlidePositon();

    /** スクロールイベント */
    [].slice.call(this.itemCardList).forEach(list => {
      list.addEventListener('scroll', this.toggleViewArrow.bind(this));
      list.addEventListener('scroll', this.updateIndex.bind(this));
    });

    /** クリックイベント */
    [].slice.call(this.prevArrow).forEach(prev => {
      prev.addEventListener('click', this.slidePrev.bind(this));
    });

    [].slice.call(this.nextArrow).forEach(next => {
      next.addEventListener('click', this.slideNext.bind(this));
    });
  }

  // 削除
  destroy() {
    this.hideArrow();
    this.hideDots();
    this.removeDot();
  }
}