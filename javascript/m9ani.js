var M9COLOR,M9SLIDE,M9MOVIE,M9TAB,M9SELECTBOX,M9RESIZE_IMG,GOOGLE_MAP,M9BANNER;




var size_etc_w = new Array("marginLeft","marginRight");
var size_etc_h = new Array("marginTop","marginBottom");

function get_size_etc(Did,Dtype) {

	var Cid = _get_object(Did);
	if (!Cid) { return false; }
	
	var w = jQuery(Cid).outerWidth() - _get_num(jQuery(Cid).css("width"));
	var h = jQuery(Cid).outerHeight() - _get_num(jQuery(Cid).css("height"));	

	if (Dtype == 1) {
		for (var i=0;i<size_etc_w.length;i++) {
			w += _get_num(jQuery(Cid).css(size_etc_w[i]));
		}
		for (var i=0;i<size_etc_h.length;i++) {
			h += _get_num(jQuery(Cid).css(size_etc_h[i]));
		}
	}
	return [w,h];
}


// 자신의 속 사이즈(넓이,높이) 얻기
// 리턴값 : [width,height]
// width - (border,padding)
// height - (border,padding)
function get_in_size(Did,Dtype) {

	var Cid = _get_object(Did);
	if (!Cid) { return false; }
		
	var w = _get_num(jQuery(Cid).css("width"));
	var h = _get_num(jQuery(Cid).css("height"));	

	if (Dtype != 1) {
		var size_etc = get_size_etc(Cid);
		w -= size_etc[0];
		h -= size_etc[1];
	}
	return [w,h];				
 
} //function


var obj_css = new Array("left","top","right","bottom","marginTop","marginBottom","marginLeft","marginRight");


/*
아이콘 자동 변경
<span class="icon" icon_change="icon2"></span>
icon_change값으로 변경한다.
연동 함수 : M9COLOR, M9TAB
*/
function _Icon_Auto_Change(Did,Dkind) {

	var Cid = _get_object(Did); 

	if (!Cid["_data"]) { Cid["_data"] = {}; }
	if (Cid["_data"]["icon_change"]) {
		if (Cid["_data"]["icon_change"] == "1") {
			_icon_change_excute(Did,Dkind);			 			
			return false; 
		}
	} else {
		obj_set_data(Cid,"icon_change","0"); 				
	}

	var icon_list = [];
	var _kids = jQuery(Cid).children();
	for (var i=0;i<_kids.length;i++) {

		var Dobj = _kids[i];
					
		var icon_be = jQuery(Dobj).attr("icon_change");
		if (!icon_be) { continue; }
						
 		var Cstr = _get_object(Dobj).className;
		if (!Cstr) { continue; }
 
 		obj_set_data(Dobj,"icon_class1",Cstr+""); // 문자열
		obj_set_data(Dobj,"icon_class2",icon_be+""); // 문자열	

		icon_list.push(Dobj);
		
		obj_set_data(Cid,"icon_change","1"); 	
		
	}

	if (Cid["_data"]["icon_change"] == "1") {
 		obj_set_data(Cid,"icon_list",icon_list); 		
		_icon_change_excute(Did,Dkind);			 	
	}
}

function _icon_change_excute(Did,Dkind) {

	var Cid = _get_object(Did); 
	var Dobj = Cid["_data"]["icon_list"];

	for (var i=0;i<Dobj.length;i++) {
		var Cobj = Dobj[i];
 		var Dstr = _get_object(Cobj).className;	
		if (Dkind == 1) {
			//alert(Cobj["_data"]["icon_class1"]+"=="+Cobj["_data"]["icon_class2"]);
		 	jQuery(Cobj).removeClass(Cobj["_data"]["icon_class1"]).addClass(Cobj["_data"]["icon_class2"]);				
		 	//jQuery(Cobj).addClass(Cobj["_data"]["icon_class2"]);			 	
		} else {	
		 	jQuery(Cobj).removeClass(Cobj["_data"]["icon_class2"]).addClass(Cobj["_data"]["icon_class1"]);				
		 	//jQuery(Cobj).addClass(Cobj["_data"]["icon_class1"]);			 	
		}
	}
		
}

//////////////////////////////////////////////////
// 기타 필요함수
//////////////////////////////////////////////////
function set_ani_status(Did,Dstatus) {
 var Cid = _get_object(Did);	
 Cid._doing = Dstatus;
}

