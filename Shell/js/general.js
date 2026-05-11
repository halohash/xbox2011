var _____WB$wombat$assign$function_____=function(name){return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name))||self[name];};if(!self.__WB_pmw){self.__WB_pmw=function(obj){this.__WB_source=obj;return this;}}{
let window = _____WB$wombat$assign$function_____("window");
let self = _____WB$wombat$assign$function_____("self");
let document = _____WB$wombat$assign$function_____("document");
let location = _____WB$wombat$assign$function_____("location");
let top = _____WB$wombat$assign$function_____("top");
let parent = _____WB$wombat$assign$function_____("parent");
let frames = _____WB$wombat$assign$function_____("frames");
let opens = _____WB$wombat$assign$function_____("opens");
/// <reference path="https://web.archive.org/web/20110702175702/http://ajax.microsoft.com/ajax/jQuery/jquery-1.4.2-vsdoc.js" />

// name - name of the desired cookie, returns null if name is not a valid cookie.
function setCookie(name, value, days) {
    var expires;
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    } else {
        expires = "";
    }
    var domain = document.domain;
    var baseDomain = domain.substring(domain.indexOf("."), domain.length);

    document.cookie = name + "=" + value + expires + "; path=/;domain=" + baseDomain;
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return unescape(c.substring(nameEQ.length, c.length));
    }
    return null;
}

function deleteCookie(name) {
    setCookie(name, "", -1);
}

/* Current User object */
function currentUserObject() {
    this.isSignedIn = false;
    this.gamertag = "????????";
    this.profileUrl = "";
    this.tier = 0;
    this.gamerscore = 0;
    this.gamesUrl = "#";
    this.messageCount = 0;
    this.messageUrl = "#";
    this.notificationCount = 0;
    this.notificationUrl = "#";
    this.dob = null;
}
var currentUser = new currentUserObject();

function processShellData(shellData) {
    if ((shellData == undefined) || (shellData == null))
        return;

    currentUser.isSignedIn = shellData.signedin;
    if (shellData.signedin) {
        currentUser.gamertag = shellData.gamertag;
        currentUser.profileUrl = shellData.myxboxurl;
        $("div#ShellMeBarArea div#GamerStatArea h1#gamertag").html("<a href=\"" + shellData.myxboxurl + "\">" + shellData.gamertag + "</a>");
        $("div#ShellMeBarArea div#HeadShotBox").attr("title", shellData.gamertag);

        currentUser.gamerscore = shellData.gamerscore;
        currentUser.gamesUrl = shellData.mygamesurl;
        $("div#ShellMeBarArea div#GamerStatArea a#gamerscore").attr("href", shellData.mygamesurl);
        $("div#ShellMeBarArea div#GamerStatArea a#gamerscore div").html(shellData.gamerscore).show();

        currentUser.notificationCount = shellData.notifications;
        currentUser.notificationUrl = shellData.notificationsurl;
        if (shellData.displaynotifications) {
            $("div#ShellMeBarArea div#GamerStatArea a#notifications").attr("href", shellData.notificationsurl);
            $("div#ShellMeBarArea div#GamerStatArea a#notifications div").html(shellData.notifications).show();
        }

        currentUser.messageCount = shellData.messages;
        currentUser.messageUrl = shellData.messagesurl;
        if (shellData.displaymessages) {
            $("div#ShellMeBarArea div#GamerStatArea a#messages").attr("href", shellData.messagesurl);
            $("div#ShellMeBarArea div#GamerStatArea a#messages div").html(shellData.messages).show();
        }

        currentUser.tier = shellData.tier;
        $("div#ShellMeBarArea span#AdditionalLinks span#tier").attr("tier", shellData.tier).html(shellData.tiertext);

        if (shellData.displaypoints) {
            $("div#ShellMeBarArea span#AdditionalLinks span#points").html("<span class=\"points\">" + shellData.pointsbalancetext + "<span class=\"pointsIcon\"></span></span> <a href=\"" + shellData.addpointsurl + "\">" + shellData.addpointstext + "</a>");
        } else {
            $("div#ShellMeBarArea span#AdditionalLinks span#points").hide();
        }

        var isHttps = (window.location.protocol == "https:");
        $("div#ShellMeBarArea div#HeadShotBox a").attr("href", shellData.myxboxurl);
        $("div#ShellMeBarArea div#HeadShotBox a div").css("background-image", "url(" + (isHttps ? shellData.securegamerpic : shellData.gamerpic) + ")");

        currentUser.dob = new Date(shellData.dobYear, shellData.dobMonth, shellData.dobDay);
        $(document).trigger('currentUserReady');
    }
}

