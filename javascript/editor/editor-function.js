var storedSelections = false;

// 드래그영역 객체 가져오기
function getSelectionStartNode(){
	var node, selection;
	if (window.getSelection){ // ie9 이상 + 모든 브라우저
		selection = getSelection();
		node = selection.anchorNode; // 드래그 시작위치의 참조값
	}
	if (!node && document.selection){ // ie전용
		selection = document.selection;
		var range = selection.getRangeAt ? selection.getRangeAt(0) : selection.createRange();
		node = range.commonAncestorContainer ? range.commonAncestorContainer : range.parentElement ? range.parentElement() : range.item(0);
	}
	if (node){
		// 노드가 텍스트이면 부모를 그렇지 않으면 자신을 리턴
		return (node.nodeName == "#text" ? node.parentNode : node);
	}
}

// 선택영역 저장
function SaveSelection() {
	if (window.getSelection) {  // all browsers, except IE before version 9
		var selection = window.getSelection();	
		if (selection.rangeCount > 0) {
			storedSelections = selection.getRangeAt(0);
		}
	} else {
		if (document.selection) {   // Internet Explorer
			var range = document.selection.createRange();
			storedSelections = range.getBookmark();
		}
	}
	return storedSelections;
}

// 선택영역 재설정
function RestoreSelection(obj) {
	var _target = false;
	if (obj) {
		_target = obj;
	} else if (!storedSelections) {
		return false;
	} else {
		_target = storedSelections;
	}

	if (window.getSelection) {  // all browsers, except IE before version 9
		var selection = window.getSelection();                                        
		selection.removeAllRanges();
		selection.addRange(_target);
	} else {
		if (document.body.createTextRange) {    // Internet Explorer
			var rangeObj = document.body.createTextRange();
			rangeObj.moveToBookmark(_target);
			rangeObj.select();
		}
	}
}

// 선택영역제거
function RemoveSelection() {
	if (window.getSelection) {  // all browsers, except IE before version 9
		var selection = window.getSelection();                                        
		selection.removeAllRanges();
	} else {
		if (document.selection.createRange) {        // Internet Explorer
			var range = document.selection.createRange();
			document.selection.empty();
		}
	}
}

// 선택영역 텍스트 가져오기        
function GetSelectedText() {
	var selText = "";
	if (window.getSelection) {  // all browsers, except IE before version 9
		if (document.activeElement && (document.activeElement.tagName.toLowerCase() == "textarea" || document.activeElement.tagName.toLowerCase() == "input")) {
			var text = document.activeElement.value;
			selText = text.substring(document.activeElement.selectionStart,document.activeElement.selectionEnd);
		} else {
			var selRange = window.getSelection();
			selText = selRange.toString();
		}
	} else {
		if (document.selection.createRange) { // Internet Explorer
			var range = document.selection.createRange();
			selText = range.text;
		}
	}
	if (selText !== "") {
		return selText;
	}
	return false;
}

var Editor_Container = null;

function get_container() {

	var txt = GetSelectedText();

	var _ancestor; // 범위의 시작점과 끝점을 모두 포함하며 가장 깊게 중첩되어 있는 노드, 즉 조상인 Document 노드
	var _p_ancestor; // _ancestor의 부모 객체
              
	if (window.getSelection){ // ie 9 이상 + 다른 브라우져
		_ancestor = window.getSelection().getRangeAt(0).commonAncestorContainer;
		_p_ancestor = window.getSelection().getRangeAt(0).commonAncestorContainer.parentNode;
	} else if (document.selection){ // ie 전용
		_ancestor = document.selection.createRange();
		_p_ancestor = document.selection.createRange().parentElement();
	}

	var _type = 1;
	// 한 태그 안의 텍스트 일부를 드래그 했을때		
	if (jQuery(_ancestor).text() != txt) {					
		_type = 1;
		Editor_Container = jQuery(_ancestor);			
	// 한 태그 안의 텍스트 전체를 드래그 했을때             
	} else if (jQuery(_ancestor).text() == txt) {
		
		if (jQuery(_p_ancestor).is('tr,th,td,dt,dd')) {				
			_type = 1;
			Editor_Container = jQuery(_ancestor);
		} else {
			// 안에 태그가 존재할 경우	
			_type = 2;			
				Editor_Container = jQuery(_p_ancestor);
				
			if (jQuery(_ancestor).html()) {
				Editor_Container = jQuery(_ancestor);
			// 텍스트만일 경우
			} else {
				Editor_Container = jQuery(_p_ancestor);
			}
		}
		
	} else {
		_type = 3;
		Editor_Container = jQuery(_p_ancestor);			
	}
	return _type;
			
}

