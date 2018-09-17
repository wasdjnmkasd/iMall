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


    /** 链接推送 */
    (function(isPush){
        if(isPush){
            //百度链接推送
            var bp = document.createElement('script');
            var so = document.getElementsByTagName("script")[0];
            var curProtocol = window.location.protocol.split(':')[0];
            curProtocol === 'https'
                ? bp.src = 'https://zz.bdstatic.com/linksubmit/push.js'
                : bp.src = 'http://push.zhanzhang.baidu.com/push.js';
            so.parentNode.insertBefore(bp, so);

            //360链接推送
            var src = (document.location.protocol === "http:")
                ? "http://js.passport.qihucdn.com/11.0.1.js?d2c69cca6c47f2836fde346a232052ff"
                : "https://jspassport.ssl.qhimg.com/11.0.1.js?d2c69cca6c47f2836fde346a232052ff";
            document.write('<script src="' + src + '" id="sozz"><\/script>');
        }
    })(!jsData.siteInfo.debug);


    /** 全局事件 */
    $(document).on("click", "[href*='void(0)'],[href='#'],[href='']", function(){
        //注意此处不要阻止默认事件
        $(this).removeAttr("href");
    });

}());
