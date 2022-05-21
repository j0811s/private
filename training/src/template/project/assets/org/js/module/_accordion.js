export default class Accordion {
  /**
   * @param  {String} id 開閉要素のid属性名
   * @param  {Object} parameter
   * @param  {String} parameter.type 'slideDown', 'slideUp', 'slideToggle'
   * @param  {Number} parameter.duration 開閉速度
   * @param  {String} parameter.easing イージングタイプ
   */
  constructor(id, parameter) {
    this.elementById = document.getElementById(id);
    this.type = parameter?.type ? parameter.type : 'slideToggle';
    this.duration = parameter?.duration ? parameter.duration : 500;
    this.easing = parameter?.easing ? parameter.easing : 'swing';

    this._execute();
  }

  /**
   * イージング：https://github.com/danro/jquery-easing/blob/master/jquery.easing.js
   * @param {Number} t アニメーションの経過時間
   * @param {Number} b 始点
   * @param {Number} c 変化量
   * @param {Number} d 変化にかける時間
   * @returns 計算結果
   */
  _easing(t, b, c, d) {
    const def = c * (0.5 - Math.cos((t / d) * Math.PI) / 2) + b;
    switch(this.easing) {
      case 'swing':
        return def;
      default:
        return def;
    }
  }

  /**
   * slideToggleの初期設定
   */
  _initSlideToggle() {
    if (this.type !== 'slideToggle') return;
    this.type = getComputedStyle(this.elementById).display === 'none' ? 'slideDown' : 'slideUp';
  }

  /**
   * 実行中の判定
   */
  _isDuringExecution() {
    const isUp = (this.type === 'slideUp' && (getComputedStyle(this.elementById).display === 'none' || this.elementById.classList.contains('add-execute')));
    const isDown =  (this.type === 'slideDown' && (getComputedStyle(this.elementById).display !== 'none' || this.elementById.classList.contains('add-execute')));

    return isUp || isDown;
  }

  /**
   * ターゲットの高さ関連の値を取得
   */
  _getHeightValues() {
    const targetStyle = getComputedStyle(this.elementById);
    return {
      height: this.elementById.getBoundingClientRect().height,
      marginTop: parseFloat(targetStyle.marginTop),
      marginBottom: parseFloat(targetStyle.marginBottom),
      paddingTop: parseFloat(targetStyle.paddingTop),
      paddingBottom: parseFloat(targetStyle.paddingBottom)
    }
  }

  /**
   * 高さ関連のプロパティを設定
   */
  _setHeightValue() {
    // 値が0のものを削除してから代入
    const heightVal = this._getHeightValues();
    Object.keys(heightVal).forEach(key => {
      if (heightVal[key] ===  0) delete heightVal[key];
    });
    this.heightVal = heightVal;

    if (Object.keys(this.heightVal).length === 0) return;
  }

  /**
   * アニメーション設定
   */
  _setAnimation() {
    // スタイルセット
    this.elementById.classList.add('add-execute');
    this.elementById.style.overflow = 'hidden';
    if (this.type === 'slideDown') this.elementById.style.display = 'block';

    // 高さスタイル整理(display: block後を推奨)
    this._setHeightValue();
    
    // 開閉アニメーション処理を返す
    return (elapsedTime, duration, heightVal) => {
      Object.keys(heightVal).forEach(key => {
        const styleValues = this.type === 'slideDown' ? this._easing(elapsedTime, 0, heightVal[key], duration) : (heightVal[key] - this._easing(elapsedTime, 0, heightVal[key], duration));
        this.elementById.style[key] = `${styleValues}px`;
      });
    }
  }

  /**
   * アニメーション実行
   */
  _execute() {
    this._initSlideToggle();
    if (this._isDuringExecution()) return;
    const animation = this._setAnimation();

    const start = new Date();
    const loop = () => {
      const elapsedTime = new Date() - start;

      if (elapsedTime > this.duration) {
        //実行判定のクラス削除
        this.elementById.classList.remove('add-execute');

        // slideUp要素を非表示
        if(this.type === 'slideUp') this.elementById.style.display = 'none';

        // スタイルリセット
        this.elementById.style.overflow = '';
        Object.keys(this.heightVal).forEach(key => {
          this.elementById.style[key] = '';
        });

        return;
      }

      animation(elapsedTime, this.duration, this.heightVal);
      requestAnimationFrame(loop);
    }

    requestAnimationFrame(loop);
  }
}