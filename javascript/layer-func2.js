/*

2008/12/1`일 layer_view2()추가

사용할수 있는 함수는 layer_view() 하나 뿐이다.
layer_view()에 들어가는 인수는 3가지이다.
인수 3개는 반드시 존재하여야 한다.
인수[1]		=>	레이어 그룹명(문자)
인수[2]		=>	단독 레이어명(문자)
인수[3]		=>	보여지고있는 초기 레이어값(문자)

예)
레이어가 3개가 있다.
이 3개의 레이어 그룹을 A라고하자.
각각의 이름은 1,2,3 혹은 a,b,c등으로 둘수 있다. 여기서는 1,2,3이라고 하자.
그럼 레이어 명은
A1,A2,A3가 된다.

사용시에는 
<div id=A1 style="display:;">aaaa</div>
<div id=A2 style="display:none;">bbbb</div>
<div id=A3 style="display:none;">cccc</div>
가 된다.

그럼 우리는 A2레이어를 출력하기 위해서는
<a onclick="layer_view("A","2","1");">aaaa</a>
를 클릭하면 A를 볼수 있다.
여기서 중요한 것이 3번째 인수이다.
3번째인수는 style="display:;"인것의 레이어값이다.
즉 A1값이 보여지고 있기 때문에
<a onclick="layer_view('A','1','1');">aaaa</a>
<a onclick="layer_view('A','2','1');">bbbb</a>
<a onclick="layer_view('A','3','1');">cccc</a>
3번째 인수는 모두 같은 값을 가진다.

중요: 다중 해쉬를 사용하여 그룹화하였기 때문에 한페이지 내에서 그룹명이 다를 경우
모두 제어 할 수 있다.
2008.3.14
*/

var _slide_options = ["speed","opacity","slide","easing"];
function _get_slide_options(Doptions) {
	var Eoptions = {};
	for (var i=0;i<_slide_options.length;i++) {
		if (Doptions[_slide_options[i]]) {
			Eoptions[_slide_options[i]] = Doptions[_slide_options[i]];
		}
	}	
	return Eoptions;
}

var _opentoggle_group = {};
var _opentoggle_obj_slide = {};
function opentoggle(Did,Doptions) {
	
	var Cid = _get_object(Did);
	if (!Cid) { return false; } // 객체가 존재하지 않을 경우 무시		

	var returns = [Did];
	
	var Eoptions;
	var Dgroup = undefined;
	var Dself = 1;
	if (Doptions) {
		Eoptions = _get_slide_options(Doptions);
		Dgroup = Doptions["group"];
		Dself = (Doptions["self"] == 0) ? 0 : 1;
	}

	var closed_id = _opentoggle_group[Dgroup];
	if (closed_id == Did) {
		if (Dself != 1) { return false; }
	}

	if (Dgroup) {
		if (closed_id) {

			var Eid = _get_object(closed_id);		
			if (jQuery(Eid).css("display") != "none") {
				if (_opentoggle_obj_slide[closed_id] == 1) {
					layer_slide_close(Eid);		
				} else {
					jQuery(Eid).css("display","none");
				}
				_opentoggle_group[Dgroup] = undefined;												
			}
			returns[1] = closed_id;
		}
	}
	
	if (jQuery(Cid).css("display") == "none") {
		
		if (Eoptions) {
			_opentoggle_obj_slide[Did] = 1;
			layer_slide_view(Did,Eoptions);			
		} else {
			jQuery(Cid).css("display","");				
		}

		if (Dgroup) { _opentoggle_group[Dgroup] = Did; }
		returns[0] = Did;
		
	} else {
		
		if (Eoptions) {		
			_opentoggle_obj_slide[Did] = 1;				
			layer_slide_close(Did,Eoptions);						
		} else {
			jQuery(Cid).css("display","none");			
		}

		if (Dgroup) { _opentoggle_group[Dgroup] = undefined; }
		returns[0] = "";		
	}		
	return returns;
}

var layer_list = new Array();								// [레이어 리스트] 해쉬 
var now_viewed_layer_list = new Array();		// [현재 보여지고 있는 레이어 리스트] 해쉬

