import {extend} from "./_extend";

export default class Device {
  constructor(option) {
    this.option = {
      sp: false,
      pc: false,
      ios: false
    }
    extend(this.option, option);
  }

  execute() {
    return this._judgement();
  }

  /**
   * 端末とthis.optionがひとつでも一致するか
   * @returns Boolean
   */
  _judgement() {
    const _option = this.option;
    return Object.keys(_option).some(key => _option[key] && this[`_${key}`]());
  }

  _ios() {
    return typeof window !== 'undefined' && navigator && navigator.platform && (/iP(ad|hone|od)/.test(navigator.platform) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1));
  }

  _sp() {
    return navigator.userAgent.match(/(iPhone|iPad|iPod|Android)/i);
  }

  _pc() {
    return !(navigator.userAgent.match(/(iPhone|iPad|iPod|Android)/i));
  }
}