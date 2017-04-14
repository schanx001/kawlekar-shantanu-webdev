/**
 * Created by schanx on 3/31/17.
 */
$(function() {
    $('a[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top - 32
                }, 1000);
                return false;
            }
        }
    });

    $(function () {
        /*   $('li a').click(function (e) { */
        $('.nav li a').click(function (e) {

            $('.nav li').removeClass('active');
            // $(this).addClass('active');
            var $parent = $(this).parent();
            if (!$parent.hasClass('active')) {
                $parent.addClass('active');
            }
            //e.preventDefault();
        });
        });
/*    $(document).click(function (event) {
        var clickover = $(event.target);
        var _opened = $(".navbar-collapse").hasClass("navbar-collapse in");
        if (_opened === true && !clickover.hasClass("navbar-toggle")) {
            $("button.navbar-toggle").click();
        }
    });*/
    $(function (){
        $(".navbar-nav li a").click(function(event) {
            $(".navbar-toggle:visible").click();
        });
    });
});


