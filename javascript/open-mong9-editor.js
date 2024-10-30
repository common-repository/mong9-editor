var _editor_kind = 'normal';
var _editor_textarea_id = 'content';
var _editor_type = 'html';

jQuery(function() {
		
	if (jQuery('#wp-content-wrap').length > 0) { // normal
		var _html = '<div id="mong9-view-btn"><a href="#" onclick="open_m9editor();return false;" class="mong9-editor-btn">Edit with Mong9 Editor</a></div>';		
		jQuery('#wp-content-wrap').before(_html);
	} else {
		Delay_fuc2("",200,function() {	
			if (jQuery('.edit-post-header-toolbar').length > 0) { // gutenberg
				var _html = '<div id="mong9-view-btn" class="_for-gutenberg"><a href="#" onclick="open_m9editor();return false;" class="mong9-editor-btn">Edit with Mong9 Editor</a></div>';				
				jQuery('.edit-post-header-toolbar').append(_html);
				_editor_kind = 'gutenberg';
				_editor_textarea_id = '';
			}
		});
	}

});

function open_m9editor() {
	
	if (_editor_kind == 'normal') {
		
		var _kind = jQuery('#wp-content-wrap').hasClass('html-active');	
		
		if (!_kind) {
			_editor_type = 'edit';
			jQuery( '#content-html' ).click();
		}
		
		openWindow(_SET["mong9_window_url"]+'&editor_id='+_editor_textarea_id,{'fullscreen':1,'scrollbars':1,'resizable':1});
				
	} else if (_editor_kind == 'gutenberg') {

		alert('Sorry, Not supported by gutenberg.');
		return false;
		
		jQuery('.edit-post-more-menu').find('button').eq(0).click();		
		var _button = jQuery('[role="menuitemradio"]');
		
		if (_button.length > 0) {
			
			var _kind = _button.eq(1).attr('aria-checked');

			if (_kind == 'false') {	
				_editor_type = 'edit';				
				_button.eq(1).click();
			}

			_editor_textarea_id = jQuery('.edit-post-text-editor__body').find('textarea').eq(1).attr('id');
			openWindow(_SET["mong9_window_url"]+'&editor_id='+_editor_textarea_id,{'fullscreen':1});
			
			if (_kind == 'false') {
				_button.eq(0).click();	
			}
		
		}
		
	}
}

function m9_editor_in(_id,_html) {

	if (_editor_kind == 'normal') {
		
		var _kind = jQuery('#wp-content-wrap').hasClass('html-active');	
		
		if (!_kind) {
			jQuery( '#content-html' ).click();
		}

		jQuery('#'+_id).val(_html);
		
		if (_editor_type == 'edit') {	
			jQuery( '#content-tmce' ).click();	
		}
		
	} else if (_editor_kind == 'gutenberg') {

		alert('Sorry, Not supported by gutenberg.');
		return false;
		
		jQuery('.edit-post-more-menu').find('button').eq(0).click();
		var _button = jQuery('[role="menuitemradio"]');
		
		if (_button.length > 0) {
			
			var _kind = _button.eq(1).attr('aria-checked');		

			if (_kind == 'false') {
				_button.eq(1).click();
			}
			
			jQuery('#'+_id).val(_html);

			if (_kind == 'false') {	
				_button.eq(0).click();	
			}
		
		}
		
	}

}