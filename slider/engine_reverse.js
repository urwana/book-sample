var slider_options = {
    itemWidth: 255,
    itemMargin: 15,
    scroll: 3,
    itemStyle: 'normal',
    rankStyle: 'tri',
};
var thisPlalaSliderEngine;
var PlalaSliderEngine = function () {
    thisPlalaSliderEngine = this;
};
PlalaSliderEngine.prototype = new PlalaSliderHtml(slider_options);
//PlalaSliderEngine.prototype =  Object.create(PlalaSliderHtml.prototype);
PlalaSliderEngine.prototype.sliderSetting=function (thisSlider, thisNavObject, itemLength, eventType) {
    thisSlider = j$(thisSlider);
    var this_viewStageBox_plalaSlider = thisSlider.find('.viewStageBox_plalaSlider');
    var viewStage_plalaSlider = thisSlider.find('.viewStage_plalaSlider');
    viewStage_plalaSlider.css({
        'overflow-x': 'scroll'
    });
    var viewStageDisplayWidth = j$(this_viewStageBox_plalaSlider).innerWidth();
    thisPlalaSliderEngine.AllItemWidth = itemLength * thisPlalaSliderEngine.itemOuterWidth;
    thisSlider.find('.itemsBox_plalaSlider').css({
        'width': thisPlalaSliderEngine.AllItemWidth
    });
    thisPlalaSliderEngine.navAcion(this_viewStageBox_plalaSlider, eventType);
    //thisPlalaSliderEngine.leaderThree();
};
PlalaSliderEngine.prototype.navAcion=function (sliderObject, eventType) {
    var this_viewStageBox_plalaSlider;
    if (eventType == 'click') {
        this_viewStageBox_plalaSlider = sliderObject.parent();
    } else {
        this_viewStageBox_plalaSlider = sliderObject;
    }
    var viewStage_plalaSlider = this_viewStageBox_plalaSlider.find('.viewStage_plalaSlider');
    var this_itemsBox_plalaSlider = this_viewStageBox_plalaSlider.find('.itemsBox_plalaSlider');
    var thisNextNav = this_viewStageBox_plalaSlider.find('.nav_next_plalaSlider');
    var thisPrevNav = this_viewStageBox_plalaSlider.find('.nav_prev_plalaSlider');
    var stageWidth = this_viewStageBox_plalaSlider.innerWidth();
    var nowScrollPosition;
    var thisAllItemWidth = this_itemsBox_plalaSlider.innerWidth();
    var mostLeftPosition = thisAllItemWidth - stageWidth;
    var mostRightPosition = 0;
    var scroll = thisPlalaSliderEngine.scrollDistance;
    function navDesign(nowPosition) {
        if (nowPosition <= 5) {
            thisPrevNav.css({ 'opacity': '0.1' });
            thisNextNav.css({ 'opacity': '1' });
        } else if (nowPosition >= mostLeftPosition - 5) {

            thisPrevNav.css({ 'opacity': '1' });
            thisNextNav.css({ 'opacity': '0.1' });
        } else {
            thisPrevNav.css({ 'opacity': '1' });
            thisNextNav.css({ 'opacity': '1' });
        };

    };
    if (eventType == 'load') {
        nowScrollPosition = 0;
        navDesign(nowScrollPosition)
    } else {
        if (sliderObject.hasClass('nav_next_plalaSlider')) {
            nowScrollPosition = j$(viewStage_plalaSlider).scrollLeft();
            nowScrollPosition = nowScrollPosition + scroll;

            if (mostLeftPosition < nowScrollPosition) {
                // console.log('1: ' + flagReverse + nowScrollPosition);

                if (thisPlalaSliderEngine.flagReverse == true) {
                    nowScrollPosition = mostRightPosition;
                    thisPlalaSliderEngine.flagReverse = false;
                } else {
                    thisPlalaSliderEngine.flagReverse = true;
                }
            }
        } else {
            nowScrollPosition = j$(viewStage_plalaSlider).scrollLeft();
            scroll = scroll * -1;
            nowScrollPosition = nowScrollPosition + scroll;
            /*
             if (mostRightPosition < nextScrollPosition) {
                 nextScrollPosition = mostRightPosition;
                 thisPrevNav.css({ 'opacity': '0.5' });
             }
             */
        }
        navDesign(nowScrollPosition)
    }
    console.log('flag' + thisPlalaSliderEngine.flagReverse + nowScrollPosition);
    j$(viewStage_plalaSlider).animate({
        scrollLeft: nowScrollPosition
    }, 200);
};
PlalaSliderEngine.prototype.init = function () {
    console.log('thisPlalaSliderEngine init');
    thisPlalaSliderEngine.uaJudge();
    thisPlalaSliderEngine.getWindowParam();
    j$(document).ready(function () {
        thisPlalaSliderEngine.multipleSlidersOperate();
        j$(document).on('click', '.nav_plalaSlider', function () {
            thisPlalaSliderEngine.navAcion(j$(this), 'click');
        });
    });
    j$(window).on('scroll resize', function () {
        thisPlalaSliderEngine.lazyLoader('', '', 'loadOrScroll');
    });
   /*
    window.onload = function () {
        thisPlalaSliderEngine.leaderThree();
    }
    */
};
/*----------------------------------------------------------------*/
var slidedr_options = {
    //timeoutMs: 60000
}
var plalaSlider = new PlalaSliderEngine(slidedr_options);
plalaSlider.init();





