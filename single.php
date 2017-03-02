<?php the_post(); ?>
<?php get_header(); ?>

	<main role="main" id="main-content" class="main-content-wrap">

		<div class="wrapper">

			<article id="post-id-<?php the_id(); ?>" <?php post_class( 'clearfix' ); ?>>
				<h1><?php the_title(); ?></h1>
				<?php the_content(); ?>
			</article>

			<?php get_sidebar(); ?>

		</div>

	</main>

<?php get_footer(); ?>
