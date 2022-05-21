import {extend} from "./_extend";
import Device from "./_device";

export default class ScrollLock {

  constructor(target = null, option) {
    // 対象要素
    this.target = target == null ? document.body : target;

    // 機能を無効にしたい端末
    this.disable = {
      pc: false,
      sp: false
    }
    if (option && option.disable) extend(this.disable, option.disable);

    // 固定ステータス
    this.stateLock = false;

    // スクロールバーの横幅
    this.scrollBarWidth = `${window.innerWidth - document.body.clientWidth}px`;
    
    // デバイス判定
    const _device = new Device();
    this.pc = _device.is.pc;
    this.sp = _device.is.sp;
    this.ios = _device.is.ios;

    // タッチイベント情報
    this.toucheStartY = 0;
    this.toucheCurrentY = 0;
    this.iosLockEvent = (e) => this._iosLock(e);
  }

  _iosLock(e) {
    this.toucheCurrentY = e.changedTouches[0].pageY;
    const height = this.target.offsetHeight;
    const isTop = this.toucheStartY <= this.toucheCurrentY && this.target.scrollTop === 0;
    const isBottom = this.toucheStartY >= this.toucheCurrentY && this.target.scrollHeight - this.target.scrollTop === height;

    if (isTop || isBottom) e.preventDefault();
  }

  _setTouchCancel() {
    window.addEventListener('touchstart', e => {
      this.toucheStartY = e.changedTouches[0].pageY;
    });

    window.addEventListener('touchmove', this.iosLockEvent, {
      passive: false
    });
  }

  _unsetTouchCancel() {
    window.removeEventListener('touchmove', this.iosLockEvent, {
      passive: false
    });
  }

  _setOverflowHidden() {
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = this.scrollBarWidth;
  }

  _unsetOverflowHidden() {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  }

  _isNotApplicablePC() {
    return this.disable.pc && this.pc;
  }

  _isNotApplicableSP() {
    return this.disable.sp && this.sp;
  }

  get getLockStatus() {
    return this.stateLock;
  }

  lock() {
    if (this._isNotApplicablePC() === true || this._isNotApplicableSP === true) return;
    this.ios ? this._setTouchCancel() : this._setOverflowHidden();
    this.stateLock = true;
  }

  unLock() {
    if (this._isNotApplicablePC() === true || this._isNotApplicableSP === true) return;
    this.ios ? this._unsetTouchCancel() : this._unsetOverflowHidden();
    this.stateLock = false;
  }
}