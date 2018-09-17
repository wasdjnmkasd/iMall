
/**  确认订单
 *    @detail:    确认订单
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
    var api = window.capi.get(true);
    var openId = api.jsData.userInfo.openId;
    var shopId = api.jsData.userInfo.shopId;
    var userId = api.jsData.userInfo.userId;
    var gradeId = api.jsData.userInfo.gradeId;
    var isLogin = api.jsData.userInfo.isLogin;
    var centerId = api.jsData.userInfo.centerId;
    var welfareVip = api.jsData.userInfo.welfareVip;
    var redirect = api.jsData.location.redirect;
    var pathUrl = api.jsData.location.pathUrl;
    var backUrl = "";
    var jumpUrl = api.jsUtil.url.getParam("jumpUrl", 1);
    var addressId = api.jsUtil.url.getParam("addressId");
    var allDiscount = JSON.parse(localStorage.getItem("allDiscount")||"{}");
    var showDiscount = JSON.parse(localStorage.getItem("showDiscount")||"{}");
    var ordersInfo = JSON.parse(localStorage.getItem("ordersInfo")||"{}");

    if(!isLogin){
        setTimeout(function(){ window.location.href = "/login.html?jumpUrl=" + ($.isEmptyObject(ordersInfo)? "/index.html": pathUrl) }, 300);
        return;
    }
    if($.isEmptyObject(ordersInfo)){
        setTimeout(function(){ window.location.replace("/orderList.html"); }, 300);
        return;
    }
    if(!$.isEmptyObject(ordersInfo) && (!ordersInfo.orderCount || ordersInfo.orderCount <= 0)){
        setTimeout(function(){ window.location.replace("/orderList.html"); }, 300);
        return;
    }
    

    /* 加载页面模块 */
    $.when(api.jsModel.send("USER_ADDRESS_QUERY", {}))
        .always(function(response){
            var address = "";
            if(!response || !response.success || response.obj.length === 0){
                window.location.href = "/address-edit.html?jumpUrl=" + pathUrl;
                return;
            }else{
                var bool = false;
                $.each(response.obj, function(index, obj){
                    if(addressId && obj.id == addressId){
                        address = obj;
                        bool = true;
                        return false;
                    }
                    if(!addressId && obj.setDefault == 1){
                        address = obj;
                        bool = true;
                        return false;
                    }
                });
                if(!bool){ address = response.obj[0]; }
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
                        title_text: "确认订单",
                        icon_orderList: true
                    }
                },
                request: {},
                response: {},
                floorCode: {1:1}
            });

            api.jsEvent.page.mdArr.push({
                role: "orderConfirm",
                code: "module_00020",
                area: "#body-center",
                tags: {},
                region: {},
                config: {
                    global: {
                        centerId: centerId,
                        isLogin: isLogin,
                        jumpUrl: jumpUrl,
                        pathUrl: pathUrl,
                        redirect: redirect,
                        address: address,
                        allDiscount: allDiscount,
                        showDiscount: showDiscount
                    }
                },
                request: {},
                response: {
                    global: {
                        ordersInfo: ordersInfo
                    }
                },
                floorCode: {2:1}
            });

            api.jsUtil.modular.floorQueue(api.jsEvent.page,"mdArr");
            api.jsUtil.modular.showModules(api.jsEvent.page.mdArr);

            $.when(
                api.jsModular.modules.header.state
            ).done(function(){
                document.querySelector("title").innerHTML =
                    api.jsModular.modules.header.config.global.shopInfo.name || "中国供销海外购";
            })

        });
});