function SelectFirstLine(elemToSelect,_type) {
	if (window.getSelection) {  // all browsers, except IE before version 9
		var selection = window.getSelection();
		var rangeToSelect = document.createRange();
		if (_type == 1) {
			rangeToSelect.selectNode(elemToSelect);
		} else {
			rangeToSelect.selectNodeContents(elemToSelect);
		}				
		selection.removeAllRanges();
		selection.addRange(rangeToSelect);
	} else {
		if (document.body.createTextRange) {    // Internet Explorer
			var rangeToSelect = document.body.createTextRange();
			rangeToSelect.moveToElementText(elemToSelect);
			rangeToSelect.select();
		}
	}
}

function InsertObj(_html) {
	var _html = jQuery(_html)[0];            
	if (window.getSelection) {  // all browsers, except IE before version 9
		var selection = window.getSelection();
		if (selection.rangeCount > 0) {
			var range = selection.getRangeAt(0);
			range.insertNode(_html);
		}
	} else {  // Internet Explorer before version 9
		var textRange = document.selection.createRange();
		textRange.collapse(true);
		textRange.pasteHTML(_html.outerHTML);	
	}
}
        
//============================================================================================//

 function error_msg(Ddata) {

	var evt_obj = get_evt_obj();
	Ddata = Ddata.replace(/\n/g,"<br />");	
	jQuery("#ajax_error_contents").html(Ddata);

	layer_position("ajax_error_view",evt_obj);
	layer_view_only(
		"ajax_error_view",
		{opacity:100,speed:'slow'},
		function(){ 
			Delay_fuc2("ajax_error",1000,function(){ layer_view_only_close("ajax_error_view"); }); 
		}
	);
	
}

/////////////////////////////////////////////////////////////////////////////////////////////
// 파일 사이즈 변경
/////////////////////////////////////////////////////////////////////////////////////////////
function Get_File_Size(Csize) {
	if (Csize == "") { return 0;}
	return (parseInt(Csize / 1048576)) ? parseInt(Csize / 1048576)+(parseInt(Csize % 1048576) ? "."+(sprintf(6,parseInt(Csize % 1048576))+"").substr(0,2)+"MB" : "MB" ) : (parseInt(Csize / 1024)) ? parseInt(Csize / 1024)+(parseInt(Csize % 1024) ? "."+(sprintf(3,parseInt(Csize % 1024))+"").substr(0,2)+"KB" : "KB" ) : Csize+"bytes";
} // function

// 파일이름 얻기
function Get_FileName(Dfile) {
	Dfile = Dfile.replace(/\\/gi,"/");
	var file_layer = Dfile.split("/");
	return eval("file_layer["+(file_layer.length-1)+"]");
} // function

function remove_empty_line(_html,_type){

	var lines = _html.replace(/\r/g,'').split('\n');
	var lines_length = lines.length;
	var newlines = new Array();
	var newlines_length = 0;

	if(_type != true){		
		var _exp = new RegExp(/\S/);
		for(var x=0;x<lines_length;x++){
			if(_exp.test(lines[x]) == true){
				newlines[newlines_length] = lines[x];
				newlines_length++;
			}
		}
	} else {
		for(var x=0;x<lines_length;x++){
				if(lines[x] != ''){
					newlines[newlines_length] = lines[x];
					newlines_length++;
				}
		}
	}
	return newlines.join('\n');

}

function _get_box_info(_obj,_type) {

	var _h = {};

	if (!(_obj)) { return _h; }

	_h['w'] = get_box_size2(_obj,"width") + 'px';
	_h['h'] = get_box_size2(_obj,"height") + 'px';
		
	_h['l'] = (_type) ? (getRealOffsetLeft(_obj) + 'px') : jQuery(_obj).css("left");
	_h['t'] = (_type) ? (getRealOffsetTop(_obj) + 'px') : jQuery(_obj).css("top");
				
	_h['w2'] = _get_num(_h['w']);
	_h['h2'] = _get_num(_h['h']);
	_h['l2'] = _get_num(_h['l']);
	_h['t2'] = _get_num(_h['t']);
	
	return _h;			
			
}