function processShellSubscriptionData(shellData) {
    if ((shellData == undefined) || (shellData == null))
        return;
        
    if (shellData.signedin) {
        $("div#ShellMeBarArea span#AdditionalLinks span#ShellSubscriptionNotificationArea").html(createSubscriptionNotificationLinkHTML(shellData.subscriptiontext, shellData.subscriptionurl));
    }
}

function createSubscriptionNotificationLinkHTML(subscriptionText, subscriptionUrl) {
    if ((subscriptionUrl == "") || (subscriptionText == ""))
        return "";

    var html = "&nbsp;&nbsp;<a class=\"MeBarSubscriptionLink\" Name=\"MeBarSubscriptionLink\" href=\"" + subscriptionUrl + "\">";
    html += subscriptionText;
    html += "</a>";
    return html;
}

function postXDMessage(msg) {
    if (window.parent) {
        window.parent.postMessage(msg , '*');
     }
}

/*************************************************
Dropdown menu construction
*************************************************/

var DropdownMenuTracker = new Object;

function CreateDropdownMenus(jquerySelectPattern) {
    var menu = new DropdownMenu(jquerySelectPattern);
    DropdownMenuTracker[jquerySelectPattern] = menu;

    $(jquerySelectPattern).bind('mouseover', menu.OpenFunction);
    $(jquerySelectPattern).bind('mouseout', menu.TimerFunction);
    $(jquerySelectPattern).bind('click', menu.CloseFunction);
    $(document).bind('click', menu.CloseFunction);
}

function DropdownMenu(selectionPattern) {
    this.Item = 0;
    this.CloseTimer = 0;
    this.Timeout = 500;

    this.CancelFunction = function() {
        if (DropdownMenuTracker[selectionPattern].CloseTimer) {
            window.clearTimeout(DropdownMenuTracker[selectionPattern].CloseTimer);
            DropdownMenuTracker[selectionPattern].CloseTimer = null;
        }
    };
    this.CloseFunction = function() {
        if (DropdownMenuTracker[selectionPattern].Item)
            DropdownMenuTracker[selectionPattern].Item.css('visibility', 'hidden');
    };
    this.OpenFunction = function() {
        DropdownMenuTracker[selectionPattern].CancelFunction();
        DropdownMenuTracker[selectionPattern].CloseFunction();
        DropdownMenuTracker[selectionPattern].Item = $(this).find('ul').css('visibility', 'visible');
    };
    this.TimerFunction = function() {
        DropdownMenuTracker[selectionPattern].CloseTimer = window.setTimeout(DropdownMenuTracker[selectionPattern].CloseFunction, DropdownMenuTracker[selectionPattern].Timeout);
    };
}

/*************************************************
Search Context interaction
*************************************************/

function SetSearchContext(url, contextString) {
    $('#SearchTextBox').attr('url', url);
    $('#SearchButton').attr('title', contextString);
    $('#SearchContextDisplay').html(contextString);
}

function showSearchResults() {
    var searchText = encodeURIComponent($('#SearchTextBox').val());
    var url = $('#SearchContext').val();

    if (searchText != undefined && searchText != '')
        top.location = url.replace('{0}', searchText);
}

function AddEvent(obj, evType, fn, useCapture) {
    if (obj.addEventListener) {
        obj.addEventListener(evType, fn, useCapture);
        return true;
    }
    else if (obj.attachEvent) {
        var r = obj.attachEvent('on' + evType, fn);
        return r;
    }
    else {
        obj['on' + evType] = fn;
    }
}

function setDialogMessageLevel(MessageLevel) {
    switch (MessageLevel) {
        case 1:
            $('.ui-widget-header').addClass('WarningDialog');
            $('.ui-dialog').addClass('WarningDialog');
            break;
        case 2:
            $('.ui-widget-header').addClass('ErrorDialog');
            $('.ui-dialog').addClass('ErrorDialog');
            break;
        default:
            $('.ui-widget-header').addClass('ConfirmDialog');
            $('.ui-dialog').addClass('ConfirmDialog');
    }
}

