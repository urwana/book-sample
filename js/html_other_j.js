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
    //■ スライダーのステージを覆う部分　nav用
    var viewStageBox_plalaSlider = j$('<div class="viewStageBox_plalaSlider"><span class="nav_plalaSlider nav_prev_plalaSlider">&lt;</span><span class="nav_plalaSlider nav_next_plalaSlider">&gt;</span></div>');
    //■ スライダーのステージ部分（overflow hidden）
    var viewStage_plalaSlider = j$('<div class="viewStage_plalaSlider"></div>');
    viewStageBox_plalaSlider.append(viewStage_plalaSlider);
    //■ 全itemのbox ul
    var itemsBox_plalaSlider = j$('<ul class="itemsBox_plalaSlider"></ul>');
    viewStage_plalaSlider.append(itemsBox_plalaSlider);
    itemDatas.forEach(function (itemData, index) {

        //■ 各itemのベース部分
        var itemStyle = thisPlalaSliderHtml.option.itemStyle == 'card' ? 'itemCard' : 'item';
        var item_li_plalaSlider = j$('<li class="' + itemStyle + '_li_plalaSlider"></li>')
        itemsBox_plalaSlider.append(item_li_plalaSlider);
        var item_li_aLink_plalaSlider = j$('<a href="' + itemData.detail_url + '"></a>')
        item_li_plalaSlider.append(item_li_aLink_plalaSlider);

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
            var mark_rank_plalaSlider;
            if (thisPlalaSliderHtml.option.rankStyle == 'tri') {
                mark_rank_plalaSlider = j$('<span class="mark_rank_triangle_plalaSlider' + specalIconStyle + '">' + rank_index + '</span>');
            } else {
                mark_rank_crown_plalaSlider = j$('<span class="mark_rank_crown_plalaSlider' + specalIconStyle + '">' + rank_index + '</span>');
            }
            item_li_aLink_plalaSlider.append(mark_rank_plalaSlider)
        }

        //■ 商品画像
        var imgBox_plalaSlider;
        if (doLazy) {
            imgBox_plalaSlider = j$('<div class="imgBox_plalaSlider"><span><img src="/to-suzuki/img/no_img.jpg" alt="item' + itemData.item + '" data-src="' + itemData.thumbnail + '"></span></div>');
        } else {
            if (index <= lazyItemCount) {
                imgBox_plalaSlider = j$('<div class="imgBox_plalaSlider"><span><img src="' + itemData.thumbnail + '" class="js_lzDone" alt="item' + itemData.item + '"></span></div>');
            } else {
                imgBox_plalaSlider = j$('<div class="imgBox_plalaSlider"><span><img src="/to-suzuki/img/no_img.jpg" alt="item' + itemData.item + '" data-src="' + itemData.thumbnail + '"></span></div>');
            }
        }
        //■ 商品名、メーカー名、価格、値引き、他テキスト情報
        var item_txtBox_plalaSlider = j$('<div class="item_txtBox_plalaSlider"></div>');
        var itemName;
        if (itemData.maker_model_no) {
            itemName = '' + itemData.item_name + ' ' + itemData.maker_model_no + '';
        } else {
            itemName = itemData.item_name;
        }
        var txt_itemName_plalaSlider = j$('<p class="txt_itemName_plalaSlider leader3">' + itemName + '</p>');
        item_txtBox_plalaSlider.append(txt_itemName_plalaSlider)
        var txt_itemMaker_plalaSlider;
        if (itemData.maker_name) {
            txt_itemMaker_plalaSlider = j$('<p class="txt_itemMaker_plalaSlider">' + itemData.maker_name + '</p>');
        } else {
            txt_itemMaker_plalaSlider = j$('<p class="txt_itemMaker_plalaSlider"></p>');
        }
        item_txtBox_plalaSlider.append(txt_itemMaker_plalaSlider);
        var txt_itemPriceBox = j$('<p class="txt_itemPriceBox"></p>');
        var txt_itemPrice_plalaSlider = j$('<span class="txt_itemPrice_plalaSlider">&yen; ' + thisPlalaSliderHtml.insertCommaInNum(itemData.unit_price) + ' &rarr;</span>');
        var txt_itemPriceOff_plalaSlider = j$('<span class="txt_itemPriceOff_plalaSlider"><span class="item_priceOffEn_plalaSlider">￥</span>' + thisPlalaSliderHtml.insertCommaInNum(itemData.now_price) + '</span>');
        txt_itemPriceBox.append(txt_itemPrice_plalaSlider)
            .append(txt_itemPriceOff_plalaSlider)
        var releaseDateDt_plalaSlider = j$('<div><p id="releaseDateDtId" class="releaseDateDt_plalaSlider"></p></div>');
        item_txtBox_plalaSlider
            .append(txt_itemPriceBox)
            .append(releaseDateDt_plalaSlider);

        //■ iconボックス
        var iconBox_plalaSlider = j$('<ul class="iconBox_plalaSlider"></ul>');
        if (itemData.icon_list != null && itemData.icon_list[4] != null && itemData.icon_list[4] == 1) {
            var icon_new_plalaSlider = j$('<li class="icon_new_plalaSlider">NEW</li>')
            iconBox_plalaSlider.append(icon_new_plalaSlider);
        }
        if (itemData.icon_list != null && itemData.icon_list[4] != null && itemData.icon_list[4] == 1) {
            var icon_compensation_plalaSlider = j$('<li class="icon_compensation_plalaSlider">ぷらら補償</li>');
            iconBox_plalaSlider.append(icon_compensation_plalaSlider);
        }
        if (itemData.icon_list != null && itemData.icon_list[4] != null && itemData.icon_list[4] == 1) {
            var icon_today_plalaSlider = j$('<li class="icon_today_plalaSlider">当日出荷</li>');
            iconBox_plalaSlider.append(icon_today_plalaSlider);
        }

        //■ ポイントの計算と表示
        var pointGroup_plalaSlider = j$('<div class="pointGroup"></div>');
        var pointGet = Math.floor(itemData.now_price / 100) * itemData.point_magnification;
        if (itemData.point_magnification >= 2) {
            var point_plalaSlider = j$('<div class="point_plalaSlider">ポイント' + itemData.point_magnification + '倍</div>');
            pointGroup_plalaSlider.append(point_plalaSlider);
        }
        if (itemData.now_price && itemData.point_magnification) {
            var getPT = j$('<div class="getPT">' + pointGet + '<span class="getPT_s"> PTゲット!</span></div></div>');
            pointGroup_plalaSlider.append(getPT);
        }

        //■ テキストBox
        var txtBox_plalaSlider = j$('<div class="txtBox_plalaSlider"></div>');

        txtBox_plalaSlider.append(iconBox_plalaSlider)
            .append(pointGroup_plalaSlider)
            .append(item_txtBox_plalaSlider)
            .append(releaseDateDt_plalaSlider);

        //★ aタグにappend
        item_li_aLink_plalaSlider
            .append(imgBox_plalaSlider)
            .append(txtBox_plalaSlider);
    });
    j$(document).ready(function () {
        j$('#' + target).append(viewStageBox_plalaSlider);
    });
    j$(document).ready(function () {
        thisPlalaSliderHtml.sliderSetting(j$('#' + target), '', itemLength, 'load');
    });
};

