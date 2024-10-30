var builder = {

	_obj : null,

_before : false,
	
	defaults : {
		example : "example",
		example_html : "./example.html"
	},

	settings : {},
	
	_droppable_obj : false,
	_draggabled : false,
		
	_int_count : 0,
	int : function(_id,_hash){

		builder._obj = jQuery("#"+_id)[0];
		builder.setting.check();	
		builder.setting.reset();

		ani_type_obj.checking(builder._obj); // 실행할 ani_type 실행
		
		if (this._int_count > 0) { return; }
		this._int_count++;
				
		//enter_obj.set(builder._obj);
					
		this.settings = get_vars(_hash,this.defaults);

		jQuery(builder._obj).sortable({
			items : ".ui-draggable",
			axis : "y",
			cursor : "move",
			placeholder : "editor-placeholder",
			//connectWith : "#connecta",
			distance : 5,
			delay : 200,
			tolerance : "pointer",
			handle : "._builder-group-mover",
			start : function(event,ui) {	
				editor.event_doing.set(1);
				obj_fadeOut('#editMenu-setting',100);
				obj_fadeOut('#editMenu-grid',100);								
				jQuery(ui.placeholder).slideUp(200);
			},		
			change : function(event,ui) {		
				editor.event_doing.set(0);				
				jQuery(ui.placeholder).hide().slideDown(200);
			},				

			stop : function(event,ui) {			
				//builder.error_check();			
				editor.event_doing.set(0);
				builder._draggabled = false;
			}			
		});

		jQuery(builder._obj).droppable({
			accept: "._example_block",
			drop : function(event,ui) {
				if (builder._draggabled == true) {					
					var _id = "ex" + jQuery(ui.draggable).data("ex");
					var _html = jQuery("#"+_id).data("_html");
					builder._droppable_obj = ui.draggable;

					return ui.draggable.html(_html);			
				} else {
					return "";	
				}
			},
			deactivate : function(event,ui) {			
				builder.error_check(); // ** 중요
			},						
			tolerance : "pointer",		
			greedy : true
		});

		if (jQuery("#"+ this.settings["example"]).length == 0) {
			
			jQuery("body").append('<div id="' + this.settings["example"] + '" class="example_box _m9editor"></div>');
			jQuery('#' + this.settings["example"]).append('<div class="btn_box"><a href="#" onclick="builder.example.toggle();return false;" class="btn_left"><span class="edit-btn-3 icon-menu"></span></a></div>');

			var _array = ['Title','Base','Paragraph','Separator','Table','Image','Images','List','Quote','Button','Icon','Alert','Map','Video'];
			var _hash = {};
			for (var i in _array) {
				var _k = _array[i].toLowerCase();
				_hash[_k] = 1;
			}
			var _user_array = [];
			var example_select_id ='_editor_example_choice';

			var _html = '';
			_html += '<div class="counter-control-box">';
			_html += '<span class="counter-control">';
			_html += '<span class="box-btn"><button href="#" onclick="return false;" onmousedown="input_box.plus(\'' + example_select_id + '\',{},function(){builder.example_change();})" onmouseup="input_box.stop(\'' + example_select_id + '\');" class="left-button icon2-plus"></button></span>';
			_html += '<span class="box-input">';
				
			_html += '<select id="' + example_select_id + '" onchange="builder.example_change()">';
			_html += '<option value="">All</option>';
			for (var i=0;i<_array.length;i++) {
				_html += '<option value="' + _array[i].toLowerCase() + '">' + _array[i] + '</option>';
			}
			_html += '</select>';

			_html +=  '</span>';
			_html +=  '<span class="box-btn"><button onclick="return false;" onmousedown="input_box.minus(\'' + example_select_id + '\',{},function(){builder.example_change();})" onmouseup="input_box.stop(\'' + example_select_id + '\');" class="right-button icon2-minus"></button></span>';
			_html +=  '</span>';
			_html +=  '</div>';

			jQuery('#' + this.settings["example"]).append(_html);
			jQuery('#' + this.settings["example"]).append('<div id="_eidtor_example" class="in_box"></div>');

			jQuery.post(this.settings["example_html"],function(data) {

				var _user_array_count = 0;		
				data = match_mong9_url(data);
				jQuery("<div />").html(data).children().each(function(i){
			
					var _html = jQuery(this).html();
					var _code = jQuery(this).data('html');
					var _key = jQuery(this).data('keyword').toLowerCase();
					if (_key) {
						var d = _key.split(',');
						for (var z=0;z<d.length;z++) {
							if (!_hash[d[z]]) {
								if (!_user_array[d[z]]) {
									_user_array[d[z]] = 1;
									_user_array_count++;
								}
							}
						}
					}

					var _str = '<div id="ex' + i + '" data-ex="' + i + '" data-keyword="'+_key+'" class="_example_block"><img src="' + jQuery(this).data("sumnail") + '" class="fullimg" /><div title="' + jQuery(this).attr("title") + '" alt_no="3" class="_drag_checking"></div></div>'; // img,a 태그 연동 방지
																																		
					jQuery("#"+ builder.settings["example"] +">.in_box").append(_str);										
					jQuery("#ex"+i).data("_html",_html);

				});

				if (_user_array_count > 0) {
					jQuery('#_editor_example_choice').append('<option value="">-----------------------------</option>');	
					for (var p in _user_array) {
						jQuery('#_editor_example_choice').append('<option value="'+p+'">'+p+'</option>');
					}
				}

				jQuery("#"+ builder.settings["example"] +">.in_box").append('<p id="_editor_example_search_error_msg" class="search_error_msg" style="display:none">No Match</p>');		

				jQuery("#" + builder.settings["example"] +">.in_box>div").draggable({													
					connectToSortable : builder._obj,
					//connectToSortable : '.m9_editor_box',						
					cursor : "move",
					helper : 'clone',
					handle : '._drag_checking',
					//helper : function(e) { return jQuery("<div class='helper-box'></div>")[0]; },
					start : function(event,ui) {					
						builder._draggabled = true;
						editor.event_doing.set(1);
						mode_obj.reset_by_change(); // 모드변경시 화면 reset
					},
					stop : function(event,ui) {					
						builder.setting.check();
						builder.put_check();
						builder.error_check();
						editor.event_doing.set(0);
						mode_obj.reset_by_change(); // 모드변경시 화면 reset
					}
				});

				jQuery("#" + builder.settings["example"] +">.in_box>div").on('dblclick',function(i) {
					
					var _id = jQuery(this).attr('id');
					var _html = jQuery("#"+_id).data("_html");

					jQuery(builder._obj).append(_html);
					builder.setting.check();		
					builder._droppable_obj = jQuery(builder._obj).children().last()[0];				
					builder.put_check();					
					builder.remove_placeholder_txt();		

					var scroll_obj = _get_body_obj();
					scroll_obj.scrollTop = _get_num(jQuery('body').css('height')); // 하단 추가 후 스크롤 최하단으로
					editor_view_reset();

				});
				
				process_M9ALT(jQuery("#" + builder.settings["example"])[0]);
								
			});
			
		} // if

		builder.html.int();
	
		jQuery(document).on('mousedown',function(e) {
			builder.setting.reset(e.target);
			builder.setting.select(e.target);			
		});
	
	}, //int

	example : {

		'toggle' : function() {

			var obj = jQuery('#' + builder.settings['example']);

			var _w = get_box_size2(builder.settings['example'],'width');

			if (_get_num(obj.css('right')) == 0) {
            	obj.animate({right : '-=' + _w},200);
			} else {
            	obj.animate({right : '+=' + _w},200);				
			}
		}
		
	},
	
	put_check : function() {
		ani_type_obj.checking(builder._droppable_obj);
	},
	
	error_check : function() {
		jQuery(builder._obj).children().each(function() {
			var J_this = jQuery(this);
			if (J_this.attr("data-ex") && J_this.find('._drag_checking').length > 0) {				
				J_this.remove();
				alert(msg_msg('msg_54','a')); // "삽입 원하시는 본문까지 끌고 가세요!"
			}
		});

		builder.remove_placeholder_txt();
				
	},
	
	remove_placeholder_txt : function() {

		jQuery(builder._obj).children().each(function() {
			var J_this = jQuery(this);			
			if (J_this.find('.placeholder_txt').length > 0) {
				if (J_this.find('.placeholder_txt').hasClass('_starting')) {
					J_this.remove();
				}
			}			
		});
				
	},
	
	setting : {
					
		'make' : function(obj) {

			var J_obj = jQuery(obj); // 블럭한개
			
			if (!J_obj.hasClass("ui-draggable")) {	

				var now_num = -1;
				var _parent = J_obj.parent();
				var _children = _parent.children();		
				for (var i=0;i<_children.length;i++) {
						if (_children[i] == obj) {
							now_num = i;
							break;	
						}
				}		
												
				obj.outerHTML = '<div class="ui-draggable _one-block">' + obj.outerHTML + '</div>';				
				obj = _parent.children().eq(now_num)[0];
				J_obj = jQuery(obj);
			
			}

			// * grid_obj 에서도 _one-row 생성이 있다 다시 생각해 볼것
			if (J_obj.find("._one-row").length == 0) {	
				obj.innerHTML = '<div class="_one-row">' + obj.innerHTML + '</div>';
			}
			
			if (J_obj.find(".editMenu-builder").length == 0) {	
				J_obj.append('<div class="editMenu-builder handle_height _m9editor" style="display:none"></div>');
				var _html = '<ul>' +
				'<li><a alt="'+ msg_msg('set_order','a') +'" title="'+ msg_msg('msg_3','a') + ((ie_var <= 7) ? "(1초간)" : "") + '" class="edit-btn icon-arrow-height hd-mover _builder-group-mover ui-sortable-handle"></a></li>' +
				'<li><a href="#" onclick="builder.handle.copy(arguments[0]);return false;" title="'+ msg_msg('copy','a') +'" class="edit-btn icon-plus hd-copy"></a></li>' +
				'<li><a href="#" onclick="builder.html.view(arguments[0]);return false;" title="'+ msg_msg('fix_html','a') +'" class="edit-btn icon-tag hd-html"><i class="edit-btn-popup-2"></i></a></li>' +
				'<li><a href="#" onclick="builder.handle.del(arguments[0]);return false;" alt="'+ msg_msg('delete','a') +'" title="'+ msg_msg('msg_2','a') +'" class="edit-btn icon-del hd-remove"></a></li>' +	
				'</ul>';	
				J_obj.find(".editMenu-builder").append(_html);
				process_M9ALT(J_obj.find(".editMenu-builder")[0]);	
			}
	
			if (J_obj.find(".editMenu-column").length == 0) {	
				if (typeof(window["grid_obj"]) != "undefined") {
					grid_obj.set_one_grid(J_obj.find(grid_obj._grids)[0]); // grid 연동
				}
			}

		},

		'check' : function() {

			// 다중 그리드 처리
			jQuery(builder._obj).children().each(function(){

				var J_this = jQuery(this);
				
				// 우측블록을 드래그 중이면(드롭되면 실행됨)
				if (J_this.hasClass('ui-draggable-dragging')) {
					var _grid = J_this.find(grid_obj._grids);
					if (_grid.length > 1) {
						_grid.eq(0).unwrap();
						_grid.each(function() {
							jQuery(this).wrap('<div class="ui-draggable ui-draggable-outline"><div class="_one-row"></div></div>');						
							editor.mode.adjust_display(this); // 모드별 display 처리
						});
					} else {
						editor.mode.adjust_display(_grid[0]); // 모드별 display 처리
					}
				}
				
			});
			
			jQuery(builder._obj).children().each(function(){

				var J_this = jQuery(this);

				if (J_this.hasClass("ui-draggable-handle")) {
					J_this.removeClass("ui-draggable-handle");
				}			
	
				builder.setting.make(this);		
				J_this.removeAttr("data-ex").removeAttr("data-keyword").removeAttr("style").removeClass('_example_block');

			});

			if (builder.html._html_obj[0]) {
				ani_type_obj.checking(builder.html._html_obj[0]); // 실행할 ani_type 실행		
			}
			
		},

		'reset' : function(obj) { // 좌측설정창(.editMenu-builder) 감추기

			if (!get_is_parents(obj,'.editMenu-builder')) {
				if (get_is_parents(obj,'._one-row') != builder._before) {
					// 한 column 설정창 닫기	
					obj_fadeOut('.editMenu-builder');
					// 바깥테두리 제거
					jQuery(".ui-draggable").removeClass('ui-draggable-outline');
				}
			}
		},
		
		'select' : function(obj) { // 좌측설정창(.editMenu-builder) 보이기

			var J_obj = jQuery(obj);
			var _ui_draggable = get_is_parents(obj,'.ui-draggable');
			var J_ui_draggable = jQuery(_ui_draggable);
			
			// 클릭한 지점 이벤트가 편집기 안쪽일 경우		
			if (_ui_draggable && J_obj.parents(builder._obj).length > 0) {

				// 선택된 부분만 바깥테두리 표시
				J_ui_draggable.addClass('ui-draggable-outline');

				var _mode = mode_obj.get();
				if (_mode == '') {	          
				 	// 세로설정툴 나타남
	          		obj_fadeIn(J_ui_draggable.find('.editMenu-builder')[0]);
				}	          
				builder._before = J_obj.parents('._one-row')[0];
			}
			
		}	
								
	}, //setting
	
	handle : {

		'copy' : function(e){ // 그리드 복사
			
			var evt = get_evt_obj(e);

			M9ALT.hidden(evt); // 복사 버튼 title값 삭제방지
						
			var _clone = jQuery(evt).parents(".ui-draggable").clone().fadeIn(1000);
			jQuery(evt).parents(".ui-draggable").after(_clone);
			_clone.css('display','');	 // display 속성삭제 위해			
			_clone.find('.editMenu-builder').css('display','none');
			_clone.find('.editMenu-column').css('display','none');
			_clone.find('.grid-line-on').removeClass('grid-line-on');
			_clone.removeClass('ui-draggable-outline');			
			_clone.find('.selected_tag').removeClass("selected_tag");
			obj_fadeOut('#editMenu-setting');
			
			builder.setting.reset();
			builder.setting.check();
			
			_clone.find(grid_obj._grids).removeClass('ui-sortable'); // sortable 설정위해
			grid_obj.set_one_grid(_clone.find(grid_obj._grids)[0]);
			editor.mode.adjust_display(_clone.find(grid_obj._grids)[0]); // 모드별 display 설정
			
			process_M9ALT(jQuery(_clone)[0]);
		},

		'del' : function(e) { // 그리드 삭제

			//builder.handle._del_e = e;

			var evt = get_evt_obj(e);
			builder.handle._del_e = evt;

			M9ALT.hidden(evt);
			obj_fadeOut('#editMenu-grid');

			confirm_msg.view(msg_msg('msg_68','a'),"builder.handle._del"); // '삭제하시겠습니까? 복원불가합니다.'

		},
		'_del_e' : false,
		'_del' : function(Dvar) { // 그리드 삭제

			if (Dvar != 1) {
				return false;
			}

			var evt = builder.handle._del_e;

			jQuery(evt).parents('.ui-draggable').fadeOut(400, function (){	
				undo_obj.remove(jQuery(evt).parents('.ui-draggable').attr('id')); // undo 삭제
				jQuery(evt).parents(".ui-draggable").remove();
			});
			
		},
			
		'html' : function(e){ // * 사용하는곳이 없는듯
			html_obj.view(jQuery(e.target).parents(".ui-draggable")[0]);
		}	
					
	}, //handle
		
	html : {

		_html_obj : false,
	
		'int' : function() {

			if (jQuery("#builder-html").length == 0) {
				var _html = '<div id="builder-html" class="html-win curtain-box">' +
				'<textarea id="builder_html_textarea" title="'+ msg_msg('fix_html','a') +'" alt_no="1"></textarea>' +
				'<button onclick="builder.html.change()" class="curtain-btn editor-btn-yes">OK</button>' +
				'</div>';
				jQuery("body").append(_html);			
			}
					
		},

		'view' : function(e) {
			
			//window_control.hidden();
			var evt = get_evt_obj(e);				
			builder.html._html_obj = jQuery(evt).parents('.ui-draggable');
			var _html = builder.html._html_obj[0].outerHTML;
			_html = builder.html.convert(_html);
			jQuery("#builder_html_textarea").val(_html);		
			m9_code_editor.set('builder_html_textarea',jQuery("#builder_html_textarea").val());
			curtain.show("builder-html");
			
		},

		'convert' : function(_html) {

			jQuery("body").append('<div id="_edit_covert_box" style="display:none"></div>');		

			var J_edit_convert_box = jQuery('#_edit_covert_box');
						
			J_edit_convert_box.html(_html);

			J_edit_convert_box.find('.ui-draggable').each(function() {
				this.outerHTML = jQuery(this).find('._one-row').html();				
			});
						
			J_edit_convert_box.find(grid_obj._columns).each(function() {
				this.innerHTML = jQuery(this).find('._one-in-column').html();
			});

			jQuery('.grid-mode-setting-box,._cols-setting-area').remove();
									
			table_obj.remove_setting(J_edit_convert_box[0]);
			//google_map_obj.remove_setting(J_edit_convert_box[0]);

			// ie7이하에서는 column에 width,min-width 가 생성됨 => 삭제처리
			J_edit_convert_box.find(grid_obj._columns).css({'width':'','min-width':'','z-index':''});
			J_edit_convert_box.find('.ui-sortable').removeClass('ui-sortable');
			J_edit_convert_box.find('.selected_tag').removeClass('selected_tag');			
			J_edit_convert_box.find('[contenteditable]').removeAttr('contenteditable');
			J_edit_convert_box.find('*[class=""]').removeAttr('class');
			J_edit_convert_box.find('*[style=""]').removeAttr('style');
			mode_obj.remove_empty_style('#_edit_covert_box'); // 공백인 data-m9-X-style 삭제

			var _html = J_edit_convert_box.html();
			J_edit_convert_box.remove();
			//_html = remove_empty_line(_html);
			_html = jQuery.trim(_html);

			return _html;
					
		},

		'change' : function() {

			jQuery("#builder_html_textarea").val(m9_code_editor.get('builder_html_textarea'));
			var _html = jQuery("#builder_html_textarea").val();	
			_html = grid_obj.html.parser(_html);		
			jQuery(builder.html._html_obj[0]).find('._one-row').html(_html);
			jQuery("#builder_html_textarea").val("");
			builder.setting.check();
			undo_obj._add(grid_obj._grid_before);
			curtain.hide();

		},
						
		'get' : function(_id) {

			var _html = jQuery("#"+_id).html();	
			_html = builder.html.convert(_html);

/*
			var _css_str = fontfamily_obj.get_css(_html); // 글꼴가져오기
			if (_css_str != '') {
				_html = _css_str + "\n\n" + _html;
			}
*/

			//var _css_str = google_map_obj.get_js(_html); // 구글맵 js가져오기			
			//if (_css_str != '') {
				//_html = _css_str + "\n\n" + _html;
			//}
			
			return _html;
					
		}		
			
	}, //html

	'example_change' : function() { // 우측블록 키워드로 정렬

		var chars = jQuery('#_editor_example_choice').val();
	
		if (chars == '') {
			jQuery('#_eidtor_example>div').css('display','block');
			jQuery('#_editor_example_search_error_msg').css('display','none');			
			return false;
		}
		
		var rgExp = new RegExp(''+chars+'','gi');	
		var _match = 0;
		jQuery('#_eidtor_example>div').each(function() {
			
			var J_this = jQuery(this);
			var _key = J_this.data('keyword');	
			
			if (_key.match(rgExp)) {
				J_this.css({'display':'block'});				
				_match++;
			} else {
				J_this.css({'display':'none'});				
			}
		});
		var _display = (_match == 0) ? "block" : "none";
		jQuery('#_editor_example_search_error_msg').css('display',_display);
	}

}; //builder