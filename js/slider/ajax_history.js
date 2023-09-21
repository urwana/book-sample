//before this js.cookie.js and handlebars.js need to be loaded
//all scripts are included in pc_header_shopping.js
var slider_options = {
  //timeoutMs: 60000
}
var thisPlalaSliderHistory;
var PlalaSliderHistory = function () {
  thisPlalaSliderHistory = this;
  this.cookieOptions = {
    keyName: "display_history",    // cookieName
    shop: "shop",                  // shop or book
    maxCount: 20,                  // maxDisplayNumber
    cookieExpires: 7,                  // cookieExpireDay
    cookiePath: "/",                   // cookiePath NG
    cookieDomain: ".hikaritv.net",     // cookieDomain
    timeout: 10000
  };
};
PlalaSliderHistory.prototype = new PlalaSliderEngine(slider_options);
PlalaSliderHistory.prototype.codeHistoryArrayClone = [];
PlalaSliderHistory.prototype.parseHistoryCookie = function () {
  var historyCookie = Cookies.get(thisPlalaSliderHistory.cookieOptions.keyName);
  if (historyCookie != undefined) {
    var itemCodeHistoryArray = [];
    var historyCookieArray = historyCookie.split(",");
    for (var i = 0; i < historyCookieArray.length; i++) {
      if (i == thisPlalaSliderHistory.cookieOptions.maxCount) {
        break;
      }
      var itemHistoryTempArray = historyCookieArray[i].split(":");
      if (itemHistoryTempArray.length >= 2) {
        var itemCodeVar = itemHistoryTempArray[1];
        itemCodeHistoryArray.unshift(itemCodeVar);
      }
    }
    thisPlalaSliderHistory.codeHistoryArrayClone = [].concat(itemCodeHistoryArray);
    var sortedCodeHistory = itemCodeHistoryArray.sort().join(",");
    return sortedCodeHistory;
  } else {
    return "";
  }
};
PlalaSliderHistory.prototype.prepareParameterHash = function (sortedCodeHistory) {
  return {
    "shop": thisPlalaSliderHistory.cookieOptions.shop,
    "item": sortedCodeHistory,
    "limit": thisPlalaSliderHistory.cookieOptions.maxCount,
    "sale_status": "all"
  };
};
PlalaSliderHistory.prototype.historyCookieToUrlParam = function (url) {
  var sortedCodeHistory = thisPlalaSliderHistory.parseHistoryCookie();
  var requestUrl;
  if (sortedCodeHistory === "") {
  } else {
    requestUrl = url + "?" + j$.param(thisPlalaSliderHistory.prepareParameterHash(sortedCodeHistory));
  }
  return requestUrl;
};
PlalaSliderHistory.prototype.multipleSlidersOperateHistory = function () {
  j$('.plala_slider_history').each(function (index, thisObject) {
    thisObject = j$(thisObject);
    thisObject.css({ 'height': '425px' });
    var sliderPosition = thisObject.offset().top;
    var doLazy = sliderPosition < thisPlalaSliderHistory.displayHeight ? false : true;
    // console.log(sliderPosition + ' : ' + thisPlalaSliderHistory.displayHeight + ' : ' + doLazy);
    var lazyItemCount = Math.ceil(thisPlalaSliderHistory.displayWidth / thisPlalaSliderHistory.itemOuterWidth);
    var url = thisObject.data('endpoint');
    var target = thisObject.attr('id');
    var requestUrl = thisPlalaSliderHistory.historyCookieToUrlParam(url);
    thisPlalaSliderHistory.aJaxHistory(thisPlalaSliderHistory.hostName + requestUrl, thisPlalaSliderHistory.options, target, 'json', doLazy, lazyItemCount);
  })
};

