<?php

class Mong9_Get_Embed_Video_Info {

	private $_url;
	private $_video_embed_check;
	private $_metas;
	private $meta_tags;

	public function get_page($url = '') {

		if ($url == '') { return ''; }

		$url = preg_replace("/\#(.+?)$/","",$url); # 끝에있는 #문자 제거(페이지내 링크)
		$url = preg_replace("/\/$/","",$url); # 마지막 / 제거

		$url_info = parse_url($url);
		$hosts = preg_replace('/^www\./',"",$url_info['host']);

		$this->_video_embed_check = 0;

		if (file_exists(MONG9_EDITOR__PLUGIN_DIR .'includes/embed/'. $hosts .'.php')) {	

			require_once(MONG9_EDITOR__PLUGIN_DIR .'includes/embed/'. $hosts .'.php');
			$page_url = &video_embed_check($url);

			if ($page_url != '') { $url = $page_url; }
			$this->_video_embed_check++;

		}

		$this->_url = $url;

		return $url;

	}

	public function check_embed_url() {

		if ($this->_video_embed_check > 0) {
			$this->meta_tags['url'] = &video_embed_finish_check($this->meta_tags['url']); # 임베드값이면 마무리
		}

	}

	public function get_meta_tags() {

		$html = $this->_get_web_page($this->_url);

		$dom = new domDocument; 
		$dom->loadHTML($html);

		$_html = $dom->getElementsByTagName('html'); 

		$document_lang = '';
		foreach($_html as $tag) {
			$document_lang = $tag->getAttribute('lang');
			$this->meta_tags['lang'] = $document_lang;
			break;
		}
		$wp_lang = get_locale();

		$this->_metas = $dom->getElementsByTagName('meta');

		$this->check_open_graph_meta_tag(); # Check "open graph"
		$this->check_twitter_meta_tag(); # Check "twitter"
		$this->check_embed_url();

		return $this->meta_tags;

	}


	###############################
	/*
	네이버 : http://tv.naver.com/v/1436789/list/112144
	데일리모션 : http://www.dailymotion.com/video/k1Nsotk9m46QkSlK5XN
	유투브 : http://youtu.be/Y6Qh85PPIVw
	*/
	###############################
	public function check_open_graph_meta_tag() {

		$tags = array();

		foreach ($this->_metas as $row) {

			$name = $row->getAttribute('name');
			$property = $row->getAttribute('property');
			$content = $row->getAttribute('content');

			if (!empty($name)) {

				if ($name == "keywords") {	

					if (empty($this->meta_tags['keywords'])) { $this->meta_tags['keywords'] = $content; }

				} elseif ($name == "description") {	

					if (empty($this->meta_tags['description'])) { $this->meta_tags['description'] = $content; }

				}

			} elseif (!empty($property)) {

				if ($property == "og:video:url") { # 구글연동 META 정보 비디오 관련 og:video:url

					if (!preg_match('/\.swf/i',$content,$match)) {
						if (empty($this->meta_tags['url'])) { $this->meta_tags['url'] = $content; }
					}

				} elseif ($property == "og:image") {	

					if (empty($this->meta_tags['image'])) { $this->meta_tags['image'] = $content; }

				} elseif ($property == "og:title") {	

					if (empty($this->meta_tags['title'])) { $this->meta_tags['title'] = $content; }

				} elseif ($property == "og:video:tag") {	

					array_push($tags,$content);

				}

			} else {

				if ($row->getAttribute('charset') != '') {

					if (empty($this->meta_tags['charset'])) { $this->meta_tags['charset'] = $row->getAttribute('charset'); }

				}

			}

		}

		# TAGS 중복체크할것
		if (count($tags) > 0) {
			if (empty($this->meta_tags['tag'])) { $this->meta_tags['tag'] = join(',',array_unique($tags)); } # 중복제거
		}

	}

	###############################
	/*
	네이버 : http://tv.naver.com/v/1436789/list/112144
	데일리모션 : http://www.dailymotion.com/video/k1Nsotk9m46QkSlK5XN
	유투브 : http://youtu.be/Y6Qh85PPIVw
	*/
	###############################
	public function check_twitter_meta_tag() {

		$tags = array();

		foreach ($this->_metas as $row) {

			$name = $row->getAttribute('name');
			$property = $row->getAttribute('property');
			$content = $row->getAttribute('content');
			$value = $row->getAttribute('value');

			if (!empty($name)) {

				if ($name == "twitter:description") {	

					if (empty($this->meta_tags['description'])) {
						$this->meta_tags['description'] = ($value != '') ? $value : $content;
					}

				} elseif ($name == "twitter:player") { # 트위터연동 META 정보 비디오 관련 twitter:player

					if (empty($this->meta_tags['url'])) {

						$str = ($value != '') ? $value : $content;

						if (!preg_match('/\.swf/i',$str,$matches)) {
							$this->meta_tags['url'] = $str;
						}

					}

				} elseif ($name == "twitter:image") {	

					if (empty($this->meta_tags['image'])) {
						$this->meta_tags['image'] = ($value != '') ? $value : $content;
					}

				} elseif ($name == "twitter:title") {	

					if (empty($this->meta_tags['title'])) {
						$this->meta_tags['title'] = ($value != '') ? $value : $content;
					}

				}

			} elseif (!empty($property)) {

				if (preg_match('/\:tag$/i',$property,$matches)) {
					array_push($tags,$content);			
				}

			}

		}

		# TAGS 중복체크할것
		if (count($tags) > 0) {
			if (empty($this->meta_tags['tag'])) { $this->meta_tags['tag'] = join(',',array_unique($tags)); } # 중복제거
		}

	}

	private function _get_web_page($url) {

		$user_agent = "Mozilla/4.0 (compatible; MSIE 5.01; Windows NT 5.0)"; 

		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $url); // set url to post to 
		curl_setopt($ch, CURLOPT_FAILONERROR, 1); // Fail on errors 
		curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1); // allow redirects 
		curl_setopt($ch, CURLOPT_RETURNTRANSFER,1); // return into a variable 
		#curl_setopt($ch, CURLOPT_PORT, 80); //Set the port number 
		curl_setopt($ch, CURLOPT_TIMEOUT, 15); // times out after 15s 
		#curl_setopt($ch, CURLOPT_USERAGENT, $user_agent); 
		$response = curl_exec($ch); 

		return $response;

	}

}

?>