<?php get_header() ?>

<main class="top">
  <h1 class="top-ttl">テンプレート</h1>

  <!-- top-archive -->
  <div class="top-archive">
    <h2 class="top-archive_ttl">お知らせ</h2>
    <?php get_template_part('parts/post-list', null, ''); ?>
  </div>

  <div class="top-archive">
    <h2 class="top-archive_ttl">ブログ</h2>
    <?php get_template_part('parts/post-list', null, 'blog'); ?>
  </div>

  <!-- top-wordList -->
  <div id="js-mouseStalker" class="mouseStalker">
    <div class="mouseStalker_icon"></div>
  </div>
  <dl id="js-mouseStalkerArea" class="top-wordList">
    <div class="top-wordList_container">
      <dt class="js-accordionBtn">
        <button type="button">用語1</button>
      </dt>
      <dd id="js-readtext0" class="top-wordList_readtext">説明テキスト説明テキスト<br>説明テキスト説明テキスト<br>説明テキスト説明テキスト<br>説明テキスト説明テキスト<br>説明テキスト説明テキスト<br>説明テキスト説明テキスト<br>説明テキスト説明テキスト<br>説明テキスト説明テキスト<br>説明テキスト説明テキスト<br></dd>
    </div>
    <div class="top-wordList_container">
      <dt class="js-accordionBtn">
        <button type="button">用語2</button>
      </dt>
      <dd id="js-readtext1" class="top-wordList_readtext">説明テキスト説明テキスト<br>説明テキスト説明テキスト説明テキスト説明テキスト<br>説明テキスト説明テキスト<br>説明テキスト説明テキスト<br>説明テキスト説明テキスト<br>説明テキスト説明テキスト<br>説明テキスト説明テキスト<br>説明テキスト説明テキスト<br>説明テキスト説明テキスト<br>説明テキスト説明テキスト<br></dd>
    </div>
    <div class="top-wordList_container">
      <dt class="js-accordionBtn">
        <button type="button">用語3</button>
      </dt>
      <dd id="js-readtext2" class="top-wordList_readtext">説明テキスト説明テキスト<br>説明テキスト説明テキスト説明テキスト説明テキスト<br>説明テキスト説明テキスト<br>説明テキスト説明テキスト<br>説明テキスト説明テキスト<br>説明テキスト説明テキスト<br>説明テキスト説明テキスト<br>説明テキスト説明テキスト<br>説明テキスト説明テキスト<br>説明テキスト説明テキスト<br></dd>
    </div>
    <div class="top-wordList_container">
      <dt class="js-accordionBtn">
        <button type="button">用語4</button>
      </dt>
      <dd id="js-readtext3" class="top-wordList_readtext">説明テキスト説明テキスト<br>説明テキスト説明テキスト説明テキスト説明テキスト<br>説明テキスト説明テキスト<br>説明テキスト説明テキスト<br>説明テキスト説明テキスト<br>説明テキスト説明テキスト<br>説明テキスト説明テキスト<br>説明テキスト説明テキスト<br>説明テキスト説明テキスト<br>説明テキスト説明テキスト<br></dd>
    </div>
  </dl>

</main>

<?php get_footer() ?>