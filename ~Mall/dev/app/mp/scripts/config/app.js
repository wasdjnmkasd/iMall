
/** 初始化 --- 前端API
 *    @detail:     前端API
 *    @return:     无
 *    @author:    林鹏腾
 *    @date:      2018.05.16
 */
(function(API){

    "use strict";

    var each =            $.each;
    var ajax =            $.ajax;
    var when =            $.when;
    var extend =          $.extend;
    var Deferred =        $.Deferred;
    var isPureArray =     $.isArray;
    var isPureFunction =  $.isFunction;
    var isPlainObject =   $.isPlainObject;
    var isEmptyObject =   $.isEmptyObject;

    if(!API.jsUtil){
        Object.defineProperty(API, 'jsUtil', {
            configurable: false,
            enumerable: true,
            writable: false,
            value: {}
        });
    }
    if(!API.jsUtil.url){
        Object.defineProperty(API.jsUtil, 'url', {
            configurable: false,
            enumerable: true,
            writable: false,
            value: {
                getParam: function(name, cut){
                    var matchArr = null;
                    var newSearch = decodeURI(window.location.search);
                    var regex1 = new RegExp("(^|&|\\?)"+ name +"((=.*)|$)", "gi");
                    var regex2 = new RegExp("(^|&|\\?)"+ name +"((=[^&]*)|$)", "gi");
                    var regex3 = new RegExp("(^|&|\\?)"+ name +"(=|$)", "i");
                    if(cut){
                        for(var i=cut; i>0; i--){
                            matchArr = newSearch.match(regex1);
                            if(!matchArr){
                                break
                            }else{
                                newSearch = matchArr[0].replace(regex3,"");
                            }
                        }
                        return matchArr !== null? newSearch: "";
                    }else{
                        matchArr = newSearch.match(regex2);
                        return matchArr !== null? matchArr[0].replace(regex3,""): "";
                    }
                },
                setParam: function(obj, action, state){
                    var newObj = isPlainObject(obj)? obj: {};
                    var newState = state || { historyName: new Date() };
                    var protocol = decodeURI(window.location.protocol);
                    var pathname = decodeURI(window.location.pathname);
                    var search = decodeURI(window.location.search);
                    var host = decodeURI(window.location.host);
                    var hash = decodeURI(window.location.hash);
                    var newSearch = search;
                    if(isEmptyObject(newObj)){
                        newSearch.match("^\\?")?
                            newSearch = "?" + newSearch.substr(1).replace(/&{2,}/gi,"&").replace(/^&+|&+$/gi,""):
                            newSearch = "?";
                    }else{
                        each(newObj, function(name, value){
                            var param = (value !== null || value !== undefined)? name + "=" + value: name;
                            var reg = new RegExp("(^|&)"+ name +"((=[^&]*)|&|$)", "gi");
                            var matchArr = newSearch.substr(1).match(reg);
                            if(matchArr !== null){
                                matchArr[0][0] === "&"?
                                    newSearch = "?" + newSearch.replace(matchArr[0].substr(1), param).substr(1).replace(/&{2,}/gi,"&").replace(/^&+|&+$/gi,""):
                                    newSearch = "?" + newSearch.replace(matchArr[0], param).substr(1).replace(/&{2,}/gi,"&").replace(/^&+|&+$/gi,"");
                            }else {
                                newSearch.match("^\\?") ?
                                    newSearch = "?" + param + "&" + newSearch.substr(1).replace(/&{2,}/gi, "&").replace(/^&+|&+$/gi, ""):
                                    newSearch = "?" + param + "";
                            }
                        });
                    }
                    if(action === "cover"){
                        API.jsUtil.history.replaceState(newState, null, encodeURI(protocol+"//"+host+pathname.replace(/[^\/]+\/+$/gi,"")+newSearch+hash));
                    }else{
                        API.jsUtil.history.pushState(newState, null, encodeURI(protocol+"//"+host+pathname.replace(/[^\/]+\/+$/gi,"")+newSearch+hash));
                    }
                },
                delParam: function(arr, action, state){
                    var newArr = isPureArray(arr)? arr: [];
                    var newState = state || { historyName: new Date() };
                    var protocol = decodeURI(window.location.protocol);
                    var pathname = decodeURI(window.location.pathname);
                    var search = decodeURI(window.location.search);
                    var host = decodeURI(window.location.host);
                    var hash = decodeURI(window.location.hash);
                    var newSearch = search;
                    if(newArr.length === 0){
                        newSearch.match("^\\?")?
                            newSearch = "?" + newSearch.substr(1).replace(/&{2,}/gi,"&").replace(/^&+|&+$/gi,""):
                            newSearch = "?";
                    }else{
                        each(newArr, function(i, name){
                            var reg = new RegExp("(^|&)"+ name +"((=[^&]*)|&|$)", "gi");
                            var matchArr = newSearch.substr(1).match(reg);
                            if(matchArr !== null){
                                matchArr[0][0] === "&"?
                                    newSearch = "?" + newSearch.replace(matchArr[0].substr(1), "").substr(1).replace(/&{2,}/gi,"&").replace(/^&+|&+$/gi,""):
                                    newSearch = "?" + newSearch.replace(matchArr[0], "").substr(1).replace(/&{2,}/gi,"&").replace(/^&+|&+$/gi,"");
                            }
                        });
                    }
                    if(action === "cover"){
                        API.jsUtil.history.replaceState(newState, null, encodeURI(protocol+"//"+host+pathname.replace(/[^\/]+\/+$/gi,"")+newSearch+hash));
                    }
                    else{
                        API.jsUtil.history.pushState(newState, null, encodeURI(protocol+"//"+host+pathname.replace(/[^\/]+\/+$/gi,"")+newSearch+hash));
                    }
                },
                jumpPage: function(jumpUrl, defUrl, isBack){
                    if(jumpUrl){
                        if((/^https:\/\/.+|^http:\/\/.+/i).test(jumpUrl)){
                            if(isBack){
                                jumpUrl = jumpUrl.replace(/\/+/gi, '/').replace(/(^http:\/|^https:\/)/i, "$1/");
                                window.localStorage.setItem("replaceUrl", jumpUrl);
                                window.history.go(-1);
                            }else{
                                jumpUrl = jumpUrl.replace(/\/+/gi, '/').replace(/(^http:\/|^https:\/)/i, "$1/");
                                window.localStorage.setItem("replaceUrl", jumpUrl);
                                window.location.reload(true);
                            }
                        }else if(typeof jumpUrl === "number"){
                            if(isBack){
                                window.localStorage.removeItem("replaceUrl");
                                window.history.go(jumpUrl);
                            }else{
                                window.localStorage.removeItem("replaceUrl");
                                window.history.go(jumpUrl);
                            }
                        }else{
                            if(isBack){
                                jumpUrl = API.jsData.location.hostUrl + jumpUrl;
                                jumpUrl = jumpUrl.replace(/\/+/gi, '/').replace(/(^http:\/|^https:\/)/i, "$1/");
                                window.localStorage.setItem("replaceUrl", jumpUrl);
                                window.history.go(-1);
                            }else{
                                jumpUrl = API.jsData.location.hostUrl + jumpUrl;
                                jumpUrl = jumpUrl.replace(/\/+/gi, '/').replace(/(^http:\/|^https:\/)/i, "$1/");
                                window.localStorage.setItem("replaceUrl", jumpUrl);
                                window.location.reload(true);
                            }
                        }
                    }else if(defUrl){
                        if((/^https:\/\/.+|^http:\/\/.+/i).test(defUrl)){
                            if(isBack){
                                defUrl = defUrl.replace(/\/+/gi, '/').replace(/(^http:\/|^https:\/)/i, "$1/");
                                window.localStorage.setItem("replaceUrl", defUrl);
                                window.history.go(-1);
                            }else{
                                defUrl = defUrl.replace(/\/+/gi, '/').replace(/(^http:\/|^https:\/)/i, "$1/");
                                window.localStorage.setItem("replaceUrl", defUrl);
                                window.location.reload(true);
                            }
                        }else if(typeof defUrl === "number"){
                            if(isBack){
                                window.localStorage.removeItem("replaceUrl");
                                window.history.go(defUrl);
                            }else{
                                window.localStorage.removeItem("replaceUrl");
                                window.history.go(defUrl);
                            }
                        }else{
                            if(isBack){
                                defUrl = API.jsData.location.hostUrl + defUrl;
                                defUrl = defUrl.replace(/\/+/gi, '/').replace(/(^http:\/|^https:\/)/i, "$1/");
                                window.localStorage.setItem("replaceUrl", defUrl);
                                window.history.go(-1);
                            }else{
                                defUrl = API.jsData.location.hostUrl + defUrl;
                                defUrl = defUrl.replace(/\/+/gi, '/').replace(/(^http:\/|^https:\/)/i, "$1/");
                                window.localStorage.setItem("replaceUrl", defUrl);
                                window.location.reload(true);
                            }
                        }
                    }
                }
            }
        });
    }
    if(!API.jsUtil.path){
        Object.defineProperty(API.jsUtil, 'path', {
            configurable: false,
            enumerable: true,
            writable: false,
            value: {
                setParam: function(path, obj){
                    var hash = "";
                    var search = "";
                    var urlPath = "";
                    var end = path.indexOf("#");
                    var start = path.indexOf("?");
                    var newObj = isPlainObject(obj)? obj: {};
                    var newSearch = "";
                    if(start !== -1){
                        urlPath = path.substring(0, start);
                        search = end !== -1? path.substring(start, end): path.substring(start);
                        hash = end !== -1? path.substring(end): "";
                        newSearch = search;
                    }else{
                        urlPath = end !== -1? path.substring(0, end): path;
                        search = "";
                        hash = end !== -1? path.substring(end): "";
                        newSearch = search;
                    }
                    if(isEmptyObject(newObj)){
                        newSearch.match("^\\?")?
                            newSearch = "?" + newSearch.substr(1).replace(/&{2,}/gi,"&").replace(/^&+|&+$/gi,""):
                            newSearch = "?";
                    }else{
                        each(newObj, function(name, value){
                            var param = (value !== null || value !== undefined)? name + "=" + value: name;
                            var reg = new RegExp("(^|&)"+ name +"((=[^&]*)|&|$)", "gi");
                            var matchArr = newSearch.substr(1).match(reg);
                            if(matchArr !== null){
                                matchArr[0][0] === "&"?
                                    newSearch = "?" + newSearch.replace(matchArr[0].substr(1), param).substr(1).replace(/&{2,}/gi,"&").replace(/^&+|&+$/gi,""):
                                    newSearch = "?" + newSearch.replace(matchArr[0], param).substr(1).replace(/&{2,}/gi,"&").replace(/^&+|&+$/gi,"");
                            }else{
                                newSearch.match("^\\?")?
                                    newSearch = "?" + param + "&" + newSearch.substr(1).replace(/&{2,}/gi,"&").replace(/^&+|&+$/gi,""):
                                    newSearch = "?" + param + "";
                            }
                        });
                    }
                    return urlPath.replace(/\/+$/i,  "/") + newSearch + hash;
                },
                delParam: function(path, arr){
                    var hash = "";
                    var search = "";
                    var urlPath = "";
                    var end = path.indexOf("#");
                    var start = path.indexOf("?");
                    var newArr = isPureArray(arr)? arr: [];
                    var newSearch = "";
                    if(start !== -1){
                        urlPath = path.substring(0, start);
                        search = end !== -1? path.substring(start, end): path.substring(start);
                        hash = end !== -1? path.substring(end): "";
                        newSearch = search;
                    }else{
                        urlPath = end !== -1? path.substring(0, end): path;
                        search = "";
                        hash = end !== -1? path.substring(end): "";
                        newSearch = search;
                    }
                    if(newArr.length === 0){
                        newSearch.match("^\\?")?
                            newSearch = "?" + newSearch.substr(1).replace(/&{2,}/gi,"&").replace(/^&+|&+$/gi,""):
                            newSearch = "?";
                    }else{
                        each(newArr, function(i, name){
                            var reg = new RegExp("(^|&)"+ name +"((=[^&]*)|&|$)", "gi");
                            var matchArr = newSearch.substr(1).match(reg);
                            if(matchArr !== null){
                                matchArr[0][0] === "&"?
                                    newSearch = "?" + newSearch.replace(matchArr[0].substr(1), "").substr(1).replace(/&{2,}/gi,"&").replace(/^&+|&+$/gi,""):
                                    newSearch = "?" + newSearch.replace(matchArr[0], "").substr(1).replace(/&{2,}/gi,"&").replace(/^&+|&+$/gi,"");

                            }
                        });
                    }
                    return urlPath.replace(/\/+$/i,  "/") + newSearch + hash;
                },
                getParam: function(path, name, cut){
                    var newPath = "";
                    var matchArr = null;
                    var end = path.indexOf("#");
                    var start = path.indexOf("?");
                    var regex1 = new RegExp("(^|&|\\?)"+ name +"((=.*)|$)", "gi");
                    var regex2 = new RegExp("(^|&|\\?)"+ name +"((=[^&]*)|$)", "i");
                    var regex3 = new RegExp("(^|&|\\?)"+ name +"(=|$)", "i");
                    if(start !== -1){
                        newPath = end === -1?
                            path.substring(start+1):
                            path.substring(start+1,end);
                    }
                    if(cut){
                        for(var i=cut; i>0; i--){
                            matchArr = newPath.match(regex1);
                            if(!matchArr){
                                break
                            }else{
                                newPath = matchArr[0].replace(regex3,"");
                            }
                        }
                        return matchArr !== null? newPath: "";
                    }
                    else{
                        matchArr = newPath.match(regex2);
                        return matchArr !== null? matchArr[0].replace(regex3,""): "";
                    }
                }
            }
        });
    }
    if(!API.jsUtil.cookie){
        Object.defineProperty(API.jsUtil, 'cookie', {
            configurable: false,
            enumerable: true,
            writable: false,
            value: {
                get: function(key, func, opt){
                    var options = extend({}, opt);
                    var result = key? undefined: {};
                    var domCookie = document.cookie;
                    var cookies = domCookie? domCookie.split('; '): [];

                    var toParse = function (val) {
                        if (val.indexOf('"') === 0) {
                            val = val.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
                        }
                        try {
                            val = decodeURIComponent(val.replace(/\+/g, ' '));
                            return options.json? JSON.parse(val): val;
                        } catch(e) {}
                    };
                    var toDecode = function (val) { return options.raw? val: decodeURIComponent(val); };
                    var toReadVal = function (val, func) {
                        var value = options.raw? val: toParse(val);
                        return isPureFunction(func)? func(value): value;
                    };

                    for (var i=0, l = cookies.length; i < l; i++) {
                        var parts = cookies[i].split('=');
                        var name = toDecode(parts.shift());
                        var cookie = parts.join('=');

                        if (key === name) {
                            result = toReadVal(cookie, func);
                            break;
                        }
                    }

                    return result;
                },
                set: function(key, val, opt){
                    var options = extend({}, opt);
                    var toEncode = function (val) { return options.raw? val: encodeURIComponent(val); };
                    var stringify = function (val) { return options.json? JSON.stringify(val): String(val); };

                    if (typeof options.expires === 'number') {
                        var days = options.expires;
                        var t = options.expires = new Date();
                        t.setMilliseconds(t.getMilliseconds() + days * 864e+5);
                    }

                    return (document.cookie = [
                        toEncode(key), '=', toEncode(stringify(val)),
                        options.expires? '; expires=' + options.expires.toUTCString(): '',
                        options.path   ? '; path='    + options.path:   '',
                        options.domain ? '; domain='  + options.domain: '',
                        options.secure ? '; secure': ''
                    ].join(''));
                },
                remove: function(key, opt){
                    return this.set(key, '', extend({}, opt, { expires: -1 }));
                }
            }
        });
    }
    if(!API.jsUtil.history){
        Object.defineProperty(API.jsUtil, 'history', {
            configurable: false,
            enumerable: true,
            writable: false,
            value: {
                evHandle: {},
                pushState: function(state, title, url){
                    if('pushState' in window.history){
                        window.history.pushState(state, title, url);
                    }
                },
                replaceState: function(state, title, url){
                    if('replaceState' in window.history){
                        window.history.replaceState(state, title, url);
                    }
                },
                redirectHandle: function(code, handle, data){
                    var that = this;
                    var evHandle = that.evHandle;
                    var codeName = code && String(code);
                    var isFunction = isPureFunction(handle);
                    var handleData = isPlainObject(data)? data: {};
                    if(isFunction){
                        codeName && (evHandle[codeName] = handle);
                    }
                    if(!isFunction){
                        if(codeName){
                            isPureFunction(evHandle[codeName]) && evHandle[codeName](handleData);
                        }
                        if(!codeName){
                            for(codeName in evHandle){
                                isPureFunction(evHandle[codeName]) && evHandle[codeName](handleData) }
                        }
                    }
                }
            }
        });
    }
    if(!API.jsUtil.animation){
        Object.defineProperty(API.jsUtil, 'animation', {
            configurable: false,
            enumerable: true,
            writable: false,
            value: function(from, to, duration, easing, callback){

                (function(){
                    var lastTime = 0;
                    var vendors = ['webkit', 'moz', 'ms', 'o'];
                    if (!window.requestAnimationFrame) {
                        for(var x = 0; x < vendors.length; ++x) {
                            if (!window.cancelAnimationFrame) {
                                window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'];
                            }
                            if (!window.requestAnimationFrame) {
                                window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
                            }
                        }
                    }
                    if (!window.requestAnimationFrame) {
                        window.requestAnimationFrame = function(callback) {
                            var currTime = new Date().getTime();
                            var timeToCall = Math.max(0, 17 - (currTime - lastTime));
                            var timerId = window.setTimeout(function() { callback(); }, timeToCall);
                            var endTime = lastTime = currTime + timeToCall;
                            return timerId;
                        };
                    }
                    if (!window.cancelAnimationFrame) {
                        window.cancelAnimationFrame = function(id) { clearTimeout(id); };
                    }
                }());

                var isString = function(obj) {
                    return typeof obj === 'string';
                };
                var isNumber = function(obj) {
                    return typeof obj === 'number';
                };
                var isFunction = function (obj) {
                    return typeof obj === 'function';
                };
                var toSetOptions = function(obj) {
                    if (isFunction(obj)) {
                        options.callback = obj;
                    }
                    else if (toMillisecond(obj) !== -1) {
                        options.duration = toMillisecond(obj);
                    }
                    else if (isString(obj)) {
                        options.easing = obj;
                    }
                };
                var toMillisecond = function(obj) {
                    if (isNumber(obj)) {
                        return obj;
                    }
                    if (isString(obj)) {
                        if (/^\d+ms$/.test(obj)) { return 1 * obj.replace('ms', ''); }
                        if (/^\d+s$/.test(obj)) { return 1000 * obj.replace('ms', ''); }
                        if (/^\d+$/.test(obj)) { return +obj; }
                    }
                    return -1;
                };

                if (!isNumber(from) || !isNumber(to)) {
                    if (window.console) {
                        console.error('from和to两个参数必选且为数值');
                    }
                    return null;
                }

                var options = {
                    duration: 300,
                    easing: 'linear',
                    callback: function() {}
                };

                toSetOptions(easing);
                toSetOptions(duration);
                toSetOptions(callback);

                var start = 0;
                var runId = null;
                var compute = {
                    linear: function (t, b, c, d) {
                        return c * t / d + b;
                    },
                    quadEaseIn: function (t, b, c, d) {
                        return c * (t /= d) * t + b;
                    },
                    quadEaseOut: function (t, b, c, d) {
                        return -c * (t /= d) * (t - 2) + b;
                    },
                    quadEaseInOut: function (t, b, c, d) {
                        if ((t /= d / 2) < 1) return c / 2 * t * t + b;
                        if ((t /= d / 2) >= 1) return -c / 2 * ((--t) * (t - 2) - 1) + b;
                    },
                    cubicEaseIn: function (t, b, c, d) {
                        return c * (t /= d) * t * t + b;
                    },
                    cubicEaseOut: function (t, b, c, d) {
                        return c * ((t = t / d - 1) * t * t + 1) + b;
                    },
                    cubicEaseInOut: function (t, b, c, d) {
                        if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
                        if ((t /= d / 2) >= 1) return c / 2 * ((t -= 2) * t * t + 2) + b;
                    },
                    quartEaseIn: function (t, b, c, d) {
                        return c * (t /= d) * t * t * t + b;
                    },
                    quartEaseOut: function (t, b, c, d) {
                        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
                    },
                    quartEaseInOut: function (t, b, c, d) {
                        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
                        if ((t /= d / 2) >= 1) return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
                    },
                    quintEaseIn: function (t, b, c, d) {
                        return c * (t /= d) * t * t * t * t + b;
                    },
                    quintEaseOut: function (t, b, c, d) {
                        return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
                    },
                    quintEaseInOut: function (t, b, c, d) {
                        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
                        if ((t /= d / 2) >= 1) return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
                    },
                    sineEaseIn: function (t, b, c, d) {
                        return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
                    },
                    sineEaseOut: function (t, b, c, d) {
                        return c * Math.sin(t / d * (Math.PI / 2)) + b;
                    },
                    sineEaseInOut: function (t, b, c, d) {
                        return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
                    },
                    expoEaseIn: function (t, b, c, d) {
                        return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
                    },
                    expoEaseOut: function (t, b, c, d) {
                        return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
                    },
                    expoEaseInOut: function (t, b, c, d) {
                        if (t == 0) return b;
                        if (t == d) return b + c;
                        if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
                        if ((t /= d / 2) >= 1) return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
                    },
                    circEaseIn: function (t, b, c, d) {
                        return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
                    },
                    circEaseOut: function (t, b, c, d) {
                        return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
                    },
                    circEaseInOut: function (t, b, c, d) {
                        if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
                        if ((t /= d / 2) >= 1) return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
                    },
                    elasticEaseIn: function (t, b, c, d, a, p) {
                        var s;
                        if (t == 0) return b;
                        if ((t /= d) == 1) return b + c;
                        if (typeof p == "undefined") p = d * .3;
                        if (!a || a < Math.abs(c)) {
                            s = p / 4;
                            a = c;
                        } else {
                            s = p / (2 * Math.PI) * Math.asin(c / a);
                        }
                        return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
                    },
                    elasticEaseOut: function (t, b, c, d, a, p) {
                        var s;
                        if (t == 0) return b;
                        if ((t /= d) == 1) return b + c;
                        if (typeof p == "undefined") p = d * .3;
                        if (!a || a < Math.abs(c)) {
                            a = c;
                            s = p / 4;
                        } else {
                            s = p / (2 * Math.PI) * Math.asin(c / a);
                        }
                        return (a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
                    },
                    elasticEaseInOut: function (t, b, c, d, a, p) {
                        var s;
                        if (t == 0) return b;
                        if ((t /= d / 2) == 2) return b + c;
                        if (typeof p == "undefined") p = d * (.3 * 1.5);
                        if (!a || a < Math.abs(c)) {
                            a = c;
                            s = p / 4;
                        } else {
                            s = p / (2 * Math.PI) * Math.asin(c / a);
                        }
                        if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1 )) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
                        if (t >= 1) return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
                    },
                    backEaseIn: function (t, b, c, d, s) {
                        if (typeof s == "undefined") s = 1.70158;
                        return c * (t /= d) * t * ((s + 1) * t - s) + b;
                    },
                    backEaseOut: function (t, b, c, d, s) {
                        if (typeof s == "undefined") s = 1.70158;
                        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
                    },
                    backEaseInOut: function (t, b, c, d, s) {
                        if (typeof s == "undefined") s = 1.70158;
                        if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
                        if ((t /= d / 2) >= 1) return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
                    },
                    bounceEaseIn: function (t, b, c, d) {
                        return c - this.bounceEaseOut(d - t, 0, c, d) + b;
                    },
                    bounceEaseOut: function (t, b, c, d) {
                        if ((t /= d) < (1 / 2.75)) {
                            return c * (7.5625 * t * t) + b;
                        } else if (t < (2 / 2.75)) {
                            return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
                        } else if (t < (2.5 / 2.75)) {
                            return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
                        } else {
                            return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
                        }
                    },
                    bounceEaseInOut: function (t, b, c, d) {
                        if (t < d / 2) {
                            return this.bounceEaseIn(t * 2, 0, c, d) * .5 + b;
                        }
                        if (t >= d / 2){
                            return this.bounceEaseOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
                        }
                    }
                };
                var during = Math.ceil(options.duration / 17);
                var fnGetValue = compute[options.easing];

                if (!isFunction(fnGetValue)) {
                    console.error('没有找到名为"'+ options.easing +'"的动画算法');
                    return null;
                }

                var step = function() {
                    var value = fnGetValue(start, from, to - from, during);
                    if (++start <= during) {
                        options.callback(value, false);
                        runId = window.requestAnimationFrame(step);
                    } else {
                        options.callback(to, true);
                    }
                };

                step();

                return {
                    get: function(){ return runId; },
                    stop: function(force) { if(force) { start = 0; } window.cancelAnimationFrame(runId); },
                    start: function(force) { if(force) { start = 0; } window.requestAnimationFrame(step); }
                };

            }
        });
    }
    if(!API.jsUtil.location){
        Object.defineProperty(API.jsUtil, 'location', {
            configurable: false,
            enumerable: true,
            writable: false,
            value: {
                reload: function(bool){
                    return window.location.replace(bool === true);
                },
                replace: function(path){
                    return window.location.replace(path);
                }
            }
        });
    }
    if(!API.jsUtil.storage){
        Object.defineProperty(API.jsUtil, 'storage', {
            configurable: false,
            enumerable: true,
            writable: false,
            value: {
                getItem: function(name){
                    return window.localStorage.getItem(name);
                },
                delItem: function(name){
                    isPureArray(name)?
                        each(name, function(i, n){ window.localStorage.removeItem(n) }):
                        window.localStorage.removeItem(name);
                },
                setItem: function(name, value){
                    isPlainObject(name)?
                        each(name, function(k, v){ window.localStorage.setItem(k, v) }):
                        window.localStorage.setItem(name, value);
                }
            }
        });
    }
    if(!API.jsUtil.device){
        Object.defineProperty(API.jsUtil, 'device', {
            configurable: false,
            enumerable: true,
            writable: false,
            value: (function(){
                var deviceObj = {};
                var navigator = window.navigator;
                var userAgent = navigator.userAgent;

                var findCheck = function (val) {
                    return userAgent.toLowerCase().indexOf(val) !== -1;
                };
                var findMatch = function (arr) {
                    for (var i = 0; i < arr.length; i++) {
                        if(deviceObj[arr[i]]()) return arr[i];
                    }
                    return ''
                };

                deviceObj.ipod = function() { return findCheck('ipod') };
                deviceObj.ipad = function() { return findCheck('ipad') };
                deviceObj.meego = function() { return findCheck('meego') };

                deviceObj.fxos = function() { return (findCheck('mobile') || findCheck('tablet')) && findCheck(' rv:') };
                deviceObj.fxosPhone = function() { return deviceObj.fxos() && findCheck('mobile') };
                deviceObj.fxosTablet = function() { return deviceObj.fxos() && findCheck('tablet') };

                deviceObj.blackberry = function() {return findCheck('blackberry') || findCheck('bb10') || findCheck('rim') };
                deviceObj.blackberryPhone = function() { return deviceObj.blackberry() && !findCheck('tablet') };
                deviceObj.blackberryTablet = function() { return deviceObj.blackberry() && findCheck('tablet') };

                deviceObj.windows = function() { return findCheck('windows') };
                deviceObj.windowsPhone = function() { return deviceObj.windows() && findCheck('phone') };
                deviceObj.windowsTablet = function() { return deviceObj.windows() && (findCheck('touch') && !deviceObj.windowsPhone()) };

                deviceObj.android = function() { return !deviceObj.windows() && findCheck('android') };
                deviceObj.androidPhone = function() { return deviceObj.android() && findCheck('mobile') };
                deviceObj.androidTablet = function() { return deviceObj.android() && !findCheck('mobile') };

                deviceObj.iphone = function() { return !deviceObj.windows() && findCheck('iphone') };
                deviceObj.ios = function() { return deviceObj.iphone() || deviceObj.ipod() || deviceObj.ipad() };

                deviceObj.mobile = function() {
                    return (
                        deviceObj.ipod() ||
                        deviceObj.iphone() ||
                        deviceObj.windowsPhone() ||
                        deviceObj.androidPhone() ||
                        deviceObj.blackberryPhone() ||
                        deviceObj.fxosPhone() ||
                        deviceObj.meego()
                    )
                };

                deviceObj.tablet = function() {
                    return (
                        deviceObj.ipad() ||
                        deviceObj.androidTablet() ||
                        deviceObj.blackberryTablet() ||
                        deviceObj.windowsTablet() ||
                        deviceObj.fxosTablet()
                    )
                };

                deviceObj.desktop = function() {
                    return !deviceObj.tablet() && !deviceObj.mobile()
                };

                deviceObj.weChat = function() {
                    var matchResult = userAgent.toLowerCase().match(/MicroMessenger/i);
                    return !!matchResult && matchResult[0] === "micromessenger";
                };

                deviceObj.type = findMatch(['mobile', 'tablet', 'desktop']);
                deviceObj.os = findMatch([ 'ios', 'iphone', 'ipad', 'ipod', 'android', 'blackberry', 'windows', 'fxos', 'meego' ]);

                return deviceObj;
            })()
        });
    }
    if(!API.jsUtil.weChat){
        Object.defineProperty(API.jsUtil, 'weChat', {
            configurable: false,
            enumerable: true,
            writable: false,
            value: {
                browser: function(){
                    var userAgent = window.navigator.userAgent;
                    var matchResult = userAgent.toLowerCase().match(/MicroMessenger/i);
                    return !!matchResult && matchResult[0] === "micromessenger";
                },
                toPay: function(type, result, state){
                    function onBridgeReady(result){
                        var options = {
                            "appId" :      result.appId,      //公众号名称，由商户传入
                            "timeStamp":   result.timeStamp,  //时间戳，自1970年以来的秒数
                            "nonceStr" :   result.nonceStr,   //随机串
                            "package" :    result.package,
                            "signType" :   result.signType,   //微信签名方式:
                            "paySign" :    result.paySign     //微信签名
                        };
                        var payedFunc = function(result){
                            if(result.err_msg === "get_brand_wcpay_request:ok" ) {
                                isPlainObject(state) && isPureFunction(state.success) && state.success();
                            }
                            else if (result.err_msg === "get_brand_wcpay_request:cancel")  {
                                isPlainObject(state) && isPureFunction(state.cancel) && state.cancel();
                            }
                        };
                        WeixinJSBridge.invoke("getBrandWCPayRequest", options, payedFunc);
                    }
                    if(type === "JSAPI"){
                        if(typeof WeixinJSBridge === "undefined"){
                            if(document.addEventListener){
                                document.addEventListener('WeixinJSBridgeReady', function(){ onBridgeReady(result) }, false);
                            }else if (document.attachEvent){
                                document.attachEvent('WeixinJSBridgeReady',  function(){onBridgeReady(result)});
                                document.attachEvent('onWeixinJSBridgeReady',  function(){onBridgeReady(result)});
                            }
                        }
                        else{
                            onBridgeReady(result);
                        }
                    }
                }
            }
        });
    }
    if(!API.jsUtil.check){
        Object.defineProperty(API.jsUtil, 'check', {
            configurable: false,
            enumerable: true,
            writable: false,
            value: {
                phone: function(num){
                    return typeof num === "string" && num.trim() !== "" && (/^1(3|4|5|7|8)\d{9}$/gi).test(num);
                },
                zipCode: function(num){
                    return typeof num === "string" && num.trim() !== "" && (/^[0-9]{1}(\d){5}$/gi).test(num);
                },
                identity: function(num){
                    var pass = true;
                    var city = {
                        11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",
                        31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",
                        43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",
                        61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"
                    };
                    if(typeof num !== "string" || num.trim() === "" ){
                        pass = false;
                    }
                    else if(!((/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i).test(num))){
                        pass = false;
                    }
                    else if(!city[num.substring(0,2)]){
                        pass = false;
                    }else{
                        if(num.length === 18){
                            var newNum = num.split('');
                            var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
                            var parity = [ '1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2' ];
                            var sum = 0;
                            var ai = 0;
                            var wi = 0;
                            for (var i = 0; i < 17; i++)
                            {
                                ai = newNum[i];
                                wi = factor[i];
                                sum += ai * wi;
                            }
                            if(parity[sum % 11] !== newNum[17]){
                                pass = false;
                            }
                        }else{
                            pass = false;
                        }
                    }
                    return pass;
                },
                bankCard: function(num){
                    var newNum = "";
                    var sumNum = 0;
                    if(typeof num === "string" && num.trim()!=="" && (/^\d{16,19}/gi).test(num)){
                        for(var i=0; i<num.length; i++){
                            newNum = num.charAt(i) + newNum;
                        }
                        for(var k=0; k<newNum.length; k++){
                            var intVal = parseInt(newNum.charAt(k));
                            if(k%2){
                                sumNum += (intVal*2>9? intVal*2-9: intVal*2);
                            }else{
                                sumNum += intVal;
                            }
                        }
                        return sumNum%10 === 0;
                    }else{
                        return false;
                    }
                },
                chinaName: function(num){
                    return typeof num === "string" && num.trim() !== "" && (/^[\u4E00-\u9FA5]{2,}$|^[\u4E00-\u9FA5]{1,}(?:·[\u4E00-\u9FA5]{1,})+$/gi).test(num);
                }
            }
        });
    }

    var DB = API.init(API);

    if(!API.jsData){
        Object.defineProperty(API, 'jsData', {
            configurable: false,
            enumerable: true,
            writable: false,
            value: {}
        });
    }
    if(!API.jsData.platform){
        Object.defineProperty(API.jsData, 'platform', {
            configurable: false,
            enumerable: true,
            writable: false,
            value: {
                rule: {
                    crossOrder: { maxPrice: 2000 },
                    normalOrder: { minPrice: 500 }
                }
            }
        });
    }
    if(!API.jsData.location){
        Object.defineProperty(API.jsData, 'location', {
            configurable: false,
            enumerable: true,
            writable: false,
            value: {
                href: window.location.href,
                protocol: window.location.protocol,
                host: window.location.host,
                pathname: window.location.pathname,
                search: window.location.search,
                hostUrl: window.location.protocol + "//" + window.location.host + "/",
                pathUrl: window.location.pathname + window.location.search,
                redirect: window.location.href.split("#")[0]
            }
        });
    }
    if(!API.jsData.siteInfo){
        Object.defineProperty(API.jsData, 'siteInfo', {
            configurable: false,
            enumerable: true,
            writable: false,
            value: DB.siteInfo
        });
    }
    if(!API.jsData.userInfo){
        Object.defineProperty(API.jsData, 'userInfo', {
            configurable: false,
            enumerable: true,
            writable: false,
            value: {
                debug: DB.debug,
                shopId: DB.shopId,
                userId: DB.userId,
                authId: DB.authId,
                openId: DB.openId,
                gradeId: DB.gradeId,
                centerId: DB.centerId,
                isLogin: DB.isLogin
            }
        });
    }

    if(!API.jsModel){
        Object.defineProperty(API, 'jsModel', {
            configurable: false,
            enumerable: true,
            writable: false,
            value: {}
        });
    }
    if(!API.jsModel.host){
        Object.defineProperty(API.jsModel, 'host', {
            configurable: false,
            enumerable: true,
            writable: false,
            value: {
                path:          DB.debug === true? "https://testapi.cncoopbuy.com": "https://api.cncoopbuy.com",
                method:        "POST",
                context:       "",
                contType:      "application/x-www-form-urlencoded;charset=UTF-8",
                reqDataType:   "",
                reqHeader:     { 'authentication': DB.authId },
                dataType:      "",
                errFunc:       {},
                data:          {}
            }
        })
    }
    if(!API.jsModel.path){
        Object.defineProperty(API.jsModel, 'path', {
            configurable: false,
            enumerable: true,
            writable: false,
            value: {
                /** node环境接口
                 *    goodsDetail-1 模块数据    GOODS_ID_QUERY_NODE ------------ goodsId
                 *    nav-1         模块数据    GOODS_NAV_QUERY_NODE -----------
                 *    header-1      模块数据    PAGE_HEADER1_QUERY_NODE --------
                 *    header-2      模块数据    PAGE_HEADER2_QUERY_NODE --------
                 *    goods         返佣数据    GOODS_REBATE_QUERY_REDIS ------- { goodsId: { itemId: {} } }
                 *    grade         grade信息  GRADE_GRADEBO_QUERY_REDIS ------- gradeId
                 *    visit_json    访问统计    VISIT_JSON_CREATE_NODE ---------- shopId
                 */
                GOODS_ID_QUERY_NODE:       {
                    host:         DB.debug === true? "https://test.cncoopbuy.com": "https://m.cncoopbuy.com",
                    path:         "/data/goods/{goodsId}d.json",
                    method:       "GET",
                    context:      "",
                    contType:     "application/x-www-form-urlencoded;charset=UTF-8",
                    reqDataType:  "",
                    reqHeader:    { authentication: null },
                    dataType:     "",
                    errFunc:      {},
                    data:         { centerId: DB.centerId }
                },
                GOODS_NAV_QUERY_NODE:      {
                    host:         DB.debug === true? "https://test.cncoopbuy.com": "https://m.cncoopbuy.com",
                    path:         "/data/nav/1p.json",
                    method:       "GET",
                    context:      "",
                    contType:     "application/x-www-form-urlencoded;charset=UTF-8",
                    reqDataType:  "",
                    reqHeader:    { authentication: null },
                    dataType:     "",
                    errFunc:      {},
                    data:         { centerId: DB.centerId }
                },
                PAGE_HEADER1_QUERY_NODE:   {
                    host:         DB.debug === true? "https://test.cncoopbuy.com": "https://m.cncoopbuy.com",
                    path:         "/data/header/1p.json",
                    method:       "GET",
                    context:      "",
                    contType:     "application/x-www-form-urlencoded;charset=UTF-8",
                    reqDataType:  "",
                    reqHeader:    { authentication: null },
                    dataType:     "",
                    errFunc:      {},
                    data:         { centerId: DB.centerId }
                },
                PAGE_HEADER2_QUERY_NODE:   {
                    host:         DB.debug === true? "https://test.cncoopbuy.com": "https://m.cncoopbuy.com",
                    path:         "/data/header/2p.json",
                    method:       "GET",
                    context:      "",
                    contType:     "application/x-www-form-urlencoded;charset=UTF-8",
                    reqDataType:  "",
                    reqHeader:    { authentication: null },
                    dataType:     "",
                    errFunc:      {},
                    data:         { centerId: DB.centerId }
                },
                GOODS_REBATE_QUERY_REDIS:  {
                    host:         DB.debug === true? "https://testfront.cncoopbuy.com": "https://front.cncoopbuy.com",
                    path:         "/Redis/handle/rebate",
                    method:       "POST",
                    context:      "",
                    contType:     "application/json;charset=UTF-8",
                    reqDataType:  "json",
                    reqHeader:    { authentication: null },
                    dataType:     "",
                    errFunc:      {},
                    data:         {}
                },
                GRADE_GRADEBO_QUERY_REDIS:  {
                    host:         DB.debug === true? "https://testfront.cncoopbuy.com": "https://front.cncoopbuy.com",
                    path:         "/Redis/handle/gradeBO",
                    method:       "POST",
                    context:      "",
                    contType:     "application/json;charset=UTF-8",
                    reqDataType:  "json",
                    reqHeader:    { authentication: null },
                    dataType:     "",
                    errFunc:      {},
                    data:         { shopId: DB.shopId || DB.gradeId }
                },
                VISIT_JSON_CREATE_NODE:  {
                    host:         DB.debug === true? "https://testfront.cncoopbuy.com": "https://front.cncoopbuy.com",
                    path:         "/Data/handle/visit/json",
                    method:       "POST",
                    context:      "",
                    contType:     "application/json;charset=UTF-8",
                    reqDataType:  "json",
                    reqHeader:    { authentication: null },
                    dataType:     "",
                    errFunc:      {},
                    data:         { shopId: DB.shopId || DB.gradeId || DB.centerId }
                },


                /** 页面模块接口
                 *     模块布局:     PAGE_MODULAR ------- centerId、page、pageType、id
                 *     模块和数据:   PAGE_MODULARDATA --- centerId、page、pageType
                 *     分类模块：    PAGE_NAVIGATION ---- centerId
                 */
                PAGE_MODULAR:         {
                    host:         "",
                    path:         "/goodscenter/auth/1.0/goods/modular/{centerId}/{page}/{pageType}",
                    method:       "GET",
                    context:      "",
                    contType:     "application/x-www-form-urlencoded;charset=UTF-8",
                    reqDataType:  "",
                    reqHeader:    { authentication: null },
                    dataType:     "",
                    errFunc:      {},
                    data:         { centerId: DB.centerId }
                },
                PAGE_MODULARDATA:     {
                    host:         "",
                    path:         "/goodscenter/auth/1.0/goods/modulardata/{centerId}/{page}/{pageType}",
                    method:       "POST",
                    context:      "",
                    contType:     "application/json;charset=UTF-8",
                    reqDataType:  "json",
                    reqHeader:    { authentication: null },
                    dataType:     "",
                    errFunc:      {},
                    data:         { centerId: DB.centerId }
                },
                PAGE_NAVIGATION:      {
                    host:         "",
                    path:         "/goodscenter/auth/1.0/goods/navigation",
                    method:       "GET",
                    context:      "",
                    contType:     "application/x-www-form-urlencoded;charset=UTF-8",
                    reqDataType:  "",
                    reqHeader:    { authentication: null },
                    dataType:     "",
                    errFunc:      {},
                    data:         { centerId: DB.centerId }
                },


                /** 第三方手机接口
                 *    获取手机验证码： THIRD_PHONE ---------- iphone
                 *    核对手机验证码： THIRD_PHONE_VERIFY --- iphone...
                 */
                THIRD_PHONE:          {
                    host:         "",
                    path:         "/3rdcenter/auth/1.0/third-part/phone",
                    method:       "POST",
                    context:      "",
                    contType:     "application/x-www-form-urlencoded;charset=UTF-8",
                    reqDataType:  "",
                    reqHeader:    { authentication: null },
                    dataType:     "",
                    errFunc:      {},
                    data:         {}
                },
                THIRD_PHONE_VERIFY:   {
                    host:         "",
                    path:         "/3rdcenter/auth/1.0/third-part/phoneVerify",
                    method:       "POST",
                    context:      "",
                    contType:     "application/x-www-form-urlencoded;charset=UTF-8",
                    reqDataType:  "",
                    reqHeader:    { authentication: null },
                    dataType:     "",
                    errFunc:      {},
                    data:         {}
                },


                /** 第三方微信接口
                 *    微信接口：    THIRD_WECHAT ----------- centerId、loginType、userType、redirectUrl
                 *    微信登陆：    THIRD_WECHAT_LOGIN ----- code、state
                 *    微信CONFIG： THIRD_WECHAT_CONFIG ---- centerId、url
                 */
                THIRD_WECHAT:        {
                    host:         "",
                    path:         "/3rdcenter/auth/1.0/user/3rdLogin/wx",
                    method:       "POST",
                    context:      "",
                    contType:     "application/json;charset=UTF-8",
                    reqDataType:  "json",
                    reqHeader:    { authentication: null },
                    dataType:     "",
                    errFunc:      {},
                    data:         { centerId: DB.centerId }
                },
                THIRD_WECHAT_LOGIN:  {
                    host:         "",
                    path:         "/3rdcenter/auth/1.0/user/3rdLogin/wxLogin",
                    method:       "GET",
                    context:      "",
                    contType:     "application/x-www-form-urlencoded;charset=UTF-8",
                    reqDataType:  "",
                    reqHeader:    { authentication: null },
                    dataType:     "",
                    errFunc:      {},
                    data:         {}
                },
                THIRD_WECHAT_CONFIG:  {
                    host:         "",
                    path:         "/3rdcenter/auth/1.0/wxshare/{centerId}",
                    method:       "GET",
                    context:      "",
                    contType:     "application/x-www-form-urlencoded;charset=UTF-8",
                    reqDataType:  "",
                    reqHeader:    { authentication: null },
                    dataType:     "",
                    errFunc:      {},
                    data:         { centerId: DB.centerId }
                },


                /** 第三方物流接口
                 *    查看物流信息： THIRD_LOGISTICS -------- carrierName、expressId
                 */
                THIRD_LOGISTICS:        {
                    host:         "",
                    path:         "/3rdcenter/1.0/express/getRoute",
                    method:       "GET",
                    context:      "",
                    contType:     "application/x-www-form-urlencoded;charset=UTF-8",
                    reqDataType:  "",
                    reqHeader:    {},
                    dataType:     "",
                    errFunc:      {},
                    data:         {}
                },


                /** 认证接口
                 *   认证注册:     AUTH_REGISTER ------  phone、password、userCenterId、loginType、platUserType、invitationCode
                 *   认证登陆:     AUTH_LOGIN ---------  platUserType、loginType、phone、password
                 *   认证核对:     AUTH_CHECK ---------  userName、phone、loginType
                 *   认证密码更改:  AUTH_PWD_CHANGE ----  userName、password、platUserType
                 */
                AUTH_REGISTER:        {
                    host:         "",
                    path:         "/authcenter/auth/register",
                    method:       "POST",
                    context:      "",
                    contType:     "application/json;charset=UTF-8",
                    reqDataType:  "json",
                    reqHeader:    { authentication: null },
                    dataType:     "",
                    errFunc:      {},
                    data:         {}
                },
                AUTH_LOGIN:           {
                    host:         "",
                    path:         "/authcenter/auth/login",
                    method:       "POST",
                    context:      "",
                    contType:     "application/json;charset=UTF-8",
                    reqDataType:  "json",
                    reqHeader:    { authentication: null },
                    dataType:     "",
                    errFunc:      {},
                    data:         {}
                },
                AUTH_CHECK:           {
                    host:         "",
                    path:         "/authcenter/auth/check",
                    method:       "POST",
                    context:      "",
                    contType:     "application/json;charset=UTF-8",
                    reqDataType:  "json",
                    reqHeader:    { authentication: null },
                    dataType:     "",
                    errFunc:      {},
                    data:         {}
                },
                AUTH_PWD_CHANGE:      {
                    host:         "",
                    path:         "/authcenter/auth/modifyPwd?code={code}",
                    method:       "POST",
                    context:      "",
                    contType:     "application/json;charset=UTF-8",
                    reqDataType:  "json",
                    reqHeader:    { authentication: null },
                    dataType:      "",
                    errFunc:      {},
                    data:         {}
                },

                /** 用户接口
                 *    微店域名查询：   USER_MOBILEURL_QUERY ------ shopId
                 *    推手绑定店铺:    USER_BINGSHOP_QUERY ------- userId
                 *    推手信息查询：   USER_PUSHUSER_ID_QUERY ---- id
                 *    售货推手数量:    USER_PUSHUSER_COUNT ------- shopId
                 *    推手列表查询：   USER_PUSHUSER_QUERY ------- centerId、gradeId
                 *    申请推手接口：   USER_PUSHUSER_CREATE ------ phone、name、gradeId、inviter、specialtyChannel、type
                 *    清退推手接口：   USER_PUSHUSER_ID_DELETE --- id
                 *    核对推手接口：   USER_PUSHUSER_CHECK ------- phone、gradeId
                 *    审核推手接口：   USER_PUSHUSER_AUDIT ------- id、pass
                 *    选择店铺查询：   USER_CHOOSESHOP_QUERY --- level、name
                 *    绑定邀请码接口： USER_INVITERCODE_BIND ---- centerId、invitationCode
                 *    检验邀请码接口： USER_INVITERINFO_CHECK --- centerId, userId
                 *    店铺信息接口：   USER_SHOPINFO_QUERY ----- centerId、shopId、userId
                 *    用户注册接口：   USER_REGISTRATION  ------ centerId、phone、pwd、code、userType、loginType、shopId
                 *    新建用户地址：   USER_ADDRESS_CREATE ----- centerId、userId、province、city、address、setDefault、receivePhone、receiveName
                 *    更新用户地址：   USER_ADDRESS_UPDATE ----- centerId、userId、id、province、city、address、setDefault、receivePhone、receiveName
                 *    删除用户地址：   USER_ADDRESS_DELETE ----- centerId、userId、id
                 *    查询用户地址：   USER_ADDRESS_QUERY  ----- centerId、userId
                 *    新建用户详情：   USER_DETAIL_CREATE ------ centerId、userId、headImg、nickName、sex、location、company
                 *    更新用户详情：   USER_DETAIL_UPDATE  ----- centerId、userId、headImg、nickName、sex、location、company
                 *    查询用户详情：   USER_DETAIL_QUERY   ----- centerId、userId
                 */
                USER_MOBILEURL_QUERY:     {
                    host:         "",
                    path:         "/usercenter/1.0/getMobileUrl/{shopId}",
                    method:       "get",
                    context:      "",
                    contType:     "application/x-www-form-urlencoded;charset=UTF-8",
                    reqDataType:  "",
                    reqHeader:    {},
                    dataType:     "",
                    errFunc:      {},
                    data:         { shopId: DB.shopId || DB.gradeId }
                },
                USER_BINGSHOP_QUERY:      {
                    host:         "",
                    path:         "/usercenter/1.0/listBindingGrade/{userId}",
                    method:       "get",
                    context:      "",
                    contType:     "application/x-www-form-urlencoded;charset=UTF-8",
                    reqDataType:  "",
                    reqHeader:    {},
                    dataType:     "",
                    errFunc:      {},
                    data:         { userId: DB.userId }
                },
                USER_PUSHUSER_ID_QUERY:   {
                    host:         "",
                    path:         "/usercenter/1.0/getPushUser/{id}",
                    method:       "get",
                    context:      "",
                    contType:     "application/x-www-form-urlencoded;charset=UTF-8",
                    reqDataType:  "",
                    reqHeader:    {},
                    dataType:     "",
                    errFunc:      {},
                    data:         {}
                },
                USER_PUSHUSER_COUNT:      {
                    host:         "",
                    path:         "/usercenter/1.0/pushUserOrderCount/{shopId}",
                    method:       "post",
                    context:      "",
                    contType:     "application/json;charset=UTF-8",
                    reqDataType:  "json",
                    reqHeader:    {},
                    dataType:     "",
                    errFunc:      {},
                    data:         { shopId: DB.shopId || DB.gradeId }
                },
                USER_PUSHUSER_QUERY:      {
                    host:         "",
                    path:         "/usercenter/1.0/listPushUser/{gradeId}",
                    method:       "get",
                    context:      "",
                    contType:     "application/x-www-form-urlencoded;charset=UTF-8",
                    reqDataType:  "",
                    reqHeader:    {},
                    dataType:     "",
                    errFunc:      {},
                    data:         { centerId: DB.centerId, gradeId: DB.shopId || DB.gradeId }
                },
                USER_PUSHUSER_CREATE:     {
                    host:         "",
                    path:         "/usercenter/auth/1.0/pushuser/register/{code}",
                    method:       "post",
                    context:      "",
                    contType:     "application/json;charset=UTF-8",
                    reqDataType:  "json",
                    reqHeader:    { authentication: null },
                    dataType:     "",
                    errFunc:      {},
                    data:         {}
                },
                USER_PUSHUSER_ID_DELETE:  {
                    host:         "",
                    path:         "/usercenter/1.0/repayingPush/{id}",
                    method:       "post",
                    context:      "",
                    contType:     "application/json;charset=UTF-8",
                    reqDataType:  "",
                    reqHeader:    {},
                    dataType:     "",
                    errFunc:      {},
                    data:         {}
                },
                USER_PUSHUSER_CHECK:      {
                    host:         "",
                    path:         "/usercenter/auth/1.0/pushUserVerify/{phone}",
                    method:       "get",
                    context:      "",
                    contType:     "application/x-www-form-urlencoded;charset=UTF-8",
                    reqDataType:  "",
                    reqHeader:    {},
                    dataType:     "",
                    errFunc:      {},
                    data:         {}
                },
                USER_PUSHUSER_AUDIT:      {
                    host:         "",
                    path:         "/usercenter/1.0/pushuser/audit",
                    method:       "post",
                    context:      "",
                    contType:     "application/x-www-form-urlencoded;charset=UTF-8",
                    reqDataType:  "",
                    reqHeader:    {},
                    dataType:     "",
                    errFunc:      {},
                    data:         {}
                },
                USER_CHOOSESHOP_QUERY:    {
                    host:         "",
                    path:         "/usercenter/auth/1.0/grade/fuzzy-search",
                    method:       "POST",
                    context:      "",
                    contType:     "application/json;charset=UTF-8",
                    reqDataType:  "json",
                    reqHeader:    {},
                    dataType:     "",
                    errFunc:      {},
                    data:         { centerId: DB.centerId,  level: 3 }
                },
                USER_SHOPINFO_QUERY:      {
                    host:         "",
                    path:         "/usercenter/auth/1.0/grade/config/{centerId}",
                    method:       "GET",
                    context:      "",
                    contType:     "application/x-www-form-urlencoded;charset=UTF-8",
                    reqDataType:  "",
                    reqHeader:    { authentication: null },
                    dataType:     "",
                    errFunc:      {},
                    data:         (DB.shopId || DB.gradeId)? { centerId: DB.centerId, shopId: DB.shopId || DB.gradeId }: { centerId: DB.centerId, userId: DB.userId }
                },
                USER_INVITERCODE_BIND:     {
                    host:         "",
                    path:         "/usercenter/1.0/user/bindInviterCode",
                    method:       "POST",
                    context:      "",
                    contType:     "application/json;charset=UTF-8",
                    reqDataType:  "json",
                    reqHeader:    {},
                    dataType:     "",
                    errFunc:      {},
                    data:         { centerId: DB.centerId }
                },
                USER_INVITERINFO_CHECK:     {
                    host:         "",
                    path:         "/usercenter/1.0/user/checkInviterInfo",
                    method:       "POST",
                    context:      "",
                    contType:     "application/json;charset=UTF-8",
                    reqDataType:  "json",
                    reqHeader:    {},
                    dataType:     "",
                    errFunc:      {},
                    data:         { centerId: DB.centerId }
                },
                USER_REGISTRATION:        {
                    host:         "",
                    path:         "/usercenter/auth/1.0/user/register/{code}",
                    method:       "POST",
                    context:      "",
                    contType:     "application/json;charset=UTF-8",
                    reqDataType:  "json",
                    reqHeader:    { authentication: null },
                    dataType:     "",
                    errFunc:      {},
                    data:         { centerId: DB.centerId, shopId: DB.shopId || DB.gradeId }
                },
                USER_ADDRESS_CREATE:      {
                    host:         "",
                    path:         "/usercenter/1.0/user/address",
                    method:       "POST",
                    context:      "",
                    contType:     "application/json;charset=UTF-8",
                    reqDataType:  "json",
                    reqHeader:    {},
                    dataType:     "",
                    errFunc:      {},
                    data:         { centerId: DB.centerId, userId: DB.userId }
                },
                USER_ADDRESS_UPDATE:      {
                    host:         "",
                    path:         "/usercenter/1.0/user/address",
                    method:       "PUT",
                    context:      "",
                    contType:     "application/json;charset=UTF-8",
                    reqDataType:  "json",
                    reqHeader:    {},
                    dataType:     "",
                    errFunc:      {},
                    data:         { centerId: DB.centerId, userId: DB.userId }
                },
                USER_ADDRESS_DELETE:      {
                    host:         "",
                    path:         "/usercenter/1.0/user/address/{userId}/{id}",
                    method:       "DELETE",
                    context:      "",
                    contType:     "application/x-www-form-urlencoded;charset=UTF-8",
                    reqDataType:  "",
                    reqHeader:    {},
                    dataType:     "",
                    errFunc:      {},
                    data:         { centerId: DB.centerId, userId: DB.userId }
                },
                USER_ADDRESS_QUERY:       {
                    host:         "",
                    path:         "/usercenter/1.0/user/address/{userId}",
                    method:       "GET",
                    context:      "",
                    contType:     "application/x-www-form-urlencoded;charset=UTF-8",
                    reqDataType:  "",
                    reqHeader:    {},
                    dataType:     "",
                    errFunc:      {},
                    data:         { centerId: DB.centerId, userId: DB.userId }
                },
                USER_DETAIL_CREATE:       {
                    host:         "",
                    path:         "/usercenter/1.0/user/userDetail",
                    method:       "POST",
                    context:      "",
                    contType:     "application/json;charset=UTF-8",
                    reqDataType:  "json",
                    reqHeader:    {},
                    dataType:     "",
                    errFunc:      {},
                    data:         { centerId: DB.centerId, userId: DB.userId }
                },
                USER_DETAIL_UPDATE:       {
                    host:         "",
                    path:         "/usercenter/1.0/user/userDetail",
                    method:       "PUT",
                    context:      "",
                    contType:     "application/json;charset=UTF-8",
                    reqDataType:  "json",
                    reqHeader:    {},
                    dataType:     "",
                    errFunc:      {},
                    data:         { centerId: DB.centerId, userId: DB.userId }
                },
                USER_DETAIL_QUERY:        {
                    host:         "",
                    path:         "/usercenter/1.0/user/{centerId}/{userId}",
                    method:       "GET",
                    context:      "",
                    contType:     "application/x-www-form-urlencoded;charset=UTF-8",
                    reqDataType:  "",
                    reqHeader:    {},
                    dataType:     "",
                    errFunc:      {},
                    data:         {  centerId: DB.centerId, userId: DB.userId }
                },

                /** 商品接口
                 *    搜索商品接口:           GOODS_BASE_QUERY ------ sortList、searchModel、pagination
                 *    搜索商品(根据goodsId):  GOODS_ID_QUERY -------- goodsId、userId(可选)
                 *    搜索商品储存路径         GOODS_PATH_QUERY ------ goodsId
                 *    搜索单个商品库存         GOODS_STOCK_QUERY ----- centerId、goodsId
                 *    获取单个商品规格:        GOODS_SPEC_QUERY ------ centerId、itemId
                 *    获取多个商品规格:        GOODS_SPECS_QUERY ----- centerId
                 *    获取活动商品接口:        GOODS_ACTIVE_QUERY ---- centerId、typeStatus、type
                 *    创建lucene接口：        GOODS_LUCENE_CREATE --- centerId
                 */
                GOODS_BASE_QUERY:      {
                    host:         "",
                    path:         "/goodscenter/auth/1.0/goods/base",
                    method:       "GET",
                    context:      "",
                    contType:     "application/x-www-form-urlencoded;charset=UTF-8",
                    reqDataType:  "",
                    reqHeader:    { authentication: null },
                    dataType:     "",
                    errFunc:      {},
                    data:         { centerId: DB.centerId }
                },
                GOODS_ID_QUERY:        {
                    host:         "",
                    path:         "/goodscenter/auth/1.0/{centerId}/goods",
                    method:       "GET",
                    context:      "",
                    contType:     "application/x-www-form-urlencoded;charset=UTF-8",
                    reqDataType:  "",
                    reqHeader:    { authentication: null },
                    dataType:     "",
                    errFunc:      {},
                    data:         DB.userId? { centerId: DB.centerId, userId : DB.userId }: { centerId: DB.centerId }
                },
                GOODS_PATH_QUERY:        {
                    host:         "",
                    path:         "/goodscenter/auth/1.0/goods/access-path/?goodsId={{goodsId}}&itemId={{itemId}}",
                    method:       "GET",
                    context:      "",
                    contType:     "application/x-www-form-urlencoded;charset=UTF-8",
                    reqDataType:  "",
                    reqHeader:    { authentication: null },
                    dataType:     "",
                    errFunc:      {},
                    data:         { centerId: DB.centerId }
                },
                GOODS_STOCK_QUERY:        {
                    host:         "",
                    path:         "/goodscenter/auth/1.0/goods/stock/{centerId}/{goodsId}",
                    method:       "GET",
                    context:      "",
                    contType:     "application/x-www-form-urlencoded;charset=UTF-8",
                    reqDataType:  "",
                    reqHeader:    { authentication: null },
                    dataType:     "",
                    errFunc:      {},
                    data:         { centerId: DB.centerId }
                },
                GOODS_SPEC_QUERY:      {
                    host:         "",
                    path:         "/goodscenter/auth/1.0/goods/goodsSpecs/{centerId}/{itemId}",
                    method:       "GET",
                    context:      "",
                    contType:     "application/x-www-form-urlencoded;charset=UTF-8",
                    reqDataType:  "",
                    reqHeader:    { authentication: null },
                    dataType:     "",
                    errFunc:      {},
                    data:         { centerId: DB.centerId }
                },
                GOODS_SPECS_QUERY:     {
                    host:         "",
                    path:         "/goodscenter/auth/1.0/goods/goodsSpecs",
                    method:       "GET",
                    context:      "",
                    contType:     "application/x-www-form-urlencoded;charset=UTF-8",
                    reqDataType:  "",
                    reqHeader:    { authentication: null },
                    dataType:     "",
                    errFunc:      {},
                    data:         { centerId: DB.centerId }
                },
                GOODS_ACTIVE_QUERY:    {
                    host:         "",
                    path:         "/goodscenter/auth/1.0/goods/active",
                    method:       "GET",
                    context:      "",
                    contType:     "application/x-www-form-urlencoded;charset=UTF-8",
                    reqDataType:  "",
                    reqHeader:    { authentication: null },
                    dataType:     "",
                    errFunc:      {},
                    data:         { centerId: DB.centerId }
                },
                GOODS_LUCENE_CREATE:   {
                    host:         "",
                    path:         "/goodscenter/1.0/goods/createlucene",
                    method:       "GET",
                    context:      "",
                    contType:     "application/x-www-form-urlencoded;charset=UTF-8",
                    reqDataType:  "",
                    reqHeader:    {},
                    dataType:     "",
                    errFunc:      {},
                    data:         { centerId: DB.centerId }
                },

                /** 订单接口
                 *    创建用户订单： ORDER_USER_CREATE ----------- centerId、userId、info、pagination、createType、type、 shopId
                 *    删除用户订单： ORDER_USER_DELETE ----------- centerId、userId、orderId
                 *    取消用户订单： ORDER_USER_CANCEL ----------- centerId、userId、orderId
                 *    关闭用户订单： ORDER_USER_CLOSE ------------ centerId、userId、orderId
                 *    确认用户订单： ORDER_USER_CONFIRM ---------- centerId、userId、orderId
                 *    查询用户订单： ORDER_USER_QUERY ------------ centerId、userId、info、pagination、shopId
                 *    获取订单状态： ORDER_USER_STATUS_COUNT ----- centerId、userId、gradeId
                 *    商品价格比价:  ORDER_USER_PRICECONSTRAST --- centerId、startTime、endTime、itemId
                 *    特殊属性商品:  ORDER_USER_SPECIAL ---------- centerId、type
                 *    限时抢购商品:  ORDER_USER_TIMELIMIT -------- centerId
                 *    获取运费接口:  ORDER_USER_POSTFEE ---------- centerId、province、weight、price
                 */
                ORDER_USER_CREATE:           {
                    host:         "",
                    path:         "/ordercenter/1.0/order?type={type}&openId={openId}",
                    method:       "POST",
                    context:      "",
                    contType:     "application/json;charset=UTF-8",
                    reqDataType:  "json",
                    reqHeader:    {},
                    dataType:     "",
                    errFunc:      {},
                    data:         {centerId: DB.centerId, userId: DB.userId, shopId: DB.shopId || DB.gradeId || DB.centerId }
                },
                ORDER_USER_DELETE:           {
                    host:         "",
                    path:         "/ordercenter/1.0/order/{userId}/{orderId}",
                    method:       "DELETE",
                    context:      "",
                    contType:     "application/x-www-form-urlencoded;charset=UTF-8",
                    reqDataType:  "",
                    reqHeader:    {},
                    dataType:     "",
                    errFunc:      {},
                    data:         { centerId: DB.centerId, userId: DB.userId }
                },
                ORDER_USER_CANCEL:           {
                    host:         "",
                    path:         "/ordercenter/1.0/order/cancel/{userId}/{orderId}",
                    method:       "POST",
                    context:      "",
                    contType:     "application/x-www-form-urlencoded;charset=UTF-8",
                    reqDataType:  "",
                    reqHeader:    {},
                    dataType:     "",
                    errFunc:      {},
                    data:         { centerId: DB.centerId, userId: DB.userId }
                },
                ORDER_USER_CLOSE:            {
                    host:         "",
                    path:         "/ordercenter/1.0/order/close/{userId}/{orderId}",
                    method:       "POST",
                    context:      "",
                    contType:     "application/x-www-form-urlencoded;charset=UTF-8",
                    reqDataType:  "",
                    reqHeader:    {},
                    dataType:     "",
                    errFunc:      {},
                    data:         { centerId: DB.centerId, userId: DB.userId }
                },
                ORDER_USER_CONFIRM:          {
                    host:         "",
                    path:         "/ordercenter/1.0/order/confirm/{userId}/{orderId}",
                    method:       "PUT",
                    context:      "",
                    contType:     "application/x-www-form-urlencoded;charset=UTF-8",
                    reqDataType:  "",
                    reqHeader:    {},
                    dataType:     "",
                    errFunc:      {},
                    data:         { centerId: DB.centerId, userId: DB.userId }
                },
                ORDER_USER_QUERY:            {
                    host:         "",
                    path:         "/ordercenter/1.0/order",
                    method:       "GET",
                    context:      "",
                    contType:     "application/x-www-form-urlencoded;charset=UTF-8",
                    reqDataType:  "",
                    reqHeader:    {},
                    dataType:     "",
                    errFunc:      {},
                    data:         { centerId: DB.centerId, shopId: DB.shopId || DB.gradeId || DB.centerId, userId: DB.userId }
                },
                ORDER_USER_STATUS_COUNT:     {
                    host:         "",
                    path:         "/ordercenter/1.0/order/statusCount/{gradeId}/{userId}",
                    method:       "GET",
                    context:      "",
                    contType:     "application/x-www-form-urlencoded;charset=UTF-8",
                    reqDataType:  "",
                    reqHeader:    {},
                    dataType:     "",
                    errFunc:      {},
                    data:         {  centerId: DB.centerId, gradeId: DB.shopId || DB.gradeId || DB.centerId, userId: DB.userId }
                },
                ORDER_USER_PRICECONSTRAST:   {
                    host:         "",
                    path:         "/ordercenter/1.0/goods/priceconstrast/{itemId}",
                    method:       "GET",
                    context:      "",
                    contType:     "application/x-www-form-urlencoded;charset=UTF-8",
                    reqDataType:  "",
                    reqHeader:    {},
                    dataType:     "",
                    errFunc:      {},
                    data:         { centerId: DB.centerId }
                },
                ORDER_USER_SPECIAL:          {
                    host:         "",
                    path:         "/ordercenter/1.0/goods/specialgoods/{centerId}/{type}",
                    method:       "GET",
                    context:      "",
                    contType:     "application/x-www-form-urlencoded;charset=UTF-8",
                    reqDataType:  "",
                    reqHeader:    {},
                    dataType:     "",
                    errFunc:      {},
                    data:         { centerId: DB.centerId }
                },
                ORDER_USER_TIMELIMIT:        {
                    host:         "",
                    path:         "/ordercenter/1.0/goods/timelimit/{centerId}",
                    method:       "GET",
                    context:      "",
                    contType:     "application/x-www-form-urlencoded;charset=UTF-8",
                    reqDataType:  "",
                    reqHeader:    {},
                    dataType:     "",
                    errFunc:      {},
                    data:         { centerId: DB.centerId }
                },
                ORDER_USER_POSTFEE:          {
                    host:         "",
                    path:         "/ordercenter/1.0/order/postfee?data={data}",
                    method:       "POST",
                    context:      "",
                    contType:     "application/json;charset=UTF-8",
                    reqDataType:  "json",
                    reqHeader:    {},
                    dataType:     "",
                    errFunc:      {},
                    data:         {}
                },

                /** 购物车接口
                 *    新增购物车：         ORDER_SHOPPINGCART_CREATE ----- centerId、userId、cart、gradeId
                 *    删除购物车条目：      ORDER_SHOPPINGCART_DELETE ----- centerId、userId、ids、gradeId
                 *    获取购物车信息：      ORDER_SHOPPINGCART_QUERY ------ centerId、userId、gradeId
                 *    获取购物车数量：      ORDER_SHOPPINGCART_COUNT ------ centerId、userId、gradeId
                 *    获取购物车某商品数量： ORDER_SHOPPINGCART_COUNT_ID --- centerId、userId、itemId、gradeId
                 */
                ORDER_SHOPPINGCART_CREATE:   {
                    host:         "",
                    path:         "/ordercenter/1.0/order/shoping-cart",
                    method:       "POST",
                    context:      "",
                    contType:     "application/json;charset=UTF-8",
                    reqDataType:  "json",
                    reqHeader:    {},
                    dataType:     "",
                    errFunc:      {},
                    data:         { centerId: DB.centerId, gradeId: DB.shopId || DB.gradeId || DB.centerId, userId: DB.userId }
                },
                ORDER_SHOPPINGCART_DELETE:   {
                    host:         "",
                    path:         "/ordercenter/1.0/order/shoping-cart/{gradeId}/{userId}/{ids}",
                    method:       "DELETE",
                    context:      "",
                    contType:     "application/x-www-form-urlencoded;charset=UTF-8",
                    reqDataType:  "",
                    reqHeader:    {},
                    dataType:     "",
                    errFunc:      {},
                    data:         { centerId: DB.centerId, gradeId: DB.shopId || DB.gradeId || DB.centerId, userId: DB.userId }
                },
                ORDER_SHOPPINGCART_QUERY:    {
                    host:         "",
                    path:         "/ordercenter/1.0/order/shoping-cart/{gradeId}/{userId}",
                    method:       "GET",
                    context:      "",
                    contType:     "application/x-www-form-urlencoded;charset=UTF-8",
                    reqDataType:  "",
                    reqHeader:    {},
                    dataType:     "",
                    errFunc:      {},
                    data:         { centerId: DB.centerId, gradeId: DB.shopId || DB.gradeId || DB.centerId, userId: DB.userId }
                },
                ORDER_SHOPPINGCART_COUNT:    {
                    host:         "",
                    path:         "/ordercenter/1.0/order/shoping-cart/count/{gradeId}/{userId}",
                    method:       "GET",
                    context:      "",
                    contType:     "application/x-www-form-urlencoded;charset=UTF-8",
                    reqDataType:  "",
                    reqHeader:    {},
                    dataType:     "",
                    errFunc:      {},
                    data:         { centerId: DB.centerId, gradeId: DB.shopId || DB.gradeId || DB.centerId, userId: DB.userId }
                },
                ORDER_SHOPPINGCART_COUNT_ID:    {
                    host:         "",
                    path:         "/ordercenter/1.0/order/shoping-cart/quantity/{gradeId}/{userId}/{itemId}",
                    method:       "GET",
                    context:      "",
                    contType:     "application/x-www-form-urlencoded;charset=UTF-8",
                    reqDataType:  "",
                    reqHeader:    {},
                    dataType:     "",
                    errFunc:      {},
                    data:         { centerId: DB.centerId, gradeId: DB.shopId || DB.gradeId || DB.centerId, userId: DB.userId }
                },

                /** 活动接口
                 *    获取活动：   ACTIVITY_QUERY ----- centerId
                 */
                ACTIVITY_QUERY:{
                    host:         "",
                    path:         "/activitycenter/auth/1.0/activity/{centerId}",
                    method:       "GET",
                    context:      "",
                    contType:     "application/x-www-form-urlencoded;charset=UTF-8",
                    reqDataType:  "",
                    reqHeader:    { authentication: null },
                    dataType:     "",
                    errFunc:      {},
                    data:         { centerId: DB.centerId }
                },

                /** 优惠券接口
                 *    获取优惠券列表:      COUPON_ALLLIST_QUERY  ----- centerId、activityId、 userId
                 *    获取用户优惠券:      COUPON_USERLIST_QUERY ----- centerId、userId
                 *    领取优惠券：        COUPON_RECEIVE ------------- centerId、userId、couponId
                 *    获取优惠券节点:     COUPON_NODE_QUERY ---------- centerId、node
                 */
                COUPON_ALLLIST_QUERY:    {
                    host:         "",
                    path:         "/activitycenter/auth/1.0/coupon/{centerId}",
                    method:       "GET",
                    context:      "",
                    contType:     "application/x-www-form-urlencoded;charset=UTF-8",
                    reqDataType:  "",
                    reqHeader:    { authentication: null },
                    dataType:     "",
                    errFunc:      {},
                    data:         { centerId: DB.centerId, userId: DB.userId }
                },
                COUPON_USERLIST_QUERY:   {
                    host:         "",
                    path:         "/activitycenter/1.0/coupon/{centerId}/{userId}",
                    method:       "GET",
                    context:      "",
                    contType:     "application/x-www-form-urlencoded;charset=UTF-8",
                    reqDataType:  "",
                    reqHeader:    {},
                    dataType:     "",
                    errFunc:      {},
                    data:         { centerId: DB.centerId, userId: DB.userId}
                },
                COUPON_RECEIVE:          {
                    host:         "",
                    path:         "/activitycenter/1.0/receive-coupon/{centerId}",
                    method:       "GET",
                    context:      "",
                    contType:     "application/x-www-form-urlencoded;charset=UTF-8",
                    reqDataType:  "",
                    reqHeader:    {},
                    dataType:     "",
                    errFunc:      {},
                    data:         { centerId: DB.centerId, userId: DB.userId}
                },
                COUPON_NODE_QUERY:       {
                    host:         "",
                    path:         "/activitycenter/1.0/listCouponByNode/{centerId}",
                    method:       "GET",
                    context:      "",
                    contType:     "application/x-www-form-urlencoded;charset=UTF-8",
                    reqDataType:  "",
                    reqHeader:    {},
                    dataType:     "",
                    errFunc:      {},
                    data:         { centerId: DB.centerId }
                },

                /** 支付接口
                 *    支付： PAY_ORDER --- orderId、payType, type
                 */
                PAY_ORDER:    {
                    host:         "",
                    path:         "/paycenter/1.0/pay/{payType}/{type}/{orderId}?openId={openId}",
                    method:       "POST",
                    context:      "",
                    contType:     "application/x-www-form-urlencoded;charset=UTF-8",
                    reqDataType:  "",
                    reqHeader:    {},
                    dataType:     "",
                    errFunc:      {},
                    data:         {}
                }
            }
        })
    }
    if(!API.jsModel.ajax){
        Object.defineProperty(API.jsModel, 'ajax', {
            configurable: false,
            enumerable: true,
            writable: false,
            value: (function () {
                return {
                    isReady: true,
                    toRequest: function (param) {
                        var deferred = Deferred();
                        this.setRequest(this, deferred, param);
                        this.bindRequest(this, deferred, param);
                        this.buildRequest(this, deferred, param);
                        return deferred;
                    },
                    setRequest: function (that, deferred, param) {
                        param.data = extend(true, {},
                            API.jsModel.host.data,
                            param.data
                        );
                        param.reqHeader = extend(true, {},
                            API.jsModel.host.reqHeader,
                            param.reqHeader,
                            param.data.reqHeader
                        );
                        param.ajaxFunc = extend(true, {},
                            API.jsModel.host.ajaxFunc,
                            param.ajaxFunc,
                            param.data.ajaxFunc
                        );
                        param.url = ((param.host || API.jsModel.host.path).replace(/\/$/i, '') + param.path)
                            .replace(/{([^{}]*)}/g, function (str) {
                                var key = str.replace(/[{}]/g, "");
                                var newStr = key && param.data[key];
                                var isString = typeof newStr === "string";
                                var isNumber = typeof newStr === "number";
                                if (isString || isNumber) delete param.data[key];
                                return (isString || isNumber) && ("" + newStr) || " ";
                            });
                        each(param.data, function (key, obj) {
                            if(key === "reqHeader") delete param.data[key];
                            if(key === "ajaxFunc") delete param.data[key];
                            if(obj === undefined) delete param.data[key];
                            if(obj === null) delete param.data[key];
                        });
                    },
                    bindRequest: function (that, deferred, param) {
                        param.method = param.method || API.jsModel.host.method;
                        param.context = param.context || API.jsModel.host.context;
                        param.contType = param.contType || API.jsModel.host.contType;
                        param.dataType = param.dataType || API.jsModel.host.dataType;
                        param.reqHeader = param.reqHeader || API.jsModel.host.reqHeader;
                        param.reqDataType = param.reqDataType || API.jsModel.host.reqDataType;
                        param.reqDataType === "json" && (param.data = JSON.stringify(param.data));
                    },
                    buildRequest: function (that, deferred, param) {
                        ajax({
                            url: param.url,
                            data: param.data,
                            method: param.method,
                            context: param.context,
                            dataType: param.dataType,
                            contentType: param.contType,
                            beforeSend: function (xhr) {
                                var ajaxFunc = param.ajaxFunc;
                                isPlainObject(ajaxFunc) && isPureFunction(ajaxFunc.beforeSend) && ajaxFunc.beforeSend();
                                each(param.reqHeader, function(key, value){ value && xhr.setRequestHeader(key, value)});
                            },
                            complete: function (xhr, ts) {
                                var ajaxFunc = param.ajaxFunc;
                                isPlainObject(ajaxFunc) && isPureFunction(ajaxFunc.complete) && ajaxFunc.complete();
                            },
                            success: function (data, ts, xhr){
                                param.errFunc[ts] && window.location.replace(String(param.errFunc[ts]));
                                param.errFunc[ts] || that.toInterceptor("success", deferred, data, ts);
                            },
                            error: function (xhr, ts, code){
                                try {
                                    param.errFunc[ts] && window.location.replace(String(param.errFunc[ts]));
                                    param.errFunc[ts] || that.toInterceptor("error", deferred, JSON.parse(xhr.responseText), ts);
                                } catch(e) {
                                    param.errFunc[ts] && window.location.replace(String(param.errFunc[ts]));
                                    param.errFunc[ts] || that.toInterceptor("error", deferred, xhr.responseText, ts);
                                }
                            }
                        });
                    },
                    toInterceptor: function (type, deferred, data, ts) {
                        if(isPlainObject(data)){
                            switch (data.errorCode){
                                case "10000":
                                    window.localStorage.clear();
                                    window.location.reload(true);
                                    this.isReady = false;
                                    break;
                            }
                        }
                        if(this.isReady){
                            type === "error" && deferred.reject(data, ts);
                            type === "success" && deferred.resolve(data, ts);
                        }
                    }
                }
            })()
        })
    }
    if(!API.jsModel.comm){
        Object.defineProperty(API.jsModel, 'comm', {
            configurable: false,
            enumerable: true,
            writable: false,
            value: function (type, data) {
                if(isPlainObject(API.jsModel.path[type])){
                    if (!data || typeof data !== 'object') {
                        try {
                            data = JSON.parse(data) || {};
                            data = typeof data === 'object'? data: {};
                        }
                        catch(e) {
                            data = {};
                        }
                    }
                    return API.jsModel.ajax.toRequest({
                        host:        API.jsModel.path[type].host,
                        path:        API.jsModel.path[type].path,
                        method:      API.jsModel.path[type].method,
                        context:     API.jsModel.path[type].context,
                        contType:    API.jsModel.path[type].contType,
                        reqDataType: API.jsModel.path[type].reqDataType,
                        reqHeader:   API.jsModel.path[type].reqHeader,
                        dataType:    API.jsModel.path[type].dataType,
                        errFunc:     API.jsModel.path[type].errFunc,
                        data:        extend(true, {}, API.jsModel.path[type].data, data)
                    });
                }else{
                    return Deferred().reject("暂无此接口...");
                }
            }
        })
    }
    if(!API.jsModel.send){
        Object.defineProperty(API.jsModel, 'send', {
            configurable: false,
            enumerable: true,
            writable: false,
            value: function (types, datas, filter) {
                var defArr = [];
                var defIndex = -1;
                var responseObj = {};
                var wDeferred = Deferred();
                var isFilter = filter === true;
                var typeArr = [].concat(types);
                var dataArr = [].concat(datas);
                each(typeArr, function(i, type){
                    if(typeof type === "string" && type){
                        var data = isPlainObject(dataArr[i]) && dataArr[i] || {};
                        defArr[++defIndex] = Deferred();
                        (function(defIndex){
                            API.jsModel.comm(type, data)
                                .done(function(response, ts){
                                    var isObject = isPlainObject(response);
                                    var isSuccess = isObject && response.success;
                                    var hasError = isObject && response.error !== undefined;
                                    var hasSuccess = isObject && response.success !== undefined;
                                    var newResponse = isSuccess? response.obj: (hasError||hasSuccess)? {}: response;
                                    typeArr.length !== 1 && (responseObj[type] = isFilter? newResponse: response);
                                    typeArr.length === 1 && (responseObj = isFilter? newResponse: response);
                                    defArr[defIndex].resolve();
                                })
                                .fail(function(response, ts){
                                    console.warn("[" + type + "] " + ts + ":\n", response);
                                    typeArr.length === 1 && (responseObj= isFilter? {}: response);
                                    typeArr.length !== 1 && (responseObj[type] = isFilter? {}: response);
                                    defArr[defIndex].resolve();
                                })
                        })(defIndex);
                    }
                });
                when.apply(null, defArr)
                    .always(function(){
                        wDeferred.resolve(responseObj);
                    });
                return API.jsEvent.page.state = wDeferred;
            }
        })
    }

    if(!API.jsEvent){
        Object.defineProperty(API, 'jsEvent', {
            configurable: false,
            enumerable: true,
            writable: false,
            value: {}
        });
    }
    if(!API.jsEvent.page){
        Object.defineProperty(API.jsEvent, 'page', {
            configurable: false,
            enumerable: true,
            writable: false,
            value: {
                state: null
            }
        });
    }
    if(!API.jsEvent.mouse){
        Object.defineProperty(API.jsEvent, 'mouse', {
            configurable: false,
            enumerable: true,
            writable: false,
            value: {
                mouseTime:        0,
                downTime:         0,
                moveTime:         0,
                upTime:           0,
                focusTime:        0,
                leaveTime:        0,
                focusTimer:       null,
                moveTimer:        null,
                leaveTimer:       null,
                cacheTimer:       null,
                mouseWheelTimer:  null,
                mouseCache:       null,
                mouseIsCache:     true,
                mouseIsFocus:     false,
                mouseIsMove:      false,
                mouseIsMoved:     false,
                mouseIsLeave:     true,
                mouseDownX:       0,
                mouseDownY:       0,
                mouseMoveX:       0,
                mouseMoveY:       0,
                mouseUpX:         0,
                mouseUpY:         0,
                mouseMDir:        0,
                mouseMX:          0,
                mouseMY:          0,
                mouseDDir:        0,
                mouseDX:          0,
                mouseDY:          0,
                mouseTX:          0,
                mouseTY:          0,
                mouseX:           0,
                mouseY:           0,
                mousePageX:       0,
                mousePageY:       0,
                mouseClientX:     0,
                mouseClientY:     0,
                mouseOffsetX:     0,
                mouseOffsetY:     0,
                mouseWheelDir:    0,
                mouseMXDir:       0,
                mouseMYDir:       0,
                mouseDXDir:       0,
                mouseDYDir:       0
            }
        })
    }
    if(!API.jsEvent.touch){
        Object.defineProperty(API.jsEvent, 'touch', {
            configurable: false,
            enumerable: true,
            writable: false,
            value: {
                touchTime:      0,
                startTime:      0,
                moveTime:       0,
                endTime:        0,
                focusTime:      0,
                leaveTime:      0,
                focusTimer:     null,
                moveTimer:      null,
                leaveTimer:     null,
                cacheTimer:     null,
                touchCache:     null,
                touchIsCache:   true,
                touchIsFocus:   false,
                touchIsMove:    false,
                touchIsMoved:   false,
                touchIsLeave:   true,
                touchPageX:     0,
                touchPageY:     0,
                touchClientX:   0,
                touchClientY:   0,
                touchScreenX:   0,
                touchScreenY:   0,
                touchStartX:    0,
                touchStartY:    0,
                touchMoveX:     0,
                touchMoveY:     0,
                touchEndX:      0,
                touchEndY:      0,
                touchMDir:      0,
                touchMX:        0,
                touchMY:        0,
                touchSDir:      0,
                touchSX:        0,
                touchSY:        0,
                touchTX:        0,
                touchTY:        0,
                touchX:         0,
                touchY:         0,
                touchMXDir:     0,
                touchMYDir:     0,
                touchSXDir:     0,
                touchSYDir:     0
            }
        });
    }
    if(!API.jsEvent.browser){
        Object.defineProperty(API.jsEvent, 'browser', {
            configurable: false,
            enumerable: true,
            writable: false,
            value: {
                type: (function(){
                    var navigator = window.navigator;
                    var userAgent = navigator.userAgent;
                    var regResult = userAgent.toLowerCase().match(/MicroMessenger/i);
                    var isEdge = userAgent.indexOf("Edge") > -1;
                    var isOpera = userAgent.indexOf("Opera") > -1;
                    var isChrome = userAgent.indexOf("Chrome") > -1;
                    var isSafari = userAgent.indexOf("Safari") > -1;
                    var isFirefox = userAgent.indexOf("Firefox") > -1;
                    var isCompatible = userAgent.indexOf("compatible") > -1;
                    var isMSIE = userAgent.indexOf("MSIE") > -1;
                    var isHtmlIE = document.querySelector("html.ie");
                    var isIE = isCompatible && isMSIE;
                    var isWeChat = !!regResult && regResult[0] === "micromessenger";
                    if(isEdge){ return "Edge" }
                    else if(isOpera){ return "Opera"; }
                    else if(isChrome){ return "Chrome"; }
                    else if(isSafari){ return "Safari"; }
                    else if(isFirefox){ return "Firefox"; }
                    else if(isHtmlIE||isIE){ return "IE"; }
                    else if(isWeChat){ return "WeChat"; }
                    else { return "Unsure" }
                })()
            }
        });
    }
    if(!API.jsEvent.keyboard){
        Object.defineProperty(API.jsEvent, 'keyboard', {
            configurable: false,
            enumerable: true,
            writable: false,
            value: {
                keyboardCode:     null,
                keyboardIsDown:   false,
                keyboardIsPress:  false,
                keyboardIsUp:     true
            }
        })
    }

    window.addEventListener('load', function(){
        var winWidth = window.innerWidth;
        var screenWidth = window.screen.width;
        var elBody = document.querySelector("body");
        var device = API.jsUtil.device;
        if(device.mobile()){
            var scale = screenWidth/750;
            var content = "width=750, initial-scale=" + scale + ",user-scalable=no";
            document.querySelector("#viewport").setAttribute("content", content);
        }
        if(!device.mobile()){
            var bool = winWidth >= 1020 && winWidth <= 1260;
            if(window.getComputedStyle(elBody, null).zoom !== undefined){
                elBody.style.zoom = bool? (winWidth - 20)/1240: winWidth < 1020? 0.80645: 1;
            }else{
                // 以下代码, 在火狐中会影响css中fixed属性
                // elBody.style.transform = bool? "scale(" + (winWidth-20)/1240 + ")": winWidth < 1020? "scale(0.80645)": "scale(1)";
                // elBody.style.transformOrigin = "0% 0%";
            }
        }
    }, true);
    window.addEventListener('resize', function(){
        var winWidth = window.innerWidth;
        var screenWidth = window.screen.width;
        var elBody = document.querySelector("body");
        var device = API.jsUtil.device;
        if(device.mobile()){
            var scale = screenWidth/750;
            var content = "width=750, initial-scale=" + scale + ",user-scalable=no";
            document.querySelector("#viewport").setAttribute("content", content);
        }
        if(!device.mobile()){
            var bool = winWidth >= 1020 && winWidth <= 1260;
            if(window.getComputedStyle(elBody, null).zoom !== undefined){
                elBody.style.zoom = bool? (winWidth - 20)/1240: winWidth < 1020? 0.80645: 1;
            }else{
                // 以下代码, 在火狐中会影响css中fixed属性
                // elBody.style.transform = bool? "scale(" + (winWidth-20)/1240 + ")": winWidth < 1020? "scale(0.80645)": "scale(1)";
                // elBody.style.transformOrigin = "0% 0%";
            }
        }
    }, true);
    window.addEventListener('pageshow', function(ev){
        var event = ev || window.event;
        event.persisted && window.location.reload(true);
    }, true);
    window.addEventListener('popstate', function(ev){
        var event = ev || window.event;
        var state = isPlainObject(event.state) && event.state;
        if(isPlainObject(state)) API.jsUtil.history.redirectHandle(state.code, null, state.data);
    }, true);
    document.addEventListener('keyup', function(ev){
        var event = ev || window.event;
        var keyboard = API.jsEvent.keyboard;
        keyboard.keyboardCode = event.keyCode || event.which || event.charCode;
        keyboard.keyboardIsDown = false;
        keyboard.keyboardIsPress = false;
        keyboard.keyboardIsUp = true;
    }, true);
    document.addEventListener('keydown', function(ev){
        var event = ev || window.event;
        var keyboard = API.jsEvent.keyboard;
        keyboard.keyboardCode = event.keyCode || event.which || event.charCode;
        keyboard.keyboardIsDown = true;
        keyboard.keyboardIsUp = false;
    }, true);
    document.addEventListener('keypress', function(ev){
        var event = ev || window.event;
        var keyboard = API.jsEvent.keyboard;
        keyboard.keyboardCode = event.keyCode || event.which || event.charCode;
        keyboard.keyboardIsPress = true;
        keyboard.keyboardIsUp = false;
    }, true);
    document.addEventListener("DOMMouseScroll", function(ev){
        var event = ev || window.event;
        var mouse = API.jsEvent.mouse;
        clearTimeout(mouse.mouseWheelTimer);
        mouse.mouseWheelDir = event.detail<0? 1: event.detail>0? 3: 0;
        mouse.mouseWheelTimer = setTimeout(function(){ mouse.mouseWheelDir = 0 }, 320);
    }, true);
    document.addEventListener("mousewheel", function(ev){
        var event = ev || window.event;
        var mouse = API.jsEvent.mouse;
        clearTimeout(mouse.mouseWheelTimer);
        mouse.mouseWheelDir = event.wheelDelta>0? 1: event.wheelDelta<0? 3: 0;
        mouse.mouseWheelTimer = setTimeout(function(){ mouse.mouseWheelDir = 0 }, 320);
    }, true);
    document.addEventListener('mousedown', function(ev){
        var mouse = API.jsEvent.mouse;
        var event = ev || window.event;
        var dateTime = new Date().getTime();
        mouse.mouseTX = 0;
        mouse.mouseTY = 0;
        mouse.mouseIsCache = true;
        mouse.mouseIsFocus = true;
        mouse.mouseIsLeave = false;
        mouse.mouseIsMoved = false;
        mouse.mousePageX = event.pageX;
        mouse.mousePageY = event.pageY;
        mouse.mouseClientX = event.clientX;
        mouse.mouseClientY = event.clientY;
        mouse.mouseOffsetX = event.offsetX;
        mouse.mouseOffsetY = event.offsetY;
        mouse.mouseX = mouse.mouseDownX = mouse.mouseClientX;
        mouse.mouseY = mouse.mouseDownY = mouse.mouseClientY;
        mouse.mouseTime = mouse.downTime = dateTime;
        mouse.focusTime = mouse.mouseTime - mouse.upTime;
        mouse.mouseCache = { mouseTX: 0, mouseTY: 0, mouseTime: dateTime };
    }, true);
    document.addEventListener('mousemove', function(ev){
        var key;
        var lastMouse = {};
        var mouse = API.jsEvent.mouse;
        var event = ev || window.event;
        var dateTime = new Date().getTime();
        for (key in mouse) {
            if(key !== 'mouseCache') {
                lastMouse[key] = mouse[key];
            }
        }
        if (mouse.mouseIsCache) {
            mouse.mouseIsCache = false;
            mouse.mouseCache = mouse.mouseCache || {};
            mouse.mouseCache.mouseTX = lastMouse.mouseTX;
            mouse.mouseCache.mouseTY = lastMouse.mouseTY;
            mouse.mouseCache.mouseTime = lastMouse.mouseTime;
            mouse.cacheTimer = setTimeout(function(){ mouse.mouseIsCache = true; }, 300);
        }
        mouse.mouseIsMove  = true;
        mouse.mouseIsMoved = true;
        mouse.mouseIsFocus = true;
        mouse.mouseIsLeave = false;
        mouse.mousePageX = event.pageX;
        mouse.mousePageY = event.pageY;
        mouse.mouseClientX = event.clientX;
        mouse.mouseClientY = event.clientY;
        mouse.mouseOffsetX = event.offsetX;
        mouse.mouseOffsetY = event.offsetY;
        mouse.mouseX = mouse.mouseMoveX = mouse.mouseClientX;
        mouse.mouseY = mouse.mouseMoveY = mouse.mouseClientY;
        mouse.mouseMDir = 0;
        mouse.mouseDDir = 0;
        mouse.mouseMX = mouse.mouseX - lastMouse.mouseX;
        mouse.mouseMY = mouse.mouseY - lastMouse.mouseY;
        mouse.mouseDX = mouse.mouseX - mouse.mouseDownX;
        mouse.mouseDY = mouse.mouseY - mouse.mouseDownY;
        mouse.mouseTX = mouse.mouseTX + Math.abs(mouse.mouseMX);
        mouse.mouseTY = mouse.mouseTY + Math.abs(mouse.mouseMY);
        mouse.mouseMY < 0 && (mouse.mouseMYDir=1);
        mouse.mouseMX > 0 && (mouse.mouseMXDir=2);
        mouse.mouseMY > 0 && (mouse.mouseMYDir=3);
        mouse.mouseMX < 0 && (mouse.mouseMXDir=4);
        Math.abs(mouse.mouseMX) < Math.abs(mouse.mouseMY) && mouse.mouseMY<0 && (mouse.mouseMDir=1);
        Math.abs(mouse.mouseMX) > Math.abs(mouse.mouseMY) && mouse.mouseMX>0 && (mouse.mouseMDir=2);
        Math.abs(mouse.mouseMX) < Math.abs(mouse.mouseMY) && mouse.mouseMY>0 && (mouse.mouseMDir=3);
        Math.abs(mouse.mouseMX) > Math.abs(mouse.mouseMY) && mouse.mouseMX<0 && (mouse.mouseMDir=4);
        mouse.mouseDY<0 && (mouse.mouseDYDir=1);
        mouse.mouseDX>0 && (mouse.mouseDXDir=2);
        mouse.mouseDY>0 && (mouse.mouseDYDir=3);
        mouse.mouseDX<0 && (mouse.mouseDXDir=4);
        Math.abs(mouse.mouseDX) < Math.abs(mouse.mouseDY) && mouse.mouseDY<0 && (mouse.mouseDDir=1);
        Math.abs(mouse.mouseDX) > Math.abs(mouse.mouseDY) && mouse.mouseDX>0 && (mouse.mouseDDir=2);
        Math.abs(mouse.mouseDX) < Math.abs(mouse.mouseDY) && mouse.mouseDY>0 && (mouse.mouseDDir=3);
        Math.abs(mouse.mouseDX) > Math.abs(mouse.mouseDY) && mouse.mouseDX<0 && (mouse.mouseDDir=4);
        clearTimeout(mouse.moveTimer);
        mouse.mouseTime = mouse.moveTime = dateTime;
        mouse.moveTimer = setTimeout(function(){ mouse.mouseIsMove = false }, 300);
    }, true);
    document.addEventListener('mouseup', function(ev){
        var mouse = API.jsEvent.mouse;
        var event = ev || window.event;
        var dateTime = new Date().getTime();
        clearTimeout(mouse.cacheTimer);
        mouse.mouseIsCache = true;
        mouse.mouseIsFocus = false;
        mouse.mouseIsLeave = true;
        mouse.mousePageX = event.pageX;
        mouse.mousePageY = event.pageY;
        mouse.mouseClientX = event.clientX;
        mouse.mouseClientY = event.clientY;
        mouse.mouseOffsetX = event.offsetX;
        mouse.mouseOffsetY = event.offsetY;
        mouse.mouseX = mouse.mouseUpX = mouse.mouseClientX;
        mouse.mouseY = mouse.mouseUpY = mouse.mouseClientY;
        mouse.mouseTime = mouse.upTime = dateTime;
        mouse.leaveTime = mouse.mouseTime - mouse.downTime;
    }, true);
    document.addEventListener('touchstart', function(ev){
        var touch = API.jsEvent.touch;
        var event = ev || window.event;
        var dateTime = new Date().getTime();
        var changedTouches = event.changedTouches;
        var browser = API.jsEvent.browser;
        var isSafari = browser.type === "Safari";
        var second = isSafari? 900: 300;
        touch.touchTX = 0;
        touch.touchTY = 0;
        touch.touchIsCache = true;
        touch.touchIsFocus = true;
        touch.touchIsLeave = false;
        touch.touchIsMoved = false;
        touch.touchPageX = changedTouches[0].pageX;
        touch.touchPageY = changedTouches[0].pageY;
        touch.touchClientX = changedTouches[0].clientX;
        touch.touchClientY = changedTouches[0].clientY;
        touch.touchScreenX = changedTouches[0].screenX;
        touch.touchScreenY = changedTouches[0].screenY;
        touch.touchX = touch.touchStartX = touch.touchClientX;
        touch.touchY = touch.touchStartY = touch.touchClientY;
        touch.touchTime = touch.startTime = dateTime;
        touch.focusTime = touch.touchTime - touch.endTime;
        touch.touchCache = { touchTX: 0, touchTY: 0, touchTime: dateTime };
        touch.focusTime<second && !touch.touchIsMove && event.cancelable && event.preventDefault();
    }, true);
    document.addEventListener('touchmove', function(ev){
        var key;
        var lastTouch = {};
        var touch = API.jsEvent.touch;
        var event = ev || window.event;
        var dateTime = new Date().getTime();
        var changedTouches = event.changedTouches;
        var browser = API.jsEvent.browser;
        var isSafari = browser.type === "Safari";
        var second = isSafari? 900: 300;
        for (key in touch) {
            if(key !== 'touchCache') {
                lastTouch[key] = touch[key];
            }
        }
        if (touch.touchIsCache) {
            touch.touchIsCache = false;
            touch.touchCache = touch.touchCache || {};
            touch.touchCache.touchTX = lastTouch.touchTX;
            touch.touchCache.touchTY = lastTouch.touchTY;
            touch.touchCache.touchTime = lastTouch.touchTime;
            touch.cacheTimer = setTimeout(function(){ touch.touchIsCache = true; }, 300);
        }
        touch.touchIsFocus = true;
        touch.touchIsMove  = true;
        touch.touchIsMoved = true;
        touch.touchIsLeave = false;
        touch.touchPageX = changedTouches[0].pageX;
        touch.touchPageY = changedTouches[0].pageY;
        touch.touchClientX = changedTouches[0].clientX;
        touch.touchClientY = changedTouches[0].clientY;
        touch.touchScreenX = changedTouches[0].screenX;
        touch.touchScreenY = changedTouches[0].screenY;
        touch.touchX = touch.touchMoveX = touch.touchClientX;
        touch.touchY = touch.touchMoveY = touch.touchClientY;
        touch.touchSDir = 0;
        touch.touchMDir = 0;
        touch.touchSX = touch.touchX - touch.touchStartX;
        touch.touchSY = touch.touchY - touch.touchStartY;
        touch.touchMX = touch.touchX - lastTouch.touchX;
        touch.touchMY = touch.touchY - lastTouch.touchY;
        touch.touchTX = touch.touchTX + Math.abs(touch.touchMX);
        touch.touchTY = touch.touchTY + Math.abs(touch.touchMY);
        touch.touchMY < 0 && (touch.touchMYDir=1);
        touch.touchMX > 0 && (touch.touchMXDir=2);
        touch.touchMY > 0 && (touch.touchMYDir=3);
        touch.touchMX < 0 && (touch.touchMXDir=4);
        Math.abs(touch.touchMX) < Math.abs(touch.touchMY) && touch.touchMY<0 && (touch.touchMDir=1);
        Math.abs(touch.touchMX) > Math.abs(touch.touchMY) && touch.touchMX>0 && (touch.touchMDir=2);
        Math.abs(touch.touchMX) < Math.abs(touch.touchMY) && touch.touchMY>0 && (touch.touchMDir=3);
        Math.abs(touch.touchMX) > Math.abs(touch.touchMY) && touch.touchMX<0 && (touch.touchMDir=4);
        touch.touchSY<0 && (touch.touchSYDir=1);
        touch.touchSX>0 && (touch.touchSXDir=2);
        touch.touchSY>0 && (touch.touchSYDir=3);
        touch.touchSX<0 && (touch.touchSXDir=4);
        Math.abs(touch.touchSX) < Math.abs(touch.touchSY) && touch.touchSY<0 && (touch.touchSDir=1);
        Math.abs(touch.touchSX) > Math.abs(touch.touchSY) && touch.touchSX>0 && (touch.touchSDir=2);
        Math.abs(touch.touchSX) < Math.abs(touch.touchSY) && touch.touchSY>0 && (touch.touchSDir=3);
        Math.abs(touch.touchSX) > Math.abs(touch.touchSY) && touch.touchSX<0 && (touch.touchSDir=4);
        clearTimeout(touch.moveTimer);
        touch.touchTime = touch.moveTime = dateTime;
        touch.moveTimer = setTimeout(function(){ touch.touchIsMove = false; }, second);
    }, true);
    document.addEventListener('touchend', function(ev){
        var touch = API.jsEvent.touch;
        var event = ev || window.event;
        var dateTime = new Date().getTime();
        var changedTouches = event.changedTouches;
        var browser = API.jsEvent.browser;
        var isSafari = browser.type === "Safari";
        var second = isSafari? 900: 300;
        clearTimeout(touch.cacheTimer);
        touch.touchIsCache = true;
        touch.touchIsFocus = false;
        touch.touchIsLeave = true;
        touch.touchPageX = changedTouches[0].pageX;
        touch.touchPageY = changedTouches[0].pageY;
        touch.touchClientX = changedTouches[0].clientX;
        touch.touchClientY = changedTouches[0].clientY;
        touch.touchScreenX = changedTouches[0].screenX;
        touch.touchScreenY = changedTouches[0].screenY;
        touch.touchX = touch.touchEndX = touch.touchClientX;
        touch.touchY = touch.touchEndY = touch.touchClientY;
        touch.touchTime = touch.endTime = dateTime;
        touch.leaveTime = touch.touchTime - touch.moveTime;
        touch.focusTime < second && !touch.touchIsMove && event.cancelable && event.preventDefault();
    }, true);

    API.open(API);
    API.jump(API);

})({
    init: function(API){
        var newSign =     "V2973300b965ebf7b";
        var newShopId =   API.jsUtil.url.getParam("shopId");
        var newUserId =   API.jsUtil.url.getParam("userId");
        var newAuthId =   API.jsUtil.url.getParam("authId");
        var newOpenId =   API.jsUtil.url.getParam("openId");
        var oldShopId =   API.jsUtil.storage.getItem("shopId");
        var oldUserId =   API.jsUtil.storage.getItem("userId");
        var oldAuthId =   API.jsUtil.storage.getItem("authId");
        var oldOpenId =   API.jsUtil.storage.getItem("openId");
        var oldSign =     API.jsUtil.storage.getItem("signature");
        var authPass =    newUserId && newAuthId && true;
        var signErr =     oldSign !== newSign;
        var signOption =  { "signature": newSign };
        var shopOption =  { "shopId": newShopId };
        var openOption =  { "openId": newOpenId };
        var authOption =  { "authId": newAuthId, "userId": newUserId };
        var dumpOption =  [ "shopId", "userId", "authId", "openId"];

        if (signErr)    API.jsUtil.storage.delItem(dumpOption);
        if (newSign)    API.jsUtil.storage.setItem(signOption);
        if (authPass)   API.jsUtil.storage.setItem(authOption);
        if (newShopId)  API.jsUtil.storage.setItem(shopOption);
        if (newOpenId)  API.jsUtil.storage.setItem(openOption);
        if (dumpOption) API.jsUtil.url.delParam(dumpOption, "cover");

        var getShopId = newShopId || oldShopId || '';
        var getUserId = newUserId || oldUserId || '';
        var getAuthId = newAuthId || oldAuthId || '';
        var getOpenId = newOpenId || oldOpenId || '';

        return {
            shopId: getShopId,
            userId: !signErr? getUserId: '',
            authId: !signErr? getAuthId: '',
            openId: !signErr? getOpenId: '',
            isLogin: !signErr && getUserId && getAuthId && true,
            centerId: window.entity.siteInfo.centerId,
            gradeId: window.entity.siteInfo.gradeId,
            debug: window.entity.siteInfo.debug,
            siteInfo: window.entity.siteInfo
        }
    },
    open: function(API){
        window.app = {
            getApi:    function(name){
                if (window.entity){ delete window.entity; }
                return typeof name === "string" && name.trim() && arguments.length === 1? API[name]: API;
            }
        }
    },
    jump: function(API){
        var jumpUrl =      '';
        var isMobile =     API.jsUtil.device.mobile();
        var protocol =     API.jsData.location.protocol;
        var pcDomain =     API.jsData.siteInfo.domainName;
        var mpDomain =     API.jsData.siteInfo.mDomainName;
        var nowDomain =    API.jsData.location.host;
        var newDomain =    API.jsUtil.url.getParam("domain");
        var newDomainDB =  API.jsUtil.url.getParam("domainData");
        var replaceUrl =   API.jsUtil.storage.getItem("replaceUrl");
        var optDomain =    window.localStorage.getItem("domain");
        var optDomainDB =  window.localStorage.getItem("domainData");
        var emptyOption =  [ "domain", "domainData", "replaceUrl" ];
        var domainRegex =  /^(http:\/\/)?([^\/]+)(\/.*)?/i;

        var getDomain =    newDomain   || optDomain   || '';
        var getDomainDB =  newDomainDB || optDomainDB || '{}';
        var jumpDomain =   getDomain.replace(domainRegex, '$2');

        if (jumpDomain && jumpDomain !== nowDomain) {
            replaceUrl || (jumpUrl = API.jsData.location.href);
            replaceUrl || (jumpUrl = jumpUrl.replace(nowDomain, jumpDomain));
            replaceUrl || (jumpUrl = API.jsUtil.path.setParam(jumpUrl, JSON.parse(getDomainDB)));
            replaceUrl && (replaceUrl = API.jsUtil.path.setParam(replaceUrl, JSON.parse(getDomainDB)));
            replaceUrl && (replaceUrl = replaceUrl.replace(nowDomain, jumpDomain));
        }
        if (!isMobile) {
            replaceUrl = protocol + "//" + pcDomain.replace(domainRegex, '$2');
        }
        if (replaceUrl || jumpUrl) {
            API.jsUtil.storage.delItem(emptyOption);
            API.jsUtil.location.replace(replaceUrl || jumpUrl);
        }
    }
});