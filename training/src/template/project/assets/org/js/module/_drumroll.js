import {extend} from './_util';

export default class Drumroll {
  constructor(id, config) {
    this.elem = document.getElementById(id);
    this.config = {
      number: 1234567890,
      rollNum: 1,
      duration: 100, //_drumroll.scss $duration と合わせる
      startTime: 1000,
      stopTime: 500,
      comma: true
    }
    extend(this.config, config);

    this.number = this.config.number;
    this.rollNum = this.config.rollNum;
    this.duration = this.config.duration;
    this.startTime = this.config.startTime;
    this.stopTime = this.config.stopTime;
    this.comma = this.config.comma;
    
    const number = this.comma ? Number(this.number).toLocaleString() : String(this.number);
    this.numberArray = this._getStringArray(number);
    this.numberLength = [...String(this.number)].length;

    this._setNumberElements();
    this._init();
  }

  /**
   * 文字列を配列に分割
   */
  _getStringArray(str) {
    if (Array.isArray(str)) return;
    return [...str];
  }

  /**
   * numberの数だけ入れ物を追加
   */
  _setNumberElements() {
    for (let i = 0; i < this.numberArray.length; i++) {

      if (this.numberArray[i] === ',') {
        this.elem.insertAdjacentHTML('beforeend', 
        `<div class="drumroll_inner">
          <span class="drumroll_comma">,</span>
        </div>`
        );
      } else {
        this.elem.insertAdjacentHTML('beforeend', 
        `<div class="drumroll_inner js-drumroll_inner">
          <div class="drumroll_numbers js-drumroll_numbers">
            <span class="drumroll_num js-drumroll_roll">0</span>
            <span class="drumroll_num js-drumroll_target" data-num=${this.numberArray[i]}>1</span>
          </div>
        </div>`
        );
      }

    }
  }

  _init() {
    [].slice.call(document.getElementsByClassName('js-drumroll_numbers')).forEach((n, i) => {
      const reverseIndex = (this.numberLength - 1) - i;
      const endNum = Number(n.querySelector('.js-drumroll_target').dataset.num);

      setTimeout(() => {

        n.classList.add('add-roll');
        n.classList.add(`mod-delay${reverseIndex}`);

        setTimeout(() => {
          let currentRollNum = 0;
          let rollCount = 0;
          let targetCount = rollCount + 1;
          
          const intervalId = setInterval(() => {
            if (rollCount < this.numberLength - 1) {
              rollCount++;
            } else {
              rollCount = 0;
              currentRollNum++;
            }

            targetCount < this.numberLength - 1 ? targetCount++ : targetCount = 0;

            n.querySelector('.js-drumroll_roll').textContent = rollCount;
            n.querySelector('.js-drumroll_target').textContent = targetCount;

            if (currentRollNum >= this.rollNum) {
              setTimeout(() => {
                n.querySelector('.js-drumroll_roll').textContent = endNum;
                n.querySelector('.js-drumroll_target').textContent = endNum;
                n.classList.remove('add-roll');
                n.classList.add(`add-stop`);
                clearInterval(intervalId);
              }, i * this.stopTime);
            }

          }, this.duration)

        }, reverseIndex * this.duration);

      }, this.startTime);
    });
  }
}