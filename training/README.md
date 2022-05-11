# training

### gulpタスク
```
~/private/training/resources/wacth.sh： 作業ファイルの監視とブラウザシンク実行  
~/private/training/resources/build.sh： 作業ファイルのビルド実行  
~/private/training/resources/server.sh： ブラウザシンクのみ実行  
```

----

### Docker
```
~/private/training/start.sh： コンテナー起動  
~/private/training/restart.sh： コンテナー再起動  
~/private/training/stop.sh： コンテナー停止  
```

----

### 準備
1. リポジトリをクローンする。  
`cd ~`  
`git clone git@github.com:j0811s/private.git`  
2. 以下のnodeバージョンをインストールする。  
`nvm i v16.5.0`  
3. 作業ブランチを作成してチェックアウトする。  
4. `resources`に移動して、必要なものを導入する。  
`cd ~/private/training/resources/`  
`npm ci`  
5. `src`内にある`template`をコピーして、各フォルダをリネームする。  
6. `resources`にある`_project.js`をコピーして、`project.js`として複製・編集する。  
7. `_.env`をコピーして、`.env`として複製・編集する。  