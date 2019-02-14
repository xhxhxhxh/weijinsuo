$(function () {
    getBanner();
    touchMove();
    initMobileTab();
    //工具提示初始化
    $('[data-toggle="tooltip"]').tooltip();
    $(window).on('scroll',function () {
        if ($(this).scrollTop() >= 200) {
            $('.wjs_banner').css('margin-top','85px');
        }else {
            $('.wjs_banner').css('margin-top',0);
        }
    })
});

//动态渲染banner
var getBanner = function () {
    $.ajax({
        type:'get',
        url:'js/data.json',
        dataType:'json',
        success:function (data) {
            // console.log(data);
            //判断屏幕尺寸
            //测试功能
            $(window).on('resize',function () {
                var isMobile = $(window).width() <= 768?true:false;
                // console.log(isMobile);
                var potsHtml = template('pot_tmpl',{list:data});
                var imgsHtml = template('img_tmpl',{list:data,mobile:isMobile});
                $('.carousel-indicators').html(potsHtml);
                $('.carousel-inner').html(imgsHtml);
            }).trigger('resize');

        }
    })
};

//手势切换
var touchMove = function () {
    var startX = 0;
    var distanceX = 0;
    var ismove = false;
    $('.wjs_banner').on('touchstart',function (e) {
        startX = e.originalEvent.touches[0].clientX;
    }).on('touchmove',function (e) {
        var endX = e.originalEvent.touches[0].clientX;
        distanceX = endX - startX;
        ismove = true;
    }).on('touchend',function (e) {
        if (ismove && Math.abs(distanceX) >= 30) {
            if (distanceX > 0) {
                //右划
                $('.carousel').carousel('prev');
            } else {
                //左划
                $('.carousel').carousel('next');
            }
        }
        startX = 0;
        distanceX = 0;
        ismove = false;
    })
};

//产品区初始化
var initMobileTab = function () {
    var $ulTab = $('.wjs_product .nav-tabs');
    var $liTab = $ulTab.find('li');
    var ulWidth = 0;
    $liTab.each(function (i,item) {
        ulWidth += $(item).outerWidth(true);
    });
    // console.log(ulWidth);
    $ulTab.width(ulWidth+1);
    $('.wjs_tabs_parent').on('touchmove',function (e) {
        e.preventDefault();
    });
    new IScroll($('.wjs_tabs_parent')[0],{
        scrollX:true,
        scrollY:false,
        click:true
    });
};