
//"http://front.cncoopbuy.com";
//"http://testfront.cncoopbuy.com";
var host = "http://front.cncoopbuy.com";


/** 区域中心页面创建 */
function addPage(region, page) {
    var pages = [];
    var datas = [];
    var dataObj = {
        error:         {
            seo: {
                title: "中国供销海外购--404页面",
                keywords: "中国供销海外购,海淘网站,跨境购,母婴用品,进口商品,网上购物,保税区,跨境电商,跨境贸易",
                description: "中国供销海外购, 跨境电商, 跨境贸易, 提供丰富的正品海外商品, 欢迎广大顾客光临购买！"
            },
            page: "error",
            file: 'error',
            path: '',
            region: '',
            system: "pcMall",
            module: [
                {
                    code: "message-1",
                    sort: 1,
                    area: "body",
                    own:  null,
                    cont: null
                },
                {
                    code: "alertDefault-1",
                    sort: 2,
                    area: "body",
                    own:  null,
                    cont: null
                },
                {
                    code: "alertDiscount-1",
                    sort: 3,
                    area: "body",
                    own:  null,
                    cont: null
                },
                {
                    code: "header-1",
                    sort: 4,
                    area: "bodyHeader",
                    own:  null,
                    cont: null
                },
                {
                    code: "header-2",
                    sort: 5,
                    area: "bodyHeader",
                    own:  null,
                    cont: null
                },
                {
                    code: "nav-1",
                    sort: 6,
                    area: "bodyHeader",
                    own:  null,
                    cont: null
                },
                {
                    code: "error-1",
                    sort: 7,
                    area: "bodyCenter",
                    own:  null,
                    cont: null
                },
                {
                    code: "footer-1",
                    sort: 8,
                    area: "bodyFooter",
                    own:  null,
                    cont: null
                }
            ]
        },
        licence:       {
            seo: {
                title: "中国供销海外购--营业许可证",
                keywords: "中国供销海外购,海淘网站,跨境购,母婴用品,进口商品,网上购物,保税区,跨境电商,跨境贸易",
                description: "中国供销海外购, 跨境电商, 跨境贸易, 提供丰富的正品海外商品, 欢迎广大顾客光临购买！"
            },
            page: "licence",
            file: 'licence',
            path: '',
            region: '',
            system: "pcMall",
            module: [
                {
                    code: "message-1",
                    sort: 1,
                    area: "body",
                    own:  null,
                    cont: null
                },
                {
                    code: "alertDefault-1",
                    sort: 2,
                    area: "body",
                    own:  null,
                    cont: null
                },
                {
                    code: "alertDiscount-1",
                    sort: 3,
                    area: "body",
                    own:  null,
                    cont: null
                },
                {
                    code: "header-1",
                    sort: 4,
                    area: "bodyHeader",
                    own:  null,
                    cont: null
                },
                {
                    code: "header-2",
                    sort: 5,
                    area: "bodyHeader",
                    own:  null,
                    cont: null
                },
                {
                    code: "nav-1",
                    sort: 6,
                    area: "bodyHeader",
                    own:  null,
                    cont: null
                },
                {
                    code: "licence-1",
                    sort: 7,
                    area: "bodyCenter",
                    own:  null,
                    cont: null
                },
                {
                    code: "footer-1",
                    sort: 14,
                    area: "bodyFooter",
                    own:  null,
                    cont: null
                }
            ]
        },
        login:         {
            seo: {
                title: "中国供销海外购--登陆页面",
                keywords: "中国供销海外购,海淘网站,跨境购,母婴用品,进口商品,网上购物,保税区,跨境电商,跨境贸易",
                description: "中国供销海外购, 跨境电商, 跨境贸易, 提供丰富的正品海外商品, 欢迎广大顾客光临购买！"
            },
            page: "login",
            file: 'login',
            path: '',
            region: '',
            system: "pcMall",
            module: [
                {
                    code: "message-1",
                    sort: 1,
                    area: "body",
                    own:  null,
                    cont: null
                },
                {
                    code: "alertDefault-1",
                    sort: 2,
                    area: "body",
                    own:  null,
                    cont: null
                },
                {
                    code: "alertDiscount-1",
                    sort: 3,
                    area: "body",
                    own:  null,
                    cont: null
                },
                {
                    code: "header-1",
                    sort: 4,
                    area: "bodyHeader",
                    own:  null,
                    cont: null
                },
                {
                    code: "header-2",
                    sort: 5,
                    area: "bodyHeader",
                    own:  null,
                    cont: null
                },
                {
                    code: "nav-1",
                    sort: 6,
                    area: "bodyHeader",
                    own:  null,
                    cont: null
                },
                {
                    code: "login-1",
                    sort: 7,
                    area: "bodyCenter",
                    own:  null,
                    cont: null
                },
                {
                    code: "footer-1",
                    sort: 14,
                    area: "bodyFooter",
                    own:  null,
                    cont: null
                }
            ]
        },
        orderDetail:   {
            seo: {
                title: "中国供销海外购--订单详情",
                keywords: "中国供销海外购,海淘网站,跨境购,母婴用品,进口商品,网上购物,保税区,跨境电商,跨境贸易",
                description: "中国供销海外购, 跨境电商, 跨境贸易, 提供丰富的正品海外商品, 欢迎广大顾客光临购买！"
            },
            page: "orderDetail",
            file: "orderDetail",
            path: '',
            region: '',
            system: "pcMall",
            module: [
                {
                    code: "message-1",
                    sort: 1,
                    area: "body",
                    own:  null,
                    cont: null
                },
                {
                    code: "alertDefault-1",
                    sort: 2,
                    area: "body",
                    own:  null,
                    cont: null
                },
                {
                    code: "alertDiscount-1",
                    sort: 3,
                    area: "body",
                    own:  null,
                    cont: null
                },
                {
                    code: "header-1",
                    sort: 4,
                    area: "bodyHeader",
                    own:  null,
                    cont: null
                },
                {
                    code: "header-2",
                    sort: 5,
                    area: "bodyHeader",
                    own:  null,
                    cont: null
                },
                {
                    code: "nav-1",
                    sort: 6,
                    area: "bodyHeader",
                    own:  null,
                    cont: null
                },
                {
                    code: "orderDetail-1",
                    sort: 7,
                    area: "bodyCenter",
                    own:  null,
                    cont: null
                },
                {
                    code: "footer-1",
                    sort: 14,
                    area: "bodyFooter",
                    own:  null,
                    cont: null
                }
            ]
        },
        orderSure:     {
            seo: {
                title: "中国供销海外购--订单确认",
                keywords: "中国供销海外购,海淘网站,跨境购,母婴用品,进口商品,网上购物,保税区,跨境电商,跨境贸易",
                description: "中国供销海外购, 跨境电商, 跨境贸易, 提供丰富的正品海外商品, 欢迎广大顾客光临购买！"
            },
            page: "orderSure",
            file: "orderSure",
            path: '',
            region: '',
            system: "pcMall",
            module: [
                {
                    code: "message-1",
                    sort: 1,
                    area: "body",
                    own:  null,
                    cont: null
                },
                {
                    code: "alertDefault-1",
                    sort: 2,
                    area: "body",
                    own:  null,
                    cont: null
                },
                {
                    code: "alertDiscount-1",
                    sort: 3,
                    area: "body",
                    own:  null,
                    cont: null
                },
                {
                    code: "header-1",
                    sort: 4,
                    area: "bodyHeader",
                    own:  null,
                    cont: null
                },
                {
                    code: "header-2",
                    sort: 5,
                    area: "bodyHeader",
                    own:  null,
                    cont: null
                },
                {
                    code: "nav-1",
                    sort: 6,
                    area: "bodyHeader",
                    own:  null,
                    cont: null
                },
                {
                    code: "orderSure-1",
                    sort: 7,
                    area: "bodyCenter",
                    own:  null,
                    cont: null
                },
                {
                    code: "footer-1",
                    sort: 14,
                    area: "bodyFooter",
                    own:  null,
                    cont: null
                }
            ]
        },
        pay:           {
            seo: {
                title: "中国供销海外购--支付页面",
                keywords: "中国供销海外购,海淘网站,跨境购,母婴用品,进口商品,网上购物,保税区,跨境电商,跨境贸易",
                description: "中国供销海外购, 跨境电商, 跨境贸易, 提供丰富的正品海外商品, 欢迎广大顾客光临购买！"
            },
            page: "pay",
            file: "pay",
            path: '',
            region: '',
            system: "pcMall",
            module: [
                {
                    code: "message-1",
                    sort: 1,
                    area: "body",
                    own:  null,
                    cont: null
                },
                {
                    code: "alertDefault-1",
                    sort: 2,
                    area: "body",
                    own:  null,
                    cont: null
                },
                {
                    code: "alertDiscount-1",
                    sort: 3,
                    area: "body",
                    own:  null,
                    cont: null
                },
                {
                    code: "header-1",
                    sort: 4,
                    area: "bodyHeader",
                    own:  null,
                    cont: null
                },
                {
                    code: "header-2",
                    sort: 5,
                    area: "bodyHeader",
                    own:  null,
                    cont: null
                },
                {
                    code: "nav-1",
                    sort: 6,
                    area: "bodyHeader",
                    own:  null,
                    cont: null
                },
                {
                    code: "pay-1",
                    sort: 7,
                    area: "bodyCenter",
                    own:  null,
                    cont: null
                },
                {
                    code: "footer-1",
                    sort: 14,
                    area: "bodyFooter",
                    own:  null,
                    cont: null
                }
            ]
        },
        personal:      {
            seo: {
                title: "中国供销海外购--个人中心",
                keywords: "中国供销海外购,海淘网站,跨境购,母婴用品,进口商品,网上购物,保税区,跨境电商,跨境贸易",
                description: "中国供销海外购, 跨境电商, 跨境贸易, 提供丰富的正品海外商品, 欢迎广大顾客光临购买！"
            },
            page: "personal",
            file: 'personal.html',
            path: '',
            region: '',
            system: "pcMall",
            module: [
                {
                    code: "message-1",
                    sort: 1,
                    area: "body",
                    own:  null,
                    cont: null
                },
                {
                    code: "alertDefault-1",
                    sort: 2,
                    area: "body",
                    own:  null,
                    cont: null
                },
                {
                    code: "alertDiscount-1",
                    sort: 3,
                    area: "body",
                    own:  null,
                    cont: null
                },
                {
                    code: "header-1",
                    sort: 4,
                    area: "bodyHeader",
                    own:  null,
                    cont: null
                },
                {
                    code: "header-2",
                    sort: 5,
                    area: "bodyHeader",
                    own:  null,
                    cont: null
                },
                {
                    code: "nav-1",
                    sort: 6,
                    area: "bodyHeader",
                    own:  null,
                    cont: null
                },
                {
                    code: "personal-1",
                    sort: 7,
                    area: "bodyCenter",
                    own:  null,
                    cont: null
                },
                {
                    code: "footer-1",
                    sort: 8,
                    area: "bodyFooter",
                    own:  null,
                    cont: null
                }
            ]
        },
        search:        {
            seo: {
                title: "中国供销海外购--搜索页面",
                keywords: "中国供销海外购,海淘网站,跨境购,母婴用品,进口商品,网上购物,保税区,跨境电商,跨境贸易",
                description: "中国供销海外购, 跨境电商, 跨境贸易, 提供丰富的正品海外商品, 欢迎广大顾客光临购买！"
            },
            page: "search",
            file: 'search.html',
            path: '',
            region: '',
            system: "pcMall",
            module: [
                {
                    code: "message-1",
                    sort: 1,
                    area: "body",
                    own:  null,
                    cont: null
                },
                {
                    code: "alertDefault-1",
                    sort: 2,
                    area: "body",
                    own:  null,
                    cont: null
                },
                {
                    code: "alertDiscount-1",
                    sort: 3,
                    area: "body",
                    own:  null,
                    cont: null
                },
                {
                    code: "header-1",
                    sort: 4,
                    area: "bodyHeader",
                    own:  null,
                    cont: null
                },
                {
                    code: "header-2",
                    sort: 5,
                    area: "bodyHeader",
                    own:  null,
                    cont: null
                },
                {
                    code: "nav-1",
                    sort: 6,
                    area: "bodyHeader",
                    own:  null,
                    cont: null
                },
                {
                    code: "search-1",
                    sort: 7,
                    area: "bodyCenter",
                    own:  null,
                    cont: null
                },
                {
                    code: "footer-1",
                    sort: 8,
                    area: "bodyFooter",
                    own:  null,
                    cont: null
                }
            ]
        },
        shopCart:      {
            seo: {
                title: "中国供销海外购--购物车页面",
                keywords: "中国供销海外购,海淘网站,跨境购,母婴用品,进口商品,网上购物,保税区,跨境电商,跨境贸易",
                description: "中国供销海外购, 跨境电商, 跨境贸易, 提供丰富的正品海外商品, 欢迎广大顾客光临购买！"
            },
            page: "shopCart",
            file: "shopCart",
            path: '',
            region: '',
            system: "pcMall",
            module: [
                {
                    code: "message-1",
                    sort: 1,
                    area: "body",
                    own:  null,
                    cont: null
                },
                {
                    code: "alertDefault-1",
                    sort: 2,
                    area: "body",
                    own:  null,
                    cont: null
                },
                {
                    code: "alertDiscount-1",
                    sort: 3,
                    area: "body",
                    own:  null,
                    cont: null
                },
                {
                    code: "header-1",
                    sort: 4,
                    area: "bodyHeader",
                    own:  null,
                    cont: null
                },
                {
                    code: "header-2",
                    sort: 5,
                    area: "bodyHeader",
                    own:  null,
                    cont: null
                },
                {
                    code: "nav-1",
                    sort: 6,
                    area: "bodyHeader",
                    own:  null,
                    cont: null
                },
                {
                    code: "shopCart-1",
                    sort: 7,
                    area: "bodyCenter",
                    own:  null,
                    cont: null
                },
                {
                    code: "footer-1",
                    sort: 14,
                    area: "bodyFooter",
                    own:  null,
                    cont: null
                }
            ]
        },
        shopShow:      {
            seo: {
                title: "中国供销海外购--加入我们",
                keywords: "母婴加盟,进口商品加盟,海外购加盟,o2o加盟,新零售加盟,连锁加盟,区域加盟,美妆加盟,合伙人加盟,旗舰店加盟,跨境电商,母婴用品,县域加盟,供销e家进口商品,中国供销海外购加盟,整店输出",
                description: "母婴加盟,进口商品加盟,海外购加盟,o2o加盟,新零售加盟,连锁加盟,区域加盟,美妆加盟,合伙人加盟,旗舰店加盟,跨境电商,母婴用品,县域加盟,供销e家进口商品,中国供销海外购加盟,整店输出"
            },
            page: "shop-show",
            file: 'shop-show',
            path: '',
            region: '',
            system: "pcMall",
            module: [
                {
                    code: "message-1",
                    sort: 1,
                    area: "body",
                    own:  null,
                    cont: null
                },
                {
                    code: "alertDefault-1",
                    sort: 2,
                    area: "body",
                    own:  null,
                    cont: null
                },
                {
                    code: "alertDiscount-1",
                    sort: 3,
                    area: "body",
                    own:  null,
                    cont: null
                },
                {
                    code: "header-1",
                    sort: 4,
                    area: "bodyHeader",
                    own:  null,
                    cont: null
                },
                {
                    code: "header-2",
                    sort: 5,
                    area: "bodyHeader",
                    own:  null,
                    cont: null
                },
                {
                    code: "nav-1",
                    sort: 6,
                    area: "bodyHeader",
                    own:  null,
                    cont: null
                },
                {
                    code: "shop-show-1",
                    sort: 7,
                    area: "bodyCenter",
                    own:  null,
                    cont: null
                },
                {
                    code: "footer-1",
                    sort: 14,
                    area: "bodyFooter",
                    own:  null,
                    cont: null
                }
            ]
        },
        amountAccess:  {
            seo: {
                title: "中国供销海外购--品牌加盟",
                keywords: "母婴加盟,进口商品加盟,海外购加盟,o2o加盟,新零售加盟,连锁加盟,区域加盟,美妆加盟,合伙人加盟,旗舰店加盟,跨境电商,母婴用品,县域加盟,供销e家进口商品,中国供销海外购加盟,整店输出",
                description: "母婴加盟,进口商品加盟,海外购加盟,o2o加盟,新零售加盟,连锁加盟,区域加盟,美妆加盟,合伙人加盟,旗舰店加盟,跨境电商,母婴用品,县域加盟,供销e家进口商品,中国供销海外购加盟,整店输出"
            },
            page: "amount-access",
            file: 'amount-access',
            path: '',
            region: '',
            system: "pcMall",
            module: [
                {
                    code: "message-1",
                    sort: 1,
                    area: "body",
                    own:  null,
                    cont: null
                },
                {
                    code: "alertDefault-1",
                    sort: 2,
                    area: "body",
                    own:  null,
                    cont: null
                },
                {
                    code: "alertDiscount-1",
                    sort: 3,
                    area: "body",
                    own:  null,
                    cont: null
                },
                {
                    code: "header-1",
                    sort: 4,
                    area: "bodyHeader",
                    own:  null,
                    cont: null
                },
                {
                    code: "header-2",
                    sort: 5,
                    area: "bodyHeader",
                    own:  null,
                    cont: null
                },
                {
                    code: "nav-1",
                    sort: 6,
                    area: "bodyHeader",
                    own:  null,
                    cont: null
                },
                {
                    code: "amount-access-1",
                    sort: 7,
                    area: "bodyCenter",
                    own:  null,
                    cont: null
                },
                {
                    code: "footer-1",
                    sort: 14,
                    area: "bodyFooter",
                    own:  null,
                    cont: null
                }
            ]
        },
    };
    page?
        pages = [].concat(page):
        pages = Object.keys(dataObj);
    pages.forEach(function(name){
        dataObj[name] && datas.push(dataObj[name]);
    });
    datas.forEach(function(data){
        $.ajax({
            url: host + "/Page/handle",
            method: "POST",
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify(data),
            success:function(response){ console.log(response); },
            error:function(response){   console.log(response); }
        });
    });
}

