
/** 模块组件
 *    @detail:    address-edit组件_1
 *    @return:    can.Component
 *    @author:    林鹏腾
 *    @date:      2017.8.16
 */
define(["text!modular/template/template-address-edit-1.mustache"], function(template){

    'use strict';

    var api = window.capi.get();

    return can.Component.extend({
        tag: "component-address-edit-1",
        template: template,
        helpers: {

        },
        scope: {
            check_province: function(val){
                return val && val !== "---- 所在省 ----";
            },
            check_city: function(val, count){
                return count === 1 || (val && val !== "---- 所在市 ----");
            },
            check_area: function(val, count){
                return count === 1 || (val && val !== "---- 所在区 ----");
            },
            check_address: function(val){
                return !!(val && val.trim());
            },
            check_zipCode: function(val){
                return api.jsUtil.check.zipCode(val);
            },
            check_receiveName: function(val){
                return !!(val && val.trim());
            },
            check_receivePhone: function(val){
                return api.jsUtil.check.phone(val);
            }
        },
        events: {
            "inserted": function(){
                var that = this;
                var $element = that.element;
                $element.find(".picker-country").picker();
            },
            "removed": function(){

            },
            ".component-address-edit-info .receiveName_state blur": function(node){
                var that = this;
                var $node = $(node);
                var $element = that.element;
                var val = $node.val() && $node.val().trim();
                var state = that.scope.check_receiveName(val);
                if(!state){
                    $node.addClass("state_error");
                }else{
                    $node.removeClass("state_error");
                }
                $node.text(val);
            },
            ".component-address-edit-info .receivePhone_state blur": function(node){
                var that = this;
                var $node = $(node);
                var $element = that.element;
                var val = $node.val() && $node.val().trim();
                var state = that.scope.check_receivePhone(val);
                if(!state){
                    $node.addClass("state_error");
                }else{
                    $node.removeClass("state_error");
                }
            },
            ".component-address-edit-info .province_state change": function(node){
                var that = this;
                var $node = $(node);
                var val = $node.val();
                var $element = that.element;
                var state = that.scope.check_province(val);
                if(!state){
                    $node.addClass("state_error");
                }else{
                    $node.removeClass("state_error");
                }
            },
            ".component-address-edit-info .city_state change": function(node){
                var that = this;
                var $node = $(node);
                var val = $node.val();
                var $element = that.element;
                var count = $node.find("option").length;
                var state = that.scope.check_city(val, count);
                if(!state){
                    $node.addClass("state_error");
                }else{
                    $node.removeClass("state_error");
                }
            },
            ".component-address-edit-info .area_state change": function(node){
                var that = this;
                var $node = $(node);
                var val = $node.val();
                var $element = that.element;
                var count = $node.find("option").length;
                var state = that.scope.check_area(val, count);
                if(!state){
                    $node.addClass("state_error");
                }else{
                    $node.removeClass("state_error");
                }
            },
            ".component-address-edit-info .address_state blur": function(node){
                var that = this;
                var $node = $(node);
                var val = $node.val() && $node.val().trim();
                var state = that.scope.check_address(val);
                !state? $node.addClass("state_error"): $node.removeClass("state_error");
                $node.text(val);
            }
        }
    });

});