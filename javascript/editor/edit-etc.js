var fontfamily_obj = {

	_fonts : [
		['Gulim','굴림',''],
		['Dotum','돋움',''],
		['Batang','바탕',''],
		['Gungsuh','궁서',''],
		['Arial','Arial',''],
		['Arial Black','Arial Black',''],
		['Nanum Gothic','나눔고딕','http://fonts.googleapis.com/earlyaccess/nanumgothic.css'],
		['Nanum Myeongjo','나눔명조','http://fonts.googleapis.com/earlyaccess/nanummyeongjo.css'],
		['Nanum Pen Script','나눔손글씨 팬','http://fonts.googleapis.com/earlyaccess/nanumpenscript.css'],
		['Nanum Brush Script','나눔손글씨 붓','http://fonts.googleapis.com/earlyaccess/nanumbrushscript.css'],
		['Jeju Gothic','제주고딕','http://fonts.googleapis.com/earlyaccess/jejugothic.css'],
		['Jeju Myeongjo','제주 명조','http://fonts.googleapis.com/earlyaccess/jejumyeongjo.css'],
		['Jeju Hallasan','제주 한라산','http://fonts.googleapis.com/earlyaccess/jejuhallasan.css'],
		['KoPub Batang','KoPub 바탕','http://fonts.googleapis.com/earlyaccess/kopubbatang.css'],
		['Hanna','한나','http://fonts.googleapis.com/earlyaccess/hanna.css'],
		['Abril Fatface','Abril Fatface','http://fonts.googleapis.com/css?family=Abril+Fatface'],
		['Lobster','Lobster','http://fonts.googleapis.com/css?family=Lobster'],
		['Pinyon Script','Pinyon Script','http://fonts.googleapis.com/css?family=Pinyon+Script']	
	],

	_fonts_hash : {},
	
	_fontfamily_loaded : {},
	
	int : function() {

		if (jQuery('#editWindow-fontFamily').length == 0) {
			
			var _html = '<div class="box">';
			for (var i=0;i<fontfamily_obj._fonts.length;i++) {
				var _name = fontfamily_obj._fonts[i][0].replace(/ /gi,"_");	
				_html += '<div class="btn_' + _name + ' fonts-img"><a onclick="fontfamily_obj.change(\'' + i + '\');return false;"></a></div>	';
			}
			_html += '</div>';
			
			edit_window_obj.int("editWindow-fontFamily",_html,msg_msg('font_family','a')); // '글꼴'
			
			jQuery('#editWindow-fontFamily a').on("dblclick",function() {
				jQuery('#editWindow-fontFamily').css('display','none');
			});
			
			for (var i=0;i<fontfamily_obj._fonts.length;i++) {
				var _f = fontfamily_obj._fonts[i];
				fontfamily_obj._fonts_hash[_f[1]] = _f[0];
			}
		}
		
	},


	add_style : function(Dvar) {

		var Dcss = '';
		for (var i=0;i<fontfamily_obj._fonts.length;i++) {
			var _f = fontfamily_obj._fonts[i];
			if (_f[0] == Dvar) {
				Dcss = _f[2];
				break;
			}
		}

		if (Dcss != '') {

			var _loading_check = 0;
			var _links = document.getElementsByTagName("link");

			for (var i = 0; i < _links.length; i ++ ) {
				var _src = _links[i].href.toLowerCase(); // href 값 소문자 처리
				_src = _src.replace(/\+/g, ' ').replace(/%20/g, ' '); // 공백을 하나로 처리하고, %20을 하나의 공백(' ')으로 처리
				
				if (_src.indexOf(Dvar.toLowerCase()) !=- 1) {
					_loading_check++;
				}
			}

			if (_loading_check == 0) { // 파일 로딩

//				if (jQuery('div.m9_editor_box').find('._mong9_editor_font').length == 0) {
//					jQuery('div.m9_editor_box').children().eq(0).before('<div class="_mong9_editor_font m9not _mong9_setting_box" style="border:1px solid red;padding:20px"></div>');
//				}

				jQuery('<link>').prop({'type':'text/css','rel':'stylesheet','property':'stylesheet','href':Dcss}).appendTo('div._mong9_setting_box');
				var _name = Dvar.replace(/ /gi,"_");	
				fontfamily_obj._fontfamily_loaded[_name] = Dcss;
			}
							                         			
		}

	},

	change : function(Cvar) {
		
		var Dvar = fontfamily_obj._fonts[Cvar][0];
		var Dcss = fontfamily_obj._fonts[Cvar][2];
				
		RestoreSelection();

		var _type = get_container();

		fontfamily_obj.add_style(Dvar);

		if (_type == 1) {		
			document.execCommand("fontSize",false,"7");
			jQuery(document).find("font").each(function(){
				if (jQuery(this).attr("size") == "7") {
					jQuery(this).removeAttr("size").css("fontFamily",Dvar);
				}
			});
		} else {
		 	Editor_Container.css('font-family',Dvar);
		}

		SaveSelection();

		undo_obj._add(Editor_Container[0],'font-family');		
							
	},

	get_css : function(_html) {


		for (var i in fontfamily_obj._fonts) {

/*
if (fontfamily_obj._fonts[i][2] != "") {
//alert(fontfamily_obj._fonts[i][2]);	


//fontfamily_obj._fonts[i][2] = fontfamily_obj._fonts[i][2].replace(new RegExp(":",'gi'),"\:");	
//fontfamily_obj._fonts[i][2] = fontfamily_obj._fonts[i][2].replace(new RegExp('.','gi'),"\.");	
//fontfamily_obj._fonts[i][2] = fontfamily_obj._fonts[i][2].replace(new RegExp("/",'gi'),"\/");	
//alert("YYYY======"+fontfamily_obj._fonts[i][2]);

			//var rgExp = "/google_map/gi";
				//var _match = fontfamily_obj._fonts[i][2].outerHTML.match(eval(rgExp)); // 폰트사용 체크	
							
//jQuery("'link[href=" + fontfamily_obj._fonts[i][2] + "]'").each(function() {
jQuery("'link[href=" + fontfamily_obj._fonts[i][2] + "]'").each(function() {	
alert("XXXXXXXXXXXXXXX=================="+	fontfamily_obj._fonts[i][2]);
});

}
*/
		
/*
	jQuery(_html).find("'link[href=" + fontfamily_obj._fonts[i][2] + "]'").each(function() {
		alert("XXXXXXXXXX==="+jQuery(this));	
	});
*/	
		}
	
		var _return = "";
		for (var i in fontfamily_obj._fontfamily_loaded) {
			var _name = i.replace(/\_/gi," ");
			var rgExp = "/font-family:.+"+ _name  +"/gi";
			var _match = _html.match(eval(rgExp)); // 폰트사용 체크
			if (_match != null) {
				_return += '<link href="' + fontfamily_obj._fontfamily_loaded[i] + '" type="text/css" rel="stylesheet" property="stylesheet" />\n';
			}
		} //for
		return _return;		
	}
			
}; //fontfamily_obj

