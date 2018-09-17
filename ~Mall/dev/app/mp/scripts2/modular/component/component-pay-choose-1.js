
/** 模块组件
 *    @detail:    pay-choose组件_1
 *    @return:    can.Component
 *    @author:    林鹏腾
 *    @date:      2017.8.16
 */
define(["text!modular/template/template-pay-choose-1.mustache"], function(template){

    'use strict';

    var api = window.capi.get();

    return can.Component.extend({
        tag: "component-pay-choose-1",
        template: template,
        helpers: {
            spoceConfig: function(config){
                this.spcConfig = api.jsUtil.mustache.getContent(config, "object");
            },
            returnShow: function(type, options){
                var isWeChat = api.jsUtil.weChat.browser();
                var tType = api.jsUtil.mustache.getContent(type, "string");
                if(tType === "btn_wx"){ return isWeChat? options.fn(this): options.inverse(this); }
                if(tType === "btn_zfb"){ return isWeChat? options.inverse(this): options.fn(this); }
                if(tType === "btn_yl"){ return options.fn(this); }
            }
        },
        scope: {
        },
        events: {
            "inserted": function(){

            },
            "removed": function(){

            },
            ".component-pay-choose-btnGroup ul li touchend": function(){
                var that = this;
                if(api.jsEvent.touch.touchIsMoved){ return null; }
                that.scope.spcConfig.attr("payChooseShow", false);
            },
            ".component-pay-choose-btnGroup .btn_cancel touchend": function(){
                var that = this;
                if(api.jsEvent.touch.touchIsMoved){ return null; }
                that.scope.spcConfig.attr().payState.reject();
                return false;
            },
            ".component-pay-choose-btnGroup .btn_wx touchend": function(){
                var that = this;
                if(api.jsEvent.touch.touchIsMoved){ return null; }
                that.scope.spcConfig.attr().payState.resolve("weChatPay");
                return false;
            },
            ".component-pay-choose-btnGroup .btn_zfb touchend": function(){
                var that = this;
                if(api.jsEvent.touch.touchIsMoved){ return null; }
                that.scope.spcConfig.attr().payState.resolve("aliPay");
                return false;
            },
            ".component-pay-choose-btnGroup .btn_yl touchend": function(){
                var that = this;
                if(api.jsEvent.touch.touchIsMoved){ return null; }
                that.scope.spcConfig.attr().payState.resolve("unionPay");
                return false;
            }
        }
    })

});