var m9evt = false;

var EHASH = {
	placeholder_txt : msg_msg('msg_36','a'), // "내용입력해주세요"
	selected_tag : "h1,h2,h3,h4,h5,h6,p,div,li,blockquote,th,td,i,span,strong,a",
	colors_class : ['black','grey','light-grey','light-blue','yellow','blue','gold','green','olive-green','orange','purple','red','turquoiseblue','violet','deepblue','teal','mauve','pearl','steelblue','coffee','coral','crimson','hotpink','indianred','aqua','white','grey2']
};

var m9_editor = {
	
	'defaults' : {
		'type' : 'base',
		'lang' : 'en' ,
		'content_type' : 1,
		'use_convert' : 1,
		'use_builder' : 1,
		'use_grid' : 1,
		'use_obj' : 1,
			'upload_url' : '',
			'img_max_width' : '',
		'use_element' : 1,
		'example_html' : './block/example.html'
	},
	
	'setting' : {},
	'checking_unload' : true, // 페이지벗어나기 이벤트
	'cpu' : 0, // ie 속도 fadeIn/fadeOut 설정
	
	'int' : function(_id,_hash) {
		
		if (jQuery('#' + _id).length == 0) { return false; }

		var set = get_vars(_hash,this.defaults);
		this.setting = set;

		if (Mong9_Font_Family) {
			fontfamily_obj._fonts = Mong9_Font_Family;
		}
		
		var textarea_obj = jQuery('#' + _id);		
		var edit_id = _id + "_editor";

		var _max_width = get_object_size2(textarea_obj[0],'width');

		jQuery('<div class="_editor-header"></div>').insertBefore(textarea_obj);

		var _html = '<div class="_editor_var_div">';
		_html += '<input type="hidden" id="'+_id+'_editor_mode" name="'+_id+'_editor_mode" value="1" />';
		_html += '</div>';
		jQuery(_html).appendTo('._editor-header');

		if (this.setting.type == 'master') {
			var _html = '<div class="editor-mode-box">';
			_html += '<button onclick="mode_obj.change(\'\');return false" class="btn-mode-pc _mode-btn active">PC</button>';
			_html += '<button onclick="mode_obj.change(\'m\');return false" class="btn-mode-m _mode-btn">Mobile Portrait</button>';
			_html += '<button onclick="mode_obj.change(\'e\');return false" class="btn-mode-e _mode-btn">Mobile Landscape</button>';
			_html += '</div>';
			jQuery(_html).appendTo('._editor-header');
						
			var _html = '<div class="editor-etc-box">';		
			_html += '<button data-content-mode="html" onclick="editor.handle.change_content_type(\'' + _id + '\',this);return false;" class="editor-btn _type editor-btn-no">html</button>';
			_html += '<button onclick="send_parent_editor(\''+ _id + '\');return false;" class="editor-btn _save editor-btn-yes">'+msg_msg('save','a')+'</button>';	
			_html += '</div>';		
			jQuery(_html).appendTo('._editor-header');	
		}
		
		mode_obj.edit_wrap(textarea_obj);
		textarea_obj.after('<div id="' + edit_id + '" class="m9_editor_box m9not"></div>');
		textarea_obj.wrap('<div id="' + _id + '_wrap" style="display:none"></div>');

		var obj = jQuery('#' + edit_id);
		obj.css({'min-height':textarea_obj.css('height'),'height':'auto'});

		var str = m9_editor.convert.set(_id);

		obj[0].innerHTML = str;

		if (_get_num(jQuery('body').css('width')) >=1000) { obj.css('max-width',_max_width); } // 깨짐방지

		if (this.setting.type == 'master') {
			//if (set['use_element'] == 1) { element_obj.int(edit_id); }			
		}
		
		if (set['use_element'] == 1) { element_obj.int(this.setting.type); }
		if (set['use_grid'] == 1) { grid_obj.int(edit_id); }
		if (set['use_builder'] == 1) { builder.int(edit_id,{ 'example_html' : set['example_html'] }); }
		if (set['use_obj'] == 1) { img_obj.int(obj[0],{'upload_url':set['upload_url'],'img_max_width':set['img_max_width']}); }

		editor.int(_id,this.setting.type);

		//undo_obj.int(obj[0]);
		
		if (set['content_type'] == 1) {
			textarea_obj.css('display','none');
		} else {
			obj.css('display','none');
			jQuery('#example').css('display','none');
		}

		if (_SET["navigator"] == "ie") {
			if (ie_var < 10) {
				m9_editor.cpu = 1;		
			}
			//document.getElementById(edit_id).onresizestart = function(){ return false; } // ie 박스조절무시하기
		} else if (_SET["navigator"] == "safari") {
			m9_editor.cpu = 1;					
		}

		jQuery(document).on('mousedown',function(e) {
			m9evt = get_evt_obj();
		});
		
		jQuery(window).on('beforeunload', function(){
			if (m9_editor.checking_unload) {
				return msg_msg('msg_37','a'); // "이 페이지를 벗어나면 작성된 내용은 저장되지 않습니다!"
			}
		}); 

		if (this.setting.type == 'master') {
			jQuery('#edit_menu,#editWindow-setting').css('display','block');
			jQuery('._drag-btn-2').addClass('disabled').prop('disabled','disabled');
		}


		var mouseover_func = function(e) {
			events_function('mouseover',e);	
		};

		var mousedown_func = function(e) {
			events_function('mousedown',e);
		};

		var mouseout_func = function(e) {
			events_function('mouseout',e);
		};

		editor_event.set(obj[0],[
			{ '_type' : 'mouseover' , '_func' : mouseover_func },
			{ '_type' : 'mousedown' , '_func' : mousedown_func }
		]);

		undo_obj.int(obj[0]);
		
	},
	
	'ready_submit' : function(edit_id,return_form) {
		m9_editor.checking_unload = false;
	},
	
	'check_value' : function(_id) {
			
		var mode_id = _id + '_editor_mode';		
		var mode_type = jQuery('#' + mode_id).val();
	
		var textarea_obj = jQuery('#' + _id);	
		var edit_id = _id + "_editor";
		var obj = jQuery('#' + edit_id);

		var _html = "";
		if (mode_type == 1) {
			_html = builder.html.get(edit_id);
			
			jQuery("body").append('<div id="_edit_covert_box" style="display:none"></div>');		
			jQuery("#_edit_covert_box")[0].innerHTML = _html;
			var _txt = jQuery("#_edit_covert_box").text();
			jQuery("#_edit_covert_box").remove();			
			_txt = _txt.replace(/^\s+|\s+$/g,""); // 공백치환					
			if (_txt == EHASH['placeholder_txt']) {
				textarea_obj.html("");
				obj.html("");
				return 0;								
			}	
		} else {
			_html = textarea_obj.val();			
		}

		return ((_html == "") ? 0 : 1);
	},

	'get_value' : function(_id) {

		mode_obj.change(''); // To pc mode
	
		var mode_id = _id + '_editor_mode';		
		var mode_type = jQuery('#' + mode_id).val();
	
		var textarea_obj = jQuery('#' + _id);	
		var edit_id = _id + "_editor";
	
		if (mode_type == 1) {
			var _html = builder.html.get(edit_id);
			textarea_obj.val(_html);
		}

		m9_editor.convert.get(_id);

		m9_editor.ready_submit(edit_id); // 편집기 저장 준비
		
		return textarea_obj.val();
					
	},

	'convert' : {

		'set' : function(_id) {

			var textarea_obj = jQuery('#' + _id);
			var edit_id = _id + "_editor";

			var _s_id = edit_id + '_settings';
			textarea_obj.after('<div id="' + _s_id + '" class="m9not _mong9_setting_box" style="display:none"></div>');
			var str = textarea_obj.val();

			var rgExp = /[-\d\.]+/;
			var rgExp = /\<\!\-\-\s*\/\/\s*m9\_font\_family\(\s*(.*)\s*\)\s*\/\/\s*\-\-\>/i; // <!--//m9_font_family(XXX,XXX,XXX)//-->
			var matches = str.match(rgExp);

			if (matches && matches[1]) {
				var font_familys = matches[1].split(',');
				for (var i=0;i<font_familys.length;i++) {
					jQuery('<link type="text/css" rel="stylesheet" href="' + font_familys[i] + '" />').appendTo('#'+_s_id);
				}
			}

			str = str.replace(/\<\!\-\-\s*\/\/\s*Mong9\s*Editor\s*\/\/\s*\-\-\>/i, '');
			str = str.replace(/\<\!\-\-\s*\/\/\s*m9\_font\_family\(\s*(.*)\s*\)\s*\/\/\s*\-\-\>/i, '');

			return str;

		},

		'get' : function(_id) {

			var textarea_obj = jQuery('#' + _id);

			jQuery("body").append('<div id="_edit_covert_box" style="display:none"></div>');	
			var J_edit_convert_box = jQuery('#_edit_covert_box');
			J_edit_convert_box.html(textarea_obj.val());

			J_edit_convert_box.find('p,br').each(function() {
				if (!jQuery(this).attr('class') && !jQuery(this).attr('style')) {
					jQuery(this).addClass('_mong9');
				}
			});

			var _html = J_edit_convert_box.html();
			J_edit_convert_box.remove();
			textarea_obj.val(_html);

			var edit_id = _id + "_editor";

			var font_lists = [];
			jQuery('#'+edit_id).find('[style]').each(function() {
				var _font_family = get_inline_style(this,'font-family',1);
				if (_font_family != '') {
					_font_family = _font_family.replace(/\'/g,'').replace(/\"/g,'');
					font_lists.push(_font_family);
				}
			});

			var _html = '<!--//Mong9 Editor//-->';

			if (font_lists.length > 0) {

				var family_lists = jQuery.union(font_lists,[]);

				var family_css = [];

				for (var z=0;z<family_lists.length;z++) {
					for (var i=0;i<fontfamily_obj._fonts.length;i++) {
						var d = fontfamily_obj._fonts[i];
						if (d[0] == family_lists[z]) {
							family_css.push(d[2]);
							break;
						}
					}
				}

				_html += '<!--//m9_font_family(' + family_css.join(',') + ')//-->';
			}

			var re_str = _html + textarea_obj.val();
			textarea_obj.val(re_str);

		}

	}
	
};

function put_form_by_editor(return_form,edit_id) {
	var mode_id = edit_id + '_editor_mode';	
	m9_editor.get_value(edit_id);	
	return false;
	put_form_by_inputs(return_form,[edit_id,mode_id,'edit_name']);	
}

var window_control = {
	
	hidden : function() {
		alert(1);
		jQuery('._setting_area_box,._m9btn,._m9window,.handle_width').css('display','none');
	}
};

var edit_window_obj = {
	'_list' : {},
	'_reset' : {},
	
	_sons : {},
	'int' : function(_id,_html,txt,_function) {
		
		if (jQuery('#' + _id).length == 0) {
			
			if (!edit_window_obj._list[_id]) {
				edit_window_obj._list[_id]++;
			}
			if (!txt) { txt = ''; }
			jQuery('body').append('<div id="' + _id + '" class="_edit_window _m9editor _m9window"></div>');
			jQuery('#' + _id).append('<div class="_handle">' + txt + '<a href="" onclick="edit_window_obj.close(\'' + _id + '\');return false;" class="win_btn btn">X</a></div>')
			.append('<div class="_edit_in">' + _html + '</div>').draggable({'handle':'._handle'}).css('display','none');
			
			if (_function) {
				if (_function['reset']) {
					this._reset[_id] = _function['reset'];
				}
			}
		}
	},
	'view' : function(_id) {

		var _win = get_is_parents(m9evt,'._m9window');
		if (_win) {
			parent_win_id = jQuery(_win).prop('id');
			if (this._sons[parent_win_id]) {
				this.close(this._sons[parent_win_id]);
			}
			this._sons[parent_win_id] = _id;		
		}
		
		if (this._reset[_id]) {
			this._reset[_id]();
		}
		obj_fadeIn('#' + _id);
	},
	'close' : function(_id) {
		if (this._sons[_id]) {
			this.close(this._sons[_id]);
			this._sons[_id] = false;
		}
		obj_fadeOut('#' + _id);
	}
};

function process_M9ALT(obj) {
	jQuery(obj).find('a').each(function() {				
		jQuery(this).on('mouseover',function(e) {
			M9EVENT.mouseover(e.target);
		}).on('mouseout',function(e) {
			M9EVENT.mouseout(e.target);
		}); 
	});
}

function obj_fadeIn(obj,speed) {
	if (!speed) { speed = 300; }	
	if (m9_editor.cpu == 1) {
		jQuery(obj).css('display','');
	} else {	
		jQuery(obj).stop(true,true).fadeIn(speed,function(){ jQuery(this).css('opacity',1); }); /* 중요 */		
	}
}

function obj_fadeOut(obj,speed) {
	if (!speed) { speed = 300; }
	if (m9_editor.cpu == 1) {
		jQuery(obj).css('display','none');
	} else {
		jQuery(obj).stop(true,true).fadeOut(speed); /* 중요 */		
	}
}

// 엑셀 스타일의 반올림 함수 정의
function roundXL(n,digits) {
  if (digits > 0) return parseFloat(n.toFixed(digits)); // 소수부 반올림
  digits = Math.pow(10, digits); // 정수부 반올림
  var t = Math.round(n * digits) / digits;
  return parseFloat(t.toFixed(0));
}

function match_mong9_url(Dstr) {
	return Dstr.replace(new RegExp('__mong9_editor_url__','gi'),_SET["mong9_editor_url"]);
}