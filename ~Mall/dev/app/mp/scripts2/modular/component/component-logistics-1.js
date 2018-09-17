
/** 模块组件
 *    @detail:    logistics组件_1
 *    @return:    can.Component
 *    @author:    林鹏腾
 *    @date:      2017.8.16
 */
define([ "text!modular/template/template-logistics-1.mustache" ], function(template){

    'use strict';

    var api = window.capi.get();

    return can.Component.extend({
        tag: "component-logistics-1",
        template: template,
        helpers: {
            returnLength: function(length, options){
                var tLength = api.jsUtil.mustache.getContent(length, "number");
                return tLength>1? options.fn(this): options.inverse(tLength);
            }
        },
        scope: {
        },
        events: {
            "inserted": function(){},
            "removed": function(){},
            ".component-logistics-item .component-logistics-basic .btn_open touchend": function(node) {
                var that = this;
                var $node = $(node);
                var $element = that.element;
                var index = $node.attr("index");
                var $parent = $node.parents(".component-logistics-item");
                var oldScrollTop = $(window).scrollTop();
                var newScrollTop = 155*index;
                $element.find(".component-logistics-basic .btn").text("展开详情");
                $element.find(".component-logistics-basic .btn").addClass("btn_open");
                $element.find(".component-logistics-basic .btn").removeClass("btn_close");
                $element.find(".component-logistics-details").css({"display": "none"});
                $parent.find(".component-logistics-details").css({"display": "block"});
                if(oldScrollTop>newScrollTop){ $("html,body").animate({scrollTop: newScrollTop-10}); }
                $node.removeClass("btn_open");
                $node.addClass("btn_close");
                $node.text("关闭详情");
            },
            ".component-logistics-item .component-logistics-basic .btn_close touchend": function(node){
                var that = this;
                var $node = $(node);
                var $element = that.element;
                var index = $node.attr("index");
                var oldScrollTop = $(window).scrollTop();
                var newScrollTop = 155*index;
                $element.find(".component-logistics-basic .btn").text("展开详情");
                $element.find(".component-logistics-basic .btn").addClass("btn_open");
                $element.find(".component-logistics-basic .btn").removeClass("btn_close");
                $element.find(".component-logistics-details").css({"display": "none"});
                if(oldScrollTop>newScrollTop){ $("html,body").animate({scrollTop: newScrollTop-10}); }
            }
        }
    })

});