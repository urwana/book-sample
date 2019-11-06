var thisPlalaSliderEngine;
var PlalaSliderEngine = function (_options) {
    thisPlalaSliderEngine = this;
    j$.extend(thisPlalaSliderEngine.options, _options);
};
PlalaSliderEngine.prototype = new PlalaSliderHtml(slider_options);
//PlalaSliderEngine.prototype =  Object.create(PlalaSliderHtml.prototype);
PlalaSliderEngine.prototype.sliderSetting = function (this_plalaSlider, thisNavObject, itemLength, eventType) {
    var this_viewStageBox_plalaSlider = j$(this_plalaSlider).children();
    var viewStage_plalaSlider = this_viewStageBox_plalaSlider.find('.viewStage_plalaSlider');
    if (eventType == 'load') {
        viewStage_plalaSlider.css({
            'overflow': 'hidden'
        });
    } else {
        this_viewStageBox_plalaSlider = j$(thisNavObject).parent();
    }
    var viewStageDisplayWidth = j$(this_viewStageBox_plalaSlider).innerWidth();
    console.log('viewStageDisplayWidth==>' + viewStageDisplayWidth);
    var items = this_viewStageBox_plalaSlider.find('.item_li_plalaSlider');
    var this_itemsBox_plalaSlider = this_viewStageBox_plalaSlider.find('.itemsBox_plalaSlider');
    var defaultItemsWidth = itemLength * thisPlalaSliderEngine.itemOuterWidth;
    var itemFillviewportNum = Math.ceil(viewStageDisplayWidth / thisPlalaSliderEngine.itemOuterWidth);
    var MinimunPrepareItemOneSideNum = Math.ceil(thisPlalaSliderEngine.option.scroll);
    var neccesaryItemSmoothScrollNum = itemFillviewportNum + MinimunPrepareItemOneSideNum * 2;
    var prepareItemOneSideNum;
    var plalaSliderAllItemsNum;
    var sliderItems;
    //1.全スライド数、3.予備スライド数、3.左端数、4.右端数、5.それぞれのItemオブジェクト
    itemLength = itemLength ? itemLength : items.length;
    if (itemLength < neccesaryItemSmoothScrollNum) {
        if (defaultItemsWidth < viewStageDisplayWidth) {
            plalaSliderAllItemsNum = itemLength;
            thisPlalaSliderEngine.mostLeftPositionNum = 0;
            thisPlalaSliderEngine.mostRightPositionIndex = itemLength;
            this_viewStageBox_plalaSlider.find('.nav_plalaSlider').css({
                'display': 'none'
            });
        } else {
            var howManyTimesClones = Math.ceil(neccesaryItemSmoothScrollNum / itemLength);
            plalaSliderAllItemsNum = itemLength * howManyTimesClones;
            prepareItemOneSideNum = Math.ceil((plalaSliderAllItemsNum - itemFillviewportNum) / 2);
            thisPlalaSliderEngine.mostLeftPositionNum = 0 - prepareItemOneSideNum;
            thisPlalaSliderEngine.mostRightPositionIndex = itemFillviewportNum + prepareItemOneSideNum;
            //???????????????/
            var items = this_viewStageBox_plalaSlider.find('.item_li_plalaSlider').clone();
            //回数分cloneしなくてはならない
            this_itemsBox_plalaSlider.append(items);
            sliderItems = this_viewStageBox_plalaSlider.find('.item_li_plalaSlider');
        }
    } else {
        plalaSliderAllItemsNum = itemLength;
        prepareItemOneSideNum = Math.ceil((itemLength - itemFillviewportNum) / 2);
        thisPlalaSliderEngine.mostLeftPositionNum = 0 - prepareItemOneSideNum;
        thisPlalaSliderEngine.mostRightPositionIndex = itemFillviewportNum + prepareItemOneSideNum;
        sliderItems = this_viewStageBox_plalaSlider.find('.item_li_plalaSlider');
    }
    /////////////////////////

    thisPlalaSliderEngine.mostLeftPosition = thisPlalaSliderEngine.mostLeftPositionNum * thisPlalaSliderEngine.itemOuterWidth;
    thisPlalaSliderEngine.mostRightPosition = thisPlalaSliderEngine.mostRightPositionIndex * thisPlalaSliderEngine.itemOuterWidth - thisPlalaSliderEngine.itemOuterWidth;
    thisPlalaSliderEngine.AllItemWidth = plalaSliderAllItemsNum * thisPlalaSliderEngine.itemOuterWidth;
    var itemsHeight = this_itemsBox_plalaSlider.children().innerHeight();
    this_itemsBox_plalaSlider.css({
        'position': 'relative',
        'width': thisPlalaSliderEngine.AllItemWidth,
        'height': itemsHeight + 'px'
    });
    thisPlalaSliderEngine.setUpItemsInOrder(sliderItems, thisNavObject, eventType);
};
PlalaSliderEngine.prototype.setUpItemsInOrder = function (sliderItems, thisNavObject, eventType) {

    function itemAnimation(index, item, nextPosition, direction, situation) {
        if (direction == 'next') {
            changeStartPosition = nextPosition + thisPlalaSliderEngine.scrollDistance;
        } else {
            changeStartPosition = nextPosition - thisPlalaSliderEngine.scrollDistance;
        }
        if (eventType == 'load') {
            j$(item)
                .css({
                    'position': 'absolute',
                    'top': '0',
                    'left': nextPosition + 'px',
                    'width': thisPlalaSliderEngine.option.itemWidth
                });
        } else {
            if (situation == 'normal') {
                j$(item).animate({
                    'left': nextPosition + 'px'
                }, 250);
            } else {
                j$(item).css({
                    'visiblity': 'hidden'

                });
                j$(item).animate({
                    'left': nextPosition + 'px'
                }, 250, function () {
                    j$(item).css({
                        'visiblity': 'visible'
                    });
                });
            }
        }
    };
    j$.each(sliderItems, function (index, item) {
        var nextPosition;
        if (eventType == 'load') {
            nextPosition = index * thisPlalaSliderEngine.itemOuterWidth;
            if (nextPosition > thisPlalaSliderEngine.mostRightPosition) {
                nextPosition = nextPosition - thisPlalaSliderEngine.AllItemWidth;
                itemAnimation(index, item, nextPosition, '', 'exception');
            } else {
                itemAnimation(index, item, nextPosition, '', 'normal');
            }
        } else {
            //var nowPosition = j$(item).css('left');
            var nowPosition = j$(item).offset().left;
            var directionNext = thisNavObject.hasClass('nav_next_plalaSlider');
            if (directionNext) {
                nextPosition = nowPosition - thisPlalaSliderEngine.scrollDistance;
                if (nextPosition < thisPlalaSliderEngine.mostLeftPosition) {
                    nextPosition = nextPosition + thisPlalaSliderEngine.AllItemWidth;
                    itemAnimation(index, item, nextPosition, 'next', 'exception');
                } else {
                    itemAnimation(index, item, nextPosition, 'next', 'normal');
                }
            } else {
                nextPosition = nowPosition + thisPlalaSliderEngine.scrollDistance;
                if (nextPosition > thisPlalaSliderEngine.mostRightPosition) {
                    nextPosition = nextPosition - thisPlalaSliderEngine.AllItemWidth;
                    itemAnimation(index, item, nextPosition, 'prev', 'exception');
                } else {
                    itemAnimation(index, item, nextPosition, 'prev', 'normal');
                }
            }
        }
        thisPlalaSliderEngine.lazyLoader(j$(item), nextPosition, 'click');
    });
};
PlalaSliderEngine.prototype.init = function () {
    console.log('thisPlalaSliderEngine init');
    thisPlalaSliderEngine.uaJudge();
    thisPlalaSliderEngine.getWindowParam();
    j$(document).ready(function () {
        thisPlalaSliderEngine.multipleSlidersOperate();
        j$(document).on('click', '.nav_plalaSlider', function () {
            thisPlalaSliderEngine.sliderSetting('', j$(this), '', 'click');
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