
/** 模块组件
 *    @detail:    login组件_1
 *    @return:    can.Component
 *    @author:    林鹏腾
 *    @date:      2017.8.16
 */
define(["text!modular/template/template-login-1.mustache"], function(template){

    'use strict';

    var api = window.capi.get();

    return can.Component.extend({
        tag: "component-login-1",
        template: template,
        helpers: {
            returnShow: function(isOpen, isFocus, options){
                var tIsOpen = api.jsUtil.mustache.getContent(isOpen, "boolean");
                var tIsFocus = api.jsUtil.mustache.getContent(isFocus, "boolean");
                return tIsOpen && tIsFocus? options.fn(this): options.inverse(this);
            },
            returnArray: function(shopArr, options){
                var tShopArr = api.jsUtil.mustache.getDepContent(shopArr, "object");
                if($.isEmptyObject(tShopArr)){
                    return options.inverse(tShopArr);
                }else{
                    for(var i=tShopArr.length; i<10; i++){
                        tShopArr.push({});
                    }
                    return options.fn(tShopArr);
                }
            }
        },
        scope: {
            account_state: "",
            password_state: "",
            loginBtn_state: "",
            validateIphone: function(phoneNumber){
                return api.jsUtil.check.phone(phoneNumber);
            },
            validatePassword: function(password){
                return password.trim()!=="" && (/^.{6,12}$/gi).test(password);
            }
        },
        events: {
            "inserted": function(){

            },
            "removed": function(){

            },
            ".component-login-content>div>.iconRight touchstart": function(node){
                var $node = $(node);
                var $input = $node.prev();
                $node.addClass("active");
                if($node.hasClass("icon_clear")){
                    $input.val("");
                }else if($node.hasClass("icon_eye")){
                    $input.attr("type", "text");
                }
            },
            ".component-login-content>div>.iconRight touchend": function(node){
                var $node = $(node);
                var $input = $node.prev();
                $node.removeClass("active");
                if($node.hasClass("icon_eye")){
                    $input.attr("type", "password");
                }
            },
            "#account blur": function(node){
                var that = this;
                var $node = $(node);
                if(!that.scope.validateIphone($node.val())){
                    that.scope.attr("account_state", "state_error");
                }else{
                    that.scope.attr("account_state", "");
                }
            },
            "#password blur": function(node){
                var that = this;
                var $node = $(node);
                if(!that.scope.validatePassword($node.val())){
                    that.scope.attr("password_state", "state_error");
                }else{
                    that.scope.attr("password_state", "");
                }
            },
            ".component-login-loginBtn touchend": function(){
                var that = this;
                var $element = that.element;
                $element.find("#account").trigger("blur");
                $element.find("#password").trigger("blur");
                var account_state = that.scope.attr("account_state")!=="state_error";
                var password_state = that.scope.attr("password_state")!=="state_error";
                if(account_state && password_state){
                    that.scope.attr("loginBtn_state", "");
                }else{
                    that.scope.attr("loginBtn_state", "state_error");
                }
            }
        }
    })

});