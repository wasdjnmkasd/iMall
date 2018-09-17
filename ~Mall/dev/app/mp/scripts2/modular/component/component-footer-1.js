
/** 模块组件
 *    @detail:    footer组件_1
 *    @return:    can.Component
 *    @author:    林鹏腾
 *    @date:      2017.8.16
 */
define(["text!modular/template/template-footer-1.mustache"], function(template){

    'use strict';

    var api = window.capi.get();

    return can.Component.extend({
        tag: "component-footer-1",
        template: template,
        helpers: {
            scopeConfig: function(config){
                this.spcConfig = api.jsUtil.mustache.getContent(config, "object");
                var spcConfig = this.spcConfig.attr();
                if(spcConfig.price){
                    var isExist = spcConfig.realPrice||spcConfig.realPrice===0;
                    var spcPrice = isExist && spcConfig.price>spcConfig.realPrice? spcConfig.realPrice: spcConfig.price;
                    this.attr("spcPrice", (spcPrice*1).toFixed(2));
                }else{
                    this.attr("spcPrice", "");
                }
            },
            retrunTotal: function(spcPrice, quantity){
                var tSpcPrice = api.jsUtil.mustache.getContent(spcPrice, "number");
                var tQuantity = api.jsUtil.mustache.getContent(quantity, "number");
                return (tSpcPrice*tQuantity).toFixed(2);
            },
            returnTotalPrice: function(orderPrice){
                var tOrderPrice = api.jsUtil.mustache.getContent(orderPrice, "number");
                return tOrderPrice.toFixed(2);
            }
        },
        scope: {
            spcPrice: ""
        },
        events: {
            "inserted": function(){},
            "removed": function(){}
        }
    })

});