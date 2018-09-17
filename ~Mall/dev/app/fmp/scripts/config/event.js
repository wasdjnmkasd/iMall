/** 初始化 --- 前端事件
 *    @detail:     前端事件
 *    @return:     无
 *    @author:    林鹏腾
 *    @date:      2018.05.16
 */
(function(){

    'use strict';

    var jsData  =   window.app.getApi('jsData');
    var jsUtil  =   window.app.getApi('jsUtil');
    var jsModel =   window.app.getApi('jsModel');
    var jsEvent =   window.app.getApi('jsEvent');
    var centerId =  jsData.userInfo.centerId;
    var redirect =  jsData.location.redirect;


    /** 全局事件 */
    $(document).on("click", "[href*='void(0)'],[href='#'],[href='']", function(){
        //注意此处不要阻止默认事件
        $(this).removeAttr("href");
    });


    /** 微信JSSDK验证
     */
    if(centerId && jsUtil.weChat.browser()){
        $.when(jsModel.send("THIRD_WECHAT_CONFIG", {url: redirect}))
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

}());
