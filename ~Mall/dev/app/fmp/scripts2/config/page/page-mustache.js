
/** 模板 helper
 *    @detail:    模板 helper (全局)
 *    @return:    无
 *    @author:    林鹏腾
 *    @date:      2017.9.22
 */
define(function () {

    'use strict';

    var api = window.capi.get();

    /* 查看模板指定属性的值 */
    can.mustache.registerHelper('look', function(content) {
        var tCont = api.jsUtil.mustache.getContent(content);
        var dCont = api.jsUtil.mustache.getDepContent(content);
        console.dir(tCont);
        console.dir(dCont);
    });

    /* 判断是否存在 */
    can.mustache.registerHelper('isExist', function(content, options) {
        var dContent = api.jsUtil.mustache.getDepContent(content, "object");
        return can.isEmptyObject(dContent)? options.inverse(dContent||this): options.fn(dContent||this);
    });

    /* 限制模板渲染范围 */
    can.mustache.registerHelper('setRenderRange', function(index, start, length, options) {
        var tIndex = api.jsUtil.mustache.getContent(index, "number");
        var tStart = api.jsUtil.mustache.getContent(start, "number");
        var tLength = api.jsUtil.mustache.getContent(length, "number");
        var isRender = tStart >= 0 && tIndex >= tStart && (tLength === -1 || tIndex < tStart + length);
        return isRender? options.fn(options.context||this): options.inverse(options.context||this);
    });

    /* 根据匹配添加class */
    can.mustache.registerHelper('addElementClass', function(type1, type2, className) {
        var tType1 = api.jsUtil.mustache.getContent(type1);
        var tType2 = api.jsUtil.mustache.getContent(type2);
        var tClassName = api.jsUtil.mustache.getContent(className);
        if(typeof tType1 === "number"){ tType1 = (tType1).toString(); }
        if(typeof tType2 === "number"){ tType2 = (tType2).toString(); }
        if(tType1 && tType2 && tClassName){ return tType1 === tType2? tClassName: ''; }
    });

    /* 元素 z-index 依次降序 */
    can.mustache.registerHelper('zIndexDesc', function(index, zIndexVal) {
        var tIndex = api.jsUtil.mustache.getContent(index, "number");
        var tzIndexVal = api.jsUtil.mustache.getContent(zIndexVal, "number");
        if(tIndex>=0 && tzIndexVal>0){ return tzIndexVal-tIndex*1; }
    });

    /* 元素 z-index 依次升序 */
    can.mustache.registerHelper('zIndexAsc', function(index, zIndexVal) {
        var tIndex = api.jsUtil.mustache.getContent(index, "number");
        var tzIndexVal = api.jsUtil.mustache.getContent(zIndexVal, "number");
        if(tIndex>=0 && tzIndexVal>0){ return tzIndexVal+tIndex*1; }
    });

});
