var thisBookRenewalCommon;
var BookRenewalCommon = function() {
  thisBookRenewalCommon = this;
  this.ua = window.navigator.userAgent.toLowerCase();
  this.device = "";
  this.hostName = "https://testshop.hikaritv.net/";
  this.displayWidth = 0;
  this.displayHeight = 0;
  this.Bottom = 0;
  this.cookieExpire = 19; //Cookie保持期限
  this.query = location.search;
  this.pathname = location.pathname;
  this.element = "";
  this.pageType;
  this.tempCookieName;
  this.activeSelect;
};
BookRenewalCommon.prototype = {
  uaJudge: function() {
    if (
      thisBookRenewalCommon.ua.indexOf("iphone") !== -1 ||
      thisBookRenewalCommon.ua.indexOf("ipod") !== -1 ||
      thisBookRenewalCommon.ua.indexOf("ipad") !== -1
    ) {
      thisBookRenewalCommon.device = "iphone";
    } else if (thisBookRenewalCommon.ua.indexOf("android") !== -1) {
      thisBookRenewalCommon.device = "android";
    } else if (
      thisBookRenewalCommon.ua.indexOf("windows") !== -1 &&
      thisBookRenewalCommon.ua.indexOf("phone") !== -1
    ) {
      thisBookRenewalCommon.device = "windows_phone";
    } else {
      thisBookRenewalCommon.device = "pc";
    }
  },
  judgePageType: function() {},
  getWindowParam: function() {
    thisBookRenewalCommon.displayWidth = $(window).innerWidth();
    thisBookRenewalCommon.displayHeight = $(window).innerHeight();
    thisBookRenewalCommon.Bottom = thisBookRenewalCommon.displayHeight;
  },
  leaderThree: function() {
    $(".leader3").each(function() {
      var bookRenewalCommonTarget = $(this);
      var html = bookRenewalCommonTarget.html();
      var bookRenewalCommonTtlClone = bookRenewalCommonTarget.clone();
      bookRenewalCommonTtlClone
        .css({
          display: "none",
          position: "absolute",
          "background-color": "red",
          overflow: "visible",
        })
        .width(bookRenewalCommonTarget.width())
        .height("auto");
      bookRenewalCommonTarget.after(bookRenewalCommonTtlClone);
      if (
        bookRenewalCommonTtlClone.height() > bookRenewalCommonTarget.height()
      ) {
        while (
          html.length > 0 &&
          bookRenewalCommonTtlClone.height() > bookRenewalCommonTarget.height()
        ) {
          html = html.substr(0, html.length - 1);
          bookRenewalCommonTtlClone.html(html + "...");
        }
        bookRenewalCommonTarget.html(bookRenewalCommonTtlClone.html());
        bookRenewalCommonTtlClone.remove();
      }
    });
  },
  lazyLoader: function(itemObject, nextPosition, eventType) {
    thisBookRenewalCommon.getWindowParam();
    var thisImgObj;
    var thisLeft;
    var thisTop;
    var thisSrc;
    var doneLz;
    if (eventType == "click") {
      thisImgObj = $(itemObject).find("img");
      thisLeft = nextPosition;
      thisTop = thisImgObj.offset().top - $(window).scrollTop();
      thisSrc = thisImgObj.data("src");
      doneLz = thisImgObj.hasClass("js_lzDone");
      lazyAction(thisImgObj, doneLz);
    } else {
      $(".plala_slider img").each(function(index, thisImgObj) {
        thisImgObj = $(thisImgObj);
        thisTop = thisImgObj.offset().top - $(window).scrollTop();
        thisLeft = thisImgObj.offset().left - $(window).scrollLeft();
        thisSrc = thisImgObj.data("src");
        doneLz = thisImgObj.hasClass("js_lzDone");
        lazyAction(thisImgObj, doneLz);
      });
    }
    function lazyAction(thisImgObj, doneLz) {
      if (doneLz) {
        return;
      } else {
        if (
          0 <= thisTop &&
          thisTop <= thisBookRenewalCommon.displayHeight &&
          0 <= thisLeft &&
          thisLeft <= thisBookRenewalCommon.displayWidth
        ) {
          if (thisSrc) {
            thisImgObj.attr("src", thisSrc);
            thisImgObj.data("src", "");
            thisImgObj.addClass("js_lzDone");
          } else {
            return;
          }
        }
      }
    }
  },
  alterImgSize: function(link, want) {
    var replacedLink = "";
    if (want == "biggest") {
      if (link.indexOf("_m") != -1) {
        replacedLink = link.replace("_m", "_k");
      } else if (link.indexOf("_t") != -1) {
        replacedLink = link.replace("_t", "_k");
      } else {
        replacedLink = link;
      }
    }
    return replacedLink;
  },
  templateLabel: function(itemDataHash, bat) {},
  parseUrl: function() {
    var queryString = thisBookRenewalCommon.query.replace("?", "");
    var tempArray = queryString.split("&");
    var idHash = {};
    for (var i = 0; i < tempArray.length; i++) {
      var arrayForHash = tempArray[i].split("=");
      idHash[arrayForHash[0]] = arrayForHash[1];
    }
    thisBookRenewalCommon.userID = idHash.id;
    thisBookRenewalCommon.orderHistoryBeanDummyURL =
      "/test/pre_bookrenewal/js/dummy/orderHistoryBean" +
      thisBookRenewalCommon.userID +
      ".json";
    thisBookRenewalCommon.seriesId = idHash.seriesId;
  },
  callAjax: function(url, callback, arg) {
    $.ajax({
      scriptCharset: "utf-8",
      type: "GET",
      cache: true,
      url: url,
      dataType: "json",
      timeout: 10000,
      success: function(data) {
        callback(data, arg);
      },
      error: function(xhr, textStatus, errorThrown) {
        console.log("NG because : " + textStatus.responseText);
      },
      complete: function(itemData) {},
    });
  },
  cookieAction: function(type, cookieName, value) {
    var cookieValue;
    var cookieName;
    if (type == "set") {
      var cookiePath = location.pathname;
      var dirs = new Array();
      dirs = cookiePath.split("/");
      if (dirs[dirs.length - 1] !== "") {
        dirs[dirs.length - 1] = "";
        cookiePath = dirs.join("/");
      }
      var dtExTime = new Date().getTime();
      var dtClTime = new Date(
        dtExTime + 60 * 60 * 24 * 1000 * thisBookRenewalCommon.cookieExpire
      );
      var strExDate = dtClTime.toUTCString();
      var strCookie = "";
      var cookieData = String(value).trim();
      strCookie += cookieName + "=" + cookieData;
      strCookie += "; path=" + cookiePath;
      if (thisBookRenewalCommon.cookieExpire) {
        strCookie += "; expires=" + strExDate + "; ";
      } else {
        strCookie += "; ";
      }
      document.cookie = strCookie;
    } else if (type == "get") {
      var cookies = document.cookie;
      var intStart = "";
      var intEnd = "";
      intStart = cookies.indexOf(cookieName);
      if (intStart != -1) {
        intStart = intStart + cookieName.length + 1;
        intEnd = document.cookie.indexOf(";", intStart);
        if (intEnd == -1) {
          intEnd = cookies.length;
        }
        cookieValue = cookies.substring(intStart, intEnd);
        if (cookieValue == "") {
          cookieValue == undefined;
        } else {
          cookieValue = cookieValue.trim();
          cookieValue = Number(cookieValue);
        }
      }
    }
    return cookieValue;
  },
  btnAction: function() {},
  loadAction: function() {},
  init: function() {
    console.log("BookRenewalCommon init");
  },
};