function layer_view(Dgroup,Dnum,Dbase) {

 // 객체가 존재하지 않을 경우 객체 생성
 // 최초의 layer_view() 호출이 있을경우 layer_list[][] 해쉬의 해쉬(2중해쉬생성)
 // layer_list 처음 해쉬는 Dgroup명이고, 두번째 해쉬는 Dnum값이다.
 if (layer_list[Dgroup] == undefined) {

  layer_list[Dgroup] = new Array();					// [레이어 리스트] 해쉬의 해쉬 초기화
  layer_list[Dgroup][Dnum] = 1;							// 레이어 저장

   now_viewed_layer_list[Dgroup] = Dbase;		// [현재 보여지고 있는 레이어 리스트] 초기화
 }

 // 레이어가 존재하지 않으면 
 if (layer_list[Dgroup][Dnum] == undefined) {
  layer_list[Dgroup][Dnum] = 1;			// 레이어 저장
 }

 if (now_viewed_layer_list[Dgroup] == Dnum) {
 	return false;
 }
 
 if (now_viewed_layer_list[Dgroup] != undefined) { 
  var closed_layer = Dgroup + "" + now_viewed_layer_list[Dgroup]; 
  if (getObject(closed_layer)) {  	
   getObject(closed_layer).style.display = "none";
  }
 }
   
 // 레이어 보이기
 var Dgroup2 = Dgroup +""+ Dnum;
 if (getObject(Dgroup2)) { 
  getObject(Dgroup2).style.display = "";
  now_viewed_layer_list[Dgroup] = Dnum;    
 }

}

// 같은 id값으로 layer변경
// 인수 : ID, 방향(prev,next),회전(0,1)
// 회전 => 마지막이면 처음으로, 처음이면 마지막으로
function layer_view2(Dname,Ddirect,Drotation) {

 var Ddoc = document.all[Dname];
 var Dlen = Ddoc.length;

 for(i=0;i<Dlen;i++) {
  if (Ddoc[i].style.display == "") {

   var target_num = 0;

   if (Ddirect == "prev") {
    target_num = i - 1;
	  if (target_num < 0) {
     if (Drotation == 1) { target_num = Dlen - 1; } else { return false; }
	  }
   } else {
    target_num = i + 1;
	  if (target_num >= Dlen) {
     if (Drotation == 1) { target_num = 0; } else { return false; }
	  }
   }

   Ddoc[i].style.display = "none";
   Ddoc[target_num].style.display = "";
   return false;
  }
 } //for
 
} // function

var before_id = "";
function layer_view3(Dname) {

 if (before_id != "" && before_id != Dname) { jQuery(getObject(before_id)).css('display','none'); }

 var obj = getObject(Dname);
 jQuery(obj).css('display',
 ((jQuery(obj).css('display') != "none") ? "none" : "block")
 );
 before_id = (jQuery(obj).css('display') != "none") ? Dname : "";
 
} // function

