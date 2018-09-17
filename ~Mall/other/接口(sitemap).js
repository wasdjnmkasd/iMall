
//"http://front.cncoopbuy.com";
//"http://testfront.cncoopbuy.com";
var host = "http://front.cncoopbuy.com";

/** Sitemap 创建 */
function addSitemap(domain) {
    $.ajax({
        url: host + "/Sitemap/handle",
        method: "POST",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify({ domain: domain}),
        success:function(response){ console.log(response); },
        error:function(response){ console.log(response); }
    });
}

/** Sitemap 删除 */
function delSitemap(domain) {
    $.ajax({
        url: host + "/Sitemap/handle",
        method: "DELETE",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify({ domain: domain}),
        success:function(response){ console.log(response); },
        error:function(response){ console.log(response); }
    });
}