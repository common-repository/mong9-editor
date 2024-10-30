<?php

// Add js, css in admin mode
add_action( 'admin_enqueue_scripts','mong9editor_enqueue_scripts');

function mong9editor_enqueue_scripts() {

	wp_enqueue_style('mong9editor-admin',MONG9_EDITOR__PLUGIN_URL.'css/mong9-admin.css');
	mong9editor_enqueue_int();
	wp_enqueue_script('mong9editor-open-editor',MONG9_EDITOR__PLUGIN_URL.'javascript/open-mong9-editor.js');

	$nonce = wp_create_nonce('mong9_editor_window_nonce');
	$mong9_window_url = site_url() .'/index.php?mong9_action=editor&nonce='. $nonce;

$inline_script = <<<END
_SET["mong9_window_url"] = "$mong9_window_url";
END;

	wp_add_inline_script('webtookit-openwindow',$inline_script);

}

// Add style in classic editor
add_action('admin_init','add_editor_styles');

function add_editor_styles() {

    add_editor_style(MONG9_EDITOR__PLUGIN_URL .'etc/axicon/axicon.min.css');
    add_editor_style(MONG9_EDITOR__PLUGIN_URL .'css/mong9-base.css');
    add_editor_style(MONG9_EDITOR__PLUGIN_URL .'css/mong9-user.css');    
    add_editor_style(MONG9_EDITOR__PLUGIN_URL .'css/mong9-w.css');

}

?>