function layer_view_slide(Dgroup,Dnum,Dbase) {

 // 객체가 존재하지 않을 경우 객체 생성
 // 최초의 layer_view() 호출이 있을경우 layer_list[][] 해쉬의 해쉬(2중해쉬생성)
 // layer_list 처음 해쉬는 Dgroup명이고, 두번째 해쉬는 Dnum값이다.
 if (layer_list[Dgroup] == undefined) {
  layer_list[Dgroup] = new Array();					// [레이어 리스트] 해쉬의 해쉬 초기화
  layer_list[Dgroup][Dnum] = 1;							// 레이어 저장
  now_viewed_layer_list[Dgroup] = Dbase;		// [현재 보여지고 있는 레이어 리스트] 초기화
 }

 // 레이어가 존재하지 않으면 
 if (layer_list[Dgroup][Dnum] == undefined) {
  layer_list[Dgroup][Dnum] = 1;			// 레이어 저장
 }

 if (now_viewed_layer_list[Dgroup] == Dnum) {
 	return false;
 }
 
 if (now_viewed_layer_list[Dgroup] != undefined) { 
  var closed_layer = Dgroup + "" + now_viewed_layer_list[Dgroup]; 
  if (getObject(closed_layer)) {  	

   Slide_Obj(closed_layer,"height",function() {
    var rr4 = closed_layer + "_parent";
    if (getObject(rr4)) {
     getObject(rr4).style.display = "none";
    }
   });   
   
  }
 }
   
 // 레이어 보이기
 var Dgroup2 = Dgroup +""+ Dnum;
 
 if (getObject(Dgroup2)) { 

  var rr5 = Dgroup2 + "_parent";
  if (getObject(rr5)) {
  	getObject(rr5).style.display = "";
  }
  Slide_Obj(Dgroup2);  
  now_viewed_layer_list[Dgroup] = Dnum;    
 }

} // function


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function layer_position(target_id,click_id,Ddirect,Drange) {

 if (!click_id) { click_id = get_evt_obj(evt); }

 target_id = _get_object(target_id);

 var out_obj = _get_layer_range(Drange);

//jQuery(target_id).css('display','block');

 var t_w = get_object_size(target_id,"width"); 
 var t_h = get_object_size(target_id,"height"); 

 var m_w = get_object_size(click_id,"width");  
 var m_h = get_object_size(click_id,"height"); 

 var m_x = getRealOffsetLeft(click_id);
 var m_y = getRealOffsetTop(click_id);
 m_y -= jQuery(target_id).parent().offsetParent().offset().top;

 if (!Ddirect || !_direct[Ddirect]) { Ddirect = "up"; }

 var _pos = _direct_get(Ddirect,out_obj,[m_w,m_h,m_x,m_y],[t_w,t_h]);

 if (jQuery(target_id).css('position') == 'fixed') {
	_pos[1] -= _get_body_obj().scrollLeft;
	_pos[2] -=  _get_body_obj().scrollTop;
	if (_pos[1] < 0) { _pos[1] = 0; }
	if (_pos[2] < 0) { _pos[2] = 0; }
 }

 change_pixelLeft(target_id,_pos[1]);
 change_pixelTop(target_id,_pos[2]);

 obj_set_data(target_id,"layer_direct",_pos[0]);

 return _pos[0]; // 방향 리턴

}	//function

function layer_position_xy(target_id,Dx,Dy) {

 var Cid = _get_object(target_id);
 var direct = (Cid["_layer_direct"]) ? Cid["_layer_direct"] : "up" // 레이어 출력방향

 var t_w = get_object_size(target_id,"width") / 2; 
 var t_h = get_object_size(target_id,"height") / 2; 

	if (Dx) {
   var _l = get_pixelLeft(Cid);
   if (direct == "up") { _l = _l + t_w;	}
   _l = (direct == "left") ? (_l - Dx) : (_l + Dx);	   	
   change_pixelLeft(target_id,_l);
	}

	if (Dy) {
   var _t = get_pixelTop(Cid);
   _t = (direct == "up" || direct == "left") ? (_t - Dy) : (_t + Dy);	   	
   change_pixelTop(target_id,_t);   
	}
}	//function

function obj_toggle(Did,DCallback) {
 
 var Cid = _get_object(Did);		
 if (!Cid) { return false; }
 
 var Dvalue, Dreturn;
 if (jQuery(Cid).css("display") == "none") {
 	Dvalue = "block";
 	Dreturn = 1;
 } else {
 	Dvalue = "none";
 	Dreturn = 0; 	
 }

 jQuery(Cid).css("display",Dvalue) 
 //Cid.style.display = Dvalue;
 if (typeof(DCallback) == "function") { DCallback(); }
 return Dreturn;
 
} //function

function slide_toggle(Did,Dhow,DCallback) {

 var Cid = _get_object(Did);		
 if (!Cid) { return false; }

 if (!Dhow) { Dhow = {}; } 
 if (!Dhow["slide"]) { Dhow["slide"] = "down"; }
  
 var Dreturn;

 if (jQuery(Cid).css("display") == "none") {
  layer_slide_view(Did,Dhow,DCallback);
  Dreturn = 1;
 } else {  	
  layer_slide_close(Did,Dhow,DCallback);  
  Dreturn = 0;  
 }
 return Dreturn; 
 
} //function

function layer_slide_view(Did,Dhow,DCallback) {

 var Cid = _get_object(Did);		
 if (!Cid) { return false; }

 if (jQuery(Cid).css("display") != "none") { return false; }

 obj_set_data(Cid); // 데이터 초기화
 var _data = Cid["_data"];

 if (Dhow) {
  Cid = _layer_reset(Cid);
  _layer_slide(Cid,Dhow,0);
 }

 if (_data["_son"]) {

  var son_obj = getObject(_data["_son"]);  

  // 애니메이션 준비
  jQuery(son_obj).css(_data["ani_reset_tag"]);
  jQuery(Cid).css({"display":"block"});
  // 애니메이션

  jQuery(son_obj).animate(_data["ani_tag"],_data["ani_speed"],_data["ani_easing"],DCallback);
 	
 } else { // Dhow 존재하지 않으면
  jQuery(Cid).css("display","block"); 	
 }
 //jQuery(Cid).css('height','auto');

} //function

