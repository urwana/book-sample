var thisBookshelf;
var Bookshelf = function () {
    thisBookshelf = this;
    this.preState = {};
    this.preSeriesState = {};
    this.seriesState = [];
    this.myBookState = [];
    this.seriesId;
    this.userID;
    this.orderHistoryBeanDummyURL;
    this.pageTitle;
    this.total;
    this.cloneSeriesState = {};
    this.itemParameter = {
        "js_notbuy": 0,
        "js_topItem_order": 0,
        "js_detailItem_order": 1,
        "js_display_num": 0,
        "js_display_style": 1,
        "js_now_page": 1
    };
    this.tempCookieName;
    this.displyItemCount = [3, 5, 10];
    this.activeSelect;
    this.totalItemNum;
    this.totalPageNum = 1;
    this.startNum = 0;
    this.filterElement = '';
    this.tempLabel = '';
};
Bookshelf.prototype = new BookRenewalCommon();
Bookshelf.prototype.judgePageType = function () {
    if (thisBookshelf.pathname.indexOf('_detail_') != -1) {
        thisBookshelf.pageType = 'detail';
    } else if (thisBookshelf.pathname.indexOf('_top_') != -1) {
        thisBookshelf.pageType = 'top';
    }
    var val = thisBookshelf.cookieAction('get', 'pageType');
    if (val == undefined) {
        thisBookshelf.cookieAction('set', 'pageType', thisBookshelf.pageType);
    } else {
        //var val = thisBookshelf.getCookieNameOrKey('value', clickedItem);
        if (thisBookshelf.pageType != val) {
            thisBookshelf.cookieAction('set', 'js_now_page', '1');
            thisBookshelf.cookieAction('set', 'pageType', thisBookshelf.pageType);
        }
    }
};
Bookshelf.prototype.template_titleBox = function () {
    var titleBox = '';
    titleBox += '<div class="ttlSet ttl_bookshelf">';
    titleBox += '<h2 class="srchTtl ico-bookshelf"><span class="text_ttl js_seriesName">ＭＹ本棚</span></h2>';
    titleBox += '</div>';

    titleBox += '<div class="listNav_inner0">';
    titleBox += '<div class="txt_itemCount_book">';
    titleBox += '<p>';
    titleBox += '<span class="js_startNum">0000</span>';
    titleBox += '<span> ～</span>';
    titleBox += '<span class="js_endNum">0000</span>';
    titleBox += '<span> 件</span>';
    titleBox += '<span>／全 </span>';
    titleBox += '<span class="js_totalNum">0000</span>';
    titleBox += '<span>件</span></p>';
    titleBox += '</div>';
    titleBox += '</div>';

    titleBox += thisBookshelf.template_listNav_inner1();
    return titleBox;
};
Bookshelf.prototype.template_listNav_inner1 = function () {
    var listNav_inner1 = '';
    listNav_inner1 += '<div class="listNav_inner1">';

    listNav_inner1 += '<div class="searchBox_book">';
    listNav_inner1 += '<span class="js_filtedItem_close">×</span>';
    listNav_inner1 += '<input type="text" id="filter_bookshelf" name="filter_bookshelf" placeholder="本棚内を検索" value="" class="searchWord_bookshelf" autocomplete="off"><label for="searchWord_bookshelf">検索</label>';
    listNav_inner1 += '<div class="js_filtedItemBox filterBox_bookshelf"><ul class="filter_bookshelf"></ul></div>';
    listNav_inner1 += '</div>';

    listNav_inner1 += '<div class="btnBox_conf_book">';
    listNav_inner1 += '<span class="js_conf">help</span>';
    listNav_inner1 += '</div>';

    listNav_inner1 += '<div class="js_radioCookie js_display_style styleBtnBox_book">';
    listNav_inner1 += '<p>表示切替 :</p>';
    listNav_inner1 += '<span class="js_displayLarge">&nbsp;</span>';
    listNav_inner1 += '<span class="js_displayDetail checked">&nbsp;</span>';
    listNav_inner1 += '</div>';

    listNav_inner1 += '<div class="numToDisplay_book">';
    listNav_inner1 += '<p class="ttl_listNum_book">表示点数：</p>';
    listNav_inner1 += '<div class="js_radioCookie js_display_num listNumBox_book">';
    listNav_inner1 += '<span checked">' + thisBookshelf.displyItemCount[0] + '</span>';
    listNav_inner1 += '<span>' + thisBookshelf.displyItemCount[1] + '</span>';
    listNav_inner1 += '<span>' + thisBookshelf.displyItemCount[2] + '</span>';
    listNav_inner1 += '</div>';
    listNav_inner1 += '</div>';

    listNav_inner1 += '</div>';
    return listNav_inner1;

};
Bookshelf.prototype.template_listNav_inner2 = function () {
    var listNav_inner2 = '';
    listNav_inner2 += '<div class="listNav_inner2">';

    listNav_inner2 += '<div class="listInfo">';
    listNav_inner2 += '<ul class="js_radioCookie js_now_page"></ul>';
    listNav_inner2 += '</div>';
    if (thisBookshelf.pageType == 'top') {
        listNav_inner2 += '<div class="js_radioCookie js_topItem_order orderSelect_book">';
        listNav_inner2 += '<span class="checked"><span>タイトル名順</span></span>';
        listNav_inner2 += '<span><span>著者名順</span></span>';
        listNav_inner2 += '<span><span>購入日順</span></span>';
        listNav_inner2 += '</div>';
    } else if (thisBookshelf.pageType == 'detail') {
        listNav_inner2 += '<div class="js_radioCookie js_detailItem_order orderSelect_book">';
        listNav_inner2 += '<span class="checked"><span>新着順</span></span>';
        listNav_inner2 += '<span><span>巻数順</span></span>';
        listNav_inner2 += '<span><span>購入日順</span></span>';
        listNav_inner2 += '</div>';
    }
    listNav_inner2 += '</div>';
    return listNav_inner2;
};
Bookshelf.prototype.template_itemCount = function (startNum, endNum, totalNum) {
    j$('.js_startNum').text(startNum + 1);
    j$('.js_endNum').text(endNum);
    j$('.js_totalNum').text(totalNum);
};
Bookshelf.prototype.template_pager = function (js_now_page, totalPageNum) {
    var pagerElements = '';
    pagerElements += '<li class="first"><a href=""><img src="/test/pre_bookrenewal/img/first.png" alt="pager to top"></a></li>';
    pagerElements += '<li class="prev"><a href=""><img src="/test/pre_bookrenewal/img/prev.png" alt="pager to one before"></a></li>';
    pagerElements += '<li class="js_radioCookie js_now_page num">'; //21件以上で表示
    for (var i = 1; i <= totalPageNum; i++) {
        if (js_now_page == i) {
            pagerElements += '<span class="checked"><span>' + i + '</span></span>';
        } else {
            pagerElements += '<span><span>' + i + '</span></span>';
        }
    }
    pagerElements += '</li>';
    pagerElements += '<li class="next"><a href=""><img src="/test/pre_bookrenewal/img/next.png" alt="pager to next"></a></li>';
    pagerElements += '<li class="end"><a href=""><img src="/test/pre_bookrenewal/img/end.png" alt="pager to end"></a></li>';
    var oldPagerObj = j$('.js_now_page').children('li');
    if (oldPagerObj.length) {
        j$('.js_now_page').empty();
    }
    j$('.js_now_page').append(pagerElements);
};
Bookshelf.prototype.template_cartModal = function (seriesData, status, index) {
    var cartModal = '';
    if (status == 'unread') {
        cartModal += '<div class="js_modalCart_bookshelf modalBox_bookshelf">';
        cartModal += '<div class="modalCart_bookshelf">';
        cartModal += '<p class="ttl_modalCart_bookshelf">この巻は未購入です。</p>';
        cartModal += '<p class="js_ttl_modalCart_bookshelf">' + seriesData.item_name + '</p>';
        if (seriesData.now_price) {
            cartModal += '<dl class="priceBox_modalCart_bookshelf">';
            cartModal += '<dt class="ttl_price_modalCart_bookshelf strikethrough">価格：</dt>';
            cartModal += '<dd class="js_price_modalCart_bookshelf strikethrough">' + seriesData.unit_price + '</dd>';
            cartModal += '<dd class="unit_price_modalCart_bookshelf">円 (税込) </dd>';
            cartModal += '</dl>';
            cartModal += '<dl class="priceBox_modalCart_bookshelf">';
            cartModal += '<dt class="ttl_price_modalCart_bookshelf">キャンペーン価格：</dt>';
            cartModal += '<dd class="js_price_modalCart_bookshelf">' + seriesData.now_price + '</dd>';
            cartModal += '<dd class="unit_price_modalCart_bookshelf">円 (税込) </dd>';
            cartModal += '</dl>';
        } else {
            cartModal += '<dl class="priceBox_modalCart_bookshelf">';
            cartModal += '<dt class="ttl_price_modalCart_bookshelf">価格：</dt>';
            cartModal += '<dd class="js_price_modalCart_bookshelf">' + seriesData.unit_price + '</dd>';
            cartModal += '</dl>';
        }
        cartModal += '<dl class="priceBox_modalCart_bookshelf">';
        cartModal += '<dt class="ttl_point_modalCart_bookshelf">基礎ポイント：</dt>';
        cartModal += '<dd class="js_point_modalCart_bookshelf">' + seriesData.point + '</dd>';
        cartModal += '<dd class="unit_point_modalCart_bookshelf">pt</dd>';
        cartModal += '</dl>';

        cartModal += '<dl class="priceBox_modalCart_bookshelf">';
        cartModal += '<dt class="ttl_point_modalCart_bookshelf">ポイント増量：</dt>';
        cartModal += '<dd class="js_point_modalCart_bookshelf">' + seriesData.point + 'pt </dd>';
        cartModal += '<dd class="unit_point_modalCart_bookshelf"> (' + seriesData.point + '倍)</dd>';
        cartModal += '</dl>';

        cartModal += '</div>';
        var href = "javascript:with(document.forms['cart']){method='post';action='https://testbook.hikaritv.net/shopping/app/catalog/detail_book/addcart/book-store/'" + seriesData.item + "';if(nttinstallmentFlg('false', '')){javascript:blockDoubleSubmit(document.forms['cart'])}else{dummy();}}";
        cartModal += '<div class="btnBox_cart_modalCart_bookshelf">';
        cartModal += '<a class="js_btn_addcart_modalCart_bookshelf" href="' + href + '">カートに入れる</a> ';
        cartModal += '</div>';
        cartModal += '<div class="linkBox_modalCart_bookshelf">';
        cartModal += '<a href="https://testbook.hikaritv.net/book/content/book-store/' + seriesData.userID + '">この商品の詳細を確認する</a>';
        cartModal += '</div>';
        cartModal += '<span class="js_modal_close">✕</span>';
    } else if (status == 'reserved') {
        cartModal += '<div class="js_modalLink_bookshelf modalBox_bookshelf">';
        cartModal += '<div class="modalCart_bookshelf">';
        cartModal += '<p class="ttl_modalCart_bookshelf">この巻は予約中です。<br>YYYY年MM月NN日に配信開始になります。</p>';
        cartModal += '</div>';
        cartModal += '<div class="linkBox_modalCart_bookshelf">';
        cartModal += '<a href="https://testbook.hikaritv.net/book/content/book-store/' + seriesData.userID + '">この商品の詳細を確認する</a>';
        cartModal += '</div>';
        cartModal += '<span class="js_modal_close">✕</span>';
    }
    //return cartModal;
    j$(document).ready(function () {
        j$('.item' + index).append(cartModal);
    });
};
Bookshelf.prototype.template_confModal = function () {
    var confModal = '';
    confModal += '<div class="js_confModal_bookshelf wrapper_confModal_bookshelf">';
    confModal += '<span class="js_confModal_close">✕</span>';
    confModal += '<div class="confModal_bookshelf">';
    confModal += '<h2 class="ttl_confModal_bookshelf line-book">本棚の設定画面</h2 >';
    confModal += '<p class="lead_confModal_bookshelf">本棚を設定を登録することができます。使用始めのとき、熱により多少樹脂の臭いがありますが、120℃の消毒保管庫で、2～3時間、室内の換気をよくして加熱してください。臭いはなくなります。臭いは問題ありません。</p>';
    confModal += '<ol class="list_attension_confModal_bookshelf">';
    confModal += '<li>比重1.6～2.2　耐熱温度180℃</li>';
    confModal += '<li>不飽和ポリエステルとガラス繊維の複合樹脂で、耐衝撃性に優れています。</li>';
    confModal += '<li>成形品の形状によりガラス繊維の長さが異なります。トレイ（長）食器（短）</li>';
    confModal += '<li>使用始めのとき、熱により多少樹脂の臭いがありますが、120℃の消毒保管庫で、2～3時間、室内の換気をよくして加熱してください。臭いはなくなります。臭いは問題ありません。</li>';
    confModal += '<li>比重0.9　耐熱温度120℃</li>';
    confModal += '<li>プラスチック食器の中では最も軽く、耐薬品性が高い。</li>';
    confModal += '<li>材質は軟らかく、キズがつきやすい。</li>';
    confModal += '<li>汚れをそのままにしておくと、樹脂の内部に汚れが浸透する特性がありますので注意してください。</li>';
    confModal += '<li>比重1.2　耐熱温度130℃</li>';
    confModal += '<li>透明感にすぐれており、耐衝撃性にも優れています。</li>';
    confModal += '<li>蒸気には弱いのでご注意ください。（加水分解）</li>';
    confModal += '</ol>';
    confModal += '<div class="js_radioCookie_confModal_bookshelf">';
    confModal += '<table class="table_confModal_bookshelf">';
    confModal += '<tr class="pcOnly"><th>項　目</th><th class="btn_header">設 定 内 容</th></tr>';
    confModal += '<tr><th>シリーズの未購入品を表示</th><td><div class="js_radioCookie js_notbuy radio_confModal_bookshelf"><span class="checked">す る</span><span>し な い</span></div></td></tr>';
    confModal += '<tr><th>ＭＹ本棚の並び順</th><td><div class="js_radioCookie js_topItem_order radio_confModal_bookshelf"><span class="checked">タイトル名順</span><span>著者名順</span><span>購入日順</span></div></td></tr>';
    confModal += '<tr><th>シリーズ内の並び順</th><td><div class="js_radioCookie js_detailItem_order radio_confModal_bookshelf"><span>新着順</span><span>巻数順</span><span class="checked">購入日順</span></div></td></tr>';
    confModal += '<tr><th>表 示 件 数</th><td><div class="js_radioCookie js_display_num radio_confModal_bookshelf"><span class="checked">' + thisBookshelf.displyItemCount[0] + ' 件</span><span>' + thisBookshelf.displyItemCount[1] + ' 件</span><span>' + thisBookshelf.displyItemCount[2] + ' 件</span></div></td></tr>';
    confModal += '<tr><th>表 示 形 式</th><td><div class="js_radioCookie js_display_style radio_confModal_bookshelf"><span class="js_displayDetail">詳 細</span><span class="js_displayLarge checked">大</span></div></td></tr>';
    confModal += '</table>';
    confModal += '</div>';
    confModal += '</div>';
    return confModal;
};

