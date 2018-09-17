
/** 模块组件、页面模块
 *    @detail:    模块组件、页面模块
 *    @return:     无
 *    @author:    林鹏腾
 *    @date:      2017.9.22
 */


/* Jquery插件 */
define("modular/frames/fn", [
    "fn.roller",
    "fn.picker",
    "fn.timeout"
], function(){});


/* 模块组件 */
define("modular/component", [
    "modular/frames/fn",
    "modular/component/component-header-1",
    "modular/component/component-footer-1",
    "modular/component/component-searchHistory-1",
    "modular/component/component-message-1",
    "modular/component/component-searchProduct-1",
    "modular/component/component-personal-center-1",
    "modular/component/component-login-1",
    "modular/component/component-register-1",
    "modular/component/component-bindInvitation-1",
    "modular/component/component-bindMobile-1",
    "modular/component/component-personal-information-1",
    "modular/component/component-address-manage-1",
    "modular/component/component-address-edit-1",
    "modular/component/component-shoppingCart-1",
    "modular/component/component-orderConfirm-1",
    "modular/component/component-orderList-1",
    "modular/component/component-orderDetail-1",
    "modular/component/component-logistics-1",
    "modular/component/component-alert-discount-1",
    "modular/component/component-discount-1",
    "modular/component/component-forgetPassword-1",
    "modular/component/component-pagination-1",
    "modular/component/component-pay-choose-1",
    "modular/component/component-site-introduce-1",
    "modular/component/component-scroll-top-1"
],function (){});



/* 页面模块 */
define([
    "modular/component",
    "modular/module/module-header-1",
    "modular/module/module-footer-1",
    "modular/module/module-searchHistory-1",
    "modular/module/module-message-1",
    "modular/module/module-site-introduce-1",
    "modular/module/module-searchProduct-1",
    "modular/module/module-bindInvitation-1",
    "modular/module/module-personal-center-1",
    "modular/module/module-login-1",
    "modular/module/module-register-1",
    "modular/module/module-bindMobile-1",
    "modular/module/module-personal-information-1",
    "modular/module/module-address-manage-1",
    "modular/module/module-address-edit-1",
    "modular/module/module-shoppingCart-1",
    "modular/module/module-orderConfirm-1",
    "modular/module/module-orderList-1",
    "modular/module/module-orderDetail-1",
    "modular/module/module-logistics-1",
    "modular/module/module-alert-discount-1",
    "modular/module/module-discount-1",
    "modular/module/module-forgetPassword-1",
    "modular/module/module-scroll-top-1"
],function (
    components,
    module_00001,
    module_00002,
    module_00005,
    module_00006,
    module_00007,
    module_00010,
    module_00011,
    module_00012,
    module_00013,
    module_00014,
    module_00015,
    module_00016,
    module_00017,
    module_00018,
    module_00019,
    module_00020,
    module_00021,
    module_00022,
    module_00023,
    module_00024,
    module_00025,
    module_00026,
    module_00029
){
    'use strict';

    var api = window.capi.get();

    if(!api.jsModular){
        Object.defineProperty(api, 'jsModular', {
            configurable: false,
            writable: false,
            value: {}
        });
    }
    if(!api.jsModular.codes){
        Object.defineProperty(api.jsModular, 'codes', {
            configurable: false,
            writable: false,
            value: {
                "module_00001": { "md": module_00001,  "cls": "module-header-1" },
                "module_00002": { "md": module_00002,  "cls": "module-footer-1" },
                "module_00005": { "md": module_00005,  "cls": "module-searchHistory-1" },
                "module_00006": { "md": module_00006,  "cls": "module-message-1" },
                "module_00007": { "md": module_00007,  "cls": "module-site-introduce-1" },
                "module_00010": { "md": module_00010,  "cls": "module-searchProduct-1" },
                "module_00011": { "md": module_00011,  "cls": "module-bindInvitation-1" },
                "module_00012": { "md": module_00012,  "cls": "module-personal-center-1" },
                "module_00013": { "md": module_00013,  "cls": "module-login-1" },
                "module_00014": { "md": module_00014,  "cls": "module-register-1" },
                "module_00015": { "md": module_00015,  "cls": "module-bindMobile-1" },
                "module_00016": { "md": module_00016,  "cls": "module-personal-information-1" },
                "module_00017": { "md": module_00017,  "cls": "module-address-manage-1" },
                "module_00018": { "md": module_00018,  "cls": "module-address-edit-1" },
                "module_00019": { "md": module_00019,  "cls": "module-shoppingCart-1" },
                "module_00020": { "md": module_00020,  "cls": "module-orderConfirm-1" },
                "module_00021": { "md": module_00021,  "cls": "module-orderList-1" },
                "module_00022": { "md": module_00022,  "cls": "module-orderDetail-1" },
                "module_00023": { "md": module_00023,  "cls": "module-logistics-1" },
                "module_00024": { "md": module_00024,  "cls": "module-alert-discount-1" },
                "module_00025": { "md": module_00025,  "cls": "module-discount-1" },
                "module_00026": { "md": module_00026,  "cls": "module-forgetPassword-1" },
                "module_00029": { "md": module_00029,  "cls": "module-scroll-top-1" }
            }
        });
    }
    if(!api.jsModular.modules){
        Object.defineProperty(api.jsModular, 'modules', {
            configurable: false,
            writable: false,
            value: {
                message: "module_00006",
                alertDiscount: "module_00024"
            }
        });
    }

});