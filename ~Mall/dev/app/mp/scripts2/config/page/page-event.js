
/** 页面事件
 *    @detail:    页面事件
 *    @return:     无
 *    @author:    林鹏腾
 *    @date:      2018.1.4
 */

define(function(){

    'use strict';

    /** 数据
     */
    var api = window.capi.get();
    var redirect = api.jsData.location.redirect;
    var centerId = api.jsData.userInfo.centerId;


    /** 业务事件
     */
    $(document).on("touchend", "[href*='void(0)'],[href='#'],[href='']", function(){
        //注意此处不要阻止默认事件
        $(this).removeAttr("href");
    });


    /** 微信JSSDK验证
     */
    if(centerId && api.jsUtil.weChat.browser()){
        $.when(api.jsModel.send("THIRD_WECHAT_CONFIG", {url: redirect}))
            .done(function(response){
                wx.config({
                    debug:     false,
                    appId:     response.obj.appid,
                    nonceStr:  response.obj.nonceStr,
                    timestamp: response.obj.timestamp,
                    signature: response.obj.signature,
                    jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'scanQRCode']
                });
            });
    }

});
