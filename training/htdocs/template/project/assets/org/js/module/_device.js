export default class Device {
  constructor() {
    this.deviceJudgeList = {
      sp: false,
      tab: false,
      pc: false,
      ios: false,
      ipad: false
    }

    this.ua = navigator.userAgent;
  }

  get is() {
    return this._judgement();
  }

  /**
   * 判定によるリスト更新
   */
  _judgement() {
    Object.keys(this.deviceJudgeList).forEach(key => {
      this.deviceJudgeList[key] = this[`_${key}`]();
    });
    
    return this.deviceJudgeList;
  }

  _ios() {
    return typeof window !== 'undefined' && navigator && navigator.platform && (/iP(ad|hone|od)/.test(navigator.platform) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1));
  }

  _ipad() {
    return this.ua.indexOf('ipad') > -1 || this.ua.indexOf('macintosh') > -1 && 'ontouchend' in document;
  }

  _sp() {
    return this.ua.indexOf('iPhone') > 0 || this.ua.indexOf('Android') > 0 && this.ua.indexOf('Mobile') > 0;
  }

  _tab() {
    return this._ipad() || this.ua.indexOf('Android') > 0;
  }

  _pc() {
    return !this._sp();
  }
}