import { Modal } from "./module/_modal";
import { crossFade } from "./module/_crossFade";

new Modal({
  on: {
    beforeOpen(e) {
      console.log('beforeOpen')
      document.body.classList.add('add-beforeOpen');
    },
    afterOpen(e) {
      console.log('afterOpen')
      setTimeout(() => {
        document.body.classList.remove('add-beforeOpen');
      }, 1000)
    }
  }
});

new Modal({
  modal: '.js-lpc-modal2',
  trigger: {
    open: '.js-lpc-modal_trigger2',
    noCloseSelectorNames: ['a', 'figure', 'img'],
    noCloseClassNames: ['mod-noModalClose', 'mod-sample']
  },
  on: {
    beforeClose(e) {
      console.log('beforeClose')
      document.body.classList.add('add-afterOpen');
    },
    afterClose(e) {
      setTimeout(() => {
        document.body.classList.remove('add-afterOpen');
      }, 1000)
      console.log('afterClose')
    }
  }
});

new crossFade({
  wrap: '.js-crossFade',
  item: '.js-crossFade_item',
  duration: 6000
});