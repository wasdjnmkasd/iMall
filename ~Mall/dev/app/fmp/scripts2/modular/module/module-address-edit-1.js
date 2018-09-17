
/** 页面模块
 *    @detail:    address-edit模块_1
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
            global: "<component-address-edit-1></component-address-edit-1>"
        },
        region: {
            global: {
                reqDynamic: true,
                resDynamic: true,
                beforeFunc: function(that, data){
                    if(that.config.global.id){
                        $.each(data.response.global, function(name, obj){
                            if(obj.id == that.config.global.id){
                                that.response.global = obj;
                            }
                        });
                    }
                }
            }
        },
        config: {},
        request: {},
        response: {},
        sendArr: [],
        reload: false,


        //自定义方法


        //自定义事件
        ".component-address-edit-defaultSetting .btnSet   touchend": function(){
            var that = this;
            var setDefault = that.renderData.global.response.attr().setDefault;
            that.renderData.global.response.attr("setDefault", !setDefault?1:0);
        },
        ".component-address-edit-commit                   touchend": function(){
            var that = this;
            var $element = that.element;
            var jumpUrl = that.renderData.global.config.jumpUrl;
            var defUrl = -1;
            var response = that.renderData.global.response.attr();
            var message = that.modules.message;
            $element.find(".receiveName_state").trigger("blur");
            $element.find(".receivePhone_state").trigger("blur");
            $element.find(".province_state").trigger("change");
            $element.find(".city_state").trigger("change");
            $element.find(".area_state").trigger("change");
            $element.find(".address_state").trigger("blur");
            if($element.find(".state_error").length>0){
                message.refresh({
                    content: "请正确填写地址信息！"
                });
            }else{
                response.receiveName = $element.find("#consignee").val();
                response.receivePhone = $element.find("#telephone").val();
                response.province = $element.find("#province").val();
                response.city = $element.find("#city").val()==="---- 所在市 ----"? "": $element.find("#city").val();
                response.area = $element.find("#area").val()==="---- 所在区 ----"? "": $element.find("#area").val();
                response.address = $element.find("#address").val();
                response.setDefault = response.setDefault? 1: 0;
                if(response.id){
                    that.sendRequest("USER_ADDRESS_UPDATE", response)
                        .done(function(response){
                            if(response.success){
                                that.jsUtil.url.jumpPage(jumpUrl, defUrl, true);
                            }else if(response.errorMsg){
                                message.refresh({
                                    content: response.errorMsg,
                                    confirmBtn: false
                                })
                            }else{
                                message.refresh({
                                    content: "修改收货地址失败！",
                                    confirmBtn: false
                                })
                            }
                        });
                }else{
                    that.sendRequest("USER_ADDRESS_CREATE", response)
                        .done(function(response){
                            if(response.success){
                                that.jsUtil.url.jumpPage(jumpUrl, defUrl, true);
                            }else if(response.errorMsg){
                                message.refresh({
                                    content: response.errorMsg,
                                    confirmBtn: false
                                })
                            }else{
                                message.refresh({
                                    content: "创建收货地址失败！",
                                    confirmBtn: false
                                })
                            }
                        })
                        .fail(function(response){
                            if(response.errorMsg){
                                message.refresh({
                                    content: response.errorMsg,
                                    confirmBtn: false
                                })
                            }else{
                                message.refresh({
                                    content: "创建收货地址失败！",
                                    confirmBtn: false
                                })
                            }
                        });
                }
            }
        }
    });

});