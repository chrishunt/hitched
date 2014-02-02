$(function() {
    var $flickr_photos = $('div.flickr .widget-pics'),
        $instagram_photos = $('div.instagram .widget-pics'),
        $dribbble_shots = $('div.dribbble .widget-pics');

    if (UltraMnml.flickrID && UltraMnml.showFlickrPhotos) {
        var link_str = "link",
            title_str = "title";

        $flickr_photos.jflickrfeed({
            limit: 6,
            qstrings: {
                id: UltraMnml.flickrID
            },
            itemTemplate: '<li><a href="{{' + link_str + '}}"><img src="{{image_s}}" alt="{{' + title_str + '}}" /></a></li>'
        }, function() {
            $flickr_photos.find('li:nth-child(3n)').css('margin-right', '0');

            if ($flickr_photos.find('li').length > 3) {
                $flickr_photos.find('li:nth-child(3)').css('margin-bottom', '10px');
            }
        });
    }

    if (UltraMnml.instagramAccessToken && UltraMnml.showInstagramPhotos) {
        $.getJSON('https://api.instagram.com/v1/users/self/media/recent/?access_token=' + UltraMnml.instagramAccessToken + '&count=6&callback=?', function(instagram_ob) {
            $.each(instagram_ob.data, function(i, item) {
                $('<img>').attr('src', item.images.low_resolution.url).appendTo($instagram_photos).wrap('<li><a href="' + item.link + '"></a></li>');

                $instagram_photos.find('li:nth-child(3n)').css('margin-right', '0');

                if ($instagram_photos.find('li').length > 3) {
                    $instagram_photos.find('li:nth-child(3)').css('margin-bottom', '10px');
                }
            });
        });
    }

    if (UltraMnml.dribbbleUsername && UltraMnml.showDribbbleShots) {
        $.getJSON('http://api.dribbble.com/players/' + UltraMnml.dribbbleUsername + '/shots/?callback=?', function(dribbble_obj) {
            $.each(dribbble_obj.shots, function(i, item) {
                if (i === 6) return false;

                $('<img>').attr('src', item.image_teaser_url).appendTo($dribbble_shots).wrap('<li><a href="' + item.url + '"></a></li>');

                $dribbble_shots.find('li:nth-child(3n)').css('margin-right', '0');

                if ($dribbble_shots.find('li').length > 3) {
                    $dribbble_shots.find('li:nth-child(3)').css('margin-bottom', '10px');
                }
            });
        });
    }
});