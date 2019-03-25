function getHeight() {
    var t = $(window).height();
    $(".full-image").length && $(".full-image").css({
        height: t
    }),
    $(".full-screen").length && $(".full-screen").css({
        height: t + 17
    })
}
function frontPage() {
    if ($(".featured-post").length) {
        var t = $(".item-4 img").height() + $(".item-4 img").offset().top - 250;
        $(".featured-post").css({
            height: t
        }),
        Waypoint.refreshAll()
    }
}
function init_videos() {
    $(".play").each(function() {
        var t = $(this).parent()
          , e = t.find("img")
          , i = $(this).data("video-id")
          , o = t.width()
          , n = t.height();
        $(this).click(function() {
            var r = $('<div class="intrinsic-container vimeo"/>')
              , s = $('<iframe src="//player.vimeo.com/video/' + i + '?title=0&amp;byline=0&amp;portrait=0&amp;color=EA8BBC&amp;autoplay=1" width="' + o + '" height="' + n + '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');
            r.append(s),
            e.fadeOut("", function() {
                t.append(r)
            })
        })
    })
}
function init_sticky() {
    if ($(window).width() > 768) {
        new Waypoint.Sticky({
            element: $(".sticky")[0]
        });
        $("#info").waypoint(function(t) {
            $(".sticky").toggleClass("stuck", "up" === t),
            $(".sticky").toggleClass("sticky-surpassed", "down" === t)
        }, {
            offset: function() {
                return $(".sticky").outerHeight() + 50
            }
        })
    }
}
$(document).ready(function() {
    getHeight(),
    init_videos(),
    init_sticky(),
    $(window).load(function() {
        $("#preloader").fadeOut("slow", function() {
            $(this).remove()
        })
    }),
    navigator.userAgent.match(/(iPod|iPhone|iPad)/) && ($('img[src$=".gif"]').addClass("gif_animata"),
    $(".gif_animata").each(function(t, e) {
        var i = $(this).attr("src");
        $(this).attr("src", ""),
        $(this).attr("src", i + "?" + (new Date).getTime()),
        $(this).onload = function() {
            $(".gif_animata").fadeIn(500)
        }
    })),
    $(".full-screen div").each(function(t) {
        $(this).addClass("item-" + (t + 1))
    }),
    $("#gallery").length && $("#gallery a").tosrus({
        pagination: {
            add: !1
        },
        infinite: !0,
        keys: !0,
        caption: {
            add: !0
        }
    }),
    $(".match").length && $(".match").matchHeight(),
    $("body").hasClass("work") && $(".menu_work").addClass("active"),
    $("body").hasClass("spin360") && $(".menu_spin360").addClass("active"),
    $("img.lazy").lazyload({
        effect: "fadeIn",
        load: function() {
            $(this).removeClass("lazy"),
            Waypoint.refreshAll()
        }
    });
    setInterval(function() {
        var t = moment();
        $(window).width() > 768 ? ($("#date-part").html(t.format("DD.MM.YYYY")),
        $("#time-part").html(t.format("HH:mm:ss"))) : ($("#date-part").html(t.format("DD.MM.YY")),
        $("#time-part").html(t.format("HH:mm:ss")))
    }, 100);
    $("a.projects-index-item").hover(function() {
        var t = $(this).data("slug");
        $(".project-index-" + t).addClass("index-hovered-project")
    }, function() {
        $(".project-index-images-item").removeClass("index-hovered-project")
    }),
    $(".project-list div").each(function() {
        $this = $(this),
        $this.is(":first-child") && $this.addClass("first"),
        $this.is(":last-child") && $this.addClass("last")
    }),
    $(".col-6.pack-shot").filter(function(t, e) {
        return t % 2 == 1
    }).addClass("second"),
    $(".first video").length && $(".first video")[0].play();
    var t = $("video").not("[autoplay='autoplay']")
      , e = 50;
    $(document).on("scroll", function() {
        var i = $(window).scrollTop() + e
          , o = $(window).scrollTop() + $(window).height() - e;
        t.each(function(t, e) {
            var n = $(this).offset().top
              , r = $(this).height() + n;
            i < r && o > n ? $(this).get(0).play() : $(this).get(0).pause()
        })
    }),
    $("#newsletter-btn").click(function(t) {
        t.stopPropagation(),
        $("#newsletter").toggle(),
        $("#newsletter-btn").toggle(),
        $("#inputEmail").focus()
    }),
    $("#inputEmail").on("click", function(t) {
        t.stopPropagation()
    })
}),
function() {
    "use strict";
    function t(o) {
        if (!o)
            throw new Error("No options passed to Waypoint constructor");
        if (!o.element)
            throw new Error("No element option passed to Waypoint constructor");
        if (!o.handler)
            throw new Error("No handler option passed to Waypoint constructor");
        this.key = "waypoint-" + e,
        this.options = t.Adapter.extend({}, t.defaults, o),
        this.element = this.options.element,
        this.adapter = new t.Adapter(this.element),
        this.callback = o.handler,
        this.axis = this.options.horizontal ? "horizontal" : "vertical",
        this.enabled = this.options.enabled,
        this.triggerPoint = null,
        this.group = t.Group.findOrCreate({
            name: this.options.group,
            axis: this.axis
        }),
        this.context = t.Context.findOrCreateByElement(this.options.context),
        t.offsetAliases[this.options.offset] && (this.options.offset = t.offsetAliases[this.options.offset]),
        this.group.add(this),
        this.context.add(this),
        i[this.key] = this,
        e += 1
    }
    var e = 0
      , i = {};
    t.prototype.queueTrigger = function(t) {
        this.group.queueTrigger(this, t)
    }
    ,
    t.prototype.trigger = function(t) {
        this.enabled && this.callback && this.callback.apply(this, t)
    }
    ,
    t.prototype.destroy = function() {
        this.context.remove(this),
        this.group.remove(this),
        delete i[this.key]
    }
    ,
    t.prototype.disable = function() {
        return this.enabled = !1,
        this
    }
    ,
    t.prototype.enable = function() {
        return this.context.refresh(),
        this.enabled = !0,
        this
    }
    ,
    t.prototype.next = function() {
        return this.group.next(this)
    }
    ,
    t.prototype.previous = function() {
        return this.group.previous(this)
    }
    ,
    t.invokeAll = function(t) {
        var e = [];
        for (var o in i)
            e.push(i[o]);
        for (var n = 0, r = e.length; r > n; n++)
            e[n][t]()
    }
    ,
    t.destroyAll = function() {
        t.invokeAll("destroy")
    }
    ,
    t.disableAll = function() {
        t.invokeAll("disable")
    }
    ,
    t.enableAll = function() {
        t.invokeAll("enable")
    }
    ,
    t.refreshAll = function() {
        t.Context.refreshAll()
    }
    ,
    t.viewportHeight = function() {
        return window.innerHeight || document.documentElement.clientHeight
    }
    ,
    t.viewportWidth = function() {
        return document.documentElement.clientWidth
    }
    ,
    t.adapters = [],
    t.defaults = {
        context: window,
        continuous: !0,
        enabled: !0,
        group: "default",
        horizontal: !1,
        offset: 0
    },
    t.offsetAliases = {
        "bottom-in-view": function() {
            return this.context.innerHeight() - this.adapter.outerHeight()
        },
        "right-in-view": function() {
            return this.context.innerWidth() - this.adapter.outerWidth()
        }
    },
    window.Waypoint = t
}(),
function() {
    "use strict";
    function t(t) {
        this.element = t,
        this.Adapter = o.Adapter,
        this.adapter = new this.Adapter(t),
        this.key = "waypoint-context-" + e,
        this.didScroll = !1,
        this.didResize = !1,
        this.oldScroll = {
            x: this.adapter.scrollLeft(),
            y: this.adapter.scrollTop()
        },
        this.waypoints = {
            vertical: {},
            horizontal: {}
        },
        t.waypointContextKey = this.key,
        i[t.waypointContextKey] = this,
        e += 1,
        this.createThrottledScrollHandler(),
        this.createThrottledResizeHandler()
    }
    var e = 0
      , i = {}
      , o = window.Waypoint
      , n = window.onload;
    t.prototype.add = function(t) {
        var e = t.options.horizontal ? "horizontal" : "vertical";
        this.waypoints[e][t.key] = t,
        this.refresh()
    }
    ,
    t.prototype.checkEmpty = function() {
        var t = this.Adapter.isEmptyObject(this.waypoints.horizontal)
          , e = this.Adapter.isEmptyObject(this.waypoints.vertical);
        t && e && (this.adapter.off(".waypoints"),
        delete i[this.key])
    }
    ,
    t.prototype.createThrottledResizeHandler = function() {
        function t() {
            e.handleResize(),
            e.didResize = !1
        }
        var e = this;
        this.adapter.on("resize.waypoints", function() {
            e.didResize || (e.didResize = !0,
            o.requestAnimationFrame(t))
        })
    }
    ,
    t.prototype.createThrottledScrollHandler = function() {
        function t() {
            e.handleScroll(),
            e.didScroll = !1
        }
        var e = this;
        this.adapter.on("scroll.waypoints", function() {
            (!e.didScroll || o.isTouch) && (e.didScroll = !0,
            o.requestAnimationFrame(t))
        })
    }
    ,
    t.prototype.handleResize = function() {
        o.Context.refreshAll()
    }
    ,
    t.prototype.handleScroll = function() {
        var t = {}
          , e = {
            horizontal: {
                newScroll: this.adapter.scrollLeft(),
                oldScroll: this.oldScroll.x,
                forward: "right",
                backward: "left"
            },
            vertical: {
                newScroll: this.adapter.scrollTop(),
                oldScroll: this.oldScroll.y,
                forward: "down",
                backward: "up"
            }
        };
        for (var i in e) {
            var o = e[i]
              , n = o.newScroll > o.oldScroll ? o.forward : o.backward;
            for (var r in this.waypoints[i]) {
                var s = this.waypoints[i][r]
                  , a = o.oldScroll < s.triggerPoint
                  , l = o.newScroll >= s.triggerPoint;
                (a && l || !a && !l) && (s.queueTrigger(n),
                t[s.group.id] = s.group)
            }
        }
        for (var h in t)
            t[h].flushTriggers();
        this.oldScroll = {
            x: e.horizontal.newScroll,
            y: e.vertical.newScroll
        }
    }
    ,
    t.prototype.innerHeight = function() {
        return this.element == this.element.window ? o.viewportHeight() : this.adapter.innerHeight()
    }
    ,
    t.prototype.remove = function(t) {
        delete this.waypoints[t.axis][t.key],
        this.checkEmpty()
    }
    ,
    t.prototype.innerWidth = function() {
        return this.element == this.element.window ? o.viewportWidth() : this.adapter.innerWidth()
    }
    ,
    t.prototype.destroy = function() {
        var t = [];
        for (var e in this.waypoints)
            for (var i in this.waypoints[e])
                t.push(this.waypoints[e][i]);
        for (var o = 0, n = t.length; n > o; o++)
            t[o].destroy()
    }
    ,
    t.prototype.refresh = function() {
        var t, e = this.element == this.element.window, i = e ? void 0 : this.adapter.offset(), n = {};
        this.handleScroll(),
        t = {
            horizontal: {
                contextOffset: e ? 0 : i.left,
                contextScroll: e ? 0 : this.oldScroll.x,
                contextDimension: this.innerWidth(),
                oldScroll: this.oldScroll.x,
                forward: "right",
                backward: "left",
                offsetProp: "left"
            },
            vertical: {
                contextOffset: e ? 0 : i.top,
                contextScroll: e ? 0 : this.oldScroll.y,
                contextDimension: this.innerHeight(),
                oldScroll: this.oldScroll.y,
                forward: "down",
                backward: "up",
                offsetProp: "top"
            }
        };
        for (var r in t) {
            var s = t[r];
            for (var a in this.waypoints[r]) {
                var l, h, c, p, d, u = this.waypoints[r][a], f = u.options.offset, w = u.triggerPoint, g = 0, m = null == w;
                u.element !== u.element.window && (g = u.adapter.offset()[s.offsetProp]),
                "function" == typeof f ? f = f.apply(u) : "string" == typeof f && (f = parseFloat(f),
                u.options.offset.indexOf("%") > -1 && (f = Math.ceil(s.contextDimension * f / 100))),
                l = s.contextScroll - s.contextOffset,
                u.triggerPoint = g + l - f,
                h = w < s.oldScroll,
                c = u.triggerPoint >= s.oldScroll,
                p = h && c,
                d = !h && !c,
                !m && p ? (u.queueTrigger(s.backward),
                n[u.group.id] = u.group) : !m && d ? (u.queueTrigger(s.forward),
                n[u.group.id] = u.group) : m && s.oldScroll >= u.triggerPoint && (u.queueTrigger(s.forward),
                n[u.group.id] = u.group)
            }
        }
        return o.requestAnimationFrame(function() {
            for (var t in n)
                n[t].flushTriggers()
        }),
        this
    }
    ,
    t.findOrCreateByElement = function(e) {
        return t.findByElement(e) || new t(e)
    }
    ,
    t.refreshAll = function() {
        for (var t in i)
            i[t].refresh()
    }
    ,
    t.findByElement = function(t) {
        return i[t.waypointContextKey]
    }
    ,
    window.onload = function() {
        n && n(),
        t.refreshAll()
    }
    ,
    o.requestAnimationFrame = function(t) {
        (window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || function(t) {
            window.setTimeout(t, 1e3 / 60)
        }
        ).call(window, t)
    }
    ,
    o.Context = t
}(),
function() {
    "use strict";
    function t(t, e) {
        return t.triggerPoint - e.triggerPoint
    }
    function e(t, e) {
        return e.triggerPoint - t.triggerPoint
    }
    function i(t) {
        this.name = t.name,
        this.axis = t.axis,
        this.id = this.name + "-" + this.axis,
        this.waypoints = [],
        this.clearTriggerQueues(),
        o[this.axis][this.name] = this
    }
    var o = {
        vertical: {},
        horizontal: {}
    }
      , n = window.Waypoint;
    i.prototype.add = function(t) {
        this.waypoints.push(t)
    }
    ,
    i.prototype.clearTriggerQueues = function() {
        this.triggerQueues = {
            up: [],
            down: [],
            left: [],
            right: []
        }
    }
    ,
    i.prototype.flushTriggers = function() {
        for (var i in this.triggerQueues) {
            var o = this.triggerQueues[i]
              , n = "up" === i || "left" === i;
            o.sort(n ? e : t);
            for (var r = 0, s = o.length; s > r; r += 1) {
                var a = o[r];
                (a.options.continuous || r === o.length - 1) && a.trigger([i])
            }
        }
        this.clearTriggerQueues()
    }
    ,
    i.prototype.next = function(e) {
        this.waypoints.sort(t);
        var i = n.Adapter.inArray(e, this.waypoints);
        return i === this.waypoints.length - 1 ? null : this.waypoints[i + 1]
    }
    ,
    i.prototype.previous = function(e) {
        this.waypoints.sort(t);
        var i = n.Adapter.inArray(e, this.waypoints);
        return i ? this.waypoints[i - 1] : null
    }
    ,
    i.prototype.queueTrigger = function(t, e) {
        this.triggerQueues[e].push(t)
    }
    ,
    i.prototype.remove = function(t) {
        var e = n.Adapter.inArray(t, this.waypoints);
        e > -1 && this.waypoints.splice(e, 1)
    }
    ,
    i.prototype.first = function() {
        return this.waypoints[0]
    }
    ,
    i.prototype.last = function() {
        return this.waypoints[this.waypoints.length - 1]
    }
    ,
    i.findOrCreate = function(t) {
        return o[t.axis][t.name] || new i(t)
    }
    ,
    n.Group = i
}(),
function() {
    "use strict";
    function t(t) {
        this.$element = e(t)
    }
    var e = window.jQuery
      , i = window.Waypoint;
    e.each(["innerHeight", "innerWidth", "off", "offset", "on", "outerHeight", "outerWidth", "scrollLeft", "scrollTop"], function(e, i) {
        t.prototype[i] = function() {
            var t = Array.prototype.slice.call(arguments);
            return this.$element[i].apply(this.$element, t)
        }
    }),
    e.each(["extend", "inArray", "isEmptyObject"], function(i, o) {
        t[o] = e[o]
    }),
    i.adapters.push({
        name: "jquery",
        Adapter: t
    }),
    i.Adapter = t
}(),
function() {
    "use strict";
    function t(t) {
        return function() {
            var i = []
              , o = arguments[0];
            return t.isFunction(arguments[0]) && (o = t.extend({}, arguments[1]),
            o.handler = arguments[0]),
            this.each(function() {
                var n = t.extend({}, o, {
                    element: this
                });
                "string" == typeof n.context && (n.context = t(this).closest(n.context)[0]),
                i.push(new e(n))
            }),
            i
        }
    }
    var e = window.Waypoint;
    window.jQuery && (window.jQuery.fn.waypoint = t(window.jQuery)),
    window.Zepto && (window.Zepto.fn.waypoint = t(window.Zepto))
}(),
function() {
    "use strict";
    function t(o) {
        this.options = e.extend({}, i.defaults, t.defaults, o),
        this.element = this.options.element,
        this.$element = e(this.element),
        this.createWrapper(),
        this.createWaypoint()
    }
    var e = window.jQuery
      , i = window.Waypoint;
    t.prototype.createWaypoint = function() {
        var t = this.options.handler;
        this.waypoint = new i(e.extend({}, this.options, {
            element: this.wrapper,
            handler: e.proxy(function(e) {
                var i = this.options.direction.indexOf(e) > -1
                  , o = i ? this.$element.outerHeight(!0) : "";
                this.$wrapper.height(o),
                this.$element.toggleClass(this.options.stuckClass, i),
                t && t.call(this, e)
            }, this)
        }))
    }
    ,
    t.prototype.createWrapper = function() {
        this.options.wrapper && this.$element.wrap(this.options.wrapper),
        this.$wrapper = this.$element.parent(),
        this.wrapper = this.$wrapper[0]
    }
    ,
    t.prototype.destroy = function() {
        this.$element.parent()[0] === this.wrapper && (this.waypoint.destroy(),
        this.$element.removeClass(this.options.stuckClass),
        this.options.wrapper && this.$element.unwrap())
    }
    ,
    t.defaults = {
        wrapper: '<div class="sticky-wrapper" />',
        stuckClass: "stuck",
        direction: "down right"
    },
    i.Sticky = t
}(),
function(t) {
    var e = -1
      , i = -1
      , o = function(t) {
        return parseFloat(t) || 0
    }
      , n = function(e) {
        var i = {
            byRow: !0,
            property: "height",
            target: null,
            remove: !1
        };
        return "object" == typeof e ? t.extend(i, e) : ("boolean" == typeof e ? i.byRow = e : "remove" === e && (i.remove = !0),
        i)
    }
      , r = t.fn.matchHeight = function(e) {
        if ((e = n(e)).remove) {
            var i = this;
            return this.css(e.property, ""),
            t.each(r._groups, function(t, e) {
                e.elements = e.elements.not(i)
            }),
            this
        }
        return 1 >= this.length && !e.target ? this : (r._groups.push({
            elements: this,
            options: e
        }),
        r._apply(this, e),
        this)
    }
    ;
    r._groups = [],
    r._throttle = 80,
    r._maintainScroll = !1,
    r._beforeUpdate = null,
    r._afterUpdate = null,
    r._apply = function(e, i) {
        var s = n(i)
          , a = t(e)
          , l = [a]
          , h = t(window).scrollTop()
          , c = t("html").outerHeight(!0)
          , p = a.parents().filter(":hidden");
        return p.each(function() {
            var e = t(this);
            e.data("style-cache", e.attr("style"))
        }),
        p.css("display", "block"),
        s.byRow && !s.target && (a.each(function() {
            var e = t(this)
              , i = e.css("display");
            "inline-block" !== i && "inline-flex" !== i && (i = "block"),
            e.data("style-cache", e.attr("style")),
            e.css({
                display: i,
                "padding-top": "0",
                "padding-bottom": "0",
                "margin-top": "0",
                "margin-bottom": "0",
                "border-top-width": "0",
                "border-bottom-width": "0",
                height: "100px"
            })
        }),
        l = function(e) {
            var i = null
              , n = [];
            return t(e).each(function() {
                var e = t(this)
                  , r = e.offset().top - o(e.css("margin-top"))
                  , s = 0 < n.length ? n[n.length - 1] : null;
                null === s ? n.push(e) : 1 >= Math.floor(Math.abs(i - r)) ? n[n.length - 1] = s.add(e) : n.push(e),
                i = r
            }),
            n
        }(a),
        a.each(function() {
            var e = t(this);
            e.attr("style", e.data("style-cache") || "")
        })),
        t.each(l, function(e, i) {
            var n = t(i)
              , r = 0;
            if (s.target)
                r = s.target.outerHeight(!1);
            else {
                if (s.byRow && 1 >= n.length)
                    return void n.css(s.property, "");
                n.each(function() {
                    var e = t(this)
                      , i = e.css("display");
                    "inline-block" !== i && "inline-flex" !== i && (i = "block"),
                    (i = {
                        display: i
                    })[s.property] = "",
                    e.css(i),
                    e.outerHeight(!1) > r && (r = e.outerHeight(!1)),
                    e.css("display", "")
                })
            }
            n.each(function() {
                var e = t(this)
                  , i = 0;
                s.target && e.is(s.target) || ("border-box" !== e.css("box-sizing") && (i += o(e.css("border-top-width")) + o(e.css("border-bottom-width")),
                i += o(e.css("padding-top")) + o(e.css("padding-bottom"))),
                e.css(s.property, r - i + "px"))
            })
        }),
        p.each(function() {
            var e = t(this);
            e.attr("style", e.data("style-cache") || null)
        }),
        r._maintainScroll && t(window).scrollTop(h / c * t("html").outerHeight(!0)),
        this
    }
    ,
    r._applyDataApi = function() {
        var e = {};
        t("[data-match-height], [data-mh]").each(function() {
            var i = t(this)
              , o = i.attr("data-mh") || i.attr("data-match-height");
            e[o] = o in e ? e[o].add(i) : i
        }),
        t.each(e, function() {
            this.matchHeight(!0)
        })
    }
    ;
    var s = function(e) {
        r._beforeUpdate && r._beforeUpdate(e, r._groups),
        t.each(r._groups, function() {
            r._apply(this.elements, this.options)
        }),
        r._afterUpdate && r._afterUpdate(e, r._groups)
    };
    r._update = function(o, n) {
        if (n && "resize" === n.type) {
            var a = t(window).width();
            if (a === e)
                return;
            e = a
        }
        o ? -1 === i && (i = setTimeout(function() {
            s(n),
            i = -1
        }, r._throttle)) : s(n)
    }
    ,
    t(r._applyDataApi),
    t(window).bind("load", function(t) {
        r._update(!1, t)
    }),
    t(window).bind("resize orientationchange", function(t) {
        r._update(!0, t)
    })
}(jQuery);
var tempSVG = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 {{w}} {{h}}'/>";
$("img.lazy").each(function() {
    var t = $(this)
      , e = t.data();
    t.attr({
        width: e.width,
        height: e.height,
        src: "data:image/svg+xml;charset=utf-8," + encodeURIComponent(tempSVG.replace(/{{w}}/g, e.width).replace(/{{h}}/g, e.height))
    }).appendTo(t)
}),
$(function() {
    $(".mobile-menu-open").on("click", function(t) {
        $(".mobile-menu").show()
    }),
    $(".mobile-menu-close").on("click", function(t) {
        $(".mobile-menu").hide()
    }),
    $("[data-scroll-speed]").moveIt()
}),
$.fn.moveIt = function() {
    var t = $(window)
      , e = [];
    $(this).each(function() {
        e.push(new moveItItem($(this)))
    }),
    window.onscroll = function() {
        var i = t.scrollTop();
        e.forEach(function(t) {
            t.update(i)
        })
    }
}
;
var moveItItem = function(t) {
    this.el = $(t),
    this.speed = parseInt(this.el.attr("data-scroll-speed"))
};
moveItItem.prototype.update = function(t) {
    this.el.css("transform", "translateY(" + -t / this.speed + "px)")
}
,
$(function() {
    $(".anchorLink").click(function() {
        if (location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") && location.hostname == this.hostname) {
            var t = $(this.hash);
            if ((t = t.length ? t : $("[name=" + this.hash.slice(1) + "]")).length)
                return $("html, body").animate({
                    scrollTop: t.offset().top + -65
                }, 3e3, "easeInOutQuad"),
                !1
        }
    })
}),
$(window).load(function() {
    frontPage(),
    $(".project-info").fadeIn()
});
var resizeTimer;
$(window).on("resize", function(t) {
    clearTimeout(resizeTimer),
    resizeTimer = setTimeout(function() {
        getHeight(),
        init_sticky(),
        frontPage(),
        $(window).width() < 768 && $(".logo").css("width", "")
    }, 250)
}),
$(document).on("click", function() {
    $("#newsletter").toggle(),
    $("#newsletter-btn").toggle()
}),
$(document).on("scroll", function() {
    var t = $(window).scrollTop();
    $(window).width() > 768 && ($(".work .logo, .spin360 .logo, .studio .logo").css({
        width: 178 - t / 3 + "px"
    }),
    $(".homepage .logo").css({
        width: 375 - t / 3 + "px"
    })),
    $(document).scrollTop() > 1e3 ? ($(".project-info").addClass("hidden"),
    $(".project-top").removeClass("hidden")) : ($(".project-info").removeClass("hidden"),
    $(".project-top").addClass("hidden"))
});
