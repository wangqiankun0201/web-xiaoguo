$(function () {
    var $container = $('#container');
    var $list = $('#list');
    var $spans = $('#pointsDiv span');
    var $prev = $('#prev');
    var $next = $('#next');
    var PAGE_WIDTH = 600; //一页的宽度
    var index = 0; //当前的下标
    var ALLTIME = 400; //总时间
    var TIME = 40; //定时器事件
    var imgCount = $spans.length; //图片数量

    var moving = false;  //标识是否正在翻页


    // 給向前按鈕綁定點擊事件
    $prev.click(function () {
        nextPage(false);
    })
    //  給向后按鈕綁定點擊事件
    $next.click(function () {
        nextPage(true);
    })

    // 定时自动切换图片
    var intervalId = setInterval(function () {
        nextPage(true);
    }, 3000)


    // 鼠标进入图片区域时，自动切换停止，当鼠标离开后，又开始自动切换
    $container.hover(function () {
            // 清除定时器
            clearInterval(intervalId);
        },
        function () {
            intervalId = setInterval(function () {
                nextPage(true);
            }, 3000)
        })



    // 点击圆点切换到指定的页
    $spans.click(function () {
        // 目标页下标
        var targetIndex = $(this).index();
        if (targetIndex != index) {
            nextPage(targetIndex);
        }
    })



    function nextPage(next) {
        //如果正在翻页，直接结束
        if(moving){  //已经正在翻页中
            return
        }

        moving =true;  //标识正在翻页中
        // 当前的位置
        var nowLeft = $list.position().left;
        var offleft = 0;
        // 移动的总距离
        if (typeof next === 'boolean') {
            offleft = next ? -PAGE_WIDTH : PAGE_WIDTH;
        } else {
            offleft = (index - next) * PAGE_WIDTH;
        }

        // 一步移动的距离
        var timeDistance = offleft / (ALLTIME / TIME);
        // 目标位置
        var endDistance = nowLeft + offleft;
        // 设置定时器
        var intervalId = setInterval(function () {
            // 计算出最新的nowleft
            nowLeft += timeDistance;
            // 判断是否到达终点
            if (nowLeft === endDistance) {
                clearInterval(intervalId);


                // 如果到达了最右边的图片
                if (nowLeft === -(imgCount + 1) * PAGE_WIDTH) {
                    nowLeft = -PAGE_WIDTH;
                } else if (nowLeft === 0) { //如果到达了最左边
                    console.log(1);
                    nowLeft = -imgCount * PAGE_WIDTH;
                }
                moving =false;

            }
            // 设置left
            $list.css('left', nowLeft);
        }, TIME)

        // 更新原点
        updatePoints(next);

    }

    function updatePoints(next) {
        // 计算目标远点的下标
        var targetIndex = 0;
        if (typeof next === 'boolean') {
            if (next) {
                targetIndex = index + 1;
                if (targetIndex === imgCount) {
                    targetIndex = 0;
                }
            } else {
                targetIndex = index - 1;
                if (targetIndex === -1) {
                    targetIndex = imgCount - 1;
                }
            }
        } else {
            targetIndex = next;
        }



        // 将当前index的span标签的class属性移出
        $($spans[index]).removeClass('on');


        // 给目标圆点添加class = 'on'
        $($spans[targetIndex]).addClass('on');

        // 更新index
        index = targetIndex;
    }

})