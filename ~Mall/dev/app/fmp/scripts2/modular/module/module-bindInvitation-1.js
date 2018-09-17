
/** 页面模块
 *    @detail:    bindInvitation模块_1
 *    @return:    can.Control
 *    @author:    林鹏腾
 *    @date:      2017.8.16
 */
define(["config.page.render"], function(Render) {

    'use strict';

    var api = window.capi.get();
    var shopId = api.jsData.userInfo.shopId;
    var userId = api.jsData.userInfo.userId;
    var gradeId = api.jsData.userInfo.gradeId;

    return Render.extend({
        //子类扩展
        tags: {
            global: "<component-bindinvitation-1></component-bindinvitation-1>"
        },
        region: {
            global: {
                reqDynamic: true,
                resDynamic: false,
                beforeFunc: function(that, data){
                    if (that.response.global.userInfo) {
                        that.config.global.account = that.response.global.userInfo.phone || "";
                        that.request.global.account = that.response.global.userInfo.phone || "";
                    }
                }
            }
        },
        config: {
            global: {}
        },
        request: {
            global: {
                account:  "",
                invitationCode: ""
            },
            "USER_INVITERCODE_BIND": {
                id:  userId,
                shopId: shopId || gradeId
            }
        },
        response: {
            global: {}
        },
        sendArr: ["USER_DETAIL_QUERY/global/userInfo"],
        reload: false,


        //自定义事件
        ".component-bindInvitation-bingBtn:not(.state_error) touchend": function(){
            var that = this;
            var message = that.modules.message;
            var request = that.renderData.global.request.attr();
            var jumpUrl = that.renderData.global.config.jumpUrl;
            if(that.jsUtil.weChat.browser()){
                that.sendRequest("USER_INVITERCODE_BIND", {
                    phone:           request.account,
                    invitationCode:  request.invitationCode
                }).done(function(response){
                    if (response && response.success) {
                        if (response && response.obj) {
                            var shopId = api.jsData.userInfo.shopId;
                            var userId = api.jsData.userInfo.userId;
                            var welfareVip = 'v:' + shopId + '-' + userId;
                            if (jumpUrl) {
                                window.localStorage.setItem("welfareVip", welfareVip);
                                that.jsUtil.url.jumpPage(jumpUrl, null);
                            }
                            if (!jumpUrl) {
                                window.localStorage.setItem("welfareVip", welfareVip);
                                that.jsUtil.url.jumpPage("/index.html", null);
                            }
                        }
                        else if(response && response.errorMsg){
                            message.refresh({
                                type:    "error",
                                content:  response.errorMsg,
                                cancelBtn:  false,
                                confirmBtn:  false
                            });
                        }
                        else {
                            message.refresh({
                                type:    "error",
                                content:  "绑定邀请码失败！",
                                cancelBtn:  false,
                                confirmBtn:  false
                            });
                        }
                    }
                    else if(response && response.errorMsg){
                        message.refresh({
                            type:    "error",
                            content:  response.errorMsg,
                            cancelBtn:  false,
                            confirmBtn:  false
                        });
                    }
                    else {
                        message.refresh({
                            type:    "error",
                            content:  "绑定邀请码失败！",
                            cancelBtn:  false,
                            confirmBtn:  false
                        });
                    }
                }).fail(function(){
                    message.refresh({
                        type:    "error",
                        content:  "绑定邀请码失败！",
                        cancelBtn:  false,
                        confirmBtn:  false
                    });
                });
            }else{
                message.refresh({
                    cancelBtn: false,
                    confirmBtn: false,
                    content: "请在微信端进行操作！"
                });
            }
        }
    });

});