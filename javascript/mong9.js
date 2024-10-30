function _get_num(Dstr) {
	Dstr = Dstr +"a";
	var rgExp = /[-\d\.]+/;
	var Cstr = Dstr.match(rgExp);
	if (Cstr == null) { Cstr = ""; }
	return Cstr * 1;
} // function

/*
/////////////////////////////////////////////////////
	delay(����) �ֱ� �Լ�
	�μ� : ������,�Լ�,��
		������=> �ߺ������� ���� ������ ��
/////////////////////////////////////////////////////		
*/
var _delay_obj = {};
var _delay;   

var _delay_empty_no = 0;
function Delay_fuc2(Dname,Ddelay,Dfunc) {

	if (Dname == "" || Dname == undefined) {
		_delay_empty_no++;
		Dname = "_Delay_" + _delay_empty_no;
	}

	if (!_delay_obj[Dname]) { // ������ �ѹ� ������ ����
 	
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

//////////////////////////////////////////////////////////
// ������¡ ����
//////////////////////////////////////////////////////////
jQuery(function() {

	mode_obj.int(1);

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
			_before_screen_w = _now_screen_w;
			
			mode_obj.Responsive();
	
		});
						
	}

	mode_obj.Responsive();

});
