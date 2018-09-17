
/** 页面模块
 *    @detail:    message模块_1
 *    @return:    can.Control
 *    @author:    林鹏腾
 *    @date:      2017.8.16
 */
define(["config.page.render"], function(Render) {

    'use strict';

    var api = window.capi.get();
    var isLogin = api.jsData.userInfo.isLogin;
    var sendArr = isLogin? ["COUPON_NODE_QUERY/global"]: [];

    return Render.extend({
        //子类扩展
        tags: {
            global: "<component-alert-discount-1></component-alert-discount-1>"
        },
        region: {
            global: {
                reqDynamic: true,
                resDynamic: false,
                beforeFunc: function(that, data){
                    if(!$.isArray(data.response.global) || data.response.global.length === 0){
                        that.config.global.isShow = false
                    }
                }
            }
        },
        config: {
            global: {
                isShow: window.localStorage.getItem("alertDiscount")
            }
        },
        request: {
            "COUPON_NODE_QUERY": { "node": 1 }
        },
        sendArr: sendArr,
        reload: false,


        //自定义方法
        refresh: function (data) {
            var that = this;
            var response = that.renderData.global.response;
            var isObject = $.isArray(response) && $.isPlainObject(response[0]);
            if (typeof data === "object") {
                $.each(data, function (key) {
                    that.config.global[key] = data[key];
                });
            }
            if(!isObject || !response[0].receiveStatus === -1){
                that.config.global.isShow = false;
            }
            that.renderFunc(["global"]);
        },


        //自定义事件
        '.component-alert-discount-alert .msg-btn touchend':function(){
            var that = this;
            var message = that.modules.message;
            var couponId = that.renderData.global.response[0].couponId;
            that.sendRequest('COUPON_RECEIVE',{
                'couponId': couponId
            }).done(function(response){
                if(response.success){
                    message.refresh({
                        content: "领取成功！是否跳转到我的优惠券？",
                        DOMClick: false,
                        cancelBtn: true,
                        confirmBtn: true,
                        cancelFun:  function(){},
                        confirmFun: function(){
                            window.location.href = '.discount.html?jumpUrl=/personal-center.html';
                        }
                    });
                    window.localStorage.removeItem("alertDiscount");
                    that.config.global = { isShow: false };
                    that.refresh();
                }else{
                    message.refresh({
                        cancelBtn: false,
                        confirmBtn: false,
                        content:   response.errorMsg || "领取失败！"
                    });
                    window.localStorage.removeItem("alertDiscount");
                    that.config.global = { isShow: false };
                    that.refresh();
                }
            }).fail(function(){
                message.refresh({
                    cancelBtn: false,
                    confirmBtn: false,
                    "content":   "领取失败！"
                });
                window.localStorage.removeItem("alertDiscount");
                that.config.global = { isShow: false };
                that.refresh();
            });
        },
        '.component-alert-discount-alert .cancel-btn touchend':function(){
            var that = this;
            window.localStorage.removeItem("alertDiscount");
            that.config.global = { isShow: false };
            that.refresh();
        }
    })

});