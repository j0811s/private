// 作業者の設定項目
module.exports = {
  rootDir: 'template', //各員の名前フォルダ
  projectDir: 'kadai', //名前フォルダの配下にある課題フォルダ
  browserSync: {
    port: '8081', //ブラウザシンク時のポート番号
  },
  use: {
    ejs: true, //EJSの有無（true, false）
    jQuery: true, //jQueryの有無（true, false）
    imagemin: {
      jpg: 80, //JPEG画質（Number, false）
      png: [.70, .80] //PNG画質（Array, false）
    }
  }
}