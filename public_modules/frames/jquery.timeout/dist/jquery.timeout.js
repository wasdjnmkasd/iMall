
(function(factory){
    if(typeof define === 'function' && define.amd) {
        define([], factory);
    }else if(typeof exports === 'object'){
        module.exports = factory;
    }else{
        factory();
    }
}(function(){

    var timeout = {};
    var arrSlice = Array.prototype.slice;
    var objExist = function(obj){ var name; for(name in obj){ return true; } return false; };

    function plugin(args) {

        var fn = this;
        var val = typeof args[0];
        var name = val === "string" && args.shift();

        if(val !== "string"){ return this }

        name?
            objExist(timeout[name])?
                timeout[name].reload(name, fn, args):
                timeout[name] = new Timeout(name, fn, args):
            new Timeout(name, fn, args);

        return this;
    }

    function Timeout(name, fn, args){
        this.fn = fn;
        this.name = name;
        this.func = [];
        this.param = [];
        this.cache = {};
        this.delay = this.getData(args, "delay");
        this.status = this.getData(args, "status");
        this.callback = this.getData(args, "callback");
        this.parameter = this.getData(args, "parameter");
        return this.status === "clear"? {}: this.init();
    }

    Timeout.prototype.init = function(){
        this.setFunc();
        this.execute();
    };

    Timeout.prototype.reload = function(name, fn, args){
        this.fn = fn;
        this.name = name;
        this.cache.delay = this.delay;
        this.cache.status = this.status;
        this.delay = this.getData(args, "delay");
        this.status = this.getData(args, "status");
        this.callback = this.getData(args, "callback");
        this.parameter = this.getData(args, "parameter");
        (this.status <= -1 || this.status === "clear")? this.cleanup(): this.setFunc();
        (this.status >= +1 || this.status === "start" || this.status === "loop") && !this.doing && this.execute();
    };

    Timeout.prototype.getData = function(args, type){
        if(type === "delay"){
            return (/^\d*$/gi).test(args[0]) && args[0] >= 0? args.shift(): (this.cache.delay||0);
        }
        if(type === "status"){
            if((/^loop$/gi).test(args[0])) return args.shift() || "stop";
            if((/^stop$/gi).test(args[0])) return args.shift() || "stop";
            if((/^start$/gi).test(args[0])) return args.shift() || "stop";
            if((/^clear$/gi).test(args[0])) return args.shift() || "stop";
            if((/^-?\d*$/gi).test(args[0])) return args.shift()*1 || "stop";
            return this.cache.status || "stop";
        }
        if(type === "callback"){
            return args[0] && (typeof args[0] === "function" || typeof args[0] === "string")? args.shift(): null;
        }
        if(type === "parameter"){
            return this.callback? args: [];
        }
    };

    Timeout.prototype.setFunc = function(){
        if(!this.callback){
            return null;
        }
        if(typeof this.callback === "function"){
            this.func.push(this.callback);
            this.param.push(this.parameter);
        }
        if(typeof this.callback === "string" && typeof this.fn[this.callback] === "function"){
            this.func.push(this.callback);
            this.param.push(this.parameter);
        }
    };

    Timeout.prototype.execute = function(){
        var that = this;
        this.doing = true;
        this.id && clearTimeout(this.id);
        if(this.func.length > 0 && this.delay > 0){
            this.id = setTimeout(
                function() {
                    for(var i=0,l=that.func.length; i<l; i++){
                        if(that.status === "stop"){ break; }
                        if(that.status === "clear"){ break; }
                        if(that.status >= +1 && i === 0){ that.status -= 1; }
                        if(typeof that.func[i] === "string"){ that.fn[that.func[i]].apply(that.fn, that.param[i]); }
                        if(typeof that.func[i] === "function"){ that.func[i].apply(that, that.param[i]); }
                    }
                    that.doing = false;
                    that.func.length === 0 && (that.status = "stop");
                    that.status === "start" && (that.status = "stop");
                    that.status <= -1 && (that.status = "clear");
                    that.status === 0 && (that.status = "stop");
                    that.status >= +1 && that.execute();
                    that.status === "loop" && that.execute();
                    that.status === "clear" && that.cleanup();
                },
                this.delay
            );
        }else{
            for(var i=0,l=this.func.length; i<l; i++){
                if(this.status === "stop"){ break; }
                if(this.status === "clear"){ break; }
                if(this.status >= +1 && i === 0){ this.status -= 1; }
                if(typeof this.func[i] === "string"){ this.fn[this.func[i]].apply(this.fn, this.param[i]); }
                if(typeof this.func[i] === "function"){ this.func[i].apply(this, this.param[i]); }
            }
            this.doing = false;
            this.func.length === 0 && (this.status = "stop");
            this.status === "start" && (this.status = "stop");
            this.status <= -1 && (this.status = "clear");
            this.status === 0 && (this.status = "stop");
            this.status >= +1 && this.execute();
            this.status === "loop" && this.execute();
            this.status === "clear" && this.cleanup();
        }
    };

    Timeout.prototype.cleanup = function(){
        this.id && clearTimeout(this.id);
        this.name && delete timeout[this.name];
    };

    $.timeout = $.fn.timeout = function(){
        return plugin.call(this, arrSlice.call(arguments));
    };

}));

