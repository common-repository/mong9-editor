var color_obj = {

	'colors' : ['#000000','#db2828','#fbbd08','#b5cc18','#16ab39','#2185d0','#6435c9','#a333c8','#e03997'],
	'_selected' : false,
	'_callback' : false,
	
	'set' : function(Dcolor,Dcallback) {
		this._callback = Dcallback;
		if (Dcolor == '') { Dcolor = 'transparent'; }		
		jQuery('#_color_picker').minicolors('value',{'color':Dcolor,opacity:1});
	},		
	
	'select' : function(Dcolor) {
		Dcolor = color_obj_func.RGB2HEX(Dcolor);
		var _color = Dcolor;
		if (Dcolor == '') { Dcolor = 'transparent'; }
		jQuery('#_color_picker').minicolors('value',{'color':Dcolor,opacity:1});
	},
	
	'callback' : function(Dcolor) {
		if (this._callback) {
			this._callback(Dcolor);
		}
	},
	
	'change_preview' : function(Dcolor) {
		jQuery('#_picker_color_preview').css('background-color',Dcolor);
		jQuery('#_picker_color').val(Dcolor);				
	},
	
	'get_temp_color' : function() {
		var str = getCookie('_color_temp');
		var colors = [];		
		if (str) { colors = str.split('|'); }
		for (var i=0;i<7;i++) {
			var _id = '_temp_color_' + i;
			if (colors[i]) {			
				jQuery('#'+_id).replaceWith('<a href=#" id="' + _id + '" onclick="color_obj.select(\'' + colors[i] + '\');return false;" style="background-color:' + colors[i] + ';border-color:' + colors[i] + '"></a>');
			} else {
				jQuery('#'+_id).replaceWith('<a id="' + _id + '"></a>');				
			}
		}
	},
	
	'save' : function() {
		var _color = jQuery('#_picker_color').val();
		_color = _color.toLowerCase();
		// 공백,흰색,검은색,투명 무시
		if (_color != '' && _color != '#ffffff' && _color != '#fff' && _color != 'white' && _color != 'transparent' && _color != '#000000' && _color != '#000') {
			var str = getCookie('_color_temp');
			var colors = [];
			if (str) { colors = str.split('|'); }
			var _array = [_color];
			for (var i=0;i<colors.length;i++) {
				if (colors[i] != _color) {
					_array.push(colors[i]);
				}
			}
			if (_array.length > 7) { _array.length = 7; } // 총수7
			var exdate = new Date();
  			exdate.setDate(exdate.getDate() + 365);			
			setCookie('_color_temp',_array.join('|'),exdate);
			this.get_temp_color();
		}
		edit_window_obj.close('editWindow-color');
	},
	
	int : function() {

		if (jQuery('#editWindow-color').length == 0) {

			var _html = 
			'<div class="box">' +
				'<div id="_color_picker_select_box">' +
					'<div class="editor-line"></div>' +
					'<div style="padding:2px 0">' +
						'<input type="radio" name="_editor_color_target" id="color_target_radio0" value="color" checked><label for="color_target_radio0">'+ msg_msg('text_color','a') +'</label> ' +
						'<input type="radio" name="_editor_color_target" id="color_target_radio1" value="backgroundColor"><label for="color_target_radio1">'+ msg_msg('bg_color','a') +'</label> ' +
					'</div>' +						
				'</div>' +
			'</div>';

			var _color_index = [0,7,10,12,13,14]
			var _color_unit = 15;

			_html += '<div id="color">' +
			'<div class="color-box1">';
											
           _html += '<ul class="color-btn">';
			_html += '<li><a href="#" onclick="color_obj.select(\'\');return false;" class="color-btn-none"></a></li>';
			_html += '<li><a href="#" onclick="color_obj.select(\'#ffffff\');return false;" style="background:#fff"></a></li>';           
			for (var i=0;i<7;i++) {
				_html += '<li><a href="#" id="_temp_color_'+i+'" onclick="color_obj.select(jQuery(this).css(\'background-color\'));return false;"></a></li>';
			}
			_html += '</ul>';
			
			for (var i=0;i<9;i++) {			
				_html += '<ul class="color-btn-col">';
				var _array = color_obj_func.color_step(this.colors[i],'#ffffff',_color_unit);
				for (var z=0;z<6;z++) {
					var z2 = _color_index[z];
					_html += '<li><a href="#" onclick="color_obj.select(\'' + _array[z2] + '\');return false;" style="background-color:' + _array[z2] + ';border-color:' + _array[z2] + '"></a></li>';					
				}
				_html += '</ul>';
			}
						
			_html += '</div>';

			_html += '<div class="color-box2">';            			
			_html += '<input type="text" id="_color_picker" class="form-control demo" data-inline="true" data-opacity="1" value="#ffffff">';
			_html += '</div>';

			_html += '<div class="color-box3">';            			
			_html += ''+
			'<div class="counter-control-box">'+
				'<span class="counter-control">'+
					'<span class="box-btn minicolors-sprite color-bg-box"><span id="_picker_color_preview" class="color-bg"></span></span>'+
					'<span class="box-input"><input type="text" id="_picker_color" onchange="color_obj.select(this.value)" value="" /></span>'+
					'<span class="box-btn"><button href="#" onclick="color_obj.save();return false;" class="color-button"></button></span>'+
				'</span>'+
			'</div>';
			_html += '</div>';
			
			_html += '</div>';			
			_html += '<input type="hidden" id="_color_picker_color">';
			_html += '<input type="hidden" id="_color_picker_alpha">';
						
			edit_window_obj.int("editWindow-color",_html,msg_msg('set_color','a'));
			
			color_obj.get_temp_color();

			jQuery('#_color_picker').minicolors({
				inline: 'true',
				opacity: 'true',
				change: function(value,opacity) {		
					var value2 = value;
					if (opacity < 1) { value2 = color_obj_func.HEX2RGBA(value2,opacity);	}
					jQuery('#_color_picker_color').val(value);
					jQuery('#_color_picker_alpha').val(opacity);	
					color_obj.callback(value2);
					color_obj.change_preview(value2);					
				}
			});
        
		}

	},

	change_by_input : function() {
		var Ccolor = jQuery('#_editor_color_value').val();
		color_obj.over(Ccolor);
		color_obj.close();		
	},

	// 사용처없음
	change : function(Dvar) {

alert(1);
		RestoreSelection(color_obj._selected);

		var _type = get_container();

		var Dkind = get_radio_value('_editor_color_target');

		if (_type == 1) {		
			document.execCommand("fontSize",false,"7");
			jQuery(document).find("font").each(function(){
				if (jQuery(this).attr("size") == "7") {
					jQuery(this).removeAttr("size").css(Dkind,Dvar);						
				
				}
			});				
		} else {
	 		Editor_Container.css(Dkind,Dvar);			
		}
		color_obj._selected = SaveSelection();			
		RemoveSelection();	
	},
	
	'_target' : false,
	'functions' : {},
	'_now' : false,


	'view' : function(obj,e,_function,_type) {

		var _id = random_id(obj);
		if (!color_obj.functions[_id]) {
			if (typeof(_function) == "function") {
				color_obj.functions[_id] = _function;
			}
		}

		color_obj._now = _id;
		color_obj._selected = SaveSelection();
		
		jQuery('#_color_picker_select_box').css('display',((_type == 1) ? "block" : "none"));
		layer_position("editWindow-color",obj,'up');	
		edit_window_obj.view('editWindow-color',e);
		
	},
		
	'over' : function(Dcolor) {
		jQuery('#_editor_color_value').val(Dcolor);
		color_obj.functions[color_obj._now](Dcolor);
	},
	
	'close' : function() {
		edit_window_obj.close('editWindow-color');
		color_obj._now = false;
		color_obj._selected = false;	
	}	
	
}; //color_obj


