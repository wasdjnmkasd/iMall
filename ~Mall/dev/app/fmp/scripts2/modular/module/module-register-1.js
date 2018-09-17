
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
            global: {}
        },
        request: {
            global: {
                account:  "",
                validation: "",
                password: "",
                confirmPassword: "",
                invitationCode: ""
            }
        },
        sendArr: [],
        reload: false,


        //自定义事件
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
            var shopId = api.jsData.userInfo.shopId || "";
            var gradeId = api.jsData.userInfo.gradeId || "";
            var jumpUrl = that.renderData.global.config.jumpUrl || "";
            window.localStorage.removeItem("authId");
            window.localStorage.removeItem("userId");
            window.localStorage.removeItem("openId");
            window.localStorage.removeItem("welfareVip");
            if(that.jsUtil.weChat.browser()){
                setTimeout(function(){
                    var request = that.renderData.global.request.attr();
                    var account_state = !$element.find("#account").hasClass("state_error");
                    var hasInvitationCode = request.invitationCode && (""+request.invitationCode).trim();
                    if(account_state && that.jsUtil.check.phone(request.account)){
                        that.sendRequest("USER_REGISTRATION", {
                            centerId: shopId || gradeId,
                            phone: request.account,
                            pwd:   request.password,
                            code:  request.validation,
                            invitationCode: hasInvitationCode? (""+request.invitationCode).trim(): undefined
                        }).done(function(response){
                            if(response && response.success){
                                var userId = response.obj;
                                that.sendRequest("AUTH_REGISTER", {
                                    "phone":         request.account,
                                    "password":      request.password,
                                    "userCenterId":  userId
                                }).done(function(response){
                                    if(response && response.success){
                                        var domain = "";
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