
/** 搜索列表
 *    @detail:    搜索列表
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
    var sortType = api.jsUtil.url.getParam("sortType") || "1";
    var thirdCategory = api.jsUtil.url.getParam("thirdCategory");
    var secondCategory = api.jsUtil.url.getParam("secondCategory");
    var firstCategory = api.jsUtil.url.getParam("firstCategory");
    var goodsName = api.jsUtil.url.getParam("goodsName");
    var upShelves = api.jsUtil.url.getParam('upShelves');
    var priceMin = api.jsUtil.url.getParam('priceMin');
    var priceMax = api.jsUtil.url.getParam('priceMax');
    var numPerPage = api.jsUtil.url.getParam('numPerPage') || "10";
    var currentPage = api.jsUtil.url.getParam('currentPage') || "1";
    var origin = api.jsUtil.url.getParam('origin');
    var brand = api.jsUtil.url.getParam('brand');
    var type = api.jsUtil.url.getParam("type");
    var tag = api.jsUtil.url.getParam("tag");
    var isReload = upShelves === '' && thirdCategory === '' && secondCategory === '' &&  firstCategory === '' && goodsName === '';
    var productReq = {};
    var popState = {};
    var status = 1;



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

        if(goodsName){
            productReq.goodsName = goodsName;
            popState.goodsName = goodsName;
        }
        if(sortType === "2"){
            productReq["sortList[0].sortField"] = "create_time";
            productReq["sortList[0].sortRule"] = "desc";
            popState.sortType = sortType;
        }
        if(sortType === "3"){
            productReq["sortList[0].sortField"] = "price";
            productReq["sortList[0].sortRule"] = "desc";
            popState.sortType = sortType;
        }
        if(sortType === "4"){
            productReq["sortList[0].sortField"] = "price";
            productReq["sortList[0].sortRule"] = "asc";
            popState.sortType = sortType;
        }
        if(tag !== undefined && tag !== ""){
            productReq.tag = tag;
            popState.tag = tag;
        }
        if(type !== undefined && type !== ""){
            productReq.type = type;
            popState.type = type;
        }
        if(origin !== undefined && origin !== ""){
            productReq.origin = origin;
            popState.origin = origin;
        }
        if(brand !== undefined && brand !== ""){
            productReq.brand = brand;
            popState.brand = brand;
        }
        if(upShelves !== undefined && upShelves !== ""){
            productReq.goodsName = undefined;
            productReq.upShelves = upShelves;
            popState.upShelves = upShelves;
        }
        if(priceMin !== undefined && priceMin !== ""){
            productReq.priceMin = priceMin || 0;
            popState.priceMin = priceMin || 0;
        }
        if(priceMax !== undefined && priceMax !== ""){
            productReq.priceMax = priceMax || 100000000;
            popState.priceMax = priceMax || 100000000;
        }
        if(numPerPage !== undefined && numPerPage !== ""){
            productReq.numPerPage = numPerPage;
            popState.numPerPage = numPerPage;
        }
        if(currentPage !== undefined && currentPage !== ""){
            productReq.currentPage = currentPage;
            popState.currentPage = currentPage;
        }
        if(firstCategory){
            productReq.goodsName = undefined;
            productReq.firstCategory= firstCategory;
            popState.firstCategory= firstCategory;
        }
        if(secondCategory){
            productReq.goodsName = undefined;
            productReq.secondCategory= secondCategory;
            popState.secondCategory= secondCategory;
        }
        if(thirdCategory){
            productReq.goodsName = undefined;
            productReq.thirdCategory = thirdCategory;
            popState.thirdCategory = thirdCategory;
        }
        if(isReload){
            setTimeout(function(){ window.location.replace('/search.html?upShelves=1'); }, 300);
            return;
        }
        if(popState){
            api.jsUtil.url.setParam(popState, "cover", { page: "reload" });
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
                    icon_scan: true,
                    icon_news: true,
                    input: true
                },
                initList: {
                    icon_scan: true,
                    icon_news: true,
                    input: true
                }
            },
            request: {
                global: {
                    searchCont: goodsName
                }
            },
            response: {},
            floorCode: {1:1}
        });

        api.jsEvent.page.mdArr.push({
            role: "product",
            code: "module_00010",
            area: "#body-center",
            tags: {},
            region: {},
            config: {
                global: {
                    minHeight: $("#body-center").height() - 80,
                    popState: popState,
                    sortType: sortType,
                    isLogin: isLogin,
                    jumpUrl: jumpUrl,
                    pathUrl: pathUrl
                }
            },
            request: {
                "GOODS_BASE_QUERY": productReq
            },
            response: {},
            floorCode: {2:1}
        });

        api.jsEvent.page.mdArr.push({
            role: "footer",
            code: "module_00002",
            area: "#body-footer",
            tags: {},
            region: {},
            config: {
                global: {
                    isLogin: isLogin,
                    jumpUrl: jumpUrl,
                    pathUrl: pathUrl,
                    home: " ",
                    shoppingCart: " ",
                    personalCenter: " ",
                    queryCount: true
                }
            },
            request: {},
            response: {},
            floorCode: {3:1}
        });

        api.jsEvent.page.mdArr.push({
            role: "searchHistory",
            code: "module_00005",
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
            request: {
            },
            response: {},
            floorCode: {4:1}
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
            floorCode: {5:1}
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