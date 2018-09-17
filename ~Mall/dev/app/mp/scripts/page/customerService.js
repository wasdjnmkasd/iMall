/** 页面 --- 客服热线
 *    @detail:     客服热线
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
    var shopId =          jsData.userInfo.shopId;
    var isLogin =         jsData.userInfo.isLogin;
    var pathUrl =         jsData.location.pathUrl;
    var siteInfo =        jsData.siteInfo;
    var shopName =        jsData.siteInfo.shopName;
    var shopAbout =       jsData.siteInfo.shopAbout;
    var shopHeadImg =     jsData.siteInfo.shopHeadImg;
    var shopDescribe =    jsData.siteInfo.shopDescribe;
    var jumpUrl =         jsUtil.url.getParam("jumpUrl", 1);
    var backUrl =         "";
    var initList =        { info_shop: false, icon_scan: true, icon_news: true, input: true };
    var info_shop =       false;
    var icon_scan =       true;
    var icon_news =       true;
    var input =           true;
    var home =            " ";
    var nav =             " ";
    var shoppingCart =    " ";
    var personalCenter =  " ";
    var gradientHide =    false;

    var Page = {
        'jsData':          jsData,
        'jsUtil':          jsUtil,
        'jsModel':         jsModel,
        'jsEvent':         jsEvent,
        'shopId':          shopId,
        'isLogin':         isLogin,
        'pathUrl':         pathUrl,
        'jumpUrl':         jumpUrl,
        'backUrl':         backUrl,
        "pageName":        "customerService",
        "siteInfo":        siteInfo,
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
        'nav':             nav,
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