var MessageLevelType = { "Confirmation": 0, "Warning": 1, "Error": 2 }
var DisplayConfirmationDialog_Dialog;
function DisplayConfirmationDialog(TitleText, BodyText, YesText, NoText, YesCallbackFunction, NoCallbackFunction, Context, MessageLevel) {
    YesCallbackFunction = YesCallbackFunction || function() { };
    NoCallbackFunction = NoCallbackFunction || function() { };

    var buttonsObj = {};
    buttonsObj[YesText] =
        function() {
            YesCallbackFunction(Context);
            $(this).dialog("close");
        };

    buttonsObj[NoText] =
        function() {
            NoCallbackFunction(Context);
            $(this).dialog("close");
        };

    if (!DisplayConfirmationDialog_Dialog) {
        var dialogObj = {
            autoOpen: false,
            title: "<span class=\"Icon\"></span>" + TitleText,
            closeText: "",
            draggable: false,
            modal: true,
            resizable: false,
            width: 400
        }

        DisplayConfirmationDialog_Dialog = $('<div></div>').dialog(dialogObj);
    }

    DisplayConfirmationDialog_Dialog.html(BodyText);
    DisplayConfirmationDialog_Dialog.dialog("option", "buttons", buttonsObj);
    setDialogMessageLevel(MessageLevel);

    var buttonSet = DisplayConfirmationDialog_Dialog.closest(".ui-dialog").find(".ui-dialog-buttonset");
    buttonSet.find('button:first')
        .addClass('ConfirmButton')
        .attr("name", "confirm");
    buttonSet.find('button:last')
        .addClass('CancelButton')
        .attr("name", "cancel");

    DisplayConfirmationDialog_Dialog.dialog('open');
}

function DisplayMessageDialog(TitleText, BodyText, OkText, OkCallbackFunction, MessageLevel) {
    OkCallbackFunction = OkCallbackFunction || function() { };

    var buttonsObj = {};
    buttonsObj[OkText] =
        function() {
            OkCallbackFunction();
            $(this).dialog("close");
        };

    var dialogObj = {
        autoOpen: false,
        title: "<span class=\"Icon\"></span>" + TitleText,
        modal: true,
        draggable: false,
        resizable: false,
        width: 400,
        buttons: buttonsObj
    }

    var messageDialog = $('<div></div>').html(BodyText).dialog(dialogObj);

    setDialogMessageLevel(MessageLevel);

    messageDialog.dialog('open');
};

var threatMetrixTimeoutReached = false;
var threatMetrixNextButtonClicked = false;
function enableThreatMetrixTimer(nextButtonId) {
    $(document).ready(function() {
        window.setTimeout(function() {
            threatMetrixTimeoutReached = true;
            if (threatMetrixNextButtonClicked == true) {
                $('#' + nextButtonId).click();
            }
        }, 3000);
    });
}
function performThreatMetrixAction(nextButtonPostId) {
    if ($('#ThreatMetrixIframe').length <= 0)
        return true;

    threatMetrixNextButtonClicked = true;
    showModalLoadingAnimation();
    if (threatMetrixTimeoutReached != true) {
        return false;
    }
    if (nextButtonPostId.length > 0) {
        __doPostBack(nextButtonPostId, '');
    }
    return true;
}

var modalLoadingAnimationDialog = null;
function showModalLoadingAnimation() {
    // reuse some of the jquery UI modal dialog 
    var dialogObj = { dialogClass: "loading-dialog", autoOpen: true, modal: true, draggable: false, resizable: false, closeOnEscape: false };

    if (modalLoadingAnimationDialog == null) {
        modalLoadingAnimationDialog = $('<div></div>').dialog(dialogObj);
    }
}
function hideModalLoadingAnimation() {
    if (modalLoadingAnimationDialog != null) {
        modalLoadingAnimationDialog.dialog('close');
    }
    modalLoadingAnimationDialog = null;
}


/*************************************************
Media Control - carousel to show content, images and SL video player
*************************************************/
var mcLastControl;
var mcLastPage;
var mcSelectedFormat;
var mcUnselectedFormat;

String.prototype.formatWith = function() {
    var s = this;
    for (var i = 0; i < arguments.length; i++) {
        var reg = new RegExp("\\{" + i + "\\}", "gm");
        s = s.replace(reg, arguments[i]);
    }
    return s;
}

function mcInitialize(startPageIds, selectedFormat, unselectedFormat) {
    mcSelectedFormat = selectedFormat;
    mcUnselectedFormat = unselectedFormat;

    for (var s in startPageIds) {
        var startPageId = startPageIds[s];
        if (startPageId.length > 0) {
            var startPage = $(startPageId);
            if (startPage.length == 1) {
                mcSetPage(startPage, null, null, null, true);
                $(startPage).children('img').load(function() { mcCompensateImageRatio($(this)); });
                break;
            }
        }
    }
}

function mcCompensateImageRatio(image) {
    var expectedHeight = $('#MediaControl').height();
    if (image && image.length && image.length == 1) {
        var imageHeight = image[0].height;
        if (imageHeight > expectedHeight) {
            image.css('margin-top', '-' + (imageHeight - expectedHeight) / 2 + 'px');
        };
    }
}

