/** 页面 --- 商品详情
 *    @detail:     商品详情
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
    var shopName =        jsData.siteInfo.shopName;
    var shopAbout =       jsData.siteInfo.shopAbout;
    var shopHeadImg =     jsData.siteInfo.shopHeadImg;
    var shopDescribe =    jsData.siteInfo.shopDescribe;
    var goodsId =         jsData.location.pathname.replace(/(\/?[^\/]+\/)*([^\/]+)\.html$/i, '$2');
    var itemId =          jsUtil.url.getParam("itemId");
    var pushUserId =      jsUtil.url.getParam("pushUserId");
    var jumpUrl =         jsUtil.url.getParam("jumpUrl", 1);
    var backUrl =         "";
    var initList =        { icon_home: true, title_text: '商品详情', icon_search: true, icon_shopCart: true };
    var icon_home =       true;
    var title_text =      "商品详情";
    var icon_search =     true;
    var icon_shopCart =   true;
    var home =            "";
    var nav =             "";
    var shoppingCart =    "";
    var personalCenter =  "";
    var goodsDetail =     true;
    var gradientHide =    true;

    jsUtil.url.delParam(['shopId', 'pushUserId'], "cover");
    pathUrl = jsUtil.path.delParam(pathUrl, ['shopId', 'pushUserId']);

    if(pushUserId !== 'isShoper' && pushUserId){ window.localStorage.setItem("pushUserId", pushUserId); }
    if(pushUserId === 'isShoper' && pushUserId){ window.localStorage.removeItem("pushUserId"); }
    if(!goodsId && !itemId){ setTimeout(function(){ window.location.href="/index.html";}, 300); return; }

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
        'shopName':        shopName,
        'shopAbout':       shopAbout,
        'shopHeadImg':     shopHeadImg,
        'shopDescribe':    shopDescribe,
        'goodsId':         goodsId,
        'itemId':          itemId,
        'initList':        initList,
        'icon_home':       icon_home,
        'title_text':      title_text,
        'icon_search':     icon_search,
        'icon_shopCart':   icon_shopCart,
        'home':            home,
        'nav':             nav,
        'shoppingCart':    shoppingCart,
        'personalCenter':  personalCenter,
        'goodsDetail':     goodsDetail,
        'gradientHide':    gradientHide
    };

    window.app.setPage =  function(name, data){
        typeof name === "string" && name.trim() && (Page[name] = data);
    };

    window.app.getPage =  function(name){
        return typeof name === "string" && name.trim()? Page[name]: Page;
    };

}());

