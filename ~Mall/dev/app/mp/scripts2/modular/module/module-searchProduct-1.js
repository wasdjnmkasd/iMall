
/** 页面模块
 *    @detail:    searchProduct模块_1
 *    @return:    can.Control
 *    @author:    林鹏腾
 *    @date:      2017.8.16
 */
define(["config.page.render"], function(Render) {

    'use strict';

    var api = window.capi.get();

    var currentPage = parseFloat(api.jsUtil.url.getParam('currentPage') || 1);

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
                    if(currentPage != 1){
                        that.jsUtil.url.delParam(['currentPage'],'cover');
                    }
                    if(currentPage > 1){
                        that.config.global.maxCurrentPage = currentPage+1;
                        that.config.global.minCurrentPage = currentPage-1;
                    }else{
                        that.config.global.maxCurrentPage = 1;
                        that.config.global.minCurrentPage = 1;
                    }
                    that.config.global.totalPages = (data.response.global.pagination||{}).totalPages;
                    $.each(that.response.global.goodsList,function(key,obj){
                        obj.currentPage = currentPage;
                    });
                },
                afterFunc: function(that, data){
                    var cfgTotalPages = data.response.global.pagination.totalPages;
                    var minCurrentPage = that.config.global.minCurrentPage;
                    var maxCurrentPage = that.config.global.maxCurrentPage;
                    var searchMinObj = $.extend(true,{},that.request['GOODS_BASE_QUERY'],{"currentPage": minCurrentPage});
                    var searchMaxObj = $.extend(true,{},that.request['GOODS_BASE_QUERY'],{"currentPage": maxCurrentPage});
                    var responseArr = [];
                    var toTop = parseFloat(localStorage.getItem('toTop'));
                    localStorage.removeItem('toTop');
                    that.config.global.currentPage === that.config.global.totalPages?
                        $(that.element).find(".isLoading span").text("没有更多数据了..."):
                        $(that.element).find(".isLoading span").text("请下拉加载...");
                    if(currentPage > 1){
                        that.config.global.isMinComm = false;
                        var minSend = api.jsModel.send('GOODS_BASE_QUERY',searchMinObj)
                            .done(function(response){
                                if(response && response.success){
                                    var dataObj = response.obj;
                                    $.each(dataObj.goodsList.reverse(), function(index, good){
                                        good.currentPage = minCurrentPage;
                                        that.renderData.global.response.goodsList.unshift(good);
                                    });
                                    that.config.global.minCurrentPage = dataObj.pagination.currentPage;
                                    that.config.global.totalPages = dataObj.pagination.totalPages;
                                    that.config.global.isMinComm = true;
                                }
                            })
                            .fail(function(){
                                that.config.global.isMinComm = true;
                            });
                        responseArr.push(minSend);
                    }
                    if(maxCurrentPage != 1 && maxCurrentPage <=　cfgTotalPages){
                        that.config.global.isMaxComm = false;
                        var maxSend = api.jsModel.send('GOODS_BASE_QUERY',searchMaxObj)
                            .done(function(response){
                                if(response && response.success){
                                    var dataObj = response.obj;
                                    $.each(dataObj.goodsList, function(index, good){
                                        good.currentPage = maxCurrentPage;
                                        that.renderData.global.response.goodsList.push(good);
                                    });
                                    if(dataObj.pagination.currentPage === dataObj.pagination.totalPages){
                                        $(".isLoading span").text("没有更多数据了...");
                                    }
                                    that.config.global.maxCurrentPage = dataObj.pagination.currentPage;
                                    that.config.global.totalPages = dataObj.pagination.totalPages;
                                    that.config.global.isMaxComm = true;
                                }
                            })
                            .fail(function(){
                                that.config.global.isMaxComm = true;
                            });
                        responseArr.push(maxSend);
                    }
                    $.when.apply(null, responseArr)
                        .done(function(){
                            $(window).scrollTop(toTop);
                            toTop = undefined;
                        });
                }
            }
        },
        config: {
            global: {
                isMaxComm: true,
                isMinComm : true
            }
        },
        request: {
            GOODS_BASE_QUERY: {
                'upShelves': api.jsUtil.url.getParam('upShelves')? 1: null,
                "numPerPage": 10,
                "currentPage": currentPage
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
                        that.config.global.maxCurrentPage = 1;
                        that.config.global.minCurrentPage = 1;
                    });
                that.jsUtil.url.setParam(popState, "cover", {code:"searchProduct"});
            }
        },
        "{window} scroll": function(){
            var that = this;
            var $node = $(document);
            var cfgTotalPages = that.config.global.totalPages;
            var cfgMaxCurrentPage = that.config.global.maxCurrentPage;
            var cfgMinCurrentPage = that.config.global.minCurrentPage;
            var isEnd = cfgMaxCurrentPage === cfgTotalPages;
            var isMaxComm = that.config.global.isMaxComm;
            var isMinComm = that.config.global.isMinComm;
            var isQuery = ($(window).scrollTop() + $(window).height() + 350) > $(document).height();
            var contentHeight = $('.component-searchProduct-content li.item-content').outerHeight(true) * 5;
            !isEnd?
                $node.find(".isLoading span").text("请下拉加载..."):
                $node.find(".isLoading span").text("没有更多数据了...");
            if($(window).scrollTop() == 0 && cfgMinCurrentPage > 1 && isMinComm){
                that.config.global.isMinComm = false;
                that.sendRequest("GOODS_BASE_QUERY", {currentPage: cfgMinCurrentPage-1})
                    .done(function(response){
                        if(response && response.success){
                            var dataObj = response.obj;
                            $.each(dataObj.goodsList.reverse(), function(index, good){
                                good.currentPage = cfgMinCurrentPage-1;
                                that.renderData.global.response.goodsList.unshift(good);
                            });
                            that.config.global.minCurrentPage = dataObj.pagination.currentPage;
                            that.config.global.totalPages = dataObj.pagination.totalPages;
                            that.config.global.isMinComm = true;
                            $(window).scrollTop(contentHeight);
                        }
                    })
                    .fail(function(){
                        that.config.global.isMinComm = true;
                    });
            }
            if(isQuery && cfgMaxCurrentPage < cfgTotalPages && isMaxComm){
                that.config.global.isMaxComm = false;
                that.sendRequest("GOODS_BASE_QUERY", {currentPage: cfgMaxCurrentPage+1})
                    .done(function(response){
                        if(response && response.success){
                            var dataObj = response.obj;
                            $.each(dataObj.goodsList, function(index, good){
                                good.currentPage = cfgMaxCurrentPage+1;
                                that.renderData.global.response.goodsList.push(good);
                            });
                            if(dataObj.pagination.currentPage === dataObj.pagination.totalPages){
                                $node.find(".isLoading span").text("没有更多数据了...");
                            }
                            that.config.global.maxCurrentPage = dataObj.pagination.currentPage;
                            that.config.global.totalPages = dataObj.pagination.totalPages;
                            that.config.global.isMaxComm = true;
                        }
                    })
                    .fail(function(){
                        that.config.global.isMaxComm = true;
                    });
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
                                quantity: quantity
                            }).done(function(){
                                that.modules.header.sendRequest("ORDER_SHOPPINGCART_COUNT",{})
                                    .done(function(response){
                                        that.modules.footer.renderData.global.response.attr("count",response.obj);
                                        message.refresh({ content:'添加成功', confirmBtn: false });
                                    });
                            });
                        };
                        that.sendRequest("ORDER_SHOPPINGCART_COUNT_ID", {itemId: obj.goodsSpecsList[0].itemId})
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
                    timeOutFun: function () {
                        var $parent = $node.parents('.item-content');
                        var url = $parent.attr('tourl');
                        var currentPage = $parent.attr('currentPage');
                        var contentHeight = $parent.outerHeight(true) * 5;
                        var toTop;
                        var scrollTop = $(window).scrollTop();
                        var currentPagePrev = currentPage -1;
                        if(currentPage > 1){
                            var pageLastPrev = $('li[currentPage='+currentPagePrev+']');
                            var pageLastItem = $(pageLastPrev[pageLastPrev.length-1]);
                            var isHide = pageLastItem.offset().top - scrollTop - 196 > - contentHeight / 5 ? false : true;
                            toTop = isHide ? (scrollTop % contentHeight + contentHeight) : (scrollTop % contentHeight);
                        }else{
                            toTop = scrollTop % contentHeight;
                        }
                        localStorage.setItem('toTop',toTop);
                        that.jsUtil.url.setParam({'currentPage':currentPage},'cover');
                        location.href= url + '?currentPage=' + currentPage;
                    }
                });
            }
        },
        ".component-searchProduct-content .item-content a click":function(node){
            var that = this;
            var $node = $(node).parents('.item-content');
            var url = $node.attr('tourl');
            var currentPage = $node.attr('currentPage');
            var contentHeight = $node.outerHeight(true) * 5;
            var toTop;
            var scrollTop = $(window).scrollTop();
            var currentPagePrev = currentPage -1;
            if(currentPage > 1){
                var pageLastPrev = $('li[currentPage='+currentPagePrev+']');
                var pageLastItem = $(pageLastPrev[pageLastPrev.length-1]);
                var isHide = pageLastItem.offset().top - scrollTop - 196 > - contentHeight / 5 ? false : true;
                toTop = isHide ? (scrollTop % contentHeight + contentHeight) : (scrollTop % contentHeight);
            }else{
                toTop = scrollTop % contentHeight;
            }
            localStorage.setItem('toTop',toTop);
            that.jsUtil.url.setParam({'currentPage':currentPage},'cover');
            location.href= url + '?currentPage=' + currentPage;
        }

    });

});