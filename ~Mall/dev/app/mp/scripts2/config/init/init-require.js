
/** 初始化 --- 文件映射
 *    @detail:    文件映射
 *    @return:     无
 *    @author:    林鹏腾
 *    @date:      2017.9.22
 */

requirejs.config({

    //根目录
    baseUrl: '/scripts2/',


    //依赖关系
    shim: {

    },


    //模块路径
    paths: {
        /* 框架/插件 */
        "text":                            "/frames/text/text",
        "css":                             "/frames/require-css/css.min",
        "EChart":                          "/frames/EChart/dist/echarts",
        "chart":                           "/frames/chart/dist/Chart.bundle",
        "fn.bootstrap":                    "/frames/bootstrap/dist/js/bootstrap",
        "fn.lazyload":                     "/frames/jquery_lazyload/jquery.lazyload",
        "fn.ajaxfileupload":               "/frames/ajaxfileupload/ajaxfileupload.min",
        "fn.dotdotdot":                    "/frames/jQuery.dotdotdot/src/jquery.dotdotdot.min",
        "fn.scrollMonitor":                "/frames/jquery.scrollMonitor/jquery.scrollMonitor.min",
        "fn.touchSlider":                  "/frames/jquery.touchSlider/jquery.touchSlider",
        "fn.mousewheel":                   "/frames/jquery-mousewheel/jquery.mousewheel.min",
        "fn.timeout":                      "/frames/jquery.timeout/dist/jquery.timeout.min",
        "fn.roller":                       "/frames/jquery.roller/dist/jquery.roller.min",
        "fn.picker":                       "/frames/jquery.picker/dist/jquery.picker.min",
        "fn.qrcode":                       "/frames/jquery-qrcode/dist/jquery-qrcode.min",

        /* 页面配置 */
        "config.page.event":               "config/page/page-event",
        "config.page.modular":             "config/page/page-modular",
        "config.page.mustache":            "config/page/page-mustache",
        "config.page.render":              "config/page/page-render",

        /* 页面加载 */
        "page.address.edit.1":             "page/page-address-edit-1",
        "page.address.manage.1":           "page/page-address-manage-1",
        "page.apply.1":                    "page/page-apply-1",
        "page.bindInvitation.1":           "page/page-bindInvitation-1",
        "page.bindMobile.1":               "page/page-bindMobile-1",
        "page.discount.1":                 "page/page-discount-1",
        "page.forgetPassword.1":           "page/page-forgetPassword-1",
        "page.login.1":                    "page/page-login-1",
        "page.logistics.1":                "page/page-logistics-1",
        "page.nav.1":                      "page/page-nav-1",
        "page.orderConfirm.1":             "page/page-orderConfirm-1",
        "page.orderDetail.1":              "page/page-orderDetail-1",
        "page.orderList.1":                "page/page-orderList-1",
        "page.personal.center.1":          "page/page-personal-center-1",
        "page.personal.information.1":     "page/page-personal-information-1",
        "page.register.1":                 "page/page-register-1",
        "page.searchProduct.1":            "page/page-searchProduct-1",
        "page.share.1":                    "page/page-share-1",
        "page.shoppingCart.1":             "page/page-shoppingCart-1",
        "page.wechat.transfer.1":          "page/page-wechat-transfer-1"

    }

});