function get_box_size2(Did,Dkind) {

	var Cid = _get_object(Did);
	var J_Cid= jQuery(Cid);
	
	var Cvar = 0;

	var boxSized = (J_Cid.css('box-sizing') == 'border-box') ? 1 : 0;

	if (Dkind == "height") {
		
		Cvar = J_Cid.height();
		Cvar += _get_num(J_Cid.css('padding-top'));			
		Cvar += _get_num(J_Cid.css('padding-bottom'));	
				
		if (boxSized == 1) {
			Cvar += _get_num(J_Cid.css('border-top-width'));			
			Cvar += _get_num(J_Cid.css('border-bottom-width'));				
		}
		
	} else {
		
		Cvar = J_Cid.width();
		Cvar += _get_num(J_Cid.css('padding-left'));			
		Cvar += _get_num(J_Cid.css('padding-right'));				
		if (boxSized == 1) {
			Cvar += _get_num(J_Cid.css('border-left-width'));			
			Cvar += _get_num(J_Cid.css('border-right-width'));				
		}
		
	}

	return Cvar;				
}

function get_browser_cover(){
	var _str = "";
	if (_SET["navigator"] == "chrome") {
		_str = "-web-kit";
	} else if (_SET["navigator"] == "firefox") {
		_str = "-moz";
	} else if (_SET["navigator"] == "opera") {
		_str = "-o";				
	}
	return _str;
}
			
function check_radio_by_value(Cid,Cvalue) {
 var Did = document.getElementsByName(Cid);
 if (!Did) { return false; }
 for (var i=0; i<Did.length;i++) {
 	if (Did[i].value == Cvalue) {
 		Did[i].checked = true;
 		return i;
 	}	
 }
  return -1;
} //function

/* 사용처없음 */
function text_diff(first, second) {
    var start = 0;
    while (start < first.length && first[start] == second[start]) {
        ++start;
    }
    var end = 0;
    while (first.length - end > start && first[first.length - end - 1] == second[second.length - end - 1]) {
        ++end;
    }
    end = second.length - end;

var yy = second.substr(start, end - start);

	var _return = {
		before : second.substr(0,start),
		html : second.substr(start, end - start),
		after : second.substr(end,second.length)
	};

	return _return;
}
/* 사용처없음 */
function remove_html(str) {

	var remove_char,output;
		
	remove_char = 	/(\n|\r)/g; // 리턴값 제거
	output = str.replace(remove_char,' ');
	remove_char = new RegExp('<!--(.*?)-->','g'); // 주석구문 제거	
	output = str.replace(remove_char,' ');
	remove_char = new RegExp('<(/)*(meta|link|span|\\?xml:|st1:|o:|font)(.*?)>','gi');  // 각종태크 제거
	output = str.replace(remove_char,' ');

	// <script>..</script> 형식들 제거
	var remove_chars = ['style','script','applet','embed','noframes','noscript'];
	for(var i=0;i<remove_chars.length;i++){
 		remove_char = new RegExp('<'+remove_chars[i]+'.*?'+remove_chars[i]+'(.*?)>','gi');
 		output = output.replace(remove_char,' ');
	}	

	// style 제거
	var remove_chars = ['style'];
	for(var i=0;i<remove_chars.length;i++){
		remove_char = new RegExp(' '+remove_chars[i]+'="(.*?)"','gi');
		output = output.replace(remove_char,'');
	}		

	return output;
}

