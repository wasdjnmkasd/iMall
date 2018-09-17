
/** 模块组件
 *    @detail:    scroll-top组件_1
 *    @return:    can.Component
 *    @author:    林鹏腾
 *    @date:      2017.8.16
 */
define(["text!modular/template/template-scroll-top-1.mustache"], function(template){

    'use strict';

    var api = window.capi.get();

    return can.Component.extend({
        tag: "component-scroll-top-1",
        template: template,
        helpers: {

        },
        scope: {

        },
        events: {
            "inserted": function(){
                $(window).scrollTop() >= 1500?
                    $(this.element).find(".scrollTop").css("display", "block"):
                    $(this.element).find(".scrollTop").css("display", "none");
            },
            "{window} scroll": function(){
                $(window).scrollTop() >= 1500?
                    $(this.element).find(".scrollTop").css("display", "block"):
                    $(this.element).find(".scrollTop").css("display", "none");
            },
            ".component-scroll-top-content .scrollTop touchend": function(){
                $("html,body").animate({scrollTop: 0}, 500);
            }
        }
    });

});