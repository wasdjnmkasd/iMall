
/** 模块组件
 *    @detail:    register组件_1
 *    @return:    can.Component
 *    @author:    林鹏腾
 *    @date:      2017.8.16
 */
define(["text!modular/template/template-register-1.mustache"], function(template){

    'use strict';

    var api = window.capi.get();

    return can.Component.extend({
        tag: "component-register-1",
        template: template,
        helpers: {
            returnShow: function(isOpen, isFocus, options){
                var tIsOpen = api.jsUtil.mustache.getContent(isOpen, "boolean");
                var tIsFocus = api.jsUtil.mustache.getContent(isFocus, "boolean");
                return tIsOpen && tIsFocus? options.fn(this): options.inverse(this);
            }
        },
        scope: {
            account_state: "",
            validation_state: "",
            password_state: "",
            confirmPassword_state: "",
            registerBtn_state: "",
            validateIphone: function(phoneNumber){
                return api.jsUtil.check.phone(phoneNumber);
            },
            validateValidation: function(validation){
                return validation.trim()!=="" && (/^.{6,18}$/gi).test(validation);
            },
            validatePassword: function(password){
                return password.trim()!=="" && (/^.{6,12}$/gi).test(password);
            },
            validateConfirmPassword: function(password, confirmPassword){
                return confirmPassword.trim()!=="" &&
                       password === confirmPassword &&
                       (/^.{6,12}$/gi).test(password);
            },
            validateInvitationCode: function(invitation){
                return invitation.trim()!=="";
            }
        },
        events: {
            "inserted": function(){

            },
            "removed": function(){

            },
            ".component-register-content>div>.iconRight touchstart": function(node){
                var $node = $(node);
                var $input = $node.prev();
                $node.addClass("active");
                if($node.hasClass("icon_clear")){
                    $input.val("");
                }else if($node.hasClass("icon_eye")){
                    $input.attr("type", "text");
                }
            },
            ".component-register-content>div>.iconRight touchend": function(node){
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
            "#validation blur": function(node){
                var that = this;
                var $node = $(node);
                if(!that.scope.validateValidation($node.val())){
                    that.scope.attr("validation_state", "state_error");
                }else{
                    that.scope.attr("validation_state", "");
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
            "#confirmPassword blur": function(node){
                var that = this;
                var $node = $(node);
                var $element = that.element;
                var $password = $element.find("#password");
                if(!that.scope.validateConfirmPassword($password.val(), $node.val())){
                    that.scope.attr("confirmPassword_state", "state_error");
                }else{
                    that.scope.attr("confirmPassword_state", "");
                }
            },
            ".component-register-registerBtn touchend": function(){
                var that = this;
                var $element = that.element;
                $element.find("#account").trigger("blur");
                $element.find("#password").trigger("blur");
                $element.find("#validation").trigger("blur");
                $element.find("#confirmPassword").trigger("blur");
                var account_state = that.scope.attr("account_state")!=="state_error";
                var validation_state = that.scope.attr("validation_state")!=="state_error";
                var password_state = that.scope.attr("password_state")!=="state_error";
                var confirmPassword_state = that.scope.attr("confirmPassword_state")!=="state_error";
                if(account_state && validation_state && password_state && confirmPassword_state){
                    that.scope.attr("registerBtn_state", "");
                } else {
                    that.scope.attr("registerBtn_state", "state_error");
                }
            }
        }
    })

});