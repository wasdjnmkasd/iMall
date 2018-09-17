
/** 页面模块
 *    @detail:    footer模块_1
 *    @return:    can.Control
 *    @author:    林鹏腾
 *    @date:      2017.8.16
 */
define(["config.page.render"], function(Render) {

    'use strict';

    var api = window.capi.get();
    var isLogin = api.jsData.userInfo.isLogin;
    var welfareVip = api.jsData.userInfo.welfareVip;
    var sendArr = isLogin? ["ORDER_SHOPPINGCART_COUNT/global/count"]: [];

    return Render.extend({
        //子类扩展
        tags: {
            global: "<component-footer-1></component-footer-1>"
        },
        region: {
            global: {
                cfgDynamic: true,
                reqDynamic: true,
                resDynamic: true
            }
        },
        config: {
            global: {
                isCall: true
            }
        },
        request: {
            "ORDER_SHOPPINGCART_COUNT": {
                platformSource: 7
            }
        },
        response: {},
        sendArr: sendArr,
        reload: false,


        //自定义事件

    });

});