var fontsize_obj = {
		
	int : function() {

		if (jQuery('#editWindow-fontSize').length == 0) {
			
			var _px = new Array(8,9,10,11,12,14,16,18,20,22,24,28,32,36,40,45,50,55,55,60,65,70,75,80,85,90,95);
	
			var _html = '<div class="box">';
			for (var i=0;i<_px.length;i++) {
				_html += '<a onclick="fontsize_obj.change(\'' + _px[i] + 'px\');return false;"><div style="font-size:' + _px[i] + 'px">' + _px[i] + '<span>px</span></div></a>';							
			}
			_html += '</div>';
			
			edit_window_obj.int("editWindow-fontSize",_html,msg_msg('font_size','a')); // '글자크기'

			jQuery('#editWindow-fontSize a').on("dblclick",function() {
				jQuery('#editWindow-fontSize').css('display','none');
			});

		}
						
	},
	
	change : function(Dvar) {
		
		RestoreSelection();

		var _type = get_container();

		if (_type == 1) {		
			document.execCommand("fontSize",false,"7");
			jQuery(document).find("font").each(function() {
				if (jQuery(this).attr("size") == "7") {
					jQuery(this).removeAttr("size").css("fontSize",Dvar);
				}
			});	
		} else {
		 	Editor_Container.css('fontSize',Dvar);
		}

		SaveSelection();

		undo_obj._add(Editor_Container[0],'font-size');		
							
	}
	
}; //fontsize_obj

