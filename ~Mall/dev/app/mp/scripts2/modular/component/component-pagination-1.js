
/** 模块组件
 *    @detail:    pagination组件_1
 *    @return:    can.Component
 *    @author:    林鹏腾
 *    @date:      2017.9.22
 */
define(["text!modular/template/template-pagination-1.mustache"], function(template){

    'use strict';

    var api = window.capi.get();

    return can.Component.extend({
        tag: "component-pagination-1",
        template: template,
        helpers: {
            spcRegion: function(region){
                this.region = api.jsUtil.mustache.getContent(region, "object");
            },
            spcModule: function(module){
                this.module = api.jsUtil.mustache.getContent(module, "object");
            },
            returnLose: function(currentPage, pageNumber){
                var tCurrentPage = api.jsUtil.mustache.getContent(currentPage, "number");
                var tPageNumber = api.jsUtil.mustache.getContent(pageNumber, "number");
                return tCurrentPage && tCurrentPage === tPageNumber? "lose": "";
            },
            regionProcessing: function(pagination, options){
                var pageList = [];
                var region = api.jsUtil.mustache.getContent(pagination, "object");
                var currentPage = region.attr("currentPage")*1;
                var totalPages =  region.attr("totalPages")*1;
                for(var i=0; i < totalPages; i++){
                    pageList.push({ index: i+1 })
                }
                region.attr("pageList", pageList);
                return options.fn(region);
            }
        },
        scope: {
        },
        events: {
            "inserted": function(element){
                var that = this;
                var $element = $(element);
                var region = that.scope.region || {};
                var pagination = (region.response || {}).pagination;
                var currentPage = pagination && pagination.attr("currentPage");
                var $elected = $element.find(".pagination_select > option")[currentPage-1];
                $elected && ($elected.selected = true);
            },
            ".pagination_ul li:not(.lose):not(.active) > a.pagination_btn touchend": function(node){
                var that = this;
                var $node = $(node);
                var region = that.scope.region;
                var module = that.scope.module;
                var pagination = region.response.pagination;
                var currentPage = pagination.attr("currentPage")*1;
                var totalPages = pagination.attr("totalPages")*1;
                if($node.hasClass("prevBtn")){
                    currentPage = currentPage>1? currentPage*1-1: 1;
                    pagination.attr("currentPage", currentPage*1);
                }
                else if($node.hasClass("nextBtn")){
                    currentPage = currentPage<totalPages? currentPage*1+1: totalPages;
                    pagination.attr("currentPage", currentPage*1);
                }
                if( region.config &&
                    typeof region.config === "object" &&
                    typeof region.config.eventFunc === "function"
                ){
                    region.config.eventFunc(module, currentPage);
                }
            },
            ".pagination_ul li > .pagination_select change": function(node){
                var that = this;
                var $node = $(node);
                var region = that.scope.region;
                var module = that.scope.module;
                var currentPage = $node.find("option:selected").val()*1;
                if( region.config &&
                    typeof region.config === "object" &&
                    typeof region.config.eventFunc === "function"
                ){
                    region.config.eventFunc(module, currentPage>0?currentPage:1);
                }
            }
        }
    })

});