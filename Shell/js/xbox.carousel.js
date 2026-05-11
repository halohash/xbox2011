var _____WB$wombat$assign$function_____=function(name){return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name))||self[name];};if(!self.__WB_pmw){self.__WB_pmw=function(obj){this.__WB_source=obj;return this;}}{
let window = _____WB$wombat$assign$function_____("window");
let self = _____WB$wombat$assign$function_____("self");
let document = _____WB$wombat$assign$function_____("document");
let location = _____WB$wombat$assign$function_____("location");
let top = _____WB$wombat$assign$function_____("top");
let parent = _____WB$wombat$assign$function_____("parent");
let frames = _____WB$wombat$assign$function_____("frames");
let opens = _____WB$wombat$assign$function_____("opens");
(function($) {
    $(document).ready(function() {

        if (Silverlight.isInstalled('3')) {
            // don't load JS carousel if Silverlight is present
            return;
        }
        // Get Paths
        var carouselPaths = 'basePath=,configXmlPath=' + heroConfigUrl;

        var subString = carouselPaths.split(',');
        var $firstString = subString[0];
        var $secondString = subString[1];
        // Split into Vars
        var basePath = $firstString.replace('basePath=', '');
        var xmlFile = $secondString.replace('configXmlPath=', '');

        // If JS enabled, hide notice that JS and Silverlight are not enabled
        $('#noJsMessaging').hide();
        // Fetch Carousel Data from XML
        $.ajax({
            type: "GET",
            url: '' + basePath + '' + xmlFile + '',
            dataType: "xml",
            success: function(xml) {
                $(xml).find('slide').each(function() {
                    var id = $(this).attr('id');
                    var slideImg = basePath + $(this).attr('imgPath');
                    var titleLabel = $(this).find('label').text();
                    var titleLabelColor = $(this).find('label').attr('color');
                    var ctaLabel_1 = $(this).find('button.ctaButton_1').text();
                    var url_1 = $(this).find('button.ctaButton_1').attr('destUrl');
                    var ctaLabel_2 = $(this).find('button.ctaButton_2').text();
                    var url_2 = $(this).find('button.ctaButton_2').attr('destUrl');
                    var ctaLabel_3 = $(this).find('button.ctaButton_3').text();
                    var url_3 = $(this).find('button.ctaButton_3').attr('destUrl');
                    var downloadLabel = $(this).find('download_link').text();
                    var downloadUrl = $(this).find('download_link').attr('destUrl');
                    var miscLabel = $(this).find('misc_link').text();
                    var miscUrl = $(this).find('misc_link').attr('destUrl');

                    var slideHtml = (titleLabel) ? '<h3 style="color:' + titleLabelColor + '">' + titleLabel + '</h3>' : '';
                    slideHtml = '<div class="titleWrap">' + slideHtml + '</div>';
                    if (slideImg)
                        slideHtml += '<img src="' + slideImg + '" />';
                    $('<div class="slide" id="link_' + id + '"></div>').html('<a href="' + (url_1 ? url_1 : '#') + '" class="linkCTABanner">' + slideHtml + '</a>').appendTo('#landingCarousel');

                    var slideHtmlCta = '';
                    if (url_1 && ctaLabel_1)
                        slideHtmlCta += '<a href="' + url_1 + '" class="linkCTA">' + ctaLabel_1 + '</a>';
                    if (url_2 && ctaLabel_2)
                        slideHtmlCta += '<a href="' + url_2 + '" class="linkCTA">' + ctaLabel_2 + '</a>';
                    if (url_3 && ctaLabel_3)
                        slideHtmlCta += '<a href="' + url_3 + '" class="linkCTA">' + ctaLabel_3 + '</a>';
                    if (downloadUrl && downloadLabel)
                        slideHtmlCta += '<a href="' + downloadUrl + '" class="downloadCTA" target="_blank">' + downloadLabel + '</a>';
                    if (miscUrl && miscLabel)
                        slideHtmlCta += '<a href="' + miscUrl + '" class="downloadDesc" target="_blank">' + miscLabel + '</a>';
                    $('<div class="slideCTA"></div>').html(slideHtmlCta).appendTo('#link_' + id);
                });
                // Apply Plugin w/ options
                $('.slide').liteCycle({
                    wait: 7000,
                    animationSpeed: 1000,
                    easing: 'easeInOutQuart',
                    pager: '#landingCarouselNav',
                    before: onBefore,
                    after: onAfter
                });
                function onBefore(currSlide, nextSlide) {
                    $('.titleWrap').removeClass('currTitle');
                    $(currSlide).find('.titleWrap').addClass('currTitle');
                    $(nextSlide).find('.titleWrap').not('.titleWrap.currTitle').css({ visibility: 'hidden' });
                }
                function onAfter(curr, next, currentSlideIndex) {
                    // Slide Titles in from left to right
                    $('.slide a .titleWrap').delay(100).css({ marginLeft: -410, width: 380, visibility: 'visible' }).animate({ marginLeft: 0 }, 700, 'easeOutExpo');
                    // Populate Content
                    var str = $('.slideCTA', next).html();
                    $('#currentCTA').html(str);
                    // Remove empty containers
                    $('.linkCTA:empty').remove();
                    // Undefined links shouldn't behave like links
                    $("a[href='undefined']").attr('href', 'javascript:void(0)').css({ cursor: 'default' });
                    // Set left margin on first available link
                    $('#currentCTA a:first').css({ marginLeft: 30 });

                    // Learn More links - numbered 1 and upwards
                    $('.linkCTA').click(function() {
                        var currentCtaIndex = ($(this).parent().children(".linkCTA").index(this) + 1);
                        if (currentCtaIndex == 1) {
                            clickedCTA = 'A';
                        }
                        if (currentCtaIndex == 2) {
                            clickedCTA = 'B';
                        }
                        if (currentCtaIndex == 3) {
                            clickedCTA = 'C';
                        }
                        var tracking_tag = 'Homepage Carousel_More_' + currentSlideIndex + '' + clickedCTA + '';
                        omnitureLogCustomEvent(tracking_tag);
                    });
                } // /End success
                // Slide up Nav bar
                $('#landingCarouselNavWrap').css({ visibility: 'visible', height: 0 }).animate({ height: 45 }, 1000, 'easeInOutQuart');
                $('#currentCTA').css({ marginTop: 35, visibility: 'hidden' }).delay(800).css({ visibility: 'visible' }).animate({ marginTop: 0 }, 800, 'easeInOutQuart');
                // Following line seems to be causing some sluggishness
                $('.slide a .titleWrap').delay(100).css({ marginLeft: -410, width: 380, visibility: 'visible' }).animate({ marginLeft: 0 }, 700, 'easeOutExpo');
                // Click tracking
                // Main Banner, can be custom - currently set as 1, matching first Learn More link
                $('a.linkCTABanner').click(function() {
                    currentBannerIndex = ($(this).parent().prevAll().length + 1);
                    var tracking_tag = 'Homepage Carousel_More_' + currentBannerIndex + 'A';
                    omnitureLogCustomEvent(tracking_tag);
                });
                // Navigation - numbered 1 and upwards
                $('#landingCarouselNav a').click(function() {
                    var currentNavIndex = $(this).text();
                    var tracking_tag = 'Homepage Carousel_Nav_' + currentNavIndex + '';
                    omnitureLogCustomEvent(tracking_tag);
                });
            },
            error: function() {
                $('#landingCarousel').css('background-image', 'url(/Shell/Hero/images/xbox_carousel_default.jpg)');
            }
        }); // END Fetch Carousel Data

    });
})(jQuery);
}

/*
     FILE ARCHIVED ON 06:36:22 Jun 21, 2011 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 01:41:34 May 11, 2026.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  capture_cache.get: 0.695
  load_resource: 307.099 (2)
  PetaboxLoader3.resolve: 256.992 (2)
  PetaboxLoader3.datanode: 47.955 (2)
*/