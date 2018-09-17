
/** 页面模块
 *    @detail:    orderList模块_1
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
            global: "<component-orderlist-1></component-orderlist-1>",
            payChoose: "<component-pay-choose-1></component-pay-choose-1>"
        },
        region: {
            global: {
                cfgDynamic: true,
                reqDynamic: false,
                resDynamic: true,
                beforeFunc: function (that, data) {
                    var needPay = 0;
                    var needDeliver = 0;
                    var needReceived = 0;
                    var finish = 0;
                    var orderInfo = data.response.global.orderInfo || {};
                    $.each(data.response.global.orderStatus, function (i, obj) {
                        var status = obj.status;
                        var total = obj.total;
                        if (status === 0) {
                            needPay += total;
                        }
                        else if (status === 1 || status === 2 || status === 3 || status === 4 || status === 5 || status === 11 || status === 12) {
                            needDeliver += total;
                        }
                        else if (status === 6) {
                            needReceived += total;
                        }
                        else if(status === 7){
                            finish += total;
                        }
                    });
                    that.config.global.currentPage = (orderInfo.pagination||{}).currentPage;
                    that.config.global.totalPages = (orderInfo.pagination||{}).totalPages;
                    that.response.global.orderStatus = {
                        needPay: needPay,
                        needDeliver: needDeliver,
                        needReceived: needReceived,
                        finish: finish
                    };
                },
                afterFunc: function(that, data){
                    that.config.global.currentPage === that.config.global.totalPages?
                        $(that.element).find(".isLoading span").text("没有更多数据了..."):
                        $(that.element).find(".isLoading span").text("请下拉加载...");
                }
            },
            payChoose: {
                cfgDynamic: true
            }
        },
        config: {
            global: {
                siteInfo: api.jsData.siteInfo
            },
            payChoose: {
                payChooseShow: false,
                payState: null
            }
        },
        request: {
            global: {},
            ORDER_USER_QUERY: {
                "numPerPage": 5,
                "currentPage": 1
            }
        },
        response: {
            global: {}
        },
        sendArr: ["ORDER_USER_QUERY/global/orderInfo", "ORDER_USER_STATUS_COUNT/global/orderStatus"],
        reload: false,


        //自定义事件
        ".component-orderList-content       span.state touchend": function(node){
            var that = this;
            var $node = $(node);
            var message = that.modules.message;
            if($node.hasClass("active")){
                return;
            }
            if($node.hasClass("state_all")){
                delete that.request.ORDER_USER_QUERY.status;
                delete that.request.ORDER_USER_QUERY.statusArr;
                that.request.ORDER_USER_QUERY.currentPage = 1;
                that.renderData.global.config.attr("orderAll", "active");
                that.renderData.global.config.attr("orderNeedPay", null);
                that.renderData.global.config.attr("orderNeedDeliver", null);
                that.renderData.global.config.attr("orderNeedReceive", null);
                that.renderData.global.config.attr("orderFinished", null);
                that.jsUtil.url.delParam(["queryType"], "cover");
            }
            else if($node.hasClass("state_needPay")){
                that.request.ORDER_USER_QUERY.status = 0;
                that.request.ORDER_USER_QUERY.currentPage = 1;
                delete that.request.ORDER_USER_QUERY.statusArr;
                that.renderData.global.config.attr("orderAll", null);
                that.renderData.global.config.attr("orderNeedPay", "active");
                that.renderData.global.config.attr("orderNeedDeliver", null);
                that.renderData.global.config.attr("orderNeedReceive", null);
                that.renderData.global.config.attr("orderFinished", null);
                that.jsUtil.url.setParam({"queryType": "needPay"}, "cover");
            }
            else if($node.hasClass("state_needDeliver")){
                delete that.request.ORDER_USER_QUERY.status;
                that.request.ORDER_USER_QUERY.currentPage = 1;
                that.request.ORDER_USER_QUERY.statusArr = "1,2,3,4,5,11,12";
                that.renderData.global.config.attr("orderAll", null);
                that.renderData.global.config.attr("orderNeedPay", null);
                that.renderData.global.config.attr("orderNeedDeliver", "active");
                that.renderData.global.config.attr("orderNeedReceive", null);
                that.renderData.global.config.attr("orderFinished", null);
                that.jsUtil.url.setParam({"queryType": "needDeliver"}, "cover");
            }
            else if($node.hasClass("state_needReceive")){
                that.request.ORDER_USER_QUERY.status = 6;
                that.request.ORDER_USER_QUERY.currentPage = 1;
                delete that.request.ORDER_USER_QUERY.statusArr;
                that.renderData.global.config.attr("orderAll", null);
                that.renderData.global.config.attr("orderNeedPay", null);
                that.renderData.global.config.attr("orderNeedDeliver", null);
                that.renderData.global.config.attr("orderNeedReceive", "active");
                that.renderData.global.config.attr("orderFinished", null);
                that.jsUtil.url.setParam({"queryType": "needReceived"}, "cover");
            }
            else if($node.hasClass("state_finished")){
                that.request.ORDER_USER_QUERY.status = 7;
                that.request.ORDER_USER_QUERY.currentPage = 1;
                delete that.request.ORDER_USER_QUERY.statusArr;
                that.renderData.global.config.attr("orderAll", null);
                that.renderData.global.config.attr("orderNeedPay", null);
                that.renderData.global.config.attr("orderNeedDeliver", null);
                that.renderData.global.config.attr("orderNeedReceive", null);
                that.renderData.global.config.attr("orderFinished", "active");
                that.jsUtil.url.setParam({"queryType": "finished"}, "cover");
            }
            that.toRender(
                ["ORDER_USER_QUERY/global/orderInfo", "ORDER_USER_STATUS_COUNT/global/orderStatus"],
                [{}, {}],
                [{"global": ["response"]}, "pagination"]
            ).done(function(){
                $("html,body").animate({scrollTop: 0}, 300);
            }).fail(function(){
                message.refresh({
                    type: "error",
                    cancelBtn: false,
                    confirmBtn: false,
                    content: "获取失败，请重试！"
                });
            });
        },
        ".component-orderList-orderDetails .btn_confirmDelivery touchend": function(node){
            var that = this;
            var $node = $(node);
            var orderId = $node.attr("orderId");
            var message = that.modules.message;
            that.request.ORDER_USER_CONFIRM.orderId = orderId;
            message.refresh({
                type: "info",
                language: "zh",
                content: "该订单是否确认收货？",
                DOMClick: false,
                cancelBtn: true,
                confirmBtn: true,
                cancelFun: function(){},
                confirmFun: function(){
                    that.sendRequest("ORDER_USER_CONFIRM")
                        .done(function(response){
                            if(response && response.success){
                                that.toRender(
                                    ["ORDER_USER_QUERY/global/orderInfo", "ORDER_USER_STATUS_COUNT/global/orderStatus"],
                                    [{}, {}],
                                    [{"global": ["response"]}, "pagination"]
                                );
                            }
                            else{
                                message.refresh({
                                    type: "error",
                                    cancelBtn: false,
                                    confirmBtn: false,
                                    content: response && response.errorMsg || "确认收货失败！"
                                })
                            }
                        })
                        .fail(function(response){
                            message.refresh({
                                type: "error",
                                cancelBtn: false,
                                confirmBtn: false,
                                content: response && response.errorMsg || "确认收货失败！"
                            })
                        });
                }
            });
        },
        ".component-orderList-orderDetails .btn_closeOrder touchend": function(node){
            var that = this;
            var $node = $(node);
            var orderId = $node.attr("orderId");
            var message = that.modules.message;
            that.request.ORDER_USER_CLOSE.orderId = orderId;
            message.refresh({
                type: "info",
                language: "zh",
                content: "是否关闭该订单？请确认！",
                DOMClick: false,
                cancelBtn: true,
                confirmBtn: true,
                cancelFun: function(){
                },
                confirmFun: function(){
                    that.sendRequest("ORDER_USER_CLOSE")
                        .done(function(response){
                            if(response && response.success){
                                that.toRender(
                                    ["ORDER_USER_QUERY/global/orderInfo", "ORDER_USER_STATUS_COUNT/global/orderStatus"],
                                    [{}, {}],
                                    [{"global": ["response"]}, "pagination"]
                                );
                            }
                            else{
                                message.refresh({
                                    type: "error",
                                    cancelBtn: false,
                                    confirmBtn: false,
                                    content: response && response.errorMsg ||"关闭订单失败！"
                                })
                            }
                        })
                        .fail(function(response){
                            message.refresh({
                                type: "error",
                                cancelBtn: false,
                                confirmBtn: false,
                                content: response && response.errorMsg || "关闭订单失败！"
                            })
                        });
                }
            });
        },
        ".component-orderList-orderDetails .btn_delOrder touchend": function(node){
            var that = this;
            var $node = $(node);
            var orderId = $node.attr("orderId");
            var message = that.modules.message;
            that.request.ORDER_USER_DELETE.orderId = orderId;
            message.refresh({
                type: "info",
                language: "zh",
                content: "是否删除该订单？请确认！",
                DOMClick: false,
                cancelBtn: true,
                confirmBtn: true,
                cancelFun: function(){},
                confirmFun: function(){
                    that.sendRequest("ORDER_USER_DELETE")
                        .done(function(response){
                            if(response && response.success){
                                that.toRender(
                                    ["ORDER_USER_QUERY/global/orderInfo", "ORDER_USER_STATUS_COUNT/global/orderStatus"],
                                    [{}, {}],
                                    [{"global": ["response"]}, "pagination"]
                                );
                            }
                            else{
                                message.refresh({
                                    type: "error",
                                    cancelBtn: false,
                                    confirmBtn: false,
                                    content: "订单确认失败！"
                                })
                            }
                        })
                        .fail(function(response){
                            if(response && response.errorMsg){
                                message.refresh({
                                    type: "error",
                                    cancelBtn: false,
                                    confirmBtn: false,
                                    content: response.errorMsg || "订单确认失败！"
                                })
                            }
                        });
                }
            });
        },
        ".component-orderList-orderDetails .btn_refund touchend": function(){
            var that = this;
            var message = that.modules.message;
            var siteInfo = that.renderData.global.config.siteInfo.attr()||{};
            if(siteInfo.qq){
                window.open("http://wpa.qq.com/msgrd?v=3&uin=" + siteInfo.qq +"&site=qq&menu=yes");
            }
            else{
                message.refresh({
                    content: "暂时无法联系客服!",
                    confirmBtn: false
                });
            }
        },
        ".component-orderList-orderDetails .btn_toPay touchend": function(node){
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
                    var wxPayedFunc =  function(){ setTimeout(function(){ window.location.replace(window.location.href); }, 200)};
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
                    that.sendRequest("PAY_ORDER", {orderId:orderId, payType:payType, type:type, openId:openId, redirect:redirect })
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
                                cancelBtn: false,
                                confirmBtn: false,
                                content: "支付失败！"
                            });
                        })
                });
        },
        ".component-orderList-orderDetails .btn_viewLogistics touchend": function(node){
            var that = this;
            var $node = $(node);
            var message = that.modules.message;
            var orderList = that.renderData.global.response.orderInfo.orderList.attr();
            var orderId = $node.attr("orderId");
            var orderInfo = null;

            $.each(orderList||{}, function(index, orderObj){
                if(orderId === orderObj.orderId){
                    orderInfo = orderObj;
                    return false;
                }
            });

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
                        cancelBtn: false,
                        confirmBtn: false,
                        content: "暂无物流信息！"
                    })
                }
            }
            else{
                message.refresh({
                    cancelBtn: false,
                    confirmBtn: false,
                    content: "暂无物流信息！"
                })
            }
        },
        "{window}   scroll": function(){
            var that = this;
            var $node = $(document);
            var cfgTotalPages = that.config.global.totalPages;
            var cfgCurrentPage = that.config.global.currentPage;
            var reqCurrentPage = that.request["ORDER_USER_QUERY"].currentPage;
            var isEnd = cfgCurrentPage === cfgTotalPages;
            var isComm = cfgCurrentPage < reqCurrentPage;
            var isQuery = ($(window).scrollTop() + $(window).height() + 350) > $(document).height();
            !isEnd?
                $node.find(".isLoading span").text("请下拉加载..."):
                $node.find(".isLoading span").text("没有更多数据了...");
            if(isQuery && !isEnd && !isComm){
                that.request["ORDER_USER_QUERY"].currentPage++;
                that.sendRequest("ORDER_USER_QUERY", {currentPage: cfgCurrentPage+1})
                    .done(function(response){
                        if(response && response.success){
                            var dataObj = response.obj;
                            $.each(dataObj.orderList, function(index, order){
                                that.renderData.global.response.orderInfo.orderList.push(order);
                            });
                            if(dataObj.pagination.currentPage === dataObj.pagination.totalPages){
                                $node.find(".isLoading span").text("没有更多数据了...");
                            }
                            that.config.global.currentPage = dataObj.pagination.currentPage;
                            that.config.global.totalPages = dataObj.pagination.totalPages;
                        }
                    })
            }
        }
    });

});