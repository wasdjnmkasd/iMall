
'use strict';

(function($){

    $.fn.scrollMonitor  = Plugin;

    function Plugin(option) {
        return this.each(function () {
            var options = typeof option === 'object' && option || {};
            this._scrollMonitor instanceof ScrollMonitor
                ? this._scrollMonitor.init()
                : this._scrollMonitor = new ScrollMonitor(this, options);
        })
    }

    function ScrollMonitor(element, options){
        var that            = this;
        this.$body          = $(document.body);
        this.$scrollElement = $(element).is(document.body)? $(window): $(element);
        this.options        = $.extend({}, ScrollMonitor.DEFAULTS, options);
        this.selector       = '.ScrollMonitor>li>a[monitor]';
        this.offsets        = [];
        this.targets        = [];
        this.targetMap      = {};
        this.scrollHeight   = 0;
        this.timer          = null;
        this.$scrollElement.on(
            'scroll.bs.scrollMonitor', $.proxy(this.process, this)
        );
        $(element).find(this.selector).on(
            'click.bs.scrollMonitor', function(){
                that.getTargetMap();
                var thisScrollTop = that.$scrollElement.scrollTop();
                var position_offset = that.targetMap[$(this).attr("monitor")];
                var differenceTop = position_offset - that.options.position_offset;
                var toScrollTop = 0;
                var differenceVal = 0;
                var everyScrollTop = 0;

                if($(this).hasClass("toTop")){
                    toScrollTop = 0;
                    differenceVal = toScrollTop - thisScrollTop;
                    everyScrollTop = Math.ceil(differenceVal/30);
                }else{
                    toScrollTop = Math.round(differenceTop>0? differenceTop: 0);
                    differenceVal = toScrollTop - thisScrollTop;
                    everyScrollTop = Math.ceil(differenceVal/30);
                }

                if(differenceVal){
                    clearTimeout(that.timer);
                    that.toScrollTop(differenceVal, toScrollTop, everyScrollTop);
                }
            }
        );

        this.init();
    }

    ScrollMonitor.DEFAULTS = {
        active_offset: 10,
        position_offset: 10
    };

    ScrollMonitor.prototype.init = function () {
        this.refresh();
        this.process();
    };

    ScrollMonitor.prototype.clear = function () {
        $(this.selector)
            .parentsUntil(this.options.target, '.active')
            .removeClass('active')
    };

    ScrollMonitor.prototype.getScrollHeight = function () {
        return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
    };

    ScrollMonitor.prototype.refresh = function () {
        var that          = this;
        var offsetMethod  = 'offset';
        var offsetBase    = 0;
        this.offsets      = [];
        this.targets      = [];
        this.scrollHeight = this.getScrollHeight();

        if (!$.isWindow(this.$scrollElement[0])) {
            offsetMethod = 'position';
            offsetBase   = this.$scrollElement.scrollTop();
        }

        this.$body
            .find(this.selector)
            .map(function () {
                var $el   = $(this);
                var monitor  = $el.attr('monitor');
                var $monitor = /^#./.test(monitor) && $(monitor);

                return ($monitor
                    && $monitor.length
                    && $monitor.is(':visible')
                    && [[$monitor[offsetMethod]().top + offsetBase, monitor]]) || null
            })
            .sort(function (a, b) { return a[0] - b[0] })
            .each(function () {
                that.offsets.push(this[0]);
                that.targets.push(this[1]);
            })
    }

    ScrollMonitor.prototype.process = function () {
        var scrollTop    = this.$scrollElement.scrollTop() + this.options.active_offset;
        var scrollHeight = this.getScrollHeight();
        var maxScroll    = this.options.active_offset + scrollHeight - this.$scrollElement.height();
        var offsets      = this.offsets;
        var targets      = this.targets;
        var activeTarget = this.activeTarget;
        var i;

        if (this.scrollHeight != scrollHeight) {
            this.refresh();
        }
        if (scrollTop >= maxScroll) {
            return activeTarget != (i = targets[targets.length - 1]) && this.activate(i)
        }
        if (activeTarget && scrollTop < offsets[0]) {
            this.activeTarget = null;
            return this.clear();
        }

        for (i = offsets.length; i--;) {
            activeTarget != targets[i]
            && scrollTop >= offsets[i]-3
            && (offsets[i + 1] === undefined || scrollTop < offsets[i + 1])
            && this.activate(targets[i]);
        }
    };

    ScrollMonitor.prototype.activate = function (target) {
        this.activeTarget = target;
        this.clear();
        var selector = this.selector + '[monitor="' + target + '"]';
        var active = $(selector)
            .parents('li')
            .addClass('active');

        if (active.parent('.dropdown-menu').length) {
            active = active
                .closest('li.dropdown')
                .addClass('active');
        }
    }

    ScrollMonitor.prototype.getTargetMap = function (target) {
        var that          = this;
        var offsetMethod  = 'offset';
        var offsetBase    = 0;
        this.targetMap      = [];

        if (!$.isWindow(this.$scrollElement[0])) {
            offsetMethod = 'position';
            offsetBase   = this.$scrollElement.scrollTop();
        }

        this.$body
            .find(this.selector)
            .map(function () {
                var $el   = $(this);
                var monitor  = $el.attr('monitor');
                var $monitor = /^#./.test(monitor) && $(monitor);
                if($monitor && $monitor.length && $monitor.is(':visible')){
                    that.targetMap[monitor] = $monitor[offsetMethod]().top + offsetBase;
                }
            })
    };

    ScrollMonitor.prototype.toScrollTop = function(differenceVal, toScrollTop, everyScrollTop){
        var that = this;
        var scrollTop    = this.$scrollElement.scrollTop();
        var scrollHeight = this.getScrollHeight();
        var maxScroll    = this.options.active_offset + scrollHeight - this.$scrollElement.height();
        if(differenceVal>0 && scrollTop<toScrollTop && Math.abs(scrollTop-toScrollTop)>1){
            if(scrollTop+everyScrollTop<toScrollTop
               && scrollTop+everyScrollTop<maxScroll){
                this.$scrollElement.scrollTop(scrollTop+everyScrollTop)
            }else{
                var minScrollTop = maxScroll>toScrollTop? toScrollTop: maxScroll;
                this.$scrollElement.scrollTop(minScrollTop);
            }
            this.timer = setTimeout(function(){
                that.toScrollTop(differenceVal, toScrollTop, everyScrollTop)
            }, 10)
        }else if(differenceVal<0 && scrollTop>toScrollTop && Math.abs(scrollTop-toScrollTop)>1){
            if(scrollTop+everyScrollTop>0
                && scrollTop+everyScrollTop>toScrollTop){
                this.$scrollElement.scrollTop(scrollTop+everyScrollTop)
            }else{
                var maxScrollTop = toScrollTop>0? toScrollTop: 0;
                this.$scrollElement.scrollTop(maxScrollTop)
            }
            this.timer = setTimeout(function(){
                that.toScrollTop(differenceVal, toScrollTop, everyScrollTop)
            },10)
        }
    }

})(window.jQuery);