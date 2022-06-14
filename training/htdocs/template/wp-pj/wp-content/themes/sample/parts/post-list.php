<?php
// 投稿タイプ名
$post_name = $args;

$paged = get_query_var( 'paged' ) ? get_query_var( 'paged' ) : 1;
$post_args = array(
  'post_type' => $post_name,
  'posts_per_page' => is_front_page() ? 3 : 10,
  'order' => 'DESC',
  // 'paged' => $paged
);

$the_query = new WP_Query( $post_args );

if ( $the_query->have_posts() ):
  while ( $the_query->have_posts() ): 
    $the_query->the_post();
?>

<a id="post-<?php the_ID(); ?>" class="util-archive_link" href="<?php the_permalink(); ?>">
  <archive class="util-archive">
    <?php if ( is_front_page() ): ?>
    <h3 class="util-archive_ttl"><?php the_title(); ?></h3>
    <?php else: ?>
    <h2 class="util-archive_ttl"><?php the_title(); ?></h2>
    <?php endif; ?>
  </archive>
</a>

<?php endwhile; else: ?>

<p class="util-archive mod-null">記事がありません。</p>

<?php endif; wp_reset_postdata(); ?>