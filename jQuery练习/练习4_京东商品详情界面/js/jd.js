$(function () {
    // 导航显示隐藏
    showhide();

    function showhide() {
        $('[name=show_hide]').hover(function () {
                var id = this.id + '_items';
                $('#' + id).css('display', 'block');
            },
            function () {
                var id = this.id + '_items';
                $('#' + id).css('display', 'none');
            })
    }

    // 二级菜单显示与隐藏
    subMenu();

    function subMenu() {
        $('#category_items > div').hover(function () {
            $(this).children('div').show();
        }, function () {
            $(this).children('div').hide();
        })
    }

    // 搜索框
    search();

    function search() {
        $('#txtSearch').on('keyup focus', function () {
                // 如果有文本才显示列表
                var txt = this.value.trim();
                if (txt) {
                    $('#search_helper').show();
                }
            })
            .blur(function () {
                $('#search_helper').hide();
            })
    }

    // 分享按钮
    share();

    function share() {
        var isClose = true;
        var $parent = $('#shareMore').parent();
        var $as = $('#shareMore').prevAll('a:lt(2)');
        $('#shareMore').click(function () {
            if (isClose) {
                $(this).children().addClass('backword')
                $parent.css('width', 200);
                $as.show();
                isClose = false;
            } else {
                $(this).children().removeClass('backword');
                $parent.css('width', 155);
                $as.hide();
                isClose = true;
            }
        })
    }

    // 地址栏
    address();

    function address() {
        $('#store_select')
            .hover(function () {
                $(this).children(':gt(0)').show();
            }, function () {
                $(this).children(':gt(0)').hide();
            }).
        children(":last")
            .click(function () {
                $(this).parent().children(":gt(0)").hide();
            })


        $('#store_tabs>li').click(function () {
            $('#store_tabs>li').removeClass('hover');
            $(this).addClass('hover');
        })

    }

    // 加入购物车
    hovermincart();

    function hovermincart() {
        $('#minicart').hover(function () {
                $(this).addClass('minicart');
                $(this).children('div').show();
            },
            function () {
                $(this).removeClass('minicart');
                $(this).children('div').hide();
            })
    }

    // 商品详情
    detailClick();

    function detailClick() {
        $('#product_detail>ul>li').click(function () {
            $('#product_detail>ul>li').removeClass('current');
            $(this).addClass('current');
            $('#product_detail>div:gt(0)').css('display', 'none');
            $('#product_detail>div:gt(0)')[$(this).index()].style.display = "block";
        })
    }

    // 图片轮播
    photoChange();

    function photoChange() {
        var $ul = $('#icon_list');
        var SHOW_COUNT = 5;
        var imgCount = $ul.children('li').length;
        var moveCount = 0; //移动次数，向右为正，向左为负
        var liWidth = $ul.children('li:first').width();


        // 初始化更新
        if (imgCount > SHOW_COUNT) {
            $('#preview>h1>a:last()').attr('class', 'forward');
        }

        // 后退按钮
        $('#preview>h1>a:first()').click(function () {
            if (moveCount === 0) {
                return
            }
            moveCount--;
            $('#preview>h1>a:last()').attr('class', 'forward');
            if (moveCount === 0) {
                $('#preview>h1>a:first()').attr('class', 'backward_disabled');
            }
            $ul.css('left', -moveCount * liWidth);
        })


        // 前进按钮
        $('#preview>h1>a:last()').click(function () {
            if (moveCount === imgCount - SHOW_COUNT) {
                return
            }
            moveCount++;
            // 设置回退按钮可用
            $('#preview>h1>a:first()').attr('class', 'backward');
            if (moveCount === imgCount - SHOW_COUNT) {
                $('#preview>h1>a:last()').attr('class', 'forward_disabled');

            }
            // 移动图片
            $ul.css('left', -moveCount * liWidth);
        })

        var $mImg = $('#mediumImg');
        $ul.children('li').hover(function () {
            $(this).children('img').addClass('hoveredThumb');
            $mImg.attr('src', $(this).children('img').attr('src').slice(0, -4) + '-m.jpg')
        }, function () {
            $(this).children('img').removeClass('hoveredThumb');
        })



    }


    // 放大镜
    bigImg();

    function bigImg() {
        var $mediumImg = $('#mediumImg');
        var $mask = $('#mask');
        var $maskTop = $('#maskTop');
        var $largeImgContainer = $('#largeImgContainer');
        var $loading = $('#loading');
        var $largeImg = $('#largeImg');
        var maskWidth = $mask.width();
        var maskHeight = $mask.height();
        var containWidth = $maskTop.width();
        var containHeigth = $maskTop.height();


        // 添加事件监听
        $maskTop.hover(function () {
                // 显示小黄块
                $mask.show();

                // 动态加载对应大图
                var src = $mediumImg.attr('src').replace('-m.', '-l.');
                $largeImg.attr('src', src);
                $largeImgContainer.show();
                $largeImg.on('load', function () { //大图加载完成
                    var largeWidth = $largeImg.width();
                    var largeHeigth = $largeImg.height();
                    // 给大图容器设置尺寸
                    $largeImgContainer.css({
                        width: largeWidth / 2,
                        height: largeHeigth / 2
                    })
                    // 显示大图
                    $largeImg.show();
                    // 隐藏加载进度条
                    $loading.hide();
                    //  绑定mousemove监听
                    $maskTop.mousemove(function (event) {

                        // 1.移动小黄块
                        // 计算小黄块的left和top值
                        var left = 0;
                        var top = 0;
                        left = event.offsetX - maskWidth / 2;
                        top = event.offsetY - maskHeight / 2;
                        if (left < 0) {
                            left = 0;
                        } else if (left > containWidth - maskWidth) {
                            left = containWidth - maskWidth;
                        }
                        if (top < 0) {
                            top = 0;
                        } else if (top > containHeigth - maskHeight) {
                            top = containHeigth - maskHeight;
                        }
                        //为小黄块设置left、top
                        $mask.css({
                            left: left,
                            top: top
                        })

                        // 2.移动大图

                        left = -left * (largeWidth - $largeImgContainer.width()) / (containWidth - maskWidth);
                        top = -top * (largeHeigth - $largeImgContainer.height()) / (containHeigth - maskHeight);
                        $largeImg.css({
                            left: left,
                            top: top
                        })

                    })
                })


            },
            function () {
                $mask.hide();
                $largeImgContainer.hide();
                $largeImg.hide();
            })
    }
})