/** 页面 --- 首页
 *    @detail:     首页
 *    @return:     无
 *    @author:    林鹏腾
 *    @date:      2018.05.16
 */
(function(){

    'use strict';

    var jsData =          window.app.getApi('jsData');
    var jsUtil =          window.app.getApi('jsUtil');
    var jsModel =         window.app.getApi('jsModel');
    var jsEvent =         window.app.getApi('jsEvent');
    var userId =          jsData.userInfo.userId;
    var shopId =          jsData.userInfo.shopId;
    var gradeId =         jsData.userInfo.gradeId;
    var centerId =        jsData.userInfo.centerId;
    var isLogin =         jsData.userInfo.isLogin;
    var welfareVip =      jsData.userInfo.welfareVip;
    var pathUrl =         jsData.location.pathUrl;
    var shopName =        jsData.siteInfo.shopName;
    var shopAbout =       jsData.siteInfo.shopAbout;
    var shopHeadImg =     jsData.siteInfo.shopHeadImg;
    var shopDescribe =    jsData.siteInfo.shopDescribe;
    var jumpUrl =         jsUtil.url.getParam("jumpUrl", 1);
    var backUrl =         "";
    var toRender =        $.Deferred();
    var initList =        { info_shop: false, icon_scan: true, icon_news: true, input: true };
    var info_shop =       false;
    var icon_scan =       true;
    var icon_news =       true;
    var input =           true;
    var home =            "active";
    var shoppingCart =    " ";
    var personalCenter =  " ";
    var gradientHide =    false;


    //页面控制
    if(!isLogin){
        setTimeout(function(){ window.location.href = '/login.html?jumpUrl=' + pathUrl; }, 200);
        return;
    }
    if (!welfareVip) {
        jsModel.send("USER_INVITERINFO_CHECK", {
            shopId: shopId || gradeId,
            id: userId
        }).done(function(response){
            if (response && response.success && response.obj === true) {
                jsData.userInfo.welfareVip = true;
                window.localStorage.setItem("welfareVip", 'v:' + shopId + '-' + userId);
                toRender.resolve();
            }
            else {
                jsData.userInfo.welfareVip = false;
                window.localStorage.removeItem("welfareVip");
                window.location.href = '/bindInvitation.html?jumpUrl=' + pathUrl;
                toRender.reject();
            }
        }).fail(function(){
            setTimeout(function(){ window.location.href = '/login.html?jumpUrl=' + pathUrl; }, 200);
            toRender.reject();
        })
    }
    else {
        toRender.resolve();
    }


    var Page = {
        'jsData':          jsData,
        'jsUtil':          jsUtil,
        'jsModel':         jsModel,
        'jsEvent':         jsEvent,
        'userId':          userId,
        'shopId':          shopId,
        'gradeId':         gradeId,
        'centerId':        centerId,
        'isLogin':         isLogin,
        'welfareVip':      welfareVip,
        'pathUrl':         pathUrl,
        'jumpUrl':         jumpUrl,
        'backUrl':         backUrl,
        'toRender':        toRender,
        'shopName':        shopName,
        'shopAbout':       shopAbout,
        'shopHeadImg':     shopHeadImg,
        'shopDescribe':    shopDescribe,
        'initList':        initList,
        'icon_scan':       icon_scan,
        'icon_news':       icon_news,
        'info_shop':       info_shop,
        'input':           input,
        'home':            home,
        'shoppingCart':    shoppingCart,
        'personalCenter':  personalCenter,
        'gradientHide':    gradientHide
    };

    window.app.setPage =  function(name, data){
        typeof name === "string" && name.trim() && (Page[name] = data);
    };

    window.app.getPage =  function(name){
        return typeof name === "string" && name.trim()? Page[name]: Page;
    };

}());