PlalaSliderHistory.prototype.aJaxHistory = function (requestUrl, options, target, type, doLazy, lazyItemCount) {
  var codeHistoryArrayClone = thisPlalaSliderHistory.codeHistoryArrayClone;
  /* キャッシュ使用しない */
  j$.ajaxSetup({
    cache: true,
    headers: {
      'pragma': 'no-cache',
      'Cache-Control': 'no-cache',
      'If-Modified-Since': 'Thu, 01 Jun 1970 00:00:00 GMT'
    }
  });
  // エラー発生時処理
  var errorFunction = thisPlalaSliderHistory.errorFunc;
  j$.ajax({
    scriptCharset: 'utf-8',
    type: "GET",
    dataType: 'json',
    url: requestUrl,
    timeout: thisPlalaSliderHistory.cookieOptions.timeout,
    success: function (json) {
      if (json.status !== "00000000") {
        thisPlalaSliderHistory.errorFunction(json.errorstr);
        return;
      } else if (json.contents == undefined) {
        thisPlalaSliderHistory.errorFunction(json.errorstr);
        return;
      } else if (json.contents.length == 0) {
        thisPlalaSliderHistory.errorFunction(json.errorstr);
        return;
      }
      // 結果を閲覧履歴順にソートする
      var sortedHistory = [];         // ソート結果
      var noSaleItemArray = [];  // 非公開商品リスト
      for (var i = 0; i < codeHistoryArrayClone.length; i++) {
        var found = false;    // 結果に存在するか
        for (var j = 0; j < json.contents.length; j++) {
          var content = json.contents[j];
          // 商品コードが一致する物を結果リスト末尾に追加
          if (codeHistoryArrayClone[i] == content.item) {
            sortedHistory.push(content);
            found = true;
            break;
          }
        }
        // レスポンス内に存在しない場合、非公開として保持
        if (!found) {
          noSaleItemArray.push(codeHistoryArrayClone[i]);
        }
      }
      // 一致しない物をCookieから削除(商品が非公開)
      if (noSaleItemArray.length > 0) {
        var historyCookie = Cookies.get(options.keyName);
        // Cookie文字列から一致しない部分の履歴を削除してセットしなおし
        for (var i = 0; i < noSaleItemArray.length; i++) {
          historyCookie = historyCookie.replace(new RegExp("[a-zA-Z0-9\-_\.\+]+:" + noSaleItemArray[i] + ",*", "g"), "");
        }
        // 末尾のカンマを削除
        historyCookie = historyCookie.replace(/,$/g, "");
        // 値をURLエンコードしてセットするコンバータ設定
        var cookies = Cookies.withConverter({
          write: function (value, name) {
            return encodeURIComponent(value);
          }
        });
        cookies.set(options.keyName, historyCookie, { expires: options.cookieExpires, path: options.cookiePath, domain: options.cookieDomain });
      }
      // ソートした結果、一致が無い場合は領域を消去(リクエストした閲覧履歴内のコードと、異なるコードが返却されている)
      if (sortedHistory.length == 0) {
        //errorFunction(options);
        return;
      }
      // ソート結果をjsonデータに上書き
      json.contents = sortedHistory;
      for (i = 0; i < json.contents.length; i++) {
        // 表示件数制御
        if (i >= 20) {
          break;
        }
      }
      thisPlalaSliderHistory.perseDataToHtml(json.contents, target, 'json', doLazy, lazyItemCount);
    }
  });
};
PlalaSliderHistory.prototype.errorFunction = function (errorstr) {
  console.log('ERROR' + errorstr);
};
PlalaSliderHistory.prototype.initHistory = function () {
  console.log('thisPlalaSliderHistory init');
  thisPlalaSliderHistory.uaJudge();
  thisPlalaSliderHistory.getWindowParam();
  j$(document).ready(function () {
    thisPlalaSliderHistory.multipleSlidersOperateHistory();
    /* j$(document).on('click', '.plala_slider_history .nav_plalaSlider', function () {
       thisPlalaSliderHistory.sliderSetting('', j$(this), '', 'click');
     }); */
  });
};
plalaSliderHistory = new PlalaSliderHistory();
plalaSliderHistory.initHistory();
