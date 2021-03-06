/**************************
* Set page height
**************************/
setHeight();
function setHeight(){
$(".parallax-container").css("height",$(window).height());
$("#eventCompetition").css("height",$("#pic5 img").height()*0.4);
$("#photowalk").css("height",$("#photowalkPic2 img").height());
$("#photowalkPic1").css("height",$("#photowalkPic1 img").height());
$("#photowalkPic3").css("height",$("#photowalkPic1 img").height());
$("#photowalkPic2").css("height",$("#photowalkPic1 img").height());
	if ($(window).width() < 626){
		$("#eventCompetitionDescription").css("top",$("#pic5 img").height()+5);
		$("#photowalk").css("marginTop",$("#pic5 img").height()+ 40);
	}
}
/**************************
* Navigation Bar Item List 
**************************/
	if ($(window).width() < 624){
	html='<li><a href="#about" class="mobBtn" data-toggle="collapse" data-target="#main-menu">About</a></li><li><a href="#gallery" class="mobBtn" data-toggle="collapse" data-target="#main-menu">Gallery</a></li><li><a href="#team" class="mobBtn" data-toggle="collapse" data-target="#main-menu">Team</a></li><li><a href="#help" class="mobBtn" data-toggle="collapse" data-target="#main-menu">Help</a></li>';
	}else{html='<li><a href="#about">About</a></li><li><a href="#gallery">Gallery</a></li><li><a href="#team">Team</a></li><li><a href="#help">Help</a></li>';}
