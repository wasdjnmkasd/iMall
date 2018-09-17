
/** 模块组件
 *    @detail:    nav组件_1
 *    @return:    can.Component
 *    @author:    林鹏腾
 *    @date:      2017.8.16
 */
define(["text!modular/template/template-nav-1.mustache"], function(template){

    'use strict';

    var api = window.capi.get();

    return can.Component.extend({
        tag: "component-nav-1",
        template: template,
        helpers: {
            returnCont: function(index, showIndex, options){
                var tIndex = api.jsUtil.mustache.getContent(index, "number");
                var tShowIndex = api.jsUtil.mustache.getContent(showIndex, "number");
                return tIndex === tShowIndex? options.fn(this): options.inverse(this);
            }
        },
        scope: {
            showIndex: 0
        },
        events: {
            "inserted": function(node){

            },
            ".component-nav-content .classify-list-left li[index] touchend": function(node){
                var $node = $(node);
                var index = $node.attr("index");
                if(!api.jsEvent.touch.touchIsMoved){
                    this.scope.attr("showIndex", index);
                    $("html,body,.classify-list-right").animate({scrollTop:0}, 350);
                }
            }
        }
    });

});