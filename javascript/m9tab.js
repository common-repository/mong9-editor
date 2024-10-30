var M9TAB = {

//tab-2,tab-3 의 좌우측 1px씩 모자람(다음에 하도록함)

	vars : {
		id : undefined ,
		type : "click" ,
		on_class : undefined ,
		off_class : undefined ,
		slide : undefined ,
		speed : 300 ,
		color_effect : 0,
		url : undefined ,
		resize : 1,
		accordion : 0
	},

	reverse_slide : {
//		up : "down" , down : "up" , left : "right" , right : "left"	
		up : "up" , down : "down" , left : "left" , right : "right"			
	},
		
	_SlideName : "_M9slide" ,
	_SlideCount : 1 ,
	int : function(Did,Deffect) {

		var Cid = _get_object(Did);
		if (!Cid) { return false; } // 객체가 존재하지 않을 경우 무시		

		if (jQuery(Cid).data('_tab') == 1) { return false; }
		jQuery(Cid).data('_tab',1);
		
		var tab_id = random_id(Cid); // id존재하지 않으면 생성
						
		Cid._tab_property = get_vars(Deffect[1],M9TAB.vars);

		var _obj = jQuery(Cid).find("[tab_type]");

		Cid._tab_list = {};
		Cid._tab_btn = {};		
		Cid._tab_content = {};

		for (var i=0;i<_obj.length;i++) {
					
			var _ani = jQuery(_obj[i]).attr("tab_type");
			if (!_ani) { continue; }

     		var prop = get_property(_ani);     
     		var ani = prop[0];

			var btn = _obj[i];

			var _property = get_vars(prop[1],Cid._tab_property);		
			_property["speed"] = _property["speed"] * 1;		
			obj_set_data(btn,"tab_property",_property);
			obj_set_data(btn,"tab_parent",Cid);	// 아버지 객체

			var Tid = _property["id"];
															     				
			if (ani == "btn") {

				var _cont_id = random_id(btn); // id존재하지 않으면 생성
				
				// 버튼 하나 설정
				if (Cid._tab_property["type"] == "over") {
					jQuery(btn).on("mouseover",function(){ M9TAB.btn_onclick(this);return false; });					
				} else {		
					jQuery(btn).on("click",function(){ M9TAB.btn_onclick(this);return false; });
				}

				if (Cid._tab_property['accordion'] != 1) {
					jQuery(btn).on("focus",function(){ M9TAB.btn_onclick(this);return false; });
				}
					
				Cid._tab_btn[Tid] = btn;		

				var _url = jQuery(btn).attr("url");
				if (_url) { btn["_data"]["tab_property"]["url"] = _url; }
							
			} else if (ani == "content") {
						
				btn._zindex = jQuery(btn).css("z-index");

				var _cont_id = random_id(btn); // id존재하지 않으면 생성

				var obj = (jQuery('<div></div>').css({"display":"block",'width':'100%'}))[0];
				obj.id = _cont_id + "_tab_slide";
				jQuery(btn).wrapAll(jQuery(obj));
				
				Cid._tab_content[Tid] = _cont_id;		

				if (jQuery(btn).css("display") != "none") {
					var a_btn_obj = Cid._tab_btn[Tid];

					jQuery(a_btn_obj).removeClass(a_btn_obj["_data"]["tab_property"]["on_class"]).addClass(a_btn_obj["_data"]["tab_property"]["off_class"]);	
					jQuery(btn).css("display","none");
					M9TAB.btn_onclick(a_btn_obj,1);								
				}
			}
			
		}

		Resize_Function.push("M9TAB.resize('"+tab_id+"')");

	}, //int
			
	btn_onclick : function(Did,Dnum) {

		var Cid = _get_object(Did);
		if (!Cid) { return false; }
	
		var _data = Cid["_data"];

		var _parent = _data["tab_parent"];		

		if (_parent["_tab_doing"] == 1) { return false; }

		var Tprop = _data["tab_property"];
		var group_id = Tprop["id"];
						
		var a_btn_obj = _parent._tab_btn[group_id];	
		var a_cont_id = _parent._tab_content[group_id];
		var a_cont_obj = getObject(a_cont_id);		
		
		var btn_prop = a_btn_obj["_data"]["tab_property"];

		if (btn_prop["url"]) {
			ajax_load_contents(btn_prop["url"],a_cont_id+"_tab_slide",'',function(){
				Delay_fuc2("",500,function(){					
					M9TAB._btn_onclick(Did);
				});
			});
			
		} else {
			M9TAB._btn_onclick(Did,Dnum);
		}					
	},
_aaa : 0,				
	_btn_onclick : function(Did,Dnum) {
		
		var Cid = _get_object(Did);
		if (!Cid) { return false; }

		var _data = Cid["_data"];
		
		var _parent = _data["tab_parent"];

		if (_parent["_tab_doing"] == 1) { return false; }
		
		var Tprop = _data["tab_property"];
		var group_id = Tprop["id"];

		var close_group_id = _parent._tab_now;

		if (Tprop['accordion'] == 0 && group_id == close_group_id) { return false; }

		// 앞에 열려진것 닫기		
		if (close_group_id) {

			var a_btn_close_obj = _parent._tab_btn[close_group_id];	
			var a_cont_close_id = _parent._tab_content[close_group_id];
			var a_cont_close_obj = getObject(a_cont_close_id);		

			M9TAB.btn_change(a_btn_close_obj,"off");

			var cont_prop = a_cont_close_obj["_data"]["tab_property"];
	
			if (cont_prop["slide"]) {

				jQuery("#"+a_cont_close_id).css("z-Index",0);			
				var a_cont_close_slide_id = a_cont_close_id + "_tab_slide"; 		
						
				var _slide = M9TAB.reverse_slide[cont_prop["slide"]]; // 반대적용			

				var Dresize = (jQuery(a_cont_close_obj).css("position") == "absolute") ? 1 : 0;
				var direct = (Dresize == 1) ? _slide : "down";					
				layer_slide_close(a_cont_close_slide_id,{slide:direct,speed:cont_prop["speed"],ani_easing:'linear'},function(){			
					jQuery("#"+a_cont_close_id).css("display","none");					
				});
				
			} else {
				jQuery(getObject(a_cont_close_id)).css({display:"none"});				
			}
	
		}

		if (Tprop['accordion'] == 1 && group_id == close_group_id) {
			_parent["_tab_doing"] = 0;		
			_parent._tab_now = '';
			 return false;
		}
		
		// 열기
		var a_btn_obj = _parent._tab_btn[group_id];	
		var a_cont_id = _parent._tab_content[group_id];
		var a_cont_obj = getObject(a_cont_id);				
					
		M9TAB.btn_change(a_btn_obj,"on");

		var cont_prop = a_cont_obj["_data"]["tab_property"];

		var _w,_h = 0;

		var Dresize = (jQuery(a_cont_obj).css("position") == "absolute") ? 1 : 0;

		_parent["_tab_doing"] = 1;

		jQuery("#"+a_cont_id).css("visibility","visible");		
		var _tab_ul = jQuery(a_cont_obj["_data"]["tab_parent"]).children("ul");

		if (cont_prop["slide"]) {

			jQuery("#"+a_cont_id).css("z-Index",a_cont_obj._zindex);		
						
			var a_cont_slide_id = a_cont_id + "_tab_slide"; 				
			
			jQuery(a_cont_obj).css("display","block");  // tab-content
			jQuery("#"+a_cont_slide_id).css("display","block"); //
			jQuery(a_cont_obj).css({height:"auto",overflow:"hidden"});				

			if (cont_prop["resize"] == 1) {			
				var _cap = getRealOffsetTop(a_cont_obj) - getRealOffsetTop(_tab_ul);
				if (_cap < 0) { _cap = _get_num(jQuery(a_cont_obj).css("bottom")); } // tab-4 일경우
				_h += _cap;
				_h += get_object_size(a_cont_obj,"height");
			}	

			jQuery("#"+a_cont_slide_id).css("display","none");
			var direct = (Dresize == 1) ? cont_prop["slide"] : "down";
			var Dspeed = (Dnum == 1) ? 10 : cont_prop["speed"];
			layer_slide_view(a_cont_slide_id,{slide:direct,speed:Dspeed,ani_easing:'linear'},function(){
				if (Dnum != 1) {
  					//if (_SET["mobile_ok"] != 0) {					
  					if (_SET["mobile_ok"] == "Mobile") {  						
						slide_focus_obj(a_btn_obj);		
					}
				}
			});

			if (cont_prop["resize"] == 1) {
				if (Dresize == 1) { //absolute 일경우만					
					jQuery(_parent).animate({"height":_h},cont_prop["speed"],function(){													
						_parent["_tab_doing"] = 0;
					});				
				} else {
					jQuery(_parent).css("height","auto");					
					_parent["_tab_doing"] = 0;					
				}							
			} else {
				_parent["_tab_doing"] = 0;				
			}			

		} else {

			jQuery(a_cont_obj).css({"display":"block"});		

			if (cont_prop["resize"] == 1) {
								
				if (Dresize == 1) { //absolute 일경우만											
					if (cont_prop["resize"] == 1) {
						var _cap = getRealOffsetTop(a_cont_obj) - getRealOffsetTop(_tab_ul);
						if (_cap < 0) { _cap = _get_num(jQuery(a_cont_obj).css("bottom")); } // tab-4 일경우
						_h += _cap;
						_h += get_object_size(a_cont_obj,"height");						
					}
					jQuery(_parent).css({"height":_h});						
				} else {
					jQuery(_parent).css("height","auto");						
				}
				
			}
			_parent["_tab_doing"] = 0;			
		}
		_parent._tab_now = group_id;
	},

	btn_change : function(Cid,Dswith) {

		var Tprop = Cid["_data"]["tab_property"];

		_Icon_Auto_Change(Cid,(Dswith == "on") ? 1 : 0); // 아이콘 자동변경
		
		if (Tprop["color_effect"] == 1) {
			
			if (Dswith == "on") {
				M9COLOR.toggle(Cid,{"class":Tprop["on_class"],"time":Tprop["speed"]},function(){
					jQuery(Cid).removeClass(Tprop["off_class"]).addClass(Tprop["on_class"]);	
				});
			} else {
				M9COLOR.toggle(Cid,{"class":Tprop["off_class"],"time":Tprop["speed"]},function(){
					jQuery(Cid).removeClass(Tprop["on_class"]).addClass(Tprop["off_class"]);
				});		
			}
			
		} else {

			if (Dswith == "on") {
				jQuery(Cid).removeClass(Tprop["off_class"]).addClass(Tprop["on_class"]);			
			} else {
				jQuery(Cid).removeClass(Tprop["on_class"]).addClass(Tprop["off_class"]);					
			}
						
		}
	},

	resize : function(Did) {

		var Cid = _get_object(Did);		
		if (!Cid) { return false; }
	
		var group_id = Cid._tab_now;

		var a_btn_obj = Cid._tab_btn[group_id];	
		var a_cont_id = Cid._tab_content[group_id];
		var a_cont_obj = getObject(a_cont_id);		
					
		var Dresize = (jQuery(a_cont_obj).css("position") == "absolute") ? 1 : 0;
		
		if (Dresize == 1) { //absolute 일경우만		
			var _h = get_object_size(a_cont_obj,"height");
			jQuery(Cid).css("height",_h);
		} else {
			jQuery(Cid).css("height","auto");			
		}				
															
	}	

};
	
	
// 본문 목차 찾아가기
function slide_focus_obj(Cid) {
 var scroll_obj = _get_body_obj();
 var scroll_top = scroll_obj.scrollTop;
 var Did_top = getRealOffsetTop(Cid);
 jQuery(scroll_obj).animate({scrollTop:Did_top},500,"swing");
} //function	