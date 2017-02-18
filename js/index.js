/**
 * Created by 张龙玉 on 2017/1/21.
 */
var Status = {
    topBtnStatus: function () {
        /*添加为喜欢的歌曲*/
        var flag = true;
        $('.love').on('click', function () {
            if (flag) {
                $('.love').css('color', 'red');
                flag = !flag;
            } else {
                $('.love').css('color', 'white');
                flag = !flag;
            }
        });
        /*声音切换*/
        $('.vice').on('click', function () {
            $('.noVice').show();
            $('.vice').hide();
            $('audio')[0].muted = true;
        });
        $('.noVice').on('click', function () {
            $('.vice').show();
            $('.noVice').hide();
            $('audio')[0].muted = false;
        });
        //搜索
        $('.search').on('click', function () {
            $('.searchBar').show('slow');
        });
        $('.cancelSearch').on('click', function () {
            $('.searchBar').hide('slow');
        });
        return this;
    },
    playStatus: function () {
        /*播放歌曲*/
        $('.play').on('click', function () {
            $('audio')[0].play();
            $('.play').hide();
            $('.pause').show();
            /*旋转动画*/
            $('.singer').addClass('rotate');
        });
        return this;
    },
    pauseStatus: function () {
        /*暂停歌曲*/
        $('.pause').on('click', function () {
            $('audio')[0].pause();
            $('.play').show();
            $('.pause').hide();
            $('.singer').removeClass('rotate');
        });
        return this;
    },
    loopStatus: function () {
        /*歌曲循环方式切换*/
        $('.listLoop').on('click', function () {
            $('.listLoop').hide();
            $('.singleLoop').show();
        });
        $('.singleLoop').on('click', function () {
            $('.singleLoop').hide();
            $('.randLoop').show();
        });
        $('.randLoop').on('click', function () {
            $('.randLoop').hide();
            $('.listLoop').show();
        });
        return this;
    },
    listStatus: function () {
        /*查看播放歌曲列表*/
        $('.list').on('click', function () {
            $('.musicList').show('slow');
        });
        $('.noneList').on('click', function () {
            $('.musicList').hide('slow');
        });
        return this;
    },
    //滑块移动的总宽度
    allWidth: $('.progress').width() - $('.bar').width(),
    /*进度条进度*/
    timeStatus: function () {
        /*音乐播放时间更新事件timeupdate,this.currentTime当前播放时间和this.duration(歌曲总时间)*/
        $('audio')[0].addEventListener('timeupdate', function () {
            var scale = this.currentTime / this.duration;
            $('.bar').css('transform', 'translate' + '(' + Status.allWidth * scale + 'px,-0.15rem)');
            $('.bg_progress').width(Status.allWidth * scale + 'px');
        });
        return this;
    },
    /*进度条拖拽*/
    touchStatus: function () {
        $('.bar')[0].addEventListener('touchstart', function (e) {
            var _this = this;
            /*涉及当前事件的手指*/
            var x = e.changedTouches[0].pageX;
            var l = $(_this).offset().left;
            document.addEventListener('touchmove', function (e) {
                //滑块的位置
                var _left = e.changedTouches[0].pageX - x + l;
                if (_left < 0) {
                    _left = 0;
                } else if (_left > $('.progress').width()) {
                    _left = $('.progress').width();
                }
                $(_this).css('transform', 'translate(' + _left + 'px,-0.15rem)');
                $('.bg_progress').width(_left + 'px');
                //滑块改变音乐的播放时间
                var scale = _left / Status.allWidth;
                // $('audio')[0].currentTime = $('audio')[0].duration * scale;
            });
        });
        return this;
    },
    start: function () {
        this.topBtnStatus().pauseStatus().playStatus().loopStatus().listStatus().timeStatus().touchStatus();
    }
};
Status.start();
