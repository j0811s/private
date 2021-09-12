/**
 * 
  <div class="lpc-crossFade js-crossFade">
    <img class="lpc-crossFade_item js-crossFade_item" src="https://placehold.jp/1001x450.png" alt="">
    <img class="lpc-crossFade_item js-crossFade_item" src="https://placehold.jp/1002x450.png" alt="">
    <img class="lpc-crossFade_item js-crossFade_item" src="https://placehold.jp/1003x450.png" alt="">
    <img class="lpc-crossFade_item js-crossFade_item" src="https://placehold.jp/1004x450.png" alt="">
    <img class="lpc-crossFade_item js-crossFade_item" src="https://placehold.jp/1005x450.png" alt="">
    <img class="lpc-crossFade_item js-crossFade_item" src="https://placehold.jp/1006x450.png" alt="">
  </div>
 */

/**
 * 
new crossFade({
  wrap: '.js-crossFade',
  item: '.js-crossFade_item',
  duration: 6000
});
 */
export class crossFade {
  constructor(config) {
    // フェード要素
    this.wrap = document.querySelectorAll(config.wrap);
    this.item = document.querySelectorAll(config.item);

    // フェード情報
    this.duration = config.duration;
    this.activeIndex = 0;
    this.currentItem = this.item[this.activeIndex];
    this.prevItem = this.item[this.activeIndex--];
    this.currentItem.classList.add('is-active');

    // this固定
    this.execute.bind(this);

    // 実行
    setInterval(() => { this.execute() }, this.duration);
  }
  
  getItemTotalNum() {
    return this.item.length - 1;
  }

  isMaxIndex() {
    return this.activeIndex >= this.getItemTotalNum();
  }

  addActiveClass(target) {
    target.classList.add('is-active');
  }

  removeActiveClass(target) {
    target.classList.remove('is-active');
  }

  setActiveClass() {
    if (this.isMaxIndex()) {
      this.activeIndex = 0;
      this.currentItem = this.item[this.activeIndex];

      this.addActiveClass(this.currentItem);
      this.removeActiveClass(this.item[this.getItemTotalNum()]);

    } else {
      this.activeIndex++;
      this.currentItem = this.item[this.activeIndex];
      this.prevItem = this.item[this.activeIndex - 1];

      this.addActiveClass(this.currentItem);
      if (this.prevItem) this.removeActiveClass(this.prevItem);
    }
  }

  execute() {
    this.setActiveClass();
  }
}