function layer_slide_stop(Did) {
	
 var Cid = _get_object(Did);		
 if (!Cid) { return false; }

 if (jQuery(Cid).css("display") == "none") { return false; }
 
 obj_set_data(Cid); // 데이터 초기화
 
 var _data = Cid["_data"];

 if (_data["_son"]) { 
  var son_obj = getObject(_data["_son"]);   	
  jQuery(son_obj).stop();
 }
}

function layer_slide_close(Did,Dhow,DCallback) {
	
 var Cid = _get_object(Did);		
 if (!Cid) { return false; }

//alert(Did+"===" +jQuery(Cid).css("display") +"======"+ DCallback);

 if (jQuery(Cid).css("display") == "none") { return false; }

 obj_set_data(Cid); // 데이터 초기화

 if (Dhow) {
  Cid = _layer_reset(Cid);
  _layer_slide(Cid,Dhow,0);
 }
 
 var _data = Cid["_data"];

 if (_data["_son"]) {
  
  var son_obj = getObject(_data["_son"]);  
 
  // 애니메이션 준비
  jQuery(son_obj).css(_data["ani_tag"]);

  // 애니메이션
  jQuery(son_obj).animate(
			_data["ani_reset_tag"]								,
			_data["ani_speed"]										,
			_data["ani_easing"]										,
			function() {	
				jQuery("#"+this["_data"]["parent"]).css("display","none");		
				jQuery(this).css(_data["ani_tag"]);		
				_reset_sss(this);				
				if (DCallback) { eval(DCallback()); }

			}		
  );

 } else { // Dhow 존재하지 않으면
  jQuery(Cid).css("display","none"); 	
 }
 
} //function

var _before_layer;		// 이전 레이어
function layer_view_only(Did,Dhow,DCallback) {

 var Cid = _get_object(Did);		

 // 열려진 레이어 존재하면 닫기
 if (_before_layer != undefined) {
  if (_before_layer == Cid) {
   return false;  	
  } else {
   if (_before_layer._DCallback) {
   	layer_view_only_close(_before_layer,'',_before_layer._DCallback);
   } else {
   	layer_view_only_close(_before_layer);  	   	
   }

  }	
 }

 layer_slide_view(Did,Dhow,DCallback);
 _before_layer = Cid;		// 현재보여진 레이어
 _before_layer._DCallback = DCallback;
 
} //function

function layer_view_only2(Did,Dhow,DCallback) {
 var aa = _before_layer;
 layer_view_only(Did,Dhow,DCallback);
 _before_layer = aa;
} //function

function layer_view_only_close(Did,Dhow,DCallback) {
	
 var Cid = _get_object(Did);		
 layer_slide_close(Did,Dhow,DCallback);
 _before_layer = undefined;		// 현재보여진 레이어

} //function

// 자체함수
/*
https://bitbucket.org/alexg/syntaxhighlighter/issue/220/ie-only-conflict-with-jquery-animate
http://www.echobitz.com/post/Blogengine-Syntaxhighlighter-Error-jQuery-Animate-IE-7-8.aspx
http://nixd3v.com/entry/fixing-syntax-highlighter-XRegExp-errors
*/
function obj_set_data(Did,Dkey,Dvalue) {
 var Cid = _get_object(Did);
 if (!Cid["_data"]) { Cid["_data"] = {}; }
 if (Dkey) { Cid["_data"][Dkey] = Dvalue; }
}

function obj_get_data(Did,Dkey) {
 var Cid = _get_object(Did);
 if (!Cid["_data"]) { Cid["_data"] = {}; }
 if (Cid["_data"][Dkey]) { return Cid["_data"][Dkey]; }
 return false;
}

function _layer_view_only_close(evt) {	
 if (_before_layer == undefined) { return false; }
 layer_view_only_close(_before_layer,'',_before_layer._DCallback);
} //function

