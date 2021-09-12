import { Modal } from "./module/_modal";
import { crossFade } from "./module/_crossFade";

const modal1 = new Modal();

const modal2 = new Modal({
  modal: '.js-lpc-modal2',
  trigger: {
    open: '.js-lpc-modal_trigger2',
    noCloseSelectorNames: ['a', 'dd', 'img'],
    noCloseClassNames: ['mod-noModalClose']
  }
});

const modal3 = new Modal({
  modal: '#js-modal3',
  trigger: {
    open: '#js-lpc-modal_trigger3',
    noCloseClassNames: ['mod-noClick', 'mod-tshtan']
  },
  on: {
    afterOpen(e) {
      console.log('afterOpen')
      document.body.classList.add('add-afterOpen');
    },
    afterClose(e) {
      setTimeout(() => {
        document.body.classList.remove('add-afterOpen');
      }, 1000)
      console.log('afterClose')
    },
    resize: {
      query: '(max-width: 599px)',
      callback: (matches) => {
        if (matches) {
          console.log('SP');
        } else {
          console.log('Tablt ~ ')
        }
      }
    }
  }
});


console.log(modal1);
console.log(modal2);
console.log(modal3);

new crossFade({
  wrap: '.js-crossFade',
  item: '.js-crossFade_item',
  duration: 6000
});