function get_ani_status(Did) {
 var Cid = _get_object(Did);	
 return ((!Cid._doing) ? 0 : Cid._doing); 
}

function get_event() {
 return (_SET["navigator"] == "firefox" || _SET["navigator"] == "opera") ? evt : event;						
}

function get_vars(Dvars,Dint) {

 var new_vars = {};
 
 if (Dvars) {
 	for (var i in Dint) {
 		new_vars[i] = (Dvars[i] && Dvars[i] != "undefined") ? Dvars[i] : Dint[i];
 	}
 	return new_vars;
 } else {
 	return Dint;
 }
	
}

function move_wrapper(Did,wrapper_name) {

 var Cid = _get_object(Did);

if (Cid[wrapper_name]) { return false; }

 var Cw = get_object_size(Cid,"width") + "px";
 var Ch = get_object_size(Cid,"height") + "px";
 
 jQuery(Cid).wrap("<div></div>"); 

 var wrapper = jQuery(Cid).parent();
 wrapper.css({position:"absolute",width:Cw,height:Ch,"bor1der":"2px dotted yellow"});
 Cid[wrapper_name] = wrapper[0];

 if (!Cid._move_wrap) {
 	Cid._move_wrap = [];
 }
 Cid._move_wrap.push(wrapper);

} //function

function ani_wrapper_reset(Did) {

 var Cid = _get_object(Did);
 if (!Cid._wrapper) { return false; }

 var _style = obj_get_data(Cid,'style');
 var _class = obj_get_data(Cid,'class');
 jQuery(Cid).attr('style',obj_get_data(Cid,'style'));
 jQuery(Cid).attr('class',obj_get_data(Cid,'class'));
 jQuery(Cid._wrapper)[0].outerHTML = Cid.outerHTML;
  
 ani_wrapper(Did);
 
} //function

function ani_wrapper(Did,Dtype) {

 var Cid = _get_object(Did);
 if (Cid._wrapper) { return false; }

 obj_set_data(Cid,'style',jQuery(Cid).attr('style'));
 obj_set_data(Cid,'class',jQuery(Cid).attr('class'));
  
 var real_css = {};
 for (var i=0;i<obj_css.length;i++) {
  var Cvalue = obj_css[i];
  real_css[Cvalue] = jQuery(Cid).css(Cvalue);
 }

 var Cdisplay = jQuery(Cid).css("display");

 // ie7이하 inline-block 존재하지 않음
 if (Cdisplay == "inline") {
  if (ie_var > 7) { 	
   jQuery(Cid).css("display","inline-block"); // 크기 알아오기 위함
  } else {
   jQuery(Cid).css("zoom","1"); // 크기 알아오기 위함  	
  }
 }

 // 크기가 %일경우 wrap 후 %로 적용된다. 그래서 px로 재설정
 jQuery(Cid).css('width',jQuery(Cid).css("width"));
 jQuery(Cid).css('height',jQuery(Cid).css("height")); 

 var Cw = get_object_size(Cid,"width") + "px";
 var Ch = get_object_size(Cid,"height") + "px";
 
 var Cposition = jQuery(Cid).css("position");
 var Cfloat = jQuery(Cid).css("float");
 if (Dtype == 1) {
  //jQuery(Cid).wrap('<div style="bo1rder:1px solid red;backgr1ound:#eee;vertical-align:middle"></div>');
  jQuery(Cid).wrap('<div></div>');  
 } else {
  //jQuery(Cid).wrap('<span style="bo1rder:1px solid blue;backg1round:green;vertical-align:middle"></span>'); 	
  jQuery(Cid).wrap('<span></span>'); 	  
 }

 var wrapper = jQuery(Cid).parent();
 Cid._wrapper = wrapper[0];

 if (Cposition == 'static') {
  Cposition = 'relative'; 	
 }
 wrapper.css({position:Cposition,display:Cdisplay,width:Cw,height:Ch});  
 // ie7이하 inline-block 존재하지 않음
 if (Cdisplay == "inline") {
  if (ie_var > 7) { 	
   wrapper.css("display","inline-block"); // 크기 알아오기 위함
  } else {	
   wrapper.css("zoom","1"); // 크기 알아오기 위함  	
  }
 }
  
 if (Cfloat != "none") { wrapper.css({float:Cfloat}); }

 jQuery(Cid).css({position:"absolute",display:Cdisplay});  
 
 for (var i in real_css) {
  var Cvalue = real_css[i];
  if (Cvalue != "auto"){
   jQuery(wrapper).css(i,Cvalue);
  }
  var Dvalue = (Cvalue != "auto") ? 0 : "auto";
  jQuery(Cid).css(i,Dvalue);	
 }

 jQuery(Cid).css({top:0,left:0}); //Cid는 absolute값을 가지므로 0,0 대입
 //wrapper.css("verticalAlign",jQuery(Cid).css("verticalAlign")); // vertical-align값을 wrapper에 적용

} //function

