function _layer_slide(Did,Dhow) {

 var Cid = _get_object(Did);	
 
 Cid.style.display = "block"; // 필요
 
 // 내용물 크기 변경될 경우 방지 여기서 크기 알아옴
 var son_obj = getObject(Cid["_data"]["_son"]);  

 var _w = get_object_size(son_obj,"width") + "px";
 var _h = get_object_size(son_obj,"height") + "px";  

var _w2 = jQuery(son_obj).css("width");

 if (Cid.style.position == "absolute") {
//  jQuery(Cid).css("width",_w);
//  jQuery(Cid).css("height",_h);      
 }

 var ani_tag = {};
 var ani_reset_tag = {};

 var direct = (_direct[Dhow["slide"]]) ? Dhow["slide"] : (Cid["_data"]["layer_direct"]) ? Cid["_data"]["layer_direct"] : "down" // 레이어 출력방향
     	
 // 슬라이드 적용     
 if (Dhow["slide"] != undefined) {
  if (direct == "down") {
   ani_reset_tag["marginTop"] = "-" + _h;   
   ani_tag["marginTop"] = son_obj["_data"]["marginTop"];

  } else if (direct == "left") {
   ani_reset_tag["marginLeft"] = _w;      
   ani_tag["marginLeft"] = son_obj["_data"]["marginLeft"];   
   
  } else if (direct == "right") {
   ani_reset_tag["marginLeft"] = "-" + _w;      
   ani_tag["marginLeft"] = son_obj["_data"]["marginLeft"];   
  } else {
   ani_reset_tag["marginTop"] = _h;            
   ani_tag["marginTop"] = son_obj["_data"]["marginTop"]; 	      
  }
  
 }

 // 투명도 적용
 if (Dhow["opacity"] != undefined) {
  ani_reset_tag["opacity"] = 0;            
  ani_tag["opacity"] = Dhow["opacity"] / 100;  
 }

 if (!Dhow["speed"]) { Dhow["speed"] = "fast"; }
 if (!Dhow["easing"]) { Dhow["easing"] = "linear"; }

 if (_SET["navigator"] == "ie") {
  ani_tag = _change_animate_var(ani_tag);
  ani_reset_tag = _change_animate_var(ani_reset_tag);
 }

 // 애니메이션 toggle위한 설정
 obj_set_data(Cid,"ani_tag",ani_tag);
 obj_set_data(Cid,"ani_reset_tag",ani_reset_tag);
 obj_set_data(Cid,"ani_speed",Dhow["speed"]);
 obj_set_data(Cid,"ani_easing",Dhow["easing"]);
 
} //function

var obj_css = new Array("left","top","right","bottom","marginTop","marginBottom","marginLeft","marginRight");

function _html_reset(Did) {
	
	var Cid = _get_object(Did);		

	if (Cid["_data"]) {
 		if (Cid["_data"]["_before_html"]) {
 			alert(Cid["_data"]["_before_html"]);
 		}
	} 	
}

function _reset_sss(Did) {

	var Cid = _get_object(Did);		

	if (Cid["_data"]) {
 		if (Cid["_data"]["_before_html"]) {		
 			var cc = jQuery('<div />').html(Cid["_data"]["_before_html"]);
 			jQuery(Cid).unwrap();
 			
 			var dd = new Array('id','class');
 			for (var i=0;i<dd.length;i++) {
 				
 				var tt = jQuery(cc).children().attr(dd[i]);
 				jQuery(Cid).attr(dd[i],tt);
 			}
 			
 			jQuery(Cid).removeAttr('style');
 			
 			jQuery(Cid).css('display','none');
			Cid["_data"]["animate_div"] = undefined;
 		}
	} 	
		
}

