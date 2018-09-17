
//"http://front.cncoopbuy.com";
//"http://testfront.cncoopbuy.com";
var host = "http://front.cncoopbuy.com";

/** 区域中心商详页面渲染 */
function renderGoods(region) {
    var data = {
        modules: {
            'pcMall':  [
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
                    code: "goodsDetail-1",
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
            ],
            'mpMall':  [
                {
                    code: "message-1",
                    sort: 1,
                    area: "body",
                    own:  null,
                    cont: null
                },
                {
                    code: "alertDiscount-1",
                    sort: 2,
                    area: "body",
                    own:  null,
                    cont: null
                },
                {
                    code: "header-1",
                    sort: 3,
                    area: "bodyHeader",
                    own:  null,
                    cont: [{
                        title: 'Swisse'
                    }]
                },
                {
                    code: "prompt-1",
                    sort: 4,
                    area: "bodyCenter",
                    own:  null,
                    cont: null
                },
                {
                    code: "goodsDetail-1",
                    sort: 5,
                    area: "bodyCenter",
                    own:  null,
                    cont: null
                },
                {
                    code: "footer-1",
                    sort: 6,
                    area: "bodyFooter",
                    own:  null,
                    cont: null
                },
                {
                    code: "scrollTop-1",
                    sort: 7,
                    area: "body",
                    own:  null,
                    cont: null
                },
                {
                    code: "searchHistory-1",
                    sort: 8,
                    area: "body",
                    own:  null,
                    cont: null
                }
            ],
            'fmpMall': [
                {
                    code: "message-1",
                    sort: 1,
                    area: "body",
                    own:  null,
                    cont: null
                },
                {
                    code: "alertDiscount-1",
                    sort: 2,
                    area: "body",
                    own:  null,
                    cont: null
                },
                {
                    code: "header-1",
                    sort: 3,
                    area: "bodyHeader",
                    own:  null,
                    cont: [{
                        title: 'Swisse'
                    }]
                },
                {
                    code: "prompt-1",
                    sort: 4,
                    area: "bodyCenter",
                    own:  null,
                    cont: null
                },
                {
                    code: "goodsDetail-1",
                    sort: 5,
                    area: "bodyCenter",
                    own:  null,
                    cont: null
                },
                {
                    code: "footer-1",
                    sort: 6,
                    area: "bodyFooter",
                    own:  null,
                    cont: null
                },
                {
                    code: "scrollTop-1",
                    sort: 7,
                    area: "body",
                    own:  null,
                    cont: null
                },
                {
                    code: "searchHistory-1",
                    sort: 8,
                    area: "body",
                    own:  null,
                    cont: null
                }
            ]
        },
        systems: [
            'pcMall',
            'mpMall',
            'fmpMall'
        ]
    };
    $.ajax({
        url: host + "/Render/handle/goods",
        method: "POST",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(data),
        success:function(response){ console.log(response); },
        error:function(response){   console.log(response); }
    });
}