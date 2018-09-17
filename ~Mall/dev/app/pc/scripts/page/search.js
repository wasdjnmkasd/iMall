/** 页面 --- 搜索页面
 *    @detail:     搜索页面
 *    @return:     无
 *    @author:    林鹏腾
 *    @date:      2018.05.16
 */
(function(){

    'use strict';

    var jsData =           window.app.getApi('jsData');
    var jsUtil =           window.app.getApi('jsUtil');
    var jsModel =          window.app.getApi('jsModel');
    var jsEvent =          window.app.getApi('jsEvent');
    var title =            jsData.siteInfo.title;
    var shopId =           jsData.userInfo.shopId;
    var isLogin =          jsData.userInfo.isLogin;
    var centerId =         jsData.userInfo.centerId;
    var pathUrl =          jsData.location.pathUrl;
    var shopName =         jsData.siteInfo.shopName;
    var shopAbout =        jsData.siteInfo.shopAbout;
    var shopHeadImg =      jsData.siteInfo.shopHeadImg;
    var shopDescribe =     jsData.siteInfo.shopDescribe;
    var jumpUrl =          jsUtil.url.getParam("jumpUrl", 1);
    var sortId =           jsUtil.url.getParam("sortId");
    var priceMin =         jsUtil.url.getParam('priceMin');
    var priceMax =         jsUtil.url.getParam('priceMax');
    var priceAreaMin =     jsUtil.url.getParam('priceAreaMin');
    var priceAreaMax =     jsUtil.url.getParam('priceAreaMax');
    var sortType =         jsUtil.url.getParam("sortType") || "1";
    var screenType =       jsUtil.url.getParam("screenType") || "1";
    var numPerPage =       jsUtil.url.getParam('numPerPage') || "16";
    var currentPage =      jsUtil.url.getParam('currentPage') || "1";
    var filterCategory =   jsUtil.url.getParam("filterCategory");
    var firstCategory  =   jsUtil.url.getParam("firstCategory");
    var secondCategory  =  jsUtil.url.getParam("secondCategory");
    var thirdCategory =    jsUtil.url.getParam("thirdCategory");
    var categoryName =     jsUtil.url.getParam("categoryName");
    var dictName =         jsUtil.url.getParam("dictName");
    var entryName =        jsUtil.url.getParam("entryName");
    var goodsName =        jsUtil.url.getParam("goodsName");
    var upShelves =        jsUtil.url.getParam("upShelves");
    var useStorage =       jsUtil.url.getParam("useStorage");
    var category =         jsUtil.url.getParam("category");
    var origin =           jsUtil.url.getParam("origin");
    var brand =            jsUtil.url.getParam('brand');
    var type =             jsUtil.url.getParam("type");
    var tag =              jsUtil.url.getParam("tag");
    var isReload =         upShelves === '' && thirdCategory === '' && secondCategory === '' &&  firstCategory === '' && goodsName === '';
    var locationId =       [];
    var locations =        [];
    var popState =         {};
    var search =           {};
    var status =           1;
    var tPriceAreaMin =    "";
    var tPriceAreaMax =    "";

    if(categoryName){
        locations.push(categoryName);
        locationId.push(firstCategory);
    }
    if(dictName){
        locations.push(dictName);
        locationId.push(secondCategory);
    }
    if(entryName){
        locations.push(entryName);
        locationId.push(thirdCategory);
    }
    if(goodsName){
        locations.push(goodsName);
    }

    if(firstCategory){
        search.firstCategory= firstCategory;
        popState.firstCategory= firstCategory;
    }
    if(secondCategory){
        search.secondCategory= secondCategory;
        popState.secondCategory= secondCategory;
    }
    if(thirdCategory){
        search.thirdCategory= thirdCategory;
        popState.thirdCategory= thirdCategory;
    }
    if(goodsName){
        search.goodsName = goodsName;
        popState.goodsName = goodsName;
    }

    switch (tag) {
        case '新品推荐':       screenType = 2; break;
        case '热销榜单':       screenType = 3; break;
        case '一般贸易(包邮)':  screenType = 4; break;
        case '明星同款':       screenType = 5; break;
    }
    switch (sortType) {
        case "1":
            delete search["sortList[0].sortField"];
            delete search["sortList[0].sortRule"];
            break;
        case "2":
            search["sortList[0].sortField"] = "create_time";
            search["sortList[0].sortRule"] = "desc";
            break;
        case "3":
            search["sortList[0].sortField"] = "price";
            search["sortList[0].sortRule"] = "desc";
            break;
        case "4":
            search["sortList[0].sortField"] = "price";
            search["sortList[0].sortRule"] = "asc";
            break;
    }

    if(tag !== undefined && tag !== ""){
        search.tag = tag;
        popState.tag = tag;
    }
    if(type !== undefined && type !== ""){
        search.type = type;
        popState.type = type;
    }
    if(origin !== undefined && origin !== ""){
        search.origin = origin;
        popState.origin = origin;
    }
    if(brand !== undefined && brand !== ""){
        search.brand = brand;
        popState.brand = brand;
    }
    if(sortType !== undefined && sortType !== ""){
        popState.sortType = sortType;
    }
    if(screenType !== undefined && screenType !== ""){
        popState.screenType = screenType;
    }
    if(upShelves !== undefined && upShelves !== ""){
        search.upShelves = upShelves;
        popState.upShelves = upShelves;
    }
    if(priceMin !== undefined && priceMin !== ""){
        search.priceMin = priceMin || 0;
        popState.priceMin = priceMin || 0;
    }
    if(priceMax !== undefined && priceMax !== ""){
        search.priceMax = priceMax || 100000000;
        popState.priceMax = priceMax || 100000000;
    }
    if(priceAreaMin !== undefined && priceAreaMin !== ""){
        tPriceAreaMin = priceAreaMin*1;
        tPriceAreaMax = priceAreaMax*1;
        priceAreaMin = (priceAreaMax && tPriceAreaMin > tPriceAreaMax)? '' + tPriceAreaMax: '' + tPriceAreaMin;
        popState.priceAreaMin = priceAreaMin;
    }
    if(priceAreaMax !== undefined && priceAreaMax !== ""){
        tPriceAreaMin = priceAreaMin*1;
        tPriceAreaMax = priceAreaMax*1;
        priceAreaMax = (priceAreaMin && tPriceAreaMax < tPriceAreaMin)? '' + tPriceAreaMin: '' + tPriceAreaMax;
        popState.priceAreaMax = priceAreaMax;
    }
    if(numPerPage !== undefined && numPerPage !== ""){
        search.numPerPage = numPerPage;
        popState.numPerPage = numPerPage;
    }
    if(currentPage !== undefined && currentPage !== ""){
        search.currentPage = currentPage;
        popState.currentPage = currentPage;
    }
    if(isReload){
        setTimeout(function(){ window.location.replace('/search.html?upShelves=1'); }, 300);
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
        'sortId':          sortId,
        'shopName':        shopName,
        'shopAbout':       shopAbout,
        'shopHeadImg':     shopHeadImg,
        'shopDescribe':    shopDescribe,
        'mainHide':        false,
        'mode':            "",
        "priceMin":        priceMin,
        "priceMax":        priceMax,
        "priceAreaMin":    priceAreaMin,
        "priceAreaMax":    priceAreaMax,
        "sortType":        sortType,
        "screenType":      screenType,
        "numPerPage":      numPerPage,
        "currentPage":     currentPage,
        "filterCategory":  filterCategory,
        "firstCategory":   firstCategory,
        "secondCategory":  secondCategory,
        "thirdCategory":   thirdCategory,
        "categoryName":    categoryName,
        "dictName":        dictName,
        "entryName":       entryName,
        "goodsName":       goodsName,
        "upShelves":       upShelves,
        "useStorage":      useStorage,
        "brandpys":        useStorage === 'yes' && (JSON.parse(window.localStorage.getItem("brandpys"))||{}),
        "origins":         useStorage === 'yes' && (JSON.parse(window.localStorage.getItem("origins"))||[]),
        "brands":          useStorage === 'yes' && (JSON.parse(window.localStorage.getItem("brands"))||[]),
        "category":        category,
        "origin":          origin,
        "brand":           brand,
        "type":            type,
        "tag":             tag,
        "locationId":      locationId,
        "locations":       locations,
        "popState":        popState,
        "search":          search,
        "status":          status
    };

    window.app.setPage =  function(name, data){
        typeof name === "string" && name.trim() && (Page[name] = data);
    };

    window.app.getPage =  function(name){
        return typeof name === "string" && name.trim()? Page[name]: Page;
    };

}());