function _layer_reset(Did) {

 var Cid = _get_object(Did);		

 // 슬라이드를 위한 초기화
 if (Cid["_data"]["animate_div"]) { return Cid; }

 var _memory = jQuery('<div />').html(jQuery(Cid)[0].outerHTML);
 jQuery(_memory).children().html("");
 obj_set_data(Cid,"_before_html",jQuery(_memory).html());

 var real_css = {};
 for (var i=0;i<obj_css.length;i++) {
  var Cvalue = obj_css[i];
  real_css[Cvalue] = jQuery(Cid).css(Cvalue);
 }

 var _h = jQuery(Cid).outerHeight();
 var _w = jQuery(Cid).outerWidth();
 
 obj_set_data(Cid,"animate_div",1); // 에니매이션 처리 됨

 var _zIndex = jQuery(Cid).css("z-index");
 var _position = jQuery(Cid).css("position");   
 var _float = jQuery(Cid).css("float");

 jQuery(Cid).css("position","static");
 var zd = (_SET["navigator"] == "ie") ? 0 : "auto";
 zd = 0;
jQuery(Cid).css("z-index",zd);  
 var _o_data = Cid["_data"];
 
 var _clone_id = random_id(Cid); // id존재하지 않으면 생성
 var _clone_son_id = _clone_id + "_son";
 
 jQuery(Cid).attr("id",_clone_son_id);			// ID변경 ID + "_son"
 jQuery(Cid).wrap('<div class="slide_empty" id="'+ _clone_id + '" style="display:none"></div>');//.css({offsetWidth:_w});		// ID변경
 jQuery(Cid).css("display","block");
 
 for (var i in real_css) {
  var Cvalue = real_css[i];
  jQuery("#"+_clone_id).css(i,Cvalue);
  var Dvalue = (Cvalue != "auto") ? 0 : "auto";
  jQuery(Cid).css(i,Dvalue);	
 }

 if (_SET["navigator"] == "ie" && _position != "static") {
  //jQuery(Cid).append("<iframe id='" + _clone_id + "_iframe' class='slide_empty_iframe' frameborder='0' scrolling='no' title='익스플로러 곁침에러방지'></iframe>"); 	
 }

 obj_set_data(Cid,"parent",_clone_id);      
 obj_set_data(Cid,"marginTop",0);
 obj_set_data(Cid,"marginLeft",0); 
 
 Cid = getObject(_clone_id);  // Cid 교체 
 Cid["_data"] = _o_data;
 obj_set_data(Cid,"_son",_clone_son_id);   

_w += 1; // 에러때문에 ??????????

 if (_position == "absolute") {
  jQuery(Cid).css({width:_w,height:_h}); 
 }

 jQuery(Cid).css({"overflow":"hidden"}); // 보이기 범위 설정
 if (_zIndex) { jQuery(Cid).css("z-index",_zIndex); }
 if (_position) { jQuery(Cid).css("position",_position); }   
 jQuery(Cid).css("float",_float);

 return Cid;
 
}	//function