Bookshelf.prototype.templateLabel = function (itemDataHash, bat) {
    if (thisBookshelf.device == 'pc') {
        var wrapObject = j$('.wrapper_bookshelf > div:nth-of-type(1)');
        var add = wrapObject.hasClass('display_listLarge_book');
        if (add) {
            thisBookshelf.tempLabel += '<div class="status vertical">';
        } else {
            thisBookshelf.tempLabel += '<div class="status">';
        }
    } else {
        thisBookshelf.tempLabel += '<div class="status">';
    }
    if (itemDataHash.latest_flg == 1 && itemDataHash.display_type == "single") {
        thisBookshelf.tempLabel += '<span class="cat-free">NEW</span>';
    }
    if (bat > 1) {
        thisBookshelf.tempLabel += '<span class="cat-series">シリーズ</span>';
    }
    thisBookshelf.tempLabel += '</div>';
};
Bookshelf.prototype.adjustText = function (text, textNum) {
    var leadTxt = text
    var leadNum = leadTxt.length;
    if (leadNum > 0) {
        if (leadNum >= textNum) {
            leadTxt = leadTxt.substr(0, textNum - 1);
            leadTxt += '...';
        }
    }
    return leadTxt;
};
Bookshelf.prototype.template_itemList = function (itemDataHash, keyName, bat, no) {
    var reviewFlag = false;
    var index = no + 1;
    var unread_batch = '';
    var modalClass = '';
    var modal = '';
    var btnType = '';
    var alterimgPath = thisBookshelf.alterImgSize(itemDataHash.thumbnail, 'biggest');
    var link;
    var dev = thisBookshelf.device == 'pc' ? 'pc' : 'sp';
    var itemList = '';
    if (thisBookshelf.pageType == 'top') {
        itemList = '<li>';
        link = '/test/pre_bookrenewal/html/bookshelf_detail_' + dev + '.html?id=' + thisBookshelf.userID + '&seriesId=' + keyName;
    } else if (thisBookshelf.pageType == 'detail') {
        if (bat == false) {
            if (itemDataHash.reserve == 2) {
                btnType = 'js_modalLinkOpen';
                thisBookshelf.template_cartModal(itemDataHash, 'reserved', index);
            } else if (itemDataHash.reserve == 1) {
                unread_batch = '<span class="batch_unread_bookshelf">未購入</span>';
                btnType = 'js_modalCartOpen';
                thisBookshelf.template_cartModal(itemDataHash, 'unread', index);
            } else {
                btnType = 'js_openBookViewer';
                modalClass = '';
                //modal = '';    
            }
            modalClass = 'unread_bookshelf';
            itemList = '<li class="' + modalClass + ' item' + index + '">';
        } else {
            btnType = 'js_openBookViewer';
            modalClass = '';
            //modal = '';
            itemList = '<li>';
        }
    };
    if (thisBookshelf.device != 'pc') {
        if (thisBookshelf.pageType == 'top') {
            thisBookshelf.templateLabel(itemDataHash, bat);
            itemList += thisBookshelf.tempLabel;
            thisBookshelf.tempLabel = '';
        }
    };
    //bookThumPhoto
    itemList += '<span class="bookThumPhoto">';
    if (thisBookshelf.pageType == 'top') {
        itemList += '<a href="' + link + '"class="photo">';
    } else if (thisBookshelf.pageType == 'detail') {
        itemList += '<a class="' + btnType + '">';
        itemList += unread_batch;
    }
    itemList += '<img src="' + alterimgPath + '" alt="' + itemDataHash.item_name + '">';
    itemList += '</a>';
    itemList += '</span>';//bookThumPhoto END
    //bookThumData
    itemList += '<span class="bookThumData">';
    if (thisBookshelf.device == 'pc') {
        if (thisBookshelf.pageType == 'top') {
            thisBookshelf.templateLabel(itemDataHash, bat);
            itemList += thisBookshelf.tempLabel;
            thisBookshelf.tempLabel = '';
        }
    }

    var ttl_text;
    if (thisBookshelf.pageType == 'top') {
        ttl_text = thisBookshelf.adjustText(itemDataHash.title_name, 70);
    } else {
        ttl_text = thisBookshelf.adjustText(itemDataHash.item_name, 70);
    }
    itemList += '<a href="javascript:void(0)" class="name">';
    itemList += '<span>' + ttl_text + '</span>';
    itemList += '</a>';

    if (thisBookshelf.pageType == 'top') {
        itemList += '<span class="authorSet">';
        itemList += '<a href="javascript:void(0)">' + itemDataHash.author + '</a>';
        itemList += '<a href="javascript:void(0)">' + itemDataHash.publisher + '</a>';
        itemList += '<a href="javascript:void(0)">' + itemDataHash.published_magazine + '</a>';
        if (itemDataHash.labal_name != undefined && itemDataHash.labal_name != 'undefined' && itemDataHash.labal_name != '') {
            itemList += '<a href="javascript:void(0)">' + itemDataHash.labal_name + '</a>';
        }
        itemList += '<span>全 ' + itemDataHash.total + ' 巻</span>';
        itemList += '</span>';
    } else if (thisBookshelf.pageType == 'detail') {
        var ttl_text = thisBookshelf.adjustText(itemDataHash.detail, 85);
        // itemList += '<p class="bookNum_bookshelf">' + itemDataHash.title_no + '</p>'
        itemList += '<p class="ttl_bookThumComment">作品内容</p>';
        itemList += '<span class="bookThumComment">' + ttl_text + '</span>';
    }
    itemList += '</span>';//bookThumData END
    itemList += '</li>';

    j$('.bookThum').append(itemList);
    itemList = '';
    modal = '';
};
Bookshelf.prototype.parseUrl = function () {
    var queryString = thisBookshelf.query.replace('?', '');
    var tempArray = queryString.split("&");
    var idHash = {};
    for (var i = 0; i < tempArray.length; i++) {
        var arrayForHash = tempArray[i].split('=');
        idHash[arrayForHash[0]] = arrayForHash[1];
    }
    thisBookshelf.userID = idHash.id;
    thisBookshelf.orderHistoryBeanDummyURL = "/test/pre_bookrenewal/js/dummy/shelf/orderHistoryBean" + thisBookshelf.userID + ".json";
    thisBookshelf.seriesId = idHash.seriesId;
};
Bookshelf.prototype.setDynamicParameter = function (param, value) {
    if (param == 'totalItemNum') {
        //データ数 totalItemNum
        thisBookshelf.totalItemNum = value;
    } else if (param == 'js_notbuy') {
        //未購入品の表示 js_notbuy
        thisBookshelf.itemParameter.js_notbuy = value;
    } else if (param == 'js_topItem_order') {
        //topアイテムの並び順 topItem_order
        thisBookshelf.itemParameter.js_topItem_order = value;
    } else if (param == 'js_detailItem_order') {
        //detailアイテムの並び順 detailItem_order
        thisBookshelf.itemParameter.js_detailItem_order = value;
    } else if (param == 'js_display_num') {
        //表示件数 js_display_num
        thisBookshelf.itemParameter.js_display_num = value;
    } else if (param == 'js_display_style') {
        //アイテム表示スタイル
        thisBookshelf.itemParameter.js_display_style = value;
    } else if (param == 'js_now_page') {
        //現在ページ数 js_now_page
        thisBookshelf.itemParameter.js_now_page = value;
    } else if (param == 'startNum') {
        //現在ページ数 startNum
        thisBookshelf.startNum = value;
    }
    var Num = Number(thisBookshelf.itemParameter.js_display_num);
    //総ページ数 totalPageNum
    thisBookshelf.totalPageNum = Math.ceil(thisBookshelf.totalItemNum / thisBookshelf.displyItemCount[Num]);
};
Bookshelf.prototype.pickBookHistory = function (data) { //callBack1 a-jax
    var deliveryLists = data.history.book.deliverylist;
    for (var i = 0; i < deliveryLists.length; i++) {
        var eachDeliveryList = deliveryLists[i].commodityList;
        for (var j = 0; j < eachDeliveryList.length; j++) {
            var seriesId = eachDeliveryList[j].seriesId;
            if (seriesId in thisBookshelf.preState) {
                thisBookshelf.preState[seriesId].push(eachDeliveryList[j].commodityCode);
            } else {
                var urlForSeries = '/test/pre_bookrenewal/js/dummy/shelf/' + seriesId + '.json';
                if (thisBookshelf.pageType == 'top') {
                    thisBookshelf.callAjax(urlForSeries, thisBookshelf.setSeriesState, seriesId);
                };
                thisBookshelf.preState[seriesId] = [];
                thisBookshelf.preState[seriesId].push(eachDeliveryList[j].commodityCode)
            }
        };
    };
    if (thisBookshelf.pageType == 'detail') {
        var urlForSeries = '/test/pre_bookrenewal/js/dummy/shelf/' + thisBookshelf.seriesId + '.json';
        thisBookshelf.callAjax(urlForSeries, thisBookshelf.setSeriesState, thisBookshelf.seriesId);
    };
};
Bookshelf.prototype.setSeriesState = function (data, seriesId) { //callBack2 a-jax
    var books = data.contents;
    if (thisBookshelf.pageType == 'top') {
        thisBookshelf.preSeriesState[seriesId] = {};
        thisBookshelf.preSeriesState[seriesId]['item'] = [];
        for (var i = 0; i < books.length; i++) {
            thisBookshelf.preSeriesState[seriesId]['item'].push(books[i].item);
            if (i == 0) {
                thisBookshelf.preSeriesState[seriesId]['total'] = data.total;
                thisBookshelf.preSeriesState[seriesId]['count'] = data.count;
                thisBookshelf.preSeriesState[seriesId]['item_name'] = books[i].item_name;
                thisBookshelf.preSeriesState[seriesId]['thumbnail'] = books[i].thumbnail;
                thisBookshelf.preSeriesState[seriesId]['published_magazine'] = books[i].published_magazine ? books[i].published_magazine : '';
                thisBookshelf.preSeriesState[seriesId]['labal_name'] = books[i].published_magazine ? books[i].labal_name : '';
                thisBookshelf.preSeriesState[seriesId]['author'] = books[i].author;
                thisBookshelf.preSeriesState[seriesId]['title_name'] = books[i].title_name;
                thisBookshelf.preSeriesState[seriesId]['publisher'] = books[i].publisher;
                thisBookshelf.preSeriesState[seriesId]['latest_flg'] = books[i].latest_flg;
                thisBookshelf.preSeriesState[seriesId]['complete'] = books[i].complete;
                thisBookshelf.preSeriesState[seriesId]['reserve'] = books[i].reserve;
                thisBookshelf.preSeriesState[seriesId]['display_type'] = books[i].display_type;
            }
            var myItems = thisBookshelf.preState[seriesId];
            for (var j = 0; j < myItems.length; j++) {
                if (myItems[j] == books[i].item) {
                    var tempHash = {};
                    tempHash['seriesId'] = seriesId;
                    tempHash['item'] = books[i].item;
                    tempHash['item_name'] = books[i].item_name;
                    tempHash['title_name'] = books[i].title_name;
                    tempHash['auther'] = books[i].auther;
                    tempHash['thumbnail'] = books[i].thumbnail;
                    tempHash['detail_url'] = books[i].detail_url;
                    thisBookshelf.myBookState.push(tempHash);
                }
            }
        };
        thisBookshelf.setDynamicParameter('totalItemNum', Object.keys(thisBookshelf.preSeriesState).length);
    } else if (thisBookshelf.pageType == 'detail') {
        thisBookshelf.seriesState[thisBookshelf.seriesId] = {};
        thisBookshelf.seriesState[thisBookshelf.seriesId]['count'] = data.count;
        thisBookshelf.seriesState[thisBookshelf.seriesId]['total'] = data.total;
        thisBookshelf.total = data.total;
        thisBookshelf.setDynamicParameter('totalItemNum', books.length);
        function isArray(obj) {
            return Object.prototype.toString.call(obj) === '[object Array]';
        }
        for (var i = 0; i < books.length; i++) {
            if (i == 0) {
                thisBookshelf.pageTitle = books[i].title_name;
            }
            if (!isArray(thisBookshelf.seriesState[thisBookshelf.seriesId]['contents'])) {
                thisBookshelf.seriesState[thisBookshelf.seriesId]['contents'] = [];
            };
            var tempHash = {};
            tempHash['item'] = (books[i].item);
            tempHash['item_name'] = (books[i].item_name);
            tempHash['thumbnail'] = (books[i].thumbnail);
            tempHash['detail_url'] = (books[i].detail_url);
            tempHash['unit_price'] = (books[i].now_price);
            tempHash['now_price'] = (books[i].now_price);
            tempHash['point'] = (books[i].point);
            tempHash['title_no'] = (books[i].title_no);
            tempHash['title_name'] = (books[i].title_name);
            tempHash['detail'] = (books[i].detail);
            tempHash['sales_date'] = (books[i].sales_date);
            tempHash['latest_flg'] = (books[i].latest_flg);
            tempHash['complete'] = (books[i].complete);
            tempHash['reserve'] = (books[i].reserve);
            tempHash['display_type'] = (books[i].display_type);
            thisBookshelf.seriesState[thisBookshelf.seriesId]['contents'].push(tempHash);
        }
    }
};
Bookshelf.prototype.rebuildContentsHash = function (type, name, value) {
    if (thisBookshelf.pageType == 'top') {
        if (!Object.keys(thisBookshelf.seriesState).length) {
            Object.keys(thisBookshelf.preSeriesState).forEach(function (key, index) {
                var tempHash = {};
                tempHash[key] = thisBookshelf.preSeriesState[key];
                thisBookshelf.seriesState.push(tempHash);
            });
        };
        thisBookshelf.cloneSeriesState = {};
        if (Object.assign) {
            thisBookshelf.cloneSeriesState = Object.assign([], thisBookshelf.seriesState);
        } else {
            thisBookshelf.cloneSeriesState = j$.extend([], thisBookshelf.seriesState);
        }
    } else {
        thisBookshelf.cloneSeriesState = {};
        if (Object.assign) {
            thisBookshelf.cloneSeriesState = Object.assign({}, thisBookshelf.seriesState);
        } else {
            thisBookshelf.cloneSeriesState = j$.extend({}, thisBookshelf.seriesState);
        }
    }
    thisBookshelf.sortContentsHash(type, name, value);
};
Bookshelf.prototype.sortContentsHash = function (type, name, value) {
    if (name != 'js_topItem_order' && name != 'js_detailItem_order' && name != 'js_notbuy') {
        thisBookshelf.handleCookie(type, name, value);
    } else {
        //● 未購入品の表示 js_notbuy  ←　seriesState作成時に対応？？
        //  ★0:する  ★1:しない        
        //● topアイテムの並び順 js_topItem_order 　
        //  ★0:タイトル順 title_name   ★1:著者順　author"配列        
        //● detailアイテムの並び順 js_detailItem_order 　
        //  ★0:新着順　item   // ★1:古い順　item   ★2:巻数順　total　シリーズjson
        var pageOrder = {
            'top': {
                '0': 'item_name',
                '1': 'author',
                '2': 'total'
            },
            'detail': {
                '0': 'item',
                '1': 'item_r',
                '2': 'title_no'
            }
        };
        function sortCloneState(name, value) {
            var sid = thisBookshelf.seriesId;
            var sortKey = pageOrder[thisBookshelf.pageType][value];
            //var tempHash = thisBookshelf.pageType == 'top' ? thisBookshelf.cloneSeriesState : thisBookshelf.cloneSeriesState[sid]['contents'];
            var tempHash;
            if (thisBookshelf.pageType == 'top') {
                //var key=addKey(thisBookshelf.cloneSeriesState)
                tempHash = thisBookshelf.cloneSeriesState;
            } else {
                tempHash = thisBookshelf.cloneSeriesState[sid]['contents'];
            }
            function toHiragana(val) {
                return val.replace(/[\u30a1-\u30f6]/g, function (match) {
                    var chr = match.charCodeAt(0) - 0x60;
                    return String.fromCharCode(chr);
                });
            }
            function addKey(val) {
                var keyName = Object.keys(val);
                return keyName[0];
            }
            if (sortKey == 'title_no' || sortKey == 'item' || sortKey == 'total') {
                tempHash.sort(function (a, b) {
                    a[sortKey] = Number(a[sortKey]);
                    b[sortKey] = Number(b[sortKey]);
                    return a[sortKey] - b[sortKey];
                });
            } else if (sortKey == 'title_no_r' || sortKey == 'item_r') {
                tempHash.sort(function (a, b) {
                    a[sortKey] = Number(a[sortKey]);
                    b[sortKey] = Number(b[sortKey]);
                    sortKey = sortKey.replace('_r', '');
                    return b[sortKey] - a[sortKey];
                });
            } else if (sortKey == 'item_name' || sortKey == 'auther') {
                //ひらがなカタカナ　50音順
                tempHash.sort(function (a, b) {
                    var A, B;
                    var i = addKey(a);
                    var j = addKey(b);
                    if (sortKey == 'item_name') {
                        A = a[i][sortKey];
                        B = b[j][sortKey];
                    } else if (sortKey == 'author') {
                        A = a[i][sortKey][0];
                        B = b[j][sortKey][0];
                    }
                    A = toHiragana(A.toString());
                    B = toHiragana(B.toString());
                    if (A < B) {
                        return -1;
                    } else if (A > B) {
                        return 1;
                    }
                    return 0;
                });
            } else if (sortKey == 'item_name_r' || sortKey == 'auther_r') {
                sortKey = sortKey.replace('_r', '');
                tempHash.sort(function (a, b) {
                    var A, B;
                    var i = addKey(a);
                    var j = addKey(b);
                    if (sortKey == 'item_name') {
                        A = a[i][sortKey];
                        B = b[j][sortKey];
                    } else if (sortKey == 'auther') {
                        A = a[i][sortKey][0];
                        B = b[j][sortKey][0];
                    }
                    A = toHiragana(A.toString());
                    B = toHiragana(B.toString());
                    if (A > B) {
                        return -1;
                    } else if (A < B) {
                        return 1;
                    }
                    return 0;
                });
            }
            thisBookshelf.handleCookie(type, name, value);
        }
        sortCloneState(name, value);
    };
};
Bookshelf.prototype.parseDataToHtml = function (cloneSeriesState, itemStartNum, loopNum) {
    var ulObj = j$('.wrapper_bookshelf > div:nth-of-type(1) > ul');
    var oldlistObj = ulObj.children('li');
    if (oldlistObj.length) {
        ulObj.empty();
    }
    ulObj.append(thisBookshelf.element);
    var endNum = itemStartNum + loopNum;
    if (thisBookshelf.pageType == 'top') {
        for (var i = 0; i < cloneSeriesState.length; i++) {
            var keyNameArray = Object.keys(cloneSeriesState[i]);
            var keyName = keyNameArray[0]
            if (itemStartNum <= i && i < endNum) {
                var batNum = Number(thisBookshelf.cloneSeriesState[i][keyName].total) - Number(thisBookshelf.preState[keyName].length);
                thisBookshelf.template_itemList(cloneSeriesState[i][keyName], keyName, batNum, '');
                //////////////////////////////////////////
            }
        }
        thisBookshelf.template_itemCount(itemStartNum, endNum, thisBookshelf.totalItemNum);
    } if (thisBookshelf.pageType == 'detail') {
        var sid = thisBookshelf.seriesId;
        function checkBatch(itemId) {
            var bool = false;
            var temArray = thisBookshelf.preState[sid];
            for (var i = 0; i < temArray.length; i++) {
                if (temArray[i] == itemId) {
                    bool = true;
                }
            }
            return bool;
        };
        var detailItems = cloneSeriesState[sid].contents;
        for (var i = itemStartNum; i < endNum; i++) {
            var bat = checkBatch(detailItems[i].item);
            thisBookshelf.template_itemList(detailItems[i], '', bat, i);
            /////////////////////////////////////////////
        }
        thisBookshelf.template_itemCount(itemStartNum, endNum, thisBookshelf.totalItemNum);
    };
};

