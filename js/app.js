$(document).ready(function(){

	$('html').removeClass('no-js');
	// $('.accesskey').find('a[accesskey="U"]').focus();
	// $('.goCenter').focus();
	
	var _window = $( window ),
		ww = _window.width(),
		wh = _window.height(),
		_body = $('body'),
		_webHeader = $('.header');

	//產生遮罩
	$( '.main' ).append( '<div class="overlay"></div>' );

    // show sidebar and overlay
    function showSidebar() {
        sidebar.css('margin-left', '0');
        overlay.show(0, function() {
            overlay.fadeTo('500', 0.5);
        });   
    }

    // hide sidebar and overlay
    function hideSidebar() {
        sidebar.css('margin-left', sidebar.width() * -1 + 'px');
        overlay.fadeTo('500', 0, function() {
            overlay.hide();
        });
    }

    // selectors
    var sidebar = $('.sidebar');
    var button = $('.sidebarCtrl a');
    var overlay = $('.overlay');
	
	// add height to content area
    overlay.parent().css('min-height', 'inherit');

    // hide sidebar on load
    // sidebar.css('margin-left', sidebar.width() * -1 + 'px');

    // sidebar.show(0, function() {
    //     sidebar.css('transition', 'all 0.5s ease');
    // });

    // toggle sidebar on click
    button.click(function() {				
        if (overlay.is(':visible')) {hideSidebar();} 
        else {showSidebar();}
        return false;
    });

    // hide sidebar on overlay click
    overlay.click(function() {
        hideSidebar();
    });

	//字級
	// var fontSize = $('.fontSize'),
	// 	fontSizeA = fontSize.find('a'),	 	
	// 	fontH1 = fontSizeA.outerHeight(),
	// 	fontH2 = fontH1*3;

	// fontSizeA.focusin(function(){
	// 	fontSize.height(fontH2);
	// 	fontSizeA.css('display','block');
	// 	$(this).keyup(function(e){
	// 		if(e.which == 13) {
	// 			$(this).addClass('here').parent().siblings().children('a').removeClass('here');
	// 		}
	// 	});
	// });
	
	// fontSize.hover(
	// 	function(){
	// 		fontSize.height(fontH2);
	// 		fontSizeA.css('display','block');
	// 		fontSizeA.click(function(){
	// 				$(this).addClass('here').parent().siblings().children('a').removeClass('here');
	// 			});
	// 		},
	// 	function(){
	// 		fontSize.height(fontH1);
	// 		fontSizeA.not('.here').css('display','none');
	// 	}
	// );	
	
	// fontSize.find('li:last').find('a').focusout(function(){
	// 	fontSize.height(fontH1);
	// 	fontSizeA.not('.here').css('display','none');
	// });

	//固定版頭
	var hh= _webHeader.outerHeight(true);
	
	_window.scroll(function() {
		if ($(this).scrollTop() > 0 ){
			_webHeader.addClass('fixed');
			_body.offset({top:hh});
		} else {
			_webHeader.removeClass('fixed');
			_body.offset({top:0});
		}
	});

	//快速鍵定位點
	var _aKey = $('a.accesskey'),
		aF_Top = $('.footer').offset().top-hh;

	_aKey.slice(0,2).focus(function(){
		_window.scrollTop(0);
	});
	_aKey.eq(2).focus(function(){
		_window.scrollTop(aF_Top);
	});

	$('a.goCenter').keydown(function(e){
		if(e.which == 13) { 
			_window.scrollTop(-1*hh);
			_aKey.eq(1).focus();
		}
	});

	//顯示行動版查詢
	$('.searchCtrl').find('a').click(function(){
		$('.search').css('top' , h1).slideToggle('fast');
		$('.searchCtrl').toggleClass('close');
		return false;
	});
	
	//header , side bar 選單
	var menu = $('.header .menu , .header .menu2p');
	menu.find('li').has('ul').addClass('hasChild');
	var liHasChild = menu.find('li.hasChild');
	menu.clone().prependTo( '.sidebar' );
	$( '<ul class="navigation"></ul>' ).prependTo( '.sidebar' );
	$('.navigation').find('li:contains(兒童版), li:contains(English)').clone().prependTo('.sidebar .navigation');
	$('.footer').find('.contact').clone().insertAfter('.sidebar .menu');

	var hiddenMenu = $('.header .menu2p').children('ul').children('li').slice(5).hide();

	$('.sidebar').find('.menu2p').addClass('menu').removeClass('menu2p');
	$('.sidebar .menu').find('li.hasChild>a').attr("href", "#");
	$('.sidebar .menu').find('li.hasChild>a').click(function(){
		$(this).next().slideToggle();
		$(this).parent().toggleClass('closeThis');
	});
	
	liHasChild.hover(
		function(){$(this).children().stop().fadeIn(200);},
		function(){$(this).children('ul').stop().fadeOut(200);}
		);
	liHasChild.keyup(
		function(){
			$(this).children().show();
			$(this).siblings().focus(function(){
				$(this).hide()
			});
		});
	menu.find('li').keyup(	
		function(){
			$(this).siblings().children('ul').hide();
		});
	menu.find('li:last>a').focusout(
		function(){
			menu.find('li ul').hide();
	});

	$('.menu2p').after('<div class="menuMore"><ul></ul></div>');
	$('.menuMore>ul').append(hiddenMenu);

	var menuMore = $('.menuMore');

	menuMore.css('top','h1');
	$('.menuMoreCtrl').mouseover(
		function(){menuMore.stop().slideDown('fast');}
	)
	$('.menuMoreCtrl').click(
		function(){menuMore.stop().slideToggle('fast');}
	)
	$('.menuMoreCtrl').focus(
		function(){menuMore.stop().slideToggle('fast');}
	)	
	$(menuMore).mouseleave(
		function(){menuMore.stop().fadeOut('fast');}
	)
	$(menuMore).find('li:last>a').focusout(
		function(){menuMore.stop().fadeOut('fast');}
	)

	//公版頁籤
	// var tabIndex = 0;
	// $('.tabContainer > section').css('position', 'absolute').hide();
	// $('.tabContainer').click(function() {
	// 	$(this).siblings().removeClass('here').find('section').hide();
	// 	$(this).addClass('here').find('section').show();
	// });
	// $('.tabContainer>h2>a').focus(function() {
	// 	$(this).parents('.tabContainer').siblings().removeClass('here').find('section').hide();
	// 	$(this).parents('.tabContainer').addClass('here').find('section').show();
	// });
	//$(window).resize(function() {    
		//checkTabsHeight();
	//});
	// $('.news').find(".tabContainer:eq(0)").click();

	//民政局頁籤
	// $('.tabs').find('.active').next('.tabContent').show();
	
	// var tabItemHeight = $('.tabs>h1>a').outerHeight();

	// $('.tabSet').each(function(){
	// 	var tabWidth = $(this).width();
	// 	var tabContentHeight = $(this).find('.active').next('.tabContent').innerHeight();
	// 	var tabItemLength = $(this).find('.tabContent').length;
	// 	var exh1 = tabItemHeight * (tabItemLength-1);

	// 	if (ww > 700) {
	// 		$(this).find('.tabs>h1>a').outerWidth( tabWidth / tabItemLength );
	// 		$(this).find('.tabContent').css('top' , tabItemHeight );
	// 		} else {
	// 			$(this).find('.tabs>h1>a').outerWidth( tabWidth );
	// 			$(this).height( tabContentHeight + exh1);
	// 		}

	// 	$('.tabs>h1>a').focus(tabs);
	// 	$('.tabs>h1>a').click(tabs);
	
	// });
	
	// function tabs(){
	// 	var _tabH1 = $(this).parent('h1');
	// 	var _tabContent = $(this).parent('h1').next('.tabContent');
	// 	var tabNumber = $(this).parents('.tabSet').find('.tabContent').length;
	// 	var tabContentHeight = _tabContent.innerHeight();

	// 	_tabH1.siblings().removeClass('active');
	// 	_tabH1.addClass('active');

	// 	if (ww < 700) {
	// 		_tabContent.parents('.tabSet').height(tabContentHeight + tabItemHeight*(tabNumber-1));
	// 		}
	// 	else if ( ww < 1000) {
	// 		$(this).parents('.tabSet').height(tabContentHeight + tabItemHeight);
	// 	} 
	// 	return false;
	// }

	// 最新消息 tabs
	jQuery(document).ready(function(){
    var ww = $(window).width();

	$('.tabs').find('.active').next('.tabContent').show();
	
    var    tw = $('.tabSet').width(),
	       tabItemHeight = $('.tabs>h2>a').innerHeight();
           wwSmall = 700;//視窗寬度小於等於這個數值，頁籤垂直排列。css需配合調整。

	$('.tabs').find('.tabContent').css('top' , tabItemHeight );

	$('.tabSet').each(function(){//各別處理每個頁籤組
		var tabContentHeight = $(this).find('.active').next('.tabContent').innerHeight(),
		    tabItemLength = $(this).find('h2').length,
            tabItemWidth = tw / tabItemLength;
		
		$(this).height(tabContentHeight + tabItemHeight);
		$(this).find('h2>a').innerWidth(tabItemWidth);
        if(ww > wwSmall){
            $(this).find('h2:last-of-type').css({position:"absolute", top:"0", right:"0"});
            $(this).find('h2:last-of-type>a').css({width:tabItemWidth+1});
        }
	});

	$('.tabs>h2>a').focus(tabs);
	$('.tabs>h2>a').click(tabs);
	
	function tabs(){
        var _aParent = $(this).parent(),
             tvp = _aParent.parents('.tabSet').offset(),
             tabIndex = _aParent.index()/2,
             scollDistance = tvp.top + tabItemHeight*tabIndex;

        if(ww <= wwSmall){
            _aParent.siblings('h2').removeClass('active').next('.tabContent').slideUp();
            _aParent.addClass('active').next().slideDown();
            $("html,body").stop(true,false).animate({scrollTop:scollDistance});
        } else {
            _aParent.siblings('h2').removeClass('active').next('.tabContent').css("display","none");
            _aParent.addClass('active').next('.tabContent').css("display","block");            
        }

		tabContentHeight = _aParent.next('.tabContent').innerHeight();
		_aParent.parents('.tabSet').height(tabContentHeight + tabItemHeight);

        return false;
	}
});

	
	//gotop
	_goTop = $('.goTop');
	_goTop.click(function(e){
		$("html,body").stop(true,false).animate({scrollTop:0},700);
		e.preventDefault();	
	});
	$(window).scroll(function() {
		if ( $(this).scrollTop() > 250){
			_goTop.fadeIn("fast");
		} else {
			_goTop.stop().fadeOut("fast");
		}
	});

	// Fatfooter, qrCode 開合
	$(function(){
		$('.fatfootCtrl input').click(function(){
			$(this).toggleClass('close');
			$('.qrcode').slideToggle();
			$('footer>nav>ul>li>ul').slideToggle(function(){
				$(this).toggleClass('close');
			});
		});
	});

	//小廣告輪播
	$(function(){
		var $marqueeUl = $('.adSlide ul'),
			_marqueeUlHtml = $marqueeUl.html(),
			_width = $('.adSlide').width() * -1,
			scrollSpeed = 900,
			timer,
			speed = 3000 + scrollSpeed,
			direction = 0,	
			_lock = false,
			_showItems = 5, // 一次顯示幾個
			_moveItems = 1; // 一次移動幾個
			
 		$(".adSlide").css("width", _showItems * _width * -1); 
		if(_showItems >= $marqueeUl.children('li').length) return;
		var $marqueeli = $marqueeUl.append(_marqueeUlHtml+_marqueeUlHtml).children();
		
		$marqueeUl.css('left', $marqueeli.length / 3 * _width);
		
		$marqueeli.hover(function(){
			clearTimeout(timer);
		}, function(){
			timer = setTimeout(showad, speed);
		});
		
		$('.arbtn').click(function(){
			if(_lock) return;
			clearTimeout(timer);
			direction = $(this).attr('id') == 'adBlockH_btn_next' ? 0 : 1;
			showad();
		});
		
		function showad(){
			_lock = !_lock;
			var _now = $marqueeUl.position().left / _width;
			_now = (direction ? _now - _moveItems + $marqueeli.length : _now + _moveItems)  % $marqueeli.length;

			$marqueeUl.animate({
				left: _now * _width
			}, scrollSpeed, function(){

				if(_now + _moveItems >= $marqueeli.length / 3 * 2){
					$marqueeUl.css('left', $marqueeli.length / 3 * _width - _width * ($marqueeli.length / 3 * 2 - _now));
				}else if(_now < $marqueeli.length / 3 ){
					$marqueeUl.css('left', $marqueeli.length / 3 * _width + (_width* _now));
				}
				_lock = !_lock;
			});
			timer = setTimeout(showad, speed);
		}
		timer = setTimeout(showad, speed);
	});

	// 資料大類開合
	if(ww<=800){
		$('.category').find('.here a').clone().insertBefore('.category ul').addClass('here');
		$('.category').append('<button class="cateCtrl"></button>');
		$('.cateCtrl, .category>a.here').click(function(){
			$('.cateCtrl').toggleClass('close');
			$('.category ul').slideToggle();
			$('.category a.here').slideToggle();
			});
		$('.category li a').click(function(){
			if($('.category ul').is(':visible')){
				$('.category ul').slideUp();
				$('.category>a.here').slideDown()};
				$('.cateCtrl').removeClass('close');
		});
	}
	
	// 影片縮圖寬高
	vh = $('.thumbnail.videos .image>img').width() *.67;
	$('.thumbnail.videos .image>img').css('height' , vh);
	$('.thumbnail.videos .play').css('height' , vh);

	//首頁大圖輪播參數
	$('.adloop').slick({
		accessibility:true,
		focusOnSelect: true,
		autoplay:true,
		dots:true,
		autoplaySpeed: 4000,
		speed: 700,
		vertical:true,
	});
	//首頁大圖輪播下方dot tab移動時,無障礙人工檢測要求,按enter鍵需能直接連結圖檔網址
	$( ".slick-dots li button" ).keypress(function(e) {
			var txt = $(e.target).text();
			var achr = $(".slick-slide[data-slick-index="+txt+"] a");
			window.open(achr.attr('href'));
	}); 	

	//拍片景點
	var _photoThumb = $('.photoThumb').find('li'),
		_photoShow = $('.photoShow').find('li'),
		photoCount = _photoThumb.length,
		duration = 4500,
		tt = setInterval(autoShow, duration);

	_photoThumb.first().addClass('active');
	_photoShow.first().show();

	$('.photoShow').after('<div class="ppause"></div>');
	var ppCtrl = $('.ppause');
	if(ww <= 600){
		var hini = _photoShow.first().height();
		$('.photoShow').height(hini);
		
		ppCtrl.click(function(){
			$(this).toggleClass('pplay')
			if (ppCtrl.hasClass('pplay')) {
				clearInterval(tt);
			} else {
				tt = setInterval(autoShow, duration);
			}
		})
	};

	_photoShow.append('<span class="photoCount"></span>');
	$('.photoShow').append('<div class="btn prev"></div><div class="btn next"></div>');

	for(n=1; n<=photoCount; n++){
		_photoShow.eq(n-1).find('.photoCount').text( n + '/' + photoCount);
	}

	var i = 0;
	var _btnNext = $('.photoShow').find('.next'),
		_btnPrev = $('.photoShow').find('.prev');

	_btnNext.click(function(){i = (i+1) % photoCount;showPhoto();});
	_btnPrev.click(function(){i = (i-1) % photoCount;showPhoto();});

	_photoThumb.find('a').click(function(e){
		i = $(this).parent('li').index();
		showPhoto();
		e.preventDefault();
	});
	_photoThumb.find('a').focus(function(){
		clearInterval(tt);
		i = $(this).parent('li').index();
		showPhoto();
		// console.log(_body.offset());
		_body.offset({top:-1*(hh+$('.friendly').outerHeight())});
	});

	_photoThumb.last().focusout(function(){
        tt = setInterval(autoShow, duration);
    });

    _photoShow.find('a').focus(function(e){
    	$('this').add(_photoShow).blur();
    	_photoThumb.first().find('a').focus();
    });

	$('.photoShow, .photoThumb li').hover(
		function(){clearInterval(tt);},
		function(){
			if ( !(ppCtrl.hasClass('pplay')) ) {
				tt = setInterval(autoShow, duration);
			}
		}
	);
	function autoShow(){
		i = (i+1) % photoCount;
		showPhoto();
	}
	function showPhoto(){
		_photoThumb.eq(i).addClass('active').siblings().removeClass('active');
		_photoShow.eq(i).fadeIn().siblings().fadeOut();
		if(ww <= 600){
			var	photoHeight = _photoShow.eq(i).height();
			$('.photoShow').animate({height:photoHeight});
		}
	}


	//照片內容頁參數
	$('.photoSlide').slick({
	  slidesToShow: 1,
	  slidesToScroll: 1,
	  dots: false,
	  arrows: false,
	  fade: false,
	  asNavFor: '.slider-nav'
	});
	$('.photoNav').slick({
	  slidesToShow: 5,
	  slidesToScroll: 1,
	  asNavFor: '.photoSlide',
	  dots: false,
	  centerMode: false,
	  focusOnSelect: true
	  });


	//分享
	var _share = $('.share'),
			_shareHead = _share.find('span').first();
	$('.shareThis').click(function(){
		_share.show();
		overlay.show().fadeTo('300', 0.5);
	});

	var svt;
	_share.append('<span class="after">《</span>');
	_share.find('.after').hide();
	_shareHead.wrap('<a href="#"></a>');

	function miniShare(){
		_share.stop(true, false).animate({ "width":".8em"}, 600).find('ul').stop(true, false).slideUp(600, function(){
			_share.find('.after').show(200);
			_share.addClass('mini');
		});
	}
	function showShare(){
		_share.removeClass('mini').find('.after').hide();
		_share.stop(true, false).animate({ "width":"48px"},300).find('ul').stop(true, false).slideDown(300);
	}
	if (ww > 1000) {
		svt = setTimeout(miniShare , 2000);		
		_share.hover(showShare,miniShare);
		_share.children('a').focusin(showShare);
		_share.find('li').last().children('a').focusout(miniShare);
	}
	if (ww <= 1000) {
		clearTimeout(svt);
		_share.find('ul').append( '<li class="close">離開</li>' );
		_share.find('li').click(function(){
			_share.hide();
			overlay.fadeTo('300', 0, function(){$(this).hide();});
		});
		overlay.click(function() {
			_share.hide();
		});
	}


  	//彈出訊息
	$('.popMessage').before('<div class="popMask"></div>');
	$('.popMask, .popMessage').show();
	$('.popMask, .closePop').click(function(){
		$('.popMask, .popMessage, .closePop').hide(300);
		$('.accesskey').find('a[accesskey="U"]').focus();
	})
	$('.closePop').focus(function(){
		$('.popMask, .popMessage, .closePop').hide(300);
	})

	
  	//機關通訊錄：機關階層
	$('.orgTree>ul>li:has(ul)').addClass('hasChild');
	$('.orgTree li.hasChild>ul').before('<span><a title="按enter展開下層單位" href="#">展開</a></span>');
	$('.orgTree li.hasChild').children('span').click(function(){
		$(this).siblings('ul').slideToggle();
		$(this).toggleClass('close');
	});
	$('.orgTree>ul').append('<li></li>');

	if (ww <= 680 ) {
		$('.list, .thumbnail').jscroll({
			contentSelector: '.list, .thumbnail'
		});
	}

	rwdTable();

	//人口調查
	//
	$('.demographics_close').css('display','none');
	$('.demographics_open').click(function(){
		$('.demographics_close').css('display','block');
		$(this).css('display','none');
	})
	$('.demographics_close').click(function(){
		$(this).css('display','none');
		$('.demographics_open').css('display','block')
	})

	//
	 $('.search2').hide();
	 $('.searchbtn').click(function(){
	 	$('.search2').slideToggle(400);
	 })
	
});
