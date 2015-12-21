/*!--------------------------------------------------------------------------------

 Theme Name: <%= appName %>
 Version:    <%= appVersion %>
 Author:     <%= appAuthor %> <% if (appEmail !== ''){ %><<%= appEmail %>><% } %>

 -----------------------------------------------------------------------------------*/

if (Modernizr.touch === true && $(window).width() <= 767) {
    //alert('Touch Screen');
} else {

}

(function ($) {
    "use strict";

    // Placeholders
    // https://github.com/mathiasbynens/jquery-placeholder
    function inputPlaceholders() {
        $('input, textarea').placeholder();
    }

    // Scroll to top
    function scrollToTop() {
        $('.x-scroll-top').on('click', function () {
            $('html, body').animate({
                scrollTop: 0
            }, 1000);
            return false;
        });
    }

    function init() {
        inputPlaceholders();
        scrollToTop();
    }

    init();

})(jQuery);