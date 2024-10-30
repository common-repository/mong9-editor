<?php

#데일리는 자동실행됨 => 실행안되게 해야함
#일반 : http://www.dailymotion.com/video/x5bacfj
#검색 : http://www.dailymotion.com/video/x5bacfj_미운-우리-새끼-e24-170210-1_tv
#검색 : http://www.dailymotion.com/video/x5bacfj_%EB%AF%B8%EC%9A%B4-%EC%9A%B0%EB%A6%AC-%EC%83%88%EB%81%BC-e24-170210-1_tv
#줄이기 : https://dai.ly/x6yyzf9
#임베드값 : http://www.dailymotion.com/embed/video/x5bacfj  ==> 이미지 정보 못찾음
#임베드값 : http://www.dailymotion.com/embed/video/x5bacfj?autoplay=1

function video_embed_check($url) {

	# ex) https://dai.ly/x6yyzf9
	if (preg_match('/dai\.ly\/([^\&|\?]*)/i',$url,$matches)) {
		return _get_video_url($matches[1]);
	}

	return '';

}

function _get_video_url($url) {

	return 'https://www.dailymotion.com/video/'. $url;

}

function video_embed_finish_check($url) {

	$url = preg_replace('/\&?autoplay\=([^\&|\?]*)/i',"",$url); # autoplay=1 remove
	return $url .'&autoplay=false';

}

?>