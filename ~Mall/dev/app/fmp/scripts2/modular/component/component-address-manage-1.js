
/** 模块组件
 *    @detail:    address-manage组件_1
 *    @return:    can.Component
 *    @author:    林鹏腾
 *    @date:      2017.8.16
 */
define(["text!modular/template/template-address-manage-1.mustache"], function(template){

    'use strict';

    var api = window.capi.get();

    return can.Component.extend({
        tag: "component-address-manage-1",
        template: template,
        helpers: {
            returnList: function(list, options){
                var tList = api.jsUtil.mustache.getDepContent(list);
                return $.isArray(tList) && tList.length>0? options.fn(tList): options.inverse(tList);
            }
        },
        scope: {
        },
        events: {
            "inserted": function(){

            },
            "removed": function(){

            },
            ".address-manage-list .btnBox_left touchend": function(node){
                var that = this;
                var $node = $(node);
                that.element.find(".btnBox_left").removeClass("active");
                $node.addClass("active");
            }
        }
    });

});