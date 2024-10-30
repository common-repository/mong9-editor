// ver 1.4 //

var Onload_Function = new Array();
var Resize_Function = new Array();

var evt; // 이벤트
var ie_var = 0; // ie 버전

_SET["mobile_ok"] = getCookie("mobile_ok");
_SET["navigator"] = ""; // 브라우져

var MOUSE_EVENT; // 마우스 포인트
var MOUSE_EVENT_x;
var MOUSE_EVENT_y;

function m_e(e) { // 파이어폭스 때문	
	MOUSE_EVENT = e;
	if (_SET["navigator"] == "firefox") {
		MOUSE_EVENT_x = MOUSE_EVENT.pageX;
		MOUSE_EVENT_y = MOUSE_EVENT.pageY;
	} else {
		MOUSE_EVENT_x = event.clientX + _get_body_obj().scrollLeft;
		MOUSE_EVENT_y = event.clientY + _get_body_obj().scrollTop;   
	}
} // function 	

var _Import_class2 = {

	_Loaded_Js : {}, // 로딩된 JS 목록
	_Importing_Js : {}, // 불러오기 중인 JS
	_Importing_now : {},

	// JS파일(Dfile)이 존재하는지 체크		
	match_n_get_js : function(Dfile) {

		var scripts = document.getElementsByTagName("link");

		var z = 0; 
		for (var i=0;i<scripts.length;i++) { 
			var src = scripts[i].getAttribute("href"); 
			if (src) { 		
				this._Loaded_Js[src] = 1;
				if (src.indexOf(Dfile.substring(Dfile.lastIndexOf("/") + 1)) != -1) {
					z++;
				}
			} 
		}
		return z;
		
	},

	// JS로딩 후, 실행할 함수 저장하고 실행버튼(가상)
	ready_doing : function(Dfile,Dfunc) {

		if (typeof(Dfunc) == "function") {    
			if (!this._Importing_Js[Dfile]) {
				this._Importing_Js[Dfile] = new Array();
			}
			this._Importing_Js[Dfile].push(Dfunc);			
    		this.excute_switch(Dfile);
		}
	
	},

	_import_timer : {},

	/// 동시에 같은 파일이 로딩시 한번만 로딩하기 위한 스위치개념
	// 마지막 스위치값만 실행
	excute_switch : function(Dfile) {
		clearTimeout(this._import_timer[Dfile]);
		this._import_timer[Dfile] = setTimeout(function() { _Import_class2.excute_func(Dfile); },300);	
	},

	// 로딩후, 실행
	excute_func : function(_file) {

		Delay_fuc2("",200,function() {				
			_Import_class2._Loaded_Js[_file] = 1; // 파일로딩 확인
			if (!_Import_class2._Importing_Js[_file]) { return false; }
			for (var i=0;i<_Import_class2._Importing_Js[_file].length;i++) {
				_Import_class2._Importing_Js[_file][i]();
			}
			delete _Import_class2._Importing_Js[_file];
			delete _Import_class2._Importing_now[_file];
		});
		
	}		
	
};

function ImportScript2(Dfile,Dfunc) {
	
	//Dfile = Dfile.replace(new RegExp(_SET["data_polder"]+"/javascript",'gi'),"http://javascript.mong9.com/3.1");				

	var _Dfunc_type = (typeof(Dfunc) == "function") ? 1 : 0;
	var IC = _Import_class2;
	
	if (!IC._Loaded_Js[Dfile]) {

		if (IC._Importing_now[Dfile]) {
			IC.ready_doing(Dfile,Dfunc);
		} else {
			
			var matching = IC.match_n_get_js(Dfile);
	
			if (matching == 0) {

				IC._Importing_now[Dfile] = 1;

				jQuery.getStylesheet(Dfile).done(function(script,textStatus) {
					IC.ready_doing(Dfile,Dfunc);
				}).fail(function(jqxhr,settings,exception) {
					if (_Dfunc_type) {    
		    			alert('Loading Error : ' + Dfile);
		    		}
				});
								
			} else {
				IC.ready_doing(Dfile,Dfunc);
			}

		}
			
	} else {
		if (_Dfunc_type) {
			Dfunc();
		}		
	}
	
} // function

// 자바스크립트 파일 불러오기
var _Import_class = {

	_Loaded_Js : {}, // 로딩된 JS 목록
	_Importing_Js : {}, // 불러오기 중인 JS
	_Importing_now : {},

	// JS파일(Dfile)이 존재하는지 체크		
	match_n_get_js : function(Dfile) {

		var scripts = document.getElementsByTagName("script");
		
		var z = 0; 
		for (var i=0;i<scripts.length;i++) { 
			var src = scripts[i].getAttribute("src"); 
			if (src) { 		
				this._Loaded_Js[src] = 1;
				if (src.indexOf(Dfile.substring(Dfile.lastIndexOf("/") + 1)) != -1) {
					z++;
				}
			} 
		}
		return z;
		
	},

	// JS로딩 후, 실행할 함수 저장하고 실행버튼(가상)
	ready_doing : function(Dfile,Dfunc) {

		if (typeof(Dfunc) == "function") {    
			if (!this._Importing_Js[Dfile]) {
				this._Importing_Js[Dfile] = new Array();
			}
			this._Importing_Js[Dfile].push(Dfunc);			
    		this.excute_switch(Dfile);
		}
	
	},

	_import_timer : {},

	/// 동시에 같은 파일이 로딩시 한번만 로딩하기 위한 스위치개념
	// 마지막 스위치값만 실행
	excute_switch : function(Dfile) {
		clearTimeout(this._import_timer[Dfile]);
		this._import_timer[Dfile] = setTimeout(function() { _Import_class.excute_func(Dfile); },300);	
	},

	// 로딩후, 실행
	excute_func : function(_file) {
	
		Delay_fuc2("",200,function() {					
			_Import_class._Loaded_Js[_file] = 1; // 파일로딩 확인
			if (!_Import_class._Importing_Js[_file]) { return false; }
			for (var i=0;i<_Import_class._Importing_Js[_file].length;i++) {
				_Import_class._Importing_Js[_file][i]();
			}
			delete _Import_class._Importing_Js[_file];
			delete _Import_class._Importing_now[_file];
		});
		
	}	

};

function ImportScript(Dfile,Dfunc) {
	
	var _Dfunc_type = (typeof(Dfunc) == "function") ? 1 : 0;
	var IC = _Import_class;
	
	if (!IC._Loaded_Js[Dfile]) {

		if (IC._Importing_now[Dfile]) {
			IC.ready_doing(Dfile,Dfunc);
		} else {
			
			var matching = IC.match_n_get_js(Dfile);
	
			if (matching == 0) {

				IC._Importing_now[Dfile] = 1;
			
				jQuery.getScript(Dfile).done(function(script,textStatus) {
					IC.ready_doing(Dfile,Dfunc);
				}).fail(function(jqxhr,settings,exception) {
					if (_Dfunc_type) {    
		    			alert('Loading Error : ' + Dfile);
		    		}
				});
				
			} else {
				IC.ready_doing(Dfile,Dfunc);
			}

		}
			
	} else {
		if (_Dfunc_type) {
			Dfunc();
		}		
	}
	
} // function

function set_navigator() {

    var agent = navigator.userAgent.toLowerCase(),
        name = navigator.appName,
        browser;

	_SET["navigatorVersion"] = '';

    // MS 계열 브라우저를 구분하기 위함.
    if(name === 'Microsoft Internet Explorer' || agent.indexOf('trident') > -1 || agent.indexOf('edge/') > -1) {
        browser = 'ie';
        if(name === 'Microsoft Internet Explorer') { // IE old version (IE 10 or Lower)
            agent = /msie ([0-9]{1,}[\.0-9]{0,})/.exec(agent);
            //browser += parseInt(agent[1]);
			_SET["navigatorVersion"] = parseInt(agent[1]);
        } else { // IE 11+
            if(agent.indexOf('trident') > -1) { // IE 11 
                //browser += 11;
				_SET["navigatorVersion"] = 11;
            } else if(agent.indexOf('edge/') > -1) { // Edge
                //browser = 'edge';
				_SET["navigatorVersion"] = 11;
            }
        }
    } else if(agent.indexOf('safari') > -1) { // Chrome or Safari
        if(agent.indexOf('opr') > -1) { // Opera
            browser = 'opera';
        } else if(agent.indexOf('chrome') > -1) { // Chrome
            browser = 'chrome';
        } else { // Safari
            browser = 'safari';
        }
    } else if(agent.indexOf('firefox') > -1) { // Firefox
        browser = 'firefox';
    }

	_SET["navigator"] = browser;
	if (_SET["navigatorVersion"] != '') {
		ie_var = _SET["navigatorVersion"];
	}
	if (ie_var == 0) { ie_var = 100; } 

} // function

set_navigator();
		
function getObject(objectId) { 
// checkW3C DOM, then MSIE 4, then NN 4. 
 if(document.getElementById && document.getElementById(objectId)) { 
  return document.getElementById(objectId); 
 // ie8에서 에러남
 //} else if (document.all && document.all(objectId)) { 
  //return document.all(objectId); 
 } else if (document.layers && document.layers[objectId]) { 
  return document.layers[objectId]; 
 } else { 
  return false; 
 } 
} // function 

