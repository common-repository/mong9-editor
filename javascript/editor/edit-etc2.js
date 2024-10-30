
var box_html = {

	'slider' : {
		'handle' : {
			'setting' : function(_name,_var) {
				var _id = '#slider_editor_' + _name;
				jQuery(_id).find('.sliderBox-handle').text(_var);
				jQuery(_id).slider({"value":_var});	
			}
		},
		'get' : function(values) {
			this._temp[values.id] = values;
			return '<div id="slider_editor_' + values.id + '" class="sliderBox"><div class="sliderBox-handle ui-slider-handle"></div></div>';
		},		

		'setting' : function() { // options 라는 문자가 에러인지 확인을 위해
	
			for (var i in box_html.slider._temp) {
	
				var _options = this._temp[i];				

				var _id = "slider_editor_" + _options.id;
				this._ids[_id] = _options.id;

				jQuery('#'+_id).slider({
					max :_options.max,
					min:_options.min,
					step:_options.num,
					create: function() {		
						jQuery(this).find(".sliderBox-handle").text(jQuery(this).slider("value"));
					},
					change: function(event,ui) {				
						jQuery(this).find(".sliderBox-handle").text(ui.value);
					},
					slide: function(event,ui) {
						jQuery(this).find(".sliderBox-handle").text(ui.value);
						var _id = jQuery(this).attr('id');
						var _target = box_html.slider._ids[_id];
						element_obj.edit.operations(3,_target,ui.value); // type:3 슬라이드 드래그시
						element_obj.edit[_target].change();
					}
				});
	    
			}
			this._temp = {};
			
		},

		'_temp' : {},
		'_ids' : {}
		
	},
	'unit' : {
		'_selected_unit' : false,
		'select' : function(Dobj) {
			this._selected_unit = jQuery(Dobj).val();
		},
		'reset' : function(Dname,Dvar) {

			if (!box_html._options[Dname]) { return false; }	

			var _var = _get_num(Dvar);
			var _unit = _get_str(Dvar);

			var _id = '_editor_' + Dname;			
			jQuery('#'+_id).val(_var);			
			jQuery('#'+_id+'_unit').val(_unit);

			var max_unit = 1;
			var step = 1;
			if (_unit == 'em' || _unit == 'rem') {
				max_unit = 0.1;
				step = 0.1;
			} else if (_unit == '%') {
				if (Dname == 'line_height') {
					max_unit = 10;
					step = 10;
				} else {			
					max_unit = 1;
					step = 1;
				}
			}
				
			var options = box_html._options[Dname];	
			var _max = (options.max * 1)*(max_unit*1);	
			var _min = (options.min*1)*(max_unit*1);

			var _options = { 'max' : _max , 'min' : _min , 'num' : step };
			input_box.change_options(_id,_options);

			var _options = { 'max' : _max , 'min' : _min , 'step' : step };
			jQuery('#slider_editor_'+Dname).slider('option','max',_max).slider('option','min',_min).slider('option','step',step);
										
		},
		'change' : function(Dname) {
			var _id = '_editor_' + Dname;			
			var _unit = jQuery('#'+_id+'_unit').val();
			if (_unit == this._selected_unit) { return false; }
			var _var = jQuery('#'+_id).val();
			var x = convert_unit.convert(this._selected_unit,_unit,_var);
			this.reset(Dname,x+_unit);
			box_html.slider.handle.setting(Dname,x);
		}
	},
	'_options' : {},
	control_box : function(values) {
		
		this._options[values.id] = values;
		var _unit = (values.unit) ? values.unit : 'px';

		return '<div class="counter-control-box">' +
			'<span class="counter-control">' +
				'<span class="box-btn"><button href="#" onclick="return false;" onmousedown="input_box.plus(\'_editor_' + values.id + '\',{},function(){element_obj.edit.' + values.id + '.change();})" onmouseup="input_box.stop(\'_editor_' + values.id + '\')" class="left-button icon2-plus"></button></span>' +
				'<span class="box-input"><input type="text" id="_editor_' + values.id + '" value="0" onchange="element_obj.edit.' + values.id + '.change();return false;" /></span>' +
				//'<span class="box-unit">'+ _unit + '</span>' +
				'<span class="box-unit">'+ 
				'<select id="_editor_'+ values.id +'_unit" onclick="box_html.unit.select(this);return false;" onchange="box_html.unit.change(\'' + values.id + '\');return false;" class="unit">' +				
				'<option value="px">px</option>'+
				'<option value="em">em</option>'+
				'<option value="rem">rem</option>'+								
				'<option value="%">%</option>'+		
				'<option value="pt">pt</option>'+										
				'</select>' +
				'</span>' +
				'<span class="box-btn"><button href="#" onclick="return false;" onmousedown="input_box.minus(\'_editor_' + values.id + '\',{},function(){element_obj.edit.' + values.id + '.change();})" onmouseup="input_box.stop(\'_editor_' + values.id + '\');" class="right-button icon2-minus"></button></span>' +
			'</span>' +
		'</div>' +
		'<script>input_box.change_options(\'_editor_' + values.id +'\',{\'max\':' + values.max + ',\'min\':' + values.min + ',\'num\':' + values.num + '})</script>';
			
	}
};