var formatpara_obj = {
		
	int : function() {

		if (jQuery('#editWindow-formatPara').length == 0) {
			
			var _kinds = new Array(
				['H1','제목글(H1)'],
				['H2','제목글(H2)'],
				['H3','제목글(H3)'],
				['H4','제목글(H4)'],
				['H5','제목글(H5)'],
				['P','본문(P)'],
				['DIV','박스(DIV)'],			
				['SPAN','텍스트(span)'],							
				['BLOCKQUOTE','인용문(blockquote)']																			
			);
				
			_html = '<div class="box">';
			for (var i=0;i<_kinds.length;i++) {
				_html += '<div><a onclick="formatpara_obj.change(\'' + _kinds[i][0] + '\');return false;"><' + _kinds[i][0] + '>' + _kinds[i][1] + '</' + _kinds[i][0] + '></a></div>';			
			}
			_html += '</div>';
	
			edit_window_obj.int("editWindow-formatPara",_html,msg_msg('set_type','a'));

			jQuery('#editWindow-formatPara a').on("dblclick",function() {
				jQuery('#editWindow-formatPara').css('display','none');
			});
						
		}

	},
		
	change : function(Dvar) {

		if (jQuery(editor._now).is('table,thead,tbody,tfoot,th,td,ol,ul,li,dl,dt,dd,iframe')) {
			error_msg(msg_msg('msg_27','a')); // "현재 항목은 타입변경이 불가능합니다."
			return false;	
		}

		editor._now = changeTag(editor._now,Dvar);		
		undo_obj._add(editor._now,'formatpara');

		var msg = Dvar;
		var _str = msg_msg('msg_28','a').msg_format(msg); // "[" + msg + "]형으로 변경완료"	
		error_msg(_str);
//		error_msg(msg_msg('msg_52','a')); // "순서변경이 불가능한 요소(태그)입니다!"


/*		
		var _type = get_container();

		var _tag = jQuery(editor._now).prop('tagName').toLowerCase();
		var random_class = '__this_is__random_class__' + Math.round(Math.random()*100000);
		jQuery(editor._now).addClass(random_class);
		
		var _html = editor._now.outerHTML;
		_html = _html.replace(new RegExp('<'+_tag,'gi'),'<'+Dvar.toLowerCase()).replace(new RegExp('</'+_tag,'gi'),'</'+Dvar.toLowerCase());        
		jQuery(editor._now).replaceWith(function(){ return _html; });
		editor._now = jQuery('.' + random_class)[0];
		jQuery('.' + random_class).removeClass(random_class);

console.log(editor._now.outerHTML);
		undo_obj._add(editor._now,'formatpara');		
*/
			
	}
	
}; //formatpara_obj



// 기타변경
var edit_etc_obj = {

	'indent' : function(obj) {
		jQuery(obj).wrap('<blockquote style="margin: 0 0 0 40px;border:none;padding:0px;"></blockquote>');		
	},
	'outdent' : function(obj) {

		jQuery(obj).each(function() {
			
			var J_this = jQuery(this);
			
			if (J_this.parent().is('blockquote')) {
				var random_class = '__this_is__random_class__' + Math.round(Math.random()*100000);
				J_this.addClass(random_class);			
				J_this.parent()[0].outerHTML = J_this.parent().html();
				//editor._now = jQuery('.' + random_class)[0];
				jQuery('.' + random_class).removeClass(random_class);			
			}
		});
		
	},
	'align' : function(obj,_align) {
			jQuery(obj).css('textAlign',_align);		
	},
	'removeformat' : function(obj) {

		var _type = get_container();
		document.execCommand("removeFormat",false,null);
						
		if (_type != 1) {		
	 		Editor_Container.css({'color':'','font-size':'',"font-family":'','line-height':'','word-spacing':'','letter-spacing':'','font-weight':'','text-decoration':'','font-style':''});			
		}
				
	},


	'class_name' : function(Did,Dvar) {
		fontsize_obj.change("");
		get_container();
		element_obj._now = Editor_Container[0];			
		element_obj.edit.class2.change(Did,Dvar);	
	},
	
	
		
	'class_name22' : function(Dvar) {
		fontsize_obj.change("");
		get_container();
		element_obj._now = Editor_Container[0];		
		element_obj.edit.font.class_Name(Dvar);			
	},
	'class_name2' : function(Dvar) {
		fontsize_obj.change("");
		get_container();
		element_obj._now = Editor_Container[0];		
		element_obj.edit.font.class_Name2(Dvar);			
	}	
}; //edit_etc_obj

