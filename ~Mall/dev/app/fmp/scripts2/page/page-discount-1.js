
/** 个人中心
 *    @detail:    个人中心
 *    @return:     无
 *    @author:    林鹏腾
 *    @date:      2017.9.22
 */
require([
    "config.page.event",
    "config.page.modular",
    "config.page.mustache"
], function(){

    'use strict';

    /* 加载前端数据 */
    var toRender = $.Deferred();
    var api = window.capi.get(true);
    var openId = api.jsData.userInfo.openId;
    var shopId = api.jsData.userInfo.shopId;
    var userId = api.jsData.userInfo.userId;
    var gradeId = api.jsData.userInfo.gradeId;
    var isLogin = api.jsData.userInfo.isLogin;
    var centerId = api.jsData.userInfo.centerId;
    var welfareVip = api.jsData.userInfo.welfareVip;
    var mDomainName = api.jsData.siteInfo.mDomainName;
    var fDomainName = api.jsData.siteInfo.fDomainName;
    var pathUrl = api.jsData.location.pathUrl;
    var backUrl = "";
    var jumpUrl = api.jsUtil.url.getParam("jumpUrl", 1);
    var choose1 = api.jsUtil.url.getParam("choose1");
    var choose2 = api.jsUtil.url.getParam("choose2")||"-1";
    var type = api.jsUtil.url.getParam("type")||"personalCenter";
    var header_title = "我的优惠券";
    var icon_choose = false;
    var chooseArr = [];
    var choose = "-1";


    //页面控制
    if(!isLogin){
        setTimeout(function(){ window.location.href = '/login.html?jumpUrl=' + pathUrl; }, 200);
        return;
    }
    if (!welfareVip) {
        api.jsModel.send("USER_INVITERINFO_CHECK", {
            shopId: shopId || gradeId,
            id: userId
        }).done(function(response){
            if (response && response.success && response.obj === true) {
                api.jsData.userInfo.welfareVip = true;
                window.localStorage.setItem("welfareVip", 'v:' + shopId + '-' + userId);
                toRender.resolve();
            }
            else {
                api.jsData.userInfo.welfareVip = false;
                window.localStorage.removeItem("welfareVip");
                window.location.href = '/bindInvitation.html?jumpUrl=' + pathUrl;
                toRender.reject();
            }
        }).fail(function(){
            setTimeout(function(){ window.location.href = '/login.html?jumpUrl=' + pathUrl; }, 200);
            toRender.reject();
        })
    } else {
        toRender.resolve();
    }


    /* 加载页面模块 */
    $.when(toRender).done(function(){

        if(type === "orderConfirm"){
            header_title = "订单优惠券";
            icon_choose = true;
            chooseArr = choose1.split(",");
            choose = choose2;
            var JSON_orderInfo = window.localStorage.getItem("orderInfo");
            var JSON_showDiscount = window.localStorage.getItem("showDiscount");
            var orderInfo = JSON.parse(JSON_orderInfo);
            var showDiscount = JSON.parse(JSON_showDiscount);
        }

        $.each(api.jsModular.modules, function(role, code){
            api.jsEvent.page.mdArr.push({
                role: role,
                code: code,
                area: "",
                tags: {},
                region: {},
                config: {
                    global: {
                        isLogin: isLogin,
                        jumpUrl: jumpUrl,
                        pathUrl: pathUrl
                    }
                },
                request: {},
                response: {},
                floorCode: {0:10}
            });
        });

        api.jsEvent.page.mdArr.push({
            role: "header",
            code: "module_00001",
            area: "#body-header",
            tags: {},
            region: {},
            config: {
                global: {
                    isLogin: isLogin,
                    pathUrl: pathUrl,
                    backUrl: backUrl,
                    jumpUrl: jumpUrl,
                    icon_back: true,
                    icon_choose: icon_choose,
                    title_text: header_title
                }
            },
            request: {},
            response: {},
            floorCode: {1:1}
        });

        api.jsEvent.page.mdArr.push({
            role: "discount",
            code: "module_00025",
            area: "#body-center",
            tags: {},
            region: {},
            config: {
                global: {
                    isLogin: isLogin,
                    jumpUrl: jumpUrl,
                    pathUrl: pathUrl,
                    type: type,
                    choose: choose,
                    chooseArr: chooseArr,
                    showDiscount: showDiscount||{}
                }
            },
            request: {},
            response: {
                global: orderInfo||{}
            },
            floorCode: {2:1}
        });

        api.jsUtil.modular.floorQueue(api.jsEvent.page,"mdArr");
        api.jsUtil.modular.showModules(api.jsEvent.page.mdArr);

        $.when(
            api.jsModular.modules.header.state
        ).done(function(){
            document.querySelector("title").innerHTML =
                api.jsModular.modules.header.config.global.shopInfo.name || "福利商城";
        })

    });

});