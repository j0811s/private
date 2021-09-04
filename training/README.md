# operation-training

### gulpタスク 実行コマンド
```
npm start ： 作業ファイルの変更監視とブラウザシンクを実行する
npm run build ： 作業ファイルのビルドのみ実行する場合  
npm run server ： ブラウザシンクのみ実行する場合  
npm run json ： 各jsonファイルをindex.jsonに結合する  

※「operation-training/resources」でコマンド実行
```

----

### 準備
1. リポジトリをクローンする。  
`cd ~`  
`git clone git@github.com:qcoltd/operation-training.git`  
2. 以下のnodeバージョンをインストールする。  
`nvm i v16.5.0`  
3. 作業ブランチを作成してチェックアウトする。  
4. `resources`に移動して、必要なものを導入する。  
`cd operation-training/resources`  
`npm ci`  
5. `src`内にある`template`をコピーして、各フォルダをリネームする。  
`src/murata/`  
`src/murata/kaneka/`
6. `resources`にある`_project.js`をコピーして、`project.js`として新規作成する。  
`project.js`を開き、中に書いてある設定を自分用に変更する。  
```javascript
module.exports = {
  rootDir: 'murata', //各員の名前フォルダ
  projectDir: 'kaneka', //名前フォルダの配下にある課題フォルダ
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
```
7. コーディングを開始する。  
```
初回はdist内にファイルが何もなくブラウザシンクを実行しても何も表示されないため、  
各種ファイルをビルドコマンドで生成する必要あり。  
生成されたファイルは、srcディレクトリの構成でdistディレクトリ内に保存される。 
不要なファイルが混ざっていないか整理しておく。  
``` 
8. masterにマージをすると、以下のようなURLで表示可能。    
[https://qcoltd.github.io/operation-training/dist/template/kadai/](https://qcoltd.github.io/operation-training/dist/template/kadai/)

----

### 各種フォルダとファイル
以下の基本構成を利用してください。  

```
//CSS
assets/org/sass/common/ : mixinや変数などのスタイルシート格納
assets/org/sass/lib/ : プラグイン等のスタイルシート格納
assets/org/sass/_style.scss : ページ本体のスタイルを記述
assets/org/sass/index.scss : 上記のスタイルシートをまとめる
```

```
//JS
assets/org/js/lib/ : プラグイン等のファイル格納
assets/org/js/index.js : ページ本体のスクリプトを記述
```

```
//EJS
templates/index.ejs : index.htmlの元ファイル
templates/includes/_const.ejs : headタグで定数化できる要素
templates/includes/_head.ejs : <!DOCTYPE html> ~ <body>開始タグの内容
templates/includes/_header.ejs : body開始タグの下に挿入する内容(index.ejs コンテンツの真上)
templates/includes/_foot.ejs : </body> ~ </html>の内容
templates/includes/_footer.ejs : body終了タグの上に挿入する内容(index.ejs コンテンツの真下)
templates/json/index.json : ejsで扱うJSONファイル（ファイルを分けた場合はコマンドで結合）
```

```
//その他
assets/images/ : 画像を格納
assets/video/ : 動画を格納
```

----

### JSプラグイン
一部のプラグイン・ポリフィルはnpmで導入しています。  
以下のようなインポート文('npms/~')で利用可能です。  
プラグインのスタイルシートは`src/template/kadai/assets/org/sass/lib/`に格納してあります。
```javascript
import 'npms/slick-carousel';
import 'npms/magnific-popup';
import Swiper from 'npms/swiper'
import 'npms/picturefill';
import 'npms/objectFitPolyfill';
```