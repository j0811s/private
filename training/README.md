# Readme

### gulpタスク
```
~/private/training/resources/watch.sh
~/private/training/resources/build.sh
~/private/training/resources/server.sh
```

----

### Docker
```
~/private/training/start.sh
~/private/training/restart.sh
~/private/training/stop.sh
```

----

### 準備
1. リポジトリをcloneする。  
```
cd ~
```
```
git clone git@github.com:j0811s/private.git
```
2. 以下のnodeバージョンをインストールする。  
```
nvm i v16.5.0
```
3. 以下のシェルスクリプトを実行して、必要なファイルを生成する。  
```
~/private/training/setup.sh`
```
4. パッケージをインストールする。  
```
cd ~/private/training/resources/
```
```
npm ci
```
5. resourcesフォルダ内にある`_project.js`をコピーして、`project.js`を作成・編集する。  