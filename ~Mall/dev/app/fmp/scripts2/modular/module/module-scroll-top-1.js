
/** 页面模块
 *    @detail:    scroll-top模块_1
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
            global: "<component-scroll-top-1></component-scroll-top-1>"
        },
        region: {
            global: {
                cfgDynamic: false,
                reqDynamic: false,
                resDynamic: false
            }
        },
        config: {},
        request: {},
        response: {},
        sendArr: [],
        reload: false,


        //自定义方法


        //自定义事件

    });

});