M9ANI = {

	reset : function(Did,Deffect) {

		var Cid = _get_object(Did);
		if (!Cid) { return false; } // 객체가 존재하지 않을 경우 무시

		var ani_name = Deffect[0];

		if (ani_name == "btn") { ani_name = "fade"; Deffect[1] = {}; }		
		
		if (!M9ANI[ani_name]) {
			return false; // 존재하지 않은 애니메이션 호출시 무시
		} else {
			if (M9ANI[ani_name]["extend"]) { M9ANI[ani_name]["extend"](Did,Deffect); return false; }		// 외부 파일 확장 슬롯			
		}

		if (M9ANI[ani_name].setting) { M9ANI[ani_name].setting(Did); }
		
		M9ANI.ani_reset(Did,ani_name,Deffect[1]);

		if (M9ANI[ani_name].aftersetting) { M9ANI[ani_name].aftersetting(Did); }
		   		
	},
 
	effect : function(Did) {

		//var evt_obj = (_SET["navigator"] == "firefox" || _SET["navigator"] == "opera") ? evt : event; // 이벤트 변경전 캐치
		var evt_obj = window.event;
		var o = Did._ani[evt_obj.type];
			  
 		for(var i=0;i<o.length;i++) {
 			var ex = o[i];
			M9ANI[ex][evt_obj.type](Did); // 애니메이션 실행
		}

	},

	ani_reset : function(Did,ani_name,Deffects) {

		if (!Did._ani) { Did._ani = {};	}
		if (!Did._ani_property) { Did._ani_property = {};	}

		if (Deffects) {

			var aa = M9ANI[ani_name].vars;
			aa["type"] = "load"; // load항목 추가
			Did._ani_property[ani_name] = {};
			var bb = Did._ani_property[ani_name];
			for (var z in aa) {
				bb[z] = (!Deffects[z]) ? aa[z] : Deffects[z];
			}			

			if (Deffects["type"] == "event") {
				return false; // 이벤트 부여 안함
			}
					
		} else {
			Did._ani_property[ani_name] = M9ANI[ani_name].vars;
			Did._ani_property[ani_name]["type"] = "load"; // load항목 추가			
		}

		var ev = M9ANI[ani_name].events; // 이벤트 종류

		var event_selecter = (Did._selecter) ? Did._selecter : Did;
		
		for (var i=0;i<ev.length;i++) {
			
			var e_kind = ev[i];

			if (!Did._ani[e_kind]) {
				
				Did._ani[e_kind] = [];

				var e_kind2 = e_kind;
				if (e_kind2 == "mouseover") {
					e_kind2 = "mouseenter";
				} else if (e_kind2 == "mouseout") {
					e_kind2 = "mouseleave";	
				}

				// 이벤트 활성화
				jQuery(event_selecter).on(e_kind2,function() {
					var ee = window.event.type;
					if (Did._lastevent == ee) { return false; }
					Did._lastevent = ee;
					M9ANI.effect(Did); 
				});
			
			}
			
			Did._ani[e_kind].push(ani_name); // 이벤트 추가
				
		}

	},	
	propertys : function(Did,ani_name,Deffects) {
		
		var Cid = _get_object(Did);
		if(!Cid) { return false; }

		if (!Deffects) { return false; }
		
			var Dprop = Cid._ani_property[ani_name];
			if (!Dprop) { return false; }
			for (var i in Deffects) {
				if (Deffects[i] == "undefined") { Deffects[i] = undefined; }
				Dprop[i] = Deffects[i];
				if (i == "o_time" || i == "a_time") { Dprop[i] = Dprop[i]*1; }
			}

	},
	
	_load_stay_obj : {},
	_load_stay : function(Deffect) {
		if (M9ANI._load_stay_obj[Deffect]) {	
			for (var i=0;i<M9ANI._load_stay_obj[Deffect].length;i++) {
				M9ANI._load_stay_obj[Deffect][i]();
			}
			M9ANI._load_stay_obj[Deffect] = undefined;	
		}		
	}

} //M9ANI





