
/** 模块组件
 *    @detail:    orderDetail组件_1
 *    @return:    can.Component
 *    @author:    林鹏腾
 *    @date:      2017.8.16
 */
define(["text!modular/template/template-orderDetail-1.mustache"], function(template){

    'use strict';

    var api = window.capi.get();

    return can.Component.extend({
        tag: "component-orderdetail-1",
        template: template,
        helpers: {
            returnNewTime: function(time){
                var returnVal = api.jsUtil.mustache.getContent(time, "string");
                return returnVal? returnVal.substring(0, 10): "";
            },
            returnNewTime2: function(time){
                var returnVal = api.jsUtil.mustache.getContent(time, "string");
                return returnVal? returnVal.substring(0, 19): "";
            },
            returnItemInfo: function(itemInfo, options){
                var returnVal = api.jsUtil.mustache.getContent(itemInfo, "string");
                returnVal = returnVal? JSON.parse(returnVal): null;
                return typeof returnVal === "object"? options.fn(returnVal): options.inverse(returnVal);
            },
            returnPrice: function(price){
                var returnVal = api.jsUtil.mustache.getContent(price, "number");
                returnVal = returnVal? JSON.parse(returnVal): null;
                return returnVal >= 0? returnVal.toFixed(2): null;
            },
            returnShopPrice: function(orderGoodsList){
                var returnVal = 0;
                var tOrderGoodsList = api.jsUtil.mustache.getDepContent(orderGoodsList, "object");
                $.each(tOrderGoodsList, function(index, orderGoodsObj){
                    returnVal += orderGoodsObj.actualPrice * orderGoodsObj.itemQuantity;
                });
                return returnVal.toFixed(2);
            },
            returnTaxFee: function(taxFee){
                var tTaxFee = api.jsUtil.mustache.getContent(taxFee, "number");
                tTaxFee = tTaxFee>0? tTaxFee: 0;
                return tTaxFee.toFixed(2);
            },
            returnPostFee: function(postFee){
                var tPostFee = api.jsUtil.mustache.getContent(postFee, "number");
                tPostFee = tPostFee>0? tPostFee: 0;
                return tPostFee.toFixed(2);
            },
            returnOrderState: function(status, orderExpressList){
                var returnVal = api.jsUtil.mustache.getContent(status, "number");
                var tOrderExpressList = api.jsUtil.mustache.getDepContent(orderExpressList, "object");
                if(returnVal === 0){
                    return "待付款";
                }
                if(returnVal === 1 || returnVal === 11 || returnVal === 12){
                    return "已付款";
                }
                if(returnVal === 2 || returnVal === 3 || returnVal === 4 || returnVal === 5 || returnVal === 6){
                    return "待收货";
                }
                if(returnVal === 7){
                    return "交易完成";
                }
                if(returnVal === 8){
                    return "已退款";
                }
                if(returnVal === 9){
                    return "交易关闭";
                }
                if(returnVal === 21){
                    return "退款中";
                }
                if(returnVal === 99){
                    return tOrderExpressList[0].status;
                }
            },
            returnPaymentMethod: function(status, payType, options){
                var tStatus = api.jsUtil.mustache.getContent(status, "number");
                var tPayType = api.jsUtil.mustache.getContent(payType, "number");
                var paymentMethod = tPayType === 1? "微信支付": (tPayType === 2? "支付宝": (tPayType === 3? "银联支付": ""));
                return tStatus!==0 && tStatus!==8?
                    options.fn({paymentMethod: paymentMethod}):
                    options.inverse({paymentMethod: paymentMethod});
            },
            returnPay: function(status, options){
                var tStatus = api.jsUtil.mustache.getContent(status, "number");
                return tStatus===0? options.fn(this): options.inverse(this);
            },
            returnLogistics: function(status, options){
                var returnVal = api.jsUtil.mustache.getContent(status, "number");
                if(returnVal === 6 || returnVal === 7){
                    return options.fn(options.context||this);
                }
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
            returnSpec: function(content, options){
                var tContent = api.jsUtil.mustache.getContent(content, "string");
                var returnVal = tContent && JSON.parse(tContent);
                return tContent && options.fn(returnVal);
            },
        },
        scope: {

        },
        events: {
            "inserted": function(){

            },
            "removed": function(){

            }
        }
    })

});