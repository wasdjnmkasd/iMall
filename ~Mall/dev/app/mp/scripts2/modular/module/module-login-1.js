
/** 页面模块
 *    @detail:    login模块_1
 *    @return:    can.Control
 *    @author:    林鹏腾
 *    @date:      2017.8.16
 */
define(["config.page.render"], function(Render) {

    'use strict';

    var api = window.capi.get();

    return Render.extend({
        //子类扩展
        tags: {
            global: "<component-login-1></component-login-1>"
        },
        region: {
            global: {
                cfgDynamic:  true,
                reqDynamic:  true,
                resDynamic:  false,
                beforeFunc: function(that, data){
                    that.config.global.bShopArr = data.response.global || [];
                }
            }
        },
        config: {
            global: {
                isOpen: false,
                isFocus: false,
                iShopTimer: null,
                bombBox: false,
                state: null
            }
        },
        request: {
            global: {
                account: "",
                password: ""
            },
            USER_CHOOSESHOP_QUERY: {
                name: ""
            }
        },
        response: {
            global: {}
        },
        sendArr: ["USER_CHOOSESHOP_QUERY"],
        reload: false,


        //自定义事件
        ".component-login-shopInfo #shopInfo input": function(node){
            var that = this;
            var $node = $(node);
            var shopName = $node.val();
            var iShopTimer = that.renderData.global.config.attr('iShopTimer');
            clearTimeout(iShopTimer);
            if(shopName){
                iShopTimer = setTimeout(function(){
                    that.sendRequest("USER_CHOOSESHOP_QUERY", {
                        name: shopName
                    }).done(function(response){
                        if(response && response.success){
                            that.renderData.global.config.attr('iShopArr', response.obj||[]);
                        }
                    }).fail(function(){
                        that.renderData.global.config.attr('iShopArr', []);
                    });
                }, 250);
                that.renderData.global.config.attr('iShopTimer', iShopTimer);
            }
            else{
                that.renderData.global.config.attr('iShopArr', []);
                that.renderData.global.config.attr('iShopTimer', null);
            }
            that.renderData.global.config.attr("iShopId", "");
            that.renderData.global.config.attr("iDomain", "");
            that.renderData.global.config.attr("isFocus", true);
        },
        ".component-login-shopInfo #shopInfo blur": function(node){
            var that = this;
            var $node = $(node);
            var shopName = $node.val();
            var message = that.modules.message;
            if(shopName){
                that.sendRequest("USER_CHOOSESHOP_QUERY", {
                    name: shopName
                }).done(function(response){
                    if(response && response.success){
                        that.renderData.global.config.attr('iShopArr', response.obj||[]);
                        $.isEmptyObject(response.obj) && message.refresh({type: "info", confirmBtn: false, content: "暂未查询到与之相匹配的店铺！"});
                    }else if(response && response.errorMsg){
                        that.renderData.global.config.attr('iShopArr', []);
                        message.refresh({type: "error", confirmBtn: false, content: response.errorMsg});
                    }else{
                        that.renderData.global.config.attr('iShopArr', []);
                        message.refresh({type: "info", confirmBtn: false, content: "暂未查询到与之相匹配的店铺！"});
                    }
                }).fail(function(response){
                    if(response && response.errorMsg){
                        that.renderData.global.config.attr('iShopArr', []);
                        message.refresh({type: "error", confirmBtn: false, content: response.errorMsg});
                    }else{
                        that.renderData.global.config.attr('iShopArr', []);
                        message.refresh({type: "error", confirmBtn: false, content: "查询店铺失败！"});
                    }
                });
            }
            else{
                that.renderData.global.config.attr('iShopArr', []);
            }
            that.renderData.global.config.attr("isFocus", false);
        },
        ".component-login-shopInfo #shopInfo touchend": function(node){
            var that = this;
            var $node = $(node);
            var shopName = $node.val();
            if(shopName){
                that.sendRequest("USER_CHOOSESHOP_QUERY", {
                    name: shopName
                }).done(function(response){
                    if(response && response.success){
                        that.renderData.global.config.attr('iShopArr', response.obj||[]);
                    }
                });
            }
            $node.focus();
            that.renderData.global.config.attr("isFocus", true);
        },
        ".component-login-shopInfo ul.choose li touchend": function(node){
            var that = this;
            var $node = $(node);
            var domain = $node.attr("domain") || '';
            var shopId = $node.attr("shopId") || '';
            var shopName = $node.attr("shopName") || '';
            var $ShopInfo = $node.parents(".component-login-shopInfo");
            if(!api.jsEvent.touch.touchIsMoved) {
                $ShopInfo.find("#shopInfo").blur();
                that.renderData.global.config.attr("isFocus", false);
                that.renderData.global.config.attr("iShopId", shopId);
                that.renderData.global.config.attr("iDomain", domain);
                that.renderData.global.config.attr("iShopName", shopName);
            }
            return false;
        },
        ".component-login-shopInfo .btn_change touchend": function(){
            var that = this;
            var isOpen = that.renderData.global.config.attr("isOpen");
            that.renderData.global.config.attr("isOpen", !isOpen);
            that.renderData.global.config.attr("iShopName", "");
            that.renderData.global.config.attr('iShopArr', []);
            that.renderData.global.config.attr("iShopId", "");
            that.renderData.global.config.attr("iDomain", "");
        },
        ".component-login-account #account blur": function(node){
            var that = this;
            var $node = $(node);
            var message = that.modules.message;
            var request = that.renderData.global.request.attr();
            var isPhone = that.jsUtil.check.phone(request.account);
            if(isPhone){
                if(that.jsUtil.weChat.browser()){
                    that.sendRequest("AUTH_CHECK", {
                        userName: request.account,
                        phone: request.account
                    }).done(function(response){
                        if(response && response.success === true && response.obj == false){
                            message.refresh({
                                type:    "error",
                                cancelBtn: false,
                                confirmBtn: false,
                                content: "该手机号尚未注册！"
                            });
                            $node.addClass("state_error");
                        }else{
                            $node.removeClass("state_error");
                        }
                    }).fail(function(){
                        message.refresh({
                            type:    "error",
                            cancelBtn: false,
                            confirmBtn: false,
                            content: "未能查询到该手机号是否已注册！"
                        });
                        $node.removeClass("state_error");
                    })
                }
            }
        },
        ".component-login-loginBtn:not(.state_error) touchend": function(){
            var that = this;
            var $element= that.element;
            var message = that.modules.message;
            var jumpUrl = that.renderData.global.config.jumpUrl;
            var request = that.renderData.global.request.attr();
            var domain = $element.find("#shopInfo").attr("domain") || '';
            var shopId = $element.find("#shopInfo").attr("shopId") || '';
            window.localStorage.removeItem("authId");
            window.localStorage.removeItem("userId");
            window.localStorage.removeItem("openId");
            if(that.jsUtil.weChat.browser()){
                that.sendRequest("AUTH_LOGIN", {
                    phone: request.account,
                    password: request.password
                }).done(function(response){
                    if(response && response.success){
                        var isRegister = "";
                        var snsapiBase = false;
                        var domainName = api.jsData.location.hostUrl;
                        var url = domainName + "/wechat-transfer.html";
                        var authId = '"Bearer "' + response.obj.token;
                        var userId = response.obj.userCenterId;
                        var info = snsapiBase+"，"+isRegister+"，"+jumpUrl+"，"+shopId+"，"+userId+"，"+authId+"，"+domain;
                        that.sendRequest("THIRD_WECHAT", {
                            snsapiBase: snsapiBase,
                            redirectUrl: url + "?info=" + info
                        }).done(function(response){
                            if(typeof response === "string"){
                                window.location.href = response
                            }
                        });
                        that.jsUtil.url.setParam({ 'domain': domain||'' }, 'cover');
                    }
                    else if(response.errorMsg){
                        message.refresh({
                            type: "error",
                            cancelBtn: false,
                            confirmBtn: false,
                            content: response.errorMsg
                        });
                    }
                    else{
                        message.refresh({
                            type: "error",
                            cancelBtn: false,
                            confirmBtn: false,
                            content: "用户登录失败！"
                        });
                    }
                }).fail(function(){
                    message.refresh({
                        type: "error",
                        cancelBtn: false,
                        confirmBtn: false,
                        content: "用户登录失败！"
                    });
                });
            }
            else{
                message.refresh({
                    type: "error",
                    cancelBtn: false,
                    confirmBtn: false,
                    content: "请在微信端进行操作！"
                });
            }
        },
        ".component-login-third .img_weChat touchend": function(){
            var that = this;
            var isRegister = "";
            var snsapiBase = true;
            var $element = that.element;
            var message = that.modules.message;
            var jumpUrl = that.config.global.jumpUrl;
            var domainName = api.jsData.location.hostUrl;
            var url = domainName + "/wechat-transfer.html";
            var info = snsapiBase+"，"+isRegister+"，"+jumpUrl;
            window.localStorage.removeItem("authId");
            window.localStorage.removeItem("userId");
            window.localStorage.removeItem("openId");
            if(that.jsUtil.weChat.browser()){
                if(that.renderData.global.config.attr("shopId")||true){
                    that.sendRequest("THIRD_WECHAT", {
                        snsapiBase: snsapiBase,
                        redirectUrl: url + "?info=" + info
                    }).done(function(response){
                        if(typeof response === "string"){
                            window.location.href = response
                        }
                    });
                }else{
                    that.renderData.global.config.attr("state", $.Deferred());
                    that.renderData.global.config.attr("bombBox", true);
                    $element.find("input").attr("disabled", "disabled");
                    $.when(that.renderData.global.config.attr("state"))
                        .done(function(domain, shopId){
                            that.sendRequest("THIRD_WECHAT", {
                                snsapiBase: snsapiBase,
                                redirectUrl: url + "?info=" + info+"，"+shopId+"，，，"+domain
                            }).done(function(response){
                                if(typeof response === "string"){
                                    window.location.href = response
                                }
                            });
                            that.jsUtil.url.setParam({ 'domain': domain||'' }, 'cover');
                        });
                }
            }else{
                message.refresh({
                    cancelBtn: false,
                    confirmBtn: false,
                    content: "请在微信端进行操作！"
                });
            }
        },
        ".component-login-bombBox .body li:not(.lose) touchend": function(node){
            var that = this;
            var $node = $(node);
            var domain = $node.attr("domain");
            var shopId = $node.attr("shopId");
            var shopName = $node.attr("shopName");
            if(!api.jsEvent.touch.touchIsMoved){
                that.renderData.global.config.attr("bShopName", shopName? "店铺："+shopName: "");
                that.renderData.global.config.attr("bShopId", shopId? shopId: "");
                that.renderData.global.config.attr("bDomain", domain? domain: "");
            }
            return false;
        },
        ".component-login-bombBox .header .btn touchend": function(node){
            var that = this;
            var $node = $(node);
            var $element = that.element;
            var message = that.modules.message;
            var $shopInfo = $element.find("#bShopInfo");
            var shopId = $shopInfo.attr("shopId") || '';
            var domain = $shopInfo.attr("domain") || '';
            if($node.hasClass("btn_ignore")){
                $element.find("input").removeAttr("disabled");
                that.renderData.global.config.attr("bombBox", false);
                that.renderData.global.config.attr("state").resolve("", "");
            }else if($node.hasClass("btn_sure")){
                if(shopId){
                    $element.find("input").removeAttr("disabled");
                    that.renderData.global.config.attr("bombBox", false);
                    that.renderData.global.config.attr("state").resolve(domain||"", shopId||"");
                }else{
                    message.refresh({type: "info", confirmBtn: false, content: "尚未选择店铺！"});
                }
            }
            return false;
        }
    });

});