Bookshelf.prototype.returnNumForCookie = function (thisBtnObj) {
    var thisParent = thisBtnObj.parent();
    var thisNum = thisParent.find('> span').index(thisBtnObj);
    var parentObject = thisBtnObj.parent();
    thisBookshelf.activeSelect = thisNum;
    if (parentObject.hasClass('js_notbuy')) {
        thisBookshelf.tempCookieName = 'js_notbuy';
    }
    if (parentObject.hasClass('js_detailItem_order')) {
        thisBookshelf.tempCookieName = 'js_detailItem_order';
    }
    if (parentObject.hasClass('js_topItem_order')) {
        thisBookshelf.tempCookieName = 'js_topItem_order';
    }
    if (parentObject.hasClass('js_display_num')) {
        thisBookshelf.tempCookieName = 'js_display_num';
    }
    if (parentObject.hasClass('js_display_style')) {
        thisBookshelf.tempCookieName = 'js_display_style';
    }
    if (parentObject.hasClass('js_now_page')) {
        thisBookshelf.tempCookieName = 'js_now_page';
    }
    var itemHash = {};
    itemHash[thisBookshelf.tempCookieName] = thisBookshelf.activeSelect;
    return itemHash;
};
Bookshelf.prototype.handleCookie = function (type, cookieName, activeSelect) { //cookie and globalVars
    if (type == 'single') {
        var val = thisBookshelf.cookieAction('get', cookieName, '');
        var btnVal = val + 1;
        thisBookshelf.applyCookieToBtnDisplay(cookieName, btnVal, true);
    } else if (type == 'multi') {
        var tempHash;
        if (cookieName == 'loaded') {
            tempHash = activeSelect;
        } else {
            tempHash = thisBookshelf.itemParameter;
        }
        var lastItemNum = Object.keys(tempHash).length;
        var initialFlag = 1;
        var istopItem = thisBookshelf.cookieAction('get', 'js_topItem_order', '');
        var isdetailItem = thisBookshelf.cookieAction('get', 'js_detailItem_order', '');
        if (istopItem == undefined || isdetailItem == undefined) {
            initialFlag = 0;
        }
        Object.keys(tempHash).forEach(function (key, index) {
            var name = String(key).trim();
            var itemIndex = index + 1;
            var goFlag = false;
            if (lastItemNum == itemIndex) {
                goFlag = true;
            }
            if (cookieName == 'loaded') {
                var val = thisBookshelf.cookieAction('get', name, '');
                var btnVal = val + 1;
                thisBookshelf.applyCookieToBtnDisplay(name, btnVal, goFlag);
            } else {
                if (initialFlag == 0) {
                    console.log('1st load:');
                    var btnVal;
                    //初回
                    btnVal = thisBookshelf.itemParameter[name];
                    thisBookshelf.setDynamicParameter(name, btnVal);
                    thisBookshelf.cookieAction('set', name, btnVal);
                    btnVal = btnVal + 1;
                    var pageNum = btnVal - 1;
                    if (pageNum < 1) {
                        pageNum = 1;
                    }
                    if (name == 'js_now_page' || name == 'js_display_num') {
                        thisBookshelf.startNum = (thisBookshelf.displyItemCount[thisBookshelf.itemParameter.js_display_num]) * (pageNum - 1);
                    }
                } else {
                    console.log('2nd load:');
                    var val = thisBookshelf.cookieAction('get', name, '');
                    val = Number(val);
                    btnVal = val + 1;
                    if (name == 'js_display_num') {
                        //cookie なので　val
                        thisBookshelf.setParamAndCookiebtnAction('load', name, val);
                    }
                }
                if (thisBookshelf.pageType == 'top') {
                    if (name != 'js_detailItem_order') {
                        thisBookshelf.applyCookieToBtnDisplay(name, btnVal, goFlag);
                    }
                } else if (thisBookshelf.pageType = 'detail') {
                    if (name != 'js_topItem_order') {
                        thisBookshelf.applyCookieToBtnDisplay(name, btnVal, goFlag);
                    }
                };
                if (goFlag) {
                    initialFlag = 1;
                }
            }
        });
    }
};
Bookshelf.prototype.applyCookieToBtnDisplay = function (name, val, dispBoolean) {
    var nowThis;
    if (name == 'js_now_page') {
        var val2 = val - 1;
        nowThis = j$('.' + name + '> span:nth-of-type(' + val2 + ')');
        //  console.log('1: '+name);
    } else {
        nowThis = j$('.' + name + '> span:nth-of-type(' + val + ')');
    }
    nowThis.siblings().removeClass('checked');
    nowThis.addClass('checked');
    if (name == 'js_display_style') {
        //表示形式
        var wrapObject = j$('.wrapper_bookshelf > div:nth-of-type(1)');
        wrapObject.removeClass();
        if (val == 1) {
            wrapObject.addClass('display_listLarge_book');
            j$('.js_displayLarge').addClass('checked');
            j$('.js_displayDetail').removeClass('checked');
            //labelとcartの縦横CSS切り替え
            if (thisBookshelf.device == 'pc') {
                var label = j$('.status');
                var label_vertical = label.hasClass('vertical');
                if (!label_vertical) {
                    label.addClass('vertical');
                }
            }
        } else if (val == 2) {
            wrapObject.addClass('display_listDetail_book');
            j$('.js_displayLarge').removeClass('checked');
            j$('.js_displayDetail').addClass('checked');
            //labelとcartの縦横CSS切り替え
            if (thisBookshelf.device == 'pc') {
                var label = j$('.status');
                var label_vertical = label.hasClass('vertical');
                if (label_vertical) {
                    label.removeClass('vertical');
                }
            }
        }
    }
    if (dispBoolean) {
        thisBookshelf.calcAndDisplayContents(name);
    }
};
Bookshelf.prototype.calcAndDisplayContents = function (name) {
    var cloneState = thisBookshelf.cloneSeriesState;
    var totalItemNum = thisBookshelf.totalItemNum;
    var displayNum = thisBookshelf.displyItemCount[thisBookshelf.itemParameter.js_display_num];
    var nowPage = thisBookshelf.itemParameter.js_now_page;
    var totalPageNum = thisBookshelf.totalPageNum;
    var startNum = thisBookshelf.startNum;
    var totalPageNum = thisBookshelf.totalPageNum;
    var smallLoop = totalItemNum % displayNum;
    var virtalMaxItemNum = totalPageNum * displayNum;
    var loopNum = '';
    if (totalItemNum < virtalMaxItemNum) {
        if (nowPage == totalPageNum) {
            loopNum = smallLoop;
        } else {
            loopNum = displayNum;
        }
    } else {
        loopNum = displayNum;
    }
    //未購入品表示・非表示//詳細商品並び順//TOP商品並び順//ページ
    if (name == 'js_notbuy' || name == 'js_detailItem_order' || name == 'js_topItem_order') {
        thisBookshelf.parseDataToHtml(cloneState, startNum, loopNum);
    } else if (name == 'js_display_num' || name == 'js_now_page') {
        thisBookshelf.parseDataToHtml(cloneState, startNum, loopNum);
        thisBookshelf.template_pager(nowPage, totalPageNum);
    }
};
Bookshelf.prototype.setParamAndCookiebtnAction = function (type, clickedBtnObjectOrLoadName, loadValue) {
    var thisBtnObject;
    var val;
    var nowTarget;
    if (type == 'click') {
        thisBtnObject = clickedBtnObjectOrLoadName;
        var cookieItemHash = thisBookshelf.returnNumForCookie(thisBtnObject);
        var nameKeys = Object.keys(cookieItemHash);
        var name = nameKeys[0];
        val = Number(cookieItemHash[name]);
        nowTarget = thisBtnObject.parent().attr('class');
    } else {
        nowTarget = clickedBtnObjectOrLoadName;
        val = loadValue;
    }
    if (nowTarget.indexOf('js_display_num') != -1) {
        //■表示件数　js_display_num　js_now_page
        var totalItemNum = thisBookshelf.totalItemNum;
        var nowThisPage = thisBookshelf.itemParameter.js_now_page;
        var nextDisplayIndex = val;
        var nowDisplayIndex = thisBookshelf.itemParameter.js_display_num;
        var nextItemCount = thisBookshelf.displyItemCount[nextDisplayIndex];
        var nowItemCount = thisBookshelf.displyItemCount[nowDisplayIndex];
        var nextTotalPageNum = Math.ceil(totalItemNum / nextItemCount);
        var nowStartNum = (nowThisPage - 1) * nowItemCount;
        var nextNowThisPage = Math.ceil(nowStartNum / nextTotalPageNum);
        if (nextNowThisPage < 1) {
            nextNowThisPage = 1;
        }
        var nextStartNum = (nextNowThisPage - 1) * nowItemCount;
        if (nextStartNum <= 1) {
            nextStartNum = 0;
        } else if (nextStartNum > totalItemNum) {
            nextStartNum = (nextTotalPageNum - 1) * nextItemCount + 1;
        } else {
            nextStartNum = (nextNowThisPage - 1) * nextItemCount + 1;
        }
        thisBookshelf.setDynamicParameter('startNum', nextStartNum);
        thisBookshelf.setDynamicParameter('js_display_num', nextDisplayIndex);
        thisBookshelf.setDynamicParameter('js_now_page', nextNowThisPage);

        thisBookshelf.cookieAction('set', 'startNum', nextStartNum);
        thisBookshelf.cookieAction('set', 'js_display_num', nextDisplayIndex);
        thisBookshelf.cookieAction('set', 'js_now_page', nextNowThisPage);
        if (type == 'click') {
            thisBookshelf.rebuildContentsHash('multi', 'loaded', { 'js_display_num': 0, 'js_now_page': 0 });
        }
    } else {
        if (nowTarget.indexOf('js_now_page') != -1) {
            //■ページャー　js_now_page
            var totalItemNum = thisBookshelf.totalItemNum; //20
            var display_num = thisBookshelf.itemParameter.js_display_num; //0 1 2
            var itemCount = thisBookshelf.displyItemCount[display_num];// 3 5 10
            var totalPageNum = Math.ceil(totalItemNum / itemCount); //7 4 2
            var nextNowThisPage = val + 1;
            if (nextNowThisPage > totalPageNum) {
                nextNowThisPage = totalPageNum;
            }
            if (nextNowThisPage < 1) {
                nextNowThisPage = 1;
            }
            var nextStartNum = (nextNowThisPage - 1) * itemCount;
            thisBookshelf.setDynamicParameter('startNum', nextStartNum);
            thisBookshelf.setDynamicParameter('js_now_page', nextNowThisPage);
            thisBookshelf.cookieAction('set', 'js_now_page', nextNowThisPage);
            thisBookshelf.rebuildContentsHash('single', 'js_now_page', nextNowThisPage);
        } else if (nowTarget.indexOf('js_notbuy') != -1 || nowTarget.indexOf('js_display_style') != -1 || nowTarget.indexOf('js_topItem_order') != -1 || nowTarget.indexOf('js_detailItem_order') != -1 || nowTarget.indexOf('js_notbuy') != -1) {
            //■表示スタイル　js_display_style
            //■並び順TOP　js_topItem_order
            //■並び順detai　js_detailItem_order
            //■買ってない商品の表示・非表示　js_notbuy
            thisBookshelf.setDynamicParameter(name, val);
            thisBookshelf.cookieAction('set', name, val);
            thisBookshelf.rebuildContentsHash('single', name, val);
        }
    };
};
Bookshelf.prototype.btnAction = function () {
    //radioCookieBtn controll
    j$(document).ready(function () {
        j$(document).on('click', '.js_radioCookie > span', function () {
            thisBookshelf.setParamAndCookiebtnAction('click', j$(this));
        });
    });
    //cart modal display
    j$(document).on('click', '.js_modalCartOpen, .js_modalLinkOpen', function () {
        var thisThumb = j$(this);
        var targetModalName;
        if (thisThumb.hasClass('js_modalCartOpen')) {
            targetModalName = 'js_modalCart';
        } else if (thisThumb.hasClass('js_modalLinkOpen')) {
            targetModalName = 'js_modalLink';
        }
        var li = thisThumb.parents().parents();
        var modalNum = returnParentNum(li);
        var modalHeight = li.innerHeight();
        modalHeight = Number(modalHeight) * -1 - 12;
        j$('.bookThum > li').each(function (index, element) {
            var otherModalNum = returnParentNum(j$(element))
            if (otherModalNum != modalNum) {
                j$('.item' + otherModalNum).find('.modalBox_bookshelf').hide();
            } else {
                var thisModal = j$('.item' + otherModalNum).find('.' + targetModalName + '_bookshelf');
                var display = thisModal.css('display');
                if (display == 'block') {
                    thisModal.hide();
                } else {
                    thisModal.show();
                }
            }
        });
        function returnParentNum(element) {
            var className = element.attr('class');
            var modalNum = String(className).replace('unread_bookshelf', '');
            modalNum = modalNum.replace('item', '');
            modalNum = modalNum.trim();
            modalNum = Number(modalNum);
            return modalNum;
        };
    });
    j$(document).on('click', '.js_modal_close', function () {
        j$(this).parent().css({
            'display': 'none'
        });
    });
    //cart modal display
    j$(document).on('click', '.js_openBookViewer', function () {
        location.href = "./browseViewer.html"
    });
    //conf modal display
    j$(document).on('click', '.js_conf', function () {
        var js_confModal_bookshelf = j$('.js_confModal_bookshelf');
        var display = js_confModal_bookshelf.css('display');
        if (display == 'block') {
            j$(this).removeClass('checked');
            js_confModal_bookshelf.hide();
        } else {
            js_confModal_bookshelf.show();
            j$(this).addClass('checked');
        }
    });
    j$(document).on('click', '.js_confModal_close', function () {
        j$(this).parent().css({
            'display': 'none'
        });
        j$('.js_conf').removeClass('checked');
    });
    //filter
    j$(document).on('focus', '#filter_bookshelf', function (e) {
        if (e.type == 'focusin') {
            thisBookshelf.filterElement = '';
            thisBookshelf.filterMyBook();
        }
    });
    j$(document).on('click', '.js_filtedItem_close', function (e) {
        j$('.js_filtedItemBox').hide();
        $('.js_filtedItemBox > ul').empty();
        thisBookshelf.filterElement = '';
    });

};
Bookshelf.prototype.filterMyBook = function () {
    j$(document).on('change', '#filter_bookshelf', function () {
        var word = j$(this).val();
        if (thisBookshelf.pageType == 'top') {
            var filtered = j$.grep(thisBookshelf.myBookState,
                function (hash, index) {
                    if (hash['item_name'].indexOf(word) != -1) {
                        attachItem(hash);
                    }
                });
        }
        j$('.js_filtedItemBox').show();
        j$('.js_filtedItemBox > ul').append(thisBookshelf.filterElement);
        j$('.js_filtedItemBox').css({ 'background': 'rgba(23, 83, 10, 0.1)' });
        thisBookshelf.filterElement = '';
    });
    function attachItem(itemHash) {
        thisBookshelf.filterElement += '<li>';
        thisBookshelf.filterElement += '<a href="./browserViewer.html?' + itemHash.item + '">';
        thisBookshelf.filterElement += '<img src="' + itemHash.thumbnail + '" data-src="' + itemHash.thumbnail + '" alt="' + itemHash.item_name + '">';
        thisBookshelf.filterElement += '<p class="ttl_filter_bookshelf">' + itemHash.item_name + '</p>';
        thisBookshelf.filterElement += '</a>';
        thisBookshelf.filterElement += '</li>';
    }
};
Bookshelf.prototype.inputStyle = function (status, inputObject) {
    if (status == 'load') {
        j$('.hierarchy_2 input').css({
            "appearance": "none",
            "-webkit-appearance": "none"
        });
    } else if (status == 'click') {
        if (inputObject.prop('checked')) {
            inputObject.siblings('label').addClass('checked');
            inputObject.css({
                "background": "url(/test/pre_bookrenewal/img/navChecked_pc_book.png) no-repeat center center",
                "background-size": "12px"
            });
        } else {
            inputObject.siblings('label').removeClass('checked');
            inputObject.css({
                "background": "#ffffff",
                "background-size": "12px"
            });
        }
    }
};
Bookshelf.prototype.loadAction = function () {
    //最初一回だけ
    var ttlBox = thisBookshelf.template_titleBox();
    var listNav_inner2 = thisBookshelf.template_listNav_inner2();
    var confModal = thisBookshelf.template_confModal();
    var display_listLarge_book = '<div class="display_listLarge_book"><ul class="bookThum"></ul></div>';
    var listNav = j$('<div class="listNav"></div>');
    listNav.append(ttlBox)
        .append(listNav_inner2);
    j$('main').prepend(listNav);
    j$('.wrapper_bookshelf')
        .append(display_listLarge_book);
    j$('body').append(confModal);
    if (thisBookshelf.pageType == 'detail') {
        var ttl = thisBookshelf.pageTitle + '　全 ' + thisBookshelf.total + ' 巻';
        j$('.js_seriesName').text(ttl);
    }
    //■LOAD　すべて
    thisBookshelf.rebuildContentsHash('multi', 'load', '');
    thisBookshelf.inputStyle('load');
};
Bookshelf.prototype.init = function () {
    console.log('BookShelf init');
    thisBookshelf.uaJudge();
    thisBookshelf.judgePageType();
    thisBookshelf.parseUrl();
    thisBookshelf.callAjax(thisBookshelf.orderHistoryBeanDummyURL, thisBookshelf.pickBookHistory);
    j$(document).ready(function () {
        thisBookshelf.btnAction();
    });
    j$(window).on('load', function () {
        thisBookshelf.loadAction();
        if (thisBookshelf.device != 'pc') {
            thisBookshelf.leaderThree();
        };
    });
};
var bookshelf = new Bookshelf();
bookshelf.init();
