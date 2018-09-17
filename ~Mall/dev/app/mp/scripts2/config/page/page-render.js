
/** 创建render基类
 *    @detail:    render基类
 *    @return:    can.Control
 *    @author:    林鹏腾
 *    @date:      2018.04.03
 */
define(function(){

    'use strict';

    var api =             window.capi.get();
    var each =            $.each;
    var when =            $.when;
    var extend =          $.extend;
    var Deferred =        $.Deferred;
    var isEmptyObject =   $.isEmptyObject;
    var isPlainObject =   $.isPlainObject;
    var isPureFunction =  $.isFunction;
    var isPureArray =     $.isArray;
    var inPureArray =     $.inArray;


    return can.Control.extend({

        tags:         {},
        region:       {},
        config:       {},
        request:      {},
        response:     {},
        renderData:   {},
        sendArr:      [],
        reload:       false,

        sendRequest: function(type, data, filter){
            var that = this;
            if(type === undefined){
                return Deferred().resolve();
            }
            else if(isPlainObject(that.jsModel.path[type])){
                return that.jsModel.send(type, extend(true, {}, that.request[type], data||{}), filter);
            }
            else{
                return Deferred().reject();
            }
        },

        setRenderData: function(name, path, data, dynamic){
            var that = this;
            var dynamicData = null;
            var regNameArr = name.split("/");
            var gRegName = regNameArr.shift() || "";
            var branch = regNameArr.shift() || "";
            if(!that.renderData[gRegName]){ that.renderData[gRegName]={} }
            if(!that.renderData[gRegName][path]){ that.renderData[gRegName][path]={} }
            var dataNode = that.renderData[gRegName][path];
            var attrIsFunc = isPureFunction(dataNode.attr);
            var dataIsFunc = isPureFunction(dataNode);
            var cloneData = attrIsFunc? dataNode.attr(): dataIsFunc? dataNode(): dataNode;
            branch? (isPlainObject(cloneData)? cloneData[branch]=data: null): cloneData = data;
            dynamicData = dynamic && isPureArray(cloneData)? new can.List(cloneData): dynamicData;
            dynamicData = dynamic && isPlainObject(cloneData)? new can.Map(cloneData): dynamicData;
            dynamicData = dynamic && !dynamicData? can.compute(cloneData): dynamicData;
            that.renderData[gRegName][path] = dynamic? dynamicData: cloneData;
            dynamicData = null;
            cloneData = null;
        },

        renderTemplate: function(regionArr){
            var that = this;
            var docFrag = null;
            var isArray = isPureArray(regionArr);
            var isGlobal = inPureArray("global", regionArr) !== -1;
            if(isArray && isGlobal){
                regionArr = [];
                regionArr.unshift("global");
                docFrag = document.createDocumentFragment();
                each(Object.keys(this.tags), function(index, regName){
                    regName !== "global" && regionArr.push(regName);
                });
            }
            when.apply(null, [].concat(that.queue))
                .done(function(){
                    each(isArray?regionArr:[], function(index, regName){
                        var tag = that.tags[regName];
                        var mark = "[region='" + regName + "']";
                        var $mark = isGlobal? docFrag.querySelector(mark): that.element.find(mark);
                        var renderData = { module:that, root:that.renderData, region:that.renderData[regName] };
                        var $element = regName === "global"? docFrag: $mark;
                        if(tag !== null && tag !== undefined && regName && $element){
                            isGlobal?
                                $element.appendChild(can.mustache(tag)(renderData)):
                                $element.html(can.mustache(tag)(renderData));
                        }
                    });
                    if(isArray && isGlobal){ that.element.html(docFrag); }
                    if(that.state.state() === "pending") { that.state.resolve(); }
                });
        },

        init: function(){
            this.jsUtil     =  api.jsUtil;
            this.jsModel    =  api.jsModel;
            this.jsEvent    =  api.jsEvent;
            this.modules    =  api.jsModular.modules;
            this.queue      =  api.jsEvent.page.state;
            this.state      =  api.jsEvent.page.state = Deferred();
            this.tags       =  extend(true, {global:{}}, this.tags, this.options.tags);
            this.region     =  extend(true, {global:{}}, this.region, this.options.region);
            this.config     =  extend(true, {global:{}}, this.config, this.options.config);
            this.request    =  extend(true, {global:{}}, this.request, this.options.request);
            this.response   =  extend(true, {global:{}}, this.response, this.options.response);
            this.renderData =  extend(true, {global:{}}, this.renderData, this.options.renderData);
            this.sendArr    =  extend(true, [], this.sendArr, this.options.sendArr);
            this.reload     =  this.reload === true || this.options.reload === true;
            this.toRender(this.sendArr, [], Object.keys(this.tags), this.reload);
        },

        toRender: function(sendType, sendData, regionArr, reload){
            var that = this;
            var status = true;
            var defArr = [];
            var defIndex = -1;
            var renderState = Deferred();
            var typeArr = [].concat(sendType);
            var dataArr = [].concat(sendData);
            var regArr = [].concat(regionArr);
            each(typeArr, function(i, str){
                if(typeof str === "string" && str){
                    var strArr = str.split("/");
                    var type = typeof strArr[0] === "string" && strArr.shift() || "";
                    var regName = typeof strArr[0] === "string" && strArr.shift() || "global";
                    var branch = typeof strArr[0] === "string" && strArr.shift() || "";
                    var data = isPlainObject(dataArr[i]) && dataArr[i] || {};
                    var isEmpty = isEmptyObject(that.response[regName]);
                    if(type && (reload !== false || isEmpty)){
                        defArr[++defIndex] = Deferred();
                        (function(defIndex){
                            that.sendRequest(type, data, true)
                                .done(function(response){
                                    var oldResponse = that.response[regName];
                                    var oldIsObject = isPlainObject(oldResponse);
                                    (!oldIsObject) && (that.response[regName] = {});
                                    (!branch) && (that.response[regName] = response);
                                    (branch) && (that.response[regName][branch] = response);
                                    defArr[defIndex].resolve();
                                })
                                .fail(function(){
                                    status = false;
                                    defArr[defIndex].resolve();
                                })
                        })(defIndex);
                    }
                }
            });
            when.apply(null, defArr)
                .always(function(){
                    var beforeData = {};
                    var renderData = {};
                    var afterData  = {};
                    var cfgObj = { config: that.config };
                    var reqObj = { request: that.request };
                    var resObj = { response: that.response };
                    extend(true, beforeData, cfgObj, reqObj, resObj);
                    extend(true, renderData, cfgObj, reqObj, resObj);
                    extend(true, afterData,  cfgObj, reqObj, resObj);
                    that.beforeFunc(regArr, beforeData, status);
                    that.renderFunc(regArr, renderData, status);
                    that.afterFunc(regArr,  afterData,  status);
                });
            return that.renderState = renderState;
        },

        beforeFunc: function(regionArr, beforeData, status){
            var that = this;
            var region = that.region;
            var isArray = isPureArray(regionArr);
            var index = inPureArray("global", regionArr);
            if(isArray && index!==-1){
                regionArr.splice(index, 1);
                regionArr.unshift("global");
            }
            each(isArray?regionArr:[], function(index, value){
                var isObject = typeof value==="object" && value;
                var regName = isObject? Object.keys(value)[0]: value;
                if(typeof regName === "string" && regName){
                    that.tags[regName] &&
                    isPlainObject(region[regName]) &&
                    isPureFunction(region[regName].beforeFunc) &&
                    region[regName].beforeFunc(that, beforeData);
                }
            });
        },

        renderFunc: function(regionArr, renderData, status){
            var that = this;
            var regArr = [];
            var isArray = isPureArray(regionArr);
            $(function(){
                each(isArray? regionArr.sort(): [], function(index, value){
                    var isString = typeof value==="string" && value;
                    var isObject = typeof value==="object" && value;
                    var regName = isObject? Object.keys(value)[0]: value;
                    var gRegName = regName.split("/")[0];
                    var region = that.region[gRegName];
                    if((isString || isObject)){
                        regArr.push(gRegName);
                    }
                    if(!isPlainObject(region)){
                        that.region[gRegName] = {};
                    }
                    if(isString || isObject){
                        var cfgPath = "config";
                        var reqPath = "request";
                        var resPath = "response";
                        var cfgData = that.config[gRegName] || null;
                        var reqData = that.request[gRegName] || null;
                        var resData = that.response[gRegName] || null;
                        var cfgDynamic = that.region[gRegName].cfgDynamic === true;
                        var reqDynamic = that.region[gRegName].reqDynamic === true;
                        var resDynamic = that.region[gRegName].resDynamic === true;
                        var cfgExist = isObject && inPureArray("config", [].concat(value[regName])) !== -1;
                        var reqExist = isObject && inPureArray("request", [].concat(value[regName])) !== -1;
                        var resExist = isObject && inPureArray("response", [].concat(value[regName])) !== -1;
                        (isString || cfgExist) && that.setRenderData(regName, cfgPath, cfgData, cfgDynamic);
                        (isString || reqExist) && that.setRenderData(regName, reqPath, reqData, reqDynamic);
                        (isString || resExist) && that.setRenderData(regName, resPath, resData, resDynamic);
                    }
                });
                that.renderTemplate(regArr);
            });
        },

        afterFunc: function(regionArr, afterData, status){
            var that = this;
            var defArr = [];
            var region = that.region;
            var isArray = isPureArray(regionArr);
            var index = inPureArray("global", regionArr);
            if(isArray && index!==-1){
                regionArr.splice(index, 1);
                regionArr.push("global");
            }
            $(function(){
                when.apply(null, [].concat(that.queue))
                    .done(function(){
                        each(isArray?regionArr:[], function(index, value){
                            var isObject = typeof value==="object" && value;
                            var regName = isObject? Object.keys(value)[0]: value;
                            if(typeof regName === "string" && regName){
                                that.tags[regName] &&
                                isPlainObject(region[regName]) &&
                                isPureFunction(region[regName].afterFunc) &&
                                (defArr[defArr.length] = region[regName].afterFunc(that, afterData));
                            }
                        });
                        when.apply(null, defArr)
                            .done(function(){ status? that.renderState.resolve(): that.renderState.reject() })
                            .fail(function(){ that.renderState.reject() })
                    });
            });
        }

    });

});