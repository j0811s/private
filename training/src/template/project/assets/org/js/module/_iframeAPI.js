import { extend } from './_util';

// https://developers.google.com/youtube/player_parameters?hl=ja
export class Youtube {
  constructor(config) {
    // 設定
    this.config = {
      ytData: [
        {
          playerId: '', // 動画を追加する要素のid名
          videoId: '' // 動画のIDパラメータ
        }
      ],
      // 複数の動画設定が共通であれば、parameterの中身は一つだけでも可
      parameter: [
        {
          playerVars: {
            // iframe APIのオプション
            // 'playlist': 'videoId' と指定すれば、ytData.videoIdと同じものが入る
          },
          events: {
            // iframe APIのコールバック関数
          }
        }
      ]
    }
    extend(this.config, config);

    // script挿入
    this.insertIframeAPI();

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

  /** 
   * パラメータ配列の中身が1つだけか真偽値で返す
   * 1つならすべての動画で設定を使い回す想定。
   */
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
    window.addEventListener('load', () => this.onYouTubeIframeAPIReady());
  }
}