function _get_object(Did) {
	return (typeof(Did) == "object") ? Did : getObject(Did);
} // function

// 브라우져에 맞게 body 오브젝트 가져오기
function _get_body_obj() {
	var obj = "";	
	if ( _SET["navigator"] == "safari") { 	
		obj = document.body;
	}else if (_SET["navigator"] == "ie") {	
		obj = ietruebody();
	} else {
		obj = document.documentElement;
	}
	return obj;
} // function

// 익스플로러 버전에 상관 없이 사용하기
function ietruebody() { 
	if (document.documentElement && document.documentElement.scrollTop) { // ie6 Strict 
		return document.documentElement; 
	} else if(document.documentElement && document.documentElement.clientHeight) { // ie6 Strict 
		return document.documentElement; 
	} else if (document.body) { // ie < ie 6 
		return document.body; 
	}
} // function

// 현재 브라우져 내용부분 사이즈 리턴
function get_window_size() {
	var _w = 0;
	var _h = 0;
	var _w_page = 0;
	var _h_page = 0; 
	if (window.innerHeight) {
		var scroll_obj = _get_body_obj(); 	
		var s_w = window.innerWidth - scroll_obj.clientWidth; // 스크롤 크기
		_w = window.innerWidth - s_w;
		_h = window.innerHeight;// - s_w; 하위 스크롤 적용 안됨
	} else {
		// ie
		if (document.documentElement.clientHeight) {
			// 스크롤 값을 제외한 값
			_w = document.documentElement.clientWidth;
			_h = document.documentElement.clientHeight; 	
		}
	}
	return [_w,_h];
} // function

/******************************
*  기능 :  입력값 변경후 폼 submit *
*  수정일 : 2008-12-28  *
*  parameter : form name,각종해쉬{'action':'aaa','bbb':'ccc'} *
*******************************/
function Form_Submit(form_name,values_hash){
	Dform = getObject(form_name);
	for(var i in values_hash) {
		Dform.elements[i].value = values_hash[i];
	}
	Dform.submit();
} // function

/******************************
*  기능 :  스타일시트 명(name) 변경 *
*  수정일 : 2008-04-29  *
*  parameter : id,css name(스타일명) *
*******************************/
function css_change(Did,Dclass_name) {
	var Cid = _get_object(Did);
	Cid.className = Dclass_name;
} // function

function ccs_change_by_class(Did,Doptions) {
	
	var Cid = _get_object(Did);
	if (!Cid) { return false; }

	var Eid = _get_object(Doptions["target"]); 
	var Ckind = jQuery(Eid).css(Doptions["kind"]);

	if (Doptions[Ckind]) {
		jQuery(Cid).css(Ckind,Doptions[Ckind]);
	}

} // function

/******************************
*  기능 :  입력폼 활성/비활성화 변경 *
*  수정일 : 2008-04-29  *
*  parameter : id,value(0 혹은 1) *
* value값이 1이면 활성화, 0이면 비활성화 *
*******************************/
function disabled_change(Did,Dvalue) {
	var Cdisable = (Dvalue == 1) ? true : false;
	getObject(Did).disabled = Cdisable;
} // function

function display_change(Dview,Dhidden) {
	var Cobj = Dview.split(",");	
	for(var i=0;i<Cobj.length;i++) { jQuery(Cobj[i]).css("display",""); }

	var Cobj = Dhidden.split(",");	
	for(var i=0;i<Cobj.length;i++) { jQuery(Cobj[i]).css("display","none"); } 
} // function

//*****************************************//
// 쿠키 저장
//*****************************************//
function setCookie(name,value,expires) {
	document.cookie = name + "=" + escape(value) + ((expires == null || expires == "") ? "" : (" ; expires=" + expires.toGMTString()));
} // function

//*****************************************//
// 쿠키 얻어오기
//*****************************************//
function getCookie(name) {
	var arg = name + "=";
	var alen = arg.length;
	var clen = document.cookie.length;
	var i = 0;
	while (i< clen) {
		var j = i + alen;
		if (document.cookie.substring(i,j) == arg) {
			var end = document.cookie.indexOf(";",j);
			if (end == -1) end = document.cookie.length;
			return unescape(document.cookie.substring(j,end));
		}
		i = document.cookie.indexOf(" ",i) + 1;
		if (i == 0) break;
	}
	return null;
} // function

function check_num(Dnum) {
	var re = RegExp("^[0-9]+$","gi");
	if (re.test(Dnum)) {
		return true;
	}
	return false;		
} // function

function _get_num(Dstr) {
	Dstr = Dstr +"a";
	var rgExp = /[-\d\.]+/;
	var Cstr = Dstr.match(rgExp);
	if (Cstr == null) { Cstr = ""; }
	return Cstr * 1;
} // function

function _get_str(Dstr) {
	var rgExp = /[^\d\.]+/g;
	var Cstr = Dstr.match(rgExp); 
	if (Cstr == null) { Cstr = ""; } 
	return Cstr;
} // function

function href_go(Durl) {
	window.location.href = Durl;
} // function

function Change_Style(Did,Dstyle,Dvalue) {
	getObject(Did).style[Dstyle] = Dvalue;
} // function

function Change_Css(Did,DcssName) {
	getObject(Did).className = DcssName;
} // function

function set_select_value(Did,Dvalue) {
	var Cid = _get_object(Did);
	jQuery(Cid).children().each(function(i) {
		if (jQuery(this).val() == Dvalue) {
			jQuery(Cid).prop('selectedIndex',i); 	
		}
	});
} // function

function set_select_index(Did,Dindex) {
	var Cid = _get_object(Did);
	jQuery(Cid).prop('selectedIndex',Dindex);
} // function

function get_radio_index(Cid) {

	var Did = document.getElementsByName(Cid);
	if (!Did) { return false; }

	for (var i=0; i<Did.length;i++) {
		if (Did[i].checked == true) { return i; } 		
	}

	return false;

} // function

function get_radio_value(Cid) {
	var Dindex = get_radio_index(Cid);
	var re = RegExp("^[0-9]+$","gi"); 
	if (!re.test(Dindex)) { return ""; }
	var Did = document.getElementsByName(Cid)[Dindex].value;
	return Did;
} // function

function set_radio_index(Cid,Cnum) {
	var Did = document.getElementsByName(Cid);
	if (!Did) { return false; }
	Did[Cnum].checked = true;
} // function

function get_checked(Cid) {
	var Did = document.getElementsByName(Cid);
	if (!Did) { return false; }
	return Did[0].checked; 	
} // function
	
/******************************************************************
/* 필요없는 인수 삭제
******************************************************************/
function Form_Elements_Disable() {
	var Paging_Form = document.forms[Paging_Form_Name];	
	for (var i=0;i<Paging_Form.length;i++) {
		var Did = Paging_Form.elements[i];
		if (Did.value == "" || Did.value == undefined) { Did.disabled = true; }
	}  
} // function

function get_pixelLeft(Did) {
	var Cid = _get_object(Did); 
	return _get_num(jQuery(Cid).css("left"));
} // function

function get_pixelTop(Did) {
	var Cid = _get_object(Did);
	return _get_num(jQuery(Cid).css("top"));
} // function

function change_pixelLeft(Did,Dvalue) {
	var Cid = _get_object(Did); 
	jQuery(Cid).css("left",Dvalue);
} // function

function change_pixelTop(Did,Dvalue) {
	var Cid = _get_object(Did);	
	jQuery(Cid).css("top",Dvalue);
} // function

function getRealOffsetTop(Did) {
	return jQuery(_get_object(Did)).offset().top; 
} // function

function getRealOffsetLeft(Did) {
	return jQuery(_get_object(Did)).offset().left;
} // function

// a 총길이, b 나의 위치(중간점),c 중간점에 붙을 넓이
function _get_center_pos(a,b,c,d,e) {

	var vars = 0;

	if ((a - b) < (c/2)) {
		vars = a - c; 
	} else if (b < (c/2)) {
		vars = 0;
	} else {
		vars = b - (c/2);
	}

	return vars;

} // function

