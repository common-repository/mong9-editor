/*
var m9_editor_func = {

	'type' : 0,
	
	// 초기 편집기 모드 설정
	'set_type' : function(_type) {
		if (!_type) { _type = 0; }
		this.type = _type;
	},
	
	'open' : function(hash) {
		m9_editor_func.set_type(hash['type']);
		ckeditor_extend.open(hash);
	},
	
	// M9에디터 새창열기
	'open_window' : function(_id) {
		if (this.type == 1) {
			var _html = ckeditor_extend.html.get(_id);
			jQuery('#'+_id).val(_html);
		}
		//openWindow('./m9editor.html?editor_id='+_id,{'fullscreen':1});		
		openWindow(_SET['mall_file'] + '?page_code=etc&code=m9editor2&editor_id='+_id,{'fullscreen':1});				
	},
	
	// M9에디터 새창에서 메인으로 내용 가져오기
	'to_main' : function(_id,_html) {
		if (this.type == 1) {	
			ckeditor_extend.html.put(_id,_html);
		} else {
			jQuery('#'+_id).val(_html);
		}
	},
	
	// 메인 에디터 정보 가져오기
	'check_save' : function(_id) {
		if (this.type == 1) {	
			var _html = ckeditor_extend.html.get(_id);
			jQuery('#'+_id).val(_html);
		}
		var data = jQuery('#'+_id).val();
		var ok = (data == '') ? 0 : 1;
		return ok;
	},
	
	// 메인 에디터 모드 변경
	'mode_change' : function(_id,_type) {
		if (this.type == _type) { return false; }
		var ok = (_type == 1) ? 1 : ((this.type == 1) ? 1 : 0);
		this.set_type(_type);
		if (ok == 0) { return false; }
		ckeditor_extend.change.mode(_id,_type);
	}
	
};
*/

var ckeditor_extend = {
	
	'open' : function(hash) {

		var _textarea_id = hash['id'];
		var img_upload_url = hash['image_upload_url'];
		var _textarea_height = hash['height'];
		var _type = hash['type'];

		CKEDITOR.replace(_textarea_id,{
			
			filebrowserUploadUrl: img_upload_url,
		
			on : {
				instanceReady : function(evt) {
					
					var editor = evt.editor,
					body = editor.document.getBody();
					body.$.className = body.$.className + ' ' + 'm9_editor_box';

					if (_type != 1) {
						jQuery('#' + _textarea_id).css({'display':'','visibility':'visible'});
						jQuery('#cke_' + _textarea_id).css('display','none');
					}
					jQuery('.'+_textarea_id+'_box').css('visibility','visible');		
					jQuery('iframe').attr('alt_no','1');
								
				}
			}
					
		});
		
		var editor = CKEDITOR.instances[_textarea_id];
		editor.config.allowedContent = true; 
		editor.config.contentsCss = [_SET["data_polder"]+'/etc/axicon/axicon.min.css',_SET["data_polder"]+'/css/mong9_base.css',_SET["data_polder"]+'./css/mong9_user.css',_SET["data_polder"]+'/css/mong9_w.css'];		
		editor.config.height = _textarea_height;
		editor.config.removePlugins = 'sourcearea';

		//editor.addCommand("mySimpleCommand", {
			//exec: function(edt) {
				//m9_editor_open(_textarea_id);
			//}
		//});
		
		//editor.ui.addButton('SuperButton', {
			//label: "몽9에디터",
			//command: 'mySimpleCommand',
			//toolbar: 'document',
			//icon: 'https://avatars1.githubusercontent.com/u/5500999?v=2&s=16'
		//});

	},
	
	'html' : {
		'get' : function(_id) {	
			return CKEDITOR.instances[_id].getData();
		},
		'put' : function(_id,_html) {				
			CKEDITOR.instances[_id].setData(_html);
		}
		
	},
	
	'change' : {
		
		'mode' : function(_id,_type) {
			
			var _textarea = jQuery('#' + _id);
			var edit_id = "cke_" + _id;	
			var _edit = jQuery('#' + edit_id);
		
			if (_type == 1) { // 편집기	
				var _html = _textarea.val();
				ckeditor_extend.html.put(_id,_html);
				_textarea.css({'display':'none','visibility':'hidden'});
				_edit.css('display','');
			} else {
				var _html = ckeditor_extend.html.get(_id);		
				_textarea.val(_html);		
				_textarea.css({'display':'','visibility':'visible'});
				_edit.css('display','none');
			}
	
		}
		
	}

};