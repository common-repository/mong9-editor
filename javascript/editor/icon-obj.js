
var icon_obj = {

	_now : false,
	_selected : false,
	
	_icons_company : [
		{ 'name' : 'Material Design Icons' },
		{ 'name' : 'Font Awesome' },		
		{ 'name' : 'ionicons' },		
		{ 'name' : 'Feather' },		
		{ 'name' : 'Meteocons' },		
		{ 'name' : 'AXIcon' }								
	],
	_icons_group : [
	
		/* Google Material Design Icons 구글 머티리얼 디자인 아이콘 */
		[
			{ 'name' : 'action', 'icon' : ['3d-rotation','accessibility','account-balance','account-balance-wallet','account-box','account-child','account-circle','add-shopping-cart','alarm-add','alarm','alarm-off','alarm-on','android','announcement','aspect-ratio','assessment','assignment','assignment-ind','assignment-late','assignment-returned','assignment-return','assignment-turned-in','autorenew','backup','bookmark','bookmark-outline','book2','bug-report','cached','class','credit-card','dashboard','delete2','description','dns','done-all','done','event','exit-to-app','explore','extension','face-unlock','favorite','favorite-outline','find-in-page','find-replace','flip-to-back','flip-to-front','get-app','grade','group-work','help2','highlight-remove','history','home','https','info','info-outline','input','invert-colors','label','label-outline','language','launch','list','lock2','lock-open','lock-outline','loyalty','markunread-mailbox','note-add','open-in-browser','open-in-new','open-with','pageview','payment','perm-camera-m','perm-contact-cal','perm-data-setting','perm-device-info','perm-identity','perm-media','perm-phone-msg','perm-scan-wifi','picture-in-picture','polymer','print','query-builder','question-answer','receipt','redeem','reorder','report-problem','restore','room','schedule','search3','settings-applications','settings-backup-restore','settings','settings-bluetooth','settings-cell','settings-display','settings-ethernet','settings-input-antenna','settings-input-component','settings-input-composite','settings-input-hdmi','settings-input-svideo','settings-overscan','settings-phone','settings-power','settings-remote','settings-voice','shopping-basket','shopping-cart','shop','shop-two','speaker-notes','spellcheck','stars','star-rate','store','subject','supervisor-account','swap-horiz','swap-vert','swap-vert-circle','system-update-tv','tab','tab-unselected','theaters','thumbs-up-down','thumb-down','thumb-up','toc','today','track-changes','translate','trending-down','trending-neutral','trending-up','turned-in','turned-in-not','verified-user','view-agenda','view-array','view-carousel','view-column','view-day','view-headline','view-list','view-module','view-quilt','view-stream','view-week','visibility','visibility-off','wallet-giftcard','wallet-membership','wallet-travel','work'] },	
			{ 'name' : 'alert', 'icon' : ['error','warning'] },	
			{ 'name' : 'AV', 'icon' : ['album','av-timer','closed-caption','equalizer','explicit','fast-forward2','fast-rewind','games','hearing','high-quality','loop','mic','mnone','moff','movie','my-library-add','my-library-books','my-library-mus','new-releases','not-interested','pause2','pause-circle-fill','pause-circle-outline','playlist-add','play-arrow','play-circle-fill','play-circle-outline','play-shopping-bag','queue','queue-mus','radio','recent-actors','repeat2','repeat-one','replay','shuffle2','skip-next','skip-previous','snooze','stop2','subtitles','surround-sound','videocam','videocam-off','video-collection','volume-down','volume-mute','volume-off','volume-up','web'] },			
			{ 'name' : 'Communication', 'icon' : ['business','call','call-end','call-made','call-merge','call-missed','call-received','call-split','chat','clear-all','comment','contacts','dialer-sip','dialpad','dnd-on','email','forum','import-export','invert-colors-off','invert-colors-on','live-help','location-off','location-on','message','messenger','no-sim','phone','portable-wifi-off','quick-contacts-dialer','quick-contacts-mail','ring-volume','stay-current-landscape','stay-current-portrait','stay-primary-landscape','stay-primary-portrait','swap-calls','textsms','voicemail','vpn-key'] },	
			{ 'name' : 'Content', 'icon' : ['add','add-box','add-circle','add-circle-outline','archive2','backspace','block','clear','content-copy','content-cut','content-paste','create','drafts','filter-list','flag2','forward','gesture','inbox2','link2','mail2','markunread','redo','remove','remove-circle','remove-circle-outline','reply-all','reply2','report','save','select-all','send','sort','text-format','undo'] },			
			{ 'name' : 'Device', 'icon' : ['access-alarms','access-alarm','access-time','add-alarm','airplanemode-off','airplanemode-on','battery-alert','battery-charging-full','battery-full','battery-unknown','bluetooth','bluetooth-connected','bluetooth-disabled','bluetooth-searching','brightness-auto','brightness-high','brightness-low','brightness-medium','data-usage','developer-mode','devices','dvr','gps-fixed','gps-not-fixed','gps-off','location-disabled','location-searching','multitrack-audio','nfc','now-wallpaper','now-widgets','screen-lock-landscape','screen-lock-portrait','screen-lock-rotation','screen-rotation','sd-storage','settings-system-daydream','signal-cellular-no-sim','network-cell','signal-cellular-off','signal-cellular-connected-no-internet-0-bar','signal-cellular-null','network-wifi','signal-wifi-off','signal-wifi-statusbar-connected-no-internet','signal-wifi-statusbar-not-connected','wifi-lock','signal-wifi-statusbar-null','wifi-tethering','storage','usb'] },	
			{ 'name' : 'Editor', 'icon' : ['attach-file','attach-money','border-all','border-bottom','border-clear','border-color','border-horizontal','border-inner','border-left','border-outer','border-right','border-style','border-top','border-vertical','format-align-center','format-align-justify','format-align-left','format-align-right','format-bold','format-clear','format-color-fill','format-color-reset','format-color-text','format-indent-decrease','format-indent-increase','format-ital','format-line-spacing','format-list-bulleted','format-list-numbered','format-paint','format-quote','format-size','format-strikethrough','format-textdirection-l-to-r','format-textdirection-r-to-l','format-underline','functions','insert-chart','insert-comment','insert-drive-file','insert-emoticon','insert-invitation','insert-link','insert-photo','merge-type','mode-comment','mode-edit','publish','vertical-align-bottom','vertical-align-center','vertical-align-top','wrap-text'] },	
			{ 'name' : 'File', 'icon' : ['attachment','cloud','cloud-circle','cloud-done','cloud-download2','cloud-off','cloud-queue','cloud-upload2','file-download','file-upload','folder2','folder-open','folder-shared'] },	
			{ 'name' : 'Hardware', 'icon' : ['cast','cast-connected','computer','desktop-mac','desktop-windows','dock','gamepad','headset','headset-m','keyboard-alt','keyboard-arrow-down','keyboard-arrow-left','keyboard-arrow-right','keyboard-arrow-up','keyboard-backspace','keyboard','keyboard-capslock','keyboard-control','keyboard-hide','keyboard-return','keyboard-tab','keyboard-voice','laptop','laptop-chromebook','laptop-mac','laptop-windows','memory','mouse','phonelink','phonelink-off','phone-android','phone-iphone','security','sim-card','smartphone','speaker','tablet-android','tablet','tablet-mac','tv','watch3'] },	
			{ 'name' : 'Image', 'icon' : ['add-to-photos','adjust','assistant-photo','audiotrack','blur-circular','blur-linear','blur-off','blur-on','brightness-1','brightness-2','brightness-3','brightness-4','brightness-5','brightness-6','brightness-7','brush','camera-alt','camera2','camera-front','camera-rear','camera-roll','center-focus-strong','center-focus-weak','collections','colorize','color-lens','compare','control-point','control-point-duplicate','crop-16-9','crop-3-2','crop-5-4','crop-7-5','crop','crop-din','crop-free','crop-landscape','crop-original','crop-portrait','crop-square','dehaze','details','edit','exposure','exposure-minus-1','exposure-minus-2','exposure-plus-1','exposure-plus-2','exposure-zero','filter-1','filter-2','filter-3','filter-4','filter-5','filter-6','filter-7','filter-8','filter-9','filter-9-plus','filter','filter-b-and-w','filter-center-focus','filter-drama','filter-frames','filter-hdr','filter-none','filter-tilt-shift','filter-vintage','flare','flash-auto','flash-off','flash-on','flip','gradient','grain','grid-off','grid-on','hdr-off','hdr-on','hdr-strong','hdr-weak','healing','image-aspect-ratio','image2','iso','landscape','leak-add','leak-remove','lens','looks-3','looks-4','looks-5','looks-6','looks','looks-one','looks-two','loupe','movie-creation','nature','nature-people','navigate-before','navigate-next','palette','panorama','panorama-fisheye','panorama-horizontal','panorama-vertical','panorama-wide-angle','photo-album','photo','photo-camera','photo-library','portrait','remove-red-eye','rotate-left','rotate-right','slideshow','straighten','style','switch-camera','switch-video','tag-faces','texture','timelapse','timer-10','timer-3','timer-auto','timer','timer-off','tonality','transform','tune','wb-auto','wb-cloudy','wb-incandescent','wb-irradescent','wb-sunny'] },	
			{ 'name' : 'Maps', 'icon' : ['beenhere','directions-bike','directions','directions-bus','directions-car','directions-ferry','directions-subway','directions-train','directions-transit','directions-walk','flight','hotel','layers2','layers-clear','local-airport','local-atm','local-attraction','local-bar','local-cafe','local-car-wash','local-convenience-store','local-drink','local-florist','local-gas-station','local-grocery-store','local-hospital','local-hotel','local-laundry-service','local-library','local-mall','local-movies','local-offer','local-parking','local-pharmacy','local-phone','local-pizza','local-play','local-post-office','local-print-shop','local-restaurant','local-see','local-shipping','local-taxi','location-history','map2','my-location','navigation','pin-drop','place','rate-review','restaurant-menu','satellite','store-mall-directory','terrain','traff'] },	
			{ 'name' : 'Navigation', 'icon' : ['apps','arrow-back','arrow-drop-down','arrow-drop-down-circle','arrow-drop-up','arrow-forward','cancel','check2','chevron-left','chevron-right','close','expand-less','expand-more','fullscreen','fullscreen-exit','menu2','more-horiz','more-vert','refresh','unfold-less','unfold-more'] },	
			{ 'name' : 'Notification', 'icon' : ['adb','bluetooth-audio','disc-full','dnd-forwardslash','do-not-disturb','drive-eta','event-available','event-busy','event-note','folder-special','mms','more','network-locked','phone-bluetooth-speaker','phone-forwarded','phone-in-talk','phone-locked','phone-missed','phone-paused','play-download','play-install','sd-card','sim-card-alert','sms','sms-failed','sync','sync-disabled','sync-problem','system-update','tap-and-play','time-to-leave','vibration','voice-chat','vpn-lock'] },	
			{ 'name' : 'social', 'icon' : ['cake','domain','group-add','group','location-city','mood','notifications','notifications-none','notifications-off','notifications-on','notifications-paused','pages','party-mode','people','people-outline','person-add','person','person-outline','plus-one','poll','publ','school','share2','whatshot'] },	
			{ 'name' : 'toggle', 'icon' : ['check-box','check-box-outline-blank','radio-button-off','radio-button-on','star2','star-half','star-outline'] }
		],

		/* Font Awesome 폰트 어썸 */
		[
			{ 'name' : 'Web Application', 'icon' : ['adjust2','anchor','archive3','area-chart','arrows','arrows-h','arrows-v','asterisk','at','automobile','ban2','bank','bar-chart','barcode','bars','beer','bell2','bell-o','bell-slash','bell-slash-o','bicycle2','binoculars','birthday-cake','bolt','bomb','book3','bookmark2','bookmark-o','briefcase2','bug','building','building-o','bullhorn','bullseye','bus','cab','calculator','calendar','calendar-o','camera3','camera-retro','caret-square-o-down','caret-square-o-left','caret-square-o-right','caret-square-o-up','cc','certificate','check3','check-circle','check-circle-o','check-square','check-square-o','child','circle','circle-o','circle-o-notch','circle-thin','clock-o','close2','cloud8','cloud-download3','cloud-upload3','code','code-fork','coffee','cog','cogs','comment2','comment-o','comments','comments-o','compass2','copyright','credit-card','crop2','crosshairs','cube','cubes','cutlery','dashboard','database','desktop','dot-circle-o','download2','edit2','ellipsis-h','ellipsis-v','envelope','envelope-o','envelope-square','eraser','exchange','exclamation','exclamation-circle','exclamation-triangle','external-link','external-link-square','eye2','eye-slash','eyedropper','fax','female','fighter-jet','file-archive-o','file-audio-o','file-code-o','file-excel-o','file-image-o','file-movie-o','file-pdf-o','file-powerpoint-o','file-word-o','film','filter2','fire','fire-extinguisher','flag3','flag-checkered','flag-o','flask','folder3','folder-o','folder-open2','folder-open-o','frown-o','futbol-o','gamepad2','gavel','gift','glass','globe2','graduation-cap','group2','hdd-o','headphones','heart','heart-o','history2','home2','hotel','image3','inbox3','info2','info-circle','key','keyboard-o','language2','laptop2','leaf','lemon-o','level-down','level-up','life-bouy','lightbulb-o','line-chart','location-arrow','lock3','magic','magnet','mail-forward','mail-reply','mail-reply-all','male','map-marker','meh-o','microphone2','microphone-slash','minus2','minus-circle','minus-square','minus-square-o','mobile','money','moon-o','music','newspaper-o','paint-brush','paper-plane','paper-plane-o','paw','pencil','pencil-square','phone2','phone-square','photo','pie-chart','plane','plug','plus2','plus-circle','plus-square','plus-square-o','power-off','print','puzzle-piece','qrcode','question','question-circle','quote-left','quote-right','random','recycle','refresh3','remove','reorder','reply','reply-all','retweet','road','rocket','rss','rss-square','search3','search-minus','search-plus','send','server','share','share-alt','share-alt-square','share-square','share-square-o','shield','shopping-cart2','sign-in','sign-out','signal2','sitemap','sliders','smile-o','sort','sort-alpha-asc','sort-alpha-desc','sort-amount-asc','sort-amount-desc','sort-asc','sort-desc','sort-numeric-asc','sort-numeric-desc','space-shuttle','spinner','spoon','square','square-o','star3','star-half','star-half-empty','star-o','suitcase','sun-o','tablet2','tag2','tags','tasks','terminal','thumb-tack','thumbs-down','thumbs-o-down','thumbs-o-up','thumbs-up','ticket','times-circle','times-circle-o','tint','toggle-off','toggle-on','trash','trash-o','tree','trophy','truck','tty','umbrella2','university','unlock2','unlock-alt','upload2','user','video-camera','volume-down2','volume-off2','volume-up2','warning','wheelchair','wifi','wrench'] },
			{ 'name' : 'Transportation', 'icon' : ['ambulance','automobile','bicycle','bus','cab','fighter-jet','plane','rocket','space-shuttle','truck','wheelchair'] },
			{ 'name' : 'File Type', 'icon' : ['file2','file-archive-o','file-audio-o','file-code-o','file-excel-o','file-image-o','file-movie-o','file-o','file-pdf-o','file-powerpoint-o','file-text','file-text-o','file-word-o'] },
			{ 'name' : 'Spinner', 'icon' : ['circle-o-notch','cog2','refresh','spinner'] },
			{ 'name' : 'Form Control', 'icon' : ['check-square','check-square-o','circle','circle-o','dot-circle-o','minus-square','plus-square','square','minus-square-o','plus-square-o','square-o'] },
			{ 'name' : 'Payment', 'icon' : ['cc-amex','cc-discover','cc-mastercard','cc-paypal','cc-stripe','cc-visa','credit-card2','google-wallet','paypal'] },
			{ 'name' : 'Chart', 'icon' : ['area-chart','bar-chart','line-chart','pie-chart'] },
			{ 'name' : 'Currency', 'icon' : ['bitcoin','cny','dollar','eur','gbp','ils','inr','krw','money','rouble','try'] },
			{ 'name' : 'Text Editor', 'icon' : ['align-center2','align-justify2','align-left2','align-right2','bold','chain','chain-broken','clipboard2','columns','copy','cut','dedent','eraser','file','file-text','file-text-o','floppy-o','font','header','indent','italic','link','list2','list-alt','list-ol','list-ul','paperclip','paragraph','repeat','rotate-left','rotate-right','save','strikethrough','subscript','superscript','table','text-height','text-width','th','th-large','th-list','underline','undo'] },
			{ 'name' : 'Directional', 'icon' : ['angle-double-down','angle-double-left','angle-double-right','angle-double-up','angle-down','angle-left','angle-right','angle-up','arrow-circle-down','arrow-circle-left','arrow-circle-o-down','arrow-circle-o-left','arrow-circle-o-right','arrow-circle-o-up','arrow-circle-right','arrow-circle-up','arrow-down2','arrow-left2','arrow-right2','arrow-up2','arrows','arrows-alt','arrows-h','arrows-v','caret-down','caret-left','caret-right','caret-square-o-down','caret-square-o-left','caret-square-o-right','caret-square-o-up','caret-up','chevron-circle-down','chevron-circle-left','chevron-circle-right','chevron-circle-up','chevron-down','chevron-left2','chevron-right2','chevron-up','hand-o-down','hand-o-left','hand-o-right','hand-o-up','long-arrow-down','long-arrow-left','long-arrow-right','long-arrow-up'] },
			{ 'name' : 'Video Player', 'icon' : ['arrows-alt','backward','compress','eject','expand','fast-backward','fast-forward3','forward2','pause3','play2','play-circle','play-circle-o','step-backward','step-forward','stop3','youtube-play'] },
			{ 'name' : 'Brand', 'icon' : ['adn','android2','angellist','apple','behance','behance-square','bitbucket','bitbucket-square','bitcoin','cc-amex','cc-discover','cc-mastercard','cc-paypal','cc-stripe','cc-visa','codepen','css3','delicious','deviantart','digg','dribbble','dropbox','drupal','empire','facebook','facebook-square','flickr','foursquare','git','git-square','github','github-alt','github-square','gittip','google','google-plus','google-plus-square','google-wallet','hacker-news','html5','instagram','ioxhost','joomla','jsfiddle','lastfm','lastfm-square','linkedin','linkedin-square','linux','maxcdn','meanpath','axi axi-openid','pagelines','paypal','pied-piper','pied-piper-alt','pinterest','pinterest-square','qq','ra','reddit','reddit-square','renren','share-alt','share-alt-square','axi axi-skype','slack','slideshare','soundcloud','spotify','stack-exchange','stack-overflow','steam','steam-square','stumbleupon','stumbleupon-circle','tencent-weibo','trello','tumblr','tumblr-square','twitch','twitter','twitter-square','vimeo-square','vine','vk','wechat','weibo','windows','wordpress','xing','xing-square','yahoo','yelp','youtube','youtube-play','youtube-square'] },																								
			{ 'name' : 'Medical', 'icon' : ['ambulance','h-square','heart2','heart-o','hospital-o','medkit','plus-square','stethoscope','user-md','wheelchair'] }	
		],	

		/* ionicons 아이오닉콘 */
		[
			{ 'name' : 'Action', 'icon' : ['ion-alert-circled','ion-alert','ion-asterisk','ion-at','ion-bag','ion-beaker','ion-beer','ion-bluetooth','ion-bonfire','ion-bookmark','ion-briefcase','ion-bug','ion-calculator','ion-card','ion-cash','ion-clipboard','ion-closed-captioning','ion-cloud','ion-code-download','ion-code-working','ion-code','ion-coffee','ion-compass','ion-compose','ion-connection-bars','ion-contrast','ion-cube','ion-disc','ion-document-text','ion-document','ion-drag','ion-earth','ion-edit','ion-egg','ion-eject','ion-email','ion-eye-disabled','ion-eye','ion-filing','ion-fireball','ion-flag','ion-flame','ion-flash-off','ion-flash','ion-flask','ion-folder','ion-fork-repo','ion-fork','ion-forward','ion-gear-a','ion-gear-b','ion-grid','ion-hammer','ion-headphone','ion-heart-broken','ion-heart','ion-help-buoy','ion-help-circled','ion-help','ion-home','ion-icecream','ion-image','ion-images','ion-information-circled','ion-link','ion-log-in','ion-log-out','ion-loop','ion-magnet','ion-map','ion-medkit','ion-merge','ion-model-s','ion-more','ion-network','ion-pizza','ion-pull-request','ion-quote','ion-refresh','ion-ribbon-a','ion-ribbon-b','ion-settings','ion-shuffle','ion-wrench','ion-android-archive','ion-android-book','ion-android-calendar','ion-android-data','ion-android-developer','ion-android-display','ion-android-download','ion-android-drawer','ion-android-dropdown','ion-android-earth','ion-android-folder','ion-android-hand','ion-android-image','ion-android-inbox','ion-android-information','ion-android-keypad','ion-android-lightbulb','ion-android-locate','ion-android-location','ion-android-mail','ion-android-microphone','ion-android-mixer','ion-android-more','ion-android-note','ion-android-playstore','ion-android-reminder','ion-android-search','ion-android-send','ion-android-settings','ion-android-share','ion-android-sort','ion-android-stair-drawer','ion-android-star','ion-android-storage','ion-android-system-back','ion-android-system-home','ion-android-system-windows','ion-android-timer','ion-android-trash'] },		
			{ 'name' : 'Device', 'icon' : ['ion-aperture','ion-archive','ion-battery-charging','ion-battery-empty','ion-battery-full','ion-battery-half','ion-battery-low','ion-calendar','ion-camera','ion-clock','ion-film-marker','ion-funnel','ion-game-controller-a','ion-game-controller-b','ion-ipad','ion-iphone','ion-ipod','ion-laptop','ion-mic-a','ion-mic-b','ion-mic-c','ion-monitor','ion-android-alarm','ion-android-clock','ion-android-battery','ion-android-call','ion-android-camera','ion-android-printer','ion-android-stopwatch','ion-android-volume','ion-android-wifi'] },
			{ 'name' : 'social', 'icon' : ['ion-happy','ion-male','ion-female','ion-man','ion-woman','ion-person-add','ion-person-stalker','ion-person','ion-android-add-contact','ion-android-contact','ion-android-contacts','ion-android-friends','ion-android-social-user','ion-android-social','ion-android-user-menu','ion-android-chat','ion-android-forums','ion-chatbox-working','ion-chatbox','ion-chatboxes','ion-chatbubble-working','ion-chatbubble','ion-chatbubbles'] },
			{ 'name' : 'Directional', 'icon' : ['ion-arrow-down-a','ion-arrow-down-b','ion-arrow-down-c','ion-arrow-expand','ion-arrow-graph-down-left','ion-arrow-graph-down-right','ion-arrow-graph-up-left','ion-arrow-graph-up-right','ion-arrow-left-a','ion-arrow-left-b','ion-arrow-left-c','ion-arrow-move','ion-arrow-resize','ion-arrow-return-left','ion-arrow-return-right','ion-arrow-right-a','ion-arrow-right-b','ion-arrow-right-c','ion-arrow-shrink','ion-arrow-swap','ion-arrow-up-a','ion-arrow-up-b','ion-arrow-up-c','ion-android-arrow-back','ion-android-arrow-down-left','ion-android-arrow-down-right','ion-android-arrow-forward','ion-android-arrow-up-left','ion-android-arrow-up-right','ion-chevron-down','ion-chevron-left','ion-chevron-right','ion-chevron-up'] },
			{ 'name' : 'toggle', 'icon' : ['ion-android-add','ion-android-remove','ion-android-checkmark','ion-android-close','ion-checkmark-circled','ion-checkmark-round','ion-checkmark','ion-close-circled','ion-close-round','ion-close'] },
			{ 'name' : 'loading', 'icon' : ['ion-load-a','ion-load-b','ion-load-c','ion-load-d'] }				
		],
	
		/* Feather 페더 */
		[
			{ 'name' : 'application', 'icon' : ['arrow-left','arrow-right','arrow-up','arrow-down','expand','contract','maximize','minimize','plus','minus','check','cross','move','content-right','content-left','grid','grid-2','columns','eye','mail','inbox','outbox','layout','bell','ribbon','image','clipboard','heart','layers','stack','stack-2','search','zoom-in','zoom-out','reply','microphone','folder','cloud-upload','cloud-download','upload','download','location','location-2','map','head','briefcase','speech-bubble','anchor','globe','box','reload','share','tag','command','alt','esc','bar-graph','bar-graph-2','pie-graph','star','loader','bag','ban','flag','trash'] },
			{ 'name' : 'text edit ', 'icon' : ['paragraph','align-justify','align-left','align-center','align-right','paper-clip','link','paper','paper-stack','delete','menu','archive','file','file-add','file-subtract','help','open','ellipsis'] },
			{ 'name' : 'AV', 'icon' : ['record','skip-back','rewind','play','pause','stop','fast-forward','skip-forward','shuffle','repeat','volume','mute'] },
			{ 'name' : 'toggle', 'icon' : ['toggle','circle-plus','circle-minus','circle-check','circle-cross','square-plus','square-minus','square-check','square-cross','marquee','marquee-plus','marquee-minus','lock','unlock'] },
			{ 'name' : 'Device', 'icon' : ['clock','watch','air-play','camera','video','disc','printer','monitor','server','cog','book','signal','target','battery','power'] },
			{ 'name' : 'weather', 'icon' : ['umbrella','moon3','thermometer2','drop','sun4','cloud6'] }								
		],	        
	
		/* Meteocons 메테오콘(날씨) */
		[
			{ 'name' : 'aa', 'icon' : ['sunrise','sun','moon','sun2','windy','wind','snowflake','cloudy','cloud','weather','weather2','weather3','lines','cloud2','lightning','lightning2','rainy','rainy2','windy2','windy3','snowy','snowy2','snowy3','weather4','cloudy2','cloud3','lightning3','sun3','moon2','cloudy3','cloud4','cloud5','lightning4','rainy3','rainy4','windy4','windy5','snowy4','snowy5','weather5','cloudy4','lightning5','thermometer','compass','none','Celsius','Fahrenheit'] }
		],	        
	
		/* AXIcon 액시콘 */
		[
			{ 'name' : 'aa', 'icon' : ['happytalk-elephant','happytalk-counselor','happytalk-num-1','happytalk-num-2','happytalk-num-3','happytalk-num-4','happytalk-num-5','happytalk-robot','Endocrine-abnormality','Internal-disease','cancer','cardiovascular-disease','dental','gynecological-disorders','organ-transplant','plastic-sugery','spinal-rehabilitation','surgical-diseases','bmg-booster','bmg-business-idea','bmg-buzzmaker','bmg-checklist','bmg-cost-structure','bmg-customer-segment-1','bmg-customer-segment','bmg-differentiation','bmg-direction','bmg-key-process','bmg-key-resource','bmg-market','bmg-offering','bmg-product','bmg-replacement','bmg-revenue-stream','bmg-supporter','bmg-team','bmg-todo','bmg-unmet-needs','bmg-value-fit','bmg-value-proposition','axisj','axicon','axicon-o','axu','jsongum','flybasket','axgate','bicycle-woman','bicycle-man','bicycle','couple','xe','json-array','json-array2','json-array3','json-array4','json-array5','json-array6','json-number','json-number2','json-number3','json-number4','json-number5','json-number6','json-string','json-string2','json-string3','json-string4','json-string5','json-string6','json-boolean','json-boolean2','json-boolean3','json-boolean4','json-boolean5','json-boolean6','json-null','json-null2','json-null3','json-null4','json-null5','json-null6','json-null7','json-undefined','json-undefined2','json-undefined3','json-undefined4','json-undefined5','json-undefined6','json-object','json-object2','json-object3','json-object4','json-object5','json-object6'] }
		]

	],

	'int' : function(obj) {

		if (jQuery("#editWindow-icons").length > 0) { return false; }

var _html = '' +
'<ul class="_edit-list-1">' +
	'<li>' +			
		'<dl class="_edit-dl-2">' +
			'<dt><label for="_editor_icon_company">'+ msg_msg('kind','a') +'</label></dt>' +
			'<dd>' +				
				'<div class="counter-control-box">' +
					'<span class="counter-control">' +
						'<span class="box-btn"><button href="#" onclick="return false;" onmousedown="input_box.plus(\'_editor_icon_company\',{},function(){icon_obj.icon_company_change();})" onmouseup="input_box.stop(\'_editor_icon_company\');" class="left-button icon2-plus"></button></span>' +
						'<span class="box-input">' +
							'<select id="_editor_icon_company" onchange="icon_obj.icon_company_change()">';
						
		for (var i=0;i<icon_obj._icons_company.length;i++) {
			_html += '<option value="' + i + '">' + icon_obj._icons_company[i]['name'] + '</option>';
		}
		
_html += '' +
							'</select>' +
						'</span>' +
						'<span class="box-btn"><button href="#" onclick="return false;" onmousedown="input_box.minus(\'_editor_icon_company\',{},function(){icon_obj.icon_company_change();})" onmouseup="input_box.stop(\'_editor_icon_company\');" class="right-button icon2-minus"></button></span>' +
					'</span>' +
				'</div>' +				
			'</dd>' +
		'</dl>' +
	'</li>' +
	'<li>';

		for (var i=0;i<icon_obj._icons_company.length;i++) {
			
			var Cdisplay = (i == 0) ? "block" : "none";
			_html += '<div id="_icons_company_' + i + '" style="display:' + Cdisplay + '">';

			var _company_count = icon_obj._icons_group[i].length;
			if (_company_count > 1) {
				var _ids = '_icons_groups_' + i;
				_html += '<dl class="_edit-dl-2">';					
				_html += '<dt><label for="' + _ids + '">'+ msg_msg('classifiction','a') +'</label></dt>';
				_html += '<dd>';
				_html += '<div class="counter-control-box">';
				_html += '<span class="counter-control">';
				_html += '<span class="box-btn"><button href="#" onclick="return false;" onmousedown="input_box.plus(\'' + _ids + '\',{},function(){icon_obj.icon_group_change(1);})" onmouseup="input_box.stop(\'_editor_icon_company\');" class="left-button icon2-plus"></button></span>';
				_html += '<span class="box-input">';
				_html += '<select id="' + _ids + '" onchange="icon_obj.icon_group_change(1)">';

				for (var z=0;z<icon_obj._icons_group[i].length;z++) {
					_html += '<option value="' + z + '">' + icon_obj._icons_group[i][z]['name'] + '</option>';
				}
				
				_html += '</select>';
				_html +=  '</span>';
				_html +=  '<span class="box-btn"><button href="#" onclick="return false;" onmousedown="input_box.minus(\'' + _ids + '\',{},function(){icon_obj.icon_group_change(1);})" onmouseup="input_box.stop(\'_editor_icon_company\');" class="right-button icon2-minus"></button></span>';
				_html +=  '</span>';
				_html +=  '</div>';
				
				_html += '</dd>';
				_html += '</dl>';		
			}
			_html += '</div>';					
		}
			
_html += '' +
	'</li>' +		
	'<li>' +
		'<dl class="_edit-dl-2">' +
			'<dt><label for="_editor_icon_search">'+msg_msg('search','a')+'</label></dt>' +
			'<dd><input type="text" name="_editor_icon_search" id="_editor_icon_search" onfocus="icon_obj.autocomplete()" onkeyup="icon_obj.autocomplete()" /></dd>' +
		'</dl>' +
	'</li>' +
	'<li>' +
		'<div id="_icon_group" class="icons_preview">';
				
		for (var i=0;i<icon_obj._icons_company.length;i++) {
			
			var Cdisplay = (i == 0) ? "block" : "none";

			for (var m=0;m<icon_obj._icons_group[i].length;m++) {
				var Cdisplay = (m == 0) ? "block" : "none";
				var _group = '_icon_group_' + i + '_' + m;
				for (var n=0;n<icon_obj._icons_group[i][m]['icon'].length;n++) {
					_html += '<button data-key="' + icon_obj._icons_group[i][m]['icon'][n] + '" class="icon-a _drag-btn-3 '+ _group +'"><span title="' + icon_obj._icons_group[i][m]['icon'][n] + '" alt_no="4" class="axi axi-' + icon_obj._icons_group[i][m]['icon'][n] + '"></span></button>';					
				}				
			}				

		}

_html += '' +
		'</div>' +
		'<div id="_editor_icon_search_error_msg" class="search_error_msg" style="display:none">No Match</div>' +
	'</li>' +			
'</ul>' +
'<div class="_edit_remove_box"><a href="#" onclick="icon_obj.delete();return false;" title="'+ msg_msg('delete','a') +'" class="edit-btn-8 icon2-delete"></a></div>';

		edit_window_obj.int("editWindow-icons",_html,msg_msg('set_icon','a'));

		jQuery('#_icon_group>button').on('click',function() {
			var _key = jQuery(this).data('key');
			icon_obj.change('axi-'+_key);
			return false;
		});		

		this.icon_group_change();

		if (jQuery('#editor-icon-fix').length == 0) {
			
			//var _html = '<div id="editor-icon-fix" class="no" style="display:none"><a href="#" onclick="icon_obj.view();return false;" class="setting-btn-1">'+ msg_msg('set_icon','a') +'</a></div>';
			var _html = '<div id="editor-icon-fix" class="btn_width _m9editor no" style="display:none"><a href="#" onclick="icon_obj.view();return false;" class="setting-btn-1">'+ msg_msg('set_icon','a') +'</a></div>';			
			jQuery("body").append(_html);

			var mousedown_func = function(e,obj) {
				var _target = obj;
				var et = e.target;
				if (_target) {
					icon_obj._now = et;
				}
			};

			var mouseover_func = function(e,obj) {
				
				var _target = obj;
				var et = e.target;
				var J_et = jQuery(et);

				if (_target) {			
					if (jQuery('#editWindow-icons').css('display') != 'none') { return false; }
					icon_obj._selected = et;
					layer_position("editor-icon-fix",et,"up");								
					obj_fadeIn('#editor-icon-fix',200);
					return false; // m9alt 방지
				} else {
					icon_obj._selected = false;
					obj_fadeOut('#editor-icon-fix',200);
					return false; // m9alt 방지		
				}
				
			};
	
			editor_selector.set(obj,[
				{ '_type' : 'mousedown' , '_kind' : 'is' , '_selector' : '.axi' , '_func' : mousedown_func, '_ignore' : 1 },
				{ '_type' : 'mouseover' , '_kind' : 'is' , '_selector' : '.axi' , '_func' : mouseover_func, '_ignore' : 1 }
			]);
			
		}
		
	},
	
	'autocomplete' : function() {
		var chars = jQuery('#_editor_icon_search').val();
		if (chars.length < 2) {
			icon_obj.icon_group_change();
			return false;
		}
		var rgExp = new RegExp(''+chars+'','gi');	
		var _match = 0;
		jQuery('#_icon_group').find('button').each(function() {
			var _key = jQuery(this).data('key');
			if (_key.match(rgExp)) {
				jQuery(this).css({'display':'inline-block'});				
				_match++;
			} else {
				jQuery(this).css({'display':'none'});				
			}
		});
		var _display = (_match == 0) ? "block" : "none";
		jQuery('#_editor_icon_search_error_msg').css('display',_display);
	},

	'icon_company_change' : function(Dnum) {
		var Dnum = jQuery('#_editor_icon_company').val();
		for(var i=0;i<icon_obj._icons_company.length;i++) {
			var _display =  (i == Dnum) ? "block" : "none";
			jQuery('#_icons_company_' + i).css('display',_display);
		}
		this.icon_group_change(1);
	},

	'icon_group_change' : function(Dkind) {
		var a = jQuery('#_editor_icon_company').val();
		var b = 0;
		if (jQuery('#_icons_groups_'+a).length > 0) {
			b = jQuery('#_icons_groups_'+a).val();
		}
		var _group = '_icon_group_' + a + '_' + b;

		jQuery('#_icon_group>button').css('display','none');
		jQuery('#_icon_group>button.'+_group).css('display','inline-block');
		if (Dkind == 1) {
			jQuery('#_editor_icon_search').val('');
			jQuery('#_editor_icon_search_error_msg').css('display','none');
		}
	},
	
	'view' : function() {
		icon_obj._now = icon_obj._selected;
		element_obj.edit.convert_obj(icon_obj._now,'font'); // 객체전송
		layer_position('editWindow-icons',icon_obj._now,'up',getObject('body'));			
		edit_window_obj.view('editWindow-icons');		
		jQuery("#editor-icon-fix").css("display","none");		
	},

	'change' : function(icon) {
		var old_icon = "";
		var _classes = jQuery(icon_obj._now).attr('class').split(" ");
		for (var i=0;i<_classes.length;i++) {
			if (_classes[i].match(/^axi\-/i) && _classes[i] != "axi-lg" && !_classes[i].match(/^axi\-\dx/i)) {
				old_icon = _classes[i];
				break;
			}
		}
		if (old_icon == "") { return false; }
		
		jQuery(icon_obj._now).removeClass(old_icon).addClass(icon);
 		if (_SET["navigator"] == "ie" && ie_var < 8) {
			ie_addIcon(icon_obj._now,icon);
		}
		
		undo_obj._add(icon_obj._now);		
	},

	'delete' : function() {
		var _re = icon_obj._now;
		edit_window_obj.close("editWindow-icons");
		jQuery(icon_obj._now).remove();
		icon_obj._now = false;		
		RemoveSelection();
		undo_obj._add(_re);		
	}	
		
}; //icon_obj
