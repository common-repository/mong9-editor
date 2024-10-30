var list_obj = {
	
	'_now' : false,
	'_over' : false,
	'_clicked' : false,
	'_li_now' : false,	
	
	'int' : function(obj) {

		style_info['list_style'] = {
			'_class' : ['list-style-0','list-style-1','list-style-2','list-style-3','list-style-4','list-style-5'],		
			'_class_names' : ['S0','S1','S2','S3','S4','S5']
		};
		style_info['float'] = {
			'_class' : ['float2N-1','float2N-2','float2N-3','float2N-4','float2N-5','float2N-6'],
			'_class_names' : ['x1','x2','x3','x4','x5','x6']
		};
		style_info['spacing'] = {
			'_class' : ['spacing-1','spacing-2','spacing-3'],
			'_class_names' : ['S1','S2','S3']
		};
		style_info['list_border_style'] = {
			'_class' : ['list-border-style-1','list-border-style-2','list-border-style-3'],
			'_class_names' : ['L1','L2','L3']
		};
		tab_get['list'] = ['list_style','float','spacing','list_border_style'];
		
		obj = _get_object(obj);

		if (jQuery('#editWindow-list').length == 0) {
		
			var _html =	'' +
			'<ul class="_edit-list-1">' +
				'<li>' +			
					'<dl class="_edit-dl-2">' +
						'<dt>'+ msg_msg('kind','a') +'</dt>' +
						'<dd>' +
							'<ul class="_edit-ul-1">' +						
								'<li><button href=#" onclick="list_obj.change_tag(\'ul\');return false" title="'+ msg_msg('unorder_list','a') +'" class="edit-btn-8 _drag-btn-3 icon2-InsertUnorderedList _tag_ul"></button></li>' +
								'<li><button href=#" onclick="list_obj.change_tag(\'ol\');return false" title="'+ msg_msg('order_list','a') +'" class="edit-btn-8 _drag-btn-3 icon2-InsertOrderedList _tag_ol"></button></li>' +								
							'</ul>' +
						'</dd>' +
					'</dl>' +
				'</li>' +
				'<li>' +			
					'<dl class="_edit-dl-2">' +
						'<dt>'+ msg_msg('fix','a') +'</dt>' +					
						'<dd>' +
							'<ul class="_edit-ul-1">' +								
								'<li><button class="edit-btn-8 _drag-btn-3 icon2-plus" onclick="list_obj.plus();return false" title="'+ msg_msg('copy','a') +'"></button></li>' +
								'<li><button class="edit-btn-8 _drag-btn-3 icon2-minus" onclick="list_obj.minus();return false" title="'+ msg_msg('delete','a') +'"></button></li>' +								
								'<li><button class="edit-btn-8 _drag-btn-3 icon2-arrow-height" onclick="list_obj.sortable();return false" title="'+ msg_msg('set_order','a') +'"></button></li>' +									
							'</ul>' +
						'</dd>' +
					'</dl>' +
				'</li>' +				
				'<li>' +			
					'<dl class="_edit-dl-2">' +
						'<dt>'+ msg_msg('style','a') +'</dt>' +
						'<dd>' + get_userbox_class_btn('list_style',{'onclick_function' : 'list_obj.change_class','btn_addClass' : '_drag-btn-3'}) + '</dd>' +
					'</dl>' +
				'</li>' +
				'<li>' +
					'<dl class="_edit-dl-2">' +
						'<dt>'+ msg_msg('divide','a') +'</dt>' +
						'<dd>' + get_userbox_class_btn('float',{'onclick_function' : 'list_obj.change_class'}) + '</dd>' +
					'</dl>' +			
				'</li>' +
				'<li>' +
					'<dl class="_edit-dl-2">' +
						'<dt>'+ msg_msg('spacing','a') +'</dt>' +
						'<dd>' + get_userbox_class_btn('spacing',{'onclick_function' : 'list_obj.change_class'}) + '</dd>' +
					'</dl>' +					
				'</li>' +																			
				'<li>' +
					'<dl class="_edit-dl-2">' +
						'<dt>'+ msg_msg('underline','a') +'</dt>' +
						'<dd>' + get_userbox_class_btn('list_border_style',{'onclick_function' : 'list_obj.change_class'}) + '</dd>' +
					'</dl>' +					
				'</li>' +	
			'</ul>' +
			'<div class="_edit_remove_box"><a href="#" onclick="list_obj.remove();return false;" title="'+ msg_msg('property_remove','a') +'" class="edit-btn-8 icon2-eraser"></a> <a href="#" onclick="list_obj.del();return false;" title="'+ msg_msg('delete','a') +'" class="edit-btn-8 icon2-delete"></a></div>';
			
			edit_window_obj.int("editWindow-list",_html,msg_msg('set_list','a')); // '목록 설정'

			if (jQuery('#editor-list-fix').length == 0) {			
				var _html = '<div id="editor-list-fix" class="handle_width _m9editor no" style="display:none"><a href="#" onclick="list_obj.view();return false;" class="setting-btn-1">'+msg_msg('set_list','a')+'</a></div>'; // 목록 설정
				jQuery("body").append(_html);
			}
							
		}

		var mousedown_func = function(e,obj) {
			
			var _target = obj;
			var et = e.target;
			var J_et = jQuery(et);

			if (_target) {

				list_obj._li_now = false;
				if (J_et.is('li')) {			
					list_obj._li_now = et;
				} else if (J_et.parents('li')) {
					list_obj._li_now = J_et.parents('li')[0];							
				}
							
				list_obj._clicked = et;
				list_obj._now = _target;

				list_obj.get();				

			}
				
		};

		var mouseover_func = function(e,obj) {
			
			var _target = obj;

			if (_target) {
				if (jQuery('#editWindow-list').css('display') != 'none') { return false; }
				list_obj._li_now = false;
				list_obj._over = _target;
				var _w = jQuery(_target).css('width');
				jQuery('#editor-list-fix').css('width',_w);		
				layer_position("editor-list-fix",_target,"up");		
				jQuery('#editor-list-fix').css('display','');	
			} else {
				jQuery('#editor-list-fix').css('display','none');
			}
				
		};

		editor_selector.set(obj,[
			{ '_type' : 'mousedown' , '_kind' : 'is_parents' , '_selector' : 'ul,ol' , '_func' : mousedown_func, '_ignore' : 1 },
			{ '_type' : 'mouseover' , '_kind' : 'is_parents' , '_selector' : 'ul,ol' , '_func' : mouseover_func, '_ignore' : 1 }
		]);

	},

	'catch_obj' : function(obj) {

		var _target = false;
		var et = obj;
		var J_et = jQuery(et);
					
		// 리스트이고, 메뉴버튼관련이 아니면
		if (J_et.is('ul,ol') && !J_et.is(editor._ignore) && J_et.parents(editor._ignore).length == 0) {			
			_target = et;
		} else if (J_et.parents('ul,ol') && J_et.parents(editor._ignore).length == 0) {
			_target = J_et.parents('ul,ol')[0];			
		}

		return _target;
		
	},	
	
	'view' : function(obj) {
		
		if (obj) { list_obj._over = obj; }
		list_obj._now = list_obj._over;

		jQuery('.selected_tag').removeClass('selected_tag');
		jQuery(list_obj._now).addClass('selected_tag');

		list_obj.get();
		var dd = layer_position('editWindow-list',list_obj._now,'up');//,getObject('body'));							
		layer_position('editWindow-list',list_obj._now,'up',getObject('body'));

		edit_window_obj.view('editWindow-list');
		jQuery("#editor-list-fix").css("display","none");
		
	},

	'change_tag' : function(Dvar) {
	
		var _tag = jQuery(list_obj._now).prop('tagName').toLowerCase();
		if (Dvar.toLowerCase() == _tag) { return false; } // 타입이 같으면 무시

		jQuery('._tag_' + Dvar).addClass('active');
		var _reverse = (Dvar == 'ol') ? 'ul' : 'ol';
		jQuery('._tag_' + _reverse).removeClass('active');		
		list_obj._now = changeTag(list_obj._now,Dvar);
		editor._now = list_obj._now;
		undo_obj._add(list_obj._now,'tag');
		
	},
	
	'plus' : function() {

		if (!list_obj._li_now) { // 선택안되어 있으면 마지막것을 선택
			if (list_obj._now) {
				list_obj._li_now = jQuery(list_obj._now).children().last()[0];
				storedSelections = list_obj._li_now;
			}
			if (!list_obj._li_now) {
				error_msg(msg_msg('msg_34','a')); // "복사할 칸을 선택해주세요!"		
				return false;	
			}
		}

		var _before = editor._now;
		editor._now = list_obj._li_now;
		editor.handle._same(1);
		editor._now = _before;
//		undo_obj._add(list_obj._now);
	},
				
	'minus' : function() {
		
		if (!list_obj._clicked) {
			error_msg(msg_msg('msg_35','a')); // "삭제할 칸을 선택해주세요!"
			return false;	
		}
		
		var _before = editor._now;
		editor._now = list_obj._clicked;
		editor.handle._del(1);
		list_obj._clicked = false;
//		undo_obj._add(list_obj._now);
	},	

	'change_class' : function(Dname,Dvar) {
				
		if (Dname == 'spacing' || Dname == 'list_border_style') {

			var J_list_now = jQuery(list_obj._now);
			
			var Sarray = (style_info['float']) ? style_info['float']['_class'] : [];
		
			var mode_orders = mode_obj.get_orders_mode(); // 'e','m',''

			var _mode = mode_obj.get();
			var _mode_match = 0;

			var matching_name = '';
			for (var z=0;z<mode_orders.length;z++) {

				if (mode_orders[z] == _mode) {
					_mode_match = 1;
				}

				for (var i=0;i<Sarray.length;i++) {

					if (_mode_match != 1) { continue; }

					var class_name = (mode_orders[z] != '') ? mode_orders[z] +"-"+ Sarray[i] : Sarray[i];			
					if (J_list_now.hasClass(class_name)) {
						matching_name = Sarray[i];
						break;
					}

				}				
				if (matching_name != '') { break; }				
			}

			if (matching_name == '') {
				matching_name = Sarray[0];
			}

			J_list_now.addClass(editor.mode.get_class(matching_name));
								
		}
		
		class_obj.change(list_obj._now,Dname,Dvar);
		
	},
	
	'get' : function() {
		var _tag = jQuery(this._now).prop('tagName').toLowerCase();
		jQuery('._tag_' + _tag).addClass('active');
		var _reverse = (_tag == 'ol') ? 'ul' : 'ol';
		jQuery('._tag_' + _reverse).removeClass('active');			
		for (var i=0;i<tab_get['list'].length;i++) {
			class_obj.get(this._now,tab_get['list'][i]);	
		}
	},
	
	'remove' : function() {
		for (var i=0;i<tab_get['list'].length;i++) {
			class_obj.remove(this._now,tab_get['list'][i]);	
		}
		undo_obj._add(this._now);	
	},

	'del' : function() {

		undo_obj._add(list_obj._now);

		var J_list_now = jQuery(list_obj._now);

		J_list_now.fadeOut(300,function() {
			var _undo_obj = undo_obj.get_obj_for_delete(list_obj._now);
			jQuery(this).remove();
			list_obj._now = false;			
			obj_fadeOut('#editWindow-list');
			undo_obj._add(_undo_obj);				
		});

	},
			
	'sortable' : function() {
		var _target = jQuery(list_obj._now).children().eq(0);
		editor._now = _target;
		editor.sortable._sorting(1);
	}
	
};

