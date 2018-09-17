
/** 模块组件
 *    @detail:    bindMobile组件_1
 *    @return:    can.Component
 *    @author:    林鹏腾
 *    @date:      2017.8.16
 */
define(["text!modular/template/template-bindMobile-1.mustache"], function(template){

    'use strict';

    var api = window.capi.get();

    return can.Component.extend({
        tag: "component-bindmobile-1",
        template: template,
        helpers: {
        },
        scope: {
            bingBtn_state: "",
            account_state: "",
            validation_state: "",
            validateIphone: function(phoneNumber){
                return api.jsUtil.check.phone(phoneNumber);
            },
            validateValidation: function(validation){
                return validation.trim()!=="" && (/^.{6,18}$/gi).test(validation);
            }
        },
        events: {
            "inserted": function(){

            },
            "removed": function(){

            },
            ".component-bindMobile-content>div>.iconRight touchstart": function(node){
                var $node = $(node);
                var $input = $node.prev();
                $node.addClass("active");
                if($node.hasClass("icon_clear")){
                    $input.val("");
                }else if($node.hasClass("icon_eye")){
                    $input.attr("type", "text");
                }
            },
            ".component-bindMobile-content>div>.iconRight touchend": function(node){
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
            ".component-bindMobile-bingBtn touchend": function(){
                var that = this;
                var $element = that.element;
                $element.find("#account").trigger("blur");
                $element.find("#validation").trigger("blur");
                var account_state = that.scope.attr("account_state")!=="state_error";
                var validation_state = that.scope.attr("validation_state")!=="state_error";
                if(account_state && validation_state){
                    that.scope.attr("bingBtn_state", "");
                }else{
                    that.scope.attr("bingBtn_state", "state_error");
                }
            }
        }
    })

});