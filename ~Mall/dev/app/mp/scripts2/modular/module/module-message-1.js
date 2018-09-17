
/** 页面模块
 *    @detail:    message模块_1
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
            global: "<component-message-1></component-message-1>"
        },
        region: {
            global: {
                cfgDynamic: false,
                reqDynamic: true,
                resDynamic: false
            }
        },
        config: {
            global: {}
        },
        request: {},
        response: {},
        sendArr: [],
        reload: false,


        //自定义方法
        refresh: function(data){
            var that = this;
            if(typeof data === "object"){
                $.each(data, function(key){
                    that.config.global[key] = data[key];
                });
            }
            if(!that.config.global.isShowing){ that.renderFunc(["global"]); }
        },


        //自定义事件
        "{document} touchend": function(node, ev){
            var that = this;
            var event = ev || window.event;
            var $node = $(event.target||event.srcElement);
            var $element = that.element;
            var $component = $element.find(".component-message-content");
            var isInModule = $node.parents(".component-message-content").length>0;
            var isConfirm = that.config.global.confirmBtn !== false;
            var DOMClick = that.config.global.DOMClick !== false;
            if(!isInModule && isConfirm && DOMClick){
                $component.animate({"opacity": 0}, 600, function(){
                    that.config.global = {
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
                    that.refresh();
                });
            }
        },
        ".component-message-footer .btn_confirm touchend": function(){
            var that = this;
            var $element = that.element;
            var $component = $element.find(".component-message-content");
            $component.animate({"opacity": 0}, 600, function(){
                that.config.global = {
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
                that.refresh();
            });
        },
        ".component-message-footer .btn_cancel touchend": function(){
            var that = this;
            var $element = that.element;
            var $component = $element.find(".component-message-content");
            $component.animate({"opacity": 0}, 600, function(){
                that.config.global = {
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
                that.refresh();
            });
        }
    })

});