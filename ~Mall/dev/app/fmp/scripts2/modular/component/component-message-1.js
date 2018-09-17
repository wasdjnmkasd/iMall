
/** 模块组件
 *    @detail:    message组件_1
 *    @return:    can.Component
 *    @author:    林鹏腾
 *    @date:      2017.8.16
 */
define([ "text!modular/template/template-message-1.mustache" ], function(template){

    'use strict';

    var api = window.capi.get();

    return can.Component.extend({
        tag: "component-message-1",
        template: template,
        helpers: {
            scopeModule: function(module){
                this.spcModule = api.jsUtil.mustache.getContent(module, "object");
            },
            returnHeaderText: function(type, language){
                var returnVal = null;
                var tType = api.jsUtil.mustache.getContent(type, "string");
                var tLanguage = api.jsUtil.mustache.getContent(language, "string");
                if(tLanguage === "en"){
                    switch(tType){
                        case "success": returnVal = "Success"; break;
                        case "error":   returnVal = "Error"; break;
                        case "warning": returnVal = "Warning"; break;
                        default:        returnVal = "Information";
                    }
                }
                else{
                    switch(tType){
                        case "success": returnVal = "成功"; break;
                        case "error":   returnVal = "失败"; break;
                        case "warning": returnVal = "警告"; break;
                        default:        returnVal = "提示";
                    }
                }
                return can.mustache.safeString(returnVal);
            },
            returnHeaderIcon: function(type){
                var returnVal = null;
                var tType = api.jsUtil.mustache.getContent(type, "string");
                switch(tType){
                    case "success": returnVal = "success"; break;
                    case "error":   returnVal = "error"; break;
                    case "warning": returnVal = "warning"; break;
                    default:        returnVal = "info";
                }
                return can.mustache.safeString(returnVal);
            },
            returnConfirmBtn: function(bool, options){
                var tBool = api.jsUtil.mustache.getContent(bool);
                return tBool === false?
                    options.inverse(options.context||this):
                    options.fn(options.context||this);
            },
            returnCancelBtn: function(bool, options){
                var tBool = api.jsUtil.mustache.getContent(bool);
                return tBool === true?
                    options.fn(options.context||this):
                    options.inverse(options.context||this);
            },
            returnFooterText: function(type, language){
                var returnVal = null;
                var tType = api.jsUtil.mustache.getContent(type, "string");
                var tLanguage = api.jsUtil.mustache.getContent(language, "string");
                if(tType === "confirm"){
                    if(tLanguage === "en"){
                        returnVal = "confirm";
                    }
                    else{
                        returnVal = "确定";
                    }
                }
                else if(tType === "cancel"){
                    if(tLanguage === "en"){
                        returnVal = "cancel";
                    }
                    else{
                        returnVal = "取消";
                    }
                }
                return can.mustache.safeString(returnVal);
            },
            scopeFunction: function(type, config){
                var tConfig = api.jsUtil.mustache.getContent(config, "object");
                var tType = api.jsUtil.mustache.getContent(type, "string");
                if(tType === "cancel"){
                    this.cancelFun = tConfig.cancelFun;
                }
                if(tType === "confirm"){
                    this.confirmFun = tConfig.confirmFun;
                }
                if(tType === "timeOutFun"){
                    this.timeOutFun = tConfig.timeOutFun;
                }
            },
            scopeDOMClick: function(DOMClick){
                var tDOMClick = typeof DOMClick==='function'? DOMClick(): DOMClick;
                if(tDOMClick === false){
                    this.DOMClick = false;
                }
            }
        },
        scope: {
            spcModule: null,
            DOMClick: true,
            triggerMode: null,
            cancelFun: null,
            confirmFun: null
        },
        events: {
            "inserted": function(){
                var that = this;
                var $element = that.element;
                var module = that.scope.spcModule;
                var config = module && module.config || {};
                var $component = $element.find(".component-message-content");
                if(config.global.content && config.global.confirmBtn !== false){
                    config.global.isShowing = true;
                    $component.css({"opacity": 0});
                    $component.animate({"opacity": 1}, 600, "linear", function(){
                        config.global.isShowing = false;
                    });
                }
                else if(config.global.content){
                    config.global.isShowing = true;
                    $component.css({"opacity": 0});
                    $component.finish().animate({"opacity": 1}, 360, function(){
                        setTimeout(function(){
                            $component.finish().animate({"opacity": 0}, 600, function(){
                                config.global = {
                                    time: 0,
                                    type: "info",
                                    language: "zh",
                                    content: null,
                                    DOMClick: false,
                                    cancelBtn: false,
                                    confirmBtn: true,
                                    cancelFun: function (){},
                                    confirmFun: function (){},
                                    timeOutFun: function (){}
                                };
                                config.global.isShowing = false;
                                $.isFunction(that.scope.timeOutFun) &&
                                that.scope.timeOutFun();
                                module.refresh();
                            });
                        }, config.global.time||2000);
                    });
                }
            },
            "removed": function(){
                var that = this;
                var triggerMode = that.scope.attr("triggerMode");
                var isConfirm = that.scope.confirmBtn !== false;
                if(isConfirm && triggerMode === "document"){
                    that.scope.cancelBtn === true && $.isFunction(that.scope.cancelFun)? that.scope.cancelFun():
                    that.scope.confirmBtn !== false && $.isFunction(that.scope.confirmFun)? that.scope.confirmFun(): null;
                }
                else if(isConfirm && triggerMode === "cancel"){
                    $.isFunction(that.scope.cancelFun) && that.scope.cancelFun();
                }
                else if(isConfirm && triggerMode === "confirm"){
                    $.isFunction(that.scope.confirmFun) && that.scope.confirmFun();
                }
            },
            "{document} touchend": function(node, ev){
                var that = this;
                var event = ev || window.event;
                var $node = $(event.target||event.srcElement);
                var isInModule = $node.parents(".component-message-content").length>0;
                var isConfirm = that.scope.confirmBtn !== false;
                var DOMClick = that.scope.DOMClick !== false;
                if(!isInModule && isConfirm && DOMClick){
                    that.scope.attr("triggerMode", "document");
                }
            },
            ".component-message-footer .btn_cancel touchend": function(){
                var that = this;
                that.scope.attr("triggerMode", "cancel");
            },
            ".component-message-footer .btn_confirm touchend": function(){
                var that = this;
                that.scope.attr("triggerMode", "confirm");
            }
        }
    })

});