// ctrl + v 할때 필요없는 요소 제거
function cleanHTML(input){

	var stringStripper =/(\n|\r|class=(")?Mso[a-zA-Z]+(")?)/g; // 리턴값 제거 & class="Mso~.. 로시작하는 class제거
	var output=input.replace(stringStripper,' ');
	var commentSripper=new RegExp('<!--(.*?)-->','g'); // 주석구문 제거
	var output=output.replace(commentSripper,'');
	//var tagStripper=new RegExp('<(/) * ( meta | link | span |\\? xml :| st1 :| o :| font)(. *? ) > ','gi');
	var tagStripper=new RegExp('<(/)*(meta|link|span|\\?xml:|st1:|o:|font)(.*?)>','gi');  // 각종태크 제거
	output=output.replace(tagStripper,'');

	// <script>..</script> 형식들 제거
	var badTags=['style','script','applet','embed','noframes','noscript'];
	for(var i=0;i<badTags.length;i++){
		tagStripper=new RegExp('<'+badTags[i]+'.*?'+badTags[i]+'(.*?)>','gi');
		output=output.replace(tagStripper,' ');
	}
	// style 제거 start????
	var badAttributes=['style','start'];
	for(var i=0;i<badAttributes.length;i++){
		var attributeStripper=new RegExp(' '+badAttributes[i]+'="(.*?)"','gi');
		output=output.replace(attributeStripper,'');
	}
		  
	return output;
} //cleanHTML

var confirm_msg = {

	_Dfunc : null,
	
	int : function() {

		if (jQuery("#confirm-msg").length == 0) {
			var _html = '<div id="confirm-msg" class="html-win confirm-msg-box">' +
			'<div id="_confirm-msg"></div>' +
			'<button onclick="confirm_msg.change(1)" class="editor-btn-yes confirm-msg-btn">OK</button> <button onclick="confirm_msg.change(0)" class="editor-btn-no confirm-msg-btn">NO</button>' +
			'</div>';
			jQuery("body").append(_html);
		}		
	},	

	'view' : function(msg,Dfunc) {
		confirm_msg._Dfunc = Dfunc;				
		jQuery('#_confirm-msg').html(msg);
		curtain.show("confirm-msg");
	},

	'change' : function(Dvar) {
		curtain.hide();
		jQuery('#_confirm-msg').html("");
		eval(confirm_msg._Dfunc +"(" + Dvar + ")");
		confirm_msg._Dfunc = null;				
	}
					
};
jQuery(function() {
	confirm_msg.int();
});

var curtain = {
	
	_now : null,
	
	int : function() {
		if (jQuery("#curtain").length == 0) {
			jQuery("body").append('<div id="curtain"></div>');
			jQuery("#curtain").click(function (e){
				curtain.hide();
			});
		}		
	},

	show : function(Dbox,Doptions) {
		
		if (!getObject(Dbox)) { return false; }
		curtain._now = Dbox;
						
		if (jQuery("#curtain").length == 0) { curtain.int(); }

		//jQuery("#curtain").stop(true, true).fadeIn(100);	
		obj_fadeIn('#curtain',100);
			
		if (Doptions) {
			jQuery("#"+Dbox).css(Doptions);
		} else {
			var _w = get_object_size("curtain","width");
			var _h = get_object_size("curtain","height");		
			var _w2 = get_object_size(Dbox,"width");
			var _h2 = get_object_size(Dbox,"height");	
			var pos = get_xy_pos(_w,_h,_w2,_h2,0,0,5,0);					
			jQuery("#"+Dbox).css({left:pos[0],top:pos[1]});
		}
		jQuery("#"+Dbox).fadeIn(400);		
		//RestoreSelection();	
	},

	hide : function() {
		if (jQuery("#curtain").length == 0) { curtain.int(); }
      	obj_fadeOut('#curtain',100);						
		obj_fadeOut("#"+curtain._now,400);
		var Cstr = curtain._now.match(/([^-])+$/g); 		
		curtain._now = null;
		//RestoreSelection(); // 이미지 배경 ok클릭시 에러남 img_obj.handle2.fixed();
	}
}; //curtain

var class_func = {
	
	change_by_number : function(obj,s) {

		var a = s.split('-');
		var n = a.pop();
		var fc = a.join("-") + "-";
		var as = new RegExp(''+fc+'\\\d+','gi');
		var _class = jQuery(obj).attr('class');		
		var bc = _class.match(as);

		if (bc) {
			jQuery(obj).removeClass(bc[0]);
		}
		jQuery(obj).addClass(s);
			
	}	
	
};