/*
			1		2		3
------------------------------------------
	 |	1		2		3	|
	 |						|
	4|	4		5		6	|6
	 |						|
	 |	7		8		9	|
------------------------------------------
			7		8		9
		
Aw:범위 넓이
Ah:범위 높이
Bw:객체 넓이
Bh:객체 높이
Xdistance:x거리(0)
Ydistance:y거리(0)
Dpos : 위치(1..9)
Epos : [0,1] (0:안에 위치,1:바깥에 위치)
*/
function get_xy_pos(Aw,Ah,Bw,Bh,Xdistance,Ydistance,Dpos,Epos) {

	if (!Xdistance) { Xdistance = 0; }
	if (!Ydistance) { Ydistance = 0; }
	if (!Dpos) { Dpos = 1; }
	if (!Epos) { Epos = 0; }

	var Cw,Ch = 0;

	if (Dpos == 3 || Dpos == 9) {
		Cw = Aw - (Bw + Xdistance);
	} else if (Dpos == 6) {
		Cw = (Epos == 0) ? Aw - (Bw + Xdistance) : Aw + Xdistance; 
	} else if (Dpos == 2 || Dpos == 5 || Dpos == 8) {
		Cw = (Aw - Bw) / 2;
	} else if (Dpos == 1 || Dpos == 7) {
		Cw = Xdistance;
	} else if (Dpos == 4) {
		Cw = (Epos == 0) ? Xdistance : -(Bw + Xdistance); 	
	} 
 
	if (Dpos == 4 || Dpos == 5 || Dpos == 6) {
		Ch = (Ah - Bh) / 2;
	} else if (Dpos == 7 || Dpos == 8 || Dpos == 9) {	
		Ch = (Epos == 0) ? Ah - (Bh + Ydistance) : (Ah + Ydistance);
	} else {
		Ch = (Epos == 0) ? Ydistance : -(Bh + Ydistance);  
	}

	return [Cw,Ch];

} // function

var width_columns = new Array("left","right","marginLeft","marginRight");
var height_columns = new Array("top","bottom","marginTop","marginBottom");

function get_wapper_size(Did,Dkind) {

	var Cid = _get_object(Did);	

	var real_display = Cid.style.display;

	if (Cid.tagName == "DIV") {
		Cid.style.display="block"; // div 값 위해
	}

	var Dsize = 0;
	var Dsize = get_object_size(Did,Dkind) * 1;
 
	if (Dkind == "width") {
		for (var i=0;i<width_columns.length;i++) {
			Dsize += _get_num(jQuery(Cid).css(width_columns[i]));
		}		
	} else {
		for (var i=0;i<height_columns.length;i++) {
			Dsize += _get_num(jQuery(Cid).css(height_columns[i]));
		}
	}

	Cid.style.display=real_display; 
	return Dsize;

} // function

var width_columns2 = new Array("paddingLeft","paddingRight","borderLeftWidth","borderRightWidth","marginLeft","marginRight");
var height_columns2 = new Array("paddingTop","paddingBottom","borderTopWidth","borderBottomWidth","marginTop","marginBottom");

function get_object_size(Did,Dkind) {

	var Cid = _get_object(Did);	

	var box_sizing = jQuery(Cid).css("box-sizing");

	var Dsize = 0; 
	if (Dkind == "width") {
		Dsize += _get_num(jQuery(Cid).css("width")); 	
		if (box_sizing != "border-box") {
			for (var i=0;i<width_columns2.length;i++) {
				Dsize += _get_num(jQuery(Cid).css(width_columns2[i]));
			}
		}
	} else {
		Dsize += _get_num(jQuery(Cid).css("height"));  	  
		for (var i=0;i<height_columns2.length;i++) {
			Dsize += _get_num(jQuery(Cid).css(height_columns2[i]));
		}
	}

	return Dsize;

} // function

function get_object_size2(Did,Dkind) {

	var Cid = _get_object(Did);	

	var Dsize = 0; 
	if (Dkind == "width") {
		Dsize = Cid.offsetWidth; 	
	} else {
		Dsize = Cid.offsetHeight; 	 	 	
	}
	return Dsize;

} // function

///////////////////////////////////////////////////////////////////////////////////////
var _setTime_obj = {};
function _SetTime_func(Dfunc,Dtime,Ddd) {
	if (!Dtime) { Dtime = 1000; }
	var t = window.setInterval(Dfunc,Dtime);
} // function

function _ClearTime_func(Did) {
	clearInterval(Did);	
} // function
/*
/////////////////////////////////////////////////////
	delay(연기) 주기 함수
	인수 : 구분자,함수,초
		구분자=> 중복방지를 위한 고유의 값
/////////////////////////////////////////////////////		
*/
var _delay_obj = {};
var _delay;   
function Delay_fuc(Dname,Dfunc,Ddelay) {

	if (!_delay_obj[Dname]) { // 무조건 한번 돌리기 위해
 	
		if (!Ddelay) { Ddelay = 1000; }
		_delay_obj[Dname] = {};
		_delay_obj[Dname]["func"] = Dfunc;
		_delay_obj[Dname]["delay"] = window.setInterval("Delay_fuc('" + Dname + "')",Ddelay);  
 
	} else {
 	
		if (_delay_obj[Dname]["delay"] && Dfunc) { return false; }
		clearInterval(_delay_obj[Dname]["delay"]);
		eval(_delay_obj[Dname]["func"]);
		delete _delay_obj[Dname];
  
	}
 
} // function

var _delay_empty_no = 0;
function Delay_fuc2(Dname,Ddelay,Dfunc) {

	if (Dname == "" || Dname == undefined) {
		_delay_empty_no++;
		Dname = "_Delay_" + _delay_empty_no;
	}

	if (!_delay_obj[Dname]) { // 무조건 한번 돌리기 위해
 	
		if (!Ddelay) { Ddelay = 1000; }
		_delay_obj[Dname] = {};
		_delay_obj[Dname]["func"] = Dfunc;
		_delay_obj[Dname]["delay"] = window.setInterval("Delay_fuc2('" + Dname + "')",Ddelay);  
    
	} else {
 	
		if (_delay_obj[Dname]["delay"] && Dfunc) { return false; }
		clearInterval(_delay_obj[Dname]["delay"]);
		_delay_obj[Dname]["func"]();
		delete _delay_obj[Dname];
  
	}

} // function

function delay_checking(Dfunc,Dfunc2) {
	if (Dfunc() == true) {
		Dfunc2();	
	} else {
		setTimeout(function(){
			delay_checking(Dfunc,Dfunc2);
		},200);		
	}
} // function

var _random_id_count = 0;
function random_id(Did) {

	var Cid = _get_object(Did);	
	var _id = Cid.getAttribute("id");
	if (_id) {
		return _id;
	} else {
		_random_id_count++; 	
		_id = "_m9random_" + _random_id_count;
		Cid.setAttribute("id",_id);     
		return _id;
	}
} // function

function radio_keydown_check(Dobject) {
	if (_SET["presskey"] == 49) {
		Dobject.checked = true;
	}	
} // function

var _ie_ok = (_SET["navigator"] == "ie" && ie_var < 7) ? 1 : 0; 
  
var _animate_document_count = 0;
function animate_document(Did) {

	if (!Did) { Did = "body_id"; }

	var Cid = _get_object(Did); 

	var Ctarget = (!Cid) ? "body" : Cid;
				
	var _obj = jQuery(Ctarget).find("[ani_type]");		

	if (Cid) { _obj.push(Ctarget); }

	var base_font_color = jQuery("body").css("color");

	for (var i=0;i<_obj.length;i++) { 

		var _tagName = _obj[i].tagName;

		if (jQuery(_obj[i]).parents('.m9not').length > 0) { continue; }
		
		// ani_type 처리 
		var ani = _obj[i].getAttribute("ani_type");
		if (ani) {
			var _anis = ani.split(";");
			for (var m=0;m<_anis.length;m++) {
				var _ani = _anis[m];
				var prop = get_property(_ani);
				M9ANI.reset(_obj[i],prop);
			}
		} // ani
		
	} //for
	
	_animate_document_count++;

} // function

