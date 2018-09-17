
/** 模块组件
 *    @detail:    bindInvitation组件_1
 *    @return:    can.Component
 *    @author:    林鹏腾
 *    @date:      2017.8.16
 */
define(["text!modular/template/template-bindInvitation-1.mustache"], function(template){

    'use strict';

    var api = window.capi.get();

    return can.Component.extend({
        tag: "component-bindinvitation-1",
        template: template,
        helpers: {
        },
        scope: {
            bingBtn_state: "",
            account_state: "",
            invitationCode: "",
            validateIphone: function(phoneNumber){
                return api.jsUtil.check.phone(phoneNumber);
            },
            validateInvitation: function(invitation){
                return invitation.trim()!=="";
            }
        },
        events: {
            "inserted": function(){

            },
            "removed": function(){

            },
            ".component-bindInvitation-content>div>.iconRight touchstart": function(node){
                var $node = $(node);
                var $input = $node.prev();
                $node.addClass("active");
                if($node.hasClass("icon_clear")){
                    $input.val("");
                }else if($node.hasClass("icon_eye")){
                    $input.attr("type", "text");
                }
            },
            ".component-bindInvitation-content>div>.iconRight touchend": function(node){
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
            "#invitationCode blur": function(node){
                var that = this;
                var $node = $(node);
                if(!that.scope.validateInvitation($node.val())){
                    that.scope.attr("invitationCode_state", "state_error");
                }else{
                    that.scope.attr("invitationCode_state", "");
                }
            },
            ".component-bindInvitation-bingBtn touchend": function(){
                var that = this;
                var $element = that.element;
                $element.find("#account").trigger("blur");
                $element.find("#invitationCode").trigger("blur");
                var account_state = that.scope.attr("account_state")!=="state_error";
                var invitationCode_state = that.scope.attr("invitationCode_state")!=="state_error";
                if(account_state && invitationCode_state){
                    that.scope.attr("bingBtn_state", "");
                }else{
                    that.scope.attr("bingBtn_state", "state_error");
                }
            }
        }
    })

});