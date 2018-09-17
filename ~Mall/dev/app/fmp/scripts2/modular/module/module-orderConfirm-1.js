
/** 页面模块
 *    @detail:    orderConfirm模块_1
 *    @return:    can.Control
 *    @author:    林鹏腾
 *    @date:      2017.8.16
 */
define(["config.page.render"], function(Render) {

    'use strict';

    var api = window.capi.get();
    var crossOrderMaxPrice = api.jsData.platform.rule.crossOrder.maxPrice;
    var normalOrderMinPrice = api.jsData.platform.rule.normalOrder.minPrice;

    return Render.extend({
        //子类扩展
        tags: {
            global:"<component-orderconfirm-1></component-orderconfirm-1>",
            payChoose: "<component-pay-choose-1></component-pay-choose-1>"
        },
        region: {
            global: {
                cfgDynamic: true,
                reqDynamic: true,
                resDynamic: true,
                beforeFunc: function(that, data){
                    if($.isEmptyObject(that.config.global.showDiscount)){
                        var orderCount = 0;
                        var ordersInfo = data.response.global.ordersInfo;
                        var discountArr = data.response.discount||[];
                        var useDiscountObj = {};
                        var showDiscount = {
                            superposition: { pool:{}, chooseObj:{} },
                            unSuperposition:{ pool:{}, chooseObj:{} }
                        };
                        useDiscountObj[0] = {};
                        useDiscountObj[1] = {};
                        useDiscountObj[2] = {};
                        useDiscountObj[3] = {};
                        useDiscountObj[4] = {};
                        $.each(discountArr,function(index,obj){
                            var tName = obj.name;
                            obj.name = tName.split('/')[0];
                            obj.type = tName.split('/')[1]||'';
                            useDiscountObj[obj.rule.range][obj.couponId]= obj;
                        });
                        $.each(ordersInfo.typeObj,function(n1,o1) {
                            $.each(o1, function (n2, o2) {
                                var discountPrice = 0.00;
                                var orderDiscount = {
                                    type: o2.type,
                                    info:{
                                        superposition: { pool:[], chooseArr: [] },
                                        unSuperposition: { pool:[], choose: "-1" }
                                    },
                                    supplierId: o2.supplierId
                                };
                                var goodsTypeObj = {};
                                orderCount++;
                                goodsTypeObj['0'] = { price:o2.supplierPrice };
                                goodsTypeObj['1'] = {};
                                goodsTypeObj['2'] = {};
                                goodsTypeObj['3'] = {};
                                goodsTypeObj['4'] = {};
                                $.each(o2.itemObj,function(n3,o3){
                                    goodsTypeObj['1'][o3.firstCategory] = goodsTypeObj['1'][o3.firstCategory]   || {};
                                    goodsTypeObj['2'][o3.secondCategory] = goodsTypeObj['2'][o3.secondCategory] || {};
                                    goodsTypeObj['3'][o3.thirdCategory] = goodsTypeObj['3'][o3.thirdCategory]   || {};
                                    goodsTypeObj['4'][o3.goodsId] = goodsTypeObj['4'][o3.goodsId] || {};
                                    var fPrice = goodsTypeObj['1'][o3.firstCategory]['price']  || 0;
                                    var sPrice = goodsTypeObj['2'][o3.secondCategory]['price'] || 0;
                                    var tPrice = goodsTypeObj['3'][o3.thirdCategory]['price']  || 0;
                                    goodsTypeObj['1'][o3.firstCategory]['price'] = fPrice + o3.quantity * o3.realPrice;
                                    goodsTypeObj['2'][o3.secondCategory]['price'] = sPrice + o3.quantity * o3.realPrice;
                                    goodsTypeObj['3'][o3.thirdCategory]['price'] = tPrice + o3.quantity * o3.realPrice;
                                    goodsTypeObj['4'][o3.goodsId]['price'] = o3.quantity*o3.realPrice;
                                });
                                $.each(goodsTypeObj,function(n4,o4){
                                    $.each(o4,function(n5,o5){
                                        var isExist = n4 === "1" || n4 === "2" || n4 === "3";
                                        if(n4 === "0"){
                                            $.each(useDiscountObj[n4], function(n6, o6){
                                                if(o5*1>=o6.rule.condition){
                                                    o6.rule.superposition !== 0?
                                                        orderDiscount.info.superposition.pool.push(o6.couponId):
                                                        orderDiscount.info.unSuperposition.pool.push(o6.couponId);
                                                    o6.rule.superposition !== 0?
                                                        showDiscount.superposition.pool[o6.couponId] = o6:
                                                        showDiscount.unSuperposition.pool[o6.couponId] = o6;
                                                }
                                            })
                                        }else if(n4 === "4"){
                                            $.each(useDiscountObj[n4], function(n6, o6){
                                                $.each(o6.rule.bindingList, function(n7, o7){
                                                    if(n5 == o7.goodsId){
                                                        if(o5.price*1>=o6.rule.condition){
                                                            o6.rule.superposition !== 0?
                                                                orderDiscount.info.superposition.pool.push(o6.couponId):
                                                                orderDiscount.info.unSuperposition.pool.push(o6.couponId);
                                                            o6.rule.superposition !== 0?
                                                                showDiscount.superposition.pool[o6.couponId] = o6:
                                                                showDiscount.unSuperposition.pool[o6.couponId] = o6;
                                                            o5.couponId = o6.couponId;
                                                        }
                                                    }
                                                })
                                            });
                                        }else if(isExist){
                                            $.each(useDiscountObj[n4], function(n6, o6){
                                                if(n5 == o6.rule.category && o5.price*1>=o6.rule.condition){
                                                    o6.rule.superposition !== 0?
                                                        orderDiscount.info.superposition.pool.push(o6.couponId):
                                                        orderDiscount.info.unSuperposition.pool.push(o6.couponId);
                                                    o6.rule.superposition !== 0?
                                                        showDiscount.superposition.pool[o6.couponId] = o6:
                                                        showDiscount.unSuperposition.pool[o6.couponId] = o6;
                                                    o5.couponId = o6.couponId;
                                                }
                                            });
                                        }
                                    });
                                });
                                that.response.global.ordersInfo.orderCount = orderCount;
                                that.response.global.ordersInfo.typeObj[n1][n2].goodsTypeObj = goodsTypeObj;
                                that.response.global.ordersInfo.typeObj[n1][n2].discountPrice = discountPrice;
                                that.response.global.ordersInfo.typeObj[n1][n2].orderDiscount = orderDiscount;
                            });
                        });
                        that.config.global.showDiscount = showDiscount;
                        window.localStorage.setItem("showDiscount", JSON.stringify(showDiscount||{}));
                        window.localStorage.setItem("ordersInfo", JSON.stringify(that.response.global.ordersInfo||{}));
                    }
                },
                afterFunc: function(that, data){
                    var options = [];
                    var typeObj = {};
                    var centerId = that.renderData.global.config.centerId;
                    var ordersInfo = data.response.global.ordersInfo||{};
                    var province = data.config.global.address.province;
                    $.each(ordersInfo.typeObj, function(n1, o1){
                        if(n1 === '0'){
                            $.each(o1, function(n2, o2){
                                var supplierPrice = o2.supplierPrice;
                                var supplierWeight = o2.supplierWeight;
                                $.each(o2.itemObj, function(n3, o3){
                                    if(o3.freePost == 0){
                                        typeObj[n2] = n1;
                                        if(province && supplierPrice && supplierWeight){
                                            options.push({
                                                "centerId":   centerId,
                                                "supplierId": n2,
                                                "province":   province,
                                                "weight":     supplierWeight,
                                                "price":      supplierPrice
                                            })
                                        }
                                    }
                                });
                            });
                        }
                    });
                    if(options && options.length > 0){
                        that.sendRequest("ORDER_USER_POSTFEE", {data: encodeURI(JSON.stringify(options))}).done(function(response){
                            if(response && response.success){
                                $.each(response.obj, function(index, obj){
                                    var supplierId = obj.supplierId;
                                    var type = typeObj[supplierId];
                                    that.renderData.global.response.ordersInfo.typeObj[type][supplierId].attr("postFee", obj.postFee||0)
                                })
                            }
                        });
                    }
                }
            },
            payChoose: {
                cfgDynamic: true
            }
        },
        config: {
            global: {},
            payChoose: {
                payChooseShow: false,
                payState: null
            }
        },
        request: {
            "COUPON_USERLIST_QUERY": { status: 0 }
        },
        response: { global: {} },
        sendArr: ["COUPON_USERLIST_QUERY/discount"],
        reload: true,


        //自定义事件
        ".component-orderConfirm-orderDetails .commodity-coupon touchend": function(node){
            var that = this;
            var $node = $(node);
            var loop = true;
            var isContinue = false;
            var message = that.modules.message;
            var $parent = $node.parents(".goodsList");
            var pathUrl = that.config.global.pathUrl;
            var ordersInfo = that.renderData.global.response.ordersInfo.attr();
            var showDiscount = that.renderData.global.config.showDiscount.attr();
            var type = $parent.attr("type");
            var supplierId = $parent.attr("supplierId");
            var orderInfo = ordersInfo.typeObj[type][supplierId];
            var tDiscount = orderInfo.orderDiscount;
            var choose1 = tDiscount.info.superposition.chooseArr.join(",")||"";
            var choose2 = tDiscount.info.unSuperposition.choose||"-1";
            if(choose1 || (choose2 && choose2!=="-1")){
                isContinue = true;
            }else{
                $.each(tDiscount.info, function(n1, o1){
                    $.each(o1.pool, function(n2, o2){
                        if(!loop){ return false; }
                        /*if(!showDiscount[n1].chooseObj[o2]){ loop = false; isContinue = true; }*/
                        loop = false;
                        isContinue = true;
                    });
                });
            }
            if(isContinue){
                var JSON_orderInfo = JSON.stringify(orderInfo||{});
                var JSON_ordersInfo = JSON.stringify(ordersInfo||{});
                var JSON_showDiscount = JSON.stringify(showDiscount||{});
                window.localStorage.setItem("orderInfo", JSON_orderInfo);
                window.localStorage.setItem("ordersInfo", JSON_ordersInfo);
                window.localStorage.setItem("showDiscount", JSON_showDiscount);
                window.location.href="/discount.html?type=orderConfirm&jumpUrl="+pathUrl+"&choose1="+choose1+"&choose2="+choose2;
            }
            else{
                message.refresh({
                    content:    "该订单暂无可使用的优惠券！",
                    cancelBtn: false,
                    confirmBtn: false
                });
            }
        },
        ".component-orderConfirm-content .commodity-payBtn .btn_commit touchend": function(node){
            var that = this;
            var $node = $(node);
            var options = {};
            var idsArr = [];
            var couponIdArr = [];
            var $element = that.element;
            var message = that.modules.message;
            var jumpUrl = that.config.global.jumpUrl;
            var pathUrl = that.config.global.pathUrl;
            var redirect = that.config.global.redirect;
            var $parent = $node.parents(".goodsList");
            var focusTime = api.jsEvent.touch.focusTime;
            if(focusTime<=500){ return null; }
            var orderFlag = $parent.attr("type");
            var supplierId = $parent.attr("supplierId");
            var address = that.config.global.address;
            var ordersInfo = that.renderData.global.response.ordersInfo;
            var orders = ordersInfo.typeObj[orderFlag][supplierId].attr();
            var chooseArr = orders.orderDiscount.info.superposition.chooseArr;
            var choose = orders.orderDiscount.info.unSuperposition.choose;
            var orderCount = ordersInfo.attr("orderCount");
            var openId = window.localStorage.getItem("openId");
            var pushUserId = window.localStorage.getItem('pushUserId');
            var tagFun = 0;
            var remark = $element.find('.commodity-remark input').val() || '';
            var noStockState = false;
            var noStockName = false;

            that.renderData.payChoose.config.attr("payChooseShow", true);
            that.renderData.payChoose.config.attr("payState", $.Deferred());

            var tdq = 0;
            var orderDetail = {};
            var orderGoodsList = [];

            orderDetail.receiveName = address.receiveName;
            orderDetail.receivePhone = address.receivePhone;
            orderDetail.receiveProvince = address.province;
            orderDetail.receiveCity = address.city;
            orderDetail.receiveArea = address.area;
            orderDetail.receiveAddress = address.address;
            orderDetail.payment = orders.orderPrice*1 - orders.discountPrice*1;
            orderDetail.postFee = orders.postFee;
            orderDetail.taxFee = orders.taxFee;

            $.each(orders.itemObj, function (n3, o3) {
                o3.ids && idsArr.push(o3.ids);
                orderGoodsList.push({
                    sku: o3.sku,
                    itemId: o3.itemId,
                    goodsId: o3.goodsId,
                    itemCode: o3.itemCode,
                    itemName: o3.goodsName,
                    itemImg: o3.itemImg,
                    itemInfo: o3.info,
                    itemQuantity: o3.quantity,
                    itemPrice: o3.realPrice,
                    actualPrice: o3.rakebackRealPrice
                });
                if (!o3.stock || o3.stock <= 0) {
                    noStockState = true;
                    noStockName = o3.goodsName;
                    return false;
                }
                tagFun = o3.tagFunId || 0;
                tdq++;
            });

            if (noStockState) {
                message.refresh({
                    title: '库存不足',
                    content: "该订单" + noStockName + "商品库存不足，是否返回上页调整？",
                    DOMClick: false,
                    cancelBtn: true,
                    confirmBtn: true,
                    cancelFun: function(){},
                    confirmFun: function(){
                        that.jsUtil.url.jumpPage(jumpUrl, null, true);
                    }
                });
                return;
            }

            options = {
                tdq: tdq,
                openId: openId,
                supplierId: supplierId,
                orderDetail: orderDetail,
                orderGoodsList: orderGoodsList,
                createType: tagFun === 1? 4: 0,
                expressType: 0,
                orderSource: 7,
                orderFlag: orderFlag,
                pushUserId: pushUserId,
                redirect: redirect,
                tagFun: tagFun,
                remark: remark
            };

            if(choose && choose !== "-1"){ couponIdArr.push(choose); }
            $.each(chooseArr, function(index, couponId){ couponIdArr.push(couponId); });
            if(couponIdArr.length > 0){ options.couponIds = couponIdArr.join(",") }

            $.when(that.renderData.payChoose.config.attr().payState)
                .done(function(payState){
                    var toPayFunc = function(){};
                    var createdFunc = function(){
                        ordersInfo.attr("orderCount", orderCount);
                        ordersInfo.typeObj[orderFlag][supplierId].attr("commitText", "提交成功");
                        window.localStorage.setItem("ordersInfo", JSON.stringify(ordersInfo.attr()));
                        window.localStorage.removeItem("pushUserId");
                    };
                    var wxPayedFunc = function(){
                        ordersInfo.typeObj[orderFlag].removeAttr(supplierId);
                        if(orderCount <= 0){ ordersInfo.removeAttr("orderCount") }
                        if($.isEmptyObject(ordersInfo.typeObj[orderFlag].attr())){ordersInfo.typeObj.removeAttr(orderFlag)}
                        if($.isEmptyObject(ordersInfo.typeObj.attr())){ ordersInfo.removeAttr("typeObj") }
                        window.localStorage.setItem("ordersInfo", JSON.stringify(ordersInfo.attr()));
                        if(orderCount <= 0) window.location.replace("/orderList.html");
                    };
                    var otherPayedFunc = function(){
                        var tOrdersInfo = ordersInfo.attr();
                        delete tOrdersInfo.typeObj[orderFlag][supplierId];
                        if(orderCount <= 0){ delete tOrdersInfo.orderCount }
                        if($.isEmptyObject(tOrdersInfo.typeObj[orderFlag])){ delete tOrdersInfo.typeObj[orderFlag] }
                        if($.isEmptyObject(tOrdersInfo.typeObj)){ delete tOrdersInfo.typeObj }
                        window.localStorage.setItem("ordersInfo", JSON.stringify(tOrdersInfo));
                        window.localStorage.removeItem("sendToYinLian");
                        window.localStorage.removeItem("sendToAliPay");
                    };
                    ordersInfo.typeObj[orderFlag][supplierId].attr("committed", true);
                    ordersInfo.typeObj[orderFlag][supplierId].attr("commitText", "正在提交..");
                    if(payState === "weChatPay"){
                        options.type = "JSAPI";
                        options.payType = options.orderDetail.payType = 1;
                        toPayFunc = function(response){
                            that.jsUtil.weChat.toPay("JSAPI", response.obj, {
                                success: wxPayedFunc,
                                cancel: wxPayedFunc
                            });
                        }
                    }
                    if(payState === "aliPay"){
                        options.type = "scanCode";
                        options.payType = options.orderDetail.payType = 2;
                        toPayFunc = function(response){
                            if(response.obj){
                                otherPayedFunc();
                                var theObj = typeof response.obj === "string"? response.obj: JSON.stringify(response.obj);
                                window.localStorage.setItem('sendToAliPay', theObj);
                                window.location.href = '/pay-transfer.html';
                            }
                        }
                    }
                    if(payState === "unionPay"){
                        options.type = "08";
                        options.payType = options.orderDetail.payType = 3;
                        toPayFunc = function(response){
                            if(response.obj){
                                otherPayedFunc();
                                var theObj = typeof response.obj === "string"? response.obj: JSON.stringify(response.obj);
                                window.localStorage.setItem('sendToYinLian', theObj);
                                window.location.href = '/pay-transfer.html';
                            }
                        }
                    }
                    that.sendRequest("USER_DETAIL_QUERY")
                        .done(function(response) {
                            if (!response || !response.success) {
                                message.refresh({
                                    title:'实名认证',
                                    content: "跨境订单需填写身份证信息, 请完善!",
                                    DOMClick: false,
                                    cancelBtn: false,
                                    confirmBtn: true,
                                    cancelFun: function(){},
                                    confirmFun: function(){
                                        window.location.href="/personal-information.html?jumpUrl=" + pathUrl;
                                    }
                                });
                            }
                            else if($.isPlainObject(response.obj)){
                                if($.isPlainObject(response.obj.userDetail) && response.obj.userDetail.idNum){
                                    var isContinue = 0;
                                    if(orderFlag == 0){
                                        if(options.orderDetail.payment > crossOrderMaxPrice){
                                            if(options.orderGoodsList.length !== 1 ||
                                                options.orderGoodsList[0].itemQuantity !== 1){
                                                isContinue = 1;
                                            }
                                        }
                                    }else if(orderFlag == 2){
                                        if(options.orderDetail.payment < normalOrderMinPrice && options.supplierId * 1 === 6){
                                            isContinue = 2;
                                        }
                                    }
                                    if(isContinue == 0){
                                        that.sendRequest("ORDER_USER_CREATE", options)
                                            .done(function (response){
                                                if (response && response.success) {
                                                    orderCount--;
                                                    if (idsArr.join(",")) {
                                                        that.sendRequest("ORDER_SHOPPINGCART_DELETE", {
                                                            ids: idsArr.join(","),
                                                            platformSource: 7
                                                        }).done(function(){
                                                            createdFunc();
                                                            toPayFunc(response);
                                                        })
                                                    }else {
                                                        createdFunc();
                                                        toPayFunc(response);
                                                    }
                                                }else{
                                                    message.refresh({
                                                        type:    "error",
                                                        content: (response||{}).errorMsg||"提交订单失败！",
                                                        cancelBtn: false,
                                                        confirmBtn: false
                                                    });
                                                    ordersInfo.typeObj[orderFlag][supplierId].attr("committed", false);
                                                    ordersInfo.typeObj[orderFlag][supplierId].attr("commitText", "重新提交");
                                                    window.localStorage.setItem("ordersInfo", JSON.stringify(ordersInfo.attr()));
                                                }
                                            })
                                            .fail(function(response){
                                                message.refresh({
                                                    type:    "error",
                                                    content: (response||{}).errorMsg||"提交订单失败！",
                                                    cancelBtn: false,
                                                    confirmBtn: false
                                                });
                                                ordersInfo.typeObj[orderFlag][supplierId].attr("committed", false);
                                                ordersInfo.typeObj[orderFlag][supplierId].attr("commitText", "重新提交");
                                                window.localStorage.setItem("ordersInfo", JSON.stringify(ordersInfo.attr()));
                                            })
                                    }
                                    else if(isContinue == 1){
                                        message.refresh({
                                            title:'温馨提示',
                                            content:'根据海关相关规定，单笔跨境订单金额不得超过' + crossOrderMaxPrice + '元，是否返回上页调整？',
                                            DOMClick: false,
                                            cancelBtn: true,
                                            confirmBtn: true,
                                            cancelFun: function(){
                                                ordersInfo.typeObj[orderFlag][supplierId].attr("committed", false);
                                                ordersInfo.typeObj[orderFlag][supplierId].attr("commitText", "重新提交");
                                            },
                                            confirmFun: function(){
                                                that.jsUtil.url.jumpPage(jumpUrl, null, true);
                                            }
                                        });
                                    }
                                    else if(isContinue == 2){
                                        message.refresh({
                                            title:'温馨提示',
                                            content:'该笔一般贸易订单金额未满' + normalOrderMinPrice + '元，是否返回上页调整？',
                                            DOMClick: false,
                                            cancelBtn: true,
                                            confirmBtn: true,
                                            cancelFun: function(){
                                                ordersInfo.typeObj[orderFlag][supplierId].attr("committed", false);
                                                ordersInfo.typeObj[orderFlag][supplierId].attr("commitText", "重新提交");
                                            },
                                            confirmFun: function(){
                                                that.jsUtil.url.jumpPage(jumpUrl, null, true);
                                            }
                                        });
                                    }
                                }
                                else{
                                    message.refresh({
                                        title:'实名认证',
                                        content: "跨境订单需填写身份证信息, 请完善!",
                                        DOMClick: false,
                                        cancelBtn: false,
                                        confirmBtn: true,
                                        cancelFun: function(){},
                                        confirmFun: function(){
                                            window.location.href="/personal-information.html?jumpUrl=" + pathUrl;
                                        }
                                    });
                                }
                            }
                        })
                });
        }

    });

});