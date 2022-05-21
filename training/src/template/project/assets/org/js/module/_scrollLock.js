import Device from "./_device";

export default class ScrollLock {

  constructor(target, option) {
    this.target = target;
    this.option = option;

    this.device = new Device(this.option).execute();
    this.ios = false;
    if (this.option.sp) {
      this.ios = new Device({
        ios: true
      }).execute();
    }

    console.log(`PC or SP: ${this.device}`);
    console.log(`iOS: ${this.ios}`);
  }

}