function ctrl_v_convert(_obj,_tag) {

	var rands = {};
	var _rand = function() {
		var x = 0;
		while(x == 0) {
			var rand = parseInt(Math.random() * 10000);	
			if (!rands[rand]) {
				rands[rand] = 1;
				x++;
			}
		}
		return rand;
	};

	var change_rand = function(obj) {
		var rand = _rand();		
		rands[rand] = obj.outerHTML;
		obj.outerHTML = '[_' + rand + '_]';		
	}

	var change_rand2 = function(obj) {
		var rand = _rand2();		
		rands2[rand] = obj.outerHTML;
		obj.outerHTML = '[_' + rand + '_]';		
	}
		
	var convert_br = function(obj) {
		jQuery(obj).removeAttr('style').removeAttr('class');
		change_rand(obj);				
	};
		
	var convert_img = function(obj) {
		jQuery(obj).removeAttr('width').removeAttr('height').attr('class','fullimg');
		change_rand(obj);				
	};

	var convert_table = function(obj) {
		jQuery(obj).removeAttr('class').removeAttr('style').removeAttr('cellspacing').removeAttr('cellpadding').removeAttr('align').removeAttr('valign').removeAttr('border').removeAttr('bgcolor').attr('class','table-1');
		change_rand(obj);				
	};

	var convert_ul = function(obj) {
		jQuery(obj).removeAttr('class').removeAttr('style');//.attr('class','ul-1');
		obj = unlist_obj.aaa.bbb(obj);
		change_rand(obj);				
	};

	var convert_ol = function(obj) {
		jQuery(obj).removeAttr('class').removeAttr('style');//.attr('class','ul-1');
		obj = ollist_obj.aaa.bbb(obj);
		change_rand(obj);				
	};

	var obj = jQuery('<div />').html(_obj);

	// 이중리턴 아니면 리턴생성
	obj.children().find('div,p').each(function() {
		if (jQuery(this).html() != "<br>") {
			jQuery(this).after("<br>");
		}
	});

	obj.children().find('table').each(function() {

		var table_index = this;

		var thead_count = jQuery(this).find('thead').length;
			
		if (thead_count == 0) {

			jQuery(table_index).find('tbody').before('<thead></thead>');
			jQuery(table_index).find('thead').append(jQuery(table_index).find('tr')[0]);
			var ttt = jQuery(table_index).find('thead');			
			jQuery(ttt).find('th,td').each(function() {
				jQuery(this).attr('scope','col');						
				changeTag(this,'th');
			});
						
		}
				
		jQuery(table_index).find('tr').each(function() {

			var J_this = jQuery(this);
			
			J_this.removeAttr('class').removeAttr('style').removeAttr('align').removeAttr('valign').removeAttr('border').removeAttr('bgcolor').removeAttr('width').removeAttr('height');
							
			var th_count = J_this.find('th').length;
			if (th_count == 0) {
				var td_count = J_this.find('td').length;
				if (td_count > 1) {								
					changeTag(J_this.find('td')[0],'th');					
					jQuery(J_this.find('td')[0]).attr('scope','row');							
				}
			}
			
		});
						
		jQuery(table_index).find('td,th').each(function() {

			var J_this = jQuery(this);			
			var dd = J_this.text();
			J_this.html(dd);
			J_this.removeAttr('class').removeAttr('style').removeAttr('align').removeAttr('valign').removeAttr('border').removeAttr('bgcolor').removeAttr('width').removeAttr('height');		
			J_this.children().each(function() {
				if (jQuery(this).html() == "") { jQuery(this).remove(); }
				jQuery(this).removeAttr('class').removeAttr('style').removeAttr('align').removeAttr('valign').removeAttr('border').removeAttr('bgcolor').removeAttr('width').removeAttr('height');		
			});
			
		});
		
	});
					
	if (_tag == 'p' || _tag == 'div') {
	
		obj.find('br,img,table,ul,ol').each(function() {		
			var _tag_name = jQuery(this).prop("tagName").toLowerCase();
			if (_tag_name == 'img') {
				convert_img(this);
			} else if (_tag_name == 'table') {
				convert_table(this);			
			} else if (_tag_name == 'br') {
				convert_br(this);	
			} else if (_tag_name == 'ul') {
				convert_ul(this);
			} else if (_tag_name == 'ol') {
				convert_ol(this);					
			}
		});		
			
	} else {

		obj.find('br,img').each(function() {		
			var _tag_name = jQuery(this).prop("tagName").toLowerCase();
			if (_tag_name == 'img') {
				convert_img(this);	
			} else if (_tag_name == 'br') {
				convert_br(this);							
			}
		});
				
	}

	var _text = obj.text();

	for (var i in rands) {
		var _rand = '\\[\\_' + i + '\\_\\]';		
		_text = _text.replace(new RegExp(_rand,'gi'),rands[i]);				
	}

	// style 제거
	var remove_chars = ['style'];
	for(var i=0;i<remove_chars.length;i++){
		remove_char = new RegExp(' '+remove_chars[i]+'="(.*?)"','gi');
		_text = _text.replace(remove_char,'');
	}		
		
	obj.remove();
	return _text; 

} //function

