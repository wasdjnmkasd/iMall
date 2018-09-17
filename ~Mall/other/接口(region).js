
//"http://front.cncoopbuy.com";
//"http://testfront.cncoopbuy.com";
var host = "http://front.cncoopbuy.com";


/** 区域中心创建 */
function addRegion(region) {
    $.ajax({
        url: host + "/Region/handle",
        method: "POST",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify({
            region: region,
            gradeId: 2,
            domainName: 'http://www.cncoopbuy.com/',
            mDomainName: 'http://m.cncoopbuy.com/',
            fDomainName: 'http://fl.cncoopbuy.com/'
        }),
        success:function(response){ console.log(response); },
        error:function(response){ console.log(response); }
    });
}

/** 区域中心更新 */
function putRegion(region) {
    $.ajax({
        url: host + "/Region/handle",
        method: "PUT",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify({
            gradeId: 55,
            region: region,
            malls: ['fmpMall']
        }),
        success:function(response){ console.log(response); },
        error:function(response){ console.log(response); }
    });
}

/** 区域中心删除 */
function delRegion(region) {
    $.ajax({
        url: host + "/Region/handle",
        method: "DELETE",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify({region: region}),
        success:function(response){ console.log(response); },
        error:function(response){ console.log(response); }
    });
}