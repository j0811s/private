/**
 * ネストされたプロパティアクセス（Node.js v14未満対策）
 * @param  {Object} object オブジェクト本体
 * @param  {String} path プロパティまでのパス
 * @param  {*} defaultPath pathが見つからなかった際の代替値
 */
const get = (object, path, defaultPath = undefined) => {
  let lookup = Object.assign({}, object);
  const keys = path.split('.');

  for (let key of keys) {
    lookup = lookup[key] != null ? lookup[key] : defaultPath;
  }

  return lookup;
}

module.exports = get;