/** 页面 --- 品牌加盟
 *    @detail:     品牌加盟
 *    @return:     无
 *    @author:    林鹏腾
 *    @date:      2018.05.16
 */
(function(){

    'use strict';

    var jsData =        window.app.getApi('jsData');
    var jsUtil =        window.app.getApi('jsUtil');
    var jsModel =       window.app.getApi('jsModel');
    var jsEvent =       window.app.getApi('jsEvent');
    var title =         jsData.siteInfo.title;
    var shopId =        jsData.userInfo.shopId;
    var isLogin =       jsData.userInfo.isLogin;
    var centerId =      jsData.userInfo.centerId;
    var pathUrl =       jsData.location.pathUrl;
    var shopName =      jsData.siteInfo.shopName;
    var shopAbout =     jsData.siteInfo.shopAbout;
    var shopHeadImg =   jsData.siteInfo.shopHeadImg;
    var shopDescribe =  jsData.siteInfo.shopDescribe;
    var jumpUrl =       jsUtil.url.getParam("jumpUrl", 1);
    var goodsName =     jsUtil.url.getParam("goodsName");
    var sortId =        jsUtil.url.getParam("sortId");

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
        'sortId':          sortId,
        'shopName':        shopName,
        'shopAbout':       shopAbout,
        'shopHeadImg':     shopHeadImg,
        'shopDescribe':    shopDescribe,
        'goodsName':       goodsName,
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