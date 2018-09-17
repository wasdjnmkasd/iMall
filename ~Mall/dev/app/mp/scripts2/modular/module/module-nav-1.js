
/** 页面模块
 *    @detail:    nav模块_1
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
            global: "<component-nav-1></component-nav-1>"
        },
        region: {
            global: {
                cfgDynamic: true,
                reqDynamic: false,
                resDynamic: false
            }
        },
        config:   {
            global: {
                showIndex: 0
            }
        },
        request: {},
        response: {},
        sendArr: ["PAGE_NAVIGATION"],
        reload: false,

        //自定义方法

        //自定义事件
        "li[thirdId] touchend": function(node){
            var $node = $(node);
            var thirdCategory = $node.attr("thirdId");
            var goodsName = $node.text() && $node.text().trim() || "";
            if(!api.jsEvent.touch.touchIsMoved && thirdCategory && goodsName){
                var historyList = [];
                var historyCache = JSON.parse(window.localStorage.getItem("historyCache"))||[];
                $.each(historyCache, function(index, obj){ historyList.push(obj.goodsName); });
                var index = $.inArray(goodsName, historyList);
                if(index !== -1){ historyCache.splice(index,1); }
                historyCache.unshift({ goodsName: goodsName, thirdId: thirdCategory });
                historyCache.splice(9, historyCache.length-9);
                window.localStorage.setItem("historyCache", JSON.stringify(historyCache));
                window.location.href = encodeURI("/searchProduct.html?goodsName="+goodsName+"&thirdCategory="+thirdCategory);
            }
        }

    });

});