
/** 页面模块
 *    @detail:    forgetPassword模块_1
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
            global: "<component-forgetpassword-1></component-forgetpassword-1>"
        },
        region: {
            global: {
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
                confirmPassword: ""
            }
        },
        sendArr: [],
        reload: false,


        //自定义事件
        ".component-forgetPassword-account #account blur": function(node){
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
                            $node.removeClass("state_error");
                        }else{
                            message.refresh({
                                type:    "error",
                                cancelBtn: false,
                                confirmBtn: false,
                                content: "该手机号尚未注册！"
                            });
                            $node.addClass("state_error");
                        }
                    }).fail(function(){
                        message.refresh({
                            type:    "error",
                            cancelBtn: false,
                            confirmBtn: false,
                            content: "未能查询到该手机号是否已注册！"
                        });
                        $node.addClass("state_error");
                    })
                }
            }
        },
        ".component-forgetPassword-validation .getValidation touchend": function(node){
            var that = this;
            var $node = $(node);
            var $element = that.element;
            var message = that.modules.message;
            var $parent = $node.parents('.component-forgetPassword-validation');
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
        ".component-forgetPassword-forgetPasswordBtn:not(.state_error) touchend": function(){
            var that = this;
            var $element = that.element;
            var message = that.modules.message;
            var jumpUrl = that.renderData.global.config.jumpUrl;
            if(that.jsUtil.weChat.browser()){
                setTimeout(function(){
                    var request = that.renderData.global.request.attr();
                    var account_state = !$element.find("#account").hasClass("state_error");
                    if(account_state && that.jsUtil.check.phone(request.account)){
                        window.localStorage.removeItem("authId");
                        window.localStorage.removeItem("userId");
                        window.localStorage.removeItem("openId");
                        that.sendRequest("AUTH_PWD_CHANGE", {
                            userName:  request.account,
                            password:  request.password,
                            code:      request.validation
                        }).done(function(response){
                            if(response && response.success){
                                message.refresh({
                                    content: '修改密码成功!',
                                    cancelBtn: false,
                                    confirmBtn: false,
                                    timeOutFun: function() {
                                        that.jsUtil.url.jumpPage("/login.html?jumpUrl=" + jumpUrl, null);
                                    }
                                });
                            }else{
                                message.refresh({
                                    cancelBtn: false,
                                    confirmBtn: false,
                                    content: response.errorMsg
                                });
                            }
                        }).fail(function(){
                            message.refresh({
                                content: "修改密码失败!",
                                confirmBtn: false
                            });
                        });
                    }
                },200)
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