
// <nav id="js-lpc-navigation" class="lpc-navigation">
//   <ul class="lpc-navigation_list">
//     <li class="lpc-navigation_listItem is-active"><a href="">モーダル</a></li>
//     <li class="lpc-navigation_listItem"><a href="">iframe API</a></li>
//     <li class="lpc-navigation_listItem"><a href="">crossfade</a></li>
//   </ul>
// </nav>

import { extend } from './_util';
import './_resizeObserver';
export class LocalNavigation {
  constructor(config) {
    this.config = {
      navigation: '#js-lpc-navigation', // ナビゲーションの親要素(nav -> ul -> liの構造想定)
      navigationArea: '.js-lpc-navigation_area', // ナビゲーションの対象要素
      activeClassName : 'is-active', // ナビゲーションの現在地に付与する
      threshold: 0 // this.setActive()のスクロール量の判定に使用
    }
    extend(this.config, config);

    // ナビゲーション要素
    this.navigation = document.querySelector(this.config.navigation);
    this.navigationItem = [].slice.call(document.querySelectorAll(`${this.config.navigation} > ul > li`));
    this.navigationActive = document.querySelector(`${this.config.navigation} > ul > .is-active`);

    // ナビゲーションの対象コンテンツ
    this.navigationArea = [].slice.call(document.querySelectorAll(this.config.navigationArea));

    // ナビゲーション対象の位置を格納する(配列)
    this.area;

    // 現在のスクロールトップ
    this.scrollTop = window.pageYOffset;

    // ナビゲーションの現在地
    this.current = 0;

    // 初期化
    this.initialize();
  }

  // ナビゲーション要素の高さを返す
  getNavigationHeight() {
    return this.navigation.offsetHeight;
  }

  // 要素のoffsetTopを返す
  getOffsetTop(element) {
    return element.getBoundingClientRect().top + this.scrollTop;
  }
  
  // ナビゲーションの対象コンテンツ位置を配列で返す
  getAreaPotision() {
    return this.navigationArea.map(area => this.getOffsetTop(area) - this.getNavigationHeight());
  }

  // ページ最下部
  isPageBottom() {
    return document.body.scrollHeight - (this.scrollTop + window.innerHeight) === 0;
  }

  // アクティブクラスを持っているか真偽値を返す
  hasActiveClass(element) {
    return element.classList.contains(this.config.activeClassName);
  }

  // アクティブクラスを追加
  addActive(element) {
    element.classList.add(this.config.activeClassName);
  }

  // アクティブクラスを削除
  removeActive(element) {
    if (this.hasActiveClass(element)) element.classList.remove(this.config.activeClassName);
  }

  // アクティブクラスの付け替え
  setActive() {
    for (let i in this.area) {
      if (this.scrollTop + (window.innerHeight * this.config.threshold) < this.area[0] || this.scrollTop < this.area[0]) {
        this.current = 0;
        this.navigationItem.forEach(listItem => this.removeActive(listItem));
        this.addActive(this.navigationItem[0]);
      } else if (this.scrollTop + (window.innerHeight * this.config.threshold) > this.area[i]) {
        this.current = i;
        this.navigationItem.forEach(listItem => this.removeActive(listItem));
        this.addActive(this.navigationItem[i]);
      } else if (this.scrollTop + (window.innerHeight * this.config.threshold) > this.area[this.area.length - 1] || this.isPageBottom()) {
        this.current = this.area.length - 1;
        this.navigationItem.forEach(listItem => this.removeActive(listItem));
        this.addActive(this.navigationItem[this.area.length - 1]);
      } 
    }
  }

  // 各種イベントでナビゲーションを初期化
  initialize() {
    this.area = this.getAreaPotision();
    this.setActive();

    window.addEventListener('scroll', () => {
      this.scrollTop = window.pageYOffset;
      this.setActive();
    });

    window.addEventListener('resize', () => {
      this.setActive();
    });

    // body配下のリサイズ監視(window.resizeでは対応しきれないものを想定)
    const ro = new ResizeObserver((entries, observer) => {
      this.area = this.getAreaPotision();
      this.setActive();
    });
    ro.observe(document.body);
  }
}