M9ANI["google_map"] = {
	extend : function(Did,Deffect) {
		//ImportScript(_SET["data_polder"] + "/javascript/google_map.js");
		//ImportScript("https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false");		
		//<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false"></script>
		
		Delay_fuc2("",1000,function() {		
			if (typeof(GOOGLE_MAP) != "undefined") {
				GOOGLE_MAP.int(Did,Deffect);
			} else {		
				if (!M9ANI._load_stay_obj["google_map"]) { M9ANI._load_stay_obj["google_map"] = [];	}
				M9ANI._load_stay_obj["google_map"].push(function() { GOOGLE_MAP.int(Did,Deffect); });
			}
		});
	}	
};

// 편집기 설정창에서 에러남
M9ANI["tab"] = {
	extend : function(Did,Deffect) {

		var _extend = function() {
		Delay_fuc2("",500,function() {				
			M9TAB.int(Did,Deffect);
		});
		};
		ImportScript(_SET["data_polder"] + "/javascript/m9tab.js",_extend);	
		
/*
		var _extend = function() {
		//Delay_fuc2("",1500,function() {					
			jQuery(Did).css("background","red");
			if (typeof(M9TAB) != "undefined") {
			jQuery(Did).css("background","blue");				
				M9TAB.int(Did,Deffect);
			} else {		
			jQuery(Did).css("background","yellow");				
				if (!M9ANI._load_stay_obj["tab"]) { M9ANI._load_stay_obj["tab"] = [];	}
				M9ANI._load_stay_obj["tab"].push(function() { alert(Deffect);M9TAB.int(Did,Deffect); });
			}
		//});			
		};

*/

	



/*							
		ImportScript(_SET["data_polder"] + "/javascript/m9tab.js");	


		Delay_fuc2("",2000,function() {		// 좀 걸림???
			if (typeof(M9TAB) != "undefined") {
			jQuery(Did).css("background","blue");						
				M9TAB.int(Did,Deffect);
			} else {		
			jQuery(Did).css("background","yellow");							
				if (!M9ANI._load_stay_obj["tab"]) { M9ANI._load_stay_obj["tab"] = [];	}
				M9ANI._load_stay_obj["tab"].push(function() { M9TAB.int(Did,Deffect); });
			}
		});

*/
	

		
	}	
};




