/** 页面 --- 首页
 *    @detail:     首页
 *    @return:     无
 *    @author:    林鹏腾
 *    @date:      2018.05.16
 */
(function(){

    'use strict';

    var jsData =         window.app.getApi('jsData');
    var jsUtil =         window.app.getApi('jsUtil');
    var jsModel =        window.app.getApi('jsModel');
    var jsEvent =        window.app.getApi('jsEvent');
    var title =          jsData.siteInfo.title;
    var shopId =         jsData.userInfo.shopId;
    var isLogin =        jsData.userInfo.isLogin;
    var centerId =       jsData.userInfo.centerId;
    var pathUrl =        jsData.location.pathUrl;
    var redirect =       jsData.location.redirect;
    var shopName =       jsData.siteInfo.shopName;
    var shopAbout =      jsData.siteInfo.shopAbout;
    var shopHeadImg =    jsData.siteInfo.shopHeadImg;
    var shopDescribe =   jsData.siteInfo.shopDescribe;
    var jumpUrl =        jsUtil.url.getParam("jumpUrl", 1);
    var childType =      jsUtil.url.getParam("childType");
    var childId =        jsUtil.url.getParam('childId');
    var sortId =         jsUtil.url.getParam("sortId");
    var form =           jsUtil.url.getParam('form');
    var isHide =         false;
    var platUserType =     5;

    if(isLogin && !childType){
        childType = 'order';
        jsUtil.url.setParam({childType: 'order'}, "cover");
    }
    else if(!isLogin && !childType){
        childType = 'help';
        childId = 41;
        jsUtil.url.setParam({childType: childType, childId: childId}, "cover");
    }
    else if(!isLogin && childType !== 'help'){
        setTimeout(function(){ window.location.href="/login.html?jumpUrl=" + pathUrl;}, 300);
        return;
    }

    var Page = {
        'jsData':          jsData,
        'jsUtil':          jsUtil,
        'jsModel':         jsModel,
        'jsEvent':         jsEvent,
        'title':           title,
        'shopId':          shopId,
        'isLogin':         isLogin,
        'centerId':        centerId,
        'pathUrl':         pathUrl,
        'jumpUrl':         jumpUrl,
        'redirect':        redirect,
        'sortId':          sortId,
        'shopName':        shopName,
        'shopAbout':       shopAbout,
        'shopHeadImg':     shopHeadImg,
        'shopDescribe':    shopDescribe,
        'childId':         childId,
        'childType':       childType,
        'form':            form,
        'isHide':          isHide,
        'platUserType':    platUserType,
        'mainHide':        false,
        'mode':            ""
    };

    window.app.setPage =  function(name, data){
        typeof name === "string" && name.trim() && (Page[name] = data);
    };

    window.app.getPage =  function(name){
        return typeof name === "string" && name.trim()? Page[name]: Page;
    };

}());