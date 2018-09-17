
/** 模块组件
 *    @detail:    orderConfirm组件_1
 *    @return:    can.Component
 *    @author:    林鹏腾
 *    @date:      2017.8.16
 */
define(["text!modular/template/template-orderConfirm-1.mustache"], function(template){

    'use strict';

    var api = window.capi.get();

    return can.Component.extend({
        tag: "component-orderconfirm-1",
        template: template,
        helpers: {
            spoceOrder: function(orders){
                this.orders = api.jsUtil.mustache.getContent(orders);
                this.setTaxFee();
                this.setOrderPrice();
            },
            returnSpec: function(content, options){
                var tContent = api.jsUtil.mustache.getContent(content, "string");
                var returnVal = tContent && JSON.parse(tContent);
                return tContent && options.fn(returnVal);
            },
            returnPrice: function(realPrice){
                var tRealPrice = api.jsUtil.mustache.getContent(realPrice, "number");
                return tRealPrice.toFixed(2);
            },
            returnSupplierName: function(supplierName){
                var returnVal = "";
                var tSupplierName = api.jsUtil.mustache.getDepContent(supplierName, "string");
                switch(tSupplierName){
                    case "天天仓": returnVal = '保税TT仓'; break;
                    case "粮油仓": returnVal = '保税LY仓'; break;
                    case "行云仓": returnVal = '保税XY仓'; break;
                    case "富邦仓": returnVal = '保税FB仓'; break;
                    default:      returnVal = tSupplierName;
                }
                return returnVal;
            },
            returnImgSrc: function(type){
                var imgSrc = '';
                var tType = api.jsUtil.mustache.getContent(type, "number");
                switch(tType){
                    case 0: imgSrc = '/images/platform/tag/icon_cross.png'; break;
                    case 2: imgSrc = '/images/platform/tag/icon_normal.png'; break;
                }
                return imgSrc;
            },
            returnIsShow: function(type, options){
                var tType = api.jsUtil.mustache.getContent(type, "number");
                return tType != undefined ? options.fn(this): options.inverse(this);
            },
            returnPostFee: function(type, taxFee){
                var tType = api.jsUtil.mustache.getContent(type, "string");
                var tTaxFee= api.jsUtil.mustache.getContent(taxFee, "number");
                if(tType === '2'){
                    return '<span class="money">物流或快递</span><span class="symbol"></span>';
                } else{
                    return '<span class="money">' + tTaxFee.toFixed(2) + '</span><span class="symbol">￥</span>';
                }
            },
            returnTaxFee:function(taxFee,type){
                var tTaxFee = api.jsUtil.mustache.getContent(taxFee, "number");
                var tType = api.jsUtil.mustache.getContent(type, "number");
                if(tType == 2){
                    return '总价已含税费';
                }else{
                    return '￥' + tTaxFee;
                }
            }
        },
        scope: {
            setTaxFee: function(){
                var that = this;
                var orders = that.orders.attr();
                $.each(orders.typeObj, function(n1, o1){
                    $.each(o1, function(n2, o2){
                        var taxFee = 0;
                        var exciseTaxFee = 0;
                        var incrementTaxFee = 0;
                        var postFee = o2.postFee;
                        var supplierPrice = o2.supplierPrice;
                        $.each(o2.itemObj, function(n3, o3){
                            if(o3.freeTax == 0 && o2.type == 0) {
                                var tPrice = (o3.quantity || 0) * (o3.price || 0);
                                var tPostFee = (tPrice / supplierPrice) * postFee;
                                var tExciseTaxFee = (tPrice + tPostFee) / (1 - o3.exciseTax) * o3.exciseTax;
                                var tIncrementTaxFee = (tPrice + tPostFee + tExciseTaxFee) * o3.incrementTax;
                                var tTaxFee = ((tExciseTaxFee + tIncrementTaxFee) * 0.7);
                                that.orders.typeObj[n1][n2].itemObj[n3].attr("taxFee", tTaxFee);
                                that.orders.typeObj[n1][n2].itemObj[n3].attr("postFee", tPostFee);
                                taxFee += tTaxFee;
                                exciseTaxFee += tExciseTaxFee;
                                incrementTaxFee += tIncrementTaxFee;
                            }
                        });
                        that.orders.typeObj[n1][n2].attr("taxFee", taxFee.toFixed(2)*1);
                        that.orders.typeObj[n1][n2].attr("exciseTaxFee", exciseTaxFee.toFixed(2)*1);
                        that.orders.typeObj[n1][n2].attr("incrementTaxFee", incrementTaxFee.toFixed(2)*1);
                    });
                });
            },
            setOrderPrice: function(){
                var that = this;
                var orders = this.orders.attr();
                $.each(orders.typeObj, function(n1, o1){
                    $.each(o1, function(n2, o2){
                        var totalPrice =  o2.supplierRealPrice*1;
                        var discountPrice = o2.discountPrice || 0;
                        var orderVal = o2.taxFee*1 + o2.supplierRealPrice*1 + o2.postFee*1;
                        that.orders.typeObj[n1][n2].attr("totalPrice", (totalPrice*1).toFixed(2));
                        that.orders.typeObj[n1][n2].attr("orderPrice", (orderVal*1).toFixed(2));
                        that.orders.typeObj[n1][n2].attr("orderDiscountPrice", (orderVal*1-discountPrice*1).toFixed(2));
                    })
                });
            }
        },
        events: {
            "inserted": function(){

            },
            "removed": function(){

            }
        }
    });

});