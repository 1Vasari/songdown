'use strict';

// Some default variables...
var FONT_SIZE = 16;
var FADE_TIME = 300; // milli-seconds

// All the themes 'n' stuff stuff.
var THEMES = [
    {
        name : 'Default',
        url  : 'static/css/theme-default.css'
    },
    {
        name : 'Colourful',
        url  : 'static/css/theme-colourful.css'
    }
];

function init() {
    $('#fontSize').attr('value', FONT_SIZE);
    setFontSize(FONT_SIZE);

    // Initialize the theme selector.
    var $el = $('#themeSelector');
    for (var i = 0; i < THEMES.length; i++) {
        var theme = THEMES[i];
        $el.append('<option value="' + theme.url + '">' + theme.name + '</option>');
    }

    initEvents();
    showContent();
}

function initEvents() {
    $('#fontSize').off().on('change', function() {
        setFontSize(parseInt($(this).val(), 10));
    });

    $('#viewSelector').off().on('change', function() {
        changeViewMode(parseInt($(this).val(), 10));
    });

    $('#themeSelector').off().on('change', function() {
        changeTheme($(this).val());
    });

    // Note: a CSS media query handles the hiding of the sidebar and making
    //   sure that none of the verses are cut across pages.
    $('#printButton').off().on('click', function(event) {
        event.preventDefault();
        window.print();
    });
}

function showContent() {
    $('#song').fadeIn(FADE_TIME);
}

function setFontSize(size) {
    size = size || FONT_SIZE;
    $('#song').css('font-size', size + 'px');
}

function changeViewMode(num) {

    // Show Chords and Lyrics
    if (num === 0) {
        $('.verse.chords, .verse.lyrics').fadeIn(FADE_TIME);
    }
    // Lyrics only.
    else if (num === 1) {
        $('.verse.chords').fadeOut(FADE_TIME);
        $('.verse.lyrics').fadeIn(FADE_TIME);
    }
}

function changeTheme(url) {
    $('#themeCssElement').attr('href', url);
}

$(window.document).on('ready', init);