function mcClick(e) {
    var page, showPage, hidePage;
    var duration = 750;
    var easing = 'easeInOutQuart';

    switch (e.id) {
        case 'next': 
            {
                page = mcLastPage.nextAll('.TabPage').first();
                if (!page.length)
                    page = mcLastPage.siblings('.TabPage').first();
                showPage = function(a) { a.show('slide', { direction: 'right', easing: easing }, duration) };
                hidePage = function(a) { a.hide('slide', { direction: 'left', easing: easing }, duration) };
                mcSetPage(page, showPage, hidePage);
                break;
            }
        case 'previous': 
            {
                page = mcLastPage.prevAll('.TabPage').first();
                if (!page.length)
                    page = mcLastPage.siblings('.TabPage').last();
                showPage = function(a) { a.show('slide', { direction: 'left', easing: easing }, duration) };
                hidePage = function(a) { a.hide('slide', { direction: 'right', easing: easing }, duration) };
                mcSetPage(page, showPage, hidePage);
                break;
            }
        default: 
            {
                if (e && e.id && mcLastControl != e) {
                    page = $('#' + e.id + '1');
                    showPage = function(a) { a.fadeIn(); };
                    hidePage = function(a) { a.fadeOut(); };
                    mcSetPage(page, showPage, hidePage, e);
                }
            }
    }
}

function mcSetPage(page, showPage, hidePage, control, first) {
    if (!showPage)
        showPage = function(a) { a.show(); }

    if (!hidePage)
        hidePage = function(a) { a.hide(); }

    if (!control)
        control = mcLastControl;

    if (page.length && mcLastPage != page) {
        if (mcLastPage) {
            closeVideoViewer();
            hidePage($(mcLastPage));
        }

        showPage(page);
        if (first != true)
            mcCompensateImageRatio(page.children('img'));
        mcLastPage = page;

        if (!mcLastControl || page[0].id.indexOf(mcLastControl.id) != 0)
            control = document.getElementById(page[0].id.replace(/\d+$/, ''));

        if (mcLastControl != control) {
            if (mcLastControl) {
                var x = $(mcLastControl);
                x.parent().removeClass('Selected');
                var pages = $('.TabPage[id^={0}]'.formatWith(mcLastControl.id));
                x.children('.index').text(mcUnselectedFormat.formatWith(pages.length));
            }
            if (control)
                $(control).parent().addClass('Selected');
            mcLastControl = control;
        }

        var pages = $('.TabPage[id^={0}]'.formatWith(control.id));
        var index = page[0].id.replace(/^[^\d]+/, '');
        $(control).children('.index').text(mcSelectedFormat.formatWith(index, pages.length));
    }

    mcInitializeTextScroll();
}

function mcInitializeTextScroll() {
    $(document).ready(function() {
        var DescriptionText = $('#MediaControl #overview1 p');
        var ScrollTestContainer = $('#ScrollTest');

        //Don't call until container is visible on screen
        if (ScrollTestContainer.is(':hidden') && DescriptionText.width() > 0) {
            var DescriptionTextDownArrow = $('#MediaControl #downArrow');
            var DescriptionTextUpArrow = $('#MediaControl #upArrow');
            var ScrollTest = DescriptionText.clone().appendTo(ScrollTestContainer);
            ScrollTestContainer.show();

            //set fixed width and remove fixed height
            ScrollTest.css('height', 'auto');
            ScrollTest.css('width', DescriptionText.width() + 'px');

            //hide cloned div off screen
            ScrollTest.css('position', 'fixed');
            ScrollTest.css('top', 0);
            ScrollTest.css('left', '-' + ScrollTest.css('width'));

            //get actual calculated heights of the div and cloned div
            if (ScrollTest.height() > DescriptionText.height()) {
                DescriptionTextUpArrow.show();
                DescriptionTextDownArrow.show();

                DescriptionTextUpArrow.click(function() {
                    DescriptionText.animate({ scrollTop: '-=50px' }, 'slow');
                });

                DescriptionTextDownArrow.click(function() {
                    DescriptionText.animate({ scrollTop: '+=50px' }, 'slow');
                });
            }

            ScrollTestContainer.html(''); //Remove cloned text div
        }
    });
}