//https://social.msdn.microsoft.com/forums/windowsapps/en-us/f91341cb-48b3-424b-9504-f2f569f4860f/getset-caretcursor-position-in-a-contenteditable-div
function getCaretPosition(element) {
	var ie = (typeof document.selection != "undefined" && document.selection.type != "Control") && true;
	var w3 = (typeof window.getSelection != "undefined") && true;
	var caretOffset = 0;
	if (w3) {
		var range = window.getSelection().getRangeAt(0);
		var preCaretRange = range.cloneRange();
		preCaretRange.selectNodeContents(element);
		preCaretRange.setEnd(range.endContainer, range.endOffset);
		caretOffset = preCaretRange.toString().length;
	} else if (ie) {
		var textRange = document.selection.createRange();
		var preCaretTextRange = document.body.createTextRange();
		preCaretTextRange.expand(element);
		preCaretTextRange.setEndPoint("EndToEnd", textRange);
		caretOffset = preCaretTextRange.text.length;
	}
	return caretOffset;
}

function setCaretPos(el,sPos) {
 	
	var charIndex = 0, range = document.createRange();
	range.setStart(el, 0);
	range.collapse(true);
	var nodeStack = [el], node, foundStart = false, stop = false;

	while (!stop && (node = nodeStack.pop())) {
		if (node.nodeType == 3) {
			var nextCharIndex = charIndex + node.length;
			if (!foundStart && sPos >= charIndex && sPos <= nextCharIndex) {
				range.setStart(node, sPos - charIndex);
				foundStart = true;
			}
			if (foundStart && sPos >= charIndex && sPos <= nextCharIndex) {
				range.setEnd(node, sPos - charIndex);
				stop = true;
			}
			charIndex = nextCharIndex;
		} else {
			var i = node.childNodes.length;
			while (i--) {
				nodeStack.push(node.childNodes[i]);
			}
		}
	}
	selection = window.getSelection();                 
	selection.removeAllRanges();                       
	selection.addRange(range);
}    
 
//http://www.webdeveloper.com/forum/showthread.php?74982-How-to-set-get-caret-position-of-a-textfield-in-IE
function doSetCaretPosition (oField, iCaretPos) {

	// IE Support
	if (document.selection) { 
		// Set focus on the element
		oField.focus ();
		  
		// Create empty selection range
		var oSel = document.selection.createRange ();
		  
		// Move selection start and end to 0 position
		//oSel.moveStart ('character', -oField.value.length);
		  
		// Move selection start and end to desired position
		oSel.moveStart ('character', iCaretPos);
		oSel.moveEnd ('character', 0);
		oSel.select ();
	}
	
	// Firefox support
	else if (oField.selectionStart || oField.selectionStart == '0') {
		oField.selectionStart = iCaretPos;
		oField.selectionEnd = iCaretPos;
		oField.focus();
	}
}

 function placeCaretAtEnd(el) {
	el.focus();
	if (typeof window.getSelection != "undefined" && typeof document.createRange != "undefined") {
		var range = document.createRange();
		range.selectNodeContents(el);
		range.collapse(false);
		var sel = window.getSelection();
		sel.removeAllRanges();
		sel.addRange(range);
	} else if (typeof document.body.createTextRange != "undefined") {
		var textRange = document.body.createTextRange();
		textRange.moveToElementText(el);
		textRange.collapse(false);
		textRange.select();
	}
}

function Selection2Obj(_tag) {

	RestoreSelection(storedSelections);

	var txt = GetSelectedText();	

	if (!txt) { return false; }
	
	var _type = get_container();
	if (_type == 1) {

		document.execCommand("fontSize",false,"7");		
		jQuery(document).find("font").each(function() {		
			if (jQuery(this).attr("size") == "7") {
				jQuery(this).removeAttr("size");		
			}
		});

		get_container();
		editor._now = Editor_Container[0];
		if (!_tag) { _tag = 'span'; }
		editor._now = changeTag(editor._now,_tag);
		jQuery('.selected_tag').removeClass("selected_tag");		
		jQuery(editor._now).addClass("selected_tag");
		RemoveSelection();

	}

}

function changeTag(obj,tag) {
	
	var brefore_tag = jQuery(obj).prop('tagName');
	
	var _clone = jQuery(obj).clone();
	var _clone_in = jQuery(_clone).html();
	
	jQuery(_clone).html("");
	var _html = _clone[0].outerHTML;
	_html = _html.replace(new RegExp('<'+brefore_tag,'gi'),'<'+tag.toLowerCase()).replace(new RegExp('</'+brefore_tag,'gi'),'</'+tag.toLowerCase());        
	
	var re_obj = jQuery(_html).html(_clone_in);
	var random_class = '__this_is__random_class__' + Math.round(Math.random()*100000);
	jQuery(re_obj).addClass(random_class);
	
	jQuery(obj).replaceWith(re_obj);
	
	obj = jQuery('.' + random_class)[0];
	jQuery(obj).removeClass(random_class);	
	
	return obj;	
	
}

