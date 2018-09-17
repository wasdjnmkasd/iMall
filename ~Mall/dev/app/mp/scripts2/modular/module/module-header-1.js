
/** 页面模块
 *    @detail:    header模块_1
 *    @return:    can.Control
 *    @author:    林鹏腾
 *    @date:      2017.8.16
 */
define(["config.page.render"], function(Render) {

    'use strict';

    var api = window.capi.get();
    var isLogin = api.jsData.userInfo.isLogin;
    var shopId = api.jsData.userInfo.shopId;
    var sendArr = [];
    if(isLogin){ sendArr.push("ORDER_SHOPPINGCART_COUNT/global/shopCartCount") }
    if(shopId){ sendArr.push("USER_SHOPINFO_QUERY/global/shopInfo") }

    return Render.extend({
        //子类扩展
        tags: {
            global: "<component-header-1></component-header-1>"
        },
        region: {
            global: {
                cfgDynamic: true,
                reqDynamic: true,
                resDynamic: true,
                beforeFunc: function(that, data){
                    var shopName = that.config.global.shopName;
                    var shopAbout = that.config.global.shopAbout;
                    var shopHeadImg = that.config.global.shopHeadImg;
                    var shopDescribe = that.config.global.shopDescribe;
                    that.config.global.shopInfo = data.response.global && data.response.global.shopInfo || {};
                    that.config.global.shopInfo.headImg = that.config.global.shopInfo.headImg || shopHeadImg;
                    that.config.global.shopInfo.aboutus = that.config.global.shopInfo.aboutus || shopAbout;
                    that.config.global.shopInfo.name = that.config.global.shopInfo.name? that.config.global.shopInfo.name: shopName;
                    that.config.global.shopInfo.description = shopDescribe;
                },
                afterFunc: function(that, data){
                    api.jsModel.send('PAGE_HEADER1_QUERY_NODE', {})
                        .done(function(response){
                            var placeholder = response && response.cont && response.cont[0] && response.cont[0].title || '';
                            that.renderData.global.config.attr('placeholder', placeholder);
                        });
                }
            }
        },
        config: {
            global: {
                historyCache: [],
                shopName: api.jsData.siteInfo.shopName,
                shopAbout: api.jsData.siteInfo.shopAbout,
                shopHeadImg: api.jsData.siteInfo.shopHeadImg,
                shopDescribe: api.jsData.siteInfo.shopDescribe
            }
        },
        request: {},
        response: {
            global: {}
        },
        sendArr: sendArr,
        reload: false,

        //自定义方法
        timer: null,


        //自定义事件
        ".component-header-left   .icon_scan           touchend": function () {
            var that = this;
            var message = that.modules.message;
            if(that.jsUtil.weChat.browser()){
                if(wx){
                    wx.ready(function(){
                        wx.scanQRCode({
                            needResult: 1,
                            scanType: ["qrCode","barCode"],
                            success: function (res) {
                                res && res.resultStr && (window.location.href = res.resultStr);
                            }
                        });
                    });
                } else {
                    message.refresh({ confirmBtn: false, content: "暂且无法使用扫一扫功能，敬请谅解！"});
                }
            } else {
                message.refresh({ confirmBtn: false, content: "请在微信端进行操作！"});
            }
        },
        ".component-header-left   .text_login          touchend": function () {
            var that = this;
            var jumpUrl = that.renderData.global.config.jumpUrl;
            if(jumpUrl){
                window.location.href = "/login.html?jumpUrl=" + jumpUrl;
            }else{
                window.location.href = "/login.html";
            }
        },
        ".component-header-left   .icon_back           touchend": function () {
            var that = this;
            var backUrl = that.renderData.global.config.backUrl;
            var defUrl = -1;
            that.jsUtil.url.jumpPage(backUrl, defUrl, true);
        },
        ".component-header-left   .icon_home           touchend": function () {
            window.location.href = "/index.html";
        },
        ".component-header-input   input               focus":    function (node) {
            var that = this;
            var tempCache= [];
            var $node = $(node);
            var modules = that.modules;
            var $parent = $node.parents(".component-header-input");
            var historyCache = JSON.parse(window.localStorage.getItem("historyCache"))||[];
            $parent.addClass("isFocus");
            $("html,body").animate({scrollTop: 0});
            $(document).find("component-footer-1").css("display", "none");
            $(modules.searchHistory.element).css({"display": "block"});
            $(modules.searchHistory.element).animate({"left": "0"}, 500);
            that.renderData.global.config.attr("icon_scan", false);
            that.renderData.global.config.attr("icon_news", false);
            that.renderData.global.config.attr("info_shop", false);
            that.renderData.global.config.attr("icon_back", false);
            that.renderData.global.config.attr("icon_home", false);
            that.renderData.global.config.attr("text_edit", false);
            that.renderData.global.config.attr("text_save", false);
            that.renderData.global.config.attr("icon_close", false);
            that.renderData.global.config.attr("title_shop", false);
            that.renderData.global.config.attr("title_text", false);
            that.renderData.global.config.attr("text_login", false);
            that.renderData.global.config.attr("text_manage", false);
            that.renderData.global.config.attr("text_choose", false);
            that.renderData.global.config.attr("icon_search", false);
            that.renderData.global.config.attr("icon_shopCart", false);
            that.renderData.global.config.attr("text_orderList", false);
            that.renderData.global.config.attr("input", true);
            that.renderData.global.config.attr("input_search", true);
            that.renderData.global.config.attr("input_cancel", true);
            $.each(historyCache, function(index, obj){ tempCache.push(obj); });
            modules.searchHistory.renderData.global.config.attr("historyCache", tempCache);
        },
        ".component-header-input   input               keyup":    function () {
            var that = this;
            var $element = $(that.element);
            var goodsName = $element.find(".component-header-input input").val();
            var placeholder = $element.find(".component-header-input input").attr("placeholder");
            if(!goodsName && placeholder){ goodsName = placeholder }
            if(api.jsEvent.keyboard.keyboardCode === 13){
                if (goodsName.trim()) {
                    var historyList = [];
                    var historyCache = JSON.parse(window.localStorage.getItem("historyCache"))||[];
                    $.each(historyCache, function(key, obj){ historyList.push(obj.goodsName); });
                    var index = $.inArray(goodsName, historyList);
                    index !== -1 && historyCache.splice(index, 1);
                    historyCache.unshift({ goodsName: goodsName });
                    historyCache.splice(9, historyCache.length-9);
                    $element.find(".component-header-input > input").blur();
                    window.localStorage.setItem("historyCache", JSON.stringify(historyCache));
                    window.location.href = encodeURI("/searchProduct.html?goodsName=" + goodsName);
                }else{
                    window.location.href = "/searchProduct.html?upShelves=1";
                }
            }
        },
        ".component-header-input  .i_clear             touchend": function (node) {
            var $node = $(node);
            $node.parent().find("input").val("");
        },
        ".component-header-right  .input_cancel        touchend": function () {
            var that = this;
            var modules = that.modules;
            var $element = that.element;
            that.renderData.global.config.attr("input", false);
            that.renderData.global.config.attr("input_search", false);
            that.renderData.global.config.attr("input_cancel", false);
            $(modules.searchHistory.element).animate({"left": "101%"}, 500, function () {
                $(modules.searchHistory.element).css({"display": "none"});
            });
            $.each(that.config.initList, function(name, state){
                that.renderData.global.config.attr(name, state);
            });
            $element.find(".component-header-input input").blur();
            $element.find(".component-header-input").removeClass("isFocus");
            $(document).find("component-footer-1").css("display", "block");
            $("body").css({"position": "static", "overflow": "visible"});
        },
        ".component-header-right  .icon_search         touchend": function () {
            var that = this;
            var $element = that.element;
            that.renderData.global.config.attr("input", true);
            $element.find(".component-header-input input").focus();
        },
        ".component-header-right  .icon_close          touchend": function () {
            var that = this;
            var backUrl = that.renderData.global.config.backUrl;
            var defUrl = -1;
            that.jsUtil.url.jumpPage(backUrl, defUrl, true);
        },
        ".component-header-right  .info_shop           touchend": function () {
            var that = this;
            var jumpUrl = that.renderData.global.config.jumpUrl;
            if(jumpUrl){
                window.location.href = "/index.html?jumpUrl=" + jumpUrl;
            }else{
                window.location.href = "/index.html";
            }
        },
        ".component-header-right  .icon_shopCart       touchend": function () {
            window.location.href = "/shoppingCart.html"
        },
        ".component-header-right  .icon_orderList      touchend": function () {
            var that = this;
            var pathUrl = that.renderData.global.config.pathUrl;
            window.location.href = "/orderList.html?jumpUrl=" + pathUrl;
        },
        ".component-header-right  .icon_choose         touchend": function () {
            var that = this;
            var defUrl = -1;
            var discount = that.modules.discount;
            var jumpUrl = that.renderData.global.config.jumpUrl;
            var orderInfo = discount.renderData.global.response.attr();
            var showDiscount = discount.renderData.global.config.showDiscount.attr();
            var type = discount.renderData.global.response.attr("type");
            var supplierId = discount.renderData.global.response.attr("supplierId");
            var JSON_showDiscount = JSON.stringify(showDiscount||{});
            var JSON_ordersInfo = localStorage.getItem("ordersInfo");
            var ordersInfo = JSON.parse(JSON_ordersInfo);
            if(ordersInfo && type && supplierId){
                ordersInfo.typeObj[type][supplierId] = orderInfo;
                JSON_ordersInfo = JSON.stringify(ordersInfo||{});
                window.localStorage.removeItem("orderInfo");
                window.localStorage.setItem("ordersInfo", JSON_ordersInfo);
                window.localStorage.setItem("showDiscount", JSON_showDiscount);
                that.jsUtil.url.jumpPage(jumpUrl, defUrl, true);
            }
        },
        ".component-header-right  .icon_news           touchend": function () {
            var that = this;
            var message = that.modules.message;
            message.refresh({ confirmBtn: false, content: "咨询功能暂未开放，敬请谅解！"});
        }

    });

});