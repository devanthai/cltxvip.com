! function($) {
    "use strict";
    var d;

    function load_size() {
        var b, bb;
        991 < d && d < 1920 && (b = 10 * (d / 1920), $("html").css("font-size", b)), d < 992 && (bb = 10 * (d / 900), $("html").css("font-size", bb)), 1920 < d && $("html").css("font-size", 10)
    }
    $(window).load(function() {
        d = $(window).width(), $(window).height(), $(window).scrollTop(), load_size()
    }), $(window).on("resize", function() {
        d = $(window).width(), $(window).height(), $(window).scrollTop(), load_size()
    }), $(window).scroll(function() {
        d = $(window).width(), $(window).height(), $(window).scrollTop()
    }), $(document).ready(function() {
        $("#rank").click(function() {
            $(".container-nav").fadeOut(), $(".container-game").fadeOut(), setTimeout(function() {
                $(".wrap-popup-rank").fadeTo(300, 1)
            }, 400)
        }), $(".img-close-rank").click(function() {
            $(".wrap-popup-rank").fadeOut(), setTimeout(function() {
                767 < (d = $(window).width()) && $(".container-nav").fadeTo(300, 1), $(".container-game").fadeTo(300, 1)
            }, 400)
        }), $(".container-txs .w-button").click(function() {
            $(".container-txs .w-button").fadeTo(200, 1), $(this).fadeOut(), $(".container-txs .option-cuoc").addClass("action-show")
        }), $(".container-txs .option-cuoc .w-action").click(function() {
            $(".container-txs .w-button").fadeTo(200, 1), $(".container-txs .option-cuoc").removeClass("action-show")
        }), $(".container-game .w-tai-xiu").click(function() {
            $(".container-tai-xiu").addClass("tai-xiu-show"), $(".popup-chat-mobile").addClass("z-12")
        }), $(".container-tai-xiu .container-tx .r-x").click(function() {
            $(".container-tai-xiu").removeClass("tai-xiu-show"), $(".popup-chat-mobile").removeClass("z-12")
        }), $("#close-chat").click(function() {
            $(".popup-chat").removeClass("show-popup-chat"), $(".popup-chat").addClass("close-popup-chat")
        }), $(".container-tai-xiu .container-tx .r-chat").on("click", function() {
            767 < (d = $(window).width()) && $(".popup-chat").addClass("show-popup-chat")
        })
    })
}(jQuery);