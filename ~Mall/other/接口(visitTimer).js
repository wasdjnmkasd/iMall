
//"http://front.cncoopbuy.com";
//"http://testfront.cncoopbuy.com";
var host = "http://front.cncoopbuy.com";


/** 启用访问记录定时器 */
function openTimer() {
    $.ajax({
        url: host + "/Data/handle/visit/timer",
        method: "POST",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify({}),
        success:function(response){ console.log(response); },
        error:function(response){ console.log(response); }
    });
}

/** 关闭访问记录定时器 */
function closeTimer() {
    $.ajax({
        url: host + "/Data/handle/visit/timer",
        method: "DELETE",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify({}),
        success:function(response){ console.log(response); },
        error:function(response){ console.log(response); }
    });
}

/** 启用访问记录定时器(一次性) */
function openOnceTimer() {
    $.ajax({
        url: host + "/Data/handle/visit/onceTimer",
        method: "POST",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify({date: '2018/08/24 ~ 2018/09/06', timer: '0 24 22 6 9 *' }),
        success:function(response){ console.log(response); },
        error:function(response){ console.log(response); }
    });
}