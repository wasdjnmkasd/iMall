
/** 页面模块
 *    @detail:    register模块_1
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
            global: "<component-register-1></component-register-1>"
        },
        region: {
            global: {
                cfgDynamic: true,
                reqDynamic: true,
                resDynamic: false
            }
        },
        config: {
            global: {
                isOpen: false,
                isFocus: false,
                iShopTimer: null
            }
        },
        request: {
            global: {
                account:  "",
                validation: "",
                password: "",
                confirmPassword: ""
            }
        },
        sendArr: [],
        reload: false,


        //自定义事件
        ".component-register-shopInfo #shopInfo input": function(node){
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
                    });
                }, 250);
                that.renderData.global.config.attr('iShopTimer', iShopTimer);
            }else{
                that.renderData.global.config.attr('iShopArr', []);
            }
            that.renderData.global.config.attr("iShopId", "");
            that.renderData.global.config.attr("iDomain", "");
            that.renderData.global.config.attr("isFocus", true);
        },
        ".component-register-shopInfo #shopInfo blur": function(node){
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
                        message.refresh({type: "error", confirmBtn: false, content: response.errorMsg});
                    }else{
                        message.refresh({type: "info", confirmBtn: false, content: "暂未查询到与之相匹配的店铺！"});
                    }
                }).fail(function(response){
                    if(response && response.errorMsg){
                        message.refresh({type: "error", confirmBtn: false, content: response.errorMsg});
                    }else{
                        message.refresh({type: "error", confirmBtn: false, content: "查询店铺失败！"});
                    }
                });
            }else{
                that.renderData.global.config.attr('iShopArr', []);
            }
            that.renderData.global.config.attr("isFocus", false);
        },
        ".component-register-shopInfo #shopInfo touchend": function(node){
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
            else{
                that.renderData.global.config.attr('iShopArr', []);
            }
            $node.focus();
            that.renderData.global.config.attr("isFocus", true);
        },
        ".component-register-shopInfo ul.choose li touchend": function(node){
            var that = this;
            var $node = $(node);
            var domain = $node.attr("domain") || '';
            var shopId = $node.attr("shopId") || '';
            var shopName = $node.attr("shopName") || '';
            var $ShopInfo = $node.parents(".component-register-shopInfo");
            if(!api.jsEvent.touch.touchIsMoved) {
                $ShopInfo.find("#shopInfo").blur();
                that.renderData.global.config.attr("isFocus", false);
                that.renderData.global.config.attr("iShopId", shopId);
                that.renderData.global.config.attr("iDomain", domain);
                that.renderData.global.config.attr("iShopName", shopName);
            }
            return false;
        },
        ".component-register-shopInfo .btn_change touchend": function(){
            var that = this;
            var $element = that.element;
            var isOpen = that.renderData.global.config.attr("isOpen");
            $element.find("#shopInfo").blur();
            that.renderData.global.config.attr("isOpen", !isOpen);
            that.renderData.global.config.attr("iShopName", "");
            that.renderData.global.config.attr('iShopArr', []);
            that.renderData.global.config.attr("iShopId", "");
            that.renderData.global.config.attr("iDomain", "");
        },
        ".component-register-account #account blur": function(node){
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
                        if(response && response.success === true && response.obj == true){
                            message.refresh({
                                type:    "error",
                                cancelBtn: false,
                                confirmBtn: false,
                                content: "该手机号已被注册！"
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
        ".component-register-validation .getValidation touchend": function(node){
            var that = this;
            var $node = $(node);
            var $element = that.element;
            var message = that.modules.message;
            var $parent = $node.parents('.component-register-validation');
            $element.find("#account").blur();
            if(that.jsUtil.weChat.browser()){
                setTimeout(function(){
                    var request = that.renderData.global.request.attr();
                    var account_state = !$element.find("#account").hasClass("state_error");
                    if(account_state && that.jsUtil.check.phone(request.account)){
                        that.sendRequest("THIRD_PHONE", {
                            phone: request.account
                        }).done(function(response){
                            if(response && response.success){
                                var time = 60;
                                var setValidation_timer = function($node){
                                    if(time>0){
                                        time--;
                                        $parent.find(".doing .val").text(time);
                                        setTimeout(function(){ setValidation_timer($node); }, 1000);
                                    }else{
                                        $node.addClass("getValidation");
                                    }
                                };
                                $node.removeClass("getValidation");
                                setValidation_timer($node);
                            }else{
                                message.refresh({
                                    type:    "warring",
                                    cancelBtn: false,
                                    confirmBtn: false,
                                    content:  "验证码发送过于频繁"
                                });
                            }
                        }).fail(function(){
                            message.refresh({
                                type: "error",
                                cancelBtn: false,
                                confirmBtn: false,
                                content: "抱歉，手机验证码发送失败，请重试！"
                            });
                        })
                    }
                }, 200);
            }else{
                message.refresh({
                    type: "error",
                    cancelBtn: false,
                    confirmBtn: false,
                    content: "请在微信端进行操作！"
                });
            }
        },
        ".component-register-registerBtn:not(.state_error) touchend": function(){
            var that = this;
            var $element = that.element;
            var message = that.modules.message;
            var jumpUrl = that.renderData.global.config.jumpUrl;
            var domain = $element.find("#shopInfo").attr("domain") || '';
            var shopId = $element.find("#shopInfo").attr("shopId") || '';
            window.localStorage.removeItem("authId");
            window.localStorage.removeItem("userId");
            window.localStorage.removeItem("openId");
            if(that.jsUtil.weChat.browser()){
                setTimeout(function(){
                    var request = that.renderData.global.request.attr();
                    var account_state = !$element.find("#account").hasClass("state_error");
                    if(account_state && that.jsUtil.check.phone(request.account)){
                        that.sendRequest("USER_REGISTRATION", {
                            phone: request.account,
                            pwd:   request.password,
                            code:  request.validation
                        }).done(function(response){
                            if(response && response.success){
                                var userId = response.obj;
                                that.sendRequest("AUTH_REGISTER", {
                                    "phone":         request.account,
                                    "password":      request.password,
                                    "userCenterId":  userId
                                }).done(function(response){
                                    if(response && response.success){
                                        var snsapiBase = false;
                                        var isRegister = "true";
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
                                            content:  "用户注册失败！"
                                        });
                                    }
                                }).fail(function(){
                                    message.refresh({
                                        type:  "error",
                                        cancelBtn: false,
                                        confirmBtn: false,
                                        content:  "用户注册失败！"
                                    });
                                });
                            }
                            else if(response && response.obj == 1){
                                message.refresh({
                                    type:  "error",
                                    cancelBtn: false,
                                    confirmBtn: false,
                                    content: "验证码失效，请重试！"
                                });
                            }
                            else if(response.errorMsg){
                                message.refresh({
                                    type:  "error",
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
                                    content:  "用户注册失败！"
                                });
                            }
                        }).fail(function(){
                            message.refresh({
                                type:    "error",
                                cancelBtn: false,
                                confirmBtn: false,
                                content:  "用户注册失败！"
                            });
                        });
                    }
                }, 200)
            }else{
                message.refresh({
                    type: "error",
                    cancelBtn: false,
                    confirmBtn: false,
                    content: "请在微信端进行操作！"
                });
            }
        }

    });

});