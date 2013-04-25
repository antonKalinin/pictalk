/**
 * UI library (notifies and modals, custom scrolls and selects)
 * This script handle common UI tasks.  
 */ 
 
"use strict";

/* ALIASES */
function ge(el) { return (typeof el == 'string' ? document.getElementById(el) : el); }

var UI = UI || (function($) {
    /* private properties for all UI js library */
    /* initialization */
    return {};
})(jQuery);

// notify module
UI.namespace('UI.notify');
UI.notify = function (html, opts) {
    "use strict";
    var notify = $('<div/>').addClass('notify'),
        defs = {
            position: 'top', // top, center, bottom
            cssClass: '',    // custom css class 
            showTime: 1500,  // duration of show
            closable: true,  // is auto close 
            speed: 500,      // speed of apearence
            onClose: null    // callback function when notify disapeared
        };
        
    /* render new notify */    
    
    var p = {};
        p = $.extend(true, defs, opts);
        
    // set notify in the middle by x axis
    $('body').append(notify);
    notify.html(html);
    notify.css('left', $(window).width() / 2 - notify.width() / 2);

    // set settings for notify
    if (p.cssClass != '') notify.addClass(p.cssClass);
    
    var ncls = '', ntop = 0;
    if(p.position) {
        switch(p.position) {
            case 'top':
                ncls = 'notify-top';
                break;
            case 'bottom':
                ncls = 'notify-bottom';
                ntop = $(window).height() - notify.height();
                break;
            case 'center':
                ntop = $(window).height() / 2 - notify.height() / 2;
        }
    }
    
    notify.addClass(ncls);
    notify.css('top', ntop);
    
    /*  display notify */
    notify.fadeIn(p.speed, function() {
        if(p.closable) {
            notify.delay(p.showTime).fadeOut(p.speed, function(){ p.onClose(); });
        }
    });
    
    return {
        /* return an object (empty yet) */
    };
};