(function($) {
    var _addRequestVerificationToken = function(data) {
        var token = $('input[name="__RequestVerificationToken"]').val();
        if (!!token) {
            return $.extend({}, data, { '__RequestVerificationToken': token });
        }

        return data;
    };

    var _postWithToken = function(url, data, callback, type) {
        var dataWithToken = data;

        if ($.isPlainObject(data)) {
            dataWithToken = _addRequestVerificationToken(data);
        }

        return $.post(url, dataWithToken, callback, type);
    };
    $.extend({ postWithToken: _postWithToken });

    $(function() {
        $(".phoneAppBuyButton").bind("click", function() {
            window.open($(this).attr("value"), '_blank');
        });
    });
})(jQuery);

/*************************************************
Unified Search Providers
*************************************************/

//generic Ajax request built using the params provided by the Search Providers in the UnifiedSiteSearch Controller
function getAjaxSearchResults(queryUrl, returnType, returnFunction, searchName, containerId, moreUrl, keywords ) {

            $.ajax
          ({
           type: "GET",
           url: queryUrl,
           dataType: returnType,
           success:function(response){

               returnFunction(response, searchName, containerId, moreUrl, keywords)
           
           } })

    };

//XBox.com unified search provider result processing- called upon the AJAX response returning
function processXboxResults(response, searchName, containerId, moreUrl, keywords)
{ 
    //clear any existing results
     $(containerId).html('');

     //sanitizing keywords from query so we can use it in the search title line
     var searchTitle = $("<h2/>", {text: searchName + "- search results for &quot;" + keywords + "&quot;"});
     $(containerId).append(searchTitle);

       if (response.SearchResponse.Errors || response.SearchResponse.Web.Total <= 0) {

            $(containerId).html("<div>No Results</div>");
        }
       else{
     
             $.each(response.SearchResponse.Web.Results, function (i, data) {
                var title = data.Title;
                var desc = data.Description;
                var url = data.Url;

                var resultOutput = $("<div><h3><a href='" + url + "'>" + title + "</a></h3></div><div>" + desc + "</div><hr/><br/>");
               
                 $(containerId).append(resultOutput); 
                  });    
                  
                var moreLink = $("<a href='" + moreUrl + "'>more...</a>");      
                $(containerId).append(moreLink); 

        }
    }

/*************************************************
Video Player - calls to launch video player  
*************************************************/
function closeVideoViewer()
{
    var host = $('#silverlightVideoHost');
    if (typeof (host) !== 'undefined')
    {
        host.height(0);
        host.width(0);
        $('.silverlightVideoHost').show();
    }
}

function openSplashVideoViewer(url, mediaTitle, minimumAge, culture, uiCulture) {
    closeVideoViewer();

    $('.silverlightVideoHost').hide();
    var host = $('#silverlightVideoHost');

    host.height(host.parent().innerHeight());
    host.width(host.parent().innerWidth());
    xbox.videoPlayer.openVideoOther('silverlightVideoHost', 'silverlightVideoObject', url, mediaTitle, minimumAge, culture, uiCulture, 'onCloseVideoViewer');
}

function openVideoViewer(url, mediaTitle, ratingID, ratingDescriptorIDs, minimumAge, culture, uiCulture)
{
    closeVideoViewer();

    $('.silverlightVideoHost').hide();
    var host = $('#silverlightVideoHost');

    host.height(host.parent().innerHeight());
    host.width(host.parent().innerWidth());
    xbox.videoPlayer.openVideoGameTrailer('silverlightVideoHost', 'silverlightVideoObject', url, mediaTitle, ratingID, ratingDescriptorIDs, culture, uiCulture, 'onCloseVideoViewer');
}

function onCloseVideoViewer(sender, e)
{
    closeVideoViewer();
}

/*************************************************
Splash pages Omniture Tracking  
*************************************************/
if ("undefined" == typeof siteCatalystTracking)
{
     var siteCatalystTracking = new Object();
};
 
var siteCatalystTracking = {
              track:function(obj,propList,custom_link_type){
             
                     // Default link tracking type if not present
                     custom_link_type = custom_link_type ? custom_link_type : 'o';
                    
                     // Create s variable if not presently defined
                     var my_s = s ? s : s_gi(s_account);
                    
                     // Clear variables
                     s.linkTrackVars = '';
                     s.linkTrackEvents = 'None';
                    
                     // Loop thru propList & concatenate
                     for(prop in propList){
                           
                            s.linkTrackVars += prop + ","
                            s[prop] = propList[prop];
                     }
                     s.tl(obj, custom_link_type, '');
                    
              }
}
}

/*
     FILE ARCHIVED ON 17:57:02 Jul 02, 2011 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 01:41:34 May 11, 2026.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  capture_cache.get: 0.509
  load_resource: 263.573
  PetaboxLoader3.resolve: 136.881
  PetaboxLoader3.datanode: 125.399
*/