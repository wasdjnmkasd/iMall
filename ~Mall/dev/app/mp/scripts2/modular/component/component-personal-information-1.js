
/** 模块组件
 *    @detail:    personal-information组件_1
 *    @return:    can.Component
 *    @author:    林鹏腾
 *    @date:      2017.8.16
 */
define(["text!modular/template/template-personal-information-1.mustache"], function(template){

    'use strict';

    var api = window.capi.get();

    return can.Component.extend({
        tag: "component-personal-information-1",
        template: template,
        helpers: {
            returnSelected: function(sex, type, options){
                var tSex = api.jsUtil.mustache.getContent(sex, "string");
                var tType = api.jsUtil.mustache.getContent(type, "string");
                if(tSex!=="1"){
                    tSex = "0";
                }
                if(tSex === tType){
                    return options.fn(this);
                }
            },
            returnSex: function(sex){
                var tSex = api.jsUtil.mustache.getContent(sex, "string");
                return tSex === "0"? "男性": "女性";
            }
        },
        scope: {

        },
        events: {
            "inserted": function(){

            },
            "removed": function(){

            }
        }
    });

});