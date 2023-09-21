
//ver9.0
var thisClass;
var rankingNavigation = function () {
    thisClass = this;
};
rankingNavigation.prototype = {
    rankNavPositionArray: [],
    rankNavWidthArray: [],
    serverType: null,
    pageGenre: null,
    genreData: {
        "all": {
            "genreNo": ["000", "001", "101", "007", "005", "003", "002", "006", "004"],
            "term": 'hourly',
            "displayNumber": 5,
            "navTtl": [
                "総合(全ジャンル)",
                "本",
                "電子書籍",
                "雑誌",
                "洋書",
                "DVD・ブルーレイ",
                "CD",
                "ゲーム",
                "PCソフト・周辺機器"
            ]
        }
        ,
        "book": {
            "genreNo": ["001", "001001", "001019", "001004", "001003", "001010"],
            "term": 'hourly',
            "displayNumber": 5,
            "navTtl": [
                "総合（本）",
                "漫画（コミック）",
                "文庫",
                "小説・エッセイ",
                "絵本・児童書・図鑑",
                "美容・暮らし・健康・料理",
            ]
        }
        ,
        "magazine": {
            "genreNo": ["007", "007606", "007608", "007626", "007616"],
            "term": 'hourly',
            "displayNumber": 5,
            "navTtl": [
                "総合（雑誌）",
                "女性誌",
                "生活・健康",
                "付録付き雑誌",
                "幼児・児童・絵本",
            ]
        }
        ,
        "fbook": {
            "genreNo": ["005", "005407", "005401", "005404", "005402"],
            "term": 'hourly',
            "displayNumber": 5,
            "navTtl": [
                "総合（洋書）",
                "Books for kids（児童書）",
                "Art & Entertainment（芸術＆エンターテインメント）",
                "Family life & Comics（生活＆コミック）",
                "Fiction & Literature（小説＆文芸）"
            ]
        }
        ,
        "dvd": {
            "genreNo": ["003", "003207", "003201", "003202", "003206"],
            "term": 'hourly',
            "displayNumber": 5,
            "navTtl": [
                "総合（DVD・ブルーレイ）",
                "ミュージック・ライブ映像",
                "洋画",
                "邦画",
                "アニメ"
            ]
        }
        ,
        "cd": {
            "genreNo": ["002", "002101", "002102", "002108", "002114"],
            "term": 'hourly',
            "displayNumber": 5,
            "navTtl": [
                "総合（CD）",
                "J-POP",
                "ロック・ポップス",
                "アニメ",
                "キッズ・ファミリー"
            ]
        }
        ,
        "game": {
            "genreNo": ["006", "006514", "006508", "006513", "006510"],
            "term": 'hourly',
            "displayNumber": 5,
            "navTtl": [
                "総合（ゲーム）",
                "Nintendo Switch",
                "ニンテンドー3DS",
                "PS4",
                "おもちゃ"
            ]
        }
        ,
        "software": {
            "genreNo": ["004", "004321", "004319", "004320", "004322"],
            "term": 'hourly',
            "displayNumber": 5,
            "navTtl": [
                "総合（PCソフト・周辺機器）",
                "タブレット・ノート",
                "PCソフト",
                "Kobo（電子書籍）",
                "マウス・キーボード"
            ]

        }
    },
    rankContentsHeightFlag: false,
    rankContentsHeight: 275,
    rankStock: {
        "action": 'stockArray',
        "genre": null,
        "term": 'hourly',
        "number": 5
    },
    urlJudge: function () {
        var uri = window.location.href;
        if (uri.match('/book/')) {
            thisClass.pageGenre = 'book';
        } else if (uri.match('/magazine/')) {
            thisClass.pageGenre = 'magazine';
        } else if (uri.match('/foreign-book/')) {
            thisClass.pageGenre = 'fbook';
        } else if (uri.match('/dvd-blu-ray/')) {
            thisClass.pageGenre = 'dvd';
        } else if (uri.match('/game/')) {
            thisClass.pageGenre = 'game';
        } else if (uri.match('/cd/')) {
            thisClass.pageGenre = 'cd';
        } else if (uri.match('/software/')) {
            thisClass.pageGenre = 'software';
        } else {
            thisClass.pageGenre = 'all';
        }
        thisClass.setNavHtml();
    },
    setNavHtml: function () {
        var ul_navRank = jQuery('<ul>').addClass('navRank');
        for (var i = 0; i < thisClass.genreData[thisClass.pageGenre]['navTtl'].length; i++) {
            var li_js_Rank = jQuery('<li>').addClass('js_rank').addClass('js_' + thisClass.genreData[thisClass.pageGenre]['navTtl'][i]).text(thisClass.genreData[thisClass.pageGenre]['navTtl'][i]);
            ul_navRank.append(li_js_Rank);
        }
        jQuery('.rankTabArea').append(ul_navRank);
        thisClass.switchingNavAndPage(0);
    },
    callApi: function (genreNo,navIndex,term, number) {
        jQuery('.rankContents').empty();
        jQuery('.rankSpinner').css({
            'display': 'block'
        });
        var URI = '//api.books.rakuten.co.jp/ranking/1/' + genreNo + '/' + term + '.json?hits=' + number + '&page=1&period=0';
        jQuery.ajax({
            url: URI,
            type: 'GET',
            dataType: 'jsonp',
            timeout: 10000,
            success: function (data) {
                thisClass.setHtml(data, navIndex, genreNo);
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log("NG because : " + textStatus.responseText);
                console.log("The content of the ranking has been deleted in relation to the API.")
                jQuery('.rankBox').remove();
            },
            complete: function (data) { }
        });
    },
    priceFormat: function (fstring) {
        var fstring = fstring.replace(/(\d)(?=(\d{3})+$)/g, '$1,');
        return fstring;
    },
    leaderThree: function () {
        jQuery('.rankData__ttl').css({
            'overflow': 'hidden',
            'height': '2.6rem',
            'line-height': '1.3'
        });
        jQuery('.rankData__ttl').each(function () {
            var rankTarget = jQuery(this);
            var html = rankTarget.html();
            var rankClone = rankTarget.clone();
            rankClone
                .css({
                    'display': 'none',
                    'position': 'absolute',
                    'background-color': 'red',
                    'overflow': 'visible'
                })
                .width(rankTarget.width())
                .height('auto');
            rankTarget.after(rankClone);
            if (rankClone.height() > rankTarget.height()) {
                while ((html.length > 0) && (rankClone.height() > rankTarget.height())) {
                    html = html.substr(0, html.length - 1);
                    rankClone.html(html + '...');
                }
                rankTarget.html(rankClone.html());
                rankClone.remove();
            }
        });
    },
    setHtml: function (data, navIndex, fgenre) {
        for (var i = 0; i < data["data"].length; i++) {
            if (i < 3) {
                var bookImg = jQuery('<img>').attr('src', data['data'][i]['image_url'] + '?fitin=200:200')
                    .attr('alt', data['data'][i]['title']);
                var rankImg__mark = jQuery('<span>').addClass('rankImg__mark')
                    .text(data['data'][i]['rank']);
                if (data['data'][i]['rank'] == '1') {
                    rankImg__mark.addClass('icon_gold');
                } else if (data['data'][i]['rank'] == '2') {
                    rankImg__mark.addClass('icon_silver');
                } else if (data['data'][i]['rank'] == '3') {
                    rankImg__mark.addClass('icon_bronze');
                }
                var rankImg = jQuery('<div>').addClass('rankImg')
                    .append(rankImg__mark)
                    .append(bookImg);
                var rankData__price = jQuery('<dd>').addClass('rankData__price')
                    .text(thisClass.priceFormat(data['data'][i]['price']) + '円(税込)');
                var rankData__auther = jQuery('<dd>').addClass('rankData__auther')
                    .text(data['data'][i]['author']);
                var rankData__ttl = jQuery('<span>').addClass('rankData__ttl')
                    .text(data['data'][i]['title']);
                var rankData__ttl_wrap = jQuery('<dt>').addClass('rankData__ttl_wrap')
                    .append(rankData__ttl);
                var rankData = jQuery('<dl>').addClass('rankData')
                    .append(rankData__ttl_wrap)
                    .append(rankData__auther)
                    .append(rankData__price);
                var rankDataWrap = jQuery('<div>').addClass('rankDataWrap')
                    .append(rankData);
                var rankItem = jQuery('<div>').addClass('rankItem')
                    .append(rankImg)
                    .append(rankDataWrap);
                var rank_link = jQuery('<div>').addClass('js_rankLinkBox').data('link', data['data'][i]['url']).css({
                    'cursor': 'pointer'
                }).append(rankItem);
                if(navIndex==0){
                    rank_link.attr({
                        "onclick": "s.lidTrack('ipn-ranking-" + thisClass.pageGenre + "-0" + data['data'][i]['rank'] + "')"
                    })
                } else{
                    rank_link.attr({
                        "onclick": "s.lidTrack('ipn-ranking-" + fgenre + "-0" + data['data'][i]['rank'] + "')"
                    })
                };                    
            } else {
                var rankImg__mark = jQuery('<span>').addClass('rankImg__mark')
                    .addClass('icon_usuall')
                    .text(data['data'][i]['rank']);
                var rankImg = jQuery('<div>').addClass('rankImg2')
                    .append(rankImg__mark)
                var rankData__autherAndPrice = jQuery('<dd>').addClass('rankData__autherAndPrice')
                rankData__autherAndPrice.html('<span class="innerAuther">' + data['data'][i]['author'] + '</span><span class="innerPrice">' + thisClass.priceFormat(data['data'][i]['price']) + '円(税込)</span>');
                var rankData__ttl = jQuery('<dt>').addClass('rankData__ttl')
                    .text(data['data'][i]['title']);
                var rankData__ttl_wrap = jQuery('<dt>').addClass('rankData__ttl_wrap')
                    .append(rankData__ttl);
                var rankData = jQuery('<dl>').addClass('rankData')
                    .append(rankData__ttl_wrap)
                    .append(rankData__autherAndPrice);
                var rankDataWrap = jQuery('<div>').addClass('rankDataWrap')
                    .append(rankData);
                var rankItem = jQuery('<div>').addClass('rankItem')
                    .addClass('itemUsuall')
                    .append(rankImg)
                    .append(rankDataWrap);
                var rank_link = jQuery('<div>').addClass('js_rankLinkBox').data('link', data['data'][i]['url']).css({
                    'cursor': 'pointer'
                }).append(rankItem);
                if(navIndex==0){
                    rank_link.attr({
                        "onclick": "s.lidTrack('ipn-ranking-" + thisClass.pageGenre + "-0" + data['data'][i]['rank'] + "')"
                    })
                } else {
                    rank_link.attr({
                        "onclick": "s.lidTrack('ipn-ranking-" + fgenre + "-0" + data['data'][i]['rank'] + "')"
                    })
                };    
            }
            jQuery(".rankContents").append(rank_link);
        }
        if(navIndex==0){
            jQuery('.js_rankLinkBtn').attr({
                "onclick": "s.lidTrack('ipn-ranking-" + thisClass.pageGenre + "-all-more')",
                "href": "//books.rakuten.co.jp/ranking/hourly/" + fgenre + "/#!/1"
            });
            jQuery(document).ready(function () {
                thisClass.applyCss();
            });
        }else{
            if(thisClass.pageGenre == 'fbook'){
                jQuery('.js_rankLinkBtn').attr({
                    "onclick": "s.lidTrack('ipn-ranking-" + fgenre + "-all-more')",
                    "href": "//books.rakuten.co.jp/search/dt/g" + fgenre + "/"
                });
            }else{
                jQuery('.js_rankLinkBtn').attr({
                    "onclick": "s.lidTrack('ipn-ranking-" + fgenre + "-all-more')",
                    "href": "//books.rakuten.co.jp/ranking/hourly/" + fgenre + "/#!/1"
                });
            }
            jQuery(document).ready(function () {
                thisClass.applyCss();
            });
        };
    },
    applyCss: function () {
        jQuery('.rankContents').stop().animate({
            opacity: 1
        }, 200, function () {
            jQuery('.rankSpinner').css({
                'display': 'none'
            });
        });
        if (thisClass.rankContentsHeightFlag == true) {
            if(thisClass.rankContentsHeight == 0){
                jQuery(".rankContents").css({
                    'margin-top': '1.2rem',
                    'height': '28rem'
                });
            }else{
                jQuery(".rankContents").css({
                    'margin-top': '1.2rem',
                    'height': thisClass.rankContentsHeight + 'px'
                });
            }
        } else {
            thisClass.rankContentsHeight = jQuery(".rankContents").height();
            jQuery(".rankContents").css({
                'margin-top': '1.2rem',
                'height': '28rem'
            });
            thisClass.rankContentsHeightFlag = true;
        }
        thisClass.leaderThree();
        thisClass.attachEvents();
    },
    setNavWidthPositionArray: function (navIndex) {
        thisClass.rankNavPositionArray = [];
        thisClass.rankNavWidthArray = [];
        var ulLength = 0;
        jQuery('.js_rank').each(function () {
            var thisWidth = jQuery(this).width();
            thisWidth = thisWidth + 20;
            thisClass.rankNavWidthArray.push(thisWidth);
        });
        for (var i = 0; i < thisClass.rankNavWidthArray.length; i++) {
            if (i == 0) {
                thisClass.rankNavPositionArray.push(0);
            } else {
                var t = i - 1;
                ulLength = ulLength + Number(thisClass.rankNavWidthArray[t]) + 0.5;
                thisClass.rankNavPositionArray.push(ulLength);
            }
        }
        jQuery(document).ready(function () {
            thisClass.setNavAttribute(navIndex);
        });
    },
    setNavAttribute: function (navIndex) {
        var activeNavIndex = navIndex + 1;
        var nowActiveNavObj = jQuery("li:nth-of-type(" + activeNavIndex + ")");
        nowActiveNavObj.addClass('pressed');
        jQuery('.navRank').animate({
            scrollLeft: thisClass.rankNavPositionArray[navIndex]
        }, 200);
        if (navIndex == 0) {
            jQuery('.rankLeftNavArrow').css({
                'display': 'none'
            });
            jQuery('.rankrightNavArrow').css({
                'display': 'table'
            });
        } else if (navIndex == thisClass.genreData[thisClass.pageGenre]['navTtl'].length -1) {
            jQuery('.rankLeftNavArrow').css({
                'display': 'table'
            });
            jQuery('.rankrightNavArrow').css({
                'display': 'none'
            });
        } else {
            jQuery('.rankLeftNavArrow').css({
                'display': 'table'
            });
            jQuery('.rankrightNavArrow').css({
                'display': 'table'
            });
        }
        for (var i = 0; i < thisClass.rankNavWidthArray.length; i++) {
            var t = i + 1;
            jQuery('.js_rank:nth-of-type(' + t + ')').css({
                'left': thisClass.rankNavPositionArray[i] + 'px'
            });
        }
    },
    judgeTouchAction: function (fstartX, fendX, fstartY, fendY, fthis) {
        var directionSpeedX = fstartX - fendX;
        var directionSpeedY = fstartY - fendY;
        if (directionSpeedX > 80) {
            thisClass.executePageNavDirection('right');
        } else if (directionSpeedX < -80) {
            thisClass.executePageNavDirection('left');
        } else {
            var thisLink = fthis.data("link");
            if (thisLink) {
                if (Math.abs(directionSpeedY) < 5 && Math.abs(directionSpeedX) < 5) {
                    location.href = thisLink;
                }
            }
        }
    },
    caluCount: function (fcount, faction) {
        if (faction == 'up') {
            fcount++;
            if (fcount > thisClass.genreData[thisClass.pageGenre]['navTtl'].length - 1) {
                fcount = 0;
            }
        } else {
            fcount--;
            if (fcount < 0) {
                fcount = thisClass.genreData[thisClass.pageGenre]['navTtl'].length - 1;
            }
        }
        return fcount;
    },
    executePageNavDirection: function (fdir) {
        var rankNavCount = thisClass.rankStock["genre"];
        if (fdir == "left") {
            var pageNum = thisClass.caluCount(rankNavCount, 'down');
            thisClass.switchingNavAndPage(pageNum);
            thisClass.rankStock["genre"] = pageNum;
        } else if (fdir == "right") {
            var pageNum = thisClass.caluCount(rankNavCount, 'up');
            thisClass.switchingNavAndPage(pageNum);
            thisClass.rankStock["genre"] = pageNum;
        }
    },
    switchingNavAndPage: function (navIndex) {
        jQuery('.rankContents').stop().animate({
            opacity: 0
        }, 200);
        jQuery('.js_rank').removeClass('pressed');
        jQuery(document).ready(function () {
            thisClass.setNavWidthPositionArray(navIndex);
            thisClass.callApi(thisClass.genreData[thisClass.pageGenre]["genreNo"][navIndex],navIndex, thisClass.genreData[thisClass.pageGenre]["term"], thisClass.genreData[thisClass.pageGenre]["displayNumber"]);
            thisClass.removeEvents();
        });
    },
    //ENENTS____________________________________________________________________
    attachEvents: function () {
        var startX, endX, startY, endY;
        var isTouch = ('ontouchstart' in window);
        jQuery(document).on('touchstart mousedown', '.js_rankLinkBox', function (e) {
            e.stopPropagation()
            startX = (isTouch ? event.changedTouches[0].pageX : e.pageX);
            startY = (isTouch ? event.changedTouches[0].pageY : e.pageY);
        });
        jQuery(document).on('touchmove mousemove', '.js_rankLinkBox', function (e) {
            e.stopPropagation()
        });
        jQuery(document).on('touchend mouseup', '.js_rankLinkBox', function (e) {
            e.stopPropagation()
            endX = (isTouch ? event.changedTouches[0].pageX : e.pageX);
            endY = (isTouch ? event.changedTouches[0].pageY : e.pageY);
            var nowTthis = jQuery(this);
            thisClass.judgeTouchAction(startX, endX, startY, endY, nowTthis);
        });
        jQuery('.js_rank').on('click touch', function () {
            var index = jQuery(this).index();
            thisClass.rankStock["genre"] = index; //20170515
            thisClass.switchingNavAndPage(index);
        });
    },
    removeEvents: function () {
        jQuery(document).off('touchend mouseup touchmove mousemove touchstart mousedown', '.js_rankLinkBox');
        jQuery('.js_rank').off('click touch');
    },
    //ACTION____________________________________________________________________
    initial: function () {
        var nowPage = thisClass.rankStock["genre"];
        if (nowPage == null || nowPage == undefined || nowPage == 'undefined' || nowPage == '' ) {
            thisClass.urlJudge();
        } else {
            thisClass.switchingNavAndPage(nowPage);
        }
    }
}
var rank0 = new rankingNavigation();
window.onload = function(){
    rank0.initial();    
};