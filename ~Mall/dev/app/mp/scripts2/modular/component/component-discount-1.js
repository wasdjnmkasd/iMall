
/** 模块组件
 *    @detail:    discount组件_1
 *    @return:    can.Component
 *    @author:    林鹏腾
 *    @date:      2017.8.16
 */
define(["text!modular/template/template-discount-1.mustache"], function(template){

    'use strict';

    var api = window.capi.get();

    return can.Component.extend({
        tag: "component-discount-1",
        template: template,
        helpers: {
            retrunStatus: function(status, str, options){
                var tStatus = api.jsUtil.mustache.getContent(status, "string");
                var tStr = api.jsUtil.mustache.getContent(str, "string");
                return tStatus === tStr? options.fn(this): options.inverse(this);
            },
            returnOrder: function(obj, options){
                var tObj = api.jsUtil.mustache.getDepContent(obj, "object");
                return $.isEmptyObject(tObj)? options.inverse(this): options.fn(this);
            },
            returnType: function(type, status){
                var tType = api.jsUtil.mustache.getContent(type, "string");
                var tStatus = api.jsUtil.mustache.getContent(status, "number");
                var imgType = 'discount_1_normal';
                if(tType === '新人券'){
                    tStatus === 0 && (imgType = 'discount_2_normal normal');
                    tStatus === 1 && (imgType = 'discount_2_lose lose');
                }
                else{
                    tStatus === 0 && (imgType = 'discount_1_normal normal');
                    tStatus === 1 && (imgType = 'discount_1_lose lose');
                }
                return imgType;
            },
            returnPrice: function(deductibleValue, valueType){
                var tDeductibleValue = api.jsUtil.mustache.getContent(deductibleValue, "number");
                var tValueType = api.jsUtil.mustache.getContent(valueType, "string");
                if(tValueType === "1"){
                    return "￥" + tDeductibleValue.toFixed(2);
                }else{
                    return tDeductibleValue + "折";
                }
            },
            returnRegion: function(range){
                var tRange = api.jsUtil.mustache.getDepContent(range, "string");
                if(tRange === "0"){
                    return "适用范围：全场通用";
                }else if(tRange === "1" || tRange === "2" || tRange === "3"){
                    return "适用范围：部分商品";
                }else{
                    return "适用范围：特定商品";
                }
            },
            returnTime: function(startTime, endTime){
                var tStartTime = api.jsUtil.mustache.getContent(startTime, "string");
                var tEndTime = api.jsUtil.mustache.getContent(endTime, "number");
                if(tStartTime && tEndTime){
                    return "使用时间：" + tStartTime + "-" + tEndTime;
                }else if(tStartTime){
                    return "开始时间：" + tStartTime;
                }else if(tEndTime){
                    return "截至时间：" + tEndTime;
                }else{
                    return "使用时间：无期限";
                }
            },
            retrunRule: function(range, type, options){
                var tRange = api.jsUtil.mustache.getDepContent(range, "string");
                var tType = api.jsUtil.mustache.getDepContent(type, "string");
                return tRange === tType? options.fn(this): options.inverse(this);
            },
            returnText: function(status){
                var tStatus = api.jsUtil.mustache.getDepContent(status, "string");
                if(tStatus === "0"){
                    return "你好！目前暂无可使用的优惠券！"
                }
                if(tStatus === "1"){
                    return "你好！目前暂无已使用的优惠券！"
                }
            },
            returnInfo: function(discountInfo, showDiscount, options){
                var newDiscount = {};
                var tDiscountInfo = api.jsUtil.mustache.getDepContent(discountInfo, "object");
                var tShowDiscount = api.jsUtil.mustache.getDepContent(showDiscount, "object");
                $.each(tDiscountInfo, function(type, obj){
                    $.each(obj.pool, function(index, couponId){
                        newDiscount[type] = newDiscount[type]||[];
                        newDiscount[type].push(tShowDiscount[type].pool[couponId]);
                    });
                });
                return options.fn(newDiscount);
            },
            returnSelect: function(key, couponId, chooseArr, choose){
                var tKey = api.jsUtil.mustache.getDepContent(key, "string");
                var tCouponId = api.jsUtil.mustache.getDepContent(couponId, "string");
                var tChooseArr = api.jsUtil.mustache.getDepContent(chooseArr, "object");
                var tChoose = api.jsUtil.mustache.getDepContent(choose, "string");
                if(tKey === "superposition"){
                    if($.inArray(tCouponId, tChooseArr) !== -1){ return "select" }
                    else{ return "" }
                }
                if(tKey === "unSuperposition"){
                    if(tCouponId === tChoose){ return "select" }
                    else{ return "" }
                }
            },
            returnLose: function(key, couponId, chooseArr, choose, showDiscount){
                var tKey = api.jsUtil.mustache.getDepContent(key, "string");
                var tCouponId = api.jsUtil.mustache.getDepContent(couponId, "string");
                var tChooseArr = api.jsUtil.mustache.getDepContent(chooseArr, "object");
                var tChoose = api.jsUtil.mustache.getDepContent(choose, "string");
                var tShowDiscount = api.jsUtil.mustache.getDepContent(showDiscount, "object");
                if(tKey === "superposition"){
                    if($.inArray(tCouponId, tChooseArr) !== -1){ return "" }
                    if($.inArray(tCouponId, Object.keys(tShowDiscount[tKey].chooseObj)) !== -1){ return "lose" }
                }
                if(tKey === "unSuperposition"){
                    if(tCouponId === tChoose){ return "" }
                    if($.inArray(tCouponId, Object.keys(tShowDiscount[tKey].chooseObj)) !== -1){ return "used" }
                    if(tChoose && tChoose!=="-1"){ return "lose" }
                }
            }
        },
        scope: {
        },
        events: {
            "inserted": function(element){

            },
            "removed": function(){

            }
        }
    })

});