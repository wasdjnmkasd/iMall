
/** 模块组件
 *    @detail:    orderList组件_1
 *    @return:    can.Component
 *    @author:    林鹏腾
 *    @date:      2017.8.16
 */
define(["text!modular/template/template-orderList-1.mustache"], function(template){

    'use strict';

    var api = window.capi.get();

    return can.Component.extend({
        tag: "component-orderlist-1",
        template: template,
        helpers: {
            returnList: function(list, options){
                var tList = api.jsUtil.mustache.getDepContent(list);
                return $.isArray(tList) && tList.length>0? options.fn(tList): options.inverse(tList);
            },
            returnNewTime: function(time){
                var returnVal = api.jsUtil.mustache.getContent(time, "string");
                return returnVal? returnVal.substring(0, 10): "";
            },
            returnDeliverCls: function(status, options){
                var tStatus = api.jsUtil.mustache.getContent(status, "number");
                if(tStatus === 0 || tStatus === 1 || tStatus === 11 || tStatus === 12 ||
                    tStatus === 2 || tStatus === 3 || tStatus === 4 || tStatus === 5){
                    return options.fn(this)
                }else{
                    return options.inverse(this);
                }
            },
            returnDeliverDes: function(createType, status, orderFlag){
                var tCreateType = api.jsUtil.mustache.getContent(createType, "number");
                var tStatus= api.jsUtil.mustache.getContent(status, "number");
                var tOrderFlag= api.jsUtil.mustache.getContent(orderFlag, "number");
                if(tOrderFlag == 0){
                    if(tStatus === 0){
                        return tCreateType !== 4?
                            "订单付款成功后，我们将在两个工作日之内尽快给您发货！":
                            "预售产品我们会在付款成功后给您安排发货，请您耐心等待！"
                    }
                    else if(tStatus === 1 || tStatus === 11 || tStatus === 12 ||
                        tStatus === 2 || tStatus === 3 || tStatus === 4 || tStatus === 5){
                        return tCreateType !== 4?
                            "付款成功，我们将在两个工作日之内尽快给您发货！":
                            "付款成功, 预售产品我们会尽快给您安排发货，请您耐心等待！"
                    }
                }else if(tOrderFlag == 2){
                    if(tStatus === 0){
                        return tCreateType !== 4?
                            "订单付款成功后，我们将在72小时之内尽快给您发货！":
                            "预售产品我们会在付款成功后给您安排发货，请您耐心等待！"
                    }
                    else if(tStatus === 1 || tStatus === 11 || tStatus === 12 ||
                        tStatus === 2 || tStatus === 3 || tStatus === 4 || tStatus === 5){
                        return tCreateType !== 4?
                            "付款成功，我们会在72小时内将货物发出，24小时后反馈物流单号!":
                            "付款成功, 预售产品我们会尽快给您安排发货，请您耐心等待！"
                    }
                }
            },
            returnStatusClass: function(status){
                var returnVal = api.jsUtil.mustache.getContent(status, "number");
                if(returnVal === 6){
                    return "state_finished"
                }
            },
            returnStatusText: function(status, orderExpressList, payType){
                var returnVal = api.jsUtil.mustache.getContent(status, "number");
                var tOrderExpressList = api.jsUtil.mustache.getDepContent(orderExpressList, "object");
                var tPayType = api.jsUtil.mustache.getDepContent(payType, "number");
                if(returnVal === 0){
                    return "待付款";
                }
                if(returnVal === 1 || returnVal === 11 || returnVal === 12){
                    return "已支付" /*return tPayType === 1? "微信支付": (tPayType === 2? "支付宝支付": (tPayType === 3? "银联支付": ""));*/
                }
                if(returnVal === 2 || returnVal === 3 || returnVal === 4 || returnVal === 5){
                    return "待发货";
                }
                if(returnVal === 6){
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
            returnItemInfo: function(itemInfo, options){
                var returnVal = api.jsUtil.mustache.getContent(itemInfo, "string");
                returnVal = returnVal? JSON.parse(returnVal): null;
                return typeof returnVal === "object"? options.fn(returnVal): options.inverse(returnVal);
            },
            returnPrice: function(price){
                var returnVal = api.jsUtil.mustache.getContent(price, "number");
                return returnVal >= 0? returnVal.toFixed(2): null;
            },
            returnBtnDelivery: function(status, options){
                var returnVal = api.jsUtil.mustache.getContent(status, "number");
                if(returnVal === 6){
                    return options.fn(options.context||this);
                }
            },
            returnBtnRefund: function(status, options){
                var returnVal = api.jsUtil.mustache.getContent(status, "number");
                if(returnVal !== 0 && returnVal !== 7 && returnVal !== 8 && returnVal !== 9 && returnVal !== 21){
                    return options.fn(options.context||this);
                }
            },
            returnBtnDel: function(status, options){
                var returnVal = api.jsUtil.mustache.getContent(status, "number");
                if(returnVal === 7 || returnVal === 8 || returnVal === 9){
                    return options.fn(options.context||this);
                }
            },
            returnBtnCancelOrder: function(status, options){
                var returnVal = api.jsUtil.mustache.getContent(status, "number");
                if(returnVal!==0 && returnVal!==7 && returnVal!==8 && returnVal!==9 && returnVal !== 21){
                    return /*options.fn(options.context||this)*/;
                }
            },
            returnBtnCloseOrder: function(status, options){
                var returnVal = api.jsUtil.mustache.getContent(status, "number");
                if(returnVal === 0){
                    return options.fn(options.context||this);
                }
            },
            returnBtnLogistics: function(status, options){
                var returnVal = api.jsUtil.mustache.getContent(status, "number");
                if(returnVal === 6 || returnVal === 7){
                    return options.fn(options.context||this);
                }
            },
            returnBtnToPay: function(status, options){
                var returnVal = api.jsUtil.mustache.getContent(status, "number");
                if(returnVal === 0){
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
    });

});