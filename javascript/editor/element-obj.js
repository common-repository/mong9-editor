html_info = {
//	'p' : '<p>This paragraph is an example paragraph.</p>',
	'p' : '<p>'+ msg_msg('msg_49','a') +'</p>',
	'div' : '<div>DIV</div>',
	'img' : '<img src="http://image.mong9.com/etc_img/etc/img.png" alt="" alt_no="1" class="fullimg" />',
	'icon' : '<i class="axi axi-chevron-circle-down"><i>&nbsp;</i></i>',
	'button' : '<a class="button default">Button</a>',
	'video' : '<div class="video-canvas-16x9"><div><iframe src="//www.youtube.com/embed/P5yHEKqx86U?rel=0" frameborder="0" allowfullscreen></iframe></div></div>',
	'map' : '<div ani_type="google_map(x:126.9753042,y:37.5599416,zoom:16,address:\'Address\',title:\'Company\')" class="inline-block map-canvas google_map _not _aspectAll"></div>',
	'unlist' : '<ul class="list-style-1">' + 
					'<li>Used to enter an unordered list.</li>' +
					'<li>Used to enter an unordered list.</li>' +
					'<li>Used to enter an unordered list.</li>' +
					'<li>Used to enter an unordered list.</li>' +
					'</ul>',
	'ollist' : '<ol class="list-style-1">' + 
					'<li>Used to enter an ordered list.</li>' +
					'<li>Used to enter an ordered list.</li>' +
					'<li>Used to enter an ordered list.</li>' +
					'<li>Used to enter an ordered list.</li>' +
					'</ol>',
	'table' : '<table summary="" class="table-1">' +
					'<caption></caption>' +
					'<thead>' +
					'<tr>' +
					'<th scope="col">Title</th>' +
					'<th scope="col">Title</th>' +
					'<th scope="col">Title</th>' +
					'<th scope="col">Title</th>' +
					'</tr>' +
					'</thead>' +
					'<tbody>' +
					'<tr>' +
					'<th scope="row">Content</th>' +
					'<td>Content</td>' +
					'<td>Content</td>' +
					'<td>Content</td>' +
					'</tr>' +
					'<tr>' +
					'<th scope="row">Content</th>' +
					'<td>Content</td>' +
					'<td>Content</td>' +
					'<td>Content</td>' +
					'</tr>' +
					'</tbody>' +
					'<tfoot>' +
					'<tr>' +
					'<th scope="row">Content</th>' +
					'<td>Content</td>' +
					'<td>Content</td>' +
					'<td>Content</td>' +
					'</tr>' +
					'</tfoot>' +
					'</table>',
	'h1' : '<h1 class="m9-h1">Please enter a title(H1).</h1>',
	'h2' : '<h2 class="m9-h2">Please enter a title(H2).</h2>',
	'h3' : '<h3 class="m9-h3">Please enter a title(H3).</h3>',
	'h4' : '<h4 class="m9-h4">Please enter a title(H4).</h4>',
	'h5' : '<h5 class="m9-h5">Please enter a title(H5).</h5>',
	'h6' : '<h6 class="m9-h6">Please enter a title(H6).</h6>'
};

var style_info = {
	'f_text_decoration' : {
		'_class' : ['text-decoration-1','text-decoration-2','text-decoration-3'],		
		'_class_names' : ['U1','U2','U3']
	},		
	'f_strong' : {
		'_class' : ['strong-1','strong-2','strong-3'],		
		'_class_names' : ['fs1','fs2','fs3']
	},	
	//'f_style' : {
		//'_class' : ['f-style-1','f-style-2','f-style-3','f-style-4'],			
		//'_class_names' : ['f1','f2','f3','f4']
	//},	
	'font_size' : {
		'_class' : ['f-xsmall','f-small','f-size','f-large','f-xlarge','f-xxlarge','f-xxxlarge','f-big','f-huge'],		
		'_class_names' : ['s1','S','M','L','x1','x2','x3','big','huge']
	},
	'line_height' : {
		'_class' : ['line-height-100','line-height-110','line-height-120','line-height-140','line-height-160','line-height-170','line-height-200'],		
		'_class_names' : ['1.0','1.1','1.2','1.4','1.6','1.7','2.0']
	},	
	'border_style' : {
		'_class' : ['solid','dotted','dashed','double','groove','ridge','inset','outset'],		
		'_class_names' : ['solid','dotted','dashed','double','groove','ridge','inset','outset']		
		//'_class_names' : ['실선(solid)','점선(dotted)','파선(dashed)','이중실선(double)','오목(groove)','볼록(ridge)','넣기(inset)','빼기(outset)']
	},
		
	'box_shape_style' : {
		'_class' : ['box-style-1','box-style-2','box-style-3','box-style-4','box-style-5','box-style-6','box-style-7']
	},
	'box_pattern_style' : {
		'_class' : ['box-pattern-1','box-pattern-2','box-pattern-3','box-pattern-4','box-pattern-5','box-pattern-6','box-pattern-7']
	},
	'box_round_style' : {
		'_class' : ['round-0','round-1','round-2','round-3','round-4','round-5','round-6','round-7','round-8','round-9','round-10','round-11','round-12','round-13','round-14','round-15','round-16','round-circle','circle']
	},
	'text_shadow_style' : {			
		'_class' : ['text-shadow-1','text-shadow-2','text-shadow-3','text-shadow-4','text-shadow-5']
	}	
};
var _border_style = style_info.border_style;
for (var i=0;i<_border_style._class.length;i++) {
	//_border_style._class_names[i] = msg_msg(_border_style._class[i],'a') + '(' + _border_style._class[i] + ')';
	_border_style._class_names[i] = msg_msg(_border_style._class[i],'a');	
}

var tab_get = {
	'style' : ['box_shape_style','box_pattern_style','box_color_style','box_round_style','text_shadow_style'],	
	'font' : ['font_family','color','font_weight','font_style','text_decoration','line_through','font_size','line_height','word_spacing','letter_spacing','f_strong','f_text_decoration'], // 'f_style'
	'border' : ['background_color','border','border_radius'],
	'padding_margin' : ['padding','margin'],
	'align' : ['text_align','vertical_align','float']
};

