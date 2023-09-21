//v01
var thisBookseries;
var Bookseries = function() {
  thisBookseries = this;
  this.pageTitle;
  this.tempCookieName;
  this.displyItemCount = [3, 5, 10];
  this.itemExplain_txt_book;
  this.itemExplain_txt100_book;
  this.tempLabel = "";
  this.login = 0;
};
Bookseries.prototype = new BookRenewalCommon();
Bookseries.prototype.judgePageType = function() {
  if (thisBookseries.pathname.indexOf("pc_detail") != -1) {
    thisBookseries.pageType = "pc_detail";
  } else if (thisBookseries.pathname.indexOf("pc_search") != -1) {
    thisBookseries.pageType = "pc_search";
  } else if (thisBookseries.pathname.indexOf("pc_ranking") != -1) {
    thisBookseries.pageType = "pc_ranking";
  } else if (thisBookseries.pathname.indexOf("pc_top") != -1) {
    thisBookseries.pageType = "pc_top";
  } else if (thisBookseries.pathname.indexOf("sp_detail") != -1) {
    thisBookseries.pageType = "sp_detail";
  } else if (thisBookseries.pathname.indexOf("sp_search") != -1) {
    thisBookseries.pageType = "sp_search";
  } else if (thisBookseries.pathname.indexOf("sp_ranking") != -1) {
    thisBookseries.pageType = "sp_ranking";
  } else if (thisBookseries.pathname.indexOf("sp_top") != -1) {
    thisBookseries.pageType = "sp_top";
  }
};
Bookseries.prototype.separateElementOut = function(type) {
  console.log(type);
  console.log(thisBookRenewalCommon.device + " : " + thisBookseries.pageType);
  var labelStatus = $(".status");
  var addCartMsg = $(".addCartMsg");
  var label_vertical = labelStatus.hasClass("vertical");
  var addcart_vertical = addCartMsg.hasClass("vertical");
  //labelとcartの縦横CSS切り替え
  if (thisBookseries.device == "pc") {
    if (type == "js_displayDetail") {
      if (label_vertical) {
        labelStatus.removeClass("vertical");
      }
      if (addcart_vertical) {
        addCartMsg.removeClass("vertical");
      }
    } else {
      if (!label_vertical) {
        labelStatus.addClass("vertical");
      }
      if (!addcart_vertical) {
        addCartMsg.addClass("vertical");
      }
    }
  }
  if (thisBookseries.pageType == "pc_detail") {
    if (type == "js_displayLarge") {
      $(".authorSet ").css({ display: "block" });
      $(".authorSet > a").css({ display: "none" });
      $(".authorSet > a:nth-of-type(1)").css({ display: "block" });
      $(".bookThumComment").css({ display: "none" });
      $(".priceGroup_book").css({ display: "none" });
    } else {
      $(".authorSet").css({ display: "none" });
      $(".bookThumComment").css({ display: "block" });
      $(".priceGroup_book").css({ display: "block" });
    }
  } else if (thisBookseries.pageType == "sp_detail") {
    $(".authorSet ").css({ display: "none" });
    if (type == "js_displayLarge") {
      //$('.bookThumTool').css({ 'display': 'block' });
      $(".priceGroup_book").css({ display: "none" });
      //$('.authorSet').css({ 'display': 'none' });
      $(".bookThumData .name").css({ display: "none" });
    } else {
      //$('.bookThumTool').css({ 'display': 'block' });
      $(".priceGroup_book").css({ display: "block" });
      //$('.authorSet').css({ 'display': 'block' });
      $(".bookThumData .name").css({ display: "block" });
    }
  } else if (
    thisBookseries.pageType == "pc_ranking" ||
    thisBookseries.pageType == "pc_search"
  ) {
    if (type == "js_displayLarge") {
      $(".bookThumComment").css({ display: "none" });

      $(".bookCartListBtnNew").css({ display: "none" });
      $(".bookCartListBtn").css({ display: "none" });
      $(".bookReserveListBtn").css({ display: "none" });
      $(".bookReserveListBtnNew").css({ display: "none" });

      $(".priceGroup_book").css({ display: "none" });
      $(".linkToSeries").css({ display: "none" });
      $(".authorSet .genre").css({ display: "none" });
      $(".authorSet > a").css({ display: "none" });
      $(".authorSet > a:nth-of-type(1)").css({ display: "block" });
      $(".authorSet > a:nth-of-type(2)").css({ display: "none" });
    } else {
      $(".bookThumComment").css({ display: "block" });

      $(".bookCartListBtnNew").css({ display: "inline-block" });
      $(".bookCartListBtn").css({ display: "inline-block" });
      $(".bookReserveListBtn").css({ display: "inline-block" });
      $(".bookReserveListBtnNew").css({ display: "inline-block" });

      $(".priceGroup_book").css({ display: "block" });
      $(".linkToSeries").css({ display: "block" });
      $(".authorSet .genre").css({ display: "block" });
      $(".authorSet > a").css({ display: "none" });
      $(".authorSet > a:nth-of-type(1)").css({ display: "block" });
      $(".authorSet > a:nth-of-type(2)").css({ display: "table" });
    }
  } else if (
    thisBookseries.pageType == "sp_ranking" ||
    thisBookseries.pageType == "sp_search"
  ) {
    if (type == "js_displayLarge") {
      $(".bookCartListBtnNew").css({ display: "none" });
      $(".bookCartListBtn").css({ display: "none" });
      $(".bookReserveListBtn").css({ display: "none" });
      $(".bookReserveListBtnNew").css({ display: "none" });

      $(".linkToSeries").css({ display: "none" });
      $(".authorSet > a").css({ display: "none" });
      $(".authorSet > a:nth-of-type(1)").css({ display: "block" });
    } else {
      $(".bookCartListBtnNew").css({ display: "inline-block" });
      $(".bookCartListBtn").css({ display: "inline-block" });
      $(".bookReserveListBtn").css({ display: "inline-block" });
      $(".bookReserveListBtnNew").css({ display: "inline-block" });

      $(".linkToSeries").css({ display: "block" });
      $(".authorSet > a").css({ display: "none" });
      $(".authorSet > a:nth-of-type(1)").css({ display: "block" });
    }
  }
};
Bookseries.prototype.htmlTitleBox = function() {
  var ttlBoxElement = "";
  ttlBoxElement += '<div class="ttlBox_Bookseries">';
  return ttlBoxElement;
};
Bookseries.prototype.parseDataToHtml = function(itemDataHash) {
  if (
    thisBookseries.pageType == "pc_detail" ||
    thisBookseries.pageType == "sp_detail"
  ) {
    var contents = itemDataHash.contents;
    for (var i = 0; i < contents.length; i++) {
      thisBookseries.templateItemList(contents[i]);
      if (i == contents.length - 1) {
        thisBookseries.templateDetail(contents[i]);
      }
    }
  } else if (
    thisBookseries.pageType == "pc_search" ||
    thisBookseries.pageType == "sp_search"
  ) {
    var contents = itemDataHash.contents;
    for (var i = 0; i < contents.length; i++) {
      thisBookseries.templateItemList(contents[i]);
    }
  } else if (
    thisBookseries.pageType == "pc_ranking" ||
    thisBookseries.pageType == "sp_ranking"
  ) {
    for (var i = 0; i < itemDataHash.length; i++) {
      thisBookseries.templateItemList(itemDataHash[i]);
    }
  }
};
Bookseries.prototype.templateDetail = function(itemDataHash) {
  thisBookseries.templateLabel(itemDataHash);
  var leadTxt = thisBookseries.adjustText(itemDataHash.detail, 50);
  $(".js_lead_detail_book").text(leadTxt);
};
Bookseries.prototype.templateLabel = function(itemDataHash) {
  thisBookseries.tempLabel += '<div class="status">';
  /*
    "icon_list": [
        0,NEW
        0,無料
        0,無料試し読み
        0,割引
        0,20%
        0,無料あり
        0,割引あり
        0,無料＆割引あり
        0,完結
        0 app Or Brow
    ],
    */
  if (itemDataHash.display_type == "single") {
    if (itemDataHash.icon_list[0] == 1) {
      thisBookseries.tempLabel += '<span class="cat-free">NEW</span>';
    }
    if (itemDataHash.icon_list[1] == 1 || itemDataHash.icon_list[1] == 2) {
      thisBookseries.tempLabel += '<span class="cat-free">無料</span>';
    }
    if (itemDataHash.icon_list[2] == 1) {
      thisBookseries.tempLabel += '<span class="cat-free">無料試し読み</span>';
    }
    if (itemDataHash.icon_list[3] == 1) {
      thisBookseries.tempLabel += '<span class="cat-free">割引</span>';
    }
    if (itemDataHash.icon_list[4] == 1) {
      thisBookseries.tempLabel +=
        '<span class="cat-discount"><span>20%</span><span>OFF</span></span>';
    }
    if (itemDataHash.icon_list[8] == 1) {
      thisBookseries.tempLabel += '<span class="cat-end">完結</span>';
    }
  } else if (itemDataHash.display_type == "series") {
    if (itemDataHash.icon_list[0] == 1) {
      thisBookseries.tempLabel += '<span class="cat-free">NEW</span>';
    }
    if (itemDataHash.icon_list[5] == 1) {
      thisBookseries.tempLabel += '<span class="cat-free">無料あり</span>';
    }
    if (itemDataHash.icon_list[6] == 1) {
      thisBookseries.tempLabel += '<span class="cat-free">割引あり</span>';
    }
    if (itemDataHash.icon_list[7] == 1) {
      thisBookseries.tempLabel +=
        '<span class="cat-free">無料＆割引あり</span>';
    }
    if (itemDataHash.icon_list[8] == 1) {
      thisBookseries.tempLabel += '<span class="cat-end">完結</span>';
    }
  }
  thisBookseries.tempLabel += "</div>";
};
Bookseries.prototype.templateItemList = function(
  itemDataHash,
  display_type,
  seriesName
) {
  var reviewFlag = false;
  var itemList = "<li>";
  //if (thisBookseries.device != 'pc') {
  thisBookseries.templateLabel(itemDataHash);
  itemList += thisBookseries.tempLabel;
  thisBookseries.tempLabel = "";
  //};
  //bookThumPhoto
  itemList += '<span class="bookThumPhoto">';
  if (itemDataHash.icon_list[1] == 1) {
    itemList +=
      '<a href="/test/pre_bookrenewal/html/browseViewer.html?' +
      itemDataHash.item +
      '">';
  } else if (itemDataHash.icon_list[1] == 2) {
    itemList +=
      '<a href="/test/pre_bookrenewal/html/appViewer.html?' +
      itemDataHash.item +
      '">';
  } else {
    itemList += '<a href="' + itemDataHash.detail_url + '"class="photo">';
  }
  itemList +=
    '<img src="' +
    thisBookseries.alterImgSize(itemDataHash.thumbnail, "biggest") +
    '" alt="' +
    itemDataHash.item_name +
    '">';
  itemList += "</a>";
  itemList += "</span>"; //bookThumPhoto END

  //bookThumData
  itemList += '<span class="bookThumData">';
  /*   
        if (thisBookseries.device == 'pc') {
            thisBookseries.templateLabel(itemDataHash);
            itemList += thisBookseries.tempLabel;
            thisBookseries.tempLabel = '';
        }
    */

  if (
    thisBookseries.pageType == "pc_ranking" ||
    thisBookseries.pageType == "sp_ranking"
  ) {
    if (1 <= itemDataHash.rank && itemDataHash.rank <= 3) {
      itemList +=
        '<div class="rank"><img src="/test/pre_bookrenewal/img/common/icon_rank0' +
        itemDataHash.rank +
        '.gif"><span>' +
        itemDataHash.rank +
        "位</span></div>";
    } else {
      //itemList += '<div class="rank"><img src="/test/pre_bookrenewal/img/icon_ranki00.gif"><span>' + itemDataHash.rank + '位</span></div>';
      itemList +=
        '<div class="rank"><span>' + itemDataHash.rank + "位</span></div>";
    }
  }

  if (itemDataHash.display_type == "series") {
    itemList +=
      "<a href=\"javascript:searchEbookCommodity('','" +
      itemDataHash.title_name +
      "','')\" class=\"name\">";
    itemList += "<span>" + itemDataHash.title_name + "</span>";
    itemList += "</a>";
  } else {
    if (itemDataHash.icon_list[1] == 1) {
      itemList +=
        '<a href="/test/pre_bookrenewal/html/browseViewer.html?' +
        itemDataHash.item +
        '" class="name">';
    } else if (itemDataHash.icon_list[1] == 2) {
      itemList +=
        '<a href="/test/pre_bookrenewal/html/appViewer.html?' +
        itemDataHash.item +
        '" class="name">';
    } else {
      itemList +=
        '<a href="https://testbook.hikaritv.net/book/content/book-store/9000109354/" class="name">';
    }
    itemList += "<span>" + itemDataHash.item_name + "</span>";
    itemList += "</a>";
  }
  var autherForFunc = "'','" + itemDataHash.author + "',''";
  var publisher = "'','','" + itemDataHash.publisher + "',";
  if (thisBookseries.pageType != "sp_detail") {
    itemList += '<span class="authorSet">';
    itemList +=
      '<a href="javascript:searchEbookCommodity(' +
      autherForFunc +
      ') ">' +
      itemDataHash.author +
      "</a>";
    if (
      thisBookseries.pageType == "pc_ranking" ||
      thisBookseries.pageType == "pc_search"
    ) {
      itemList +=
        '<a href="javascript:searchEbookCommodity(' +
        publisher +
        ')">' +
        itemDataHash.publisher +
        "</a>";
      itemList += '<span class="genre">ビジネス・実用等 &gt;';
      itemList +=
        '<a href="https://book.hikaritv.net/book/app/catalog/search/init?searchCategoryCode=bk142" onmousedown="this.href += \' & amp; pageSize = 15\'">' +
        itemDataHash.genre_name +
        "</a>";
      itemList += "</span>";
    }
    itemList += "</span>";
  }
  if (
    thisBookseries.pageType == "pc_search" ||
    thisBookseries.pageType == "sp_search" ||
    thisBookseries.pageType == "pc_ranking" ||
    thisBookseries.pageType == "sp_ranking"
  ) {
    itemList += '<div class="linkToSeries">';
    itemList +=
      '<a href="/test/pre_bookrenewal/pc_search_series.html?' +
      itemDataHash.series_id +
      '">「' +
      itemDataHash.series_name +
      "」シリーズへ</a>";
    itemList += "</div>";
  }
  if (
    thisBookseries.pageType == "pc_detail" ||
    thisBookseries.pageType == "sp_detail"
  ) {
    if (itemDataHash.now_price < itemDataHash.unit_price) {
      itemList += '<div class="priceGroup_book">';
      itemList += '<table class="table_priceAndPoint">';
      itemList += "<tbody>";
      itemList +=
        '<tr><th>価格</th><td>：</td><td class="price breakThrough"><span>' +
        itemDataHash.unit_price +
        '</span><span>円</span><span class="unit">（税込）</span></td></tr>';
      itemList += "<tr>";
      itemList +=
        '<th>キャンペーン価格</th><td>：</td><td class="price highLight"><span>' +
        itemDataHash.now_price +
        '</span><span>円</span><span class="unit">（税込）</span></td>';
      itemList += "</tr>";
      itemList += "</tbody>";
      itemList += "</table>";
      itemList += "</div>";
    } else {
      itemList += '<div class="priceGroup_book">';
      itemList += '<table class="table_priceAndPoint">';
      itemList += "<tbody>";
      itemList +=
        '<tr><th>価格</th><td>：</td><td class="price"><span>' +
        itemDataHash.unit_price +
        '</span><span>円</span><span class="unit">（税込）</span></td></tr>';
      itemList += "</tbody>";
      itemList += "</table>";
      itemList += "</div>";
    }
  } else if (thisBookseries.pageType == "pc_search") {
    if (itemDataHash.display_type == "single") {
      itemList += '<div class="priceGroup_book">';
      itemList += '<table class="table_priceAndPoint">';
      itemList += "<tbody>";
      itemList +=
        '<tr><td class="highLight2"><span>' +
        itemDataHash.unit_price +
        '</span><span>円</span><span class="unit">（税込）</span></td></tr>';
      itemList += "</tbody>";
      itemList += "</table>";
      itemList += "</div>";
    } else if (itemDataHash.display_type == "series") {
      itemList += '<div class="priceGroup_book">';
      itemList += '<table class="table_priceAndPoint">';
      itemList += "<tbody>";
      itemList +=
        '<tr><td class="highLight2"><span>' +
        itemDataHash.now_price +
        " ～ " +
        itemDataHash.unit_price +
        '</span><span>円</span><span class="unit">（税込）</span></td></tr>';
      itemList += "</tbody>";
      itemList += "</table>";
      itemList += "</div>";
    }
  } else if (thisBookseries.pageType == "pc_ranking") {
    if (itemDataHash.now_price < itemDataHash.unit_price) {
      itemList += '<div class="priceGroup_book">';
      itemList += '<table class="table_priceAndPoint">';
      itemList += "<tbody>";
      itemList +=
        '<tr><td class="highLight2"><span>' +
        itemDataHash.now_price +
        " ～ " +
        itemDataHash.unit_price +
        '</span><span>円</span><span class="unit">（税込）</span></td></tr>';
      itemList += "</tbody>";
      itemList += "</table>";
      itemList += "</div>";
    } else {
      itemList += '<div class="priceGroup_book">';
      itemList += '<table class="table_priceAndPoint">';
      itemList += "<tbody>";
      itemList +=
        '<tr><td class="highLight2"><span>' +
        itemDataHash.unit_price +
        '</span><span>円</span><span class="unit">（税込）</span></td></tr>';
      itemList += "</tbody>";
      itemList += "</table>";
      itemList += "</div>";
    }
  }
  if (
    itemDataHash.point_magnification > 1 &&
    (itemDataHash.sales_date == "" || itemDataHash.sales_date == undefined)
  ) {
    if (itemDataHash.display_type == "series") {
      itemList +=
        '<div class="btn point">ポイント' +
        itemDataHash.point_magnification +
        "倍あり</div>";
    } else if (itemDataHash.display_type == "single") {
      itemList +=
        '<div class="btn point">ポイント' +
        itemDataHash.point_magnification +
        "倍</div>";
    }
  } else {
    if (itemDataHash.sales_date) {
      itemList +=
        '<span class="releaseDate">' +
        itemDataHash.sales_date +
        " 発売予定</span>";
    } else {
      itemList +=
        '<span class="releaseDate" style="visibility:hidden;"></span>';
    }
  }
  if (reviewFlag) {
    itemList += '<dl class="reviewRate">';
    itemList += '<dt class="rateStatus rateStatus0"></dt>';
    itemList +=
      '<dd class="rateNum"><a href="http://lab-www.hikaritv.net/search/book/request/00/review/Ym9vay85MDAwMTA5MzU0/">0</a></dd>';
    itemList += '<dd class="rateTotal"><span>(0)</span></dd>';
    itemList +=
      '<dd class="reviewNum"><a href="http://lab-www.hikaritv.net/search/book/request/00/review/Ym9vay85MDAwMTA5MzU0/">0件</a></dd>';
    itemList += "</dl>";
  }
  itemList += "</span>"; //bookThumData END
  if (thisBookseries.device == "pc") {
    itemList +=
      '<span class="bookThumComment"><h2>作品内容</h2>' +
      itemDataHash.detail +
      "</span>";
  }
  //bookThumTool
  itemList += '<span class="bookThumTool">';
  itemList += '<ul class="js_cartButtonBox nav">';
  var pageType;
  var pageNum;
  if (
    thisBookseries.pageType == "pc_detail" ||
    thisBookseries.pageType == "sp_detail"
  ) {
    pageType = "";
    pageNum = 1;
  } else {
    pageType = "search";
    pageNum = 2;
  }

  if (itemDataHash.display_type == "single") {
    if (itemDataHash.icon_list[1] == 0) {
      if (itemDataHash.sales_date) {
        itemList += '<li class="bookReserveListBtn">';
        itemList += '<a href="javascript:void(0);" class="on">';
        itemList += "<span>予約する</span>";
        itemList += "</a>";
        itemList +=
          '<span class="addMsg">book-store_' + itemDataHash.item + "</span>";
        itemList += '<span class="addMsg">予約しました!</span>';
        itemList += "</li>";
      } else {
        itemList += '<li class="bookCartListBtn">';
        itemList += '<a href="javascript:void(0);" class="on">';
        itemList += "<span>カートに入れる</span>";
        itemList += "</a>";
        itemList +=
          '<span class="addMsg">book-store_' + itemDataHash.item + "</span>";
        itemList += '<span class="addMsg">カートに入れました!</span>';
        itemList += "</li>";
      }
      itemList += '<li class="bookWishListBtn">';
      itemList += '<a href="javascript:void(0);" class="on wish_list_servlet">';
      itemList += "<span>ほしい物リストへ</span>";
      itemList += "</a>";
      itemList +=
        '<span class="addMsg">book-store_' +
        itemDataHash.item +
        "_" +
        pageNum +
        "_" +
        pageType +
        "</span>";
      itemList += '<span class="addMsg">リストに入れました！</span>';
      itemList += "</li>";
      if (!itemDataHash.sales_date && thisBookseries.device == "pc") {
        if (itemDataHash.icon_list[9] == 0) {
          itemList += '<li class="bookReadTrialBtnBrowser">';
          itemList +=
            '<a href="https://book.hikaritv.net/browser_viewer/sample/index.html#cid=BT000012354205005001900206&amp;pid=pbrgargt&amp;title=%EF%BC%A7%EF%BC%A9%EF%BC%A1%EF%BC%AE%EF%BC%B4%E3%80%80%EF%BC%AB%EF%BC%A9%EF%BC%AC%EF%BC%AC%EF%BC%A9%EF%BC%AE%EF%BC%A7%EF%BC%88%EF%BC%95%EF%BC%90%EF%BC%89&amp;url=https%3A%2F%2Fbook.hikaritv.net%2Fbook%2Fcontent%2Fbook-store%2F9000720290">';
          itemList += "<span>【無料サンプル】<br>ブラウザ試し読み(bw)</span>";
          itemList += "</a>";
          itemList += "</li>";
        } else if (itemDataHash.icon_list[9] == 1) {
          itemList += '<li class="bookReadTrialBtnBrowser">';
          itemList +=
            '<a href="https://book.hikaritv.net/browser_viewer/sample/index.html#cid=BT000012354205005001900206&amp;pid=pbrgargt&amp;title=%EF%BC%A7%EF%BC%A9%EF%BC%A1%EF%BC%AE%EF%BC%B4%E3%80%80%EF%BC%AB%EF%BC%A9%EF%BC%AC%EF%BC%AC%EF%BC%A9%EF%BC%AE%EF%BC%A7%EF%BC%88%EF%BC%95%EF%BC%90%EF%BC%89&amp;url=https%3A%2F%2Fbook.hikaritv.net%2Fbook%2Fcontent%2Fbook-store%2F9000720290">';
          itemList += "<span>【無料サンプル】<br>ブラウザ試し読み(ap)</span>";
          itemList += "</a>";
          itemList += "</li>";
        }
      }
    } else if (itemDataHash.icon_list[1] == 1) {
      itemList += '<li class="bookReadTrialBtn">';
      itemList += '<a href="/test/pre_bookrenewal/html/browseViewer.html">';
      itemList += "<span>無料で読む</span>";
      itemList += "</a>";
      itemList += "</li>";
    } else if (itemDataHash.icon_list[1] == 2) {
      itemList += '<li class="bookReadTrialBtn">';
      itemList += '<a href="/test/pre_bookrenewal/html/appViewer.html">';
      itemList += "<span>無料で読む(ap)</span>";
      itemList += "</a>";
      itemList += "</li>";
    }
  } else if (itemDataHash.display_type == "series") {
    if (itemDataHash.sales_date) {
      itemList += '<li class="bookReserveListBtnNew">';
      itemList += '<a href="javascript:void(0);" class="on">';
      itemList += "<span>最新刊を<br>予約する</span>";
      itemList += "</a>";
      itemList +=
        '<span class="addMsg">book-store_' + itemDataHash.item + "</span>";
      itemList += '<span class="addMsg">予約しました!</span>';
      itemList += "</li>";
    } else {
      itemList += '<li class="bookCartListBtnNew">';
      itemList += '<a href="javascript:void(0);" class="on">';
      itemList += "<span>最新刊を<br>カートに入れる</span>";
      itemList += "</a>";
      itemList +=
        '<span class="addMsg">book-store_' + itemDataHash.item + "</span>";
      itemList += '<span class="addMsg">カートに入れました!</span>';
      itemList += "</li>";
    }

    itemList += '<li class="bookWishListBtnNew">';
    itemList += '<a href="javascript:void(0);" class="on wish_list_servlet">';
    itemList += "<span>最新刊を<br>ほしい物リストへ</span>";
    itemList += "</a>";
    itemList +=
      '<span class="addMsg">book-store_' +
      itemDataHash.item +
      "_" +
      pageNum +
      "_" +
      pageType +
      "</span>";
    itemList += '<span class="addMsg">リストに入れました！</span>';
    itemList += "</li>";
    if (!itemDataHash.sales_date && thisBookseries.device == "pc") {
      if (itemDataHash.icon_list[9] == 0) {
        itemList += '<li class="bookReadTrialBtnBrowserNew">';
        itemList +=
          '<a href="https://book.hikaritv.net/browser_viewer/sample/index.html#cid=BT000012354205005001900206&amp;pid=pbrgargt&amp;title=%EF%BC%A7%EF%BC%A9%EF%BC%A1%EF%BC%AE%EF%BC%B4%E3%80%80%EF%BC%AB%EF%BC%A9%EF%BC%AC%EF%BC%AC%EF%BC%A9%EF%BC%AE%EF%BC%A7%EF%BC%88%EF%BC%95%EF%BC%90%EF%BC%89&amp;url=https%3A%2F%2Fbook.hikaritv.net%2Fbook%2Fcontent%2Fbook-store%2F9000720290">';
        itemList +=
          '<span>【無料サンプル】<br class="pc_none">最新刊を<br>ブラウザ試し読み(bw)</span>';
        itemList += "</a>";
        itemList += "</li>";
      } else if (itemDataHash.icon_list[9] == 1) {
        itemList += '<li class="bookReadTrialBtnBrowserNew">';
        itemList +=
          '<a href="https://book.hikaritv.net/browser_viewer/sample/index.html#cid=BT000012354205005001900206&amp;pid=pbrgargt&amp;title=%EF%BC%A7%EF%BC%A9%EF%BC%A1%EF%BC%AE%EF%BC%B4%E3%80%80%EF%BC%AB%EF%BC%A9%EF%BC%AC%EF%BC%AC%EF%BC%A9%EF%BC%AE%EF%BC%A7%EF%BC%88%EF%BC%95%EF%BC%90%EF%BC%89&amp;url=https%3A%2F%2Fbook.hikaritv.net%2Fbook%2Fcontent%2Fbook-store%2F9000720290">';
        itemList +=
          '<span>【無料サンプル】<br class="pc_none">最新刊を<br>ブラウザ試し読み(ap)</span>';
        itemList += "</a>";
        itemList += "</li>";
      }
    }
  }
  itemList += "</ul>";
  itemList += "</span>"; //bookThumTool END

  itemList += "</li>";

  $(".bookThum").append(itemList);
  itemList = "";
  //}
};
Bookseries.prototype.btnAction = function() {
  $(".dummyLog").on("click", function(e) {
    //dummy
    if (thisBookseries.login == 0) {
      $(".bookAllBuyBtn .exArea > a:nth-of-type(1)").hide();
      $(".bookAllBuyBtn .exArea > a:nth-of-type(2)").show();
      thisBookseries.login = 1;
    } else if (thisBookseries.login == 1) {
      $(".bookAllBuyBtn .exArea > a:nth-of-type(2)").hide();
      $(".bookAllBuyBtn .exArea > a:nth-of-type(1)").show();
      thisBookseries.login = 0;
    }
  });
  $(document).on("click", ".js_readNext_book", function() {
    thisBookseries.readNextButton("click", $(this));
  });
  $(document).on(
    "click",
    ".list_ranking_controller_sub >li, .list_ranking_controller_main > li",
    function() {
      var thisButton = $(this);
      if (!thisButton.hasClass("checked")) {
        thisButton.addClass("checked");
        thisButton.siblings().removeClass("checked");
      }
    }
  );
  $(document).on("click", ".js_display_style >span", function() {
    var wrapObject = $(".listBookArticle > div");
    var thisButton = $(this);
    thisButton.siblings().removeClass("checked");
    if (!thisButton.hasClass("checked")) {
      thisButton.addClass("checked");
    }
    wrapObject.removeClass();
    if (thisButton.hasClass("js_displayLarge")) {
      wrapObject.addClass("display_listLarge_book");
      thisBookseries.separateElementOut("js_displayLarge");
    } else if (thisButton.hasClass("js_displayDetail")) {
      wrapObject.addClass("display_listDetail_book");
      thisBookseries.separateElementOut("js_displayDetail");
    }
  });
  $(document).on("click", ".js_menu_opener", function() {
    var thisCheckbox = $(this).find(".js_subMenuOpener");
    var nowClass = $(this).attr("class");
    var sib;
    if (nowClass.indexOf("2") != -1) {
      sib = $(this).siblings("ul");
    } else {
      sib = $(this).siblings("div");
    }
    var sibOpen = sib.css("display");
    if (sibOpen == "none") {
      sib.show();
    } else {
      sib.hide();
    }
    if (!thisCheckbox.hasClass("checked")) {
      thisCheckbox.addClass("checked");
    } else {
      thisCheckbox.removeClass("checked");
    }
  });
  $(document).on("click", ".js_filterMoreButton", function() {
    $("#list").submit();
  });
  $(document).on("click", ".js_filterResetButton", function() {
    $(".nav_filter_book input").prop("checked", false);
  });
  if (thisBookseries.device == "pc") {
    $(document).on(
      "click",
      ".hierarchy_1 input, .hierarchy_2 input",
      function() {
        thisBookseries.inputStyle("click", $(this));
      }
    );
  } else {
    $(document).on("click", ".js_filterButton", function() {
      var filterBox = $(".js_nav_filterBox_book");
      var filOpen = filterBox.css("display");
      if (filOpen == "none") {
        filterBox.show();
        $(".js_filter_open_book").hide();
        $(".js_filter_close_book").show();
      } else {
        filterBox.hide();
        $(".js_filter_open_book").show();
        $(".js_filter_close_book").hide();
      }
    });
  }
  $(document).on("click", ".js_searchNavSwitcher > li", function() {
    if ($(this).hasClass("year")) {
      $(".js_rankController_sub").css({
        display: "none",
      });
      $(".js_rankController_year").css({
        display: "block",
      });
    } else {
      $(".js_rankController_sub").css({
        display: "block",
      });
      $(".js_rankController_year").css({
        display: "none",
      });
    }
  });
};
Bookseries.prototype.adjustText = function(leadTxt, textNum) {
  //var leadTxt = textObject.text();
  var leadNum = leadTxt.length;
  if (leadNum > 0) {
    if (leadNum >= textNum) {
      leadTxt = leadTxt.substr(0, textNum - 1);
      leadTxt += "...";
    }
  } else {
    textObject.remove();
  }
  return leadTxt;
};
Bookseries.prototype.readNextButton = function(actionType, targetObject) {
  var thisButton = targetObject;
  var target = thisButton.parent("p");
  if (actionType == "load") {
    if (thisBookseries.pageType == "sp_detail") {
      thisBookseries.itemExplain_txt_book = targetObject.text();
      thisBookseries.itemExplain_txt100_book = thisBookseries.adjustText(
        thisBookseries.itemExplain_txt_book,
        100
      );
      targetObject.text(thisBookseries.itemExplain_txt100_book);
    } else {
      target.css({
        overflow: "hidden",
        height: "75px",
      });
      thisButton.css({
        background: "rgba(255, 255, 255, 0.7)",
      });
    }
  } else if (actionType == "click") {
    var itemExplain_txt_book = target.find(".js_itemExplain_txt_book");
    var thisStatus = target.hasClass("checked");
    if (thisStatus) {
      if (thisBookseries.pageType == "sp_detail") {
        itemExplain_txt_book.text(thisBookseries.itemExplain_txt_book);
      } else {
        target.css({
          overflow: "visible",
          height: "auto",
        });
        thisButton.css({
          background: "none",
        });
      }
      thisButton.text("- 戻す");
      target.removeClass("checked");
    } else {
      if (thisBookseries.pageType == "sp_detail") {
        itemExplain_txt_book.text(thisBookseries.itemExplain_txt100_book);
      } else {
        target.css({
          overflow: "hidden",
          height: "75px",
        });
        thisButton.css({
          background: "rgba(255, 255, 255, 0.7)",
        });
      }
      thisButton.text("+ 続きを読む");
      target.addClass("checked");
    }
  }
};
Bookseries.prototype.inputStyle = function(status, inputObject) {
  if (status == "load") {
    $(".hierarchy_1 input, .hierarchy_2 input").css({
      appearance: "none",
      "-webkit-appearance": "none",
    });
  } else if (status == "click") {
    if (inputObject.prop("checked")) {
      inputObject.siblings("label").addClass("checked");
      inputObject.css({
        background:
          "url(/test/pre_bookrenewal/img/navChecked_pc_book.png) no-repeat center center",
        "background-size": "12px",
      });
    } else {
      inputObject.siblings("label").removeClass("checked");
      inputObject.css({
        background: "#ffffff",
        "background-size": "12px",
      });
    }
  }
};
Bookseries.prototype.loadAction = function() {
  /*dummy start*/
  if (thisBookseries.login == 0) {
    $(".bookAllBuyBtn .exArea > a:nth-of-type(1)").hide();
    $(".bookAllBuyBtn .exArea > a:nth-of-type(2)").show();
    thisBookseries.login = 1;
  } else if (thisBookseries.login == 1) {
    $(".bookAllBuyBtn .exArea > a:nth-of-type(2)").hide();
    $(".bookAllBuyBtn .exArea > a:nth-of-type(1)").show();
    thisBookseries.login = 0;
  }
  /*dummy end*/
  if (thisBookseries.pageType == "sp_search") {
    $(".js_nav_filterBox_book").css({
      display: "none",
    });
  }
  if (thisBookseries.pageType == "pc_detail") {
    thisBookseries.readNextButton("load", $(".js_readNext_book"));
  } else if (thisBookseries.pageType == "sp_detail") {
    thisBookseries.readNextButton("load", $(".js_itemExplain_txt_book"));
  }
  thisBookseries.series_id = $("input[name=series_id]").val();
  if (
    thisBookseries.pageType == "pc_detail" ||
    thisBookseries.pageType == "sp_detail"
  ) {
    var url = "/test/pre_bookrenewal/js/dummy/series/detailDummy.json";
    thisBookseries.callAjax(url, thisBookseries.parseDataToHtml);
  } else if (
    thisBookseries.pageType == "pc_search" ||
    thisBookseries.pageType == "sp_search"
  ) {
    var url = "/test/pre_bookrenewal/js/dummy/series/searchDummy.json";
    thisBookseries.callAjax(url, thisBookseries.parseDataToHtml);
  } else if (
    thisBookseries.pageType == "pc_ranking" ||
    thisBookseries.pageType == "sp_ranking"
  ) {
    var url = "/test/pre_bookrenewal/js/dummy/series/rankDummy.json";
    thisBookseries.callAjax(url, thisBookseries.parseDataToHtml);
  }
  thisBookseries.inputStyle("load");
  setTimeout(function() {
    thisBookseries.separateElementOut("js_displayDetail");
  }, 500);
};
Bookseries.prototype.init = function() {
  console.log("Bookseries init");
  thisBookseries.uaJudge();
  thisBookseries.judgePageType();
  $(document).ready(function() {
    thisBookseries.loadAction();
    thisBookseries.btnAction();
  });
};
var bookseries = new Bookseries();
bookseries.init();
