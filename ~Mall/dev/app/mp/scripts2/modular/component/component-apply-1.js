
/** 模块组件
 *    @detail:    register组件_1
 *    @return:    can.Component
 *    @author:    林鹏腾
 *    @date:      2017.8.16
 */
define(["text!modular/template/template-apply-1.mustache"], function(template){

    'use strict';

    var api = window.capi.get();

    return can.Component.extend({
        tag: "component-apply-1",
        template: template,
        helpers: {
        },
        scope: {
            userName_state:"",
            account_state: "",
            validation_state: "",
            password_state: "",
            confirmPassword_state: "",
            promotion_state: "",
            inviter_state:"",
            submitBtn_state: "",
            validateExist: function(content){
                return content && content.trim()!=="";
            },
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
            }
        },
        events: {
            "inserted": function(){

            },
            "removed": function(){

            },
            ".component-apply-content>div>.iconRight touchstart": function(node){
                var $node = $(node);
                var $input = $node.prev();
                $node.addClass("active");
                if($node.hasClass("icon_clear")){
                    $input.val("");
                }else if($node.hasClass("icon_eye")){
                    $input.attr("type", "text");
                }
            },
            ".component-apply-content>div>.iconRight touchend": function(node){
                var $node = $(node);
                var $input = $node.prev();
                $node.removeClass("active");
                if($node.hasClass("icon_eye")){
                    $input.attr("type", "password");
                }
            },
            "#userName blur": function(node){
                var that = this;
                var $node = $(node);
                if(!that.scope.validateExist($node.val())){
                    that.scope.attr("userName_state", "state_error");
                }else{
                    that.scope.attr("userName_state", "");
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
            "#inviter blur": function(node){
                var that = this;
                var $node = $(node);
                if(!that.scope.validateExist($node.val())){
                    that.scope.attr("inviter_state", "state_error");
                }else{
                    that.scope.attr("inviter_state", "");
                }
            },
            "#promotion blur": function(node){
                var that = this;
                var $node = $(node);
                if(!that.scope.validateExist($node.val())){
                    that.scope.attr("promotion_state", "state_error");
                }else{
                    that.scope.attr("promotion_state", "");
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
            ".component-apply-submitBtn touchend": function(){
                var that = this;
                var $element = that.element;
                $element.find("#userName").trigger("blur");
                $element.find("#account").trigger("blur");
                $element.find("#validation").trigger("blur");
                $element.find("#promotion").trigger("blur");
                $element.find("#inviter").trigger("blur");
                var userName_state = that.scope.attr("userName_state")!=="state_error";
                var account_state = that.scope.attr("account_state")!=="state_error";
                var validation_state = that.scope.attr("validation_state")!=="state_error";
                var promotion_state = that.scope.attr("promotion_state")!=="state_error";
                var inviter_state = that.scope.attr("inviter_state")!=="state_error";
                if(userName_state && account_state && validation_state && promotion_state && inviter_state){
                    that.scope.attr("submitBtn_state", "");
                }else{
                    that.scope.attr("submitBtn_state", "state_error");
                }
            }
        }
    })

});