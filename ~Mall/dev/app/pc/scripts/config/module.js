
/** 初始化 --- 模块初始化
 *    @detail:     模块初始化
 *    @return:     无
 *    @author:    林鹏腾
 *    @date:      2018.05.16
 */
(function(){

    'use strict';

    var Module = {};

    window.app.setModule = function(role, element){

        var jsUtil  =         window.app.getPage('jsUtil');
        var jsData  =         window.app.getPage('jsData');
        var jsModel =         window.app.getPage('jsModel');
        var jsEvent =         window.app.getPage('jsEvent');
        var title   =         window.app.getPage('title');
        var shopId  =         window.app.getPage('shopId');
        var centerId =        window.app.getPage('centerId');
        var isLogin =         window.app.getPage('isLogin');
        var pathUrl =         window.app.getPage('pathUrl');
        var jumpUrl =         window.app.getPage('jumpUrl');
        var pageName =        window.app.getPage('pageName');
        var shopName =        window.app.getPage('shopName');
        var shopAbout =       window.app.getPage('shopAbout');
        var shopHeadImg =     window.app.getPage('shopHeadImg');
        var shopDescribe =    window.app.getPage('shopDescribe');
        var redirect =        window.app.getPage('redirect');
        var itemId =          window.app.getPage('itemId');
        var goodsId =         window.app.getPage('goodsId');
        var pageData =        window.app.getPage('pageData');
        var mainHide =        window.app.getPage('mainHide');
        var isBack =          window.app.getPage('isBack');
        var mode =            window.app.getPage('mode');
        var platUserType =    window.app.getPage('platUserType');
        var loginType =       window.app.getPage('loginType');
        var userType =        window.app.getPage('userType');
        var isHide =          window.app.getPage('isHide');
        var childId =         window.app.getPage('childId');
        var childType =       window.app.getPage('childType');
        var form =            window.app.getPage('form');
        var priceMin =        window.app.getPage('priceMin');
        var priceMax =        window.app.getPage('priceMax');
        var priceAreaMin =    window.app.getPage('priceAreaMin');
        var priceAreaMax =    window.app.getPage('priceAreaMax');
        var sortId =          window.app.getPage('sortId');
        var sortType =        window.app.getPage('sortType');
        var screenType =      window.app.getPage('screenType');
        var numPerPage =      window.app.getPage('numPerPage');
        var currentPage =     window.app.getPage('currentPage');
        var filterCategory =  window.app.getPage('filterCategory');
        var firstCategory =   window.app.getPage('firstCategory');
        var secondCategory =  window.app.getPage('secondCategory');
        var thirdCategory =   window.app.getPage('thirdCategory');
        var categoryName =    window.app.getPage('categoryName');
        var dictName =        window.app.getPage('dictName');
        var entryName =       window.app.getPage('entryName');
        var goodsName =       window.app.getPage('goodsName');
        var upShelves =       window.app.getPage('upShelves');
        var useStorage =      window.app.getPage('useStorage');
        var brandpys =        window.app.getPage('brandpys');
        var category =        window.app.getPage('category');
        var origins =         window.app.getPage('origins');
        var brands =          window.app.getPage('brands');
        var origin =          window.app.getPage('origin');
        var brand =           window.app.getPage('brand');
        var type =            window.app.getPage('type');
        var tag =             window.app.getPage('tag');
        var locationId =      window.app.getPage('locationId');
        var locations =       window.app.getPage('locations');
        var popState =        window.app.getPage('popState');
        var search =          window.app.getPage('search');
        var status =          window.app.getPage('status');
        var sendArr =         [];
        var list =            [];

        if ((/^error-1-\d+$/).test(role)) {
            Module[role] =  new Vue({
                el: element,
                data: {},
                methods: {
                },
                created: function(){
                    $("body").css("background-color", "#f6f7f9");
                },
                mounted: function(){
                    var height = $("#body-center").css("height");
                    $(element).css("height", height);
                }
            });
        }
        if ((/^message-1-\d+$/).test(role)) {
            Module[role] =  new Vue({
                el: element,
                data: {
                    type: "info",
                    language: "zh",
                    content: null,
                    title: null,
                    DOMClick: false,
                    cancelBtn: false,
                    confirmBtn: true,
                    cancelFun: function () {},
                    confirmFun: function () {}
                },
                computed: {
                    returnCancelText: function(){
                        return this.language === 'en'? 'cancel': '取消';
                    },
                    returnConfirmText: function(){
                        return this.language === 'en'? 'confirm': '确认';
                    }
                },
                methods: {
                    refresh: function(options){
                        var that = this;
                        $.each(options, function(key, data){ that[key] = data; });
                    },
                    cancelClick: function() {
                        var that = this;
                        if(typeof that.cancelFun === "function"){
                            that.cancelFun();
                        }
                        $(this.$el).find(".message-1-content").animate(
                            {"opacity": 0},
                            500,
                            function(){
                                that.type = "info";
                                that.language = "zh";
                                that.content = null;
                                that.title = null;
                                that.DOMClick = false;
                                that.cancelBtn = false;
                                that.confirmBtn = true;
                                that.cancelFun = function () {};
                                that.confirmFun = function () {};
                            });
                    },
                    confirmClick: function(){
                        var that = this;
                        if(typeof that.confirmFun === "function"){
                            that.confirmFun();
                        }
                        $(this.$el).find(".message-1-content").animate(
                            {"opacity": 0},
                            500,
                            function(){
                                that.type = "info";
                                that.language = "zh";
                                that.content = null;
                                that.title = null;
                                that.DOMClick = false;
                                that.cancelBtn = false;
                                that.confirmBtn = true;
                                that.cancelFun = function () {};
                                that.confirmFun = function () {};
                            });
                    }
                },
                watch: {
                    content: function(){
                        if(this.content){
                            $(this.$el).find(".message-1-content").stop(true, true);
                            $(this.$el).find(".message-1-content").css({"opacity": 0});
                            $(this.$el).find(".message-1-content").animate({"opacity": 1}, 500);
                        }
                    }
                },
                mounted: function(){
                    var that = this;
                    $(document).on("click", function(ev){
                        var event = ev || window.event;
                        var $node = $(event.target||event.srcElement);
                        if(that.DOMClick && $node.parents((that.$el)).length === 0){
                            if(that.cancelBtn && typeof that.cancelFun === "function"){
                                that.cancelFun();
                            }else if(that.confirmBtn && typeof that.confirmFun === "function"){
                                that.confirmFun();
                            }
                            $(that.$el).find(".message-1-content").animate(
                                {"opacity": 0},
                                500,
                                function(){
                                    that.type = "info";
                                    that.language = "zh";
                                    that.content = null;
                                    that.title = null;
                                    that.DOMClick = false;
                                    that.cancelBtn = false;
                                    that.confirmBtn = true;
                                    that.cancelFun = function () {};
                                    that.confirmFun = function () {};
                                });
                        }
                    })
                }
            });
        }
        if ((/^alertDefault-1-\d+$/).test(role)) {
            Module[role] =  new Vue({
                el: element,
                data: {
                    content: null
                },
                computed: {

                },
                methods: {
                    refresh: function(options){
                        this.evFunc = options.evFunc;
                        this.content = options.content;
                    }
                },
                watch: {
                    content: function(){
                        if(this.content){
                            var that = this;
                            $(element).stop(true, true);
                            $(element).css({"opacity": 0});
                            $(element).animate({"opacity": 1}, 500, function(){
                                setTimeout(function(){
                                    $(element).animate({"opacity": 0}, 1000, function(){
                                        that.content = '';
                                        typeof that.evFunc === 'function' && that.evFunc();
                                        that.evFunc = null;
                                    });
                                }, 1200);
                            });
                        }
                    }
                }
            });
        }
        if ((/^alertDiscount-1-\d+$/).test(role)) {
            var alertDefault = Module['alertDefault-1-1'];
            Module[role] =  new Vue({
                el: element,
                data: {
                    isShow: false,
                    couponId: -1,
                    isBack: isBack
                },
                computed: {

                },
                methods: {
                    refresh: function(data){
                        var that = this;
                        that.isShow = data.isShow;
                    },
                    'cancelBtnClick': function(){
                        this.isBack?
                            window.history.back(-1):
                            window.location.href = "/index.html";
                    },
                    'msgBtnClick': function(e){
                        var ev = e || window.event;
                        var $node = $(ev.currentTarget);
                        var authId = window.localStorage.getItem('authId');
                        var couponId = $node.attr('couponId');
                        jsModel.send('COUPON_RECEIVE', {
                            couponId: couponId,
                            reqHeader: { authentication: authId },
                            userId: window.localStorage.getItem('userId')
                        }).done(function(response){
                            if(response.success){
                                alertDefault.refresh({'content':'领取成功'});
                                window.location.href = '/personal.html?childType=discount';
                            }else{
                                alertDefault.refresh({ 'content': response.errorMsg })
                            }
                        });
                    }
                },
                watch: {

                }
            });
        }
        if ((/^header-1-\d+$/).test(role)) {
            sendArr = [];
            if(isLogin){ sendArr.push("USER_DETAIL_QUERY") }
            if(isLogin){ sendArr.push("ORDER_SHOPPINGCART_COUNT") }
            if(shopId){ sendArr.push("USER_SHOPINFO_QUERY") }
            Module[role] =  new Vue({
                el: element,
                data: {
                    title:      '',
                    isLogin:    isLogin,
                    searchCont: goodsName,
                    shopName:   title,
                    showName:   '',
                    cartCount:  0
                },
                beforeCreate: function(){
                    var that = this;
                    jsModel.send(["PAGE_HEADER1_QUERY_NODE"], [])
                        .done(function(response){
                            that.title = response && response.cont && response.cont[0] && response.cont[0].title || '';
                        });
                    jsModel.send(sendArr, [], true)
                        .done(function(response){
                            var userInfo = {};
                            var shopInfo =  {};
                            var cartCount =  0;
                            if(sendArr.length > 1){
                                userInfo = response && response['USER_DETAIL_QUERY'] || {};
                                shopInfo =  response && response['USER_SHOPINFO_QUERY'] || {};
                                cartCount =  response && response['ORDER_SHOPPINGCART_COUNT'] || 0;
                            } else if (sendArr.length === 1) {
                                isLogin && (userInfo = response && response['USER_DETAIL_QUERY'] || {});
                                shopId  && (shopInfo =  response && response['USER_SHOPINFO_QUERY'] || {});
                                isLogin && (cartCount =  response && response['ORDER_SHOPPINGCART_COUNT'] || 0);
                            }
                            if (cartCount) { that.cartCount = cartCount || 0 }
                            if (shopInfo.name) { that.shopName = title + " --- " + shopInfo.name; }
                            if (userInfo.userDetail && userInfo.userDetail.nickName) { that.showName = userInfo.userDetail.nickName; }
                            else if(userInfo.userDetail && userInfo.userDetail.name) { that.showName = userInfo.userDetail.name; }
                            else if(userInfo.phone) { that.showName = userInfo.phone; }
                        });
                }
            });
            $(element).on("click", ".header-1-content .btn_search", function(){
                var goodsName = $(this).prev().val();
                var defaultName = $(this).prev().attr('placeholder');
                window.location.href = encodeURI("/search.html?goodsName="+(goodsName||defaultName));
            });
            $(element).on("keydown", ".header-1-content .input_search", function(ev){
                var event = ev || window.event;
                var keyCode = event.keyCode || event.which;
                keyCode === 13 && $(element).find('.header-input .btn_search').click();
            });
            $(element).on("click", ".header-1-content .btn_clear, .header-1-top-title a.cancel_out", function(){
                window.localStorage.clear();
                window.location.reload();
            });
        }
        if ((/^header-2-\d+$/).test(role)) {
            sendArr = [];
            if(isLogin){ sendArr.push("USER_DETAIL_QUERY") }
            if(isLogin){ sendArr.push("ORDER_SHOPPINGCART_COUNT") }
            if(shopId){ sendArr.push("USER_SHOPINFO_QUERY") }
            Module[role] =  new Vue({
                el: element,
                data: {
                    title:      '',
                    isLogin:    isLogin,
                    searchCont: goodsName,
                    showName:   title,
                    shopName:   '',
                    cartCount:  0
                },
                beforeCreate: function(){
                    var that = this;
                    jsModel.send(["PAGE_HEADER2_QUERY_NODE"], [])
                        .done(function(response){
                            that.title = response && response.cont && response.cont[0] && response.cont[0].title || '';
                        });
                    jsModel.send(sendArr, [], true)
                        .done(function(response){
                            var userInfo = {};
                            var shopInfo =  {};
                            var cartCount =  0;
                            if(sendArr.length > 1){
                                userInfo = response && response['USER_DETAIL_QUERY'] || {};
                                shopInfo = response && response['USER_SHOPINFO_QUERY'] || {};
                                cartCount = response && response['ORDER_SHOPPINGCART_COUNT'] || 0;
                            } else if (sendArr.length === 1) {
                                isLogin && (userInfo = response && response['USER_DETAIL_QUERY'] || {});
                                shopId  && (shopInfo = response && response['USER_SHOPINFO_QUERY'] || {});
                                isLogin && (cartCount = response && response['ORDER_SHOPPINGCART_COUNT'] || 0);
                            }
                            if (cartCount) { that.cartCount = cartCount || 0 }
                            if (shopInfo.name) { that.shopName = title + " --- " + shopInfo.name; }
                            if (userInfo.userDetail && userInfo.userDetail.nickName) { that.showName = userInfo.userDetail.nickName; }
                            else if(userInfo.userDetail && userInfo.userDetail.name) { that.showName = userInfo.userDetail.name; }
                            else if(userInfo.phone) { that.showName = userInfo.phone; }
                        });
                }
            });
            $(element).on("click", ".header-2-content .btn_search", function(){
                var goodsName = $(this).prev().val();
                var defaultName = $(this).prev().attr('placeholder');
                window.location.href = encodeURI("/search.html?goodsName="+(goodsName||defaultName));
            });
            $(element).on("keydown", ".header-2-content .input_search", function(ev){
                var event = ev || window.event;
                var keyCode = event.keyCode || event.which;
                keyCode === 13 && $(element).find('.header-input .btn_search').click();
            });
            $(element).on("click", ".header-2-content .btn_clear, .header-2-top-title a.cancel_out", function(){
                window.localStorage.clear();
                window.location.reload();
            });
            $(window).on("scroll", function(){  $(window).scrollTop() >= 141? $(element).slideDown(200): $(element).hide(); });
        }
        if ((/^nav-1-\d+$/).test(role)) {
            Module[role] =  new Vue({
                el: element,
                data: {
                    mode: mode,
                    sortId: sortId,
                    timer_ul: null,
                    isLeaveEnd: true,
                    timer_contType: null,
                    contType_mouseLeave: function($element){
                        var that = this;
                        var $contType_ul = $element.find(".contType>ul");
                        var notShow = !$element.find(".contType").hasClass("showed");
                        if(notShow && that.isLeaveEnd){
                            $contType_ul.css("overflow", "hidden");
                            $contType_ul.stop(true, true).animate({ height: "0px" }, 200, function(){
                                $element.find(".contType").removeClass("showing");
                            });
                        }else if(notShow){
                            that.timer_ul = setTimeout(function(){ that.contType_mouseLeave($element); },150);
                        }
                    },
                    ul_mouseLeave: function($element){
                        var that = this;
                        var $contType_ul = $element.find(".contType>ul");
                        var $contType_li = $element.find(".contType>ul>li");
                        var $showContItemList = $contType_li.find(".showContItemList");
                        var $contTypeTitleImg = $contType_li.find(".contTypeTitle > img");
                        var width = parseFloat($showContItemList.css("width"));
                        if(width < 5){
                            that.isLeaveEnd = true;
                            $contType_ul.removeClass("hover");
                            $contType_li.removeClass("hover");
                            $contTypeTitleImg.each(function(){ $(this).attr('src', $(this).attr('src').replace('/on/', '/off/')) });
                            $showContItemList.css("visibility", "hidden");
                        }else{
                            that.isLeaveEnd = false;
                            that.timer_contType = setTimeout(function(){ that.ul_mouseLeave($element); },150);
                        }
                    }
                },
                methods: {
                    getFaName: function(i){
                        var fontArr = ['fa-child','fa-heartbeat','fa-star','fa-home','fa-github-alt'];
                        return fontArr[i%5];
                    },
                    contTypeMouseenter: function(ev){
                        var $Ul = $(ev.currentTarget).find(">ul");
                        $Ul.addClass("showing").stop(true, true);
                        $Ul.css({ height: $Ul.find(">li").length * 50 + 'px', overflow:"visible"});
                    },
                    contTypeMouseleave: function(ev){
                        var that = this;
                        var $element = $(this.$el);
                        this.timer = setTimeout(function(){
                            that.contType_mouseLeave($element);
                        },200);
                    },
                    contTypeUlMouseenter: function(ev){
                        clearTimeout(this.timer_ul);
                        $(ev.currentTarget).addClass("hover");
                    },
                    contTypeUlMouseleave: function(ev){
                        var that = this;
                        var $element = $(this.$el);
                        this.timer=setTimeout(function(){
                            that.ul_mouseLeave($element);
                        },200);
                    },
                    contTypeUlLiMouseenter: function(ev){
                        $(ev.currentTarget).parent().find(">li").removeClass("hover");
                        $(ev.currentTarget).parent().find(">li .showContItemList").css("visibility", "hidden");
                        $(ev.currentTarget).parent().find(">li:not(.hover) .contTypeTitle > img").each(function(){ $(this).attr('src', $(this).attr('src').replace('/on/', '/off/')) });
                        $(ev.currentTarget).addClass("hover");
                        $(ev.currentTarget).find(".showContItemList").css("visibility", "visible");
                        $(ev.currentTarget).find(".contTypeTitle > img").each(function(){ $(this).attr('src', $(this).attr('src').replace('/off/', '/on/')) });
                    },
                    contTypeTitleClick: function(ev){
                        var categoryName = $(ev.currentTarget).find('span').text().trim() || "";
                        var firstCategory  = $(ev.currentTarget).parent().attr("id");
                        window.location.href = encodeURI("/search.html?categoryName="+categoryName+"&firstCategory="+firstCategory);
                    },
                    entryIdClick: function(ev){
                        var entryName = $(ev.currentTarget).text().trim() || "";
                        var dictName = $(ev.currentTarget).parents("li[dictId]").find(".title > span").text().trim() || "";
                        var categoryName = $(ev.currentTarget).parents("li[id]").find(".contTypeTitle>span").text().trim() || "";
                        var thirdCategory = $(ev.currentTarget).attr("entryId");
                        var secondCategory  = $(ev.currentTarget).parents('[dictid]').attr("dictid");
                        var firstCategory  = $(ev.currentTarget).parents('[id]').attr("id");
                        window.location.href = encodeURI("/search.html?categoryName="+categoryName+"&dictName="+dictName+"&entryName="+entryName+"&thirdCategory="+thirdCategory+"&secondCategory="+secondCategory+"&firstCategory="+firstCategory);
                    },
                    titleClick: function(ev){
                        var dictName = $(ev.currentTarget).find("> span").text().trim() || "";
                        var categoryName = $(ev.currentTarget).parents("li[id]").find(".contTypeTitle>span").text().trim() || "";
                        var secondCategory  = $(ev.currentTarget).parent().attr("dictid");
                        var firstCategory  = $(ev.currentTarget).parents('[id]').attr("id");
                        window.location.href = encodeURI("/search.html?categoryName="+categoryName+"&dictName="+dictName+"&secondCategory="+secondCategory+"&firstCategory="+firstCategory);
                    }
                },
                mounted: function(){
                    $(element).on("click", ".nav-1-content .contNav > a", function(e){
                        var oldHref = $(this).attr('href');
                        var sortId = $(this).attr('sortId');
                        jsUtil.path.getParam(oldHref, 'upShelves')
                         ? window.location.href = jsUtil.path.setParam(oldHref, { sortId: sortId,  filterCategory: 'show' })
                         : window.location.href = jsUtil.path.setParam(oldHref, { sortId: sortId });
                        return false;
                    });
                }
            });
        }
        if ((/^banner-1-\d+$/).test(role)) {
            Module[role] =  new Vue({
                el: element,
                data: {
                    length: $(element).find(".banner-bannerImg > a").length,
                    toBanner: function($element, index, nextIndex, bool){
                        var that = this;
                        var $bannerChild = $element.find(".carousel_i:eq(" + index + ")");
                        if(that.length <= 1 || $bannerChild.filter(".isShowed").length!==1){ return }
                        $element.find(".carousel_i:eq(" + index + ")").removeClass("showing isShowed");
                        $element.find(".carousel_i:eq(" + nextIndex + ")").addClass("showing");
                        $element.find("a").fadeOut(500);
                        $element.find("a:eq(" + nextIndex + ")").fadeIn(1500, function(){
                            if(!bool){
                                that.timer = setTimeout(function(){
                                    index = nextIndex;
                                    nextIndex = index+1<that.length? index+1: 0;
                                    that.toBanner($element, index, nextIndex);
                                }, 3500)
                            }
                            $element.find(".carousel_i:eq(" + nextIndex + ")").addClass("isShowed");
                        });
                    },
                    carouselClick: function($element, nextIndex){
                        var that = this;
                        var index = $element.find(".carousel_i.showing").index()*1;
                        that.toBanner($element, index, nextIndex, true);
                    }
                },
                methods: {
                    imgMouseenter: function(){
                        var $element = $(this.$el);
                        clearTimeout(this.timer);
                        $element.find("a").stop(true,true);
                        clearTimeout(this.timer);
                    },
                    imgMouseleave: function(){
                        var that = this;
                        var $element = $(this.$el);
                        var index = $element.find(".carousel_i.showing").index()*1;
                        var nextIndex= index+1<this.length? index+1: 0;
                        that.timer = setTimeout(function(){
                            that.toBanner($element, index, nextIndex);
                        }, 1500);
                    },
                    carouselIClick: function(ev){
                        var $element = $(this.$el);
                        var $node = $(ev.currentTarget);
                        if($(ev.currentTarget).hasClass("showing")){
                            clearTimeout(this.timer);
                            $element.find("a").stop(true, true);
                            clearTimeout(this.timer);
                        }else{
                            clearTimeout(this.timer);
                            $element.find("a").stop(true,true);
                            clearTimeout(this.timer);
                            var nextIndex = $node.index()*1;
                            this.carouselClick($element, nextIndex);
                        }
                    }
                },
                mounted: function(){
                    var that = this;
                    var $element = $(this.$el);
                    var index = 0;
                    var nextIndex= index+1<that.length? index+1: 0;
                    $element.find(".banner-bannerImg > a").hide();
                    $element.find(".banner-bannerImg > a:first-child").show();
                    $element.find(".carousel_i:eq(0)").addClass("isShowed");
                    that.timer = setTimeout(function(){ that.toBanner($element, index, nextIndex); }, 1500);
                }
            });
        }
        if ((/^advertising-1-\d+$/).test(role)) {
            Module[role] =  new Vue({
                el: element
            });
        }
        if ((/^floor-1-\d+$/).test(role)) {
            Module[role] =  new Vue({
                el: element,
                data: {},
                methods: {}
            });
        }
        if ((/^footer-img-1-\d+$/).test(role)) {
            Module[role] =  new Vue({
                el: element,
                data: {}
            });
        }
        if ((/^footer-1-\d+$/).test(role)) {
            Module[role] =  new Vue({
                el: element,
                data: {
                    mainHide: mainHide,
                    siteInfo: jsData.siteInfo,
                    qqHref: "http://wpa.qq.com/msgrd?v=3&uin=" + jsData.siteInfo.qq + "&=qq&menu=yes"
                }
            });
            $(element).on("click", ".footer-1-content .myKf .top", function(){
                $('html').animate({scrollTop:0},600);
            });
        }
        if ((/^sideFixed-1-\d+$/).test(role)) {
            $("[id^='floor-1-']").each(function(){
                var id = "#" + $(this).attr("id");
                var name = $(this).find(".floor-title-left > ul > li:first").text();
                list.push({ name: name,  id: id})
            });

            Module[role] =  new Vue({
                el: element,
                data: {
                    list: list,
                    active_offset: 0,
                    position_offset: 108
                },
                methods: {
                    setElementCSS: function($element){
                        var bodyWidth = $("body").width();
                        var windowHeight = window.innerHeight;
                        var thisHeight = $element.height();
                        var width = (bodyWidth-1340)/2;
                        var height = (windowHeight-thisHeight)/2;
                        height = height>150? height: 150;
                        this.active_offset = height;
                        if(bodyWidth>=1300){
                            $element.css({
                                "display": "block",
                                "position": "fixed",
                                "top": height+"px",
                                "left": width+"px"
                            });
                        }else{
                            $element.css({
                                "display":"none"
                            });
                        }
                    }
                },
                mounted: function(){
                    var that = this;
                    that.setElementCSS($(that.$el));
                    window.onresize = function temp() {
                        that.setElementCSS($(that.$el));
                    };
                    $('body').scrollMonitor({
                        active_offset: that.active_offset,
                        position_offset: that.position_offset
                    });
                }
            });
        }
        if ((/^goodsDetail-1-\d+$/).test(role)) {
            var header1 = Module['header-1-1'];
            var header2 = Module['header-2-1'];
            var message = Module['message-1-1'];
            var alertDefault = Module['alertDefault-1-1'];
            jsModel.send('GOODS_ID_QUERY_NODE', { goodsId: goodsId })
                .done(function(dataObj) {
                    Module[role] =  new Vue({
                        el: element,
                        data: {
                            pathUrl: pathUrl,
                            isFreePost: null,
                            status: null,
                            stock: 0,
                            quantity: 1,
                            minQuantity: 0,
                            maxQuantity: Infinity,
                            spcExciseTax: 0,
                            spcIncrementTax: 0,
                            spcCarton: '',
                            spcPrice: "0.00",
                            spcVipPrice: "0.00",
                            spcRealPrice: "0.00",
                            spcRealVipPrice: "0.00",
                            itemContCode: "itemHide",
                            quantityTimer: null,
                            quantityDes: "",
                            couponList: [],
                            advertData: [],
                            objArr: [],
                            mdData: dataObj && dataObj.cont || {}
                        },
                        computed: {

                        },
                        methods: {
                            getItemObj: function(classify){
                                var that = this;
                                var regex;
                                var index = 0;
                                var regexArr = [];
                                var activeObj = {};
                                var codeArr = that.codeArr;
                                var itemCont = that.itemCont;
                                var objArr = that.objArr = [];
                                var oItemKey = $.extend(true, {}, that.itemKey);
                                $.each(oItemKey||{}, function(name){
                                    if(!classify[name]){ classify[name] = "[^;]*"; }
                                });
                                $.each(classify||{}, function(name, value){
                                    var k1 = $.inArray(name, codeArr);
                                    k1 !== -1 && (regexArr[k1] = value);
                                });
                                regex = new RegExp('^' + regexArr.join(";") + '$', "");
                                $.each(itemCont, function(name, obj){
                                    if(regex.test(name)){
                                        objArr.push(itemCont[name]);
                                        that.itemContCode = name;
                                        that.itemContTagList = obj.tagList;
                                        that.itemContTag = { preSaleName: obj.preSaleName, preSaleDesc: obj.preSaleDesc };
                                        that.stock = obj.stock>=0? obj.stock: 0;
                                        that.status = obj.status;
                                        index++;
                                    }
                                    $.each(classify, function(n1){
                                        var tempArr = [], tempRegex;
                                        var tempObj = $.extend(true, {}, classify);
                                        $.each(tempObj||{}, function(n2, o2){
                                            var k2 = $.inArray(n2, codeArr);
                                            n1 === n2 && (tempArr[k2] = "[^;]*");
                                            n1 !== n2 && k2 !== -1 && (tempArr[k2] = o2);
                                        });
                                        tempRegex = new RegExp('^' + tempArr.join(";") + '$', "");
                                        if(tempRegex.test(name)) {
                                            $.each(name.split(";"), function (i, n) {
                                                if (n) {
                                                    var cName = that.codeArr[i];
                                                    if(cName === n1){
                                                        activeObj[cName] = activeObj[cName] || [];
                                                        $.inArray(n, activeObj[cName]) === -1 && activeObj[cName].push(n);
                                                    }
                                                }
                                            });
                                        }
                                    });
                                });
                                $.each(activeObj, function(name, keyArr){
                                    $.each(keyArr, function(kIndex, keyName){
                                        var keyIndex = $.inArray(keyName, oItemKey[name]);
                                        if(keyIndex !== -1){ oItemKey[name].splice(keyIndex,1); }
                                    })
                                });
                                if(index !== 1){
                                    that.stock = Infinity;
                                    that.itemContTagList = [];
                                    that.itemContCode = "itemHide";
                                    that.itemContTag = null;
                                }
                                else if(that.status === 0){
                                    that.itemContCode = "downShelf";
                                    alertDefault.refresh({content: "该商品所选规格已下架, 请选择其他规格！"});
                                }
                                else if(that.stock <= 0){
                                    that.itemContCode = "noStock";
                                }
                                that.setItemCont();
                                return oItemKey;
                            },
                            setItemCont: function(){
                                var that = this;
                                var priceArr = [];
                                var vipPriceArr = [];
                                var realPriceArr = [];
                                var realVipPriceArr = [];
                                var minQuantityArr = [];
                                var maxQuantityArr = [];
                                var incrementTaxArr = [];
                                var exciseTaxArr = [];
                                $.each(that.objArr, function(name, obj){
                                    var quantity = that.quantity;
                                    var numRegionObj = that.getNumRegion(obj.priceList);
                                    var minQuantity = numRegionObj.minQuantity;
                                    var maxQuantity = numRegionObj.maxQuantity;
                                    minQuantityArr.push(minQuantity);
                                    maxQuantityArr.push(maxQuantity);
                                    that.minQuantity = minQuantity;
                                    that.maxQuantity = maxQuantity;
                                    if(that.itemContCode !== "itemHide"){
                                        quantity = quantity > maxQuantity? maxQuantity: quantity;
                                        quantity = quantity < minQuantity? minQuantity: quantity;
                                        quantity = quantity > obj.stock? obj.stock: quantity;
                                        quantity = quantity > 0? quantity: 1;
                                        that.spcCarton = obj.carton;
                                        that.quantity = quantity;
                                    }
                                    var priceListObj = that.getPriceList(obj.priceList, quantity);
                                    obj.realVipPrice = priceListObj.realVipPrice;
                                    obj.realPrice = priceListObj.realPrice;
                                    obj.vipPrice = priceListObj.vipPrice;
                                    obj.price = priceListObj.price;
                                    priceArr.push(priceListObj.price);
                                    vipPriceArr.push(priceListObj.vipPrice);
                                    realPriceArr.push(priceListObj.realPrice);
                                    realVipPriceArr.push(priceListObj.realVipPrice);
                                    incrementTaxArr.push(obj.incrementTax);
                                    exciseTaxArr.push(obj.exciseTax);
                                    minQuantityArr.push(minQuantity);
                                    maxQuantityArr.push(maxQuantity);
                                });
                                if(priceArr.length===0){ priceArr[0]=null }
                                if(vipPriceArr.length===0){ priceArr[0]=null }
                                if(realPriceArr.length===0){ priceArr[0]=null }
                                if(realVipPriceArr.length===0){ priceArr[0]=null }
                                if(minQuantityArr.length===0){ minQuantityArr[0]=0 }
                                if(maxQuantityArr.length===0){ maxQuantityArr[0]=Infinity }
                                if(incrementTaxArr.length===0){ incrementTaxArr[0]=0 }
                                if(exciseTaxArr.length===0){ exciseTaxArr[0]=0 }
                                var minQuantity = Math.min.apply(Math, minQuantityArr);
                                var maxQuantity = Math.max.apply(Math, maxQuantityArr);
                                var minExciseTax = Math.min.apply(Math, exciseTaxArr)*100;
                                var maxExciseTax = Math.max.apply(Math, exciseTaxArr)*100;
                                var minIncrementTax = Math.min.apply(Math, incrementTaxArr)*100;
                                var maxIncrementTax = Math.max.apply(Math, incrementTaxArr)*100;
                                var minPrice = Math.min.apply(Math, priceArr);
                                var maxPrice = Math.max.apply(Math, priceArr);
                                var minVipPrice = Math.min.apply(Math, vipPriceArr);
                                var maxVipPrice = Math.max.apply(Math, vipPriceArr);
                                var minRealPrice = Math.min.apply(Math, realPriceArr);
                                var maxRealPrice = Math.max.apply(Math, realPriceArr);
                                var minRealVipPrice = Math.min.apply(Math, realVipPriceArr);
                                var maxRealVipPrice = Math.max.apply(Math, realVipPriceArr);
                                minPrice = (minPrice !== Infinity? minPrice: 0).toFixed(2);
                                maxPrice = (maxPrice !== -Infinity? maxPrice: 0).toFixed(2);
                                minVipPrice = (minVipPrice !== Infinity? minVipPrice: 0).toFixed(2);
                                maxVipPrice = (maxVipPrice !== -Infinity? maxVipPrice: 0).toFixed(2);
                                minRealPrice = (minRealPrice !== Infinity? minRealPrice: 0).toFixed(2);
                                maxRealPrice = (maxRealPrice !== -Infinity? maxRealPrice: 0).toFixed(2);
                                minRealVipPrice = (minRealVipPrice !== Infinity? minRealVipPrice: 0).toFixed(2);
                                maxRealVipPrice = (maxRealVipPrice !== -Infinity? maxRealVipPrice: 0).toFixed(2);
                                that.spcPrice = minPrice === maxPrice? minPrice: minPrice+"~"+maxPrice;
                                that.spcVipPrice = minVipPrice === maxVipPrice? minVipPrice: minVipPrice+"~"+maxVipPrice;
                                that.spcRealPrice = minRealPrice === maxRealPrice? minRealPrice: minRealPrice+"~"+maxRealPrice;
                                that.spcRealVipPrice = minRealVipPrice === maxRealVipPrice? minRealVipPrice: minRealVipPrice+"~"+maxRealVipPrice;
                                that.spcExciseTax = minExciseTax === maxExciseTax? minExciseTax: minExciseTax+"~"+maxExciseTax;
                                that.spcIncrementTax = minIncrementTax === maxIncrementTax? minIncrementTax: minIncrementTax+"~"+maxIncrementTax;
                                if(minQuantity && maxQuantity && minQuantity!==-Infinity && maxQuantity!==Infinity){
                                    that.quantityDes = "当前允许购买量为: "+minQuantity+"~"+maxQuantity;
                                }else if(minQuantity && minQuantity!==-Infinity){
                                    that.quantityDes = "当前最小购买量为: "+minQuantity;
                                }else if(maxQuantity && maxQuantity!==Infinity){
                                    that.quantityDes = "当前最大购买量为: "+maxQuantity;
                                }else{
                                    that.quantityDes = "";
                                }
                            },
                            getNumRegion: function(priceList){
                                var infoObj = {};
                                var infoObj_max = [];
                                var infoObj_min = [];
                                var isExist = false;
                                $.each(priceList, function(name, obj){
                                    var min = obj.min*1? obj.min*1: 0;
                                    var max = obj.max*1? obj.max*1: Infinity;
                                    infoObj_max.push(max);
                                    infoObj_min.push(min);
                                    isExist = true;
                                });
                                if(isExist){
                                    infoObj.minQuantity = Math.min.apply(Math, infoObj_min);
                                    infoObj.maxQuantity = Math.max.apply(Math, infoObj_max);
                                    return infoObj;
                                }else{
                                    return {
                                        minQuantity: 0,
                                        maxQuantity: Infinity
                                    }
                                }
                            },
                            getPriceList: function(priceList, quantity){
                                var prices = {};
                                var infoObj = {};
                                var priceArr = [];
                                var infoObj_max = [];
                                var infoObj_min = [];
                                var infoObj_price = [];
                                var infoObj_vipPrice = [];
                                var infoObj_realPrice = [];
                                var infoObj_realVipPrice = [];
                                var isExist = false;
                                $.each(priceList, function(name, obj){
                                    var min = obj.min? obj.min: 0;
                                    var max = obj.max? obj.max: Infinity;
                                    var price = (obj.price||obj.price===0)? (obj.price*1).toFixed(2): null;
                                    var vipPrice = (obj.vipPrice||obj.vipPrice===0)? (obj.vipPrice*1).toFixed(2): null;
                                    var realPrice = price? (obj.discount? (obj.price*obj.discount/10).toFixed(2): (obj.price*1).toFixed(2)): null;
                                    var realVipPrice = vipPrice? (obj.discount? (obj.vipPrice*obj.discount/10).toFixed(2): (obj.vipPrice*1).toFixed(2)): null;
                                    priceArr.push({
                                        prices: {
                                            price: price,
                                            vipPrice: vipPrice,
                                            realPrice: realPrice,
                                            realVipPrice: realVipPrice
                                        },
                                        min: min,
                                        max: max
                                    });
                                    infoObj_min.push(min);
                                    infoObj_max.push(max);
                                    infoObj_price.push(price);
                                    infoObj_vipPrice.push(vipPrice);
                                    infoObj_realPrice.push(realPrice);
                                    infoObj_realVipPrice.push(realVipPrice);
                                    isExist = true;
                                });
                                if(isExist){
                                    infoObj.min =  Math.min.apply(Math, infoObj_min);
                                    infoObj.max =  Math.max.apply(Math, infoObj_max);
                                    infoObj.minPrice = Math.min.apply(Math, infoObj_price);
                                    infoObj.vipMinPrice =  Math.min.apply(Math, infoObj_vipPrice);
                                    infoObj.realMinPrice =  Math.min.apply(Math, infoObj_realPrice);
                                    infoObj.realVipMinPrice =  Math.min.apply(Math, infoObj_realVipPrice);
                                    infoObj.maxPrice = Math.max.apply(Math, infoObj_price);
                                    infoObj.vipMaxPrice =  Math.max.apply(Math, infoObj_vipPrice);
                                    infoObj.realMaxPrice =  Math.max.apply(Math, infoObj_realPrice);
                                    infoObj.realVipMaxPrice =  Math.max.apply(Math, infoObj_realVipPrice);
                                    if( quantity < infoObj.min){
                                        return {
                                            price: infoObj.maxPrice,
                                            vipPrice: infoObj.vipMaxPrice,
                                            realPrice: infoObj.realMaxPrice,
                                            realVipPrice: infoObj.realVipMaxPrice
                                        }
                                    }
                                    else if(quantity > infoObj.max){
                                        return {
                                            price: infoObj.minPrice,
                                            vipPrice: infoObj.vipMinPrice,
                                            realPrice: infoObj.realMinPrice,
                                            realVipPrice: infoObj.realVipMinPrice
                                        }
                                    }
                                    else{
                                        $.each(priceArr, function(n, o){
                                            if(quantity>=o.min && quantity<=o.max){
                                                prices = {
                                                    price: o.prices.price,
                                                    vipPrice: o.prices.vipPrice,
                                                    realPrice: o.prices.realPrice,
                                                    realVipPrice: o.prices.realVipPrice
                                                };
                                                return false
                                            }
                                        });
                                        return prices;
                                    }
                                }
                                else{
                                    return {
                                        price: null,
                                        vipPrice: null,
                                        realPrice: null,
                                        realVipPrice: null
                                    }
                                }
                            },
                            returnMsg: function(exciseTax, incrementTax){
                                var str = '';
                                var that = this;
                                var freePost = this.mdData.freePost;
                                var freeTax = this.mdData.freeTax;
                                switch(freeTax){
                                    case 0: str += '消费税率：'+(exciseTax||0)+'%，增值税率：'+(incrementTax||0)+'% '; break;
                                    case 1: str += '包税'; break;
                                }
                                switch(freePost){
                                    case 0: str += ''; break;
                                    case 1: str += '包邮'; break;
                                    case 2: str += that.isFreePost? '包邮': '邮费到付'; break;
                                }
                                return str;
                            },
                            returnSupplierName: function(){
                                var returnVal = "";
                                switch(this.mdData.supplierName){
                                    case "天天仓": returnVal = '保税TT仓'; break;
                                    case "粮油仓": returnVal = '保税LY仓'; break;
                                    case "行云仓": returnVal = '保税XY仓'; break;
                                    case "富邦仓": returnVal = '保税FB仓'; break;
                                    default:      returnVal = this.mdData.supplierName;
                                }
                                return returnVal;
                            },
                            returnPrice: function(price){
                                return price*1 > 0? (price*1).toFixed(2): '0.00';
                            },
                            imgSrc: function(type){
                                var result = '';
                                switch(type){
                                    case 0: result = '/images/platform/tag/icon_cross_big.png'; break;
                                    case 2: result = '/images/platform/tag/icon_normal_big.png'; break;
                                }
                                return result;
                            },
                            imgType: function(type){
                                var result = '';
                                switch(type){
                                    case 0: result = true; break;
                                    case 2: result = false; break;
                                }
                                return result;
                            },
                            getTags: function(tag){
                                var tags = [];
                                $.each(tag||[], function(i, o){
                                    switch (o.tagName) {
                                        case '必选': $.inArray('icon_tag1', tags) === -1 && tags.push("icon_tag1"); break;
                                        case '爆款': $.inArray('icon_tag2', tags) === -1 && tags.push("icon_tag2"); break;
                                        case '热销': $.inArray('icon_tag3', tags) === -1 && tags.push("icon_tag3"); break;
                                        case '优选': $.inArray('icon_tag4', tags) === -1 && tags.push("icon_tag4"); break;
                                    }
                                });
                                return tags;
                            },
                            imgGlassMousemove: function(e){
                                var ev = e || window.event;
                                var $node = $(ev.currentTarget);
                                var $parent = $node.parents(".goodsDetail-mainMsg-left");
                                var small = $node.find("#small")[0];
                                var box =  $parent.find("#img_glass")[0];
                                var mask = $parent.find("#mask")[0];
                                var big = $parent.find("#big")[0];
                                var pic=big.children[0];
                                var marginL=box.offsetLeft;
                                var marginT=box.offsetTop;
                                var currentX= e.pageX;
                                var currentY= e.pageY;
                                var x=currentX-marginL-mask.offsetWidth/2;
                                var y=currentY-marginT-mask.offsetHeight/2;
                                if(x<0){x=0;}
                                if(x>small.offsetWidth-mask.offsetWidth){x=small.offsetWidth-mask.offsetWidth}
                                if(y<0){y=0;}
                                if(y>small.offsetHeight-mask.offsetHeight){y=small.offsetHeight-mask.offsetHeight}
                                mask.style.left=x+"px";
                                mask.style.top=y+"px";
                                var relativeX=mask.offsetLeft;
                                var relativeY=mask.offsetTop;
                                if(pic != undefined){
                                    var proporationX=pic.offsetWidth/(small.offsetWidth);
                                    var proporationY=pic.offsetHeight/(small.offsetHeight);
                                    pic.style.marginLeft=-relativeX*proporationX+"px";
                                    pic.style.marginTop=-relativeY*proporationY+"px";
                                }
                            },
                            glassListMouseover: function(e){
                                var ev = e || window.event;
                                var $node = $(ev.currentTarget);
                                var smallImgSrc = $node.find("img").attr("src");
                                var bigNode = $node.parents(".goodsDetail-mainMsg-left").find("#big img");
                                var showNode = $node.parents(".goodsDetail-mainMsg-left").find("#small img:not(.corner_mark)");
                                smallImgSrc && showNode.attr("src", smallImgSrc);
                                smallImgSrc && bigNode.attr("src", smallImgSrc);
                            },
                            smallMouseover: function(e){
                                var ev = e || window.event;
                                var $node = $(ev.currentTarget);
                                var $parent = $node.parents(".goodsDetail-mainMsg-left");
                                if($node.find('img:not(.corner_mark)').attr('data-normal') != 'hide'){
                                    $parent.find("#mask").css("display", "block");
                                    $parent.find("#big").css("display", "block");
                                }
                            },
                            smallMouseout: function(e){
                                var ev = e || window.event;
                                var $node = $(ev.currentTarget);
                                var $parent = $node.parents(".goodsDetail-mainMsg-left");
                                $parent.find("#mask").css("display", "none");
                                $parent.find("#big").css("display", "none");
                            },
                            discountBClick: function(e){
                                var ev = e || window.event;
                                var $node = $(ev.currentTarget);
                                var theDiv = $node.parent();
                                var theAngle = $node.find('span');
                                var newClass = theAngle.attr('data-class');
                                var oldClass = theAngle.attr('class');
                                theDiv.attr('class') == 'active' ? theDiv.removeClass('active') : theDiv.addClass('active');
                                theAngle.attr('class', newClass);
                                theAngle.attr('data-class', oldClass);
                            },
                            discountAClick: function(e){
                                var that = this;
                                var ev = e || window.event;
                                var $node = $(ev.currentTarget);
                                var couponId = $node.attr('couponId');
                                var theIndex = $node.attr('index');
                                if(!$node.hasClass('lose')) {
                                    jsModel.send('COUPON_RECEIVE', { couponId: couponId })
                                        .done(function(response){
                                            if(response.success){
                                                alertDefault.refresh({'content':'领取成功！'});
                                                that.couponList[theIndex].receiveStatus = '1';
                                            }else{
                                                alertDefault.refresh({ 'content': response.errorMsg });
                                            }
                                        });
                                } else if (!isLogin) {
                                    message.refresh({
                                        title: '温馨提示',
                                        content: "您尚未登录，请先登录！",
                                        DOMClick: false,
                                        confirmBtn: true,
                                        confirmFun: function () {
                                            window.location.href = "/login.html?isBack=1";
                                        }
                                    });
                                }
                            },
                            classifyClick: function(e){
                                var that = this;
                                var classify = {};
                                var ev = e || window.event;
                                var $node = $(ev.currentTarget);
                                if(!$node.hasClass('lose')){
                                    var $groups = $node.parents(".classifyGroup");
                                    $node.toggleClass('active').siblings().removeClass('active');
                                    $groups.find(".classify").removeClass('lose');
                                    $groups.find(".classify.active").each(function(){
                                        var data_name = $(this).attr("data-name") || "";
                                        var data_val = $(this).attr("data-val") || "";
                                        classify[data_name] = data_val;
                                    });
                                    $.each(that.getItemObj(classify), function(name, array){
                                        $.each(array, function(index, val){
                                            $groups.find("[data-name='"+name+"'][data-val='"+val+"']").addClass("lose");
                                        });
                                    });
                                }
                                if(that.itemContCode !== "itemHide"){
                                    var itemId = this.objArr[0].itemId;
                                    if (itemId) { jsUtil.url.setParam({itemId: itemId}, 'cover')}
                                    if (itemId) { that.pathUrl = jsUtil.path.setParam(that.pathUrl, {itemId: itemId})}
                                }
                            },
                            inputInput: function(){
                                var that = this;
                                var $element = $(this.$el);
                                var itemCode = $element.find("[itemContCode]").attr("itemContCode");
                                var stock = that.stock || 0;
                                var minQuantity = that.minQuantity;
                                var maxQuantity = that.maxQuantity;
                                var quantity = (/\D/).test(that.quantity)? that.quantity.replace(/\D/g,""): that.quantity;
                                clearTimeout(that.quantityTimer);
                                that.quantityTimer = setTimeout(function(){
                                    quantity = quantity*1 > 0? quantity*1: 1;
                                    if(itemCode!=="itemHide"){
                                        if(stock<=0 || (quantity <= stock && minQuantity && stock < minQuantity)){
                                            alertDefault.refresh({
                                                content: "当前商品库存不足！",
                                                evFunc: function(){
                                                    quantity = (maxQuantity||maxQuantity===0) && quantity > maxQuantity? maxQuantity: quantity;
                                                    quantity = (minQuantity||minQuantity===0) && quantity < minQuantity? minQuantity: quantity;
                                                    quantity = quantity > stock? stock: quantity;
                                                    that.quantity = quantity * 1 > 0? quantity * 1: 1;
                                                    that.setItemCont();
                                                }
                                            });
                                        }
                                        else if(quantity>stock){
                                            alertDefault.refresh({
                                                content:"当前数量大于库存可用量！",
                                                evFunc: function(){
                                                    quantity = (maxQuantity||maxQuantity===0) && quantity > maxQuantity? maxQuantity: quantity;
                                                    quantity = (minQuantity||minQuantity===0) && quantity < minQuantity? minQuantity: quantity;
                                                    quantity = quantity > stock? stock: quantity;
                                                    that.quantity = quantity * 1 > 0? quantity * 1: 1;
                                                    that.setItemCont();
                                                }
                                            });
                                        }
                                        else if(maxQuantity && quantity>maxQuantity){
                                            alertDefault.refresh({
                                                content: "当前数量已大于最大购买量！",
                                                evFunc: function(){
                                                    quantity = (maxQuantity||maxQuantity===0) && quantity > maxQuantity? maxQuantity: quantity;
                                                    quantity = (minQuantity||minQuantity===0) && quantity < minQuantity? minQuantity: quantity;
                                                    quantity = quantity > stock? stock: quantity;
                                                    that.quantity = quantity * 1 > 0? quantity * 1: 1;
                                                    that.setItemCont();
                                                }
                                            })
                                        }
                                        else if(minQuantity && quantity<minQuantity){
                                            alertDefault.refresh({
                                                content: "当前数量已低于最小购买量！",
                                                evFunc: function(){
                                                    quantity = (maxQuantity||maxQuantity===0) && quantity > maxQuantity? maxQuantity: quantity;
                                                    quantity = (minQuantity||minQuantity===0) && quantity < minQuantity? minQuantity: quantity;
                                                    quantity = quantity > stock? stock: quantity;
                                                    that.quantity = quantity * 1 > 0? quantity * 1: 1;
                                                    that.setItemCont();
                                                }
                                            })
                                        }
                                    }
                                }, 650);
                            },
                            inputBlur: function(){
                                var that = this;
                                var $element = $(this.$el);
                                var itemCode = $element.find("[itemContCode]").attr("itemContCode");
                                var stock = that.stock || 0;
                                var minQuantity = that.minQuantity;
                                var maxQuantity = that.maxQuantity;
                                var quantity = (/\D/).test(that.quantity)? that.quantity.replace(/\D/g,""): that.quantity;
                                if(itemCode !== "itemHide"){
                                    quantity = (maxQuantity||maxQuantity===0) && quantity > maxQuantity? maxQuantity: quantity;
                                    quantity = (minQuantity||minQuantity===0) && quantity < minQuantity? minQuantity: quantity;
                                    quantity = quantity > stock? stock: quantity;
                                }
                                that.quantity = quantity * 1 > 0? quantity * 1: 1;
                                that.setItemCont();
                            },
                            quantityClick: function(e){
                                var that = this;
                                var ev = e || window.event;
                                var $element = $(this.$el);
                                var $node = $(ev.currentTarget);
                                var itemCode = $element.find("[itemContCode]").attr("itemContCode");
                                var stock = that.stock || 0;
                                var quantity = that.quantity;
                                var minQuantity = that.minQuantity;
                                var maxQuantity = that.maxQuantity;
                                if($node.hasClass("add")){
                                    quantity = quantity*1 + 1;
                                    quantity = quantity*1 > 0? quantity*1: 1;
                                }
                                if($node.hasClass("minus")){
                                    quantity = quantity*1 - 1;
                                    quantity = quantity*1 > 0? quantity*1: 1;
                                }
                                if(itemCode!=="itemHide"){
                                    if(stock<=0 || (quantity <= stock && minQuantity && stock < minQuantity)){
                                        alertDefault.refresh({ content: "当前商品库存不足！" });
                                    }
                                    else if(quantity>stock){
                                        alertDefault.refresh({ content: "当前数量已达至商品库存量！" });
                                    }
                                    else if(maxQuantity && quantity>maxQuantity){
                                        alertDefault.refresh({ content: "当前数量已是最大购买量！" });
                                    }
                                    else if(minQuantity && quantity<minQuantity){
                                        alertDefault.refresh({ content: "当前数量已是最小购买量！" });
                                    }
                                    quantity = (maxQuantity||maxQuantity===0) && quantity > maxQuantity? maxQuantity: quantity;
                                    quantity = (minQuantity||minQuantity===0) && quantity < minQuantity? minQuantity: quantity;
                                    quantity = quantity > stock? stock: quantity;
                                    that.quantity = quantity*1 > 0? quantity*1: 1;
                                    that.quantity = quantity*1;
                                    that.setItemCont();
                                }
                            },
                            addShopCartClick: function(e){
                                var that = this;
                                var ev = e || window.event;
                                var $element = $(this.$el);
                                var $parent = $(ev.currentTarget).parent();
                                var name = $parent.attr("itemContCode") || "";
                                var itemObj = that.itemCont[name];
                                var stock = that.stock || 0;
                                var quantity = that.quantity;
                                var minQuantity = that.minQuantity;
                                var maxQuantity = that.maxQuantity;
                                if(!isLogin) {
                                    message.refresh({
                                        title:'温馨提示',
                                        content: "您尚未登录，请先登录！",
                                        DOMClick: false,
                                        confirmBtn: true,
                                        confirmFun: function () {
                                            window.location.href = "/login.html?isBack=1";
                                        }
                                    });
                                    return;
                                }
                                if(name === "itemHide"){
                                    alertDefault.refresh({content: "请选择完规格，再进行购买下单！"});
                                    return;
                                }
                                if(name === 'downShelf'){
                                    alertDefault.refresh({content:"该商品所选规格已下架, 无法购买下单！"});
                                    return;
                                }
                                if(stock<=0 || stock < minQuantity){
                                    alertDefault.refresh({content: "当前商品库存不足, 无法购买下单！"});
                                    return;
                                }
                                var createFunc = function(quantity){
                                    var cart = '';
                                    if($element.find('.header-2-content').css('display') === 'block'){
                                        cart = $(header2.$el).find(".header-2-content .header-iconGroup .shopCart")
                                    }else{
                                        cart = $(header1.$el).find(".header-1-content .header-iconGroup .shopCart");
                                    }
                                    var imgtodrag = $(".goodsDetail-mainMsg-left #img_glass #small img");
                                    var imgclone = imgtodrag.clone();
                                    if (imgclone.length) {
                                        imgclone.offset({
                                            top: imgtodrag.offset().top+200,
                                            left: imgtodrag.offset().left+350
                                        }).css({
                                            'opacity': '0.5',
                                            'position': 'absolute',
                                            'height': '150px',
                                            'width': '150px',
                                            'z-index': '99999999'
                                        }).appendTo($('body')).animate({
                                            'top': cart.offset().top + 10,
                                            'left': cart.offset().left + 10,
                                            'width': 50,
                                            'height': 50
                                        }, 1000, 'linear');
                                        imgclone.animate({
                                            'width': 0,
                                            'height': 0
                                        }, function () {
                                            $(this).detach();
                                        });
                                    }
                                    jsModel.send("ORDER_SHOPPINGCART_CREATE", {
                                        type: itemObj.type,
                                        itemId: itemObj.itemId,
                                        supplierId: itemObj.supplierId,
                                        supplierName: itemObj.supplierName,
                                        goodsName: itemObj.goodsName,
                                        goodsImg: itemObj.goodsImg,
                                        quantity: quantity
                                    }).done(function(){
                                        jsModel.send("ORDER_SHOPPINGCART_COUNT",{})
                                            .done(function(response){
                                                header1.cartCount = response && response.obj || 0;
                                                header2.cartCount = response && response.obj || 0;
                                                alertDefault.refresh({content:'添加成功'});
                                            });
                                    });
                                };
                                jsModel.send("ORDER_SHOPPINGCART_COUNT_ID", {itemId: itemObj.itemId})
                                    .done(function(response){
                                        if(response && response.success){
                                            var count = response.obj||0;
                                            if(count>=maxQuantity){
                                                alertDefault.refresh({content: "该商品在购物车中数量已达最大量, 无法继续加入！"});
                                            }else if(quantity + count > maxQuantity){
                                                var newQuantity = maxQuantity - count;
                                                message.refresh({
                                                    title:'购物车数量上限',
                                                    content: "最大量" + maxQuantity + "件; 已添加:" + count + "件, 可添加" + newQuantity +"件! 是否继续？",
                                                    DOMClick: false,
                                                    cancelBtn: true,
                                                    confirmBtn: true,
                                                    cancelFun: function () {},
                                                    confirmFun: function () { createFunc(newQuantity); }
                                                });
                                            }else{
                                                createFunc(quantity);
                                            }
                                        }
                                        else{
                                            alertDefault.refresh({content: "查询购物车内该商品数量失败！"});
                                        }
                                    })
                                    .fail(function(){
                                        alertDefault.refresh({content: "网络信号弱，请刷新重试"});
                                    });
                            },
                            toBuyClick: function(e){
                                var that = this;
                                var ev = e || window.event;
                                var $parent = $(ev.currentTarget).parent();
                                var crossOrderMaxPrice = jsData.platform.rule.crossOrder.maxPrice;
                                var normalOrderMinPrice = jsData.platform.rule.normalOrder.minPrice;
                                var name = $parent.attr("itemContCode") || "";
                                var itemObj = that.itemCont[name] || {};
                                var stock = that.stock || 0;
                                var quantity = that.quantity;
                                var minQuantity = that.minQuantity;
                                var maxQuantity = that.maxQuantity;
                                var ordersInfo = {};
                                var n1 = itemObj.type;
                                var n2 = itemObj.supplierId;
                                var n3 = itemObj.itemId;
                                if(!isLogin){
                                    message.refresh({
                                        title:'温馨提示',
                                        content: "您尚未登录，请先登录！",
                                        DOMClick: false,
                                        confirmBtn: true,
                                        confirmFun: function () {
                                            window.location.href = "/login.html?isBack=1";
                                        }
                                    });
                                    return;
                                }
                                if(name === "itemHide"){
                                    alertDefault.refresh({content: "请选择完规格，再进行购买下单！"});
                                    return;
                                }
                                if(name === 'downShelf'){
                                    alertDefault.refresh({content:"该商品所选规格已下架, 无法购买下单！"});
                                    return;
                                }
                                if(stock<=0 || stock < minQuantity){
                                    alertDefault.refresh({content: "当前商品库存不足, 无法购买下单！"});
                                    return;
                                }
                                ordersInfo.orderCount = 1;
                                ordersInfo.typeObj = ordersInfo.typeObj || {};
                                ordersInfo.typeObj[n1] = ordersInfo.typeObj[n1] || {};
                                ordersInfo.typeObj[n1][n2] = ordersInfo.typeObj[n1][n2] || {};
                                ordersInfo.typeObj[n1][n2].type = n1;
                                ordersInfo.typeObj[n1][n2].taxFee = 0;
                                ordersInfo.typeObj[n1][n2].postFee = 0;
                                ordersInfo.typeObj[n1][n2].exciseTaxFee = 0;
                                ordersInfo.typeObj[n1][n2].incrementTaxFee = 0;
                                ordersInfo.typeObj[n1][n2].supplierId = itemObj.supplierId;
                                ordersInfo.typeObj[n1][n2].supplierName = itemObj.supplierName;
                                ordersInfo.typeObj[n1][n2].supplierWeight = itemObj.weight * quantity;
                                ordersInfo.typeObj[n1][n2].supplierPrice = itemObj.price * quantity;
                                ordersInfo.typeObj[n1][n2].supplierVipPrice = itemObj.vipPrice * quantity;
                                ordersInfo.typeObj[n1][n2].supplierRealPrice = itemObj.realPrice * quantity;
                                ordersInfo.typeObj[n1][n2].supplierRealVipPrice = itemObj.realVipPrice * quantity;
                                ordersInfo.typeObj[n1][n2].itemObj = ordersInfo.typeObj[n1][n2].itemObj||{};
                                ordersInfo.typeObj[n1][n2].itemObj[n3] = {};
                                ordersInfo.typeObj[n1][n2].itemObj[n3].quantity = quantity;
                                ordersInfo.typeObj[n1][n2].itemObj[n3].status = itemObj.status;
                                ordersInfo.typeObj[n1][n2].itemObj[n3].itemId = itemObj.itemId;
                                ordersInfo.typeObj[n1][n2].itemObj[n3].itemCode = itemObj.itemCode;
                                ordersInfo.typeObj[n1][n2].itemObj[n3].supplierId = itemObj.supplierId;
                                ordersInfo.typeObj[n1][n2].itemObj[n3].supplierName = itemObj.supplierName;
                                ordersInfo.typeObj[n1][n2].itemObj[n3].itemImg = itemObj.goodsImg;
                                ordersInfo.typeObj[n1][n2].itemObj[n3].picPath = itemObj.picPath || itemObj.goodsImg;
                                ordersInfo.typeObj[n1][n2].itemObj[n3].goodsId = itemObj.goodsId;
                                ordersInfo.typeObj[n1][n2].itemObj[n3].firstCategory = itemObj.firstCategory;
                                ordersInfo.typeObj[n1][n2].itemObj[n3].type = itemObj.type;
                                ordersInfo.typeObj[n1][n2].itemObj[n3].href = itemObj.href;
                                ordersInfo.typeObj[n1][n2].itemObj[n3].freePost = itemObj.freePost;
                                ordersInfo.typeObj[n1][n2].itemObj[n3].freeTax = itemObj.freeTax;
                                ordersInfo.typeObj[n1][n2].itemObj[n3].secondCategory = itemObj.secondCategory;
                                ordersInfo.typeObj[n1][n2].itemObj[n3].thirdCategory = itemObj.thirdCategory;
                                ordersInfo.typeObj[n1][n2].itemObj[n3].itemName = itemObj.goodsName;
                                ordersInfo.typeObj[n1][n2].itemObj[n3].exciseTax = itemObj.exciseTax;
                                ordersInfo.typeObj[n1][n2].itemObj[n3].priceList = itemObj.priceList;
                                ordersInfo.typeObj[n1][n2].itemObj[n3].tagList = itemObj.tagList;
                                ordersInfo.typeObj[n1][n2].itemObj[n3].tagFunId = itemObj.tagFunId;
                                ordersInfo.typeObj[n1][n2].itemObj[n3].preSaleName = itemObj.preSaleName;
                                ordersInfo.typeObj[n1][n2].itemObj[n3].preSaleDesc = itemObj.preSaleDesc;
                                ordersInfo.typeObj[n1][n2].itemObj[n3].incrementTax = itemObj.incrementTax;
                                ordersInfo.typeObj[n1][n2].itemObj[n3].sku = itemObj.sku;
                                ordersInfo.typeObj[n1][n2].itemObj[n3].info = itemObj.info;
                                ordersInfo.typeObj[n1][n2].itemObj[n3].stock = itemObj.stock>=0? itemObj.stock: 0;
                                ordersInfo.typeObj[n1][n2].itemObj[n3].weight = itemObj.weight;
                                ordersInfo.typeObj[n1][n2].itemObj[n3].price = itemObj.price;
                                ordersInfo.typeObj[n1][n2].itemObj[n3].vipPrice = itemObj.vipPrice;
                                ordersInfo.typeObj[n1][n2].itemObj[n3].realPrice = itemObj.realPrice;
                                ordersInfo.typeObj[n1][n2].itemObj[n3].realVipPrice = itemObj.realVipPrice;
                                if(itemObj.type === 2){
                                    itemObj.realPrice * quantity < normalOrderMinPrice && itemObj.supplierId*1 === 6?
                                        alertDefault.refresh({content: "一般贸易商品订单需满" + normalOrderMinPrice + "元才可下单！"}):
                                        window.location.href = encodeURI("/orderSure.html?jumpUrl=" + that.pathUrl);
                                }else if(itemObj.type === 0){
                                    (itemObj.realPrice * quantity > crossOrderMaxPrice) && quantity > 1?
                                        alertDefault.refresh({content: "跨境商品单笔订单价格不得超过" + crossOrderMaxPrice + "元！"}):
                                        window.location.href = encodeURI("/orderSure.html?jumpUrl=" + that.pathUrl);
                                }
                                window.localStorage.setItem("ordersInfo", JSON.stringify(ordersInfo));
                            }
                        },
                        beforeCreate: function(){
                            var that = this;
                            jsModel.send('GOODS_STOCK_QUERY', {goodsId: goodsId})
                                .done(function(response){
                                    if(response && response.success && response.obj){
                                        $.each(that.itemCont, function(name, obj){
                                            $.each(response.obj, function(id, data){
                                                if(obj.itemId === data.itemId){ obj.stock = data.stock }
                                            })
                                        });
                                        if (itemId) {
                                            that.getItemObj(that.itemIdMap[itemId] || {});
                                        } else {
                                            that.getItemObj({});
                                        }
                                    }
                                });
                            jsModel.send('GOODS_BASE_QUERY', {
                                upShelves: 1,
                                priceMin: 0,
                                priceMax: 100000000,
                                currentPage: 1,
                                numPerPage: 6
                            }, true)
                                .done(function(response) {
                                    var advertList = [];
                                    $.each(response && response.goodsList || [], function(index, data){
                                        var href = data.href;
                                        var title = data.customGoodsName;
                                        var goodsFile = data.goodsFileList && data.goodsFileList[0] || {};
                                        var picPath = goodsFile.path || '/images/platform/default_img.jpg';
                                        var price = data.realPrice;
                                        advertList.push({
                                            title: title,
                                            picPath: picPath,
                                            price: price,
                                            href: href
                                        })
                                    });
                                    that.advertData = advertList;
                                });
                        },
                        beforeMount: function(){
                            if (itemId) {
                                this.getItemObj(this.itemIdMap[itemId] || {});
                            } else {
                                this.getItemObj({});
                            }
                        },
                        created: function(){
                            var that = this;
                            var name = '';
                            var type = '';
                            var length = 0;
                            var codeArr = [];
                            var itemKey = {};
                            var itemCont = {};
                            var itemIdMap = {};
                            $.each(that.mdData.goodsSpecsList, function(index, obj){
                                var tObj = {};
                                var tArr = [];
                                var keyName = "";
                                tObj.info = obj.info;
                                tObj.infoObj = JSON.parse(obj.info||"{}");
                                tObj.type = that.mdData.type;
                                tObj.href = that.mdData.href;
                                tObj.freePost = that.mdData.freePost;
                                tObj.freeTax = that.mdData.freeTax;
                                tObj.goodsId = that.mdData.goodsId;
                                tObj.goodsName = that.mdData.customGoodsName;
                                tObj.firstCategory = that.mdData.firstCategory;
                                tObj.secondCategory = that.mdData.secondCategory;
                                tObj.thirdCategory = that.mdData.thirdCategory;
                                tObj.supplierId = that.mdData.supplierId;
                                tObj.supplierName = that.mdData.supplierName;
                                tObj.itemId = obj.itemId;
                                tObj.carton = obj.carton;
                                tObj.itemCode = obj.itemCode;
                                tObj.status = obj.status;
                                tObj.discount = obj.discount;
                                tObj.minPrice = obj.minPrice;
                                tObj.maxPrice = obj.maxPrice;
                                tObj.vipMinPrice = obj.vipMinPrice;
                                tObj.vipMaxPrice = obj.vipMaxPrice;
                                tObj.realMinPrice = obj.realMinPrice;
                                tObj.realMaxPrice = obj.realMaxPrice;
                                tObj.realVipMinPrice = obj.realVipMinPrice;
                                tObj.realVipMaxPrice = obj.realVipMaxPrice;
                                tObj.incrementTax = that.mdData.incrementTax;
                                tObj.exciseTax = obj.exciseTax;
                                tObj.priceList = obj.priceList;
                                tObj.weight = obj.weight;
                                tObj.stock = obj.stock>0? obj.stock: 0;
                                tObj.sku = obj.sku;
                                tObj.tagList = [];
                                if($.isArray(that.mdData.goodsFileList)){
                                    tObj.goodsImg = that.mdData.goodsFileList[0].path;
                                }
                                $.each(obj.tagList||[], function(i, o){
                                    if (o.tagName === '预售') {
                                        tObj.tagFunId = o.tagFunId;
                                        tObj.preSaleName = o.tagName;
                                        tObj.preSaleDesc = o.description;
                                    }
                                    if (o.tagName === '一般贸易(包邮)') {
                                        that.isFreePost = true;
                                    }
                                    tObj.tagList.push(o);
                                });
                                $.each(tObj.infoObj, function(name, value){
                                    if($.inArray(value, itemKey[name]) === -1){
                                        itemKey[name] = itemKey[name] || [];
                                        keyName = value.replace(";", "");
                                        itemKey[name].push(value.replace(";", ""));
                                    }
                                    if($.inArray(name, codeArr) === -1){
                                        codeArr.push(name);
                                    }
                                    var index = $.inArray(name, codeArr);
                                    tArr[index] = value;
                                });
                                var name = tArr.join(";");
                                itemCont[name] = tObj;
                                itemIdMap[tObj.itemId] = tObj.infoObj;
                                length++;
                            });
                            that.length = length;
                            that.codeArr = codeArr;
                            that.itemKey = itemKey;
                            that.itemCont = itemCont;
                            that.itemIdMap = itemIdMap;
                            $.each(that.mdData.couponList||[],function(index,obj){
                                name = obj.name.split('/')[0];
                                type = obj.name.split('/')[1];
                                type = (type !== undefined ? type.trim() : '');
                                that.couponList[index] = {
                                    type: type, name: name,
                                    couponId: obj.couponId,
                                    receiveStatus: obj.receiveStatus
                                };
                            });
                            if($.isEmptyObject(that.mdData) || that.mdData.status === 0){
                                message.refresh({
                                    type: "info",
                                    language: "zh",
                                    content: "该商品已下架，请重新选择商品！",
                                    title: "商品已下架",
                                    DOMClick: false,
                                    cancelBtn: false,
                                    confirmBtn: true,
                                    confirmFun: function () { window.close(); }
                                })
                            }
                        },
                        mounted: function(){
                            var that = this;
                            var content = jsData.location.redirect;
                            var tContent =  content.replace(jsData.siteInfo.domainName, jsData.siteInfo.mDomainName);
                            var $groups = $(that.$el).find(".classifyGroup");
                            if((/\.html$|\.htm$/i).test(that.mdData.detailPath)){
                                $(that.$el).find('.showMsgContent').load(that.mdData.detailPath);
                            }
                            $(that.$el).find('.showErweima').qrcode({
                                width:164,
                                height:164,
                                correctLevel:0,
                                text: jsUtil.path.setParam(tContent, {shopId: shopId}),
                                render: "canvas"
                            });
                            $.each(itemId && that.itemIdMap[itemId] || [], function(name, val){
                                $groups.find("[data-name='"+name+"'][data-val='"+val+"']").addClass("active");
                            });
                        }
                    });
                });
        }
        if ((/^login-1-\d+$/).test(role)) {
            Module[role] =  new Vue({
                el: element,
                data: {
                    status: true,
                    isRegister: null,
                    isBackEnter: true,
                    shopTimer: null,
                    iShopId: '',
                    iDomain: '',
                    bShopId: '',
                    bDomain: '',
                    shopArr: []
                },
                methods: {
                    authLogin: function(){
                        var that = this;
                        var index = "/index.html";
                        var shopId = that.iShopId || '';
                        var domain = that.iDomain || '';
                        var nowDomain = window.location.host;
                        var alertDefault = Module['alertDefault-1-1'];
                        var jumpDomain =  domain.replace(/^(http:\/\/)?([^\/]+)(\/.+)?/i, '$2');
                        var account = $('.login-list-enter .account').val();
                        var password = $('.login-list-enter .password').val();
                        var isBack = jsUtil.url.getParam("isBack");
                        var isOk = account && password;
                        window.localStorage.removeItem("userId");
                        window.localStorage.removeItem("authId");
                        setTimeout(function(){
                            if(isOk && (/^1(3|4|5|7|8)\d{9}$/gi).test(account) && that.isRegister){
                                jsModel.send('AUTH_LOGIN', {
                                    phone:account,
                                    password:password,
                                    loginType: loginType,
                                    platUserType: platUserType,
                                    reqHeader: { authentication: null }
                                }).done(function(response){
                                    if(response && response.success){
                                        var userId = response.obj.userCenterId;
                                        var authId = '"Bearer "' + response.obj.token;
                                        var domainData = { userId: userId, shopId: shopId, authId: authId };
                                        if (jumpDomain && jumpDomain !== nowDomain) {
                                            jsUtil.url.setParam({ domain: domain }, "cover");
                                            jsUtil.url.setParam({ domainData: JSON.stringify(domainData||{}) }, "cover");
                                            window.localStorage.setItem("domainData", JSON.stringify(domainData||{}));
                                            window.localStorage.setItem("domain", domain);
                                        }
                                        else {
                                            window.localStorage.setItem("authId", authId);
                                            window.localStorage.setItem("userId", userId);
                                            shopId && window.localStorage.setItem("shopId", shopId);
                                        }
                                        if(isBack){
                                            window.history.back(-1);
                                        } else if(jumpUrl){
                                            jsUtil.url.jumpPage(jumpUrl, -1);
                                        } else {
                                            jsUtil.url.jumpPage(index, -1);
                                        }
                                    }else if(response.errorMsg){
                                        alertDefault.content = response.errorMsg;
                                    }else{
                                        alertDefault.content = "帐号密码错误!";
                                    }
                                }).fail(function(){
                                    alertDefault.content = "帐号登陆失败!";
                                });
                            }
                            else if (!account || !(/^1(3|4|5|7|8)\d{9}$/gi).test(account)) {
                                alertDefault.content = "请正确填写手机号!";
                            }
                            else if (!password) {
                                alertDefault.content = "请填写密码!";
                            }
                            else if (!that.isRegister){
                                alertDefault.content = "该手机号尚未注册!";
                            }
                        }, 100);
                    },
                    thirdPhone:function(e){
                        var $this = $(e.currentTarget);
                        var $parent = $this.parents('ul');
                        var phone = $parent.find(".account").val();
                        var alertDefault = Module['alertDefault-1-1'];
                        var isTrue = $parent.find(".account").hasClass('state_error');
                        if((/^1(3|4|5|7|8)\d{9}$/gi).test(phone) && !isTrue){
                            jsModel.send('THIRD_PHONE', {
                                phone:phone
                            }).done(function(response){
                                if(response && response.success){
                                    var time = 60;
                                    var setValidation_timer = function(){
                                        if(time>0){
                                            time--;
                                            $parent.find(".doing .val").text(time);
                                            setTimeout(function(){ setValidation_timer(); }, 1000);
                                        }else{
                                            $this.addClass("getValidation");
                                        }
                                    };
                                    $this.removeClass("getValidation");
                                    setValidation_timer();
                                }else{
                                    alertDefault.content = "验证码发送过于频繁！";
                                }
                            }).fail(function(){
                                alertDefault.content = "抱歉，手机验证码发送失败，请重试！";
                            })
                        }
                    },
                    userRegister:function(){
                        var that = this;
                        var index = "/index.html";
                        var shopId = that.bShopId || '';
                        var domain = that.bDomain || '';
                        var nowDomain = window.location.host;
                        var alertDefault = Module['alertDefault-1-1'];
                        var jumpDomain =  domain.replace(/^(http:\/\/)?([^\/]+)(\/.+)?/i, '$2');
                        var code = $('.login-list-sign .validation').val();
                        var account = $('.login-list-sign .account').val();
                        var password = $('.login-list-sign .password').val();
                        var confirmPassword = $('.login-list-sign .confirmPassword').val();
                        var isBack = jsUtil.url.getParam("isBack");
                        var isOk = account && code && password && password === confirmPassword;
                        window.localStorage.removeItem("authId");
                        window.localStorage.removeItem("userId");
                        setTimeout(function(){
                            if(isOk && (/^1(3|4|5|7|8)\d{9}$/gi).test(account) && !that.isRegister){
                                jsModel.send('USER_REGISTRATION', {
                                    phone:  account,
                                    pwd:    password,
                                    code:   code,
                                    loginType: loginType,
                                    userType: userType
                                }).done(function(response){
                                    if(response && response.success){
                                        var userId = response.obj;
                                        jsModel.send("AUTH_REGISTER", {
                                            phone:         account,
                                            password:      password,
                                            userCenterId:  userId,
                                            loginType:     loginType,
                                            platUserType:  platUserType
                                        }).done(function(response){
                                            if(response && response.success){
                                                var authId = '"Bearer "' + response.obj.token;
                                                var domainData = { userId: userId, shopId: shopId, authId: authId };
                                                if (jumpDomain && jumpDomain !== nowDomain) {
                                                    jsUtil.url.setParam({ domain: domain }, "cover");
                                                    jsUtil.url.setParam({ domainData: JSON.stringify(domainData||{}) }, "cover");
                                                    window.localStorage.setItem("domainData", JSON.stringify(domainData||{}));
                                                    window.localStorage.setItem("domain", domain);
                                                }
                                                else {
                                                    window.localStorage.setItem("authId", authId);
                                                    window.localStorage.setItem("userId", userId);
                                                    shopId && window.localStorage.setItem("shopId", shopId);
                                                }
                                                if(isBack){
                                                    window.history.back(-1);
                                                } else if(jumpUrl){
                                                    jsUtil.url.jumpPage(jumpUrl, -1);
                                                } else {
                                                    jsUtil.url.jumpPage(index, -1);
                                                }
                                            }else{
                                                alertDefault.content = response.errorMsg;
                                            }
                                        }).fail(function(){
                                            alertDefault.content = "认证注册失败";
                                        })
                                    }
                                    else if(response && response.obj === 1){
                                        alertDefault.content = "验证码失效，请重试！";
                                    }
                                    else if(response.errorMsg){
                                        alertDefault.content = response.errorMsg;
                                    }
                                    else{
                                        alertDefault.content = "认证注册失败!";
                                    }
                                }).fail(function(){
                                    alertDefault.content = "用户注册失败!";
                                });
                            }
                            else if (!account || !(/^1(3|4|5|7|8)\d{9}$/gi).test(account)) {
                                alertDefault.content = "请正确填写手机号!";
                            }
                            else if (!code) {
                                alertDefault.content = "请填写验证码!";
                            }
                            else if (!password || password != confirmPassword) {
                                alertDefault.content = "请正确填写密码!";
                            }
                            else if (that.isRegister){
                                alertDefault.content = "该手机号已被注册!";
                            }
                        }, 100);
                    },
                    authCheckEnter:function(e){
                        var that = this;
                        var $this = $(e.currentTarget);
                        var account = $this.val();
                        var isPhone = (/^1(3|4|5|7|8)\d{9}$/gi).test(account);
                        var alertDefault = Module['alertDefault-1-1'];
                        if(isPhone){
                            jsModel.send("AUTH_CHECK", {
                                userName: account,
                                phone: account,
                                loginType: loginType,
                                platUserType: platUserType
                            }).done(function(response){
                                if(response && response.success === true && response.obj == false){
                                    alertDefault.content = "该手机号尚未注册！";
                                    that.isRegister = false;
                                    $this.addClass('state_error');
                                }else{
                                    that.isRegister = true;
                                    $this.removeClass('state_error');
                                }
                            }).fail(function(){
                                that.isRegister = true;
                                alertDefault.refresh({content: "未能查询到该手机号是否已注册！"});
                                $this.removeClass('state_error');
                            })
                        }
                    },
                    authCheckSign:function(e){
                        var that = this;
                        var $this = $(e.currentTarget);
                        var account = $this.val();
                        var isPhone = (/^1(3|4|5|7|8)\d{9}$/gi).test(account);
                        var alertDefault = Module['alertDefault-1-1'];
                        if(isPhone){
                            jsModel.send("AUTH_CHECK", {
                                userName: account,
                                phone: account,
                                loginType: loginType,
                                platUserType: platUserType
                            }).done(function(response){
                                if(response && response.success === true && response.obj == true){
                                    that.isRegister = true;
                                    alertDefault.content = "该手机号已被注册！";
                                    $this.addClass('state_error');
                                }else{
                                    that.isRegister = false;
                                    $this.removeClass('state_error');
                                }
                            }).fail(function(){
                                that.isRegister = false;
                                alertDefault.refresh({content: "未能查询到该手机号是否已注册！"});
                                $this.removeClass('state_error');
                            })
                        }
                    },
                    authCheckForget:function(e){
                        var that = this;
                        var $this = $(e.currentTarget);
                        var account = $this.val();
                        var isPhone = (/^1(3|4|5|7|8)\d{9}$/gi).test(account);
                        var alertDefault = Module['alertDefault-1-1'];
                        if(isPhone){
                            jsModel.send("AUTH_CHECK", {
                                userName: account,
                                phone: account,
                                loginType: loginType,
                                platUserType: platUserType
                            }).done(function(response){
                                if(response && response.success === true && response.obj == false){
                                    that.isRegister = false;
                                    alertDefault.content = "该手机号尚未注册！";
                                    $this.addClass('state_error');
                                }else{
                                    that.isRegister = true;
                                    $this.removeClass('state_error');
                                }
                            }).fail(function(){
                                that.isRegister = true;
                                alertDefault.refresh({content: "未能查询到该手机号是否已注册！"});
                                $this.removeClass('state_error');
                            })
                        }
                    },
                    authPwdChange:function(){
                        var that = this;
                        var alertDefault = Module['alertDefault-1-1'];
                        var account = $('.login-list-forget .account').val();
                        var password = $('.login-list-forget .password').val();
                        var code = $('.login-list-forget .validation').val();
                        var isOk = account && code && password;
                        window.localStorage.removeItem("authId");
                        window.localStorage.removeItem("userId");
                        setTimeout(function(){
                            if(isOk && (/^1(3|4|5|7|8)\d{9}$/gi).test(account) && that.isRegister){
                                jsModel.send("AUTH_PWD_CHANGE", {
                                    userName:  account,
                                    password:  password,
                                    code:      code,
                                    platUserType: platUserType
                                }).done(function(response){
                                    if(response && response.success && response.obj){
                                        setTimeout(function(){
                                            $('.login-list-forget').hide();
                                            $('.login-list-enter').slideDown(500);
                                            that.isBackEnter = true;
                                            that.status = true;
                                        },1000);
                                        alertDefault.content = '修改密码成功!';
                                    }else if(response.errorMsg){
                                        alertDefault.content = response.errorMsg;
                                    }else{
                                        alertDefault.content = "修改密码失败!";
                                    }
                                }).fail(function(){
                                    alertDefault.content = "修改密码失败!";
                                });
                            }
                            else if (!account || !(/^1(3|4|5|7|8)\d{9}$/gi).test(account)) {
                                alertDefault.content = "请正确填写手机号!";
                            }
                            else if (!code) {
                                alertDefault.content = "请填写验证码!";
                            }
                            else if (!password) {
                                alertDefault.content = "请填写密码!";
                            }
                            else if (!that.isRegister){
                                alertDefault.content = "该手机号尚未注册!";
                            }
                        }, 100);
                    },
                    shopQueryBlur:function(e){
                        var that = this;
                        var ev = e || window.event;
                        var shopName = $(ev.currentTarget).val();
                        var alertDefault = Module['alertDefault-1-1'];
                        shopName || (that.bShopId = '');
                        shopName || (that.iShopId = '');
                        shopName || (that.bDomain = '');
                        shopName || (that.iDomain = '');
                        clearTimeout(that.shopTimer);
                        if(shopName){
                            that.shopTimer = setTimeout(function(){
                                jsModel.send("USER_CHOOSESHOP_QUERY", {
                                    name: shopName
                                }).done(function(response){
                                    if(response && response.success){
                                        if ($.isEmptyObject(response.obj)) {
                                            alertDefault.content = "该店铺不存在！";
                                        }
                                        that.shopArr = response.obj || [];
                                    }else if(response && response.errorMsg){
                                        alertDefault.content = response.errorMsg;
                                        that.shopArr = [];
                                    }else{
                                        alertDefault.content = "该店铺不存在！";
                                        that.shopArr = [];
                                    }
                                }).fail(function(response){
                                    if(response && response.errorMsg){
                                        alertDefault.content = response.errorMsg;
                                        that.shopArr = [];
                                    }else{
                                        alertDefault.content = "查询店铺失败！";
                                        that.shopArr = [];
                                    }
                                });
                            }, 250)
                        }
                    },
                    chooseShopQuery:function(e){
                        var that = this;
                        var ev = e || window.event;
                        var shopName = $(ev.currentTarget).val();
                        var alertDefault = Module['alertDefault-1-1'];
                        $(that.$el).find(".shopShow").val(shopName);
                        shopName && $(e.currentTarget).parent().addClass('active');
                        shopName || $(e.currentTarget).parent().removeClass('active');
                        shopName || (that.bShopId = '');
                        shopName || (that.iShopId = '');
                        shopName || (that.bDomain = '');
                        shopName || (that.iDomain = '');
                        clearTimeout(that.shopTimer);
                        if(shopName){
                            that.shopTimer = setTimeout(function(){
                                jsModel.send("USER_CHOOSESHOP_QUERY", {
                                    name: shopName
                                }).done(function(response){
                                    if(response && response.success){
                                        that.shopArr = response.obj || [];
                                    }else if(response && response.errorMsg){
                                        alertDefault.content = response.errorMsg;
                                        that.shopArr = [];
                                    }else{
                                        that.shopArr = [];
                                    }
                                }).fail(function(response){
                                    if(response && response.errorMsg){
                                        alertDefault.content = response.errorMsg;
                                        that.shopArr = [];
                                    }else{
                                        that.shopArr = [];
                                    }
                                });
                            }, 250)
                        }
                    },
                    chooseShopClick:function(e){
                        var that = this;
                        var $this = $(e.currentTarget);
                        var domain = $this.attr('domain') || '';
                        var shopId = $this.attr('shopId') || '';
                        var shopName = $this.attr('shopName') || '';
                        $(that.$el).find(".shopShow").val(shopName);
                        $this.parent().parent().removeClass('active');
                        that.iShopId = shopId? shopId: '';
                        that.iDomain = domain? domain: '';
                        that.bShopId = shopId? shopId: '';
                        that.bDomain = domain? domain: '';
                    }
                },
                mounted: function(){
                    var that = this;
                    $(element).on('click','.login-list-header li:last-child',function(){
                        var $element = $(element);
                        var newHtml = $(this).prev().html();
                        var oldHtml = $(this).html();
                        $(this).html(newHtml);
                        $(this).prev().html(oldHtml);
                        if($element.find('.login-list-enter').css('display') === 'none'){
                            $element.find('.login-list-sign').hide();
                            $element.find('.login-list-enter').stop();
                            $element.find('.login-list-enter').slideDown(500);
                        }else{
                            $element.find('.login-list-enter').hide();
                            $element.find('.login-list-sign').stop();
                            $element.find('.login-list-sign').slideDown(500);
                        }
                    });
                    $(element).on('click','.login-list-enter li:nth-child(5) b',function(){
                        var $element = $(element);
                        $element.find('.login-list-enter').hide();
                        $element.find('.login-list-forget').slideDown(500);
                        that.isBackEnter = false;
                    });
                    $(element).on('click','.login-list-header p span',function(){
                        var $element = $(element);
                        $element.find('.login-list-forget').hide();
                        $element.find('.login-list-enter').slideDown(500);
                        that.isBackEnter = true;
                    });
                    $(element).on('click','.login-1-content .chooseShop',function(){
                        var type = $(this).attr('type');
                        if(type == 0){
                            $('.chooseShopId').slideDown(300);
                            $(this).attr('type',1);
                            $(this).html('取消选择');
                        }else{
                            $('.chooseShopId').slideUp(300);
                            $(this).attr('type',0);
                            $(this).html('选择店铺');
                            window.localStorage.removeItem("shopId");
                        }
                    });
                }
            });
        }
        if ((/^licence-1-\d+$/).test(role)) {
            Module[role] =  new Vue({
                el: element,
                data: {},
                methods: {},
                mounted:function(){}
            });
        }
        if ((/^orderDetail-1-\d+$/).test(role)) {
            Module[role] =  new Vue({
                el: element,
                data: {
                    orderInfo: {},
                    infoArr: [],
                    endTime: ''
                },
                beforeCreate:function(){
                    var that = this;
                    var orderId = jsUtil.url.getParam("orderId");
                    jsModel.send('ORDER_USER_QUERY',{
                        orderId : orderId
                    }).done(function(response){
                        if(response && response.success){
                            that.orderInfo = response.obj.orderList[0] || {};
                            that.returnTime(that.orderInfo.createTime,that.orderInfo.status);
                            var timer = setInterval(function(){
                                that.returnTime(that.orderInfo.createTime,that.orderInfo.status);
                            }, 1000);
                            if(that.orderInfo.status != 0){
                                clearInterval(timer);
                            }
                            $.each(response.obj.orderList[0].orderExpressList,function(k1,o1){
                                if(o1.expressName && o1.expressId){
                                    jsModel.send('THIRD_LOGISTICS',{
                                        carrierName: o1.expressName,
                                        expressId: o1.expressId
                                    }).done(function(response){
                                        if(response && response.success){
                                            that.infoArr.push(response.obj || {});
                                        }
                                    });
                                }
                            });
                        }
                    });
                },
                methods: {
                    returnPayType: function(type){
                        var payType = type === 1? "微信支付": (type === 2? "支付宝": (type === 3? "银联支付": ""));
                        return payType;
                    },
                    ergodicInfoList: function(info){
                        try {
                            return JSON.parse(info) || []
                        } catch(e) {
                            return []
                        }
                    },
                    returnStatus:function(orderInfo){
                        var tState = orderInfo.status;
                        if(tState === 0){ return "等待买家付款"; }
                        if(tState === 1){ return "买家已付款"; }
                        if(tState === 11){ return "买家已付款"; }
                        if(tState === 12){ return "买家已付款"; }
                        if(tState === 2){ return "支付单报关"; }
                        if(tState === 3){ return "已发仓库"; }
                        if(tState === 4){ return "已报海关"; }
                        if(tState === 5){ return "单证放行"; }
                        if(tState === 6){ return "商品已出库"; }
                        if(tState === 7){ return "交易成功"; }
                        if(tState === 8){ return "已退单"; }
                        if(tState === 9){ return "交易关闭"; }
                        if(tState === 21){ return "退款中"; }
                        if(tState === 99){ return orderInfo.orderExpressList[0].status; }
                    },
                    returnTime: function(createTime,status){
                        var newTime = createTime && createTime.substring(0, 19);
                        var timeArr = newTime && newTime.split(/\s|-|:/g);
                        var year = timeArr && timeArr[0];
                        var month = timeArr && timeArr[1]-1;
                        var day = timeArr && timeArr[2];
                        var hour = timeArr && timeArr[3];
                        var minute = timeArr && timeArr[4];
                        var second = timeArr && timeArr[5];
                        if(status === 0 && year && month && day && hour && minute && second){
                            var date = new Date(year,month,day,hour,minute,second);
                            var nowDate = new Date();
                            var time = date.getTime()+3600000;//期限毫秒数
                            var nowTime = nowDate.getTime();
                            if (time - nowTime > 0) {
                                var tempTime = time - nowTime;
                                var tempDate = parseInt(tempTime / 86400000);
                                var tempHour = parseInt((tempTime - 86400000 * tempDate) / 3600000);
                                var tempMinute = parseInt((tempTime - 86400000 * tempDate - 3600000 * tempHour) / 60000);
                                var tempSecond = parseInt((tempTime - 86400000 * tempDate - 3600000 * tempHour - 60000 * tempMinute) / 1000);
                                tempDate = tempDate > 9 ? tempDate + "天" : "0" + tempDate + "天";
                                tempHour = tempHour > 9 ? tempHour + "小时" : "0" + tempHour + "小时";
                                tempMinute = tempMinute > 9 ? tempMinute + "分" : "0" + tempMinute + "分";
                                tempSecond = tempSecond > 9 ? tempSecond + "秒" : "0" + tempSecond + "秒";
                                this.endTime = tempDate + tempHour + tempMinute + tempSecond;
                            }else {
                                this.orderInfo.status = 9;
                            }
                        }
                    },
                    toPayClick: function(pType, orderId, orderPrice){
                        var that = this;
                        var isYL = pType === 'yl';
                        var isZFB = pType === 'zfb';
                        var message = Module['message-1-1'];
                        var payType = isYL? 3: (isZFB? 2: 1);
                        var type = payType === 3? "07": (payType === 1? "NATIVE": "scanCode");
                        var sendToPay = { orderId: orderId, orderPrice: orderPrice };
                        var tmp = window.open("about:blank");
                        jsModel.send("PAY_ORDER", { payType:payType, type:type, orderId:orderId, redirect: redirect })
                            .done(function(response){
                                if(response && response.success){
                                    if(payType === 1){
                                        var content = response.obj.urlCode;
                                        message.refresh({
                                            title:'温馨提示',
                                            content:'支付申请已提交，请确认！',
                                            DOMClick: false,
                                            confirmFun: function(){ window.location.reload(); }
                                        });
                                        sendToPay.url = content;
                                        sendToPay = JSON.stringify(sendToPay);
                                        window.localStorage.removeItem('sendToAliPay');
                                        window.localStorage.removeItem('sendToYinLian');
                                        window.localStorage.setItem('sendToPay',sendToPay);
                                        tmp.focus();
                                        tmp.location='/pay.html';
                                    }
                                    else if(payType === 2){
                                        var theObj = typeof response.obj === "string"? response.obj: JSON.stringify(response.obj);
                                        window.localStorage.setItem('sendToAliPay',theObj);
                                        window.localStorage.removeItem('sendToYinLian');
                                        window.localStorage.removeItem('sendToPay');
                                        message.refresh({
                                            title:'温馨提示',
                                            content:'支付申请已提交，请确认！',
                                            DOMClick: false,
                                            confirmFun: function(){ window.location.reload(); }
                                        });
                                        tmp.focus();
                                        tmp.location='/pay.html';
                                    }
                                    else if(payType === 3){
                                        var theObj = typeof response.obj === "string"? response.obj: JSON.stringify(response.obj);
                                        window.localStorage.setItem('sendToYinLian',theObj);
                                        window.localStorage.removeItem('sendToAliPay');
                                        window.localStorage.removeItem('sendToPay');
                                        message.refresh({
                                            title:'温馨提示',
                                            content:'支付申请已提交，请确认！',
                                            DOMClick: false,
                                            confirmFun: function(){ window.location.reload(); }
                                        });
                                        tmp.focus();
                                        tmp.location='/pay.html';
                                    }
                                }
                                else if(response && response.errorMsg){
                                    alertDefault.refresh({content:response.errorMsg });
                                    tmp.focus();
                                    tmp.close();
                                }
                                else{
                                    alertDefault.refresh({content:"获取支付二维码失败！"});
                                    tmp.focus();
                                    tmp.close();
                                }
                            })
                            .fail(function(response){
                                if(response && response.errorMsg){
                                    alertDefault.refresh({content:response.errorMsg });
                                    tmp.focus();
                                    tmp.close();
                                }
                                else{
                                    alertDefault.refresh({content:"获取支付二维码失败！"});
                                    tmp.focus();
                                    tmp.close();
                                }
                            });
                    },
                },
                mounted:function(){

                }
            });
        }
        if ((/^shopCart-1-\d+$/).test(role)) {
            var header1 = Module['header-1-1'];
            var header2 = Module['header-2-1'];
            var message = Module['message-1-1'];
            var alertDefault = Module['alertDefault-1-1'];
            jsModel.send('ORDER_SHOPPINGCART_QUERY', {}, true)
                .done(function(response){
                    Module[role] =  new Vue({
                        el: element,
                        data: {
                            selectedCount: 0,
                            orderTotalPrice: 0,
                            crossOrderMaxPrice: jsData.platform.rule.crossOrder.maxPrice,
                            normalOrderMinPrice: jsData.platform.rule.normalOrder.minPrice,
                            orderCrossTotalPrice: 0,
                            orderNormalTotalPrice: 0,
                            orders: (function(){
                                var orders = {};
                                orders.typeObj = {};
                                orders.quantity = 0;
                                orders.selected = false;
                                orders.oneSelected = false;
                                $.each(response, function (n1, o1) {
                                    var type = o1.type;
                                    var itemId = o1.itemId;
                                    var itemSpecs = o1.goodsSpecs;
                                    var supplierId = o1.supplierId;
                                    var supplierName = o1.supplierName;
                                    var status = itemSpecs.status;
                                    orders.quantity += 1;
                                    orders.typeObj[type] = orders.typeObj[type] || {};
                                    orders.typeObj[type][supplierId] = orders.typeObj[type][supplierId] || {};
                                    orders.typeObj[type][supplierId].type = type;
                                    orders.typeObj[type][supplierId].supplierId = supplierId;
                                    orders.typeObj[type][supplierId].supplierName = supplierName;
                                    orders.typeObj[type][supplierId].itemObj = orders.typeObj[type][supplierId].itemObj || {};
                                    orders.typeObj[type][supplierId].itemObj[itemId] = {};
                                    orders.typeObj[type][supplierId].itemObj[itemId].price = 0;
                                    orders.typeObj[type][supplierId].itemObj[itemId].vipPrice = 0;
                                    orders.typeObj[type][supplierId].itemObj[itemId].realPrice = 0;
                                    orders.typeObj[type][supplierId].itemObj[itemId].realVipPrice = 0;
                                    orders.typeObj[type][supplierId].itemObj[itemId].ids = o1.id;
                                    orders.typeObj[type][supplierId].itemObj[itemId].status = status;
                                    orders.typeObj[type][supplierId].itemObj[itemId].selected = itemSpecs.stock>0 && status !== 0;
                                    orders.typeObj[type][supplierId].itemObj[itemId].goodsId = itemSpecs.goodsId;
                                    orders.typeObj[type][supplierId].itemObj[itemId].firstCategory = itemSpecs.firstCategory;
                                    orders.typeObj[type][supplierId].itemObj[itemId].secondCategory = itemSpecs.secondCategory;
                                    orders.typeObj[type][supplierId].itemObj[itemId].thirdCategory = itemSpecs.thirdCategory;
                                    orders.typeObj[type][supplierId].itemObj[itemId].type = o1.type;
                                    orders.typeObj[type][supplierId].itemObj[itemId].href = o1.href;
                                    orders.typeObj[type][supplierId].itemObj[itemId].freeTax = o1.freeTax;
                                    orders.typeObj[type][supplierId].itemObj[itemId].freePost = o1.freePost;
                                    orders.typeObj[type][supplierId].itemObj[itemId].itemId = itemId;
                                    orders.typeObj[type][supplierId].itemObj[itemId].itemImg = o1.picPath;
                                    orders.typeObj[type][supplierId].itemObj[itemId].quantity = o1.quantity;
                                    orders.typeObj[type][supplierId].itemObj[itemId].itemName = o1.goodsName;
                                    orders.typeObj[type][supplierId].itemObj[itemId].itemSpecs = itemSpecs;
                                    orders.typeObj[type][supplierId].itemObj[itemId].stock = itemSpecs.stock>0? itemSpecs.stock: 0;
                                    orders.typeObj[type][supplierId].itemObj[itemId].weight = itemSpecs.weight;
                                    orders.typeObj[type][supplierId].itemObj[itemId].supplierId = supplierId;
                                    orders.typeObj[type][supplierId].itemObj[itemId].supplierName = supplierName;
                                    orders.typeObj[type][supplierId].itemObj[itemId].exciseTax = itemSpecs.exciseTax;
                                    orders.typeObj[type][supplierId].itemObj[itemId].incrementTax = itemSpecs.incrementTax;
                                    orders.typeObj[type][supplierId].itemObj[itemId].itemCode = itemSpecs.itemCode;
                                    orders.typeObj[type][supplierId].itemObj[itemId].priceList = itemSpecs.priceList;
                                    orders.typeObj[type][supplierId].itemObj[itemId].tagList = [];
                                    $.each(itemSpecs.tagList, function(i, o){
                                        if (o.tagName === '预售') {
                                            orders.typeObj[type][supplierId].itemObj[itemId].tagFunId = o.tagFunId;
                                            orders.typeObj[type][supplierId].itemObj[itemId].preSaleName = o.tagName;
                                            orders.typeObj[type][supplierId].itemObj[itemId].preSaleDesc = o.description;
                                        }
                                        orders.typeObj[type][supplierId].itemObj[itemId].tagList.push(o);
                                    });
                                });
                                return orders;
                            }()),
                            quantityTimer: null
                        },
                        computed: {},
                        methods: {
                            render: function(isFirst){
                                this.setInit(isFirst);
                                this.setNormalTotalPrice(isFirst);
                                this.setCrossTotalPrice(isFirst);
                                this.setOrderAllSelect(isFirst);
                                this.setOrderOneSelect(isFirst);
                                this.setOrderSelectedCount(isFirst);
                            },
                            setInit: function(){
                                var that = this;
                                var quantity = 0;
                                var orders = that.orders;
                                $.each(orders.typeObj, function (n1, o1) {
                                    $.each(o1, function(n2, o2){
                                        $.each(o2.itemObj, function(){
                                            quantity += 1;
                                        });
                                        if($.isEmptyObject(o2.itemObj)){
                                            delete that.orders.typeObj[n1][n2].itemObj;
                                            delete that.orders.typeObj[n1][n2];
                                        }
                                    });
                                    if($.isEmptyObject(o1)){
                                        delete that.orders.typeObj[n1];
                                    }
                                });
                                that.orders.quantity = quantity;
                            },
                            setNormalTotalPrice: function(isFirst){
                                var that = this;
                                var orderPrice = 0;
                                var orders = that.orders;
                                $.each(orders.typeObj, function(n1, o1){
                                    $.each(o1, function(n2, o2){
                                        var supplierWeight = 0;
                                        var supplierPrice = 0;
                                        var supplierVipPrice = 0;
                                        var supplierRealPrice = 0;
                                        var supplierRealVipPrice = 0;
                                        $.each(o2.itemObj, function(n3, o3) {
                                            if(o3.type == 2){
                                                var numRegionObj = that.getNumRegion(o3.priceList);
                                                var minQuantity = numRegionObj.minQuantity;
                                                var maxQuantity = numRegionObj.maxQuantity;
                                                o3.quantity = o3.quantity > maxQuantity ? maxQuantity : o3.quantity;
                                                o3.quantity = o3.quantity < minQuantity ? minQuantity : o3.quantity;
                                                o3.quantity = o3.quantity > o3.stock? o3.stock: o3.quantity;
                                                o3.quantity = o3.quantity > 0 ? o3.quantity : 1;
                                                that.orders.typeObj[n1][n2].itemObj[n3].quantity = o3.quantity;
                                                that.orders.typeObj[n1][n2].itemObj[n3].minQuantity = numRegionObj.minQuantity;
                                                that.orders.typeObj[n1][n2].itemObj[n3].maxQuantity = numRegionObj.maxQuantity;
                                                var priceListObj = that.getPriceList(o3.priceList, o3.quantity);
                                                that.orders.typeObj[n1][n2].itemObj[n3].price = priceListObj.price;
                                                that.orders.typeObj[n1][n2].itemObj[n3].vipPrice = priceListObj.vipPrice;
                                                that.orders.typeObj[n1][n2].itemObj[n3].realPrice = priceListObj.realPrice;
                                                that.orders.typeObj[n1][n2].itemObj[n3].realVipPrice = priceListObj.realVipPrice;
                                                that.orders.typeObj[n1][n2].itemObj[n3].stock = (o3.stock > 0 ? o3.stock : 0);
                                                if (isFirst) {
                                                    that.orders.typeObj[n1][n2].itemObj[n3].selected = o3.status !== 0 && o3.stock > 0 && o3.stock >= minQuantity;
                                                }
                                                /*if(o3.stock<=0 || o3.stock<priceListObj.minQuantity){
                                                     that.orders.typeObj[n1][n2].itemObj[n3].status = 0;
                                                 }*/
                                                if (o3.selected && o3.status !== 0 && o3.stock > 0) {
                                                    supplierWeight += o3.weight * o3.quantity;
                                                    supplierPrice += priceListObj.price * o3.quantity;
                                                    supplierVipPrice += priceListObj.vipPrice * o3.quantity;
                                                    supplierRealPrice += priceListObj.realPrice * o3.quantity;
                                                    supplierRealVipPrice += priceListObj.realVipPrice * o3.quantity;
                                                }
                                                if (minQuantity && maxQuantity && minQuantity !== -Infinity && maxQuantity !== Infinity) {
                                                    that.orders.typeObj[n1][n2].itemObj[n3].quantityDes = "当前允许购买量为: " + minQuantity + "~" + maxQuantity;
                                                } else if (minQuantity && minQuantity !== -Infinity) {
                                                    that.orders.typeObj[n1][n2].itemObj[n3].quantityDes = "当前最小购买量为: " + minQuantity;
                                                } else if (maxQuantity && maxQuantity !== Infinity) {
                                                    that.orders.typeObj[n1][n2].itemObj[n3].quantityDes = "当前最大购买量为: " + maxQuantity;
                                                } else {
                                                    that.orders.typeObj[n1][n2].itemObj[n3].quantityDes = "";
                                                }
                                            }
                                        });
                                        if(n1 == 2){
                                            that.orders.typeObj[n1][n2].supplierWeight = supplierWeight*1;
                                            that.orders.typeObj[n1][n2].supplierPrice =   supplierPrice*1;
                                            that.orders.typeObj[n1][n2].supplierVipPrice =  supplierVipPrice*1;
                                            that.orders.typeObj[n1][n2].supplierRealPrice =  supplierRealPrice*1;
                                            that.orders.typeObj[n1][n2].supplierRealVipPrice =  supplierRealVipPrice*1;
                                        }
                                        orderPrice += supplierRealPrice<supplierPrice? supplierRealPrice: supplierRealPrice;
                                    });
                                });
                                that.orderNormalTotalPrice = orderPrice * 1;
                            },
                            setCrossTotalPrice: function(isFirst){
                                var that = this;
                                var orderPrice = 0;
                                var orders = that.orders;
                                $.each(orders.typeObj, function(n1, o1){
                                    $.each(o1, function(n2, o2){
                                        var supplierWeight = 0;
                                        var supplierPrice = 0;
                                        var supplierVipPrice = 0;
                                        var supplierRealPrice = 0;
                                        var supplierRealVipPrice = 0;
                                        $.each(o2.itemObj, function(n3, o3) {
                                            if(o3.type == 0){
                                                var numRegionObj = that.getNumRegion(o3.priceList);
                                                var minQuantity = numRegionObj.minQuantity;
                                                var maxQuantity = numRegionObj.maxQuantity;
                                                o3.quantity = o3.quantity > maxQuantity ? maxQuantity : o3.quantity;
                                                o3.quantity = o3.quantity < minQuantity ? minQuantity : o3.quantity;
                                                o3.quantity = o3.quantity > o3.stock? o3.stock: o3.quantity;
                                                o3.quantity = o3.quantity > 0 ? o3.quantity : 1;
                                                that.orders.typeObj[n1][n2].itemObj[n3].quantity = o3.quantity;
                                                that.orders.typeObj[n1][n2].itemObj[n3].minQuantity = numRegionObj.minQuantity;
                                                that.orders.typeObj[n1][n2].itemObj[n3].maxQuantity = numRegionObj.maxQuantity;
                                                var priceListObj = that.getPriceList(o3.priceList, o3.quantity);
                                                that.orders.typeObj[n1][n2].itemObj[n3].price = priceListObj.price;
                                                that.orders.typeObj[n1][n2].itemObj[n3].vipPrice =priceListObj.vipPrice;
                                                that.orders.typeObj[n1][n2].itemObj[n3].realPrice = priceListObj.realPrice;
                                                that.orders.typeObj[n1][n2].itemObj[n3].realVipPrice = priceListObj.realVipPrice;
                                                that.orders.typeObj[n1][n2].itemObj[n3].stock = (o3.stock > 0 ? o3.stock : 0);
                                                if (isFirst) {
                                                    that.orders.typeObj[n1][n2].itemObj[n3].selected = o3.status !== 0 && o3.stock > 0 && o3.stock >= minQuantity;
                                                }
                                                /*if(o3.stock<=0 || o3.stock<priceListObj.minQuantity){
                                                     that.orders.typeObj[n1][n2].itemObj[n3].status = 0;
                                                 }*/
                                                if (o3.selected && o3.status !== 0 && o3.stock > 0) {
                                                    supplierWeight += o3.weight * o3.quantity;
                                                    supplierPrice += priceListObj.price * o3.quantity;
                                                    supplierVipPrice += priceListObj.vipPrice * o3.quantity;
                                                    supplierRealPrice += priceListObj.realPrice * o3.quantity;
                                                    supplierRealVipPrice += priceListObj.realVipPrice * o3.quantity;
                                                }
                                                if (minQuantity && maxQuantity && minQuantity !== -Infinity && maxQuantity !== Infinity) {
                                                    that.orders.typeObj[n1][n2].itemObj[n3].quantityDes = "当前允许购买量为: " + minQuantity + "~" + maxQuantity;
                                                } else if (minQuantity && minQuantity !== -Infinity) {
                                                    that.orders.typeObj[n1][n2].itemObj[n3].quantityDes = "当前最小购买量为: " + minQuantity;
                                                } else if (maxQuantity && maxQuantity !== Infinity) {
                                                    that.orders.typeObj[n1][n2].itemObj[n3].quantityDes = "当前最大购买量为: " + maxQuantity;
                                                } else {
                                                    that.orders.typeObj[n1][n2].itemObj[n3].quantityDes = "";
                                                }
                                            }
                                        });
                                        if(n1 == 0){
                                            that.orders.typeObj[n1][n2].supplierWeight = supplierWeight*1;
                                            that.orders.typeObj[n1][n2].supplierPrice = supplierPrice*1;
                                            that.orders.typeObj[n1][n2].supplierVipPrice = supplierVipPrice*1;
                                            that.orders.typeObj[n1][n2].supplierRealPrice = supplierRealPrice*1;
                                            that.orders.typeObj[n1][n2].supplierRealVipPrice = supplierRealVipPrice*1;
                                        }
                                        orderPrice += supplierRealPrice<supplierPrice? supplierRealPrice: supplierRealPrice;
                                    });
                                });
                                that.orderCrossTotalPrice = orderPrice * 1;
                            },
                            setOrderAllSelect: function(){
                                var that = this;
                                var tOrders = that.orders;
                                var quantity = tOrders.quantity;
                                var bool = true;
                                $.each(tOrders.typeObj, function(n1, o1){
                                    $.each(o1, function(n2, o2){
                                        $.each(o2.itemObj, function(n3, o3){
                                            if(!o3.selected && o3.status!==0 && o3.stock > 0 && o3.stock >= o3.minQuantity){
                                                bool = false;
                                                return false;
                                            }
                                            if(!o3.selected && (o3.status===0 || o3.stock <= 0 || o3.stock < o3.minQuantity)){
                                                quantity = quantity - 1;
                                            }
                                        });
                                    });
                                    that.orders.selected = bool && !!quantity;
                                });
                            },
                            setOrderOneSelect: function(){
                                var that = this;
                                var tOrders = this.orders;
                                var quantity = tOrders.quantity;
                                var bool = false;
                                $.each(tOrders.typeObj, function(n1, o1){
                                    $.each(o1, function(n2, o2){
                                        $.each(o2.itemObj, function(n3, o3){
                                            var quantity = that.orders.typeObj[n1][n2].itemObj[n3].quantity;
                                            if(o3.selected && quantity){
                                                bool = true;
                                                return false;
                                            }
                                        });
                                    });
                                    that.orders.oneSelected = bool && !!quantity;
                                });
                            },
                            setOrderSelectedCount: function(){
                                var that = this;
                                var tOrders = this.orders;
                                var count = 0;
                                $.each(tOrders.typeObj, function(n1, o1){
                                    $.each(o1, function(n2, o2){
                                        $.each(o2.itemObj, function(n3, o3){
                                            if(o3.selected){
                                                count = count + 1;
                                            }
                                        });
                                    });
                                    that.selectedCount = count;
                                });
                            },
                            getNumRegion: function(priceList){
                                var infoObj = {};
                                var infoObj_max = [];
                                var infoObj_min = [];
                                var isExist = false;
                                $.each(priceList, function(name, obj){
                                    var min = obj.min? obj.min: 0;
                                    var max = obj.max? obj.max: Number.POSITIVE_INFINITY;
                                    infoObj_max.push(max);
                                    infoObj_min.push(min);
                                    isExist = true;
                                });
                                if(isExist){
                                    infoObj.minQuantity = Math.min.apply(Math, infoObj_min);
                                    infoObj.maxQuantity = Math.max.apply(Math, infoObj_max);
                                    return infoObj;
                                }else{
                                    return {
                                        minQuantity: 0,
                                        maxQuantity: Number.POSITIVE_INFINITY
                                    }
                                }
                            },
                            getPriceList: function(priceList, quantity){
                                var prices = {};
                                var infoObj = {};
                                var priceArr = [];
                                var infoObj_max = [];
                                var infoObj_min = [];
                                var infoObj_price = [];
                                var infoObj_vipPrice = [];
                                var infoObj_realPrice = [];
                                var infoObj_realVipPrice = [];
                                var isExist = false;
                                $.each(priceList, function(name, obj){
                                    var min = obj.min? obj.min: 0;
                                    var max = obj.max? obj.max: Number.POSITIVE_INFINITY;
                                    var price = (obj.price||obj.price===0)? (obj.price*1).toFixed(2): null;
                                    var vipPrice = (obj.vipPrice||obj.vipPrice===0)? (obj.vipPrice*1).toFixed(2): null;
                                    var realPrice = price? (obj.discount? (obj.price*obj.discount/10).toFixed(2): (obj.price*1).toFixed(2)): null;
                                    var realVipPrice = vipPrice? (obj.discount? (obj.vipPrice*obj.discount/10).toFixed(2): (obj.vipPrice*1).toFixed(2)): null;
                                    priceArr.push({
                                        prices: {
                                            price: price,
                                            vipPrice: vipPrice,
                                            realPrice: realPrice,
                                            realVipPrice: realVipPrice
                                        },
                                        min: min,
                                        max: max
                                    });
                                    infoObj_min.push(min);
                                    infoObj_max.push(max);
                                    infoObj_price.push(price);
                                    infoObj_vipPrice.push(vipPrice);
                                    infoObj_realPrice.push(realPrice);
                                    infoObj_realVipPrice.push(realVipPrice);
                                    isExist = true;
                                });
                                if(isExist){
                                    infoObj.min =  Math.min.apply(Math, infoObj_min);
                                    infoObj.max =  Math.max.apply(Math, infoObj_max);
                                    infoObj.minPrice = Math.min.apply(Math, infoObj_price);
                                    infoObj.vipMinPrice =  Math.min.apply(Math, infoObj_vipPrice);
                                    infoObj.realMinPrice =  Math.min.apply(Math, infoObj_realPrice);
                                    infoObj.realVipMinPrice =  Math.min.apply(Math, infoObj_realVipPrice);
                                    infoObj.maxPrice = Math.max.apply(Math, infoObj_price);
                                    infoObj.vipMaxPrice =  Math.max.apply(Math, infoObj_vipPrice);
                                    infoObj.realMaxPrice =  Math.max.apply(Math, infoObj_realPrice);
                                    infoObj.realVipMaxPrice =  Math.max.apply(Math, infoObj_realVipPrice);
                                    if( quantity < infoObj.min){
                                        return {
                                            price: infoObj.maxPrice,
                                            vipPrice: infoObj.vipMaxPrice,
                                            realPrice: infoObj.realMaxPrice,
                                            realVipPrice: infoObj.realVipMaxPrice
                                        }
                                    }
                                    else if(quantity > infoObj.max){
                                        return {
                                            price: infoObj.minPrice,
                                            vipPrice: infoObj.vipMinPrice,
                                            realPrice: infoObj.realMinPrice,
                                            realVipPrice: infoObj.realVipMinPrice
                                        }
                                    }
                                    else{
                                        $.each(priceArr, function(n, o){
                                            if(quantity>=o.min && quantity<=o.max){
                                                prices = {
                                                    price: o.prices.price,
                                                    vipPrice: o.prices.vipPrice,
                                                    realPrice: o.prices.realPrice,
                                                    realVipPrice: o.prices.realVipPrice
                                                };
                                                return false
                                            }
                                        });
                                        return prices;
                                    }
                                }
                                else{
                                    return {
                                        price: null,
                                        vipPrice: null,
                                        realPrice: null,
                                        realVipPrice: null
                                    }
                                }
                            },
                            returnInfoList: function(info){
                                try {
                                    return JSON.parse(info) || []
                                } catch(e) {
                                    return []
                                }
                            },
                            returnSupplierName: function(name){
                                var returnVal = "";
                                switch(name){
                                    case "天天仓": returnVal = '保税TT仓'; break;
                                    case "粮油仓": returnVal = '保税LY仓'; break;
                                    case "行云仓": returnVal = '保税XY仓'; break;
                                    case "富邦仓": returnVal = '保税FB仓'; break;
                                    default:      returnVal = name;
                                }
                                return returnVal;
                            },
                            selectAllClick: function(){
                                var that = this;
                                var bool = that.orders.selected;
                                $.each(that.orders.typeObj, function(n1, o1){
                                    $.each(o1, function(n2, o2){
                                        $.each(o2.itemObj, function(n3, o3){
                                            if(typeof o3.selected === "boolean"){
                                                o3.status !== 0 && o3.stock > 0 && o3.stock >= o3.minQuantity?
                                                    that.orders.typeObj[n1][n2].itemObj[n3].selected = !bool:
                                                    that.orders.typeObj[n1][n2].itemObj[n3].selected = false;
                                            }
                                        })
                                    });
                                });
                                this.render();
                            },
                            selectClick: function(e){
                                var that = this;
                                var ev = e || window.event;
                                var $node = $(ev.currentTarget);
                                var type = $node.parents(".list-body-item").attr("type")||"";
                                var itemId = $node.parents(".list-body-item").attr("itemId")||"";
                                var supplierId = $node.parents(".list-body-item").attr("supplierId")||"";
                                if((type || type === 0) && (supplierId || supplierId === 0) && (itemId || itemId === 0)){
                                    var bool = that.orders.typeObj[type][supplierId].itemObj[itemId].selected;
                                    var status = that.orders.typeObj[type][supplierId].itemObj[itemId].status;
                                    var stock = that.orders.typeObj[type][supplierId].itemObj[itemId].stock;
                                    var minQuantity = that.orders.typeObj[type][supplierId].itemObj[itemId].minQuantity;
                                    var setBool = bool? !bool: (status !== 0 && stock > 0 && stock >= minQuantity? !bool: false);
                                    that.orders.typeObj[type][supplierId].itemObj[itemId].selected = setBool;
                                    that.render();
                                }
                            },
                            quantityChange: function(e){
                                var that = this;
                                var ev = e || window.event;
                                var $node = $(ev.currentTarget);
                                var type = $node.parents(".list-body-item").attr("type")||"";
                                var supplierId = $node.parents(".list-body-item").attr("supplierId")||"";
                                var itemId = $node.parents(".list-body-item").attr("itemId")||"";
                                var stock = that.orders.typeObj[type][supplierId].itemObj[itemId].stock || 0;
                                var quantity = that.orders.typeObj[type][supplierId].itemObj[itemId].quantity * 1;
                                var minQuantity = that.orders.typeObj[type][supplierId].itemObj[itemId].minQuantity;
                                var maxQuantity = that.orders.typeObj[type][supplierId].itemObj[itemId].maxQuantity;
                                if((type || type === 0) && (supplierId || supplierId === 0) && (itemId || itemId === 0)){
                                    if($node.hasClass("add")){
                                        quantity = quantity*1 + 1;
                                        quantity = quantity*1 > 0? quantity*1: 1;
                                    }
                                    if($node.hasClass("minus")){
                                        quantity = quantity*1 - 1;
                                        quantity = quantity*1 > 0? quantity*1: 1;
                                    }
                                    if(stock<=0 || (quantity <= stock && minQuantity && stock < minQuantity)){
                                        alertDefault.refresh({ content: "当前商品库存不足！" });
                                    }
                                    else if(quantity>stock){
                                        alertDefault.refresh({ content:"当前数量已是库存可用量！" });
                                    }
                                    else if(maxQuantity && quantity>=maxQuantity){
                                        alertDefault.refresh({ content: "当前数量已是最大购买量！" });
                                    }
                                    else if(minQuantity && quantity<=minQuantity){
                                        alertDefault.refresh({ content: "当前数量已是最小购买量！" });
                                    }
                                    quantity = (maxQuantity||maxQuantity===0) && quantity > maxQuantity? maxQuantity: quantity;
                                    quantity = (minQuantity||minQuantity===0) && quantity < minQuantity? minQuantity: quantity;
                                    quantity = quantity > stock? stock: quantity;
                                    quantity = quantity > 0? quantity: 1;
                                    $node.val(quantity*1);
                                    that.orders.typeObj[type][supplierId].itemObj[itemId].quantity = quantity;
                                    that.render();
                                }
                            },
                            quantityInput: function(e){
                                var that = this;
                                var ev = e || window.event;
                                var $node = $(ev.currentTarget);
                                var type = $node.parents(".list-body-item").attr("type")||"";
                                var itemId = $node.parents(".list-body-item").attr("itemId")||"";
                                var supplierId = $node.parents(".list-body-item").attr("supplierId")||"";
                                var stock = that.orders.typeObj[type][supplierId].itemObj[itemId].stock||0;
                                var minQuantity = that.orders.typeObj[type][supplierId].itemObj[itemId].minQuantity;
                                var maxQuantity = that.orders.typeObj[type][supplierId].itemObj[itemId].maxQuantity;
                                if((type || type === 0) && (supplierId || supplierId === 0) && (itemId || itemId === 0)){
                                    var temp = $node.val()? $node.val().trim(): 0;
                                    var tQuantity = (/\D/).test(temp)? temp.replace(/\D/g,""): temp;
                                    clearTimeout(that.quantityTimer);
                                    that.quantityTimer = setTimeout(function() {
                                        var quantity = tQuantity*1 > 0? tQuantity*1: 1;
                                        if(stock<=0 || (quantity <= stock && minQuantity && stock < minQuantity)){
                                            alertDefault.refresh({
                                                content: "当前商品库存不足！",
                                                evFunc: function(){
                                                    quantity = (maxQuantity||maxQuantity===0) && quantity > maxQuantity? maxQuantity: quantity;
                                                    quantity = (minQuantity||minQuantity===0) && quantity < minQuantity? minQuantity: quantity;
                                                    quantity = quantity > stock? stock: quantity;
                                                    that.orders.typeObj[type][supplierId].itemObj[itemId].quantity = quantity * 1 > 0? quantity * 1: 1;
                                                    that.render();
                                                }
                                            });
                                        }
                                        else if(quantity>stock){
                                            alertDefault.refresh({
                                                content: "当前数量大于库存可用量！",
                                                evFunc: function(){
                                                    quantity = (maxQuantity||maxQuantity===0) && quantity > maxQuantity? maxQuantity: quantity;
                                                    quantity = (minQuantity||minQuantity===0) && quantity < minQuantity? minQuantity: quantity;
                                                    quantity = quantity > stock? stock: quantity;
                                                    that.orders.typeObj[type][supplierId].itemObj[itemId].quantity = quantity * 1 > 0? quantity * 1: 1;
                                                    that.render();
                                                }
                                            });
                                        }
                                        else if(maxQuantity && quantity>maxQuantity){
                                            alertDefault.refresh({
                                                content: "当前数量已大于最大购买量！",
                                                evFunc: function(){
                                                    quantity = (maxQuantity||maxQuantity===0) && quantity > maxQuantity? maxQuantity: quantity;
                                                    quantity = (minQuantity||minQuantity===0) && quantity < minQuantity? minQuantity: quantity;
                                                    quantity = quantity > stock? stock: quantity;
                                                    that.orders.typeObj[type][supplierId].itemObj[itemId].quantity = quantity * 1 > 0? quantity * 1: 1;
                                                    that.render();
                                                }
                                            });
                                        }
                                        else if(minQuantity && quantity<minQuantity){
                                            alertDefault.refresh({
                                                content: "当前数量已低于最小购买量！",
                                                evFunc: function(){
                                                    quantity = (maxQuantity||maxQuantity===0) && quantity > maxQuantity? maxQuantity: quantity;
                                                    quantity = (minQuantity||minQuantity===0) && quantity < minQuantity? minQuantity: quantity;
                                                    quantity = quantity > stock? stock: quantity;
                                                    that.orders.typeObj[type][supplierId].itemObj[itemId].quantity = quantity * 1 > 0? quantity * 1: 1;
                                                    that.render();
                                                }
                                            });
                                        }
                                    }, 650);
                                }
                            },
                            quantityBlur: function(e){
                                var that = this;
                                var ev = e || window.event;
                                var $node = $(ev.currentTarget);
                                var type = $node.parents(".list-body-item").attr("type")||"";
                                var itemId = $node.parents(".list-body-item").attr("itemId")||"";
                                var supplierId = $node.parents(".list-body-item").attr("supplierId")||"";
                                var stock = that.orders.typeObj[type][supplierId].itemObj[itemId].stock||0;
                                var minQuantity = that.orders.typeObj[type][supplierId].itemObj[itemId].minQuantity;
                                var maxQuantity = that.orders.typeObj[type][supplierId].itemObj[itemId].maxQuantity;
                                if((type || type === 0) && (supplierId || supplierId === 0) && (itemId || itemId === 0)){
                                    var quantity = $node.val()? $node.val().trim(): 0;
                                    quantity = (maxQuantity||maxQuantity===0) && quantity > maxQuantity? maxQuantity: quantity;
                                    quantity = (minQuantity||minQuantity===0) && quantity < minQuantity? minQuantity: quantity;
                                    quantity = quantity > stock? stock: quantity;
                                    quantity = quantity > 0? quantity: 1;
                                    $node.val(quantity*1);
                                    that.orders.typeObj[type][supplierId].itemObj[itemId].quantity = quantity;
                                    that.render();
                                }
                            },
                            selectDelClick: function(e){
                                var that = this;
                                var ev = e || window.event;
                                var $node = $(ev.currentTarget);
                                message.refresh({
                                    title:'删除商品',
                                    content: "是否删除该商品？",
                                    DOMClick: false,
                                    cancelBtn: true,
                                    confirmBtn: true,
                                    cancelFun: function(){},
                                    confirmFun: function(){
                                        var type = $node.parents(".list-body-item").attr("type")||"";
                                        var supplierId = $node.parents(".list-body-item").attr("supplierId")||"";
                                        var itemId = $node.parents(".list-body-item").attr("itemId")||"";
                                        var ids = $node.parents(".list-body-item").attr("shopCartId")||"";
                                        if((type || type === 0) && (supplierId || supplierId === 0) && (itemId || itemId === 0)){
                                            jsModel.send("ORDER_SHOPPINGCART_DELETE", {ids: ids})
                                                .done(function(response1){
                                                    if(response1 && response1.success){
                                                        delete that.orders.typeObj[type][supplierId].itemObj[itemId];
                                                        that.orders.quantity = that.orders.quantity-1;
                                                        that.render();
                                                        jsModel.send("ORDER_SHOPPINGCART_COUNT", {})
                                                            .done(function(response2){
                                                                if(response2 && response2.success){
                                                                    header1.cartCount = response2.obj || 0;
                                                                    header2.cartCount = response2.obj || 0;
                                                                }
                                                            })
                                                    }
                                                });
                                        }
                                    }
                                });
                            },
                            selectMoreDelClick: function(e){
                                var that = this;
                                message.refresh({
                                    title:'删除商品',
                                    content: "是否删除所选中的商品？",
                                    DOMClick: false,
                                    cancelBtn: true,
                                    confirmBtn: true,
                                    cancelFun: function(){},
                                    confirmFun: function(){
                                        var idsArr = [];
                                        var orders = $.extend(true, {}, that.orders);
                                        $.each(orders.typeObj, function(n1, o1){
                                            $.each(o1, function(n2, o2){
                                                $.each(o2.itemObj, function(n3, o3){
                                                    if(o3.selected === true && o3.status!==0 && o3.stock > 0 && o3.stock >= o3.minQuantity){
                                                        idsArr.push(o3.ids);
                                                        delete o2.itemObj[n3];
                                                        orders.quantity = orders.quantity-1;
                                                    }
                                                })
                                            })
                                        });
                                        if(idsArr.length > 0){
                                            jsModel.send("ORDER_SHOPPINGCART_DELETE", {ids: idsArr.join(",")})
                                                .done(function(response1){
                                                    if(response1 && response1.success){
                                                        that.orders = orders;
                                                        that.render();
                                                        jsModel.send("ORDER_SHOPPINGCART_COUNT", {})
                                                            .done(function(response2){
                                                                if(response2 && response2.success){
                                                                    header1.cartCount = response2.obj || 0;
                                                                    header2.cartCount = response2.obj || 0;
                                                                }
                                                            })
                                                    }
                                                });
                                        }
                                    }
                                });
                            },
                            loseDelClick: function(){
                                var that = this;
                                message.refresh({
                                    title:'清空失效商品',
                                    content: "是否清空失效商品？",
                                    DOMClick: false,
                                    cancelBtn: true,
                                    confirmBtn: true,
                                    cancelFun: function(){},
                                    confirmFun: function(){
                                        var idsArr = [];
                                        var orders = $.extend(true, {}, that.orders);
                                        $.each(orders.typeObj, function(n1, o1){
                                            $.each(o1, function(n2, o2){
                                                $.each(o2.itemObj, function(n3, o3){
                                                    if(o3.status === 0 || o3.stock <= 0 || o3.stock < o3.minQuantity){
                                                        idsArr.push(o3.ids);
                                                        delete o2.itemObj[n3];
                                                        orders.quantity = orders.quantity-1;
                                                    }
                                                })
                                            })
                                        });
                                        if(idsArr.length > 0){
                                            jsModel.send("ORDER_SHOPPINGCART_DELETE", {ids: idsArr.join(",")})
                                                .done(function(response1){
                                                    if(response1 && response1.success){
                                                        that.orders = orders;
                                                        that.render();
                                                        jsModel.send("ORDER_SHOPPINGCART_COUNT", {})
                                                            .done(function(response2){
                                                                if(response2 && response2.success){
                                                                    header1.cartCount = response2.obj || 0;
                                                                    header2.cartCount = response2.obj || 0;
                                                                }
                                                            })
                                                    }
                                                });
                                        }
                                    }
                                });
                            },
                            settlementClick: function(e){
                                var that = this;
                                var ev = e || window.event;
                                var $node = $(ev.currentTarget);
                                var crossOrderMaxPrice = jsData.platform.rule.crossOrder.maxPrice;
                                var normalOrderMinPrice = jsData.platform.rule.normalOrder.minPrice;
                                if(!$node.hasClass('noSelect')){
                                    that.render();
                                    var orderCount = 0;
                                    var ordersInfo = {};
                                    $.each(that.orders.typeObj, function(n1, o1){
                                        $.each(o1, function(n2, o2){
                                            var bool = false;
                                            $.each(o2.itemObj, function(n3, o3){
                                                if(o3.selected && o3.status!==0 && o3.stock > 0 && o3.stock >= o3.minQuantity && o3.quantity>0){
                                                    bool = true;
                                                    ordersInfo.typeObj = ordersInfo.typeObj || {};
                                                    ordersInfo.typeObj[n1] = ordersInfo.typeObj[n1] || {};
                                                    ordersInfo.typeObj[n1][n2] = ordersInfo.typeObj[n1][n2] || {};
                                                    ordersInfo.typeObj[n1][n2].type = n1;
                                                    ordersInfo.typeObj[n1][n2].taxFee = 0;
                                                    ordersInfo.typeObj[n1][n2].postFee = 0;
                                                    ordersInfo.typeObj[n1][n2].exciseTaxFee = 0;
                                                    ordersInfo.typeObj[n1][n2].incrementTaxFee = 0;
                                                    ordersInfo.typeObj[n1][n2].supplierId = o2.supplierId;
                                                    ordersInfo.typeObj[n1][n2].supplierName = o2.supplierName;
                                                    ordersInfo.typeObj[n1][n2].supplierWeight = o2.supplierWeight;
                                                    ordersInfo.typeObj[n1][n2].supplierPrice = o2.supplierPrice;
                                                    ordersInfo.typeObj[n1][n2].supplierVipPrice = o2.supplierVipPrice;
                                                    ordersInfo.typeObj[n1][n2].supplierRealPrice = o2.supplierRealPrice;
                                                    ordersInfo.typeObj[n1][n2].supplierRealVipPrice = o2.supplierRealVipPrice;
                                                    ordersInfo.typeObj[n1][n2].itemObj = ordersInfo.typeObj[n1][n2].itemObj||{};
                                                    ordersInfo.typeObj[n1][n2].itemObj[n3] = {};
                                                    ordersInfo.typeObj[n1][n2].itemObj[n3].ids = o3.ids;
                                                    ordersInfo.typeObj[n1][n2].itemObj[n3].status = o3.status;
                                                    ordersInfo.typeObj[n1][n2].itemObj[n3].goodsId = o3.goodsId;
                                                    ordersInfo.typeObj[n1][n2].itemObj[n3].firstCategory = o3.firstCategory;
                                                    ordersInfo.typeObj[n1][n2].itemObj[n3].secondCategory = o3.secondCategory;
                                                    ordersInfo.typeObj[n1][n2].itemObj[n3].thirdCategory = o3.thirdCategory;
                                                    ordersInfo.typeObj[n1][n2].itemObj[n3].type = o3.type;
                                                    ordersInfo.typeObj[n1][n2].itemObj[n3].href = o3.href;
                                                    ordersInfo.typeObj[n1][n2].itemObj[n3].freeTax = o3.freeTax;
                                                    ordersInfo.typeObj[n1][n2].itemObj[n3].freePost = o3.freePost;
                                                    ordersInfo.typeObj[n1][n2].itemObj[n3].itemId = o3.itemId;
                                                    ordersInfo.typeObj[n1][n2].itemObj[n3].itemCode = o3.itemCode;
                                                    ordersInfo.typeObj[n1][n2].itemObj[n3].supplierId = o3.supplierId;
                                                    ordersInfo.typeObj[n1][n2].itemObj[n3].supplierName = o3.supplierName;
                                                    ordersInfo.typeObj[n1][n2].itemObj[n3].itemImg = o3.itemImg;
                                                    ordersInfo.typeObj[n1][n2].itemObj[n3].picPath = o3.picPath;
                                                    ordersInfo.typeObj[n1][n2].itemObj[n3].itemName = o3.itemName;
                                                    ordersInfo.typeObj[n1][n2].itemObj[n3].quantity = o3.quantity;
                                                    ordersInfo.typeObj[n1][n2].itemObj[n3].exciseTax = o3.exciseTax;
                                                    ordersInfo.typeObj[n1][n2].itemObj[n3].incrementTax = o3.incrementTax;
                                                    ordersInfo.typeObj[n1][n2].itemObj[n3].priceList = o3.priceList;
                                                    ordersInfo.typeObj[n1][n2].itemObj[n3].tagList = o3.tagList;
                                                    ordersInfo.typeObj[n1][n2].itemObj[n3].tagFunId = o3.tagFunId;
                                                    ordersInfo.typeObj[n1][n2].itemObj[n3].preSaleName = o3.preSaleName;
                                                    ordersInfo.typeObj[n1][n2].itemObj[n3].preSaleDesc = o3.preSaleDesc;
                                                    ordersInfo.typeObj[n1][n2].itemObj[n3].sku = o3.itemSpecs.sku;
                                                    ordersInfo.typeObj[n1][n2].itemObj[n3].info = o3.itemSpecs.info;
                                                    ordersInfo.typeObj[n1][n2].itemObj[n3].stock = o3.itemSpecs.stock>0? o3.itemSpecs.stock: 0;
                                                    ordersInfo.typeObj[n1][n2].itemObj[n3].weight = o3.itemSpecs.weight;
                                                    ordersInfo.typeObj[n1][n2].itemObj[n3].price = o3.price;
                                                    ordersInfo.typeObj[n1][n2].itemObj[n3].vipPrice = o3.vipPrice;
                                                    ordersInfo.typeObj[n1][n2].itemObj[n3].realPrice = o3.realPrice;
                                                    ordersInfo.typeObj[n1][n2].itemObj[n3].realVipPrice = o3.realMinPrice;
                                                }
                                            });
                                            if(bool){ orderCount++ }
                                        })
                                    });
                                    ordersInfo.orderCount = orderCount;
                                    if(!$.isEmptyObject(ordersInfo)){
                                        var crossCount = 0;
                                        var normalCount = 0;
                                        var crossPass = true;
                                        var normalPass = true;
                                        var isContinue = true;
                                        $.each(ordersInfo.typeObj, function(k1,o1){
                                            $.each(o1,function(k2,o2){
                                                var crossPrice = 0;
                                                var normalPrice = 0;
                                                var supplierId = o2.supplierId;
                                                var supplierName = o2.supplierName;
                                                $.each(o2.itemObj,function(k3,o3){
                                                    if(o3.type === 0){
                                                        crossPrice += o3.realPrice * o3.quantity;
                                                        crossCount += o3.quantity;
                                                    }else if(o3.type === 2){
                                                        normalPrice += o3.realPrice * o3.quantity;
                                                        normalCount += o3.quantity;
                                                    }
                                                });
                                                if(k1=== '0' && crossPrice > crossOrderMaxPrice && crossCount > 1){
                                                    isContinue = crossPass = false;
                                                    alertDefault.refresh({ content: supplierName + "商品单笔订单价格超过" + crossOrderMaxPrice + "元，请调整！" });
                                                    return false;
                                                }
                                                if (k1 === '2' && supplierId*1 === 6 && normalPrice < normalOrderMinPrice) {
                                                    isContinue = normalPass = false;
                                                    alertDefault.refresh({ content: supplierName + "商品订单未满" + normalOrderMinPrice + "元，请调整！" });
                                                    return false;
                                                }
                                                if(!isContinue){
                                                    return false;
                                                }
                                            });
                                            if(!isContinue){
                                                return false;
                                            }
                                        });
                                        if (isContinue && (crossPass || normalPass)) {
                                            window.localStorage.setItem("ordersInfo", JSON.stringify(ordersInfo));
                                            window.location.href = encodeURI("/orderSure.html?jumpUrl=" + pathUrl);
                                        }
                                    }
                                }
                            }
                        },
                        mounted: function(){
                            this.render(true);
                        }
                    });
                });
        }
        if ((/^search-1-\d+$/).test(role)) {
            jsModel.send(['GOODS_BASE_QUERY', 'GOODS_NAV_QUERY_NODE'] , search, true)
                .done(function(response){
                    var goodsObj = response['GOODS_BASE_QUERY'] || {};
                    var categoryObj = response['GOODS_NAV_QUERY_NODE'] && response['GOODS_NAV_QUERY_NODE'].data || {};
                    var isShow = goodsObj.brand || goodsObj.origin || filterCategory === 'show';
                    if(!useStorage){
                        window.localStorage.setItem("brands", JSON.stringify(goodsObj.brand||[]));
                        window.localStorage.setItem("origins", JSON.stringify(goodsObj.origin||[]));
                        window.localStorage.setItem("brandpys", JSON.stringify(goodsObj.brandpy||{}));
                    }
                    Module[role] =  new Vue({
                        el: element,
                        data: {
                            type:            type,
                            typeName:        type === "0"? "跨境商品": type === "2"? "一般贸易": "",
                            isShow:          isShow,
                            filtrate:        {
                                brand: brands || goodsObj.brand || [],
                                origin: origins || goodsObj.origin || [],
                                brandpy: brandpys || goodsObj.brandpy || {},
                                category: (function(){
                                    var list = [];
                                    if (filterCategory === 'show') {
                                        $.each(categoryObj, function(index, obj){
                                            list.push({ name: obj.industryName })
                                        });
                                    }
                                    return list;
                                })()
                            },
                            filtrateObj:     {
                                brand: brand? "品牌:" + brand: "",
                                origin: origin? "产地:" + origin: "",
                                category: category? "分类:" + category: ""
                            },
                            filtrateShow:    {
                                brandShow: brands || goodsObj.brand || []
                            },
                            selectedList:    {
                                brand:  brand && brand.split(",") || [],
                                origin: origin && origin.split(",") || [],
                                category: category && category.split(",") || []
                            },
                            sortType:        sortType,
                            screenType:      screenType,
                            position:        entryName || goodsName || "所有分类",
                            goodsList:       goodsObj.goodsList || {},
                            pagination:      goodsObj.pagination || {},
                            rootPath:        "所有分类",
                            locations:       locations,
                            locationId:      locationId,
                            isLogin:         isLogin,
                            jumpUrl:         jumpUrl,
                            pathUrl:         pathUrl,
                            request:         search,
                            priceAreaMin:    priceAreaMin,
                            priceAreaMax:    priceAreaMax
                        },
                        computed: {
                            paginationPageList: function(){
                                var pageList = [];
                                var pagination = this.pagination || {};
                                var currentPage = pagination.currentPage * 1;
                                var totalPages =  pagination.totalPages * 1;
                                if(totalPages<13){
                                    for(var i=0;i<totalPages;i++){
                                        pageList[i] = {
                                            page: i+1,
                                            jumpBtn: i+1,
                                            active: (i+1) == currentPage? "active": null,
                                            ellipsis: false
                                        };
                                    }
                                }
                                else{
                                    if(currentPage<7){
                                        for(var i=0;i<8;i++){
                                            pageList[i] = {
                                                page: i+1,
                                                jumpBtn: i+1,
                                                active: (i+1) == currentPage? "active": null,
                                                ellipsis: false
                                            };
                                        }
                                        pageList[8] = {
                                            page: null,
                                            jumpBtn: null,
                                            ellipsis: true
                                        };
                                        for(var i=9,j=1; j>-1; i++,j--){
                                            pageList[i] = {
                                                page: totalPages-j,
                                                jumpBtn: totalPages-j,
                                                active: (totalPages-j) == currentPage? "active": null,
                                                ellipsis: false
                                            };
                                        }
                                    }
                                    else if(currentPage>totalPages-6){
                                        for(var i=0;i<2;i++){
                                            pageList[i] = {
                                                page: i+1,
                                                jumpBtn: i+1,
                                                active: (i+1) == currentPage? "active": null,
                                                ellipsis: false
                                            };
                                        }
                                        pageList[2] = {
                                            page: null,
                                            jumpBtn: null,
                                            ellipsis: true
                                        };
                                        for(var i=3,j=totalPages-8; j<totalPages; i++,j++){
                                            pageList[i] = {
                                                page: j+1,
                                                jumpBtn: j+1,
                                                active: (j+1) == currentPage? "active": null,
                                                ellipsis: false,
                                            };
                                        }
                                    }
                                    else{
                                        for(var i=0;i<2;i++){
                                            pageList[i] = {
                                                page: i+1,
                                                jumpBtn: i+1,
                                                active: (i+1) == currentPage? "active": null,
                                                ellipsis: false
                                            };
                                        }
                                        pageList[2] = {
                                            page: null,
                                            jumpBtn: null,
                                            ellipsis: true
                                        };
                                        for(var i=3,j=currentPage-3; j<currentPage+2; i++,j++){
                                            pageList[i] = {
                                                page: j+1,
                                                jumpBtn: j+1,
                                                active: (j+1) == currentPage? "active": null,
                                                ellipsis: false
                                            };
                                        }
                                        pageList[8] = {
                                            page: null,
                                            jumpBtn: null,
                                            ellipsis: true
                                        };
                                        for(var i=9,j=1; j>-1; i++,j--){
                                            pageList[i] = {
                                                page: totalPages-j,
                                                jumpBtn: totalPages-j,
                                                active: (totalPages-j) == currentPage? "active": null,
                                                ellipsis: false
                                            };
                                        }
                                    }
                                }
                                return pageList;
                            }
                        },
                        methods: {
                            firstCategory: function(index, idArr) {
                                return idArr[0];
                            },
                            categoryName: function(index, nameArr) {
                                return  nameArr[0];
                            },
                            secondCategory: function(index, idArr) {
                                var result = '';
                                if (index >= 1) {
                                    result = idArr[1];
                                }
                                return result;
                            },
                            dictName: function(index, nameArr) {
                                var result = '';
                                if (index >= 1) {
                                    result = nameArr[1];
                                }
                                return result;
                            },
                            thirdCategory: function(index, idArr) {
                                var result = '';
                                if (index >= 2) {
                                    result = idArr[2];
                                }
                                return result;
                            },
                            entryName: function(index, nameArr) {
                                var result = '';
                                if (index >= 2) {
                                    result = nameArr[2];
                                }
                                return result;
                            },
                            getPath: function(goodsFileList, imgPath){
                                return $.isArray(goodsFileList) && goodsFileList[0] &&
                                    goodsFileList[0].path || imgPath;
                            },
                            returnImgSrc: function(type){
                                var imgSrc = '';
                                switch(type){
                                    case 0: imgSrc = '/images/platform/tag/icon_cross.png'; break;
                                    case 2: imgSrc = '/images/platform/tag/icon_normal.png'; break;
                                }
                                return imgSrc;
                            },
                            returnPrice: function(realPrice){
                                return realPrice*1 > 0? (realPrice*1).toFixed(2): '0.00'
                            },
                            returnOldPrice: function(realPrice, price){
                                if(price && realPrice && realPrice<price) {
                                    return price*1 > 0? (price*1).toFixed(2): '0.00'
                                } else {
                                    return '';
                                }
                            },
                            typeLetter: function(e){
                                var that = this;
                                var ev = e || window.event;
                                var $node = $(ev.currentTarget);
                                var $parent = $node.parent();
                                var key = $node.attr('keyId') || '';
                                that.filtrateShow.brandShow = key === 'all'? that.filtrate.brand: that.filtrate.brandpy[key];
                                $parent.find('>li').removeClass('selected');
                                $node.addClass('selected');
                            },
                            brandStatus: function(item, brandShow){
                                var index = $.inArray(item, brandShow);
                                return index !== -1;
                            },
                            returnSelected: function(item, selectedList){
                                var index = $.inArray(item, selectedList);
                                return index !== -1? "fa-check-square-o": "fa-square-o";
                            },
                            itemBodyLiClick: function(e) {
                                var that = this;
                                var index = null;
                                var refresh = false;
                                var ev = e || window.event;
                                var $node = $(ev.currentTarget);
                                var $item = $node.parents(".list-item");
                                var $body = $node.parents('.list-item-body');
                                var addBody = $node.attr("itemName");
                                if(!$body.hasClass('show')) {
                                    if($item.hasClass("origin")){
                                        refresh = true;
                                        that.selectedList.origin = [addBody];
                                        that.filtrateObj.origin = "产地:"+addBody;
                                        that.request.origin = addBody;
                                        popState.origin = addBody;
                                    }
                                    if($item.hasClass("brand")){
                                        refresh = true;
                                        that.selectedList.brand = [addBody];
                                        that.filtrateObj.brand = "品牌:"+addBody;
                                        that.request.brand = addBody;
                                        popState.brand = addBody;
                                    }
                                    if(refresh){
                                        popState.currentPage = 1;
                                        that.request.currentPage = 1;
                                        jsModel.send("GOODS_BASE_QUERY", that.request)
                                            .done(function(response){
                                                if(response && response.success){
                                                    var data = response.obj || {};
                                                    that.goodsList =  data && data.goodsList || {};
                                                    that.pagination =  data && data.pagination || {};
                                                }
                                            });
                                        jsUtil.url.setParam(popState, "", {code: "search"});
                                    }
                                }
                                if($body.hasClass('show')){
                                    if($item.hasClass("origin")){
                                        index = $.inArray(addBody, that.selectedList.origin);
                                        index === -1
                                            ? that.selectedList.origin.push(addBody)
                                            : that.selectedList.origin.splice(index,1);
                                    }
                                    if($item.hasClass("brand")){
                                        index = $.inArray(addBody, that.selectedList.brand);
                                        index === -1
                                            ? that.selectedList.brand.push(addBody)
                                            : that.selectedList.brand.splice(index,1);
                                    }
                                }
                            },
                            liSpanClick: function(e) {
                                var that = this;
                                var ev = e || window.event;
                                var $node = $(ev.currentTarget);
                                if($node.hasClass("origin")){
                                    popState.origin = '';
                                    that.selectedList.origin = [];
                                    delete that.filtrateObj.origin;
                                    delete that.request.origin;
                                }
                                if($node.hasClass("brand")){
                                    popState.brand = '';
                                    that.selectedList.brand = [];
                                    delete that.filtrateObj.brand;
                                    delete that.request.brand;
                                }
                                popState.currentPage = 1;
                                that.request.currentPage = 1;
                                jsModel.send("GOODS_BASE_QUERY", that.request)
                                    .done(function(response){
                                        if(response && response.success){
                                            var data = response.obj || {};
                                            that.goodsList =  data && data.goodsList || {};
                                            that.pagination =  data && data.pagination || {};
                                        }
                                    });
                                jsUtil.url.setParam(popState, "", {code: "search"});
                            },
                            cancelClick: function(e) {
                                var that = this;
                                var ev = e || window.event;
                                var $node = $(ev.currentTarget);
                                that.selectedList.brand = $.extend(true, [], that.request.brand);
                                that.selectedList.origin = $.extend(true, [], that.request.origin);
                                $node.parents(".list-item").find(".list-item-header i").click();
                                $node.parents(".list-item-body").find(".typeLetter").hide();
                            },
                            submitClick: function(e) {
                                var that = this;
                                var originStr, brandStr;
                                var ev = e || window.event;
                                var $node = $(ev.currentTarget);
                                var $listItem = $node.parents(".list-item");
                                var $listItems = $node.parents('.searchFiltrate-list').find('.list-item');
                                $listItems.find('.list-item-header > i').html('多选');
                                $listItems.find(".list-item-body .typeLetter").hide();
                                $listItems.find('.list-item-body .typeList').css("overflow-y", "hidden");
                                $listItems.find('[data-status]').attr("data-status", 'hide');
                                $listItems.find('.list-item-body').removeClass('active show');
                                if($listItem.hasClass("origin")){
                                    originStr = that.selectedList.origin.join(",");
                                    if(originStr){
                                        popState.origin = originStr;
                                        that.request.origin = originStr;
                                        that.filtrateObj.origin = "产地:"+originStr;
                                    }
                                    else {
                                        popState.origin = '';
                                        delete that.request.origin;
                                        delete that.filtrateObj.origin;
                                    }
                                }
                                if($listItem.hasClass("brand")){
                                    brandStr = that.selectedList.brand.join(",");
                                    if(brandStr){
                                        popState.brand = brandStr;
                                        that.request.brand = brandStr;
                                        that.filtrateObj.brand = "品牌:"+brandStr;
                                    }
                                    else {
                                        popState.brand = '';
                                        delete that.request.brand;
                                        delete that.filtrateObj.brand;
                                    }
                                }
                                popState.currentPage = 1;
                                that.request.currentPage = 1;
                                jsModel.send("GOODS_BASE_QUERY", that.request)
                                    .done(function(response){
                                        if(response && response.success){
                                            var data = response.obj || {};
                                            that.goodsList =  data && data.goodsList || {};
                                            that.pagination =  data && data.pagination || {};
                                        }
                                    });
                                jsUtil.url.setParam(popState, "", {code: "search"});
                            },
                            selectFilter: function(e) {
                                var that = this;
                                var ev = e || window.event;
                                var $node = $(ev.currentTarget);
                                var nodeVal = $node.val();
                                if($node.val() === "1"){
                                    that.sortType = nodeVal;
                                    popState.sortType = nodeVal;
                                    delete that.request["sortList[0].sortField"];
                                    delete that.request["sortList[0].sortRule"];
                                }
                                if($node.val() === "2"){
                                    that.sortType = nodeVal;
                                    popState.sortType = nodeVal;
                                    that.request["sortList[0].sortField"] = "create_time";
                                    that.request["sortList[0].sortRule"] = "desc";
                                }
                                if($node.val() === "3"){
                                    that.sortType = nodeVal;
                                    popState.sortType = nodeVal;
                                    that.request["sortList[0].sortField"] = "price";
                                    that.request["sortList[0].sortRule"] = "desc";
                                }
                                if($node.val() === "4"){
                                    that.sortType = nodeVal;
                                    popState.sortType = nodeVal;
                                    that.request["sortList[0].sortField"] = "price";
                                    that.request["sortList[0].sortRule"] = "asc";
                                }
                                popState.currentPage = 1;
                                that.request.currentPage = 1;
                                jsModel.send("GOODS_BASE_QUERY", that.request)
                                    .done(function(response){
                                        if(response && response.success){
                                            var data = response.obj || {};
                                            that.goodsList =  data && data.goodsList || {};
                                            that.pagination =  data && data.pagination || {};
                                        }
                                    });
                                jsUtil.url.setParam(popState, "", {code: "search"});
                            },
                            selectScreen: function(e) {
                                var that = this;
                                var ev = e || window.event;
                                var $node = $(ev.currentTarget);
                                var nodeVal = $node.val();
                                if($node.val() === "1"){
                                    popState.tag = '';
                                    that.screenType = nodeVal;
                                    popState.screenType = nodeVal;
                                    delete that.request.tag;
                                }
                                if($node.val() === "2"){
                                    that.screenType = nodeVal;
                                    popState.screenType = nodeVal;
                                    that.request.tag = '新品推荐';
                                    popState.tag = '新品推荐';
                                }
                                if($node.val() === "3"){
                                    that.screenType = nodeVal;
                                    popState.screenType = nodeVal;
                                    that.request.tag = '热销榜单';
                                    popState.tag = '热销榜单';
                                }
                                if($node.val() === "4"){
                                    that.screenType = nodeVal;
                                    popState.screenType = nodeVal;
                                    that.request.tag = '一般贸易(包邮)';
                                    popState.tag = '一般贸易(包邮)';
                                }
                                if($node.val() === "5"){
                                    that.screenType = nodeVal;
                                    popState.screenType = nodeVal;
                                    that.request.tag = '明星同款';
                                    popState.tag = '明星同款';
                                }
                                popState.currentPage = 1;
                                that.request.currentPage = 1;
                                jsModel.send("GOODS_BASE_QUERY", that.request)
                                    .done(function(response){
                                        if(response && response.success){
                                            var data = response.obj || {};
                                            that.goodsList =  data && data.goodsList || {};
                                            that.pagination =  data && data.pagination || {};
                                        }
                                    });
                                jsUtil.url.setParam(popState, "", {code: "search"});
                            },
                            priceMinInput: function(e){
                                var that = this;
                                var priceAreaMin = this.priceAreaMin;
                                priceAreaMin = priceAreaMin.replace(/\D+/g, '');
                                popState.priceAreaMin = priceAreaMin? priceAreaMin: '';
                                that.priceAreaMin = priceAreaMin? priceAreaMin: '';
                                jsUtil.url.setParam(popState, "", {code: "search"});
                            },
                            priceMaxInput: function(e){
                                var that = this;
                                var priceAreaMax = this.priceAreaMax;
                                priceAreaMax = priceAreaMax.replace(/\D+/g, '');
                                popState.priceAreaMax = priceAreaMax? priceAreaMax: '';
                                that.priceAreaMax = priceAreaMax? priceAreaMax: '';
                                jsUtil.url.setParam(popState, "", {code: "search"});
                            },
                            priceAreaBlur: function(e){
                                var that = this;
                                var priceAreaMin = that.priceAreaMin;
                                var priceAreaMax = that.priceAreaMax;
                                if(priceAreaMin && priceAreaMax){
                                    var tPriceAreaMin = priceAreaMin*1;
                                    var tPriceAreaMax = priceAreaMax*1;
                                    priceAreaMin = tPriceAreaMin > tPriceAreaMax? '' + tPriceAreaMax: '' + tPriceAreaMin;
                                    priceAreaMax = tPriceAreaMax < tPriceAreaMin? '' + tPriceAreaMin: '' + tPriceAreaMax;
                                }
                                that.priceAreaMin = priceAreaMin? priceAreaMin: '';
                                that.priceAreaMax = priceAreaMax? priceAreaMax: '';
                                popState.priceAreaMin = priceAreaMin? priceAreaMin: '';
                                popState.priceAreaMax = priceAreaMax? priceAreaMax: '';
                                jsUtil.url.setParam(popState, "", {code: "search"});
                            },
                            priceAreaClear: function(e){
                                var that = this;
                                var priceAreaMin = '';
                                var priceAreaMax = '';
                                that.priceAreaMin = priceAreaMin;
                                that.priceAreaMax = priceAreaMax;
                                popState.priceMin = 0;
                                popState.priceMax = 100000000;
                                popState.currentPage = 1;
                                popState.priceAreaMin = priceAreaMin;
                                popState.priceAreaMax = priceAreaMax;
                                that.request.priceMin = 0;
                                that.request.priceMax = 100000000;
                                that.request.currentPage = 1;
                                jsModel.send("GOODS_BASE_QUERY", that.request)
                                    .done(function(response){
                                        if(response && response.success){
                                            var data = response.obj || {};
                                            that.goodsList =  data && data.goodsList || {};
                                            that.pagination =  data && data.pagination || {};
                                        }
                                    });
                                jsUtil.url.setParam(popState, "", {code: "search"});
                            },
                            priceAreaSure: function(e){
                                var that = this;
                                var priceAreaMin = that.priceAreaMin;
                                var priceAreaMax = that.priceAreaMax;
                                popState.currentPage = 1;
                                popState.priceAreaMin = priceAreaMin;
                                popState.priceAreaMax = priceAreaMax;
                                popState.priceMin = priceAreaMin? priceAreaMin*1: 0;
                                popState.priceMax = priceAreaMax? priceAreaMax*1: 100000000;
                                that.request.currentPage = 1;
                                that.request.priceMin = priceAreaMin? priceAreaMin*1: 0;
                                that.request.priceMax = priceAreaMax? priceAreaMax*1: 100000000;
                                jsModel.send("GOODS_BASE_QUERY", that.request)
                                    .done(function(response){
                                        if(response && response.success){
                                            var data = response.obj || {};
                                            that.goodsList =  data && data.goodsList || {};
                                            that.pagination =  data && data.pagination || {};
                                        }
                                    });
                                jsUtil.url.setParam(popState, "", {code: "search"});
                            },
                            paginationInput: function(e){
                                var that = this;
                                var regex = /\D/g;
                                var ev = e || window.event;
                                var $node = $(ev.currentTarget);
                                var val = $node.val() && $node.val().trim() || 1;
                                var totalPages = that.pagination.totalPages * 1;
                                $node.val(val.replace(regex, "").trim());
                                ($node.val()*1 > totalPages) && $node.val(totalPages||1);
                            },
                            paginationBlur: function(e){
                                var ev = e || window.event;
                                var $node = $(ev.currentTarget);
                                var val = $node.val().trim();
                                if(!val){ $node.val(1); }
                            },
                            paginationBtn: function(e){
                                var that = this;
                                var ev = e || window.event;
                                var $node = $(ev.currentTarget);
                                var totalPages = that.pagination.totalPages*1;
                                var currentPage = that.pagination.currentPage*1;
                                var $parent = $node.parents(".pagination_ul");
                                if (!$parent.hasClass('lose') && !$parent.hasClass('active')) {
                                    if($node.hasClass("searchBtn")){
                                        currentPage = $node.parent().prev().find("input").val();
                                    }
                                    else if($node.hasClass("prevBtn")){
                                        currentPage = currentPage>1? currentPage*1-1: 1;
                                    }
                                    else if($node.hasClass("nextBtn")){
                                        currentPage = currentPage<totalPages? currentPage*1+1: totalPages;
                                    }
                                    else{
                                        currentPage = $node.text();
                                        currentPage = currentPage*1>=1? currentPage*1: 1;
                                        currentPage = currentPage*1<=totalPages? currentPage*1: totalPages;
                                    }
                                    popState.currentPage = currentPage;
                                    that.request.currentPage = currentPage;
                                    jsModel.send("GOODS_BASE_QUERY", that.request)
                                        .done(function(response){
                                            if(response && response.success){
                                                var data = response.obj || {};
                                                that.goodsList =  data && data.goodsList || {};
                                                that.pagination =  data && data.pagination || {};
                                                $("html,body").animate({scrollTop: 0});
                                            }
                                        });
                                    jsUtil.url.setParam(popState, "", {code: "search"});
                                }
                            },
                            pageImgClick: function(e){
                                var that = this;
                                var ev = e || window.event;
                                var $node = $(ev.currentTarget);
                                var currentPage = that.pagination.currentPage*1;
                                var totalPages = that.pagination.totalPages*1;
                                if($node.hasClass("prev") && currentPage !== 1){
                                    currentPage = currentPage>1? currentPage*1-1: 1;
                                    popState.currentPage = currentPage;
                                    that.request.currentPage = currentPage;
                                    jsModel.send("GOODS_BASE_QUERY", that.request)
                                        .done(function(response){
                                            if(response && response.success){
                                                var data = response.obj || {};
                                                that.goodsList =  data && data.goodsList || {};
                                                that.pagination =  data && data.pagination || {};
                                            }
                                        });
                                    jsUtil.url.setParam(popState, "", {code: "search"});
                                }
                                if($node.hasClass("next") && currentPage !== totalPages){
                                    currentPage = currentPage<totalPages? currentPage*1+1: totalPages;
                                    popState.currentPage = currentPage;
                                    that.request.currentPage = currentPage;
                                    jsModel.send("GOODS_BASE_QUERY", that.request)
                                        .done(function(response){
                                            if(response && response.success){
                                                var data = response.obj || {};
                                                that.goodsList =  data && data.goodsList || {};
                                                that.pagination =  data && data.pagination || {};
                                            }
                                        });
                                    jsUtil.url.setParam(popState, "", {code: "search"});
                                }
                            },
                            toAddShopCart: function(e){
                                var that = this;
                                var ev = e || window.event;
                                var $node = $(ev.currentTarget);
                                var message = Module['message-1-1'];
                                var alertDefault = Module['alertDefault-1-1'];
                                var $item = $node.parents(".img_shrink");
                                var isSingleSpec = $item.attr('isSingleSpec');
                                var goodsId = $item.attr('goodsId');
                                var toUrl = $item.attr('toUrl');
                                if (isSingleSpec === 'yes') {
                                    $.each(that.goodsList,function(index, obj){
                                        if(obj.goodsId == goodsId){
                                            var quantity = 1;
                                            var goodsFile = obj.goodsFileList && obj.goodsFileList[0] || {};
                                            var goodsSpecs = obj.goodsSpecsList && obj.goodsSpecsList[0] || {};
                                            var stock = goodsSpecs.stock || 0;
                                            var priceList = goodsSpecs.priceList || [];
                                            var getNumRegion = function(priceList){
                                                var infoObj = {};
                                                var infoObj_max = [];
                                                var infoObj_min = [];
                                                var isExist = false;
                                                $.each(priceList, function(name, obj){
                                                    var min = obj.min*1? obj.min*1: 0;
                                                    var max = obj.max*1? obj.max*1: Infinity;
                                                    infoObj_max.push(max);
                                                    infoObj_min.push(min);
                                                    isExist = true;
                                                });
                                                if(isExist){
                                                    infoObj.minQuantity = Math.min.apply(Math, infoObj_min);
                                                    infoObj.maxQuantity = Math.max.apply(Math, infoObj_max);
                                                    return infoObj;
                                                }else{
                                                    return {
                                                        minQuantity: 0,
                                                        maxQuantity: Infinity
                                                    }
                                                }
                                            };
                                            var minQuantity = getNumRegion(priceList).minQuantity;
                                            var maxQuantity = getNumRegion(priceList).maxQuantity;
                                            if(!isLogin){
                                                message.refresh({
                                                    title:'温馨提示',
                                                    content: "您尚未登录，请先登录！",
                                                    DOMClick: false,
                                                    confirmBtn: true,
                                                    confirmFun: function () {
                                                        window.location.href = "/login.html?isBack=1";
                                                    }
                                                });
                                                return;
                                            }
                                            if(quantity < minQuantity){
                                                quantity = minQuantity;
                                            }
                                            if(stock<=0){
                                                alertDefault.refresh({content: "当前商品库存不足, 无法加入购物车中！"});
                                                return;
                                            }
                                            else if(minQuantity>stock){
                                                alertDefault.refresh({content:"当前数量已达至商品库存量, 无法加入购物车中！"});
                                                return;
                                            }
                                            var createFunc = function(quantity){
                                                var top = 0;
                                                var left = 0;
                                                var cart = null;
                                                var $header2 = $('body').find('#header-2-1');
                                                var header2Show = $header2.css('display') == 'block';
                                                if(header2Show){
                                                    cart = $('body').find('#header-2-1 .header-iconGroup .shopCart');
                                                    top = cart.offset().top + 10;
                                                    left = cart.offset().left + 10;
                                                }
                                                if(!header2Show){
                                                    cart = $('body').find('#header-1-1 .header-iconGroup .shopCart');
                                                    top = cart.offset().top + 10;
                                                    left = cart.offset().left + 10;
                                                }
                                                var imgtodrag = $item.find(".goodsImg");
                                                var imgclone = imgtodrag.clone();
                                                if (imgclone.length) {
                                                    imgclone.offset({
                                                        top: imgtodrag.offset().top,
                                                        left: imgtodrag.offset().left
                                                    }).css({
                                                        'opacity': '0.5',
                                                        'position': 'absolute',
                                                        'height': '150px',
                                                        'width': '150px',
                                                        'z-index': '99999999'
                                                    }).appendTo($('body')).animate({
                                                        'top': top,
                                                        'left': left,
                                                        'width': 50,
                                                        'height': 50
                                                    }, 1000, 'linear');
                                                    imgclone.animate({
                                                        'width': 0,
                                                        'height': 0
                                                    }, function () {
                                                        $(this).detach();
                                                    });
                                                }
                                                jsModel.send("ORDER_SHOPPINGCART_CREATE", {
                                                    type: obj.type,
                                                    itemId: goodsSpecs.itemId,
                                                    supplierId: obj.supplierId,
                                                    supplierName: obj.supplierName,
                                                    goodsName: obj.customGoodsName,
                                                    goodsImg: goodsFile.path || '',
                                                    quantity: quantity
                                                }).done(function(){
                                                    jsModel.send("ORDER_SHOPPINGCART_COUNT",{})
                                                        .done(function(response){
                                                            if(response && response.success){
                                                                Module['header-1-1'].cartCount = response.obj || 0;
                                                                Module['header-2-1'].cartCount = response.obj || 0;
                                                                alertDefault.refresh({content:'添加成功'});
                                                            }
                                                        });
                                                });
                                            };
                                            jsModel.send("ORDER_SHOPPINGCART_COUNT_ID", {itemId: obj.goodsSpecsList[0].itemId})
                                                .done(function(response){
                                                    if(response && response.success){
                                                        var count = response.obj||0;
                                                        if(maxQuantity != null && maxQuantity !=0){
                                                            if(count>=maxQuantity){
                                                                alertDefault.refresh({content: "当前该商品在购物车中的数量已达到最大购买量, 无法继续加入购物车中！"});
                                                            }else if(quantity+count > maxQuantity){
                                                                var newQuantity = maxQuantity - count;
                                                                message.refresh({
                                                                    title:'购物车数量上限',
                                                                    content: "最大量" + maxQuantity + "件; 已添加:" + count + "件, 可添加" + newQuantity +"件! 是否继续？",
                                                                    DOMClick: false,
                                                                    cancelBtn: true,
                                                                    confirmBtn: true,
                                                                    cancelFun: function () {},
                                                                    confirmFun: function () { createFunc(newQuantity); }
                                                                });
                                                            }else{
                                                                createFunc(quantity);
                                                            }
                                                        }else{
                                                            createFunc(quantity);
                                                        }
                                                    }
                                                    else{
                                                        alertDefault.refresh({content: "查询购物车内该商品数量失败！"});
                                                    }
                                                })
                                                .fail(function(){
                                                    alertDefault.refresh({content: "网络信号弱，请刷新重试"});
                                                });
                                        }
                                    });
                                }
                                else if(toUrl) {
                                    alertDefault.refresh({
                                        content: "该商品含有多个规格，正前往商品详情页面中！",
                                        evFunc: function(){ window.location.href = toUrl; }
                                    });
                                }
                            },
                            getTags: function(list){
                                var tags = [];
                                var goodsTagList = [];
                                $.each(list||[], function(index, obj){
                                    $.each(obj.tagList||[], function(i, o){
                                        goodsTagList.push(o);
                                    });
                                });
                                $.each(goodsTagList||[], function(i, o){
                                    switch (o.tagName) {
                                        case '必选': $.inArray('icon_tag1', tags) === -1 && tags.push("icon_tag1"); break;
                                        case '爆款': $.inArray('icon_tag2', tags) === -1 && tags.push("icon_tag2"); break;
                                        case '热销': $.inArray('icon_tag3', tags) === -1 && tags.push("icon_tag3"); break;
                                        case '优选': $.inArray('icon_tag4', tags) === -1 && tags.push("icon_tag4"); break;
                                    }
                                });
                                return tags;
                            }
                        },
                        beforeCreate:function(){
                        },
                        created: function(){

                        },
                        mounted: function(){
                            var that = this;
                            if(popState){
                                popState.useStorage = "yes";
                                jsUtil.url.setParam(popState, "cover", {code: "search"});
                                jsUtil.history.redirectHandle("search", function(){
                                    var priceMin =         jsUtil.url.getParam('priceMin');
                                    var priceMax =         jsUtil.url.getParam('priceMax');
                                    var priceAreaMin =     jsUtil.url.getParam('priceAreaMin');
                                    var priceAreaMax =     jsUtil.url.getParam('priceAreaMax');
                                    var sortType =         jsUtil.url.getParam("sortType") || "1";
                                    var screenType =       jsUtil.url.getParam("screenType") || "1";
                                    var numPerPage =       jsUtil.url.getParam('numPerPage') || "16";
                                    var currentPage =      jsUtil.url.getParam('currentPage') || "1";
                                    var filterCategory =   jsUtil.url.getParam("filterCategory");
                                    var firstCategory  =   jsUtil.url.getParam("firstCategory");
                                    var secondCategory  =  jsUtil.url.getParam("secondCategory");
                                    var thirdCategory =    jsUtil.url.getParam("thirdCategory");
                                    var categoryName =     jsUtil.url.getParam("categoryName");
                                    var dictName =         jsUtil.url.getParam("dictName");
                                    var entryName =        jsUtil.url.getParam("entryName");
                                    var goodsName =        jsUtil.url.getParam("goodsName");
                                    var upShelves =        jsUtil.url.getParam("upShelves");
                                    var useStorage =       jsUtil.url.getParam("useStorage");
                                    var category =         jsUtil.url.getParam("category");
                                    var origin =           jsUtil.url.getParam("origin");
                                    var brand =            jsUtil.url.getParam('brand');
                                    var type =             jsUtil.url.getParam("type");
                                    var tag =              jsUtil.url.getParam("tag");
                                    var brandpys =         useStorage === 'yes' && (JSON.parse(window.localStorage.getItem("brandpys"))||{});
                                    var origins =          useStorage === 'yes' && (JSON.parse(window.localStorage.getItem("origins"))||[]);
                                    var brands =           useStorage === 'yes' && (JSON.parse(window.localStorage.getItem("brands"))||[]);
                                    var locationId =       [];
                                    var locations =        [];
                                    var popState =         {};
                                    var search =           {};
                                    var status =           1;
                                    var tPriceAreaMin =    "";
                                    var tPriceAreaMax =    "";

                                    if(categoryName){
                                        locations.push(categoryName);
                                        locationId.push(firstCategory);
                                    }
                                    if(dictName){
                                        locations.push(dictName);
                                        locationId.push(secondCategory);
                                    }
                                    if(entryName){
                                        locations.push(entryName);
                                        locationId.push(thirdCategory);
                                    }
                                    if(goodsName){
                                        locations.push(goodsName);
                                    }

                                    if(firstCategory){
                                        search.firstCategory= firstCategory;
                                        popState.firstCategory= firstCategory;
                                    }
                                    if(secondCategory){
                                        search.secondCategory= secondCategory;
                                        popState.secondCategory= secondCategory;
                                    }
                                    if(thirdCategory){
                                        search.thirdCategory= thirdCategory;
                                        popState.thirdCategory= thirdCategory;
                                    }
                                    if(goodsName){
                                        search.goodsName = goodsName;
                                        popState.goodsName = goodsName;
                                    }

                                    switch (tag) {
                                        case '新品推荐':       screenType = 2; break;
                                        case '热销榜单':       screenType = 3; break;
                                        case '一般贸易(包邮)':  screenType = 4; break;
                                        case '明星同款':       screenType = 5; break;
                                    }
                                    switch (sortType) {
                                        case "1":
                                            delete search["sortList[0].sortField"];
                                            delete search["sortList[0].sortRule"];
                                            break;
                                        case "2":
                                            search["sortList[0].sortField"] = "create_time";
                                            search["sortList[0].sortRule"] = "desc";
                                            break;
                                        case "3":
                                            search["sortList[0].sortField"] = "price";
                                            search["sortList[0].sortRule"] = "desc";
                                            break;
                                        case "4":
                                            search["sortList[0].sortField"] = "price";
                                            search["sortList[0].sortRule"] = "asc";
                                            break;
                                    }

                                    if(tag !== undefined && tag !== ""){
                                        search.tag = tag;
                                        popState.tag = tag;
                                    }
                                    if(type !== undefined && type !== ""){
                                        search.type = type;
                                        popState.type = type;
                                    }
                                    if(origin !== undefined && origin !== ""){
                                        search.origin = origin;
                                        popState.origin = origin;
                                    }
                                    if(brand !== undefined && brand !== ""){
                                        search.brand = brand;
                                        popState.brand = brand;
                                    }
                                    if(sortType !== undefined && sortType !== ""){
                                        popState.sortType = sortType;
                                    }
                                    if(screenType !== undefined && screenType !== ""){
                                        popState.screenType = screenType;
                                    }
                                    if(upShelves !== undefined && upShelves !== ""){
                                        search.upShelves = upShelves;
                                        popState.upShelves = upShelves;
                                    }
                                    if(priceMin !== undefined && priceMin !== ""){
                                        search.priceMin = priceMin || 0;
                                        popState.priceMin = priceMin || 0;
                                    }
                                    if(priceMax !== undefined && priceMax !== ""){
                                        search.priceMax = priceMax || 100000000;
                                        popState.priceMax = priceMax || 100000000;
                                    }
                                    if(priceAreaMin !== undefined && priceAreaMin !== ""){
                                        tPriceAreaMin = priceAreaMin*1;
                                        tPriceAreaMax = priceAreaMax*1;
                                        priceAreaMin = (priceAreaMax && tPriceAreaMin > tPriceAreaMax)? '' + tPriceAreaMax: '' + tPriceAreaMin;
                                        popState.priceAreaMin = priceAreaMin;
                                    }
                                    if(priceAreaMax !== undefined && priceAreaMax !== ""){
                                        tPriceAreaMin = priceAreaMin*1;
                                        tPriceAreaMax = priceAreaMax*1;
                                        priceAreaMax = (priceAreaMin && tPriceAreaMax < tPriceAreaMin)? '' + tPriceAreaMin: '' + tPriceAreaMax;
                                        popState.priceAreaMax = priceAreaMax;
                                    }
                                    if(numPerPage !== undefined && numPerPage !== ""){
                                        search.numPerPage = numPerPage;
                                        popState.numPerPage = numPerPage;
                                    }
                                    if(currentPage !== undefined && currentPage !== ""){
                                        search.currentPage = currentPage;
                                        popState.currentPage = currentPage;
                                    }

                                    that.type =          type;
                                    that.typeName =      type === "0"? "跨境商品": type === "2"? "一般贸易": "";
                                    that.isShow =        isShow;
                                    that.filtrate =      {
                                        brand: [],
                                        origin: [],
                                        brandpy: {},
                                        category: []
                                    };
                                    that.filtrateObj =   {
                                        brand: "",
                                        origin: "",
                                        category: ""
                                    };
                                    that.filtrateShow =  {
                                        brandShow: []
                                    };
                                    that.selectedList =  {
                                        brand:  [],
                                        origin:  [],
                                        category: []
                                    };
                                    that.sortType =      sortType;
                                    that.screenType =    screenType;
                                    that.position =      entryName || goodsName || "所有分类";
                                    that.goodsList =     {};
                                    that.pagination =    {};
                                    that.rootPath =      "所有分类";
                                    that.locations =     locations;
                                    that.locationId =    locationId;
                                    that.isLogin =       isLogin;
                                    that.jumpUrl =       jumpUrl;
                                    that.pathUrl =       pathUrl;
                                    that.request =       search;
                                    that.priceAreaMin =  priceAreaMin;
                                    that.priceAreaMax =  priceAreaMax;

                                    jsModel.send(['GOODS_BASE_QUERY', 'GOODS_NAV_QUERY_NODE'], search, true)
                                        .done(function(response) {
                                            var goodsObj = response['GOODS_BASE_QUERY'] || {};
                                            var categoryObj = response['GOODS_NAV_QUERY_NODE'] && response['GOODS_NAV_QUERY_NODE'].data || {};
                                            var isShow = goodsObj.brand || goodsObj.origin || filterCategory === 'show';
                                            if (!useStorage) {
                                                window.localStorage.setItem("brands", JSON.stringify(goodsObj.brand || []));
                                                window.localStorage.setItem("origins", JSON.stringify(goodsObj.origin || []));
                                                window.localStorage.setItem("brandpys", JSON.stringify(goodsObj.brandpy || {}));
                                            }
                                            that.isShow =        isShow;
                                            that.filtrate =      {
                                                brand: brands || goodsObj.brand || [],
                                                origin: origins || goodsObj.origin || [],
                                                brandpy: brandpys || goodsObj.brandpy || {},
                                                category: (function(){
                                                    var list = [];
                                                    if (filterCategory === 'show') {
                                                        $.each(categoryObj, function(index, obj){
                                                            list.push({ name: obj.industryName })
                                                        });
                                                    }
                                                    return list;
                                                })()
                                            };
                                            that.filtrateObj =   {
                                                brand: brand? "品牌:" + brand: "",
                                                origin: origin? "产地:" + origin: "",
                                                category: category? "分类:" + category: ""
                                            };
                                            that.filtrateShow =  {
                                                brandShow: brands || goodsObj.brand || []
                                            };
                                            that.selectedList =  {
                                                brand:  brand && brand.split(",") || [],
                                                origin: origin && origin.split(",") || [],
                                                category: category && category.split(",") || []
                                            };
                                            that.goodsList =  goodsObj.goodsList || {};
                                            that.pagination = goodsObj.pagination || {};
                                            $("html,body").animate({scrollTop: 0}, 150);
                                        });
                                });
                            }
                            $(element).on("click", ".searchLocation-name [index]", function(e){
                                var ev = e || window.event;
                                var $node = $(ev.currentTarget);
                                var index = $node.attr("index");
                                var length = $node.parent().find("span").length;
                                if(index==="0" && (index*1)!==(length-2)){
                                    var firstCategory = $node.attr("firstCategory");
                                    var categoryName = $node.attr("categoryName");
                                    window.location.href = encodeURI("/search.html?categoryName="+categoryName+"&firstCategory="+firstCategory);
                                }
                                if(index==="1" && (index*1)!==(length-2)){
                                    var firstCategory = $node.attr("firstCategory");
                                    var secondCategory = $node.attr("secondCategory");
                                    var categoryName = $node.attr("categoryName");
                                    var dictName = $node.attr("dictName");
                                    window.location.href = encodeURI("/search.html?categoryName="+categoryName+"&dictName="+dictName+"&secondCategory="+secondCategory+"&firstCategory="+firstCategory);
                                }
                                if(index==="2" && (index*1)!==(length-2)){
                                    var firstCategory = $node.attr("firstCategory");
                                    var secondCategory = $node.attr("secondCategory");
                                    var thirdCategory = $node.attr("thirdCategory");
                                    var categoryName = $node.attr("categoryName");
                                    var dictName = $node.attr("dictName");
                                    var entryName = $node.attr("entryName");
                                    window.location.href = encodeURI("/search.html?categoryName="+categoryName+"&dictName="+dictName+"&entryName="+entryName+"&thirdCategory="+thirdCategory+"&secondCategory="+secondCategory+"&firstCategory="+firstCategory);
                                }
                            });
                            $(element).on("click", ".list-item-header > span", function(e){
                                var ev = e || window.event;
                                var $node = $(ev.currentTarget);
                                var $parent = $node.parent();
                                var $itemList = $node.parents('.list-item');
                                var brands = that.request.brand && that.request.brand.split(",") || [];
                                var origins = that.request.origin && that.request.origin.split(",") || [];
                                var $other = $node.parents('.searchFiltrate-list').find('.list-item').not($itemList);
                                $other.find('.list-item-header > i').html('多选');
                                $other.find('.list-item-header > span > b').attr('class', 'fa fa-angle-down fa-fw');
                                $other.find('.list-item-header > span > b').attr('data-class', 'fa fa-angle-up fa-fw');
                                $other.find('.list-item-body').removeClass('active show').find(".typeLetter").hide();
                                $other.find(".list-item-body .typeList").css("overflow-y", "hidden");
                                $other.find('[data-status]').attr("data-status", 'hide');
                                if($node.next().attr('data-status') === 'hide'){
                                    if (!$parent.next().hasClass('active')) {
                                        $parent.next().find('>.typeList').css("overflow-y", "auto");
                                        $parent.next().find('>.typeLetter').show();
                                        $parent.next().addClass('active');
                                        $node.attr('data-status','show');
                                    }
                                    else {
                                        $parent.next().find('>.typeList').css("overflow-y", "hidden");
                                        $parent.next().find('>.typeLetter').hide();
                                        $parent.next().removeClass('active');
                                        $node.attr('data-status','hide');
                                    }
                                    var oldClass = $node.find('>*:last-child').attr('class');
                                    var newClass = $node.find('>*:last-child').attr('data-class');
                                    $node.find('>*:last-child').attr('class',newClass);
                                    $node.find('>*:last-child').attr('data-class',oldClass);
                                    that.selectedList.brand = $.extend(true, [], brands);
                                    that.selectedList.origin = $.extend(true, [], origins);
                                }
                            });
                            $(element).on("click", ".list-item-header > i", function(e){
                                var ev = e || window.event;
                                var $node = $(ev.currentTarget);
                                var $parent = $(ev.currentTarget).parent();
                                var $itemList = $node.parents('.list-item');
                                var $searchFiltrate = $node.parents('.searchFiltrate-list');
                                var $itemLists = $searchFiltrate.find('.list-item');
                                var $other = $itemLists.not($itemList);
                                var brands = that.request.brand && that.request.brand.split(",") || [];
                                var origins = that.request.origin && that.request.origin.split(",") || [];
                                $other.find('.list-item-header > i').html('多选');
                                $other.find('.list-item-header > i[data-status]').attr("data-status", 'hide');
                                $other.find(".list-item-body .typeLetter").hide();
                                $other.find('.list-item-body').removeClass('active show');
                                $other.find(".list-item-body .typeList").css("overflow-y", "hidden");
                                $itemLists.find('span[data-status]').attr("data-status", 'hide');
                                $itemLists.find('span[data-status] > b').attr("class", 'fa fa-angle-down fa-fw');
                                $itemLists.find('span[data-status] > b').attr("data-class", 'fa fa-angle-up fa-fw');
                                if ($node.attr("data-status") === "show") {
                                    $parent.next().find('>.typeList').css("overflow-y", "hidden");
                                    $parent.next().find('>.typeLetter').hide();
                                    $parent.next().removeClass('active show');
                                    $node.attr('data-status','hide');
                                    $node.html('多选');
                                }
                                else if ($node.attr("data-status") === "hide") {
                                    $parent.next().find('>.typeList').css("overflow-y", "auto");
                                    $parent.next().find('>.typeLetter').show();
                                    $parent.next().addClass('active show');
                                    $node.attr('data-status','show');
                                    $node.html('收起');
                                }
                                that.selectedList.brand = $.extend(true, [], brands);
                                that.selectedList.origin = $.extend(true, [], origins);
                            });
                        }
                    });
                })
        }
        if ((/^orderSure-1-\d+$/).test(role)) {
            var message = Module['message-1-1'];
            var alertDefault = Module['alertDefault-1-1'];
            var ordersInfo = JSON.parse(window.localStorage.getItem("ordersInfo")||"{}");
            Module[role] = new Vue({
                el: element,
                data: {
                    rootPath: '订单确认界面',
                    locations: [],
                    addressList: [],
                    isClick: false,
                    alertInfo: null,
                    orders: ordersInfo,
                    eShowDiscount: { //优惠券 暂时不用
                        unSuperposition: {},
                        superposition: {}
                    },
                    select: '',
                    setDefault: 1
                },
                beforeCreate: function () {
                    var that = this;
                    jsModel.send('USER_ADDRESS_QUERY', {
                        alertInfo: null
                    }).done(function (response) {
                        if (response && response.success) {
                            that.addressList = response.obj;
                            $.each(response.obj, function (n1, o1) {
                                if (o1.setDefault == 1) {
                                    that.select = o1;
                                }
                            });
                            that.queryPostFee();
                            that.setTotalTax();
                            that.setTotalPostFee();
                            that.setTotalPrice();
                        }
                    });
                },
                created: function(){
                    var orders = this.orders || {};
                    $.each(orders.typeObj||{}, function(n1, o1){
                        $.each(o1||{}, function(n2, o2){
                            Vue.set(o2, "submitState", o2.submitState == null? true: o2.submitState);
                            Vue.set(o2, "submitText", o2.submitText == null? "提交订单": o2.submitText);
                        })
                    })
                },
                methods: {
                    addElementClass: function (index) {
                        if (this.addressList[index].setDefault == 1) {
                            return 'active default';
                        } else {
                            return '';
                        }
                    },
                    addClass: function () {
                        if (this.isClick) {
                            return 'active';
                        } else {
                            return '';
                        }
                    },
                    returnSupplierName: function (supplierName) {
                        var returnVal = "";
                        switch (supplierName) {
                            case "天天仓":
                                returnVal = '保税TT仓';
                                break;
                            case "粮油仓":
                                returnVal = '保税LY仓';
                                break;
                            case "行云仓":
                                returnVal = '保税XY仓';
                                break;
                            case "富邦仓":
                                returnVal = '保税FB仓';
                                break;
                            default:
                                returnVal = supplierName;
                        }
                        return returnVal;
                    },
                    returnTotalPrice: function (price, realPrice, quantity) {
                        var tQuantity = parseFloat(quantity != undefined ? quantity : 0);
                        var tPrice = parseFloat(price != undefined ? price : 0);
                        var tRealPrice = parseFloat(realPrice != undefined ? realPrice : price);
                        return ((tRealPrice < tPrice ? tRealPrice : tPrice) * tQuantity).toFixed(2);
                    },
                    returnPrice1: function (price) {
                        var tPrice = parseFloat(price != undefined ? price : 0);
                        return tPrice.toFixed(2);
                    },
                    returnPrice2: function (price, realPrice) {
                        var tPrice = parseFloat(price != undefined ? price : 0);
                        var tRealPrice = parseFloat(realPrice != undefined ? realPrice : price);
                        return tRealPrice < tPrice ? '￥' + tPrice.toFixed(2) : null;
                    },
                    isHaveStyle: function (price, realPrice) {
                        var tPrice = parseFloat(price != undefined ? price : 0);
                        var tRealPrice = parseFloat(realPrice != undefined ? realPrice : price);
                        return tRealPrice >= tPrice ? 0 : 1;
                    },
                    returnSelect: function (unSuperposition, couponId) {
                        return unSuperposition.choose == couponId ? 'selected' : '';
                    },
                    returnDisabled: function (unSuperposition, couponId, choose) {
                        var isDisabled = '';
                        $.each(unSuperposition.chooseArr, function (index, id) {
                            if (id == couponId && id != choose) {
                                isDisabled = 'disabled';
                            }
                        });
                        return isDisabled;
                    },
                    setTotalPrice: function () {
                        var that = this;
                        var totalOrderVal = 0;
                        var orders = that.orders;
                        $.each(orders.typeObj, function (n1, o1) {
                            $.each(o1, function (n2, o2) {
                                var orderVal = o2.taxFee * 1 + o2.supplierRealPrice * 1 + o2.postFee * 1;
                                var minusPrice = that.orders.typeObj[n1][n2].minusPrice || 0;
                                orderVal = orderVal - minusPrice;
                                that.orders.typeObj[n1][n2].orderPrice = (orderVal * 1).toFixed(2);
                                totalOrderVal += o2.taxFee * 1 + o2.supplierRealPrice * 1 + o2.postFee * 1;
                            })
                        });
                    },
                    setTotalPostFee: function () {
                        var that = this;
                        var postFee = 0;
                        var orders = that.orders;
                        $.each(orders.typeObj, function (n1, o1) {
                            $.each(o1, function (n2, o2) {
                                postFee += o2.postFee || 0;
                            })
                        });
                    },
                    setTotalTax: function () {
                        var that = this;
                        var totalTaxFee = 0;
                        var orders = that.orders;
                        $.each(orders.typeObj, function (n1, o1) {
                            $.each(o1, function (n2, o2) {
                                var taxFee = 0;
                                var taxFee2 = 0;
                                var postFee = o2.postFee;
                                var supplierPrice = o2.supplierPrice;
                                $.each(o2.itemObj, function (n3, o3) {
                                    if (o3.freeTax == 0 && o2.type == 0) {
                                        var tPrice = (o3.quantity || 0) * (o3.price || 0);
                                        var tPostFee = (tPrice / supplierPrice) * postFee;
                                        var tExciseTaxFee = (tPrice + tPostFee) / (1 - o3.exciseTax) * o3.exciseTax;
                                        var tIncrementTaxFee = (tPrice + tPostFee + tExciseTaxFee) * o3.incrementTax;
                                        taxFee += ((tExciseTaxFee + tIncrementTaxFee) * 0.7).toFixed(3) * 1;
                                        taxFee2 += ((tExciseTaxFee + tIncrementTaxFee) * 0.7) * 1;
                                    }
                                });
                                that.orders.typeObj[n1][n2].taxFee = taxFee2.toFixed(2) * 1;
                                totalTaxFee += taxFee2 * 1;
                            });
                        });
                    },
                    queryPostFee: function () {
                        var that = this;
                        var options = [];
                        var typeObj = {};
                        var select = that.select;
                        var orders = that.orders || {};
                        var province = select && select.province;
                        $.each(orders.typeObj, function(n1, o1){
                            if(n1 === '0'){
                                $.each(o1, function(n2, o2){
                                    var supplierPrice =  o2.supplierPrice;
                                    var supplierWeight =  o2.supplierWeight;
                                    $.each(o2.itemObj,function(n3, o3){
                                        if(o3.freePost == 0){
                                            typeObj[n2] = n1;
                                            if(province && supplierPrice && supplierWeight){
                                                options.push({
                                                    "centerId":   centerId,
                                                    "supplierId": n2,
                                                    "province":   province,
                                                    "weight":     supplierWeight,
                                                    "price":      supplierPrice
                                                })
                                            }
                                        }
                                    });
                                })
                            }
                        });
                        if(options && options.length > 0) {
                            jsModel.send("ORDER_USER_POSTFEE", {data: encodeURI(JSON.stringify(options))}).done(function (response) {
                                if (response && response.success) {
                                    $.each(response.obj, function (index, obj) {
                                        var supplierId = obj.supplierId;
                                        var type = typeObj[supplierId];
                                        orders.typeObj[type][supplierId].postFee = obj.postFee || 0;
                                        that.setTotalTax();
                                        that.setTotalPostFee();
                                        that.setTotalPrice();
                                    })
                                }
                            });
                        }
                    },
                    showMore: function () {
                        var isShow = !this.isClick;
                        this.isClick = isShow;
                    },
                    editAddress: function(e) {
                        var that = this;
                        var dataObj = null;
                        var $this = $(e.currentTarget);
                        var response = that.addressList;
                        var id = $this.parents(".address-item").attr("addressId");
                        $.each(response, function (index, obj) {
                            if (obj.id == id) { dataObj = obj; }
                        });
                        if (dataObj) {
                            that.alertInfo = dataObj;
                            that.$nextTick(function () {
                                $(that.$el).find(".picker-country").picker();
                            });
                            $("body").css({"overflow": "hidden"});
                        }
                    },
                    addNewAddress: function () {
                        var that = this;
                        that.alertInfo = {
                            address: "",
                            area: "",
                            city: "",
                            province: "",
                            receiveName: "",
                            receivePhone: "",
                            zipCode: "",
                            setDefault: 1
                        };
                        that.$nextTick(function () {
                            $(that.$el).find(".picker-country").picker();
                        });
                        $("body").css({"overflow": "hidden"});
                    },
                    saveAddress: function () {
                        var that = this;
                        var addressList = that.addressList;
                        var address = that.alertInfo;
                        var idArr = [];
                        var id = address.id;
                        var isNext = true;
                        var pVal = $('.picker-province');
                        var cVal = $('.picker-city');
                        var aVal = $('.picker-area');
                        if (pVal.attr('data-name') === "---- 所在省 ----") {
                            isNext = false;
                            pVal.addClass('state_error');
                        }
                        else {
                            pVal.removeClass('state_error');
                        }
                        if ($('.picker-city').find("option").length > 1 && cVal.attr('data-name') === "---- 所在市 ----") {
                            isNext = false;
                            cVal.addClass('state_error');
                        } else {
                            cVal.removeClass('state_error');
                        }
                        if ($('.picker-area').find("option").length > 1 && aVal.attr('data-name') === "---- 所在区 ----") {
                            isNext = false;
                            aVal.addClass('state_error');
                        } else {
                            aVal.removeClass('state_error');
                        }
                        if (!address.address || address.address == '') {
                            isNext = false;
                            $('.address_state').addClass('state_error');
                        } else {
                            $('.address_state').removeClass('state_error');
                        }
                        if (address.zipCode == '' || !/[0-9]{1}(\d){5}/gi.test(address.zipCode)) {
                            isNext = false;
                            $('.zipCode_state').addClass('state_error');
                        } else {
                            $('.zipCode_state').removeClass('state_error');
                        }
                        if (!address.receiveName || address.receiveName == '') {
                            isNext = false;
                            $('.receiveName_state').addClass('state_error');
                        } else {
                            $('.receiveName_state').removeClass('state_error');
                        }
                        if (address.receivePhone == '' || !/^1(3|4|5|7|8)\d{9}$/g.test(address.receivePhone)) {
                            isNext = false;
                            $('.receivePhone_state').addClass('state_error');
                        } else {
                            $('.receivePhone_state').removeClass('state_error');
                        }
                        if (isNext) {
                            $.each(list, function (index, obj) {
                                idArr.push(obj.id);
                            });
                            if (id) {
                                address.city === "---- 所在市 ----" && (address.city = "");
                                address.area === "---- 所在区 ----" && (address.area = "");
                                jsModel.send("USER_ADDRESS_UPDATE", address)
                                    .done(function () {
                                        $("body").css({"overflow": "visible"});
                                        that.alertInfo = null;
                                        $.each(addressList, function (index, obj) {
                                            if (obj.id == id) {
                                                that.addressList[index] = address;
                                            }
                                        });
                                    })
                            }
                            else {
                                address.city === "---- 所在市 ----" && (address.city = "");
                                address.area === "---- 所在区 ----" && (address.area = "");
                                jsModel.send("USER_ADDRESS_CREATE", address)
                                    .done(function () {
                                        $("body").css({"overflow": "visible"});
                                        that.alertInfo = null;
                                        jsModel.send('USER_ADDRESS_QUERY', {
                                            alertInfo: null
                                        }).done(function (response) {
                                            if (response && response.success) {
                                                that.select = null;
                                                that.addressList = response.obj || [];
                                                $.each(that.addressList, function (n1, o1) {
                                                    if (o1.setDefault == 1) {
                                                        that.select = o1;
                                                    }
                                                });
                                                that.select = that.select || that.addressList[0] || {};
                                                that.queryPostFee();
                                                that.setTotalTax();
                                                that.setTotalPostFee();
                                                that.setTotalPrice();
                                            }
                                        });
                                    })
                            }
                        }
                    },
                    closeAlertAddress: function () {
                        this.alertInfo = null;
                        $("body").css({"overflow": "auto"});
                    },
                    submitOrder: function (e) {
                        var ev = e || window.event;
                        var $node = $(ev.currentTarget);
                        var crossOrderMaxPrice = jsData.platform.rule.crossOrder.maxPrice;
                        var normalOrderMinPrice = jsData.platform.rule.normalOrder.minPrice;
                        if (!$node.hasClass('error_state')) {
                            var that = this;
                            var rOrders = that.orders;
                            var $element = $(that.$el);
                            var typeId = $node.attr("typeId");
                            var supplierId = $node.attr("supplierId");
                            var redirect = window.location.href.split("#")[0];
                            var rOrder = rOrders.typeObj[typeId][supplierId];
                            var remark = $element.find('.component-orderSure-detail-leavingMessage input').val() || '';
                            var rAddress = that.select;
                            var selectAddress = that.select;
                            var orderFlag = $node.attr('typeId');
                            var tmp = window.open("about:blank");
                            var tagFun = 0;

                            var orderAddress = {
                                receiveName: selectAddress.receiveName,
                                receivePhone: selectAddress.receivePhone,
                                receiveProvince: selectAddress.province,
                                receiveCity: selectAddress.city,
                                receiveArea: selectAddress.area,
                                receiveAddress: selectAddress.address,
                                receiveZipCode: selectAddress.zipCode
                            };

                            rOrders.typeObj[typeId][supplierId].submitState = false;
                            rOrders.typeObj[typeId][supplierId].submitText = "订单提交中";

                            jsModel.send("USER_DETAIL_QUERY")
                                .done(function (response) {
                                    if (!response || !response.success) {
                                        window.location.href = "/personal.html?childType=userInfo&form=Upper";
                                    }
                                    else if ($.isPlainObject(response.obj)) {
                                        if ((orderFlag !== 0 && orderFlag !== "0") || $.isPlainObject(response.obj.userDetail)) {
                                            if ((orderFlag !== 0 && orderFlag !== "0") || response.obj.userDetail.idNum) {
                                                var idsArr = [];
                                                var orderDetail = $.extend({}, orderAddress);
                                                var orderGoodsList = [];
                                                var tdq = 0;
                                                var payType = $element.find("li[payType].active").attr("payType") || 1;
                                                var type = payType == 3? "07" : (payType == 1? "NATIVE" : "scanCode");
                                                var noStockState = false;
                                                var noStockName = false;

                                                orderDetail.payType = payType;
                                                orderDetail.taxFee = rOrder.taxFee;
                                                orderDetail.postFee = rOrder.postFee;
                                                orderDetail.payment = (rOrder.postFee * 1 + rOrder.taxFee * 1 + rOrder.supplierRealPrice * 1).toFixed(2);

                                                $.each(rOrder.itemObj, function (n3, o3) {
                                                    if (o3.ids) {
                                                        idsArr.push(o3.ids);
                                                    }
                                                    orderGoodsList.push({
                                                        itemId: o3.itemId,
                                                        goodsId: o3.goodsId,
                                                        itemCode: o3.itemCode,
                                                        itemName: o3.itemName,
                                                        itemImg: o3.itemImg,
                                                        itemInfo: o3.info,
                                                        itemQuantity: o3.quantity,
                                                        itemPrice: o3.price,
                                                        actualPrice: o3.realPrice,
                                                        sku: o3.sku
                                                    });
                                                    if (!o3.stock || o3.stock <= 0) {
                                                        noStockState = true;
                                                        noStockName = o3.goodsName;
                                                        return false;
                                                    }
                                                    tagFun = o3.tagFunId || 0;
                                                    tdq++;
                                                });

                                                if (noStockState) {
                                                    message.refresh({
                                                        title: '库存不足',
                                                        content: "该订单" + noStockName + "商品库存不足，是否返回上页调整？",
                                                        DOMClick: false,
                                                        cancelBtn: true,
                                                        confirmBtn: true,
                                                        cancelFun: function(){
                                                            rOrders.typeObj[typeId][supplierId].submitState = true;
                                                            rOrders.typeObj[typeId][supplierId].submitText = "提交订单";
                                                        },
                                                        confirmFun: function(){
                                                            jsUtil.url.jumpPage(jumpUrl, null, true);
                                                        }
                                                    });
                                                    return;
                                                }

                                                var options = {
                                                    type: type,
                                                    payType: payType,
                                                    orderFlag: orderFlag,
                                                    expressType: 0,
                                                    orderSource: 0,
                                                    supplierId: supplierId,
                                                    orderDetail: orderDetail,
                                                    orderGoodsList: orderGoodsList,
                                                    createType: tagFun === 1? 4: 0,
                                                    redirect: redirect,
                                                    tagFun:  tagFun,
                                                    remark: remark,
                                                    tdq: tdq
                                                };
                                                var couponId = $node.parent().prev().find('option:selected').val();
                                                var deductiblevalue = $node.parent().prev().find('option:selected').attr('deductiblevalue');
                                                var sendOrder = function () {
                                                    jsModel.send("ORDER_USER_CREATE", options)
                                                        .done(function (response) {
                                                            if (payType == 1) {
                                                                if (response && response.success) {
                                                                    rOrders.orderCount--;
                                                                    rOrders.typeObj[typeId][supplierId].submitState = false;
                                                                    rOrders.typeObj[typeId][supplierId].submitText = "已提交订单";
                                                                    window.localStorage.setItem('ordersInfo', JSON.stringify(rOrders));
                                                                    var content = response.obj.urlCode;
                                                                    if (idsArr.join(",")) {
                                                                        jsModel.send("ORDER_SHOPPINGCART_DELETE", {
                                                                            ids: idsArr.join(",")
                                                                        }).done(function () {
                                                                            if (content) {
                                                                                tmp.focus();
                                                                                tmp.location.href = '/pay.html';
                                                                                var sendToPay = {};
                                                                                var nameHtml = '';
                                                                                sendToPay.orderPrice = rOrder.orderPrice;
                                                                                sendToPay.orderId = response.errorMsg;
                                                                                sendToPay.info = rAddress.province + ',' + rAddress.city + ',' + rAddress.area + ',' + rAddress.address + ',' + rAddress.receiveName + ',手机号码：' + rAddress.receivePhone;
                                                                                $.each(rOrder.itemObj, function (key, obj) {
                                                                                    nameHtml += obj.itemName + ' * ' + obj.quantity;
                                                                                    sendToPay.supplierName = obj.supplierName;
                                                                                });
                                                                                sendToPay.name = nameHtml;
                                                                                sendToPay.url = content;
                                                                                sendToPay = JSON.stringify(sendToPay);
                                                                                window.localStorage.removeItem('sendToAliPay');
                                                                                window.localStorage.removeItem('sendToYinLian');
                                                                                window.localStorage.setItem('sendToPay', sendToPay);
                                                                                message.refresh({
                                                                                    title: '温馨提示',
                                                                                    content: '支付申请已提交，请确认！',
                                                                                    DOMClick: false,
                                                                                    confirmFun: function () {
                                                                                        if (rOrders.orderCount <= 0) {
                                                                                            Vue.delete(rOrders, "orderCount");
                                                                                            window.location.replace('/personal.html?childType=order');
                                                                                        }
                                                                                        else {
                                                                                            Vue.delete(rOrders.typeObj[typeId], supplierId);
                                                                                            if ($.isEmptyObject(rOrders.typeObj[typeId])) {
                                                                                                Vue.delete(rOrders.typeObj, typeId);
                                                                                            }
                                                                                            if ($.isEmptyObject(rOrders.typeObj)) {
                                                                                                Vue.delete(rOrders, "typeObj");
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                });
                                                                            }
                                                                            else if (response.errorMsg) {
                                                                                tmp.focus();
                                                                                tmp.close();
                                                                                message.refresh({
                                                                                    title: '温馨提示',
                                                                                    content: response.errorMsg,
                                                                                    DOMClick: false,
                                                                                    confirmFun: function () {}
                                                                                });
                                                                            }
                                                                            else {
                                                                                tmp.focus();
                                                                                tmp.close();
                                                                                alertDefault.content = '当前二维码获取失败！';
                                                                            }
                                                                        });

                                                                    }
                                                                    else {
                                                                        if (content) {
                                                                            var sendToPay = {};
                                                                            var nameHtml = '';
                                                                            sendToPay.orderPrice = rOrder.orderPrice;
                                                                            sendToPay.orderId = response.errorMsg;
                                                                            sendToPay.info = rAddress.province + ',' + rAddress.city + ',' + rAddress.area + ',' + rAddress.address + ',' + rAddress.receiveName + ',手机号码：' + rAddress.receivePhone;
                                                                            $.each(rOrder.itemObj, function (key, obj) {
                                                                                nameHtml += obj.itemName + ' * ' + obj.quantity;
                                                                                sendToPay.supplierName = obj.supplierName;
                                                                            });
                                                                            sendToPay.name = nameHtml;
                                                                            sendToPay.url = content;
                                                                            sendToPay = JSON.stringify(sendToPay);
                                                                            window.localStorage.removeItem('sendToAliPay');
                                                                            window.localStorage.removeItem('sendToYinLian');
                                                                            window.localStorage.setItem('sendToPay', sendToPay);
                                                                            tmp.focus();
                                                                            tmp.location.href = '/pay.html';
                                                                            message.refresh({
                                                                                title: '温馨提示',
                                                                                content: '支付申请已提交，请确认！',
                                                                                DOMClick: false,
                                                                                confirmFun: function () {
                                                                                    if (rOrders.orderCount <= 0) {
                                                                                        Vue.delete(rOrders, "orderCount");
                                                                                        window.location.replace('/personal.html?childType=order');
                                                                                    }
                                                                                    else {
                                                                                        Vue.delete(rOrders.typeObj[typeId], supplierId);
                                                                                        if ($.isEmptyObject(rOrders.typeObj[typeId])) {
                                                                                            Vue.delete(rOrders.typeObj, typeId);
                                                                                        }
                                                                                        if ($.isEmptyObject(rOrders.typeObj)) {
                                                                                            Vue.delete(rOrders, "typeObj");
                                                                                        }
                                                                                    }
                                                                                }
                                                                            });
                                                                        }
                                                                        else if (response.errorMsg) {
                                                                            tmp.focus();
                                                                            tmp.close();
                                                                            message.refresh({
                                                                                title: '温馨提示',
                                                                                content: response.errorMsg,
                                                                                DOMClick: false,
                                                                                confirmFun: function () {
                                                                                }
                                                                            });
                                                                        }
                                                                        else {
                                                                            tmp.focus();
                                                                            tmp.close();
                                                                            message.refresh({
                                                                                title: '温馨提示',
                                                                                content: response.errorMsg,
                                                                                DOMClick: false,
                                                                                confirmFun: function () {
                                                                                }
                                                                            });
                                                                        }
                                                                    }
                                                                }
                                                                else {
                                                                    tmp.focus();
                                                                    tmp.close();
                                                                    if (response.errorMsg) {
                                                                        message.refresh({
                                                                            title: '温馨提示',
                                                                            content: response.errorMsg,
                                                                            DOMClick: false,
                                                                            confirmFun: function () {
                                                                            }
                                                                        });
                                                                    }
                                                                    else {
                                                                        alertDefault.content = '当前二维码获取失败！';
                                                                    }
                                                                    rOrders.typeObj[typeId][supplierId].submitState = true;
                                                                    rOrders.typeObj[typeId][supplierId].submitText = "重新提交";
                                                                }
                                                            }
                                                            else if (payType == 2) {
                                                                if (response && response.success) {
                                                                    rOrders.orderCount--;
                                                                    rOrders.typeObj[typeId][supplierId].submitState = false;
                                                                    rOrders.typeObj[typeId][supplierId].submitText = "已提交订单";
                                                                    window.localStorage.setItem('ordersInfo', JSON.stringify(rOrders));
                                                                    if (idsArr.join(",")) {
                                                                        jsModel.send("ORDER_SHOPPINGCART_DELETE", {
                                                                            ids: idsArr.join(",")
                                                                        }).done(function () {
                                                                            var theObj = typeof response.obj === "string"? response.obj: JSON.stringify(response.obj);
                                                                            window.localStorage.setItem('sendToAliPay', theObj);
                                                                            window.localStorage.removeItem('sendToYinLian');
                                                                            window.localStorage.removeItem('sendToPay');
                                                                            tmp.focus();
                                                                            tmp.location.href = '/pay.html';
                                                                            message.refresh({
                                                                                title: '温馨提示',
                                                                                content: '支付申请已提交，请确认！',
                                                                                DOMClick: false,
                                                                                confirmFun: function () {
                                                                                    if (rOrders.orderCount <= 0) {
                                                                                        Vue.delete(rOrders, "orderCount");
                                                                                        window.location.replace('/personal.html?childType=order');
                                                                                    }
                                                                                    else {
                                                                                        Vue.delete(rOrders.typeObj[typeId], supplierId);
                                                                                        if ($.isEmptyObject(rOrders.typeObj[typeId])) {
                                                                                            Vue.delete(rOrders.typeObj, typeId);
                                                                                        }
                                                                                        if ($.isEmptyObject(rOrders.typeObj)) {
                                                                                            Vue.delete(rOrders, "typeObj");
                                                                                        }
                                                                                    }
                                                                                }
                                                                            });
                                                                        })
                                                                    } else {
                                                                        var theObj = typeof response.obj === "string" ? response.obj : JSON.stringify(response.obj);
                                                                        window.localStorage.setItem('sendToAliPay', theObj);
                                                                        window.localStorage.removeItem('sendToYinLian');
                                                                        window.localStorage.removeItem('sendToPay');
                                                                        tmp.focus();
                                                                        tmp.location.href = '/pay.html';
                                                                        message.refresh({
                                                                            title: '温馨提示',
                                                                            content: '支付申请已提交，请确认！',
                                                                            DOMClick: false,
                                                                            confirmFun: function () {
                                                                                if (rOrders.orderCount <= 0) {
                                                                                    Vue.delete(rOrders, "orderCount");
                                                                                    window.location.replace('/personal.html?childType=order');
                                                                                }
                                                                                else {
                                                                                    Vue.delete(rOrders.typeObj[typeId], supplierId);
                                                                                    if ($.isEmptyObject(rOrders.typeObj[typeId])) {
                                                                                        Vue.delete(rOrders.typeObj, typeId);
                                                                                    }
                                                                                    if ($.isEmptyObject(rOrders.typeObj)) {
                                                                                        Vue.delete(rOrders, "typeObj");
                                                                                    }
                                                                                }
                                                                            }
                                                                        });
                                                                    }
                                                                } else {
                                                                    tmp.focus();
                                                                    tmp.close();
                                                                    if (response.errorMsg) {
                                                                        message.refresh({
                                                                            title: '温馨提示',
                                                                            content: response.errorMsg,
                                                                            DOMClick: false,
                                                                            confirmFun: function () {}
                                                                        });
                                                                    }
                                                                    else {
                                                                        alertDefault.content = '生成订单失败！';
                                                                    }
                                                                    rOrders.typeObj[typeId][supplierId].submitState = true;
                                                                    rOrders.typeObj[typeId][supplierId].submitText = "重新提交";
                                                                }
                                                            }
                                                            else if (payType == 3) {
                                                                if (response && response.success) {
                                                                    rOrders.orderCount--;
                                                                    rOrders.typeObj[typeId][supplierId].submitState = false;
                                                                    rOrders.typeObj[typeId][supplierId].submitText = "已提交订单";
                                                                    window.localStorage.setItem('ordersInfo', JSON.stringify(rOrders));
                                                                    if (idsArr.join(",")) {
                                                                        jsModel.send("ORDER_SHOPPINGCART_DELETE", {
                                                                            ids: idsArr.join(",")
                                                                        }).done(function () {
                                                                            var theObj = typeof response.obj === "string" ? response.obj : JSON.stringify(response.obj);
                                                                            window.localStorage.setItem('sendToYinLian', theObj);
                                                                            window.localStorage.removeItem('sendToAliPay');
                                                                            window.localStorage.removeItem('sendToPay');
                                                                            tmp.focus();
                                                                            tmp.location.href = '/pay.html';
                                                                            message.refresh({
                                                                                title: '温馨提示',
                                                                                content: '支付申请已提交，请确认！',
                                                                                DOMClick: false,
                                                                                confirmFun: function () {
                                                                                    if (rOrders.orderCount <= 0) {
                                                                                        Vue.delete(rOrders, "orderCount");
                                                                                        window.location.replace('/personal.html?childType=order');
                                                                                    }
                                                                                    else {
                                                                                        Vue.delete(rOrders.typeObj[typeId], supplierId);
                                                                                        if ($.isEmptyObject(rOrders.typeObj[typeId])) {
                                                                                            Vue.delete(rOrders.typeObj, typeId);
                                                                                        }
                                                                                        if ($.isEmptyObject(rOrders.typeObj)) {
                                                                                            Vue.delete(rOrders, "typeObj");
                                                                                        }
                                                                                    }
                                                                                }
                                                                            });
                                                                        })
                                                                    } else {
                                                                        var theObj = typeof response.obj === "string"? response.obj: JSON.stringify(response.obj);
                                                                        window.localStorage.setItem('sendToYinLian', theObj);
                                                                        window.localStorage.removeItem('sendToAliPay');
                                                                        window.localStorage.removeItem('sendToPay');
                                                                        tmp.focus();
                                                                        tmp.location.href = '/pay.html';
                                                                        message.refresh({
                                                                            title: '温馨提示',
                                                                            content: '支付申请已提交，请确认！',
                                                                            DOMClick: false,
                                                                            confirmFun: function () {
                                                                                if (rOrders.orderCount <= 0) {
                                                                                    Vue.delete(rOrders, "orderCount");
                                                                                    window.location.replace('/personal.html?childType=order');
                                                                                }
                                                                                else {
                                                                                    Vue.delete(rOrders.typeObj[typeId], supplierId);
                                                                                    if ($.isEmptyObject(rOrders.typeObj[typeId])) {
                                                                                        Vue.delete(rOrders.typeObj, typeId);
                                                                                    }
                                                                                    if ($.isEmptyObject(rOrders.typeObj)) {
                                                                                        Vue.delete(rOrders, "typeObj");
                                                                                    }
                                                                                }
                                                                            }
                                                                        });
                                                                    }
                                                                } else {
                                                                    tmp.focus();
                                                                    tmp.close();
                                                                    if (response.errorMsg) {
                                                                        message.refresh({
                                                                            title: '温馨提示',
                                                                            content: response.errorMsg,
                                                                            DOMClick: false,
                                                                            confirmFun: function () {}
                                                                        });
                                                                    }
                                                                    else {
                                                                        alertDefault.content = '生成订单失败！';
                                                                    }
                                                                    rOrders.typeObj[typeId][supplierId].submitState = true;
                                                                    rOrders.typeObj[typeId][supplierId].submitText = "重新提交";
                                                                }
                                                            }
                                                        })
                                                        .fail(function (response) {
                                                            tmp.focus();
                                                            tmp.close();
                                                            if (response.errorMsg) {
                                                                message.refresh({
                                                                    title: '温馨提示',
                                                                    content: response.errorMsg,
                                                                    DOMClick: false,
                                                                    confirmFun: function () {}
                                                                });
                                                            }
                                                            else {
                                                                alertDefault.content = '生成订单失败！';
                                                            }
                                                            rOrders.typeObj[typeId][supplierId].submitState = true;
                                                            rOrders.typeObj[typeId][supplierId].submitText = "重新提交";
                                                        })
                                                };
                                                if (couponId != -1) {
                                                    options.couponIds = couponId;
                                                    options.orderDetail.payment -= deductiblevalue;
                                                }
                                                if (orderFlag == 0) {
                                                    if (options.orderDetail.payment > crossOrderMaxPrice) {
                                                        if (options.orderGoodsList.length == 1 && options.orderGoodsList[0].itemQuantity == 1) {
                                                            sendOrder();
                                                        } else {
                                                            tmp.focus();
                                                            tmp.close();
                                                            message.refresh({
                                                                title: '订单金额受限',
                                                                content:'根据海关相关规定，单笔跨境订单金额不得超过' + crossOrderMaxPrice + '元，是否返回上页调整？',
                                                                DOMClick: false,
                                                                cancelBtn: true,
                                                                confirmBtn: true,
                                                                cancelFun: function(){
                                                                    rOrders.typeObj[typeId][supplierId].submitState = true;
                                                                    rOrders.typeObj[typeId][supplierId].submitText = "重新提交";
                                                                },
                                                                confirmFun: function () {
                                                                    jsUtil.url.jumpPage(jumpUrl, null, true);
                                                                }
                                                            });
                                                        }
                                                    } else {
                                                        sendOrder();
                                                    }
                                                }
                                                if (orderFlag == 2) {
                                                    if (options.orderDetail.payment < normalOrderMinPrice && options.supplierId * 1 === 6) {
                                                        tmp.focus();
                                                        tmp.close();
                                                        message.refresh({
                                                            title: '订单金额受限',
                                                            content:'该笔一般贸易订单金额未满' + normalOrderMinPrice + '元，是否返回上页调整？',
                                                            DOMClick: false,
                                                            cancelBtn: true,
                                                            confirmBtn: true,
                                                            cancelFun: function(){
                                                                rOrders.typeObj[typeId][supplierId].submitState = true;
                                                                rOrders.typeObj[typeId][supplierId].submitText = "重新提交";
                                                            },
                                                            confirmFun: function () {
                                                                jsUtil.url.jumpPage(jumpUrl, null, true);
                                                            }
                                                        });
                                                    } else {
                                                        sendOrder();
                                                    }
                                                }
                                            }
                                            else {
                                                tmp.focus();
                                                tmp.close();
                                                message.refresh({
                                                    title: '实名认证',
                                                    content: "跨境订单需填写身份证信息, 请完善!",
                                                    DOMClick: false,
                                                    confirmBtn: true,
                                                    confirmFun: function () {
                                                        window.location.href = "/personal.html?childType=userInfo&&jumpUrl=" + pathUrl;
                                                    }
                                                });
                                            }
                                        }
                                        else {
                                            tmp.focus();
                                            tmp.close();
                                            message.refresh({
                                                title: '实名认证',
                                                content: "跨境订单需填写身份证信息, 请完善!",
                                                DOMClick: false,
                                                confirmBtn: true,
                                                confirmFun: function () {
                                                    window.location.href = "/personal.html?childType=userInfo&&jumpUrl=" + pathUrl;
                                                }
                                            });
                                        }
                                    }
                                });
                        }
                    },
                    validation_province: function(e){
                        var that = this;
                        var $this = $(e.currentTarget);
                        if($this.val() === "---- 所在省 ----"){
                            $this.addClass('state_error');
                        }else{
                            $this.removeClass('state_error');
                        }
                        that.alertInfo.province = $this.val();
                    },
                    validation_city: function(e){
                        var that = this;
                        var $this = $(e.currentTarget);
                        if($this.find("option").length > 1 && $this.val() === "---- 所在市 ----"){
                            $this.addClass('state_error');
                        }else{
                            $this.removeClass('state_error');
                        }
                        that.alertInfo.city = $this.val();
                    },
                    validation_area: function(e){
                        var that = this;
                        var $this = $(e.currentTarget);
                        if($this.find("option").length > 1 && $this.val() === "---- 所在区 ----"){
                            $this.addClass('state_error');
                        }else{
                            $this.removeClass('state_error');
                        }
                        that.alertInfo.area = $this.val();
                    },
                    validation_address: function(e){
                        var address = this.alertInfo;
                        if (!address.address || address.address == '') {
                            $(e.currentTarget).addClass('state_error');
                        } else {
                            $(e.currentTarget).removeClass('state_error');
                        }
                    },
                    validation_zipCode: function(e){
                        var address = this.alertInfo;
                        if (address.zipCode == '' || !/[0-9]{1}(\d){5}/gi.test(address.zipCode)) {
                            $(e.currentTarget).addClass('state_error');
                        } else {
                            $(e.currentTarget).removeClass('state_error');
                        }
                    },
                    validation_receiveName: function(e){
                        var address = this.alertInfo;
                        if (!address.receiveName || address.receiveName == '') {
                            $(e.currentTarget).addClass('state_error');
                        } else {
                            $(e.currentTarget).removeClass('state_error');
                        }
                    },
                    validation_receivePhone: function(e){
                        var address = this.alertInfo;
                        if (address.receivePhone == '' || !/^1(3|4|5|7|8)\d{9}$/g.test(address.receivePhone)) {
                            $(e.currentTarget).addClass('state_error');
                        } else {
                            $(e.currentTarget).removeClass('state_error');
                        }
                    },
                    returnInfoList: function(info){
                        try {
                            return JSON.parse(info) || []
                        } catch(e) {
                            return []
                        }
                    },
                    returnPostFee: function(type, taxFee){
                        if(type === '2'){
                            return '运输(普通配送快递): <span>物流或快递</span>';
                        } else{
                            return '运输(普通配送快递): ￥<span>' + taxFee.toFixed(2) + '</span>';
                        }
                    }
                },
                mounted: function () {
                    var that = this;
                    that.queryPostFee();
                    that.setTotalTax();
                    that.setTotalPostFee();
                    that.setTotalPrice();
                    $('.component-orderSure-detail-payType').on('click', 'li[payType]:not(.active)', function () {
                        var $parent = $(this).parents(".component-orderSure-detail-payType");
                        $parent.find("li[payType]").removeClass("active");
                        $(this).addClass("active");
                    });
                    $('.component-orderSure-address-list').on('click', '.address-item:not(.active)', function () {
                        var activeIndex = $(this).index();
                        var list = that.addressList;
                        that.select = list[activeIndex];
                        $(this).addClass('active default').siblings('.address-item').removeClass('active default');
                        that.queryPostFee();
                        that.setTotalTax();
                        that.setTotalPostFee();
                        that.setTotalPrice();
                    });
                    $('.component-orderSure-address-list').on('click', '.address-item i', function () {
                        var tIndex = null;
                        var id = $(this).parents(".address-item").attr("addressId") * 1;
                        var response = that.addressList;
                        var dataObj = null;
                        $.each(response, function (index, obj) {
                            if (obj.id == id) {
                                dataObj = obj;
                                tIndex = index;
                                dataObj.setDefault = 1;
                            }
                        });
                        if ($(this).hasClass("default")) {
                            return false;
                        }
                        if (dataObj) {
                            jsModel.send("USER_ADDRESS_UPDATE", dataObj)
                                .done(function () {
                                    $.each(response, function (index, obj) {
                                        that.addressList[index].setDefault = tIndex === index ? 1 : 0;
                                    });
                                })
                        }
                        return false;
                    });
                }
            })
        }
        if ((/^pay-1-\d+$/).test(role)) {
            var sendToPay = window.localStorage.getItem('sendToPay');
            var sendToAliPay = window.localStorage.getItem('sendToAliPay');
            var sendToYinLian = window.localStorage.getItem('sendToYinLian');
            window.localStorage.removeItem('sendToYinLian');
            window.localStorage.removeItem('sendToAliPay');
            window.localStorage.removeItem('sendToPay');
            if(sendToPay){
                sendToPay = JSON.parse(sendToPay);
            }
            else if(sendToAliPay){
                sendToAliPay = JSON.parse(sendToAliPay);
                $('body').html(sendToAliPay.htmlStr);
                return;
            }
            else if(sendToYinLian){
                sendToYinLian = JSON.parse(sendToYinLian);
                $('body').html(sendToYinLian.htmlStr);
                return;
            }else{
                window.history.go(-1);
                return;
            }

            Module[role] = new Vue({
                el: element,
                data: {
                    sendToPay: sendToPay
                },
                beforeCreate: function () {},
                methods: {
                    returnSupplierName: function(supplierName){
                        var returnVal = "";
                        switch(supplierName){
                            case "天天仓": returnVal = '保税TT仓'; break;
                            case "粮油仓": returnVal = '保税LY仓'; break;
                            case "行云仓": returnVal = '保税XY仓'; break;
                            case "富邦仓": returnVal = '保税FB仓'; break;
                            default:      returnVal = supplierName;
                        }
                        return returnVal;
                    },
                    doOrderDetail: function(e) {
                        var $this = $(e.currentTarget);
                        var status = $this.attr('status');
                        if(status === 'hide'){
                            $('.showDetail').stop();
                            $('.showDetail').slideDown(300);
                            $this.attr('status','show');
                            $this.find('i').attr('class','fa fa-fw fa-angle-up');
                        }else if(status === 'show'){
                            $('.showDetail').stop();
                            $('.showDetail').slideUp(300);
                            $this.attr('status','hide');
                            $this.find('i').attr('class','fa fa-fw fa-angle-down');
                        }
                    }
                },
                mounted: function () {
                    var that = this;
                    if(!$.isEmptyObject(that.sendToPay)){
                        var content = that.sendToPay.url;
                        $('.qrcodeImg').qrcode({
                            width:280,
                            height:280,
                            correctLevel:0,
                            text:content,
                            render: "canvas"
                        });
                    }
                }
            });
        }
        if ((/^personal-1-\d+$/).test(role)) {
            var requestArr = [];
            var message = Module['message-1-1'];
            var alertDefault = Module['alertDefault-1-1'];

            if(childType === "order") {
                sendArr = isLogin? ["USER_DETAIL_QUERY", "ORDER_USER_STATUS_COUNT", "ORDER_USER_QUERY"]: [];
                requestArr = [{}, {}, {"numPerPage":  5, "currentPage": 1}];
            }
            else if(childType === "userInfo") {
                sendArr = isLogin? ["USER_DETAIL_QUERY", "ORDER_USER_STATUS_COUNT", "USER_DETAIL_QUERY"]: [];
                requestArr = [{}, {}, {}];
            }
            else if(childType === "address") {
                sendArr = isLogin? ["USER_DETAIL_QUERY", "ORDER_USER_STATUS_COUNT", "USER_ADDRESS_QUERY"]: [];
                requestArr = [{}, {}, {}];
            }
            else if(childType === "help") {
                sendArr = isLogin? ["USER_DETAIL_QUERY", "ORDER_USER_STATUS_COUNT"]: [];
                requestArr = [{}, {}];
            }
            else if(childType === "change"){
                sendArr = isLogin? ["USER_DETAIL_QUERY", "ORDER_USER_STATUS_COUNT"]: [];
                requestArr = [{}, {}];
            }

            jsModel.send(sendArr, requestArr, true)
                .done(function (response) {
                    var needPayCount = 0;
                    var needDeliverCount = 0;
                    var needReceiptCount = 0;
                    var finishedCount = 0;
                    var userInfo = response['USER_DETAIL_QUERY'] || {};
                    var orderStatus = response['ORDER_USER_STATUS_COUNT'] || [];
                    var addressList = response['USER_ADDRESS_QUERY'] || [];
                    var orderInfo = response['ORDER_USER_QUERY'] || {};

                    $.each(orderStatus, function(index, obj){
                        if(obj.status === 0){
                            needPayCount+=obj.total;
                        }
                        if(obj.status > 0 && obj.status < 6 || obj.status === 11 || obj.status === 12){
                            needDeliverCount+=obj.total;
                        }
                        if(obj.status === 6 ){
                            needReceiptCount+=obj.total;
                        }
                        if(obj.status === 7 ){
                            finishedCount+=obj.total;
                        }
                    });

                    Module[role] = new Vue({
                        el: element,
                        data: {
                            isHide:    true,
                            form:      form,
                            status:    status,
                            isLogin:   isLogin,
                            pathUrl:   pathUrl,
                            jumpUrl:   jumpUrl,
                            redirect:  redirect,
                            childId:   childId,
                            childType: childType,
                            siteInfo:  jsData.siteInfo,
                            needPayCount: needPayCount,
                            needDeliverCount: needDeliverCount,
                            needReceiptCount: needReceiptCount,
                            finishedCount: finishedCount,
                            showName: (function(){
                                return userInfo.userDetail && userInfo.userDetail.nickName? userInfo.userDetail.nickName:
                                    userInfo.userDetail && userInfo.userDetail.name? userInfo.userDetail.name:
                                        userInfo.phone;
                            }()),
                            account: userInfo && userInfo.phone || "",
                            request: {
                                userInfo: $.extend(true, {}, userInfo, { userDetail:{} }),
                                address: {
                                    id: null,
                                    province: '',
                                    city: '',
                                    area: '',
                                    address: '',
                                    zipCode: '',
                                    receiveName: '',
                                    receivePhone: '',
                                    setDefault: '',
                                    show: false
                                },
                                change: {
                                    account: userInfo.phone || '',
                                    password: '',
                                    validation: '',
                                    confirmPassword: ''
                                },
                                order: {
                                    "numPerPage":  5,
                                    "currentPage": 1,
                                    statusArr: undefined,
                                    status: undefined,
                                    orderId: undefined
                                }
                            },
                            changeAccountState: '',
                            changeValidationState: '',
                            changePasswordState: '',
                            changeConfirmPasswordState: '',
                            changeTimerVal: 0,
                            addressList: addressList,
                            province_state: '',
                            city_state: '',
                            area_state: '',
                            address_state: '',
                            zipCode_state: '',
                            receiveName_state: '',
                            receivePhone_state: '',
                            selectHeadImg: false,
                            detailExist: userInfo.id && userInfo.userDetail,
                            editing: true,
                            userInfoNickNameState: '',
                            userInfoRealNameState: '',
                            userInfoIdNumState: '',
                            userInfoPhoneState: '',
                            userInfoLocationState: '',
                            pagination: orderInfo.pagination || {},
                            orderCode: "",
                            btnStatus: "0",
                            orderList: orderInfo.orderList || []
                        },
                        computed: {
                            getFilterText: function(){
                                if(this.btnStatus === '4'){ return "已完成" }
                                else if(this.btnStatus === '3'){ return "待收货" }
                                else if(this.btnStatus === '2'){ return "待发货" }
                                else if(this.btnStatus === '1'){ return "待付款" }
                                else{ return "全部" }
                            },
                            paginationPageList: function(){
                                var pageList = [];
                                var pagination = this.pagination || {};
                                var currentPage = pagination.currentPage * 1;
                                var totalPages =  pagination.totalPages * 1;
                                if(totalPages<13){
                                    for(var i=0;i<totalPages;i++){
                                        pageList[i] = {
                                            page: i+1,
                                            jumpBtn: i+1,
                                            active: (i+1) == currentPage? "active": null,
                                            ellipsis: false
                                        };
                                    }
                                }
                                else{
                                    if(currentPage<7){
                                        for(var i=0;i<8;i++){
                                            pageList[i] = {
                                                page: i+1,
                                                jumpBtn: i+1,
                                                active: (i+1) == currentPage? "active": null,
                                                ellipsis: false
                                            };
                                        }
                                        pageList[8] = {
                                            page: null,
                                            jumpBtn: null,
                                            ellipsis: true
                                        };
                                        for(var i=9,j=1; j>-1; i++,j--){
                                            pageList[i] = {
                                                page: totalPages-j,
                                                jumpBtn: totalPages-j,
                                                active: (totalPages-j) == currentPage? "active": null,
                                                ellipsis: false
                                            };
                                        }
                                    }
                                    else if(currentPage>totalPages-6){
                                        for(var i=0;i<2;i++){
                                            pageList[i] = {
                                                page: i+1,
                                                jumpBtn: i+1,
                                                active: (i+1) == currentPage? "active": null,
                                                ellipsis: false
                                            };
                                        }
                                        pageList[2] = {
                                            page: null,
                                            jumpBtn: null,
                                            ellipsis: true
                                        };
                                        for(var i=3,j=totalPages-8; j<totalPages; i++,j++){
                                            pageList[i] = {
                                                page: j+1,
                                                jumpBtn: j+1,
                                                active: (j+1) == currentPage? "active": null,
                                                ellipsis: false,
                                            };
                                        }
                                    }
                                    else{
                                        for(var i=0;i<2;i++){
                                            pageList[i] = {
                                                page: i+1,
                                                jumpBtn: i+1,
                                                active: (i+1) == currentPage? "active": null,
                                                ellipsis: false
                                            };
                                        }
                                        pageList[2] = {
                                            page: null,
                                            jumpBtn: null,
                                            ellipsis: true
                                        };
                                        for(var i=3,j=currentPage-3; j<currentPage+2; i++,j++){
                                            pageList[i] = {
                                                page: j+1,
                                                jumpBtn: j+1,
                                                active: (j+1) == currentPage? "active": null,
                                                ellipsis: false
                                            };
                                        }
                                        pageList[8] = {
                                            page: null,
                                            jumpBtn: null,
                                            ellipsis: true
                                        };
                                        for(var i=9,j=1; j>-1; i++,j--){
                                            pageList[i] = {
                                                page: totalPages-j,
                                                jumpBtn: totalPages-j,
                                                active: (totalPages-j) == currentPage? "active": null,
                                                ellipsis: false
                                            };
                                        }
                                    }
                                }
                                return pageList;
                            }
                        },
                        methods: {
                            leftItemClick: function(e){
                                var that = this;
                                var ev = e || window.event;
                                var $node = $(ev.currentTarget);
                                var $element = $(that.$el);
                                $element.find('.index-content-msg').slideLeftHide(1000);
                                $element.find('.personal-content-left-item ul li').removeClass('active');
                                $node.addClass('active');
                            },
                            leftItemAClick: function(e){
                                var that = this;
                                var ev = e || window.event;
                                var $node = $(ev.currentTarget);
                                var range = $(window).scrollTop();
                                var childId = $node.attr("childId") || '';
                                var childType = $node.attr("childType") || '';
                                if (range) { $(window).scrollTop(-range); }
                                if (childType === 'help' && (childId !== that.childId || childType !== that.childType)) {
                                    that.childId = childId;
                                    that.childType = childType;
                                    jsUtil.url.setParam({childType: childType, childId: childId}, "cover");
                                    $("html,body").animate({scrollTop: 0});
                                }
                                if (childType === 'change' && childType !== that.childType) {
                                    if (!isLogin) {
                                        message.refresh({
                                            title:'温馨提示',
                                            content: "您尚未登录，请先登录！",
                                            DOMClick: false,
                                            cancelBtn: true,
                                            confirmBtn: true,
                                            confirmFun: function () {
                                                jsUtil.url.delParam(['childId'], "cover");
                                                jsUtil.url.setParam({childType: childType}, "cover");
                                                window.location.href = "/login.html?isBack=1";
                                            }
                                        });
                                    }
                                    else {
                                        that.childId = childId;
                                        that.childType = childType;
                                        that.changeAccountState = '';
                                        that.changeValidationState = '';
                                        that.changePasswordState = '';
                                        that.changeConfirmPasswordState = '';
                                        that.request.change = {
                                            password: '',
                                            validation: '',
                                            confirmPassword: '',
                                            account: that.account,
                                            platUserType: platUserType,
                                            reqHeader: { authentication:null }
                                        };
                                        jsUtil.url.delParam(['childId'], "cover");
                                        jsUtil.url.setParam({childType: childType}, "cover");
                                        $("html,body").animate({scrollTop: 0});
                                    }
                                }
                                if (childType === 'address' && childType !== that.childType) {
                                    if (!isLogin) {
                                        message.refresh({
                                            title:'温馨提示',
                                            content: "您尚未登录，请先登录！",
                                            DOMClick: false,
                                            cancelBtn: true,
                                            confirmBtn: true,
                                            confirmFun: function () {
                                                jsUtil.url.delParam(['childId'], "cover");
                                                jsUtil.url.setParam({childType: childType}, "cover");
                                                window.location.href = "/login.html?isBack=1";
                                            }
                                        });
                                    }
                                    else {
                                        that.addressList = [];
                                        that.province_state = '';
                                        that.city_state = '';
                                        that.area_state = '';
                                        that.address_state = '';
                                        that.zipCode_state = '';
                                        that.receiveName_state = '';
                                        that.receivePhone_state = '';
                                        that.request.address = {
                                            id: null,
                                            province: '',
                                            city: '',
                                            area: '',
                                            address: '',
                                            zipCode: '',
                                            receiveName: '',
                                            receivePhone: '',
                                            setDefault: '',
                                            show: false
                                        };
                                        jsModel.send(['USER_ADDRESS_QUERY'], {})
                                            .done(function(response){
                                                if(response && response.success){
                                                    that.childId = childId;
                                                    that.childType = childType;
                                                    that.addressList = response.obj || [];
                                                    jsUtil.url.delParam(['childId'], "cover");
                                                    jsUtil.url.setParam({childType: childType}, "cover");
                                                    $("html,body").animate({scrollTop: 0});
                                                }
                                            });
                                    }
                                }
                                if (childType === 'userInfo' && childType !== that.childType) {
                                    if (!isLogin) {
                                        message.refresh({
                                            title:'温馨提示',
                                            content: "您尚未登录，请先登录！",
                                            DOMClick: false,
                                            cancelBtn: true,
                                            confirmBtn: true,
                                            confirmFun: function () {
                                                jsUtil.url.delParam(['childId'], "cover");
                                                jsUtil.url.setParam({childType: childType}, "cover");
                                                window.location.href = "/login.html?isBack=1";
                                            }
                                        });
                                    }
                                    else {
                                        that.childId = childId;
                                        that.childType = childType;
                                        jsUtil.url.delParam(['childId'], "cover");
                                        jsUtil.url.setParam({childType: childType}, "cover");
                                        $("html,body").animate({scrollTop: 0});
                                    }
                                }
                                if (childType === 'order' && childType !== that.childType) {
                                    if (!isLogin) {
                                        message.refresh({
                                            title:'温馨提示',
                                            content: "您尚未登录，请先登录！",
                                            DOMClick: false,
                                            cancelBtn: true,
                                            confirmBtn: true,
                                            confirmFun: function () {
                                                jsUtil.url.delParam(['childId'], "cover");
                                                jsUtil.url.setParam({childType: childType}, "cover");
                                                window.location.href = "/login.html?isBack=1";
                                            }
                                        });
                                    }
                                    else {
                                        that.pagination = {};
                                        that.orderCode = "";
                                        that.btnStatus = "0";
                                        that.orderList = [];
                                        that.request.order = {
                                            "numPerPage":  5,
                                            "currentPage": 1,
                                            statusArr: undefined,
                                            status: undefined,
                                            orderId: undefined
                                        };
                                        jsModel.send(['ORDER_USER_QUERY'], that.request.order)
                                            .done(function(response){
                                                if(response && response.success){
                                                    var data = response.obj || {};
                                                    that.childId = childId;
                                                    that.childType = childType;
                                                    that.orderList =  data && data.orderList || {};
                                                    that.pagination =  data && data.pagination || {};
                                                    jsUtil.url.delParam(['childId'], "cover");
                                                    jsUtil.url.setParam({childType: childType}, "cover");
                                                    $("html,body").animate({scrollTop: 0});
                                                }
                                            });
                                    }
                                }
                            },
                            changeTimer: function(val){
                                var that = this;
                                if(that.changeTimerVal = val){
                                    setTimeout(function(){
                                        that.changeTimerVal--;
                                        that.changeTimer(that.changeTimerVal);
                                    }, 1000);
                                }
                            },
                            checkChangeVal: function(arr){
                                var that = this;
                                var state = true;
                                $.each(arr, function(index, type){
                                    if(type === 'phone'){
                                        state = that.changeAccountState = !!that.request.change.account
                                            && ("" + that.request.change.account).trim() !== ""
                                            && (/^1(3|4|5|7|8)\d{9}$/gi).test(that.request.change.account);
                                    }
                                    if(type === 'validation'){
                                        state = that.changeValidationState = !!that.request.change.validation
                                            && ("" + that.request.change.validation).trim() !== ""
                                            && (/^.{6,18}$/gi).test(that.request.change.validation);
                                    }
                                    if(type === 'password'){
                                        state = that.changePasswordState = !!that.request.change.password
                                            && ("" + that.request.change.password).trim() !== ""
                                            && (/^.{6,12}$/gi).test(that.request.change.password);
                                    }
                                    if(type === 'confirmPassword'){
                                        state = that.changeConfirmPasswordState = !!that.request.change.confirmPassword
                                            && that.request.change.password === that.request.change.confirmPassword
                                            && ("" + that.request.change.confirmPassword).trim() !== ""
                                            && (/^.{6,12}$/gi).test(that.request.change.password);
                                    }
                                    if(!state){
                                        return false;
                                    }
                                });
                                return state;
                            },
                            changeFocus: function(type){
                                type === 'phone' && (this.changeAccountState = '');
                                type === 'validation' && (this.changeValidationState = '');
                                type === 'password' && (this.changePasswordState = '');
                                type === 'confirmPassword' && (this.changeConfirmPasswordState = '');
                            },
                            changeBlur: function(type){
                                this.checkChangeVal([type]);
                            },
                            getValidationClick: function(){
                                var that = this;
                                if((/^1(3|4|5|7|8)\d{9}$/gi).test(that.request.change.account)){
                                    jsModel.send("THIRD_PHONE", {
                                        phone: that.request.change.account
                                    }).done(function(response){
                                        if(response && response.success){
                                            that.changeTimer(60);
                                        }else{
                                            alertDefault.refresh({content: "发送频繁，请稍后再试！"});
                                        }
                                    }).fail(function(){
                                        alertDefault.refresh({content: "发送手机验证码失败！"});
                                    })
                                }
                            },
                            changeSubmitClick: function(){
                                var that = this;
                                if(that.checkChangeVal(['phone', 'validation', 'password', 'confirmPassword'])){
                                    window.localStorage.removeItem("authId");
                                    window.localStorage.removeItem("userId");
                                    window.localStorage.removeItem("openId");
                                    var code = that.request.change.validation;
                                    var userName = that.request.change.account;
                                    var password = that.request.change.password;
                                    var platUserType = platUserType;
                                    var reqHeader = { authentication:null };
                                    jsModel.send("AUTH_PWD_CHANGE", {
                                        userName:     userName,
                                        password:     password,
                                        code:         code,
                                        platUserType: platUserType,
                                        reqHeader:    reqHeader
                                    }).done(function(response){
                                        if(response && response.success){
                                            if(response.obj){
                                                setTimeout(function(){ window.location.href = '/login.html'; },1500);
                                                alertDefault.refresh({content:'修改密码成功!'});
                                            }else{
                                                alertDefault.refresh({content:response.errorMsg});
                                            }
                                        }else{
                                            alertDefault.refresh({content:response.errorMsg});
                                        }
                                    }).fail(function(){
                                        alertDefault.refresh({content: "修改密码失败!"});
                                    });
                                }
                            },
                            checkAddressVal: function(arr){
                                var that = this;
                                var state = true;
                                $.each(arr, function(index, type){
                                    if(type === 'province'){
                                        state = that.province_state =
                                            !!that.request.address.province
                                            && ("" + that.request.address.province).trim() !== ''
                                            && that.request.address.province !== "---- 所在省 ----";
                                    }
                                    if(type === 'city'){
                                        state = that.city_state =
                                            $(that.$el).find(".picker-city option").length === 1 ||
                                            (!!that.request.address.city && ("" + that.request.address.city).trim() !== '' && that.request.address.city !== "---- 所在市 ----");

                                    }
                                    if(type === 'area'){
                                        state = that.area_state =
                                            $(that.$el).find(".picker-area option").length === 1 ||
                                            (!!that.request.address.area && ("" + that.request.address.area).trim() !== '' && that.request.address.area !== "---- 所在区 ----");
                                    }
                                    if(type === 'address'){
                                        state = that.address_state = !!that.request.address.address
                                            && ("" + that.request.address.address).trim() !== '';
                                    }
                                    if(type === 'zipCode'){
                                        state = that.zipCode_state = !!that.request.address.zipCode
                                            && ("" + that.request.address.zipCode).trim() !== ''
                                            && (/^[0-9]{1}(\d){5}$/i).test(that.request.address.zipCode);
                                    }
                                    if(type === 'receiveName'){
                                        state = that.receiveName_state = !!that.request.address.receiveName
                                            && ("" + that.request.address.receiveName).trim() !== '';
                                    }
                                    if(type === 'receivePhone'){
                                        state = that.receivePhone_state = !!that.request.address.receivePhone
                                            && ("" + that.request.address.receivePhone).trim() !== ''
                                            && (/^1(3|4|5|7|8)\d{9}$/i).test(that.request.address.receivePhone);
                                    }
                                    if(!state){
                                        return false;
                                    }
                                });
                                return state;
                            },
                            addressFocus: function(type){
                                type === 'province' && (this.province_state = '');
                                type === 'city' && (this.city_state = '');
                                type === 'area' && (this.area_state = '');
                                type === 'address' && (this.address_state = '');
                                type === 'zipCode' && (this.zipCode_state = '');
                                type === 'receiveName' && (this.receiveName_state = '');
                                type === 'receivePhone' && (this.receivePhone_state = '');
                            },
                            addressBlur: function(type){
                                this.checkAddressVal([type]);
                            },
                            pickerChange: function(e){
                                var that = this;
                                var ev = e || window.event;
                                var $node = $(ev.currentTarget);
                                var type = $(ev.currentTarget).attr("type");
                                that.request.address[type] = $node.val();
                                this.checkAddressVal([type]);
                            },
                            addressItemDel: function(e){
                                var that = this;
                                var ev = e || window.event;
                                var $node = $(ev.currentTarget);
                                var id = $node.parents("tr").attr("addressId");
                                message.refresh({
                                    title:'删除收货地址',
                                    content: "是否删除该收货地址",
                                    DOMClick: false,
                                    cancelBtn: true,
                                    confirmBtn: true,
                                    cancelFun: function(){},
                                    confirmFun: function(){
                                        if(id){
                                            jsModel.send("USER_ADDRESS_DELETE", {id: id})
                                                .done(function(res){
                                                    if(res && res.success){
                                                        jsModel.send("USER_ADDRESS_QUERY")
                                                            .done(function(response){
                                                                if(response && response.success){
                                                                    that.addressList = response.obj;
                                                                }
                                                            })
                                                    }
                                                })
                                        }
                                    }
                                });
                            },
                            addressDefaultClick: function(e){
                                var that = this;
                                var ev = e || window.event;
                                var $node = $(ev.currentTarget);
                                var id = $node.parents("tr").attr("addressId");
                                if(id){
                                    jsModel.send("USER_ADDRESS_UPDATE", {id: id, idsetDefault: 1})
                                        .done(function(response){
                                            if(response && response.success){
                                                $.each(that.addressList, function(index, obj){
                                                    id == obj.id?
                                                        obj.setDefault = 1:
                                                        obj.setDefault = 0;
                                                });
                                            }
                                        })
                                }
                            },
                            addressEditClick: function(e){
                                var that = this;
                                var addressInfo = {};
                                var ev = e || window.event;
                                var $node = $(ev.currentTarget);
                                var id = $node.parents("tr").attr("addressId");
                                $.each(that.addressList, function(index, obj){
                                    if(id == obj.id){
                                        addressInfo = obj;
                                        return false;
                                    }
                                });
                                this.request.address = {
                                    id: addressInfo.id,
                                    province: addressInfo.province,
                                    city: addressInfo.city,
                                    area: addressInfo.area,
                                    address: addressInfo.address,
                                    zipCode: addressInfo.zipCode,
                                    receiveName: addressInfo.receiveName,
                                    receivePhone: addressInfo.receivePhone,
                                    setDefault: addressInfo.setDefault,
                                    show: true
                                };
                                this.province_state = '';
                                this.city_state = '';
                                this.area_state = '';
                                this.address_state = '';
                                this.zipCode_state = '';
                                this.receiveName_state = '';
                                this.receivePhone_state = '';
                                this.$nextTick(function(){
                                    $(this.$el).find('.picker-country').picker({
                                        name_province: addressInfo.province,
                                        name_city: addressInfo.city,
                                        name_area: addressInfo.area
                                    });
                                    $(this.$el).find('.address-show-info').css('display', 'none');
                                    $(this.$el).find('.address-show-info').slideDown();
                                });
                            },
                            addressAddClick: function(){
                                this.request.address = {
                                    id: null,
                                    province: '',
                                    city: '',
                                    area: '',
                                    address: '',
                                    zipCode: '',
                                    receiveName: '',
                                    receivePhone: '',
                                    setDefault: '',
                                    show: true
                                };
                                this.province_state = '';
                                this.city_state = '';
                                this.area_state = '';
                                this.address_state = '';
                                this.zipCode_state = '';
                                this.receiveName_state = '';
                                this.receivePhone_state = '';
                                this.$nextTick(function(){
                                    $(this.$el).find('.picker-country').picker({
                                        name_province: '---- 所在省 ----',
                                        name_city: '---- 所在市 ----',
                                        name_area: '---- 所在区 ----'
                                    });
                                    $(this.$el).find('.address-show-info').css('display', 'none');
                                    $(this.$el).find('.address-show-info').slideDown();
                                });
                            },
                            addressSubmit: function(){
                                var that = this;
                                that.request.address.setDefault = that.request.address.setDefault? 1: 0;
                                that.request.address.city === "---- 所在市 ----" && (that.request.address.city = "");
                                that.request.address.area === "---- 所在区 ----" && (that.request.address.area = "");
                                if(that.checkAddressVal(['province', 'city', 'area', 'address', 'zipCode', 'receiveName', 'receivePhone'])){
                                    if(that.request.address.id){
                                        jsModel.send("USER_ADDRESS_UPDATE",  that.request.address)
                                            .done(function(response){
                                                if (response && response.success) {
                                                    $(that.$el).find('.address-show-info').slideUp(function(){
                                                        that.request.address = {
                                                            id: null,
                                                            province: '',
                                                            city: '',
                                                            area: '',
                                                            address: '',
                                                            zipCode: '',
                                                            receiveName: '',
                                                            receivePhone: '',
                                                            setDefault: '',
                                                            show: false
                                                        };
                                                        this.province_state = '';
                                                        this.city_state = '';
                                                        this.area_state = '';
                                                        this.address_state = '';
                                                        this.zipCode_state = '';
                                                        this.receiveName_state = '';
                                                        this.receivePhone_state = '';
                                                    });
                                                    jsModel.send(['USER_ADDRESS_QUERY'], {})
                                                        .done(function(response2){
                                                            if(response2 && response2.success){
                                                                that.addressList = response2.obj || [];
                                                                $("html,body").animate({scrollTop: 90});
                                                            }
                                                        });
                                                } else if(response) {
                                                    alertDefault.content = response && response.errMsg || '提交失败';
                                                }
                                            })
                                    }else{
                                        jsModel.send("USER_ADDRESS_CREATE",  that.request.address)
                                            .done(function(response){
                                                if (response && response.success) {
                                                    $(that.$el).find('.address-show-info').slideUp(function(){
                                                        that.request.address = {
                                                            id: null,
                                                            province: '',
                                                            city: '',
                                                            area: '',
                                                            address: '',
                                                            zipCode: '',
                                                            receiveName: '',
                                                            receivePhone: '',
                                                            setDefault: '',
                                                            show: false
                                                        };
                                                        this.province_state = '';
                                                        this.city_state = '';
                                                        this.area_state = '';
                                                        this.address_state = '';
                                                        this.zipCode_state = '';
                                                        this.receiveName_state = '';
                                                        this.receivePhone_state = '';
                                                    });
                                                    jsModel.send(['USER_ADDRESS_QUERY'], {})
                                                        .done(function(response2){
                                                            if(response2 && response2.success){
                                                                that.addressList = response2.obj || [];
                                                                $("html,body").animate({scrollTop: 90});
                                                            }
                                                        });
                                                } else if(response) {
                                                    alertDefault.content = response && response.errMsg || '提交失败';
                                                }
                                            });
                                    }
                                }
                            },
                            addressCancel: function(){
                                var that = this;
                                $(that.$el).find('.address-show-info').slideUp(function(){
                                    that.request.address = {
                                        id: null,
                                        province: '',
                                        city: '',
                                        area: '',
                                        address: '',
                                        zipCode: '',
                                        receiveName: '',
                                        receivePhone: '',
                                        setDefault: '',
                                        show: false
                                    };
                                    this.province_state = '';
                                    this.city_state = '';
                                    this.area_state = '';
                                    this.address_state = '';
                                    this.zipCode_state = '';
                                    this.receiveName_state = '';
                                    this.receivePhone_state = '';
                                });
                            },
                            checkUserInfoVal: function(arr){
                                var that = this;
                                var state = true;
                                $.each(arr, function(index, type){
                                    if(type === 'nickName'){
                                        state = that.userInfoNickNameState =
                                            !!that.request.userInfo.userDetail.nickName &&
                                            ("" + that.request.userInfo.userDetail.nickName).trim() !== '';
                                    }
                                    if(type === 'realname'){
                                        state = that.userInfoRealNameState =
                                            !!that.request.userInfo.userDetail.name &&
                                            ("" + that.request.userInfo.userDetail.name).trim() !== ''
                                    }
                                    if(type === 'idNum'){
                                        state = that.userInfoIdNumState =
                                            !!that.request.userInfo.userDetail.idNum &&
                                            ("" + that.request.userInfo.userDetail.idNum).trim() !== '' &&
                                            jsUtil.check.identity(that.request.userInfo.userDetail.idNum);
                                    }
                                    if(type === 'phone'){
                                        state = that.userInfoPhoneState =
                                            !!that.request.userInfo.phone &&
                                            ("" + that.request.userInfo.phone).trim() !== '' &&
                                            (/^1(3|4|5|7|8)\d{9}$/i).test(that.request.userInfo.phone);
                                    }
                                    if(type === 'location'){
                                        state = that.userInfoLocationState =
                                            !!that.request.userInfo.userDetail.location &&
                                            ("" + that.request.userInfo.userDetail.location).trim() !== ''
                                    }
                                    if(!state){
                                        return false;
                                    }
                                });
                                return state;
                            },
                            userInfoFocus: function(type){
                                type === 'nickName' && (this.userInfoNickNameState = '');
                                type === 'realName' && (this.userInfoRealNameState = '');
                                type === 'idNum' && (this.userInfoIdNumState = '');
                                type === 'phone' && (this.userInfoPhoneState = '');
                                type === 'location' && (this.userInfoLocationState = '');
                            },
                            userInfoBlur: function(type){
                                this.checkUserInfoVal([type])
                            },
                            userInfoChange: function(val){
                                this.request.userInfo.userDetail.sex = val || 0
                            },
                            userInfoEdit: function(){
                                this.editing = !this.editing;
                            },
                            userInfoSubmit: function(){
                                var that = this;
                                var request = {
                                    id: that.request.userInfo.userDetail.id,
                                    idNum: that.request.userInfo.userDetail.idNum,
                                    location: that.request.userInfo.userDetail.location,
                                    name: that.request.userInfo.userDetail.name,
                                    nickName: that.request.userInfo.userDetail.nickName,
                                    phone: that.request.userInfo.phone,
                                    sex: that.request.userInfo.userDetail.sex
                                };
                                if(that.checkUserInfoVal(['nickName', 'realname', 'idNum', 'phone', 'location'])){
                                    if(that.detailExist){
                                        jsModel.send("USER_DETAIL_UPDATE", request)
                                            .done(function(response){
                                                if(response && response.success){
                                                    alertDefault.refresh({content:'保存成功'});
                                                    if(jumpUrl !== ''){ jsUtil.url.jumpPage(jumpUrl, null, true); }
                                                }
                                            });
                                    } else {
                                        jsModel.send("USER_DETAIL_CREATE", request)
                                            .done(function(response){
                                                if(response && response.success){
                                                    alertDefault.refresh({content:'保存成功'});
                                                    if(jumpUrl !== ''){ jsUtil.url.jumpPage(jumpUrl, null, true); }
                                                }
                                            });
                                    }
                                }
                            },
                            getStatusClass: function(status){
                                if(status === 0){ return "need_pay"; }
                                if(status === 1){ return "need_deliver"; }
                                if(status === 2){ return "need_deliver"; }
                                if(status === 3){ return "need_deliver"; }
                                if(status === 4){ return "need_deliver"; }
                                if(status === 5){ return "need_deliver"; }
                                if(status === 11){ return "need_deliver"; }
                                if(status === 12){ return "need_deliver"; }
                                if(status === 99){ return "need_deliver"; }
                                if(status === 6){ return "need_take"; }
                                if(status === 7){ return "need_finish"; }
                                if(status === 8){ return ""; }
                                if(status === 9){ return ""; }
                                if(status === 21){ return ""; }
                            },
                            getStatusDes: function(createType, status){
                                if(status === 0){
                                    return createType !== 4?
                                        "订单付款成功后，我们将在两个工作日之内尽快给您发货！":
                                        "预售产品我们会在付款成功后给您安排发货，请您耐心等待！";
                                }
                                else if(status === 1 || status === 11 || status === 12 ||
                                    status === 2 || status === 3 || status === 4 || status === 5){
                                    return createType !== 4?
                                        "付款成功，我们将在两个工作日之内尽快给您发货！":
                                        "付款成功, 预售产品我们会尽快给您安排发货，请您耐心等待！";
                                }
                            },
                            getLiBackground: function(imgPath, defImg){
                                return imgPath? "background: url('" + imgPath + "') 8px 5px / calc(100% - 16px) calc(100% - 10px) no-repeat":
                                    "background: url('" + defImg + "') 8px 5px / calc(100% - 16px) calc(100% - 10px) no-repeat";
                            },
                            getImgBackground: function(orderFlag){
                                var imgBackground = '';
                                switch(orderFlag){
                                    case 0: imgBackground = "background: url('/images/platform/tag/icon_cross.png') 0% 0% / 60px 60px no-repeat"; break;
                                    case 2: imgBackground = "background: url('/images/platform/tag/icon_normal.png') 0% 0% / 60px 60px no-repeat"; break;
                                }
                                return imgBackground;
                            },
                            getStatusText: function(status, orderExpressList, payType){
                                if(status === 0){ return "待付款"; }
                                if(status === 1){ return "已支付"  /*payType === 1? "微信支付": (payType === 2? "支付宝支付": (payType === 3? "银联支付": ""));*/ }
                                if(status === 11){ return "已支付" /*payType === 1? "微信支付": (payType === 2? "支付宝支付": (payType === 3? "银联支付": ""));*/ }
                                if(status === 12){ return "已支付" /*payType === 1? "微信支付": (payType === 2? "支付宝支付": (payType === 3? "银联支付": ""));*/ }
                                if(status === 2){ return "支付单报关"; }
                                if(status === 3){ return "已发仓库"; }
                                if(status === 4){ return "已报海关"; }
                                if(status === 5){ return "单证放行"; }
                                if(status === 6){ return "发货中"; }
                                if(status === 7){ return "交易完成"; }
                                if(status === 8){ return "已退单"; }
                                if(status === 9){ return "交易关闭"; }
                                if(status === 21){ return "退款中"; }
                                if(status === 99){ return (orderExpressList||[{}])[0].status; }
                            },
                            orderSearchEnter: function(){
                                var that = this;
                                that.request.order.numPerPage = 5;
                                that.request.order.currentPage = 1;
                                jsModel.send("ORDER_USER_QUERY", that.request.order)
                                    .done(function(response){
                                        if(response && response.success){
                                            var data = response.obj || {};
                                            that.orderList =  data && data.orderList || {};
                                            that.pagination =  data && data.pagination || {};
                                            $("html,body").animate({scrollTop: 0});
                                        }
                                    });
                            },
                            filterStateShow: function(e){
                                var ev = e || window.event;
                                var $node = $(ev.currentTarget);
                                if($node.hasClass("active")){
                                    $node.removeClass('active');
                                    $node.next().slideUp(400);
                                }
                                else{
                                    $node.addClass('active');
                                    $node.next().slideDown(400);
                                }
                            },
                            filterStateSelect: function(e){
                                var ev = e || window.event;
                                var $node = $(ev.currentTarget);
                                var type = $node.attr("status") || '';
                                $node.parent().prev().removeClass('active');
                                $node.parent().slideUp(400);
                                this.btnStatus = type;
                            },
                            ergodicInfoList: function(info){
                                try {
                                    return JSON.parse(info) || []
                                } catch(e) {
                                    return []
                                }
                            },
                            toPayClick: function(pType, orderId, orderPrice){
                                var that = this;
                                var isYL = pType === 'yl';
                                var isZFB = pType === 'zfb';
                                var payType = isYL? 3: (isZFB? 2: 1);
                                var type = payType === 3? "07": (payType === 1? "NATIVE": "scanCode");
                                var sendToPay = { orderId: orderId, orderPrice: orderPrice };
                                var tmp = window.open("about:blank");
                                jsModel.send("PAY_ORDER", { payType:payType, type:type, orderId:orderId, redirect: redirect })
                                    .done(function(response){
                                        if(response && response.success){
                                            if(payType === 1){
                                                var content = response.obj.urlCode;
                                                message.refresh({
                                                    title:'温馨提示',
                                                    content:'支付申请已提交，请确认！',
                                                    DOMClick: false,
                                                    confirmFun: function(){
                                                        that.request.order.numPerPage = 5;
                                                        that.request.order.currentPage = 1;
                                                        jsModel.send(['ORDER_USER_QUERY'], that.request.order)
                                                            .done(function(response){
                                                                if(response && response.success){
                                                                    var data = response.obj || {};
                                                                    that.orderList =  data && data.orderList || {};
                                                                    that.pagination =  data && data.pagination || {};
                                                                    $("html,body").animate({scrollTop: 0});
                                                                }
                                                            });
                                                    }
                                                });
                                                sendToPay.url = content;
                                                sendToPay = JSON.stringify(sendToPay);
                                                window.localStorage.removeItem('sendToAliPay');
                                                window.localStorage.removeItem('sendToYinLian');
                                                window.localStorage.setItem('sendToPay',sendToPay);
                                                tmp.focus();
                                                tmp.location='/pay.html';
                                            }
                                            else if(payType === 2){
                                                var theObj = typeof response.obj === "string"? response.obj: JSON.stringify(response.obj);
                                                window.localStorage.setItem('sendToAliPay',theObj);
                                                window.localStorage.removeItem('sendToYinLian');
                                                window.localStorage.removeItem('sendToPay');
                                                message.refresh({
                                                    title:'温馨提示',
                                                    content:'支付申请已提交，请确认！',
                                                    DOMClick: false,
                                                    confirmFun: function(){
                                                        that.request.order.numPerPage = 5;
                                                        that.request.order.currentPage = 1;
                                                        jsModel.send(['ORDER_USER_QUERY'], that.request.order)
                                                            .done(function(response){
                                                                if(response && response.success){
                                                                    var data = response.obj || {};
                                                                    that.orderList =  data && data.orderList || {};
                                                                    that.pagination =  data && data.pagination || {};
                                                                    $("html,body").animate({scrollTop: 0});
                                                                }
                                                            });
                                                    }
                                                });
                                                tmp.focus();
                                                tmp.location='/pay.html';
                                            }
                                            else if(payType === 3){
                                                var theObj = typeof response.obj === "string"? response.obj: JSON.stringify(response.obj);
                                                window.localStorage.setItem('sendToYinLian',theObj);
                                                window.localStorage.removeItem('sendToAliPay');
                                                window.localStorage.removeItem('sendToPay');
                                                message.refresh({
                                                    title:'温馨提示',
                                                    content:'支付申请已提交，请确认！',
                                                    DOMClick: false,
                                                    confirmFun: function(){
                                                        that.request.order.numPerPage = 5;
                                                        that.request.order.currentPage = 1;
                                                        jsModel.send(['ORDER_USER_QUERY'], that.request.order)
                                                            .done(function(response){
                                                                if(response && response.success){
                                                                    var data = response.obj || {};
                                                                    that.orderList =  data && data.orderList || {};
                                                                    that.pagination =  data && data.pagination || {};
                                                                    $("html,body").animate({scrollTop: 0});
                                                                }
                                                            });
                                                    }
                                                });
                                                tmp.focus();
                                                tmp.location='/pay.html';
                                            }
                                        }
                                        else if(response && response.errorMsg){
                                            alertDefault.refresh({content:response.errorMsg });
                                            tmp.focus();
                                            tmp.close();
                                        }
                                        else{
                                            alertDefault.refresh({content:"获取支付二维码失败！"});
                                            tmp.focus();
                                            tmp.close();
                                        }
                                    })
                                    .fail(function(response){
                                        if(response && response.errorMsg){
                                            alertDefault.refresh({content:response.errorMsg });
                                            tmp.focus();
                                            tmp.close();
                                        }
                                        else{
                                            alertDefault.refresh({content:"获取支付二维码失败！"});
                                            tmp.focus();
                                            tmp.close();
                                        }
                                    });
                            },
                            refundClick: function(orderId){
                                var that = this;
                                if(that.siteInfo.qq){
                                    window.open("http://wpa.qq.com/msgrd?v=3&uin="+that.siteInfo.qq+"&site=qq&menu=yes");
                                }else{
                                    alertDefault.refresh({ content: "暂时无法联系客服!" });
                                }
                            },
                            delOrderClick: function(orderId){
                                var that = this;
                                message.refresh({
                                    title:'删除订单',
                                    content: "确认是否删除该订单",
                                    DOMClick: false,
                                    cancelBtn: true,
                                    confirmBtn: true,
                                    cancelFun: function(){},
                                    confirmFun: function(){
                                        jsModel.send("ORDER_USER_DELETE", { orderId: orderId })
                                            .done(function(response){
                                                if(response && response.success){
                                                    that.request.order.numPerPage =  5;
                                                    that.request.order.currentPage = 1;
                                                    jsModel.send(['ORDER_USER_QUERY'], that.request.order)
                                                        .done(function(response){
                                                            if(response && response.success){
                                                                var data = response.obj || {};
                                                                that.orderList =  data && data.orderList || {};
                                                                that.pagination =  data && data.pagination || {};
                                                                $("html,body").animate({scrollTop: 0});
                                                            }
                                                        });
                                                }
                                            });
                                    }
                                });
                            },
                            closeOrderClick: function(orderId){
                                var that = this;
                                message.refresh({
                                    title:'关闭订单',
                                    content: "确认是否关闭该订单",
                                    DOMClick: false,
                                    cancelBtn: true,
                                    confirmBtn: true,
                                    cancelFun: function(){},
                                    confirmFun: function(){
                                        jsModel.send("ORDER_USER_CLOSE", { orderId: orderId })
                                            .done(function(response){
                                                if(response && response.success){
                                                    that.request.order.numPerPage =  5;
                                                    that.request.order.currentPage = 1;
                                                    jsModel.send(['ORDER_USER_QUERY'], that.request.order)
                                                        .done(function(response){
                                                            if(response && response.success){
                                                                var data = response.obj || {};
                                                                that.orderList =  data && data.orderList || {};
                                                                that.pagination =  data && data.pagination || {};
                                                                $("html,body").animate({scrollTop: 0});
                                                            }
                                                        });
                                                }
                                            });
                                    }
                                });
                            },
                            confirmDeliveryClick: function(orderId){
                                var that = this;
                                message.refresh({
                                    title:'确认收货',
                                    content: "请确认，是否已收货？",
                                    DOMClick: false,
                                    cancelBtn: true,
                                    confirmBtn: true,
                                    cancelFun: function(){},
                                    confirmFun: function(){
                                        jsModel.send("ORDER_USER_CONFIRM", { orderId: orderId })
                                            .done(function(response){
                                                if(response && response.success){
                                                    that.request.order.numPerPage =  5;
                                                    that.request.order.currentPage = 1;
                                                    jsModel.send(['ORDER_USER_QUERY'], that.request.order)
                                                        .done(function(response){
                                                            if(response && response.success){
                                                                var data = response.obj || {};
                                                                that.orderList =  data && data.orderList || {};
                                                                that.pagination =  data && data.pagination || {};
                                                                $("html,body").animate({scrollTop: 0});
                                                            }
                                                        });
                                                }
                                            });
                                    }
                                });
                            },
                            paginationInput: function(e){
                                var that = this;
                                var regex = /\D/g;
                                var ev = e || window.event;
                                var $node = $(ev.currentTarget);
                                var val = $node.val() && $node.val().trim() || 1;
                                var totalPages = that.pagination.totalPages * 1;
                                $node.val(val.replace(regex, "").trim());
                                ($node.val()*1 > totalPages) && $node.val(totalPages||1);
                            },
                            paginationBlur: function(e){
                                var ev = e || window.event;
                                var $node = $(ev.currentTarget);
                                var val = $node.val().trim();
                                if(!val){ $node.val(1); }
                            },
                            paginationBtn: function(e){
                                var that = this;
                                var ev = e || window.event;
                                var $node = $(ev.currentTarget);
                                var totalPages = that.pagination.totalPages*1;
                                var currentPage = that.pagination.currentPage*1;
                                var $parent = $node.parents(".pagination_ul");
                                if (!$parent.hasClass('lose') && !$parent.hasClass('active')) {
                                    if($node.hasClass("searchBtn")){
                                        currentPage = $node.parent().prev().find("input").val();
                                    }
                                    else if($node.hasClass("prevBtn")){
                                        currentPage = currentPage>1? currentPage*1-1: 1;
                                    }
                                    else if($node.hasClass("nextBtn")){
                                        currentPage = currentPage<totalPages? currentPage*1+1: totalPages;
                                    }
                                    else{
                                        currentPage = $node.text();
                                        currentPage = currentPage*1>=1? currentPage*1: 1;
                                        currentPage = currentPage*1<=totalPages? currentPage*1: totalPages;
                                    }
                                    that.request.order.numPerPage = 5;
                                    that.request.order.currentPage = currentPage;
                                    jsModel.send("ORDER_USER_QUERY", that.request.order)
                                        .done(function(response){
                                            if(response && response.success){
                                                var data = response.obj || {};
                                                that.orderList =  data && data.orderList || {};
                                                that.pagination =  data && data.pagination || {};
                                                $("html,body").animate({scrollTop: 0});
                                            }
                                        });
                                }
                            }
                        },
                        watch: {
                            btnStatus: function(curVal){
                                var that = this;
                                if(curVal === '0'){
                                    that.request.order.status = undefined;
                                    that.request.order.statusArr = undefined;
                                }
                                if(curVal === '1'){
                                    that.request.order.status = 0;
                                    that.request.order.statusArr = undefined;
                                }
                                if(curVal === '2'){
                                    that.request.order.status = 0;
                                    that.request.order.statusArr = '1,2,3,4,5,11,12';
                                }
                                if(curVal === '3'){
                                    that.request.order.status = 6;
                                    that.request.order.statusArr = undefined;
                                }
                                if(curVal === '4'){
                                    that.request.order.status = 7;
                                    that.request.order.statusArr = undefined;
                                }
                                that.request.order.numPerPage = 5;
                                that.request.order.currentPage = 1;
                                jsModel.send("ORDER_USER_QUERY", that.request.order)
                                    .done(function(response){
                                        if(response && response.success){
                                            var data = response.obj || {};
                                            that.orderList =  data && data.orderList || {};
                                            that.pagination =  data && data.pagination || {};
                                            $("html,body").animate({scrollTop: 0});
                                        }
                                    });
                            },
                            orderCode: function(curVal){
                                this.request.order.orderId = curVal && curVal.trim()? curVal.trim(): undefined;
                            }
                        },
                        beforeCreate: function(){
                        },
                        mounted: function () {
                            var that = this;
                            $(document).on("click", function(e){
                                var $element = $(that.$el);
                                var event = e || window.event;
                                var $node = $(event.target||event.srcElement);
                                var $parent = $node.parents(".filterState");
                                $element.find("p.filterState.active").not($node).not($parent).click();
                            });
                            $.fn.slideLeftHide = function( speed, callback ) {
                                this.animate({
                                    width : "hide",
                                    paddingLeft : "hide",
                                    paddingRight : "hide",
                                    marginLeft : "hide",
                                    marginRight : "hide"
                                }, speed, callback );
                            };
                            $.fn.slideLeftShow = function( speed, callback ) {
                                this.animate({
                                    width : "show",
                                    paddingLeft : "show",
                                    paddingRight : "show",
                                    marginLeft : "show",
                                    marginRight : "show"
                                }, speed, callback );
                            };
                        }
                    });
                });
        }
        if ((/^shop-show-1-\d+$/).test(role)) {
            Module[role] = new Vue({
                el: element,
                data: {
                    showType: 0
                },
                methods:{
                    chooseTypeClick: function(e){
                        var that = this;
                        var ev = e || window.event;
                        var $node = $(ev.currentTarget);
                        var tType = $node.attr('data-type');
                        that.showType = tType;
                        $('.item-content').removeClass('active');
                        if(tType == 0){
                            $('.area-content').addClass('active');
                        }else if(tType == 1){
                            $('.partner-content').addClass('active');
                        }else if(tType == 2){
                            $('.shop-content').addClass('active');
                        }
                    }
                }
            });
        }
        if ((/^amount-access-1-\d+$/).test(role)) {
            Module[role] = new Vue({
                el: element,
                data: {}
            });
        }

    };

    window.app.getModule = function(name){
        return typeof name === "string" && name.trim()? Module[name]: Module;
    };

}());