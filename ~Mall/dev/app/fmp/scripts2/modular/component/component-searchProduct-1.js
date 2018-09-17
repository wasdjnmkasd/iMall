
/** 模块组件
 *    @detail:    searchProduct组件_1
 *    @return:    can.Component
 *    @author:    林鹏腾
 *    @date:      2017.8.16
 */
define(["text!modular/template/template-searchProduct-1.mustache"], function(template){

    'use strict';

    var api = window.capi.get();

    return can.Component.extend({
        tag: "component-searchproduct-1",
        template: template,
        helpers: {
            returnTags: function(goodsSpecsList, options){
                var tags = [];
                var goodsTagList = [];
                var list = api.jsUtil.mustache.getDepContent(goodsSpecsList, "object");
                $.each(list||[], function(index, obj){
                    $.each(obj.tagList||[], function(i, o){
                        goodsTagList.push(o);
                    })
                });
                $.each(goodsTagList||[], function(i, o){
                    switch (o.tagName) {
                        case '必选': $.inArray('icon_tag1', tags) === -1 && tags.push("icon_tag1"); break;
                        case '爆款': $.inArray('icon_tag2', tags) === -1 && tags.push("icon_tag2"); break;
                        case '热销': $.inArray('icon_tag3', tags) === -1 && tags.push("icon_tag3"); break;
                        case '优选': $.inArray('icon_tag4', tags) === -1 && tags.push("icon_tag4"); break;
                    }
                });
                return options.fn(tags);
            },
            returnImg: function(sortType, options){
                var tSortType = api.jsUtil.mustache.getContent(sortType, "number");
                if(tSortType === 3){
                    return options.fn({path: "down"})
                }
                else if(tSortType === 4){
                    return options.fn({path: "up"})
                }
                else{
                    return options.fn({path: "none"})
                }
            },
            returnPrice: function(price){
                var tPrice = api.jsUtil.mustache.getContent(price, "number");
                return tPrice.toFixed(2);
            },
            returnImgSrc: function(type){
                var imgSrc = '';
                var tType = api.jsUtil.mustache.getContent(type, "number");
                switch(tType){
                    case 0: imgSrc = '/images/platform/tag/icon_cross.png'; break;
                    case 2: imgSrc = '/images/platform/tag/icon_normal.png'; break;
                }
                return imgSrc;
            },
            returnIsSingleSpec: function(goodsSpecsList){
                var list = api.jsUtil.mustache.getDepContent(goodsSpecsList, "object");
                return $.isArray(list) && list.length > 1? 'no': 'yes';
            }
        },
        scope: {
        },
        events: {
            "inserted": function(){
            },
            "{document} click": function(dom, ev){
                var that = this;
                var $element = that.element;
                var event = ev || window.event;
                var $target = $(event.target||event.srcElement);
                var isSelf = $target.hasClass("searchProduct-header-right");
                if(!isSelf && !$target.parents(".searchProduct-header-right").length){
                    $element.find(".searchProduct-header .searchProduct-header-right.active").click();
                }
            },
            ".searchProduct-header .searchProduct-header-right touchend": function(node){
                var $node = $(node);
                $node.toggleClass("active");
            }
        }
    });

});