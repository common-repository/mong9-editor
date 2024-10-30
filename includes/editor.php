<?php

function mong9editor_editor() {

	if ( ! current_user_can( 'administrator' ) ) {
		return false;
	}

	mong9_nonce_check('mong9_editor_window_nonce',$_REQUEST['nonce']);

	mong9editor_enqueue_int();

	wp_enqueue_code_editor(array( 'type' => 'text/html'));

	wp_enqueue_script('mong9editor-utils',MONG9_EDITOR__PLUGIN_URL.'javascript/mong9-utils.js');
	wp_localize_script( 'mong9editor-utils', 'mong9_ajax_block', array( 'ajax_url' => admin_url( 'admin-ajax.php' ), 'nonce' => wp_create_nonce('mong9_editor_block_nonce') ) );
	wp_localize_script( 'mong9editor-utils', 'mong9_ajax_upload', array( 'ajax_url' => admin_url( 'admin-ajax.php' ), 'nonce' => wp_create_nonce('mong9_editor_upload_nonce') ) );
	wp_localize_script( 'mong9editor-utils', 'mong9_ajax_video', array( 'ajax_url' => admin_url( 'admin-ajax.php' ), 'nonce' => wp_create_nonce('mong9_editor_video_nonce') ) );

	$example_url = urlencode(MONG9_EDITOR__PLUGIN_DIR .'example.html');
	$error_msg = __('Security error.');

$inline_script = <<<END
_SET["mobile_ok"] = 0;
_SET["block_ajax_url"] = mong9_ajax_block.ajax_url +'?action=get_example&nonce=' + mong9_ajax_block.nonce +'&example_html=$example_url';
_SET["upload_ajax_url"] = mong9_ajax_upload.ajax_url +'?action=mong9_editor_upload_image&nonce=' + mong9_ajax_upload.nonce +'&uploadform_id=img_upload_file&check_file_num_img_upload_file=limit&check_file_size_img_upload_file=limit&form_type_img_upload_file=image';
_SET["video_ajax_url"] = mong9_ajax_video.ajax_url +'?action=get_video_url&nonce=' + mong9_ajax_video.nonce;

function send_parent_editor(editor_id) {
	from_mong9_editor_to_classic_editor(editor_id);
	window.close();
}

function from_mong9_editor_to_classic_editor(editor_id) {
	var editor_value = m9_editor.get_value(editor_id);	
	window.opener.m9_editor_in(editor_id,editor_value);
}

function set_m9editor(_id) {

	var ok = 1;

	if (jQuery(opener).length > 0) {
		var _html = '<div class="m9editor-layout">' + '<textarea id="'+ _id + '" name="'+ _id + '" class="m9_editor_box" style="width:100%;height:600px;overflow:auto" alt_no="1"></textarea>' + '</div>';
		jQuery('body').append(_html);
		jQuery('#'+_id).val(jQuery(opener.document).find('#'+_id).val());
	} else {
		var _html = '<div class="m9editor-layout center">' + '$error_msg' + '</div>';
		jQuery('body').append(_html);
		ok = 0;
	}

	return ok;

}

jQuery(function() {

	var _id = getUrlParameter('editor_id');
	var ok = set_m9editor(_id);

	if (ok) {

		m9_editor.int(_id,{
			'example_html' : _SET["block_ajax_url"],
			'type' : 'master',
			'upload_url' : _SET["upload_ajax_url"],
			'img_max_width' : 1000
		});	

		animate_document();

		wp.codeEditor.initialize(_id);
		wp.codeEditor.initialize("builder_html_textarea");
		wp.codeEditor.initialize("column_html_textarea");

	}
	
});	

END;

	wp_add_inline_script('mong9editor-utils',$inline_script);

	wp_enqueue_script('mong9editor-layer-func2',MONG9_EDITOR__PLUGIN_URL.'javascript/layer-func2.js');
	wp_enqueue_script('mong9editor-m9ani',MONG9_EDITOR__PLUGIN_URL.'javascript/m9ani.js');
	wp_enqueue_script('mong9editor-m9tab',MONG9_EDITOR__PLUGIN_URL.'javascript/m9tab.js');

	wp_enqueue_script('webtoolkit-aim',MONG9_EDITOR__PLUGIN_URL.'javascript/etc/webtoolkit.aim.js',array( 'jquery-ui-core', 'jquery-ui-widget', 'jquery-ui-mouse', 'jquery-ui-slider', 'jquery-ui-sortable','jquery-ui-droppable','jquery-ui-selectable','jquery-ui-resizable' ));

	wp_enqueue_style('jquery-ui',MONG9_EDITOR__PLUGIN_URL.'etc/jquery-ui.min.css');

	wp_enqueue_script('minicolors',MONG9_EDITOR__PLUGIN_URL.'etc/minicolors/jquery.minicolors.min.js');
	wp_enqueue_style('minicolors',MONG9_EDITOR__PLUGIN_URL.'etc/minicolors/jquery.minicolors.css');

	wp_enqueue_script('mong9editor-input-value-check',MONG9_EDITOR__PLUGIN_URL.'javascript/etc/input-value-check.js');

	$lang = get_mong9_language();
	wp_enqueue_script('mong9editor-lang',MONG9_EDITOR__PLUGIN_URL.'javascript/langs/'.$lang.'.js');

	$font_family = get_mong9_font_family();
	wp_enqueue_script('mong9editor-font-family',MONG9_EDITOR__PLUGIN_URL.'javascript/font-family/font_'.$font_family.'.js');

	wp_enqueue_script('mong9editor-mode-obj',MONG9_EDITOR__PLUGIN_URL.'javascript/editor/mode-obj.js');

	$js_list = array('ani-type-obj','editor-function','element-obj','edit-etc','edit-etc2','m9-editor','edit','edit-builder','icon-obj','edit','resize-obj','img-obj','edit-grid','video-obj','color-obj','list-obj','table-obj','undo-obj','createlink-obj','special-char-obj');
	for ($i=0;$i<count($js_list);$i++) {
		wp_enqueue_script('mong9editor-'.$js_list[$i],MONG9_EDITOR__PLUGIN_URL.'javascript/editor/'.$js_list[$i].'.js');
	}

	wp_enqueue_style('axicon',MONG9_EDITOR__PLUGIN_URL.'etc/axicon/axicon.min.css');
	wp_enqueue_style('mong9editor-base',MONG9_EDITOR__PLUGIN_URL.'css/mong9-base.css');
	wp_enqueue_style('mong9editor-user',MONG9_EDITOR__PLUGIN_URL.'css/mong9-user.css');
	wp_enqueue_style('mong9editor-w',MONG9_EDITOR__PLUGIN_URL.'css/mong9-w.css');

	wp_enqueue_style('mong9editor-admin',MONG9_EDITOR__PLUGIN_URL.'css/mong9-admin.css');
	wp_enqueue_style('mong9editor-editor',MONG9_EDITOR__PLUGIN_URL.'css/mong9-editor.css');

?>

<!DOCTYPE html>
<html <?php language_attributes(); ?> class="no-js">
<head>
	<meta charset="<?php bloginfo('charset'); ?>" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<link rel="profile" href="http://gmpg.org/xfn/11" />
	<link rel="pingback" href="<?php bloginfo('pingback_url'); ?>" />
	<title><?php _e('Mong9 Editor'); ?></title>

<?php wp_head(); ?>

</head>
<body id="body_id" <?php body_class(); ?>>

</body>
</html>

<?php

}


// get language
function get_mong9_language() {
	$locale = get_locale();
	$lang_char = explode ("_",$locale);
	return (file_exists(MONG9_EDITOR__PLUGIN_DIR .'javascript/langs/'. $lang_char[0] .'.js')) ? $lang_char[0] : 'en';
}


// get font family
function get_mong9_font_family() {
	$locale = get_locale();
	$lang_char = explode ("_",$locale);
	return (file_exists(MONG9_EDITOR__PLUGIN_DIR .'javascript/font-family/font_'. $lang_char[0] .'.js')) ? $lang_char[0] : 'en';
}

?>