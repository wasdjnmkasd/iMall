/** 模拟 touchSlider
 *  林鹏腾
 *  2018 04 12
 */
(function(factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory;
    } else {
        factory();
    }
}(function(){

    $.fn.roller = plugin;

    function plugin(options) {
        return this.each(function () {
            this._roller instanceof Roller
                ? this._roller.init()
                : this._roller = new Roller(this, options);
        });
    }

    function Roller(element, options){
        this.sortId = 2;
        this.state = "stop";
        this.edTimer = null;
        this.ingTimer = null;
        this.time = options.time;
        this.loop = options.loop;
        this.$element = $(element);
        this.$eVisual = $(options.eVisual);
        this.$eButton = $(options.eButton);
        this.$eRoller = $(options.eRoller);
        this.beRollFunc = options.beRollFunc;
        this.edRollFunc = options.edRollFunc;
        this.$eRoller.length > 1 && this.event();
        this.$eRoller.length > 1 && this.init();
    }

    Roller.prototype.init = function(){
        this.mark();
        this.copy();
        this.sort();
        this.style();
        this.toRoll("left");
    };

    Roller.prototype.mark = function(){
        this.$eRoller.each(function(index){
            $(this).attr("rollId", index+1)
        });
        this.$eButton.each(function(index){
            $(this).attr("btnId", index+1)
        });
    };

    Roller.prototype.copy = function(){
        var $lastClone = this.$eRoller.last().clone();
        var $firstClone = this.$eRoller.first().clone();
        this.$eRoller.last().after($firstClone);
        this.$eRoller.first().before($lastClone);
        this.$eRoller = this.$eRoller.parent().find("[rollId]");
    };

    Roller.prototype.sort = function(){
        this.$eRoller.each(function(index){
            $(this).attr("sortId", index+1)
        });
    };

    Roller.prototype.style = function(){
        var eVWidth =  this.$eVisual.width();
        var eVPosition = this.$eVisual.css("position");
        this.$eVisual.css({
            "position":
                eVPosition === "absolute"? "absolute":
                eVPosition === "fixed"? "fixed": "relative"
        });
        this.$eRoller.each(function(index){
            $(this).css({ "transform": "translate3d(" + (index - 1) * eVWidth + "px, 0px, 0px)"})
        });
        this.$eRoller.css({
            "float": "none",
            "transition": "none",
            "position": "absolute",
            "bottom": "auto",
            "right": "auto",
            "left": 0,
            "top": 0
        });
    };

    Roller.prototype.event = function(){
        var that = this;
        that.$eButton.on("touchstart click", "", function(ev){
            clearTimeout(that.ingTimer);
            clearTimeout(that.edTimer);
            var sortId = that.sortId;
            var btnId = $(this).attr("btnId");
            var rollId = that.$eRoller.eq(sortId-1).attr("rollId");
            if(that.state !== 'stop'){ that.stop() };
            if(btnId !== rollId){ that.rolling(btnId*1+1); that.toRoll("left"); }
        });
        that.$eVisual.on("touchstart", function(ev){
            clearTimeout(that.ingTimer);
            clearTimeout(that.edTimer);
            that.stop();
            var event = ev || window.event;
            var changedTouches = event.changedTouches;
            that.SDir = 0;
            that.moveSX = 0;
            that.startX = changedTouches[0].clientX;
            that.$eRoller.css("transition", "none");
        });
        that.$eVisual.on("touchmove", function(ev){
            var event = ev || window.event;
            var changedTouches = event.changedTouches;
            that.moveX = changedTouches[0].clientX;
            that.moveSX = that.moveX - that.startX;
            that.$eRoller.each(function(index){
                var sortId = that.sortId;
                var eVWidth = that.$eVisual.width();
                var range = (index + 1 - sortId) * eVWidth + that.moveSX;
                $(this).css({ "transform": "translate3d(" + range + "px, 0px, 0px)" });
            });
            event.stopPropagation();
            event.preventDefault();
        });
        that.$eVisual.on("touchend", function(){
            var width = that.$eVisual.width();
            var moveDir = that.moveSX>(width/5)? "right": that.moveSX<-(width/5)? "left": "none";
            that.rolling(moveDir);
            that.toRoll("left");
        });
    };

    Roller.prototype.place = function(id){
        var that = this;
        this.state = 'running';
        this.$eRoller.each(function(index){
            var total = (index + 1 - id) *  that.$eVisual.width();
            $(this).css("transform", "translate3d(" + total + "px, 0px, 0px)");
        });
    };

    Roller.prototype.toRoll = function(type){
        var that = this;
        that.ingTimer = setTimeout(function(){
            that.loop && that.rolling(type);
            that.loop && that.toRoll(type);
        }, that.time||3500);
    };

    Roller.prototype.start = function(type){
        var sortId = this.sortId;
        var eLength = this.$eRoller.length;
        if(typeof type === "number") { this.sortId = type }
        if(type === "right") { this.sortId = sortId > 0 ? sortId - 1 : eLength; }
        if(type === "left") { this.sortId = sortId < eLength? sortId + 1: 1; }
        this.beRollFunc && this.beRollFunc(this, this.sortId);
        this.$eRoller.css({ "transition": "600ms ease" });
        this.state = 'start';
    };

    Roller.prototype.rolling = function(type){
        var that = this;
        that.start(type);
        that.place(this.sortId);
        that.edTimer = setTimeout(function(){that.stop()}, 600);
    };

    Roller.prototype.stop = function(){
        var sortId = this.sortId;
        var eLength = this.$eRoller.length;
        if(sortId === eLength) { this.sortId = 2 }
        if(sortId === 1) { this.sortId = eLength - 1 }
        this.$eRoller.css("transition", "none");
        this.place(this.sortId);
        this.edRollFunc && this.edRollFunc(this, sortId);
        this.state = 'stop';
    };

}));

