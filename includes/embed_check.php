<?php

function get_embed_info($url) {

	if ($url == "") { return ""; }

	require_once(MONG9_EDITOR__PLUGIN_DIR.'includes/embed/class.mong9_get_embed_video_info.php');

	$mong9_video = new Mong9_Get_Embed_Video_Info();
	$page_url = $mong9_video->get_page($url);

	$metas = $mong9_video->get_meta_tags();

/*
	require_once(MONG9_EDITOR__PLUGIN_DIR.'etc/ForceUTF8/Encoding.php'); 

	$encode = new ForceUTF8\Encoding();

	foreach ($metas as $key => $value) {
		$metas[$key] = $encode->toLatin1($value);
	}
*/

	return $metas;

}

?>
