<?php

#일반 : http://vod.afreecatv.com/PLAYER/STATION/44541916
#임베디드 : http://vod.afreecatv.com/embed.php?type=station&isAfreeca=false&autoPlay=false&showChat=false&szBjId=sbsagesports&nStationNo=19928503&nBbsNo=62745960&nTitleNo=44541916&szCategory=00020000&szPart=NORMAL&szVodType=STATION&szSysType=html5

function video_embed_check($url) {

	$code = '';

	# ex) http://www.youtube.com/v/Y6Qh85PPIVw?version=3&autohide=1
	if (preg_match('/afreecatv\.com\/PLAYER\/STATION\/([^\&|\?]*)/i',$url,$matches)) {
		return _get_video_url($matches[1]);
	}

	# ex) nTitleNo=44541916
	if (preg_match('/nTitleNo\=([^\&|\?]*)/i',$url,$matches)) {
		return _get_video_url($matches[1]);
	}

	return '';

}


function _get_video_url($url) {
	return 'http://vod.afreecatv.com/PLAYER/STATION/'. $url;
}


function video_embed_finish_check($url) {
	return $url;	
}


?>