$(document).ready(function() {
    //catalog gallery
    $('.lightbox').nivoLightbox();

    $('.owl-carousel').owlCarousel({
    items:8,
        margin:15,
        dots:false,
        nav:false,
        responsiveClass:true,
        responsive:{
            0:{
                items:1,
                nav:true
            },
            480:{
                items:2,
                nav:true
            },
            720:{
                items:3,
                nav:true
            }
        },
        responsiveBaseElement:".projects"
    });

    //Scroll
     $('a[href^="#"]').on('click', function() {

        var target = $(this).attr('href');
        var position = $(target).offset().top;
        var body = $("html, body");


        body.stop().animate({scrollTop:position}, '1000');

        //refresh class after highlight menu on scroll
        if( $(this).hasClass('topNav_link') ) {
            setTimeout(function () {
                $('.topNav_link').each(function() {
                    $(this).removeClass('active');
                });
                $(this).addClass('active');
            }, 200);
        }

        return false;
    });

    $(window).on('scroll', function() {
        fixMenu();
        highlightActiveMenu();
    });

    //highlight menu active
    function highlightActiveMenu() {
        var scroll = $(window).scrollTop() + 200;
        var menuBlocks = ['top', 'pilomaterial', 'houses', 'advantages', 'cooperation', 'contacts']; //порядок важен

        for (var i = menuBlocks.length - 1; i >= 0; i--) {
            if($('#'+menuBlocks[i]).offset().top < scroll) {
                $('.topNav_link.active').each(function() {
                    $(this).removeClass('active');
                });
                $('a[href="#'+menuBlocks[i]+'"]').addClass('active');
                break;
            }
        };
    }

    //fix menu
    fixMenu(); //check after refresh
    function fixMenu() {
        var mobile_width = 800;
        var page_width = $(window).width();
        var scrollPoint = (page_width < mobile_width ) ? 355 : 74;

        if( ($(window).scrollTop() > scrollPoint) && !$('.topNav').hasClass('menuFixed') ) {
            $('.topNav').addClass('menuFixed');
        } else if( ($(window).scrollTop() < scrollPoint) && $('.topNav').hasClass('menuFixed') ) {
            $('.topNav').removeClass('menuFixed');
        }
    }

    //menu show&hide
    $('.button-menuOpen').on('click', function() {
        $('#topNav').toggleClass('menuOpen');
    });
    $('.button-menuClose').on('click', function() {
        $('#topNav').removeClass('menuOpen');
    });

    $('.topNav_link').on('click', function() {
        $('#topNav').removeClass('menuOpen');
    });

    //pop up
    $('.getConsult').on('click', function() {
        var popupTop = $(window).scrollTop() + 30;
        $('.popup').css('top', popupTop+'px');
        setTimeout(function () {
            $('body').addClass('popup-show');
        }, 100);
    });
    $('.popup_close').on('click', function() {
        $('body').removeClass('popup-show');
        //clear
        setTimeout(function () {
            $('.popup').css('top', '');
            $('#contactForm').show();
            $('#contactForm_success').remove();
        }, 700);
    });

    $('.popup2_close').on('click', function() {
        $('body').removeClass('popup2-show');
    });

    //toggle price
    $('.th').on('click', function() {
        toggleRow($(this));
    });

    function toggleRow(el) {
        var row = el.next('tr');

        if(el.hasClass('th')) {
            el.find('.showPrice').toggleClass('showPrice-open');
        }

        if(!row.hasClass('th')) {
            row.toggle();
            toggleRow(row);
        }
    }
});