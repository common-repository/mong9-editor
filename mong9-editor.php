<?php
/*
Plugin Name: Mong9 Editor
Plugin URI: http://editor.mong9.com/
Description: The most advanced frontend drag & drop content editor. Mong9 Editor is a responsive page builder which can be used to extend the Classic Editor.
Tags: post, wysiwyg, content editor, drag & drop builder, page builder.
Version: 1.1.1
Author: Mong9 Team
Author URI: http://www.webprosoft.co.kr/
License: GPL2
License URI: https://www.gnu.org/licenses/gpl-2.0.html
Text Domain: mong9-editor

	Mong9 Editor is free software: you can redistribute it and/or modify
	it under the terms of the GNU General Public License as published by
	the Free Software Foundation, either version 2 of the License, or
	any later version.

	Mong9 Editor is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public License along
	with Mong9 Editor. If not, see https://www.gnu.org/licenses/gpl-2.0.html.

	Copyright (c) 2019 Mong9 Team. All rights reserved.
*/

define('MONG9_EDITOR_VERSION','1.1.1');
define('MONG9_EDITOR__MINIMUM_WP_VERSION','4.9');
define('MONG9_EDITOR__PLUGIN',plugin_basename( __FILE__ ));
define('MONG9_EDITOR__PLUGIN_URL',plugin_dir_url( __FILE__ ));
define('MONG9_EDITOR__PLUGIN_DIR',wp_normalize_path(plugin_dir_path( __FILE__ )));
define('MONG9_EDITOR_DELETE_LIMIT',100000);


add_action( 'init', 'mong9editor_int' );

function mong9editor_int() {

	if ( current_user_can( 'administrator' ) ) {

		require_once(MONG9_EDITOR__PLUGIN_DIR.'includes/editor-function.php');
		mong9editor_parser();

	}


	if ( !is_admin() ) {

		// Add custom js,css in user mode
		add_action('wp_enqueue_scripts','mong9editor_site_enqueue_scripts');

		// Remove br tag
		remove_filter('the_content','wpautop');

		// Wrap content for css
		add_filter('the_content','mong9editor_ContentWrap');

	}

}


function mong9editor_enqueue_int() {

	wp_enqueue_script('jquery');

	wp_enqueue_script('webtookit-openwindow',MONG9_EDITOR__PLUGIN_URL.'javascript/etc/webtookit.openwindow.js');

	$domain = get_site_url();
	$mong9_editor_url = preg_replace("/\/$/","",MONG9_EDITOR__PLUGIN_URL);
	$mong9_editor_dir = preg_replace("/\/$/","",MONG9_EDITOR__PLUGIN_DIR);

$inline_script = <<<END
var EHASH = {};
var _SET = {};
_SET["domain"] = "$domain";
_SET["mong9_editor_url"] = "$mong9_editor_url";
_SET["data_polder"] = "$mong9_editor_dir";
END;

	wp_add_inline_script('webtookit-openwindow',$inline_script);

}


// Add custom js,css in user mode
function mong9editor_site_enqueue_scripts() {

	mong9editor_enqueue_int();

	wp_enqueue_script('mong9',MONG9_EDITOR__PLUGIN_URL.'javascript/mong9.js');
	wp_enqueue_script('mong9editor-mode-obj',MONG9_EDITOR__PLUGIN_URL.'javascript/editor/mode-obj.js');

	wp_enqueue_style('axicon',MONG9_EDITOR__PLUGIN_URL.'etc/axicon/axicon.min.css');
	wp_enqueue_style('mong9editor-base',MONG9_EDITOR__PLUGIN_URL.'css/mong9-base.css');
	wp_enqueue_style('mong9editor-user',MONG9_EDITOR__PLUGIN_URL.'css/mong9-user.css');
	wp_enqueue_style('mong9editor-w',MONG9_EDITOR__PLUGIN_URL.'css/mong9-w.css');
	wp_enqueue_style('mong9editor-m',MONG9_EDITOR__PLUGIN_URL.'css/mong9-m.css','','','all and (max-width: 683px)');
	wp_enqueue_style('mong9editor-e',MONG9_EDITOR__PLUGIN_URL.'css/mong9-e.css','','','all and (max-width: 439px)');

}


// Wrap content for css
$m9_font_familys = array();
function mong9editor_ContentWrap($content) {

	global $m9_font_familys;

	if (preg_match('/\<\!\-\-\s*\/\/\s*Mong9\s*Editor\s*\/\/\s*\-\-\>/i',$content,$check)) {

		if (preg_match('/\<\!\-\-\s*\/\/\s*m9\_font\_family\(\s*(.*)\s*\)\s*\/\/\s*\-\-\>/i',$content,$matches)) {

			$font_familys = explode(',',$matches[1]);

			for ($i=0;$i<count($font_familys);$i++) {

				$font_family = $font_familys[$i];

				if (!$m9_font_familys[$font_family]) {

					$path_parts = pathinfo($font_family);
					wp_enqueue_style($path_parts['filename'],$font_family);
					$m9_font_familys[$font_family]++;

				}

			}

			$content = str_replace($matches[0],'',$content); # Remove => <!--//m9_font_family(XXX1,XXX2,XXX3)//-->

		}

		return '<div class="m9-contents">'. $content .'</div>';	

	} else {
		$content = wpautop($content);
		return $content;	
	}

}

?>