function get_userbox_01(options) {
	return '<div class="_ctr-n-inpt">' +
		'<div class="_ctr">' + box_html.slider.get(options) + '</div>' + // 슬라이드
		'<div class="_inpt">' + box_html.control_box(options) + '</div>' + // 폰트 사이즈
	'</div>';
}

function get_class_btn_num(sid) {
	return _class_btn_num[sid];
}
var _class_btn_num = {};
function get_userbox_class_btn(sid,options) {

	var Sarray = style_info[sid];
	if (!options) { options = {}; }
	if (!_class_btn_num[sid]) { _class_btn_num[sid] = 0; }
	_class_btn_num[sid]++;
	var _num = _class_btn_num[sid];
	
	var _html = '<ul class="_edit-ul-1';
	if (options && options.addClass) { _html += ' ' + options.addClass; }
	_html += '">';	
	var _btn_class = '_' + sid;
	for (var i=0;i<Sarray._class.length;i++) {
		var _name = (Sarray._class_names[i]) ? Sarray._class_names[i] : Sarray._class[i];
		var n_class = '_' + Sarray._class[i];
		if (options.btn_addClass) { n_class += ' ' + options.btn_addClass; }		
		var onclick_function = (options.onclick_function) ? options.onclick_function : 'element_obj.edit.class2.change';	
		_html +=  '<li><button onclick="' + onclick_function + '(\'' + sid + '\',\'' + Sarray._class[i] + '\');return false;" title="' + Sarray._class[i] + '" class="class-btn '+_btn_class+' ' + n_class + '">' + _name + '</button></li>';				
	}
	_html += '</ul>';
	
	return _html;
}

