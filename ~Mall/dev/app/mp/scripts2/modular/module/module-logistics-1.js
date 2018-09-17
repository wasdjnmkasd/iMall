
/** 页面模块
 *    @detail:    logistics-tracking模块_1
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
            global: "<component-logistics-1></component-logistics-1>"
        },
        region: {
            global: {
                beforeFunc: function(that, data){
                    delete that.response.global.pagination;
                    that.response.global.orderInfo = data.response.global.orderList[0]||{};
                },
                afterFunc: function(that){
                    var state = $.Deferred();
                    var message = that.modules.message;
                    var orderInfo = that.response.global.orderInfo;
                    var orderExpressList = orderInfo? orderInfo.orderExpressList: [];
                    if(orderExpressList.length > 0){
                        var defArr = [];
                        $.each(orderExpressList, function(index, obj){
                            if(!obj.expressId || !obj.expressName){
                                return true
                            }
                            var options = {
                                'expressId': obj.expressId,
                                'carrierName': obj.expressName
                            };
                            var queryFunc = function(index, that, options, isFirst){
                                if(isFirst) {
                                    defArr[index] = $.Deferred();
                                }
                                that.sendRequest("THIRD_LOGISTICS", options)
                                    .done(function(response){
                                        var isExist = response && response.success;
                                        var isArray = isExist && $.isArray((response.obj||{}).Traces);
                                        if(isArray){
                                            orderExpressList[index].infoArr = response.obj.Traces.reverse();
                                            defArr[index].resolve();
                                        }
                                        else{
                                            message.refresh({
                                                confirmBtn: false,
                                                content: "暂未查到运单号为‘" + obj.expressId + "’的物流信息！"
                                            });
                                            defArr[index].resolve();
                                        }
                                    })
                                    .fail(function(){
                                        if(isFirst){
                                            queryFunc(index, that, options, false);
                                        }
                                        else{
                                            message.refresh({
                                                confirmBtn: false,
                                                content: "暂未查到运单号为‘" + obj.expressId + "’的物流信息！"
                                            });
                                            defArr[index].resolve();
                                        }
                                    });
                            };
                            queryFunc(index, that, options, true);
                        });
                        $.when.apply(that, defArr).done(function(){
                            that.config.global.isMore = orderExpressList.length > 1;
                            that.config.global.length = orderExpressList.length;
                            that.renderFunc(["global"]);
                            state.resolve();
                        });
                        return state;
                    }
                    else{
                        message.refresh({
                            cancelBtn: false,
                            confirmBtn: false,
                            content: "暂无物流信息！",
                            timeOutFun: function (){ window.history.go(-1) }
                        });
                    }
                }
            }
        },
        config: {
            global: {}
        },
        request: {
            global: {}
        },
        response: {
            global: {}
        },
        sendArr: ["ORDER_USER_QUERY"],
        reload: false


        //自定义事件


        //自定义事件

    })

});