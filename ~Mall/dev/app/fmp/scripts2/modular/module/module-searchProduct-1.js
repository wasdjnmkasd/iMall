
/** 页面模块
 *    @detail:    searchProduct模块_1
 *    @return:    can.Control
 *    @author:    林鹏腾
 *    @date:      2017.8.16
 */
define(["config.page.render"], function(Render) {

    'use strict';

    var api = window.capi.get();
    var shopId = api.jsData.userInfo.shopId;
    var gradeId = api.jsData.userInfo.gradeId;

    return Render.extend({
        //子类扩展
        tags: {
            global: "<component-searchproduct-1></component-searchproduct-1>"
        },
        region: {
            global: {
                cfgDynamic: false,
                reqDynamic: false,
                resDynamic: true,
                beforeFunc: function(that, data) {
                    that.config.global.currentPage = (data.response.global.pagination||{}).currentPage;
                    that.config.global.totalPages = (data.response.global.pagination||{}).totalPages;
                },
                afterFunc: function(that, data){
                    that.config.global.currentPage === that.config.global.totalPages?
                        $(that.element).find(".isLoading span").text("没有更多数据了..."):
                        $(that.element).find(".isLoading span").text("请下拉加载...");
                }
            }
        },
        config: {
            global: {}
        },
        request: {
            GOODS_BASE_QUERY: {
                'upShelves': api.jsUtil.url.getParam('upShelves')? 1: null,
                "numPerPage": 10,
                "currentPage": 1,
                'welfare': true,
                'gradeId': shopId || gradeId,
                'fx': 1
            }
        },
        response: {
            global: {}
        },
        sendArr: ["GOODS_BASE_QUERY"],
        reload: false,


        //自定义方法


        //自定义事件
        ".searchProduct-header li touchend": function(node){
            var that = this;
            var $node = $(node);
            var popState = that.config.global.popState;
            if(!$node.hasClass("active") || $node.hasClass("choose_price")){
                if($node.hasClass("choose_general")){
                    popState.sortType = 1;
                    popState.currentPage = 1;
                    that.config.global.sortType = 1;
                    delete that.request.GOODS_BASE_QUERY["sortList[0].sortField"];
                    delete that.request.GOODS_BASE_QUERY["sortList[0].sortRule"];
                }else if($node.hasClass("choose_new")){
                    popState.sortType = 2;
                    popState.currentPage = 1;
                    that.config.global.sortType = 2;
                    that.request.GOODS_BASE_QUERY["sortList[0].sortField"] = "create_time";
                    that.request.GOODS_BASE_QUERY["sortList[0].sortRule"] = "desc";
                }else if($node.hasClass("sortType3")){
                    popState.sortType = 4;
                    popState.currentPage = 1;
                    that.config.global.sortType = 4;
                    that.request.GOODS_BASE_QUERY["sortList[0].sortField"] = "price";
                    that.request.GOODS_BASE_QUERY["sortList[0].sortRule"] = "asc";
                }else{
                    popState.sortType = 3;
                    popState.currentPage = 1;
                    that.config.global.sortType = 3;
                    that.request.GOODS_BASE_QUERY["sortList[0].sortField"] = "price";
                    that.request.GOODS_BASE_QUERY["sortList[0].sortRule"] = "desc";
                }
                that.config.global.currentPage = 1;
                that.request["GOODS_BASE_QUERY"].currentPage = 1;
                that.toRender("GOODS_BASE_QUERY", {currentPage: 1}, ["global"])
                    .done(function(){
                        $("html,body").animate({scrollTop: 0}, 300);
                    });
                that.jsUtil.url.setParam(popState, "cover", {code:"searchProduct"});
            }
        },
        "{window} scroll": function(){
            var that = this;
            var $node = $(document);
            var cfgTotalPages = that.config.global.totalPages;
            var cfgCurrentPage = that.config.global.currentPage;
            var reqCurrentPage = that.request["GOODS_BASE_QUERY"].currentPage;
            var isEnd = cfgCurrentPage === cfgTotalPages;
            var isComm = cfgCurrentPage < reqCurrentPage;
            var isQuery = ($(window).scrollTop() + $(window).height() + 350) > $(document).height();
            !isEnd?
                $node.find(".isLoading span").text("请下拉加载..."):
                $node.find(".isLoading span").text("没有更多数据了...");
            if(isQuery && !isEnd && !isComm){
                that.request["GOODS_BASE_QUERY"].currentPage++;
                that.sendRequest("GOODS_BASE_QUERY", {currentPage: cfgCurrentPage+1})
                    .done(function(response){
                        if(response && response.success){
                            var dataObj = response.obj;
                            $.each(dataObj.goodsList, function(index, good){
                                that.renderData.global.response.goodsList.push(good);
                            });
                            if(dataObj.pagination.currentPage === dataObj.pagination.totalPages){
                                $node.find(".isLoading span").text("没有更多数据了...");
                            }
                            that.config.global.currentPage = dataObj.pagination.currentPage;
                            that.config.global.totalPages = dataObj.pagination.totalPages;
                        }
                    })
            }
        },
        ".component-searchProduct-content .search_addShoppingCart touchend":function(node){
            var that = this;
            var $node = $(node);
            var message = that.modules.message;
            var $parent = $node.parents('.item-content');
            var toUrl = $node.parents('.item-content').attr('toUrl');
            var goodsId = $node.parents('.item-content').attr('goodsId');
            var goodsList = that.renderData.global.response.goodsList;
            var isSingleSpec = $parent.attr('isSingleSpec');
            if (isSingleSpec === 'yes') {
                $.each(goodsList,function(index,obj){
                    if(obj.goodsId == goodsId){
                        var quantity = 1;
                        var goodsFile = obj.goodsFileList && obj.goodsFileList[0] || {};
                        var goodsSpecs = obj.goodsSpecsList && obj.goodsSpecsList[0] || {};
                        var stock = goodsSpecs.stock || 0;
                        var priceList = goodsSpecs.priceList || [];
                        var getNumRegion = function(priceList){
                            var infoObj = {};
                            var infoObj_max = [];
                            var infoObj_min = [];
                            var isExist = false;
                            $.each(priceList, function(name, obj){
                                var min = obj.min*1? obj.min*1: 0;
                                var max = obj.max*1? obj.max*1: Infinity;
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
                                    maxQuantity: Infinity
                                }
                            }
                        };
                        var minQuantity = getNumRegion(priceList).minQuantity;
                        var maxQuantity = getNumRegion(priceList).maxQuantity;
                        if(!that.renderData.global.config.isLogin){
                            message.refresh({
                                title:'温馨提示',
                                content: "您尚未登录，请先登录！",
                                DOMClick: false,
                                cancelBtn: true,
                                confirmBtn: true,
                                cancelFun: function (){},
                                confirmFun: function () {
                                    window.location.href = "/login.html?isBack=1";
                                }
                            });
                            return;
                        }
                        if(quantity < minQuantity){
                            quantity = minQuantity;
                        }
                        if(stock<=0){
                            message.refresh({
                                content: "当前商品库存不足, 无法加入购物车中！",
                                confirmBtn: false
                            });
                            return;
                        }
                        else if(minQuantity>stock){
                            message.refresh({
                                content:"当前数量已达至商品库存量, 无法加入购物车中！",
                                confirmBtn: false
                            });
                            return;
                        }
                        var createFunc = function(quantity){
                            var imgtodrag = $parent.find("img");
                            var imgclone = imgtodrag.clone();
                            var $footer = that.modules.footer.element;
                            var cart = $footer.find("component-footer-1 .icon_shoppingCart");
                            if (imgclone.length) {
                                imgclone.offset({
                                    top: imgtodrag.offset().top,
                                    left: imgtodrag.offset().left
                                }).css({
                                    'opacity': '0.5',
                                    'position': 'absolute',
                                    'height': '150px',
                                    'width': '150px',
                                    'z-index': '99999999'
                                }).appendTo($('body')).animate({
                                    'top': cart.offset().top + 20,
                                    'left': cart.offset().left + 70,
                                    'width': 50,
                                    'height': 50
                                }, 1000, 'linear');
                                imgclone.animate({
                                    'width': 0,
                                    'height': 0
                                }, function () {
                                    $(this).detach();
                                });
                            }
                            that.sendRequest("ORDER_SHOPPINGCART_CREATE", {
                                type: obj.type,
                                itemId: goodsSpecs.itemId,
                                supplierId: obj.supplierId,
                                supplierName: obj.supplierName,
                                goodsName: obj.customGoodsName,
                                goodsImg: goodsFile.path || '',
                                quantity: quantity,
                                platformSource: 7
                            }).done(function(){
                                that.modules.header.sendRequest("ORDER_SHOPPINGCART_COUNT",{platformSource: 7})
                                    .done(function(response){
                                        that.modules.footer.renderData.global.response.attr("count",response.obj);
                                        message.refresh({ content:'添加成功', confirmBtn: false });
                                    });
                            });
                        };
                        that.sendRequest("ORDER_SHOPPINGCART_COUNT_ID", {itemId: obj.goodsSpecsList[0].itemId, platformSource: 7})
                            .done(function(response){
                                if(response && response.success){
                                    var count = response.obj||0;
                                    if(maxQuantity != null && maxQuantity !=0){
                                        if(count>=maxQuantity){
                                            message.refresh({
                                                content: "当前该商品在购物车中的数量已达到最大购买量, 无法继续加入购物车中！",
                                                confirmBtn: false
                                            });
                                        }else if(quantity+count > maxQuantity){
                                            var newQuantity = maxQuantity - count;
                                            message.refresh({
                                                title:'购物车数量上限',
                                                content: "最大量" + maxQuantity + "件; 已添加:" + count + "件, 可添加" + newQuantity +"件! 是否继续？",
                                                DOMClick: false,
                                                cancelBtn: true,
                                                confirmBtn: true,
                                                cancelFun: function () {},
                                                confirmFun: function () { createFunc(newQuantity); }
                                            });
                                        }else{
                                            createFunc(quantity);
                                        }
                                    }else{
                                        createFunc(quantity);
                                    }
                                }
                                else{
                                    message.refresh({
                                        content: "查询购物车内该商品数量失败！",
                                        confirmBtn: false
                                    });
                                }
                            })
                            .fail(function(){
                                message.refresh({
                                    content: "网络信号弱，请刷新重试",
                                    confirmBtn: false
                                });
                            });
                    }
                });
            } else if (toUrl) {
                message.refresh({
                    title:'温馨提示',
                    content: "该商品含有多个规格，正前往商品详情页面中！",
                    DOMClick: false,
                    confirmBtn: false,
                    timeOutFun: function () { window.location.href = toUrl; }
                });
            }
        }

    });

});