function findAncestor(el, sel) {
    while ((el = el.parentElement) && !((el.matches || el.matchesSelector).call(el,sel)));
    return el;
}


/**
 * Get the closest matching element up the DOM tree.
 * @private
 * @param  {Element} elem     Starting element
 * @param  {String}  selector Selector to match against
 * @return {Boolean|Element}  Returns null if not match found
 */
var getClosest = function ( elem, selector ) {

	// Element.matches() polyfill
	if (!Element.prototype.matches) {
//alert(1111111);		
		Element.prototype.matches =
			Element.prototype.matchesSelector ||
			Element.prototype.mozMatchesSelector ||
			Element.prototype.msMatchesSelector ||
			Element.prototype.oMatchesSelector ||
			Element.prototype.webkitMatchesSelector ||
			function(s) {
				var matches = (this.document || this.ownerDocument).querySelectorAll(s),
					i = matches.length;
				while (--i >= 0 && matches.item(i) !== this) {}
				return i > -1;
			};
	}

	// Get closest match
	for ( ; elem && elem !== document; elem = elem.parentNode ) {		
		if ( elem.matches( selector ) ) return elem;
	}

	return null;

};

function get_is_parents(_now_obj,_get_obj,_range_obj) {

	if (!_now_obj) { return false; }
	var J_now_obj = jQuery(_now_obj);
	
	if (J_now_obj.is(_get_obj)) {
		if (_range_obj && J_now_obj.parents(_range_obj).length > 0) {
			return _now_obj;
		} else {
			return false;
		}
	} else {

		if (jQuery(_range_obj).length == 0) { _range_obj = jQuery('html')[0]; }
	
		var _parent = J_now_obj.parentsUntil(_range_obj,_get_obj);
		if (jQuery(_parent).parents(_range_obj).length > 0) {		
			return _parent[0];
		}
	}
	
	return false;
		
}

String.prototype.msg_format = function() {
    var formatted = this;
    for (var i = 0; i < arguments.length; i++) {
        var d = i + 1;
        var regexp = new RegExp('%'+d, 'gi');        
        formatted = formatted.replace(regexp, arguments[i]);
    }
    return formatted;
};

var Msg_check = {};
function msg_msg(_code,bb) {
	
	if (Msg[_code]) {
		if (!Msg_check[_code]) {
			Msg_check[_code] = 0;
		}
		Msg_check[_code]++;
		return Msg[_code];
	} else {
		//return '<span style="color:red">Msg없음(' + _code + ')</span>';
		return '==Msg없음(' + _code + ')==';		
	}
}

function block_sortable() {
	
editor._now = jQuery(editor._now).parents('.ui-draggable')[0];
editor.sortable.set();
	
}

function column_sortable() {
	
editor._now = jQuery(editor._now).parents(grid_obj._columns)[0];
editor.sortable.set();
	
}

function getUrlParameter(name) {
	name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
	var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
	var results = regex.exec(location.search);
	return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

var _c = 0;
function con_count() {
	_c++;
	var d = '';
	for (var i=0;i<20;i++) {
		d = d + '' + _c;
	}
	return _c;
}

function splitUnit(Dvar) { // 10px -> 10,px
	var a = Dvar.match(/^[0-9.]+/);
	var b = Dvar.match(/[A-Za-z%]+$/);
	return [a,b];
}

jQuery.union = function(a,b){return jQuery(a).add(b).get();};
jQuery.intersect = function(a,b){return jQuery.grep(a,function(i){return jQuery.inArray(i,b)>-1;});};
jQuery.complement = function(a,b){return jQuery(a).not(b).get()};
jQuery.sym_diff = function(a,b){return jQuery(arr1).add(arr2).not(jQuery.intersect(arr1,arr2)).get();};

var m9_code_editor = {

	'set' : function(_id,data) {

		var cm = jQuery('#'+_id).siblings()[0].CodeMirror;
		var doc = cm.getDoc();
		doc.markClean();

		Delay_fuc2("",300,function() {
			doc.setValue(data);
			cm.refresh();
		});

	},

	'get' : function(_id) {

		var cm = jQuery('#'+_id).siblings()[0].CodeMirror;
		var doc = cm.getDoc();
		var _html = doc.getValue();
		doc.markClean();

		return _html;

	}

};