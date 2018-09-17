
/** 管理地址
 *    @detail:    管理地址
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
    var formOrder = api.jsUtil.url.getParam("formOrder");
    var isFormOrder = formOrder === "1";
    var header_title = isFormOrder? "选择收货地址": "管理收货地址";


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
                    title_text: header_title,
                    icon_AddressManage: isFormOrder
                }
            },
            request: {},
            response: {},
            floorCode: {1:1}
        });

        api.jsEvent.page.mdArr.push({
            role: "addressManage",
            code: "module_00017",
            area: "#body-center",
            tags: {},
            region: {},
            config: {
                global: {
                    isLogin: isLogin,
                    jumpUrl: jumpUrl,
                    pathUrl: pathUrl,
                    isFormOrder: isFormOrder
                }
            },
            request: {},
            response: {},
            floorCode: {2:1}
        });

        api.jsEvent.page.mdArr.push({
            role: "scrollTop",
            code: "module_00029",
            area: "",
            tags: {},
            region: {},
            config: {
                global:{
                    isLogin: isLogin,
                    jumpUrl: jumpUrl,
                    pathUrl: pathUrl
                }
            },
            request: {},
            response: {},
            floorCode: {3:1}
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