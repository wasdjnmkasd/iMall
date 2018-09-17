
/** 页面模块
 *    @detail:    personal-share模块_1
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
            global: "<component-share-1></component-share-1>"
        },
        region: {
            global: {}
        },
        config: {
            global: {}
        },
        request: {
            global: {}
        },
        response: {
            global: {}
        },
        sendArr: [],
        reload: false

        //自定义事件

    })
});