/** 区域中心页面删除 */
function delPage(region, page) {
    var pages = [];
    var datas = [];
    var dataObj = {
        error:         {
            page: "error",
            file: 'error',
            path: '',
            region: '',
            system: "pcMall"
        },
        licence:       {
            page: "licence",
            file: 'licence',
            path: '',
            region: '',
            system: "pcMall"
        },
        login:         {
            page: "login",
            file: 'login',
            path: '',
            region: '',
            system: "pcMall"
        },
        orderDetail:   {
            page: "orderDetail",
            file: "orderDetail",
            path: '',
            region: '',
            system: "pcMall"
        },
        orderSure:     {
            page: "orderSure",
            file: "orderSure",
            path: '',
            region: '',
            system: "pcMall"
        },
        pay:           {
            page: "pay",
            file: "pay",
            path: '',
            region: '',
            system: "pcMall"
        },
        personal:      {
            page: "personal",
            file: 'personal.html',
            path: '',
            region: '',
            system: "pcMall"
        },
        search:        {
            page: "search",
            file: 'search.html',
            path: '',
            region: '',
            system: "pcMall"
        },
        shopCart:      {
            page: "shopCart",
            file: "shopCart",
            path: '',
            region: '',
            system: "pcMall"
        },
        shopShow:      {
            page: "shop-show",
            file: 'shop-show',
            path: '',
            region: '',
            system: "pcMall"
        },
        amountAccess:  {
            page: "amount-access",
            file: 'amount-access',
            path: '',
            region: '',
            system: "pcMall"
        }
    };
    page?
        pages = [].concat(page):
        pages = Object.keys(dataObj);
    pages.forEach(function(name){
        dataObj[name] && datas.push(dataObj[name]);
    });
    datas.forEach(function(data){
        $.ajax({
            url: host + "/Page/handle",
            method: "DELETE",
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify(data),
            success:function(response){ console.log(response); },
            error:function(response){   console.log(response); }
        });
    });
}