/*
Ddirct : 방향
a : 범위(w,h,x,y)
b : 보여질 레이어(w,h,x,y)
c : 클릭된 오브젝트(w,h)
*/
var _direct = {
 "up"			: 		["a","b","c","d","x"],
 "down"		:		["b","a","c","d","x"],
 "left"			:		["c","d","a","b","x"], 
 "right"			:		["d","c","a","b","x"],
 "!up" 			: 		["a","x"],
 "!down"		:		["b","x"],
 "!left"			:		["c","x"], 
 "!right"			:		["d","x"] 
};
function _direct_get(Ddirct,a,b,c) {

 var scroll_obj = _get_body_obj();

 var Dx = 0;
 var Dy = 0;
						
 var _get_direct = {
	a:function() {
			Dx = b[2] + (b[0] / 2) - (c[0] / 2);
			Dy = b[3] - c[1];
		
			// 좌 체크
			var _x1_a = a[2];
			var _x1_b = scroll_obj.scrollLeft;
			var _x = (_x1_a > _x1_b) ? _x1_a : _x1_b;
			if (Dx < _x) { return [0,"up",Dx,Dy]; }

			// 우 체크
			var _x2_a = a[2] + a[0];
			var _x2_b = a[2] + (get_window_size())[0] + scroll_obj.scrollLeft;			
			var _x = (_x2_a > _x2_b) ? _x2_b : _x2_a;			
			if ((Dx + c[0]) > _x) { return [0,"up",Dx,Dy]; }
												
			// 상 체크
			var _y1 = a[3];
			var _y2 = scroll_obj.scrollTop;
			var _y = (_y1 > _y2) ? _y1 : _y2;
			if (Dy < _y) { return [0,"up",Dx,Dy]; }

			return [1,"up",Dx,Dy];
	},
	b:function() {
			Dx = b[2] + (b[0] / 2) - (c[0] / 2);
			Dy = b[3] + b[1];

			// 좌 체크
			var _x1_a = a[2];
			var _x1_b = scroll_obj.scrollLeft;
			var _x = (_x1_a > _x1_b) ? _x1_a : _x1_b;
			if (Dx < _x) { return [0,"down",Dx,Dy]; }

			// 우 체크
			var _x2_a = a[2] + a[0];
			var _x2_b = a[2] + (get_window_size())[0] + scroll_obj.scrollLeft;			
			var _x = (_x2_a > _x2_b) ? _x2_b : _x2_a;			
			if ((Dx + c[0]) > _x) { return [0,"down",Dx,Dy]; }
					
			// 하 체크
			var _y1 = a[3] + a[1];
			var _y2 = (get_window_size())[1] + scroll_obj.scrollTop;

			var _y = (_y1 > _y2) ? _y2 : _y1;		
			if ((Dy + c[1]) > _y) { return [0,"down",Dx,Dy]; }
			
			return [1,"down",Dx,Dy];			
	},
	c:function() {
			Dx = b[2] - c[0];
			Dy = b[3] + (b[1] / 2) - (c[1] / 2);
			
			// 좌 체크
			var _x1_a = a[2];
			var _x1_b = scroll_obj.scrollLeft;
			var _x = (_x1_a > _x1_b) ? _x1_a : _x1_b;
			if (Dx < _x) { return [0,"left",Dx,Dy]; }
			
			// 상 체크
			var _y1 = a[3];
			var _y2 = scroll_obj.scrollTop;
			var _y = (_y1 > _y2) ? _y1 : _y2;
			if (Dy < _y) { return [0,"left",Dx,Dy]; }

			// 하 체크
			var _y1 = a[3] + a[1];
			var _y2 = (get_window_size())[1] + scroll_obj.scrollTop;
			var _y = (_y1 > _y2) ? _y2 : _y1;
			if ((Dy + c[1]) > _y) { return [0,"left",Dx,Dy]; }

			return [1,"left",Dx,Dy];	
	},
	d:function() {  
			Dx = b[2] + b[0];
			Dy = b[3] + (b[1] / 2) - (c[1] / 2);
			
			// 우 체크
			var _x2_a = a[2] + a[0];
			var _x2_b = a[2] + (get_window_size())[0] + scroll_obj.scrollLeft;			
			var _x = (_x2_a > _x2_b) ? _x2_b : _x2_a;		
			var aa = Dx +c[0];
			
			if ((Dx + c[0]) > _x) { return [0,"right",Dx,Dy]; }
			
			// 상 체크
			var _y1 = a[3];
			var _y2 = scroll_obj.scrollTop;
			var _y = (_y1 > _y2) ? _y1 : _y2;
			if (Dy < _y) { return [0,"right",Dx,Dy]; }

			// 하 체크
			var _y1 = a[3] + a[1];
			var _y2 = (get_window_size())[1] + scroll_obj.scrollTop;
			var _y = (_y1 > _y2) ? _y2 : _y1;
			if ((Dy + c[1]) > _y) { return [0,"right",Dx,Dy]; }
					
			return [1,"right",Dx,Dy];		
	},
	x:function() {  
			var _x2 = (get_window_size())[0] + scroll_obj.scrollLeft;		
			var _y2 = (get_window_size())[1] + scroll_obj.scrollTop;
			var Dx = (_x2 - c[0]) / 2;
			var Dy = (_y2 - c[1]) / 2;
			
			return [1,"down",Dx,Dy];			
	}	
 };

 var _first_k = [];
 var _d = [];
 var _ok = 0;
 for (var i=0;i<_direct[Ddirct].length;i++) {
 	var _k = _direct[Ddirct][i];
 	_d = _get_direct[_k]();
 	if (i == 0) { _first_k = _d; } // 에러방지 무조건 처음값으로 설정
  if (_d[0] == 1) {
  	_ok = 1;
  	break;
  }
 }
 
 if (_ok == 0) { _d = _first_k; }
 return [_d[1],_d[2],_d[3]];
}

function _get_layer_range(Did) {

 //if (!Did) { Did = "body_id"; } 

 if (!Did) { Did = jQuery('body')[0] } 

 var _out_obj = _get_object(Did);

 var m_x = getRealOffsetLeft(_out_obj);
 var m_y = getRealOffsetTop(_out_obj);

 var m_w = get_object_size(_out_obj,"width");  
 var m_h = get_object_size(_out_obj,"height"); 

 var as = new Array(m_w,m_h,m_x,m_y);  

 return as;

} //function

jQuery(document).on("dblclick",function(){ _layer_view_only_close(evt); });    