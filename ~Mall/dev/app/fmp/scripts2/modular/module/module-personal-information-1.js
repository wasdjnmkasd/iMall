
/** 页面模块
 *    @detail:    personal-information模块_1
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
            global: "<component-personal-information-1></component-personal-information-1>"
        },
        region: {
            global: {
                cfgDynamic: true,
                reqDynamic: true,
                resDynamic: true,
                afterFunc: function(that, data){
                    var userDetail = data.response.global && data.response.global.userDetail || {};
                    userDetail && userDetail.id?
                        that.renderData.global.config.attr("detailExist", true):
                        that.renderData.global.config.attr("detailExist", false);
                    that.response.global = data.response.global || {};
                    that.response.global.userDetail = that.response.global.userDetail || {};
                }
            }
        },
        config: {
            global: {
                detailExist: null
            }
        },
        request: {
            global: {}
        },
        response: {
            global: {}
        },
        sendArr: ["USER_DETAIL_QUERY"],
        reload: false,


        //自定义事件
        ".component-personal-information-commit  touchend": function (node) {
            var that = this;
            var $node = $(node);
            var $element = that.element;
            var message = that.modules.message;
            var jumpUrl = that.config.global.jumpUrl;
            var type = $node.hasClass("edit")? "edit": $node.hasClass("add")? "add": "";
            var identification = $element.find("#identification").val().trim();
            var headImg = $element.find(".headPortrait img").attr("src");
            var nickname = $element.find("#nickname").val().trim();
            var realname = $element.find("#realname").val().trim();
            var location = $element.find("#location").val().trim();
            var gender = $element.find("#gender").val().trim();
            if (!realname || !gender || !identification || !realname.trim() || !gender.trim() || !identification.trim()) {
                message.refresh({
                    content: "请完善好个人信息！"
                });
            }
            else if (!api.jsUtil.check.chinaName(realname)) {
                message.refresh({
                    content: "请正确填写您的中文姓名！"
                });
            }
            else if (!api.jsUtil.check.identity(identification)) {
                message.refresh({
                    content: "身份证填写有误！"
                });
            }
            else if (type === "edit") {
                that.sendRequest("USER_DETAIL_UPDATE", {
                    headImg: headImg,
                    nickName: nickname,
                    name: realname,
                    sex: gender,
                    location: location,
                    idNum: identification
                }).done(function () {
                    that.jsUtil.url.jumpPage(jumpUrl, '/personal-center.html', true);
                });
            }
            else if (type === "add") {
                that.sendRequest("USER_DETAIL_CREATE", {
                    headImg: headImg,
                    nickName: nickname,
                    name: realname,
                    sex: gender,
                    location: location,
                    idNum: identification
                }).done(function () {
                    that.jsUtil.url.jumpPage(jumpUrl, '/personal-center.html', true);
                });
            }
        }

    });

});