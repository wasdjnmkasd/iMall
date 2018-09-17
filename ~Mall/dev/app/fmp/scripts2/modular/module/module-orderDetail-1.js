
/** 页面模块
 *    @detail:    orderDetail模块_1
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
            global:  "<component-orderdetail-1></component-orderdetail-1>",
            payChoose: "<component-pay-choose-1></component-pay-choose-1>"
        },
        region: {
            global: {
                resDynamic: true,
                beforeFunc: function(that, data){
                    that.response.global.orderInfo = data.response.global.orderInfo.orderList[0]||{};
                }
            },
            payChoose: {
                cfgDynamic: true
            }
        },
        config: {
            payChoose: {
                payChooseShow: false,
                payState: null
            }
        },
        request: {},
        response: {},
        sendArr: ["ORDER_USER_QUERY/global/orderInfo"],
        reload: false,


        //自定义方法


        //自定义事件
        ".component-orderDetail-content .orderItem .btn_viewLogistics touchend": function(node){
            var that = this;
            var $node = $(node);
            var message = that.modules.message;
            var orderId = $node.attr("orderId");
            var orderInfo = that.renderData.global.response.orderInfo.attr();
            if(orderInfo){
                var isExist = false;
                var orderExpressList = orderInfo.orderExpressList||[];
                $.each(orderExpressList, function(index, expressObj){
                    if(expressObj.expressId && expressObj.expressName){
                        isExist = true;
                        return false
                    }
                });
                if(isExist){
                    window.location.href = "/logistics.html?orderId="+orderId
                }else{
                    message.refresh({
                        content: "暂无物流信息！"
                    })
                }
            }
            else{
                message.refresh({
                    content: "暂无物流信息！"
                })
            }
        },
        ".component-orderDetail-content .component-orderDetail-log .btn_toPay touchend": function(node){
            var that = this;
            var $node = $(node);
            var message = that.modules.message;
            var redirect = that.config.global.redirect;
            var orderId = $node.attr("orderId");
            var openId = localStorage.getItem("openId");
            if(api.jsEvent.touch.focusTime<=300){
                return null;
            }

            that.renderData.payChoose.config.attr("payChooseShow", true);
            that.renderData.payChoose.config.attr("payState", $.Deferred());

            $.when(that.renderData.payChoose.config.attr().payState)
                .done(function(payState){
                    var type = "";
                    var payType = "";
                    var toPayFunc = function(){};
                    var wxPayedFunc = function(){ setTimeout(function(){ window.location.replace(window.location.href); }, 200) };
                    if(payState === "weChatPay"){
                        type = "JSAPI";
                        payType = 1;
                        toPayFunc = function(response){
                            that.jsUtil.weChat.toPay("JSAPI", response.obj, { success: wxPayedFunc });
                        }
                    }
                    if(payState === "aliPay"){
                        type = "scanCode";
                        payType = 2;
                        toPayFunc = function(response){
                            if(response.obj){
                                var theObj = typeof response.obj === "string"? response.obj: JSON.stringify(response.obj);
                                window.localStorage.setItem('sendToAliPay', theObj);
                                window.location.href = '/pay-transfer.html';
                            }
                        }
                    }
                    if(payState === "unionPay"){
                        type = "08";
                        payType = 3;
                        toPayFunc = function(response){
                            if(response.obj){
                                var theObj = typeof response.obj === "string"? response.obj: JSON.stringify(response.obj);
                                window.localStorage.setItem('sendToYinLian', theObj);
                                window.location.href = '/pay-transfer.html';
                            }
                        }
                    }
                    that.sendRequest("PAY_ORDER", {orderId:orderId, payType:payType, type:type, openId:openId, redirect:redirect})
                        .done(function(response){
                            if(response && response.success){
                                toPayFunc(response);
                            }
                            else if(response && response.errorMsg){
                                message.refresh({
                                    content: response.errorMsg,
                                    confirmBtn: false
                                });
                            }
                            else{
                                if(payState === "weChatPay"){
                                    message.refresh({
                                        content: "该订单已被微信关闭，请手动关闭该订单！",
                                        confirmBtn: false
                                    });
                                }
                            }
                        })
                        .fail(function(){
                            message.refresh({
                                type: "error",
                                content: "支付失败！"
                            });
                        })
                });

        }

    })

});