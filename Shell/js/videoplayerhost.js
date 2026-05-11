var _____WB$wombat$assign$function_____=function(name){return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name))||self[name];};if(!self.__WB_pmw){self.__WB_pmw=function(obj){this.__WB_source=obj;return this;}}{
let window = _____WB$wombat$assign$function_____("window");
let self = _____WB$wombat$assign$function_____("self");
let document = _____WB$wombat$assign$function_____("document");
let location = _____WB$wombat$assign$function_____("location");
let top = _____WB$wombat$assign$function_____("top");
let parent = _____WB$wombat$assign$function_____("parent");
let frames = _____WB$wombat$assign$function_____("frames");
let opens = _____WB$wombat$assign$function_____("opens");
/* Carousel Video Player */
function resetVideoCarouselStyle() {
    $('#SilverlightWrapper').show();
    // Unselect all thumbnails
    $("#genreslider ul li .tile_img").removeClass("selected");
}

function destroySLVideo() {
    var host = $('#VideoPlayerWrapper');
    if (typeof (host) !== 'undefined') {
        host.height(0);
        host.width(0);
    }
}

function clearVideoCarouselViewer() {
    var host = $('#PlayerWrapper');
    if (typeof (host) !== 'undefined') {
        host.html("");
    }
    closeVideoCarouselViewer();
}

function closeVideoCarouselViewer() {
    destroySLVideo();
    resetVideoCarouselStyle();
}

function openVideoCarouselViewer(url, mediaTitle, minimumAge, culture, uiCulture)
{
    destroySLVideo();

    $('#SilverlightWrapper').hide();
    var host = $('#VideoPlayerWrapper');

    host.height(host.parent().innerHeight());
    host.width(host.parent().innerWidth());

    host.show();

    $('#SilverlightWrapper').hide();
    xbox.videoPlayer.openVideoOther('PlayerWrapper', 'silverlightVideoCarouselObject', url, mediaTitle, minimumAge, culture, uiCulture, 'onCloseVideoCarouselViewer');
}

function onCloseVideoCarouselViewer(sender, e) {
    closeVideoCarouselViewer();
}

/* Popup Video Player */
function closeVideoPopupViewer() {
    var host = $('#silverlightVideoPopupHost');
    if (typeof (host) !== 'undefined') {
        /* Distroy SL object */
        host.html("");
    }    
    hideModal();
}

function hideModal() {
    var host = $('#silverlightVideoPopupHost');
    if (typeof (host) !== 'undefined') {
        host.height(0);
        host.width(0);
    }

    $('#popupBackground').hide();

    var modal = $("#popupVideoPlayer");
    if (typeof (modal) !== 'undefined') {
        modal.height(0);
        modal.width(0);
    }

    var playerWrapper = $('#PlayerPopupWrapper');
    if (typeof (playerWrapper) !== 'undefined') {
        var player = $('#silverlightVideoPopupHost');
        // Case when SL is not installed (link to SL url exists)
        if (player.find('a').length > 0) {
            player.css("display", "none");
        }
        playerWrapper.height(0);
        playerWrapper.width(0);
    }
}

function showModal() {
    var bg = $('#popupBackground');
    bg.show();

    var modal = $("#popupVideoPlayer");
    if (typeof (modal) !== 'undefined') {
        if (modal.innerHeight() <= 0)
            modal.height(bg.innerHeight());
        if (modal.innerWidth() <= 0)
            modal.width(bg.innerWidth());
        modal.css("display", "inline");
    }

    var playerWrapper = $('#PlayerPopupWrapper');
    if (typeof (playerWrapper) !== 'undefined') {
        if (playerWrapper.innerHeight() <= 0)
            playerWrapper.height(400);
        if (playerWrapper.innerWidth() <= 0)
            playerWrapper.width(715);
        playerWrapper.css("display", "inline");
    }
    // Case when SL is not installed (link to SL url exists)
    var player = $('#silverlightVideoPopupHost');
    if (player.find('a').length > 0) {
        player.css("display", "inline");
    }
}

function openVideoPopup(url, mediaTitle, minimumAge, culture, uiCulture)
{
    clearVideoCarouselViewer();

    var host = $('#silverlightVideoPopupHost');
    host.height(host.parent().innerHeight());
    host.width(host.parent().innerWidth());
    xbox.videoPlayer.openVideoOther('silverlightVideoPopupHost', 'silverlightVideoPopupObject', url, mediaTitle, minimumAge, culture, uiCulture, 'onCloseVideoPopup');
}

function onCloseVideoPopup(sender, e) {
    hideModal();
}
}

/*
     FILE ARCHIVED ON 17:56:39 Jul 02, 2011 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 01:41:34 May 11, 2026.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  capture_cache.get: 0.698
  load_resource: 139.026
  PetaboxLoader3.resolve: 130.644
  PetaboxLoader3.datanode: 7.645
*/