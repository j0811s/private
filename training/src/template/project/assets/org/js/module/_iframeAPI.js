import { extend } from './_util';

// https://developers.google.com/youtube/player_parameters?hl=ja
export class Youtube {
  constructor(config) {
    // 設定
    this.config = {
      ytData: [
        {
          playerId: 'js-player', // 動画を追加する要素のid名
          videoId: 'ONPO3K33t-Q' // 動画のIDパラメータ
        }
      ],
      // 設定を使い回すのであれば、配列の中身は一つだけでも可
      parameter: [
        {
          playerVars: {
            // iframe APIのオプション（デフォルトは自動再生を指定）
            'autoplay': 1,
            'mute': 1,
            'controls': 1,
            'loop': 1,
            'playlist': 'videoId', //'videoId' と指定すれば、ytData.videoIdと同じものが入るようにしている
            'rel': 0,
            'playsinline': 1
          },
          events: {
            // iframe APIのコールバック関数
            'onReady': (e) => { 
              e.target.mute();
              e.target.playVideo();
            }
          }
        }
      ]
    }
    extend(this.config, config);

    // Youtube情報
    this.player = [];
    this.ytData = this.config.ytData;
    this.parameter = this.config.parameter;

    // 実行
    this.execute();
  }

  /** iframeAPIのscriptタグをheadタグに挿入 */
  insertIframeAPI() {
    const scriptTag = document.createElement('script');
    scriptTag.src = 'https://www.youtube.com/iframe_api';
    document.getElementsByTagName('head')[0].appendChild(scriptTag);
  }

  /** パラメータ配列の中身が1つだけか真偽値で返す */
  isOnlyOneParam() {
    return this.parameter.length === 1;
  }

  /** 指定動画を各id要素に追加 */
  onYouTubeIframeAPIReady() {
    this.ytData.forEach((yt, i) => {
      // パラメータの数によってindexを決める
      const paramIndex = this.isOnlyOneParam() ? 0 : i;
      if (this.parameter[paramIndex] === undefined) return
      
      // playlistの値が'videoId'なら、ytDataのvideoIdを使う
      const playerVars = JSON.parse(JSON.stringify(this.parameter[paramIndex].playerVars)); //deepcopy
      if (playerVars.playlist === 'videoId') {
        playerVars.playlist = this.ytData[i].videoId;
      }

      // プレイヤー設定
      this.player[i] = new YT.Player(yt.playerId, {
        videoId: yt.videoId,
        playerVars,
        events: this.parameter[paramIndex].events
      });
    });
  }

  /** 実行 */
  execute() {
    this.insertIframeAPI();
    window.addEventListener('load', () => this.onYouTubeIframeAPIReady());
  }
}