var element_obj = {
	
	_edit : false,
	_now : false,
	_now_tab : 'font',
	
	'_get_obj_id' : function(_id) { return '_editor_' + _id; },

	'get_guess_property_var' : function(_property,_units) {
		var re = new RegExp(_property+":([^\\;]+)",'gi');
		var retVal = re.exec(jQuery(element_obj._now).attr('style'));
		var _val;
		if (retVal) {
			_var = retVal[1].replace(/\s/g,"");
		} else {
			_var = jQuery(element_obj._now).css(_property);
			var num_unit = splitUnit(_var);
			if (num_unit[1] == 'px') {
				_var = convert_unit.guess(_var,_units);
			}
		}
		return _var;
	},

	'get_property_var' : function(_property) {
		var re = new RegExp(_property+":([^\\;]+)",'gi');
		var retVal = re.exec(jQuery(element_obj._now).attr('style'));
		return (retVal) ? retVal[1].replace(/\s/g,"") : jQuery(element_obj._now).css(_property);
	},
	
	'get_var' : function(_property) {
		return jQuery(element_obj._now).css(_property);
	},
	
	'set_var' : function(Did,Dvar) {		
		jQuery('#'+element_obj._get_obj_id(Did)).val(Dvar);	
	},	
	
	'get_input_var' : function(Did) {	
		return jQuery('#'+element_obj._get_obj_id(Did)).val();
	},

	'get_selectedObj' : function() {
		Selection2Obj();
		if (jQuery('.selected_tag').length > 0) { element_obj._now = jQuery('.selected_tag'); }	
	},
					
	'menu' : {
		
		'get' : function(_id) {
			
			if (!_id) { return false; }
			if (!element_obj._now) { return false; }						
			if (!get_is_parents(element_obj._now,'._one-in-column')) { // _setting_area_box 오버시
				return false;
			}

			var lists = tab_get[_id];
			for (var i=0;i<lists.length;i++) {
				var _name = lists[i];
				if (element_obj.edit[_name]) {
					element_obj.edit[_name].get(); 
				} else {
					if (jQuery('#_editor_' + _name).length > 0) { //select 박스일때
						element_obj.edit['class'].get(_name);
					} else { // class 버튼일때
						element_obj.edit.operations('',_name,''); // "" : 객체 종류 클릭시			
					}
				}
			}
			
		},
		
		'remove' : function(_id) {
			
			if (!_id) { return false; }
			Selection2Obj();		
			if (!element_obj._now) { return false; }		
			if (!get_is_parents(element_obj._now,'._one-in-column')) { // _setting_area_box 오버시
				return false;
			}			

			var lists = tab_get[_id];
			for (var i=0;i<lists.length;i++) {
				var _name = lists[i];				
				if (element_obj.edit[_name]) {
					element_obj.edit[_name].remove(); 
				} else {
					if (jQuery('#_editor_' + _name).length > 0) { //select 박스일때
						element_obj.edit['class'].remove(_name);
					} else { // class 버튼일때
						element_obj.edit.remove_class_by_btn(_name); // 버튼 클래스 제거
					}
				}
			} //for
			
			var _mode = mode_obj.get();
			if (_mode != '') {
				var _style = mode_obj.get_style_str_by_mode(element_obj._now,_mode); // 모드에 의한 style 문자열 얻어오기
				jQuery(element_obj._now).attr('style',_style);
			}
		},
		
		'get_auto' : function(_tab) {
			if (_tab && _tab != element_obj._now_tab) {
				jQuery('#_tab-menu-'+_tab).trigger('click');
			} else {
				_tab = element_obj._now_tab;
			}
			element_obj.menu.get(_tab);
		}
	},

	int : function(_type) {

		if (_type == 'master') {
			element_obj.win.int();
		}

		jQuery(document).on('mousedown',function(e) {

			var et = e.target;
			var J_et = jQuery(et);

			// m9_editor_box 편집기
			// _setting_area_box 이미지등의 가림막
			// _m9editor 각종핸들
			if (get_is_parents(et,'.m9_editor_box') || get_is_parents(et,'._setting_area_box')) { // 편집기
				if (!get_is_parents(et,'._m9editor')) { // 설정창		
					element_obj.win.view(et);
				}
			}

		});
		
	},
	
	edit : {
		
		'convert_obj' : function(obj,_tab) {

			var J_obj = jQuery(obj);
			
			var _ctrl = 0;
			if (editor._ctrl == 1) {
				if (J_obj.is('.selected_tag')) {
					J_obj.removeClass('selected_tag');
					element_obj._now = false;
					editor._now = false;
					_ctrl = 1;
				} else {
					J_obj.addClass('selected_tag');
					element_obj._now = jQuery('.selected_tag');	
					editor._now = element_obj._now;						
				}
			} else {
				jQuery('.selected_tag').removeClass('selected_tag');
				J_obj.addClass('selected_tag');
				element_obj._now = jQuery('.selected_tag');	
				editor._now = element_obj._now;	
				jQuery(editor._now[0]).trigger('click');
			}	
			if (_ctrl == 0) {
				element_obj.menu.get_auto(_tab);
			}
			grid_obj.setting.set(obj); // 클릭지점의 그리드 활성화
			builder.setting.select(obj); // 좌측설정창(.editMenu-builder) 보이기 --- 커텐 클릭시 좌측 설정창 나오게 설정

		},

		'_remove' : function(Did,Dreset) {		
			if (!element_obj.edit[Did]) { return false; }
			element_obj.get_selectedObj();		
			var ele = element_obj.edit[Did];					
			element_obj.change_css_by_mode(ele._property,'');
			ele.get();
			undo_obj._add(element_obj._now);
		},
				
		'remove_class_by_btn' : function(Dname) {
			if (style_info[Dname]) {	
				var Sarray = style_info[Dname]['_class'];
				var J_ele_now = jQuery(element_obj._now);
				for (var z=0;z<Sarray.length;z++) {												
					J_ele_now.removeClass(editor.mode.get_class(Sarray[z]));
					jQuery('._' + Sarray[z]).removeClass('active');
				}
			}	
		},

		'class2' : {
			
			'change' : function(Dname,Dvar) {
				element_obj.get_selectedObj();
				if (!element_obj._now) { return false; }
				var btn = jQuery(m9evt);
				if (btn.hasClass('active')) {
					btn.removeClass('active');
					jQuery(element_obj._now).removeClass(editor.mode.get_class(Dvar));					
					return false;
				}
				
				var Dcode = Dname.replace(/\_/g,'-');				
				element_obj.change_css_by_mode(Dcode,'');		
				if (style_info[Dname]) {	
					var Sarray = style_info[Dname]['_class'];
					var J_ele_now = jQuery(element_obj._now);
					for (var i=0;i<Sarray.length;i++) {						
						J_ele_now.removeClass(editor.mode.get_class(Sarray[i]));									
					}
				}				
				jQuery(element_obj._now).addClass(editor.mode.get_class(Dvar));				
				element_obj.edit.operations(4,Dname,Dvar); // type:4 클래스 버튼 클릭
				undo_obj._add(element_obj._now);																	
			},
			
			'remove' : function(Dname) {
				var Dcode = Dname.replace(/\_/g,'-');								
				jQuery(element_obj._now).css(Dcode,"");					
				if (style_info[Dname]) {	
					var Sarray = style_info[Dname]['_class'];
					var J_ele_now = jQuery(element_obj._now);
					for (var i=0;i<Sarray.length;i++) {						
						J_ele_now.removeClass(editor.mode.get_class(Sarray[i]));								
					}
				}				
				element_obj.edit.operations(4,Dname,''); // type:4 클래스 버튼 클릭
				undo_obj._add(element_obj._now);																	
			}			
		},
		
		'class' : {
			
			'change' : function(_name) {
				
				element_obj.get_selectedObj();
				var _obj = jQuery("#"+_name);						
				var Cvar = _obj.val();

				var J_ele_now = jQuery(element_obj._now);
									
				if (_name == '_editor_box_color_style') { // 색상관련일 경우
					if (Cvar != '') {
						J_ele_now.css({'background-color':'','border-color':'','text-shadow':''});						
					}
				} else if (_name == '_editor_box_round_style') { // 모서리일 경우
					if (Cvar != '') {
						J_ele_now.css({'border-radius':''});						
					}					
				}
				var _options = _obj[0].options;
				for (var i=0;i<_options.length;i++) {
					if (_options[i].value != "") {
						J_ele_now.removeClass(_options[i].value);							
					}
				}

				J_ele_now.addClass(Cvar);				
				undo_obj._add(element_obj._now);	
							
			},
			
			'get' : function(_name) {
				var _obj = jQuery("#_editor_"+_name);			
				var _options = _obj[0].options;
				var J_ele_now = jQuery(element_obj._now);				
				for (var i=0;i<_options.length;i++) {
					if (_options[i].value != "") {
						if (J_ele_now.hasClass(_options[i].value)) {
							_obj.prop('selectedIndex',i);
							return i;	
						}
					}
				}
				_obj.prop('selectedIndex',0);		
				return -1;
			},			
			
			'remove' : function(_name) {
				var _obj = jQuery("#_editor_"+_name);		
				var _options = _obj[0].options;
				var J_ele_now = jQuery(element_obj._now);				
				for (var i=0;i<_options.length;i++) {
					if (_options[i].value != "") {	
						J_ele_now.removeClass(_options[i].value);								
					}
				}
				_obj.prop('selectedIndex',0);
				undo_obj._add(element_obj._now);
			}						
			
		},

		'font_family' : {
			
			'_id' : 'font_family',
			'_property' : 'font-family',
			'change' : function() {		
				element_obj.get_selectedObj();
				var Cvar = element_obj.get_input_var(this._id);		
				element_obj.change_css_by_mode(this._property,Cvar);
				fontfamily_obj.add_style(Cvar);
				undo_obj._add(element_obj._now,this._property);
			},
			'get' : function() {					
				var _var = element_obj.get_var(this._property);
				if (_var) {
					var f = _var.split(",");
					f[0] = f[0].replace(/\'|\"/g,''); // ex) "sans-serif", Open Sans
	 				_var = (fontfamily_obj._fonts_hash[f[0]]) ? fontfamily_obj._fonts_hash[f[0]] : f[0];
					_var = trim_quotes(_var);	 
				}
				element_obj.set_var(this._id,_var);	
			},	
			'remove' : function() {				
				element_obj.edit._remove(this._id);
			}				
									
		},
		
		'color' : {
			
			'_id' : 'color',
			'_property' : 'color',
			'change' : function() {
				element_obj.get_selectedObj();
				var Cvar = element_obj.get_input_var(this._id);				
				element_obj.change_css_by_mode(this._property,Cvar);				
				jQuery('#_color_preview_'+this._id).css('background-color',Cvar);
				undo_obj._add(element_obj._now,this._property);
			},					
			'get' : function() {
				var _var = color_obj_func.RGB2HEX(element_obj.get_var(this._property));							
				element_obj.set_var(this._id,_var);
				jQuery('#_color_preview_'+this._id).css('background-color',_var);								
			},
			'remove' : function() {			
				element_obj.edit._remove(this._id);
			},
			'set' : function(_var) {
				element_obj.set_var(this._id,_var);
				this.change();											
			}			
			
		},
		
		'font_weight' : {
			
			'_id' : 'font_weight',
			'_property' : 'font-weight',
			
			'change' : function(btn) {			
				element_obj.get_selectedObj();
				var Cvar = (jQuery(btn).hasClass('active')) ? 'inherit' : 'bold';
				element_obj.change_css_by_mode(this._property,Cvar);		
				if (Cvar == 'bold') {
					jQuery('._' + this._id).addClass('active');
				} else {
					jQuery('._' + this._id).removeClass('active');
				}
				undo_obj._add(element_obj._now,this._property);
			},					
			
			'get' : function() {			
				var _var = element_obj.get_var(this._property);
				var _checked = (_var == '' || _var == 'normal' || _var < 500) ? false : true; // 폰트마다 값이 다 다름
				if (_checked == true) {
					jQuery('._' + this._id).addClass('active');
				} else {
					jQuery('._' + this._id).removeClass('active');
				}			
			},
			
			'remove' : function() {
				element_obj.edit._remove(this._id);
			}
			
		},
		
		'font_style' : {
			
			'_id' : 'font_style',
			'_property' : 'font-style',
			'change' : function(btn) {
				element_obj.get_selectedObj();
				var Cvar = (jQuery(btn).hasClass('active')) ? 'normal' : 'italic';
				element_obj.change_css_by_mode(this._property,Cvar);				
				if (Cvar == 'italic') {
					jQuery('._' + this._id).addClass('active');
				} else {
					jQuery('._' + this._id).removeClass('active');
				}				
				undo_obj._add(element_obj._now,this._property);
			},					
			'get' : function() {
				var _var = element_obj.get_var(this._property);				
				var _checked = (_var == 'italic') ? true : false;
				if (_checked == true) {
					jQuery('._' + this._id).addClass('active');
				} else {
					jQuery('._' + this._id).removeClass('active');
				}
			},
			'remove' : function() {
				element_obj.edit._remove(this._id);
			}						
							
		},
		
		'text_decoration' : {
			
			'_id' : 'text_decoration',
			'_property' : 'text-decoration',
			'change' : function(btn) {
				element_obj.get_selectedObj();
				var Cvar = (jQuery(btn).hasClass('active')) ? 'none' : 'underline';
				element_obj.change_css_by_mode(this._property,Cvar);		
				if (Cvar == 'underline') {
					jQuery('._' + this._id).addClass('active');
				} else {
					jQuery('._' + this._id).removeClass('active');
				}					
				undo_obj._add(element_obj._now,this._property);
			},					
			'get' : function() {
				var _var = element_obj.get_var(this._property);				
				var _checked = (_var.search(/underline/gi) > -1) ? true : false;				
				if (_checked == true) {
					jQuery('._' + this._id).addClass('active');
				} else {
					jQuery('._' + this._id).removeClass('active');
				}				
			},
			'remove' : function() {
				element_obj.edit._remove(this._id);
			}				
									
		},
		
		'font_size' : {
			
			'_id' : 'font_size',
			'_property' : 'font-size',
			'change' : function() {
				element_obj.get_selectedObj();
				var Cvar = element_obj.get_input_var(this._id);				
				if (Cvar == "") { Cvar = _get_num(jQuery('body').css(this._property)); }
				var _unit = jQuery('#_editor_' + this._id + '_unit').val();
				element_obj.change_css_by_mode(this._property,Cvar+_unit);			
				element_obj.edit.operations(2,this._id,Cvar); // type:2 입력값 증/감버튼 클릭
				undo_obj._add(element_obj._now,this._property);
			},								
			'get' : function() {					
				var _var = element_obj.get_guess_property_var(this._property,['em']);
				this._remove_way = 0;
				element_obj.edit.operations('',this._id,_var); // "" : 객체 종류 클릭시					
			},
			'remove' : function() {
				this._remove_way = 1;				
				element_obj.edit.remove_class_by_btn(this._id); // 버튼 클래스 제거				
				element_obj.edit._remove(this._id);
			},
			'_remove_way' : 0
			
		},
				
		'line_height' : {
			
			'_id' : 'line_height',
			'_property' : 'line-height',
			'change' : function() {
				element_obj.get_selectedObj();
				var Cvar = element_obj.get_input_var(this._id);				
				var _unit = jQuery('#_editor_' + this._id + '_unit').val();						
				element_obj.change_css_by_mode(this._property,Cvar+_unit);						
				element_obj.edit.operations(2,this._id,Cvar); // type:2 입력값 증/감버튼 클릭
				undo_obj._add(element_obj._now,this._property);
			},
			'get' : function() {
				var _var = element_obj.get_guess_property_var(this._property,['%']);
				this._remove_way = 0;
				element_obj.edit.operations('',this._id,_var); // "" : 객체 종류 클릭시					
			},			
			'remove' : function() {
				this._remove_way = 1;
				element_obj.edit.remove_class_by_btn(this._id); // 버튼 클래스 제거				
				element_obj.edit._remove(this._id);
			},
			'_remove_way' : 0
			
		},	
		
		'word_spacing' : {
			
			'_id' : 'word_spacing',
			'_property' : 'word-spacing',
			'change' : function() {
				element_obj.get_selectedObj();
				var Cvar = element_obj.get_input_var(this._id);						
				var _unit = jQuery('#_editor_' + this._id + '_unit').val();
				element_obj.change_css_by_mode(this._property,Cvar+_unit);						
				element_obj.edit.operations(2,this._id,Cvar); // type:2 입력값 증/감버튼 클릭
				undo_obj._add(element_obj._now,this._property);
			},
			'get' : function() {
				var _var = element_obj.get_property_var(this._property);
				element_obj.edit.operations('',this._id,_var); // "" : 객체 종류 클릭시					
			},			
			'remove' : function() {			
				element_obj.edit._remove(this._id);	
			}							
						
		},
		
		'letter_spacing' : {
			
			'_id' : 'letter_spacing',
			'_property' : 'letter-spacing',
			'change' : function() {
				element_obj.get_selectedObj();
				var Cvar = element_obj.get_input_var(this._id);	
				var _unit = jQuery('#_editor_' + this._id + '_unit').val();				
				element_obj.change_css_by_mode(this._property,Cvar+_unit);						
				element_obj.edit.operations(2,this._id,Cvar); // type:2 입력값 증/감버튼 클릭
				undo_obj._add(element_obj._now,this._property);
			},
			'get' : function() {
				var _var = element_obj.get_property_var(this._property);
				if (_var == 'normal' || _var == 'initial' || _var == '0') { _var = '0px'; }
				element_obj.edit.operations('',this._id,_var); // "" : 객체 종류 클릭시			
			},
			'remove' : function() {			
				element_obj.edit._remove(this._id);
			}
			
		},
		
		'padding' : {
			
			'_id' : 'padding',
			'_property' : 'padding',
			'_types' : ['top','left','right','bottom'],
			
			'change' : function() {
				
				var _display = jQuery(element_obj._now).css('display');
				if (_display == 'inline') { // inline 이면 값이 적용안됨
					jQuery(element_obj._now).css('display','inline-block');
				}

				element_obj.get_selectedObj();
				var obj_id = element_obj._get_obj_id(this._id);
				var _css = [];
				if (jQuery('#' + obj_id + '_all').prop('checked') == true) {
					_css.push(this._property);
				} else {
					for (var i=0;i<this._types.length;i++) {
						var _id = obj_id + '_' + this._types[i];						
						if (jQuery('#' + _id).prop('checked') == true) {
							_css.push(this._property + '-' + this._types[i]);
						}
					}
				}
				var _unit = jQuery('#_editor_' + this._id + '_unit').val();
				if (!_unit || _unit == '') {
					_unit = 'px';
					jQuery('#_editor_' + this._id + '_unit').val(_unit);
				}
				
				var Cvar = jQuery('#'+obj_id).val();				
				for (var i=0;i<_css.length;i++) {				
					element_obj.change_css_by_mode(_css[i],Cvar+_unit);										
				}	
				element_obj.edit.operations(2,this._id,Cvar); // type:2 입력값 증/감버튼 클릭
				undo_obj._add(element_obj._now,this._property);
			},

			'get' : function() {	
				var _match = this._match();			
				var _checked = false;
				var _var = '';
				if (_match == 0) {
					//_var =  element_obj.get_property_var(this._property);
					_var = element_obj.get_guess_property_var(this._property,['em']);
					_checked = true;
				}
													
				var obj_id = element_obj._get_obj_id(this._id);				
				jQuery('#' + obj_id + '_all').prop('checked',_checked);
				for (var i=0;i<this._types.length;i++) {
					jQuery('#' + obj_id + '_' + this._types[i]).prop('checked',_checked);
				}				
				element_obj.edit.operations('',this._id,_var); // "" : 객체 종류 클릭시			
			},
						
			'remove' : function() {			
				element_obj.edit._remove(this._id);
			},
			'checked' : function(_type) {
				var obj_id = element_obj._get_obj_id(this._id);
				var _id = obj_id + _type;
				if (jQuery('#' + _id).prop('checked') == false) { return false; }
				var _obj = jQuery(element_obj._now);
				var Ckind = this._property;		
				var _var = '';		
				if (_type == 'all') {
					var _match = this._match();
					if (_match == 0) { _var = _get_num(_obj.css(this._property)); }
				} else {
					Ckind += '-' + _type;
					_var = _obj.css(Ckind);								
				}
				element_obj.edit.operations('',this._id,_var); // "" : 객체 종류 클릭시			
			},
			'_match' : function() {
				var _obj = jQuery(element_obj._now);				
				var _css = this._property + '-' + this._types[0];
				var _value = _obj.css(_css);
				var _match = 0;				
				for (var i=1;i<this._types.length;i++) {
					var _css = this._property + '-' + this._types[i];						
					var _value2 = _obj.css(_css);
					if (_value != _value2) {
						_match++;
						break;
					}
				}							
				return (_match == 0) ? 0 : 1;
			}
			
		},
		
		'margin' : {
			
			'_id' : 'margin',
			'_property' : 'margin',
			'_types' : ['top','left','right','bottom'],
			
			'change' : function() {

				var _display = jQuery(element_obj._now).css('display');
				if (_display == 'inline') { // inline 이면 값이 적용안됨
					jQuery(element_obj._now).css('display','inline-block');
				}
								
				element_obj.get_selectedObj();
				var obj_id = element_obj._get_obj_id(this._id);
				var _css = [];
				if (jQuery('#' + obj_id + '_all').prop('checked') == true) {
					_css.push(this._property);
				} else {
					for (var i=0;i<this._types.length;i++) {
						var _id = obj_id + '_' + this._types[i];						
						if (jQuery('#' + _id).prop('checked') == true) {
							_css.push(this._property + '-' + this._types[i]);
						}
					}
				}		
				var _unit = jQuery('#_editor_' + this._id + '_unit').val();
				if (!_unit || _unit == '') {
					_unit = 'px';
					jQuery('#_editor_' + this._id + '_unit').val(_unit);
				}
								
				var Cvar = jQuery('#'+obj_id).val();
				for (var i=0;i<_css.length;i++) {
					element_obj.change_css_by_mode(_css[i],Cvar+_unit);						
				}	
				element_obj.edit.operations(2,this._id,Cvar); // type:2 입력값 증/감버튼 클릭
				undo_obj._add(element_obj._now,this._property);
			},
			
			'get' : function() {	
				var _match = this._match();			
				var _checked = false;
				var _var = '';
				if (_match == 0) {
//					_var =  element_obj.get_property_var(this._property);
					_var = element_obj.get_guess_property_var(this._property,['em']);
					_checked = true;
				}
													
				var obj_id = element_obj._get_obj_id(this._id);				
				jQuery('#' + obj_id + '_all').prop('checked',_checked);
				for (var i=0;i<this._types.length;i++) {
					jQuery('#' + obj_id + '_' + this._types[i]).prop('checked',_checked);
				}				
				element_obj.edit.operations('',this._id,_var); // "" : 객체 종류 클릭시			
			},
						
			'remove' : function() {			
				element_obj.edit._remove(this._id);
			},
			'checked' : function(_type) {
				var obj_id = element_obj._get_obj_id(this._id);
				var _id = obj_id + _type;
				if (jQuery('#' + _id).prop('checked') == false) { return false; }
				var _obj = jQuery(element_obj._now);
				var Ckind = this._property;		
				var _var = '';		
				if (_type == 'all') {
					var _match = this._match();
					if (_match == 0) { _var = _get_num(_obj.css(this._property)); }
				} else {
					Ckind += '-' + _type;				
					_var = _obj.css(Ckind);
				}
				element_obj.edit.operations('',this._id,_var); // "" : 객체 종류 클릭시			
			},
			'_match' : function() {
				var _obj = jQuery(element_obj._now);				
				var _css = this._property + '-' + this._types[0];
				var _value = _obj.css(_css);
				var _match = 0;				
				for (var i=1;i<this._types.length;i++) {
					var _css = this._property + '-' + this._types[i];						
					var _value2 = _obj.css(_css);				
					if (_value != _value2) {
						_match++;
						break;
					}
				}							
				return (_match == 0) ? 0 : 1;
			}
			
		},
		
		'background_color' : {
			
			'_id' : 'background_color',
			'_property' : 'background-color',
			'change' : function() {
				element_obj.get_selectedObj();
				var Cvar = element_obj.get_input_var(this._id);				
				element_obj.change_css_by_mode(this._property,Cvar);				
				jQuery('#_color_preview_'+this._id).css('background-color',Cvar);
				undo_obj._add(element_obj._now,this._property);
			},					
			'get' : function() {
				var _var = color_obj_func.RGB2HEX(element_obj.get_var(this._property));					
				if (_var.match(/^rgba\(0,0,0,0\)$/)) { _var = ''; }				
				if (_var.match(/^#00$/)) { _var = ''; } //ie				
				if (_var.match(/^transparent$/)) { _var = ''; } // ie
				element_obj.set_var(this._id,_var);
				jQuery('#_color_preview_'+this._id).css('background-color',_var);											
			},
			'remove' : function() {			
				element_obj.edit._remove(this._id);
			},
			'set' : function(_var) {			
				element_obj.set_var(this._id,_var);
				this.change();										
			}			
			
		},
		
		'border_width' : {
			'change' : function() { element_obj.edit.border.change(); },
			'get' : function() { element_obj.edit.border.get(); },
			'remove' : function() { element_obj.edit.border.remove(); }						
		},
		
		'border_style' : {
			'change' : function() { element_obj.edit.border.change(); },
			'get' : function() { element_obj.edit.border.get(); },
			'remove' : function() { element_obj.edit.border.remove(); }						
		},
		
		'border_color' : {
			'_id' : 'border_color',			
			'change' : function() {
				element_obj.edit.border.change();
			},
			'get' : function() {
				element_obj.edit.border.get();				
			},
			'remove' : function() {
				element_obj.edit.border.remove();				
			},
			'set' : function(_var) {
				var obj_id = element_obj._get_obj_id(this._id);	
				jQuery('#'+obj_id).val(_var);	
				this.change();														
			}						
		},
		
		'border' : {
			
			'_id' : 'border',
			'_property' : 'border',
			'_types' : ['top','left','right','bottom'],
			'change' : function() {
				element_obj.get_selectedObj();
				var obj_id = element_obj._get_obj_id(this._id);
				var Ccolor = jQuery('#'+obj_id+'_color').val();
				Ccolor = color_obj_func.RGB2HEX(Ccolor);							
				if (!Ccolor) {
					Ccolor = '#ccc';
					jQuery('#'+obj_id+'_color').val(Ccolor);
				}				
				var Cstyle = jQuery('#'+obj_id+'_style').val();
				if (!Cstyle) {
					Cstyle = 'solid';
					jQuery('#'+obj_id+'_style').val(Cstyle);
				}				
				var _unit = jQuery('#_editor_' + this._id + '_width_unit').val();				
				if (!_unit) {
					_unit = 'px';
					jQuery('#_editor_' + this._id + '_width_unit').val(_unit);
				}
				var Cwidth = jQuery('#'+obj_id+'_width').val();
				var _width = Cwidth + _unit;						
				var Cvar = _width + " " + Cstyle + " " + Ccolor;
				if (!Ccolor || !Cstyle || !Cwidth) { return false; }
				var _css = [];
				if (jQuery('#' + obj_id + '_all').prop('checked') == true) {
					_css.push(this._property);
				} else {
					for (var i=0;i<this._types.length;i++) {
						var _id = obj_id + '_' + this._types[i];						
						if (jQuery('#' + _id).prop('checked') == true) {
							_css.push(this._property + '-' + this._types[i]);
						}
					}
				}
				for (var i=0;i<_css.length;i++) {
					element_obj.change_css_by_mode(_css[i],Cvar);				
				}	
				jQuery('#_color_preview_'+this._id+'_color').css('background-color',Ccolor);
				element_obj.edit.operations(2,'border_width',Cwidth); // type:2 입력값 증/감버튼 클릭				
				undo_obj._add(element_obj._now,this._property);
				
			},
						
			'get' : function() {
				
				var Ccolor = '';
				var Cstyle = '';
				var Cwidth = '';	
				var _obj = jQuery(element_obj._now);		
				var _match = this._match();		

				var _checked = false;
						
				if (_match == 0) {

					var _values = this._get_values('border');
					Ccolor = _values[0];
					Cstyle = _values[1];
					Cwidth = _values[2];
															
					_checked = true;
				}
				
				var obj_id = element_obj._get_obj_id(this._id);
				jQuery('#'+obj_id+'_color').val(Ccolor);	
				jQuery('#'+obj_id+'_style').val(Cstyle);		
		
				element_obj.edit.operations('','border_width',Cwidth); // "" : 객체 종류 클릭시
				
				jQuery('#' + obj_id + '_all').prop('checked',_checked);
				for (var i=0;i<this._types.length;i++) {
					jQuery('#' + obj_id + '_' + this._types[i]).prop('checked',_checked);
				}
				
				jQuery('#_color_preview_'+this._id+'_color').css('background-color',Ccolor);						
				
			},
						
			'remove' : function() {		
				element_obj.edit._remove(this._id);
			},

			'checked' : function(_type) {
				
				var obj_id = element_obj._get_obj_id(this._id);
				var _id = obj_id +'_'+ _type;

				if (jQuery('#' + _id).prop('checked') == false) { return false; }

				var style_name = this._property;
				
				var _var = '';		
				if (_type == 'all') {
					
				} else {
					style_name += '-' + _type;
				}
						
				var _values = this._get_values(style_name);

				jQuery('#'+obj_id+'_color').val(_values[0]);	
				jQuery('#'+obj_id+'_style').val(_values[1]);	
				
				element_obj.edit.operations('','border_width',_values[2]); // "" : 객체 종류 클릭시	

				jQuery('#_color_preview_border_color').css('background-color',_values[0]);						
				
			},

			'_match' : function() {
				var _obj = jQuery(element_obj._now);				
				var _css = this._property + '-' + this._types[0];
				var _value = _obj.css(_css);
				var _match = 0;				
				for (var i=1;i<this._types.length;i++) {
					var _css = this._property + '-' + this._types[i];						
					var _value2 = _obj.css(_css);
					if (_value != _value2) {
						_match++;
						break;
					}
				}							
				return (_match == 0) ? 0 : 1; // 같으면 0 틀리면 1
			},

			'_get_values' : function(style_name) {

				var Ccolor = '';
				var Cstyle = '';
				var Cwidth = '';	
				
				var _obj = jQuery(element_obj._now);		

				Ccolor = _obj.css(style_name+'-color');			
				Ccolor = color_obj_func.RGB2HEX(Ccolor);	
				Cstyle = _obj.css(style_name+'-style');
				var _style = jQuery(element_obj._now).attr('style');	
				var re = new RegExp("border:([^\\;]+)",'gi');
				var retVal = re.exec(_style);
				if (retVal) {
					var re2 = new RegExp("(([0-9.]+)([a-z]+))",'gi');
					var retVal2 = re2.exec(retVal[1]);
					Cwidth = retVal2[0];
				} else {
					Cwidth = element_obj.get_property_var(style_name+'-width');		
				}
					
				// top,right,bottom,left 중 하나라도 값이 다르면 4가지를 리턴함 예) "none solid none dashed","0px 1px 0 2px" 형태임.
				// 그래서 공백이 있으면 여러값을 가지므로, NULL 로 처리
				if (Cstyle.match(/ /) || Cwidth.match(/ /)) {
					Ccolor = '';
					Cstyle = '';
					Cwidth = '';										
				}

				return [Ccolor,Cstyle,Cwidth];
					
			}			
			
		},
		
		'border_radius' : {
			
			'_id' : 'border_radius',
			'_property' : 'border-radius',
			'_types' : ['top_left','top_right','bottom_left','bottom_right'],
			'_types2' : ['top-left','top-right','bottom-left','bottom-right'],			
			'change' : function() {
				element_obj.get_selectedObj();
				var obj_id = element_obj._get_obj_id(this._id);
				var _css = [];
				if (jQuery('#' + obj_id + '_all').prop('checked') == true) {
					_css.push(this._property);
				} else {
					for (var i=0;i<this._types.length;i++) {
						var _id = obj_id + '_' + this._types[i];						
						if (jQuery('#' + _id).prop('checked') == true) {
							_css.push('border-' + this._types[i].replace(/\_/gi,'-')+'-radius');
						}
					}
				}
				var _unit = jQuery('#_editor_' + this._id + '_unit').val();
				if (!_unit || _unit == '') {
					_unit = 'px';
					jQuery('#_editor_' + this._id + '_unit').val(_unit);
				}
								
				var Cvar = jQuery('#'+obj_id).val();
				for (var i=0;i<_css.length;i++) {
					element_obj.change_css_by_mode(_css[i],Cvar+_unit);					
				}	
				element_obj.edit.operations(2,this._id,Cvar); // type:2 입력값 증/감버튼 클릭
				undo_obj._add(element_obj._now,this._property);
			},
			'get' : function() {	
				var _match = this._match();			
				var _checked = false;
				var _var = '';
				if (_match == 0) {
					_var =  element_obj.get_property_var(this._property);
					_checked = true;
				}
													
				var obj_id = element_obj._get_obj_id(this._id);				
				jQuery('#' + obj_id + '_all').prop('checked',_checked);
				for (var i=0;i<this._types.length;i++) {
					jQuery('#' + obj_id + '_' + this._types[i]).prop('checked',_checked);
				}				
				element_obj.edit.operations('',this._id,_var); // "" : 객체 종류 클릭시			
			},
			'remove' : function() {	
				element_obj.edit._remove(this._id);
			},
			'checked' : function(_type) {
				var obj_id = element_obj._get_obj_id(this._id);
				var _id = obj_id + _type;
				if (jQuery('#' + _id).prop('checked') == false) { return false; }
				var _obj = jQuery(element_obj._now);
				var Ckind = this._property;		
				var _var = '';		
				if (_type == 'all') {
					var _match = this._match();
					if (_match == 0) { _var = _get_num(_obj.css(this._property)); }
				} else {
					Ckind = 'border-' + _type.replace(/\_/gi,'-') + '-radius';								
					_var = _obj.css(Ckind);
				}
				element_obj.edit.operations('',this._id,_var); // "" : 객체 종류 클릭시			
			},
			'_match' : function() {
				var _obj = jQuery(element_obj._now);				
				var _css = 'border-' + this._types2[0] + '-radius';
				var _value = _obj.css(_css);
				var _match = 0;				
				for (var i=1;i<this._types.length;i++) {
					var _css = 'border-' + this._types2[i] + '-radius';									
					var _value2 = _obj.css(_css);
					if (_value != _value2) {
						_match++;
						break;
					}
				}			
				return (_match == 0) ? 0 : 1;
			}
			
		},
		
		'text_align' : {
			
			'_id' : 'text_align',
			'_property' : 'text-align',			
			'_values' : ['left','center','right','justify'],
			'change' : function(Cvar) {
				element_obj.get_selectedObj();
				if (get_inline_style(element_obj._now,this._property) == Cvar) {			
					var btn = jQuery(m9evt);					
					btn.removeClass('active');
					jQuery(element_obj._now).css(this._property,'');
					return false;
				}

				element_obj.change_css_by_mode(this._property,Cvar);		
				element_obj.edit.operations(4,this._id,Cvar); // type:2 입력값 증/감버튼 클릭
				undo_obj._add(element_obj._now,this._property);
			},
			'get' : function() {
				var _obj = jQuery(element_obj._now);
				var Cvar = get_inline_style(element_obj._now,this._property);	
				jQuery('._' + this._id).removeClass('active');
				
				var _match = 0;
				for (var i=0;i<this._values.length;i++) {
					var _checked = (this._values[i] == Cvar) ? true : false;				
					if (_checked == true) {
						jQuery('._' + this._values[i]).addClass('active');
					}
					if (_checked) { _match++; }
				}
				if (_match == 0) {
					jQuery('._' + this._id + '._null').addClass('active');
				}
			},
			'remove' : function() {			
				element_obj.edit._remove(this._id);		
			}
			
		},		

		'vertical_align' : {
			
			'_id' : 'vertical_align',
			'_property' : 'vertical-align',			
			'_values' : ['top','middle','bottom'], // top,middle,bottom,baseline,text-top,text-bottom	
			'change' : function(Cvar) {
				element_obj.get_selectedObj();
				element_obj.change_css_by_mode(this._property,Cvar);				
				element_obj.edit.operations(4,this._id,Cvar); // type:2 입력값 증/감버튼 클릭
				undo_obj._add(element_obj._now,this._property);
			},
			'get' : function() {
				var _obj = jQuery(element_obj._now);
				var Cvar = get_inline_style(element_obj._now,this._property);
				jQuery('._' + this._id).removeClass('active');
				
				var _match = 0;
				for (var i=0;i<this._values.length;i++) {
					var _checked = (this._values[i] == Cvar) ? true : false;				
					if (_checked == true) {
						jQuery('._' + this._values[i]).addClass('active');
					}
					if (_checked) { _match++; }
				}
				if (_match == 0) {
					jQuery('._' + this._id + '._null').addClass('active');
				}
			},
			'remove' : function() {			
				element_obj.edit._remove(this._id);		
			}
			
		},		

		'float' : {
			
			'_id' : 'float',
			'_property' : 'float',			
			'_values' : ['left','none','right','justify'],
			'change' : function(Cvar) {
				element_obj.get_selectedObj();
				if (get_inline_style(element_obj._now,this._property) == Cvar) {			
					var btn = jQuery(m9evt);					
					btn.removeClass('active');
					jQuery(element_obj._now).css(this._property,'');
					return false;
				}

				element_obj.change_css_by_mode(this._property,Cvar);		
				element_obj.edit.operations(4,this._id,Cvar); // type:2 입력값 증/감버튼 클릭
				undo_obj._add(element_obj._now,this._property);
			},
			'get' : function() {
				var _obj = jQuery(element_obj._now);
				var Cvar = get_inline_style(element_obj._now,this._property);
				if (Cvar == '') {
					Cvar = element_obj.get_var(this._property);
					if (Cvar == 'none') { Cvar = ''; }
				}
				//var Cvar = get_inline_style(element_obj._now,this._property);	
				jQuery('._' + this._id).removeClass('active');
				
				var _match = 0;
				for (var i=0;i<this._values.length;i++) {
					var _checked = (this._values[i] == Cvar) ? true : false;				
					if (_checked == true) {
						jQuery('._' + this._values[i]).addClass('active');
					}
					if (_checked) { _match++; }
				}
				if (_match == 0) {
					jQuery('._' + this._id + '._null').addClass('active');
				}
			},
			'remove' : function() {			
				element_obj.edit._remove(this._id);		
			}
			
		},	

		/*
		Dtype
			1 : 입력값 직접입력시
			2 : 입력값 증가/감소 버튼 클릭시
			3 : 슬라이드 조절시
			4 : 클래스 버튼 클릭시
			"" : 객체 종류 클릭시
		*/
		operations : function(Dtype,Dname,Dvar) {

			var Cvar = _get_num(Dvar);

			var Sarray = (style_info[Dname]) ? style_info[Dname]['_class'] : [];
	
			// 클래스 버튼 active 제거	
			jQuery('._' + Dname).removeClass('active');		

			var inpt_id = '_editor_' + Dname; // ex)font_size
			
			var ok_slider = 1; // 슬라이드 하기
			var ok_inpt = 0; // 입력값 입력
						
			if (Dtype == "") {
				class_obj.get(element_obj._now,Dname);
				box_html.unit.reset(Dname,Dvar);
			} else if (Dtype == 1) {

			} else if (Dtype == 2) {
				mode_obj.reset_by_change(); // 모드변경시 화면 reset // hidden etc objects(img,video..) layer
				element_obj.edit.remove_class_by_btn(Dname); // 버튼 클래스 제거	
			} else if (Dtype == 3) {
				ok_slider = 0;
				ok_inpt = 1;		
			} else if (Dtype == 4) {

				mode_obj.reset_by_change(); // 모드변경시 화면 reset // hidden etc objects(img,video..) layer
																
				// 클래스 버튼 active 추가
				var _btn = (Dvar != '') ? Dvar : 'null';				
				jQuery('._' + _btn).addClass('active'); //Dvar : f-xlarge				

				Cvar = _get_num(jQuery(element_obj._now).css(Dname.replace(/\_/g,'-')));
				var _unit = 'em';
				if (Dname == 'line_height') {
					Cvar = parseInt(Cvar / _get_num(jQuery(element_obj._now).css('font-size')) * 100);							
					_unit = '%';			
				} else {
					Cvar = convert_unit.convert('px','em',Cvar);
				}
								
				box_html.unit.reset(Dname,Cvar+_unit);
			}
			
			if (ok_inpt == 1) {
				jQuery('#' + inpt_id).val(Cvar); // 입력값 초기화			
			}	
			if (ok_slider == 1) {			
				box_html.slider.handle.setting(Dname,Cvar); // 슬라이드 값 적용		
			}					
		}
		
	},
	
	'win' : {
		
		'_obj_kinds' : "img,iframe,video",
		
		'view' : function(obj) {
			this.reset(obj);
			element_obj._now = obj;
			element_obj.menu.get_auto();						
			jQuery("#editWindow-setting").stop(true,true).fadeIn(300,function(){
				jQuery(this).css('display','block');
			});
		},
		
		'close' : function() {
			jQuery("#editWindow-setting").stop(true,true).fadeOut(100,function(){
				jQuery(this).css('display','none');
			});
		},
		
		'reset' : function(obj) {
			if (obj != element_obj._now) { // 객체가 다르면 스타일 속성창 열기				
				if (jQuery(obj).is(element_obj.win._obj_kinds)) {			
					jQuery('#_tab-area-verical-align').css('display','');
					jQuery('#_tab-area-text-align').css('display','none');																		
				} else {										
					jQuery('#_tab-area-vertical-align').css('display','none');
					jQuery('#_tab-area-text-align').css('display','');								
				}	
			}
		},
		
		'int' : function() {

var _html = '' +
'<div class="edit-tab-1" ani_type="tab(\'on_class\':\'tab-btn-on\',\'off_class\':\'tab-btn-off\',\'slide\':\'down\',\'accordion\':\'1\',\'speed\':\'300\')">' +
  	'<ul>' +
		
		'<li>' +
			'<a href="#" id="_tab-menu-font" class="tab-btn-on" tab_type="btn(\'id\':\'tab5\')">'+msg_msg('text','a')+'</a>' +
			
			'<div class="tab-content" style="display:block;" tab_type="content(\'id\':\'tab5\')">' +

				'<ul class="_edit-list-1">' +
					'<li>' +
						'<dl class="_edit-dl-2">' +
							'<dt><label for="_editor_font_family">'+msg_msg('font_family','a')+'</label></dt>' +
							'<dd>' + edit_control_box.selectbox2({'id':'font_family'}) + '</dd>' +
						'</dl>' +	
					'</li>' +
					'<li>' +
						'<dl class="_edit-dl-2">' +
							'<dt><label for="_editor_color">'+msg_msg('color','a')+'</label></dt>' +
							'<dd>' + edit_control_box.colorbox({'id':'color','callback':'element_obj.edit.color.set'}) + '</dd>' +							
						'</dl>' +	
					'</li>' +
					'<li>' +
						'<dl class="_edit-dl-2">' +
							'<dt><label for="_editor_color">'+msg_msg('style','a')+'</label></dt>' +
							'<dd>' +
								'<ul class="_edit-ul-1">' +
									'<li><a href="#" onclick="element_obj.edit.font_weight.change(this);return false" title="'+msg_msg('bold','a')+'" class="edit-btn-8 icon2-bold _font_weight"></a></li>' +
									'<li><a href="#" onclick="element_obj.edit.font_style.change(this);return false" title="'+msg_msg('italic','a')+'" class="edit-btn-8 icon2-italic _font_style"></a></li>' +
									'<li><a href="#" onclick="element_obj.edit.text_decoration.change(this);return false" title="'+msg_msg('underline','a')+'" class="edit-btn-8 icon2-underline _text_decoration"></a></li>' +
								'</ul>' +
							'</dd>' +
						'</dl>' +	
					'</li>' +				

					'<li>' +
						'<dl class="_edit-dl-1">' +
							'<dt><label for="_editor_color">'+msg_msg('class','a')+'</label></dt>' +
							'<dd>' +
								'<div class="padding-left-1">' +
									'<ul class="float2N-1 spacing-1">' +
										'<li>' +
											'<dl class="_edit-dl-2">' +
												'<dt><label for="_editor_color">'+msg_msg('underline','a')+'</label></dt>' +
												'<dd>' +
													'<ul class="_edit-ul-1">' +
														'<li>' + get_userbox_class_btn('f_text_decoration') + '</li>' +		
													'</ul>' +
												'</dd>' +
											'</dl>' +
										'</li>' +
										'<li>' +
											'<dl class="_edit-dl-2">' +
												'<dt><label for="_editor_color">'+msg_msg('strong','a')+'</label></dt>' +
												'<dd>' +
													'<ul class="_edit-ul-1">' +
														'<li>' + get_userbox_class_btn('f_strong') + '</li>' +		
													'</ul>' +
												'</dd>' +
											'</dl>' +
										'</li>' +			
										//'<li>' +
											//'<dl class="_edit-dl-2">' +
												//'<dt><label for="_editor_color">'+msg_msg('title_style','a')+'</label></dt>' +
												//'<dd>' +
													//'<ul class="_edit-ul-1">' +
														//'<li>' + get_userbox_class_btn('f_style') + '</li>' +		
													//'</ul>' +
												//'</dd>' +
											//'</dl>' +
										//'</li>' +														
									'</ul>' +
								'</div>' +
							'</dd>' +
						'</dl>' +	
					'</li>' +		
					
									
					'<li>' +
						'<dl class="_edit-dl-1">' +
							'<dt><label for="_editor_font_size">'+msg_msg('size','a')+'</label></dt>' +
							'<dd>' +
								get_userbox_class_btn('font_size') + // [글크기] 스타일버튼
								get_userbox_01({'id':'font_size','max':100,'min':8,'num':1}) + // 사용자박스1
							'</dd>' +
						'</dl>' +				
					'</li>' +		
					'<li>' +
						'<dl class="_edit-dl-1">' +
							'<dt><label for="_editor_line_height">'+msg_msg('line_height','a')+'</label></dt>' +
							'<dd>' +
								get_userbox_class_btn('line_height') + // [행간간격] 스타일버튼
								get_userbox_01({'id':'line_height','max':100,'min':0,'num':1,'unit':'%'}) + // 사용자박스1	
							'</dd>' +
						'</dl>' +	
					'</li>' +		
					'<li>' +
						'<dl class="_edit-dl-1">' +
							'<dt><label for="_editor_word_spacing">'+msg_msg('word_spacing','a')+'</label></dt>' +
							'<dd>' +
								get_userbox_01({'id':'word_spacing','max':50,'min':-50,'num':1}) + // 사용자박스1				
							'</dd>' +
						'</dl>' +	
					'</li>' +		
					'<li>' +
						'<dl class="_edit-dl-1">' +
							'<dt><label for="_editor_letter_spacing">'+msg_msg('letter_spacing','a')+'</label></dt>' +
							'<dd>' +
								get_userbox_01({'id':'letter_spacing','max':50,'min':-50,'num':1}) + // 사용자박스1				
							'</dd>' +								
							'</dl>' +
						'</dl>' +	
					'</li>' +																												
				'</ul>' +		
				'<div class="_edit_remove_box"><a href="#" onclick="element_obj.menu.remove(\'font\');return false" title="'+msg_msg('property_remove','a')+'" class="edit-btn-8 icon2-eraser"></a></div>' +

			'</div>' +
		'</li>' +	  	
		
		'<li>' +
			'<a href="#" id="_tab-menu-border" class="tab-btn-off" tab_type="btn(id:tab1)">'+msg_msg('bg','a')+' & '+msg_msg('border','a')+'</a>' +
				
			'<div class="tab-content" style="display:none;" tab_type="content(id:tab1)">' +     

				'<ul class="_edit-list-1">' +
					'<li>' +
						'<dl class="_edit-dl-2">' +
							'<dt><label for="_editor_background_color">'+msg_msg('bg_color','a')+'</label></dt>' +
							'<dd>' + edit_control_box.colorbox({'id':'background_color','callback':'element_obj.edit.background_color.set'}) + '</dd>' +
						'</dl>' +	
					'</li>' +
					'<li>' +											
						'<dl class="_edit-dl-1">' +
							'<dt>'+msg_msg('border','a')+'</dt>' +
							'<dd>' +
								'<div class="square_box">' +
									'<div class="square_box_inner">' +
										'<span class="edit-btn-8 icon-link"><input type="checkbox" id="_editor_border_all" value="all" onclick="checkbox_empty_all(this,\'_editor_border_top,_editor_border_left,_editor_border_right,_editor_border_bottom\');element_obj.edit.border.checked(this.value)" checked><label for="_editor_border_all" title="'+msg_msg('all','a')+'">'+msg_msg('all','a')+'</label></span>' +
									'</div>' +
									'<div class="_top"><span class="check-switch"><input type="checkbox" id="_editor_border_top" value="top" onclick="checkbox_empty(this,\'_editor_border_all\');element_obj.edit.border.checked(this.value)"><label for="_editor_border_top" title="'+msg_msg('top','a')+'">'+msg_msg('top','a')+'</label></span></div>' +
									'<div class="_right"><span class="check-switch"><input type="checkbox" id="_editor_border_right" value="right" onclick="checkbox_empty(this,\'_editor_border_all\');element_obj.edit.border.checked(this.value)"><label for="_editor_border_right" title="'+msg_msg('right','a')+'">'+msg_msg('right','a')+'</label></span></div>' +
									'<div class="_bottom"><span class="check-switch"><input type="checkbox" id="_editor_border_bottom" value="bottom" onclick="checkbox_empty(this,\'_editor_border_all\');element_obj.edit.border.checked(this.value)"><label for="_editor_border_bottom" title="'+msg_msg('bottom','a')+'">'+msg_msg('bottom','a')+'</label></span></div>' +
									'<div class="_left"><span class="check-switch"><input type="checkbox" id="_editor_border_left" value="left" onclick="checkbox_empty(this,\'_editor_border_all\');element_obj.edit.border.checked(this.value)"><label for="_editor_border_left" title="'+msg_msg('left','a')+'">'+msg_msg('left','a')+'</label></span></div>' +
								'</div>' +			

								get_userbox_01({'id':'border_width','type':'border','max':100,'min':0,'num':1}) + // 사용자박스1
								'<ul class="float2N-2">' +
								'<li>' + edit_control_box.selectbox2({'id':'border_style','first_index_not':1}) + '</li>' +
								'<li>' + edit_control_box.colorbox({'id':'border_color','callback':'element_obj.edit.border_color.set'}) + '</li>' +
								'</ul>' +

							'</dd>' +
						'</dl>' +	
					'</li>' +
					'<li>' +											
						'<dl class="_edit-dl-1">' +
							'<dt><label for="_editor_border_radius">'+msg_msg('radius','a')+'</label></dt>' +
							'<dd>' +

								'<div class="square_box">' +
									'<div class="square_box_inner">' +
										'<span class="edit-btn-8 icon-link"><input type="checkbox" id="_editor_border_radius_all" value="all" onclick="checkbox_empty_all(this,\'_editor_border_radius_top_left,_editor_border_radius_top_right,_editor_border_radius_bottom_left,_editor_border_radius_bottom_right\');element_obj.edit.border_radius.checked(this.value)" checked><label for="_editor_border_radius_all" title="'+msg_msg('all','a')+'">'+msg_msg('all','a')+'</label></span>' +
									'</div>' +
									'<div class="_top_left"><span class="check-switch"><input type="checkbox" id="_editor_border_radius_top_left" value="top_left" onclick="checkbox_empty(this,\'_editor_border_radius_all\');element_obj.edit.border_radius.checked(this.value)"><label for="_editor_border_radius_top_left" title="'+msg_msg('top_left','a')+'">'+msg_msg('top_left','a')+'</label></span></div>' +
									'<div class="_top_right"><span class="check-switch"><input type="checkbox" id="_editor_border_radius_top_right" value="top_right" onclick="checkbox_empty(this,\'_editor_border_radius_all\');element_obj.edit.border_radius.checked(this.value)"><label for="_editor_border_radius_top_right" title="'+msg_msg('top_right','a')+'">'+msg_msg('top_right','a')+'</label></span></div>' +
									'<div class="_bottom_left"><span class="check-switch"><input type="checkbox" id="_editor_border_radius_bottom_left" value="bottom_left" onclick="checkbox_empty(this,\'_editor_border_radius_all\');element_obj.edit.border_radius.checked(this.value)"><label for="_editor_border_radius_bottom_left" title="'+msg_msg('bottom_left','a')+'">'+msg_msg('bottom_left','a')+'</label></span></div>' +
									'<div class="_bottom_right"><span class="check-switch"><input type="checkbox" id="_editor_border_radius_bottom_right" value="bottom_right" onclick="checkbox_empty(this,\'_editor_border_radius_all\');element_obj.edit.border_radius.checked(this.value)"><label for="_editor_border_radius_bottom_right" title="'+msg_msg('bottom_right','a')+'">'+msg_msg('bottom_right','a')+'</label></span></div>' +
								'</div>' +	
								get_userbox_01({'id':'border_radius','type':'radius','max':100,'min':0,'num':1}) + // 사용자박스1
												
							'</dd>' +
						'</dl>' +	
					'</li>' +
				'</ul>' +	
				'<div class="_edit_remove_box"><a href="#" onclick="element_obj.menu.remove(\'border\');return false" title="'+msg_msg('property_remove','a')+'" class="edit-btn-8 icon2-eraser"></a></div>' +
												
			'</div>' +
		'</li>' +
			
		'<li>' +
			'<a href="#" id="_tab-menu-padding_margin" class="tab-btn-off" tab_type="btn(id:tab2)">'+msg_msg('padding','a')+' & '+msg_msg('margin','a')+'</a>' +
				
			'<div class="tab-content" style="display:none;" tab_type="content(id:tab2)">' +

				'<ul class="_edit-list-1">' +
					'<li>' +
						'<dl class="_edit-dl-1">' +
							'<dt><label for="_editor_padding">'+msg_msg('padding','a')+'</label></dt>' +
							'<dd>' +
								'<div class="square_box">' +
									'<div class="square_box_inner">' +
										'<span class="edit-btn-8 icon-link"><input type="checkbox" id="_editor_padding_all" value="all" onclick="checkbox_empty_all(this,\'_editor_padding_top,_editor_padding_left,_editor_padding_right,_editor_padding_bottom\');element_obj.edit.padding.checked(this.value)" checked><label for="_editor_padding_all" title="'+msg_msg('all','a')+'">'+msg_msg('all','a')+'</label></span>' +
									'</div>' +
									'<div class="_top"><span class="check-switch"><input type="checkbox" id="_editor_padding_top" value="top" onclick="checkbox_empty(this,\'_editor_padding_all\');element_obj.edit.padding.checked(this.value)"><label for="_editor_padding_top" title="'+msg_msg('top','a')+'">'+msg_msg('top','a')+'</label></span></div>' +
									'<div class="_right"><span class="check-switch"><input type="checkbox" id="_editor_padding_right" value="right" onclick="checkbox_empty(this,\'_editor_padding_all\');element_obj.edit.padding.checked(this.value)"><label for="_editor_padding_right" title="'+msg_msg('right','a')+'">'+msg_msg('right','a')+'</label></span></div>' +
									'<div class="_bottom"><span class="check-switch"><input type="checkbox" id="_editor_padding_bottom" value="bottom" onclick="checkbox_empty(this,\'_editor_padding_all\');element_obj.edit.padding.checked(this.value)"><label for="_editor_padding_bottom" title="'+msg_msg('bottom','a')+'">'+msg_msg('bottom','a')+'</label></span></div>' +
									'<div class="_left"><span class="check-switch"><input type="checkbox" id="_editor_padding_left" value="left" onclick="checkbox_empty(this,\'_editor_padding_all\');element_obj.edit.padding.checked(this.value)"><label for="_editor_padding_left" title="'+msg_msg('left','a')+'">'+msg_msg('left','a')+'</label></span></div>' +
								'</div>' +			
								get_userbox_01({'id':'padding','max':100,'min':0,'num':1}) + // 사용자박스1				
								//get_userbox_class_btn('padding',{'addClass':'_margin-box'}) + // [글크기] 스타일버튼
							'</dd>' +
						'</dl>' +	
					'</li>' +
					'<li>' +
						'<dl class="_edit-dl-1">' +
							'<dt><label for="_editor_margin">'+msg_msg('margin','a')+'</label></dt>' +
							'<dd>' +
							
								'<div class="square_box">' +
									'<div class="square_box_inner">' +
										'<span class="edit-btn-8 icon-link"><input type="checkbox" id="_editor_margin_all" value="all" onclick="checkbox_empty_all(this,\'_editor_margin_top,_editor_margin_left,_editor_margin_right,_editor_margin_bottom\');element_obj.edit.margin.checked(this.value)" checked><label for="_editor_margin_all" title="'+msg_msg('all','a')+'">'+msg_msg('all','a')+'</label></span>' +
									'</div>' +
									'<div class="_top"><span class="check-switch"><input type="checkbox" id="_editor_margin_top" value="top" onclick="checkbox_empty(this,\'_editor_margin_all\');element_obj.edit.margin.checked(this.value)"><label for="_editor_margin_top" title="'+msg_msg('top','a')+'">'+msg_msg('top','a')+'</label></span></div>' +
									'<div class="_right"><span class="check-switch"><input type="checkbox" id="_editor_margin_right" value="right" onclick="checkbox_empty(this,\'_editor_margin_all\');element_obj.edit.margin.checked(this.value)"><label for="_editor_margin_right" title="'+msg_msg('right','a')+'">'+msg_msg('right','a')+'</label></span></div>' +
									'<div class="_bottom"><span class="check-switch"><input type="checkbox" id="_editor_margin_bottom" value="bottom" onclick="checkbox_empty(this,\'_editor_margin_all\');element_obj.edit.margin.checked(this.value)"><label for="_editor_margin_bottom" title="'+msg_msg('bottom','a')+'">'+msg_msg('bottom','a')+'</label></span></div>' +
									'<div class="_left"><span class="check-switch"><input type="checkbox" id="_editor_margin_left" value="left" onclick="checkbox_empty(this,\'_editor_margin_all\');element_obj.edit.margin.checked(this.value)"><label for="_editor_margin_left" title="'+msg_msg('left','a')+'">'+msg_msg('left','a')+'</label></span></div>' +
								'</div>' +			
								get_userbox_01({'id':'margin','max':100,'min':0,'num':1}) + // 사용자박스1		
								//get_userbox_class_btn('margin',{'addClass':'_margin-box'}) + // [글크기] 스타일버튼
							'</dd>' +
						'</dl>' +	
					'</li>' +					
				'</ul>' +		
				'<div class="_edit_remove_box"><a href="#" onclick="element_obj.menu.remove(\'padding_margin\');return false;" title="'+msg_msg('property_remove','a')+'" class="edit-btn-8 icon2-eraser"></a></div>' +				

			'</div>' +
		'</li>' +

		'<li>' +
			'<a href="#" id="_tab-menu-align" class="tab-btn-off" tab_type="btn(id:tab4)">'+msg_msg('alignment','a')+' & Float</a>' +
				
			'<div class="tab-content" style="display:none;" tab_type="content(id:tab4)">' +

				'<ul class="_edit-list-1">' +
					'<li id="_tab-area-text-align">' +
						'<dl class="_edit-dl-2">' +
							'<dt>'+msg_msg('text_align','a')+'</dt>' +
							'<dd>' +
								'<ul class="_edit-ul-1">' +
									//'<li><a href="#" onclick="element_obj.edit.text_align.change(\'\');return false" title="'+msg_msg('none','a')+'" class="edit-btn-8 icon2-align-no _text_align _null"></a></li>' +							
									'<li><a href="#" onclick="element_obj.edit.text_align.change(\'left\');return false" title="'+msg_msg('left','a')+'" class="edit-btn-8 icon2-align-left _text_align _left"></a></li>' +	
									'<li><a href="#" onclick="element_obj.edit.text_align.change(\'center\');return false" title="'+msg_msg('center','a')+'" class="edit-btn-8 icon2-align-center _text_align _center"></a></li>' +	
									'<li><a href="#" onclick="element_obj.edit.text_align.change(\'right\');return false" title="'+msg_msg('right','a')+'" class="edit-btn-8 icon2-align-right _text_align _right"></a></li>' +	
									'<li><a href="#" onclick="element_obj.edit.text_align.change(\'justify\');return false" title="'+msg_msg('justify','a')+'" class="edit-btn-8 icon2-align-justify _text_align _justify"></a></li>' +	
								'</ul>' +	
							'</dd>' +
						'</dl>' +	
					'</li>' +
					'<li id="_tab-area-vertical-align" style="display:none">' +											
						'<dl class="_edit-dl-2">' +
							'<dt>'+msg_msg('vertical_align','a')+'</dt>' +
							'<dd>' +
								'<ul class="_edit-ul-1">' +
									//'<li><a href="#" onclick="element_obj.edit.vertical_align.change(\'\');return false" title="'+msg_msg('none','a')+'" class="edit-btn-8 icon2-align-no _text_align _null"></a></li>' +							
									'<li><a href="#" onclick="element_obj.edit.vertical_align.change(\'top\');return false" title="'+msg_msg('top','a')+'" class="edit-btn-8 icon2-align-top _vertical_align _top"></a></li>' +	
									'<li><a href="#" onclick="element_obj.edit.vertical_align.change(\'middle\');return false" title="'+msg_msg('middle','a')+'" class="edit-btn-8 icon2-align-middle _vertical_align _middle"></a></li>' +	
									'<li><a href="#" onclick="element_obj.edit.vertical_align.change(\'bottom\');return false" title="'+msg_msg('bottom','a')+'" class="edit-btn-8 icon2-align-bottom _vertical_align _bottom"></a></li>' +	
								'</ul>' +			
							'</dd>' +
						'</dl>' +	
					'</li>' +
					'<li>' +
						'<dl class="_edit-dl-2">' +
//							'<dt>'+msg_msg('text_align','a')+'</dt>' +
							'<dt>'+'Float'+'</dt>' +
							'<dd>' +
								'<ul class="_edit-ul-1">' +
									//'<li><a href="#" onclick="element_obj.edit.text_align.change(\'\');return false" title="'+msg_msg('none','a')+'" class="edit-btn-8 icon2-align-no _text_align _null"></a></li>' +							
									'<li><a href="#" onclick="element_obj.edit.float.change(\'left\');return false" title="'+msg_msg('left','a')+'" class="edit-btn-8 icon2-float-left _float _left"></a></li>' +	
									'<li><a href="#" onclick="element_obj.edit.float.change(\'none\');return false" title="'+msg_msg('none','a')+'" class="edit-btn-8 icon2-float-none _float _none"></a></li>' +	
									'<li><a href="#" onclick="element_obj.edit.float.change(\'right\');return false" title="'+msg_msg('right','a')+'" class="edit-btn-8 icon2-float-right _float _right"></a></li>' +	
									'<li><a href="#" onclick="element_obj.edit.float.change(\'inherit\');return false" title="'+msg_msg('inherit','a')+'" class="edit-btn-8 icon2-float-inherit _float _inherit"></a></li>' +	
								'</ul>' +	
							'</dd>' +
						'</dl>' +	
					'</li>' +
				'</ul>' +	
				'<div class="_edit_remove_box"><a href="#" onclick="element_obj.menu.remove(\'align\');return false" title="'+msg_msg('property_remove','a')+'" class="edit-btn-8 icon2-eraser"></a></div>' +
												
			'</div>' +							
		'</li>' +			

		'<li>' +
			'<a href="#" id="_tab-menu-style" class="tab-btn-off" tab_type="btn(id:tab6)">'+msg_msg('style','a')+'</a>' +
							
			'<div class="tab-content" style="display:none;" tab_type="content(id:tab6)">' +  

				'<ul class="_edit-list-1">' +
					'<li>' +
						'<dl class="_edit-dl-2">' +
							'<dt><label for="_editor_box_shape_style">'+msg_msg('box','a')+'</label></dt>' +
							'<dd>' + edit_control_box.selectbox({'id':'box_shape_style','mode_not':1}) + '</dd>' +
						'</dl>' +	
					'</li>' +
					'<li>' +											
						'<dl class="_edit-dl-2">' +
							'<dt><label for="_editor_box_pattern_style">'+msg_msg('pattern','a')+'</label></dt>' +
							'<dd>' + edit_control_box.selectbox({'id':'box_pattern_style','mode_not':1}) +	'</dd>' +
						'</dl>' +	
					'</li>' +
					'<li>' +											
						'<dl class="_edit-dl-2">' +
							'<dt><label for="_editor_box_color_style">'+msg_msg('color','a')+'</label></dt>' +
							'<dd>' + edit_control_box.selectbox({'id':'box_color_style','mode_not':1}) + '</dd>' +
						'</dl>' +	
					'</li>' +
					'<li>' +											
						'<dl class="_edit-dl-2">' +
							'<dt><label for="_editor_box_round_style">'+msg_msg('radius','a')+'</label></dt>' +
							'<dd>' + edit_control_box.selectbox({'id':'box_round_style','mode_not':1}) + '</dd>' +
						'</dl>' +	
					'</li>' +
					'<li>' +											
						'<dl class="_edit-dl-2">' +
							'<dt><label for="_editor_text_shadow_style">'+msg_msg('text_shadow','a')+'</label></dt>' +
							'<dd>' + edit_control_box.selectbox({'id':'text_shadow_style','mode_not':1}) + '</dd>' +
						'</dl>' +					
					'</li>' +
				'</ul>' +															
				'<div class="_edit_remove_box"><a href="#" onclick="element_obj.menu.remove(\'style\');return false" title="'+msg_msg('property_remove','a')+'" class="edit-btn-8 icon2-eraser"></a></div>' +
												
			'</div>' +
		'</li>' +
		
	'</ul>' +
'</div>';

			edit_window_obj.int("editWindow-setting",_html,msg_msg('object_setting','a'));
			box_html.slider.setting();

			for(var i=0;i<fontfamily_obj._fonts.length;i++) {
				jQuery("#_editor_font_family").append('<option value="' + fontfamily_obj._fonts[i][0] + '">' + fontfamily_obj._fonts[i][1] + '</option>');
			}
			
			for(var i=0;i<EHASH.colors_class.length;i++) {
				jQuery("#_editor_box_color_style").append('<option value="' + EHASH.colors_class[i] + '">' + EHASH.colors_class[i] + '</option>');
			}

			for (var i in tab_get) {
				jQuery("#_tab-menu-"+i).on('mouseup',function() {	
					var _id_str = jQuery(this).attr('id');
					_id = _id_str.replace(/^\_tab\-menu\-/gi,'');
					element_obj._now_tab = _id;
					element_obj.menu.get(_id);						
				});	
			}

		}
	},

	// 스타일변경 + 모드에 따라 변경
	change_css_by_mode : function(_property,_var) {

		var J_ele_now = jQuery(element_obj._now);
		
		var _before_style = J_ele_now.attr('style');
		if (!_before_style) { _before_style = ''; }
		
		J_ele_now.css(_property,_var);

		var _mode = mode_obj.get();
		if (_mode == '') {
			return false;
		}		

		var _key = 'data-' + mode_obj.get_m9_mode_style_name('');
		if (J_ele_now.attr(_key) == undefined) {
			J_ele_now.attr(_key,_before_style);
		}
		
		var _kind = mode_obj.get_m9_mode_style_name(_mode);	
		var _style = J_ele_now.attr('data-'+_kind);			


		var all_var = '';
		if (_style) {
				
			var lists = _style.split(';');
				
			var returns = [];
			var _match = 0;
			for (var i=0;i<lists.length;i++) {
					
				var m = lists[i].split(':');				
				if (m[0] == _property) {
					if (_var != '' && _property != 'display') {
						returns.push(_property+':'+_var);
						_match++;
					}
				} else {
					returns.push(lists[i]);						
				}
					
			}
				
			if (_match == 0) {
				if (_var != '') {
					returns.push(_property+':'+_var);
				}
			}
				
			all_var = returns.join(';');
				
		} else {
			if (_var != '') {
				all_var = _property+':'+_var;
			}
		}
		
		if (all_var == '') {
			J_ele_now.removeAttr('data-'+_kind);					
		} else {
			J_ele_now.attr('data-'+_kind,all_var);			
		}

	},

	change_obj : function(_property,_var) {
		jQuery(element_obj._now).css(_property,_var);
	}
		
};

function checkbox_empty_all(_me,_ids) {
	var _checked = jQuery(_me).prop('checked');
	var _lists = _ids.split(',');
	for (var i=0;i<_lists.length;i++) {
		jQuery('#' + _lists[i]).prop('checked',_checked);	
	}
} //function

function checkbox_empty(_me,_ids) {
	if (jQuery(_me).prop('checked') == false) {
		var _lists = _ids.split(',');
		for (var i=0;i<_lists.length;i++) {
			jQuery('#' + _lists[i]).prop('checked',false);	
		}
	}
} //function