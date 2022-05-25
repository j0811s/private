<?php 

/* ディレクトリパス */
define('TEMPLATE_DIR', get_template_directory_uri().'/');

/* クエリパラメータにタイムスタンプ付きのファイル出力 */
function add_timestamp($file_path) {
  date_default_timezone_set('Asia/Tokyo');
  return TEMPLATE_DIR . $file_path . '?' . date('Ymdhi', filemtime(get_theme_file_path($file_path)));
}

?>