GOOGLE_MAP = {

	vars : {
		'x' : 126.9753042,		
		'y' : 37.5599416,
		'zoom' : 17,
		'title' : 'Sungnyemun',
		'address' : '40, Sejong-daero, Jung-gu, Seoul, Republic of Korea'
	},

	int : function(Did,Deffect,_type) {

		var _func = function() {
			var Cid = _get_object(Did);
			if (!Cid) { return false; } // 객체가 존재하지 않을 경우 무시
			Cid._resize_property = get_vars(Deffect[1],GOOGLE_MAP.vars);
			GOOGLE_MAP.set(Did,Cid._resize_property,_type);
		};

		var _rand = jQuery('<div />');

		ajax_load_contents(_SET["domain"]+'/wp-admin/admin-post.php?action=get-google-map-key',_rand[0],{},function() {
			var google_token = _rand.text();
			if (google_token != '') {
				ImportScript('https://maps.googleapis.com/maps/api/js?key=' + google_token,_func);					
			} else {
				ImportScript('https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false',_func);	
			}
	});
			
	},

	set : function(Did,Deffect,_type) {

		var Cid = _get_object(Did);
		if (!Cid) { return false; } // 객체가 존재하지 않을 경우 무시	

		jQuery(Cid).data('original_style',jQuery(Cid).attr('style'));

		var Y_point        = Deffect['y'] * 1;    // lat 값 
		var X_point        = Deffect['x'] * 1;  // lng 값 

		var zoomLevel      = Deffect['zoom'] * 1;  // 첫 로딩시 보일 지도의 확대 레벨 
	
		var markerTitle    = Deffect['title'];  // 현재 위치 마커에 마우스를 올렸을때 나타나는 이름 
		var markerMaxWidth = 300;  // 마커를 클릭했을때 나타나는 말풍선의 최대 크기 
	
		// 말풍선 내용 
		var contentString	= '<div>' + 
			'<div>'+ 
				'<span class="map_head">'+markerTitle+'</span>'+ 
			'</div>'+ 
			'<div class="map_content">'+ 
				Deffect['address'] + 
			'</div>'+ 
		'</div>'; 

		var myLatlng = new google.maps.LatLng(Y_point,X_point); 

		var mapOptions = { 
			zoom: zoomLevel, 
			center: myLatlng, 
			mapTypeId: google.maps.MapTypeId.ROADMAP
	 	};

		var map = new google.maps.Map(Cid, mapOptions); 	

		var draggabled =  (_type == 1) ? true : false;
		var marker = new google.maps.Marker({ 
			position: myLatlng, 
			map: map, 
			draggable:draggabled, 
			panControl: true,
			animation: google.maps.Animation.DROP
			//title: markerTitle 
		}); 

		var infowindow = new google.maps.InfoWindow({ 
			content: contentString, 
			maxWidth: markerMaxWidth 
		}); 
	
		infowindow.open(map,marker); 

		jQuery(Cid).data('google_map',{ 'lang' : myLatlng, 'map' : map , 'marker' : marker });	

		google.maps.event.addDomListener(window,"resize",function() { //리사이즈에 따른 마커 위치
			var center = map.getCenter();
			google.maps.event.trigger(map,"resize");
			map.setCenter(center); 
		});

		google.maps.event.addListenerOnce(map,'idle',function() {
			google.maps.event.trigger(map,'resize');
		});

		//jQuery(Cid).addClass('_setting');
				
		if (_type == 1) {
			google.maps.event.addListener(marker,"drag",function() {			
				jQuery('#_google_y_pos').val(this.position.lat());
				jQuery('#_google_x_pos').val(this.position.lng());			  
			});
			google.maps.event.addListener(map,'zoom_changed',function() {
		      jQuery('#_google_zoom').val(map.getZoom());
				var latLng = marker.getPosition(); // returns LatLng object
				map.setCenter(latLng); // setCenter takes a LatLng object
		    });			
		}	
	
	}
};







var ANI = new Object();

/*
ANI.pro11pertys = function(Did,ani_name,Deffects) {
	M9ANI.propertys(Did,ani_name,Deffects);
}
*/	

/*
ANI.lean = function(Did,Dhash) {
	M9ANI.reset(Did,["lean",Dhash]);	
}
*/



var ani_list = {
	"flash"				:		M9ANI						,
	"fade"				:		M9ANI						,
	"bounce"		:		M9ANI						,
	"shake"			:		M9ANI						,
	"scale"				:		M9ANI						,
	"rotate"			:		M9ANI						,	
	"vflip"				:		M9ANI						,							
	"hflip"				:		M9ANI						,
	"lean"				:		M9ANI						,	
	"color"				:		M9COLOR					,
	"slide"				:		M9SLIDE					,
	"movie"			:		M9MOVIE					,		
	"tab"				:		M9TAB						,
	"selectbox"		:		M9SELECTBOX			,
	"resize"			:		M9RESIZE_IMG	,
	"banner"			:		M9BANNER
};

ANI.run = function(Dani_kind,Did,Dhash) {

	if (typeof(ani_list[Dani_kind]) == "undefined") {	
		return false;
	}
	var Pid = jQuery(Did);
	if (Pid.length == 0) {
		var obj = getObject(Did);
		if (typeof(obj) == "object") { Pid.push(Did); }  
	}
	for(var i=0;i<Pid.length;i++) {	
		M9ANI.reset(Pid[i],[Dani_kind,Dhash]);	
	}
}

ANI.propertys = function(Dani_kind,Did,Dhash) {
	if (typeof(ani_list[Dani_kind]) == "undefined") {	
		return false;
	}
	var Pid = jQuery(Did);
	if (Pid.length == 0) {
		var obj = getObject(Did);
		if (typeof(obj) == "object") { Pid.push(Did); }  
	}
	for(var i=0;i<Pid.length;i++) {	
		M9ANI.propertys(Pid[i],Dani_kind,Dhash);	
	}
}

