<?php
	$innholdsbygger = get_field( 'innholdsbygger' );
	if ( function_exists ( 'get_row_layout' ) && !empty( $innholdsbygger ) ) :

		echo get_innhold( $innholdsbygger, get_the_ID() );

	else :
?>

	<div class="ramme">
		<?php the_content(); ?>
	</div>

<?php
	endif;
?>


<?php 



function get_innhold ( $innholdsbygger, $id ) {
	
	$transient = get_transient( sanitize_key( 'innholdsbygger-'.$id ) );
	if ( !is_user_logged_in() && $transient ) {
		return $transient;
	}	
	
	
	global $innholdsbygger_teller;
	$innholdsbygger_teller = 1;
	
	ob_start();
	while ( has_sub_field( 'innholdsbygger' ) ) {
		get_template_part( 'innholdsbygger', get_row_layout() );
		$innholdsbygger_teller++;
	}
	$innholdet =  ob_get_clean();
	
	if ( !is_user_logged_in() ) {
		set_transient( sanitize_key( 'innholdsbygger-'.$id ), $innholdet, HOUR_IN_SECONDS );
	}
	return $innholdet;
	
}

?>