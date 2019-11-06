var thisPlalaSliderCommon;
var PlalaSliderCommon = function (_options) {
    thisPlalaSliderCommon = this;
    this.option = {
        itemWidth: 255,
        itemMargin: 15,
        scroll: 3,
        itemStyle: 'normal',
        rankStyle: 'tri',
    };
    this.ua = window.navigator.userAgent.toLowerCase();
    //hostName: location.hostname,
    this.hostName = 'https://testshop.hikaritv.net/';
    this.device = '';
    this.displayWidth = 0;
    this.viewStageWidth = 0;
    this.displayHeight = 0;
    this.Bottom = 0;
    this.itemOuterWidth = this.option.itemWidth + this.option.itemMargin;
    this.mostRightPositionIndex;
    this.mostLeftPositionNum;
    this.mostLeftPosition;
    this.mostRightPosition;
    this.AllItemWidth;
    this.scrollDistance = this.itemOuterWidth * this.option.scroll;
    this.flagReverse = false;
    j$.extend(thisPlalaSliderCommon.options, _options);
};
PlalaSliderCommon.prototype = {
    uaJudge: function () {
        if (thisPlalaSliderCommon.ua.indexOf('iphone') !== -1 || thisPlalaSliderCommon.ua.indexOf('ipod') !== -1 || thisPlalaSliderCommon.ua.indexOf('ipad') !== -1) {
            thisPlalaSliderCommon.device = 'iphone';
        } else if (thisPlalaSliderCommon.ua.indexOf('android') !== -1) {
            thisPlalaSliderCommon.device = 'android';
        } else if (thisPlalaSliderCommon.ua.indexOf('windows') !== -1 && thisPlalaSliderCommon.ua.indexOf('phone') !== -1) {
            thisPlalaSliderCommon.device = 'windows_phone';
        } else {
            thisPlalaSliderCommon.device = 'pc';
        }
    },
    getWindowParam: function () {
        thisPlalaSliderCommon.displayWidth = j$(window).innerWidth();
        thisPlalaSliderCommon.displayHeight = j$(window).innerHeight();
        thisPlalaSliderCommon.Bottom = thisPlalaSliderCommon.displayHeight;
    },
    insertCommaInNum: function (num) {
        var newNumStr = "";
        if (num) {
            newNumStr = String(num).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
        }
        return newNumStr;
    },
    leaderThree: function () {
        j$('.leader3').each(function () {
            var sliderTtlTarget = j$(this);
            var html = sliderTtlTarget.html();
            var sliderTtlClone = sliderTtlTarget.clone();
            sliderTtlClone
                .css({
                    'display': 'none',
                    'position': 'absolute',
                    'background-color': 'red',
                    'overflow': 'visible'
                })
                .width(sliderTtlTarget.width())
                .height('auto');
            sliderTtlTarget.after(sliderTtlClone);
            if (sliderTtlClone.height() > sliderTtlTarget.height()) {
                while ((html.length > 0) && (sliderTtlClone.height() > sliderTtlTarget.height())) {
                    html = html.substr(0, html.length - 1);
                    sliderTtlClone.html(html + '...');
                }
                sliderTtlTarget.html(sliderTtlClone.html());
                sliderTtlClone.remove();
            }
        });
    },
    lazyLoader: function (itemObject, nextPosition, eventType) {
        thisPlalaSliderCommon.getWindowParam();
        var thisImgObj;
        var thisLeft;
        var thisTop;
        var thisSrc;
        var doneLz;
        if (eventType == 'click') {
            thisImgObj = j$(itemObject).find('img');
            thisLeft = nextPosition
            thisTop = thisImgObj.offset().top - j$(window).scrollTop();
            thisSrc = thisImgObj.data('src');
            doneLz = thisImgObj.hasClass('js_lzDone');
            lazyAction(thisImgObj, doneLz);
        } else {
            j$('.plala_slider img').each(function (index, thisImgObj) {
                thisImgObj = j$(thisImgObj);
                thisTop = thisImgObj.offset().top - j$(window).scrollTop();
                thisLeft = thisImgObj.offset().left - j$(window).scrollLeft();
                thisSrc = thisImgObj.data('src');
                doneLz = thisImgObj.hasClass('js_lzDone');
                lazyAction(thisImgObj, doneLz);
            });
        }
        function lazyAction(thisImgObj, doneLz) {
            if (doneLz) {
                return;
            } else {
                if (0 <= thisTop && thisTop <= thisPlalaSliderCommon.displayHeight && 0 <= thisLeft && thisLeft <= thisPlalaSliderCommon.displayWidth) {
                    if (thisSrc) {
                        thisImgObj.attr('src', thisSrc);
                        thisImgObj.data('src', '');
                        thisImgObj.addClass('js_lzDone');
                    } else {
                        return;
                    }
                }
            }
        }
    },
    multipleSlidersOperate: function () {
        var lazyItemCount = Math.ceil(thisPlalaSliderCommon.displayWidth / thisPlalaSliderCommon.itemOuterWidth);
        j$('.plala_slider').each(function () {
            j$(this).css({ 'height': '445px' });
            var sliderPosition = j$(this).offset().top;
            var doLazy = sliderPosition < thisPlalaSliderCommon.displayHeight ? false : true;
            var url = j$(this).data('endpoint');
            var target = j$(this).attr('id');
            thisPlalaSliderCommon.aJax(thisPlalaSliderCommon.hostName + url, target, 'json', doLazy, lazyItemCount);
        });
        j$('.buyer_reco').each(function (index, item) {
            var thisSection = j$(item);
            thisSection.css({ 'height': '445px' });
            var sliderPosition = j$(item).offset().top;
            var doLazy = sliderPosition < thisPlalaSliderCommon.displayHeight ? false : true;
            var url = j$(item).find('.jsonUrl').text();
            var slides = j$(item).find('.slides');
            slides.remove();
            var headline = thisSection.find('#headline');
            headline.css({
                'display': 'block'
            });
            var target = 'buyerRecommend' + index;
            var targetElement = j$('<div id="' + target + '" class="plalaSlider"></div>');
            headline.append(targetElement);
            thisPlalaSliderCommon.aJax(url, target, 'json', doLazy, lazyItemCount);
            var dummyDiv = thisSection.find('.data');
            dummyDiv.remove();
        });
    },
    aJax: function (URL, target, dataType, doLazy, lazyItemCount) {
        j$.ajaxSetup({ cache: false });
        j$('.sliderSpinner').css({
            'display': 'block'
        });
        j$.ajax({
            scriptCharset: 'utf-8',
            type: "GET",
            cache: true,
            url: URL,
            dataType: 'json',
            timeout: 10000,
            success: function (data) {
                var itemDatas = data.contents;
                thisPlalaSliderCommon.perseDataToHtml(itemDatas, target, dataType, doLazy, lazyItemCount);
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log("NG because : " + textStatus.responseText);
                console.log("The content of the " + target + " has been deleted with the API Error.")
                j$('.' + target).remove();
            },
            complete: function (itemData) { }
        });
    },
    perseDataToHtml: function (itemDatas, target, dataType, doLazy, lazyItemCount) {

    },
    init: function () {
        console.log('PlalaSliderCommon init');
        thisPlalaSliderCommon.uaJudge();
        thisPlalaSliderCommon.getWindowParam();
        j$(document).ready(function () {
            thisPlalaSliderCommon.multipleSlidersOperate();
            j$(document).on('click', '.nav_plalaSlider', function () {
                thisPlalaSliderCommon.navAcion(j$(this), 'click');
            });
        });
        j$(window).on('scroll resize', function () {
            thisPlalaSliderCommon.lazyLoader('', '', 'loadOrScroll');
        });
        /*
          j$(window).on('load', function () {
              thisPlalaSliderCommon.leaderThree();
          });
          */

    }
}
/*----------------------------------------------------------------*/
var slider_options = {
    //timeoutMs: 60000
}