var edit_control_box = {

	'selectbox2' : function(options) {

		var _id = options.id;
		var obj_id = '_editor_' + _id;

		var _mode_class1 = '';
		var _mode_class2 = '';		
		if (options['mode_not'] == 1) {
			_mode_class1 = '_drag-btn-3';
			_mode_class2 = 'class="_drag-element-3"';
		}
		
		var onclick_function = (options.onclick_function) ? options.onclick_function : 'element_obj.edit.' + _id + '.change()';
								
		var _html = '' +
		'<div class="counter-control-box">' +
			'<span class="counter-control">' +
				'<span class="box-btn"><button href="#" onclick="return false;" onmousedown="input_box.plus(\'' + obj_id + '\',{},function(){' + onclick_function + ';})" onmouseup="input_box.stop(\'' + obj_id + '\');" class="left-button icon2-plus ' + _mode_class1 + '"></button></span>' +
				'<span class="box-input">' +
					'<select name="' + obj_id + '" id="' + obj_id + '" onchange="' + onclick_function + '" ' + _mode_class2 + '>';
		if (!options['first_index_not']) {
			_html += '<option value=""></option>';
		}
		if (style_info && style_info[_id]) {
			var lists = style_info[_id];
			var _class = lists['_class'];
			for (var i=0;i<_class.length;i++) {
				var _name = (lists['_class_names'] && lists['_class_names'][i]) ? lists['_class_names'][i] : _class[i];
				_html += '<option value="' + _class[i] +'">' + _name + '</option>';
			}
		}

		_html += '' +					
					'</select>' +
				'</span>' +
				'<span class="box-btn"><button href="#" onclick="return false;" onmousedown="input_box.minus(\'' + obj_id + '\',{},function(){' + onclick_function + '})" onmouseup="input_box.stop(\'' + obj_id + '\');" class="right-button icon2-minus ' + _mode_class1 + '""></button></span>' +
			'</span>' +
		'</div>' ;

		return _html;
				
	},
	
	'selectbox' : function(options) {

		var _id = options.id;
		var obj_id = '_editor_' + _id;

		var _mode_class1 = '';
		var _mode_class2 = '';		
		if (options['mode_not'] == 1) {
			_mode_class1 = '_drag-btn-3';
			_mode_class2 = 'class="_drag-element-3"';
		}
		
		var _html = '' +
		'<div class="counter-control-box">' +
			'<span class="counter-control">' +
				'<span class="box-btn"><button href="#" onclick="return false;" onmousedown="input_box.plus(\'' + obj_id + '\',{},function(){element_obj.edit.class.change(\'' + obj_id + '\');})" onmouseup="input_box.stop(\'' + obj_id + '\');" class="left-button icon2-plus ' + _mode_class1 + '"></button></span>' +
				'<span class="box-input">' +
					'<select name="' + obj_id + '" id="' + obj_id + '" onchange="element_obj.edit.class.change(\'' + obj_id + '\')" ' + _mode_class2 + '>';
					
		if (!options['first_index_not']) {
			_html += '<option value=""></option>';
		}
		
		if (style_info && style_info[_id]) {
			var lists = style_info[_id];
			var _class = lists['_class'];
			for (var i=0;i<_class.length;i++) {
				var _name = (lists['_class_names'] && lists['_class_names'][i]) ? lists['_class_names'][i] : _class[i];
				_html += '<option value="' + _class[i] +'">' + _name + '</option>';
			}
		}

		_html += '' +					
					'</select>' +
				'</span>' +
				'<span class="box-btn"><button href="#" onclick="return false;" onmousedown="input_box.minus(\'' + obj_id + '\',{},function(){element_obj.edit.class.change(\'' + obj_id + '\');})" onmouseup="input_box.stop(\'' + obj_id + '\');" class="right-button icon2-minus ' + _mode_class1 + '"></button></span>' +
			'</span>' +
		'</div>' ;

		return _html;
				
	},				
	'colorbox' : function(options) {
		var _id = '_editor_' + options.id;
		return '<div class="counter-control-box">' +
			'<span class="counter-control">' +
				'<span class="box-btn minicolors-sprite color-bg-box"><span id="_color_preview_' + options.id + '" class="color-bg"></span></span>' +
				'<span class="box-input"><input type="text" id="' + _id + '" value="" onchange="element_obj.edit.' + options.id + '.change();return false;" /></span>' +
				'<span class="box-btn"><button href="#" onclick="color_obj.set(jQuery(\'#' + _id + '\').val(),function(e){' + options.callback + '(e);});color_obj.view(this,function(e){element_obj.edit.' + options.id + '.set(e);});return false;" class="color-button"></button></span>' +
			'</span>' +
		'</div>';
	}
};

function get_inline_style(Dobj,Dproperty,Dempty) {
	var _style = (typeof(Dobj) == 'string') ? Dobj : jQuery(Dobj).attr('style');
	var rgExp = Dproperty+":([^\\;]+)";	
	var re = new RegExp(rgExp,'gi');
	var retVal = re.exec(_style);
	if (retVal) {
		if (Dempty && Dempty != 1) {
			return retVal[1].replace(/\s/g,"");
		} else {
			return jQuery.trim(retVal[1]);
		}
	}
	return '';
}


