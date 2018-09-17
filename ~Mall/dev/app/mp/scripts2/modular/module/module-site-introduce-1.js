
/** 页面模块
 *    @detail:    site-introduce模块_1
 *    @return:    can.Control
 *    @author:    林鹏腾
 *    @date:      2017.8.16
 */
define(["config.page.render"], function(Render){

    'use strict';

    var api = window.capi.get();

    return Render.extend({
        //子类扩展
        tags: {
            global:  "<component-site-introduce-1></component-site-introduce-1>"
        },
        region: {},
        config: {},
        request: {},
        response: {},
        sendArr: [],
        reload: false


        //自定义方法


        //自定义事件

    })

});