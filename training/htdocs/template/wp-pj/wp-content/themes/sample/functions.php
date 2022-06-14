<?php 

/**
 * 定数
 */
// ディレクトリパス
define('TEMPLATE_DIR', get_template_directory_uri().'/');
// アセット
define('ASSETS_DIR', get_template_directory_uri().'/assets/');


/**
 * クエリパラメータにタイムスタンプ付きのファイル出力
 */
function add_timestamp($file_path) {
  date_default_timezone_set('Asia/Tokyo');
  return TEMPLATE_DIR . $file_path . '?' . date('Ymdhi', filemtime(get_theme_file_path($file_path)));
}


/**
 * bodyタグ向けにid属性を整理
 */
function body_id() {
  // ページタイプを追加していく
  if ( is_front_page() ) {
    $id = 'top';
  }

  echo $id;
}


/**
 * ページタイプをクラス名向けの文字列として整理
 */
function page_class() {
  $class_name = array();

  // ページタイプを追加していく
  if ( is_front_page() ) {
    $class_name[] = 'add-top';
  }

  echo implode(' ', $class_name);
}


/**
 * pタグとbrタグの自動挿入を解除
 */
remove_filter('the_content', 'wpautop');


/**
 * URLスラッグの自動生成
 */
function auto_post_slug( $slug, $post_ID, $post_status, $post_type ) {
  if ( preg_match( '/(%[0-9a-f]{2})+/', $slug ) ) {
    $slug = utf8_uri_encode( 'post' ) . '-' . $post_ID;
  }
  return $slug;
}
add_filter( 'wp_unique_post_slug', 'auto_post_slug', 10, 4 );