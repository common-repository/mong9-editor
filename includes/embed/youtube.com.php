<?php


function video_embed_check($url) {

	$code = '';

	# ex) https://www.youtube.com/watch?v=Y6Qh85PPIVw
	if (preg_match('/youtube\.com\/watch\?v\=([^\&]*)/i',$url,$matches)) {
		return _get_video_url($matches[1]);
	}

	# ex) http://youtu.be/Y6Qh85PPIVw
	if (preg_match('/youtu\.be\/([^\&|\?]*)/i',$url,$matches)) {
		return _get_video_url($matches[1]);
	}

	# ex) http://www.youtube.com/v/Y6Qh85PPIVw?version=3&autohide=1
	if (preg_match('/youtube\.com\/v\/([^\&|\?]*)/i',$url,$matches)) {
		return _get_video_url($matches[1]);
	}

	# ex) https://www.youtube.com/embed/Y6Qh85PPIVw
	if (preg_match('/youtube\.com\/embed\/([^\&|\?]*)/i',$url,$matches)) {
		return _get_video_url($matches[1]);
	}

	return '';

}


function _get_video_url($url) {
	return 'https://www.youtube.com/watch?v='. $url;
}


function video_embed_finish_check($url) {
	return $url;	
}


?>