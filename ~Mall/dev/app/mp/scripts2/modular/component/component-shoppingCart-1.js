
/** 模块组件
 *    @detail:    shopping-cart组件_1
 *    @return:    can.Component
 *    @author:    林鹏腾
 *    @date:      2017.8.16
 */
define(["text!modular/template/template-shoppingCart-1.mustache"], function(template){

    'use strict';

    var api = window.capi.get();

    return can.Component.extend({
        tag: "component-shoppingcart-1",
        template: template,
        helpers: {
            returnSpec: function(content, options){
                var tContent = api.jsUtil.mustache.getContent(content, "string");
                var returnVal = tContent && JSON.parse(tContent);
                return tContent && options.fn(returnVal);
            },
            scopeConfig: function(config){
                this.spcConfig = api.jsUtil.mustache.getContent(config, "object");
            },
            spoceOrder: function(orders, config){
                this.orders = api.jsUtil.mustache.getContent(orders, "object");
                this.config = api.jsUtil.mustache.getContent(config, "object");
                this.setInit();
                this.setNormalTotalPrice();
                this.setCrossTotalPrice();
                this.setOrderAllSelect();
                this.setOrderOneSelect();
                this.setOrderSelectedCount();
            },
            returnPrice: function(price, realPrice){
                var tPrice = api.jsUtil.mustache.getContent(price, "number");
                var tRealPrice = api.jsUtil.mustache.getContent(realPrice, "number");
                return (tRealPrice<tPrice?tRealPrice:tPrice).toFixed(2);
            },
            returnOrderNormalPrice: function(){
                return this.orders.attr("orderNormalTotalPrice").toFixed(2);
            },
            returnOrderCrossPrice: function(){
                return this.orders.attr("orderCrossTotalPrice").toFixed(2);
            },
            returnOrderPrice: function(orders){
                var tOrders = api.jsUtil.mustache.getDepContent(orders, "object");
                return tOrders && tOrders.orderTotalPrice && tOrders.orderTotalPrice.toFixed(2) || "0.00";
            },
            returnItemSelect: function(selected, status, optionsOpen, options){
                var tSelected = api.jsUtil.mustache.getContent(selected, "boolean");
                var tStatus = api.jsUtil.mustache.getContent(status, "number");
                var tOptionsOpen = api.jsUtil.mustache.getContent(optionsOpen, "boolean");
                return tSelected && (tStatus !== 0 || tOptionsOpen)? options.fn(this): options.inverse(this);
            },
            returnStatus: function(status, options){
                var tStatus = api.jsUtil.mustache.getContent(status, "number");
                return tStatus !== 0? options.fn(this): options.inverse(this);
            },
            returnStock: function(stock, minQuantity, options){
                var tStock = api.jsUtil.mustache.getContent(stock, "number");
                var tMinQuantity = api.jsUtil.mustache.getContent(minQuantity, "number");
                return tStock > 0 && tStock >= tMinQuantity? options.fn(this): options.inverse(this);
            },
            returnNormalShow: function(options){
                return this.orders.attr("orderNormalTotalPrice").toFixed(2) > 0 ? options.fn(this): options.inverse(this);
            },
            returnCrossShow: function(options){
                return this.orders.attr("orderCrossTotalPrice").toFixed(2) > 0 ? options.fn(this): options.inverse(this);
            },
            returnImgSrc: function(type){
                var imgSrc = '';
                var tType = api.jsUtil.mustache.getContent(type, "number");
                switch(tType){
                    case 0: imgSrc = '/images/platform/tag/icon_cross.png'; break;
                    case 2: imgSrc = '/images/platform/tag/icon_normal.png'; break;
                }
                return imgSrc;
            }
        },
        scope: {
            isFirst: true,
            goodsTotalPrice: {},
            orderTotalPrice: 0,
            setInit: function(){
                var that = this;
                var orders = that.orders.attr();
                var quantity = 0;
                $.each(orders.typeObj, function (n1, o1) {
                    $.each(o1, function(n2, o2){
                        $.each(o2.itemObj, function(){
                            quantity += 1;
                        });
                        if($.isEmptyObject(o2.itemObj)){
                            that.orders.typeObj[n1][n2].removeAttr("itemObj");
                            that.orders.typeObj[n1].removeAttr(n2);
                        }
                    });
                    if($.isEmptyObject(o1)){
                        that.orders.typeObj.removeAttr(n1)
                    }
                });
                that.orders.attr("quantity", quantity);
            },
            setNormalTotalPrice: function(){
                var that = this;
                var orderPrice = 0;
                var orders = that.orders.attr();
                $.each(orders.typeObj, function(n1, o1){
                    $.each(o1, function(n2, o2){
                        var supplierWeight = 0;
                        var supplierPrice = 0;
                        var supplierVipPrice = 0;
                        var supplierRealPrice = 0;
                        var supplierRealVipPrice = 0;
                        $.each(o2.itemObj, function(n3, o3){
                            if(o2.type == 2) {
                                var numRegionObj = that.getNumRegion(o3.priceList);
                                var minQuantity = numRegionObj.minQuantity;
                                var maxQuantity = numRegionObj.maxQuantity;
                                o3.quantity = o3.quantity > maxQuantity ? maxQuantity : o3.quantity;
                                o3.quantity = o3.quantity < minQuantity ? minQuantity : o3.quantity;
                                o3.quantity = o3.quantity > o3.stock? o3.stock: o3.quantity;
                                o3.quantity = o3.quantity > 0 ? o3.quantity : 1;
                                that.orders.typeObj[n1][n2].itemObj[n3].attr("quantity", o3.quantity);
                                that.orders.typeObj[n1][n2].itemObj[n3].attr("minQuantity", numRegionObj.minQuantity);
                                that.orders.typeObj[n1][n2].itemObj[n3].attr("maxQuantity", numRegionObj.maxQuantity);
                                var priceListObj = that.getPriceList(o3.priceList, o3.quantity);
                                that.orders.typeObj[n1][n2].itemObj[n3].attr("price", priceListObj.price);
                                that.orders.typeObj[n1][n2].itemObj[n3].attr("vipPrice", priceListObj.vipPrice);
                                that.orders.typeObj[n1][n2].itemObj[n3].attr("realPrice", priceListObj.realPrice);
                                that.orders.typeObj[n1][n2].itemObj[n3].attr("realVipPrice", priceListObj.realVipPrice);
                                that.orders.typeObj[n1][n2].itemObj[n3].attr("stock", o3.stock > 0 ? o3.stock : 0);
                                if (that.isFirst) {
                                    that.isFirst = false;
                                    that.orders.typeObj[n1][n2].itemObj[n3].attr("selected", o3.status !== 0 && o3.stock > 0 && o3.stock >= minQuantity);
                                }
                                /*if(o3.stock<=0 || o3.stock<priceListObj.minQuantity){
                                    that.orders.typeObj[n1][n2].itemObj[n3].attr("status", 0);
                                 }*/
                                if (o3.selected && o3.status !== 0 && o3.stock > 0) {
                                    supplierWeight += o3.weight * o3.quantity;
                                    supplierPrice += priceListObj.price * o3.quantity;
                                    supplierVipPrice += priceListObj.vipPrice * o3.quantity;
                                    supplierRealPrice += priceListObj.realPrice * o3.quantity;
                                    supplierRealVipPrice += priceListObj.realVipPrice * o3.quantity;
                                }
                                if (minQuantity && maxQuantity && minQuantity !== -Infinity && maxQuantity !== Infinity) {
                                    that.orders.typeObj[n1][n2].itemObj[n3].attr("quantityDes", "当前允许购买量为: " + minQuantity + "~" + maxQuantity);
                                } else if (minQuantity && minQuantity !== -Infinity) {
                                    that.orders.typeObj[n1][n2].itemObj[n3].attr("quantityDes", "当前最小购买量为: " + minQuantity);
                                } else if (maxQuantity && maxQuantity !== Infinity) {
                                    that.orders.typeObj[n1][n2].itemObj[n3].attr("quantityDes", "当前最大购买量为: " + maxQuantity);
                                } else {
                                    that.orders.typeObj[n1][n2].itemObj[n3].attr("quantityDes", "");
                                }
                            }
                        });
                        if(n1 == 2){
                            that.orders.typeObj[n1][n2].attr("supplierWeight", supplierWeight*1);
                            that.orders.typeObj[n1][n2].attr("supplierPrice",   supplierPrice*1);
                            that.orders.typeObj[n1][n2].attr("supplierVipPrice",  supplierVipPrice*1);
                            that.orders.typeObj[n1][n2].attr("supplierRealPrice",  supplierRealPrice*1);
                            that.orders.typeObj[n1][n2].attr("supplierRealVipPrice",  supplierRealVipPrice*1);
                        }
                        orderPrice += supplierRealPrice<supplierPrice? supplierRealPrice: supplierPrice;
                    });
                });
                that.orders.attr("orderNormalTotalPrice", orderPrice);
            },
            setCrossTotalPrice: function(){
                var that = this;
                var orderPrice = 0;
                var orders = that.orders.attr();
                $.each(orders.typeObj, function(n1, o1){
                    $.each(o1, function(n2, o2){
                        var supplierWeight = 0;
                        var supplierPrice = 0;
                        var supplierVipPrice = 0;
                        var supplierRealPrice = 0;
                        var supplierRealVipPrice = 0;
                        $.each(o2.itemObj, function(n3, o3){
                            if(o2.type == 0) {
                                var numRegionObj = that.getNumRegion(o3.priceList);
                                var minQuantity = numRegionObj.minQuantity;
                                var maxQuantity = numRegionObj.maxQuantity;
                                o3.quantity = o3.quantity > maxQuantity ? maxQuantity : o3.quantity;
                                o3.quantity = o3.quantity < minQuantity ? minQuantity : o3.quantity;
                                o3.quantity = o3.quantity > o3.stock? o3.stock: o3.quantity;
                                o3.quantity = o3.quantity > 0 ? o3.quantity : 1;
                                that.orders.typeObj[n1][n2].itemObj[n3].attr("quantity", o3.quantity);
                                that.orders.typeObj[n1][n2].itemObj[n3].attr("minQuantity", numRegionObj.minQuantity);
                                that.orders.typeObj[n1][n2].itemObj[n3].attr("maxQuantity", numRegionObj.maxQuantity);
                                var priceListObj = that.getPriceList(o3.priceList, o3.quantity);
                                that.orders.typeObj[n1][n2].itemObj[n3].attr("price", priceListObj.price);
                                that.orders.typeObj[n1][n2].itemObj[n3].attr("vipPrice", priceListObj.vipPrice);
                                that.orders.typeObj[n1][n2].itemObj[n3].attr("realPrice", priceListObj.realPrice);
                                that.orders.typeObj[n1][n2].itemObj[n3].attr("realVipPrice", priceListObj.realVipPrice);
                                that.orders.typeObj[n1][n2].itemObj[n3].attr("stock", o3.stock > 0 ? o3.stock : 0);
                                if (that.isFirst) {
                                    that.isFirst = false;
                                    that.orders.typeObj[n1][n2].itemObj[n3].attr("selected", o3.status !== 0 && o3.stock > 0 && o3.stock >= minQuantity);
                                }
                                /*if(o3.stock<=0 || o3.stock<priceListObj.minQuantity){
                                     that.orders.typeObj[n1][n2].itemObj[n3].attr("status", 0);
                                 }*/
                                if (o3.selected && o3.status !== 0 && o3.stock > 0) {
                                    supplierWeight += o3.weight * o3.quantity;
                                    supplierPrice += priceListObj.price * o3.quantity;
                                    supplierVipPrice += priceListObj.vipPrice * o3.quantity;
                                    supplierRealPrice += priceListObj.realPrice * o3.quantity;
                                    supplierRealVipPrice += priceListObj.realVipPrice * o3.quantity;
                                }
                                if (minQuantity && maxQuantity && minQuantity !== -Infinity && maxQuantity !== Infinity) {
                                    that.orders.typeObj[n1][n2].itemObj[n3].attr("quantityDes", "当前允许购买量为: " + minQuantity + "~" + maxQuantity);
                                } else if (minQuantity && minQuantity !== -Infinity) {
                                    that.orders.typeObj[n1][n2].itemObj[n3].attr("quantityDes", "当前最小购买量为: " + minQuantity);
                                } else if (maxQuantity && maxQuantity !== Infinity) {
                                    that.orders.typeObj[n1][n2].itemObj[n3].attr("quantityDes", "当前最大购买量为: " + maxQuantity);
                                } else {
                                    that.orders.typeObj[n1][n2].itemObj[n3].attr("quantityDes", "");
                                }
                            }
                        });
                        if(n1 == 0){
                            that.orders.typeObj[n1][n2].attr("supplierWeight", supplierWeight*1);
                            that.orders.typeObj[n1][n2].attr("supplierPrice",   supplierPrice*1);
                            that.orders.typeObj[n1][n2].attr("supplierVipPrice",  supplierVipPrice*1);
                            that.orders.typeObj[n1][n2].attr("supplierRealPrice",  supplierRealPrice*1);
                            that.orders.typeObj[n1][n2].attr("supplierRealVipPrice",  supplierRealVipPrice*1);
                        }
                        orderPrice += supplierRealPrice<supplierPrice? supplierRealPrice: supplierPrice;
                    });
                });
                that.orders.attr("orderCrossTotalPrice", orderPrice);
            },
            setOrderAllSelect: function(){
                var that = this;
                var tOrders = that.orders.attr();
                var optionsOpen = this.config.attr("optionsOpen");
                var quantity = tOrders.quantity;
                var bool = true;
                $.each(tOrders.typeObj, function(n1, o1){
                    $.each(o1, function(n2, o2){
                        $.each(o2.itemObj, function(n3, o3){
                            if(!o3.selected && ((o3.status!==0 && o3.stock > 0 && o3.stock >= o3.minQuantity) || optionsOpen)){
                                bool = false;
                                return false;
                            }
                            if(!o3.selected && (o3.status===0 || o3.stock <= 0 || o3.stock < o3.minQuantity) && !optionsOpen){
                                quantity = quantity - 1;
                            }
                        });
                    });
                    that.orders.attr("allSelected", bool && !!quantity);
                });
            },
            setOrderOneSelect: function(){
                var that = this;
                var tOrders = this.orders.attr();
                var quantity = tOrders.quantity;
                var bool = false;
                $.each(tOrders.typeObj, function(n1, o1){
                    $.each(o1, function(n2, o2){
                        $.each(o2.itemObj, function(n3, o3){
                            var quantity = that.orders.typeObj[n1][n2].itemObj[n3].attr("quantity");
                            if(o3.selected && quantity){
                                bool = true;
                                return false;
                            }
                        });
                    });
                    that.orders.attr("oneSelected", bool&&!!quantity);
                });
            },
            setOrderSelectedCount: function(){
                var tOrders = this.orders.attr();
                var count = 0;
                $.each(tOrders.typeObj, function(n1, o1){
                    $.each(o1, function(n2, o2){
                        $.each(o2.itemObj, function(n3, o3){
                            if(o3.selected){
                                count = count + 1;
                            }
                        });
                    });
                });
                this.orders.attr("selectedCount", count);
            },
            getNumRegion: function(priceList){
                var infoObj = {};
                var infoObj_max = [];
                var infoObj_min = [];
                var isExist = false;
                $.each(priceList, function(name, obj){
                    var min = obj.min? obj.min: 0;
                    var max = obj.max? obj.max: Number.POSITIVE_INFINITY;
                    infoObj_max.push(max);
                    infoObj_min.push(min);
                    isExist = true;
                });
                if(isExist){
                    infoObj.minQuantity = Math.min.apply(Math, infoObj_min);
                    infoObj.maxQuantity = Math.max.apply(Math, infoObj_max);
                    return infoObj;
                }else{
                    return {
                        minQuantity: 0,
                        maxQuantity: Number.POSITIVE_INFINITY
                    }
                }
            },
            getPriceList: function(priceList, quantity){
                var prices = {};
                var infoObj = {};
                var priceArr = [];
                var infoObj_max = [];
                var infoObj_min = [];
                var infoObj_price = [];
                var infoObj_vipPrice = [];
                var infoObj_realPrice = [];
                var infoObj_realVipPrice = [];
                var isExist = false;
                $.each(priceList, function(name, obj){
                    var min = obj.min? obj.min: 0;
                    var max = obj.max? obj.max: Number.POSITIVE_INFINITY;
                    var price = (obj.price||obj.price===0)? (obj.price*1).toFixed(2): null;
                    var vipPrice = (obj.vipPrice||obj.vipPrice===0)? (obj.vipPrice*1).toFixed(2): null;
                    var realPrice = price? (obj.discount? (obj.price*obj.discount/10).toFixed(2): (obj.price*1).toFixed(2)): null;
                    var realVipPrice = vipPrice? (obj.discount? (obj.vipPrice*obj.discount/10).toFixed(2): (obj.vipPrice*1).toFixed(2)): null;
                    priceArr.push({
                        prices: {
                            price: price,
                            vipPrice: vipPrice,
                            realPrice: realPrice,
                            realVipPrice: realVipPrice
                        },
                        min: min,
                        max: max
                    });
                    infoObj_min.push(min);
                    infoObj_max.push(max);
                    infoObj_price.push(price);
                    infoObj_vipPrice.push(vipPrice);
                    infoObj_realPrice.push(realPrice);
                    infoObj_realVipPrice.push(realVipPrice);
                    isExist = true;
                });
                if(isExist){
                    infoObj.min =  Math.min.apply(Math, infoObj_min);
                    infoObj.max =  Math.max.apply(Math, infoObj_max);
                    infoObj.minPrice = Math.min.apply(Math, infoObj_price);
                    infoObj.vipMinPrice =  Math.min.apply(Math, infoObj_vipPrice);
                    infoObj.realMinPrice =  Math.min.apply(Math, infoObj_realPrice);
                    infoObj.realVipMinPrice =  Math.min.apply(Math, infoObj_realVipPrice);
                    infoObj.maxPrice = Math.max.apply(Math, infoObj_price);
                    infoObj.vipMaxPrice =  Math.max.apply(Math, infoObj_vipPrice);
                    infoObj.realMaxPrice =  Math.max.apply(Math, infoObj_realPrice);
                    infoObj.realVipMaxPrice =  Math.max.apply(Math, infoObj_realVipPrice);
                    if( quantity < infoObj.min){
                        return {
                            price: infoObj.maxPrice,
                            vipPrice: infoObj.vipMaxPrice,
                            realPrice: infoObj.realMaxPrice,
                            realVipPrice: infoObj.realVipMaxPrice
                        }
                    }
                    else if(quantity > infoObj.max){
                        return {
                            price: infoObj.minPrice,
                            vipPrice: infoObj.vipMinPrice,
                            realPrice: infoObj.realMinPrice,
                            realVipPrice: infoObj.realVipMinPrice
                        }
                    }
                    else{
                        $.each(priceArr, function(n, o){
                            if(quantity>=o.min && quantity<=o.max){
                                prices = {
                                    price: o.prices.price,
                                    vipPrice: o.prices.vipPrice,
                                    realPrice: o.prices.realPrice,
                                    realVipPrice: o.prices.realVipPrice
                                };
                                return false
                            }
                        });
                        return prices;
                    }
                }
                else{
                    return {
                        price: null,
                        vipPrice: null,
                        realPrice: null,
                        realVipPrice: null
                    }
                }
            }
        },
        events: {
            "inserted": function(){
                var $element = this.element;
                var $node = $element.find(".component-shoppingCart-ordersDetails    .goodsList ");
                $node.find(".controlGroup").css("transform", "translate3d(748px, 0, 0)");
            },
            "removed": function(){

            }
        }
    });

});