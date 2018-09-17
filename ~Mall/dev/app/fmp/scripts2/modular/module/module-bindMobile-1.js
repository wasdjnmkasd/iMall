
/** 页面模块
 *    @detail:    bindMobile模块_1
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
            global: "<component-bindmobile-1></component-bindmobile-1>"
        },
        region: {
            global: {
                cfgDynamic: true,
                reqDynamic: true,
                resDynamic: false
            }
        },
        config: {
            global: {}
        },
        request: {
            global: {
                account:  "",
                validation: ""
            }
        },
        response: {
            global: {}
        },
        sendArr: [],
        reload: false,


        //自定义事件
        ".component-bindMobile-validation .getValidation touchend": function(node){
            var that = this;
            var $node = $(node);
            var message = that.modules.message;
            var request = that.renderData.global.request.attr();
            var $parent = $node.parents('.component-bindMobile-validation');
            if(that.jsUtil.weChat.browser()){
                if(that.jsUtil.check.phone(request.account)){
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
            }else{
                message.refresh({
                    cancelBtn: false,
                    confirmBtn: false,
                    content: "请在微信端进行操作！"
                });
            }
        },
        ".component-bindMobile-bingBtn:not(.state_error) touchend": function(){
            var that = this;
            var $element = that.element;
            var message = that.modules.message;
            var jumpUrl = that.renderData.global.config.jumpUrl;
            var shopId = api.jsData.userInfo.shopId;
            var openId = api.jsData.userInfo.openId;
            window.localStorage.removeItem("userId");
            window.localStorage.removeItem("openId");
            window.localStorage.removeItem("authId");
            if(that.jsUtil.weChat.browser()){
                setTimeout(function(){
                    var request = that.renderData.global.request.attr();
                    var account_state = !$element.find("#account").hasClass("state_error");
                    if(account_state && that.jsUtil.check.phone(request.account)){
                        that.sendRequest("USER_REGISTRATION", {
                            phone: request.account,
                            code:  request.validation
                        }).done(function(response){
                            if(response && response.success){
                                var userId = response.obj;
                                that.sendRequest("AUTH_LOGIN", {
                                    userCenterId: userId
                                }).done(function(response){
                                    if(response && response.success){
                                        var authId = '"Bearer "' + response.obj.token;
                                        window.localStorage.setItem("userId", userId);
                                        window.localStorage.setItem("authId", authId);
                                        window.localStorage.setItem("openId", openId);
                                        window.localStorage.setItem("alertDiscount", true);
                                        shopId && window.localStorage.setItem("shopId", shopId);
                                        that.jsUtil.url.jumpPage("/bindInvitation.html?jumpUrl="+jumpUrl, null);
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
                                            type:    "error",
                                            cancelBtn: false,
                                            confirmBtn: false,
                                            content:  "绑定手机失败！"
                                        });
                                    }
                                }).fail(function(){
                                    message.refresh({
                                        type:    "error",
                                        cancelBtn: false,
                                        confirmBtn: false,
                                        content: "绑定手机失败！"
                                    });
                                });
                            }
                            else if(response && response.obj == 1){
                                message.refresh({
                                    type:    "error",
                                    cancelBtn: false,
                                    confirmBtn: false,
                                    content: "验证码失效，请重试！"
                                });
                            }
                            else if(response.errorMsg){
                                message.refresh({
                                    type:    "error",
                                    cancelBtn: false,
                                    confirmBtn: false,
                                    content: response.errorMsg
                                });
                            }
                            else{
                                message.refresh({
                                    type:    "error",
                                    cancelBtn: false,
                                    confirmBtn: false,
                                    content:  "绑定手机失败！"
                                });
                            }
                        }).fail(function(){
                            message.refresh({
                                type:    "error",
                                cancelBtn: false,
                                confirmBtn: false,
                                content:  "绑定手机失败！"
                            });
                        });
                    }
                }, 200);
            }
            else{
                message.refresh({
                    cancelBtn: false,
                    confirmBtn: false,
                    content: "请在微信端进行操作！"
                });
            }
        }
    });

});