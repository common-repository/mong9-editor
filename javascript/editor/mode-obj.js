var mode_obj = {
	
	mode : '',
	order : [],
	
	info : [	
		{ 'name' : 'm', 'width' : '683' , 'url' : _SET["mong9_editor_url"] + '/css/mong9-m.css' },		
		{ 'name' : 'e', 'width' : '439' , 'url' : _SET["mong9_editor_url"] + '/css/mong9-e.css' }					
	],
			
	int : function(_type) { // 초기화

		if (mode_obj.order.length == 0) { mode_obj._get_order(); } // 모드 설정 가져오기

		if (_type != 1) {
			// 최초는 PC모드이므로 다른 모드의 스타일시트들 삭제
			// 만약 다른 기기에서도 가능하려면 변경해야함.
			for (var i=0;i<mode_obj.order.length;i++) {
				mode_obj.remove_stylesheet(i); // 초기화	
			}
		}

	},
	
	_get_order : function() { // mode_obj.info의 값을 넓이값으로 정렬해서 mode_obj.order 생성

		mode_obj.info.sort(function(a,b) {
			return a.width > b.width ? -1 : (a.width < b.width ? 1 : 0);			
		});
		
		for (var i=0;i<mode_obj.info.length;i++) {
			mode_obj.order[i] = mode_obj.info[i]['name'];
		}

	},

	get : function() { // 모드 가져오기(e,m,...)
		return mode_obj.mode;	
	},
		
	change : function(_mode) { // 모드변경(상단 모드버튼)

		if (mode_obj.mode == _mode) { return false; } // 모드가 같으면 무시

		var _now = 0;
		var _btn = '';

		if (_mode == '') {
			//jQuery(builder._obj).droppable({disabled:false});
			jQuery('#example').css('display','');
			jQuery('._drag-btn-3').removeClass('disabled').prop('disabled','');
			jQuery('._drag-element-3').removeClass('disabled').prop('disabled','');
			_btn = 'pc';
		} else {
			jQuery('#example').css('display','none');			
			//jQuery(builder._obj).droppable({disabled:true});			
			jQuery('._drag-btn-3').addClass('disabled').prop('disabled','disabled');
			jQuery('._drag-element-3').addClass('disabled').prop('disabled','disabled');					
			_btn = _mode;
		}		

		jQuery('._mode-btn').removeClass('active');
		jQuery('.btn-mode-' + _btn).addClass('active');
		
		if (_mode == '') { _now = 1; }
				
		index = -1;
		for (var i=0;i<mode_obj.order.length;i++) {
			var _type = mode_obj.order[i];
			if (_now == 0) {
				mode_obj.attach_stylesheet(i); // 스타일시트 붙여넣기
			} else {			
				mode_obj.remove_stylesheet(i); // 스타일시트 삭제
			}
			if (_type == _mode) {
				_now = 1;
				index = i;
			}
		}

		var _w = (_mode == '') ? '100%' : mode_obj.info[index]['width'] + 'px';
		editor.event_doing.set(1);
		jQuery('._editor-wrap').animate({width:_w},300,function(){
			jQuery(this).css('overflow','');
			editor.event_doing.set(0);	
		});

		mode_obj.reset_by_change(); // 모드변경시 화면 reset // hidden etc objects(img,video..) layer
		mode_obj.change_style_by_mode(_mode);		
		
		mode_obj.mode = _mode;
		editor.mode._mode = _mode;
				
	},

	reset_by_change : function() { // 모드변경시 화면 reset // hidden etc objects(img,video..) layer
		jQuery('._setting_area_box,.handle_width,.alt-tipsy').css('display','none');		
	},

	// style to m9 data style
	// pc 모드 처리
	change_style_by_mode : function(_mode) { // 모드에 의한 style 변경

		if (mode_obj.mode == _mode) { return false; }

		if (mode_obj.mode == '') { // pc -> other mode

			var orders = mode_obj.order;

			var _key = 'data-' + mode_obj.get_m9_mode_style_name(''); // m9-style
			
			var kinds = '';
			for (var i=0;i<orders.length;i++) {
				if (kinds != '') { kinds += ','; }
				kinds += '[data-' + mode_obj.get_m9_mode_style_name(orders[i]) + ']';
			}
					
			jQuery(kinds).each(function() {						
				var _style = jQuery(this).attr('style');
				if (_style == undefined) { _style = ''; }			
				jQuery(this).attr(_key,_style);	
			});

		} else if (_mode == '') { // other mode -> pc

			var _key = 'data-' + mode_obj.get_m9_mode_style_name(''); // m9-style
			var kinds = '[' + _key + ']';
			jQuery(kinds).each(function() {						
				var _style = jQuery(this).attr(_key);				
				jQuery(this).attr('style',_style);		
				jQuery(this).removeAttr(_key);
				
			});
							
		}

		mode_obj.change_all_styles_by_mode(_mode); // 모드에 의한 style들 변경
			
	},
	
	change_all_styles_by_mode : function(_mode) { // 모드에 의한 style들 변경

		if (_mode == '') { return false; }

		var _orders = [''];
		var orders = _orders.concat(mode_obj.order);

		var kinds = '';
		for (var i=0;i<orders.length;i++) {
			if (kinds != '') { kinds += ','; }
			kinds += '[data-' + mode_obj.get_m9_mode_style_name(orders[i]) + ']';
		}

		jQuery(kinds).each(function() {
			var str = mode_obj.get_style_str_by_mode(this,_mode); // 모드에 의한 style 문자열 얻어오기
			jQuery(this).attr('style',str);		
		});
			
	},

	get_style_str_by_mode : function(obj,_mode) { // 모드에 의한 style 문자열 얻어오기

		var _orders = [''];
		var orders = _orders.concat(mode_obj.order);

		var modes = [];
		
		var _now = 0;
		var _styles = {};
	
		for (var i=0;i<orders.length;i++) {

			var d = mode_obj.get_m9_mode_style_name(orders[i]);
			var e = jQuery(obj).attr('data-'+d);
			if (e) {
				modes.push(e);
			}

			if (orders[i] == _mode) { break; }
				
		}

		var Dvar = mode_obj.get_style_by_str_array(modes); // 스타일 합치기
		return Dvar;
						
	},			

	get_m9_mode_style_name : function(_mode) { // e -> m9-e-style

		var _name = 'm9-';
		if (_mode != '') {
			_name += _mode + '-';
		} else {
			//_name += '-';			
		}
		_name += 'style';
		return _name;
	},
	
	get_orders_mode : function() {

		if (mode_obj.order.length == 0) { mode_obj._get_order(); } // 모드 설정 가져오기
		
		var orders = [''];
		if (mode_obj.get() == '') { return orders; }
		
		for (var i=0;i<mode_obj.info.length;i++) {	
			orders.push(mode_obj.info[i]['name']);
			if (mode_obj.info[i]['name'] == mode_obj._mode) { break; }
		}

		return orders.reverse();
	},

	get_style_by_str_array : function(style_str_array) { // 스타일 합치기

		var _styles = {};
		for (var i=0;i<style_str_array.length;i++) {

			if (style_str_array[i] == '' || style_str_array[i] == undefined) { continue; }

			var f = style_str_array[i].split(';');
	
			for (var z=0;z<f.length;z++) {
				var g = f[z].split(':');				
				var _k = jQuery.trim(g[0]);
				_styles[_k] = jQuery.trim(g[1]);
			}	

		}

		var Dvar = '';
		for (var i in _styles) {
			if (Dvar != '') { Dvar += ';'; }
			if (i != '' && _styles[i] != undefined) {
				Dvar += i +':'+_styles[i];
			}
		}

		return Dvar;
				
	},
					
	attach_stylesheet : function(index) { // 스타일시트 붙여넣기
		var _url = mode_obj.info[index]['url'];
		if (jQuery('head').find('[href=\''+_url+'\']').length == 0) {
			var max_width = mode_obj.info[index]['width'];
			jQuery('head').append(jQuery('<link rel="stylesheet" href="'+ _url +'" type="text/css" />'));			
		}
	},
	
	remove_stylesheet : function(index) { // 스타일시트 삭제
		var _url = mode_obj.info[index]['url'];
		if (jQuery('head').find('[href=\''+_url+'\']').length > 0) {	
			jQuery('head').find('[href=\''+_url+'\']').remove();
		}
	},
	
	edit_wrap : function(obj) {
		if (!jQuery(obj).parent().hasClass('._editor-wrap')) {
			jQuery(obj).wrap('<div class="_editor-wrap" style="margin:0 auto"></div>'); //// style지울것!!!
		}
	},
	
	remove_empty_style : function(obj) { // 공백인 data-m9-X-style 삭제

		var _orders = [''];
		var orders = _orders.concat(mode_obj.order);
		var J_obj = jQuery(obj);			
		for (var i=0;i<orders.length;i++) {
			var _style = orders[i] + '-style';
			var _style = 'data-' + mode_obj.get_m9_mode_style_name(orders[i]);
			J_obj.find('*['+_style+'=""]').removeAttr(_style);
		}
					
	},

	Responsive : function() {

		if (mode_obj.order.length == 0) { mode_obj._get_order(); } // 모드 설정 가져오기
		
		var bw = _get_num(jQuery('body').css('width'));

		var _mode = '';
		for (var i=mode_obj.info.length;i>0;i--) {
			var num = i - 1;
			var _w = mode_obj.info[num]['width'];
			if (_w > bw) {
				_mode = mode_obj.info[num]['name'];
				break;
			}
		}

		mode_obj.change_style_by_mode(_mode);

		mode_obj.mode = _mode;
				
	}	
	
};