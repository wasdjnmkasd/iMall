
/** 微信授权页面
 *    @detail:    微信授权页面
 *    @return:    can.Control
 *    @author:    林鹏腾
 *    @date:      2017.8.16
 */
require([
    "config.page.event",
    "config.page.modular",
    "config.page.mustache"
], function(){

    'use strict';

    document.querySelector("title").innerHTML = "微信授权中...";

    var api = window.capi.get(true);
    var code = api.jsUtil.url.getParam("code");
    var info = api.jsUtil.url.getParam("info");
    var state = api.jsUtil.url.getParam("state");
    var hostUrl = api.jsData.location.hostUrl;
    var snsapiBase = info.split("，")[0]||"";
    var isRegister = info.split("，")[1]||"";
    var jumpUrl = info.split("，")[2]||"";
    var shopId = info.split("，")[3]||"";
    var userId = info.split("，")[4]||"";
    var authId = info.split("，")[5]||"";
    var domain = info.split("，")[6]||"";
    var platUserType = 5;
    var loginType = 2;

    if (domain){
        domain = domain.replace(/^(http:\/\/)?([^\/]+)(\/.+)?/i, 'http://$2/');
    }
    if(domain && domain !== hostUrl){
        window.location.replace(window.location.href.replace(hostUrl, domain));
        return;
    }

    $.each(api.jsModular.modules, function(role, code){
        api.jsEvent.page.mdArr.push({
            role: role,
            code: code,
            area: "",
            tags: {},
            region: {},
            config: {},
            request: {},
            response: {},
            floorCode: {0:10}
        });
    });

    api.jsUtil.modular.floorQueue(api.jsEvent.page,"mdArr");
    api.jsUtil.modular.showModules(api.jsEvent.page.mdArr);

    api.jsModel.send("THIRD_WECHAT_LOGIN", {"code":code, "state":state})
        .done(function(response){
            if(snsapiBase === "true"){
                if(response && response.success){
                    var openId = response.obj && response.obj.openid || "";
                    var unionId = response.obj && response.obj.unionid || "";
                    if(response.obj.isFirst){
                        api.jsUtil.url.jumpPage("/bindMobile.html?shopId=" + shopId + "&openId=" + openId + "&unionId=" + unionId + "&jumpUrl="+jumpUrl, null);
                    }
                    else {
                        api.jsModel.send("AUTH_LOGIN", {
                            platUserType: platUserType,
                            loginType: loginType,
                            openId: unionId||openId
                        })
                        .done(function(response){
                            if(response && response.success){
                                var userId = response.obj.userCenterId;
                                var authId = '"Bearer "' + response.obj.token;
                                window.localStorage.setItem("authId", authId);
                                window.localStorage.setItem("userId", userId);
                                window.localStorage.setItem("openId", openId);
                                shopId && window.localStorage.setItem("shopId", shopId);
                                api.jsUtil.url.jumpPage(jumpUrl, "/index.html");
                            }
                            else if(response.errorMsg){
                                api.jsModular.modules.message.refresh({
                                    type: "error",
                                    content: response.errorMsg,
                                    confirmFun: function(){
                                        api.jsUtil.url.jumpPage("/login.html?jumpUrl="+jumpUrl, null, true);
                                    }
                                });
                            }
                            else{
                                api.jsModular.modules.message.refresh({
                                    type: "error",
                                    content: "微信登录失败！",
                                    confirmFun: function(){
                                        api.jsUtil.url.jumpPage("/login.html?jumpUrl="+jumpUrl, null, true);
                                    }
                                });
                            }
                        })
                        .fail(function(){
                            api.jsModular.modules.message.refresh({
                                type: "error",
                                content: "微信登录失败！",
                                confirmFun: function(){
                                    api.jsUtil.url.jumpPage("/login.html?jumpUrl="+jumpUrl, null, true);
                                }
                            });
                        });
                    }
                }
                else{
                    api.jsModular.modules.message.refresh({
                        type: "error",
                        content: "微信授权失败, 返回登录界面！",
                        confirmFun: function(){
                            api.jsUtil.url.jumpPage("/login.html?jumpUrl="+jumpUrl, null, true);
                        }
                    });
                }
            }
            else if(snsapiBase === "false"){
                if(response && response.success){
                    if(isRegister){
                        window.localStorage.setItem("authId", authId);
                        window.localStorage.setItem("userId", userId);
                        window.localStorage.setItem("alertDiscount", true);
                        window.localStorage.setItem("openId", response.obj||"");
                        shopId && window.localStorage.setItem("shopId", shopId);
                        api.jsUtil.url.jumpPage(jumpUrl, "/index.html");
                    } else {
                        window.localStorage.setItem("authId", authId);
                        window.localStorage.setItem("userId", userId);
                        window.localStorage.setItem("openId", response.obj||"");
                        shopId && window.localStorage.setItem("shopId", shopId);
                        api.jsUtil.url.jumpPage(jumpUrl, "/index.html");
                    }
                }
                else{
                    api.jsModular.modules.message.refresh({
                        type: "error",
                        content: "获取微信openId失败！",
                        confirmFun: function(){
                            api.jsUtil.url.jumpPage("/login.html?jumpUrl="+jumpUrl, null, true);
                        }
                    });
                }
            }
            else{
                api.jsModular.modules.message.refresh({
                    type: "error",
                    content: "snsapiBase值未设定！",
                    confirmFun: function(){
                        api.jsUtil.url.jumpPage("/login.html?jumpUrl="+jumpUrl, null, true);
                    }
                });
            }
        })
        .fail(function(){
            api.jsModular.modules.message.refresh({
                type: "error",
                content: "微信授权失败, 返回登录界面！",
                confirmFun: function(){
                    api.jsUtil.url.jumpPage("/login.html?jumpUrl="+jumpUrl, null, true);
                }
            });
        });
});