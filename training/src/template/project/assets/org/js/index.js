import { Modal } from "./module/_modal";
import { crossFade } from "./module/_crossFade";
import { Youtube } from "./module/_iframeAPI";

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


new Youtube({
  ytData: [
    {
      playerId: 'js-player1',
      videoId: 'HcdzNHCwluM'
    },
    {
      playerId: 'js-player2',
      videoId: 'DuU2PQacRkI'
    },
    {
      playerId: 'js-player3',
      videoId: 'wKkvbuLhEns'
    }
  ],
  parameter: [
    {
      playerVars: {
        'autoplay': 1,
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
          e.target.playVideo();
        },
        'onStateChange': (e) => {
          if (e.target.getPlayerState() === 1) {
            console.log('video 再生中');
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
    // },
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