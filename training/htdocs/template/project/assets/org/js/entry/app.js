import { Modal } from "../module/_modal";
import { crossFade } from "../module/_crossFade";
import { Youtube } from "../module/_iframeAPI";
import { LocalNavigation } from '../module/_LocalNavigation';
import {InView} from "../module/_inView";
import Drumroll from "../module/_drumroll";
import MouseStalker from "../module/_mouseStalker";
import Accordion from "../module/_accordion";
import ScrollLock from "../module/_scrollLock";


const scrollLock = new ScrollLock(null, {
  disable: {
    sp: false,
    pc: true
  }
});

window.addEventListener('load', () => {
  document.body.classList.add('add-loaded');

  setTimeout(() => {

    new InView(document.getElementsByClassName('js-inView'),{
      trigger: 'bottom',
      once: false
    });

  }, 0);

  
  new Drumroll('js-drumroll', {
    number: 907651321,
    rollNum: 2,
    // stopTime: 2000,
    startTime: 1000,
    comma: true
  });

  document.getElementById('js-root').addEventListener('click', () => {
    new Accordion('root');
  });

  document.getElementById('js-scrollLock').addEventListener('click', () => {
    scrollLock.lock();
  });

  document.getElementById('js-scrollUnLock').addEventListener('click', () => {
    scrollLock.unLock();
  })

  const scrollLockModal = new Modal({
    modal: '#js-scrollLock_modal',
    trigger: {
      open: '#js-scrollLock_modalBtn',
      noCloseSelectorNames: ['a', 'dd', 'img'],
      noCloseClassNames: ['mod-noModalClose']
    }
  });
});


MouseStalker('js-mouseStalker', {
  // target: document.getElementById('modal')
});

new LocalNavigation();

new Modal();

const modal2 = new Modal({
  modal: '.js-lpc-modal2',
  trigger: {
    open: '.js-lpc-modal_trigger2',
    noCloseSelectorNames: ['a', 'dd', 'img'],
    noCloseClassNames: ['mod-noModalClose']
  },
  on: {
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

const modalYT = new Youtube({
  ytData: [
    {
      playerId: 'js-player3',
      videoId: 'HcdzNHCwluM'
    }
  ],
  parameter: [
    {
      playerVars: {
        'autoplay': 0,
        'mute': 1,
        'controls': 1,
        'loop': 1,
        'playlist': 'videoId',
        'rel': 0,
        'playsinline': 1
      }
    }
  ]
});
const modal3 = new Modal({
  modal: '#js-modal3',
  trigger: {
    open: '#js-lpc-modal_trigger3',
    noCloseClassNames: ['mod-noClick', 'mod-tshtan']
  },
  on: {
    afterOpen(e) {
      console.log(e);
      console.log(modalYT);
      const onPlayerReady = (target) => {
        target.mute();
        target.playVideo();
      }
      onPlayerReady(modalYT.player[0]);
    },
    afterClose(e) {
      console.log(e);
      if (modalYT.player[0].getPlayerState() === 1) {
        modalYT.player[0].pauseVideo();
      }
    }
  }
});


new crossFade({
  wrap: '.js-crossFade',
  item: '.js-crossFade_item',
  duration: 6000
});


new Youtube({
  ytData: [
    {
      playerId: 'js-player1',
      videoId: 'HcdzNHCwluM'
    },
    {
      playerId: 'js-player2',
      videoId: 'wKkvbuLhEns'
    }
  ],
  parameter: [
    {
      playerVars: {
        // 'autoplay': 1,
        'mute': 1,
        'controls': 1,
        'loop': 1,
        'playlist': 'videoId',
        'rel': 0,
        'playsinline': 1
      },
      events: {
        'onReady': (e) => {
          e.target.mute();
          // e.target.playVideo();
        },
        'onStateChange': (e) => {
          if (e.target.getPlayerState() === 1) {
            console.log('video ?????????');
          }
        }
      }
    },
    // {
    //   playerVars: {
    //     'autoplay': 1,
    //     'mute': 1,
    //     'controls': 1,
    //     'loop': 1,
    //     'playlist': 'videoId',
    //     'rel': 0,
    //     'playsinline': 1
    //   }
    // }
  ]
});

// new Youtube();
