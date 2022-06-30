# ScrollSnap

## HTML

### Base

```html
<main id="js-scrollSnap">
  <section>
    <h1>セクション1</h1>
  </section>
  <section>
    <h1>セクション2</h1>
  </section>
  ...
</main>
```

### Navigation

```html
<nav id="js-ssNavigation">
  <ul>
    <li>
      <a href="#"></a>
    </li>
    <li>
      <a href="#"></a>
    </li>
    ...
  </ul>
</nav>
<main id="js-scrollSnap">
  <section>
    <h1>セクション1</h1>
  </section>
  <section>
    <h1>セクション2</h1>
  </section>
  ...
</main>
```

## import

```js
import ScrollSnap from '_ScrollSnap';
```

## Initialization

### Default

```js
const scrollSnap = new ScrollSnap('js-scrollSnap', {
  init: true,
  ignoreClassName: 'js-ssIgnore',
  animation: {
    duration: 500,
    interval: 1000,
    ease: 'ease-in-out',
    type: 'normal'
  },
  navigation: {
    container: 'js-ssNavigation',
    anchors: null
  }
});
```

## Options

- `init`: (default `true`)  
  初期化時にスクロール系のイベント自動登録。
- `ignoreClassName`: (default `'js-ssIgnore'`)  
  セクションコンテンツをウィンドウの高さに合わせない。
- `duration`: (default `500`)  
  セクションのスライド速度。
- `interval`: (default `500`)  
  次のスライドまでの間隔。
- `ease`: (default `'ease'`)  
  スライドの CSS イージング。
- `type`: (default `'normal'`)  
  `'card'`でセクションを重ねがけにする。
- `container`: (default `'js-ssNavigation'`)  
  ナビゲーションの親要素につける id 属性名
- `anchors`: (default `null`)  
  URL ハッシュに使う文字をセクションの数だけ配列で指定。
