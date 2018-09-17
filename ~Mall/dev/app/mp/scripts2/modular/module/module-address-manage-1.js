
/** 页面模块
 *    @detail:    address-manage模块_1
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
            global: "<component-address-manage-1></component-address-manage-1>"
        },
        region: {
            global: {
                cfgDynamic: true,
                reqDynamic: true,
                resDynamic: true,
                afterFunc: function(that, data){
                    var header = that.modules.header;
                    var resGlobal = data.response.global;
                    var isFormOrder = that.config.global.isFormOrder;
                    if(isFormOrder && $.isArray(resGlobal) && resGlobal.length>0){
                        header.renderData.global.config.attr("icon_AddressSure", false);
                        header.renderData.global.config.attr("icon_AddressManage", true);
                    }else{
                        header.renderData.global.config.attr("icon_AddressSure", false);
                        header.renderData.global.config.attr("icon_AddressManage", false);
                    }
                }
            }
        },
        config: {
        },
        request: {
            global: {},
            USER_ADDRESS_QUERY: {
                "numPerPage": 5,
                "currentPage": 1
            }
        },
        response: {
            global: {},
            pagination: {}
        },
        sendArr: ["USER_ADDRESS_QUERY"],
        reload: false,


        //自定义事件
        ".component-address-manage-list>.item:not(.select) .btn_remove  touchend": function(node){
            var that = this;
            var $node = $(node);
            var message = that.modules.message;
            var id = $node.parents("li").attr("id");
            if(id){
                message.refresh({
                    title:'温馨提示',
                    content:'是否删除该条收货信息？',
                    DOMClick: false,
                    cancelBtn: true,
                    confirmBtn: true,
                    cancelFun: function(){},
                    confirmFun: function(){
                        that.sendRequest("USER_ADDRESS_DELETE", { id: id })
                            .done(function(){
                                that.toRender("USER_ADDRESS_QUERY", {}, [{"global": "response"}]);
                            });
                    }
                });
            }
        },
        ".component-address-manage-list>.item:not(.select) .btnBox_left touchend": function(node){
            var that = this;
            var $node = $(node);
            var id = $node.parents("li").attr("id");
            var setDefault = 1;
            that.sendRequest("USER_ADDRESS_UPDATE", {id: id, setDefault: setDefault})
                .done(function(){
                    that.toRender("USER_ADDRESS_QUERY", {}, [{"global": "response"}]);
                });
        },
        ".component-address-manage-list>.item.select                    touchend": function(node){
            var that = this;
            var $node = $(node);
            var id = $node.attr("id");
            var jumpUrl = that.config.global.jumpUrl;
            var newJumpUrl = that.jsUtil.path.delParam(jumpUrl, ["addressId"]);
            newJumpUrl = that.jsUtil.path.setParam(newJumpUrl, {addressId: id});
            that.jsUtil.url.jumpPage(newJumpUrl, null, true);
        },
        "{document} .component-header-right    .icon_AddressManage      touchend": function () {
            var that = this;
            var header = that.modules.header;
            header.renderData.global.config.attr("icon_AddressSure", true);
            header.renderData.global.config.attr("icon_AddressManage", false);
            header.renderData.global.config.attr("title_text", "管理收货地址");
            that.renderData.global.config.attr("isFormOrder", false)
        },
        "{document} .component-header-right    .icon_AddressSure        touchend": function () {
            var that = this;
            var header = that.modules.header;
            header.renderData.global.config.attr("icon_AddressSure", false);
            header.renderData.global.config.attr("icon_AddressManage", true);
            header.renderData.global.config.attr("title_text", "选择收货地址");
            that.renderData.global.config.attr("isFormOrder", true)
        }
    });

});