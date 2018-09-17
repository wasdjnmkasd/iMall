
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
                resDynamic:  false
            }
        },
        config: {
            global: {}
        },
        request: {
            global: {
                account: "",
                password: ""
            }
        },
        response: {
            global: {}
        },
        sendArr: [],
        reload: false,


        //自定义事件
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
            var message = that.modules.message;
            var shopId = api.jsData.userInfo.shopId || "";
            var request = that.renderData.global.request.attr();
            var jumpUrl = that.renderData.global.config.jumpUrl;
            window.localStorage.removeItem("authId");
            window.localStorage.removeItem("userId");
            window.localStorage.removeItem("openId");
            window.localStorage.removeItem("welfareVip");
            if(that.jsUtil.weChat.browser()){
                that.sendRequest("AUTH_LOGIN", {
                    phone: request.account,
                    password: request.password
                }).done(function(response){
                    if(response && response.success){
                        var domain = "";
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
            var message = that.modules.message;
            var jumpUrl = that.config.global.jumpUrl;
            var domainName = api.jsData.location.hostUrl;
            var url = domainName + "/wechat-transfer.html";
            var info = snsapiBase+"，"+isRegister+"，"+jumpUrl;
            window.localStorage.removeItem("authId");
            window.localStorage.removeItem("userId");
            window.localStorage.removeItem("openId");
            window.localStorage.removeItem("welfareVip");
            if(that.jsUtil.weChat.browser()){
                that.sendRequest("THIRD_WECHAT", {
                    snsapiBase: snsapiBase,
                    redirectUrl: url + "?info=" + info
                }).done(function(response){
                    if(typeof response === "string"){
                        window.location.href = response
                    }
                });
            }else{
                message.refresh({
                    cancelBtn: false,
                    confirmBtn: false,
                    content: "请在微信端进行操作！"
                });
            }
        }
    });

});