var class_obj = {
	
	'change' : function(Dobj,Dname,Dvar) {

		var btn = jQuery(m9evt);
		if (btn.hasClass('active')) {
			btn.removeClass('active');
			jQuery(Dobj).removeClass(editor.mode.get_class(Dvar));
			return false;
		}
		
		jQuery('._'+Dname).removeClass('active'); // 클래스 버튼 active 제거		
		var Sarray = (style_info[Dname]) ? style_info[Dname]['_class'] : [];
		var J_Dobj = jQuery(Dobj);
		for (var i=0;i<Sarray.length;i++) {
			J_Dobj.removeClass(editor.mode.get_class(Sarray[i]));  // 속성제거
		}

		J_Dobj.addClass(editor.mode.get_class(Dvar)); // 속성추가		
		jQuery('._' + Dvar).addClass('active'); // 클래스 버튼 active 추가 //Dvar : f-xlarge		
		undo_obj._add(Dobj);

	},
	
	'get' : function(Dobj,Dname) {

		jQuery('._'+Dname).removeClass('active'); // 클래스 버튼 active 제거
		var Sarray = (style_info[Dname]) ? style_info[Dname]['_class'] : [];
		var _class = jQuery(Dobj).attr('class');
		if (_class) {
			var class_list = _class.split(' ');
			for (var i=0;i<Sarray.length;i++) {
				for (var z=0;z<class_list.length;z++) {
					var _kind = editor.mode.get_class(Sarray[i]);
					if (_kind == class_list[z]) {
						jQuery('._' + Sarray[i]).addClass('active');	
					}
				}
			}
		}

	},
	
	'remove' : function(Dobj,Dname) {

		jQuery('._'+Dname).removeClass('active'); // 클래스 버튼 active 제거		
		var Sarray = (style_info[Dname]) ? style_info[Dname]['_class'] : [];
		var J_Dobj = jQuery(Dobj);		
		for (var i=0;i<Sarray.length;i++) {
			J_Dobj.removeClass(editor.mode.get_class(Sarray[i]));  // 속성제거
		}

	}
	
};