/////////////////////////////////////////////////////////////////////////////////////////////////////////
function ajax_load_contents(Durl,Did,Dsettings,Dcallback) {

	var evt_obj = get_evt_obj(evt); // 이벤트 변경전 캐치
 
	var Cid = _get_object(Did);		
	if (!Cid) { return false; }

	if (typeof(Dsettings) != "object") { Dsettings = {}; }

	if (!Dsettings["type"]) { Dsettings["type"] = "GET"; }
 	 
	if (!Dsettings["put_kind"]) {
		var _kind = (get_file_kind(Durl))[1];
		Dsettings["put_kind"] = (_kind == "txt") ? "text" : "html";
	} 
   
	if (!Cid["_data"]) { Cid["_data"] = {}; }

	if (Cid["_data"]["load"] == "error") { Cid["_data"]["load"] = undefined; }
	if (Cid["_data"]["load"]) {
		if (Dsettings["whenever"] != true) {
			if (typeof(Dcallback) == "function") { Dcallback(); } // 콜백함수 실행
			return false;
		} else {
			Cid["_data"]["load"] = undefined;
		}
	}

	// 기본한글체크 : /^[가-힣]*$/
	// UTF-8 전용한글체크 : /^[\uac00-\ud7a3]*$/
	if (Durl.match( /\?/)) {
 	
		var _f = Durl.split("?");
		var _m = _f[1].split("&");
  
		var re_url = "";
		for(var i=0;i<_m.length;i++) {
			var _h = _m[i].split("=");
			if (_h[1].match( /[가-힣]/)) { _h[1] = encodeURIComponent(_h[1]); }
			if (re_url != "") { re_url +="&"; }
			re_url += _h[0]+"="+_h[1];
		}
		Durl = _f[0] + "?" + re_url; 
	}

	var request = jQuery.ajax({
		type : Dsettings["type"],
		url : Durl,
		/* async : true , */
		  
		beforeSend: function ( xhr ) {

			Delay_fuc2("",10,function() { //ajax_loading
				if (!Cid["_data"]["load"]) {		
					if (evt_obj) { //이벤트가 존재할 때만 실행
						layer_position("ajax_loading",evt_obj);  
						layer_view_only("ajax_loading",{opacity:100,speed:'fast'});
					}
					_layer_event_obj = undefined;
					_before_layer = undefined;				
				}
			});

		} 

	});

	function _error_msg(Ddata) {

		Cid["_data"]["load"] = "error"; 	
		jQuery("#ajax_loading").css("display","none");
		jQuery("#ajax_error_contents").text("Loading Error : " + Ddata);
		layer_position("ajax_error_view",evt_obj);
		layer_view_only("ajax_error_view",{opacity:100,speed:'slow'},function(){ 
			Delay_fuc2("ajax_error",2000,function(){
				layer_view_only_close("ajax_error_view");
			});
		});
	  
	} // function
   
	// 파일 가져오기 시작
	request.done(function( msg ) {});

	// 파일 가져오기 실패했을 경우
	// jqXHR : ActiveXObject(ie) 혹은 XMLHttpRequest(other)
	// textStatus : HTTP error(timeout,error,abort,parsererror)
	// errorThrown : HTTP status(Not Found,Internal Server Error ..)
	request.fail(function(jqXHR,textStatus,errorThrown) {
		_error_msg(errorThrown);
	});

	// 파일 가져오기 성공했을 경우  
	request.success(function(data,textStatus,jqXHR) {

		if (data.indexOf('error|') != -1) {
			var dd = data.split("|");
			_error_msg(dd[1]);
			return false;
		}

		if (Dsettings["get_id"]) { // 추출하기
			var _name = "#" + Dsettings["get_id"];
			data = jQuery(data).find(_name);
		}

		if (Cid["_data"]["_son"]) { Cid = _get_object(Cid["_data"]["_son"]); } // 아들 존재하면 아들에게 붙임

		if (Dsettings["put_kind"] == "html") { jQuery(Cid).html(data); } else { jQuery(Cid).text(data); }	// 삽입
				
		Delay_fuc2("",10, // 다른함수와 연동위한 설정
			function() {
				Cid["_data"]["load"] = (Dsettings["whenever"] != true) ? Durl : undefined;	// 중복방지  
				jQuery("#ajax_loading").css("display","none");  
				animate_document(Cid);
				if (typeof(Dcallback) == "function") { Dcallback(data); }  // 콜백함수 실행	
		});

	});

} // function

function get_file_kind(url) {
	var _f = (url.split("?"))[0].split("/");
	var FileName = _f[_f.length-1];
	var finfo = FileName.split(".");
	return finfo;
} // function

function alert_(Dobj) {
	var msg = "";
	if (typeof(Dobj) == "object") {	
		for (var i in Dobj) {
			msg += i + "     :     " + Dobj[i] + "\n";  	
		}	
	}
	alert(msg);
	return msg;
} // function

