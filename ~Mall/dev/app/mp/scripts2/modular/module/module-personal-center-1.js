
/** 页面模块
 *    @detail:    personal-center模块_1
 *    @return:    can.Control
 *    @author:    林鹏腾
 *    @date:      2017.8.16
 */
define(["config.page.render"], function(Render) {

    'use strict';

    var api = window.capi.get();
    var userId = api.jsData.userInfo.userId;
    var shopId = api.jsData.userInfo.shopId;
    var gradeId = api.jsData.userInfo.gradeId;
    var authId = api.jsData.userInfo.authId;
    var openId = api.jsData.userInfo.openId;
    var isLogin = api.jsData.userInfo.isLogin;
    var sendArr = ["GRADE_GRADEBO_QUERY_REDIS/global/gradeInfo"];

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
                    if (that.response.global.gradeInfo && that.response.global.gradeInfo.welfareType === 1) {
                        if (that.response.global.getInvitation === false) {
                            api.jsData.userInfo.welfareVip = false;
                            that.config.global.needInvitation = true;
                        }
                        if (that.response.global.getInvitation === true) {
                            api.jsData.userInfo.welfareVip = true;
                            that.config.global.needInvitation = false;
                        }
                        that.config.global.showWelfare = true;
                    }
                }
            }
        },
        config: {
            global: {
                shopName: api.jsData.siteInfo.shopName,
                shopAbout: api.jsData.siteInfo.shopAbout,
                shopHeadImg: api.jsData.siteInfo.shopHeadImg,
                shopDescribe: api.jsData.siteInfo.shopDescribe,
                needInvitation: true,
                showWelfare: false
            }
        },
        request: {
            global: {},
            "USER_INVITERINFO_CHECK": {
                shopId: shopId || gradeId,
                id: userId
            }
        },
        response: {
            global: {}
        },
        sendArr: sendArr,
        reload: false,


        //自定义事件
        ".component-personal-center-order a touchend": function(){
            var that = this;
            var message = that.modules.message;
            var pathUrl = that.config.global.pathUrl;
            if(api.jsEvent.touch.touchIsMoved) {
                return false;
            }
            if(!that.renderData.global.config.isLogin){
                message.refresh({
                    content: "您尚未登录，是否登录？",
                    DOMClick: false,
                    cancelBtn: true,
                    confirmBtn: true,
                    cancelFun: function(){},
                    confirmFun: function(){
                        window.location.href = "/login.html?jumpUrl=" + pathUrl;
                    }
                });
                return false;
            }
        },
        ".component-personal-center-function a.apply touchend":  function(node) {
            var that = this;
            var $node = $(node);
            var message = that.modules.message;
            var config = that.renderData.global.config;
            var response = that.renderData.global.response;
            var pathUrl = that.config.global.pathUrl;
            var phone = response.userInfo && response.userInfo.phone;
            var shopId = config.attr("shopId") || response.userInfo.shopId;
            var centerId = config.attr("centerId");
            var shopName = config.attr("shopName");
            var needSign = $node.hasClass("needSign");
            if(api.jsEvent.touch.touchIsMoved) {
                return false;
            }
            if (needSign && !that.renderData.global.config.isLogin){
                message.refresh({
                    content: "您尚未登录，是否登录？",
                    DOMClick: false,
                    cancelBtn: true,
                    confirmBtn: true,
                    cancelFun: function () {},
                    confirmFun: function () {
                        location.href = "/login.html?jumpUrl=" + pathUrl;
                    }
                });
                return false;
            }
            else{
                that.sendRequest("USER_PUSHUSER_CHECK", {
                    phone: phone,
                    gradeId: shopId
                }).done(function(response){
                    if(response && response.success) {
                        window.location.href = "/apply.html?phone=" + phone + "&shopName=" + shopName + "&centerId=" + centerId + "&shopId=" + shopId;
                    }
                    else{
                        message.refresh({
                            cancelBtn: false,
                            confirmBtn: false,
                            content: "已在该店铺申请成为推手！"
                        });
                    }
                });
            }
        },
        ".component-personal-center-function a:not(.apply) touchend":  function(node) {
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
        ".component-personal-center-function a.fmpMall touchend":  function(node) {
            var that = this;
            var userInfo = api.jsData.userInfo;
            var config = that.renderData.global.config.attr();
            var userId = api.jsData.userInfo.userId;
            var shopId = api.jsData.userInfo.shopId;
            var authId = api.jsData.userInfo.authId;
            var openId = api.jsData.userInfo.openId;
            var fDomainName = api.jsData.siteInfo.fDomainName;
            var welfareVip = "";
            if (api.jsEvent.touch.touchIsMoved) { return false; }
            if (!userInfo.isLogin) {
                welfareVip = 'v:';
                window.location.href = api.jsUtil.path.setParam(fDomainName.replace(/\/$/, '') + "/login.html", { shopId:shopId, openId: openId, welfareVip: welfareVip});
            }
            if (userInfo.isLogin) {
                if (config.needInvitation === true) {
                    welfareVip = 'v:';
                    window.location.href = api.jsUtil.path.setParam(fDomainName.replace(/\/$/, '') + "/bindInvitation.html", {userId: userId, shopId:shopId, authId: authId, openId: openId, welfareVip: welfareVip});
                }
                if (config.needInvitation === false) {
                    welfareVip = 'v:' + shopId + '-' + userId;
                    window.location.href = api.jsUtil.path.setParam(fDomainName, {userId: userId, shopId:shopId, authId: authId, openId: openId, welfareVip: welfareVip});
                }
            }
        },
        ".component-personal-center-logout touchend": function(){
            var that = this;
            var footer = that.modules.footer;
            var message = that.modules.message;
            var userInfo = api.jsData.userInfo;
            if(api.jsEvent.touch.touchIsMoved) {
                return false;
            }
            message.refresh({
                content: "是否退出当前账号？",
                DOMClick: false,
                cancelBtn: true,
                confirmBtn: true,
                cancelFun: function () {},
                confirmFun: function () {
                    userInfo.isLogin = false;
                    that.config.global.isLogin = false;
                    footer.config.global.isLogin = false;
                    that.response.global.userInfo = {};
                    that.response.global.orderStatus = {};
                    window.localStorage.removeItem("userId");
                    window.localStorage.removeItem("authId");
                    that.renderData.global.config.attr("isLogin", false);
                    footer.renderData.global.config.attr("isLogin", false);
                    document.querySelector("title").innerHTML = that.config.global.shopInfo.name || "中国供销海外购";
                    that.toRender(["USER_SHOPINFO_QUERY/global/shopInfo"], [{ shopId: null, userId: null }], ["global"]);
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