
/** 手机绑定
 *    @detail:    手机绑定
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
    var unionId = api.jsUtil.url.getParam("unionId");
    var platUserType = 5;
    var loginType = 2;
    var userType = 5;


    /* 加载页面模块 */
    $.when(toRender.resolve()).done(function(){

        if (window.localStorage.getItem("authId")) {
            window.localStorage.removeItem("authId");
            window.localStorage.removeItem("userId");
            window.localStorage.removeItem("welfareVip");
            window.location.reload(true);
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
                    text_mpMall: true,
                    title_text: "绑定手机",
                    icon_close: true
                }
            },
            request: {},
            response: {},
            floorCode: {1:1}
        });

        api.jsEvent.page.mdArr.push({
            role: "bindMobile",
            code: "module_00015",
            area: "#body-center",
            tags: {},
            region: {},
            config: {
                global: {
                    isLogin: isLogin,
                    jumpUrl: jumpUrl,
                    pathUrl: pathUrl,
                    openId: openId,
                    shopId: shopId
                }
            },
            request: {
                USER_REGISTRATION: {
                    userType:  userType,
                    loginType: loginType,
                    wechat: unionId||openId,
                    reqHeader: { authentication: null }
                },
                AUTH_LOGIN: {
                    openId: unionId||openId,
                    loginType: loginType,
                    platUserType: platUserType,
                    reqHeader: { authentication: null }
                }
            },
            response: {},
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