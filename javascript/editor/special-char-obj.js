var circle_bracket = msg_msg('circle','a') + ',' + msg_msg('bracket','a');

var special_char_obj = {
	_char_btn : [
		{		"name"			:		msg_msg('symbols','a')				,		"href"		:		""		}, // "일반기호"
		{		"name"			:		msg_msg('numbers_units','a')	,		"href"		:		""		}, // "숫자와단위"
		{		"name"			:		circle_bracket		,		"href"		:		""		}, // "원,괄호"
		{		"name"			:		msg_msg('korean','a')				,		"href"		:		""		}, // "한글"
		{		"name"			:		msg_msg('greek_latin','a')			,		"href"		:		""		}, // "그리스,라틴어"
		{		"name"			:		msg_msg('japanese','a')			,		"href"		:		""		} // "일본어"
	],
	_char : [	
		["｛","｝","〔","〕","〈","〉","《","》","「","」","『","』","【","】","‘","’","“","”","、","。","·","‥","…","§","※","☆","★","○","●","◎","◇","◆","□","■","△","▲","▽","▼","◁","◀","▷","▶","♤","♠","♡","♥","♧","♣","⊙","◈","▣","◐","◑","▒","▤","▥","▨","▧","▦","▩","±","×","÷","≠","≤","≥","∞","∴","°","′","″","∠","⊥","⌒","∂","≡","≒","≪","≫","√","∽","∝","∵","∫","∬","∈","∋","⊆","⊇","⊂","⊃","∪","∩","∧","∨","￢","⇒","⇔","∀","∃","´","～","ˇ","˘","˝","˚","˙","¸","˛","¡","¿","ː","∮","∑","∏","♭","♩","♪","♬","㉿","→","←","↑","↓","↔","↕","↗","↙","↖","↘","㈜","№","㏇","™","㏂","㏘","℡","♨","☏","☎","☜","☞","¶","†","‡","®","ª","º","♂","♀"],
		["½","⅓","⅔","¼","¾","⅛","⅜","⅝","⅞","¹","²","³","⁴","ⁿ","₁","₂","₃","₄","Ⅰ","Ⅱ","Ⅲ","Ⅳ","Ⅴ","Ⅵ","Ⅶ","Ⅷ","Ⅸ","Ⅹ","ⅰ","ⅱ","ⅲ","ⅳ","ⅴ","ⅵ","ⅶ","ⅷ","ⅸ","ⅹ","￦","\$","￥","￡","€","℃","Å","℉","￠","¤","‰","㎕","㎖","㎗","ℓ","㎘","㏄","㎣","㎤","㎥","㎦","㎙","㎚","㎛","㎜","㎝","㎞","㎟","㎠","㎡","㎢","㏊","㎍","㎎","㎏","㏏","㎈","㎉","㏈","㎧","㎨","㎰","㎱","㎲","㎳","㎴","㎵","㎶","㎷","㎸","㎹","㎀","㎁","㎂","㎃","㎄","㎺","㎻","㎼","㎽","㎾","㎿","㎐","㎑","㎒","㎓","㎔","Ω","㏀","㏁","㎊","㎋","㎌","㏖","㏅","㎭","㎮","㎯","㏛","㎩","㎪","㎫","㎬","㏝","㏐","㏓","㏃","㏉","㏜","㏆"],
		["㉠","㉡","㉢","㉣","㉤","㉥","㉦","㉧","㉨","㉩","㉪","㉫","㉬","㉭","㉮","㉯","㉰","㉱","㉲","㉳","㉴","㉵","㉶","㉷","㉸","㉹","㉺","㉻","ⓐ","ⓑ","ⓒ","ⓓ","ⓔ","ⓕ","ⓖ","ⓗ","ⓘ","ⓙ","ⓚ","ⓛ","ⓜ","ⓝ","ⓞ","ⓟ","ⓠ","ⓡ","ⓢ","ⓣ","ⓤ","ⓥ","ⓦ","ⓧ","ⓨ","ⓩ","①","②","③","④","⑤","⑥","⑦","⑧","⑨","⑩","⑪","⑫","⑬","⑭","⑮","㈀","㈁","㈂","㈃","㈄","㈅","㈆","㈇","㈈","㈉","㈊","㈋","㈌","㈍","㈎","㈏","㈐","㈑","㈒","㈓","㈔","㈕","㈖","㈗","㈘","㈙","㈚","㈛","⒜","⒝","⒞","⒟","⒠","⒡","⒢","⒣","⒤","⒥","⒦","⒧","⒨","⒩","⒪","⒫","⒬","⒭","⒮","⒯","⒰","⒱","⒲","⒳","⒴","⒵","⑴","⑵","⑶","⑷","⑸","⑹","⑺","⑻","⑼","⑽","⑾","⑿","⒀","⒁","⒂"],
		["ㄱ","ㄲ","ㄳ","ㄴ","ㄵ","ㄶ","ㄷ","ㄸ","ㄹ","ㄺ","ㄻ","ㄼ","ㄽ","ㄾ","ㄿ","ㅀ","ㅁ","ㅂ","ㅃ","ㅄ","ㅅ","ㅆ","ㅇ","ㅈ","ㅉ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ","ㅏ","ㅐ","ㅑ","ㅒ","ㅓ","ㅔ","ㅕ","ㅖ","ㅗ","ㅘ","ㅙ","ㅚ","ㅛ","ㅜ","ㅝ","ㅞ","ㅟ","ㅠ","ㅡ","ㅢ","ㅣ","ㅥ","ㅦ","ㅧ","ㅨ","ㅩ","ㅪ","ㅫ","ㅬ","ㅭ","ㅮ","ㅯ","ㅰ","ㅱ","ㅲ","ㅳ","ㅴ","ㅵ","ㅶ","ㅷ","ㅸ","ㅹ","ㅺ","ㅻ","ㅼ","ㅽ","ㅾ","ㅿ","ㆀ","ㆁ","ㆂ","ㆃ","ㆄ","ㆅ","ㆆ","ㆇ","ㆈ","ㆉ","ㆊ","ㆋ","ㆌ","ㆍ","ㆎ"],
		["Α","Β","Γ","Δ","Ε","Ζ","Η","Θ","Ι","Κ","Λ","Μ","Ν","Ξ","Ο","Π","Ρ","Σ","Τ","Υ","Φ","Χ","Ψ","Ω","α","β","γ","δ","ε","ζ","η","θ","ι","κ","λ","μ","ν","ξ","ο","π","ρ","σ","τ","υ","φ","χ","ψ","ω","Æ","Ð","Ħ","Ĳ","Ŀ","Ł","Ø","Œ","Þ","Ŧ","Ŋ","æ","đ","ð","ħ","I","ĳ","ĸ","ŀ","ł","ł","œ","ß","þ","ŧ","ŋ","ŉ","Б","Г","Д","Ё","Ж","З","И","Й","Л","П","Ц","Ч","Ш","Щ","Ъ","Ы","Ь","Э","Ю","Я","б","в","г","д","ё","ж","з","и","й","л","п","ф","ц","ч","ш","щ","ъ","ы","ь","э","ю","я"],
		["ぁ","あ","ぃ","い","ぅ","う","ぇ","え","ぉ","お","か","が","き","ぎ","く","ぐ","け","げ","こ","ご","さ","ざ","し","じ","す","ず","せ","ぜ","そ","ぞ","た","だ","ち","ぢ","っ","つ","づ","て","で","と","ど","な","に","ぬ","ね","の","は","ば","ぱ","ひ","び","ぴ","ふ","ぶ","ぷ","へ","べ","ぺ","ほ","ぼ","ぽ","ま","み","む","め","も","ゃ","や","ゅ","ゆ","ょ","よ","ら","り","る","れ","ろ","ゎ","わ","ゐ","ゑ","を","ん","ァ","ア","ィ","イ","ゥ","ウ","ェ","エ","ォ","オ","カ","ガ","キ","ギ","ク","グ","ケ","ゲ","コ","ゴ","サ","ザ","シ","ジ","ス","ズ","セ","ゼ","ソ","ゾ","タ","ダ","チ","ヂ","ッ","ツ","ヅ","テ","デ","ト","ド","ナ","ニ","ヌ","ネ","ノ","ハ","バ","パ","ヒ","ビ","ピ","フ","ブ","プ","ヘ","ベ","ペ","ホ","ボ","ポ","マ","ミ","ム","メ","モ","ャ","ヤ","ュ","ユ","ョ","ヨ","ラ","リ","ル","レ","ロ","ヮ","ワ","ヰ","ヱ","ヲ","ン","ヴ","ヵ","ヶ"]
 	],
	int : function() {

		var _html = '<div class="edit-tab-1" ani_type="tab(on_class:tab-btn-on,off_class:tab-btn-off,slide:down,accordion:0,speed:300)">';
	  	_html += '<ul>';

		for (var i=0;i<this._char_btn.length;i++) {
			
			var _num = i + 1;
			var _class = 'tab-btn-off';
			var _display = 'none';
			if (i == 0) {
				_class = 'tab-btn-on';
				_display = 'block';
			}

			_html += '<li>';
			_html += '<a id="_tab-menu-special_char_' + _num + '" class="' + _class + '" tab_type="btn(id:tab' + _num + ')">' + this._char_btn[i]['name'] + '</a>';
			_html += '<div class="tab-content" style="display:'+ _display +';" tab_type="content(id:tab' + _num + ')">';
			_html += '<div class="special_char_box">';
			for (var z=0;z<this._char[i].length;z++) {
				_html += '<a onclick="special_char_obj.insert_in_input(\'' + this._char[i][z] + '\');return false;" class="_special_btn">' + this._char[i][z] + '</a>';
			}
			_html += '</div>';			
			_html += '</div>';
			_html += '</li>';
		}
					
		_html += '</ul>';
		_html += '</div>';					

		_html += '<div class="special_char_box2">' +
		'<div class="counter-control-box">' +
			'<span class="counter-control">' +
				'<span class="box-input style-2"><input type="text" id="special_char_input" value="" /></span>' +
				'<span class="box-btn"><button onclick="special_char_obj.insert();return false;" class="input-button"></button></span>' +
			'</span>' +
		'</div>' +			
		'</div>';
					
		edit_window_obj.int("editWindow-special-char",_html,msg_msg('special_characters','a')); // '특수문자 삽입'

	},

	insert_in_input : function(_char) {
		jQuery('#special_char_input').val(jQuery('#special_char_input').val() + _char);
	},
		
	view : function(obj) {
			
		focus_obj.set();
		M9TAB.btn_onclick(jQuery('#_tab-menu-special_char_1')[0]);				
		layer_position("editWindow-special-char",obj,'down');			
		obj_fadeIn('#editWindow-special-char');
		
	},
	
	insert : function() {
		
		focus_obj.set();
		focus_obj.insert(jQuery('#special_char_input').val());
		jQuery('#special_char_input').val('');
		undo_obj._add(editor._obj);
		
	}
	
}; // special_char_obj

var focus_obj = {

	_now : false,

	set : function() {
		RestoreSelection();
		var _focus = SaveSelection();
		if (jQuery(_focus).parents('.m9_editor_box').length == 0) {
			this._now = _focus;		
		}
	},

	insert : function(Dvar) {

		var Dobj = jQuery('body')[0];
		RestoreSelection(this._now);
		var random_class = '__this_is__random_class__' + Math.round(Math.random()*100000);		
		InsertObj('<i id="'+random_class+'">' + Dvar + '</i>');			
		placeCaretAtEnd(jQuery('#'+random_class)[0]);
		var now_caret = getCaretPosition(Dobj);
		
		if (mode_obj.get() != '') {
			editor.mode.adjust_display(jQuery('#'+random_class)[0]);
		} else {
			jQuery('#'+random_class).replaceWith(jQuery('#'+random_class).html());
		}
		setCaretPos(Dobj,now_caret);

	}
};