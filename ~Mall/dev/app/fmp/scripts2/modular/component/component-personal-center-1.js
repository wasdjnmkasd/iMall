
/** 模块组件
 *    @detail:    personal-center组件_1
 *    @return:    can.Component
 *    @author:    林鹏腾
 *    @date:      2017.8.16
 */
define(["text!modular/template/template-personal-center-1.mustache"], function(template){

    'use strict';

    var api = window.capi.get();

    return can.Component.extend({
        tag: "component-personal-center-1",
        template: template,
        helpers: {

        },
        scope: {

        },
        events: {
            "inserted": function(){},
            "removed": function(){}
        }
    });

});