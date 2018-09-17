
/** 页面模块
 *    @detail:    apply模块_1
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
            global: "<component-apply-1></component-apply-1>"
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
                userName: "",
                account:  "",
                validation: "",
                promotion: "",
                password: "",
                confirmPassword: "",
                inviter: "暂无邀请人"
            }
        },
        sendArr: [],
        reload: false,


        //自定义事件
        ".component-apply-validation .getValidation touchend": function(node){
            var that = this;
            var $node = $(node);
            var $element = that.element;
            var message = that.modules.message;
            var $parent = $node.parents('.component-apply-validation');
            $element.find("#account").blur();
            if(that.jsUtil.weChat.browser()){
                setTimeout(function(){
                    var config = that.renderData.global.config.attr();
                    var account_state = !$element.find("#account").hasClass("state_error");
                    if(account_state && that.jsUtil.check.phone(config.phone)){
                        that.sendRequest("THIRD_PHONE", {
                            phone: config.phone
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
                    cancelBtn: false,
                    confirmBtn: false,
                    content: "请在微信端进行操作！"
                });
            }
        },
        ".component-apply-submitBtn:not(.state_error) touchend": function(node){
            var that = this;
            var $element = that.element;
            var message = that.modules.message;
            var config = that.renderData.global.config.attr();
            var request = that.renderData.global.request.attr();
            var account_state = !$element.find("#account").hasClass("state_error");
            if(that.jsUtil.weChat.browser()){
                setTimeout(function(){
                    var shopIdExist = config.shopId && config.shopId.trim();
                    var validationExist = request.validation && request.validation.trim();
                    if(account_state && shopIdExist && validationExist && that.jsUtil.check(config.phone)){
                        that.sendRequest("USER_PUSHUSER_CREATE", {
                            phone: config.phone,
                            name: request.userName,
                            specialtyChannel: request.promotion,
                            inviter: request.inviter,
                            code:  request.validation,
                            gradeId: config.shopId,
                            type: 0
                        }).done(function(response){
                            if(response && response.success){
                                window.location.href = "/personal-center.html";
                            }else if(response && response.obj == 1){
                                message.refresh({
                                    type:  "error",
                                    cancelBtn: false,
                                    confirmBtn: false,
                                    content: "验证码失效，请重试！"
                                });
                            }else if(response.errorMsg){
                                message.refresh({
                                    type:  "error",
                                    cancelBtn: false,
                                    confirmBtn: false,
                                    content: response.errorMsg
                                });
                            }else{
                                message.refresh({
                                    type: "error",
                                    cancelBtn: false,
                                    confirmBtn: false,
                                    content:  "推手申请失败！"
                                });
                            }
                        }).fail(function(){
                            message.refresh({
                                type: "error",
                                cancelBtn: false,
                                confirmBtn: false,
                                content:  "推手申请失败！"
                            });
                        });
                    }
                }, 200);
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