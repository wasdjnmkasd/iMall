
/** 页面模块
 *    @detail:    personal-center模块_1
 *    @return:    can.Control
 *    @author:    林鹏腾
 *    @date:      2017.8.16
 */
define(["config.page.render"], function(Render) {

    'use strict';

    var api = window.capi.get();
    var shopId = api.jsData.userInfo.shopId;
    var gradeId = api.jsData.userInfo.gradeId;
    var userId = api.jsData.userInfo.userId;
    var authId = api.jsData.userInfo.authId;
    var openId = api.jsData.userInfo.openId;
    var isLogin = api.jsData.userInfo.isLogin;
    var welfareVip = api.jsData.userInfo.welfareVip;
    var sendArr = [];

    if(shopId){ sendArr = sendArr.concat(["USER_SHOPINFO_QUERY/global/shopInfo"]) }
    if(isLogin){ sendArr = sendArr.concat(["USER_DETAIL_QUERY/global/userInfo", "ORDER_USER_STATUS_COUNT/global/orderStatus", "USER_INVITERINFO_CHECK/global/getInvitation"]) }

    return Render.extend({
        //子类扩展
        tags:{
            global: "<component-personal-center-1></component-personal-center-1>"
        },
        region: {
            global: {
                cfgDynamic: true,
                reqDynamic: true,
                resDynamic: true,
                beforeFunc: function(that, data){
                    var needPay = 0;
                    var needDeliver = 0;
                    var needReceived = 0;
                    var finish = 0;
                    var shopName = that.config.global.shopName;
                    var shopAbout = that.config.global.shopAbout;
                    var shopHeadImg = that.config.global.shopHeadImg;
                    var shopDescribe = that.config.global.shopDescribe;
                    $.each(data.response.global.orderStatus, function(i, obj){
                        var status = obj.status;
                        var total = obj.total;
                        if (status === 0) {
                            needPay += total;
                        }
                        else if (status === 1 || status === 2 || status === 3 || status === 4 || status === 5 || status === 11 || status === 12) {
                            needDeliver += total;
                        }
                        else if(status === 6){
                            needReceived += total;
                        }
                        else if(status === 7){
                            finish += total;
                        }
                    });
                    that.config.global.shopInfo = data.response.global && data.response.global.shopInfo || {};
                    that.config.global.shopInfo.headImg = that.config.global.shopInfo.headImg || shopHeadImg;
                    that.config.global.shopInfo.aboutus = that.config.global.shopInfo.aboutus || shopAbout;
                    that.config.global.shopInfo.name = that.config.global.shopInfo.name || shopName;
                    that.config.global.shopInfo.description = shopDescribe;
                    that.response.global.orderStatus = {};
                    that.response.global.orderStatus.needPay = needPay;
                    that.response.global.orderStatus.needDeliver = needDeliver;
                    that.response.global.orderStatus.needReceived = needReceived;
                    that.response.global.orderStatus.finish = finish;
                }
            }
        },
        config: {
            global: {
                shopName: api.jsData.siteInfo.shopName,
                shopAbout: api.jsData.siteInfo.shopAbout,
                shopHeadImg: api.jsData.siteInfo.shopHeadImg,
                shopDescribe: api.jsData.siteInfo.shopDescribe
            }
        },
        request: {
            global: {},
            "USER_INVITERINFO_CHECK": {
                centerId: shopId || gradeId,
                id: userId
            }
        },
        response: {
            global: {}
        },
        sendArr: sendArr,
        reload: false,


        //自定义事件
        ".component-personal-center-function a touchend":  function(node) {
            var that = this;
            var $node = $(node);
            var message = that.modules.message;
            var pathUrl = that.config.global.pathUrl;
            var needSign = $node.hasClass("needSign");
            if(api.jsEvent.touch.touchIsMoved) {
                return false;
            }
            if (needSign && !that.renderData.global.config.isLogin) {
                message.refresh({
                    content: "您尚未登录，是否登录？",
                    DOMClick: false,
                    cancelBtn: true,
                    confirmBtn: true,
                    cancelFun: function () {},
                    confirmFun: function () {
                        window.location.href = "/login.html?jumpUrl=" + pathUrl;
                    }
                });
                return false;
            }
        },
        ".component-personal-center-function a.mpMall touchend":  function(node) {
            var that = this;
            if(api.jsEvent.touch.touchIsMoved) { return false; }
            var userId = api.jsData.userInfo.userId;
            var shopId = api.jsData.userInfo.shopId;
            var authId = api.jsData.userInfo.authId;
            var openId = api.jsData.userInfo.openId;
            var mDomainName = api.jsData.siteInfo.mDomainName;
            window.location.href = api.jsUtil.path.setParam(mDomainName, { userId: userId, shopId:shopId, authId: authId, openId: openId });
        },
        ".component-personal-center-logout touchend": function(){
            var that = this;
            var message = that.modules.message;
            var pathUrl = that.config.global.pathUrl;
            if (api.jsEvent.touch.touchIsMoved) {
                return false;
            }
            message.refresh({
                content: "是否退出当前账号？",
                DOMClick: false,
                cancelBtn: true,
                confirmBtn: true,
                cancelFun: function () {},
                confirmFun: function () {
                    window.localStorage.removeItem("userId");
                    window.localStorage.removeItem("openId");
                    window.localStorage.removeItem("authId");
                    window.localStorage.removeItem("welfareVip");
                    window.location.href = "/login.html?jumpUrl=" + pathUrl;
                }
            });
        },
        ".component-personal-center-login touchend": function(){
            var that = this;
            var pathUrl = that.config.global.pathUrl;
            if(api.jsEvent.touch.touchIsMoved) { return false; }
            window.location.href = "/login.html?jumpUrl=" + pathUrl;
        }

    });

});