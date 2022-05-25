<?php get_header() ?>

<main class="script01">
  <div id="js-mouseStalker" class="mouseStalker">
    <div class="mouseStalker_icon"></div>
  </div>

  <!-- ローカルナビ -->
  <nav id="js-lpc-navigation" class="lpc-navigation">
    <ul class="lpc-navigation_list">
      <li class="lpc-navigation_listItem is-active"><a href="#drumroll">ドラムロール</a></li>
      <li class="lpc-navigation_listItem"><a href="#modal">モーダル</a></li>
      <li class="lpc-navigation_listItem"><a href="#iframe">iframe API</a></li>
      <li class="lpc-navigation_listItem"><a href="#crossfade">crossfade</a></li>
    </ul>
  </nav>

  <h1 class="lpc-fade mod-textParent">
    <span class="lpc-fade mod-textChild">サンプルページ</span>
  </h1>

  <br>
  <button id="js-scrollLock">スクロールロック</button>
  <button id="js-scrollUnLock">スクロールアンロック</button>
  <ul>
    <li>
      <button id="js-scrollLock_modalBtn">モーダル スクロールロック</button>
      <div id="js-scrollLock_modal" class="lpc-modal">
        <div class="lpc-modal_container">
          <button class="lpc-modal_close"></button>
          <div class="lpc-modal_content" style="display: block;">
            <p>サンプルテキスト</p>
            <figure class="mod-noModalClose">
              <img src="https://placehold.jp/1000x2700.png" alt="">
            </figure>
          </div>
        </div>
      </div>
    </li>
  </ul>

  <!-- React -->
  <br>
  <button id="js-root">アコーディオンのボタン</button>
  <div id="root"></div>

  <!-- ドラムロール -->
  <div id="drumroll">
    <div id="js-drumroll" class="drumroll"></div>
  </div>

  <!-- モーダル -->
  <ul id="modal" class="modaltest js-lpc-navigation_area mod-inView js-inView">
    <li>
      <a href="" class="lpc-mask js-lpc-modal_trigger"><span class="lpc-mask_inner"><span
            class="lpc-mask_text">モーダルボタン1</span></span></a>
      <div class="lpc-modal js-lpc-modal">
        <div class="lpc-modal_container">
          <button class="lpc-modal_close "></button>
          <div class="lpc-modal_content">
            <iframe width="100%" height="100%" src="https://www.youtube.com/embed/wKkvbuLhEns"
              title="YouTube video player" frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen></iframe>
          </div>
        </div>
      </div>
    </li>
    <li>
      <a href="" class="lpc-mask js-lpc-modal_trigger"><span class="lpc-mask_inner"><span
            class="lpc-mask_text">モーダルボタン2</span></span></a>
      <div class="lpc-modal js-lpc-modal mod-modal2">
        <div class="lpc-modal_container">
          <button class="lpc-modal_close "></button>
          <div class="lpc-modal_content">
            <iframe width="100%" height="100%" src="https://www.youtube.com/embed/HcdzNHCwluM"
              title="YouTube video player" frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen></iframe>
          </div>
        </div>
      </div>
    </li>
    <li>
      <a href="" class="js-lpc-modal_trigger"><span class="lpc-mask_inner"><span
            class="lpc-mask_text">モーダルボタン3</span></span></a>
      <div class="lpc-modal js-lpc-modal">
        <div class="lpc-modal_container">
          <button class="lpc-modal_close "></button>
          <div class="lpc-modal_content">
            <iframe width="100%" height="100%" src="https://www.youtube.com/embed/DuU2PQacRkI"
              title="YouTube video player" frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen></iframe>
          </div>
        </div>
      </div>
    </li>
    <li>
      <a href="" class="js-lpc-modal_trigger2">モーダルボタン4</a>
      <div class="lpc-modal js-lpc-modal2 mod-modal2">
        <div class="lpc-modal_container">
          <button class="lpc-modal_close "></button>
          <div class="lpc-modal_content">
            <div>
              <figure class="mod-noModalClose">
                <img src="https://placehold.jp/1500x450.png" alt="">
              </figure>
              <button class="lp-button">閉じる</button>
              <button class="mod-noModalClose mod-test">閉じない</button>
            </div>
          </div>
        </div>
      </div>
    </li>
    <li>
      <a href="" class="js-lpc-modal_trigger2">モーダルボタン5</a>
      <div class="lpc-modal js-lpc-modal2 mod-modal3">
        <div class="lpc-modal_container">
          <button class="lpc-modal_close"></button>
          <div class="lpc-modal_content">
            <div>
              <div class="mod-sample">
                <img src="https://placehold.jp/1000x2450.png" alt="">
              </div>
              <span class="lp-button mod-test">閉じる</span>
              <a href="/">閉じない</a>
            </div>
          </div>
        </div>
      </div>
    </li>
    <li>
      <a id="js-lpc-modal_trigger3" href="" class="">モーダルボタン6 ID</a>
      <div id="js-modal3" class="lpc-modal">
        <div class="lpc-modal_container">
          <button class="lpc-modal_close"></button>
          <div class="lpc-modal_content">
            <div id="js-player3"></div>
          </div>
        </div>
      </div>
    </li>
  </ul>
  <!-- /モーダル -->

  <!-- iframe API -->
  <div id="iframe" class="js-lpc-navigation_area">
    <div class="">
      <div id="js-player1"></div>
    </div>
    <div class="">
      <div id="js-player2"></div>
    </div>
    <div class="">
      <div id="js-player"></div>
    </div>
  </div>
  <!-- /iframe API -->

  <!-- crossFade -->
  <div id="crossfade" class="crossFade js-lpc-navigation_area">
    <div class="lpc-crossFade js-crossFade">
      <img class="lpc-crossFade_item js-crossFade_item" src="https://placehold.jp/1001x450.png" alt="">
      <img class="lpc-crossFade_item js-crossFade_item" src="https://placehold.jp/1002x450.png" alt="">
      <img class="lpc-crossFade_item js-crossFade_item" src="https://placehold.jp/1003x450.png" alt="">
      <img class="lpc-crossFade_item js-crossFade_item" src="https://placehold.jp/1004x450.png" alt="">
      <img class="lpc-crossFade_item js-crossFade_item" src="https://placehold.jp/1005x450.png" alt="">
      <img class="lpc-crossFade_item js-crossFade_item" src="https://placehold.jp/1006x450.png" alt="">
    </div>
  </div>
  <!-- /crossFade -->

</main>

<?php get_footer() ?>