$("#NavigationList").append(html);
/**************************
* Page Load Functions
**************************/
$("html, body").animate({ scrollTop: 0.01});//Scroll Screen to top at reload
var reloadFlag = $(window).width();
$(window).resize(function() {
	setHeight();
	if((reloadFlag+100 < $(window).width())||(reloadFlag-100 > $(window).width()))
		location.reload();
});
/**************************
* ViewPort Status Defination
**************************/
$.fn.isInViewport = function() {
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();
    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();
    return elementBottom > viewportTop && elementTop < viewportBottom;
};
$.fn.isInViewportMiddle = function() {
var windowHeight = $(window).height(),
gridTop = windowHeight * -0.1,
gridBottom = windowHeight * 1;
var thisTop = $(this).offset().top - $(window).scrollTop();
	if (thisTop > gridTop && (thisTop + $(this).height()) < gridBottom)
		return true;
	else { return false; }
};
/**************************
* Check Touch Screen
**************************/
var hasTouchCapabilities = 'ontouchstart' in window && (navigator.maxTouchPoints || navigator.msMaxTouchPoints);
var isTouchDevice = hasTouchCapabilities ? 'maybe':'nope';
$(window).one('touchstart mousemove click',function(e){
    if ( isTouchDevice === 'maybe' && e.type === 'touchstart' )
        isTouchDevice = 'yes';
});
/**************************
* Gallery Section
**************************/
var facebook = [];
// ----Fetch Photo from Facebook---- //
$.ajax({
	url: 'https://graph.facebook.com/exposureamity/albums?fields=picture.type(album),name&access_token=296257484143696%7C5fc04aadcc6fc9dd97a8d6f476148e81',
	jsonp: 'callback',
	dataType: 'jsonp',
	success: function( response ) {
		facebook = response;
		$(document).trigger("loadComplete");
	}
});
$(document).on("loadComplete", function(){
	dataIntegration();
// ----Initiate Golden Gallery function---- //
	$('#dg-container').gallery();
// ----Owl Carosel initiate---- //
	$("#facebookCollection").owlCarousel({
		autoWidth: true,
		center: true,
		loop:true,
		margin: 20,
		autoplay:true,
		autoplayTimeout:3000,
		autoplayHoverPause:true
	});
	if ($(window).width() < 760){
		$( "#teamExposure" ).addClass( "owl-carousel" );
		$("#teamExposure").owlCarousel({
			rtl:true,
			center: true,
			loop:true,
			autoplay:true,
			autoplayTimeout:2000,
			autoplayHoverPause:true,
			afterAction: function(el){
			   //remove class active
			   this
			   .$owlItems
			   .removeClass('active')		 
			   //add class active
			   this
			   .$owlItems //owl internal $ object containing items
			   .eq(this.currentItem)
			   .addClass('active')
			},
			responsive:{
				0:{items:1},
				480:{items:1.9},
				624:{items:2.2},
				680:{items:2.4}
			}	 
		});
	}
	if ($(window).width() < 825){
		$( "#alumniExposure" ).addClass( "owl-carousel" );
		$("#alumniExposure").owlCarousel({
			center: true,
			margin: 20,
			loop:true,
			autoplay:true,
			autoplayTimeout:2500,
			autoplayHoverPause:true,
			items:1,
			responsive:{
				410:{
					center: false,
					margin: 0,
				}
			}	
		});
	}
if ($(window).width() < 400)
	$("#team").css("height",$("#teamExposure").height() + $("#alumniExposure").height() + 371);//Set the height of parent section.
else
	$("#team").css("height",$("#teamExposure").height() + $("#alumniExposure").height() + 300);;//Set the height of parent section.
	KUTE.to('#preloader',{scale: 0.001, opacity: 0}, {duration:600, easing: 'easingCubicOut',complete: $('body').css('overflow-y','scroll')}).chain(KUTE.to('#preloader',{scale: 0}, {duration:1})).start();
});
/**************************
* Detect Swipe
**************************/
function swipedetect(el, callback){
    var touchsurface = el,
    swipedir,
    startX,
    startY,
    distX,
    distY,
    threshold = 100, //required min distance traveled to be considered swipe
    restraint = 100, // maximum distance allowed at the same time in perpendicular direction
    allowedTime = 300, // maximum time allowed to travel that distance
    elapsedTime,
    startTime,
    handleswipe = callback || function(swipedir){};
  
    touchsurface.addEventListener('touchstart', function(e){
        var touchobj = e.changedTouches[0];
        swipedir = 'none';
        dist = 0;
        startX = touchobj.pageX;
        startY = touchobj.pageY;
        startTime = new Date().getTime(); // record time when finger first makes contact with surface
    }, false)
    touchsurface.addEventListener('touchend', function(e){
        var touchobj = e.changedTouches[0];
        distX = touchobj.pageX - startX; // get horizontal dist traveled by finger while in contact with surface
        distY = touchobj.pageY - startY; // get vertical dist traveled by finger while in contact with surface
        elapsedTime = new Date().getTime() - startTime; // get time elapsed
        if (elapsedTime <= allowedTime){ // first condition for awipe met
            if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){ // 2nd condition for horizontal swipe met
                swipedir = (distX < 0)? 'left' : 'right'; // if dist traveled is negative, it indicates left swipe
            }
            else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint){ // 2nd condition for vertical swipe met
                swipedir = (distY < 0)? 'up' : 'down'; // if dist traveled is negative, it indicates up swipe
            }
        }
        handleswipe(swipedir);
        e.preventDefault();
    }, false)
}
// ----Implimenting the swipe check---- //
var el = document.getElementById('dg-dynamicPosition')
swipedetect(el, function(swipedir){
    if (swipedir =='right')
        $('.dg-prev').trigger('click');
    else if (swipedir =='left')
        $('.dg-next').trigger('click');
})
/**************************
* Go full Screen
**************************/
function toggleFullScreen() {
  if ((document.fullScreenElement && document.fullScreenElement !== null) ||    
   (!document.mozFullScreen && !document.webkitIsFullScreen)) {
    if (document.documentElement.requestFullScreen) {  
      document.documentElement.requestFullScreen();
    } else if (document.documentElement.mozRequestFullScreen) {  
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullScreen) {  
      document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);  
    }  
  } else {  
    if (document.cancelFullScreen) {
      document.cancelFullScreen();  
    } else if (document.mozCancelFullScreen) {  
      document.mozCancelFullScreen();  
    } else if (document.webkitCancelFullScreen) {  
      document.webkitCancelFullScreen();  
    }  
  }
}
if (document.addEventListener)
{
    document.addEventListener('webkitfullscreenchange', changeHandler, false);
    document.addEventListener('mozfullscreenchange', changeHandler, false);
    document.addEventListener('fullscreenchange', changeHandler, false);
    document.addEventListener('MSFullscreenChange', changeHandler, false);
}
function changeHandler(){
    if (document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement === false){
		$("html, body").scrollTop($("#gallery").offset().top);
		$("#gallery").css("backgroundImage","url('./assets/images/Gallery/gallerybg.jpg')");
		$('body').css('overflow-y', 'hidden');
    } else {
		$("#gallery").css("backgroundImage","url('')");
		$('body').css('overflow-y','scroll');	
	}
}
/**************************
* Data Integration
**************************/
var goldenCollectionContainer = $('.dg-wrapper');
var facebookCollectionContainer = $('#facebookCollection');
var teamExposureContainer = $('#teamExposure');
var alumniExposureContainer = $('#alumniExposure');
function dataIntegration(){
	for (var x in goldenCollection){
		var html = '<a href="#"><img src="'+goldenCollection[x].img+'"><div>'+goldenCollection[x].text+'</div></a>';
		goldenCollectionContainer.append(html);
	}
	for (var x in facebook.data){
		for(var z in facebookRemove){
				if('https://www.facebook.com/pg/exposureamity/photos/?tab=album&album_id='+facebook.data[x].id==facebookRemove[z].link){
					facebook.data.splice(x, 1);
			}
		}
	}
	for (var x in facebook.data){
		html = '<div class="picsBox"><a href="https://facebook.com/'+facebook.data[x].id+'"><div class="coverpics"><img src="'+facebook.data[x].picture.data.url+'"></div><div class="picsText">'+facebook.data[x].name+'</div></a></div>';
		facebookCollectionContainer.append(html);
	}
	for (var x in team){
		html = '<div class="col-centered col-sm-4 col-lg-3"><div class="memberBox"><a href="'+team[x].link+'"><div class="memberPic"><img src="'+team[x].photo+'"><div class="memberName">'+team[x].name+'</div><div class="memberDesignation">'+team[x].designation+'</div></div></a></div></div>';
		teamExposureContainer.append(html);
	}
	for (var x in alumni){
		html = '<div class="col-centered col-sm-6 col-lg-5"><div class="alumniBox"><div class="alumniPic"><img src="'+alumni[x].photo+'"><div class="alumniName">'+alumni[x].name+'</div><div class="alumniQuote">'+alumni[x].quote+'</div></div></div></div>';
		alumniExposureContainer.append(html);
	}
}
/**************************
* Scroll Reveal
**************************/
window.sr = ScrollReveal({ reset: true });
sr.reveal('#aboutTitle');
sr.reveal('#eventCoverage', {distance: '200px', origin: 'left'});
sr.reveal('#eventCompetition', {distance: '200px', origin: 'right', viewOffset: {bottom: -150}});
sr.reveal('#photowalkPic2', {distance: '200px', origin: 'bottom',viewOffset: {top: -200}});
sr.reveal('#photowalkDescription', {duration: 900, distance: '200px', origin: 'bottom',viewOffset: {top: -200, bottom: -150}});
if($(window).width() > 450)
	sr.reveal('#workshops', {distance: '200px', origin: 'bottom',viewOffset: {top: -1000,bottom: 300}, scale: 1});
else
	sr.reveal('#workshops', {distance: '200px', origin: 'bottom',viewOffset: {top: -1000,bottom: 200}, scale: 1});
sr.reveal('#internalCmpt', {distance: '200px', origin: 'left'});
sr.reveal('.contactButtons', { duration: 1000 }, 50);
sr.reveal('#gallery .sectionHeader', { duration: 1000 });
sr.reveal('.dg-wrapper', { duration: 1000, viewOffset: {top: -200}});
sr.reveal('.dg-next', { duration: 1000, viewOffset: {top: 200, bottom: -400}});
sr.reveal('.dg-prev', { duration: 1000, viewOffset: {top: 200, bottom: -400}});
sr.reveal('#facebookCollection', { duration: 500 });