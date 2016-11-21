$(window).ready(function() {
    wyrownanie_kolumn();
    checkWindow();
});

$(window).resize(function() {
    wyrownanie_kolumn();
    checkWindow();
    singleImageWidth();
});

$(document).ready(function() {
    checkWindow();
    wyrownanie_kolumn();
    stickyHeader();

    $(window).on('scroll touchmove', function() {
        $('header, .container-nav, .container-nav .container, .container-nav .logo, nav, .menu-item a').addClass('tinyHead', $(document).scrollTop() > 50);
    }).scroll();

    //start counter
    $(window).scroll(startCounter);


    // taby
    var timer = window.setInterval(slide, 5000);

    $(".tab-content").hide();
    $(".tab-content.active").show();
    $('.tabs').each(function() {
        var $a = $(this).find('a');
        $a.on('click', function(e) {

            $('.tab-content.active').hide();
            clearInterval(timer);
            timer = window.setInterval(slide, 200000);
            var $this = $(this);

            var href = $this.attr('href');

            var $target = $(href);

            if ($target.length) {
                e.preventDefault();

                $this.siblings('a').removeClass('active');

                $this.addClass('active');

                $target.siblings('.tab-content').removeClass('active');
                $target.addClass('active').fadeIn('slow');

            }
        });
    });

    $("#tab-contents").mouseover(function() {
        clearInterval(timer);
        timer = window.setInterval(slide, 200000);
        console.log("wydłuż czas");
    });

    var tablicaSlidow = $(".tabs-container").children().toArray();
    var currentActive = tablicaSlidow[0];
    var tablicaTabow = $(".tabs a").toArray();
    var currentTab = tablicaTabow[0];
    var nextActive;
    var idx = 0;
    slide();

    function slide() {
        currentActive = $(".tab-content.active");
        currentTab = $(".tabs a.active");
        if (idx < 4) {
            idx++;
            nextActive = tablicaSlidow[idx];
            nextTab = tablicaTabow[idx];
        } else {
            idx = 0;
            nextActive = tablicaSlidow[0];
            nextTab = tablicaTabow[0];
        }

        currentActive.removeClass("active");

        $(nextActive).addClass("active");
        currentTab.removeClass('active');
        $(nextTab).addClass("active");
        doSlider();
    }

    function doSlider() {
        $(".tab-content").each(function() {
            if ($(this).hasClass("active")) {

                $(this).fadeIn();
            } else {
                $(this).fadeOut();
            }
        });
    }
    // end taby

    // video background

    // Resive video
    initBannerVideoSize('.video-container .poster img');
    initBannerVideoSize('.video-container .filter');
    initBannerVideoSize('.video-container video');

    $(window).on('resize', function() {
        scaleBannerVideoSize('.video-container .poster img');
        scaleBannerVideoSize('.video-container .filter');
        scaleBannerVideoSize('.video-container video');
    });

});


/** Reusable Functions **/
/********************************************************************/

function initBannerVideoSize(element) {

    $(element).each(function() {
        $(this).data('height', $(this).height());
        $(this).data('width', $(this).width());
    });

    scaleBannerVideoSize(element);

}

function scaleBannerVideoSize(element) {

    var windowWidth = $(window).width(),
        windowHeight = $(window).height(),
        videoWidth,
        videoHeight;

    $(element).each(function() {
        var videoAspectRatio = $(this).data('height') / $(this).data('width'),
            windowAspectRatio = windowHeight / windowWidth;

        if (videoAspectRatio > windowAspectRatio) {
            videoWidth = windowWidth;
            videoHeight = videoWidth * videoAspectRatio;

            $(this).css({
                'top': -(videoHeight - windowHeight) / 2 - 61 + 'px',
                'margin-left': 0
            });

        } else {
            videoHeight = windowHeight;
            videoWidth = videoHeight / videoAspectRatio;
            $(this).css({
                'margin-top': 0,
                'margin-left': -(videoWidth - windowWidth) / 2 + 'px'
            });
        }

        $(this).width(videoWidth).height(videoHeight);

        $('.homepage-hero-module .video-container video').addClass('fadeIn animated');

    });
}

// Video modal mobile

function videoInModal() {

    $("#button-video").css("display", "block");
    $("#button-video-yt").css("display", "none");

}

function videoOnYoutube() {
    $("#button-video").css("display", "none");
    $("#button-video-yt").css("display", "block");
}

// widget contact icon phone left

$('.float-icon').click(function() {
    var a = $('.float-widget').css("left");

    if (a == "0px") {
        $('.float-widget').animate({
            left: -360
        }, 500);
    } else {
        $('.float-widget').animate({
            left: 0
        }, 500);
    }
});

// modale

function openModal(button, modal) {
    button.click(function() {
        if ($(window).width() < 768) {
            modal.slideDown();
        } else {
            modal.fadeIn();
        }

    });
}

openModal($("#button-video"), $("#video-modal"));
openModal($("#aprthotel-opinie"), $("#opinie-modal"));
openModal($("#poznaj-opinie"), $("#opinie-modal"));

$(".close").click(function() {
    if ($(window).width() < 768) {
        $(".modal").slideUp();
    } else {
        $(".modal").fadeOut();
    }
})

$(".modal").click(function(event) {
    if (event.target == this) {
        $(this).fadeIn();
    }
});

// wyrównanie wysokości kolumn

