$(function() {

    //web slider
    $('.fixed-BTNbox div').click(function(event) {
        var screen_Win = $('.Allpage').width(); //螢幕寬度
        $this_click = $(this);
        $this = $(this).index();
        // 增加 menu_active class，兄弟層移除 class
        $this_click.addClass('menu_active').siblings().removeClass('menu_active')
        // console.log(screen_Win, $this)
        $('.page_all').animate({
            left: screen_Win * $this * -1
        },600,'easeOutSine');
    });

    //mobile點擊活動
    $('.activity').click(function(event) {
        $('.page-inside-mobile').addClass('animation-7');
        $this = $('.page-inside-mobile');
        $('.inside-close').click(function(event) {
            $($this).removeClass('animation-7')
            console.log($this);
        });
    });

});// end document ready
