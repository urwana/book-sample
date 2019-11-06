
var slider_options = {
    itemWidth: 255,
    itemMargin: 15,
    scroll: 3,
    itemStyle: 'normal',
    rankStyle: 'tri',
};
var thisPlalaSliderHtml;
var PlalaSliderHtml = function () {
    thisPlalaSliderHtml = this;
};
PlalaSliderHtml.prototype = new PlalaSliderCommon(slider_options);
//PlalaSliderHtml.prototype =  Object.create(PlalaSliderCommon.prototype);
PlalaSliderHtml.prototype.perseDataToHtml = function (itemDatas, target, dataType, doLazy, lazyItemCount) {
    var itemLength = Object.keys(itemDatas).length;
    var sliderElement = '';
    sliderElement += '<div class="viewStageBox_plalaSlider"><span class="nav_plalaSlider nav_prev_plalaSlider">&lt;</span><span class="nav_plalaSlider nav_next_plalaSlider">&gt;</span>';
    sliderElement += '<div class="viewStage_plalaSlider">';
    sliderElement += '<ul class="itemsBox_plalaSlider">';
    //loop
    itemDatas.forEach(function (itemData, index) {
        var itemStyle = thisPlalaSliderHtml.option.itemStyle == 'card' ? 'itemCard' : 'item';
        console.log(thisPlalaSliderHtml.option.itemStyle);
        sliderElement += '<li class="' + itemStyle + '_li_plalaSlider"><a href="' + itemData.detail_url + '">';
        if (target == 'ranking') {
            //■ ランキングアイコンの種類出し分け
            var rank_index = index + 1;
            var specalIconStyle;
            if (rank_index == 1) {
                specalIconStyle = ' rank_gold';
            } else if (rank_index == 2) {
                specalIconStyle = ' rank_silver';
            } else if (rank_index == 3) {
                specalIconStyle = ' rank_bronze';
            } else {
                specalIconStyle = '';
            }
            if (thisPlalaSliderHtml.option.rankStyle == 'tri') {
                sliderElement += '<span class="mark_rank_triangle_plalaSlider' + specalIconStyle + '">' + rank_index + '</span>';
            } else {
                sliderElement += '<span class="mark_rank_crown_plalaSlider' + specalIconStyle + '">' + rank_index + '</span>';
            }
        }
        //■ imgBox
        if (doLazy) {
            sliderElement += '<div class="imgBox_plalaSlider"><span><img src="/to-suzuki/img/no_img.jpg" alt="item' + itemData.item + '" data-src="' + itemData.thumbnail + '"></span></div>';
        } else {
            if (index <= lazyItemCount) {
                sliderElement += '<div class="imgBox_plalaSlider"><span><img src="' + itemData.thumbnail + '" class="js_lzDone" alt="item' + itemData.item + '"></span></div>';
            } else {
                sliderElement += '<div class="imgBox_plalaSlider"><span><img src="/to-suzuki/img/no_img.jpg" alt="item' + itemData.item + '" data-src="' + itemData.thumbnail + '"></span></div>';
            }
        }
        //■ txtBox
        sliderElement += '<div class="txtBox_plalaSlider">';
        //■ iconBox
        sliderElement += '<ul class="iconBox_plalaSlider">';
        if (itemData.icon_list != null && itemData.icon_list[4] != null && itemData.icon_list[4] == 1) {
            sliderElement += '<li class="icon_new_plalaSlider">NEW</li>';
        }
        if (itemData.icon_list != null && itemData.icon_list[4] != null && itemData.icon_list[4] == 1) {
            sliderElement += '<li class="icon_compensation_plalaSlider">ぷらら補償</li>';
        }
        if (itemData.icon_list != null && itemData.icon_list[4] != null && itemData.icon_list[4] == 1) {
            sliderElement += '<li class="icon_today_plalaSlider">当日出荷</li>';
        }
        sliderElement += '</ul>';
        //■ item_txtBox
        sliderElement += '<div class="item_txtBox_plalaSlider">';
        var itemName;
        if (itemData.maker_model_no) {
            itemName = '' + itemData.item_name + ' ' + itemData.maker_model_no + '';
        } else {
            itemName = itemData.item_name;
        }
        sliderElement += '<p class="txt_itemName_plalaSlider leader3">' + itemName + '</p>';
        if (itemData.maker_name) {
            sliderElement += '<p class="txt_itemMaker_plalaSlider">' + itemData.maker_name + '</p>';
        } else {
            sliderElement += '<p class="txt_itemMaker_plalaSlider"></p>';
        }
        //■ アイテムPrice
        sliderElement += '<p class="txt_itemPriceBox">';
        sliderElement += '<span class="txt_itemPrice_plalaSlider">&yen; ' + thisPlalaSliderHtml.insertCommaInNum(itemData.unit_price) + '</span>';
        sliderElement += '<span class="txt_itemPrice_rate"> [' + itemData.discount_rate + '%OFF]</span>';
        sliderElement += '<span class="txt_itemPriceOff_plalaSlider"><span class="item_priceOffEn_plalaSlider">&yen;</span>' + thisPlalaSliderHtml.insertCommaInNum(itemData.now_price) + '</span >';
        sliderElement += '</p>';
        sliderElement += '</div>';
        sliderElement += '<div><p id="releaseDateDtId" class="releaseDateDt_plalaSlider"></p></div>';
        sliderElement += '</div></a></li>';
    });
    sliderElement += '</ul>';
    sliderElement += '</div>';
    sliderElement += '</div>';
    j$(document).ready(function () {
        j$('#' + target).append(sliderElement);
    });
    j$(document).ready(function () {
        thisPlalaSliderHtml.sliderSetting(j$('#' + target), '', itemLength, 'load');
    });
}