function wyrownanie_kolumn() {

    if ($(window).width() >= 769) {

        $(".column-equal-height").each(function() {
            var column_bigger = $(this).find(".bigger").height();
            $(this).find(".smaller").height(column_bigger);

        });

    }
}

//gallery
var numberImage;

$("#prev").click(function() {

    if (numberImage == 1) {
        numberImage = 13
    } else {
        numberImage--
    }

    $("#modal-content").html("<img src='http://green-mountain-resort.pl/wp-content/uploads/2016/11/galeria-item-" + numberImage + ".jpg' alt='zdjęcie galeria' />");
    singleImageWidth();

});

$("#next").click(function() {

    if (numberImage < 13) {
        numberImage++;
    } else {
        numberImage = 1
    }

    $("#modal-content").html("<img src='http://green-mountain-resort.pl/wp-content/uploads/2016/11/galeria-item-" + numberImage + ".jpg' alt='zdjęcie galeria' />");
    singleImageWidth();

});

function getSizeModal() {

    var heightModal = $("#gallery-modal").height();
    var widthModal = $("#gallery-modal").width();

    $("#gallery-modal").css("top", ($(window).height() - heightModal) / 2 + 20);
    $("#gallery-modal").css("left", ($(window).width() - widthModal) / 2 + 65);

}

$(window).resize(getSizeModal);

$('#gallery a').click(function(event) {
    event.preventDefault();


    var numberImage = $(this).attr("number");
    var sourceImage = "http://green-mountain-resort.pl/wp-content/uploads/2016/11/galeria-item-" + numberImage + ".jpg";
    $("#modal-content").html("<img src='" + sourceImage + "' alt='zdjęcie galeria' />");

    if ($(window).width() > 768) {
        $("#overlay").fadeIn();
        getSizeModal();

    }

    if ($(window).width() <= 768) {
        singleImageWidth();
    }
    $("#gallery-modal").fadeIn();
});


function singleImageWidth() {
    var galeriaWidth = $(window).width() - 120;
    $("#modal-content img").css("width", galeriaWidth);
    var galleryModalHeight = $("#modal-content img").width() + 40;
    $("#gallery-modal").width(galleryModalHeight);


}



$('#close, #overlay').click(function(event) {
    $("#gallery-modal").fadeOut();
    $("#overlay").fadeOut();
});

//    Scroll buttons
$('.scroll-button').click(function(event) {

    var target = $($(this).attr('href'));

    if (target.length) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: target.offset().top - 110
        }, 2000);
    }
});

// Mobile menu
function checkWindow() {
    if ($(window).width() > 768) {
        stickyHeader();
        videoInModal();

    } else {

        videoOnYoutube();

    }
}

//Sticky header
function stickyHeader() {

    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) {
            $("header, .container-nav, .container-nav .container, .container-nav .logo, nav, .menu-item a").addClass("sticky");


        } else {
            $("header, .container-nav, .container-nav .container, .container-nav .logo, nav, .menu-item a").removeClass("sticky");
        }
    });
}

// menu mobile
$("#mobile-button").click(function() {
    $("nav").slideToggle('fast');

    if ($("nav").hasClass('open')) {
        $("nav, .hamburger").removeClass('open');

    } else {
        $("nav, .hamburger").addClass('open');
    }
});

// Counters
function startCounter() {
    setInterval(find_counter, 100);
}

function find_counter() {
    if ($("#count-start-kalkulator span").hasClass('count')) {
        var hT_kalkulator = $('#count-start-kalkulator .count').offset().top,
            hH_kalkulator = $('#count-start-kalkulator .count').outerHeight(),
            wH_kalkulator = $(window).height();
        if ($(window).scrollTop() > hT_kalkulator + hH_kalkulator - wH_kalkulator) {
            $(window).off("scroll", startCounter);
            setTimeout(counter_kalkulator, 100);
        }
    } else if ($("#count-start-lomnica span").hasClass('count')) {
        var hT_lomnica = $('#count-start-lomnica .count').offset().top,
            hH_lomnica = $('#count-start-lomnica .count').outerHeight(),
            wH_lomnica = $(window).height();
        if ($(window).scrollTop() > hT_lomnica + hH_lomnica - wH_lomnica) {
            $(window).off("scroll", startCounter);
            setTimeout(counter_lomnica, 100);
        }
    }
}

function counter_kalkulator() {
    $('.wyniki-second-row .count').each(function() {
        $(this).prop('Counter', 0).animate({
            Counter: $(this).text()
        }, {
            duration: 2000,
            easing: 'swing',
            step: function(now) {
                if ($(this).hasClass('counter-procent')) {
                    $(this).text(Math.ceil(now));
                } else {
                    $(this).text(now.toFixed(2));
                }
                $(this).removeClass('count');
            }
        });

    });

}

function counter_lomnica() {
    $('#co-wyroznia .count').each(function() {
        $(this).prop('Counter', 0).animate({
            Counter: $(this).text()
        }, {
            duration: 2000,
            easing: 'swing',
            step: function(now) {
                $(this).text(Math.ceil(now));
                $(this).removeClass('count');
            }
        });
    });
}

//green form more info
$('.more-info').hover(function() {
        $("#pobyt-wlascicielki-hover").fadeIn();
        $("#pobyt-wlascicielki-hover").css({
            position: "absolute",
            top: "70px"
        });
    },
    function() {
        $("#pobyt-wlascicielki-hover").fadeOut();
    }
);
