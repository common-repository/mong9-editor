<?php

function mong9editor_image_upload() {

	if ( ! current_user_can( 'administrator' ) ) {
		return false;
	}

	$nonce = $_REQUEST['nonce'];
	if ( ! wp_verify_nonce( $nonce, 'mong9_editor_upload_nonce' ) ) {
		print_mong9_msg("error|". __('Upload failed.') ."||");	
	}

	if ( empty( $_FILES ) ){
		print_mong9_msg("error|". __('Upload failed.xxx') ."||");	
	}

	define('ALLOW_UNFILTERED_UPLOADS', true);

	if ( ! function_exists( 'wp_handle_upload' ) ) {
		require_once( ABSPATH . 'wp-admin/includes/file.php' );
	}

	if ( ! function_exists( 'mime_content_type' ) ) {
		require_once( MONG9_EDITOR__PLUGIN_DIR . 'includes/filters.php' );
	}

	$wordpress_upload_dir = wp_upload_dir();
	// $wordpress_upload_dir['path'] is the full server path to wp-content/uploads/2017/05, for multisite works good as well
	// $wordpress_upload_dir['url'] the absolute URL to the same folder, actually we do not need it, just to show the link to file
	$i = 1; // number of tries when the file with the same name is already exists

	$profilepicture = $_FILES['img_upload_file'];

	$profilepicture['name'] = sanitize_file_name($profilepicture['name']);

	$new_file_path = $wordpress_upload_dir['path'] . '/' . $profilepicture['name'];
	$new_file_mime = mime_content_type( $profilepicture['tmp_name'] );
	 
	if( empty( $profilepicture ) ) {
		//die( 'File is not selected.' );
		print_mong9_msg("error|". __('This file is empty. Please try another.') ."||");
	}
	 
	if( $profilepicture['error'] ) {
		print_mong9_msg("error|".$profilepicture."['error']||");
	}
	 
	if( $profilepicture['size'] > wp_max_upload_size() ) {
		print_mong9_msg("error|". sprintf(__('This file is too big. Files must be less than %s KB in size.'),wp_max_upload_size()) ."||");	
	}

	if( !in_array( $new_file_mime, get_allowed_mime_types() ) ) {
		print_mong9_msg("error|". __('Sorry, you are not allowed to upload media on this site.') ."||");		
	}
	 
	while( file_exists( $new_file_path ) ) {
		$i++;
		$new_file_path = $wordpress_upload_dir['path'] . '/' . $i . '_' . $profilepicture['name'];
	}
	 
	// looks like everything is OK
	if( move_uploaded_file( $profilepicture['tmp_name'], $new_file_path ) ) {
	 
		$upload_id = wp_insert_attachment( array(
			'guid'           => $new_file_path, 
			'post_mime_type' => $new_file_mime,
			'post_title'     => preg_replace( '/\.[^.]+$/', '', $profilepicture['name'] ),
			'post_content'   => '',
			'post_status'    => 'inherit'
		), $new_file_path );
	 
		// wp_generate_attachment_metadata() won't work if you do not include this file
		require_once( ABSPATH . 'wp-admin/includes/image.php' );
	 
		// Generate and save the attachment metas into the database
		wp_update_attachment_metadata( $upload_id, wp_generate_attachment_metadata( $upload_id, $new_file_path ) );
	 
		// Show the uploaded file in browser
		print_mong9_msg("|".basename( $new_file_path )."|".$wordpress_upload_dir['url']."|".$wordpress_upload_dir['url']);
	}

	print_mong9_msg("error|". __('Upload failed.') ."||");	

}

?>