var color_obj_func = {

	RGB2HEX : function(a) {
		if (a == '') { return ''; }
		if (a.match(/^#/)) { return a; }
		a = a.toLowerCase();
		a = a.replace(/ /g,""); // 공백치환		
		if (a.match(/^rgba\(/)) { return a; }
		if (a.match(/^[A-Za-z_]+$/)) { a = this._get_color_name(a); }
		a = a.replace(/^rgb\(/,""); // 공백치환
		a = a.replace(/\)$/,""); // 공백치환
		b = a.split(",");
		return this.RGB2HEX2(b);
	},
	RGB2HEX2 : function(a) {
		var c = "#";
		for (var i=0;i<a.length;i++) { c += this._dec2hex(a[i]); }
		return c;		
	},
	HEX2RGBA : function(a,_opacity) { // #ffffff ↔ '255,255,255' 문자 리턴
		if (a.toLowerCase().match(/^rgba\(/)) { return a; }					
		var b = this.HEX2RGB2(a);		
		return ("rgba(" + b.join(",") + ","+_opacity+")");
	},	
	HEX2RGB : function(a) { // #ffffff ↔ '255,255,255' 문자 리턴
		if (a.toLowerCase().match(/^rgb\(/)) { return a; }					
		var b = this.HEX2RGB2(a);		
		return ("rgb(" + b.join(",") + ")");
	},	
	HEX2RGB2 : function(a) { // #ffffff ↔ (255,255,255) 배열 리턴			
		a = a.replace(/^#/,""); // #치환
		if (a.length == 3) {
			var cc = a.split("");
			a = cc[0] + cc[0] + cc[1] + cc[1] + cc[2] + cc[2];
		}		
		var b = [a.substr(0,2),a.substr(2,2),a.substr(4,2)];
		var c = [];
		for (var i=0;i<b.length;i++) { c.push(this._hex2dec(b[i])); }
		return c;
	},
	_T	:	"0123456789abcdef",	
	_dec2hex : function(i) { //255 ↔ ff
		return (this._T.charAt(i>>4)+this._T.charAt(i%16));	
	},
	_hex2dec : function(i) { //ff ↔ 255
		var t;
		while (i.toString().length < 2) { i = "0" + i; }
		i = i.toUpperCase();
		if(!i.match(/[^0-9a-fA-F]/i)) {	t = parseInt(i,16); }
		return t;
	},	
	'_get_color_name' : function(a) {
		var _temp = jQuery('<span></span>');
		_temp.css('background-color',a);
		a = _temp.css('background-color');
		_temp.remove();
		return a;
	},

	// 2개의 색상(C1,C2)의 단계를 (unit)로 나눈 배열생성 후 그 이름 리턴
	'color_step' : function(C1,C2,Dstep) {

		if (!Dstep) { Dstep = 5; }
		C1 = C1.toLowerCase();
		C2 = C2.toLowerCase();
		var u1 = C1.replace(/^#/,""); // 치환
		var u2 = C2.replace(/^#/,""); // 치환
		
		var unit = Dstep;
		var a1 = this.HEX2RGB2(C1);	// 시작
		var a2 = this.HEX2RGB2(C2);	// 종착

		var b = []; // 증/감소값
		for (var i=0;i<3;i++) {
			b[i] = Math.floor((a2[i] - a1[i]) / unit);
			if (b[i] > 0) { b[i]++; } else { b[i]--; }
		}

		var d = [];
		d.push(C1);
		for (var i=0;i<unit-1;i++) {
			var e = [];
			for (var j=0;j<3;j++) {
				if (!e[j]) { e[j] = []; }
				var v = a1[j] + (b[j] * i);			
				if (b[j] < 0) { // -로 진행
					if (v < a2[j]) { v = a2[j]; }			
				} else {
					if (v > a2[j]) { v = a2[j]; }				
				}
				e[j].push(v);
			}	
			var Ccolor = this.RGB2HEX2(e);
			d[i] = Ccolor;
		}
		d.push(C2);
		
		return d;

	}
	
};

var convert_unit = {

	'guess' : function(_var,orders_array) {

		var _val = _get_num(_var);
		var _unit = _get_str(_var);

		for (var i=0;i<orders_array.length;i++) {
			var _u = orders_array[i];
			var c = this._convert('px',_u,_val) + '';
			if (_u == '%') {
				if (c.indexOf(".") == -1) { // 소수점이 없으면
					if ((c % 10) == 0) { // 10단위이면
						return c + _u;
					}
				}
			} else { //em,rem 일때
				if (c.indexOf(".") > -1) {
					if (c.match(/^[0-9]+?\.[0-9][0-9]?$/)) { // 소수점 1자리수
						return c + _u;
					}
				} else {
					if (c.match(/^\d+$/)) { // 정수이면
						return c + _u;
					}
				}
			}
		}

		return roundXL(_val,0) + _unit;

	},

	'convert' : function(from_unit,to_unit,_var) {

		var x = this._convert(from_unit,to_unit,_var);
		var _round = (to_unit == 'px' || to_unit == 'pt') ? 0 : 3;
		return roundXL(x,_round);

	},

	'_convert' : function(from_unit,to_unit,_var) {

		if (!this._int_ok) { this._int(); }		
		var x = (from_unit != 'px') ? this._convert2px(_var,from_unit) : _var;
		if (to_unit == 'em') {
			x = x / this._em;	
		} else if (to_unit == '%') {
			x = (x / this._em) * 100;
		} else if (to_unit == 'rem') {
			x = x / this._rem;			
		} else if (to_unit == 'pt') {
			x = (x * this._pt) / this._dpi;							
		}

		return x * 1;

	},
	'_selected_unit' : false,
	'_pt' : 72,
	'_dpi' : 96,
	'_rem' : 16,
	'_em' : 16,
	'_convert2px' : function(_var,_unit,_round_not) {

		if (!this._int_ok) { this._int(); }
		var x = 0;	
		if (_unit == 'em') {
			x = _var * this._em;
		} else if (_unit == '%') {
			x = (_var / 100) * this._em;
		} else if (_unit == 'rem') {
			x = _var * this._rem;
		} else if (_unit == 'pt') {
			x = (_var * this._dpi) / this._pt;
		}
		if (_round_not != 1) {
			x = roundXL(x,0);
		}
		return x;

	},

	'_int_ok' : false,
	'_int' : function() {

		var _t = jQuery('<div>a</div>');
		_t.appendTo('body');
		this._em = _get_num(_t.css('font-size'));
		_t.remove();
		this._rem = _get_num(jQuery('html').css('font-size'));
		this._int_ok = true;

	}	
}