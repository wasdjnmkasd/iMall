
/** 页面模块
 *    @detail:    bindInvitation模块_1
 *    @return:    can.Control
 *    @author:    林鹏腾
 *    @date:      2017.8.16
 */
define(["config.page.render"], function(Render) {

    'use strict';

    var api = window.capi.get();
    var userId = api.jsData.userInfo.userId;
    var shopId = api.jsData.userInfo.shopId;
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
            var toDomain = that.renderData.global.config.toDomain;
            var request = that.renderData.global.request.attr();
            if(that.jsUtil.weChat.browser()){
                that.sendRequest("USER_INVITERCODE_BIND", {
                    phone:           request.account,
                    invitationCode:  request.invitationCode
                }).done(function(response){
                    if (response && response.success) {
                        if (response && response.obj) {
                            if (toDomain === 'fDomainName') {
                                var shopId = api.jsData.userInfo.shopId;
                                var userId = api.jsData.userInfo.userId;
                                var authId = api.jsData.userInfo.authId;
                                var openId = api.jsData.userInfo.openId;
                                var fDomainName = api.jsData.siteInfo.fDomainName;
                                var welfareVip = 'v:' + shopId + '-' + userId;
                                that.jsUtil.url.jumpPage(api.jsUtil.path.setParam(fDomainName, { shopId: shopId, userId: userId, authId: authId, openId: openId, welfareVip: welfareVip }), null);
                            }
                            else {
                                window.history.go(-1);
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