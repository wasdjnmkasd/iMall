
/** 页面模块
 *    @detail:    shoppingCart模块_1
 *    @return:    can.Control
 *    @author:    林鹏腾
 *    @date:      2017.8.16
 */
define(["config.page.render"], function(Render) {

    'use strict';

    var api = window.capi.get();
    var isLogin = api.jsData.userInfo.isLogin;
    var crossOrderMaxPrice = api.jsData.platform.rule.crossOrder.maxPrice;
    var normalOrderMinPrice = api.jsData.platform.rule.normalOrder.minPrice;

    return Render.extend({
        //子类扩展
        tags: {
            global: "<component-shoppingcart-1></component-shoppingcart-1>"
        },
        region: {
            global: {
                cfgDynamic: true,
                reqDynamic: true,
                resDynamic: true,
                beforeFunc: function(that, data) {
                    var orders = {};
                    orders.typeObj = {};
                    orders.quantity = 0;
                    orders.allSelected = false;
                    orders.oneSelected = false;
                    $.each(data.response.global, function (n1, o1) {
                        if(o1.goodsSpecs){
                            var type = o1.type;
                            var itemId = o1.itemId;
                            var status = o1.goodsSpecs.status;
                            var supplierId = o1.supplierId;
                            var supplierName = o1.supplierName;
                            var typeName = type===0? "跨境": type===2? "一般": type===1? "大贸": "";
                            orders.quantity += 1;
                            orders.typeObj[type] = orders.typeObj[type] || {};
                            orders.typeObj[type][supplierId] = orders.typeObj[type][supplierId] || {};
                            orders.typeObj[type][supplierId].type = type;
                            orders.typeObj[type][supplierId].typeName = typeName;
                            orders.typeObj[type][supplierId].supplierId = supplierId;
                            orders.typeObj[type][supplierId].supplierName = supplierName;
                            orders.typeObj[type][supplierId].itemObj = orders.typeObj[type][supplierId].itemObj || {};
                            orders.typeObj[type][supplierId].itemObj[itemId] = {};
                            orders.typeObj[type][supplierId].itemObj[itemId].ids = o1.id;
                            orders.typeObj[type][supplierId].itemObj[itemId].status = status;
                            orders.typeObj[type][supplierId].itemObj[itemId].selected = o1.goodsSpecs.stock>0 && status !== 0;
                            orders.typeObj[type][supplierId].itemObj[itemId].goodsId = o1.goodsSpecs.goodsId;
                            orders.typeObj[type][supplierId].itemObj[itemId].firstCategory = o1.goodsSpecs.firstCategory;
                            orders.typeObj[type][supplierId].itemObj[itemId].secondCategory = o1.goodsSpecs.secondCategory;
                            orders.typeObj[type][supplierId].itemObj[itemId].thirdCategory = o1.goodsSpecs.thirdCategory;
                            orders.typeObj[type][supplierId].itemObj[itemId].type = type;
                            orders.typeObj[type][supplierId].itemObj[itemId].href = o1.href;
                            orders.typeObj[type][supplierId].itemObj[itemId].itemId = o1.itemId;
                            orders.typeObj[type][supplierId].itemObj[itemId].freePost = o1.freePost;
                            orders.typeObj[type][supplierId].itemObj[itemId].freeTax = o1.freeTax;
                            orders.typeObj[type][supplierId].itemObj[itemId].itemImg = o1.picPath;
                            orders.typeObj[type][supplierId].itemObj[itemId].quantity = o1.quantity;
                            orders.typeObj[type][supplierId].itemObj[itemId].itemName = o1.goodsName;
                            orders.typeObj[type][supplierId].itemObj[itemId].goodsName = o1.goodsName;
                            orders.typeObj[type][supplierId].itemObj[itemId].itemSpecs = o1.goodsSpecs;
                            orders.typeObj[type][supplierId].itemObj[itemId].itemCode = o1.goodsSpecs.itemCode;
                            orders.typeObj[type][supplierId].itemObj[itemId].stock = o1.goodsSpecs.stock>0? o1.goodsSpecs.stock: 0;
                            orders.typeObj[type][supplierId].itemObj[itemId].weight = o1.goodsSpecs.weight;
                            orders.typeObj[type][supplierId].itemObj[itemId].exciseTax = o1.goodsSpecs.exciseTax;
                            orders.typeObj[type][supplierId].itemObj[itemId].incrementTax = o1.goodsSpecs.incrementTax;
                            orders.typeObj[type][supplierId].itemObj[itemId].priceList = o1.goodsSpecs.priceList;
                            orders.typeObj[type][supplierId].itemObj[itemId].carton = o1.goodsSpecs.carton;
                            orders.typeObj[type][supplierId].itemObj[itemId].tagList = [];
                            $.each(o1.goodsSpecs.tagList, function(i, o){
                                if (o.tagName === '预售') {
                                    orders.typeObj[type][supplierId].itemObj[itemId].tagFunId = o.tagFunId;
                                    orders.typeObj[type][supplierId].itemObj[itemId].preSaleName = o.tagName;
                                    orders.typeObj[type][supplierId].itemObj[itemId].preSaleDesc = o.description;
                                }
                                orders.typeObj[type][supplierId].itemObj[itemId].tagList.push(o);
                            });
                        }
                    });
                    that.response.global = {};
                    that.response.global.orders = orders;
                }
            }
        },
        config: {
            quantityTimer: null
        },
        request: {},
        response: {},
        sendArr:isLogin? ["ORDER_SHOPPINGCART_QUERY"]: [],
        reload: false,


        //自定义事件
        ".component-shoppingCart-ordersDetails    .goodsList                    touchmove": function(node, ev){
            var $node = $(node);
            var event = ev || window.event;
            var touchSX = Math.abs(api.jsEvent.touch.touchSX);
            var touchSY = Math.abs(api.jsEvent.touch.touchSY);
            var $other = $node.parent().find(".goodsList").not($node);
            var range = touchSX <= 280? touchSX: 280;
            if(touchSY < touchSX - 80){
                if(api.jsEvent.touch.touchSX > 0){
                    $node.parent().find(".goodsList .controlGroup").css("display", "block");
                    $node.hasClass("inControl") && $node.find(".body").css("transform", "translate3d("+ ((range - 80) - 200) + "px, 0, 0)");
                    $node.hasClass("inControl") && $node.find(".body").css("-o-transform", "translate3d("+ ((range - 80) - 200) + "px, 0, 0)");
                    $node.hasClass("inControl") && $node.find(".body").css("-ms-transform", "translate3d("+ ((range - 80) - 200) + "px, 0, 0)");
                    $node.hasClass("inControl") && $node.find(".body").css("-moz-transform", "translate3d("+ ((range - 80) - 200) + "px, 0, 0)");
                    $node.hasClass("inControl") && $node.find(".body").css("-webkit-transform", "translate3d("+ ((range - 80) - 200) + "px, 0, 0)");
                    $node.hasClass("inControl") && $node.find(".controlGroup").css("transform", "translate3d("+ ((range - 80) + 550) + "px, 0, 0)");
                    $node.hasClass("inControl") && $node.find(".controlGroup").css("-o-transform", "translate3d("+ ((range - 80) + 550) + "px, 0, 0)");
                    $node.hasClass("inControl") && $node.find(".controlGroup").css("-ms-transform", "translate3d("+ ((range - 80) + 550) + "px, 0, 0)");
                    $node.hasClass("inControl") && $node.find(".controlGroup").css("-moz-transform", "translate3d("+ ((range - 80) + 550) + "px, 0, 0)");
                    $node.hasClass("inControl") && $node.find(".controlGroup").css("-webkit-transform", "translate3d("+ ((range - 80) + 550) + "px, 0, 0)");
                    $node.hasClass("inControl") && $node.find(".body,.controlGroup").css("transition", "none");
                    $node.hasClass("inControl") && $node.find(".body,.controlGroup").css("-o-transition", "none");
                    $node.hasClass("inControl") && $node.find(".body,.controlGroup").css("-ms-transition", "none");
                    $node.hasClass("inControl") && $node.find(".body,.controlGroup").css("-moz-transition", "none");
                    $node.hasClass("inControl") && $node.find(".body,.controlGroup").css("-webkit-transition", "none");
                    $other.find(".body,.controlGroup").css("transition", "none");
                    $other.find(".body,.controlGroup").css("-o-transition", "none");
                    $other.find(".body,.controlGroup").css("-ms-transition", "none");
                    $other.find(".body,.controlGroup").css("-moz-transition", "none");
                    $other.find(".body,.controlGroup").css("-webkit-transition", "none");
                }
                if(api.jsEvent.touch.touchSX < 0){
                    if(!$node.hasClass("inControl")){
                        $node.find(".controlGroup").css("transform", "translate3d("+ (750 - (range - 80)) + "px, 0, 0)");
                        $node.find(".controlGroup").css("-o-transform", "translate3d("+ (750 - (range - 80)) + "px, 0, 0)");
                        $node.find(".controlGroup").css("-ms-transform", "translate3d("+ (750 - (range - 80)) + "px, 0, 0)");
                        $node.find(".controlGroup").css("-moz-transform", "translate3d("+ (750 - (range - 80)) + "px, 0, 0)");
                        $node.find(".controlGroup").css("-webkit-transform", "translate3d("+ (750 - (range - 80)) + "px, 0, 0)");
                        $node.find(".body").css("transform", "translate3d("+ (0 - (touchSX - 80)) + "px, 0, 0)");
                        $node.find(".body").css("-o-transform", "translate3d("+ (0 - (touchSX - 80)) + "px, 0, 0)");
                        $node.find(".body").css("-ms-transform", "translate3d("+ (0 - (touchSX - 80)) + "px, 0, 0)");
                        $node.find(".body").css("-moz-transform", "translate3d("+ (0 - (touchSX - 80)) + "px, 0, 0)");
                        $node.find(".body").css("-webkit-transform", "translate3d("+ (0 - (touchSX - 80)) + "px, 0, 0)");
                    }
                    if($node.hasClass("inControl")){
                        $node.find(".body").css("transform", "translate3d("+ (-200 - (touchSX - 80)) + "px, 0, 0)");
                        $node.find(".body").css("-o-transform", "translate3d("+ (-200 - (touchSX - 80)) + "px, 0, 0)");
                        $node.find(".body").css("-ms-transform", "translate3d("+ (-200 - (touchSX - 80)) + "px, 0, 0)");
                        $node.find(".body").css("-moz-transform", "translate3d("+ (-200 - (touchSX - 80)) + "px, 0, 0)");
                        $node.find(".body").css("-webkit-transform", "translate3d("+ (-200 - (touchSX - 80)) + "px, 0, 0)");
                    }
                    $node.find(".body,.controlGroup").css("transition", "none");
                    $node.find(".body,.controlGroup").css("-o-transition", "none");
                    $node.find(".body,.controlGroup").css("-ms-transition", "none");
                    $node.find(".body,.controlGroup").css("-moz-transition", "none");
                    $node.find(".body,.controlGroup").css("-webkit-transition", "none");
                    $other.find(".controlGroup").css("transform", "translate3d(748px, 0, 0)");
                    $other.find(".controlGroup").css("-o-transform", "translate3d(748px, 0, 0)");
                    $other.find(".controlGroup").css("-ms-transform", "translate3d(748px, 0, 0)");
                    $other.find(".controlGroup").css("-moz-transform", "translate3d(748px, 0, 0)");
                    $other.find(".controlGroup").css("-webkit-transform", "translate3d(748px, 0, 0)");
                    $other.find(".body,.controlGroup").css("transition", "200ms linear");
                    $other.find(".body,.controlGroup").css("-o-transition", "200ms linear");
                    $other.find(".body,.controlGroup").css("-ms-transition", "200ms linear");
                    $other.find(".body,.controlGroup").css("-moz-transition", "200ms linear");
                    $other.find(".body,.controlGroup").css("-webkit-transition", "200ms linear");
                    $other.find(".body").css("transform", "translate3d(0, 0, 0)");
                    $other.find(".body").css("-o-transform", "translate3d(0, 0, 0)");
                    $other.find(".body").css("-ms-transform", "translate3d(0, 0, 0)");
                    $other.find(".body").css("-moz-transform", "translate3d(0, 0, 0)");
                    $other.find(".body").css("-webkit-transform", "translate3d(0, 0, 0)");
                    $node.parent().find(".goodsList .controlGroup").css("display", "block");
                    $other.removeClass("inControl");
                }
                event.preventDefault();
                event.stopPropagation();
            }
        },
        ".component-shoppingCart-ordersDetails    .goodsList                    touchend": function(node, ev){
            var $node = $(node);
            var $other = $node.parent().find(".goodsList").not($node);
            if(api.jsEvent.touch.touchIsMoved){
                if($node.hasClass("inControl") && api.jsEvent.touch.touchSX >= 30){
                    $node.removeClass("inControl");
                    $other.removeClass("inControl");
                    $node.find(".body,.controlGroup").css("transition", "200ms linear");
                    $node.find(".body,.controlGroup").css("-o-transition", "200ms linear");
                    $node.find(".body,.controlGroup").css("-ms-transition", "200ms linear");
                    $node.find(".body,.controlGroup").css("-moz-transition", "200ms linear");
                    $node.find(".body,.controlGroup").css("-webkit-transition", "200ms linear");
                    $node.find(".body").css("transform", "translate3d(0, 0, 0)");
                    $node.find(".body").css("-o-transform", "translate3d(0, 0, 0)");
                    $node.find(".body").css("-ms-transform", "translate3d(0, 0, 0)");
                    $node.find(".body").css("-moz-transform", "translate3d(0, 0, 0)");
                    $node.find(".body").css("-webkit-transform", "translate3d(0, 0, 0)");
                    $node.find(".controlGroup").css("transform", "translate3d(748px, 0, 0)");
                    $node.find(".controlGroup").css("-o-transform", "translate3d(748px, 0, 0)");
                    $node.find(".controlGroup").css("-ms-transform", "translate3d(748px, 0, 0)");
                    $node.find(".controlGroup").css("-moz-transform", "translate3d(748px, 0, 0)");
                    $node.find(".controlGroup").css("-webkit-transform", "translate3d(748px, 0, 0)");
                }
                if($node.hasClass("inControl") && api.jsEvent.touch.touchSX < 30){
                    $node.addClass("inControl");
                    $other.removeClass("inControl");
                    $node.find(".body").css("transform", "translate3d(-200px, 0, 0)");
                    $node.find(".body").css("-o-transform", "translate3d(-200px, 0, 0)");
                    $node.find(".body").css("-ms-transform", "translate3d(-200px, 0, 0)");
                    $node.find(".body").css("-moz-transform", "translate3d(-200px, 0, 0)");
                    $node.find(".body").css("-webkit-transform", "translate3d(-200px, 0, 0)");
                    $node.find(".body,.controlGroup").css("transition", "200ms linear");
                    $node.find(".body,.controlGroup").css("-o-transition", "200ms linear");
                    $node.find(".body,.controlGroup").css("-ms-transition", "200ms linear");
                    $node.find(".body,.controlGroup").css("-moz-transition", "200ms linear");
                    $node.find(".body,.controlGroup").css("-webkit-transition", "200ms linear");
                    $node.find(".controlGroup").css("transform", "translate3d(550px, 0, 0)");
                    $node.find(".controlGroup").css("-o-transform", "translate3d(550px, 0, 0)");
                    $node.find(".controlGroup").css("-ms-transform", "translate3d(550px, 0, 0)");
                    $node.find(".controlGroup").css("-moz-transform", "translate3d(550px, 0, 0)");
                    $node.find(".controlGroup").css("-webkit-transform", "translate3d(550px, 0, 0)");
                }
                if(!$node.hasClass("inControl") && api.jsEvent.touch.touchSX <= -80){
                    $node.addClass("inControl");
                    $other.removeClass("inControl");
                    $node.find(".body").css("transform", "translate3d(-200px, 0, 0)");
                    $node.find(".body").css("-o-transform", "translate3d(-200px, 0, 0)");
                    $node.find(".body").css("-ms-transform", "translate3d(-200px, 0, 0)");
                    $node.find(".body").css("-moz-transform", "translate3d(-200px, 0, 0)");
                    $node.find(".body").css("-webkit-transform", "translate3d(-200px, 0, 0)");
                    $node.find(".body,.controlGroup").css("transition", "200ms linear");
                    $node.find(".body,.controlGroup").css("-o-transition", "200ms linear");
                    $node.find(".body,.controlGroup").css("-ms-transition", "200ms linear");
                    $node.find(".body,.controlGroup").css("-moz-transition", "200ms linear");
                    $node.find(".body,.controlGroup").css("-webkit-transition", "200ms linear");
                    $node.find(".controlGroup").css("transform", "translate3d(550px, 0, 0)");
                    $node.find(".controlGroup").css("-o-transform", "translate3d(550px, 0, 0)");
                    $node.find(".controlGroup").css("-ms-transform", "translate3d(550px, 0, 0)");
                    $node.find(".controlGroup").css("-moz-transform", "translate3d(550px, 0, 0)");
                    $node.find(".controlGroup").css("-webkit-transform", "translate3d(550px, 0, 0)");
                }
                if(!$node.hasClass("inControl") && api.jsEvent.touch.touchSX > -80){
                    $node.removeClass("inControl");
                    $other.removeClass("inControl");
                    $node.find(".body").css("transform", "translate3d(0, 0, 0)");
                    $node.find(".body").css("-o-transform", "translate3d(0, 0, 0)");
                    $node.find(".body").css("-ms-transform", "translate3d(0, 0, 0)");
                    $node.find(".body").css("-moz-transform", "translate3d(0, 0, 0)");
                    $node.find(".body").css("-webkit-transform", "translate3d(0, 0, 0)");
                    $node.find(".body,.controlGroup").css("transition", "200ms linear");
                    $node.find(".body,.controlGroup").css("-o-transition", "200ms linear");
                    $node.find(".body,.controlGroup").css("-ms-transition", "200ms linear");
                    $node.find(".body,.controlGroup").css("-moz-transition", "200ms linear");
                    $node.find(".body,.controlGroup").css("-webkit-transition", "200ms linear");
                    $node.find(".controlGroup").css("transform", "translate3d(748px, 0, 0)");
                    $node.find(".controlGroup").css("-o-transform", "translate3d(748px, 0, 0)");
                    $node.find(".controlGroup").css("-ms-transform", "translate3d(748px, 0, 0)");
                    $node.find(".controlGroup").css("-moz-transform", "translate3d(748px, 0, 0)");
                    $node.find(".controlGroup").css("-webkit-transform", "translate3d(748px, 0, 0)");
                }
            }
        },
        ".component-shoppingCart-ordersDetails    .btn_plus                     touchend": function(node){
            var that = this;
            var $node = $(node);
            var message = that.modules.message;
            var orders = that.renderData.global.response.orders;
            var type = $node.parents("[goodsId]").attr("type");
            var supplierId = $node.parents("[goodsId]").attr("supplierId");
            var itemId = $node.parents("[itemId]").attr("itemId");
            var quantity = $node.parent().find("input").val() * 1;
            var stock = orders.typeObj[type][supplierId].itemObj[itemId].attr("stock");
            var minQuantity = orders.typeObj[type][supplierId].itemObj[itemId].attr("minQuantity");
            var maxQuantity = orders.typeObj[type][supplierId].itemObj[itemId].attr("maxQuantity");
            if((type||type===0) && (supplierId||supplierId===0) && (itemId||itemId===0)){
                if($node.hasClass("btn_plus")){
                    quantity = quantity*1 + 1;
                    quantity = quantity*1 > 0? quantity*1: 1;
                }
                if($node.hasClass("btn_minus")){
                    quantity = quantity*1 - 1;
                    quantity = quantity*1 > 0? quantity*1: 1;
                }
                if(stock<=0 || (quantity <= stock && minQuantity && stock < minQuantity)){
                    message.refresh({
                        cancelBtn: false,
                        confirmBtn: false,
                        content: "当前商品库存不足！"
                    });
                }
                else if(quantity>stock){
                    message.refresh({
                        cancelBtn: false,
                        confirmBtn: false,
                        content:"当前数量已是库存可用量！"
                    });
                }
                else if(maxQuantity && quantity>maxQuantity){
                    message.refresh({
                        cancelBtn: false,
                        confirmBtn: false,
                        content: "当前数量已是最大购买量！"
                    })
                }
                else if(minQuantity && quantity<minQuantity){
                    message.refresh({
                        cancelBtn: false,
                        confirmBtn: false,
                        content: "当前数量已是最小购买量！"
                    })
                }
                quantity = (maxQuantity||maxQuantity===0) && quantity > maxQuantity? maxQuantity: quantity;
                quantity = (minQuantity||minQuantity===0) && quantity < minQuantity? minQuantity: quantity;
                quantity = quantity > stock? stock: quantity;
                quantity = quantity > 0? quantity: 1;
                $node.val(quantity*1);
                orders.typeObj[type][supplierId].itemObj[itemId].attr("quantity", quantity*1);
            }
        },
        ".component-shoppingCart-ordersDetails    .btn_minus                    touchend": function(node){
            var that = this;
            var $node = $(node);
            var message = that.modules.message;
            var orders = that.renderData.global.response.orders;
            var type = $node.parents("[goodsId]").attr("type");
            var supplierId = $node.parents("[goodsId]").attr("supplierId");
            var itemId = $node.parents("[itemId]").attr("itemId");
            var quantity = $node.parent().find("input").val() * 1;
            var stock = orders.typeObj[type][supplierId].itemObj[itemId].attr("stock");
            var minQuantity = orders.typeObj[type][supplierId].itemObj[itemId].attr("minQuantity");
            var maxQuantity = orders.typeObj[type][supplierId].itemObj[itemId].attr("maxQuantity");
            if((type||type===0) && (supplierId||supplierId===0) && (itemId||itemId===0)){
                if($node.hasClass("btn_plus")){
                    quantity = quantity*1 + 1;
                    quantity = quantity*1 > 0? quantity*1: 1;
                }
                if($node.hasClass("btn_minus")){
                    quantity = quantity*1 - 1;
                    quantity = quantity*1 > 0? quantity*1: 1;
                }
                if(stock<=0 || (quantity <= stock && minQuantity && stock < minQuantity)){
                    message.refresh({
                        cancelBtn: false,
                        confirmBtn: false,
                        content: "当前商品库存不足！"
                    });
                }
                else if(quantity>stock){
                    message.refresh({
                        cancelBtn: false,
                        confirmBtn: false,
                        content:"当前数量已是库存可用量！"
                    });
                }
                else if(maxQuantity && quantity>maxQuantity){
                    message.refresh({
                        cancelBtn: false,
                        confirmBtn: false,
                        content: "当前数量已是最大购买量！"
                    })
                }
                else if(minQuantity && quantity<minQuantity){
                    message.refresh({
                        cancelBtn: false,
                        confirmBtn: false,
                        content: "当前数量已是最小购买量！"
                    })
                }
                quantity = (maxQuantity||maxQuantity===0) && quantity > maxQuantity? maxQuantity: quantity;
                quantity = (minQuantity||minQuantity===0) && quantity < minQuantity? minQuantity: quantity;
                quantity = quantity > stock? stock: quantity;
                quantity = quantity > 0? quantity: 1;
                $node.val(quantity*1);
                orders.typeObj[type][supplierId].itemObj[itemId].attr("quantity", quantity*1);
            }
        },
        ".component-shoppingCart-ordersDetails    .btn_input                    input":    function(node){
            var that = this;
            var $node = $(node);
            var message = that.modules.message;
            var orders = that.renderData.global.response.orders;
            var type = $node.parents("[goodsId]").attr("type");
            var supplierId = $node.parents("[goodsId]").attr("supplierId");
            var itemId = $node.parents("[itemId]").attr("itemId");
            var stock = orders.typeObj[type][supplierId].itemObj[itemId].attr("stock");
            var minQuantity = orders.typeObj[type][supplierId].itemObj[itemId].attr("minQuantity");
            var maxQuantity = orders.typeObj[type][supplierId].itemObj[itemId].attr("maxQuantity");
            if((type||type===0) && (supplierId||supplierId===0) && (itemId||itemId===0)){
                var temp = $node.val()? $node.val().trim(): 0;
                var tQuantity = (/\D/).test(temp)? temp.replace(/\D/g,""): temp;
                clearTimeout(that.config.quantityTimer);
                that.config.quantityTimer = setTimeout(function() {
                    var quantity = tQuantity*1 > 0? tQuantity*1: 1;
                    if(stock<=0 || (quantity <= stock && minQuantity && stock < minQuantity)){
                        message.refresh({
                            cancelBtn: false,
                            confirmBtn: false,
                            content: "当前商品库存不足！",
                            timeOutFun: function(){
                                quantity = (maxQuantity||maxQuantity===0) && quantity > maxQuantity? maxQuantity: quantity;
                                quantity = (minQuantity||minQuantity===0) && quantity < minQuantity? minQuantity: quantity;
                                quantity = quantity > stock? stock: quantity;
                                quantity = quantity*1 > 0? quantity*1: 1;
                                $node.val(quantity*1);
                                orders.typeObj[type][supplierId].itemObj[itemId].attr("quantity", quantity*1);
                            }
                        });
                    }
                    else if(quantity>stock){
                        message.refresh({
                            cancelBtn: false,
                            confirmBtn: false,
                            content:"当前数量大于库存可用量！",
                            timeOutFun: function(){
                                quantity = (maxQuantity||maxQuantity===0) && quantity > maxQuantity? maxQuantity: quantity;
                                quantity = (minQuantity||minQuantity===0) && quantity < minQuantity? minQuantity: quantity;
                                quantity = quantity > stock? stock: quantity;
                                quantity = quantity*1 > 0? quantity*1: 1;
                                $node.val(quantity*1);
                                orders.typeObj[type][supplierId].itemObj[itemId].attr("quantity", quantity*1);
                            }
                        });
                    }
                    else if(maxQuantity && quantity>maxQuantity){
                        message.refresh({
                            cancelBtn: false,
                            confirmBtn: false,
                            content: "当前数量已大于最大购买量！",
                            timeOutFun: function(){
                                quantity = (maxQuantity||maxQuantity===0) && quantity > maxQuantity? maxQuantity: quantity;
                                quantity = (minQuantity||minQuantity===0) && quantity < minQuantity? minQuantity: quantity;
                                quantity = quantity > stock? stock: quantity;
                                quantity = quantity*1 > 0? quantity*1: 1;
                                $node.val(quantity*1);
                                orders.typeObj[type][supplierId].itemObj[itemId].attr("quantity", quantity*1);
                            }
                        })
                    }
                    else if(minQuantity && quantity<minQuantity){
                        message.refresh({
                            cancelBtn: false,
                            confirmBtn: false,
                            content: "当前数量已低于最小购买量！",
                            timeOutFun: function(){
                                quantity = (maxQuantity||maxQuantity===0) && quantity > maxQuantity? maxQuantity: quantity;
                                quantity = (minQuantity||minQuantity===0) && quantity < minQuantity? minQuantity: quantity;
                                quantity = quantity > stock? stock: quantity;
                                quantity = quantity*1 > 0? quantity*1: 1;
                                $node.val(quantity*1);
                                orders.typeObj[type][supplierId].itemObj[itemId].attr("quantity", quantity*1);
                            }
                        })
                    }
                }, 650);
            }
        },
        ".component-shoppingCart-ordersDetails    .btn_input                    blur":     function(node){
            var that = this;
            var $node = $(node);
            var orders = that.renderData.global.response.orders;
            var type = $node.parents("[goodsId]").attr("type");
            var supplierId = $node.parents("[goodsId]").attr("supplierId");
            var itemId = $node.parents("[itemId]").attr("itemId");
            var stock = orders.typeObj[type][supplierId].itemObj[itemId].attr("stock");
            var minQuantity = orders.typeObj[type][supplierId].itemObj[itemId].attr("minQuantity");
            var maxQuantity = orders.typeObj[type][supplierId].itemObj[itemId].attr("maxQuantity");
            if((type||type===0) && (supplierId||supplierId===0) && (itemId||itemId===0)){
                var quantity = $node.val()? $node.val().trim(): 0;
                quantity = (maxQuantity||maxQuantity===0) && quantity > maxQuantity? maxQuantity: quantity;
                quantity = (minQuantity||minQuantity===0) && quantity < minQuantity? minQuantity: quantity;
                quantity = quantity > stock? stock: quantity;
                quantity = quantity > 0? quantity: 1;
                $node.val(quantity*1);
                orders.typeObj[type][supplierId].itemObj[itemId].attr("quantity", quantity*1);
            }
        },
        ".component-shoppingCart-ordersDetails    .commodity-select             touchend": function(node){
            var that = this;
            var $node = $(node);
            var optionsOpen = that.renderData.global.config.attr("optionsOpen");
            var orders = that.renderData.global.response.orders;
            var type = $node.parents("[goodsId]").attr("type");
            var supplierId = $node.parents("[goodsId]").attr("supplierId");
            var itemId = $node.parents("[itemId]").attr("itemId");
            if(type && supplierId && itemId){
                var bool = orders.typeObj[type][supplierId].itemObj[itemId].attr("selected");
                var status = orders.typeObj[type][supplierId].itemObj[itemId].attr("status");
                var stock = orders.typeObj[type][supplierId].itemObj[itemId].attr("stock");
                var minQuantity = orders.typeObj[type][supplierId].itemObj[itemId].attr("minQuantity");
                var setBool = bool? !bool: (status !== 0 && stock > 0 && stock >= minQuantity || optionsOpen)? !bool: false;
                orders.typeObj[type][supplierId].itemObj[itemId].attr("selected", setBool);
            }
        },
        ".component-shoppingCart-ordersDetails    .control_delete               touchend": function(node){
            var that = this;
            var $node = $(node);
            var footer = that.modules.footer;
            var header = that.modules.header;
            var message = that.modules.message;
            var response = that.renderData.global.response;
            var shopCartId = $node.attr('ids');
            var orders = response.orders;
            message.refresh({
                content: "是否删除该商品",
                DOMClick: false,
                cancelBtn: true,
                confirmBtn: true,
                cancelFun: function(){},
                confirmFun: function(){
                    that.sendRequest("ORDER_SHOPPINGCART_DELETE", {
                        ids: shopCartId
                    }).done(function(response){
                        if(response && response.success){
                            $.each(orders.attr().typeObj, function(n1, o1){
                                $.each(o1, function(n2, o2){
                                    $.each(o2.itemObj, function(n3, o3){
                                        if(""+o3.ids === shopCartId){
                                            orders.typeObj[n1][n2].itemObj.removeAttr(n3)
                                        }
                                    });
                                });
                            });
                            that.sendRequest("ORDER_SHOPPINGCART_COUNT")
                                .done(function(response){
                                    if(response && response.success){
                                        footer.renderData.global.response.attr("count", response.obj);
                                        header.renderData.global.response.attr("shopCartCount", response.obj);
                                        if(!response.obj){
                                            header.renderData.global.config.attr("icon_search", true);
                                            header.renderData.global.config.attr("icon_shopCartEdit", false);
                                            header.renderData.global.config.attr("icon_shopCartSave", false);
                                        }
                                    }
                                })
                        }
                    });
                    $node.parents(".goodsList").find(".body").css("transform", "translate3d(0, 0, 0)");
                    $node.parents(".goodsList").find(".body").css("-o-transform", "translate3d(0, 0, 0)");
                    $node.parents(".goodsList").find(".body").css("-ms-transform", "translate3d(0, 0, 0)");
                    $node.parents(".goodsList").find(".body").css("-moz-transform", "translate3d(0, 0, 0)");
                    $node.parents(".goodsList").find(".body").css("-webkit-transform", "translate3d(0, 0, 0)");
                    $node.parents(".goodsList").find(".controlGroup").css("transform", "translate3d(748px, 0, 0)");
                    $node.parents(".goodsList").find(".controlGroup").css("-o-transform", "translate3d(748px, 0, 0)");
                    $node.parents(".goodsList").find(".controlGroup").css("-ms-transform", "translate3d(748px, 0, 0)");
                    $node.parents(".goodsList").find(".controlGroup").css("-moz-transform", "translate3d(748px, 0, 0)");
                    $node.parents(".goodsList").find(".controlGroup").css("-webkit-transform", "translate3d(748px, 0, 0)");
                }
            });
        },
        ".component-shoppingCart-optionsGroup     .control_selectAll            touchend": function(node) {
            var that = this;
            var orders = that.renderData.global.response.orders;
            var optionsOpen = that.renderData.global.config.attr("optionsOpen");
            var bool = !orders.attr("allSelected");
            var dOrder = orders.attr();
            $.each(dOrder.typeObj, function(n1, o1){
                $.each(o1, function(n2, o2){
                    $.each(o2.itemObj, function(n3, o3){
                        if(typeof o3.selected === "boolean"){
                            if(o3.status !== 0 && o3.stock > 0 && o3.stock >= o3.minQuantity || optionsOpen){
                                orders.typeObj[n1][n2].itemObj[n3].attr("selected", bool);
                            }else{
                                orders.typeObj[n1][n2].itemObj[n3].attr("selected", false);
                            }
                        }
                    });
                });
            });
        },
        ".component-shoppingCart-optionsGroup     .btn_deleteMore:not(.lose)    touchend": function(node) {
            var that = this;
            var $node = $(node);
            var footer = that.modules.footer;
            var header = that.modules.header;
            var message = that.modules.message;
            var orders = that.renderData.global.response.orders;
            var dOrder = orders.attr();
            var arr = [];
            $.each(dOrder.typeObj, function(n1, o1){
                $.each(o1, function(n2, o2){
                    $.each(o2.itemObj, function(n3, o3){
                        if(o3.selected === true){
                            arr.push(o3.ids);
                        }
                    });
                });
            });

            var shopCartId = arr.join(",");

            if(shopCartId){
                message.refresh({
                    content: "是否删除选中商品",
                    DOMClick: false,
                    cancelBtn: true,
                    confirmBtn: true,
                    cancelFun: function(){},
                    confirmFun: function(){
                        that.sendRequest("ORDER_SHOPPINGCART_DELETE", {
                            ids: shopCartId
                        }).done(function(response){
                            if(response && response.success){
                                $.each(orders.attr().typeObj, function(n1, o1){
                                    $.each(o1, function(n2, o2){
                                        $.each(o2.itemObj, function(n3, o3){
                                            if($.inArray((o3.ids), arr) !== -1){
                                                orders.typeObj[n1][n2].itemObj.removeAttr(n3)
                                            }
                                        });
                                    });
                                });
                                that.sendRequest("ORDER_SHOPPINGCART_COUNT")
                                    .done(function(response){
                                        if(response && response.success){
                                            footer.renderData.global.response.attr("count", response.obj);
                                            header.renderData.global.response.attr("shopCartCount", response.obj);
                                            if(!response.obj){
                                                header.renderData.global.config.attr("icon_search", true);
                                                header.renderData.global.config.attr("icon_shopCartEdit", false);
                                                header.renderData.global.config.attr("icon_shopCartSave", false);
                                            }
                                        }
                                    })
                            }
                            $node.parents(".goodsList").find(".body").css("transform", "translate3d(0, 0, 0)");
                            $node.parents(".goodsList").find(".body").css("-o-transform", "translate3d(0, 0, 0)");
                            $node.parents(".goodsList").find(".body").css("-ms-transform", "translate3d(0, 0, 0)");
                            $node.parents(".goodsList").find(".body").css("-moz-transform", "translate3d(0, 0, 0)");
                            $node.parents(".goodsList").find(".body").css("-webkit-transform", "translate3d(0, 0, 0)");
                            $node.parents(".goodsList").find(".controlGroup").css("transform", "translate3d(748px, 0, 0)");
                            $node.parents(".goodsList").find(".controlGroup").css("-o-transform", "translate3d(748px, 0, 0)");
                            $node.parents(".goodsList").find(".controlGroup").css("-ms-transform", "translate3d(748px, 0, 0)");
                            $node.parents(".goodsList").find(".controlGroup").css("-moz-transform", "translate3d(748px, 0, 0)");
                            $node.parents(".goodsList").find(".controlGroup").css("-webkit-transform", "translate3d(748px, 0, 0)");

                        });
                    }
                });
            }
            else{
                message.refresh({ cancelBtn: false, confirmBtn: false, content: "请选择所要删除的商品！" });
            }
        },
        ".component-shoppingCart-optionsGroup     .btn_commitOrder:not(.lose)   click": function(){
            var that = this;
            var orders = that.renderData.global.response.orders.attr();
            var pathUrl = that.config.global.pathUrl;
            var ordersInfo = {};
            var orderCount = 0;
            var message = that.modules.message;
            $.each(orders.typeObj, function(n1, o1){
                $.each(o1, function(n2, o2){
                    var bool = false;
                    var supplierWeight = 0;
                    var supplierPrice = 0;
                    var supplierVipPrice = 0;
                    var supplierRealPrice = 0;
                    var supplierRealVipPrice = 0;
                    $.each(o2.itemObj, function(n3, o3){
                        if(o3.status!==0 && o3.stock > 0 && o3.stock >= o3.minQuantity && o3.selected && o3.quantity>0){
                            bool = true;
                            supplierWeight += o3.weight * o3.quantity;
                            supplierPrice += o3.price * o3.quantity;
                            supplierVipPrice += o3.vipPrice * o3.quantity;
                            supplierRealPrice += o3.realPrice * o3.quantity;
                            supplierRealVipPrice += o3.realVipPrice * o3.quantity;
                            ordersInfo.typeObj = ordersInfo.typeObj || {};
                            ordersInfo.typeObj[n1] = ordersInfo.typeObj[n1] || {};
                            ordersInfo.typeObj[n1][n2] = ordersInfo.typeObj[n1][n2] || {};
                            ordersInfo.typeObj[n1][n2].taxFee = 0;
                            ordersInfo.typeObj[n1][n2].postFee = 0;
                            ordersInfo.typeObj[n1][n2].exciseTaxFee = 0;
                            ordersInfo.typeObj[n1][n2].incrementTaxFee = 0;
                            ordersInfo.typeObj[n1][n2].type = o2.type;
                            ordersInfo.typeObj[n1][n2].typeName = o2.typeName;
                            ordersInfo.typeObj[n1][n2].supplierId = o2.supplierId;
                            ordersInfo.typeObj[n1][n2].supplierName = o2.supplierName;
                            ordersInfo.typeObj[n1][n2].supplierWeight = supplierWeight*1;
                            ordersInfo.typeObj[n1][n2].supplierPrice = supplierPrice*1;
                            ordersInfo.typeObj[n1][n2].supplierVipPrice = supplierVipPrice*1;
                            ordersInfo.typeObj[n1][n2].supplierRealPrice = supplierRealPrice*1;
                            ordersInfo.typeObj[n1][n2].supplierRealVipPrice = supplierRealVipPrice*1;
                            ordersInfo.typeObj[n1][n2].itemObj = ordersInfo.typeObj[n1][n2].itemObj||{};
                            ordersInfo.typeObj[n1][n2].itemObj[n3] = {};
                            ordersInfo.typeObj[n1][n2].itemObj[n3].ids = o3.ids;
                            ordersInfo.typeObj[n1][n2].itemObj[n3].type = o2.type;
                            ordersInfo.typeObj[n1][n2].itemObj[n3].href = o3.href;
                            ordersInfo.typeObj[n1][n2].itemObj[n3].status = o3.status;
                            ordersInfo.typeObj[n1][n2].itemObj[n3].itemId = o3.itemId;
                            ordersInfo.typeObj[n1][n2].itemObj[n3].freePost = o3.freePost;
                            ordersInfo.typeObj[n1][n2].itemObj[n3].freeTax = o3.freeTax;
                            ordersInfo.typeObj[n1][n2].itemObj[n3].goodsId = o3.goodsId;
                            ordersInfo.typeObj[n1][n2].itemObj[n3].firstCategory = o3.firstCategory;
                            ordersInfo.typeObj[n1][n2].itemObj[n3].secondCategory = o3.secondCategory;
                            ordersInfo.typeObj[n1][n2].itemObj[n3].thirdCategory = o3.thirdCategory;
                            ordersInfo.typeObj[n1][n2].itemObj[n3].itemImg = o3.itemImg;
                            ordersInfo.typeObj[n1][n2].itemObj[n3].picPath = o3.picPath;
                            ordersInfo.typeObj[n1][n2].itemObj[n3].goodsName = o3.itemName;
                            ordersInfo.typeObj[n1][n2].itemObj[n3].quantity = o3.quantity;
                            ordersInfo.typeObj[n1][n2].itemObj[n3].exciseTax = o3.exciseTax;
                            ordersInfo.typeObj[n1][n2].itemObj[n3].incrementTax = o3.incrementTax;
                            ordersInfo.typeObj[n1][n2].itemObj[n3].priceList = o3.priceList;
                            ordersInfo.typeObj[n1][n2].itemObj[n3].tagList = o3.tagList;
                            ordersInfo.typeObj[n1][n2].itemObj[n3].tagFunId = o3.tagFunId;
                            ordersInfo.typeObj[n1][n2].itemObj[n3].preSaleName = o3.preSaleName;
                            ordersInfo.typeObj[n1][n2].itemObj[n3].preSaleDesc = o3.preSaleDesc;
                            ordersInfo.typeObj[n1][n2].itemObj[n3].sku = o3.itemSpecs.sku;
                            ordersInfo.typeObj[n1][n2].itemObj[n3].info = o3.itemSpecs.info;
                            ordersInfo.typeObj[n1][n2].itemObj[n3].stock = o3.itemSpecs.stock>0? o3.itemSpecs.stock: 0;
                            ordersInfo.typeObj[n1][n2].itemObj[n3].weight = o3.itemSpecs.weight;
                            ordersInfo.typeObj[n1][n2].itemObj[n3].itemCode = o3.itemSpecs.itemCode;
                            ordersInfo.typeObj[n1][n2].itemObj[n3].price = o3.price;
                            ordersInfo.typeObj[n1][n2].itemObj[n3].vipPrice = o3.vipPrice;
                            ordersInfo.typeObj[n1][n2].itemObj[n3].realPrice = o3.realPrice;
                            ordersInfo.typeObj[n1][n2].itemObj[n3].realVipPrice = o3.realVipPrice;
                            ordersInfo.typeObj[n1][n2].itemObj[n3].minPrice = o3.itemSpecs.minPrice;
                            ordersInfo.typeObj[n1][n2].itemObj[n3].maxPrice = o3.itemSpecs.maxPrice;
                            ordersInfo.typeObj[n1][n2].itemObj[n3].vipMinPrice = o3.itemSpecs.vipMinPrice;
                            ordersInfo.typeObj[n1][n2].itemObj[n3].vipMaxPrice = o3.itemSpecs.vipMaxPrice;
                            ordersInfo.typeObj[n1][n2].itemObj[n3].realMinPrice = o3.itemSpecs.realMinPrice;
                            ordersInfo.typeObj[n1][n2].itemObj[n3].realMaxPrice = o3.itemSpecs.realMaxPrice;
                            ordersInfo.typeObj[n1][n2].itemObj[n3].realVipMinPrice = o3.itemSpecs.realVipMinPrice;
                            ordersInfo.typeObj[n1][n2].itemObj[n3].realVipMaxPrice = o3.itemSpecs.realVipMaxPrice;
                            ordersInfo.typeObj[n1][n2].itemObj[n3].carton = o3.itemSpecs.carton;
                            orderCount++;
                        }
                    });
                    if(bool){ orderCount++ }
                });
            });
            ordersInfo.orderCount = orderCount;
            if(!$.isEmptyObject(ordersInfo)){
                var crossCount = 0;
                var normalCount = 0;
                var crossPass = true;
                var normalPass = true;
                var isContinue = true;
                $.each(ordersInfo.typeObj, function(k1,o1){
                    $.each(o1,function(k2,o2){
                        var crossPrice = 0;
                        var normalPrice = 0;
                        var supplierId = o2.supplierId;
                        var supplierName = o2.supplierName;
                        $.each(o2.itemObj,function(k3,o3){
                            if(o3.type === 0){
                                crossPrice += o3.realPrice * o3.quantity;
                                crossCount += o3.quantity;
                            }else if(o3.type === 2){
                                normalPrice += o3.realPrice * o3.quantity;
                                normalCount += o3.quantity;
                            }
                        });
                        if(k1=== '0' && crossPrice > crossOrderMaxPrice && crossCount > 1){
                            isContinue = crossPass = false;
                            message.refresh({
                                cancelBtn: false,
                                confirmBtn: false,
                                content: supplierName + "商品单笔订单价格超过" + crossOrderMaxPrice + "元，请调整！"
                            });
                            return false;
                        }
                        if (k1 === '2' && supplierId*1 === 6 && normalPrice < normalOrderMinPrice) {
                            isContinue = normalPass = false;
                            message.refresh({
                                cancelBtn: false,
                                confirmBtn: false,
                                content: supplierName + "商品订单未满" + normalOrderMinPrice + "元，请调整！"
                            });
                            return false;
                        }
                        if (!isContinue) {
                            return false;
                        }
                    });
                    if (!isContinue) {
                        return false;
                    }
                });
                if (isContinue && (crossPass || normalPass)) {
                    window.localStorage.setItem("showDiscount", "{}");
                    window.localStorage.setItem("ordersInfo", JSON.stringify(ordersInfo));
                    window.location.href = encodeURI("/orderConfirm.html?jumpUrl=" + pathUrl);
                }
            }
        },
        "{document} .component-header-right       .icon_shopCartEdit            touchend": function (node) {
            var that = this;
            var $element = that.element;
            var $other = $element.find(".goodsList");
            var orders = that.renderData.global.response.orders;
            var header = that.modules.header;
            var dOrder = orders.attr();
            $.each(dOrder.typeObj, function(n1, o1){
                $.each(o1, function(n2, o2){
                    $.each(o2.itemObj, function(n3, o3){
                        orders.typeObj[n1][n2].itemObj[n3].attr("selected", false);
                    });
                });
            });
            that.renderData.global.config.attr("optionsOpen", true);
            header.renderData.global.config.attr("icon_shopCartSave", true);
            header.renderData.global.config.attr("icon_shopCartEdit", false);
            $other.removeClass("inControl");
            $other.find(".body").css("transform", "translate3d(0, 0, 0)");
            $other.find(".body").css("-o-transform", "translate3d(0, 0, 0)");
            $other.find(".body").css("-ms-transform", "translate3d(0, 0, 0)");
            $other.find(".body").css("-moz-transform", "translate3d(0, 0, 0)");
            $other.find(".body").css("-webkit-transform", "translate3d(0, 0, 0)");
            $other.find(".controlGroup").css("transform", "translate3d(748px, 0, 0)");
            $other.find(".controlGroup").css("-o-transform", "translate3d(748px, 0, 0)");
            $other.find(".controlGroup").css("-ms-transform", "translate3d(748px, 0, 0)");
            $other.find(".controlGroup").css("-moz-transform", "translate3d(748px, 0, 0)");
            $other.find(".controlGroup").css("-webkit-transform", "translate3d(748px, 0, 0)");
        },
        "{document} .component-header-right       .icon_shopCartSave            touchend": function (node) {
            var that = this;
            var $element = that.element;
            var $other = $element.find(".goodsList");
            var orders = that.renderData.global.response.orders;
            var header = that.modules.header;
            var dOrder = orders.attr();
            $.each(dOrder.typeObj, function(n1, o1){
                $.each(o1, function(n2, o2){
                    $.each(o2.itemObj, function(n3, o3){
                        orders.typeObj[n1][n2].itemObj[n3].attr("selected", false);
                    });
                });
            });
            that.renderData.global.config.attr("optionsOpen", false);
            header.renderData.global.config.attr("icon_shopCartSave", false);
            header.renderData.global.config.attr("icon_shopCartEdit", true);
            $other.removeClass("inControl");
            $other.find(".body").css("transform", "translate3d(0, 0, 0)");
            $other.find(".body").css("-o-transform", "translate3d(0, 0, 0)");
            $other.find(".body").css("-ms-transform", "translate3d(0, 0, 0)");
            $other.find(".body").css("-moz-transform", "translate3d(0, 0, 0)");
            $other.find(".body").css("-webkit-transform", "translate3d(0, 0, 0)");
            $other.find(".controlGroup").css("transform", "translate3d(748px, 0, 0)");
            $other.find(".controlGroup").css("-o-transform", "translate3d(748px, 0, 0)");
            $other.find(".controlGroup").css("-ms-transform", "translate3d(748px, 0, 0)");
            $other.find(".controlGroup").css("-moz-transform", "translate3d(748px, 0, 0)");
            $other.find(".controlGroup").css("-webkit-transform", "translate3d(748px, 0, 0)");
        }

    });

});