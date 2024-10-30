<?php


function mong9editor_parser() {

	#add_rewrite_rule( '^mong9-editor/([^/]+)/?','index.php?mong9_action=$matches[1]', 'top' );

	add_filter( 'query_vars', 'mong9editor_query_vars' );

	add_action( 'parse_request', 'mong9editor_parse_request' );

	// Ajax List
	add_action( 'wp_ajax_get_example', 'mong9editor_ajax_callback_get_block' );

	add_action( 'wp_ajax_mong9_editor_upload_image', 'mong9editor_ajax_callback_upload_image' );

	$current_file = wp_basename($_SERVER['SCRIPT_FILENAME']);

	if ($current_file == 'post-new.php' || ($current_file == 'post.php' && $_GET['action'] == 'edit')) {

		require_once(MONG9_EDITOR__PLUGIN_DIR.'includes/in-post.php');

	}

}


function mong9editor_query_vars( $query_vars ) {
    $query_vars[] .= 'mong9_action';
    return $query_vars;
}


function mong9editor_parse_request( &$wp ) {

	if ( array_key_exists( 'mong9_action', $wp->query_vars ) ) {

		if( current_user_can( 'administrator' ) ){ // in admin mode

			$mong9_action = $wp->query_vars['mong9_action'];

			if (file_exists(MONG9_EDITOR__PLUGIN_DIR .'includes/'. $mong9_action .'.php')) {

				include MONG9_EDITOR__PLUGIN_DIR .'includes/'. $mong9_action .'.php';
				$func = 'mong9editor_' . $mong9_action;
				$func();
				exit();

			} else {

				die( __('Security check failed.') );
				exit();

			}

		}

    }

    return;

}


// get block in mong9 editor(Ajax)
function mong9editor_ajax_callback_get_block() {

	if ( ! current_user_can( 'administrator' ) ) {
		return false;
	}

	mong9_nonce_check('mong9_editor_block_nonce',$_REQUEST['nonce']);

	echo file_get_contents($_REQUEST['example_html']);
	wp_die();

}


// Upload Image File(Ajax)
function mong9editor_ajax_callback_upload_image() {

	require_once(MONG9_EDITOR__PLUGIN_DIR.'includes/image-upload.php');
	mong9editor_image_upload();

}


// get video url in mong9 editor
add_action( 'wp_ajax_get_video_url', 'mong9editor_ajax_callback_get_video_url' );

function mong9editor_ajax_callback_get_video_url() {

	mong9_nonce_check('mong9_editor_video_nonce',$_REQUEST['nonce']);

	require_once(MONG9_EDITOR__PLUGIN_DIR.'includes/embed_check.php');

	$video_info = get_embed_info($_REQUEST['video']);

	echo $video_info['url'];

	wp_die();

}


// print ajax message
function print_mong9_msg($msg = '') {
	echo $msg;
	exit;	
}


// Check nonce
function mong9_nonce_check($_handle,$value = '') {

	if ( ! wp_verify_nonce( $value, $_handle ) ) {
		die( __('Security check failed.') );
	}

}


?>