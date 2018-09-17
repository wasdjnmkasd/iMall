
/** 模块组件
 *    @detail:    header组件_1
 *    @return:    can.Component
 *    @author:    林鹏腾
 *    @date:      2017.8.16
 */
define(["text!modular/template/template-searchHistory-1.mustache"], function(template){

    'use strict';

    var api = window.capi.get();

    return can.Component.extend({
        tag: "component-searchhistory-1",
        template: template,
        helpers: {
            returnHistory: function(historyCache, options){
                var tHistoryCache = api.jsUtil.mustache.getDepContent(historyCache, "object");
                return $.isArray(tHistoryCache) && tHistoryCache.length>0 ?
                    options.fn(this.context): options.inverse(this.context);
            }
        },
        scope: {
        },
        events: {
        }
    });

});