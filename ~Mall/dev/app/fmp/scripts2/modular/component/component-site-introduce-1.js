
/** 模块组件
 *    @detail:    site-introduce组件_1
 *    @return:    can.Component
 *    @author:    林鹏腾
 *    @date:      2017.8.16
 */
define(["text!modular/template/template-site-introduce-1.mustache"], function(template){

    'use strict';

    var api = window.capi.get();


    return can.Component.extend({
        tag: "component-site-introduce-1",
        template: template,
        helpers: {
        },
        scope: {
        },
        events: {
            "inserted": function(element){

            },
            "removed": function(){

            }
        }
    })

});