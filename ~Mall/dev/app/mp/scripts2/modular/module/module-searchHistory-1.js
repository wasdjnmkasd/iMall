
/** 页面模块
 *    @detail:    searchHistory模块_1
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
            global: "<component-searchhistory-1></component-searchhistory-1>"
        },
        region: {
            global: {
                cfgDynamic: true,
                reqDynamic: false,
                resDynamic: false,
                beforeFunc: function(that, data){
                    var hotSearchList = [];
                    $.each(data.response.global, function(index, navObj){
                        hotSearchList.push({
                            firstId: navObj.id,
                            industryName: navObj.industryName
                        })
                    });
                    that.response.global.hotSearchList = hotSearchList;
                }
            }
        },
        config: {
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
        ".component-searchHistory-content li touchend": function(node){
            var $node = $(node);
            var goodsName = $node.text() && $node.text().trim() || "";
            var firstCategory = $node.attr("firstId") && $node.attr("firstId").trim() || "";
            var secondCategory = $node.attr("secondId") && $node.attr("secondId").trim() || "";
            var thirdCategory = $node.attr("thirdId") && $node.attr("thirdId").trim() || "";
            if(!api.jsEvent.touch.touchIsMoved){
                var historyList = [];
                var historyCache = JSON.parse(window.localStorage.getItem("historyCache"))||[];
                $.each(historyCache, function(index, obj){ historyList.push(obj.goodsName); });
                var index = $.inArray(goodsName, historyList);
                if(index !== -1){ historyCache.splice(index,1); }
                historyCache.unshift({
                    goodsName: goodsName,
                    firstId: firstCategory,
                    secondId: secondCategory,
                    thirdId: thirdCategory
                });
                historyCache.splice(9, historyCache.length-9);
                window.localStorage.setItem("historyCache", JSON.stringify(historyCache));
                window.location.href = encodeURI("/searchProduct.html?goodsName="+goodsName+"&firstCategory="+firstCategory+"&secondCategory="+secondCategory+"&thirdCategory="+thirdCategory);
            }
        },
        ".component-searchHistory-content .icon_delete touchend": function(){
            var that = this;
            var message = that.modules.message;
            message.refresh({
                content: "是否清除所有搜索内容？",
                DOMClick: false,
                cancelBtn: true,
                confirmBtn: true,
                cancelFun: function(){},
                confirmFun: function(){
                    window.localStorage.setItem("historyCache", JSON.stringify([]));
                    that.renderData.global.config.attr("historyCache", []);
                }
            });
        }
    });

});