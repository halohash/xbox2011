var _____WB$wombat$assign$function_____=function(name){return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name))||self[name];};if(!self.__WB_pmw){self.__WB_pmw=function(obj){this.__WB_source=obj;return this;}}{
let window = _____WB$wombat$assign$function_____("window");
let self = _____WB$wombat$assign$function_____("self");
let document = _____WB$wombat$assign$function_____("document");
let location = _____WB$wombat$assign$function_____("location");
let top = _____WB$wombat$assign$function_____("top");
let parent = _____WB$wombat$assign$function_____("parent");
let frames = _____WB$wombat$assign$function_____("frames");
let opens = _____WB$wombat$assign$function_____("opens");
(function ()
{
    var xbox = window.xbox = window.xbox || {};

    var videoPlayer = (function ()
    {

        // Generic Functions
        var populateGameTrailerInitParams = function (url, mediaTitle, ratingID, ratingDescriptorIDs, onLoaded)
        {
            setOmnitureVars(url, mediaTitle, 'GameVideo', '');

            var initParams = "mediaType=gametrailer";
            initParams += ",videoSourceURL=" + url;
            initParams += ",mediaTitle=" + mediaTitle;
            initParams += ",ratingID=" + ratingID;
            initParams += ",ratingDescriptorIDs=" + ratingDescriptorIDs;
            initParams += ",onPlayerClose=" + onLoaded;

            initParams += getUserDOB();

            return initParams;
        }

        var populateOtherInitParams = function (url, mediaTitle, minimumAge, onLoaded)
        {
            setOmnitureVars(url, mediaTitle, 'OtherVideo', '');

            var initParams = "mediaType=other";
            initParams += ",videoSourceURL=" + url;
            initParams += ",mediaTitle=" + mediaTitle;
            initParams += ",minimumAge=" + minimumAge;
            initParams += ",onPlayerClose=" + onLoaded;

            initParams += getUserDOB();

            return initParams;
        }

        var populateGuidInitParams = function (mediaType, mediaID, mediaTitle, onLoaded)
        {
            setOmnitureVars(mediaID, mediaTitle, MediaTypes[mediaType], mediaID);

            var initParams = "mediaType=" + mediaType.toLowerCase();
            initParams += ",mediaGuid=" + mediaID;
            initParams += ",mediaTitle=" + mediaTitle;
            initParams += ",onPlayerClose=" + onLoaded;

            initParams += getUserDOB();

            return initParams;
        }

        var getUserDOB = function ()
        {
            var dobStr = "";
            if (currentUser && currentUser.dob && !isNaN(currentUser.dob.getTime()))
            {
                dobStr += ",birthDateYear=" + currentUser.dob.getFullYear();
                dobStr += ",birthDateMonth=" + (currentUser.dob.getMonth() + 1);
                dobStr += ",birthDateDay=" + currentUser.dob.getDate();
            }
            return dobStr;
        }

        var createSilverlightObject = function (hostId, objectId, culture, uiCulture, initParams, onLoaded)
        {
            setOmniturePlayerLaunchedEventAndPostToOmniture();

            var host = $('#' + hostId);
            //host.height(host.parent().innerHeight());
            //host.width(host.parent().innerWidth());

            Silverlight.createObject(
                VideoPlayerUrl,
                document.getElementById(hostId),
                objectId,
                {
                    width: '100%',
                    height: '100%',
                    background: '#333',
                    version: '4.0.50401.0',
                    autoUpgrade: 'true',
                    culture: culture,
                    uiculture: uiCulture,
                    windowless: 'true',
                    enablehtmlaccess: 'true'
                },
                { onLoad: onLoaded, onError: onSilverlightError },
                initParams,
                'context');
        }

        var closeSilverlightObject = function (hostId)
        {
            var host = $('#' + hostId);
            if (typeof (host) !== 'undefined')
            {
                host.height(0);
                host.width(0);
                //host.html("");
            }
        }

        var onSilverlightError = function (sender, args)
        {
            // Display error message.
        }

        var MediaTypes = {
            GameTrailer: 'GameTrailer',
            TVEpisode: 'TVEpisode',
            Movie: 'Movie',
            MovieTrailer: 'MovieTrailer',
            Other: 'Other'
        }

        // Omniture
        var setOmnitureVars = function (contentUrl, mediaTitle, mediaType, mediaID)
        {
            if (omnitureTrackingOn())
            {
                s.prop44 = s.eVar21 = 'XboxComVideoPlayer';

                if (mediaType)
                {
                    s.prop45 = s.eVar22 = mediaType;
                }
                else
                {
                    s.prop45 = s.eVar22 = MediaTypes.OtherVideo;
                    alert("MediaType: " + MediaTypes.OtherVideo);
                }

                s.prop46 = s.eVar23 = 'Vid';
                if (mediaID)
                {
                    s.prop46 = s.eVar23 += '-' + mediaID;
                }
                if (mediaTitle)
                {
                    s.prop46 = s.eVar23 += '-' + mediaTitle;
                }
                if(s.prop46=='Vid-')
                {
                    s.prop46 = s.eVar23 += '-' + contentUrl;
                }
            }
        }

        var setOmniturePlayerLaunchedEventAndPostToOmniture = function ()
        {
            if (omnitureTrackingOn())
            {
                s.events = 'event11';
                postToOmniture('event11');
            }
        }

        var postToOmniture = function (event)
        {
            if (omnitureTrackingOn())
            {
                s.events = event;
                s.t();
            }
        }

        var omnitureTrackingOn = function ()
        {
            return typeof (s) !== 'undefined';
        }

        // Video Player API
        var openVideoGameTrailer = function (hostId, objectId, url, mediaTitle, ratingID, ratingDescriptorIDs, culture, uiCulture, onClose)
        {
            createSilverlightObject(hostId, objectId, culture, uiCulture, populateGameTrailerInitParams(url, mediaTitle, ratingID, ratingDescriptorIDs, onClose));
        }

        var openVideoOther = function (hostId, objectId, url, mediaTitle, minimumAge, culture, uiCulture, onClose)
        {
            createSilverlightObject(hostId, objectId, culture, uiCulture, populateOtherInitParams(url, mediaTitle, minimumAge, onClose));
        }

        var openVideoMovie = function (hostId, objectId, mediaId, mediaTitle, culture, uiCulture, onClose)
        {
            createSilverlightObject(hostId, objectId, culture, uiCulture, populateGuidInitParams("Movie", mediaId, mediaTitle, onClose));
        }

        var openVideoMovieTrailer = function (hostId, objectId, mediaId, mediaTitle, culture, uiCulture, onClose)
        {
            createSilverlightObject(hostId, objectId, culture, uiCulture, populateGuidInitParams("MovieTrailer", mediaId, mediaTitle, onClose));
        }

        var openVideoTVEpisode = function (hostId, objectId, mediaId, mediaTitle, culture, uiCulture, onClose)
        {
            createSilverlightObject(hostId, objectId, culture, uiCulture, populateGuidInitParams("TVEpisode", mediaId, mediaTitle, onClose));
        }

        // public functions
        return {
            openVideoGameTrailer: openVideoGameTrailer,
            openVideoOther: openVideoOther,
            openVideoMovie: openVideoMovie,
            openVideoMovieTrailer: openVideoMovieTrailer,
            openVideoTVEpisode: openVideoTVEpisode,
            closeSilverlightObject: closeSilverlightObject,
            postToOmniture: postToOmniture
        };
    })();

    xbox.videoPlayer = videoPlayer;
})();
}

/*
     FILE ARCHIVED ON 17:58:56 Jul 02, 2011 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 01:41:35 May 11, 2026.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  capture_cache.get: 0.54
  load_resource: 1388.108
  PetaboxLoader3.resolve: 1382.393
  PetaboxLoader3.datanode: 4.848
*/