// 속성 가져오기
function get_property(Dstring) {

	var Dreturn = new Array();
	var Prop = {};

	if (Dstring.indexOf("(") > -1) {

		Dreturn[0] = Dstring.substr(0,Dstring.indexOf("("));
		var Dstr = Dstring.match(/\((.*?)\)/);

		if (Dstr[1]) {
			Dstr = Dstr[1].split(",");
			for (var a=0;a<Dstr.length;a++) {
				var http_use = 0;
				if (Dstr[a].indexOf("://") > -1) { // 값중 http 처리   	
					http_use = 1;    	
					Dstr[a] = Dstr[a].replace(/\:\/\//g,"-^-^-");
				}
	   
				a_prop = Dstr[a].split(":");
		
				if (http_use == 1) {
					a_prop[1] = a_prop[1].replace(/\-\^\-\^\-/g,"://");
					http_use = 0;    	    	
				}
				a_prop[0] = trim_quotes(a_prop[0]);    
				a_prop[1] = trim_quotes(a_prop[1]);
				if (a_prop.length == 2) { Prop[a_prop[0]] = a_prop[1]; }
			}
		}

		Dreturn[1] = Prop;

	} else {
		Dreturn[0] = Dstring; 	
	}

	return Dreturn;

} // function

function trim_quotes(Dstring) {
	Dstring = Dstring.replace(/(^\")|(\"*$)/g,"");
	Dstring = Dstring.replace(/(^\')|(\'*$)/g,"");
	return Dstring;
} // function

function loading_view() {

	var scroll_obj = _get_body_obj();
	jQuery("#page_change_bg").css({display:"block",width:scroll_obj.scrollWidth,height:scroll_obj.scrollHeight});
	jQuery("#page_change_div").css({display:"block",left:scroll_obj.scrollLeft,top:scroll_obj.scrollTop});
	var _win = get_window_size(); // 화면 크기 리턴 
	jQuery("#page_change").css({height:_win[1]});

	Delay_fuc2("_loading_load",500,function() {
		location.reload();
	});
 	
} // function

function get_evt_obj(e) {
	if (!e) { 
		if (window.event) { e = window.event; } else { return false; }
	}
	var evt = (e.target) ? e.target : (e.srcElement) ? e.srcElement : false;
	return evt;
} // function
 
// 파이어 폭스처리
if( navigator.userAgent.indexOf('Firefox') >= 0 ) {
	var eventNames = ["mousedown","mouseover","mouseout","mousemove","mousedrag","click","dblclick","keydown","keypress","keyup"]; 
	for( var i = 0 ; i < eventNames.length; i++ ) {
		window.addEventListener( eventNames[i], function(e) { window.event = e; },true);
	}
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Slide_Obj(Did,Ddirect,Dfunc) {

	var _T_style = (Ddirect == "width") ? "width" : "height";
	 
	var _T_style_Reverse = "";

	var _T_End_Var = 0;
	 
	var Cid = _get_object(Did);	

	var now_status = (Cid.style.display == "none") ? 0 : 1;

	Cid.style.display = "block"; // 로 설정해야 정보 알아낼수 있음

	var Cid_w = Cid.offsetWidth; // 크기 알아오기(width는 display=table전에)
	if (_SET["navigator"] != "ie") { Cid.style.display = "table"; } // 객체 크기 다시 설정(중간에 변할수 있으므로)
	var Cid_h = Cid.offsetHeight; // 크기 알아오기(height는 display=table후에)

	if (_SET["navigator"] == "ie") {
		if (Cid.children[0]) {
			var aa = new Array("marginLeft","marginRight","borderLeftWidth","borderRightWidth");
			for (var i=0;i<aa.length;i++) { Cid_w -= _get_num(Cid.currentStyle[aa[i]]); }
			var aa = new Array("marginTop","marginBottom","borderTopWidth","borderBottomWidth");
			for (var i=0;i<aa.length;i++) { Cid_h -= _get_num(Cid.currentStyle[aa[i]]); }
		}
	} else {
		Cid_w -= (Cid.offsetWidth - Cid.clientWidth); // style 의 border + margin 합 	
		Cid_h -= (Cid.offsetHeight - Cid.clientHeight); // style 의 border + margin 합
	}

	if (_T_style == "height") {
		_T_End_Var = Cid_h;
		_T_End_Var_Reverse = Cid_w;
		_T_style_Reverse = "width";  	
	} else {
		_T_End_Var = Cid_w;
		_T_End_Var_Reverse = Cid_h;
		_T_style_Reverse = "height"; 	 	 	
	}

	var _start = _end = 0;
	if (now_status == 1) {
		_start = _T_End_Var;
		_end = 0;
	} else {
		_start = 0;
		_end = _T_End_Var; 		
	}
	 
	Cid.style.overflow = "hidden";
	Cid.style.display = "block"; // 트윈할려면 block 해야함

	_end = _end + "px";

	slide_toggle(Cid,{speed:'slow'},function() {

		Cid.style.overflow = "visible";
		//  if (_SET["navigator"] != "ie") { Cid.style.display = "table"; } // visible 뒤에 와야함
		Cid.style["height"] = "auto";  // height는 무조건 auto
		if (now_status == 1) { Cid.style.display = "none"; }
		if (Dfunc) { Dfunc(); }
		
	});
 	
} // function

function _set_animate_doing(Did,Ddoing) {
	Did._animate_doing = Ddoing;	
}

function color_toggle(Did,Dsettings,Dfunc) {
	var Cid = _get_object(Did);
	if (!Cid) { return false; }
	M9COLOR.toggle(Did,Dsettings,Dfunc);
} // function

function bgcolor_rotate(Did,Dcolors,Dsettings) {
	var Cid = _get_object(Did);
	if (!Cid) { return false; }
	M9COLOR.bg_rotate(Did,Dcolors,Dsettings);
} // function

var w_columns = new Array("paddingLeft","paddingRight","borderLeftWidth","borderRightWidth");
var h_columns = new Array("paddingTop","paddingBottom","borderTopWidth","borderBottomWidth");

function get_box_size(Did,Dkind) {

	var Cid = _get_object(Did);

	var Cvar = 0;

	if (Dkind == "height") {
		Cvar = jQuery(Cid).height();
		for (var i=0;i<h_columns.length;i++) {
			Cvar -= _get_num(jQuery(Cid).css(h_columns[i]));
		}
	} else {
		Cvar = jQuery(Cid).width();	
		for (var i=0;i<w_columns.length;i++) {
			Cvar -= _get_num(jQuery(Cid).css(w_columns[i]));
		}
	}

	return Cvar;				
}

// 입력값 form으로 전송
function put_form_by_inputs(return_form,inputs_array) {

	if (return_form) {
		
		var pform = document.forms[return_form];

		for (var i=0;i<inputs_array.length;i++) {
			
			var _key = inputs_array[i];

			var _obj = document.getElementsByName(_key);
			if (!_obj[0]) { continue; }
			//alert(_key);
			
			var _type = jQuery(_obj).prop('type');
			var _var = "";
			if (_type == "radio") {
				_var = escapeHTML(get_radio_value(_key));
			} else if (_type == "checkbox") {
				if (jQuery(_obj).prop("checked") == true) {
					var _v = jQuery(_obj).prop("value");
					if (_v != "") {
						_var = _v;
					}
				}
			} else {
				_var = escapeHTML(jQuery(_obj).val());
			}

			if (pform.elements[_key]) {
				var dd = getObject(pform.elements[_key]);
				jQuery(dd).remove();
			}
			
			if (_type == "password") {
				jQuery(pform).append("<input type='password' name='" + _key + "' value='" + _var + "' style='display:none' />");					
			} else if (_type == "textarea") {
				jQuery(pform).append("<textarea name='" + _key + "' style='display:none'>" + _var + "</textarea>");						
			} else if (_type == "file") {					
				jQuery(_obj).css("display","none").appendTo(jQuery(pform));					
			} else {
				jQuery(pform).append("<input type='hidden' name='" + _key + "' value='" + _var + "' />");								
			}
			
		}
	}
	
} // function

// 입력값 form으로 전송
function put_form_by_ids(return_form,inputs_array) {

	if (return_form) {
		
		var pform = document.forms[return_form];

		for (var i=0;i<inputs_array.length;i++) {
			
			var _id = inputs_array[i];
			_obj = jQuery('#' + _id)[0];
			if (!_obj) { continue; }

			var _key = jQuery(_obj).prop('name');
			var _type = jQuery(_obj).prop('type');

			var _var = "";
			if (_type == "radio") {
				_var = escapeHTML(get_radio_value(_key));
			} else if (_type == "checkbox") {
				if (jQuery(_obj).prop("checked") == true) {
					var _v = jQuery(_obj).prop("value");
					if (_v != "") {
						_var = _v;
					}
				}
			} else {
				_var = escapeHTML(jQuery(_obj).val());
			}

			if (pform.elements[_key]) {
				pform.elements[_key].value = _var;
			} else {
				if (_type == "password") {
					jQuery(pform).append("<input type='password' name='" + _key + "' value='" + _var + "' style='display:none' />");					
				} else if (_type == "textarea") {
					jQuery(pform).append("<textarea name='" + _key + "' style='display:none'>" + _var + "</textarea>");						
				} else {
					jQuery(pform).append("<input type='hidden' name='" + _key + "' value='" + _var + "' />");								
				}
			}
		}
	}
	
} // function

function escapeHTML(str) {
	return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function unescapeHTML(str) {
	return str.stripTags().replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>');
}

////////////////////////////////////////////////////////////////////////////////////////////////
/*
	RGB 색상 : #FFFFFF, #000000 ..
	hex 색상 : rgb(255,255,255), rgb(0,0,0)
*/
var q_border_w = new Array("borderTopWidth","borderBottomWidth","borderLeftWidth","borderRightWidth");
var q_border_c = new Array("borderTopColor","borderBottomColor","borderLeftColor","borderRightColor");
	
var M9COLOR = {

	vars : { time : 200 , step : 5 , delay : 0 , type : 'load' },

	int : function(Did,Deffect) {

		var Cid = _get_object(Did);
		if (!Cid) { return false; } // 객체가 존재하지 않을 경우 무시

		if (!Deffect) { return false; }		

		M9COLOR.setting(Cid,Deffect[1]);

		if (Cid._ani_property["color"]["type"] == "event") { return false; }

		var event_selecter = (Cid._selecter) ? Cid._selecter : Cid;

		jQuery(event_selecter).on('mouseover focus',function() {
			M9COLOR.mouseover(Cid);
		});
		jQuery(event_selecter).on('mouseout blur',function() {
			M9COLOR.mouseout(Cid);
		});
				
	},
	
	setting : function(Did,Dvars) {
				
		var Cid = _get_object(Did);
		if (!Cid) { return false; }

		var Dprop = get_vars(Dvars,M9COLOR.vars);
		Dprop["time"] = Math.floor(Dprop["time"] / Dprop["step"]);

		if (!Cid._ani_property) { Cid._ani_property = {}; }
		Cid._ani_property["color"] = Dprop;

		var _HASH = {};

		if (Dvars["class"]) {

			var obj = document.createElement('div');
			jQuery(obj).addClass(Dvars["class"]).css("display","none");
			jQuery(obj).appendTo("body");

			if (!Dvars["font"]) {
				var Rcolor = jQuery(obj).css("color");
				Dvars["font"] = Rcolor;
			}

			if (!Dvars["background"]) {
				var RbackgroundColor = jQuery(obj).css("backgroundColor");
				if (RbackgroundColor != "rgba(0, 0, 0, 0)" && RbackgroundColor != "transparent") {
					Dvars["background"] = RbackgroundColor;
				}
			}
			
			if (!Dvars["border"]) {
				for (var i=0;i<q_border_c.length;i++) {
					var b_c = q_border_c[i];
					Dvars[b_c] = Dvars["border"];	
				}							
			}
					
			for (var i=0;i<q_border_c.length;i++) {
				var b_c = q_border_c[i];						
				if (!Dvars[b_c]) {						
					Dvars[b_c] = jQuery(obj).css(b_c);	
				}
			}

			if (!Dvars["text-shadow"]) {				
				var to_text_shadow = jQuery(obj).css("text-shadow");
				
				if (to_text_shadow != undefined && to_text_shadow != "none") {
					to_text_shadow = to_text_shadow.replace(/[0-9]px/g,"");
					to_text_shadow = to_text_shadow.replace(/ /g,"");			
					Dvars["text-shadow"] = to_text_shadow;
				}
			}

			Cid._m9_color_class_from = Cid.className;
			Cid._m9_color_class_to = Dvars["class"];
						
			jQuery(obj).remove(); 
		}

		if (Dvars["text-shadow"]) {			
			_HASH["text-shadow"] = {};
			var from_text_shadow = jQuery(Cid).css("text-shadow");		
			var shadow_size_pattern = /(\s?[0-9]px)+/g; // 결과:1px 2px 3px
  			Cid._m9color_text_shadow_size = from_text_shadow.match(shadow_size_pattern);
			from_text_shadow = from_text_shadow.replace(/[0-9]px/g,"");
			from_text_shadow = from_text_shadow.replace(/ /g,"");						
			_HASH["text-shadow"]["s"] = from_text_shadow;
			_HASH["text-shadow"]["e"] = Dvars["text-shadow"];					
		}
								
		if (Dvars["font"]) {
			_HASH["color"] = {};
			_HASH["color"]["s"] = jQuery(Cid).css("color");
			_HASH["color"]["e"] = Dvars["font"];			
		}

		if (Dvars["border"]) {
			for (var i=0;i<q_border_c.length;i++) {
				var b_c = q_border_c[i];
				Dvars[b_c] = Dvars["border"];	
			}							
		}
		
		for (var i=0;i<q_border_c.length;i++) {
			
			var b_c = q_border_c[i];
			if (!Dvars[b_c]) { continue; }
			
			var b_w = q_border_w[i];	
			var r_w = _get_num(jQuery(Cid).css(b_w));						
			if (r_w != 0) {							
				_HASH[b_c] = {};				
				_HASH[b_c]["s"] = jQuery(Cid).css(b_c);
				_HASH[b_c]["e"] = Dvars[b_c];	
			}
		}
				
		if (Dvars["background"]) {
			_HASH["backgroundColor"] = {};
			_HASH["backgroundColor"]["s"] = jQuery(Cid).css("backgroundColor");
			_HASH["backgroundColor"]["e"] = Dvars["background"];				
		}		

		Cid._M9color = {};
		for (var i in _HASH) {
			for (var j in _HASH[i]) {
				// 배경색상 없을 경우 ie,firefox,opera : transparent , safari,chrome : rgba(0, 0, 0, 0)					
				_HASH[i][j] = _HASH[i][j].toUpperCase();
				if (_HASH[i][j] == "TRANSPARENT" || _HASH[i][j].match(/^RGBA\(/i)) { _HASH[i][j] = "#FFFFFF";	}		
				if (_HASH[i][j].match(/^RGB/)) {
					_HASH[i][j] = M9COLOR.RGB2HEX(_HASH[i][j]);				
				}	else if (!(_HASH[i][j].match(/^#/))) { // orange, red 같은 색이름일 경우 무시
					_HASH[i][j] = M9COLOR.NAME2HEX(_HASH[i][j]);
					if (_HASH[i][j] == "") { _HASH[i][j] = undefined; }		
				}				
			}

			if (_HASH[i]["s"] && _HASH[i]["e"]) {
				if (_HASH[i]["s"] == _HASH[i]["e"]) { continue; } // 같은색 무시
				Cid._M9color[i] = {};
				Cid._M9color[i]["s_e"] = M9COLOR._save_color_set(_HASH[i]["s"],_HASH[i]["e"],Dprop["step"]);		
				Cid._M9color[i]["s"] = _HASH[i]["s"];
				Cid._M9color[i]["e"] = _HASH[i]["e"];				
			}				
		}

		_HASH = undefined;
		Cid._m9color_count = 0;
	},
	
	RGB2HEX : function(a) {
		if (a.match(/^#/)) { return a; }		
		a = a.toUpperCase();
		a = a.replace(/ /g,""); // 공백치환
		a = a.replace(/^RGB\(/,""); // 공백치환
		a = a.replace(/\)$/,""); // 공백치환
		b = a.split(",");
		return M9COLOR.RGB2HEX2(b);
	},

	RGB2HEX2 : function(a) {
		var c = "#";
		for (var i=0;i<a.length;i++) { c += M9COLOR._dec2hex(a[i]); }
		return c;		
	},

	ColorName : {aliceblue:'#F0F8FF',antiquewhite:'#FAEBD7',aqua:'#00FFFF',aquamarine:'#7FFFD4',azure:'#F0FFFF',beige:'#F5F5DC',bisque:'#FFE4C4',black:'#000000',blanchedalmond:'#FFEBCD',blue:'#0000FF',blueviolet:'#8A2BE2',brown:'#A52A2A',burlywood:'#DEB887',cadetblue:'#5F9EA0',chartreuse:'#7FFF00',chocolate:'#D2691E',coral:'#FF7F50',cornflowerblue:'#6495ED',cornsilk:'#FFF8DC',crimson:'#DC143C',cyan:'#00FFFF',darkblue:'#00008B',darkcyan:'#008B8B',darkgoldenrod:'#B8860B',darkgray:'#A9A9A9',darkgrey:'#A9A9A9',darkgreen:'#006400',darkkhaki:'#BDB76B',darkmagenta:'#8B008B',darkolivegreen:'#556B2F',darkorange:'#FF8C00',darkorchid:'#9932CC',darkred:'#8B0000',darksalmon:'#E9967A',darkseagreen:'#8FBC8F',darkslateblue:'#483D8B',darkslategray:'#2F4F4F',darkslategrey:'#2F4F4F',darkturquoise:'#00CED1',darkviolet:'#9400D3',deeppink:'#FF1493',deepskyblue:'#00BFFF',dimgray:'#696969',dimgrey:'#696969',dodgerblue:'#1E90FF',firebrick:'#B22222',floralwhite:'#FFFAF0',forestgreen:'#228B22',fuchsia:'#FF00FF',gainsboro:'#DCDCDC',ghostwhite:'#F8F8FF',gold:'#FFD700',goldenrod:'#DAA520',gray:'#808080',grey:'#808080',green:'#008000',greenyellow:'#ADFF2F',honeydew:'#F0FFF0',hotpink:'#FF69B4',indianred:'#CD5C5C',indigo:'#4B0082',ivory:'#FFFFF0',khaki:'#F0E68C',lavender:'#E6E6FA',lavenderblush:'#FFF0F5',lawngreen:'#7CFC00',lemonchiffon:'#FFFACD',lightblue:'#ADD8E6',lightcoral:'#F08080',lightcyan:'#E0FFFF',lightgoldenrodyellow:'#FAFAD2',lightgray:'#D3D3D3',lightgrey:'#D3D3D3',lightgreen:'#90EE90',lightpink:'#FFB6C1',lightsalmon:'#FFA07A',lightseagreen:'#20B2AA',lightskyblue:'#87CEFA',lightslategray:'#778899',lightslategrey:'#778899',lightsteelblue:'#B0C4DE',lightyellow:'#FFFFE0',lime:'#00FF00',limegreen:'#32CD32',linen:'#FAF0E6',magenta:'#FF00FF',maroon:'#800000',mediumaquamarine:'#66CDAA',mediumblue:'#0000CD',mediumorchid:'#BA55D3',mediumpurple:'#9370DB',mediumseagreen:'#3CB371',mediumslateblue:'#7B68EE',mediumspringgreen:'#00FA9A',mediumturquoise:'#48D1CC',mediumvioletred:'#C71585',midnightblue:'#191970',mintcream:'#F5FFFA',mistyrose:'#FFE4E1',moccasin:'#FFE4B5',navajowhite:'#FFDEAD',navy:'#000080',oldlace:'#FDF5E6',olive:'#808000',olivedrab:'#6B8E23',orange:'#FFA500',orangered:'#FF4500',orchid:'#DA70D6',palegoldenrod:'#EEE8AA',palegreen:'#98FB98',paleturquoise:'#AFEEEE',palevioletred:'#DB7093',papayawhip:'#FFEFD5',peachpuff:'#FFDAB9',peru:'#CD853F',pink:'#FFC0CB',plum:'#DDA0DD',powderblue:'#B0E0E6',purple:'#800080',red:'#FF0000',rosybrown:'#BC8F8F',royalblue:'#4169E1',saddlebrown:'#8B4513',salmon:'#FA8072',sandybrown:'#F4A460',seagreen:'#2E8B57',seashell:'#FFF5EE',sienna:'#A0522D',silver:'#C0C0C0',skyblue:'#87CEEB',slateblue:'#6A5ACD',slategray:'#708090',slategrey:'#708090',snow:'#FFFAFA',springgreen:'#00FF7F',steelblue:'#4682B4',tan:'#D2B48C',teal:'#008080',thistle:'#D8BFD8',tomato:'#FF6347',turquoise:'#40E0D0',violet:'#EE82EE',wheat:'#F5DEB3',white:'#FFFFFF',whitesmoke:'#F5F5F5',yellow:'#FFFF00',yellowgreen:'#9ACD32'},
	_return_ColorName : function() { return M9COLOR.ColorName; },		
	NAME2HEX : function(a) {
		var b = a.toLowerCase();
		if (M9COLOR.ColorName[b]) { return M9COLOR.ColorName[b]; }
		return "";
	},
			
	HEX2RGB : function(a) { // #FFFFFF ↔ '255,255,255' 문자 리턴
		if (a.toUpperCase().match(/^RGB\(/)) { return a; }							
		var b = M9COLOR.HEX2RGB2(a);
		return ("rgb(" + b.join(",") + ")");
	},	

	HEX2RGB2 : function(a) { // #FFFFFF ↔ (255,255,255) 배열 리턴			
		a = a.replace(/^#/,""); // #치환
		if (a.length == 3) {
			var cc = a.split("");
			a = cc[0] + cc[0] + cc[1] + cc[1] + cc[2] + cc[2];
		}		
		var b = [a.substr(0,2),a.substr(2,2),a.substr(4,2)];
		var c = [];
		for (var i=0;i<b.length;i++) { c.push(M9COLOR._hex2dec(b[i])); }
		return c;
	},

	_T	:	"0123456789ABCDEF",
	_dec2hex : function(i) { //255 ↔ FF
		return (M9COLOR._T.charAt(i>>4)+M9COLOR._T.charAt(i%16));	
	},

	_hex2dec : function(i) { //FF ↔ 255
		var t;
		while (i.toString().length < 2) { i = "0" + i; }
		i = i.toUpperCase();
		if(!i.match(/[^0-9a-fA-F]/i)) {	t = parseInt(i,16); }
		return t;
	},
	
	_save_color : {},
	// 대부분 마우스 오버 아웃시 사용하므로, 둘다 만들지 말고 하나만 만들어 reverse하여 리턴
	_save_color_reverse : {},
	
	// 2개의 색상(C1,C2)의 단계를 (unit)로 나눈 배열생성 후 그 이름 리턴
	_save_color_set : function(C1,C2,Dstep) {

		if (!Dstep) { Dstep = 5; }

		C1 = C1.toUpperCase();
		C2 = C2.toUpperCase();

		var u1 = C1.replace(/^#/,""); // 치환
		var u2 = C2.replace(/^#/,""); // 치환
		
		var U = u1 + "_" + u2;

		if (M9COLOR._save_color[U]) { return U; }
		if (M9COLOR._save_color_reverse[U]) { return U; } //반대값이라 생성안함

		var unit = Dstep;
		var a1 = M9COLOR.HEX2RGB2(C1);	// 시작
		var a2 = M9COLOR.HEX2RGB2(C2);	// 종착

		var b = []; // 증/감소값
		
		for (var i=0;i<3;i++) {
			b[i] = Math.floor((a2[i] - a1[i]) / unit);
			if (b[i] > 0) { b[i]++; } else { b[i]--; }
		}

		var d = [];
		for (var i=0;i<unit;i++) {
	
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
			var Ccolor = M9COLOR.RGB2HEX2(e);
			d[i] = Ccolor;
		}

		d[0] = "#" + u1;
		d[d.length-1] = "#" + u2;

		M9COLOR._save_color[U] = d;	
		var U_reverse = u2 + "_" + u1;			
		M9COLOR._save_color_reverse[U] = U_reverse; // 반대그룹
		
		return U;
	},

	_timeobj : {},
	_timeobj_color : {},

	mouseover : function(Did) {
		if (Did._color_direction == 1) { return false; }
		M9COLOR.toggle(Did);				
	},

	mouseout : function(Did) {
		if (Did._color_direction == -1) { return false; }				
		M9COLOR.toggle(Did);		
	},

	toggle : function(Did,Dsettings,Dfunc) {

		var Cid = _get_object(Did);
		var Cname = (!Cid.id) ? random_id(Cid) : Cid.id;

		if (!Dsettings && !Cid._M9color) { return false; }

		if (!Cid._M9color) {
			M9COLOR.setting(Cid,Dsettings);			
		}

		var Dprop = Cid._ani_property["color"];

		var _now_num = 0;
		if (M9COLOR._timeobj[Cname]) { // 중복방지
			_now_num = Cid._m9color_count;			
			clearInterval(M9COLOR._timeobj[Cname]);
			delete M9COLOR._timeobj[Cname];
			M9COLOR._timeobj_color[Cname] = undefined;		
		}

		Cid._color_direction = (Cid._color_direction == 1) ? -1 : 1;

		_Icon_Auto_Change(Cid,Cid._color_direction); // 아이콘 자동변경
		
		M9COLOR._timeobj_color[Cname] = {};

		var dd = 0;
		for (var i in Cid._M9color) {
			var color_group_name = Cid._M9color[i]["s_e"];

			if (Cid._color_direction == 1) {
				 dd = _now_num;					 
				M9COLOR._timeobj_color[Cname][i] = M9COLOR._save_color[color_group_name].slice(dd,Dprop["step"]);	 // 중요		 								
			} else {			
				 dd = (_now_num == 0) ? Dprop["step"] : _now_num;
				M9COLOR._timeobj_color[Cname][i] = M9COLOR._save_color[color_group_name].slice(0,dd).reverse();	 // 중요					
			}	
		}
				
		var k;
		if (Dfunc) {
			M9COLOR._callback[Cname] = Dfunc;
			k = "M9COLOR._timeline('" + Cname + "',1)";				
		} else {
			k = "M9COLOR._timeline('" + Cname + "')";			
		}
		M9COLOR._timeobj[Cname] = window.setInterval(k,Dprop["time"]); 
	},
	
	_callback : {},
	_rotate_reset_color : {},
	bg_rotate : function(Did,Dcolors,Dsettings) {

		var Cid = _get_object(Did);

		var Cname = (!Cid.id) ? random_id(Cid) : Cid.id;

		var _Ccolors = trim_quotes(Dcolors);
		var Ccolors = _Ccolors.split(",");

		if (!M9COLOR._rotate_reset_color[Cname]) {
			var _bgcolor = jQuery(Cid).css("backgroundColor").toUpperCase();
			if (_bgcolor == "TRANSPARENT" || _bgcolor.match(/^RGBA\(/i)) { _bgcolor = "#FFFFFF";	}				
			_bgcolor = M9COLOR.RGB2HEX(_bgcolor);
			M9COLOR._rotate_reset_color[Cname] = [_bgcolor,Ccolors.slice(0)];
		} else if (Ccolors[0] == "") {
			Ccolors = M9COLOR._rotate_reset_color[Cname].slice(0);
		}
		
		if (!Dsettings) { Dsettings = { time : 1000 , step : 10 , delay : 10000 , type : 'load' }; }
		
		Dsettings["background"] = Ccolors.shift();
					
		if (Cid._M9color) {
			Cid._M9color = undefined;
		}

		M9COLOR.setting(Cid,Dsettings);			
			
		var Dprop = Cid._ani_property;		
		var color_group_name = Cid._M9color["backgroundColor"]["s_e"];

		M9COLOR._timeobj_color[Cname] = {};		
		M9COLOR._timeobj_color[Cname]["backgroundColor"] = M9COLOR._save_color[color_group_name].slice(0);	 // 중요	

		var _color_str = Ccolors.join(",");
		
		M9COLOR._callback[Cname] = function() { 
			Delay_fuc2(Cname,(Dsettings["delay"]*1),function() {
				M9COLOR.bg_rotate(Cname,_color_str,Dsettings);
			});
			
		};
		
		var k = "M9COLOR._timeline('" + Cname + "',1)";
		M9COLOR._timeobj[Cname] = window.setInterval(k,Dprop["time"]); 
	},
		
	_timeline : function(Cname,Callback_ok) {

		var Cid = _get_object(Cname);
		
		var _root_check;
		var _css = {};
		for (var i in M9COLOR._timeobj_color[Cname]) {
			if (i == "text-shadow") {
				_css[i] = Cid._m9color_text_shadow_size + " " + M9COLOR._timeobj_color[Cname][i].shift();				
			} else {
				_css[i] = M9COLOR._timeobj_color[Cname][i].shift();
			}
			_root_check = [i];
		}

		jQuery(Cid).css(_css);
		if (Cid._color_direction == 1) {
			Cid._m9color_count++;
		} else {
			Cid._m9color_count--;			
		}

		if (M9COLOR._timeobj_color[Cname][_root_check].length <= 0) {				

			clearInterval(M9COLOR._timeobj[Cname]);
			delete M9COLOR._timeobj[Cname];
					
			M9COLOR._timeobj_color[Cname] = undefined;		

			if (Callback_ok) {	
				M9COLOR._callback[Cname]();
			}

			if (Cid._color_direction == -1) { Cid._m9color_count = 0; }
		}
		
	}//_timeline
};

var M9ALT = {
	
	make_over : function(Did,Dnum,Dstr) {

		if (Did._alt_over) {
			return Did._alt_over;
		}

		if (!getObject("alt_no_" + Dnum)) { return false; }
			
		var C_w = Did.width;
		var C_h = Did.height; 

		var _clone_id = random_id(Did); // id존재하지 않으면 생성
		var clone_id = _clone_id + "_light";
		jQuery("#alt_no_"+Dnum).clone().attr("id",clone_id).css({width:C_w,height:C_h}).appendTo("body");

		var clone_son_id = clone_id+"_son";
		var clone_son =jQuery("#"+clone_id).children()[0];
		jQuery(clone_son).css({width:C_w,height:C_h});

		var alt_div = jQuery(clone_son).children()[0];
		var mouse_div = jQuery(clone_son).children()[1];

		jQuery(alt_div).css({width:C_w,height:C_h});
		jQuery(mouse_div).css({width:C_w,height:C_h});
		var alt_div2 = jQuery(alt_div).children()[0];		
			
		var re = /^#/gi;
		var Dmatch = Dstr.match(re);

		if (Dmatch != null) {
			var Dstr_id = Dstr.replace(/^#/g,"");			
			if (getObject(Dstr_id)) {
				jQuery(alt_div).append(getObject(Dstr_id));
				jQuery(alt_div).css("padding",0);		
				getObject(Dstr_id).style["display"] = "";
			} else {
				jQuery(alt_div2).append(Dstr);
			}
		} else {	
			jQuery(alt_div2).append(Dstr);
		}

		alt_div._parent = clone_id;
		mouse_div._parent = clone_id;
		mouse_div._target = alt_div;
		 				
		Did._alt_over = clone_id;

		jQuery(mouse_div).on('mouseout',function() {
			var aaa = mouse_div._target;
			if (getObject(this._parent)._doing == 1) {
				layer_slide_stop(aaa);
			}				
	
			layer_slide_close(aaa,{slide:'!down'},function(){
				jQuery("#"+mouse_div._parent).css("display","none");
				getObject(this._parent)._doing = 0;     	 	
			});			
		});

		return clone_id;
	},
	_encode : function(Dmsg) {
		Dmsg = Dmsg.replace(/\</g,"&lt;");
		Dmsg = Dmsg.replace(/\>/g,"&gt;");		
		return Dmsg;			
	},
		
	view : function(Did) {

		if (_SET["mobile_ok"] != 0) { return false; }
		if (Did._alram == undefined) {	M9ALT._reset(Did); }
		if (Did._alram == 0) { return false; }

		var alt_no ="0";
		if (Did._alram == 2) {	
			alt_no = Did.parentNode.getAttribute("alt_no");
			if (Did._alt) { Did.parentNode.alt = ""; }
			if (Did._title) { Did.parentNode.title = ""; }
		} else if (Did._alram == 3) {	
			alt_no = Did.childNodes[0].getAttribute("alt_no");
			if (Did._alt) { Did.childNodes[0].alt = ""; }
			if (Did._title) { Did.childNodes[0].title = ""; }				
		} else {
			alt_no = Did.getAttribute("alt_no");
			if (Did._alt) { Did.alt = ""; }
			if (Did._title) { Did.title = ""; }					
		} 	
		 
		var str = "";
		if (Did._title && Did._alt) {
			str = "<b>" + M9ALT._encode(Did._alt) + "</b><br />" + M9ALT._encode(Did._title);
		} else if (Did._title) {
			str = M9ALT._encode(Did._title);
		} else {
			str = M9ALT._encode(Did._alt);	 	
		}

		if (alt_no == "1") { return false; } else if (alt_no == null) { alt_no = "0"; }

		var regexp = /^[a-z]$/; // 알파벳 문자 하나
					
		if (regexp.test(alt_no)) {
			
			var clone_id = M9ALT.make_over(Did,alt_no,str);

			var C_w = Did.width;
			var C_h = Did.height; 

			layer_position(clone_id,Did,'!down');
			layer_position_xy(clone_id,0,C_h);
			jQuery("#"+clone_id).css({"display":"block","z-index":10});

			var alt_div = jQuery("#"+clone_id).children()[0];
			alt_div = jQuery(alt_div).children()[0];						
			
			getObject(clone_id)._doing = 1;
			layer_slide_view(alt_div,{slide:'!up'},function(){getObject(clone_id)._doing = 0;});
						
		} else {

			var _id = "alt_view"+alt_no;
			if (!getObject("alt_view"+alt_no)) { return false; }
			
			jQuery('#' + _id + '>div>div').html(str);
			var alt_w = get_object_size(_id,"width"); 
				
			if (_SET["navigator"] == "ie") {
				if (alt_w > 300) {
					jQuery('#' + _id).css('width','300px');
				}
			}
	
			var alt_h = get_object_size(_id,"height"); 
			
			var direct = layer_position(_id,Did);
				
			var _pos = [];
			if (direct == "up") {
				_pos.push("CENTER","BOTTOM");
			} else if (direct == "down") {
				_pos.push("CENTER","TOP"); 	
			} else if (direct == "left") { 	
				_pos.push("RIGHT","CENTER");  
			} else {	 	
				_pos.push("LEFT","CENTER");  
			}
	
			if (_SET["navigator"] == "firefox" || _SET["navigator"] == "opera") {
				jQuery('#' + _id + '>div').css("background-Position",_pos[0]+" "+_pos[1]);				
			} else {
				jQuery('#' + _id + '>div').css({"background-PositionX":_pos[0],"background-PositionY":_pos[1]});				
			}
	
			jQuery('#' + _id).css('display','block');
			
		}

	}, //view
	
	hidden : function(Did) {

		if (_SET["mobile_ok"] != 0) { return false; }		
		if (!Did._alt && !Did._title) { return false; }

		if (Did._alram == 2) {	
			alt_no = Did.parentNode.getAttribute("alt_no");
		} else if (Did._alram == 3) {	
			alt_no = Did.childNodes[0].getAttribute("alt_no");			
		} else {
			alt_no = Did.getAttribute("alt_no");			
		} 	
		
		if (alt_no == "1") { return false; } else if (alt_no == null) { alt_no = "0"; }

		if (!getObject("alt_view"+alt_no)) { return false; }
									 
		if (_SET["navigator"] == "ie") {	
			getObject("alt_view"+alt_no).style.width = ""; // 크기 원래대로 		
		}
 
		getObject("alt_view"+alt_no).style.display = "none";  		

		if (Did._alram == 2) {
			if (Did._alt) { Did.parentNode.alt = Did._alt; }
			if (Did._title) { Did.parentNode.title = Did._title; }
		} else if (Did._alram == 3) {	
			if (Did._alt) { Did.childNodes[0].alt = Did._alt; }
			if (Did._title) { Did.childNodes[0].title = Did._title; }								
		} else {
			if (Did._alt) { Did.alt = Did._alt; }
			if (Did._title) { Did.title = Did._title; }			
		}
		  		
	}, //hidden


	_reset : function(Did) {

		Did._alram = 0;
		
		if (_SET["navigator"] == "ie" && Did.tagName == "SELECT") { return; } // 익스플로러 SELECT박스 무시
		
		if (!Did._alt) {
			var _alt = Did.getAttribute("alt");
			if (_alt) {
				Did._alt = _alt;
				Did._alram = 1;
			}
		}

		if (!Did._title) {
			var _title = Did.getAttribute("title");
			if (_title) {
				Did._title = _title; 
				Did._alram = 1;
			}
		}

		if (Did._alram == 0) {

			var Dparent = Did.parentNode;			
			if (Dparent.tagName == "A") {

				if (!Did._alt) {
					var _alt = Dparent.getAttribute("alt");
					if (_alt) {	
						Did._alt = _alt;
						Did._alram = 2;
					}
				}
 
 				if (!Did._title) {
					var _title = Dparent.getAttribute("title");
					if (_title) {  		
						Did._title = _title;
						Did._alram = 2;
					}
				}
			}	 	
			
		}
		
		if (Did._alram == 0) {
			
			if (Did.tagName == "A") {

				if (!Did._alt) {
					var _alt = jQuery(Did).find('[alt]').attr('alt');
					if (_alt) {	
						Did._alt = _alt;
						Did._alram = 3;
					}
				}
 
 				if (!Did._title) {
					var _title = jQuery(Did).find('[title]').attr('title');
					if (_title) {  		
						Did._title = _title;
						Did._alram = 3;
					}
				}
			}	 	
				
		}
	} //reset	
	
};

////////////////////////////////////////////////////////////
// 이벤트 관련
//////////////////////////////////////////////////////////// 
var M9EVENT = {
	mouseover : function(Did) {
		M9ALT.view(Did);
	},
	mouseout : function(Did) {
		M9ALT.hidden(Did);		
	}
};

jQuery(document).on('mouseover',function(e) {
	M9EVENT.mouseover(e.target); 	
}).on('mouseout',function(e) {
	M9EVENT.mouseout(e.target); 	
}); 


(function(jQuery) {
	jQuery.getStylesheet = function (href) {
		var jQueryd = jQuery.Deferred();
		var jQuerylink = jQuery('<link/>',{
			rel: 'stylesheet',
			type: 'text/css',
			href: href
		}).appendTo('head');
		jQueryd.resolve(jQuerylink);
		return jQueryd.promise();
	};
})(jQuery);

//////////////////////////////////////////////////////////
// 리사이징 설정
//////////////////////////////////////////////////////////
jQuery(function() {

	var _before_screen_w = _get_num(jQuery('body').css('width'));
	var timer = null;

	jQuery(window).on('resize',function( ) {
	    clearTimeout(timer);
	    timer = setTimeout(resizeDone,300);
	} );
	
	function resizeDone( ) {
	
		Delay_fuc2("resize",200,function(){	
	
			var _now_screen_w = _get_num(jQuery('body').css('width'));
			if (_now_screen_w == _before_screen_w) { return false; }
			//mobile_checking.int(); // 모바일체크
			_before_screen_w = _now_screen_w;
			
			if (Resize_Function.length > 0) {
				for (var i=0;i<Resize_Function.length;i++) {
					eval(Resize_Function[i]);	
				}
			}
	
		});
						
	}

	//mode_obj.Responsive();

	var _html = 
	'<div id="page_change_bg" class="page_turn_bg" style="display:none"></div>' +
	'<div id="page_change_div" class="page_turn_div" style="display:none"><div id="page_change" class="page_turn"><span class="valign"><i>&nbsp;</i></span><span class="page_turn_loading_bar"></span></div></div>' +
	'<div id="lightbox_area"></div>' +
	'<div id="ajax_loading" style="display:none"><span id="ajax_loading_contents">Loading..</span></div>' +
	'<div id="ajax_error_view" style="display:none"><div id="ajax_error_contents"></div></div>' +
	'<div id="alt_view0" class="alt-tipsy"><div><div></div></div></div>' +
	'<div id="alt_view2" class="alt-tipsy"><div><div></div></div></div>' +
	'<div id="alt_view3" class="alt-tipsy"><div><div></div></div></div>' +
	'<div id="alt_view4" class="alt-tipsy"><div><div></div></div></div>' +
	'<div id="alt_no_a" class="alt_no_a alt-tipsy2" style="display:none"><div class="box"><div class="alt"><div class="content"></div></div><div class="mouse"></div></div></div>' +
	'<div id="alt_no_b" class="alt_no_b alt-tipsy2" style="display:none"><div class="box"><div class="alt"><div class="content"></div></div><div class="mouse"></div></div></div>' +
	'<div id="alt_no_c" class="alt_no_c alt-tipsy2" style="display:none"><div class="box"><div class="alt"><div class="content"></div></div><div class="mouse"></div></div></div>' +
	'<div id="alt_no_d" class="alt_no_d alt-tipsy2" style="display:none"><div class="box"><div class="alt"><div class="content"></div></div><div class="mouse"></div></div></div>';

	jQuery('body').append(_html);


});

//	Resize_Function.push("mode_obj.Responsive();");	
	