var ani_type_obj = {

	'possible_type' : { 'google_map' : 1 },

	'checking' : function(obj) {

		jQuery(obj).find('[ani_type]').each(function() {

			var _ani_types = [];
			var ani = jQuery(this).attr("ani_type");
			var _anis = ani.split(";");

			for (var m=0;m<_anis.length;m++) {
				var _ani = _anis[m];
				var prop = get_property(_ani);

				if (ani_type_obj.possible_type[prop[0]]) {
					_ani_types.push(prop);
				}
			}

			for(var i=0;i<_ani_types.length;i++) {
				if (_ani_types[i][0] == "google_map") {			
					GOOGLE_MAP.int(this,_ani_types[i],1);					
				}
			}
		});

	}
		
};
