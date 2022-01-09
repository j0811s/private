/** UserAgent */
const ua = navigator.userAgent.toLowerCase();
export const userAgent = {
  isMobile: ua.match(/iPhone|Android.+Mobile/),
  isiOS: ua.indexOf('iphone') > -1 || ua.indexOf('ipad') > -1 || ua.indexOf('macintosh') > -1 && 'ontouchend' in document
}

/** タッチデバイス */
export const isToucheDevice = () => window.ontouchstart !== undefined && 0 < navigator.maxTouchPoints;
export const getDeviceEvent = () => {
  return {
    touchstart: isToucheDevice() ? 'touchstart' : 'mousedown',
    touchmove: isToucheDevice() ? 'touchmove' : 'mousemove',
    touchend: isToucheDevice() ? 'touchend' : 'mouseup'
  }
}

/** 配列風に変換してforEach */
export const nodeEach = (nodeList, callback) => {
  [].slice.call(nodeList).forEach(callback);
}


/** 要素がHTMLCollectionか真偽値を返す */
export const isHTMLCollection = (element) => Object.prototype.toString.call(element) === "[object HTMLCollection]"


/** オブジェクトの中身が空っぽか真偽値を返す */
export const isEmpty = (object) => {
  return !Object.keys(object).length;
}


/** 指定した種類か真偽値で返す */
export const isType = (target, type = Array) => {
  return target instanceof type
}


/** プロパティを上書き */
export const extend = (dest, src) => {
  for (const property in src) {
    dest[property] = src[property]
  }

  return dest
}


/**
 * メディアクエリ
 * @param  {string} config.query '(min-width: 960px)'
 * @param  {function} config.callback (matches) => { matches ? 'PC' : 'SP' }
 */
export const mediaQuery = (config) => {
  const mq = window.matchMedia(`${config.query}`);
  const callback = config.callback;

  // ブレークポイント判定のe.matchesを引数に持たせる
  const matcheEvent = e => callback(e.matches);
  // ブレークポイントで実行
  mq.addListener(matcheEvent);
  // 初回読み込みの実行
  callback(mq.matches);
}