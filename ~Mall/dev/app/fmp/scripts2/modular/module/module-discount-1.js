
/** 页面模块
 *    @detail:    banner模块_1
 *    @return:    can.Control
 *    @author:    林鹏腾
 *    @date:      2017.8.16
 */
define(["config.page.render"], function(Render) {

    'use strict';

    var api = window.capi.get();

    return Render.extend({
        //子类扩展
        tags: {
            global:  "<component-discount-1></component-discount-1>"
        },
        region: {
            global: {
                cfgDynamic: true,
                resDynamic: true,
                beforeFunc: function(that, data){
                    if(data.response.global === null){
                        that.response.global = {}
                    }
                    if(that.config.global.type === "personalCenter"){
                        $.each(that.response.global, function(index, obj){
                            obj.type = obj.name.split("/")[1]||"";
                            obj.name = obj.name.split("/")[0]||"";
                        });
                    }
                }
            }
        },
        config: {
            global: {
                status: 0
            }
        },
        request: {
            "COUPON_USERLIST_QUERY": {
                status: 0
            }
        },
        response: {
            global: {}
        },
        sendArr: ["COUPON_USERLIST_QUERY/global"],
        reload: false,


        //自定义方法


        //自定义事件
        '.component-discount-type li:not(.active) touchend':function(node){
            var that = this;
            var $node = $(node);
            var status = $node.attr("type");
            that.config.global.status = status;
            $node.addClass('active').siblings('.active').removeClass('active');
            that.toRender("COUPON_USERLIST_QUERY/global", {status:status}, ["global"]);
        },
        ".component-discount-list.personalCenter .list-item.normal .availableAll touchend": function(node){
            window.location.href = "/index.html"
        },
        ".component-discount-list.personalCenter .list-item.normal .classification touchend": function(node){
            var that = this;
            var $node = $(node);
            var index = $node.attr("index");
            var range = that.response.global[index].rule.range;
            var category = that.response.global[index].rule.category;
            if(range === 1){ window.location.href ="/searchProduct.html?firstCategory=" + category; }
            if(range === 2){ window.location.href ="/searchProduct.html?secondCategory=" + category; }
            if(range === 3){ window.location.href ="/searchProduct.html?thirdCategory=" + category; }
        },
        ".component-discount-list.personalCenter .list-item.normal .lookGoodsDetail touchend": function(node){
            var that = this;
            var $node = $(node);
            var index = $node.attr("index");
            var range = that.response.global[index].rule.range;
            var bindingList = that.response.global[index].rule.bindingList||[];
            var length = bindingList.length;
            if(range === 4 && bindingList && length>0){
                var random = Math.floor(Math.random()*length);
                var goodsId = bindingList[random].goodsId;
                window.location.href ="/goodsDetail.html?goodsId=" + goodsId;
            }
        },
        ".component-discount-list.orderConfirm .list-item:not(.lose):not(.used) touchend": function(node){
            var that = this;
            var $node = $(node);
            var couponId = $node.attr("couponId");
            var discountType = $node.attr("discountType");
            var isSelect = $node.hasClass("select");
            var config = that.renderData.global.config;
            var orderInfo = that.renderData.global.response;
            var showDiscount = that.renderData.global.config.showDiscount;
            var depShowDiscount = showDiscount.attr();
            var goodsTypeObj = orderInfo.goodsTypeObj.attr();
            var discountPrice = orderInfo.attr("discountPrice");
            var depOrderDiscount = orderInfo.orderDiscount.attr();
            var type = depOrderDiscount.type;
            var supplierId = depOrderDiscount.supplierId;
            var discountPool = depShowDiscount[discountType].pool[couponId];
            var range = discountPool.rule.range;
            var category = discountPool.rule.category;
            var valueType = discountPool.rule.valueType;
            var bindingList = discountPool.rule.bindingList;
            var deductibleValue = discountPool.rule.deductibleValue;
            var price = 0;
            var index1 = -1;
            var index2 = -1;
            var tCode = "";
            var typeRight = "";
            var supplierIdRight= "";
            if(range === 0){
                price = goodsTypeObj[range].price;
                if(valueType === 0){
                    isSelect?
                        discountPrice = discountPrice*1 - price * deductibleValue:
                        discountPrice = discountPrice*1 + price * deductibleValue;
                    orderInfo.attr("discountPrice", discountPrice);
                }
                if(valueType === 1){
                    isSelect?
                        discountPrice = discountPrice*1 - deductibleValue:
                        discountPrice = discountPrice*1 + deductibleValue;
                    orderInfo.attr("discountPrice", discountPrice);
                }
            }
            else if(range === 4){
                var priceArr = [];
                $.each(bindingList, function(index, goodsId){
                    if(goodsTypeObj[range][goodsId] !== undefined){
                        priceArr.push(goodsTypeObj[range][goodsId].price);
                    }
                });
                price = Math.max.apply(Math, priceArr);
                if(valueType === 0){
                    isSelect?
                        discountPrice = discountPrice*1 - price * deductibleValue:
                        discountPrice = discountPrice*1 + price * deductibleValue;
                    orderInfo.attr("discountPrice", discountPrice);
                }
                if(valueType === 1){
                    isSelect?
                        discountPrice = discountPrice*1 - deductibleValue:
                        discountPrice = discountPrice*1 + deductibleValue;
                    orderInfo.attr("discountPrice", discountPrice);
                }
            }
            else{
                price = goodsTypeObj[range][category].price;
                if(valueType === 0){
                    isSelect?
                        discountPrice = discountPrice*1 - price * deductibleValue:
                        discountPrice = discountPrice*1 + price * deductibleValue;
                    orderInfo.attr("discountPrice", discountPrice);
                }
                if(valueType === 1){
                    isSelect?
                        discountPrice = discountPrice*1 - deductibleValue:
                        discountPrice = discountPrice*1 + deductibleValue;
                    orderInfo.attr("discountPrice", discountPrice);
                }
            }
            if(discountType === "unSuperposition"){
                if(isSelect){
                    tCode = depShowDiscount[discountType].chooseObj[couponId];
                    typeRight = tCode.split("_")[0] === type.toString();
                    supplierIdRight = tCode.split("_")[1] === supplierId.toString();
                    if(typeRight && supplierIdRight){
                        config.attr("choose", "-1");
                        orderInfo.orderDiscount.info[discountType].attr("choose", "-1");
                        showDiscount[discountType].chooseObj.removeAttr(couponId);
                    }
                }
                else{
                    config.attr("choose", couponId);
                    orderInfo.orderDiscount.info[discountType].attr("choose", couponId);
                    showDiscount[discountType].chooseObj.attr(couponId, type + "_" + supplierId);
                }
            }
            if(discountType === "superposition"){
                if(isSelect){
                    tCode = depShowDiscount[discountType].chooseObj[couponId];
                    typeRight = tCode.split("_")[0] === type.toString();
                    supplierIdRight = tCode.split("_")[1] === supplierId.toString();
                    if(typeRight && supplierIdRight){
                        index1 = $.inArray(couponId, config.chooseArr);
                        index2 = $.inArray(couponId, depOrderDiscount.info[discountType].chooseArr);
                        index1 !== -1 && config.chooseArr.splice(index1, 1);
                        index2 !== -1 && orderInfo.orderDiscount.info[discountType].chooseArr.splice(index2, 1);
                        showDiscount[discountType].chooseObj.removeAttr(couponId);
                    }
                }
                else{
                    index1 = $.inArray(couponId, config.chooseArr);
                    index2 = $.inArray(couponId, depOrderDiscount.info[discountType].chooseArr);
                    index1 === -1 && config.chooseArr.push(couponId);
                    index2 === -1 && orderInfo.orderDiscount.info[discountType].chooseArr.push(couponId);
                    showDiscount[discountType].chooseObj.attr(couponId, type + "_" + supplierId);
                }
            }
        }
    })

});