function __initLoader() {
  var e = {
    __countRequests: 0,
    __requests: {},
    __active: 0,
    show: function (e, t, o, i, s) {
      if (!e) return !1;
      t || (t = "gradientBeige"), i || (i = 0);
      var n = new Date(),
        a = this.__countRequests++;
      return (
        s && (a = s),
        (this.__requests[a] = {
          time: n.getTime(),
          animate: o,
          data: [e, t, i],
        }),
        this._rebuild(),
        a
      );
    },
    hide: function (e) {
      return e && this.__requests[e]
        ? (this.__active == e && (this.__active = 0),
          delete this.__requests[e],
          this._rebuild(),
          !0)
        : !1;
    },
    hideAll: function () {
      (this.__requests = {}), this._rebuild();
    },
    _rebuild: function () {
      {
        var e = 0,
          t = !1,
          o = new Date();
        o.getTime();
      }
      $.each(
        this.__requests,
        function (o, i) {
          return (
            e < i.time && ((e = i.time), (t = o)),
            i.data[2] > 0 ? ((t = o), !1) : void 0
          );
        }.bind(this)
      ),
        t
          ? this._build(t, this.__requests[t].data, this.__requests[t].animate)
          : $(".loader").hide();
    },
    _build: function (e, t, o) {
      t &&
        this.__active != e &&
        ((this.__active = e),
        o ? $(".loader_img").show() : $(".loader_img").hide(),
        $(".loader .indicator")
          .attr("class", "b indicator " + t[1])
          .find("span")
          .text(t[0]),
        $(".loader").show(),
        t[2] > 0 &&
          (this._interval && clearTimeout(this._interval),
          (this._interval = setTimeout(
            function () {
              this.hide(e);
            }.bind(this),
            1e3 * t[2]
          ))));
    },
    showSuccess: function (e) {
      return this.show(e, "gradientGreen", !1, 5);
    },
    showFailed: function (e) {
      return this.show(e, "gradientRed", !1, 5);
    },
    showLoader: function (e) {
      return this.show(
        LocalJS.Lang.get("main.loading"),
        "gradientBeige",
        !0,
        !1,
        e
      );
    },
    hideLoader: function (e) {
      return this.hide(e);
    },
    showSaver: function (e) {
      return this.show(
        LocalJS.Lang.get("main.Saving"),
        "gradientBeige",
        !0,
        !1,
        e
      );
    },
    showDelete: function (e) {
      return this.show(
        LocalJS.Lang.get("main.Deleting"),
        "gradientBeige",
        !0,
        !1,
        e
      );
    },
    isShow: function () {
      return !!Object.keys(this.__requests).length;
    },
  };
  return e;
}
function createCookie(e, t, o, i, s) {
  if ((i || (i = ""), o)) {
    var n = new Date();
    n.setTime(n.getTime() + 1e3 * o);
    var a = "; expires=" + n.toGMTString();
  } else var a = "";
  "" != i && (i = "; path=" + i),
    s ? (i || (i = "; path=/"), (s = "; domain=" + s)) : (s = ""),
    (document.cookie = e + "=" + t + a + i + s);
}
function readCookie(e) {
  for (
    var t = e + "=", o = document.cookie.split(";"), i = 0;
    i < o.length;
    i++
  ) {
    for (var s = o[i]; " " == s.charAt(0); ) s = s.substring(1, s.length);
    if (0 == s.indexOf(t)) return s.substring(t.length, s.length);
  }
  return null;
}
function eraseCookie(e) {
  createCookie(e, "", -1);
}
!(function (e) {
  var t = function (t) {
    (this._options = {
      checkOnLoad: !1,
      resetOnEnd: !1,
      loopCheckTime: 50,
      loopMaxNumber: 5,
      baitClass:
        "pub_300x250 pub_300x250m pub_728x90 text-ad textAd text_ad text_ads text-ads text-ad-links",
      baitStyle:
        "width: 1px !important; height: 1px !important; position: absolute !important; left: -10000px !important; top: -1000px !important;",
    }),
      (this._var = {
        version: "3.1.1",
        bait: null,
        checking: !1,
        loop: null,
        loopNumber: 0,
        event: { detected: [], notDetected: [] },
      }),
      void 0 !== t && this.setOption(t);
    var o = this,
      i = function () {
        setTimeout(function () {
          o._options.checkOnLoad === !0 &&
            (null === o._var.bait && o._creatBait(),
            setTimeout(function () {
              o.check();
            }, 1));
        }, 1);
      };
    void 0 !== e.addEventListener
      ? e.addEventListener("load", i, !1)
      : e.attachEvent("onload", i);
  };
  (t.prototype._options = null),
    (t.prototype._var = null),
    (t.prototype._bait = null),
    (t.prototype.setOption = function (e, t) {
      if (void 0 !== t) {
        var o = e;
        (e = {}), (e[o] = t);
      }
      for (var i in e) this._options[i] = e[i];
      return this;
    }),
    (t.prototype._creatBait = function () {
      var t = document.createElement("div");
      t.setAttribute("class", this._options.baitClass),
        t.setAttribute("style", this._options.baitStyle),
        (this._var.bait = e.document.body.appendChild(t)),
        this._var.bait.offsetParent,
        this._var.bait.offsetHeight,
        this._var.bait.offsetLeft,
        this._var.bait.offsetTop,
        this._var.bait.offsetWidth,
        this._var.bait.clientHeight,
        this._var.bait.clientWidth;
    }),
    (t.prototype._destroyBait = function () {
      e.document.body.removeChild(this._var.bait), (this._var.bait = null);
    }),
    (t.prototype.check = function (e) {
      if ((void 0 === e && (e = !0), this._var.checking === !0)) return !1;
      (this._var.checking = !0), null === this._var.bait && this._creatBait();
      var t = this;
      return (
        (this._var.loopNumber = 0),
        e === !0 &&
          (this._var.loop = setInterval(function () {
            t._checkBait(e);
          }, this._options.loopCheckTime)),
        this._checkBait(e),
        !0
      );
    }),
    (t.prototype._checkBait = function (t) {
      var o = !1;
      if (
        (null === this._var.bait && this._creatBait(),
        (null !== e.document.body.getAttribute("abp") ||
          null === this._var.bait.offsetParent ||
          0 == this._var.bait.offsetHeight ||
          0 == this._var.bait.offsetLeft ||
          0 == this._var.bait.offsetTop ||
          0 == this._var.bait.offsetWidth ||
          0 == this._var.bait.clientHeight ||
          0 == this._var.bait.clientWidth) &&
          (o = !0),
        void 0 !== e.getComputedStyle)
      ) {
        var i = e.getComputedStyle(this._var.bait, null);
        ("none" == i.getPropertyValue("display") ||
          "hidden" == i.getPropertyValue("visibility")) &&
          (o = !0);
      }
      t === !0 &&
        (this._var.loopNumber++,
        this._var.loopNumber >= this._options.loopMaxNumber &&
          (clearInterval(this._var.loop),
          (this._var.loop = null),
          (this._var.loopNumber = 0))),
        o === !0
          ? (t === !0 && (this._var.checking = !1),
            this._destroyBait(),
            this.emitEvent(!0))
          : (null === this._var.loop || t === !1) &&
            (t === !0 && (this._var.checking = !1),
            this._destroyBait(),
            this.emitEvent(!1));
    }),
    (t.prototype.emitEvent = function (e) {
      var t = this._var.event[e === !0 ? "detected" : "notDetected"];
      for (var o in t) t.hasOwnProperty(o) && t[o]();
      return this._options.resetOnEnd === !0 && this.clearEvent(), this;
    }),
    (t.prototype.clearEvent = function () {
      (this._var.event.detected = []), (this._var.event.notDetected = []);
    }),
    (t.prototype.on = function (e, t) {
      return (
        this._var.event[e === !0 ? "detected" : "notDetected"].push(t), this
      );
    }),
    (t.prototype.onDetected = function (e) {
      return this.on(!0, e);
    }),
    (t.prototype.onNotDetected = function (e) {
      return this.on(!1, e);
    }),
    (e.FuckAdBlock = t),
    void 0 === e.fuckAdBlock &&
      (e.fuckAdBlock = new t({ checkOnLoad: !0, resetOnEnd: !0 }));
})(window),
  !(function (e, t) {
    "object" == typeof module && "object" == typeof module.exports
      ? (module.exports = e.document
          ? t(e, !0)
          : function (e) {
              if (!e.document)
                throw new Error("jQuery requires a window with a document");
              return t(e);
            })
      : t(e);
  })("undefined" != typeof window ? window : this, function (e, t) {
    function o(e) {
      var t = e.length,
        o = X.type(e);
      return "function" === o || X.isWindow(e)
        ? !1
        : 1 === e.nodeType && t
        ? !0
        : "array" === o ||
          0 === t ||
          ("number" == typeof t && t > 0 && t - 1 in e);
    }
    function i(e, t, o) {
      if (X.isFunction(t))
        return X.grep(e, function (e, i) {
          return !!t.call(e, i, e) !== o;
        });
      if (t.nodeType)
        return X.grep(e, function (e) {
          return (e === t) !== o;
        });
      if ("string" == typeof t) {
        if (re.test(t)) return X.filter(t, e, o);
        t = X.filter(t, e);
      }
      return X.grep(e, function (e) {
        return q.call(t, e) >= 0 !== o;
      });
    }
    function s(e, t) {
      for (; (e = e[t]) && 1 !== e.nodeType; );
      return e;
    }
    function n(e) {
      var t = (pe[e] = {});
      return (
        X.each(e.match(fe) || [], function (e, o) {
          t[o] = !0;
        }),
        t
      );
    }
    function a() {
      $.removeEventListener("DOMContentLoaded", a, !1),
        e.removeEventListener("load", a, !1),
        X.ready();
    }
    function r() {
      Object.defineProperty((this.cache = {}), 0, {
        get: function () {
          return {};
        },
      }),
        (this.expando = X.expando + Math.random());
    }
    function u(e, t, o) {
      var i;
      if (void 0 === o && 1 === e.nodeType)
        if (
          ((i = "data-" + t.replace(Se, "-$1").toLowerCase()),
          (o = e.getAttribute(i)),
          "string" == typeof o)
        ) {
          try {
            o =
              "true" === o
                ? !0
                : "false" === o
                ? !1
                : "null" === o
                ? null
                : +o + "" === o
                ? +o
                : _e.test(o)
                ? X.parseJSON(o)
                : o;
          } catch (s) {}
          ve.set(e, t, o);
        } else o = void 0;
      return o;
    }
    function l() {
      return !0;
    }
    function h() {
      return !1;
    }
    function c() {
      try {
        return $.activeElement;
      } catch (e) {}
    }
    function d(e, t) {
      return X.nodeName(e, "table") &&
        X.nodeName(11 !== t.nodeType ? t : t.firstChild, "tr")
        ? e.getElementsByTagName("tbody")[0] ||
            e.appendChild(e.ownerDocument.createElement("tbody"))
        : e;
    }
    function f(e) {
      return (e.type = (null !== e.getAttribute("type")) + "/" + e.type), e;
    }
    function p(e) {
      var t = Pe.exec(e.type);
      return t ? (e.type = t[1]) : e.removeAttribute("type"), e;
    }
    function y(e, t) {
      for (var o = 0, i = e.length; i > o; o++)
        ge.set(e[o], "globalEval", !t || ge.get(t[o], "globalEval"));
    }
    function m(e, t) {
      var o, i, s, n, a, r, u, l;
      if (1 === t.nodeType) {
        if (
          ge.hasData(e) &&
          ((n = ge.access(e)), (a = ge.set(t, n)), (l = n.events))
        ) {
          delete a.handle, (a.events = {});
          for (s in l)
            for (o = 0, i = l[s].length; i > o; o++) X.event.add(t, s, l[s][o]);
        }
        ve.hasData(e) &&
          ((r = ve.access(e)), (u = X.extend({}, r)), ve.set(t, u));
      }
    }
    function g(e, t) {
      var o = e.getElementsByTagName
        ? e.getElementsByTagName(t || "*")
        : e.querySelectorAll
        ? e.querySelectorAll(t || "*")
        : [];
      return void 0 === t || (t && X.nodeName(e, t)) ? X.merge([e], o) : o;
    }
    function v(e, t) {
      var o = t.nodeName.toLowerCase();
      "input" === o && Ce.test(e.type)
        ? (t.checked = e.checked)
        : ("input" === o || "textarea" === o) &&
          (t.defaultValue = e.defaultValue);
    }
    function _(t, o) {
      var i,
        s = X(o.createElement(t)).appendTo(o.body),
        n =
          e.getDefaultComputedStyle && (i = e.getDefaultComputedStyle(s[0]))
            ? i.display
            : X.css(s[0], "display");
      return s.detach(), n;
    }
    function S(e) {
      var t = $,
        o = Oe[e];
      return (
        o ||
          ((o = _(e, t)),
          ("none" !== o && o) ||
            ((je = (
              je || X("<iframe frameborder='0' width='0' height='0'/>")
            ).appendTo(t.documentElement)),
            (t = je[0].contentDocument),
            t.write(),
            t.close(),
            (o = _(e, t)),
            je.detach()),
          (Oe[e] = o)),
        o
      );
    }
    function b(e, t, o) {
      var i,
        s,
        n,
        a,
        r = e.style;
      return (
        (o = o || He(e)),
        o && (a = o.getPropertyValue(t) || o[t]),
        o &&
          ("" !== a || X.contains(e.ownerDocument, e) || (a = X.style(e, t)),
          Me.test(a) &&
            We.test(t) &&
            ((i = r.width),
            (s = r.minWidth),
            (n = r.maxWidth),
            (r.minWidth = r.maxWidth = r.width = a),
            (a = o.width),
            (r.width = i),
            (r.minWidth = s),
            (r.maxWidth = n))),
        void 0 !== a ? a + "" : a
      );
    }
    function w(e, t) {
      return {
        get: function () {
          return e()
            ? void delete this.get
            : (this.get = t).apply(this, arguments);
        },
      };
    }
    function T(e, t) {
      if (t in e) return t;
      for (var o = t[0].toUpperCase() + t.slice(1), i = t, s = ze.length; s--; )
        if (((t = ze[s] + o), t in e)) return t;
      return i;
    }
    function C(e, t, o) {
      var i = Ue.exec(t);
      return i ? Math.max(0, i[1] - (o || 0)) + (i[2] || "px") : t;
    }
    function x(e, t, o, i, s) {
      for (
        var n = o === (i ? "border" : "content") ? 4 : "width" === t ? 1 : 0,
          a = 0;
        4 > n;
        n += 2
      )
        "margin" === o && (a += X.css(e, o + we[n], !0, s)),
          i
            ? ("content" === o && (a -= X.css(e, "padding" + we[n], !0, s)),
              "margin" !== o &&
                (a -= X.css(e, "border" + we[n] + "Width", !0, s)))
            : ((a += X.css(e, "padding" + we[n], !0, s)),
              "padding" !== o &&
                (a += X.css(e, "border" + we[n] + "Width", !0, s)));
      return a;
    }
    function E(e, t, o) {
      var i = !0,
        s = "width" === t ? e.offsetWidth : e.offsetHeight,
        n = He(e),
        a = "border-box" === X.css(e, "boxSizing", !1, n);
      if (0 >= s || null == s) {
        if (
          ((s = b(e, t, n)),
          (0 > s || null == s) && (s = e.style[t]),
          Me.test(s))
        )
          return s;
        (i = a && (G.boxSizingReliable() || s === e.style[t])),
          (s = parseFloat(s) || 0);
      }
      return s + x(e, t, o || (a ? "border" : "content"), i, n) + "px";
    }
    function L(e, t) {
      for (var o, i, s, n = [], a = 0, r = e.length; r > a; a++)
        (i = e[a]),
          i.style &&
            ((n[a] = ge.get(i, "olddisplay")),
            (o = i.style.display),
            t
              ? (n[a] || "none" !== o || (i.style.display = ""),
                "" === i.style.display &&
                  Te(i) &&
                  (n[a] = ge.access(i, "olddisplay", S(i.nodeName))))
              : ((s = Te(i)),
                ("none" === o && s) ||
                  ge.set(i, "olddisplay", s ? o : X.css(i, "display"))));
      for (a = 0; r > a; a++)
        (i = e[a]),
          i.style &&
            ((t && "none" !== i.style.display && "" !== i.style.display) ||
              (i.style.display = t ? n[a] || "" : "none"));
      return e;
    }
    function k(e, t, o, i, s) {
      return new k.prototype.init(e, t, o, i, s);
    }
    function R() {
      return (
        setTimeout(function () {
          Ge = void 0;
        }),
        (Ge = X.now())
      );
    }
    function N(e, t) {
      var o,
        i = 0,
        s = { height: e };
      for (t = t ? 1 : 0; 4 > i; i += 2 - t)
        (o = we[i]), (s["margin" + o] = s["padding" + o] = e);
      return t && (s.opacity = s.width = e), s;
    }
    function A(e, t, o) {
      for (
        var i, s = (ot[t] || []).concat(ot["*"]), n = 0, a = s.length;
        a > n;
        n++
      )
        if ((i = s[n].call(o, t, e))) return i;
    }
    function D(e, t, o) {
      var i,
        s,
        n,
        a,
        r,
        u,
        l,
        h,
        c = this,
        d = {},
        f = e.style,
        p = e.nodeType && Te(e),
        y = ge.get(e, "fxshow");
      o.queue ||
        ((r = X._queueHooks(e, "fx")),
        null == r.unqueued &&
          ((r.unqueued = 0),
          (u = r.empty.fire),
          (r.empty.fire = function () {
            r.unqueued || u();
          })),
        r.unqueued++,
        c.always(function () {
          c.always(function () {
            r.unqueued--, X.queue(e, "fx").length || r.empty.fire();
          });
        })),
        1 === e.nodeType &&
          ("height" in t || "width" in t) &&
          ((o.overflow = [f.overflow, f.overflowX, f.overflowY]),
          (l = X.css(e, "display")),
          (h = "none" === l ? ge.get(e, "olddisplay") || S(e.nodeName) : l),
          "inline" === h &&
            "none" === X.css(e, "float") &&
            (f.display = "inline-block")),
        o.overflow &&
          ((f.overflow = "hidden"),
          c.always(function () {
            (f.overflow = o.overflow[0]),
              (f.overflowX = o.overflow[1]),
              (f.overflowY = o.overflow[2]);
          }));
      for (i in t)
        if (((s = t[i]), Ye.exec(s))) {
          if (
            (delete t[i],
            (n = n || "toggle" === s),
            s === (p ? "hide" : "show"))
          ) {
            if ("show" !== s || !y || void 0 === y[i]) continue;
            p = !0;
          }
          d[i] = (y && y[i]) || X.style(e, i);
        } else l = void 0;
      if (X.isEmptyObject(d))
        "inline" === ("none" === l ? S(e.nodeName) : l) && (f.display = l);
      else {
        y ? "hidden" in y && (p = y.hidden) : (y = ge.access(e, "fxshow", {})),
          n && (y.hidden = !p),
          p
            ? X(e).show()
            : c.done(function () {
                X(e).hide();
              }),
          c.done(function () {
            var t;
            ge.remove(e, "fxshow");
            for (t in d) X.style(e, t, d[t]);
          });
        for (i in d)
          (a = A(p ? y[i] : 0, i, c)),
            i in y ||
              ((y[i] = a.start),
              p &&
                ((a.end = a.start),
                (a.start = "width" === i || "height" === i ? 1 : 0)));
      }
    }
    function J(e, t) {
      var o, i, s, n, a;
      for (o in e)
        if (
          ((i = X.camelCase(o)),
          (s = t[i]),
          (n = e[o]),
          X.isArray(n) && ((s = n[1]), (n = e[o] = n[0])),
          o !== i && ((e[i] = n), delete e[o]),
          (a = X.cssHooks[i]),
          a && "expand" in a)
        ) {
          (n = a.expand(n)), delete e[i];
          for (o in n) o in e || ((e[o] = n[o]), (t[o] = s));
        } else t[i] = s;
    }
    function Z(e, t, o) {
      var i,
        s,
        n = 0,
        a = tt.length,
        r = X.Deferred().always(function () {
          delete u.elem;
        }),
        u = function () {
          if (s) return !1;
          for (
            var t = Ge || R(),
              o = Math.max(0, l.startTime + l.duration - t),
              i = o / l.duration || 0,
              n = 1 - i,
              a = 0,
              u = l.tweens.length;
            u > a;
            a++
          )
            l.tweens[a].run(n);
          return (
            r.notifyWith(e, [l, n, o]),
            1 > n && u ? o : (r.resolveWith(e, [l]), !1)
          );
        },
        l = r.promise({
          elem: e,
          props: X.extend({}, t),
          opts: X.extend(!0, { specialEasing: {} }, o),
          originalProperties: t,
          originalOptions: o,
          startTime: Ge || R(),
          duration: o.duration,
          tweens: [],
          createTween: function (t, o) {
            var i = X.Tween(
              e,
              l.opts,
              t,
              o,
              l.opts.specialEasing[t] || l.opts.easing
            );
            return l.tweens.push(i), i;
          },
          stop: function (t) {
            var o = 0,
              i = t ? l.tweens.length : 0;
            if (s) return this;
            for (s = !0; i > o; o++) l.tweens[o].run(1);
            return t ? r.resolveWith(e, [l, t]) : r.rejectWith(e, [l, t]), this;
          },
        }),
        h = l.props;
      for (J(h, l.opts.specialEasing); a > n; n++)
        if ((i = tt[n].call(l, e, h, l.opts))) return i;
      return (
        X.map(h, A, l),
        X.isFunction(l.opts.start) && l.opts.start.call(e, l),
        X.fx.timer(X.extend(u, { elem: e, anim: l, queue: l.opts.queue })),
        l
          .progress(l.opts.progress)
          .done(l.opts.done, l.opts.complete)
          .fail(l.opts.fail)
          .always(l.opts.always)
      );
    }
    function B(e) {
      return function (t, o) {
        "string" != typeof t && ((o = t), (t = "*"));
        var i,
          s = 0,
          n = t.toLowerCase().match(fe) || [];
        if (X.isFunction(o))
          for (; (i = n[s++]); )
            "+" === i[0]
              ? ((i = i.slice(1) || "*"), (e[i] = e[i] || []).unshift(o))
              : (e[i] = e[i] || []).push(o);
      };
    }
    function P(e, t, o, i) {
      function s(r) {
        var u;
        return (
          (n[r] = !0),
          X.each(e[r] || [], function (e, r) {
            var l = r(t, o, i);
            return "string" != typeof l || a || n[l]
              ? a
                ? !(u = l)
                : void 0
              : (t.dataTypes.unshift(l), s(l), !1);
          }),
          u
        );
      }
      var n = {},
        a = e === bt;
      return s(t.dataTypes[0]) || (!n["*"] && s("*"));
    }
    function F(e, t) {
      var o,
        i,
        s = X.ajaxSettings.flatOptions || {};
      for (o in t) void 0 !== t[o] && ((s[o] ? e : i || (i = {}))[o] = t[o]);
      return i && X.extend(!0, e, i), e;
    }
    function I(e, t, o) {
      for (var i, s, n, a, r = e.contents, u = e.dataTypes; "*" === u[0]; )
        u.shift(),
          void 0 === i &&
            (i = e.mimeType || t.getResponseHeader("Content-Type"));
      if (i)
        for (s in r)
          if (r[s] && r[s].test(i)) {
            u.unshift(s);
            break;
          }
      if (u[0] in o) n = u[0];
      else {
        for (s in o) {
          if (!u[0] || e.converters[s + " " + u[0]]) {
            n = s;
            break;
          }
          a || (a = s);
        }
        n = n || a;
      }
      return n ? (n !== u[0] && u.unshift(n), o[n]) : void 0;
    }
    function j(e, t, o, i) {
      var s,
        n,
        a,
        r,
        u,
        l = {},
        h = e.dataTypes.slice();
      if (h[1]) for (a in e.converters) l[a.toLowerCase()] = e.converters[a];
      for (n = h.shift(); n; )
        if (
          (e.responseFields[n] && (o[e.responseFields[n]] = t),
          !u && i && e.dataFilter && (t = e.dataFilter(t, e.dataType)),
          (u = n),
          (n = h.shift()))
        )
          if ("*" === n) n = u;
          else if ("*" !== u && u !== n) {
            if (((a = l[u + " " + n] || l["* " + n]), !a))
              for (s in l)
                if (
                  ((r = s.split(" ")),
                  r[1] === n && (a = l[u + " " + r[0]] || l["* " + r[0]]))
                ) {
                  a === !0
                    ? (a = l[s])
                    : l[s] !== !0 && ((n = r[0]), h.unshift(r[1]));
                  break;
                }
            if (a !== !0)
              if (a && e["throws"]) t = a(t);
              else
                try {
                  t = a(t);
                } catch (c) {
                  return {
                    state: "parsererror",
                    error: a ? c : "No conversion from " + u + " to " + n,
                  };
                }
          }
      return { state: "success", data: t };
    }
    function O(e, t, o, i) {
      var s;
      if (X.isArray(t))
        X.each(t, function (t, s) {
          o || xt.test(e)
            ? i(e, s)
            : O(e + "[" + ("object" == typeof s ? t : "") + "]", s, o, i);
        });
      else if (o || "object" !== X.type(t)) i(e, t);
      else for (s in t) O(e + "[" + s + "]", t[s], o, i);
    }
    function W(e) {
      return X.isWindow(e) ? e : 9 === e.nodeType && e.defaultView;
    }
    var M = [],
      H = M.slice,
      V = M.concat,
      U = M.push,
      q = M.indexOf,
      K = {},
      Q = K.toString,
      z = K.hasOwnProperty,
      G = {},
      $ = e.document,
      Y = "2.1.1",
      X = function (e, t) {
        return new X.fn.init(e, t);
      },
      ee = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
      te = /^-ms-/,
      oe = /-([\da-z])/gi,
      ie = function (e, t) {
        return t.toUpperCase();
      };
    (X.fn = X.prototype =
      {
        jquery: Y,
        constructor: X,
        selector: "",
        length: 0,
        toArray: function () {
          return H.call(this);
        },
        get: function (e) {
          return null != e
            ? 0 > e
              ? this[e + this.length]
              : this[e]
            : H.call(this);
        },
        pushStack: function (e) {
          var t = X.merge(this.constructor(), e);
          return (t.prevObject = this), (t.context = this.context), t;
        },
        each: function (e, t) {
          return X.each(this, e, t);
        },
        map: function (e) {
          return this.pushStack(
            X.map(this, function (t, o) {
              return e.call(t, o, t);
            })
          );
        },
        slice: function () {
          return this.pushStack(H.apply(this, arguments));
        },
        first: function () {
          return this.eq(0);
        },
        last: function () {
          return this.eq(-1);
        },
        eq: function (e) {
          var t = this.length,
            o = +e + (0 > e ? t : 0);
          return this.pushStack(o >= 0 && t > o ? [this[o]] : []);
        },
        end: function () {
          return this.prevObject || this.constructor(null);
        },
        push: U,
        sort: M.sort,
        splice: M.splice,
      }),
      (X.extend = X.fn.extend =
        function () {
          var e,
            t,
            o,
            i,
            s,
            n,
            a = arguments[0] || {},
            r = 1,
            u = arguments.length,
            l = !1;
          for (
            "boolean" == typeof a && ((l = a), (a = arguments[r] || {}), r++),
              "object" == typeof a || X.isFunction(a) || (a = {}),
              r === u && ((a = this), r--);
            u > r;
            r++
          )
            if (null != (e = arguments[r]))
              for (t in e)
                (o = a[t]),
                  (i = e[t]),
                  a !== i &&
                    (l && i && (X.isPlainObject(i) || (s = X.isArray(i)))
                      ? (s
                          ? ((s = !1), (n = o && X.isArray(o) ? o : []))
                          : (n = o && X.isPlainObject(o) ? o : {}),
                        (a[t] = X.extend(l, n, i)))
                      : void 0 !== i && (a[t] = i));
          return a;
        }),
      X.extend({
        expando: "jQuery" + (Y + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function (e) {
          throw new Error(e);
        },
        noop: function () {},
        isFunction: function (e) {
          return "function" === X.type(e);
        },
        isArray: Array.isArray,
        isWindow: function (e) {
          return null != e && e === e.window;
        },
        isNumeric: function (e) {
          return !X.isArray(e) && e - parseFloat(e) >= 0;
        },
        isPlainObject: function (e) {
          return "object" !== X.type(e) || e.nodeType || X.isWindow(e)
            ? !1
            : e.constructor && !z.call(e.constructor.prototype, "isPrototypeOf")
            ? !1
            : !0;
        },
        isEmptyObject: function (e) {
          var t;
          for (t in e) return !1;
          return !0;
        },
        type: function (e) {
          return null == e
            ? e + ""
            : "object" == typeof e || "function" == typeof e
            ? K[Q.call(e)] || "object"
            : typeof e;
        },
        globalEval: function (e) {
          var t,
            o = eval;
          (e = X.trim(e)),
            e &&
              (1 === e.indexOf("use strict")
                ? ((t = $.createElement("script")),
                  (t.text = e),
                  $.head.appendChild(t).parentNode.removeChild(t))
                : o(e));
        },
        camelCase: function (e) {
          return e.replace(te, "ms-").replace(oe, ie);
        },
        nodeName: function (e, t) {
          return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase();
        },
        each: function (e, t, i) {
          var s,
            n = 0,
            a = e.length,
            r = o(e);
          if (i) {
            if (r) for (; a > n && ((s = t.apply(e[n], i)), s !== !1); n++);
            else for (n in e) if (((s = t.apply(e[n], i)), s === !1)) break;
          } else if (r)
            for (; a > n && ((s = t.call(e[n], n, e[n])), s !== !1); n++);
          else for (n in e) if (((s = t.call(e[n], n, e[n])), s === !1)) break;
          return e;
        },
        trim: function (e) {
          return null == e ? "" : (e + "").replace(ee, "");
        },
        makeArray: function (e, t) {
          var i = t || [];
          return (
            null != e &&
              (o(Object(e))
                ? X.merge(i, "string" == typeof e ? [e] : e)
                : U.call(i, e)),
            i
          );
        },
        inArray: function (e, t, o) {
          return null == t ? -1 : q.call(t, e, o);
        },
        merge: function (e, t) {
          for (var o = +t.length, i = 0, s = e.length; o > i; i++)
            e[s++] = t[i];
          return (e.length = s), e;
        },
        grep: function (e, t, o) {
          for (var i, s = [], n = 0, a = e.length, r = !o; a > n; n++)
            (i = !t(e[n], n)), i !== r && s.push(e[n]);
          return s;
        },
        map: function (e, t, i) {
          var s,
            n = 0,
            a = e.length,
            r = o(e),
            u = [];
          if (r) for (; a > n; n++) (s = t(e[n], n, i)), null != s && u.push(s);
          else for (n in e) (s = t(e[n], n, i)), null != s && u.push(s);
          return V.apply([], u);
        },
        guid: 1,
        proxy: function (e, t) {
          var o, i, s;
          return (
            "string" == typeof t && ((o = e[t]), (t = e), (e = o)),
            X.isFunction(e)
              ? ((i = H.call(arguments, 2)),
                (s = function () {
                  return e.apply(t || this, i.concat(H.call(arguments)));
                }),
                (s.guid = e.guid = e.guid || X.guid++),
                s)
              : void 0
          );
        },
        now: Date.now,
        support: G,
      }),
      X.each(
        "Boolean Number String Function Array Date RegExp Object Error".split(
          " "
        ),
        function (e, t) {
          K["[object " + t + "]"] = t.toLowerCase();
        }
      );
    var se = (function (e) {
      function t(e, t, o, i) {
        var s, n, a, r, u, l, c, f, p, y;
        if (
          ((t ? t.ownerDocument || t : O) !== D && A(t),
          (t = t || D),
          (o = o || []),
          !e || "string" != typeof e)
        )
          return o;
        if (1 !== (r = t.nodeType) && 9 !== r) return [];
        if (Z && !i) {
          if ((s = ve.exec(e)))
            if ((a = s[1])) {
              if (9 === r) {
                if (((n = t.getElementById(a)), !n || !n.parentNode)) return o;
                if (n.id === a) return o.push(n), o;
              } else if (
                t.ownerDocument &&
                (n = t.ownerDocument.getElementById(a)) &&
                I(t, n) &&
                n.id === a
              )
                return o.push(n), o;
            } else {
              if (s[2]) return X.apply(o, t.getElementsByTagName(e)), o;
              if (
                (a = s[3]) &&
                b.getElementsByClassName &&
                t.getElementsByClassName
              )
                return X.apply(o, t.getElementsByClassName(a)), o;
            }
          if (b.qsa && (!B || !B.test(e))) {
            if (
              ((f = c = j),
              (p = t),
              (y = 9 === r && e),
              1 === r && "object" !== t.nodeName.toLowerCase())
            ) {
              for (
                l = x(e),
                  (c = t.getAttribute("id"))
                    ? (f = c.replace(Se, "\\$&"))
                    : t.setAttribute("id", f),
                  f = "[id='" + f + "'] ",
                  u = l.length;
                u--;

              )
                l[u] = f + d(l[u]);
              (p = (_e.test(e) && h(t.parentNode)) || t), (y = l.join(","));
            }
            if (y)
              try {
                return X.apply(o, p.querySelectorAll(y)), o;
              } catch (m) {
              } finally {
                c || t.removeAttribute("id");
              }
          }
        }
        return L(e.replace(ue, "$1"), t, o, i);
      }
      function o() {
        function e(o, i) {
          return (
            t.push(o + " ") > w.cacheLength && delete e[t.shift()],
            (e[o + " "] = i)
          );
        }
        var t = [];
        return e;
      }
      function i(e) {
        return (e[j] = !0), e;
      }
      function s(e) {
        var t = D.createElement("div");
        try {
          return !!e(t);
        } catch (o) {
          return !1;
        } finally {
          t.parentNode && t.parentNode.removeChild(t), (t = null);
        }
      }
      function n(e, t) {
        for (var o = e.split("|"), i = e.length; i--; ) w.attrHandle[o[i]] = t;
      }
      function a(e, t) {
        var o = t && e,
          i =
            o &&
            1 === e.nodeType &&
            1 === t.nodeType &&
            (~t.sourceIndex || Q) - (~e.sourceIndex || Q);
        if (i) return i;
        if (o) for (; (o = o.nextSibling); ) if (o === t) return -1;
        return e ? 1 : -1;
      }
      function r(e) {
        return function (t) {
          var o = t.nodeName.toLowerCase();
          return "input" === o && t.type === e;
        };
      }
      function u(e) {
        return function (t) {
          var o = t.nodeName.toLowerCase();
          return ("input" === o || "button" === o) && t.type === e;
        };
      }
      function l(e) {
        return i(function (t) {
          return (
            (t = +t),
            i(function (o, i) {
              for (var s, n = e([], o.length, t), a = n.length; a--; )
                o[(s = n[a])] && (o[s] = !(i[s] = o[s]));
            })
          );
        });
      }
      function h(e) {
        return e && typeof e.getElementsByTagName !== K && e;
      }
      function c() {}
      function d(e) {
        for (var t = 0, o = e.length, i = ""; o > t; t++) i += e[t].value;
        return i;
      }
      function f(e, t, o) {
        var i = t.dir,
          s = o && "parentNode" === i,
          n = M++;
        return t.first
          ? function (t, o, n) {
              for (; (t = t[i]); ) if (1 === t.nodeType || s) return e(t, o, n);
            }
          : function (t, o, a) {
              var r,
                u,
                l = [W, n];
              if (a) {
                for (; (t = t[i]); )
                  if ((1 === t.nodeType || s) && e(t, o, a)) return !0;
              } else
                for (; (t = t[i]); )
                  if (1 === t.nodeType || s) {
                    if (
                      ((u = t[j] || (t[j] = {})),
                      (r = u[i]) && r[0] === W && r[1] === n)
                    )
                      return (l[2] = r[2]);
                    if (((u[i] = l), (l[2] = e(t, o, a)))) return !0;
                  }
            };
      }
      function p(e) {
        return e.length > 1
          ? function (t, o, i) {
              for (var s = e.length; s--; ) if (!e[s](t, o, i)) return !1;
              return !0;
            }
          : e[0];
      }
      function y(e, o, i) {
        for (var s = 0, n = o.length; n > s; s++) t(e, o[s], i);
        return i;
      }
      function m(e, t, o, i, s) {
        for (var n, a = [], r = 0, u = e.length, l = null != t; u > r; r++)
          (n = e[r]) && (!o || o(n, i, s)) && (a.push(n), l && t.push(r));
        return a;
      }
      function g(e, t, o, s, n, a) {
        return (
          s && !s[j] && (s = g(s)),
          n && !n[j] && (n = g(n, a)),
          i(function (i, a, r, u) {
            var l,
              h,
              c,
              d = [],
              f = [],
              p = a.length,
              g = i || y(t || "*", r.nodeType ? [r] : r, []),
              v = !e || (!i && t) ? g : m(g, d, e, r, u),
              _ = o ? (n || (i ? e : p || s) ? [] : a) : v;
            if ((o && o(v, _, r, u), s))
              for (l = m(_, f), s(l, [], r, u), h = l.length; h--; )
                (c = l[h]) && (_[f[h]] = !(v[f[h]] = c));
            if (i) {
              if (n || e) {
                if (n) {
                  for (l = [], h = _.length; h--; )
                    (c = _[h]) && l.push((v[h] = c));
                  n(null, (_ = []), l, u);
                }
                for (h = _.length; h--; )
                  (c = _[h]) &&
                    (l = n ? te.call(i, c) : d[h]) > -1 &&
                    (i[l] = !(a[l] = c));
              }
            } else (_ = m(_ === a ? _.splice(p, _.length) : _)), n ? n(null, a, _, u) : X.apply(a, _);
          })
        );
      }
      function v(e) {
        for (
          var t,
            o,
            i,
            s = e.length,
            n = w.relative[e[0].type],
            a = n || w.relative[" "],
            r = n ? 1 : 0,
            u = f(
              function (e) {
                return e === t;
              },
              a,
              !0
            ),
            l = f(
              function (e) {
                return te.call(t, e) > -1;
              },
              a,
              !0
            ),
            h = [
              function (e, o, i) {
                return (
                  (!n && (i || o !== k)) ||
                  ((t = o).nodeType ? u(e, o, i) : l(e, o, i))
                );
              },
            ];
          s > r;
          r++
        )
          if ((o = w.relative[e[r].type])) h = [f(p(h), o)];
          else {
            if (((o = w.filter[e[r].type].apply(null, e[r].matches)), o[j])) {
              for (i = ++r; s > i && !w.relative[e[i].type]; i++);
              return g(
                r > 1 && p(h),
                r > 1 &&
                  d(
                    e
                      .slice(0, r - 1)
                      .concat({ value: " " === e[r - 2].type ? "*" : "" })
                  ).replace(ue, "$1"),
                o,
                i > r && v(e.slice(r, i)),
                s > i && v((e = e.slice(i))),
                s > i && d(e)
              );
            }
            h.push(o);
          }
        return p(h);
      }
      function _(e, o) {
        var s = o.length > 0,
          n = e.length > 0,
          a = function (i, a, r, u, l) {
            var h,
              c,
              d,
              f = 0,
              p = "0",
              y = i && [],
              g = [],
              v = k,
              _ = i || (n && w.find.TAG("*", l)),
              S = (W += null == v ? 1 : Math.random() || 0.1),
              b = _.length;
            for (l && (k = a !== D && a); p !== b && null != (h = _[p]); p++) {
              if (n && h) {
                for (c = 0; (d = e[c++]); )
                  if (d(h, a, r)) {
                    u.push(h);
                    break;
                  }
                l && (W = S);
              }
              s && ((h = !d && h) && f--, i && y.push(h));
            }
            if (((f += p), s && p !== f)) {
              for (c = 0; (d = o[c++]); ) d(y, g, a, r);
              if (i) {
                if (f > 0) for (; p--; ) y[p] || g[p] || (g[p] = $.call(u));
                g = m(g);
              }
              X.apply(u, g),
                l && !i && g.length > 0 && f + o.length > 1 && t.uniqueSort(u);
            }
            return l && ((W = S), (k = v)), y;
          };
        return s ? i(a) : a;
      }
      var S,
        b,
        w,
        T,
        C,
        x,
        E,
        L,
        k,
        R,
        N,
        A,
        D,
        J,
        Z,
        B,
        P,
        F,
        I,
        j = "sizzle" + -new Date(),
        O = e.document,
        W = 0,
        M = 0,
        H = o(),
        V = o(),
        U = o(),
        q = function (e, t) {
          return e === t && (N = !0), 0;
        },
        K = "undefined",
        Q = 1 << 31,
        z = {}.hasOwnProperty,
        G = [],
        $ = G.pop,
        Y = G.push,
        X = G.push,
        ee = G.slice,
        te =
          G.indexOf ||
          function (e) {
            for (var t = 0, o = this.length; o > t; t++)
              if (this[t] === e) return t;
            return -1;
          },
        oe =
          "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
        ie = "[\\x20\\t\\r\\n\\f]",
        se = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
        ne = se.replace("w", "w#"),
        ae =
          "\\[" +
          ie +
          "*(" +
          se +
          ")(?:" +
          ie +
          "*([*^$|!~]?=)" +
          ie +
          "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" +
          ne +
          "))|)" +
          ie +
          "*\\]",
        re =
          ":(" +
          se +
          ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" +
          ae +
          ")*)|.*)\\)|)",
        ue = new RegExp(
          "^" + ie + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ie + "+$",
          "g"
        ),
        le = new RegExp("^" + ie + "*," + ie + "*"),
        he = new RegExp("^" + ie + "*([>+~]|" + ie + ")" + ie + "*"),
        ce = new RegExp("=" + ie + "*([^\\]'\"]*?)" + ie + "*\\]", "g"),
        de = new RegExp(re),
        fe = new RegExp("^" + ne + "$"),
        pe = {
          ID: new RegExp("^#(" + se + ")"),
          CLASS: new RegExp("^\\.(" + se + ")"),
          TAG: new RegExp("^(" + se.replace("w", "w*") + ")"),
          ATTR: new RegExp("^" + ae),
          PSEUDO: new RegExp("^" + re),
          CHILD: new RegExp(
            "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" +
              ie +
              "*(even|odd|(([+-]|)(\\d*)n|)" +
              ie +
              "*(?:([+-]|)" +
              ie +
              "*(\\d+)|))" +
              ie +
              "*\\)|)",
            "i"
          ),
          bool: new RegExp("^(?:" + oe + ")$", "i"),
          needsContext: new RegExp(
            "^" +
              ie +
              "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
              ie +
              "*((?:-\\d)?\\d*)" +
              ie +
              "*\\)|)(?=[^-]|$)",
            "i"
          ),
        },
        ye = /^(?:input|select|textarea|button)$/i,
        me = /^h\d$/i,
        ge = /^[^{]+\{\s*\[native \w/,
        ve = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
        _e = /[+~]/,
        Se = /'|\\/g,
        be = new RegExp("\\\\([\\da-f]{1,6}" + ie + "?|(" + ie + ")|.)", "ig"),
        we = function (e, t, o) {
          var i = "0x" + t - 65536;
          return i !== i || o
            ? t
            : 0 > i
            ? String.fromCharCode(i + 65536)
            : String.fromCharCode((i >> 10) | 55296, (1023 & i) | 56320);
        };
      try {
        X.apply((G = ee.call(O.childNodes)), O.childNodes),
          G[O.childNodes.length].nodeType;
      } catch (Te) {
        X = {
          apply: G.length
            ? function (e, t) {
                Y.apply(e, ee.call(t));
              }
            : function (e, t) {
                for (var o = e.length, i = 0; (e[o++] = t[i++]); );
                e.length = o - 1;
              },
        };
      }
      (b = t.support = {}),
        (C = t.isXML =
          function (e) {
            var t = e && (e.ownerDocument || e).documentElement;
            return t ? "HTML" !== t.nodeName : !1;
          }),
        (A = t.setDocument =
          function (e) {
            var t,
              o = e ? e.ownerDocument || e : O,
              i = o.defaultView;
            return o !== D && 9 === o.nodeType && o.documentElement
              ? ((D = o),
                (J = o.documentElement),
                (Z = !C(o)),
                i &&
                  i !== i.top &&
                  (i.addEventListener
                    ? i.addEventListener(
                        "unload",
                        function () {
                          A();
                        },
                        !1
                      )
                    : i.attachEvent &&
                      i.attachEvent("onunload", function () {
                        A();
                      })),
                (b.attributes = s(function (e) {
                  return (e.className = "i"), !e.getAttribute("className");
                })),
                (b.getElementsByTagName = s(function (e) {
                  return (
                    e.appendChild(o.createComment("")),
                    !e.getElementsByTagName("*").length
                  );
                })),
                (b.getElementsByClassName =
                  ge.test(o.getElementsByClassName) &&
                  s(function (e) {
                    return (
                      (e.innerHTML =
                        "<div class='a'></div><div class='a i'></div>"),
                      (e.firstChild.className = "i"),
                      2 === e.getElementsByClassName("i").length
                    );
                  })),
                (b.getById = s(function (e) {
                  return (
                    (J.appendChild(e).id = j),
                    !o.getElementsByName || !o.getElementsByName(j).length
                  );
                })),
                b.getById
                  ? ((w.find.ID = function (e, t) {
                      if (typeof t.getElementById !== K && Z) {
                        var o = t.getElementById(e);
                        return o && o.parentNode ? [o] : [];
                      }
                    }),
                    (w.filter.ID = function (e) {
                      var t = e.replace(be, we);
                      return function (e) {
                        return e.getAttribute("id") === t;
                      };
                    }))
                  : (delete w.find.ID,
                    (w.filter.ID = function (e) {
                      var t = e.replace(be, we);
                      return function (e) {
                        var o =
                          typeof e.getAttributeNode !== K &&
                          e.getAttributeNode("id");
                        return o && o.value === t;
                      };
                    })),
                (w.find.TAG = b.getElementsByTagName
                  ? function (e, t) {
                      return typeof t.getElementsByTagName !== K
                        ? t.getElementsByTagName(e)
                        : void 0;
                    }
                  : function (e, t) {
                      var o,
                        i = [],
                        s = 0,
                        n = t.getElementsByTagName(e);
                      if ("*" === e) {
                        for (; (o = n[s++]); ) 1 === o.nodeType && i.push(o);
                        return i;
                      }
                      return n;
                    }),
                (w.find.CLASS =
                  b.getElementsByClassName &&
                  function (e, t) {
                    return typeof t.getElementsByClassName !== K && Z
                      ? t.getElementsByClassName(e)
                      : void 0;
                  }),
                (P = []),
                (B = []),
                (b.qsa = ge.test(o.querySelectorAll)) &&
                  (s(function (e) {
                    (e.innerHTML =
                      "<select msallowclip=''><option selected=''></option></select>"),
                      e.querySelectorAll("[msallowclip^='']").length &&
                        B.push("[*^$]=" + ie + "*(?:''|\"\")"),
                      e.querySelectorAll("[selected]").length ||
                        B.push("\\[" + ie + "*(?:value|" + oe + ")"),
                      e.querySelectorAll(":checked").length ||
                        B.push(":checked");
                  }),
                  s(function (e) {
                    var t = o.createElement("input");
                    t.setAttribute("type", "hidden"),
                      e.appendChild(t).setAttribute("name", "D"),
                      e.querySelectorAll("[name=d]").length &&
                        B.push("name" + ie + "*[*^$|!~]?="),
                      e.querySelectorAll(":enabled").length ||
                        B.push(":enabled", ":disabled"),
                      e.querySelectorAll("*,:x"),
                      B.push(",.*:");
                  })),
                (b.matchesSelector = ge.test(
                  (F =
                    J.matches ||
                    J.webkitMatchesSelector ||
                    J.mozMatchesSelector ||
                    J.oMatchesSelector ||
                    J.msMatchesSelector)
                )) &&
                  s(function (e) {
                    (b.disconnectedMatch = F.call(e, "div")),
                      F.call(e, "[s!='']:x"),
                      P.push("!=", re);
                  }),
                (B = B.length && new RegExp(B.join("|"))),
                (P = P.length && new RegExp(P.join("|"))),
                (t = ge.test(J.compareDocumentPosition)),
                (I =
                  t || ge.test(J.contains)
                    ? function (e, t) {
                        var o = 9 === e.nodeType ? e.documentElement : e,
                          i = t && t.parentNode;
                        return (
                          e === i ||
                          !(
                            !i ||
                            1 !== i.nodeType ||
                            !(o.contains
                              ? o.contains(i)
                              : e.compareDocumentPosition &&
                                16 & e.compareDocumentPosition(i))
                          )
                        );
                      }
                    : function (e, t) {
                        if (t)
                          for (; (t = t.parentNode); ) if (t === e) return !0;
                        return !1;
                      }),
                (q = t
                  ? function (e, t) {
                      if (e === t) return (N = !0), 0;
                      var i =
                        !e.compareDocumentPosition - !t.compareDocumentPosition;
                      return i
                        ? i
                        : ((i =
                            (e.ownerDocument || e) === (t.ownerDocument || t)
                              ? e.compareDocumentPosition(t)
                              : 1),
                          1 & i ||
                          (!b.sortDetached &&
                            t.compareDocumentPosition(e) === i)
                            ? e === o || (e.ownerDocument === O && I(O, e))
                              ? -1
                              : t === o || (t.ownerDocument === O && I(O, t))
                              ? 1
                              : R
                              ? te.call(R, e) - te.call(R, t)
                              : 0
                            : 4 & i
                            ? -1
                            : 1);
                    }
                  : function (e, t) {
                      if (e === t) return (N = !0), 0;
                      var i,
                        s = 0,
                        n = e.parentNode,
                        r = t.parentNode,
                        u = [e],
                        l = [t];
                      if (!n || !r)
                        return e === o
                          ? -1
                          : t === o
                          ? 1
                          : n
                          ? -1
                          : r
                          ? 1
                          : R
                          ? te.call(R, e) - te.call(R, t)
                          : 0;
                      if (n === r) return a(e, t);
                      for (i = e; (i = i.parentNode); ) u.unshift(i);
                      for (i = t; (i = i.parentNode); ) l.unshift(i);
                      for (; u[s] === l[s]; ) s++;
                      return s
                        ? a(u[s], l[s])
                        : u[s] === O
                        ? -1
                        : l[s] === O
                        ? 1
                        : 0;
                    }),
                o)
              : D;
          }),
        (t.matches = function (e, o) {
          return t(e, null, null, o);
        }),
        (t.matchesSelector = function (e, o) {
          if (
            ((e.ownerDocument || e) !== D && A(e),
            (o = o.replace(ce, "='$1']")),
            !(!b.matchesSelector || !Z || (P && P.test(o)) || (B && B.test(o))))
          )
            try {
              var i = F.call(e, o);
              if (
                i ||
                b.disconnectedMatch ||
                (e.document && 11 !== e.document.nodeType)
              )
                return i;
            } catch (s) {}
          return t(o, D, null, [e]).length > 0;
        }),
        (t.contains = function (e, t) {
          return (e.ownerDocument || e) !== D && A(e), I(e, t);
        }),
        (t.attr = function (e, t) {
          (e.ownerDocument || e) !== D && A(e);
          var o = w.attrHandle[t.toLowerCase()],
            i =
              o && z.call(w.attrHandle, t.toLowerCase()) ? o(e, t, !Z) : void 0;
          return void 0 !== i
            ? i
            : b.attributes || !Z
            ? e.getAttribute(t)
            : (i = e.getAttributeNode(t)) && i.specified
            ? i.value
            : null;
        }),
        (t.error = function (e) {
          throw new Error("Syntax error, unrecognized expression: " + e);
        }),
        (t.uniqueSort = function (e) {
          var t,
            o = [],
            i = 0,
            s = 0;
          if (
            ((N = !b.detectDuplicates),
            (R = !b.sortStable && e.slice(0)),
            e.sort(q),
            N)
          ) {
            for (; (t = e[s++]); ) t === e[s] && (i = o.push(s));
            for (; i--; ) e.splice(o[i], 1);
          }
          return (R = null), e;
        }),
        (T = t.getText =
          function (e) {
            var t,
              o = "",
              i = 0,
              s = e.nodeType;
            if (s) {
              if (1 === s || 9 === s || 11 === s) {
                if ("string" == typeof e.textContent) return e.textContent;
                for (e = e.firstChild; e; e = e.nextSibling) o += T(e);
              } else if (3 === s || 4 === s) return e.nodeValue;
            } else for (; (t = e[i++]); ) o += T(t);
            return o;
          }),
        (w = t.selectors =
          {
            cacheLength: 50,
            createPseudo: i,
            match: pe,
            attrHandle: {},
            find: {},
            relative: {
              ">": { dir: "parentNode", first: !0 },
              " ": { dir: "parentNode" },
              "+": { dir: "previousSibling", first: !0 },
              "~": { dir: "previousSibling" },
            },
            preFilter: {
              ATTR: function (e) {
                return (
                  (e[1] = e[1].replace(be, we)),
                  (e[3] = (e[3] || e[4] || e[5] || "").replace(be, we)),
                  "~=" === e[2] && (e[3] = " " + e[3] + " "),
                  e.slice(0, 4)
                );
              },
              CHILD: function (e) {
                return (
                  (e[1] = e[1].toLowerCase()),
                  "nth" === e[1].slice(0, 3)
                    ? (e[3] || t.error(e[0]),
                      (e[4] = +(e[4]
                        ? e[5] + (e[6] || 1)
                        : 2 * ("even" === e[3] || "odd" === e[3]))),
                      (e[5] = +(e[7] + e[8] || "odd" === e[3])))
                    : e[3] && t.error(e[0]),
                  e
                );
              },
              PSEUDO: function (e) {
                var t,
                  o = !e[6] && e[2];
                return pe.CHILD.test(e[0])
                  ? null
                  : (e[3]
                      ? (e[2] = e[4] || e[5] || "")
                      : o &&
                        de.test(o) &&
                        (t = x(o, !0)) &&
                        (t = o.indexOf(")", o.length - t) - o.length) &&
                        ((e[0] = e[0].slice(0, t)), (e[2] = o.slice(0, t))),
                    e.slice(0, 3));
              },
            },
            filter: {
              TAG: function (e) {
                var t = e.replace(be, we).toLowerCase();
                return "*" === e
                  ? function () {
                      return !0;
                    }
                  : function (e) {
                      return e.nodeName && e.nodeName.toLowerCase() === t;
                    };
              },
              CLASS: function (e) {
                var t = H[e + " "];
                return (
                  t ||
                  ((t = new RegExp("(^|" + ie + ")" + e + "(" + ie + "|$)")) &&
                    H(e, function (e) {
                      return t.test(
                        ("string" == typeof e.className && e.className) ||
                          (typeof e.getAttribute !== K &&
                            e.getAttribute("class")) ||
                          ""
                      );
                    }))
                );
              },
              ATTR: function (e, o, i) {
                return function (s) {
                  var n = t.attr(s, e);
                  return null == n
                    ? "!=" === o
                    : o
                    ? ((n += ""),
                      "=" === o
                        ? n === i
                        : "!=" === o
                        ? n !== i
                        : "^=" === o
                        ? i && 0 === n.indexOf(i)
                        : "*=" === o
                        ? i && n.indexOf(i) > -1
                        : "$=" === o
                        ? i && n.slice(-i.length) === i
                        : "~=" === o
                        ? (" " + n + " ").indexOf(i) > -1
                        : "|=" === o
                        ? n === i || n.slice(0, i.length + 1) === i + "-"
                        : !1)
                    : !0;
                };
              },
              CHILD: function (e, t, o, i, s) {
                var n = "nth" !== e.slice(0, 3),
                  a = "last" !== e.slice(-4),
                  r = "of-type" === t;
                return 1 === i && 0 === s
                  ? function (e) {
                      return !!e.parentNode;
                    }
                  : function (t, o, u) {
                      var l,
                        h,
                        c,
                        d,
                        f,
                        p,
                        y = n !== a ? "nextSibling" : "previousSibling",
                        m = t.parentNode,
                        g = r && t.nodeName.toLowerCase(),
                        v = !u && !r;
                      if (m) {
                        if (n) {
                          for (; y; ) {
                            for (c = t; (c = c[y]); )
                              if (
                                r
                                  ? c.nodeName.toLowerCase() === g
                                  : 1 === c.nodeType
                              )
                                return !1;
                            p = y = "only" === e && !p && "nextSibling";
                          }
                          return !0;
                        }
                        if (((p = [a ? m.firstChild : m.lastChild]), a && v)) {
                          for (
                            h = m[j] || (m[j] = {}),
                              l = h[e] || [],
                              f = l[0] === W && l[1],
                              d = l[0] === W && l[2],
                              c = f && m.childNodes[f];
                            (c = (++f && c && c[y]) || (d = f = 0) || p.pop());

                          )
                            if (1 === c.nodeType && ++d && c === t) {
                              h[e] = [W, f, d];
                              break;
                            }
                        } else if (
                          v &&
                          (l = (t[j] || (t[j] = {}))[e]) &&
                          l[0] === W
                        )
                          d = l[1];
                        else
                          for (
                            ;
                            (c =
                              (++f && c && c[y]) || (d = f = 0) || p.pop()) &&
                            ((r
                              ? c.nodeName.toLowerCase() !== g
                              : 1 !== c.nodeType) ||
                              !++d ||
                              (v && ((c[j] || (c[j] = {}))[e] = [W, d]),
                              c !== t));

                          );
                        return (d -= s), d === i || (d % i === 0 && d / i >= 0);
                      }
                    };
              },
              PSEUDO: function (e, o) {
                var s,
                  n =
                    w.pseudos[e] ||
                    w.setFilters[e.toLowerCase()] ||
                    t.error("unsupported pseudo: " + e);
                return n[j]
                  ? n(o)
                  : n.length > 1
                  ? ((s = [e, e, "", o]),
                    w.setFilters.hasOwnProperty(e.toLowerCase())
                      ? i(function (e, t) {
                          for (var i, s = n(e, o), a = s.length; a--; )
                            (i = te.call(e, s[a])), (e[i] = !(t[i] = s[a]));
                        })
                      : function (e) {
                          return n(e, 0, s);
                        })
                  : n;
              },
            },
            pseudos: {
              not: i(function (e) {
                var t = [],
                  o = [],
                  s = E(e.replace(ue, "$1"));
                return s[j]
                  ? i(function (e, t, o, i) {
                      for (var n, a = s(e, null, i, []), r = e.length; r--; )
                        (n = a[r]) && (e[r] = !(t[r] = n));
                    })
                  : function (e, i, n) {
                      return (t[0] = e), s(t, null, n, o), !o.pop();
                    };
              }),
              has: i(function (e) {
                return function (o) {
                  return t(e, o).length > 0;
                };
              }),
              contains: i(function (e) {
                return function (t) {
                  return (t.textContent || t.innerText || T(t)).indexOf(e) > -1;
                };
              }),
              lang: i(function (e) {
                return (
                  fe.test(e || "") || t.error("unsupported lang: " + e),
                  (e = e.replace(be, we).toLowerCase()),
                  function (t) {
                    var o;
                    do
                      if (
                        (o = Z
                          ? t.lang
                          : t.getAttribute("xml:lang") ||
                            t.getAttribute("lang"))
                      )
                        return (
                          (o = o.toLowerCase()),
                          o === e || 0 === o.indexOf(e + "-")
                        );
                    while ((t = t.parentNode) && 1 === t.nodeType);
                    return !1;
                  }
                );
              }),
              target: function (t) {
                var o = e.location && e.location.hash;
                return o && o.slice(1) === t.id;
              },
              root: function (e) {
                return e === J;
              },
              focus: function (e) {
                return (
                  e === D.activeElement &&
                  (!D.hasFocus || D.hasFocus()) &&
                  !!(e.type || e.href || ~e.tabIndex)
                );
              },
              enabled: function (e) {
                return e.disabled === !1;
              },
              disabled: function (e) {
                return e.disabled === !0;
              },
              checked: function (e) {
                var t = e.nodeName.toLowerCase();
                return (
                  ("input" === t && !!e.checked) ||
                  ("option" === t && !!e.selected)
                );
              },
              selected: function (e) {
                return (
                  e.parentNode && e.parentNode.selectedIndex, e.selected === !0
                );
              },
              empty: function (e) {
                for (e = e.firstChild; e; e = e.nextSibling)
                  if (e.nodeType < 6) return !1;
                return !0;
              },
              parent: function (e) {
                return !w.pseudos.empty(e);
              },
              header: function (e) {
                return me.test(e.nodeName);
              },
              input: function (e) {
                return ye.test(e.nodeName);
              },
              button: function (e) {
                var t = e.nodeName.toLowerCase();
                return ("input" === t && "button" === e.type) || "button" === t;
              },
              text: function (e) {
                var t;
                return (
                  "input" === e.nodeName.toLowerCase() &&
                  "text" === e.type &&
                  (null == (t = e.getAttribute("type")) ||
                    "text" === t.toLowerCase())
                );
              },
              first: l(function () {
                return [0];
              }),
              last: l(function (e, t) {
                return [t - 1];
              }),
              eq: l(function (e, t, o) {
                return [0 > o ? o + t : o];
              }),
              even: l(function (e, t) {
                for (var o = 0; t > o; o += 2) e.push(o);
                return e;
              }),
              odd: l(function (e, t) {
                for (var o = 1; t > o; o += 2) e.push(o);
                return e;
              }),
              lt: l(function (e, t, o) {
                for (var i = 0 > o ? o + t : o; --i >= 0; ) e.push(i);
                return e;
              }),
              gt: l(function (e, t, o) {
                for (var i = 0 > o ? o + t : o; ++i < t; ) e.push(i);
                return e;
              }),
            },
          }),
        (w.pseudos.nth = w.pseudos.eq);
      for (S in { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 })
        w.pseudos[S] = r(S);
      for (S in { submit: !0, reset: !0 }) w.pseudos[S] = u(S);
      return (
        (c.prototype = w.filters = w.pseudos),
        (w.setFilters = new c()),
        (x = t.tokenize =
          function (e, o) {
            var i,
              s,
              n,
              a,
              r,
              u,
              l,
              h = V[e + " "];
            if (h) return o ? 0 : h.slice(0);
            for (r = e, u = [], l = w.preFilter; r; ) {
              (!i || (s = le.exec(r))) &&
                (s && (r = r.slice(s[0].length) || r), u.push((n = []))),
                (i = !1),
                (s = he.exec(r)) &&
                  ((i = s.shift()),
                  n.push({ value: i, type: s[0].replace(ue, " ") }),
                  (r = r.slice(i.length)));
              for (a in w.filter)
                !(s = pe[a].exec(r)) ||
                  (l[a] && !(s = l[a](s))) ||
                  ((i = s.shift()),
                  n.push({ value: i, type: a, matches: s }),
                  (r = r.slice(i.length)));
              if (!i) break;
            }
            return o ? r.length : r ? t.error(e) : V(e, u).slice(0);
          }),
        (E = t.compile =
          function (e, t) {
            var o,
              i = [],
              s = [],
              n = U[e + " "];
            if (!n) {
              for (t || (t = x(e)), o = t.length; o--; )
                (n = v(t[o])), n[j] ? i.push(n) : s.push(n);
              (n = U(e, _(s, i))), (n.selector = e);
            }
            return n;
          }),
        (L = t.select =
          function (e, t, o, i) {
            var s,
              n,
              a,
              r,
              u,
              l = "function" == typeof e && e,
              c = !i && x((e = l.selector || e));
            if (((o = o || []), 1 === c.length)) {
              if (
                ((n = c[0] = c[0].slice(0)),
                n.length > 2 &&
                  "ID" === (a = n[0]).type &&
                  b.getById &&
                  9 === t.nodeType &&
                  Z &&
                  w.relative[n[1].type])
              ) {
                if (
                  ((t = (w.find.ID(a.matches[0].replace(be, we), t) || [])[0]),
                  !t)
                )
                  return o;
                l && (t = t.parentNode), (e = e.slice(n.shift().value.length));
              }
              for (
                s = pe.needsContext.test(e) ? 0 : n.length;
                s-- && ((a = n[s]), !w.relative[(r = a.type)]);

              )
                if (
                  (u = w.find[r]) &&
                  (i = u(
                    a.matches[0].replace(be, we),
                    (_e.test(n[0].type) && h(t.parentNode)) || t
                  ))
                ) {
                  if ((n.splice(s, 1), (e = i.length && d(n)), !e))
                    return X.apply(o, i), o;
                  break;
                }
            }
            return (
              (l || E(e, c))(i, t, !Z, o, (_e.test(e) && h(t.parentNode)) || t),
              o
            );
          }),
        (b.sortStable = j.split("").sort(q).join("") === j),
        (b.detectDuplicates = !!N),
        A(),
        (b.sortDetached = s(function (e) {
          return 1 & e.compareDocumentPosition(D.createElement("div"));
        })),
        s(function (e) {
          return (
            (e.innerHTML = "<a href='#'></a>"),
            "#" === e.firstChild.getAttribute("href")
          );
        }) ||
          n("type|href|height|width", function (e, t, o) {
            return o
              ? void 0
              : e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2);
          }),
        (b.attributes &&
          s(function (e) {
            return (
              (e.innerHTML = "<input/>"),
              e.firstChild.setAttribute("value", ""),
              "" === e.firstChild.getAttribute("value")
            );
          })) ||
          n("value", function (e, t, o) {
            return o || "input" !== e.nodeName.toLowerCase()
              ? void 0
              : e.defaultValue;
          }),
        s(function (e) {
          return null == e.getAttribute("disabled");
        }) ||
          n(oe, function (e, t, o) {
            var i;
            return o
              ? void 0
              : e[t] === !0
              ? t.toLowerCase()
              : (i = e.getAttributeNode(t)) && i.specified
              ? i.value
              : null;
          }),
        t
      );
    })(e);
    (X.find = se),
      (X.expr = se.selectors),
      (X.expr[":"] = X.expr.pseudos),
      (X.unique = se.uniqueSort),
      (X.text = se.getText),
      (X.isXMLDoc = se.isXML),
      (X.contains = se.contains);
    var ne = X.expr.match.needsContext,
      ae = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
      re = /^.[^:#\[\.,]*$/;
    (X.filter = function (e, t, o) {
      var i = t[0];
      return (
        o && (e = ":not(" + e + ")"),
        1 === t.length && 1 === i.nodeType
          ? X.find.matchesSelector(i, e)
            ? [i]
            : []
          : X.find.matches(
              e,
              X.grep(t, function (e) {
                return 1 === e.nodeType;
              })
            )
      );
    }),
      X.fn.extend({
        find: function (e) {
          var t,
            o = this.length,
            i = [],
            s = this;
          if ("string" != typeof e)
            return this.pushStack(
              X(e).filter(function () {
                for (t = 0; o > t; t++) if (X.contains(s[t], this)) return !0;
              })
            );
          for (t = 0; o > t; t++) X.find(e, s[t], i);
          return (
            (i = this.pushStack(o > 1 ? X.unique(i) : i)),
            (i.selector = this.selector ? this.selector + " " + e : e),
            i
          );
        },
        filter: function (e) {
          return this.pushStack(i(this, e || [], !1));
        },
        not: function (e) {
          return this.pushStack(i(this, e || [], !0));
        },
        is: function (e) {
          return !!i(
            this,
            "string" == typeof e && ne.test(e) ? X(e) : e || [],
            !1
          ).length;
        },
      });
    var ue,
      le = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
      he = (X.fn.init = function (e, t) {
        var o, i;
        if (!e) return this;
        if ("string" == typeof e) {
          if (
            ((o =
              "<" === e[0] && ">" === e[e.length - 1] && e.length >= 3
                ? [null, e, null]
                : le.exec(e)),
            !o || (!o[1] && t))
          )
            return !t || t.jquery
              ? (t || ue).find(e)
              : this.constructor(t).find(e);
          if (o[1]) {
            if (
              ((t = t instanceof X ? t[0] : t),
              X.merge(
                this,
                X.parseHTML(
                  o[1],
                  t && t.nodeType ? t.ownerDocument || t : $,
                  !0
                )
              ),
              ae.test(o[1]) && X.isPlainObject(t))
            )
              for (o in t)
                X.isFunction(this[o]) ? this[o](t[o]) : this.attr(o, t[o]);
            return this;
          }
          return (
            (i = $.getElementById(o[2])),
            i && i.parentNode && ((this.length = 1), (this[0] = i)),
            (this.context = $),
            (this.selector = e),
            this
          );
        }
        return e.nodeType
          ? ((this.context = this[0] = e), (this.length = 1), this)
          : X.isFunction(e)
          ? "undefined" != typeof ue.ready
            ? ue.ready(e)
            : e(X)
          : (void 0 !== e.selector &&
              ((this.selector = e.selector), (this.context = e.context)),
            X.makeArray(e, this));
      });
    (he.prototype = X.fn), (ue = X($));
    var ce = /^(?:parents|prev(?:Until|All))/,
      de = { children: !0, contents: !0, next: !0, prev: !0 };
    X.extend({
      dir: function (e, t, o) {
        for (var i = [], s = void 0 !== o; (e = e[t]) && 9 !== e.nodeType; )
          if (1 === e.nodeType) {
            if (s && X(e).is(o)) break;
            i.push(e);
          }
        return i;
      },
      sibling: function (e, t) {
        for (var o = []; e; e = e.nextSibling)
          1 === e.nodeType && e !== t && o.push(e);
        return o;
      },
    }),
      X.fn.extend({
        has: function (e) {
          var t = X(e, this),
            o = t.length;
          return this.filter(function () {
            for (var e = 0; o > e; e++) if (X.contains(this, t[e])) return !0;
          });
        },
        closest: function (e, t) {
          for (
            var o,
              i = 0,
              s = this.length,
              n = [],
              a =
                ne.test(e) || "string" != typeof e
                  ? X(e, t || this.context)
                  : 0;
            s > i;
            i++
          )
            for (o = this[i]; o && o !== t; o = o.parentNode)
              if (
                o.nodeType < 11 &&
                (a
                  ? a.index(o) > -1
                  : 1 === o.nodeType && X.find.matchesSelector(o, e))
              ) {
                n.push(o);
                break;
              }
          return this.pushStack(n.length > 1 ? X.unique(n) : n);
        },
        index: function (e) {
          return e
            ? "string" == typeof e
              ? q.call(X(e), this[0])
              : q.call(this, e.jquery ? e[0] : e)
            : this[0] && this[0].parentNode
            ? this.first().prevAll().length
            : -1;
        },
        add: function (e, t) {
          return this.pushStack(X.unique(X.merge(this.get(), X(e, t))));
        },
        addBack: function (e) {
          return this.add(
            null == e ? this.prevObject : this.prevObject.filter(e)
          );
        },
      }),
      X.each(
        {
          parent: function (e) {
            var t = e.parentNode;
            return t && 11 !== t.nodeType ? t : null;
          },
          parents: function (e) {
            return X.dir(e, "parentNode");
          },
          parentsUntil: function (e, t, o) {
            return X.dir(e, "parentNode", o);
          },
          next: function (e) {
            return s(e, "nextSibling");
          },
          prev: function (e) {
            return s(e, "previousSibling");
          },
          nextAll: function (e) {
            return X.dir(e, "nextSibling");
          },
          prevAll: function (e) {
            return X.dir(e, "previousSibling");
          },
          nextUntil: function (e, t, o) {
            return X.dir(e, "nextSibling", o);
          },
          prevUntil: function (e, t, o) {
            return X.dir(e, "previousSibling", o);
          },
          siblings: function (e) {
            return X.sibling((e.parentNode || {}).firstChild, e);
          },
          children: function (e) {
            return X.sibling(e.firstChild);
          },
          contents: function (e) {
            return e.contentDocument || X.merge([], e.childNodes);
          },
        },
        function (e, t) {
          X.fn[e] = function (o, i) {
            var s = X.map(this, t, o);
            return (
              "Until" !== e.slice(-5) && (i = o),
              i && "string" == typeof i && (s = X.filter(i, s)),
              this.length > 1 &&
                (de[e] || X.unique(s), ce.test(e) && s.reverse()),
              this.pushStack(s)
            );
          };
        }
      );
    var fe = /\S+/g,
      pe = {};
    (X.Callbacks = function (e) {
      e = "string" == typeof e ? pe[e] || n(e) : X.extend({}, e);
      var t,
        o,
        i,
        s,
        a,
        r,
        u = [],
        l = !e.once && [],
        h = function (n) {
          for (
            t = e.memory && n, o = !0, r = s || 0, s = 0, a = u.length, i = !0;
            u && a > r;
            r++
          )
            if (u[r].apply(n[0], n[1]) === !1 && e.stopOnFalse) {
              t = !1;
              break;
            }
          (i = !1),
            u && (l ? l.length && h(l.shift()) : t ? (u = []) : c.disable());
        },
        c = {
          add: function () {
            if (u) {
              var o = u.length;
              !(function n(t) {
                X.each(t, function (t, o) {
                  var i = X.type(o);
                  "function" === i
                    ? (e.unique && c.has(o)) || u.push(o)
                    : o && o.length && "string" !== i && n(o);
                });
              })(arguments),
                i ? (a = u.length) : t && ((s = o), h(t));
            }
            return this;
          },
          remove: function () {
            return (
              u &&
                X.each(arguments, function (e, t) {
                  for (var o; (o = X.inArray(t, u, o)) > -1; )
                    u.splice(o, 1), i && (a >= o && a--, r >= o && r--);
                }),
              this
            );
          },
          has: function (e) {
            return e ? X.inArray(e, u) > -1 : !(!u || !u.length);
          },
          empty: function () {
            return (u = []), (a = 0), this;
          },
          disable: function () {
            return (u = l = t = void 0), this;
          },
          disabled: function () {
            return !u;
          },
          lock: function () {
            return (l = void 0), t || c.disable(), this;
          },
          locked: function () {
            return !l;
          },
          fireWith: function (e, t) {
            return (
              !u ||
                (o && !l) ||
                ((t = t || []),
                (t = [e, t.slice ? t.slice() : t]),
                i ? l.push(t) : h(t)),
              this
            );
          },
          fire: function () {
            return c.fireWith(this, arguments), this;
          },
          fired: function () {
            return !!o;
          },
        };
      return c;
    }),
      X.extend({
        Deferred: function (e) {
          var t = [
              ["resolve", "done", X.Callbacks("once memory"), "resolved"],
              ["reject", "fail", X.Callbacks("once memory"), "rejected"],
              ["notify", "progress", X.Callbacks("memory")],
            ],
            o = "pending",
            i = {
              state: function () {
                return o;
              },
              always: function () {
                return s.done(arguments).fail(arguments), this;
              },
              then: function () {
                var e = arguments;
                return X.Deferred(function (o) {
                  X.each(t, function (t, n) {
                    var a = X.isFunction(e[t]) && e[t];
                    s[n[1]](function () {
                      var e = a && a.apply(this, arguments);
                      e && X.isFunction(e.promise)
                        ? e
                            .promise()
                            .done(o.resolve)
                            .fail(o.reject)
                            .progress(o.notify)
                        : o[n[0] + "With"](
                            this === i ? o.promise() : this,
                            a ? [e] : arguments
                          );
                    });
                  }),
                    (e = null);
                }).promise();
              },
              promise: function (e) {
                return null != e ? X.extend(e, i) : i;
              },
            },
            s = {};
          return (
            (i.pipe = i.then),
            X.each(t, function (e, n) {
              var a = n[2],
                r = n[3];
              (i[n[1]] = a.add),
                r &&
                  a.add(
                    function () {
                      o = r;
                    },
                    t[1 ^ e][2].disable,
                    t[2][2].lock
                  ),
                (s[n[0]] = function () {
                  return (
                    s[n[0] + "With"](this === s ? i : this, arguments), this
                  );
                }),
                (s[n[0] + "With"] = a.fireWith);
            }),
            i.promise(s),
            e && e.call(s, s),
            s
          );
        },
        when: function (e) {
          var t,
            o,
            i,
            s = 0,
            n = H.call(arguments),
            a = n.length,
            r = 1 !== a || (e && X.isFunction(e.promise)) ? a : 0,
            u = 1 === r ? e : X.Deferred(),
            l = function (e, o, i) {
              return function (s) {
                (o[e] = this),
                  (i[e] = arguments.length > 1 ? H.call(arguments) : s),
                  i === t ? u.notifyWith(o, i) : --r || u.resolveWith(o, i);
              };
            };
          if (a > 1)
            for (
              t = new Array(a), o = new Array(a), i = new Array(a);
              a > s;
              s++
            )
              n[s] && X.isFunction(n[s].promise)
                ? n[s]
                    .promise()
                    .done(l(s, i, n))
                    .fail(u.reject)
                    .progress(l(s, o, t))
                : --r;
          return r || u.resolveWith(i, n), u.promise();
        },
      });
    var ye;
    (X.fn.ready = function (e) {
      return X.ready.promise().done(e), this;
    }),
      X.extend({
        isReady: !1,
        readyWait: 1,
        holdReady: function (e) {
          e ? X.readyWait++ : X.ready(!0);
        },
        ready: function (e) {
          (e === !0 ? --X.readyWait : X.isReady) ||
            ((X.isReady = !0),
            (e !== !0 && --X.readyWait > 0) ||
              (ye.resolveWith($, [X]),
              X.fn.triggerHandler &&
                (X($).triggerHandler("ready"), X($).off("ready"))));
        },
      }),
      (X.ready.promise = function (t) {
        return (
          ye ||
            ((ye = X.Deferred()),
            "complete" === $.readyState
              ? setTimeout(X.ready)
              : ($.addEventListener("DOMContentLoaded", a, !1),
                e.addEventListener("load", a, !1))),
          ye.promise(t)
        );
      }),
      X.ready.promise();
    var me = (X.access = function (e, t, o, i, s, n, a) {
      var r = 0,
        u = e.length,
        l = null == o;
      if ("object" === X.type(o)) {
        s = !0;
        for (r in o) X.access(e, t, r, o[r], !0, n, a);
      } else if (
        void 0 !== i &&
        ((s = !0),
        X.isFunction(i) || (a = !0),
        l &&
          (a
            ? (t.call(e, i), (t = null))
            : ((l = t),
              (t = function (e, t, o) {
                return l.call(X(e), o);
              }))),
        t)
      )
        for (; u > r; r++) t(e[r], o, a ? i : i.call(e[r], r, t(e[r], o)));
      return s ? e : l ? t.call(e) : u ? t(e[0], o) : n;
    });
    (X.acceptData = function (e) {
      return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType;
    }),
      (r.uid = 1),
      (r.accepts = X.acceptData),
      (r.prototype = {
        key: function (e) {
          if (!r.accepts(e)) return 0;
          var t = {},
            o = e[this.expando];
          if (!o) {
            o = r.uid++;
            try {
              (t[this.expando] = { value: o }), Object.defineProperties(e, t);
            } catch (i) {
              (t[this.expando] = o), X.extend(e, t);
            }
          }
          return this.cache[o] || (this.cache[o] = {}), o;
        },
        set: function (e, t, o) {
          var i,
            s = this.key(e),
            n = this.cache[s];
          if ("string" == typeof t) n[t] = o;
          else if (X.isEmptyObject(n)) X.extend(this.cache[s], t);
          else for (i in t) n[i] = t[i];
          return n;
        },
        get: function (e, t) {
          var o = this.cache[this.key(e)];
          return void 0 === t ? o : o[t];
        },
        access: function (e, t, o) {
          var i;
          return void 0 === t || (t && "string" == typeof t && void 0 === o)
            ? ((i = this.get(e, t)),
              void 0 !== i ? i : this.get(e, X.camelCase(t)))
            : (this.set(e, t, o), void 0 !== o ? o : t);
        },
        remove: function (e, t) {
          var o,
            i,
            s,
            n = this.key(e),
            a = this.cache[n];
          if (void 0 === t) this.cache[n] = {};
          else {
            X.isArray(t)
              ? (i = t.concat(t.map(X.camelCase)))
              : ((s = X.camelCase(t)),
                t in a
                  ? (i = [t, s])
                  : ((i = s), (i = i in a ? [i] : i.match(fe) || []))),
              (o = i.length);
            for (; o--; ) delete a[i[o]];
          }
        },
        hasData: function (e) {
          return !X.isEmptyObject(this.cache[e[this.expando]] || {});
        },
        discard: function (e) {
          e[this.expando] && delete this.cache[e[this.expando]];
        },
      });
    var ge = new r(),
      ve = new r(),
      _e = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
      Se = /([A-Z])/g;
    X.extend({
      hasData: function (e) {
        return ve.hasData(e) || ge.hasData(e);
      },
      data: function (e, t, o) {
        return ve.access(e, t, o);
      },
      removeData: function (e, t) {
        ve.remove(e, t);
      },
      _data: function (e, t, o) {
        return ge.access(e, t, o);
      },
      _removeData: function (e, t) {
        ge.remove(e, t);
      },
    }),
      X.fn.extend({
        data: function (e, t) {
          var o,
            i,
            s,
            n = this[0],
            a = n && n.attributes;
          if (void 0 === e) {
            if (
              this.length &&
              ((s = ve.get(n)), 1 === n.nodeType && !ge.get(n, "hasDataAttrs"))
            ) {
              for (o = a.length; o--; )
                a[o] &&
                  ((i = a[o].name),
                  0 === i.indexOf("data-") &&
                    ((i = X.camelCase(i.slice(5))), u(n, i, s[i])));
              ge.set(n, "hasDataAttrs", !0);
            }
            return s;
          }
          return "object" == typeof e
            ? this.each(function () {
                ve.set(this, e);
              })
            : me(
                this,
                function (t) {
                  var o,
                    i = X.camelCase(e);
                  if (n && void 0 === t) {
                    if (((o = ve.get(n, e)), void 0 !== o)) return o;
                    if (((o = ve.get(n, i)), void 0 !== o)) return o;
                    if (((o = u(n, i, void 0)), void 0 !== o)) return o;
                  } else
                    this.each(function () {
                      var o = ve.get(this, i);
                      ve.set(this, i, t),
                        -1 !== e.indexOf("-") &&
                          void 0 !== o &&
                          ve.set(this, e, t);
                    });
                },
                null,
                t,
                arguments.length > 1,
                null,
                !0
              );
        },
        removeData: function (e) {
          return this.each(function () {
            ve.remove(this, e);
          });
        },
      }),
      X.extend({
        queue: function (e, t, o) {
          var i;
          return e
            ? ((t = (t || "fx") + "queue"),
              (i = ge.get(e, t)),
              o &&
                (!i || X.isArray(o)
                  ? (i = ge.access(e, t, X.makeArray(o)))
                  : i.push(o)),
              i || [])
            : void 0;
        },
        dequeue: function (e, t) {
          t = t || "fx";
          var o = X.queue(e, t),
            i = o.length,
            s = o.shift(),
            n = X._queueHooks(e, t),
            a = function () {
              X.dequeue(e, t);
            };
          "inprogress" === s && ((s = o.shift()), i--),
            s &&
              ("fx" === t && o.unshift("inprogress"),
              delete n.stop,
              s.call(e, a, n)),
            !i && n && n.empty.fire();
        },
        _queueHooks: function (e, t) {
          var o = t + "queueHooks";
          return (
            ge.get(e, o) ||
            ge.access(e, o, {
              empty: X.Callbacks("once memory").add(function () {
                ge.remove(e, [t + "queue", o]);
              }),
            })
          );
        },
      }),
      X.fn.extend({
        queue: function (e, t) {
          var o = 2;
          return (
            "string" != typeof e && ((t = e), (e = "fx"), o--),
            arguments.length < o
              ? X.queue(this[0], e)
              : void 0 === t
              ? this
              : this.each(function () {
                  var o = X.queue(this, e, t);
                  X._queueHooks(this, e),
                    "fx" === e && "inprogress" !== o[0] && X.dequeue(this, e);
                })
          );
        },
        dequeue: function (e) {
          return this.each(function () {
            X.dequeue(this, e);
          });
        },
        clearQueue: function (e) {
          return this.queue(e || "fx", []);
        },
        promise: function (e, t) {
          var o,
            i = 1,
            s = X.Deferred(),
            n = this,
            a = this.length,
            r = function () {
              --i || s.resolveWith(n, [n]);
            };
          for (
            "string" != typeof e && ((t = e), (e = void 0)), e = e || "fx";
            a--;

          )
            (o = ge.get(n[a], e + "queueHooks")),
              o && o.empty && (i++, o.empty.add(r));
          return r(), s.promise(t);
        },
      });
    var be = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
      we = ["Top", "Right", "Bottom", "Left"],
      Te = function (e, t) {
        return (
          (e = t || e),
          "none" === X.css(e, "display") || !X.contains(e.ownerDocument, e)
        );
      },
      Ce = /^(?:checkbox|radio)$/i;
    !(function () {
      var e = $.createDocumentFragment(),
        t = e.appendChild($.createElement("div")),
        o = $.createElement("input");
      o.setAttribute("type", "radio"),
        o.setAttribute("checked", "checked"),
        o.setAttribute("name", "t"),
        t.appendChild(o),
        (G.checkClone = t.cloneNode(!0).cloneNode(!0).lastChild.checked),
        (t.innerHTML = "<textarea>x</textarea>"),
        (G.noCloneChecked = !!t.cloneNode(!0).lastChild.defaultValue);
    })();
    var xe = "undefined";
    G.focusinBubbles = "onfocusin" in e;
    var Ee = /^key/,
      Le = /^(?:mouse|pointer|contextmenu)|click/,
      ke = /^(?:focusinfocus|focusoutblur)$/,
      Re = /^([^.]*)(?:\.(.+)|)$/;
    (X.event = {
      global: {},
      add: function (e, t, o, i, s) {
        var n,
          a,
          r,
          u,
          l,
          h,
          c,
          d,
          f,
          p,
          y,
          m = ge.get(e);
        if (m)
          for (
            o.handler && ((n = o), (o = n.handler), (s = n.selector)),
              o.guid || (o.guid = X.guid++),
              (u = m.events) || (u = m.events = {}),
              (a = m.handle) ||
                (a = m.handle =
                  function (t) {
                    return typeof X !== xe && X.event.triggered !== t.type
                      ? X.event.dispatch.apply(e, arguments)
                      : void 0;
                  }),
              t = (t || "").match(fe) || [""],
              l = t.length;
            l--;

          )
            (r = Re.exec(t[l]) || []),
              (f = y = r[1]),
              (p = (r[2] || "").split(".").sort()),
              f &&
                ((c = X.event.special[f] || {}),
                (f = (s ? c.delegateType : c.bindType) || f),
                (c = X.event.special[f] || {}),
                (h = X.extend(
                  {
                    type: f,
                    origType: y,
                    data: i,
                    handler: o,
                    guid: o.guid,
                    selector: s,
                    needsContext: s && X.expr.match.needsContext.test(s),
                    namespace: p.join("."),
                  },
                  n
                )),
                (d = u[f]) ||
                  ((d = u[f] = []),
                  (d.delegateCount = 0),
                  (c.setup && c.setup.call(e, i, p, a) !== !1) ||
                    (e.addEventListener && e.addEventListener(f, a, !1))),
                c.add &&
                  (c.add.call(e, h),
                  h.handler.guid || (h.handler.guid = o.guid)),
                s ? d.splice(d.delegateCount++, 0, h) : d.push(h),
                (X.event.global[f] = !0));
      },
      remove: function (e, t, o, i, s) {
        var n,
          a,
          r,
          u,
          l,
          h,
          c,
          d,
          f,
          p,
          y,
          m = ge.hasData(e) && ge.get(e);
        if (m && (u = m.events)) {
          for (t = (t || "").match(fe) || [""], l = t.length; l--; )
            if (
              ((r = Re.exec(t[l]) || []),
              (f = y = r[1]),
              (p = (r[2] || "").split(".").sort()),
              f)
            ) {
              for (
                c = X.event.special[f] || {},
                  f = (i ? c.delegateType : c.bindType) || f,
                  d = u[f] || [],
                  r =
                    r[2] &&
                    new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)"),
                  a = n = d.length;
                n--;

              )
                (h = d[n]),
                  (!s && y !== h.origType) ||
                    (o && o.guid !== h.guid) ||
                    (r && !r.test(h.namespace)) ||
                    (i && i !== h.selector && ("**" !== i || !h.selector)) ||
                    (d.splice(n, 1),
                    h.selector && d.delegateCount--,
                    c.remove && c.remove.call(e, h));
              a &&
                !d.length &&
                ((c.teardown && c.teardown.call(e, p, m.handle) !== !1) ||
                  X.removeEvent(e, f, m.handle),
                delete u[f]);
            } else for (f in u) X.event.remove(e, f + t[l], o, i, !0);
          X.isEmptyObject(u) && (delete m.handle, ge.remove(e, "events"));
        }
      },
      trigger: function (t, o, i, s) {
        var n,
          a,
          r,
          u,
          l,
          h,
          c,
          d = [i || $],
          f = z.call(t, "type") ? t.type : t,
          p = z.call(t, "namespace") ? t.namespace.split(".") : [];
        if (
          ((a = r = i = i || $),
          3 !== i.nodeType &&
            8 !== i.nodeType &&
            !ke.test(f + X.event.triggered) &&
            (f.indexOf(".") >= 0 &&
              ((p = f.split(".")), (f = p.shift()), p.sort()),
            (l = f.indexOf(":") < 0 && "on" + f),
            (t = t[X.expando] ? t : new X.Event(f, "object" == typeof t && t)),
            (t.isTrigger = s ? 2 : 3),
            (t.namespace = p.join(".")),
            (t.namespace_re = t.namespace
              ? new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)")
              : null),
            (t.result = void 0),
            t.target || (t.target = i),
            (o = null == o ? [t] : X.makeArray(o, [t])),
            (c = X.event.special[f] || {}),
            s || !c.trigger || c.trigger.apply(i, o) !== !1))
        ) {
          if (!s && !c.noBubble && !X.isWindow(i)) {
            for (
              u = c.delegateType || f, ke.test(u + f) || (a = a.parentNode);
              a;
              a = a.parentNode
            )
              d.push(a), (r = a);
            r === (i.ownerDocument || $) &&
              d.push(r.defaultView || r.parentWindow || e);
          }
          for (n = 0; (a = d[n++]) && !t.isPropagationStopped(); )
            (t.type = n > 1 ? u : c.bindType || f),
              (h = (ge.get(a, "events") || {})[t.type] && ge.get(a, "handle")),
              h && h.apply(a, o),
              (h = l && a[l]),
              h &&
                h.apply &&
                X.acceptData(a) &&
                ((t.result = h.apply(a, o)),
                t.result === !1 && t.preventDefault());
          return (
            (t.type = f),
            s ||
              t.isDefaultPrevented() ||
              (c._default && c._default.apply(d.pop(), o) !== !1) ||
              !X.acceptData(i) ||
              (l &&
                X.isFunction(i[f]) &&
                !X.isWindow(i) &&
                ((r = i[l]),
                r && (i[l] = null),
                (X.event.triggered = f),
                i[f](),
                (X.event.triggered = void 0),
                r && (i[l] = r))),
            t.result
          );
        }
      },
      dispatch: function (e) {
        e = X.event.fix(e);
        var t,
          o,
          i,
          s,
          n,
          a = [],
          r = H.call(arguments),
          u = (ge.get(this, "events") || {})[e.type] || [],
          l = X.event.special[e.type] || {};
        if (
          ((r[0] = e),
          (e.delegateTarget = this),
          !l.preDispatch || l.preDispatch.call(this, e) !== !1)
        ) {
          for (
            a = X.event.handlers.call(this, e, u), t = 0;
            (s = a[t++]) && !e.isPropagationStopped();

          )
            for (
              e.currentTarget = s.elem, o = 0;
              (n = s.handlers[o++]) && !e.isImmediatePropagationStopped();

            )
              (!e.namespace_re || e.namespace_re.test(n.namespace)) &&
                ((e.handleObj = n),
                (e.data = n.data),
                (i = (
                  (X.event.special[n.origType] || {}).handle || n.handler
                ).apply(s.elem, r)),
                void 0 !== i &&
                  (e.result = i) === !1 &&
                  (e.preventDefault(), e.stopPropagation()));
          return l.postDispatch && l.postDispatch.call(this, e), e.result;
        }
      },
      handlers: function (e, t) {
        var o,
          i,
          s,
          n,
          a = [],
          r = t.delegateCount,
          u = e.target;
        if (r && u.nodeType && (!e.button || "click" !== e.type))
          for (; u !== this; u = u.parentNode || this)
            if (u.disabled !== !0 || "click" !== e.type) {
              for (i = [], o = 0; r > o; o++)
                (n = t[o]),
                  (s = n.selector + " "),
                  void 0 === i[s] &&
                    (i[s] = n.needsContext
                      ? X(s, this).index(u) >= 0
                      : X.find(s, this, null, [u]).length),
                  i[s] && i.push(n);
              i.length && a.push({ elem: u, handlers: i });
            }
        return r < t.length && a.push({ elem: this, handlers: t.slice(r) }), a;
      },
      props:
        "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(
          " "
        ),
      fixHooks: {},
      keyHooks: {
        props: "char charCode key keyCode".split(" "),
        filter: function (e, t) {
          return (
            null == e.which &&
              (e.which = null != t.charCode ? t.charCode : t.keyCode),
            e
          );
        },
      },
      mouseHooks: {
        props:
          "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(
            " "
          ),
        filter: function (e, t) {
          var o,
            i,
            s,
            n = t.button;
          return (
            null == e.pageX &&
              null != t.clientX &&
              ((o = e.target.ownerDocument || $),
              (i = o.documentElement),
              (s = o.body),
              (e.pageX =
                t.clientX +
                ((i && i.scrollLeft) || (s && s.scrollLeft) || 0) -
                ((i && i.clientLeft) || (s && s.clientLeft) || 0)),
              (e.pageY =
                t.clientY +
                ((i && i.scrollTop) || (s && s.scrollTop) || 0) -
                ((i && i.clientTop) || (s && s.clientTop) || 0))),
            e.which ||
              void 0 === n ||
              (e.which = 1 & n ? 1 : 2 & n ? 3 : 4 & n ? 2 : 0),
            e
          );
        },
      },
      fix: function (e) {
        if (e[X.expando]) return e;
        var t,
          o,
          i,
          s = e.type,
          n = e,
          a = this.fixHooks[s];
        for (
          a ||
            (this.fixHooks[s] = a =
              Le.test(s) ? this.mouseHooks : Ee.test(s) ? this.keyHooks : {}),
            i = a.props ? this.props.concat(a.props) : this.props,
            e = new X.Event(n),
            t = i.length;
          t--;

        )
          (o = i[t]), (e[o] = n[o]);
        return (
          e.target || (e.target = $),
          3 === e.target.nodeType && (e.target = e.target.parentNode),
          a.filter ? a.filter(e, n) : e
        );
      },
      special: {
        load: { noBubble: !0 },
        focus: {
          trigger: function () {
            return this !== c() && this.focus ? (this.focus(), !1) : void 0;
          },
          delegateType: "focusin",
        },
        blur: {
          trigger: function () {
            return this === c() && this.blur ? (this.blur(), !1) : void 0;
          },
          delegateType: "focusout",
        },
        click: {
          trigger: function () {
            return "checkbox" === this.type &&
              this.click &&
              X.nodeName(this, "input")
              ? (this.click(), !1)
              : void 0;
          },
          _default: function (e) {
            return X.nodeName(e.target, "a");
          },
        },
        beforeunload: {
          postDispatch: function (e) {
            void 0 !== e.result &&
              e.originalEvent &&
              (e.originalEvent.returnValue = e.result);
          },
        },
      },
      simulate: function (e, t, o, i) {
        var s = X.extend(new X.Event(), o, {
          type: e,
          isSimulated: !0,
          originalEvent: {},
        });
        i ? X.event.trigger(s, null, t) : X.event.dispatch.call(t, s),
          s.isDefaultPrevented() && o.preventDefault();
      },
    }),
      (X.removeEvent = function (e, t, o) {
        e.removeEventListener && e.removeEventListener(t, o, !1);
      }),
      (X.Event = function (e, t) {
        return this instanceof X.Event
          ? (e && e.type
              ? ((this.originalEvent = e),
                (this.type = e.type),
                (this.isDefaultPrevented =
                  e.defaultPrevented ||
                  (void 0 === e.defaultPrevented && e.returnValue === !1)
                    ? l
                    : h))
              : (this.type = e),
            t && X.extend(this, t),
            (this.timeStamp = (e && e.timeStamp) || X.now()),
            void (this[X.expando] = !0))
          : new X.Event(e, t);
      }),
      (X.Event.prototype = {
        isDefaultPrevented: h,
        isPropagationStopped: h,
        isImmediatePropagationStopped: h,
        preventDefault: function () {
          var e = this.originalEvent;
          (this.isDefaultPrevented = l),
            e && e.preventDefault && e.preventDefault();
        },
        stopPropagation: function () {
          var e = this.originalEvent;
          (this.isPropagationStopped = l),
            e && e.stopPropagation && e.stopPropagation();
        },
        stopImmediatePropagation: function () {
          var e = this.originalEvent;
          (this.isImmediatePropagationStopped = l),
            e && e.stopImmediatePropagation && e.stopImmediatePropagation(),
            this.stopPropagation();
        },
      }),
      X.each(
        {
          mouseenter: "mouseover",
          mouseleave: "mouseout",
          pointerenter: "pointerover",
          pointerleave: "pointerout",
        },
        function (e, t) {
          X.event.special[e] = {
            delegateType: t,
            bindType: t,
            handle: function (e) {
              var o,
                i = this,
                s = e.relatedTarget,
                n = e.handleObj;
              return (
                (!s || (s !== i && !X.contains(i, s))) &&
                  ((e.type = n.origType),
                  (o = n.handler.apply(this, arguments)),
                  (e.type = t)),
                o
              );
            },
          };
        }
      ),
      G.focusinBubbles ||
        X.each({ focus: "focusin", blur: "focusout" }, function (e, t) {
          var o = function (e) {
            X.event.simulate(t, e.target, X.event.fix(e), !0);
          };
          X.event.special[t] = {
            setup: function () {
              var i = this.ownerDocument || this,
                s = ge.access(i, t);
              s || i.addEventListener(e, o, !0), ge.access(i, t, (s || 0) + 1);
            },
            teardown: function () {
              var i = this.ownerDocument || this,
                s = ge.access(i, t) - 1;
              s
                ? ge.access(i, t, s)
                : (i.removeEventListener(e, o, !0), ge.remove(i, t));
            },
          };
        }),
      X.fn.extend({
        on: function (e, t, o, i, s) {
          var n, a;
          if ("object" == typeof e) {
            "string" != typeof t && ((o = o || t), (t = void 0));
            for (a in e) this.on(a, t, o, e[a], s);
            return this;
          }
          if (
            (null == o && null == i
              ? ((i = t), (o = t = void 0))
              : null == i &&
                ("string" == typeof t
                  ? ((i = o), (o = void 0))
                  : ((i = o), (o = t), (t = void 0))),
            i === !1)
          )
            i = h;
          else if (!i) return this;
          return (
            1 === s &&
              ((n = i),
              (i = function (e) {
                return X().off(e), n.apply(this, arguments);
              }),
              (i.guid = n.guid || (n.guid = X.guid++))),
            this.each(function () {
              X.event.add(this, e, i, o, t);
            })
          );
        },
        one: function (e, t, o, i) {
          return this.on(e, t, o, i, 1);
        },
        off: function (e, t, o) {
          var i, s;
          if (e && e.preventDefault && e.handleObj)
            return (
              (i = e.handleObj),
              X(e.delegateTarget).off(
                i.namespace ? i.origType + "." + i.namespace : i.origType,
                i.selector,
                i.handler
              ),
              this
            );
          if ("object" == typeof e) {
            for (s in e) this.off(s, t, e[s]);
            return this;
          }
          return (
            (t === !1 || "function" == typeof t) && ((o = t), (t = void 0)),
            o === !1 && (o = h),
            this.each(function () {
              X.event.remove(this, e, o, t);
            })
          );
        },
        trigger: function (e, t) {
          return this.each(function () {
            X.event.trigger(e, t, this);
          });
        },
        triggerHandler: function (e, t) {
          var o = this[0];
          return o ? X.event.trigger(e, t, o, !0) : void 0;
        },
      });
    var Ne =
        /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
      Ae = /<([\w:]+)/,
      De = /<|&#?\w+;/,
      Je = /<(?:script|style|link)/i,
      Ze = /checked\s*(?:[^=]|=\s*.checked.)/i,
      Be = /^$|\/(?:java|ecma)script/i,
      Pe = /^true\/(.*)/,
      Fe = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
      Ie = {
        option: [1, "<select multiple='multiple'>", "</select>"],
        thead: [1, "<table>", "</table>"],
        col: [2, "<table><colgroup>", "</colgroup></table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        _default: [0, "", ""],
      };
    (Ie.optgroup = Ie.option),
      (Ie.tbody = Ie.tfoot = Ie.colgroup = Ie.caption = Ie.thead),
      (Ie.th = Ie.td),
      X.extend({
        clone: function (e, t, o) {
          var i,
            s,
            n,
            a,
            r = e.cloneNode(!0),
            u = X.contains(e.ownerDocument, e);
          if (
            !(
              G.noCloneChecked ||
              (1 !== e.nodeType && 11 !== e.nodeType) ||
              X.isXMLDoc(e)
            )
          )
            for (a = g(r), n = g(e), i = 0, s = n.length; s > i; i++)
              v(n[i], a[i]);
          if (t)
            if (o)
              for (
                n = n || g(e), a = a || g(r), i = 0, s = n.length;
                s > i;
                i++
              )
                m(n[i], a[i]);
            else m(e, r);
          return (
            (a = g(r, "script")), a.length > 0 && y(a, !u && g(e, "script")), r
          );
        },
        buildFragment: function (e, t, o, i) {
          for (
            var s,
              n,
              a,
              r,
              u,
              l,
              h = t.createDocumentFragment(),
              c = [],
              d = 0,
              f = e.length;
            f > d;
            d++
          )
            if (((s = e[d]), s || 0 === s))
              if ("object" === X.type(s)) X.merge(c, s.nodeType ? [s] : s);
              else if (De.test(s)) {
                for (
                  n = n || h.appendChild(t.createElement("div")),
                    a = (Ae.exec(s) || ["", ""])[1].toLowerCase(),
                    r = Ie[a] || Ie._default,
                    n.innerHTML = r[1] + s.replace(Ne, "<$1></$2>") + r[2],
                    l = r[0];
                  l--;

                )
                  n = n.lastChild;
                X.merge(c, n.childNodes),
                  (n = h.firstChild),
                  (n.textContent = "");
              } else c.push(t.createTextNode(s));
          for (h.textContent = "", d = 0; (s = c[d++]); )
            if (
              (!i || -1 === X.inArray(s, i)) &&
              ((u = X.contains(s.ownerDocument, s)),
              (n = g(h.appendChild(s), "script")),
              u && y(n),
              o)
            )
              for (l = 0; (s = n[l++]); ) Be.test(s.type || "") && o.push(s);
          return h;
        },
        cleanData: function (e) {
          for (
            var t, o, i, s, n = X.event.special, a = 0;
            void 0 !== (o = e[a]);
            a++
          ) {
            if (
              X.acceptData(o) &&
              ((s = o[ge.expando]), s && (t = ge.cache[s]))
            ) {
              if (t.events)
                for (i in t.events)
                  n[i] ? X.event.remove(o, i) : X.removeEvent(o, i, t.handle);
              ge.cache[s] && delete ge.cache[s];
            }
            delete ve.cache[o[ve.expando]];
          }
        },
      }),
      X.fn.extend({
        text: function (e) {
          return me(
            this,
            function (e) {
              return void 0 === e
                ? X.text(this)
                : this.empty().each(function () {
                    (1 === this.nodeType ||
                      11 === this.nodeType ||
                      9 === this.nodeType) &&
                      (this.textContent = e);
                  });
            },
            null,
            e,
            arguments.length
          );
        },
        append: function () {
          return this.domManip(arguments, function (e) {
            if (
              1 === this.nodeType ||
              11 === this.nodeType ||
              9 === this.nodeType
            ) {
              var t = d(this, e);
              t.appendChild(e);
            }
          });
        },
        prepend: function () {
          return this.domManip(arguments, function (e) {
            if (
              1 === this.nodeType ||
              11 === this.nodeType ||
              9 === this.nodeType
            ) {
              var t = d(this, e);
              t.insertBefore(e, t.firstChild);
            }
          });
        },
        before: function () {
          return this.domManip(arguments, function (e) {
            this.parentNode && this.parentNode.insertBefore(e, this);
          });
        },
        after: function () {
          return this.domManip(arguments, function (e) {
            this.parentNode &&
              this.parentNode.insertBefore(e, this.nextSibling);
          });
        },
        remove: function (e, t) {
          for (
            var o, i = e ? X.filter(e, this) : this, s = 0;
            null != (o = i[s]);
            s++
          )
            t || 1 !== o.nodeType || X.cleanData(g(o)),
              o.parentNode &&
                (t && X.contains(o.ownerDocument, o) && y(g(o, "script")),
                o.parentNode.removeChild(o));
          return this;
        },
        empty: function () {
          for (var e, t = 0; null != (e = this[t]); t++)
            1 === e.nodeType && (X.cleanData(g(e, !1)), (e.textContent = ""));
          return this;
        },
        clone: function (e, t) {
          return (
            (e = null == e ? !1 : e),
            (t = null == t ? e : t),
            this.map(function () {
              return X.clone(this, e, t);
            })
          );
        },
        html: function (e) {
          return me(
            this,
            function (e) {
              var t = this[0] || {},
                o = 0,
                i = this.length;
              if (void 0 === e && 1 === t.nodeType) return t.innerHTML;
              if (
                "string" == typeof e &&
                !Je.test(e) &&
                !Ie[(Ae.exec(e) || ["", ""])[1].toLowerCase()]
              ) {
                e = e.replace(Ne, "<$1></$2>");
                try {
                  for (; i > o; o++)
                    (t = this[o] || {}),
                      1 === t.nodeType &&
                        (X.cleanData(g(t, !1)), (t.innerHTML = e));
                  t = 0;
                } catch (s) {}
              }
              t && this.empty().append(e);
            },
            null,
            e,
            arguments.length
          );
        },
        replaceWith: function () {
          var e = arguments[0];
          return (
            this.domManip(arguments, function (t) {
              (e = this.parentNode),
                X.cleanData(g(this)),
                e && e.replaceChild(t, this);
            }),
            e && (e.length || e.nodeType) ? this : this.remove()
          );
        },
        detach: function (e) {
          return this.remove(e, !0);
        },
        domManip: function (e, t) {
          e = V.apply([], e);
          var o,
            i,
            s,
            n,
            a,
            r,
            u = 0,
            l = this.length,
            h = this,
            c = l - 1,
            d = e[0],
            y = X.isFunction(d);
          if (
            y ||
            (l > 1 && "string" == typeof d && !G.checkClone && Ze.test(d))
          )
            return this.each(function (o) {
              var i = h.eq(o);
              y && (e[0] = d.call(this, o, i.html())), i.domManip(e, t);
            });
          if (
            l &&
            ((o = X.buildFragment(e, this[0].ownerDocument, !1, this)),
            (i = o.firstChild),
            1 === o.childNodes.length && (o = i),
            i)
          ) {
            for (s = X.map(g(o, "script"), f), n = s.length; l > u; u++)
              (a = o),
                u !== c &&
                  ((a = X.clone(a, !0, !0)), n && X.merge(s, g(a, "script"))),
                t.call(this[u], a, u);
            if (n)
              for (
                r = s[s.length - 1].ownerDocument, X.map(s, p), u = 0;
                n > u;
                u++
              )
                (a = s[u]),
                  Be.test(a.type || "") &&
                    !ge.access(a, "globalEval") &&
                    X.contains(r, a) &&
                    (a.src
                      ? X._evalUrl && X._evalUrl(a.src)
                      : X.globalEval(a.textContent.replace(Fe, "")));
          }
          return this;
        },
      }),
      X.each(
        {
          appendTo: "append",
          prependTo: "prepend",
          insertBefore: "before",
          insertAfter: "after",
          replaceAll: "replaceWith",
        },
        function (e, t) {
          X.fn[e] = function (e) {
            for (var o, i = [], s = X(e), n = s.length - 1, a = 0; n >= a; a++)
              (o = a === n ? this : this.clone(!0)),
                X(s[a])[t](o),
                U.apply(i, o.get());
            return this.pushStack(i);
          };
        }
      );
    var je,
      Oe = {},
      We = /^margin/,
      Me = new RegExp("^(" + be + ")(?!px)[a-z%]+$", "i"),
      He = function (e) {
        return e.ownerDocument.defaultView.getComputedStyle(e, null);
      };
    !(function () {
      function t() {
        (a.style.cssText =
          "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute"),
          (a.innerHTML = ""),
          s.appendChild(n);
        var t = e.getComputedStyle(a, null);
        (o = "1%" !== t.top), (i = "4px" === t.width), s.removeChild(n);
      }
      var o,
        i,
        s = $.documentElement,
        n = $.createElement("div"),
        a = $.createElement("div");
      a.style &&
        ((a.style.backgroundClip = "content-box"),
        (a.cloneNode(!0).style.backgroundClip = ""),
        (G.clearCloneStyle = "content-box" === a.style.backgroundClip),
        (n.style.cssText =
          "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;position:absolute"),
        n.appendChild(a),
        e.getComputedStyle &&
          X.extend(G, {
            pixelPosition: function () {
              return t(), o;
            },
            boxSizingReliable: function () {
              return null == i && t(), i;
            },
            reliableMarginRight: function () {
              var t,
                o = a.appendChild($.createElement("div"));
              return (
                (o.style.cssText = a.style.cssText =
                  "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0"),
                (o.style.marginRight = o.style.width = "0"),
                (a.style.width = "1px"),
                s.appendChild(n),
                (t = !parseFloat(e.getComputedStyle(o, null).marginRight)),
                s.removeChild(n),
                t
              );
            },
          }));
    })(),
      (X.swap = function (e, t, o, i) {
        var s,
          n,
          a = {};
        for (n in t) (a[n] = e.style[n]), (e.style[n] = t[n]);
        s = o.apply(e, i || []);
        for (n in t) e.style[n] = a[n];
        return s;
      });
    var Ve = /^(none|table(?!-c[ea]).+)/,
      Ue = new RegExp("^(" + be + ")(.*)$", "i"),
      qe = new RegExp("^([+-])=(" + be + ")", "i"),
      Ke = { position: "absolute", visibility: "hidden", display: "block" },
      Qe = { letterSpacing: "0", fontWeight: "400" },
      ze = ["Webkit", "O", "Moz", "ms"];
    X.extend({
      cssHooks: {
        opacity: {
          get: function (e, t) {
            if (t) {
              var o = b(e, "opacity");
              return "" === o ? "1" : o;
            }
          },
        },
      },
      cssNumber: {
        columnCount: !0,
        fillOpacity: !0,
        flexGrow: !0,
        flexShrink: !0,
        fontWeight: !0,
        lineHeight: !0,
        opacity: !0,
        order: !0,
        orphans: !0,
        widows: !0,
        zIndex: !0,
        zoom: !0,
      },
      cssProps: { float: "cssFloat" },
      style: function (e, t, o, i) {
        if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
          var s,
            n,
            a,
            r = X.camelCase(t),
            u = e.style;
          return (
            (t = X.cssProps[r] || (X.cssProps[r] = T(u, r))),
            (a = X.cssHooks[t] || X.cssHooks[r]),
            void 0 === o
              ? a && "get" in a && void 0 !== (s = a.get(e, !1, i))
                ? s
                : u[t]
              : ((n = typeof o),
                "string" === n &&
                  (s = qe.exec(o)) &&
                  ((o = (s[1] + 1) * s[2] + parseFloat(X.css(e, t))),
                  (n = "number")),
                void (
                  null != o &&
                  o === o &&
                  ("number" !== n || X.cssNumber[r] || (o += "px"),
                  G.clearCloneStyle ||
                    "" !== o ||
                    0 !== t.indexOf("background") ||
                    (u[t] = "inherit"),
                  (a && "set" in a && void 0 === (o = a.set(e, o, i))) ||
                    (u[t] = o))
                ))
          );
        }
      },
      css: function (e, t, o, i) {
        var s,
          n,
          a,
          r = X.camelCase(t);
        return (
          (t = X.cssProps[r] || (X.cssProps[r] = T(e.style, r))),
          (a = X.cssHooks[t] || X.cssHooks[r]),
          a && "get" in a && (s = a.get(e, !0, o)),
          void 0 === s && (s = b(e, t, i)),
          "normal" === s && t in Qe && (s = Qe[t]),
          "" === o || o
            ? ((n = parseFloat(s)), o === !0 || X.isNumeric(n) ? n || 0 : s)
            : s
        );
      },
    }),
      X.each(["height", "width"], function (e, t) {
        X.cssHooks[t] = {
          get: function (e, o, i) {
            return o
              ? Ve.test(X.css(e, "display")) && 0 === e.offsetWidth
                ? X.swap(e, Ke, function () {
                    return E(e, t, i);
                  })
                : E(e, t, i)
              : void 0;
          },
          set: function (e, o, i) {
            var s = i && He(e);
            return C(
              e,
              o,
              i
                ? x(e, t, i, "border-box" === X.css(e, "boxSizing", !1, s), s)
                : 0
            );
          },
        };
      }),
      (X.cssHooks.marginRight = w(G.reliableMarginRight, function (e, t) {
        return t
          ? X.swap(e, { display: "inline-block" }, b, [e, "marginRight"])
          : void 0;
      })),
      X.each({ margin: "", padding: "", border: "Width" }, function (e, t) {
        (X.cssHooks[e + t] = {
          expand: function (o) {
            for (
              var i = 0, s = {}, n = "string" == typeof o ? o.split(" ") : [o];
              4 > i;
              i++
            )
              s[e + we[i] + t] = n[i] || n[i - 2] || n[0];
            return s;
          },
        }),
          We.test(e) || (X.cssHooks[e + t].set = C);
      }),
      X.fn.extend({
        css: function (e, t) {
          return me(
            this,
            function (e, t, o) {
              var i,
                s,
                n = {},
                a = 0;
              if (X.isArray(t)) {
                for (i = He(e), s = t.length; s > a; a++)
                  n[t[a]] = X.css(e, t[a], !1, i);
                return n;
              }
              return void 0 !== o ? X.style(e, t, o) : X.css(e, t);
            },
            e,
            t,
            arguments.length > 1
          );
        },
        show: function () {
          return L(this, !0);
        },
        hide: function () {
          return L(this);
        },
        toggle: function (e) {
          return "boolean" == typeof e
            ? e
              ? this.show()
              : this.hide()
            : this.each(function () {
                Te(this) ? X(this).show() : X(this).hide();
              });
        },
      }),
      (X.Tween = k),
      (k.prototype = {
        constructor: k,
        init: function (e, t, o, i, s, n) {
          (this.elem = e),
            (this.prop = o),
            (this.easing = s || "swing"),
            (this.options = t),
            (this.start = this.now = this.cur()),
            (this.end = i),
            (this.unit = n || (X.cssNumber[o] ? "" : "px"));
        },
        cur: function () {
          var e = k.propHooks[this.prop];
          return e && e.get ? e.get(this) : k.propHooks._default.get(this);
        },
        run: function (e) {
          var t,
            o = k.propHooks[this.prop];
          return (
            (this.pos = t =
              this.options.duration
                ? X.easing[this.easing](
                    e,
                    this.options.duration * e,
                    0,
                    1,
                    this.options.duration
                  )
                : e),
            (this.now = (this.end - this.start) * t + this.start),
            this.options.step &&
              this.options.step.call(this.elem, this.now, this),
            o && o.set ? o.set(this) : k.propHooks._default.set(this),
            this
          );
        },
      }),
      (k.prototype.init.prototype = k.prototype),
      (k.propHooks = {
        _default: {
          get: function (e) {
            var t;
            return null == e.elem[e.prop] ||
              (e.elem.style && null != e.elem.style[e.prop])
              ? ((t = X.css(e.elem, e.prop, "")), t && "auto" !== t ? t : 0)
              : e.elem[e.prop];
          },
          set: function (e) {
            X.fx.step[e.prop]
              ? X.fx.step[e.prop](e)
              : e.elem.style &&
                (null != e.elem.style[X.cssProps[e.prop]] || X.cssHooks[e.prop])
              ? X.style(e.elem, e.prop, e.now + e.unit)
              : (e.elem[e.prop] = e.now);
          },
        },
      }),
      (k.propHooks.scrollTop = k.propHooks.scrollLeft =
        {
          set: function (e) {
            e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now);
          },
        }),
      (X.easing = {
        linear: function (e) {
          return e;
        },
        swing: function (e) {
          return 0.5 - Math.cos(e * Math.PI) / 2;
        },
      }),
      (X.fx = k.prototype.init),
      (X.fx.step = {});
    var Ge,
      $e,
      Ye = /^(?:toggle|show|hide)$/,
      Xe = new RegExp("^(?:([+-])=|)(" + be + ")([a-z%]*)$", "i"),
      et = /queueHooks$/,
      tt = [D],
      ot = {
        "*": [
          function (e, t) {
            var o = this.createTween(e, t),
              i = o.cur(),
              s = Xe.exec(t),
              n = (s && s[3]) || (X.cssNumber[e] ? "" : "px"),
              a =
                (X.cssNumber[e] || ("px" !== n && +i)) &&
                Xe.exec(X.css(o.elem, e)),
              r = 1,
              u = 20;
            if (a && a[3] !== n) {
              (n = n || a[3]), (s = s || []), (a = +i || 1);
              do (r = r || ".5"), (a /= r), X.style(o.elem, e, a + n);
              while (r !== (r = o.cur() / i) && 1 !== r && --u);
            }
            return (
              s &&
                ((a = o.start = +a || +i || 0),
                (o.unit = n),
                (o.end = s[1] ? a + (s[1] + 1) * s[2] : +s[2])),
              o
            );
          },
        ],
      };
    (X.Animation = X.extend(Z, {
      tweener: function (e, t) {
        X.isFunction(e) ? ((t = e), (e = ["*"])) : (e = e.split(" "));
        for (var o, i = 0, s = e.length; s > i; i++)
          (o = e[i]), (ot[o] = ot[o] || []), ot[o].unshift(t);
      },
      prefilter: function (e, t) {
        t ? tt.unshift(e) : tt.push(e);
      },
    })),
      (X.speed = function (e, t, o) {
        var i =
          e && "object" == typeof e
            ? X.extend({}, e)
            : {
                complete: o || (!o && t) || (X.isFunction(e) && e),
                duration: e,
                easing: (o && t) || (t && !X.isFunction(t) && t),
              };
        return (
          (i.duration = X.fx.off
            ? 0
            : "number" == typeof i.duration
            ? i.duration
            : i.duration in X.fx.speeds
            ? X.fx.speeds[i.duration]
            : X.fx.speeds._default),
          (null == i.queue || i.queue === !0) && (i.queue = "fx"),
          (i.old = i.complete),
          (i.complete = function () {
            X.isFunction(i.old) && i.old.call(this),
              i.queue && X.dequeue(this, i.queue);
          }),
          i
        );
      }),
      X.fn.extend({
        fadeTo: function (e, t, o, i) {
          return this.filter(Te)
            .css("opacity", 0)
            .show()
            .end()
            .animate({ opacity: t }, e, o, i);
        },
        animate: function (e, t, o, i) {
          var s = X.isEmptyObject(e),
            n = X.speed(t, o, i),
            a = function () {
              var t = Z(this, X.extend({}, e), n);
              (s || ge.get(this, "finish")) && t.stop(!0);
            };
          return (
            (a.finish = a),
            s || n.queue === !1 ? this.each(a) : this.queue(n.queue, a)
          );
        },
        stop: function (e, t, o) {
          var i = function (e) {
            var t = e.stop;
            delete e.stop, t(o);
          };
          return (
            "string" != typeof e && ((o = t), (t = e), (e = void 0)),
            t && e !== !1 && this.queue(e || "fx", []),
            this.each(function () {
              var t = !0,
                s = null != e && e + "queueHooks",
                n = X.timers,
                a = ge.get(this);
              if (s) a[s] && a[s].stop && i(a[s]);
              else for (s in a) a[s] && a[s].stop && et.test(s) && i(a[s]);
              for (s = n.length; s--; )
                n[s].elem !== this ||
                  (null != e && n[s].queue !== e) ||
                  (n[s].anim.stop(o), (t = !1), n.splice(s, 1));
              (t || !o) && X.dequeue(this, e);
            })
          );
        },
        finish: function (e) {
          return (
            e !== !1 && (e = e || "fx"),
            this.each(function () {
              var t,
                o = ge.get(this),
                i = o[e + "queue"],
                s = o[e + "queueHooks"],
                n = X.timers,
                a = i ? i.length : 0;
              for (
                o.finish = !0,
                  X.queue(this, e, []),
                  s && s.stop && s.stop.call(this, !0),
                  t = n.length;
                t--;

              )
                n[t].elem === this &&
                  n[t].queue === e &&
                  (n[t].anim.stop(!0), n.splice(t, 1));
              for (t = 0; a > t; t++)
                i[t] && i[t].finish && i[t].finish.call(this);
              delete o.finish;
            })
          );
        },
      }),
      X.each(["toggle", "show", "hide"], function (e, t) {
        var o = X.fn[t];
        X.fn[t] = function (e, i, s) {
          return null == e || "boolean" == typeof e
            ? o.apply(this, arguments)
            : this.animate(N(t, !0), e, i, s);
        };
      }),
      X.each(
        {
          slideDown: N("show"),
          slideUp: N("hide"),
          slideToggle: N("toggle"),
          fadeIn: { opacity: "show" },
          fadeOut: { opacity: "hide" },
          fadeToggle: { opacity: "toggle" },
        },
        function (e, t) {
          X.fn[e] = function (e, o, i) {
            return this.animate(t, e, o, i);
          };
        }
      ),
      (X.timers = []),
      (X.fx.tick = function () {
        var e,
          t = 0,
          o = X.timers;
        for (Ge = X.now(); t < o.length; t++)
          (e = o[t]), e() || o[t] !== e || o.splice(t--, 1);
        o.length || X.fx.stop(), (Ge = void 0);
      }),
      (X.fx.timer = function (e) {
        X.timers.push(e), e() ? X.fx.start() : X.timers.pop();
      }),
      (X.fx.interval = 13),
      (X.fx.start = function () {
        $e || ($e = setInterval(X.fx.tick, X.fx.interval));
      }),
      (X.fx.stop = function () {
        clearInterval($e), ($e = null);
      }),
      (X.fx.speeds = { slow: 600, fast: 200, _default: 400 }),
      (X.fn.delay = function (e, t) {
        return (
          (e = X.fx ? X.fx.speeds[e] || e : e),
          (t = t || "fx"),
          this.queue(t, function (t, o) {
            var i = setTimeout(t, e);
            o.stop = function () {
              clearTimeout(i);
            };
          })
        );
      }),
      (function () {
        var e = $.createElement("input"),
          t = $.createElement("select"),
          o = t.appendChild($.createElement("option"));
        (e.type = "checkbox"),
          (G.checkOn = "" !== e.value),
          (G.optSelected = o.selected),
          (t.disabled = !0),
          (G.optDisabled = !o.disabled),
          (e = $.createElement("input")),
          (e.value = "t"),
          (e.type = "radio"),
          (G.radioValue = "t" === e.value);
      })();
    var it,
      st,
      nt = X.expr.attrHandle;
    X.fn.extend({
      attr: function (e, t) {
        return me(this, X.attr, e, t, arguments.length > 1);
      },
      removeAttr: function (e) {
        return this.each(function () {
          X.removeAttr(this, e);
        });
      },
    }),
      X.extend({
        attr: function (e, t, o) {
          var i,
            s,
            n = e.nodeType;
          return e && 3 !== n && 8 !== n && 2 !== n
            ? typeof e.getAttribute === xe
              ? X.prop(e, t, o)
              : ((1 === n && X.isXMLDoc(e)) ||
                  ((t = t.toLowerCase()),
                  (i =
                    X.attrHooks[t] || (X.expr.match.bool.test(t) ? st : it))),
                void 0 === o
                  ? i && "get" in i && null !== (s = i.get(e, t))
                    ? s
                    : ((s = X.find.attr(e, t)), null == s ? void 0 : s)
                  : null !== o
                  ? i && "set" in i && void 0 !== (s = i.set(e, o, t))
                    ? s
                    : (e.setAttribute(t, o + ""), o)
                  : void X.removeAttr(e, t))
            : void 0;
        },
        removeAttr: function (e, t) {
          var o,
            i,
            s = 0,
            n = t && t.match(fe);
          if (n && 1 === e.nodeType)
            for (; (o = n[s++]); )
              (i = X.propFix[o] || o),
                X.expr.match.bool.test(o) && (e[i] = !1),
                e.removeAttribute(o);
        },
        attrHooks: {
          type: {
            set: function (e, t) {
              if (!G.radioValue && "radio" === t && X.nodeName(e, "input")) {
                var o = e.value;
                return e.setAttribute("type", t), o && (e.value = o), t;
              }
            },
          },
        },
      }),
      (st = {
        set: function (e, t, o) {
          return t === !1 ? X.removeAttr(e, o) : e.setAttribute(o, o), o;
        },
      }),
      X.each(X.expr.match.bool.source.match(/\w+/g), function (e, t) {
        var o = nt[t] || X.find.attr;
        nt[t] = function (e, t, i) {
          var s, n;
          return (
            i ||
              ((n = nt[t]),
              (nt[t] = s),
              (s = null != o(e, t, i) ? t.toLowerCase() : null),
              (nt[t] = n)),
            s
          );
        };
      });
    var at = /^(?:input|select|textarea|button)$/i;
    X.fn.extend({
      prop: function (e, t) {
        return me(this, X.prop, e, t, arguments.length > 1);
      },
      removeProp: function (e) {
        return this.each(function () {
          delete this[X.propFix[e] || e];
        });
      },
    }),
      X.extend({
        propFix: { for: "htmlFor", class: "className" },
        prop: function (e, t, o) {
          var i,
            s,
            n,
            a = e.nodeType;
          return e && 3 !== a && 8 !== a && 2 !== a
            ? ((n = 1 !== a || !X.isXMLDoc(e)),
              n && ((t = X.propFix[t] || t), (s = X.propHooks[t])),
              void 0 !== o
                ? s && "set" in s && void 0 !== (i = s.set(e, o, t))
                  ? i
                  : (e[t] = o)
                : s && "get" in s && null !== (i = s.get(e, t))
                ? i
                : e[t])
            : void 0;
        },
        propHooks: {
          tabIndex: {
            get: function (e) {
              return e.hasAttribute("tabindex") || at.test(e.nodeName) || e.href
                ? e.tabIndex
                : -1;
            },
          },
        },
      }),
      G.optSelected ||
        (X.propHooks.selected = {
          get: function (e) {
            var t = e.parentNode;
            return t && t.parentNode && t.parentNode.selectedIndex, null;
          },
        }),
      X.each(
        [
          "tabIndex",
          "readOnly",
          "maxLength",
          "cellSpacing",
          "cellPadding",
          "rowSpan",
          "colSpan",
          "useMap",
          "frameBorder",
          "contentEditable",
        ],
        function () {
          X.propFix[this.toLowerCase()] = this;
        }
      );
    var rt = /[\t\r\n\f]/g;
    X.fn.extend({
      addClass: function (e) {
        var t,
          o,
          i,
          s,
          n,
          a,
          r = "string" == typeof e && e,
          u = 0,
          l = this.length;
        if (X.isFunction(e))
          return this.each(function (t) {
            X(this).addClass(e.call(this, t, this.className));
          });
        if (r)
          for (t = (e || "").match(fe) || []; l > u; u++)
            if (
              ((o = this[u]),
              (i =
                1 === o.nodeType &&
                (o.className
                  ? (" " + o.className + " ").replace(rt, " ")
                  : " ")))
            ) {
              for (n = 0; (s = t[n++]); )
                i.indexOf(" " + s + " ") < 0 && (i += s + " ");
              (a = X.trim(i)), o.className !== a && (o.className = a);
            }
        return this;
      },
      removeClass: function (e) {
        var t,
          o,
          i,
          s,
          n,
          a,
          r = 0 === arguments.length || ("string" == typeof e && e),
          u = 0,
          l = this.length;
        if (X.isFunction(e))
          return this.each(function (t) {
            X(this).removeClass(e.call(this, t, this.className));
          });
        if (r)
          for (t = (e || "").match(fe) || []; l > u; u++)
            if (
              ((o = this[u]),
              (i =
                1 === o.nodeType &&
                (o.className
                  ? (" " + o.className + " ").replace(rt, " ")
                  : "")))
            ) {
              for (n = 0; (s = t[n++]); )
                for (; i.indexOf(" " + s + " ") >= 0; )
                  i = i.replace(" " + s + " ", " ");
              (a = e ? X.trim(i) : ""), o.className !== a && (o.className = a);
            }
        return this;
      },
      toggleClass: function (e, t) {
        var o = typeof e;
        return "boolean" == typeof t && "string" === o
          ? t
            ? this.addClass(e)
            : this.removeClass(e)
          : this.each(
              X.isFunction(e)
                ? function (o) {
                    X(this).toggleClass(e.call(this, o, this.className, t), t);
                  }
                : function () {
                    if ("string" === o)
                      for (
                        var t, i = 0, s = X(this), n = e.match(fe) || [];
                        (t = n[i++]);

                      )
                        s.hasClass(t) ? s.removeClass(t) : s.addClass(t);
                    else
                      (o === xe || "boolean" === o) &&
                        (this.className &&
                          ge.set(this, "__className__", this.className),
                        (this.className =
                          this.className || e === !1
                            ? ""
                            : ge.get(this, "__className__") || ""));
                  }
            );
      },
      hasClass: function (e) {
        for (var t = " " + e + " ", o = 0, i = this.length; i > o; o++)
          if (
            1 === this[o].nodeType &&
            (" " + this[o].className + " ").replace(rt, " ").indexOf(t) >= 0
          )
            return !0;
        return !1;
      },
    });
    var ut = /\r/g;
    X.fn.extend({
      val: function (e) {
        var t,
          o,
          i,
          s = this[0];
        return arguments.length
          ? ((i = X.isFunction(e)),
            this.each(function (o) {
              var s;
              1 === this.nodeType &&
                ((s = i ? e.call(this, o, X(this).val()) : e),
                null == s
                  ? (s = "")
                  : "number" == typeof s
                  ? (s += "")
                  : X.isArray(s) &&
                    (s = X.map(s, function (e) {
                      return null == e ? "" : e + "";
                    })),
                (t =
                  X.valHooks[this.type] ||
                  X.valHooks[this.nodeName.toLowerCase()]),
                (t && "set" in t && void 0 !== t.set(this, s, "value")) ||
                  (this.value = s));
            }))
          : s
          ? ((t = X.valHooks[s.type] || X.valHooks[s.nodeName.toLowerCase()]),
            t && "get" in t && void 0 !== (o = t.get(s, "value"))
              ? o
              : ((o = s.value),
                "string" == typeof o ? o.replace(ut, "") : null == o ? "" : o))
          : void 0;
      },
    }),
      X.extend({
        valHooks: {
          option: {
            get: function (e) {
              var t = X.find.attr(e, "value");
              return null != t ? t : X.trim(X.text(e));
            },
          },
          select: {
            get: function (e) {
              for (
                var t,
                  o,
                  i = e.options,
                  s = e.selectedIndex,
                  n = "select-one" === e.type || 0 > s,
                  a = n ? null : [],
                  r = n ? s + 1 : i.length,
                  u = 0 > s ? r : n ? s : 0;
                r > u;
                u++
              )
                if (
                  ((o = i[u]),
                  !(
                    (!o.selected && u !== s) ||
                    (G.optDisabled
                      ? o.disabled
                      : null !== o.getAttribute("disabled")) ||
                    (o.parentNode.disabled &&
                      X.nodeName(o.parentNode, "optgroup"))
                  ))
                ) {
                  if (((t = X(o).val()), n)) return t;
                  a.push(t);
                }
              return a;
            },
            set: function (e, t) {
              for (
                var o, i, s = e.options, n = X.makeArray(t), a = s.length;
                a--;

              )
                (i = s[a]),
                  (i.selected = X.inArray(i.value, n) >= 0) && (o = !0);
              return o || (e.selectedIndex = -1), n;
            },
          },
        },
      }),
      X.each(["radio", "checkbox"], function () {
        (X.valHooks[this] = {
          set: function (e, t) {
            return X.isArray(t)
              ? (e.checked = X.inArray(X(e).val(), t) >= 0)
              : void 0;
          },
        }),
          G.checkOn ||
            (X.valHooks[this].get = function (e) {
              return null === e.getAttribute("value") ? "on" : e.value;
            });
      }),
      X.each(
        "blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(
          " "
        ),
        function (e, t) {
          X.fn[t] = function (e, o) {
            return arguments.length > 0
              ? this.on(t, null, e, o)
              : this.trigger(t);
          };
        }
      ),
      X.fn.extend({
        hover: function (e, t) {
          return this.mouseenter(e).mouseleave(t || e);
        },
        bind: function (e, t, o) {
          return this.on(e, null, t, o);
        },
        unbind: function (e, t) {
          return this.off(e, null, t);
        },
        delegate: function (e, t, o, i) {
          return this.on(t, e, o, i);
        },
        undelegate: function (e, t, o) {
          return 1 === arguments.length
            ? this.off(e, "**")
            : this.off(t, e || "**", o);
        },
      });
    var lt = X.now(),
      ht = /\?/;
    (X.parseJSON = function (e) {
      return JSON.parse(e + "");
    }),
      (X.parseXML = function (e) {
        var t, o;
        if (!e || "string" != typeof e) return null;
        try {
          (o = new DOMParser()), (t = o.parseFromString(e, "text/xml"));
        } catch (i) {
          t = void 0;
        }
        return (
          (!t || t.getElementsByTagName("parsererror").length) &&
            X.error("Invalid XML: " + e),
          t
        );
      });
    var ct,
      dt,
      ft = /#.*$/,
      pt = /([?&])_=[^&]*/,
      yt = /^(.*?):[ \t]*([^\r\n]*)$/gm,
      mt = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
      gt = /^(?:GET|HEAD)$/,
      vt = /^\/\//,
      _t = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
      St = {},
      bt = {},
      wt = "*/".concat("*");
    try {
      dt = location.href;
    } catch (Tt) {
      (dt = $.createElement("a")), (dt.href = ""), (dt = dt.href);
    }
    (ct = _t.exec(dt.toLowerCase()) || []),
      X.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
          url: dt,
          type: "GET",
          isLocal: mt.test(ct[1]),
          global: !0,
          processData: !0,
          async: !0,
          contentType: "application/x-www-form-urlencoded; charset=UTF-8",
          accepts: {
            "*": wt,
            text: "text/plain",
            html: "text/html",
            xml: "application/xml, text/xml",
            json: "application/json, text/javascript",
          },
          contents: { xml: /xml/, html: /html/, json: /json/ },
          responseFields: {
            xml: "responseXML",
            text: "responseText",
            json: "responseJSON",
          },
          converters: {
            "* text": String,
            "text html": !0,
            "text json": X.parseJSON,
            "text xml": X.parseXML,
          },
          flatOptions: { url: !0, context: !0 },
        },
        ajaxSetup: function (e, t) {
          return t ? F(F(e, X.ajaxSettings), t) : F(X.ajaxSettings, e);
        },
        ajaxPrefilter: B(St),
        ajaxTransport: B(bt),
        ajax: function (e, t) {
          function o(e, t, o, a) {
            var u,
              h,
              g,
              v,
              S,
              w = t;
            2 !== _ &&
              ((_ = 2),
              r && clearTimeout(r),
              (i = void 0),
              (n = a || ""),
              (b.readyState = e > 0 ? 4 : 0),
              (u = (e >= 200 && 300 > e) || 304 === e),
              o && (v = I(c, b, o)),
              (v = j(c, v, b, u)),
              u
                ? (c.ifModified &&
                    ((S = b.getResponseHeader("Last-Modified")),
                    S && (X.lastModified[s] = S),
                    (S = b.getResponseHeader("etag")),
                    S && (X.etag[s] = S)),
                  204 === e || "HEAD" === c.type
                    ? (w = "nocontent")
                    : 304 === e
                    ? (w = "notmodified")
                    : ((w = v.state), (h = v.data), (g = v.error), (u = !g)))
                : ((g = w), (e || !w) && ((w = "error"), 0 > e && (e = 0))),
              (b.status = e),
              (b.statusText = (t || w) + ""),
              u ? p.resolveWith(d, [h, w, b]) : p.rejectWith(d, [b, w, g]),
              b.statusCode(m),
              (m = void 0),
              l &&
                f.trigger(u ? "ajaxSuccess" : "ajaxError", [b, c, u ? h : g]),
              y.fireWith(d, [b, w]),
              l &&
                (f.trigger("ajaxComplete", [b, c]),
                --X.active || X.event.trigger("ajaxStop")));
          }
          "object" == typeof e && ((t = e), (e = void 0)), (t = t || {});
          var i,
            s,
            n,
            a,
            r,
            u,
            l,
            h,
            c = X.ajaxSetup({}, t),
            d = c.context || c,
            f = c.context && (d.nodeType || d.jquery) ? X(d) : X.event,
            p = X.Deferred(),
            y = X.Callbacks("once memory"),
            m = c.statusCode || {},
            g = {},
            v = {},
            _ = 0,
            S = "canceled",
            b = {
              readyState: 0,
              getResponseHeader: function (e) {
                var t;
                if (2 === _) {
                  if (!a)
                    for (a = {}; (t = yt.exec(n)); )
                      a[t[1].toLowerCase()] = t[2];
                  t = a[e.toLowerCase()];
                }
                return null == t ? null : t;
              },
              getAllResponseHeaders: function () {
                return 2 === _ ? n : null;
              },
              setRequestHeader: function (e, t) {
                var o = e.toLowerCase();
                return _ || ((e = v[o] = v[o] || e), (g[e] = t)), this;
              },
              overrideMimeType: function (e) {
                return _ || (c.mimeType = e), this;
              },
              statusCode: function (e) {
                var t;
                if (e)
                  if (2 > _) for (t in e) m[t] = [m[t], e[t]];
                  else b.always(e[b.status]);
                return this;
              },
              abort: function (e) {
                var t = e || S;
                return i && i.abort(t), o(0, t), this;
              },
            };
          if (
            ((p.promise(b).complete = y.add),
            (b.success = b.done),
            (b.error = b.fail),
            (c.url = ((e || c.url || dt) + "")
              .replace(ft, "")
              .replace(vt, ct[1] + "//")),
            (c.type = t.method || t.type || c.method || c.type),
            (c.dataTypes = X.trim(c.dataType || "*")
              .toLowerCase()
              .match(fe) || [""]),
            null == c.crossDomain &&
              ((u = _t.exec(c.url.toLowerCase())),
              (c.crossDomain = !(
                !u ||
                (u[1] === ct[1] &&
                  u[2] === ct[2] &&
                  (u[3] || ("http:" === u[1] ? "80" : "443")) ===
                    (ct[3] || ("http:" === ct[1] ? "80" : "443")))
              ))),
            c.data &&
              c.processData &&
              "string" != typeof c.data &&
              (c.data = X.param(c.data, c.traditional)),
            P(St, c, t, b),
            2 === _)
          )
            return b;
          (l = c.global),
            l && 0 === X.active++ && X.event.trigger("ajaxStart"),
            (c.type = c.type.toUpperCase()),
            (c.hasContent = !gt.test(c.type)),
            (s = c.url),
            c.hasContent ||
              (c.data &&
                ((s = c.url += (ht.test(s) ? "&" : "?") + c.data),
                delete c.data),
              c.cache === !1 &&
                (c.url = pt.test(s)
                  ? s.replace(pt, "$1_=" + lt++)
                  : s + (ht.test(s) ? "&" : "?") + "_=" + lt++)),
            c.ifModified &&
              (X.lastModified[s] &&
                b.setRequestHeader("If-Modified-Since", X.lastModified[s]),
              X.etag[s] && b.setRequestHeader("If-None-Match", X.etag[s])),
            ((c.data && c.hasContent && c.contentType !== !1) ||
              t.contentType) &&
              b.setRequestHeader("Content-Type", c.contentType),
            b.setRequestHeader(
              "Accept",
              c.dataTypes[0] && c.accepts[c.dataTypes[0]]
                ? c.accepts[c.dataTypes[0]] +
                    ("*" !== c.dataTypes[0] ? ", " + wt + "; q=0.01" : "")
                : c.accepts["*"]
            );
          for (h in c.headers) b.setRequestHeader(h, c.headers[h]);
          if (c.beforeSend && (c.beforeSend.call(d, b, c) === !1 || 2 === _))
            return b.abort();
          S = "abort";
          for (h in { success: 1, error: 1, complete: 1 }) b[h](c[h]);
          if ((i = P(bt, c, t, b))) {
            (b.readyState = 1),
              l && f.trigger("ajaxSend", [b, c]),
              c.async &&
                c.timeout > 0 &&
                (r = setTimeout(function () {
                  b.abort("timeout");
                }, c.timeout));
            try {
              (_ = 1), i.send(g, o);
            } catch (w) {
              if (!(2 > _)) throw w;
              o(-1, w);
            }
          } else o(-1, "No Transport");
          return b;
        },
        getJSON: function (e, t, o) {
          return X.get(e, t, o, "json");
        },
        getScript: function (e, t) {
          return X.get(e, void 0, t, "script");
        },
      }),
      X.each(["get", "post"], function (e, t) {
        X[t] = function (e, o, i, s) {
          return (
            X.isFunction(o) && ((s = s || i), (i = o), (o = void 0)),
            X.ajax({ url: e, type: t, dataType: s, data: o, success: i })
          );
        };
      }),
      X.each(
        [
          "ajaxStart",
          "ajaxStop",
          "ajaxComplete",
          "ajaxError",
          "ajaxSuccess",
          "ajaxSend",
        ],
        function (e, t) {
          X.fn[t] = function (e) {
            return this.on(t, e);
          };
        }
      ),
      (X._evalUrl = function (e) {
        return X.ajax({
          url: e,
          type: "GET",
          dataType: "script",
          async: !1,
          global: !1,
          throws: !0,
        });
      }),
      X.fn.extend({
        wrapAll: function (e) {
          var t;
          return X.isFunction(e)
            ? this.each(function (t) {
                X(this).wrapAll(e.call(this, t));
              })
            : (this[0] &&
                ((t = X(e, this[0].ownerDocument).eq(0).clone(!0)),
                this[0].parentNode && t.insertBefore(this[0]),
                t
                  .map(function () {
                    for (var e = this; e.firstElementChild; )
                      e = e.firstElementChild;
                    return e;
                  })
                  .append(this)),
              this);
        },
        wrapInner: function (e) {
          return this.each(
            X.isFunction(e)
              ? function (t) {
                  X(this).wrapInner(e.call(this, t));
                }
              : function () {
                  var t = X(this),
                    o = t.contents();
                  o.length ? o.wrapAll(e) : t.append(e);
                }
          );
        },
        wrap: function (e) {
          var t = X.isFunction(e);
          return this.each(function (o) {
            X(this).wrapAll(t ? e.call(this, o) : e);
          });
        },
        unwrap: function () {
          return this.parent()
            .each(function () {
              X.nodeName(this, "body") || X(this).replaceWith(this.childNodes);
            })
            .end();
        },
      }),
      (X.expr.filters.hidden = function (e) {
        return e.offsetWidth <= 0 && e.offsetHeight <= 0;
      }),
      (X.expr.filters.visible = function (e) {
        return !X.expr.filters.hidden(e);
      });
    var Ct = /%20/g,
      xt = /\[\]$/,
      Et = /\r?\n/g,
      Lt = /^(?:submit|button|image|reset|file)$/i,
      kt = /^(?:input|select|textarea|keygen)/i;
    (X.param = function (e, t) {
      var o,
        i = [],
        s = function (e, t) {
          (t = X.isFunction(t) ? t() : null == t ? "" : t),
            (i[i.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t));
        };
      if (
        (void 0 === t && (t = X.ajaxSettings && X.ajaxSettings.traditional),
        X.isArray(e) || (e.jquery && !X.isPlainObject(e)))
      )
        X.each(e, function () {
          s(this.name, this.value);
        });
      else for (o in e) O(o, e[o], t, s);
      return i.join("&").replace(Ct, "+");
    }),
      X.fn.extend({
        serialize: function () {
          return X.param(this.serializeArray());
        },
        serializeArray: function () {
          return this.map(function () {
            var e = X.prop(this, "elements");
            return e ? X.makeArray(e) : this;
          })
            .filter(function () {
              var e = this.type;
              return (
                this.name &&
                !X(this).is(":disabled") &&
                kt.test(this.nodeName) &&
                !Lt.test(e) &&
                (this.checked || !Ce.test(e))
              );
            })
            .map(function (e, t) {
              var o = X(this).val();
              return null == o
                ? null
                : X.isArray(o)
                ? X.map(o, function (e) {
                    return { name: t.name, value: e.replace(Et, "\r\n") };
                  })
                : { name: t.name, value: o.replace(Et, "\r\n") };
            })
            .get();
        },
      }),
      (X.ajaxSettings.xhr = function () {
        try {
          return new XMLHttpRequest();
        } catch (e) {}
      });
    var Rt = 0,
      Nt = {},
      At = { 0: 200, 1223: 204 },
      Dt = X.ajaxSettings.xhr();
    e.ActiveXObject &&
      X(e).on("unload", function () {
        for (var e in Nt) Nt[e]();
      }),
      (G.cors = !!Dt && "withCredentials" in Dt),
      (G.ajax = Dt = !!Dt),
      X.ajaxTransport(function (e) {
        var t;
        return G.cors || (Dt && !e.crossDomain)
          ? {
              send: function (o, i) {
                var s,
                  n = e.xhr(),
                  a = ++Rt;
                if (
                  (n.open(e.type, e.url, e.async, e.username, e.password),
                  e.xhrFields)
                )
                  for (s in e.xhrFields) n[s] = e.xhrFields[s];
                e.mimeType &&
                  n.overrideMimeType &&
                  n.overrideMimeType(e.mimeType),
                  e.crossDomain ||
                    o["X-Requested-With"] ||
                    (o["X-Requested-With"] = "XMLHttpRequest");
                for (s in o) n.setRequestHeader(s, o[s]);
                (t = function (e) {
                  return function () {
                    t &&
                      (delete Nt[a],
                      (t = n.onload = n.onerror = null),
                      "abort" === e
                        ? n.abort()
                        : "error" === e
                        ? i(n.status, n.statusText)
                        : i(
                            At[n.status] || n.status,
                            n.statusText,
                            "string" == typeof n.responseText
                              ? { text: n.responseText }
                              : void 0,
                            n.getAllResponseHeaders()
                          ));
                  };
                }),
                  (n.onload = t()),
                  (n.onerror = t("error")),
                  (t = Nt[a] = t("abort"));
                try {
                  n.send((e.hasContent && e.data) || null);
                } catch (r) {
                  if (t) throw r;
                }
              },
              abort: function () {
                t && t();
              },
            }
          : void 0;
      }),
      X.ajaxSetup({
        accepts: {
          script:
            "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript",
        },
        contents: { script: /(?:java|ecma)script/ },
        converters: {
          "text script": function (e) {
            return X.globalEval(e), e;
          },
        },
      }),
      X.ajaxPrefilter("script", function (e) {
        void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET");
      }),
      X.ajaxTransport("script", function (e) {
        if (e.crossDomain) {
          var t, o;
          return {
            send: function (i, s) {
              (t = X("<script>")
                .prop({ async: !0, charset: e.scriptCharset, src: e.url })
                .on(
                  "load error",
                  (o = function (e) {
                    t.remove(),
                      (o = null),
                      e && s("error" === e.type ? 404 : 200, e.type);
                  })
                )),
                $.head.appendChild(t[0]);
            },
            abort: function () {
              o && o();
            },
          };
        }
      });
    var Jt = [],
      Zt = /(=)\?(?=&|$)|\?\?/;
    X.ajaxSetup({
      jsonp: "callback",
      jsonpCallback: function () {
        var e = Jt.pop() || X.expando + "_" + lt++;
        return (this[e] = !0), e;
      },
    }),
      X.ajaxPrefilter("json jsonp", function (t, o, i) {
        var s,
          n,
          a,
          r =
            t.jsonp !== !1 &&
            (Zt.test(t.url)
              ? "url"
              : "string" == typeof t.data &&
                !(t.contentType || "").indexOf(
                  "application/x-www-form-urlencoded"
                ) &&
                Zt.test(t.data) &&
                "data");
        return r || "jsonp" === t.dataTypes[0]
          ? ((s = t.jsonpCallback =
              X.isFunction(t.jsonpCallback)
                ? t.jsonpCallback()
                : t.jsonpCallback),
            r
              ? (t[r] = t[r].replace(Zt, "$1" + s))
              : t.jsonp !== !1 &&
                (t.url += (ht.test(t.url) ? "&" : "?") + t.jsonp + "=" + s),
            (t.converters["script json"] = function () {
              return a || X.error(s + " was not called"), a[0];
            }),
            (t.dataTypes[0] = "json"),
            (n = e[s]),
            (e[s] = function () {
              a = arguments;
            }),
            i.always(function () {
              (e[s] = n),
                t[s] && ((t.jsonpCallback = o.jsonpCallback), Jt.push(s)),
                a && X.isFunction(n) && n(a[0]),
                (a = n = void 0);
            }),
            "script")
          : void 0;
      }),
      (X.parseHTML = function (e, t, o) {
        if (!e || "string" != typeof e) return null;
        "boolean" == typeof t && ((o = t), (t = !1)), (t = t || $);
        var i = ae.exec(e),
          s = !o && [];
        return i
          ? [t.createElement(i[1])]
          : ((i = X.buildFragment([e], t, s)),
            s && s.length && X(s).remove(),
            X.merge([], i.childNodes));
      });
    var Bt = X.fn.load;
    (X.fn.load = function (e, t, o) {
      if ("string" != typeof e && Bt) return Bt.apply(this, arguments);
      var i,
        s,
        n,
        a = this,
        r = e.indexOf(" ");
      return (
        r >= 0 && ((i = X.trim(e.slice(r))), (e = e.slice(0, r))),
        X.isFunction(t)
          ? ((o = t), (t = void 0))
          : t && "object" == typeof t && (s = "POST"),
        a.length > 0 &&
          X.ajax({ url: e, type: s, dataType: "html", data: t })
            .done(function (e) {
              (n = arguments),
                a.html(i ? X("<div>").append(X.parseHTML(e)).find(i) : e);
            })
            .complete(
              o &&
                function (e, t) {
                  a.each(o, n || [e.responseText, t, e]);
                }
            ),
        this
      );
    }),
      (X.expr.filters.animated = function (e) {
        return X.grep(X.timers, function (t) {
          return e === t.elem;
        }).length;
      });
    var Pt = e.document.documentElement;
    (X.offset = {
      setOffset: function (e, t, o) {
        var i,
          s,
          n,
          a,
          r,
          u,
          l,
          h = X.css(e, "position"),
          c = X(e),
          d = {};
        "static" === h && (e.style.position = "relative"),
          (r = c.offset()),
          (n = X.css(e, "top")),
          (u = X.css(e, "left")),
          (l =
            ("absolute" === h || "fixed" === h) &&
            (n + u).indexOf("auto") > -1),
          l
            ? ((i = c.position()), (a = i.top), (s = i.left))
            : ((a = parseFloat(n) || 0), (s = parseFloat(u) || 0)),
          X.isFunction(t) && (t = t.call(e, o, r)),
          null != t.top && (d.top = t.top - r.top + a),
          null != t.left && (d.left = t.left - r.left + s),
          "using" in t ? t.using.call(e, d) : c.css(d);
      },
    }),
      X.fn.extend({
        offset: function (e) {
          if (arguments.length)
            return void 0 === e
              ? this
              : this.each(function (t) {
                  X.offset.setOffset(this, e, t);
                });
          var t,
            o,
            i = this[0],
            s = { top: 0, left: 0 },
            n = i && i.ownerDocument;
          return n
            ? ((t = n.documentElement),
              X.contains(t, i)
                ? (typeof i.getBoundingClientRect !== xe &&
                    (s = i.getBoundingClientRect()),
                  (o = W(n)),
                  {
                    top: s.top + o.pageYOffset - t.clientTop,
                    left: s.left + o.pageXOffset - t.clientLeft,
                  })
                : s)
            : void 0;
        },
        position: function () {
          if (this[0]) {
            var e,
              t,
              o = this[0],
              i = { top: 0, left: 0 };
            return (
              "fixed" === X.css(o, "position")
                ? (t = o.getBoundingClientRect())
                : ((e = this.offsetParent()),
                  (t = this.offset()),
                  X.nodeName(e[0], "html") || (i = e.offset()),
                  (i.top += X.css(e[0], "borderTopWidth", !0)),
                  (i.left += X.css(e[0], "borderLeftWidth", !0))),
              {
                top: t.top - i.top - X.css(o, "marginTop", !0),
                left: t.left - i.left - X.css(o, "marginLeft", !0),
              }
            );
          }
        },
        offsetParent: function () {
          return this.map(function () {
            for (
              var e = this.offsetParent || Pt;
              e && !X.nodeName(e, "html") && "static" === X.css(e, "position");

            )
              e = e.offsetParent;
            return e || Pt;
          });
        },
      }),
      X.each(
        { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" },
        function (t, o) {
          var i = "pageYOffset" === o;
          X.fn[t] = function (s) {
            return me(
              this,
              function (t, s, n) {
                var a = W(t);
                return void 0 === n
                  ? a
                    ? a[o]
                    : t[s]
                  : void (a
                      ? a.scrollTo(i ? e.pageXOffset : n, i ? n : e.pageYOffset)
                      : (t[s] = n));
              },
              t,
              s,
              arguments.length,
              null
            );
          };
        }
      ),
      X.each(["top", "left"], function (e, t) {
        X.cssHooks[t] = w(G.pixelPosition, function (e, o) {
          return o
            ? ((o = b(e, t)), Me.test(o) ? X(e).position()[t] + "px" : o)
            : void 0;
        });
      }),
      X.each({ Height: "height", Width: "width" }, function (e, t) {
        X.each(
          { padding: "inner" + e, content: t, "": "outer" + e },
          function (o, i) {
            X.fn[i] = function (i, s) {
              var n = arguments.length && (o || "boolean" != typeof i),
                a = o || (i === !0 || s === !0 ? "margin" : "border");
              return me(
                this,
                function (t, o, i) {
                  var s;
                  return X.isWindow(t)
                    ? t.document.documentElement["client" + e]
                    : 9 === t.nodeType
                    ? ((s = t.documentElement),
                      Math.max(
                        t.body["scroll" + e],
                        s["scroll" + e],
                        t.body["offset" + e],
                        s["offset" + e],
                        s["client" + e]
                      ))
                    : void 0 === i
                    ? X.css(t, o, a)
                    : X.style(t, o, i, a);
                },
                t,
                n ? i : void 0,
                n,
                null
              );
            };
          }
        );
      }),
      (X.fn.size = function () {
        return this.length;
      }),
      (X.fn.andSelf = X.fn.addBack),
      "function" == typeof define &&
        define.amd &&
        define("jquery", [], function () {
          return X;
        });
    var Ft = e.jQuery,
      It = e.$;
    return (
      (X.noConflict = function (t) {
        return (
          e.$ === X && (e.$ = It), t && e.jQuery === X && (e.jQuery = Ft), X
        );
      }),
      typeof t === xe && (e.jQuery = e.$ = X),
      X
    );
  }),
  (function (e) {
    function t() {
      var e = document.createElement("input"),
        t = "onpaste";
      return (
        e.setAttribute(t, ""), "function" == typeof e[t] ? "paste" : "input"
      );
    }
    var o,
      i = t() + ".mask",
      s = navigator.userAgent,
      n = /iphone/i.test(s),
      a = /chrome/i.test(s),
      r = /android/i.test(s);
    (e.mask = {
      definitions: { 9: "[0-9]", a: "[A-Za-z]", "*": "[A-Za-z0-9]" },
      autoclear: !0,
      dataName: "rawMaskFn",
      placeholder: "_",
    }),
      e.fn.extend({
        caret: function (e, t) {
          var o;
          if (0 !== this.length && !this.is(":hidden"))
            return "number" == typeof e
              ? ((t = "number" == typeof t ? t : e),
                this.each(function () {
                  this.setSelectionRange
                    ? this.setSelectionRange(e, t)
                    : this.createTextRange &&
                      ((o = this.createTextRange()),
                      o.collapse(!0),
                      o.moveEnd("character", t),
                      o.moveStart("character", e),
                      o.select());
                }))
              : (this[0].setSelectionRange
                  ? ((e = this[0].selectionStart), (t = this[0].selectionEnd))
                  : document.selection &&
                    document.selection.createRange &&
                    ((o = document.selection.createRange()),
                    (e = 0 - o.duplicate().moveStart("character", -1e5)),
                    (t = e + o.text.length)),
                { begin: e, end: t });
        },
        unmask: function () {
          return this.trigger("unmask");
        },
        mask: function (t, s) {
          var u, l, h, c, d, f;
          return !t && this.length > 0
            ? ((u = e(this[0])), u.data(e.mask.dataName)())
            : ((s = e.extend(
                {
                  autoclear: e.mask.autoclear,
                  placeholder: e.mask.placeholder,
                  completed: null,
                },
                s
              )),
              (l = e.mask.definitions),
              (h = []),
              (c = f = t.length),
              (d = null),
              e.each(t.split(""), function (e, t) {
                "?" == t
                  ? (f--, (c = e))
                  : l[t]
                  ? (h.push(new RegExp(l[t])), null === d && (d = h.length - 1))
                  : h.push(null);
              }),
              this.trigger("unmask").each(function () {
                function u(e) {
                  for (; ++e < f && !h[e]; );
                  return e;
                }
                function p(e) {
                  for (; --e >= 0 && !h[e]; );
                  return e;
                }
                function y(e, t) {
                  var o, i;
                  if (!(0 > e)) {
                    for (o = e, i = u(t); f > o; o++)
                      if (h[o]) {
                        if (!(f > i && h[o].test(C[i]))) break;
                        (C[o] = C[i]), (C[i] = s.placeholder), (i = u(i));
                      }
                    b(), T.caret(Math.max(d, e));
                  }
                }
                function m(e) {
                  var t, o, i, n;
                  for (t = e, o = s.placeholder; f > t; t++)
                    if (h[t]) {
                      if (
                        ((i = u(t)),
                        (n = C[t]),
                        (C[t] = o),
                        !(f > i && h[i].test(n)))
                      )
                        break;
                      o = n;
                    }
                }
                function g() {
                  w(), T.val() != E && T.change();
                }
                function v(e) {
                  var t,
                    o,
                    i,
                    s = e.which;
                  8 === s || 46 === s || (n && 127 === s)
                    ? ((t = T.caret()),
                      (o = t.begin),
                      (i = t.end),
                      i - o === 0 &&
                        ((o = 46 !== s ? p(o) : (i = u(o - 1))),
                        (i = 46 === s ? u(i) : i)),
                      S(o, i),
                      y(o, i - 1),
                      e.preventDefault())
                    : 13 === s
                    ? g.call(this, e)
                    : 27 === s &&
                      (T.val(E), T.caret(0, w()), e.preventDefault());
                }
                function _(t) {
                  var o,
                    i,
                    n,
                    a = t.which,
                    l = T.caret();
                  if (0 == a) {
                    if (l.begin >= f)
                      return (
                        T.val(T.val().substr(0, f)), t.preventDefault(), !1
                      );
                    l.begin == l.end &&
                      ((a = T.val().charCodeAt(l.begin - 1)),
                      l.begin--,
                      l.end--);
                  }
                  if (
                    !(t.ctrlKey || t.altKey || t.metaKey || 32 > a) &&
                    a &&
                    13 !== a
                  ) {
                    if (
                      (l.end - l.begin !== 0 &&
                        (S(l.begin, l.end), y(l.begin, l.end - 1)),
                      (o = u(l.begin - 1)),
                      f > o && ((i = String.fromCharCode(a)), h[o].test(i)))
                    ) {
                      if ((m(o), (C[o] = i), b(), (n = u(o)), r)) {
                        var c = function () {
                          e.proxy(e.fn.caret, T, n)();
                        };
                        setTimeout(c, 0);
                      } else T.caret(n);
                      s.completed && n >= f && s.completed.call(T);
                    }
                    t.preventDefault();
                  }
                }
                function S(e, t) {
                  var o;
                  for (o = e; t > o && f > o; o++)
                    h[o] && (C[o] = s.placeholder);
                }
                function b() {
                  T.val(C.join(""));
                }
                function w(e) {
                  var t,
                    o,
                    i,
                    n = T.val(),
                    a = -1;
                  for (t = 0, i = 0; f > t; t++)
                    if (h[t]) {
                      for (C[t] = s.placeholder; i++ < n.length; )
                        if (((o = n.charAt(i - 1)), h[t].test(o))) {
                          (C[t] = o), (a = t);
                          break;
                        }
                      if (i > n.length) break;
                    } else C[t] === n.charAt(i) && t !== c && (i++, (a = t));
                  return (
                    e
                      ? b()
                      : c > a + 1
                      ? s.autoclear || C.join("") === x
                        ? (T.val() && T.val(""), S(0, f))
                        : b()
                      : (b(), T.val(T.val().substring(0, a + 1))),
                    c ? t : d
                  );
                }
                var T = e(this),
                  C = e.map(t.split(""), function (e) {
                    return "?" != e ? (l[e] ? s.placeholder : e) : void 0;
                  }),
                  x = C.join(""),
                  E = T.val();
                T.data(e.mask.dataName, function () {
                  return e
                    .map(C, function (e, t) {
                      return h[t] && e != s.placeholder ? e : null;
                    })
                    .join("");
                }),
                  T.attr("readonly") ||
                    T.one("unmask", function () {
                      T.off(".mask").removeData(e.mask.dataName);
                    })
                      .on("focus.mask", function () {
                        clearTimeout(o);
                        var e;
                        (E = T.val()),
                          (e = w()),
                          (o = setTimeout(function () {
                            b(),
                              e == t.replace("?", "").length
                                ? T.caret(0, e)
                                : T.caret(e);
                          }, 10));
                      })
                      .on("blur.mask", g)
                      .on("keydown.mask", v)
                      .on("keypress.mask", _)
                      .on(i, function () {
                        setTimeout(function () {
                          var e = w(!0);
                          T.caret(e),
                            s.completed &&
                              e == T.val().length &&
                              s.completed.call(T);
                        }, 0);
                      }),
                  a && r && T.on("keyup.mask", _),
                  w();
              }));
        },
      });
  })(jQuery),
  function () {
    function e(e) {
      function t(t, o, i, s, n, a) {
        for (; n >= 0 && a > n; n += e) {
          var r = s ? s[n] : n;
          i = o(i, t[r], r, t);
        }
        return i;
      }
      return function (o, i, s, n) {
        i = _(i, n, 4);
        var a = !E(o) && v.keys(o),
          r = (a || o).length,
          u = e > 0 ? 0 : r - 1;
        return (
          arguments.length < 3 && ((s = o[a ? a[u] : u]), (u += e)),
          t(o, i, s, a, u, r)
        );
      };
    }
    function t(e) {
      return function (t, o, i) {
        o = S(o, i);
        for (var s = x(t), n = e > 0 ? 0 : s - 1; n >= 0 && s > n; n += e)
          if (o(t[n], n, t)) return n;
        return -1;
      };
    }
    function o(e, t, o) {
      return function (i, s, n) {
        var a = 0,
          r = x(i);
        if ("number" == typeof n)
          e > 0
            ? (a = n >= 0 ? n : Math.max(n + r, a))
            : (r = n >= 0 ? Math.min(n + 1, r) : n + r + 1);
        else if (o && n && r) return (n = o(i, s)), i[n] === s ? n : -1;
        if (s !== s)
          return (n = t(h.call(i, a, r), v.isNaN)), n >= 0 ? n + a : -1;
        for (n = e > 0 ? a : r - 1; n >= 0 && r > n; n += e)
          if (i[n] === s) return n;
        return -1;
      };
    }
    function i(e, t) {
      var o = A.length,
        i = e.constructor,
        s = (v.isFunction(i) && i.prototype) || r,
        n = "constructor";
      for (v.has(e, n) && !v.contains(t, n) && t.push(n); o--; )
        (n = A[o]), n in e && e[n] !== s[n] && !v.contains(t, n) && t.push(n);
    }
    var s = this,
      n = s._,
      a = Array.prototype,
      r = Object.prototype,
      u = Function.prototype,
      l = a.push,
      h = a.slice,
      c = r.toString,
      d = r.hasOwnProperty,
      f = Array.isArray,
      p = Object.keys,
      y = u.bind,
      m = Object.create,
      g = function () {},
      v = function (e) {
        return e instanceof v
          ? e
          : this instanceof v
          ? void (this._wrapped = e)
          : new v(e);
      };
    "undefined" != typeof exports
      ? ("undefined" != typeof module &&
          module.exports &&
          (exports = module.exports = v),
        (exports._ = v))
      : (s._ = v),
      (v.VERSION = "1.8.3");
    var _ = function (e, t, o) {
        if (void 0 === t) return e;
        switch (null == o ? 3 : o) {
          case 1:
            return function (o) {
              return e.call(t, o);
            };
          case 2:
            return function (o, i) {
              return e.call(t, o, i);
            };
          case 3:
            return function (o, i, s) {
              return e.call(t, o, i, s);
            };
          case 4:
            return function (o, i, s, n) {
              return e.call(t, o, i, s, n);
            };
        }
        return function () {
          return e.apply(t, arguments);
        };
      },
      S = function (e, t, o) {
        return null == e
          ? v.identity
          : v.isFunction(e)
          ? _(e, t, o)
          : v.isObject(e)
          ? v.matcher(e)
          : v.property(e);
      };
    v.iteratee = function (e, t) {
      return S(e, t, 1 / 0);
    };
    var b = function (e, t) {
        return function (o) {
          var i = arguments.length;
          if (2 > i || null == o) return o;
          for (var s = 1; i > s; s++)
            for (
              var n = arguments[s], a = e(n), r = a.length, u = 0;
              r > u;
              u++
            ) {
              var l = a[u];
              (t && void 0 !== o[l]) || (o[l] = n[l]);
            }
          return o;
        };
      },
      w = function (e) {
        if (!v.isObject(e)) return {};
        if (m) return m(e);
        g.prototype = e;
        var t = new g();
        return (g.prototype = null), t;
      },
      T = function (e) {
        return function (t) {
          return null == t ? void 0 : t[e];
        };
      },
      C = Math.pow(2, 53) - 1,
      x = T("length"),
      E = function (e) {
        var t = x(e);
        return "number" == typeof t && t >= 0 && C >= t;
      };
    (v.each = v.forEach =
      function (e, t, o) {
        t = _(t, o);
        var i, s;
        if (E(e)) for (i = 0, s = e.length; s > i; i++) t(e[i], i, e);
        else {
          var n = v.keys(e);
          for (i = 0, s = n.length; s > i; i++) t(e[n[i]], n[i], e);
        }
        return e;
      }),
      (v.map = v.collect =
        function (e, t, o) {
          t = S(t, o);
          for (
            var i = !E(e) && v.keys(e),
              s = (i || e).length,
              n = Array(s),
              a = 0;
            s > a;
            a++
          ) {
            var r = i ? i[a] : a;
            n[a] = t(e[r], r, e);
          }
          return n;
        }),
      (v.reduce = v.foldl = v.inject = e(1)),
      (v.reduceRight = v.foldr = e(-1)),
      (v.find = v.detect =
        function (e, t, o) {
          var i;
          return (
            (i = E(e) ? v.findIndex(e, t, o) : v.findKey(e, t, o)),
            void 0 !== i && -1 !== i ? e[i] : void 0
          );
        }),
      (v.filter = v.select =
        function (e, t, o) {
          var i = [];
          return (
            (t = S(t, o)),
            v.each(e, function (e, o, s) {
              t(e, o, s) && i.push(e);
            }),
            i
          );
        }),
      (v.reject = function (e, t, o) {
        return v.filter(e, v.negate(S(t)), o);
      }),
      (v.every = v.all =
        function (e, t, o) {
          t = S(t, o);
          for (
            var i = !E(e) && v.keys(e), s = (i || e).length, n = 0;
            s > n;
            n++
          ) {
            var a = i ? i[n] : n;
            if (!t(e[a], a, e)) return !1;
          }
          return !0;
        }),
      (v.some = v.any =
        function (e, t, o) {
          t = S(t, o);
          for (
            var i = !E(e) && v.keys(e), s = (i || e).length, n = 0;
            s > n;
            n++
          ) {
            var a = i ? i[n] : n;
            if (t(e[a], a, e)) return !0;
          }
          return !1;
        }),
      (v.contains =
        v.includes =
        v.include =
          function (e, t, o, i) {
            return (
              E(e) || (e = v.values(e)),
              ("number" != typeof o || i) && (o = 0),
              v.indexOf(e, t, o) >= 0
            );
          }),
      (v.invoke = function (e, t) {
        var o = h.call(arguments, 2),
          i = v.isFunction(t);
        return v.map(e, function (e) {
          var s = i ? t : e[t];
          return null == s ? s : s.apply(e, o);
        });
      }),
      (v.pluck = function (e, t) {
        return v.map(e, v.property(t));
      }),
      (v.where = function (e, t) {
        return v.filter(e, v.matcher(t));
      }),
      (v.findWhere = function (e, t) {
        return v.find(e, v.matcher(t));
      }),
      (v.max = function (e, t, o) {
        var i,
          s,
          n = -(1 / 0),
          a = -(1 / 0);
        if (null == t && null != e) {
          e = E(e) ? e : v.values(e);
          for (var r = 0, u = e.length; u > r; r++)
            (i = e[r]), i > n && (n = i);
        } else
          (t = S(t, o)),
            v.each(e, function (e, o, i) {
              (s = t(e, o, i)),
                (s > a || (s === -(1 / 0) && n === -(1 / 0))) &&
                  ((n = e), (a = s));
            });
        return n;
      }),
      (v.min = function (e, t, o) {
        var i,
          s,
          n = 1 / 0,
          a = 1 / 0;
        if (null == t && null != e) {
          e = E(e) ? e : v.values(e);
          for (var r = 0, u = e.length; u > r; r++)
            (i = e[r]), n > i && (n = i);
        } else
          (t = S(t, o)),
            v.each(e, function (e, o, i) {
              (s = t(e, o, i)),
                (a > s || (s === 1 / 0 && n === 1 / 0)) && ((n = e), (a = s));
            });
        return n;
      }),
      (v.shuffle = function (e) {
        for (
          var t, o = E(e) ? e : v.values(e), i = o.length, s = Array(i), n = 0;
          i > n;
          n++
        )
          (t = v.random(0, n)), t !== n && (s[n] = s[t]), (s[t] = o[n]);
        return s;
      }),
      (v.sample = function (e, t, o) {
        return null == t || o
          ? (E(e) || (e = v.values(e)), e[v.random(e.length - 1)])
          : v.shuffle(e).slice(0, Math.max(0, t));
      }),
      (v.sortBy = function (e, t, o) {
        return (
          (t = S(t, o)),
          v.pluck(
            v
              .map(e, function (e, o, i) {
                return { value: e, index: o, criteria: t(e, o, i) };
              })
              .sort(function (e, t) {
                var o = e.criteria,
                  i = t.criteria;
                if (o !== i) {
                  if (o > i || void 0 === o) return 1;
                  if (i > o || void 0 === i) return -1;
                }
                return e.index - t.index;
              }),
            "value"
          )
        );
      });
    var L = function (e) {
      return function (t, o, i) {
        var s = {};
        return (
          (o = S(o, i)),
          v.each(t, function (i, n) {
            var a = o(i, n, t);
            e(s, i, a);
          }),
          s
        );
      };
    };
    (v.groupBy = L(function (e, t, o) {
      v.has(e, o) ? e[o].push(t) : (e[o] = [t]);
    })),
      (v.indexBy = L(function (e, t, o) {
        e[o] = t;
      })),
      (v.countBy = L(function (e, t, o) {
        v.has(e, o) ? e[o]++ : (e[o] = 1);
      })),
      (v.toArray = function (e) {
        return e
          ? v.isArray(e)
            ? h.call(e)
            : E(e)
            ? v.map(e, v.identity)
            : v.values(e)
          : [];
      }),
      (v.size = function (e) {
        return null == e ? 0 : E(e) ? e.length : v.keys(e).length;
      }),
      (v.partition = function (e, t, o) {
        t = S(t, o);
        var i = [],
          s = [];
        return (
          v.each(e, function (e, o, n) {
            (t(e, o, n) ? i : s).push(e);
          }),
          [i, s]
        );
      }),
      (v.first =
        v.head =
        v.take =
          function (e, t, o) {
            return null == e
              ? void 0
              : null == t || o
              ? e[0]
              : v.initial(e, e.length - t);
          }),
      (v.initial = function (e, t, o) {
        return h.call(e, 0, Math.max(0, e.length - (null == t || o ? 1 : t)));
      }),
      (v.last = function (e, t, o) {
        return null == e
          ? void 0
          : null == t || o
          ? e[e.length - 1]
          : v.rest(e, Math.max(0, e.length - t));
      }),
      (v.rest =
        v.tail =
        v.drop =
          function (e, t, o) {
            return h.call(e, null == t || o ? 1 : t);
          }),
      (v.compact = function (e) {
        return v.filter(e, v.identity);
      });
    var k = function (e, t, o, i) {
      for (var s = [], n = 0, a = i || 0, r = x(e); r > a; a++) {
        var u = e[a];
        if (E(u) && (v.isArray(u) || v.isArguments(u))) {
          t || (u = k(u, t, o));
          var l = 0,
            h = u.length;
          for (s.length += h; h > l; ) s[n++] = u[l++];
        } else o || (s[n++] = u);
      }
      return s;
    };
    (v.flatten = function (e, t) {
      return k(e, t, !1);
    }),
      (v.without = function (e) {
        return v.difference(e, h.call(arguments, 1));
      }),
      (v.uniq = v.unique =
        function (e, t, o, i) {
          v.isBoolean(t) || ((i = o), (o = t), (t = !1)),
            null != o && (o = S(o, i));
          for (var s = [], n = [], a = 0, r = x(e); r > a; a++) {
            var u = e[a],
              l = o ? o(u, a, e) : u;
            t
              ? ((a && n === l) || s.push(u), (n = l))
              : o
              ? v.contains(n, l) || (n.push(l), s.push(u))
              : v.contains(s, u) || s.push(u);
          }
          return s;
        }),
      (v.union = function () {
        return v.uniq(k(arguments, !0, !0));
      }),
      (v.intersection = function (e) {
        for (var t = [], o = arguments.length, i = 0, s = x(e); s > i; i++) {
          var n = e[i];
          if (!v.contains(t, n)) {
            for (var a = 1; o > a && v.contains(arguments[a], n); a++);
            a === o && t.push(n);
          }
        }
        return t;
      }),
      (v.difference = function (e) {
        var t = k(arguments, !0, !0, 1);
        return v.filter(e, function (e) {
          return !v.contains(t, e);
        });
      }),
      (v.zip = function () {
        return v.unzip(arguments);
      }),
      (v.unzip = function (e) {
        for (
          var t = (e && v.max(e, x).length) || 0, o = Array(t), i = 0;
          t > i;
          i++
        )
          o[i] = v.pluck(e, i);
        return o;
      }),
      (v.object = function (e, t) {
        for (var o = {}, i = 0, s = x(e); s > i; i++)
          t ? (o[e[i]] = t[i]) : (o[e[i][0]] = e[i][1]);
        return o;
      }),
      (v.findIndex = t(1)),
      (v.findLastIndex = t(-1)),
      (v.sortedIndex = function (e, t, o, i) {
        o = S(o, i, 1);
        for (var s = o(t), n = 0, a = x(e); a > n; ) {
          var r = Math.floor((n + a) / 2);
          o(e[r]) < s ? (n = r + 1) : (a = r);
        }
        return n;
      }),
      (v.indexOf = o(1, v.findIndex, v.sortedIndex)),
      (v.lastIndexOf = o(-1, v.findLastIndex)),
      (v.range = function (e, t, o) {
        null == t && ((t = e || 0), (e = 0)), (o = o || 1);
        for (
          var i = Math.max(Math.ceil((t - e) / o), 0), s = Array(i), n = 0;
          i > n;
          n++, e += o
        )
          s[n] = e;
        return s;
      });
    var R = function (e, t, o, i, s) {
      if (!(i instanceof t)) return e.apply(o, s);
      var n = w(e.prototype),
        a = e.apply(n, s);
      return v.isObject(a) ? a : n;
    };
    (v.bind = function (e, t) {
      if (y && e.bind === y) return y.apply(e, h.call(arguments, 1));
      if (!v.isFunction(e))
        throw new TypeError("Bind must be called on a function");
      var o = h.call(arguments, 2),
        i = function () {
          return R(e, i, t, this, o.concat(h.call(arguments)));
        };
      return i;
    }),
      (v.partial = function (e) {
        var t = h.call(arguments, 1),
          o = function () {
            for (var i = 0, s = t.length, n = Array(s), a = 0; s > a; a++)
              n[a] = t[a] === v ? arguments[i++] : t[a];
            for (; i < arguments.length; ) n.push(arguments[i++]);
            return R(e, o, this, this, n);
          };
        return o;
      }),
      (v.bindAll = function (e) {
        var t,
          o,
          i = arguments.length;
        if (1 >= i) throw new Error("bindAll must be passed function names");
        for (t = 1; i > t; t++) (o = arguments[t]), (e[o] = v.bind(e[o], e));
        return e;
      }),
      (v.memoize = function (e, t) {
        var o = function (i) {
          var s = o.cache,
            n = "" + (t ? t.apply(this, arguments) : i);
          return v.has(s, n) || (s[n] = e.apply(this, arguments)), s[n];
        };
        return (o.cache = {}), o;
      }),
      (v.delay = function (e, t) {
        var o = h.call(arguments, 2);
        return setTimeout(function () {
          return e.apply(null, o);
        }, t);
      }),
      (v.defer = v.partial(v.delay, v, 1)),
      (v.throttle = function (e, t, o) {
        var i,
          s,
          n,
          a = null,
          r = 0;
        o || (o = {});
        var u = function () {
          (r = o.leading === !1 ? 0 : v.now()),
            (a = null),
            (n = e.apply(i, s)),
            a || (i = s = null);
        };
        return function () {
          var l = v.now();
          r || o.leading !== !1 || (r = l);
          var h = t - (l - r);
          return (
            (i = this),
            (s = arguments),
            0 >= h || h > t
              ? (a && (clearTimeout(a), (a = null)),
                (r = l),
                (n = e.apply(i, s)),
                a || (i = s = null))
              : a || o.trailing === !1 || (a = setTimeout(u, h)),
            n
          );
        };
      }),
      (v.debounce = function (e, t, o) {
        var i,
          s,
          n,
          a,
          r,
          u = function () {
            var l = v.now() - a;
            t > l && l >= 0
              ? (i = setTimeout(u, t - l))
              : ((i = null), o || ((r = e.apply(n, s)), i || (n = s = null)));
          };
        return function () {
          (n = this), (s = arguments), (a = v.now());
          var l = o && !i;
          return (
            i || (i = setTimeout(u, t)),
            l && ((r = e.apply(n, s)), (n = s = null)),
            r
          );
        };
      }),
      (v.wrap = function (e, t) {
        return v.partial(t, e);
      }),
      (v.negate = function (e) {
        return function () {
          return !e.apply(this, arguments);
        };
      }),
      (v.compose = function () {
        var e = arguments,
          t = e.length - 1;
        return function () {
          for (var o = t, i = e[t].apply(this, arguments); o--; )
            i = e[o].call(this, i);
          return i;
        };
      }),
      (v.after = function (e, t) {
        return function () {
          return --e < 1 ? t.apply(this, arguments) : void 0;
        };
      }),
      (v.before = function (e, t) {
        var o;
        return function () {
          return (
            --e > 0 && (o = t.apply(this, arguments)), 1 >= e && (t = null), o
          );
        };
      }),
      (v.once = v.partial(v.before, 2));
    var N = !{ toString: null }.propertyIsEnumerable("toString"),
      A = [
        "valueOf",
        "isPrototypeOf",
        "toString",
        "propertyIsEnumerable",
        "hasOwnProperty",
        "toLocaleString",
      ];
    (v.keys = function (e) {
      if (!v.isObject(e)) return [];
      if (p) return p(e);
      var t = [];
      for (var o in e) v.has(e, o) && t.push(o);
      return N && i(e, t), t;
    }),
      (v.allKeys = function (e) {
        if (!v.isObject(e)) return [];
        var t = [];
        for (var o in e) t.push(o);
        return N && i(e, t), t;
      }),
      (v.values = function (e) {
        for (var t = v.keys(e), o = t.length, i = Array(o), s = 0; o > s; s++)
          i[s] = e[t[s]];
        return i;
      }),
      (v.mapObject = function (e, t, o) {
        t = S(t, o);
        for (var i, s = v.keys(e), n = s.length, a = {}, r = 0; n > r; r++)
          (i = s[r]), (a[i] = t(e[i], i, e));
        return a;
      }),
      (v.pairs = function (e) {
        for (var t = v.keys(e), o = t.length, i = Array(o), s = 0; o > s; s++)
          i[s] = [t[s], e[t[s]]];
        return i;
      }),
      (v.invert = function (e) {
        for (var t = {}, o = v.keys(e), i = 0, s = o.length; s > i; i++)
          t[e[o[i]]] = o[i];
        return t;
      }),
      (v.functions = v.methods =
        function (e) {
          var t = [];
          for (var o in e) v.isFunction(e[o]) && t.push(o);
          return t.sort();
        }),
      (v.extend = b(v.allKeys)),
      (v.extendOwn = v.assign = b(v.keys)),
      (v.findKey = function (e, t, o) {
        t = S(t, o);
        for (var i, s = v.keys(e), n = 0, a = s.length; a > n; n++)
          if (((i = s[n]), t(e[i], i, e))) return i;
      }),
      (v.pick = function (e, t, o) {
        var i,
          s,
          n = {},
          a = e;
        if (null == a) return n;
        v.isFunction(t)
          ? ((s = v.allKeys(a)), (i = _(t, o)))
          : ((s = k(arguments, !1, !1, 1)),
            (i = function (e, t, o) {
              return t in o;
            }),
            (a = Object(a)));
        for (var r = 0, u = s.length; u > r; r++) {
          var l = s[r],
            h = a[l];
          i(h, l, a) && (n[l] = h);
        }
        return n;
      }),
      (v.omit = function (e, t, o) {
        if (v.isFunction(t)) t = v.negate(t);
        else {
          var i = v.map(k(arguments, !1, !1, 1), String);
          t = function (e, t) {
            return !v.contains(i, t);
          };
        }
        return v.pick(e, t, o);
      }),
      (v.defaults = b(v.allKeys, !0)),
      (v.create = function (e, t) {
        var o = w(e);
        return t && v.extendOwn(o, t), o;
      }),
      (v.clone = function (e) {
        return v.isObject(e) ? (v.isArray(e) ? e.slice() : v.extend({}, e)) : e;
      }),
      (v.tap = function (e, t) {
        return t(e), e;
      }),
      (v.isMatch = function (e, t) {
        var o = v.keys(t),
          i = o.length;
        if (null == e) return !i;
        for (var s = Object(e), n = 0; i > n; n++) {
          var a = o[n];
          if (t[a] !== s[a] || !(a in s)) return !1;
        }
        return !0;
      });
    var D = function (e, t, o, i) {
      if (e === t) return 0 !== e || 1 / e === 1 / t;
      if (null == e || null == t) return e === t;
      e instanceof v && (e = e._wrapped), t instanceof v && (t = t._wrapped);
      var s = c.call(e);
      if (s !== c.call(t)) return !1;
      switch (s) {
        case "[object RegExp]":
        case "[object String]":
          return "" + e == "" + t;
        case "[object Number]":
          return +e !== +e
            ? +t !== +t
            : 0 === +e
            ? 1 / +e === 1 / t
            : +e === +t;
        case "[object Date]":
        case "[object Boolean]":
          return +e === +t;
      }
      var n = "[object Array]" === s;
      if (!n) {
        if ("object" != typeof e || "object" != typeof t) return !1;
        var a = e.constructor,
          r = t.constructor;
        if (
          a !== r &&
          !(
            v.isFunction(a) &&
            a instanceof a &&
            v.isFunction(r) &&
            r instanceof r
          ) &&
          "constructor" in e &&
          "constructor" in t
        )
          return !1;
      }
      (o = o || []), (i = i || []);
      for (var u = o.length; u--; ) if (o[u] === e) return i[u] === t;
      if ((o.push(e), i.push(t), n)) {
        if (((u = e.length), u !== t.length)) return !1;
        for (; u--; ) if (!D(e[u], t[u], o, i)) return !1;
      } else {
        var l,
          h = v.keys(e);
        if (((u = h.length), v.keys(t).length !== u)) return !1;
        for (; u--; )
          if (((l = h[u]), !v.has(t, l) || !D(e[l], t[l], o, i))) return !1;
      }
      return o.pop(), i.pop(), !0;
    };
    (v.isEqual = function (e, t) {
      return D(e, t);
    }),
      (v.isEmpty = function (e) {
        return null == e
          ? !0
          : E(e) && (v.isArray(e) || v.isString(e) || v.isArguments(e))
          ? 0 === e.length
          : 0 === v.keys(e).length;
      }),
      (v.isElement = function (e) {
        return !(!e || 1 !== e.nodeType);
      }),
      (v.isArray =
        f ||
        function (e) {
          return "[object Array]" === c.call(e);
        }),
      (v.isObject = function (e) {
        var t = typeof e;
        return "function" === t || ("object" === t && !!e);
      }),
      v.each(
        [
          "Arguments",
          "Function",
          "String",
          "Number",
          "Date",
          "RegExp",
          "Error",
        ],
        function (e) {
          v["is" + e] = function (t) {
            return c.call(t) === "[object " + e + "]";
          };
        }
      ),
      v.isArguments(arguments) ||
        (v.isArguments = function (e) {
          return v.has(e, "callee");
        }),
      "function" != typeof /./ &&
        "object" != typeof Int8Array &&
        (v.isFunction = function (e) {
          return "function" == typeof e || !1;
        }),
      (v.isFinite = function (e) {
        return isFinite(e) && !isNaN(parseFloat(e));
      }),
      (v.isNaN = function (e) {
        return v.isNumber(e) && e !== +e;
      }),
      (v.isBoolean = function (e) {
        return e === !0 || e === !1 || "[object Boolean]" === c.call(e);
      }),
      (v.isNull = function (e) {
        return null === e;
      }),
      (v.isUndefined = function (e) {
        return void 0 === e;
      }),
      (v.has = function (e, t) {
        return null != e && d.call(e, t);
      }),
      (v.noConflict = function () {
        return (s._ = n), this;
      }),
      (v.identity = function (e) {
        return e;
      }),
      (v.constant = function (e) {
        return function () {
          return e;
        };
      }),
      (v.noop = function () {}),
      (v.property = T),
      (v.propertyOf = function (e) {
        return null == e
          ? function () {}
          : function (t) {
              return e[t];
            };
      }),
      (v.matcher = v.matches =
        function (e) {
          return (
            (e = v.extendOwn({}, e)),
            function (t) {
              return v.isMatch(t, e);
            }
          );
        }),
      (v.times = function (e, t, o) {
        var i = Array(Math.max(0, e));
        t = _(t, o, 1);
        for (var s = 0; e > s; s++) i[s] = t(s);
        return i;
      }),
      (v.random = function (e, t) {
        return (
          null == t && ((t = e), (e = 0)),
          e + Math.floor(Math.random() * (t - e + 1))
        );
      }),
      (v.now =
        Date.now ||
        function () {
          return new Date().getTime();
        });
    var J = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#x27;",
        "`": "&#x60;",
      },
      Z = v.invert(J),
      B = function (e) {
        var t = function (t) {
            return e[t];
          },
          o = "(?:" + v.keys(e).join("|") + ")",
          i = RegExp(o),
          s = RegExp(o, "g");
        return function (e) {
          return (e = null == e ? "" : "" + e), i.test(e) ? e.replace(s, t) : e;
        };
      };
    (v.escape = B(J)),
      (v.unescape = B(Z)),
      (v.result = function (e, t, o) {
        var i = null == e ? void 0 : e[t];
        return void 0 === i && (i = o), v.isFunction(i) ? i.call(e) : i;
      });
    var P = 0;
    (v.uniqueId = function (e) {
      var t = ++P + "";
      return e ? e + t : t;
    }),
      (v.templateSettings = {
        evaluate: /<%([\s\S]+?)%>/g,
        interpolate: /<%=([\s\S]+?)%>/g,
        escape: /<%-([\s\S]+?)%>/g,
      });
    var F = /(.)^/,
      I = {
        "'": "'",
        "\\": "\\",
        "\r": "r",
        "\n": "n",
        "\u2028": "u2028",
        "\u2029": "u2029",
      },
      j = /\\|'|\r|\n|\u2028|\u2029/g,
      O = function (e) {
        return "\\" + I[e];
      };
    (v.template = function (e, t, o) {
      !t && o && (t = o), (t = v.defaults({}, t, v.templateSettings));
      var i = RegExp(
          [
            (t.escape || F).source,
            (t.interpolate || F).source,
            (t.evaluate || F).source,
          ].join("|") + "|$",
          "g"
        ),
        s = 0,
        n = "__p+='";
      e.replace(i, function (t, o, i, a, r) {
        return (
          (n += e.slice(s, r).replace(j, O)),
          (s = r + t.length),
          o
            ? (n += "'+\n((__t=(" + o + "))==null?'':_.escape(__t))+\n'")
            : i
            ? (n += "'+\n((__t=(" + i + "))==null?'':__t)+\n'")
            : a && (n += "';\n" + a + "\n__p+='"),
          t
        );
      }),
        (n += "';\n"),
        t.variable || (n = "with(obj||{}){\n" + n + "}\n"),
        (n =
          "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" +
          n +
          "return __p;\n");
      try {
        var a = new Function(t.variable || "obj", "_", n);
      } catch (r) {
        throw ((r.source = n), r);
      }
      var u = function (e) {
          return a.call(this, e, v);
        },
        l = t.variable || "obj";
      return (u.source = "function(" + l + "){\n" + n + "}"), u;
    }),
      (v.chain = function (e) {
        var t = v(e);
        return (t._chain = !0), t;
      });
    var W = function (e, t) {
      return e._chain ? v(t).chain() : t;
    };
    (v.mixin = function (e) {
      v.each(v.functions(e), function (t) {
        var o = (v[t] = e[t]);
        v.prototype[t] = function () {
          var e = [this._wrapped];
          return l.apply(e, arguments), W(this, o.apply(v, e));
        };
      });
    }),
      v.mixin(v),
      v.each(
        ["pop", "push", "reverse", "shift", "sort", "splice", "unshift"],
        function (e) {
          var t = a[e];
          v.prototype[e] = function () {
            var o = this._wrapped;
            return (
              t.apply(o, arguments),
              ("shift" !== e && "splice" !== e) ||
                0 !== o.length ||
                delete o[0],
              W(this, o)
            );
          };
        }
      ),
      v.each(["concat", "join", "slice"], function (e) {
        var t = a[e];
        v.prototype[e] = function () {
          return W(this, t.apply(this._wrapped, arguments));
        };
      }),
      (v.prototype.value = function () {
        return this._wrapped;
      }),
      (v.prototype.valueOf = v.prototype.toJSON = v.prototype.value),
      (v.prototype.toString = function () {
        return "" + this._wrapped;
      }),
      "function" == typeof define &&
        define.amd &&
        define("underscore", [], function () {
          return v;
        });
  }.call(this),
  "undefined" == typeof ZJS && (ZJS = {}),
  Function.prototype.bind ||
    (Function.prototype.bind = function (e) {
      var t = this;
      return function () {
        return 0 !== arguments.length ? t.apply(e, arguments) : t.call(e);
      };
    }),
  (ZJS.Utils = {
    trim: function (e, t) {
      return 0 == e.length
        ? e
        : ((e = this.rtrim(e, t)), (e = this.ltrim(e, t)));
    },
    rtrim: function (e, t) {
      t = t || " \n	";
      for (var o = !0; o && e.length > 0; )
        (o = -1 != t.indexOf(e.charAt(e.length - 1))),
          o && (e = e.substr(0, e.length - 1));
      return e;
    },
    ltrim: function (e, t) {
      t = t || " \n	";
      for (var o = !0; o && e.length > 0; )
        (o = -1 != t.indexOf(e.charAt(0))), o && (e = e.substr(1));
      return e;
    },
    ucfirst: function (e) {
      return e.charAt(0).toUpperCase() + e.substr(1);
    },
    camelCase: function (e) {
      var t = e.toLowerCase().split(/[-_]+/);
      return t.shift() + t.map(this.ucfirst).join("");
    },
    merge: function () {
      if (1 == arguments.length) return arguments[0];
      var e = Array.prototype.slice.call(arguments),
        t = e.pop(),
        o = e[e.length - 1];
      for (var i in t) o.hasOwnProperty(i) || (o[i] = t[i]);
      return this.merge.apply(this, e);
    },
    expand: function (e, t) {
      for (var o in t) e.hasOwnProperty(o) || (e[o] = t[o]);
      return !0;
    },
    inherit: function (e, t) {
      "undefined" != typeof e.prototype.__proto__
        ? (e.prototype.__proto__ = t.prototype)
        : this.expand(e.prototype, t.prototype);
    },
    extractClass: function (e) {
      for (var t = window, o = e.split("."), i = 0; i < o.length; i++)
        "undefined" != typeof t && (t = t[o[i]]);
      return t;
    },
    formatNumber: function (e, t) {
      t = t || "0";
      var o = ((e || "") + "")
        .replace(/(\d)(?=(?:\d{3})+(?:$|\.|,))/g, "$1&nbsp;")
        .replace(".", ",");
      return o && "0" != o ? o : t;
    },
    sortArray: function (e, t) {
      return (
        "undefined" == typeof t && (t = 1),
        "object" == typeof e &&
          e.sort(function (e, o) {
            return (e - o) * t;
          }),
        e
      );
    },
    uniqueArray: function (e) {
      if ("object" == typeof e) {
        var t = [];
        e: for (var o = 0; o < e.length; o++) {
          for (var i = 0; i < t.length; i++) if (t[i] == e[o]) continue e;
          t[t.length] = e[o];
        }
        e = t;
      }
      return e;
    },
    escapeHTML: function (e) {
      return e
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
    },
    getIslands: function () {
      return {
        1: {
          13: [5228, 2, "Torautia"],
          14: [5224, 1, "Lolios"],
          15: [5221, 3, "Bratuios"],
          16: [5220, 4, "Banuitia"],
          17: [5218, 3, "Treibios"],
          25: [4847, 1, "Warooos"],
          26: [4848, 4, "Ghaatia"],
          29: [4861, 2, "Honuitia"],
          30: [4862, 3, "Taibios"],
          41: [4297, 3, "Pokios"],
          42: [4296, 4, "Soiwiios"],
          43: [4294, 1, "Pepyos"],
          44: [4295, 2, "Samoitia"],
          53: [4864, 4, "Thofeos"],
          54: [4866, 2, "Isseos"],
          55: [4868, 4, "Phimuios"],
          56: [4870, 2, "Chrorios"],
          58: [4872, 3, "Athyos"],
          59: [4874, 1, "Heydiios"],
          60: [4876, 3, "Lesuos"],
          61: [4878, 1, "Doipios"],
          86: [5638, 4, "Blibios"],
          87: [5639, 2, "Hatoos"],
        },
        2: {
          2: [5488, 1, "Rezios"],
          3: [5486, 2, "Eritia"],
          4: [5484, 1, "Luirios"],
          5: [5482, 3, "Thromoos"],
          6: [5480, 1, "Hatios"],
          10: [5232, 2, "Peretia"],
          11: [5230, 1, "Onitia"],
          13: [5227, 3, "Ackytia"],
          14: [5223, 4, "Craeliios"],
          15: [5222, 2, "Schakios"],
          16: [5219, 1, "Thaquos"],
          17: [5217, 2, "Heboos"],
          25: [4846, 3, "Blaudios"],
          26: [4844, 2, "Aldaetia"],
          27: [4845, 3, "Tujios"],
          29: [4860, 1, "Denayos"],
          30: [4859, 4, "Masyios"],
          31: [4858, 3, "Niewios"],
          32: [4857, 4, "Queysios"],
          37: [4265, 4, "Sneiroios"],
          38: [4266, 1, "Releos"],
          39: [4267, 4, "Nyyios"],
          41: [4299, 1, "Ripios"],
          42: [4298, 2, "Rycios"],
          43: [4292, 3, "Kisaos"],
          44: [4293, 4, "Nylios"],
          53: [4863, 3, "Oldoos"],
          54: [4865, 1, "Tuidyios"],
          55: [4867, 3, "Banoutia"],
          56: [4869, 1, "Yeraytia"],
          58: [4871, 2, "Rhelios"],
          59: [4873, 4, "Zaraios"],
          60: [4875, 2, "Huinios"],
          61: [4877, 4, "Duryos"],
          63: [5257, 1, "Tridios"],
          64: [5259, 2, "Ridios"],
          65: [5261, 4, "Cleichiios"],
          66: [5263, 2, "Moqaios"],
          75: [5500, 1, "Roedios"],
          76: [5499, 4, "Puruos"],
          77: [5497, 1, "Elduos"],
          78: [5498, 3, "Llehyos"],
          80: [5502, 1, "Leudios"],
          81: [5503, 2, "Ravoios"],
          84: [5627, 1, "Filios"],
          85: [5629, 3, "Imyos"],
          86: [5631, 1, "Rhibiios"],
          87: [5633, 3, "Vorotia"],
          95: [5719, 4, "Ormyos"],
          96: [5720, 3, "Hirios"],
        },
        3: {
          2: [5487, 4, "Ackeos"],
          3: [5485, 3, "Loruos"],
          4: [5483, 4, "Vesauos"],
          5: [5481, 2, "Smotios"],
          6: [5479, 4, "Claekaios"],
          8: [5236, 2, "Perotia"],
          9: [5235, 1, "Hockoos"],
          10: [5231, 3, "Orios"],
          11: [5229, 4, "Shilaos"],
          13: [5226, 2, "Roilios"],
          14: [5225, 1, "Tomoos"],
          19: [5192, 2, "Totios"],
          20: [5191, 3, "Samutia"],
          22: [4836, 2, "Menios"],
          23: [4837, 4, "Tinutia"],
          26: [4842, 4, "Torotia"],
          27: [4843, 1, "Politia"],
          31: [4855, 2, "Osaios"],
          32: [4856, 1, "Ranoos"],
          37: [4264, 3, "Liyaos"],
          38: [4263, 2, "Umytia"],
          39: [4262, 3, "Blakios"],
          43: [4290, 1, "Nywuos"],
          44: [4291, 2, "Ziheios"],
          50: [4315, 2, "Essaitia"],
          51: [4314, 1, "Chealios"],
          63: [5254, 4, "Phayiios"],
          64: [5258, 2, "Aweutia"],
          65: [5260, 3, "Kimeos"],
          66: [5262, 1, "Droubios"],
          67: [5264, 3, "Sariios"],
          68: [5266, 1, "Bazios"],
          70: [5272, 2, "Clemyios"],
          71: [5273, 1, "Suluos"],
          72: [5276, 2, "Anautia"],
          73: [5277, 1, "Areatia"],
          75: [5493, 2, "Straimyios"],
          76: [5494, 3, "Snosios"],
          77: [5495, 2, "Usteutia"],
          78: [5496, 4, "Skelaios"],
          80: [5501, 4, "Zhyteos"],
          81: [5504, 3, "Rhuihios"],
          82: [5511, 2, "Nyeitia"],
          84: [5626, 4, "Ormaos"],
          85: [5628, 2, "Pyvios"],
          86: [5630, 4, "Banytia"],
          87: [5632, 2, "Morytia"],
          88: [5634, 4, "Oughoos"],
          89: [5637, 3, "Dickyos"],
          91: [5676, 1, "Danutia"],
          92: [5677, 4, "Seuloos"],
          93: [5678, 3, "Nibios"],
          95: [5718, 2, "Druimeos"],
          96: [5716, 1, "Ildoos"],
          97: [5717, 2, "Moraeos"],
          98: [5721, 1, "Smeedios"],
        },
        4: {
          2: [5489, 1, "Whubios"],
          3: [5490, 2, "Noghios"],
          8: [5237, 3, "Thraboos"],
          9: [5234, 4, "Treetios"],
          10: [5233, 2, "Banutia"],
          16: [5199, 2, "Tonaytia"],
          17: [5198, 4, "Pisios"],
          19: [5190, 4, "Lyeaos"],
          20: [5188, 1, "Snydios"],
          22: [4835, 1, "Loraos"],
          23: [4832, 3, "Wabaios"],
          24: [4833, 1, "Kimios"],
          26: [4840, 2, "Angaos"],
          27: [4841, 3, "Ackoios"],
          29: [4850, 3, "Raelios"],
          30: [4852, 1, "Cawios"],
          31: [4854, 3, "Daneos"],
          34: [4255, 4, "Layios"],
          35: [4254, 1, "Rutaos"],
          39: [4257, 1, "Nahios"],
          40: [4258, 3, "Dracoos"],
          41: [4261, 2, "Serytia"],
          43: [4288, 3, "Oughaios"],
          44: [4289, 4, "Poloios"],
          46: [4304, 4, "Zesios"],
          47: [4305, 1, "Chilios"],
          48: [4309, 4, "Onuos"],
          49: [4310, 1, "Myluos"],
          50: [4312, 4, "Sulios"],
          51: [4313, 3, "Suletia"],
          53: [3616, 3, "Iaatia"],
          54: [3615, 2, "Tavaos"],
          56: [4317, 4, "Adeos"],
          57: [4319, 1, "Strierios"],
          58: [4320, 3, "Inaotia"],
          59: [4323, 1, "Inguos"],
          60: [4325, 3, "Draotia"],
          61: [4326, 2, "Tinetia"],
          67: [5265, 4, "Isoos"],
          68: [5267, 2, "Theroos"],
          70: [5270, 3, "Lecaios"],
          71: [5271, 4, "Slidios"],
          72: [5274, 3, "Whoceos"],
          73: [5275, 4, "Bredios"],
          75: [5491, 4, "Ingoutia"],
          76: [5492, 1, "Roerios"],
          81: [5505, 4, "Smecaios"],
          82: [5506, 1, "Yereuos"],
          88: [5635, 1, "Padios"],
          89: [5636, 2, "Stynios"],
          91: [5675, 3, "Soriios"],
          92: [5674, 2, "Yeratia"],
          93: [5673, 1, "Dryhios"],
          96: [5715, 3, "Sheurios"],
          97: [5713, 4, "Warios"],
          98: [5714, 3, "Chaaos"],
        },
        5: {
          5: [5464, 1, "Strurios"],
          6: [5462, 3, "Reypios"],
          8: [5239, 2, "Uskaos"],
          9: [5238, 1, "Sairdeios"],
          12: [5216, 2, "Voroetia"],
          13: [5205, 3, "Rothitia"],
          14: [5204, 2, "Ometia"],
          16: [5200, 3, "Choitaios"],
          17: [5197, 1, "Beduios"],
          20: [5187, 2, "Adotia"],
          23: [4831, 2, "Neasuios"],
          24: [4834, 4, "Boldeios"],
          26: [4838, 4, "Mositia"],
          27: [4839, 1, "Moryos"],
          29: [4849, 2, "Wuireos"],
          30: [4851, 4, "Neeyios"],
          31: [4853, 2, "Ineaos"],
          33: [4246, 1, "Lereutia"],
          34: [4247, 3, "Broozyos"],
          35: [4248, 2, "Cloruios"],
          36: [4249, 4, "Draietia"],
          37: [4253, 1, "Augheos"],
          39: [4256, 2, "Chiwaios"],
          40: [4259, 4, "Daniaos"],
          41: [4260, 1, "Banyos"],
          46: [4302, 2, "Bedios"],
          47: [4303, 3, "Ereetia"],
          48: [4306, 2, "Yetoos"],
          49: [4308, 3, "Maigios"],
          50: [4311, 2, "Kasuios"],
          53: [3613, 4, "Turytia"],
          54: [3614, 1, "Blounaos"],
          56: [4316, 3, "Llielios"],
          57: [4318, 2, "Bayios"],
          58: [4321, 4, "Whakios"],
          59: [4322, 2, "Syjios"],
          60: [4324, 4, "Bleecios"],
          61: [4327, 1, "Bymyios"],
          63: [4884, 1, "Beleos"],
          64: [4885, 3, "Moliios"],
          65: [4886, 2, "Shoodios"],
          70: [5268, 1, "Keleaos"],
          71: [5269, 2, "Rodoos"],
          78: [5298, 1, "Untauos"],
          79: [5299, 2, "Woulios"],
          81: [5507, 2, "Myzios"],
          82: [5508, 3, "Philaios"],
          84: [5513, 2, "Maedios"],
          85: [5514, 4, "Urnaos"],
          86: [5519, 2, "Dririios"],
          93: [5667, 2, "Lasyos"],
          94: [5668, 4, "Smanios"],
          97: [5711, 2, "Claehaios"],
          98: [5712, 1, "Gunoios"],
        },
        6: {
          3: [5467, 4, "Threucios"],
          4: [5465, 2, "Ougheytia"],
          5: [5463, 4, "Broseios"],
          6: [5461, 2, "Stidaios"],
          8: [5241, 3, "Leuthuos"],
          9: [5240, 4, "Smysios"],
          11: [5207, 1, "Essoos"],
          12: [5206, 4, "Tineaos"],
          13: [5203, 1, "Sackuios"],
          14: [5202, 4, "Hausios"],
          16: [5201, 2, "Reymaos"],
          17: [5196, 4, "Etatia"],
          18: [5195, 2, "Ditios"],
          20: [5184, 3, "Emetia"],
          21: [5182, 1, "Quiedaos"],
          23: [4830, 1, "Trealeos"],
          24: [4828, 3, "Hinoios"],
          33: [4244, 2, "Sutios"],
          34: [4245, 4, "Endaos"],
          35: [4250, 1, "Mosooos"],
          36: [4251, 3, "Cykeios"],
          37: [4252, 2, "Bulios"],
          43: [3593, 4, "Vesitia"],
          44: [3594, 1, "Adeetia"],
          46: [4300, 4, "Schodiios"],
          47: [4301, 1, "Inaeos"],
          52: [3611, 2, "Blobeos"],
          53: [3612, 3, "Daroos"],
          63: [4883, 2, "Nitaos"],
          64: [4881, 4, "Foloios"],
          65: [4882, 1, "Poluios"],
          67: [4898, 2, "Phurdoios"],
          68: [4899, 3, "Swatios"],
          73: [5282, 2, "Thuraios"],
          74: [5283, 4, "Urnatia"],
          76: [5292, 1, "Sleyrdeos"],
          77: [5293, 2, "Uskeytia"],
          78: [5294, 3, "Bisaos"],
          79: [5295, 4, "Crugaios"],
          81: [5509, 4, "Loildeios"],
          82: [5510, 1, "Haduios"],
          84: [5512, 1, "Sluiwoos"],
          85: [5515, 3, "Veseos"],
          86: [5518, 1, "Sexios"],
          88: [5642, 1, "Kikoios"],
          89: [5643, 2, "Banatia"],
          90: [5644, 3, "Zasios"],
          91: [5645, 4, "Usketia"],
          93: [5666, 1, "Sayeutia"],
          94: [5664, 3, "Strasios"],
          95: [5665, 2, "Slikaos"],
        },
        7: {
          3: [5468, 1, "Moreos"],
          4: [5466, 3, "Delutia"],
          11: [5209, 3, "Droijios"],
          12: [5208, 2, "Tonietia"],
          17: [5194, 1, "Reimios"],
          18: [5193, 3, "Chesios"],
          20: [5183, 2, "Blasoos"],
          21: [5181, 4, "Mesios"],
          23: [4829, 4, "Awytia"],
          24: [4827, 2, "Yyhios"],
          26: [4239, 2, "Moratia"],
          27: [4240, 3, "Heylios"],
          28: [4241, 1, "Uskytia"],
          30: [4236, 3, "Naimeos"],
          31: [4235, 4, "Ziabios"],
          39: [3582, 4, "Ormeyos"],
          40: [3583, 3, "Tosios"],
          41: [3586, 4, "Tearios"],
          43: [3591, 2, "Daedios"],
          44: [3592, 3, "Nunyos"],
          49: [3606, 3, "Undeatia"],
          50: [3605, 4, "Slaitios"],
          52: [3609, 4, "Oseetia"],
          53: [3610, 1, "Ghaoutia"],
          55: [3618, 1, "Acketia"],
          56: [3619, 4, "Dyhaos"],
          57: [3624, 1, "Urnauos"],
          59: [3626, 1, "Kelieos"],
          60: [3628, 3, "Belotia"],
          61: [3630, 1, "Drivios"],
          64: [4879, 3, "Achaos"],
          65: [4880, 2, "Himios"],
          67: [4897, 1, "Waybios"],
          68: [4896, 4, "Llynoos"],
          69: [4895, 3, "Rakeuos"],
          70: [4900, 4, "Laefios"],
          72: [5278, 1, "Tetios"],
          73: [5280, 3, "Hateatia"],
          74: [5284, 1, "Ghaitia"],
          76: [5290, 3, "Taeloios"],
          77: [5291, 4, "Llautios"],
          85: [5516, 2, "Eriaos"],
          86: [5517, 4, "Mashaos"],
          88: [5640, 3, "Doosyos"],
          89: [5641, 4, "Veruos"],
          90: [5646, 1, "Eldootia"],
          91: [5647, 2, "Bledios"],
          94: [5662, 4, "Uskiatia"],
          95: [5663, 1, "Tumios"],
          97: [5689, 1, "Cotios"],
          98: [5690, 2, "Smiadios"],
        },
        8: {
          3: [5469, 2, "Atoios"],
          4: [5470, 4, "Kivios"],
          6: [5453, 1, "Caxiios"],
          7: [5452, 4, "Radetia"],
          9: [5213, 3, "Raduios"],
          10: [5212, 2, "Clearios"],
          11: [5211, 1, "Ranios"],
          12: [5210, 4, "Soltyios"],
          14: [5173, 3, "Treidios"],
          15: [5172, 2, "Omytia"],
          26: [4238, 1, "Zowaos"],
          27: [4237, 4, "Smiachios"],
          28: [4231, 2, "Snyvuos"],
          29: [4230, 4, "Smileios"],
          30: [4232, 1, "Denieos"],
          31: [4233, 2, "Jigios"],
          33: [3573, 1, "Nilaos"],
          34: [3574, 2, "Sameuos"],
          36: [3577, 3, "Worouos"],
          37: [3578, 4, "Wuilios"],
          38: [3580, 1, "Malios"],
          39: [3581, 2, "Uskotia"],
          40: [3584, 1, "Nifoios"],
          41: [3585, 2, "Rhyseos"],
          43: [3589, 4, "Ruidoos"],
          44: [3590, 1, "Athetia"],
          46: [3600, 2, "Imytia"],
          47: [3601, 1, "Etoeos"],
          48: [3602, 4, "Swadios"],
          49: [3603, 1, "Engootia"],
          50: [3604, 2, "Daritia"],
          52: [3607, 2, "Cheuhios"],
          53: [3608, 3, "Eneutia"],
          55: [3617, 2, "Snynoios"],
          56: [3620, 3, "Buretia"],
          57: [3623, 2, "Nomoios"],
          59: [3625, 4, "Suloos"],
          60: [3627, 2, "Shoenios"],
          61: [3629, 4, "Thoecios"],
          62: [3631, 2, "Rothaeos"],
          69: [4893, 1, "Famoios"],
          70: [4894, 2, "Sauceios"],
          72: [5279, 2, "Quoteios"],
          73: [5281, 4, "Streluios"],
          74: [5285, 2, "Nasuios"],
          76: [5288, 1, "Ineeutia"],
          77: [5289, 2, "Lyeoitia"],
          79: [5300, 3, "Imoos"],
          80: [5302, 4, "Atheytia"],
          81: [5304, 3, "Blukeos"],
          82: [5310, 2, "Peuxyos"],
          83: [5311, 1, "Ciamios"],
          91: [5648, 3, "Emios"],
          92: [5649, 4, "Phyckios"],
          97: [5687, 3, "Ataos"],
          98: [5688, 4, "Aughieos"],
        },
        9: {
          6: [5454, 2, "Ineietia"],
          7: [5451, 3, "Peroitia"],
          9: [5215, 1, "Demios"],
          10: [5214, 4, "Choiduios"],
          14: [5171, 1, "Stregios"],
          15: [5170, 4, "Lobios"],
          17: [4825, 3, "Zebios"],
          18: [4824, 2, "Rodotia"],
          19: [4822, 4, "Reyheos"],
          20: [4820, 1, "Siroos"],
          22: [4203, 2, "Diesaos"],
          23: [4202, 1, "Umuos"],
          24: [4224, 3, "Delotia"],
          28: [4229, 3, "Ashutia"],
          29: [4228, 1, "Sticaos"],
          33: [3571, 3, "Tisuios"],
          34: [3572, 4, "Umoos"],
          36: [3575, 1, "Chroiroos"],
          37: [3576, 2, "Llodios"],
          38: [3579, 3, "Kanyios"],
          43: [3587, 2, "Erouos"],
          44: [3588, 3, "Randaios"],
          46: [3599, 4, "Daneios"],
          47: [3597, 3, "Lyeoios"],
          48: [3598, 2, "Lukios"],
          56: [3621, 4, "Woroos"],
          57: [3622, 1, "Phodios"],
          62: [3632, 3, "Esseos"],
          63: [3633, 4, "Nagios"],
          65: [4328, 4, "Umeaos"],
          66: [4330, 2, "Kimuos"],
          67: [4332, 4, "Ceroos"],
          69: [4891, 3, "Poleitia"],
          70: [4892, 4, "Brybuos"],
          76: [5286, 3, "Angiatia"],
          77: [5287, 4, "Laupios"],
          79: [5301, 1, "Huifios"],
          80: [5303, 2, "Neipuos"],
          81: [5305, 1, "Dredeos"],
          82: [5306, 4, "Dapaios"],
          83: [5308, 3, "Hekios"],
          85: [5520, 4, "Vesoos"],
          86: [5522, 3, "Garatia"],
          87: [5524, 4, "Blofeos"],
          88: [5526, 2, "Drozios"],
          89: [5528, 4, "Moiqyios"],
          91: [5651, 2, "Tidios"],
          92: [5650, 1, "Ingeos"],
          94: [5679, 3, "Burieos"],
          95: [5680, 4, "Druilios"],
          96: [5685, 1, "Bripios"],
          97: [5686, 2, "Weanios"],
        },
        10: {
          1: [5478, 1, "Mybiios"],
          2: [5472, 2, "Kulios"],
          3: [5471, 1, "Rynyos"],
          5: [5457, 1, "Pheusios"],
          6: [5455, 3, "Dytios"],
          12: [5175, 1, "Latios"],
          13: [5174, 4, "Riatios"],
          14: [5169, 3, "Kalootia"],
          15: [5168, 2, "Dariaos"],
          17: [4826, 4, "Sixios"],
          18: [4823, 1, "Quikeios"],
          19: [4821, 3, "Wakios"],
          20: [4819, 2, "Heceos"],
          22: [4204, 3, "Dyniatia"],
          23: [4201, 4, "Queoutia"],
          24: [4199, 2, "Strukios"],
          25: [4200, 1, "Sicios"],
          26: [4225, 2, "Bleihios"],
          28: [4226, 4, "Theidios"],
          29: [4227, 2, "Yimyios"],
          31: [3567, 4, "Tuiluos"],
          32: [3568, 1, "Toneeos"],
          33: [3570, 2, "Falios"],
          40: [2857, 2, "Teepoios"],
          41: [2858, 3, "Thereuos"],
          47: [3595, 4, "Dynoos"],
          48: [3596, 1, "Sabuos"],
          50: [2883, 1, "Omotia"],
          51: [2882, 4, "Swadiios"],
          53: [2892, 3, "Salios"],
          54: [2893, 4, "Oraeos"],
          59: [2902, 1, "Larios"],
          60: [2903, 2, "Enthutia"],
          62: [3635, 2, "Woiruios"],
          63: [3634, 1, "Dykios"],
          65: [4329, 1, "Craleos"],
          66: [4331, 3, "Ingoitia"],
          67: [4333, 1, "Lorotia"],
          70: [4889, 1, "Brourtuios"],
          71: [4890, 2, "Daijios"],
          73: [4911, 4, "Mosiatia"],
          74: [4912, 2, "Rhainios"],
          82: [5307, 2, "Belyos"],
          83: [5309, 1, "Banoos"],
          85: [5521, 1, "Zurios"],
          86: [5523, 2, "Seretia"],
          87: [5525, 1, "Quugios"],
          88: [5527, 3, "Rhipios"],
          89: [5529, 1, "Toraytia"],
          91: [5653, 4, "Umoitia"],
          92: [5652, 3, "Queeraios"],
          94: [5681, 1, "Soedyos"],
          95: [5682, 2, "Zhysuios"],
          96: [5683, 3, "Yuistuios"],
          97: [5684, 4, "Clauntios"],
          99: [5700, 1, "Awootia"],
          100: [5701, 3, "Swymyos"],
        },
        11: {
          1: [5477, 3, "Tebios"],
          2: [5474, 4, "Kalitia"],
          3: [5473, 3, "Deliaos"],
          5: [5458, 2, "Sleleos"],
          6: [5456, 4, "Koloos"],
          8: [5253, 1, "Ageoetia"],
          9: [5252, 4, "Warutia"],
          11: [5180, 2, "Oughitia"],
          12: [5177, 3, "Ituos"],
          13: [5176, 2, "Fayleos"],
          14: [5167, 1, "Smaeryos"],
          15: [5166, 4, "Nyetia"],
          24: [4198, 3, "Hinuos"],
          25: [4197, 4, "Tonotia"],
          26: [4196, 3, "Taydios"],
          31: [3565, 2, "Tafios"],
          32: [3566, 3, "Fokeos"],
          33: [3569, 4, "Nothiios"],
          35: [2847, 1, "Thuwios"],
          36: [2848, 2, "Rhenyios"],
          37: [2851, 1, "Leryios"],
          38: [2852, 2, "Phuinios"],
          40: [2855, 1, "Bobios"],
          41: [2856, 4, "Eruos"],
          42: [2860, 2, "Bluinios"],
          44: [2870, 3, "Toubeios"],
          45: [2871, 2, "Rhypaos"],
          50: [2881, 2, "Seyjuios"],
          51: [2880, 3, "Loreos"],
          53: [2890, 2, "Bleynios"],
          54: [2891, 1, "Queios"],
          56: [2896, 3, "Cirdeos"],
          57: [2897, 1, "Rakoos"],
          58: [2901, 2, "Rothoos"],
          59: [2900, 4, "Stronios"],
          60: [2904, 3, "Kimutia"],
          66: [4334, 2, "Swaygheios"],
          67: [4335, 4, "Yerootia"],
          68: [4338, 2, "Deckios"],
          70: [4887, 3, "Bimios"],
          71: [4888, 4, "Trorios"],
          73: [4902, 1, "Emeatia"],
          74: [4904, 3, "Bucaos"],
          75: [4906, 1, "Creesaos"],
          76: [4908, 3, "Naluos"],
          77: [4910, 1, "Rhotoos"],
          79: [4914, 2, "Sojiios"],
          80: [4915, 4, "Blanios"],
          99: [5699, 2, "Ceapheos"],
          100: [5702, 4, "Phocyios"],
        },
        12: {
          2: [5476, 2, "Tiaotia"],
          3: [5475, 1, "Toneos"],
          5: [5459, 3, "Smourios"],
          6: [5460, 1, "Aleauos"],
          8: [5251, 3, "Feadeios"],
          9: [5250, 2, "Endootia"],
          11: [5179, 1, "Mocaios"],
          12: [5178, 4, "Lyeeaos"],
          17: [4816, 3, "Runnyos"],
          18: [4817, 4, "Fapios"],
          20: [4192, 1, "Snantoios"],
          21: [4191, 3, "Fasyos"],
          22: [4190, 1, "Noinaios"],
          25: [4194, 1, "Nandaos"],
          26: [4195, 2, "Ninaios"],
          28: [3563, 2, "Drusoos"],
          29: [3564, 1, "Ghaaeos"],
          35: [2845, 3, "Craeleos"],
          36: [2846, 4, "Schibios"],
          37: [2849, 3, "Aldeyos"],
          38: [2850, 4, "Radeaos"],
          40: [2853, 2, "Echitia"],
          41: [2854, 3, "Rhyhios"],
          42: [2859, 1, "Undaos"],
          44: [2869, 4, "Awetia"],
          45: [2866, 1, "Ruzeios"],
          46: [2868, 3, "Omoios"],
          47: [2873, 4, "Jutheios"],
          49: [2876, 1, "Lloraos"],
          50: [2877, 4, "Liadios"],
          51: [2879, 1, "Athaetia"],
          53: [2888, 3, "Ceratia"],
          54: [2889, 4, "Smiejeos"],
          56: [2894, 2, "Bawios"],
          57: [2895, 4, "Draatia"],
          58: [2898, 3, "Hisios"],
          59: [2899, 1, "Danatia"],
          60: [2905, 2, "Caijios"],
          62: [3636, 3, "Maweos"],
          63: [3638, 1, "Cohiios"],
          64: [3640, 3, "Laegios"],
          67: [4336, 1, "Zeseos"],
          68: [4337, 3, "Enaytia"],
          73: [4901, 4, "Coerios"],
          74: [4903, 2, "Yoeraios"],
          75: [4905, 4, "Daneatia"],
          76: [4907, 2, "Yesoios"],
          77: [4909, 4, "Quoekios"],
          79: [4913, 3, "Onuios"],
          80: [4916, 1, "Quaios"],
          81: [4917, 2, "Sufeios"],
          82: [4920, 4, "Keuckoios"],
          84: [4922, 4, "Imuos"],
          85: [4923, 1, "Nurios"],
          86: [4926, 4, "Gocaos"],
          88: [5339, 2, "Muibios"],
          89: [5340, 3, "Nyatia"],
          90: [5343, 2, "Zotuios"],
          91: [5344, 3, "Wauteios"],
          92: [5345, 4, "Emoeos"],
          94: [5539, 2, "Thrusios"],
          95: [5540, 1, "Oughios"],
          97: [5691, 3, "Untitia"],
          98: [5693, 1, "Samayos"],
          99: [5695, 3, "Voritia"],
          100: [5697, 1, "Sherios"],
        },
        13: {
          8: [5249, 1, "Crahiios"],
          9: [5248, 4, "Sadios"],
          14: [4812, 2, "Verooos"],
          15: [4813, 3, "Badaos"],
          16: [4814, 1, "Rhytios"],
          17: [4815, 2, "Angeos"],
          18: [4818, 1, "Trenios"],
          20: [4193, 2, "Phigoos"],
          21: [4185, 4, "Weylaios"],
          22: [4184, 3, "Tozios"],
          23: [4187, 1, "Ereuos"],
          28: [3559, 4, "Blusios"],
          29: [3560, 3, "Leahuos"],
          30: [3562, 1, "Deypyos"],
          32: [2832, 2, "Minios"],
          33: [2833, 3, "Giadios"],
          45: [2865, 4, "Llenios"],
          46: [2867, 2, "Drearoos"],
          47: [2872, 1, "Thrivios"],
          49: [2874, 2, "Tamios"],
          50: [2875, 3, "Kimitia"],
          51: [2878, 2, "Rakeaos"],
          53: [2886, 1, "Kilios"],
          54: [2887, 2, "Kinytia"],
          62: [3637, 4, "Chrealeios"],
          63: [3639, 2, "Itieos"],
          64: [3641, 4, "Atatia"],
          65: [3642, 1, "Slaraios"],
          70: [3658, 1, "Kadyos"],
          71: [3657, 3, "Samios"],
          81: [4918, 3, "Aldutia"],
          82: [4919, 1, "Ageootia"],
          84: [4921, 2, "Niroios"],
          85: [4924, 3, "Omios"],
          86: [4925, 2, "Kalouos"],
          88: [5337, 4, "Ponyios"],
          89: [5338, 1, "Sulayos"],
          90: [5341, 4, "Polietia"],
          91: [5342, 1, "Ceyliios"],
          92: [5346, 2, "Gareos"],
          94: [5536, 3, "Brajuos"],
          95: [5538, 4, "Yerotia"],
          97: [5692, 4, "Moonios"],
          98: [5694, 2, "Asautia"],
          99: [5696, 4, "Saseos"],
          100: [5698, 2, "Vesoios"],
        },
        14: {
          3: [5450, 4, "Motoos"],
          4: [5448, 2, "Slauxeos"],
          5: [5446, 4, "Talios"],
          6: [5444, 2, "Croloos"],
          8: [5247, 3, "Ougheos"],
          9: [5246, 2, "Rotheutia"],
          11: [4804, 3, "Echuitia"],
          12: [4806, 1, "Burootia"],
          14: [4811, 1, "Elmeos"],
          15: [4809, 4, "Neabios"],
          16: [4810, 3, "Kalooos"],
          21: [4182, 2, "Tanoutia"],
          22: [4183, 4, "Wierios"],
          23: [4186, 2, "Reiluios"],
          25: [3555, 2, "Serootia"],
          26: [3556, 3, "Lavuios"],
          28: [3557, 1, "Mizios"],
          29: [3558, 2, "Oldeytia"],
          30: [3561, 4, "Oldaetia"],
          32: [2830, 4, "Jidoos"],
          33: [2831, 1, "Schawios"],
          35: [2844, 1, "Slaubios"],
          36: [2843, 2, "Yelios"],
          38: [2223, 4, "Roikios"],
          39: [2224, 1, "Lanaos"],
          41: [2226, 1, "Dauvios"],
          42: [2227, 2, "Kaizios"],
          43: [2233, 4, "Doudios"],
          45: [2862, 1, "Swuhios"],
          46: [2864, 3, "Toroos"],
          53: [2884, 3, "Bypios"],
          54: [2885, 4, "Zhutios"],
          56: [2266, 4, "Iaytia"],
          57: [2267, 1, "Coonios"],
          59: [2906, 2, "Swotyos"],
          60: [2908, 4, "Straldios"],
          65: [3643, 2, "Ackyos"],
          66: [3645, 4, "Radaitia"],
          68: [3648, 2, "Kautaos"],
          69: [3650, 4, "Croeloios"],
          70: [3652, 2, "Enooos"],
          71: [3654, 4, "Morios"],
          72: [3656, 2, "Jecyos"],
          74: [3668, 1, "Rilaios"],
          75: [3669, 2, "Halluos"],
          76: [3670, 1, "Cerios"],
          78: [4339, 2, "Whoxios"],
          79: [4341, 4, "Rilutia"],
          85: [4929, 4, "Vaykuios"],
          86: [4927, 1, "Garotia"],
          88: [5335, 2, "Achoutia"],
          89: [5336, 3, "Ightautia"],
          94: [5535, 2, "Runios"],
          95: [5537, 1, "Cyrios"],
        },
        15: {
          3: [5449, 3, "Ormios"],
          4: [5447, 1, "Bexuos"],
          5: [5445, 3, "Cruiseos"],
          6: [5443, 1, "Keloutia"],
          8: [5245, 1, "Yaireios"],
          9: [5244, 4, "Toreios"],
          11: [4803, 4, "Yimios"],
          12: [4805, 2, "Ageotia"],
          15: [4807, 2, "Pyloos"],
          16: [4808, 1, "Waroos"],
          18: [4181, 3, "Wavios"],
          19: [4180, 2, "Phainyios"],
          25: [3553, 4, "Covoios"],
          26: [3554, 1, "Soowios"],
          32: [2828, 2, "Taydoos"],
          33: [2829, 3, "Tasetia"],
          34: [2840, 2, "Mydios"],
          35: [2841, 3, "Bromaos"],
          36: [2842, 4, "Buinios"],
          38: [2221, 2, "Peannaios"],
          39: [2222, 3, "Leroutia"],
          41: [2225, 4, "Moseios"],
          42: [2228, 3, "Phacios"],
          43: [2234, 1, "Turoos"],
          45: [2861, 4, "Tinoutia"],
          46: [2863, 2, "Augheetia"],
          48: [2249, 3, "Jylios"],
          49: [2250, 4, "Schiemiios"],
          50: [2253, 3, "Soroos"],
          51: [2254, 4, "Dynuos"],
          56: [2264, 2, "Nitios"],
          57: [2265, 3, "Tinios"],
          59: [2907, 1, "Rynuos"],
          60: [2909, 3, "Umooos"],
          61: [2910, 4, "Luipios"],
          62: [2912, 2, "Nakios"],
          63: [2920, 1, "Bruimaios"],
          65: [3644, 3, "Leicios"],
          66: [3646, 1, "Drysios"],
          68: [3647, 1, "Phyntuios"],
          69: [3649, 3, "Sayaos"],
          70: [3651, 1, "Lelios"],
          71: [3653, 3, "Tomyos"],
          72: [3655, 1, "Joteos"],
          74: [3665, 4, "Sudios"],
          75: [3666, 3, "Yakeios"],
          76: [3667, 4, "Sevios"],
          78: [4340, 3, "Schonyos"],
          79: [4342, 1, "Naitios"],
          80: [4343, 2, "Peyios"],
          81: [4345, 4, "Thrilios"],
          82: [4347, 2, "Swemiios"],
          83: [4349, 4, "Emeeos"],
          85: [4930, 2, "Drauios"],
          86: [4928, 3, "Nygios"],
          91: [5321, 3, "Somios"],
          92: [5323, 2, "Thitios"],
          94: [5532, 3, "Lasiios"],
          95: [5534, 4, "Queymios"],
          96: [5542, 2, "Cheeeos"],
          98: [5708, 2, "Snesyos"],
          99: [5707, 3, "Iaios"],
          100: [5710, 1, "Crodios"],
        },
        16: {
          8: [5243, 3, "Jaeneios"],
          9: [5242, 2, "Tiwuos"],
          11: [4799, 1, "Achitia"],
          12: [4797, 3, "Nysaeos"],
          13: [4796, 2, "Oldooos"],
          18: [4178, 4, "Enieos"],
          19: [4179, 1, "Trodyos"],
          21: [3548, 2, "Chodios"],
          22: [3547, 1, "Gulios"],
          23: [3546, 4, "Blivuios"],
          25: [3551, 2, "Phozios"],
          26: [3552, 3, "Deneos"],
          28: [2825, 4, "Rordiios"],
          29: [2824, 2, "Whirios"],
          30: [2823, 1, "Hamios"],
          32: [2826, 4, "Shoerios"],
          33: [2827, 1, "Sycios"],
          34: [2838, 4, "Atheuos"],
          35: [2839, 1, "Quipoos"],
          38: [2219, 4, "Kolleos"],
          39: [2220, 1, "Lakoos"],
          42: [2229, 4, "Chahuios"],
          43: [2231, 2, "Naxios"],
          48: [2247, 1, "Sluhios"],
          49: [2248, 2, "Loyios"],
          50: [2251, 1, "Tipios"],
          51: [2252, 2, "Lideos"],
          52: [2257, 3, "Gareaos"],
          53: [2258, 4, "Yeroutia"],
          55: [2262, 4, "Rurryios"],
          56: [2263, 1, "Emoos"],
          61: [2911, 1, "Nalytia"],
          62: [2913, 3, "Dozios"],
          63: [2916, 4, "Diriios"],
          74: [3663, 2, "Jurios"],
          75: [3664, 1, "Quaetia"],
          80: [4344, 3, "Chrealaos"],
          81: [4346, 1, "Tikios"],
          82: [4348, 3, "Thukoos"],
          83: [4350, 1, "Uskieos"],
          88: [5312, 1, "Ryziios"],
          89: [5314, 3, "Crarios"],
          90: [5319, 2, "Quifios"],
          91: [5320, 4, "Tonoetia"],
          92: [5324, 1, "Asaeos"],
          94: [5531, 2, "Thriruos"],
          95: [5533, 1, "Zhaynios"],
          96: [5541, 3, "Blaruios"],
          98: [5705, 1, "Dyzaos"],
          99: [5706, 4, "Neheios"],
          100: [5709, 2, "Sledeos"],
        },
        17: {
          3: [5442, 2, "Belietia"],
          4: [5433, 4, "Thereatia"],
          5: [5431, 2, "Wareaos"],
          6: [5429, 4, "Nadoios"],
          11: [4800, 2, "Kianios"],
          12: [4798, 4, "Phojios"],
          13: [4795, 1, "Nedios"],
          15: [4173, 3, "Rabios"],
          16: [4172, 2, "Imaytia"],
          17: [4177, 3, "Radyos"],
          18: [4176, 2, "Layrios"],
          21: [3543, 4, "Buraos"],
          22: [3544, 3, "Umeios"],
          23: [3545, 2, "Tanyos"],
          25: [3549, 4, "Hoonios"],
          26: [3550, 1, "Toneyos"],
          28: [2820, 1, "Ineytia"],
          29: [2821, 3, "Quadios"],
          30: [2822, 4, "Laumoos"],
          37: [2213, 2, "Blausoos"],
          38: [2214, 3, "Resuos"],
          39: [2217, 2, "Fokaios"],
          40: [2218, 3, "Dicios"],
          42: [2230, 1, "Neiliios"],
          43: [2232, 3, "Rejuios"],
          45: [2237, 1, "Echoetia"],
          46: [2239, 3, "Trapios"],
          51: [2255, 1, "Ormitia"],
          52: [2256, 2, "Baulios"],
          53: [2259, 1, "Wiadios"],
          55: [2260, 2, "Tinautia"],
          56: [2261, 3, "Nycios"],
          58: [2273, 4, "Rhylaos"],
          59: [2274, 2, "Biaxaos"],
          62: [2914, 2, "Keabiios"],
          63: [2915, 1, "Phanios"],
          64: [2919, 2, "Rodyos"],
          66: [2923, 1, "Drikeios"],
          67: [2924, 4, "Cresteios"],
          68: [2930, 1, "Ildeytia"],
          69: [2929, 2, "Seritia"],
          71: [2937, 3, "Tieshiios"],
          72: [2938, 4, "Beuluios"],
          74: [3661, 4, "Ineutia"],
          75: [3662, 3, "Nesoios"],
          77: [3672, 1, "Isetia"],
          78: [3674, 3, "Radios"],
          82: [4351, 2, "Osoeos"],
          83: [4353, 4, "Tonoitia"],
          85: [4356, 4, "Tylluos"],
          86: [4357, 1, "Nataos"],
          88: [5313, 2, "Honaos"],
          89: [5315, 4, "Veratia"],
          90: [5316, 1, "Nisheios"],
          98: [5703, 2, "Rhiesios"],
          99: [5704, 3, "Ardeos"],
        },
        18: {
          2: [5435, 2, "Tariios"],
          3: [5434, 1, "Shotaios"],
          4: [5432, 3, "Cenios"],
          5: [5430, 1, "Enthetia"],
          6: [5428, 3, "Rhayrreos"],
          8: [5163, 3, "Nolios"],
          9: [5165, 1, "Itoetia"],
          15: [4170, 4, "Aughuos"],
          16: [4171, 1, "Esteutia"],
          17: [4174, 4, "Noityios"],
          18: [4175, 1, "Voofios"],
          20: [3540, 1, "Lorouos"],
          21: [3541, 2, "Isytia"],
          22: [3542, 1, "Asheutia"],
          28: [2818, 4, "Turyos"],
          29: [2819, 2, "Nytios"],
          32: [2205, 2, "Rodoutia"],
          33: [2204, 1, "Urnautia"],
          34: [2207, 3, "Nyxiios"],
          35: [2210, 4, "Quosios"],
          37: [2211, 4, "Puizeos"],
          38: [2212, 1, "Toxios"],
          39: [2215, 4, "Rotheetia"],
          40: [2216, 1, "Faicios"],
          42: [2235, 2, "Untiaos"],
          43: [2236, 4, "Doimios"],
          45: [2238, 2, "Soghoos"],
          46: [2240, 4, "Danuos"],
          47: [2241, 1, "Pielliios"],
          48: [2243, 3, "Chripios"],
          49: [2245, 1, "Nipios"],
          58: [2270, 1, "Danooos"],
          59: [2272, 3, "Ackuos"],
          60: [2281, 4, "Turautia"],
          63: [2917, 3, "Doleos"],
          64: [2918, 4, "Arotia"],
          66: [2921, 3, "Leukyos"],
          67: [2922, 2, "Saryios"],
          68: [2926, 3, "Maywios"],
          69: [2928, 1, "Umouos"],
          71: [2935, 1, "Issios"],
          72: [2936, 2, "Dakios"],
          74: [3659, 1, "Swathuos"],
          75: [3660, 2, "Nougios"],
          77: [3671, 4, "Sereios"],
          78: [3673, 2, "Yaeboos"],
          79: [3675, 4, "Zhyldeios"],
          80: [3680, 2, "Blourios"],
          82: [4352, 3, "Asaytia"],
          83: [4354, 1, "Voexios"],
          85: [4355, 3, "Losaos"],
          86: [4358, 2, "Rhiaghaos"],
          89: [5317, 2, "Yedaios"],
          90: [5318, 3, "Lyeatia"],
          92: [5325, 1, "Daryos"],
          93: [5327, 3, "Nehios"],
          94: [5329, 1, "Nisuios"],
          95: [5331, 3, "Bliedios"],
          96: [5333, 1, "Rodoeos"],
        },
        19: {
          2: [5437, 4, "Vorutia"],
          3: [5436, 3, "Seyios"],
          8: [5162, 2, "Styjios"],
          9: [5164, 4, "Rayootia"],
          11: [4794, 2, "Hielios"],
          12: [4792, 4, "Rhabios"],
          14: [4168, 2, "Issaos"],
          15: [4169, 3, "Sayytia"],
          20: [3538, 4, "Iaoos"],
          21: [3539, 3, "Cryrios"],
          24: [2813, 4, "Keizaios"],
          25: [2812, 2, "Naraos"],
          27: [2816, 2, "Quofoios"],
          28: [2817, 1, "Mecios"],
          31: [2206, 4, "Beleytia"],
          32: [2202, 3, "Rynotia"],
          33: [2203, 4, "Shanios"],
          34: [2208, 2, "Seraos"],
          35: [2209, 1, "Cheirios"],
          47: [2242, 2, "Swyndaios"],
          48: [2244, 4, "Chosios"],
          49: [2246, 2, "Jipios"],
          51: [1775, 3, "Loudios"],
          52: [1774, 2, "Rothytia"],
          54: [1785, 2, "Atheyos"],
          55: [1786, 1, "Querios"],
          58: [2269, 4, "Ghaeytia"],
          59: [2271, 2, "Jeyhios"],
          60: [2275, 1, "Boethaos"],
          61: [2276, 2, "Nalios"],
          68: [2925, 2, "Merios"],
          69: [2927, 4, "Dulios"],
          71: [2933, 3, "Nabios"],
          72: [2934, 4, "Tesaos"],
          79: [3676, 1, "Quabios"],
          80: [3679, 4, "Broshios"],
          86: [4359, 3, "Rupheios"],
          87: [4360, 4, "Dineos"],
          92: [5326, 2, "Ghaeos"],
          93: [5328, 4, "Ashatia"],
          94: [5330, 2, "Lerayos"],
          95: [5332, 4, "Seruios"],
          96: [5334, 2, "Tonitia"],
          98: [5544, 4, "Switaios"],
          99: [5546, 2, "Peroos"],
        },
        20: {
          2: [5439, 2, "Sigios"],
          3: [5438, 1, "Cletios"],
          5: [5161, 1, "Strowios"],
          6: [5159, 3, "Smezeos"],
          7: [5157, 1, "Fykios"],
          8: [5155, 3, "Tinotia"],
          11: [4793, 1, "Seroos"],
          12: [4791, 3, "Untiatia"],
          14: [4167, 1, "Dorios"],
          15: [4166, 4, "Brelaios"],
          17: [3528, 3, "Burauos"],
          18: [3526, 1, "Zyhiios"],
          20: [3536, 2, "Tinootia"],
          21: [3537, 1, "Stoiboos"],
          23: [2801, 1, "Quupios"],
          24: [2803, 3, "Naletia"],
          25: [2805, 1, "Nedyos"],
          27: [2814, 4, "Denietia"],
          28: [2815, 3, "Aughyos"],
          30: [2198, 2, "Toraios"],
          31: [2199, 3, "Drautia"],
          32: [2201, 2, "Quohios"],
          37: [1745, 3, "Baizios"],
          38: [1746, 2, "Vuifiios"],
          40: [1748, 2, "Chaoutia"],
          41: [1749, 4, "Nysutia"],
          42: [1752, 1, "Soerios"],
          44: [1760, 3, "Itiatia"],
          45: [1761, 2, "Smehios"],
          51: [1772, 4, "Quinios"],
          52: [1773, 1, "Chrisios"],
          54: [1783, 3, "Garitia"],
          55: [1784, 4, "Ormuos"],
          60: [2277, 3, "Oldoios"],
          61: [2278, 4, "Ciawuios"],
          63: [2284, 2, "Swoshiios"],
          64: [2285, 3, "Anitia"],
          65: [2288, 2, "Estoios"],
          66: [2289, 3, "Eroutia"],
          71: [2931, 1, "Dynios"],
          72: [2932, 2, "Phasios"],
          74: [2944, 3, "Tasoos"],
          75: [2946, 1, "Traesoios"],
          76: [2948, 3, "Smulios"],
          77: [2950, 1, "Shyotia"],
          79: [3677, 2, "Seraios"],
          80: [3678, 3, "Asheatia"],
          82: [3687, 1, "Buraetia"],
          83: [3688, 2, "Wuniios"],
          84: [3689, 3, "Dillaos"],
          86: [4361, 1, "Zhelios"],
          87: [4362, 2, "Siloos"],
          89: [4932, 1, "Skelatia"],
          90: [4934, 3, "Yereitia"],
          98: [5543, 3, "Woidyios"],
          99: [5545, 1, "Syniios"],
        },
        21: {
          2: [5441, 4, "Nusoios"],
          3: [5440, 3, "Leroetia"],
          5: [5160, 4, "Blyxios"],
          6: [5158, 2, "Nyytia"],
          7: [5156, 4, "Gesuios"],
          8: [5154, 2, "Ryneios"],
          10: [4787, 2, "Aughaos"],
          11: [4788, 3, "Blifios"],
          12: [4790, 2, "Kelitia"],
          17: [3527, 2, "Beyreios"],
          18: [3525, 4, "Llafios"],
          23: [2800, 4, "Pereatia"],
          24: [2802, 2, "Ingetia"],
          25: [2804, 4, "Teysios"],
          30: [2196, 4, "Swalios"],
          31: [2197, 1, "Thriegios"],
          32: [2200, 4, "Rilloios"],
          34: [1738, 3, "Tasaeos"],
          35: [1739, 4, "Viafios"],
          37: [1744, 4, "Sireos"],
          38: [1742, 1, "Stekaios"],
          39: [1743, 2, "Perauos"],
          40: [1747, 1, "Radiaos"],
          41: [1750, 3, "Ataeos"],
          42: [1751, 2, "Skeliatia"],
          44: [1758, 1, "Miheios"],
          45: [1759, 4, "Rudios"],
          46: [1764, 2, "Etoos"],
          47: [1765, 4, "Schidios"],
          49: [1768, 2, "Silyos"],
          50: [1769, 4, "Mietios"],
          51: [1771, 2, "Boikios"],
          54: [1780, 2, "Ardotia"],
          55: [1781, 1, "Zhurios"],
          57: [1797, 3, "Saeshoios"],
          58: [1796, 2, "Chaoeos"],
          60: [2279, 1, "Cleteos"],
          61: [2280, 2, "Chibios"],
          63: [2282, 4, "Bucios"],
          64: [2283, 1, "Baneyos"],
          65: [2286, 4, "Dreytuios"],
          66: [2287, 1, "Arios"],
          68: [2301, 1, "Osoos"],
          69: [2302, 3, "Lloruos"],
          74: [2943, 2, "Clyfiios"],
          75: [2945, 4, "Tasuos"],
          76: [2947, 2, "Yuhoos"],
          77: [2949, 4, "Bidios"],
          82: [3685, 3, "Dynotia"],
          83: [3686, 4, "Lerytia"],
          84: [3690, 1, "Smyhios"],
          86: [4363, 3, "Ormautia"],
          87: [4364, 4, "Lordaios"],
          89: [4931, 4, "Kimoios"],
          90: [4933, 2, "Misios"],
          91: [4935, 4, "Leroos"],
          92: [4937, 2, "Untietia"],
          94: [4940, 3, "Zikios"],
          95: [4942, 1, "Imootia"],
          96: [4943, 2, "Zhorios"],
          99: [5547, 4, "Kadios"],
          100: [5548, 3, "Maulios"],
        },
        22: {
          10: [4785, 4, "Weltuos"],
          11: [4786, 1, "Chodiios"],
          12: [4789, 4, "Ranietia"],
          14: [4165, 2, "Ranyos"],
          15: [4164, 1, "Swulios"],
          17: [3524, 3, "Swaishoios"],
          18: [3522, 1, "Smaeghiios"],
          20: [2798, 2, "Drorios"],
          21: [2799, 4, "Wutios"],
          27: [2190, 3, "Stilios"],
          28: [2191, 4, "Rayuos"],
          34: [1736, 1, "Tuneios"],
          35: [1737, 2, "Smennoos"],
          38: [1740, 3, "Dosaos"],
          39: [1741, 4, "Belautia"],
          44: [1754, 2, "Strisios"],
          45: [1755, 3, "Neydios"],
          46: [1762, 1, "Shyutia"],
          47: [1763, 3, "Rakytia"],
          49: [1766, 3, "Leitios"],
          50: [1767, 1, "Chreavios"],
          51: [1770, 3, "Ireeos"],
          53: [1776, 2, "Inaoutia"],
          54: [1778, 4, "Cleyhios"],
          55: [1782, 3, "Reudios"],
          57: [1795, 1, "Repaos"],
          58: [1794, 4, "Cybios"],
          65: [2290, 2, "Adios"],
          66: [2291, 3, "Vulios"],
          68: [2299, 2, "Denautia"],
          69: [2300, 4, "Laistoos"],
          71: [2307, 3, "Rayotia"],
          72: [2308, 4, "Dareytia"],
          74: [2940, 3, "Vesatia"],
          75: [2942, 1, "Zeyuos"],
          79: [2957, 1, "Fuirios"],
          80: [2958, 2, "Lenuios"],
          82: [3683, 1, "Paxaios"],
          83: [3684, 2, "Beleatia"],
          91: [4936, 1, "Banitia"],
          92: [4938, 3, "Hoqios"],
          94: [4939, 2, "Vesytia"],
          95: [4941, 4, "Pemios"],
          96: [4944, 3, "Nathaios"],
          97: [4945, 4, "Whisoos"],
          99: [5549, 2, "Toraos"],
          100: [5550, 1, "Sysios"],
        },
        23: {
          3: [5149, 3, "Oldutia"],
          4: [5150, 4, "Osyos"],
          5: [5153, 3, "Rauntuos"],
          7: [4783, 3, "Loitios"],
          8: [4784, 1, "Taietia"],
          14: [4162, 3, "Wirios"],
          15: [4163, 4, "Ightitia"],
          17: [3523, 2, "Oriaos"],
          18: [3521, 4, "Ashaos"],
          20: [2797, 1, "Hatoutia"],
          21: [2795, 3, "Nysytia"],
          22: [2796, 4, "Zaerios"],
          24: [2195, 1, "Ruceos"],
          25: [2192, 2, "Chakyios"],
          27: [2188, 1, "Hataytia"],
          28: [2189, 2, "Taelios"],
          30: [1726, 3, "Teroios"],
          31: [1727, 4, "Laruos"],
          33: [1730, 3, "Ustuios"],
          34: [1731, 4, "Ackeetia"],
          35: [1734, 3, "Ackitia"],
          36: [1735, 4, "Fihios"],
          41: [1264, 2, "Nuitiios"],
          42: [1265, 1, "Pasheios"],
          44: [1753, 1, "Throsios"],
          45: [1757, 4, "Loorios"],
          53: [1777, 3, "Sayoos"],
          54: [1779, 1, "Yaloios"],
          57: [1793, 3, "Horeos"],
          58: [1792, 2, "Hysios"],
          60: [1800, 3, "Elmeetia"],
          61: [1801, 4, "Echootia"],
          62: [1804, 3, "Gopoios"],
          63: [1805, 4, "Sianios"],
          65: [2292, 1, "Sieyios"],
          66: [2293, 4, "Risaios"],
          68: [2297, 3, "Taieyos"],
          69: [2298, 2, "Nynaos"],
          70: [2305, 1, "Strintaios"],
          71: [2306, 2, "Lykios"],
          72: [2309, 1, "Ormeutia"],
          74: [2939, 2, "Dekios"],
          75: [2941, 4, "Doumios"],
          77: [2952, 4, "Ildeos"],
          78: [2954, 2, "Eldaos"],
          79: [2956, 4, "Emaetia"],
          80: [2959, 3, "Koodaios"],
          82: [3681, 3, "Houlios"],
          83: [3682, 4, "Styrios"],
          85: [3701, 2, "Suleaos"],
          86: [3702, 3, "Essaos"],
          88: [4369, 2, "Diloios"],
          89: [4370, 3, "Engotia"],
          96: [4947, 2, "Heugyios"],
          97: [4946, 1, "Pauriios"],
        },
        24: {
          2: [5147, 1, "Eretia"],
          3: [5148, 2, "Veretia"],
          4: [5151, 1, "Rheuleos"],
          5: [5152, 2, "Thesyios"],
          7: [4782, 2, "Draoos"],
          8: [4775, 4, "Doinios"],
          9: [4777, 2, "Turuos"],
          10: [4779, 4, "Weynios"],
          11: [4780, 1, "Thriexios"],
          13: [4160, 1, "Choisoos"],
          14: [4161, 2, "Dareyos"],
          21: [2793, 1, "Solios"],
          22: [2794, 2, "Luiwiios"],
          24: [2193, 3, "Dyneuos"],
          25: [2194, 4, "Velios"],
          26: [2186, 3, "Lalios"],
          27: [2187, 4, "Ketheos"],
          30: [1724, 1, "Ereatia"],
          31: [1725, 2, "Clielyios"],
          33: [1728, 1, "Riliaos"],
          34: [1729, 2, "Tiaoutia"],
          35: [1732, 1, "Zumoos"],
          36: [1733, 2, "Chradoios"],
          38: [1253, 1, "Thikaios"],
          39: [1254, 2, "Phyfuos"],
          41: [1266, 4, "Oughetia"],
          42: [1263, 3, "Oldeitia"],
          47: [1274, 4, "Rilootia"],
          48: [1275, 1, "Etotia"],
          50: [1285, 2, "Beluos"],
          51: [1288, 4, "Seukios"],
          56: [1787, 1, "Swialtuos"],
          57: [1790, 4, "Thrudios"],
          58: [1791, 1, "Atietia"],
          60: [1798, 1, "Hohios"],
          61: [1799, 2, "Tucios"],
          62: [1802, 1, "Nynaios"],
          63: [1803, 2, "Whelyos"],
          68: [2295, 4, "Sayhios"],
          69: [2296, 1, "Loidios"],
          70: [2303, 3, "Kifios"],
          71: [2304, 4, "Nalutia"],
          77: [2951, 3, "Luyoios"],
          78: [2953, 1, "Mendoos"],
          79: [2955, 3, "Ightotia"],
          85: [3700, 1, "Crenios"],
          86: [3703, 4, "Whaedios"],
          88: [4367, 4, "Shyaos"],
          89: [4368, 1, "Loeleios"],
          90: [4371, 4, "Queatia"],
          91: [4372, 1, "Jesyos"],
          93: [4384, 4, "Locyos"],
          94: [4386, 2, "Furios"],
          99: [4958, 3, "Diacios"],
          100: [4959, 1, "Honatia"],
        },
        25: {
          1: [5146, 4, "Slasios"],
          2: [5145, 3, "Cluchoios"],
          8: [4774, 3, "Lyeautia"],
          9: [4776, 1, "Veyios"],
          10: [4778, 3, "Fayleios"],
          11: [4781, 2, "Dreijaios"],
          13: [4159, 3, "Drygios"],
          14: [4158, 4, "Treicios"],
          16: [3520, 3, "Radytia"],
          17: [3519, 2, "Skelooos"],
          18: [3518, 1, "Whaesios"],
          20: [2791, 3, "Chaeitia"],
          21: [2792, 4, "Caniios"],
          26: [2184, 1, "Nainios"],
          27: [2185, 2, "Shyoos"],
          29: [1722, 3, "Sipaos"],
          30: [1723, 4, "Schanios"],
          38: [1251, 3, "Kimyos"],
          39: [1252, 4, "Cicios"],
          41: [1257, 1, "Ighteuos"],
          42: [1258, 2, "Clobios"],
          43: [1261, 1, "Soorios"],
          44: [1262, 2, "Undatia"],
          46: [1272, 2, "Nalaitia"],
          47: [1273, 3, "Vesaetia"],
          48: [1276, 2, "Suhoos"],
          50: [1286, 1, "Chroilduos"],
          51: [1287, 3, "Waupios"],
          52: [1289, 1, "Risytia"],
          53: [1292, 3, "Anayos"],
          54: [1298, 1, "Smiemios"],
          56: [1788, 2, "Whoebios"],
          57: [1789, 3, "Lexios"],
          65: [1324, 3, "Hahios"],
          66: [1325, 4, "Saytios"],
          73: [2318, 1, "Hineatia"],
          74: [2319, 4, "Worutia"],
          81: [2960, 2, "Pabiios"],
          82: [2962, 4, "Slayhios"],
          84: [3691, 4, "Poluos"],
          85: [3693, 2, "Blirios"],
          88: [4365, 2, "Tonieos"],
          89: [4366, 3, "Lurios"],
          90: [4373, 2, "Heseios"],
          91: [4374, 3, "Yerayos"],
          93: [4383, 3, "Quarios"],
          94: [4385, 1, "Shyetia"],
          96: [4948, 2, "Troebaios"],
          97: [4950, 4, "Phejyios"],
          98: [4952, 2, "Liadoios"],
          99: [4954, 4, "Ceraios"],
          100: [4956, 2, "Usteitia"],
        },
        26: {
          1: [5144, 2, "Ildyos"],
          2: [5143, 1, "Eteos"],
          4: [4773, 4, "Uskietia"],
          5: [4769, 1, "Chaytia"],
          6: [4770, 4, "Doovios"],
          16: [3516, 1, "Chycios"],
          17: [3515, 4, "Weukios"],
          18: [3517, 3, "Creiqaos"],
          20: [2789, 1, "Llocoios"],
          21: [2790, 2, "Wareatia"],
          23: [2183, 3, "Soehios"],
          24: [2181, 1, "Tulios"],
          29: [1720, 1, "Towaios"],
          30: [1721, 2, "Ormayos"],
          32: [1243, 2, "Rakeitia"],
          33: [1246, 1, "Nadyos"],
          35: [1240, 2, "Pokeios"],
          36: [1241, 1, "Kaluios"],
          38: [1250, 2, "Wheteios"],
          39: [1249, 1, "Omuos"],
          41: [1255, 3, "Achatia"],
          42: [1256, 4, "Wahaos"],
          43: [1259, 3, "Aneuos"],
          44: [1260, 4, "Rasios"],
          46: [1269, 3, "Chritiios"],
          47: [1271, 1, "Quaitia"],
          52: [1290, 2, "Naloos"],
          53: [1291, 4, "Novios"],
          54: [1297, 2, "Vereios"],
          59: [1310, 1, "Veroos"],
          60: [1311, 2, "Peraos"],
          62: [1314, 1, "Noxoos"],
          63: [1315, 2, "Yeighios"],
          64: [1318, 1, "Maendaos"],
          65: [1319, 2, "Chricios"],
          66: [1326, 1, "Taygios"],
          68: [1812, 2, "Dadios"],
          69: [1813, 3, "Rileytia"],
          71: [2310, 3, "Swesios"],
          72: [2313, 2, "Zelios"],
          73: [2314, 3, "Delaytia"],
          74: [2317, 2, "Dayrios"],
          76: [2321, 2, "Dyrreios"],
          77: [2323, 4, "Lusheos"],
          78: [2325, 2, "Whotios"],
          79: [2327, 4, "Zagios"],
          81: [2961, 1, "Lyeuos"],
          82: [2963, 3, "Weunios"],
          84: [3692, 1, "Nyseos"],
          85: [3694, 3, "Sobios"],
          86: [3704, 1, "Kounios"],
          93: [4382, 2, "Breulios"],
          94: [4380, 4, "Rubeios"],
          96: [4949, 3, "Bisios"],
          97: [4951, 1, "Hotios"],
          98: [4953, 3, "Sarios"],
          99: [4955, 1, "Nuifios"],
          100: [4957, 3, "Chaatia"],
        },
        27: {
          4: [4772, 3, "Blalios"],
          5: [4768, 2, "Toudoios"],
          6: [4771, 3, "Shoocios"],
          8: [4157, 2, "Onayos"],
          9: [4156, 1, "Crokios"],
          10: [4151, 4, "Rildiios"],
          11: [4150, 3, "Tewios"],
          12: [4149, 2, "Zhyyios"],
          13: [4148, 1, "Cehyos"],
          15: [3513, 4, "Rouluos"],
          16: [3512, 3, "Miliios"],
          17: [3514, 2, "Achoos"],
          23: [2182, 2, "Woretia"],
          24: [2180, 4, "Fiyios"],
          26: [1718, 2, "Phynaos"],
          27: [1719, 1, "Fusios"],
          32: [1234, 4, "Zhowios"],
          33: [1235, 3, "Sidios"],
          34: [1238, 4, "Ruhoos"],
          35: [1239, 3, "Naysios"],
          36: [1242, 4, "Selios"],
          38: [1247, 3, "Cogiios"],
          39: [1248, 4, "Thonios"],
          46: [1268, 2, "Claesios"],
          47: [1270, 4, "Slyrios"],
          49: [1283, 1, "Stredios"],
          50: [1284, 4, "Briruios"],
          53: [1293, 3, "Hithios"],
          54: [1296, 1, "Geewoos"],
          56: [1302, 3, "Beawoios"],
          57: [1303, 4, "Nyseetia"],
          58: [1306, 3, "Pereytia"],
          59: [1305, 4, "Danios"],
          60: [1309, 3, "Nisiios"],
          62: [1312, 3, "Sigeios"],
          63: [1313, 4, "Kimatia"],
          64: [1316, 3, "Blialuios"],
          65: [1317, 4, "Mosaitia"],
          68: [1810, 4, "Gakios"],
          69: [1811, 1, "Whiagios"],
          71: [2311, 4, "Nyvios"],
          72: [2312, 1, "Cheeos"],
          73: [2315, 4, "Asuos"],
          74: [2316, 1, "Ataetia"],
          76: [2320, 1, "Gaylios"],
          77: [2322, 3, "Yeroeos"],
          78: [2324, 1, "Cesios"],
          79: [2326, 3, "Nekios"],
          81: [2964, 2, "Coyeos"],
          82: [2966, 4, "Llaleos"],
          84: [3695, 4, "Swevaios"],
          85: [3696, 2, "Echeytia"],
          86: [3699, 4, "Ladeos"],
          88: [3706, 3, "Daemiios"],
          89: [3708, 1, "Brylios"],
          90: [3710, 3, "Cahios"],
          91: [3712, 1, "Lleeyios"],
          93: [4381, 1, "Smixios"],
          94: [4379, 3, "Kemios"],
        },
        28: {
          1: [4762, 4, "Finoos"],
          2: [4763, 2, "Ruvyos"],
          5: [4766, 4, "Beinios"],
          6: [4767, 1, "Bocaios"],
          8: [4155, 4, "Brobyos"],
          9: [4154, 3, "Likaios"],
          10: [4153, 2, "Issietia"],
          11: [4152, 1, "Kazoios"],
          12: [4147, 4, "Lissaos"],
          13: [4145, 3, "Denoios"],
          15: [3511, 2, "Swetios"],
          16: [3510, 1, "Keloios"],
          19: [2788, 1, "Lieyios"],
          20: [2786, 2, "Mureos"],
          21: [2787, 3, "Juroios"],
          23: [2179, 3, "Filaios"],
          24: [2177, 1, "Rakoios"],
          26: [1717, 3, "Clizios"],
          27: [1715, 4, "Dopyios"],
          28: [1714, 3, "Zaujios"],
          29: [1711, 4, "Rhoesios"],
          30: [1710, 3, "Taweios"],
          32: [1232, 1, "Yamaios"],
          33: [1233, 2, "Hateutia"],
          34: [1236, 1, "Awutia"],
          35: [1237, 2, "Quouheios"],
          41: [913, 4, "Queootia"],
          42: [912, 2, "Neyios"],
          43: [920, 4, "Kimeutia"],
          44: [922, 3, "Laiyios"],
          49: [1277, 2, "Zhieyios"],
          50: [1280, 3, "Ryneatia"],
          51: [1282, 4, "Quanios"],
          53: [1294, 2, "Namiios"],
          54: [1295, 4, "Shyatia"],
          56: [1300, 1, "Ciessyios"],
          57: [1301, 2, "Saysuos"],
          58: [1304, 1, "Rhenoos"],
          59: [1307, 2, "Asoetia"],
          60: [1308, 1, "Zharios"],
          65: [1320, 3, "Gutios"],
          66: [1323, 2, "Blouseos"],
          68: [1808, 2, "Roohoios"],
          69: [1809, 3, "Schosios"],
          81: [2965, 1, "Keloos"],
          82: [2967, 3, "Hebios"],
          85: [3697, 1, "Tulyios"],
          86: [3698, 3, "Ireos"],
          88: [3705, 2, "Bririos"],
          89: [3707, 4, "Sneesios"],
          90: [3709, 2, "Onieos"],
          91: [3711, 4, "Ceirios"],
          93: [4376, 2, "Endoos"],
          94: [4378, 4, "Chrofiios"],
          96: [4397, 2, "Dojyos"],
          97: [4399, 4, "Phauhyios"],
          99: [4960, 1, "Lenios"],
          100: [4961, 4, "Cleyrios"],
        },
        29: {
          1: [4761, 3, "Quaoutia"],
          2: [4760, 1, "Snoqaos"],
          3: [4758, 4, "Rodeytia"],
          5: [4764, 2, "Lleyios"],
          6: [4765, 3, "Poineios"],
          18: [2782, 2, "Tedoos"],
          19: [2783, 3, "Thraylios"],
          20: [2784, 4, "Riluos"],
          21: [2785, 1, "Honayos"],
          23: [2178, 2, "Lliaruios"],
          24: [2176, 4, "Enaeos"],
          26: [1716, 1, "Leiboios"],
          27: [1713, 2, "Newios"],
          28: [1712, 1, "Tykeos"],
          29: [1709, 2, "Aduos"],
          30: [1708, 1, "Oreos"],
          37: [906, 3, "Noimios"],
          38: [905, 4, "Shufios"],
          40: [910, 2, "Ustoos"],
          41: [909, 1, "Clarios"],
          42: [911, 3, "Onaytia"],
          43: [919, 1, "Imeos"],
          44: [921, 2, "Breroos"],
          46: [638, 3, "Leihios"],
          47: [637, 2, "Rexios"],
          49: [1278, 4, "Rayaetia"],
          50: [1279, 1, "Woreytia"],
          51: [1281, 2, "Runtuos"],
          62: [961, 4, "Rodatia"],
          63: [963, 2, "Pheryos"],
          65: [1321, 4, "Seeseios"],
          66: [1322, 1, "Lleetios"],
          68: [1806, 4, "Urnios"],
          69: [1807, 1, "Kakiios"],
          70: [1816, 2, "Churios"],
          71: [1817, 3, "Kinyos"],
          73: [1829, 2, "Dacios"],
          74: [1827, 1, "Uskiaos"],
          75: [1828, 2, "Tudios"],
          77: [2328, 4, "Deraios"],
          78: [2330, 2, "Ciekyios"],
          79: [2332, 4, "Hechaos"],
          82: [2968, 2, "Mureios"],
          83: [2969, 1, "Omoos"],
          90: [3713, 1, "Stoezios"],
          91: [3714, 3, "Seycuos"],
          93: [4375, 3, "Nihios"],
          94: [4377, 1, "Ilditia"],
          96: [4396, 1, "Enthouos"],
          97: [4398, 3, "Drerroos"],
          99: [4963, 2, "Inaoitia"],
          100: [4962, 3, "Uskaeos"],
        },
        30: {
          2: [4759, 2, "Jiltyios"],
          3: [4757, 3, "Smilios"],
          8: [4143, 2, "Angatia"],
          9: [4142, 1, "Whilios"],
          11: [3509, 4, "Quetaios"],
          12: [3506, 1, "Rodeos"],
          13: [3507, 2, "Smiatoos"],
          15: [2778, 4, "Denuos"],
          16: [2779, 3, "Adaeos"],
          18: [2780, 4, "Inaooos"],
          19: [2781, 1, "Neraios"],
          32: [1224, 2, "Drichuos"],
          33: [1223, 1, "Whebios"],
          35: [902, 4, "Rothoitia"],
          36: [901, 3, "Hainios"],
          37: [904, 1, "Rodyios"],
          38: [903, 2, "Ronios"],
          40: [908, 4, "Nenaos"],
          41: [907, 3, "Loutuios"],
          46: [635, 4, "Quowios"],
          47: [636, 1, "Rieteios"],
          53: [937, 1, "Rehios"],
          54: [938, 3, "Treiluos"],
          56: [940, 4, "Clicuios"],
          57: [942, 2, "Strilteios"],
          59: [951, 2, "Moroetia"],
          60: [950, 4, "Linaios"],
          62: [960, 3, "Kupios"],
          63: [962, 1, "Ereos"],
          70: [1814, 4, "Lyeayos"],
          71: [1815, 1, "Issieos"],
          73: [2294, 4, "Zeunoios"],
          74: [1825, 3, "Tonatia"],
          75: [1826, 4, "Shyrios"],
          77: [2329, 1, "Kimaos"],
          78: [2331, 3, "Iaeetia"],
          79: [2333, 1, "Phessuos"],
          80: [2340, 4, "Anutia"],
          82: [2971, 3, "Ledyios"],
          83: [2972, 4, "Rocios"],
          85: [2980, 4, "Tiaeetia"],
          86: [2982, 2, "Troneios"],
          87: [2987, 1, "Rifios"],
          88: [2989, 3, "Wareos"],
          96: [4393, 2, "Chrumuios"],
          97: [4395, 4, "Hinetia"],
          99: [4964, 1, "Musuios"],
          100: [4965, 4, "Patiios"],
        },
        31: {
          2: [4755, 1, "Phopios"],
          3: [4752, 4, "Whetios"],
          5: [4144, 2, "Cihios"],
          6: [4139, 4, "Tryltaios"],
          7: [4138, 1, "Lorytia"],
          8: [4140, 3, "Scheinios"],
          9: [4141, 4, "Undauos"],
          11: [3508, 2, "Endayos"],
          12: [3504, 3, "Aldauos"],
          13: [3505, 4, "Chorios"],
          15: [2777, 2, "Shunios"],
          16: [2776, 1, "Imayos"],
          21: [2171, 3, "Zorios"],
          22: [2169, 1, "Tiautia"],
          23: [2167, 3, "Thouhios"],
          24: [2165, 1, "Quoudios"],
          26: [1707, 4, "Beimyos"],
          27: [1706, 3, "Thrauzoos"],
          29: [1231, 1, "Recios"],
          30: [1229, 4, "Sossyos"],
          31: [1227, 3, "Neyduos"],
          32: [1225, 4, "Veuweos"],
          33: [1222, 3, "Quaeeos"],
          35: [900, 2, "Whassios"],
          36: [899, 1, "Clecios"],
          43: [622, 2, "Gacios"],
          44: [623, 4, "Enytia"],
          47: [634, 3, "Arditia"],
          48: [633, 2, "Kelios"],
          49: [632, 1, "Gapios"],
          51: [932, 4, "Osutia"],
          52: [934, 1, "Onetia"],
          53: [936, 4, "Trafiios"],
          54: [939, 2, "Skelutia"],
          56: [941, 1, "Kelytia"],
          57: [943, 3, "Imaos"],
          58: [944, 4, "Surios"],
          59: [947, 3, "Reimyios"],
          60: [949, 1, "Shoedyos"],
          62: [953, 4, "Iaetia"],
          63: [955, 2, "Quesaios"],
          64: [957, 4, "Houjios"],
          65: [959, 2, "Anytia"],
          67: [1327, 3, "Tyseios"],
          68: [1330, 2, "Traguos"],
          73: [1824, 2, "Queesaios"],
          74: [1823, 1, "Mokios"],
          79: [2334, 2, "Nosios"],
          80: [2335, 3, "Iseetia"],
          82: [2973, 1, "Kaleutia"],
          83: [2974, 2, "Zodios"],
          85: [2979, 1, "Smerios"],
          86: [2981, 3, "Sameetia"],
          87: [2986, 4, "Boshuios"],
          88: [2988, 2, "Schezios"],
          90: [3715, 4, "Vesyos"],
          91: [3717, 2, "Meydeios"],
          92: [3725, 1, "Phayfios"],
          94: [4387, 3, "Denutia"],
          95: [4389, 2, "Waritia"],
          96: [4392, 1, "Blildiios"],
          97: [4394, 3, "Jyvios"],
          99: [4967, 2, "Untotia"],
          100: [4966, 3, "Rafaios"],
        },
        32: {
          2: [4756, 2, "Strayyios"],
          3: [4751, 3, "Sweedios"],
          5: [4136, 1, "Shazyos"],
          6: [4135, 3, "Chrynios"],
          7: [4137, 2, "Chrywios"],
          12: [3502, 1, "Dyneyos"],
          13: [3503, 2, "Elmaytia"],
          15: [2772, 3, "Drauitia"],
          16: [2773, 4, "Inaitia"],
          17: [2775, 3, "Wesios"],
          19: [2174, 2, "Nesuos"],
          20: [2172, 4, "Osotia"],
          21: [2170, 2, "Stonyios"],
          22: [2168, 4, "Deehios"],
          23: [2166, 2, "Kelyos"],
          24: [2164, 4, "Sayxios"],
          26: [1704, 1, "Dealios"],
          27: [1705, 2, "Piciios"],
          29: [1230, 3, "Oughyos"],
          30: [1228, 2, "Rookios"],
          31: [1226, 1, "Clocoos"],
          32: [1221, 2, "Dreakios"],
          33: [1220, 1, "Syfios"],
          35: [898, 4, "Inaaios"],
          36: [897, 3, "Awaios"],
          38: [608, 1, "Enoutia"],
          39: [609, 2, "Doraos"],
          40: [614, 4, "Sauriios"],
          41: [616, 2, "Rynoos"],
          43: [621, 1, "Iauos"],
          44: [624, 3, "Phoimios"],
          45: [626, 2, "Saerios"],
          47: [629, 2, "Whoiseios"],
          48: [630, 3, "Raditia"],
          49: [631, 4, "Tineatia"],
          51: [931, 3, "Lainios"],
          52: [933, 2, "Worauos"],
          53: [935, 3, "Ralaos"],
          58: [945, 1, "Treytios"],
          59: [946, 2, "Ingaos"],
          60: [948, 4, "Leebios"],
          62: [952, 3, "Ustauos"],
          63: [954, 1, "Saulios"],
          64: [956, 3, "Stuisios"],
          65: [958, 1, "Ightiatia"],
          67: [1328, 4, "Javios"],
          68: [1329, 1, "Cuiwios"],
          69: [1331, 3, "Lavios"],
          70: [1334, 2, "Swoovyos"],
          72: [1820, 2, "Reuxios"],
          73: [1821, 3, "Hiassuios"],
          74: [1822, 4, "Shaedios"],
          76: [1840, 4, "Slunios"],
          77: [1841, 1, "Thausios"],
          79: [2336, 4, "Neveos"],
          80: [2337, 1, "Bytoios"],
          85: [2976, 2, "Gussaos"],
          86: [2978, 4, "Kinoos"],
          90: [3716, 1, "Oldouos"],
          91: [3718, 3, "Isseyos"],
          92: [3726, 4, "Vodios"],
          94: [4390, 1, "Criejios"],
          95: [4391, 4, "Gokios"],
        },
        33: {
          5: [4134, 4, "Tutyios"],
          6: [4133, 2, "Zhesuios"],
          9: [3501, 3, "Sosios"],
          10: [3500, 4, "Nenduos"],
          15: [2770, 1, "Kelaytia"],
          16: [2771, 2, "Besios"],
          17: [2774, 1, "Garauos"],
          19: [2175, 3, "Seicaos"],
          20: [2173, 1, "Bysios"],
          26: [1703, 4, "Emuitia"],
          27: [1702, 3, "Ildatia"],
          32: [1218, 3, "Yurios"],
          33: [1219, 4, "Taioos"],
          35: [896, 2, "Paisaios"],
          36: [895, 1, "Lyeios"],
          38: [606, 3, "Reicios"],
          39: [607, 4, "Peryos"],
          40: [610, 3, "Ildaos"],
          41: [615, 1, "Yeusios"],
          43: [618, 2, "Bontaos"],
          44: [620, 4, "Rekoios"],
          45: [625, 1, "Ingatia"],
          47: [627, 4, "Slauniios"],
          48: [628, 1, "Brairaos"],
          55: [397, 4, "Coneios"],
          56: [396, 2, "Naleatia"],
          69: [1332, 4, "Whullios"],
          70: [1333, 1, "Ghaauos"],
          72: [1818, 4, "Jolios"],
          73: [1819, 1, "Piabios"],
          76: [1839, 3, "Clofios"],
          77: [1842, 2, "Stunoios"],
          79: [2338, 2, "Hatyos"],
          80: [2339, 3, "Naukios"],
          82: [2341, 3, "Swoujios"],
          83: [2343, 1, "Tasotia"],
          85: [2975, 1, "Traitios"],
          86: [2977, 3, "Sipios"],
          87: [2984, 2, "Yoiguios"],
          89: [3723, 4, "Rothaetia"],
          90: [3721, 2, "Cesaios"],
          91: [3719, 4, "Tefios"],
          97: [4407, 2, "Divyios"],
          98: [4408, 3, "Loruitia"],
        },
        34: {
          2: [4131, 1, "Quevios"],
          3: [4130, 4, "Blemios"],
          8: [3497, 4, "Judoios"],
          9: [3498, 1, "Snuxios"],
          10: [3499, 2, "Teelios"],
          12: [2768, 3, "Raneios"],
          13: [2769, 1, "Zhibaios"],
          22: [2163, 1, "Kimuios"],
          23: [2162, 4, "Snoinios"],
          25: [1699, 4, "Woroutia"],
          26: [1700, 1, "Ladyos"],
          27: [1701, 2, "Osetia"],
          29: [1216, 4, "Wuitios"],
          30: [1217, 1, "Quousios"],
          43: [617, 1, "Vairaios"],
          44: [619, 3, "Ustitia"],
          50: [385, 1, "Crecaios"],
          51: [384, 2, "Lahios"],
          53: [395, 1, "Aroitia"],
          54: [394, 3, "Viyios"],
          55: [393, 1, "Sifios"],
          56: [392, 3, "Scheyreos"],
          58: [399, 2, "Queutia"],
          59: [401, 4, "Snoilios"],
          60: [412, 1, "Daihios"],
          61: [415, 4, "Yaybeos"],
          63: [655, 2, "Chreivuos"],
          64: [656, 3, "Kerios"],
          66: [964, 3, "Waraos"],
          67: [967, 2, "Roopaios"],
          75: [1832, 4, "Babios"],
          76: [1835, 1, "Draaos"],
          82: [2342, 4, "Strucios"],
          83: [2344, 2, "Ingeitia"],
          86: [2983, 4, "Kaihios"],
          87: [2985, 1, "Lotios"],
          89: [3724, 1, "Taucios"],
          90: [3722, 3, "Sneylios"],
          91: [3720, 1, "Thannios"],
          93: [3727, 4, "Brustoos"],
          94: [3729, 2, "Broriios"],
          96: [4404, 3, "Tayyos"],
          97: [4405, 4, "Sucoos"],
          98: [4406, 1, "Quaesios"],
        },
        35: {
          2: [4132, 2, "Enthoitia"],
          3: [4129, 3, "Rakaios"],
          4: [4127, 1, "Rhoigoios"],
          5: [4128, 2, "Estaos"],
          7: [3496, 3, "Omeos"],
          8: [3495, 2, "Blailios"],
          12: [2763, 2, "Moosios"],
          13: [2761, 4, "Criebios"],
          14: [2759, 2, "Kucoios"],
          15: [2757, 4, "Blygios"],
          17: [2755, 4, "Chroirdeos"],
          18: [2753, 1, "Hateitia"],
          20: [2158, 4, "Clidios"],
          21: [2159, 1, "Crizios"],
          22: [2160, 2, "Creziios"],
          23: [2161, 3, "Zinios"],
          25: [1698, 3, "Stofios"],
          26: [1697, 2, "Nysayos"],
          29: [1215, 3, "Dustoos"],
          30: [1214, 2, "Ageeios"],
          32: [890, 1, "Ageoutia"],
          33: [889, 4, "Tantuios"],
          34: [892, 3, "Sholios"],
          35: [894, 1, "Entheetia"],
          37: [604, 4, "Kimayos"],
          38: [605, 1, "Lauroos"],
          40: [366, 1, "Lyeotia"],
          41: [367, 2, "Trauviios"],
          46: [375, 4, "Ranooos"],
          47: [376, 2, "Trianios"],
          49: [380, 3, "Samiatia"],
          50: [381, 4, "Beumios"],
          51: [383, 3, "Tezios"],
          53: [388, 2, "Vazeos"],
          54: [389, 4, "Chelios"],
          55: [390, 2, "Zhanios"],
          56: [391, 4, "Nuibios"],
          58: [398, 1, "Sloxeos"],
          59: [400, 3, "Laetios"],
          60: [413, 2, "Covios"],
          61: [414, 3, "Cheyos"],
          63: [652, 4, "Rhaudios"],
          64: [653, 1, "Roesios"],
          66: [965, 4, "Schokaios"],
          67: [966, 1, "Emeitia"],
          68: [970, 3, "Meikaios"],
          70: [1335, 1, "Bayhios"],
          71: [1337, 3, "Tasyos"],
          72: [1399, 1, "Vesieos"],
          73: [1401, 3, "Leyvios"],
          75: [1833, 2, "Essetia"],
          76: [1834, 3, "Rouzios"],
          77: [1838, 2, "Snafios"],
          79: [1843, 2, "Naruios"],
          80: [1845, 4, "Eldyos"],
          83: [2345, 3, "Toreeos"],
          84: [2347, 1, "Nuchoios"],
          93: [3728, 1, "Wareios"],
          94: [3730, 3, "Rakios"],
          96: [4402, 1, "Thryzios"],
          97: [4403, 2, "Jaekeios"],
        },
        36: {
          4: [4126, 4, "Sesios"],
          5: [4125, 3, "Tekios"],
          7: [3494, 1, "Quuwios"],
          8: [3493, 4, "Chisios"],
          10: [2766, 1, "Taetios"],
          11: [2764, 3, "Zhesaos"],
          12: [2762, 1, "Echeitia"],
          13: [2760, 3, "Ninoos"],
          14: [2758, 1, "Aughaitia"],
          15: [2756, 3, "Kucios"],
          17: [2754, 3, "Eneitia"],
          18: [2752, 2, "Lijios"],
          20: [2156, 2, "Engyos"],
          21: [2157, 3, "Burutia"],
          28: [1213, 1, "Honetia"],
          29: [1212, 4, "Nyouos"],
          32: [888, 3, "Clauzaios"],
          33: [887, 2, "Joisios"],
          34: [891, 4, "Deneios"],
          35: [893, 2, "Duneios"],
          37: [597, 3, "Emuios"],
          38: [596, 2, "Reerios"],
          40: [365, 3, "Urneos"],
          41: [363, 4, "Doruios"],
          42: [364, 3, "Quayios"],
          44: [372, 1, "Zilios"],
          45: [373, 2, "Shyroos"],
          46: [374, 3, "Yeebiios"],
          47: [377, 1, "Romios"],
          49: [378, 1, "Coogeios"],
          50: [379, 2, "Scheykios"],
          51: [382, 1, "Shobaios"],
          53: [386, 1, "Eldios"],
          54: [387, 3, "Chramaos"],
          63: [650, 3, "Echoos"],
          64: [654, 2, "Thrygios"],
          67: [968, 2, "Echaetia"],
          68: [969, 4, "Crohios"],
          70: [1336, 2, "Estietia"],
          71: [1338, 4, "Scholoios"],
          72: [1400, 2, "Skelytia"],
          73: [1402, 4, "Naseios"],
          76: [1836, 4, "Enthietia"],
          77: [1837, 1, "Asayos"],
          79: [1844, 1, "Ceihoos"],
          80: [1846, 3, "Belutia"],
          81: [1851, 1, "Phaiwios"],
          83: [2346, 4, "Stristoios"],
          84: [2348, 2, "Roreos"],
          86: [2990, 3, "Kawaios"],
          87: [2992, 2, "Sanoios"],
          88: [2994, 3, "Lerios"],
          89: [2996, 1, "Necios"],
          90: [2998, 4, "Drycios"],
          92: [3733, 2, "Onoos"],
          93: [3731, 4, "Loikios"],
          94: [3735, 2, "Smewios"],
          96: [4400, 3, "Ingyos"],
          97: [4401, 4, "Jodios"],
          99: [4425, 3, "Brikyios"],
          100: [4426, 4, "Oneos"],
        },
        37: {
          1: [4746, 2, "Werios"],
          2: [4745, 4, "Nysaos"],
          4: [4124, 2, "Loretia"],
          5: [4123, 1, "Llamios"],
          7: [3492, 3, "Laelios"],
          8: [3491, 2, "Estyos"],
          10: [2767, 2, "Wootios"],
          11: [2765, 4, "Acheytia"],
          17: [2751, 1, "Foifios"],
          18: [2750, 4, "Eldooos"],
          20: [2154, 4, "Ustoeos"],
          21: [2155, 1, "Bothuos"],
          23: [1696, 4, "Taiuos"],
          24: [1694, 2, "Lienios"],
          25: [1692, 4, "Undoios"],
          26: [1690, 2, "Riloitia"],
          28: [1210, 3, "Atotia"],
          29: [1211, 2, "Iteitia"],
          31: [886, 1, "Enthooos"],
          32: [885, 4, "Lopaios"],
          37: [595, 1, "Gyrios"],
          38: [594, 4, "Delytia"],
          41: [362, 1, "Swoyuos"],
          42: [361, 2, "Adaytia"],
          44: [371, 4, "Noupeios"],
          45: [370, 3, "Lodios"],
          56: [204, 2, "Chrosios"],
          57: [205, 1, "Feraos"],
          59: [416, 2, "Stroerdoios"],
          60: [418, 1, "Brarios"],
          62: [639, 3, "Rosios"],
          63: [641, 1, "Iseos"],
          64: [647, 4, "Jastaos"],
          65: [648, 1, "Hekyos"],
          67: [971, 3, "Bukios"],
          68: [972, 1, "Strifios"],
          73: [1403, 1, "Leukaos"],
          74: [1405, 2, "Chroeyiios"],
          79: [1847, 2, "Rubuos"],
          80: [1849, 4, "Sinios"],
          81: [1852, 2, "Reizios"],
          86: [2991, 4, "Kunnoos"],
          87: [2993, 1, "Aweos"],
          88: [2995, 4, "Ustootia"],
          89: [2997, 2, "Drayos"],
          90: [2999, 3, "Yoidios"],
          92: [3734, 3, "Reldaios"],
          93: [3732, 1, "Aweatia"],
          99: [4423, 1, "Llauvaos"],
          100: [4424, 2, "Deneetia"],
        },
        38: {
          1: [4744, 3, "Zaceios"],
          2: [4742, 1, "Chrufios"],
          7: [3490, 1, "Rusuos"],
          8: [3489, 4, "Viaxios"],
          13: [2744, 3, "Smeahios"],
          14: [2742, 2, "Nucios"],
          16: [2747, 1, "Snasuos"],
          17: [2748, 2, "Beyios"],
          18: [2749, 3, "Lyeaetia"],
          20: [2152, 2, "Chrooxios"],
          21: [2153, 3, "Nenios"],
          23: [1695, 3, "Queauos"],
          24: [1693, 1, "Rynoitia"],
          25: [1691, 3, "Woraos"],
          26: [1689, 1, "Leutios"],
          31: [884, 3, "Deleitia"],
          32: [883, 2, "Moseos"],
          34: [603, 1, "Hinootia"],
          35: [600, 2, "Shyiaos"],
          36: [598, 4, "Hatieos"],
          37: [593, 3, "Ducaios"],
          38: [592, 2, "Vymios"],
          40: [358, 2, "Zhaisios"],
          41: [357, 3, "Adoeos"],
          42: [360, 4, "Urnoitia"],
          44: [368, 1, "Dribios"],
          45: [369, 2, "Rileos"],
          47: [177, 4, "Dihios"],
          48: [178, 2, "Chaios"],
          49: [181, 4, "Striwios"],
          50: [182, 3, "Typios"],
          51: [183, 1, "Slertoos"],
          52: [185, 3, "Inaytia"],
          54: [188, 4, "Cherios"],
          55: [189, 1, "Reduos"],
          56: [203, 3, "Noibios"],
          57: [206, 4, "Dofios"],
          59: [417, 3, "Diwios"],
          60: [419, 4, "Smeyckoios"],
          62: [640, 4, "Hinatia"],
          63: [642, 2, "Aldiaos"],
          64: [643, 3, "Smounios"],
          65: [649, 2, "Asatia"],
          67: [973, 4, "Toryos"],
          68: [976, 2, "Tasoetia"],
          70: [1407, 1, "Awitia"],
          71: [1409, 3, "Caldaios"],
          73: [1404, 4, "Zudios"],
          74: [1406, 3, "Sleiguos"],
          76: [1418, 3, "Aseutia"],
          77: [1420, 1, "Hatootia"],
          83: [2349, 3, "Kaiyios"],
          84: [2351, 2, "Isitia"],
          95: [3745, 3, "Crisios"],
          96: [3746, 2, "Trouthaios"],
          98: [4421, 3, "Sulietia"],
          99: [4422, 4, "Aldetia"],
        },
        39: {
          1: [4743, 2, "Omitia"],
          2: [4741, 4, "Bleufios"],
          4: [4118, 1, "Hucios"],
          5: [4119, 4, "Sereaos"],
          10: [3482, 3, "Ruwios"],
          11: [3481, 1, "Nazoos"],
          13: [2743, 1, "Imotia"],
          14: [2741, 4, "Yiesaios"],
          16: [2745, 3, "Tanaytia"],
          17: [2746, 4, "Teciios"],
          28: [1208, 2, "Teinios"],
          29: [1207, 1, "Estios"],
          31: [882, 1, "Quaoeos"],
          32: [881, 4, "Zhydios"],
          34: [602, 4, "Goonoos"],
          35: [601, 3, "Koseos"],
          37: [591, 1, "Wybios"],
          38: [590, 4, "Oughatia"],
          40: [355, 4, "Oughauos"],
          41: [356, 1, "Taroos"],
          42: [359, 2, "Miluos"],
          47: [175, 1, "Phuifeios"],
          48: [176, 3, "Detios"],
          49: [179, 1, "Naleuos"],
          50: [180, 2, "Shertios"],
          51: [184, 4, "Brilios"],
          52: [186, 2, "Slameios"],
          54: [187, 3, "Ziwios"],
          55: [190, 2, "Tinaeos"],
          60: [420, 2, "Ildutia"],
          67: [974, 1, "Ormutia"],
          68: [975, 3, "Skeloitia"],
          70: [1408, 2, "Streardeos"],
          71: [1410, 4, "Joneos"],
          76: [1419, 4, "Nalotia"],
          77: [1421, 2, "Snurios"],
          79: [1853, 1, "Endeos"],
          80: [1855, 2, "Hyckiios"],
          81: [1857, 1, "Yysios"],
          83: [2350, 1, "Belytia"],
          84: [2352, 4, "Zokios"],
          85: [2356, 2, "Kymuios"],
          87: [3e3, 2, "Itetia"],
          88: [3002, 1, "Chraybios"],
          89: [3006, 4, "Whasyios"],
          91: [3736, 1, "Beletia"],
          92: [3738, 3, "Mapios"],
          93: [3740, 1, "Naevyos"],
          94: [3742, 3, "Tufios"],
          95: [3744, 1, "Troreios"],
          96: [3747, 4, "Rixios"],
          98: [4419, 1, "Shiwuos"],
          99: [4420, 2, "Naunios"],
        },
        40: {
          1: [4740, 3, "Risoeos"],
          2: [4738, 1, "Delooos"],
          4: [4116, 3, "Quaeos"],
          5: [4117, 2, "Ziaxios"],
          7: [3488, 2, "Unteos"],
          8: [3486, 4, "Foeraios"],
          9: [3484, 2, "Luidios"],
          10: [3480, 4, "Turutia"],
          11: [3478, 2, "Neequios"],
          13: [2740, 3, "Kalios"],
          14: [2739, 2, "Japios"],
          19: [2150, 4, "Tanoos"],
          20: [2149, 3, "Jixaos"],
          21: [2148, 2, "Smofeios"],
          23: [1688, 2, "Daejios"],
          24: [1687, 4, "Skeleatia"],
          25: [1686, 2, "Rynatia"],
          27: [1209, 4, "Inauos"],
          28: [1205, 3, "Dickiios"],
          29: [1206, 4, "Bubuios"],
          44: [172, 3, "Kalaios"],
          45: [171, 2, "Blutios"],
          57: [213, 1, "Nyruios"],
          58: [212, 2, "Umitia"],
          60: [421, 1, "Leaxios"],
          61: [422, 3, "Nimaios"],
          62: [423, 2, "Iaitia"],
          64: [657, 4, "Havios"],
          65: [659, 2, "Cheytia"],
          71: [1411, 1, "Erautia"],
          72: [1412, 2, "Tanios"],
          73: [1414, 3, "Cefios"],
          74: [1416, 1, "Geyrios"],
          76: [1422, 3, "Phihios"],
          77: [1424, 1, "Fandyios"],
          79: [1854, 3, "Rharios"],
          80: [1856, 4, "Vesetia"],
          81: [1858, 3, "Serios"],
          83: [2353, 3, "Aldeos"],
          84: [2354, 2, "Strepios"],
          85: [2355, 1, "Rayatia"],
          87: [3001, 4, "Struqiios"],
          88: [3003, 3, "Yaytios"],
          89: [3007, 2, "Gekoos"],
          91: [3737, 2, "Sametia"],
          92: [3739, 4, "Vevios"],
          93: [3741, 2, "Nalayos"],
          94: [3743, 4, "Rilauos"],
        },
        41: {
          1: [4739, 2, "Smaykaios"],
          2: [4736, 4, "Gowios"],
          4: [4115, 1, "Namios"],
          5: [4114, 4, "Entheos"],
          7: [3487, 1, "Tureaos"],
          8: [3485, 3, "Oseatia"],
          9: [3483, 1, "Geevios"],
          10: [3479, 3, "Cilios"],
          11: [3477, 1, "Essoios"],
          13: [2737, 4, "Zheinios"],
          14: [2738, 1, "Awaos"],
          16: [2723, 2, "Kalietia"],
          17: [2722, 1, "Thadeios"],
          19: [2151, 2, "Banaetia"],
          20: [2147, 1, "Ightatia"],
          21: [2146, 4, "Womios"],
          23: [1683, 3, "Areytia"],
          24: [1684, 1, "Radutia"],
          25: [1685, 3, "Usteos"],
          27: [1204, 2, "Taiutia"],
          28: [1203, 1, "Tureyos"],
          31: [880, 3, "Kaletia"],
          32: [879, 1, "Sayyos"],
          34: [588, 2, "Omaios"],
          35: [587, 3, "Deltoios"],
          36: [584, 2, "Dynoios"],
          37: [585, 3, "Ludios"],
          39: [353, 1, "Asuios"],
          40: [352, 3, "Sneivios"],
          42: [174, 2, "Whoocios"],
          43: [168, 1, "Daetios"],
          44: [169, 4, "Blafios"],
          45: [170, 1, "Nimoios"],
          47: [80, 3, "Cereitia"],
          48: [79, 2, "Essuos"],
          50: [82, 3, "Untuios"],
          51: [84, 1, "Shasoos"],
          53: [91, 3, "Fiesoios"],
          54: [90, 1, "Zisios"],
          56: [207, 4, "Rinios"],
          57: [210, 3, "Roeghoios"],
          58: [211, 4, "Tyqiios"],
          61: [425, 4, "Rhotios"],
          62: [424, 1, "Onauos"],
          64: [658, 1, "Isaios"],
          65: [660, 3, "Novuos"],
          66: [661, 4, "Voreos"],
          68: [977, 2, "Braltuos"],
          69: [979, 1, "Ryfuios"],
          72: [1413, 1, "Dynouos"],
          73: [1415, 4, "Tanayos"],
          74: [1417, 2, "Yyhaios"],
          76: [1423, 4, "Rulios"],
          77: [1425, 2, "Engutia"],
          80: [1859, 2, "Thosiios"],
          81: [1860, 1, "Uskutia"],
          87: [3004, 2, "Moudios"],
          88: [3005, 1, "Ardaeos"],
          93: [3748, 3, "Throhios"],
          94: [3749, 1, "Pereos"],
          96: [4409, 1, "Swariios"],
          97: [4411, 3, "Stoullaios"],
          98: [4413, 1, "Undayos"],
          99: [4415, 3, "Nysuos"],
        },
        42: {
          4: [4113, 2, "Strarios"],
          5: [4111, 3, "Kekios"],
          16: [2724, 3, "Undieos"],
          17: [2721, 4, "Foegios"],
          20: [2145, 3, "Leerios"],
          21: [2144, 2, "Schainduos"],
          23: [1682, 4, "Chroelaos"],
          24: [1681, 2, "Huigios"],
          27: [1201, 3, "Damios"],
          28: [1202, 4, "Galios"],
          30: [876, 1, "Aleaios"],
          31: [877, 4, "Oldeetia"],
          32: [878, 2, "Hataios"],
          34: [589, 1, "Gesios"],
          35: [586, 4, "Adyos"],
          36: [583, 1, "Kenaos"],
          37: [582, 4, "Rilautia"],
          39: [354, 4, "Lluboos"],
          40: [351, 2, "Vaitaos"],
          42: [173, 4, "Vohios"],
          43: [167, 3, "Sealoios"],
          44: [166, 2, "Stroelios"],
          47: [77, 4, "Ghauios"],
          48: [78, 1, "Schoirios"],
          50: [81, 2, "Rotheaos"],
          51: [83, 4, "Kimoos"],
          52: [86, 2, "Schupios"],
          53: [88, 4, "Sulouos"],
          54: [89, 2, "Elmetia"],
          56: [208, 1, "Thofios"],
          57: [209, 2, "Llaydios"],
          58: [214, 1, "Swytios"],
          59: [217, 2, "Bejios"],
          65: [664, 2, "Deleutia"],
          66: [663, 1, "Chavios"],
          68: [978, 4, "Oldeuos"],
          69: [980, 3, "Ghaoos"],
          70: [987, 2, "Doltiios"],
          76: [1426, 3, "Sailaos"],
          77: [1428, 1, "Chaauos"],
          78: [1430, 3, "Hatuios"],
          80: [1861, 4, "Erytia"],
          81: [1862, 3, "Dynitia"],
          82: [1865, 4, "Rhysios"],
          84: [2358, 4, "Cloeheos"],
          85: [2359, 1, "Adatia"],
          90: [3035, 4, "Triruos"],
          91: [3036, 1, "Troesios"],
          96: [4410, 2, "Jouraos"],
          97: [4412, 4, "Jemaios"],
          98: [4414, 2, "Lonios"],
          99: [4416, 4, "Eldoios"],
        },
        43: {
          3: [4122, 1, "Sneeroios"],
          4: [4112, 4, "Faehios"],
          5: [4110, 1, "Vereyos"],
          7: [3476, 2, "Crisaios"],
          8: [3468, 1, "Smodios"],
          9: [3466, 4, "Adaos"],
          11: [2734, 2, "Keavios"],
          12: [2731, 1, "Slusios"],
          13: [2730, 2, "Poeyyios"],
          14: [2729, 1, "Girios"],
          17: [2720, 3, "Rhugios"],
          18: [2719, 2, "Fialios"],
          20: [2143, 1, "Snisios"],
          21: [2142, 4, "Honytia"],
          26: [1200, 2, "Cibuios"],
          27: [1199, 1, "Esteyos"],
          30: [875, 2, "Coghoos"],
          31: [874, 3, "Achytia"],
          36: [580, 2, "Endotia"],
          37: [581, 3, "Beehoios"],
          39: [350, 3, "Teyfios"],
          40: [349, 1, "Molios"],
          46: [76, 1, "Slumios"],
          47: [75, 2, "Tareios"],
          52: [85, 1, "Oldios"],
          53: [87, 3, "Creyios"],
          58: [215, 3, "Clydios"],
          59: [216, 4, "Angeytia"],
          60: [220, 1, "Sootios"],
          62: [426, 2, "Syrtaios"],
          63: [428, 4, "Lietios"],
          65: [665, 3, "Branios"],
          66: [666, 4, "Ticios"],
          68: [981, 2, "Hiasiios"],
          69: [982, 1, "Threrrios"],
          70: [983, 4, "Eniatia"],
          71: [985, 3, "Etitia"],
          73: [991, 3, "Remios"],
          74: [993, 1, "Ateatia"],
          76: [1427, 4, "Denytia"],
          77: [1429, 2, "Isseuos"],
          78: [1431, 4, "Vabaios"],
          80: [1863, 2, "Aldoitia"],
          81: [1864, 1, "Sluviios"],
          82: [1866, 2, "Sebios"],
          84: [2360, 2, "Tiaayos"],
          85: [2361, 3, "Phiyaios"],
          87: [3008, 4, "Ceritia"],
          88: [3010, 3, "Nubuos"],
          89: [3012, 4, "Iroitia"],
          90: [3034, 3, "Pereutia"],
          91: [3037, 2, "Irotia"],
          93: [3750, 1, "Worytia"],
          94: [3752, 3, "Ruilios"],
          97: [4417, 1, "Sacyios"],
          98: [4418, 3, "Swisios"],
        },
        44: {
          3: [4121, 2, "Untios"],
          4: [4120, 3, "Nayvios"],
          7: [3471, 4, "Nuyiios"],
          8: [3467, 3, "Roonios"],
          9: [3465, 2, "Angoos"],
          11: [2733, 3, "Enitia"],
          12: [2732, 4, "Tydios"],
          13: [2728, 3, "Slaunuios"],
          14: [2726, 4, "Hidios"],
          16: [2716, 3, "Cheutia"],
          17: [2717, 4, "Rodaeos"],
          18: [2718, 1, "Honoos"],
          20: [2141, 3, "Kusyios"],
          21: [2140, 2, "Rydyios"],
          23: [1679, 4, "Ardaos"],
          24: [1680, 1, "Cerauos"],
          26: [1197, 3, "Llorreos"],
          27: [1198, 4, "Taepios"],
          29: [871, 1, "Ranaytia"],
          30: [872, 4, "Lyeaytia"],
          31: [873, 1, "Rayetia"],
          33: [578, 2, "Eldeos"],
          34: [579, 3, "Tiaaos"],
          39: [347, 2, "Hicaios"],
          40: [348, 4, "Ranuitia"],
          42: [164, 2, "Voigios"],
          43: [163, 1, "Chadoios"],
          45: [72, 3, "Zhexios"],
          46: [73, 4, "Depuios"],
          47: [74, 3, "Shaymios"],
          49: [29, 3, "Ireaos"],
          50: [27, 1, "Peelios"],
          55: [92, 4, "Zenniios"],
          56: [95, 3, "Taiiatia"],
          59: [218, 2, "Cheoeos"],
          60: [219, 3, "Wildoios"],
          62: [427, 1, "Faelaios"],
          63: [429, 3, "Smofios"],
          69: [990, 3, "Woroitia"],
          70: [984, 2, "Ceameios"],
          71: [986, 1, "Zaukios"],
          73: [992, 4, "Cryriios"],
          74: [994, 2, "Worios"],
          84: [2362, 4, "Toruos"],
          85: [2363, 1, "Nyyos"],
          87: [3009, 2, "Taieeos"],
          88: [3011, 1, "Looqeios"],
          89: [3013, 2, "Hycoos"],
          90: [3038, 1, "Rodoetia"],
          93: [3751, 2, "Roditia"],
          94: [3753, 4, "Belatia"],
          95: [3758, 1, "Tiaitia"],
        },
        45: {
          6: [3475, 2, "Tedios"],
          7: [3470, 1, "Toneaos"],
          8: [3469, 2, "Paymaios"],
          13: [2727, 1, "Queytia"],
          14: [2725, 2, "Tiauios"],
          16: [2714, 1, "Quymoos"],
          17: [2715, 2, "Sulatia"],
          23: [1678, 2, "Moemios"],
          24: [1677, 3, "Jocios"],
          29: [870, 3, "Ustautia"],
          30: [869, 2, "Atytia"],
          33: [577, 4, "Dianios"],
          34: [576, 1, "Moraos"],
          36: [346, 3, "Nenaios"],
          37: [344, 1, "Cuhyios"],
          42: [162, 4, "Janios"],
          43: [161, 3, "Smibios"],
          45: [71, 2, "Phiyios"],
          46: [70, 1, "Lootios"],
          49: [28, 2, "Kiyaios"],
          50: [26, 4, "Veseaos"],
          52: [34, 2, "Thromios"],
          53: [35, 1, "Rixyos"],
          55: [93, 2, "Onaos"],
          56: [94, 1, "Thuluios"],
          57: [96, 2, "Darotia"],
          63: [430, 2, "Mibeos"],
          64: [431, 1, "Pesios"],
          66: [667, 2, "Rilitia"],
          67: [668, 1, "Caunoos"],
          73: [995, 3, "Liacios"],
          74: [997, 1, "Zuidios"],
          76: [1432, 3, "Cuidios"],
          77: [1434, 1, "Tiaeos"],
          79: [1867, 4, "Darytia"],
          80: [1869, 2, "Aleooos"],
          81: [1871, 1, "Thraimoios"],
          82: [1875, 3, "Strimeos"],
          84: [2364, 2, "Hinios"],
          85: [2365, 3, "Emytia"],
          90: [3039, 4, "Nuvios"],
          91: [3043, 3, "Enditia"],
          93: [3754, 1, "Ashauos"],
          94: [3756, 3, "Rakatia"],
          95: [3759, 2, "Uskuos"],
          97: [3768, 3, "Naloios"],
          98: [3769, 1, "Engeeos"],
        },
        46: {
          3: [4730, 1, "Thyceos"],
          4: [4731, 2, "Rythaos"],
          6: [3474, 1, "Ritaos"],
          7: [3473, 3, "Zhecios"],
          10: [3462, 1, "Araios"],
          11: [3461, 3, "Wesiios"],
          19: [2139, 4, "Sohuios"],
          20: [2138, 2, "Burotia"],
          22: [1674, 2, "Loritia"],
          23: [1673, 1, "Sleceios"],
          24: [1676, 4, "Yonoos"],
          26: [1191, 1, "Dibaios"],
          27: [1192, 3, "Nysoitia"],
          32: [573, 1, "Hofios"],
          33: [574, 2, "Hyhyos"],
          34: [575, 3, "Pycios"],
          36: [345, 2, "Ildeitia"],
          37: [343, 4, "Heymios"],
          38: [342, 3, "Maycios"],
          39: [340, 1, "Zheynios"],
          41: [165, 3, "Banotia"],
          42: [159, 2, "Kapios"],
          43: [160, 1, "Threcios"],
          48: [25, 1, "Phiaxios"],
          49: [19, 4, "Doilios"],
          50: [20, 1, "Alduos"],
          52: [30, 3, "Rynetia"],
          53: [33, 4, "Ataitia"],
          57: [97, 4, "Jeuxaios"],
          58: [98, 1, "Zhixios"],
          60: [221, 4, "Enthuios"],
          61: [224, 3, "Kimetia"],
          63: [432, 4, "Checios"],
          64: [433, 3, "Lethoios"],
          66: [669, 4, "Quaeatia"],
          67: [670, 3, "Coohoios"],
          68: [674, 2, "Oughotia"],
          70: [687, 4, "Sleileios"],
          71: [688, 1, "Dyrios"],
          73: [996, 4, "Bockoios"],
          74: [998, 2, "Skelayos"],
          76: [1433, 4, "Raenios"],
          77: [1435, 2, "Slairios"],
          79: [1868, 1, "Echios"],
          80: [1870, 3, "Quaatia"],
          81: [1872, 4, "Hatatia"],
          82: [1876, 2, "Sayitia"],
          87: [3044, 1, "Leteios"],
          88: [3045, 3, "Trisios"],
          90: [3041, 1, "Iretia"],
          91: [3042, 2, "Engaios"],
          93: [3755, 2, "Snolteios"],
          94: [3757, 4, "Oldeos"],
          97: [3766, 4, "Zhughoios"],
          98: [3767, 2, "Radeyos"],
        },
        47: {
          3: [4728, 4, "Medios"],
          4: [4727, 3, "Leiphyios"],
          9: [3463, 4, "Osatia"],
          10: [3460, 2, "Yerytia"],
          11: [3459, 4, "Nopios"],
          13: [2712, 4, "Seroios"],
          14: [2713, 2, "Sayuios"],
          16: [2132, 4, "Crysios"],
          17: [2131, 3, "Loubios"],
          18: [2136, 4, "Nozaios"],
          19: [2135, 3, "Supoos"],
          20: [2137, 1, "Phupyios"],
          22: [1671, 3, "Snadios"],
          23: [1672, 4, "Keleutia"],
          24: [1675, 3, "Shyeatia"],
          26: [1189, 2, "Whanios"],
          27: [1190, 4, "Draeaos"],
          29: [868, 2, "Shazios"],
          30: [867, 3, "Tanyios"],
          32: [572, 4, "Risuos"],
          33: [571, 3, "Ranetia"],
          38: [341, 2, "Ghaytia"],
          39: [339, 4, "Luraos"],
          41: [158, 4, "Hayghoos"],
          42: [157, 3, "Rilotia"],
          45: [67, 3, "Nyyyos"],
          46: [66, 2, "Samuos"],
          48: [24, 2, "Ponyos"],
          49: [18, 3, "Tissoios"],
          50: [17, 2, "Unteyos"],
          52: [31, 1, "Koedaos"],
          53: [32, 2, "Joukios"],
          54: [36, 3, "Streybios"],
          55: [37, 2, "Thrajios"],
          57: [99, 3, "Echiaos"],
          58: [100, 2, "Yatios"],
          60: [222, 1, "Cezaos"],
          61: [223, 2, "Hehios"],
          63: [434, 2, "Sihyos"],
          64: [435, 1, "Omiatia"],
          66: [671, 2, "Chayos"],
          67: [672, 1, "Whefoios"],
          68: [673, 4, "Turaitia"],
          70: [686, 3, "Cywaios"],
          71: [685, 2, "Baiciios"],
          76: [1436, 3, "Heynaios"],
          77: [1438, 1, "Kibios"],
          80: [1873, 2, "Neliios"],
          81: [1874, 1, "Bloutios"],
          84: [2370, 1, "Ackaitia"],
          85: [2371, 2, "Kakios"],
          87: [3046, 2, "Swoulios"],
          88: [3047, 4, "Ingeuos"],
          96: [3760, 3, "Chriarios"],
          97: [3762, 1, "Chruidios"],
          98: [3764, 3, "Sluimios"],
        },
        48: {
          3: [4729, 1, "Chocios"],
          4: [4726, 2, "Dimios"],
          6: [4109, 4, "Umyos"],
          7: [4107, 2, "Brivios"],
          9: [3464, 1, "Slijios"],
          10: [3458, 3, "Smounaos"],
          11: [3457, 1, "Lluisaos"],
          13: [2711, 1, "Emeytia"],
          14: [2710, 3, "Reyloos"],
          16: [2129, 1, "Serietia"],
          17: [2130, 2, "Olduos"],
          18: [2133, 1, "Thoesios"],
          19: [2134, 2, "Lothyios"],
          26: [1188, 3, "Tekyos"],
          27: [1186, 1, "Brylaos"],
          29: [865, 1, "Draheios"],
          30: [864, 4, "Toutaios"],
          35: [568, 2, "Chaotia"],
          36: [567, 1, "Ingitia"],
          38: [338, 3, "Urnutia"],
          39: [336, 1, "Elmitia"],
          41: [156, 2, "Oroos"],
          42: [155, 1, "Haunios"],
          44: [69, 2, "Sleyvios"],
          45: [65, 4, "Worooos"],
          46: [64, 1, "Whelios"],
          54: [39, 1, "Risautia"],
          55: [38, 4, "Lleatios"],
          60: [225, 4, "Nysios"],
          61: [226, 1, "Litios"],
          70: [683, 4, "Hatitia"],
          71: [684, 1, "Emoios"],
          73: [999, 4, "Ireios"],
          74: [1001, 2, "Echytia"],
          76: [1437, 4, "Warauos"],
          77: [1439, 2, "Isaos"],
          78: [1440, 3, "Tijios"],
          83: [2366, 1, "Samauos"],
          84: [2368, 3, "Gaicios"],
          85: [2372, 4, "Athoos"],
          87: [3048, 1, "Boecaios"],
          88: [3049, 3, "Rodaos"],
          89: [3055, 2, "Touluios"],
          91: [3056, 4, "Claulios"],
          92: [3058, 2, "Ingotia"],
          93: [3060, 4, "Troisaos"],
          94: [3062, 2, "Blereos"],
          96: [3761, 4, "Snoolios"],
          97: [3763, 2, "Voroitia"],
          98: [3765, 4, "Stratios"],
        },
        49: {
          2: [4732, 4, "Biamuios"],
          3: [4723, 3, "Liceos"],
          4: [4724, 4, "Achuos"],
          6: [4108, 1, "Dowios"],
          7: [4106, 3, "Enoitia"],
          10: [3456, 2, "Llisyios"],
          11: [3455, 4, "Killoos"],
          13: [2709, 2, "Arieos"],
          14: [2707, 4, "Vafoios"],
          21: [1666, 1, "Lintiios"],
          22: [1664, 3, "Ruikios"],
          24: [1196, 3, "Neemios"],
          25: [1194, 1, "Veydios"],
          26: [1187, 2, "Sulyos"],
          27: [1185, 4, "Lyeetia"],
          29: [866, 3, "Saetaios"],
          30: [862, 2, "Rhietios"],
          31: [860, 4, "Cebios"],
          32: [858, 2, "Sheynoos"],
          34: [570, 1, "Kehios"],
          35: [566, 4, "Saucios"],
          36: [565, 3, "Quaooos"],
          38: [337, 2, "Atios"],
          39: [335, 4, "Nepaios"],
          44: [68, 1, "Wikios"],
          45: [63, 3, "Cheeios"],
          46: [61, 2, "Eldeitia"],
          48: [7, 3, "Vievios"],
          49: [16, 1, "Mosoos"],
          51: [11, 1, "Llerios"],
          52: [13, 2, "Riloos"],
          57: [101, 2, "Stetios"],
          58: [102, 1, "Voreetia"],
          60: [227, 2, "Blusaos"],
          61: [228, 3, "Meuzios"],
          62: [229, 4, "Loolios"],
          64: [436, 2, "Therauos"],
          65: [438, 4, "Snautios"],
          67: [675, 4, "Sebiios"],
          68: [678, 3, "Yayios"],
          69: [680, 1, "Eruios"],
          70: [681, 2, "Blynios"],
          73: [1e3, 3, "Schytios"],
          74: [1002, 1, "Shiariios"],
          77: [1442, 1, "Rayeeos"],
          78: [1441, 4, "Clykeios"],
          80: [1877, 1, "Dootoos"],
          81: [1879, 3, "Kelaetia"],
          83: [2367, 2, "Leathoios"],
          84: [2369, 4, "Zaynoos"],
          87: [3050, 2, "Oritia"],
          88: [3051, 4, "Wixoos"],
          89: [3054, 1, "Hoveos"],
          91: [3057, 1, "Chusaios"],
          92: [3059, 3, "Dysseios"],
          93: [3061, 1, "Davaios"],
          94: [3063, 3, "Voreyos"],
        },
        50: {
          2: [4733, 2, "Toexios"],
          3: [4719, 1, "Somoos"],
          4: [4725, 2, "Blouleos"],
          6: [4099, 4, "Neenios"],
          7: [4101, 2, "Ceidyios"],
          9: [3453, 2, "Aughatia"],
          10: [3451, 1, "Gepios"],
          11: [3454, 3, "Staugios"],
          13: [2708, 1, "Riloeos"],
          14: [2706, 3, "Liwaos"],
          16: [2126, 3, "Whoisios"],
          17: [2127, 2, "Ceraos"],
          19: [1670, 1, "Thacuios"],
          20: [1668, 3, "Sayoetia"],
          21: [1665, 4, "Keaneios"],
          22: [1663, 2, "Huldiios"],
          24: [1195, 2, "Cheadios"],
          25: [1193, 4, "Lanuos"],
          30: [863, 1, "Saluios"],
          31: [861, 3, "Nezyos"],
          32: [859, 1, "Duiweos"],
          34: [569, 3, "Unteatia"],
          35: [563, 2, "Slestoos"],
          36: [564, 1, "Risietia"],
          41: [153, 2, "Mosautia"],
          42: [152, 3, "Wubios"],
          45: [62, 4, "Shydeos"],
          46: [60, 1, "Nuireos"],
          48: [6, 2, "Awios"],
          49: [4, 4, "Moroeos"],
          50: [1, 2, "Mirruos"],
          51: [9, 4, "Zuneos"],
          52: [15, 3, "Kalaos"],
          54: [40, 4, "Brasaos"],
          55: [43, 3, "Llusiios"],
          57: [103, 4, "Cudios"],
          58: [104, 3, "Wemios"],
          61: [231, 2, "Engytia"],
          62: [230, 1, "Kisoios"],
          64: [437, 3, "Saebiios"],
          65: [439, 1, "Ranuos"],
          67: [676, 1, "Baitios"],
          68: [677, 2, "Trozios"],
          69: [679, 4, "Cauntios"],
          70: [682, 3, "Rakeutia"],
          72: [1003, 4, "Gewios"],
          73: [1004, 3, "Ormytia"],
          74: [1007, 2, "Risiatia"],
          75: [1008, 4, "Chonnaos"],
          80: [1878, 2, "Dezios"],
          81: [1880, 4, "Shyeeos"],
          84: [2373, 1, "Elditia"],
          85: [2376, 3, "Veseitia"],
          87: [3052, 1, "Celios"],
          88: [3053, 3, "Hadoos"],
          96: [3770, 1, "Madios"],
          97: [3772, 2, "Riacios"],
          98: [3774, 1, "Blaysaios"],
          99: [3776, 2, "Troukios"],
        },
        51: {
          6: [4098, 3, "Imutia"],
          7: [4100, 1, "Emeos"],
          9: [3452, 4, "Dynatia"],
          10: [3450, 3, "Gerios"],
          16: [2125, 4, "Jicios"],
          17: [2128, 1, "Foenios"],
          19: [1669, 4, "Ciemoos"],
          20: [1667, 2, "Stravios"],
          27: [1175, 1, "Eldutia"],
          28: [1173, 3, "Phiacios"],
          35: [561, 3, "Phimios"],
          36: [562, 4, "Lerutia"],
          38: [332, 3, "Slelios"],
          39: [333, 4, "Strimios"],
          41: [154, 1, "Zenios"],
          42: [151, 4, "Lezaios"],
          43: [150, 2, "Likoios"],
          49: [5, 1, "Browios"],
          50: [2, 3, "Tineos"],
          54: [41, 2, "Stonaos"],
          55: [42, 1, "Lyeoetia"],
          57: [105, 2, "Slybios"],
          58: [106, 1, "Laereios"],
          59: [109, 4, "Gihios"],
          64: [440, 2, "Seunios"],
          65: [441, 3, "Radatia"],
          72: [1006, 1, "Vocios"],
          73: [1005, 2, "Dileios"],
          74: [1009, 1, "Aleayos"],
          75: [1010, 3, "Daeshyios"],
          77: [1443, 4, "Riyios"],
          78: [1445, 2, "Kinouos"],
          81: [1881, 1, "Tinaetia"],
          82: [1882, 2, "Nyaos"],
          84: [2374, 4, "Asheaos"],
          85: [2375, 2, "Shessoos"],
          90: [2383, 2, "Rodios"],
          91: [2385, 4, "Swubyos"],
          93: [3064, 1, "Chaitia"],
          94: [3066, 3, "Lyeitia"],
          96: [3771, 4, "Strehyos"],
          97: [3773, 3, "Aleoutia"],
          98: [3775, 4, "Thrasuos"],
          99: [3777, 3, "Bronyios"],
          100: [3778, 1, "Enaos"],
        },
        52: {
          2: [4710, 4, "Wenios"],
          3: [4709, 3, "Soisios"],
          5: [4097, 2, "Quolios"],
          6: [4095, 4, "Achayos"],
          12: [2705, 1, "Dareetia"],
          13: [2695, 3, "Nysuios"],
          14: [2694, 1, "Trytyos"],
          16: [2124, 2, "Araos"],
          17: [2121, 3, "Dartaios"],
          22: [1654, 2, "Lidyios"],
          23: [1652, 4, "Loryos"],
          25: [1183, 1, "Woratia"],
          26: [1181, 3, "Bleuzios"],
          27: [1176, 2, "Poluitia"],
          28: [1174, 4, "Toraitia"],
          30: [857, 2, "Itauos"],
          31: [855, 4, "Ageetia"],
          32: [853, 2, "Rayckeos"],
          33: [851, 4, "Wysyios"],
          35: [560, 2, "Toreos"],
          36: [559, 1, "Inaeios"],
          38: [331, 2, "Nacios"],
          39: [330, 1, "Liwios"],
          43: [145, 1, "Nysetia"],
          44: [144, 3, "Rouyios"],
          46: [58, 1, "Phytios"],
          47: [57, 4, "Toreaos"],
          52: [48, 2, "Ositia"],
          53: [45, 1, "Niraios"],
          54: [44, 4, "Lareios"],
          57: [107, 4, "Denaos"],
          58: [108, 3, "Quaoos"],
          59: [110, 2, "Danaios"],
          61: [232, 3, "Snorios"],
          62: [233, 4, "Tralios"],
          64: [442, 4, "Rogios"],
          65: [443, 1, "Shagiios"],
          67: [691, 4, "Syciios"],
          68: [693, 3, "Turios"],
          69: [695, 1, "Endyos"],
          70: [697, 2, "Swicyios"],
          77: [1444, 1, "Ryzeos"],
          78: [1446, 3, "Llakios"],
          79: [1451, 4, "Neavoos"],
          81: [1883, 3, "Eteetia"],
          82: [1884, 4, "Smaerios"],
          87: [2377, 4, "Thameos"],
          88: [2379, 2, "Thorios"],
          89: [2381, 4, "Rynooos"],
          90: [2384, 3, "Maifoos"],
          91: [2386, 1, "Kahios"],
          93: [3065, 2, "Roenios"],
          94: [3067, 4, "Rodetia"],
          99: [3780, 2, "Renyios"],
          100: [3779, 4, "Kourios"],
        },
        53: {
          1: [4717, 1, "Nyoos"],
          2: [4712, 2, "Turatia"],
          3: [4711, 1, "Kinuitia"],
          5: [4096, 1, "Emaos"],
          6: [4094, 3, "Quautia"],
          8: [3445, 1, "Kainuios"],
          9: [3443, 3, "Cycuos"],
          10: [3441, 1, "Tryseos"],
          12: [2699, 3, "Mooweos"],
          13: [2696, 4, "Deluos"],
          14: [2693, 2, "Seshaos"],
          16: [2123, 1, "Nozios"],
          17: [2122, 4, "Cleadoos"],
          18: [2119, 1, "Soutios"],
          19: [2117, 3, "Puneos"],
          21: [1656, 4, "Tykios"],
          22: [1655, 3, "Hinaetia"],
          23: [1653, 1, "Awietia"],
          25: [1184, 2, "Samaos"],
          26: [1182, 4, "Denios"],
          27: [1179, 1, "Imaeos"],
          28: [1177, 3, "Slakios"],
          30: [856, 1, "Nimeos"],
          31: [854, 3, "Tiaootia"],
          32: [852, 1, "Drerios"],
          33: [850, 3, "Yanaos"],
          38: [334, 1, "Cliwios"],
          39: [329, 4, "Ormiatia"],
          40: [327, 2, "Zaroios"],
          42: [149, 2, "Striwoios"],
          43: [146, 4, "Ineitia"],
          44: [143, 2, "Umeos"],
          46: [59, 2, "Dydios"],
          47: [56, 3, "Raneytia"],
          48: [54, 1, "Loratia"],
          49: [52, 3, "Drearios"],
          50: [50, 2, "Torytia"],
          52: [49, 4, "Anauos"],
          53: [46, 3, "Ormieos"],
          54: [47, 2, "Thusiios"],
          56: [111, 2, "Engatia"],
          57: [112, 1, "Brewios"],
          61: [234, 1, "Ashytia"],
          62: [235, 2, "Rethiios"],
          64: [445, 3, "Miraios"],
          65: [444, 2, "Iritia"],
          67: [692, 1, "Stridios"],
          68: [694, 2, "Rarios"],
          69: [696, 4, "Nydios"],
          70: [698, 3, "Osios"],
          71: [701, 4, "Rynios"],
          73: [1011, 3, "Ingutia"],
          74: [1013, 1, "Lyeutia"],
          75: [1021, 4, "Lodyos"],
          77: [1447, 4, "Boidiios"],
          78: [1449, 2, "Tureos"],
          79: [1452, 1, "Wokios"],
          81: [1885, 1, "Llyrios"],
          82: [1886, 2, "Zhydeos"],
          84: [1887, 3, "Swounios"],
          85: [1889, 1, "Jocoos"],
          87: [2378, 1, "Nysoos"],
          88: [2380, 3, "Nilios"],
          89: [2382, 1, "Enduos"],
          93: [3068, 1, "Kisuios"],
          94: [3070, 3, "Baegoos"],
          96: [3783, 2, "Enetia"],
          97: [3785, 1, "Rakutia"],
        },
        54: {
          1: [4714, 4, "Lerauos"],
          2: [4713, 3, "Ineuos"],
          8: [3444, 4, "Noboios"],
          9: [3442, 2, "Llyllyos"],
          10: [3440, 4, "Swodyos"],
          12: [2698, 2, "Fekios"],
          13: [2697, 1, "Huvios"],
          18: [2120, 2, "Naeloios"],
          19: [2118, 4, "Keniios"],
          21: [1657, 1, "Rayautia"],
          22: [1658, 2, "Mysoos"],
          27: [1180, 2, "Slailios"],
          28: [1178, 4, "Laxios"],
          35: [553, 4, "Kagios"],
          36: [552, 2, "Whayxeos"],
          39: [328, 3, "Breisios"],
          40: [326, 1, "Esteuos"],
          42: [148, 3, "Foyeos"],
          43: [147, 1, "Urneitia"],
          48: [55, 2, "Snieltoos"],
          49: [53, 4, "Augheios"],
          50: [51, 1, "Loheos"],
          56: [114, 3, "Hazios"],
          57: [113, 4, "Jieliios"],
          59: [247, 1, "Soirios"],
          60: [244, 4, "Tejios"],
          61: [243, 3, "Smywios"],
          70: [699, 2, "Kineyos"],
          71: [700, 1, "Llouzios"],
          73: [1012, 4, "Toritia"],
          74: [1014, 2, "Diarios"],
          75: [1022, 3, "Peroios"],
          77: [1448, 1, "Asoios"],
          78: [1450, 3, "Smaveos"],
          84: [1888, 4, "Tasheios"],
          85: [1890, 2, "Hinietia"],
          91: [3073, 2, "Smurios"],
          92: [3072, 1, "Smeyqiios"],
          93: [3069, 2, "Trareos"],
          94: [3071, 4, "Nimios"],
          96: [3784, 3, "Tanetia"],
          97: [3786, 4, "Chaaeos"],
          98: [3787, 1, "Usteyos"],
          99: [3789, 3, "Athoetia"],
          100: [3791, 1, "Polaytia"],
        },
        55: {
          1: [4716, 2, "Undios"],
          2: [4715, 1, "Norios"],
          4: [4708, 4, "Rhourios"],
          5: [4707, 3, "Dirios"],
          7: [3449, 1, "Yiedios"],
          8: [3446, 2, "Cruifios"],
          15: [2688, 4, "Daulios"],
          16: [2686, 2, "Phaykaos"],
          21: [1659, 3, "Athoeos"],
          22: [1660, 4, "Honuos"],
          24: [1647, 4, "Rayoos"],
          25: [1648, 1, "Tasatia"],
          30: [842, 1, "Smiyaos"],
          31: [840, 2, "Sleanyios"],
          33: [558, 1, "Strounios"],
          34: [555, 2, "Peruitia"],
          35: [554, 1, "Yesaios"],
          36: [550, 3, "Ormatia"],
          37: [549, 4, "Waruios"],
          45: [136, 4, "Onaios"],
          46: [135, 3, "Rikios"],
          52: [119, 2, "Theriaos"],
          53: [117, 1, "Enthatia"],
          54: [115, 2, "Niseos"],
          59: [248, 3, "Kayios"],
          60: [246, 2, "Rhezios"],
          63: [263, 1, "Kinetia"],
          64: [265, 3, "Trihoios"],
          66: [446, 1, "Jainios"],
          67: [447, 2, "Vociios"],
          68: [457, 1, "Blietios"],
          73: [1015, 3, "Rothutia"],
          74: [1017, 1, "Jihios"],
          80: [1453, 3, "Potoos"],
          81: [1455, 4, "Blyvoos"],
          82: [1461, 2, "Dinios"],
          85: [1891, 3, "Snourios"],
          86: [1893, 1, "Deneyos"],
          88: [2387, 2, "Zidios"],
          89: [2388, 3, "Entheuos"],
          91: [3074, 3, "Issyos"],
          92: [3075, 4, "Dybios"],
          97: [3793, 3, "Myjios"],
          98: [3788, 2, "Oldeyos"],
          99: [3790, 4, "Ghautia"],
          100: [3792, 2, "Enayos"],
        },
        56: {
          4: [4705, 1, "Heuhios"],
          5: [4706, 2, "Thruhoos"],
          7: [3448, 4, "Broleos"],
          8: [3447, 3, "Jeumios"],
          10: [3439, 3, "Moseatia"],
          11: [3438, 1, "Phucios"],
          13: [2692, 4, "Schidoios"],
          14: [2690, 2, "Keluitia"],
          15: [2687, 3, "Bukuos"],
          16: [2685, 1, "Tiayos"],
          18: [2116, 3, "Syxios"],
          19: [2114, 1, "Dynaetia"],
          21: [1661, 1, "Fiekios"],
          22: [1662, 2, "Zhoosios"],
          24: [1650, 3, "Tygios"],
          25: [1649, 2, "Nipaos"],
          26: [1646, 1, "Lefios"],
          27: [1640, 2, "Cifios"],
          28: [1641, 1, "Taulios"],
          30: [843, 4, "Angios"],
          31: [841, 3, "Colaos"],
          33: [557, 4, "Dreseos"],
          34: [556, 3, "Bailoios"],
          36: [551, 2, "Devios"],
          37: [548, 1, "Rodutia"],
          38: [545, 4, "Ceylaios"],
          40: [325, 4, "Cobios"],
          41: [323, 2, "Ineeuos"],
          43: [142, 4, "Burytia"],
          44: [139, 2, "Iaaos"],
          45: [137, 1, "Revios"],
          46: [134, 2, "Croicios"],
          47: [131, 1, "Sesuios"],
          48: [128, 4, "Whaefios"],
          49: [127, 3, "Zoinios"],
          51: [121, 3, "Cocoos"],
          52: [120, 4, "Essyos"],
          53: [118, 3, "Veraos"],
          54: [116, 4, "Timeos"],
          55: [124, 1, "Aweetia"],
          57: [253, 2, "Halteios"],
          58: [250, 4, "Taieos"],
          59: [249, 1, "Burios"],
          62: [267, 2, "Rhelyios"],
          63: [264, 4, "Omyos"],
          64: [266, 2, "Nemios"],
          66: [448, 4, "Chriaciios"],
          67: [449, 3, "Balios"],
          68: [456, 4, "Etios"],
          70: [702, 1, "Breiyuos"],
          71: [703, 3, "Hanios"],
          73: [1016, 4, "Polyos"],
          74: [1018, 2, "Sworryos"],
          76: [1023, 4, "Voltuos"],
          77: [1025, 2, "Chrigiios"],
          79: [1457, 4, "Aleoos"],
          80: [1454, 2, "Colyios"],
          81: [1456, 1, "Thirios"],
          82: [1460, 3, "Rhitaos"],
          83: [1462, 2, "Sulauos"],
          85: [1892, 4, "Angutia"],
          86: [1894, 2, "Quaaos"],
          88: [2389, 4, "Phiejeios"],
          89: [2390, 1, "Hojios"],
          91: [3076, 2, "Skelaos"],
          92: [3077, 1, "Bezios"],
          94: [3086, 1, "Rinaos"],
          95: [3087, 4, "Queyos"],
          97: [3794, 4, "Gychuios"],
          98: [3795, 1, "Lebios"],
        },
        57: {
          3: [4704, 4, "Achoios"],
          4: [4703, 3, "Broenaios"],
          10: [3436, 4, "Luteios"],
          11: [3437, 2, "Ageeos"],
          13: [2691, 3, "Ashotia"],
          14: [2689, 1, "Ardetia"],
          15: [2684, 4, "Echoitia"],
          16: [2682, 2, "Whiltyios"],
          18: [2115, 2, "Staxios"],
          19: [2113, 4, "Zheliios"],
          26: [1651, 3, "Mocios"],
          27: [1642, 4, "Aleotia"],
          28: [1643, 3, "Feibios"],
          30: [846, 1, "Nohyos"],
          31: [844, 2, "Samyos"],
          37: [547, 2, "Febios"],
          38: [546, 3, "Nukios"],
          40: [324, 3, "Ingauos"],
          41: [322, 1, "Untatia"],
          43: [141, 1, "Blinaios"],
          44: [140, 3, "Llaynios"],
          46: [133, 3, "Verotia"],
          47: [132, 4, "Sepaios"],
          48: [130, 2, "Schiluios"],
          49: [129, 1, "Oreatia"],
          51: [122, 1, "Schilios"],
          52: [123, 2, "Lutuios"],
          54: [126, 2, "Soubyos"],
          55: [125, 3, "Urnieos"],
          57: [254, 1, "Smuruios"],
          58: [252, 3, "Blujios"],
          59: [262, 2, "Wurios"],
          61: [270, 3, "Tanuos"],
          62: [268, 4, "Ramiios"],
          63: [269, 3, "Kelaos"],
          66: [450, 2, "Slisios"],
          67: [451, 1, "Onyos"],
          70: [704, 2, "Baubios"],
          71: [705, 4, "Zockyios"],
          73: [1019, 1, "Blookios"],
          74: [1020, 3, "Slicoios"],
          76: [1024, 1, "Ineeaos"],
          77: [1026, 3, "Tietios"],
          79: [1458, 1, "Oldauos"],
          80: [1459, 3, "Rakeetia"],
          82: [1464, 4, "Swieyios"],
          83: [1463, 1, "Endoitia"],
          85: [1895, 3, "Dresiios"],
          86: [1897, 1, "Layyios"],
          88: [2391, 2, "Ineeitia"],
          89: [2392, 3, "Throlios"],
          94: [3083, 3, "Rayoios"],
          95: [3084, 2, "Tiniatia"],
        },
        58: {
          3: [4702, 2, "Ponoos"],
          4: [4701, 1, "Phovios"],
          6: [4092, 2, "Nyeutia"],
          7: [4093, 1, "Quojaios"],
          9: [3434, 2, "Creubios"],
          10: [3435, 3, "Tutheos"],
          15: [2683, 3, "Ryneytia"],
          16: [2681, 1, "Kohios"],
          18: [2112, 3, "Clohoios"],
          19: [2110, 1, "Tovios"],
          21: [2107, 4, "Gouhios"],
          22: [2106, 1, "Nyseuos"],
          23: [2103, 4, "Riateios"],
          24: [2102, 1, "Meartuios"],
          27: [1644, 2, "Pealios"],
          28: [1645, 1, "Thrylios"],
          30: [847, 4, "Moreatia"],
          31: [845, 3, "Queaeos"],
          33: [838, 1, "Isseatia"],
          34: [832, 3, "Nyrios"],
          35: [830, 1, "Garoetia"],
          40: [321, 4, "Criroios"],
          41: [319, 2, "Drodios"],
          61: [271, 1, "Mieciios"],
          62: [272, 2, "Engetia"],
          63: [273, 1, "Zhaysios"],
          65: [453, 1, "Yebios"],
          66: [452, 4, "Anios"],
          69: [710, 4, "Llighoos"],
          70: [706, 1, "Ryneos"],
          76: [1027, 4, "Schalaos"],
          77: [1029, 2, "Quoetios"],
          85: [1896, 4, "Throyyios"],
          86: [1898, 2, "Tryreios"],
          88: [2393, 4, "Swekios"],
          89: [2394, 1, "Nifios"],
          90: [2395, 2, "Dexaos"],
          92: [3078, 4, "Saireos"],
          93: [3080, 2, "Stewyios"],
          94: [3082, 4, "Trakoios"],
          95: [3085, 1, "Whuthuios"],
          97: [3803, 2, "Slihuos"],
          98: [3804, 3, "Pyfios"],
        },
        59: {
          3: [4700, 4, "Cineios"],
          4: [4699, 3, "Atheaos"],
          6: [4091, 4, "Bosios"],
          7: [4090, 3, "Chuidios"],
          9: [3432, 4, "Reniios"],
          10: [3433, 1, "Zhodios"],
          12: [2679, 4, "Thrasios"],
          13: [2680, 1, "Pibios"],
          18: [2111, 2, "Clifeios"],
          19: [2109, 4, "Sleezios"],
          21: [2108, 2, "Sulaios"],
          22: [2105, 3, "Turitia"],
          23: [2104, 2, "Emoetia"],
          24: [2101, 3, "Dakeios"],
          25: [2098, 4, "Dozoios"],
          30: [849, 1, "Croissyios"],
          31: [848, 2, "Closios"],
          33: [839, 2, "Jenoos"],
          34: [833, 4, "Sougaios"],
          35: [831, 2, "Nomoos"],
          37: [544, 4, "Hineos"],
          38: [540, 1, "Yasios"],
          40: [320, 3, "Schayrios"],
          41: [318, 1, "Pewios"],
          42: [315, 3, "Inaoeos"],
          43: [313, 1, "Gievaios"],
          45: [311, 2, "Horios"],
          46: [309, 4, "Taiuios"],
          47: [307, 2, "Whoriios"],
          48: [305, 4, "Romeios"],
          50: [303, 2, "Sishaios"],
          51: [302, 3, "Dririos"],
          52: [295, 4, "Fycios"],
          53: [293, 1, "Lyrtoios"],
          55: [285, 2, "Pynneios"],
          56: [282, 4, "Etutia"],
          58: [275, 2, "Quaotia"],
          59: [274, 1, "Mudios"],
          65: [454, 2, "Delietia"],
          66: [455, 3, "Anuos"],
          68: [712, 2, "Enautia"],
          69: [711, 3, "Cheios"],
          70: [708, 2, "Dynaos"],
          72: [719, 1, "Ightoitia"],
          73: [721, 2, "Oldyos"],
          75: [1031, 3, "Hezios"],
          76: [1028, 1, "Saitoos"],
          77: [1030, 3, "Thraenuios"],
          79: [1465, 2, "Orutia"],
          80: [1466, 3, "Issoios"],
          82: [1477, 3, "Threydios"],
          83: [1478, 1, "Straibaos"],
          89: [2397, 4, "Lyhoos"],
          90: [2396, 3, "Koteos"],
          92: [3079, 3, "Echuos"],
          93: [3081, 1, "Urnotia"],
          97: [3802, 1, "Schoebios"],
          98: [3805, 4, "Perios"],
        },
        60: {
          6: [4089, 2, "Sliatios"],
          7: [4088, 1, "Joghoos"],
          12: [2678, 3, "Roduos"],
          13: [2677, 2, "Haulios"],
          14: [2675, 4, "Eldetia"],
          15: [2673, 2, "Phapaios"],
          16: [2671, 4, "Boolyios"],
          24: [2100, 2, "Omautia"],
          25: [2099, 1, "Warteios"],
          27: [1638, 3, "Biphuios"],
          28: [1639, 1, "Estatia"],
          34: [834, 1, "Essuios"],
          35: [836, 3, "Jetios"],
          37: [538, 2, "Saukoos"],
          38: [539, 3, "Ineiaos"],
          42: [316, 4, "Aratia"],
          43: [314, 2, "Eraeos"],
          45: [312, 3, "Ageitia"],
          46: [310, 1, "Liseios"],
          47: [308, 3, "Buratia"],
          48: [306, 1, "Kelatia"],
          50: [304, 4, "Lahaos"],
          51: [301, 1, "Curiios"],
          52: [296, 3, "Gupheios"],
          53: [294, 2, "Undytia"],
          55: [286, 3, "Blixios"],
          56: [283, 1, "Llorios"],
          58: [276, 3, "Schimios"],
          59: [277, 4, "Redaos"],
          60: [278, 2, "Eldoos"],
          62: [458, 2, "Chriryios"],
          63: [459, 3, "Polios"],
          68: [713, 4, "Liliios"],
          69: [714, 1, "Riloios"],
          72: [720, 3, "Poloitia"],
          73: [722, 4, "Slabios"],
          75: [1032, 4, "Schinios"],
          76: [1033, 2, "Rooteos"],
          79: [1467, 4, "Ageuitia"],
          80: [1468, 1, "Rexaos"],
          82: [1479, 2, "Streudoios"],
          83: [1480, 4, "Dypiios"],
          84: [1483, 2, "Rothaios"],
          86: [1900, 1, "Seyeos"],
          87: [1902, 4, "Smoiluios"],
          95: [3796, 3, "Traerios"],
          96: [3798, 1, "Culuios"],
          97: [3800, 3, "Asitia"],
        },
        61: {
          3: [4691, 2, "Burietia"],
          4: [4690, 1, "Lialios"],
          6: [4087, 3, "Queylios"],
          7: [4086, 4, "Untuos"],
          9: [3427, 3, "Swauphaos"],
          10: [3426, 1, "Pedios"],
          13: [2676, 1, "Hataitia"],
          14: [2674, 3, "Eldotia"],
          15: [2672, 1, "Mackios"],
          16: [2670, 3, "Steasios"],
          18: [2661, 1, "Vupios"],
          19: [2660, 4, "Shyoios"],
          21: [2669, 3, "Rakitia"],
          22: [2667, 2, "Smuicios"],
          27: [1637, 2, "Kesoios"],
          28: [1635, 4, "Daruos"],
          29: [1636, 1, "Roitios"],
          31: [1172, 3, "Banaos"],
          32: [1171, 4, "Hateeos"],
          34: [835, 2, "Trosios"],
          35: [837, 4, "Neykuos"],
          37: [537, 1, "Eldeatia"],
          38: [536, 4, "Bocyios"],
          39: [535, 1, "Cepaios"],
          40: [532, 3, "Clekoos"],
          51: [298, 2, "Rejios"],
          52: [297, 4, "Voikios"],
          55: [287, 4, "Nodios"],
          56: [288, 2, "Testios"],
          58: [281, 4, "Kavios"],
          59: [279, 1, "Radeos"],
          60: [280, 3, "Enthuitia"],
          62: [460, 4, "Yinios"],
          63: [461, 1, "Estoetia"],
          64: [462, 4, "Itios"],
          65: [465, 1, "Athaos"],
          67: [715, 2, "Verios"],
          68: [716, 3, "Phihyos"],
          71: [723, 1, "Ceryos"],
          72: [724, 2, "Tuhyios"],
          78: [1469, 2, "Lubios"],
          79: [1470, 3, "Taneetia"],
          80: [1476, 2, "Tysuios"],
          82: [1481, 1, "Undootia"],
          83: [1482, 3, "Baneitia"],
          84: [1484, 1, "Wheufeios"],
          86: [1901, 2, "Schegios"],
          87: [1899, 3, "Lleurios"],
          89: [2398, 2, "Inaios"],
          90: [2399, 3, "Lakoios"],
          92: [3088, 1, "Theroitia"],
          93: [3090, 3, "Vereos"],
          95: [3797, 4, "Rothetia"],
          96: [3799, 2, "Itoeos"],
          97: [3801, 4, "Shyytia"],
          99: [3806, 3, "Giloios"],
          100: [3808, 1, "Emiatia"],
        },
        62: {
          3: [4689, 4, "Clontuos"],
          4: [4688, 3, "Croiwuios"],
          6: [4085, 2, "Blaucios"],
          7: [4084, 1, "Jemuios"],
          9: [3428, 2, "Torouos"],
          10: [3425, 4, "Bliyios"],
          11: [3423, 2, "Taerios"],
          18: [2659, 3, "Athoitia"],
          19: [2658, 2, "Votios"],
          21: [2668, 1, "Cidaios"],
          22: [2666, 4, "Erios"],
          24: [2091, 3, "Rhidios"],
          25: [2090, 2, "Whaybios"],
          28: [1633, 2, "Torutia"],
          29: [1634, 3, "Pierdios"],
          31: [1170, 1, "Lunoios"],
          32: [1169, 2, "Emootia"],
          39: [534, 2, "Blunios"],
          40: [533, 4, "Tyraios"],
          42: [512, 1, "Sayios"],
          43: [510, 3, "Hairaios"],
          44: [508, 1, "Phidios"],
          45: [506, 3, "Dreeldoios"],
          47: [502, 2, "Buvios"],
          48: [500, 4, "Angaios"],
          49: [498, 2, "Queoos"],
          51: [299, 3, "Honyos"],
          52: [300, 1, "Teabios"],
          54: [289, 3, "Kyrios"],
          55: [290, 1, "Eldiatia"],
          63: [464, 2, "Kepyios"],
          64: [463, 3, "Smoyios"],
          65: [466, 2, "Swamios"],
          67: [717, 4, "Tyghaos"],
          68: [718, 1, "Setios"],
          70: [727, 2, "Banootia"],
          71: [726, 4, "Stiloios"],
          72: [725, 3, "Dijios"],
          74: [1034, 4, "Denotia"],
          75: [1035, 1, "Meedios"],
          77: [1473, 2, "Bruhios"],
          78: [1471, 4, "Baneatia"],
          79: [1472, 1, "Neytios"],
          86: [1903, 4, "Shaylyos"],
          87: [1904, 1, "Tonaos"],
          89: [2400, 4, "Deinuos"],
          90: [2401, 1, "Ustios"],
          92: [3089, 2, "Theuvios"],
          93: [3091, 4, "Stroxuios"],
          99: [3807, 4, "Estoos"],
          100: [3809, 2, "Whomios"],
        },
        63: {
          2: [4696, 1, "Ackaios"],
          3: [4687, 2, "Snianaios"],
          4: [4686, 1, "Driyoos"],
          9: [3429, 1, "Nyriios"],
          10: [3424, 3, "Yiesios"],
          11: [3422, 1, "Shyiatia"],
          13: [3416, 4, "Yaihios"],
          14: [3414, 2, "Dunoios"],
          15: [3412, 4, "Ustatia"],
          16: [3410, 2, "Segios"],
          18: [2657, 1, "Honeytia"],
          19: [2656, 4, "Taeraos"],
          21: [2665, 2, "Shyietia"],
          22: [2662, 3, "Phokios"],
          24: [2092, 4, "Tarios"],
          25: [2089, 1, "Quucoos"],
          26: [2087, 3, "Hycios"],
          28: [1631, 4, "Soneios"],
          29: [1632, 1, "Schiekyios"],
          31: [1167, 2, "Kiyyios"],
          32: [1165, 4, "Umatia"],
          33: [1163, 2, "Gareatia"],
          34: [1161, 3, "Chrahios"],
          36: [820, 2, "Angitia"],
          37: [818, 4, "Bealios"],
          42: [513, 2, "Niryos"],
          43: [511, 4, "Gidios"],
          44: [509, 2, "Zharaos"],
          45: [507, 4, "Eneuos"],
          47: [503, 1, "Echooos"],
          48: [501, 3, "Ightios"],
          49: [499, 1, "Lohios"],
          54: [292, 2, "Kineuos"],
          55: [291, 4, "Banoios"],
          57: [475, 2, "Samuios"],
          58: [472, 3, "Slaxios"],
          59: [471, 2, "Cymios"],
          60: [468, 3, "Nozeios"],
          61: [467, 1, "Shuiseos"],
          70: [728, 3, "Smeebios"],
          71: [729, 1, "Vorietia"],
          72: [730, 2, "Onotia"],
          74: [1036, 2, "Taiytia"],
          75: [1037, 3, "Rheyrios"],
          77: [1474, 1, "Kaxios"],
          78: [1475, 3, "Kygiios"],
          81: [1485, 2, "Rothaytia"],
          82: [1486, 4, "Aldouos"],
          84: [1909, 2, "Queayos"],
          85: [1907, 4, "Chileos"],
          86: [1905, 2, "Smelios"],
          89: [2402, 2, "Elmootia"],
          90: [2403, 3, "Ightyos"],
          92: [3092, 1, "Snareios"],
          93: [3093, 2, "Barios"],
          94: [3094, 3, "Sekios"],
          95: [3096, 1, "Stumios"],
          96: [3098, 3, "Bocios"],
          98: [3812, 1, "Lyrios"],
          99: [3810, 3, "Kanios"],
        },
        64: {
          1: [4693, 4, "Seileios"],
          2: [4692, 3, "Drauos"],
          3: [4685, 4, "Riceos"],
          4: [4684, 3, "Liedios"],
          6: [4079, 4, "Atutia"],
          7: [4077, 2, "Anyos"],
          9: [3430, 4, "Staghaios"],
          10: [3431, 2, "Roodios"],
          13: [3417, 1, "Inaatia"],
          14: [3415, 3, "Ineoos"],
          15: [3413, 1, "Nokeos"],
          16: [3411, 3, "Pamios"],
          18: [2655, 3, "Queeos"],
          19: [2654, 2, "Nabaos"],
          21: [2664, 1, "Nooleos"],
          22: [2663, 4, "Whuraios"],
          25: [2088, 4, "Morotia"],
          26: [2086, 2, "Myyeios"],
          31: [1168, 1, "Trixuos"],
          32: [1166, 3, "Issoos"],
          33: [1164, 1, "Leruitia"],
          34: [1162, 4, "Baneeos"],
          36: [821, 3, "Blinios"],
          37: [819, 1, "Bacios"],
          38: [816, 2, "Menyos"],
          39: [814, 4, "Ritios"],
          41: [514, 3, "Ryniaos"],
          42: [515, 4, "Tessoios"],
          43: [518, 3, "Riseaos"],
          48: [505, 2, "Oraos"],
          49: [504, 4, "Ighteos"],
          51: [487, 2, "Crymios"],
          52: [486, 4, "Quauos"],
          57: [476, 3, "Ravios"],
          58: [473, 4, "Snexios"],
          59: [474, 1, "Cheymeos"],
          60: [469, 4, "Rigios"],
          61: [470, 2, "Stathaios"],
          63: [740, 1, "Lydiios"],
          64: [741, 4, "Queitia"],
          66: [735, 2, "Kelauos"],
          67: [731, 1, "Dielios"],
          68: [732, 2, "Toneitia"],
          74: [1038, 4, "Atoos"],
          75: [1039, 1, "Angootia"],
          80: [1489, 2, "Vyreios"],
          81: [1487, 3, "Brugoos"],
          82: [1488, 1, "Sleryios"],
          84: [1910, 3, "Aweitia"],
          85: [1908, 1, "Schaloos"],
          86: [1906, 3, "Strazoios"],
          88: [2404, 4, "Riseos"],
          89: [2405, 1, "Throoyios"],
          94: [3095, 4, "Inaetia"],
          95: [3097, 2, "Kalyos"],
          96: [3099, 4, "Jeipios"],
          98: [3813, 2, "Ryceos"],
          99: [3811, 4, "Bleloos"],
        },
        65: {
          1: [4695, 2, "Harios"],
          2: [4694, 1, "Coennuos"],
          6: [4078, 3, "Swiathoos"],
          7: [4076, 1, "Blarios"],
          12: [3421, 1, "Luliios"],
          13: [3418, 2, "Quoinyios"],
          18: [2653, 1, "Nofaios"],
          19: [2652, 4, "Cheitia"],
          24: [2097, 2, "Chezeos"],
          25: [2085, 3, "Garaos"],
          26: [2083, 1, "Lyraios"],
          28: [1629, 1, "Syhios"],
          29: [1630, 2, "Ightayos"],
          38: [817, 3, "Ineios"],
          39: [815, 1, "Llourios"],
          41: [517, 2, "Umaos"],
          42: [516, 1, "Noetuos"],
          45: [519, 1, "Nicios"],
          46: [520, 2, "Jeygios"],
          51: [488, 3, "Ineotia"],
          52: [489, 1, "Creyyeios"],
          54: [478, 3, "Ackuios"],
          55: [477, 2, "Elmyos"],
          63: [743, 2, "Dynyos"],
          64: [742, 3, "Samotia"],
          66: [736, 3, "Wicios"],
          67: [734, 4, "Tesoos"],
          68: [733, 3, "Rapios"],
          69: [737, 1, "Rakaos"],
          71: [1045, 2, "Oldautia"],
          72: [1046, 3, "Shahios"],
          74: [1040, 2, "Endietia"],
          75: [1041, 3, "Smadios"],
          76: [1042, 4, "Yerios"],
          78: [1495, 4, "Lonoos"],
          79: [1492, 3, "Lealuos"],
          80: [1490, 4, "Thrunios"],
          81: [1491, 1, "Segheios"],
          88: [2406, 2, "Nyvaios"],
          89: [2407, 3, "Ardeuos"],
          91: [3101, 2, "Hiyios"],
          92: [3100, 1, "Queotia"],
        },
        66: {
          4: [4083, 1, "Mosyos"],
          5: [4081, 3, "Ightoutia"],
          6: [4075, 4, "Tinatia"],
          7: [4073, 2, "Adytia"],
          9: [4058, 4, "Mesaos"],
          10: [4057, 3, "Llesios"],
          12: [3420, 4, "Thomios"],
          13: [3419, 3, "Tonayos"],
          15: [3407, 1, "Losaios"],
          16: [3406, 3, "Tinyos"],
          19: [2651, 3, "Wedios"],
          20: [2649, 1, "Voroios"],
          21: [2647, 3, "Ustoetia"],
          23: [2096, 4, "Breabios"],
          24: [2093, 1, "Claijaios"],
          25: [2084, 4, "Sylyios"],
          26: [2082, 2, "Skelyos"],
          28: [1628, 4, "Vorios"],
          29: [1627, 3, "Kalotia"],
          30: [1626, 2, "Nysyos"],
          32: [1159, 4, "Memios"],
          33: [1157, 2, "Dobios"],
          34: [1155, 4, "Decaos"],
          35: [1153, 2, "Emeyos"],
          37: [822, 4, "Scheytios"],
          38: [823, 2, "Jeavios"],
          39: [826, 4, "Botiios"],
          44: [523, 2, "Seavios"],
          45: [522, 4, "Snonteios"],
          46: [521, 3, "Thyzios"],
          47: [526, 2, "Kaloetia"],
          48: [527, 3, "Aseos"],
          49: [528, 2, "Rukios"],
          51: [492, 4, "Nolyos"],
          52: [490, 2, "Ingytia"],
          54: [479, 4, "Polieos"],
          55: [480, 1, "Shaumoios"],
          56: [481, 2, "Kumios"],
          57: [484, 1, "Aleatia"],
          59: [753, 3, "Bearoios"],
          60: [752, 2, "Zuiryos"],
          62: [746, 1, "Laecios"],
          63: [744, 3, "Tounios"],
          68: [739, 2, "Torios"],
          69: [738, 4, "Yeruos"],
          71: [1047, 4, "Phedios"],
          72: [1048, 1, "Ildotia"],
          75: [1043, 1, "Sligios"],
          76: [1044, 2, "Ormootia"],
          78: [1496, 1, "Realyos"],
          79: [1493, 2, "Drutios"],
          80: [1494, 3, "Zalaos"],
          81: [1497, 2, "Nasios"],
          83: [1911, 2, "Smevaos"],
          84: [1912, 3, "Esteeos"],
          86: [2412, 4, "Buroutia"],
          87: [2409, 1, "Urnitia"],
          88: [2408, 4, "Stamuos"],
          91: [3103, 4, "Wonoos"],
          92: [3102, 3, "Ageouos"],
          94: [3120, 4, "Risyos"],
          95: [3122, 3, "Kaizaos"],
          97: [3814, 4, "Texios"],
          98: [3815, 1, "Chruruios"],
        },
        67: {
          1: [5141, 1, "Raphaos"],
          2: [5142, 2, "Tiephyos"],
          4: [4082, 4, "Dartios"],
          5: [4080, 2, "Cheaitia"],
          6: [4074, 1, "Vutuos"],
          7: [4072, 3, "Elmios"],
          9: [4059, 1, "Ingeaos"],
          10: [4056, 2, "Rakayos"],
          15: [3401, 2, "Yeygaios"],
          16: [3399, 4, "Ematia"],
          17: [3397, 2, "Emooos"],
          19: [2650, 2, "Pheixios"],
          20: [2648, 4, "Sorios"],
          21: [2646, 2, "Trixios"],
          23: [2095, 3, "Tuzios"],
          24: [2094, 2, "Ackootia"],
          29: [1625, 1, "Thraynyos"],
          30: [1624, 4, "Cibios"],
          32: [1160, 1, "Riesaos"],
          33: [1158, 3, "Rhyseios"],
          34: [1156, 1, "Batios"],
          35: [1154, 3, "Raideos"],
          37: [825, 1, "Smayhios"],
          38: [824, 3, "Thryyios"],
          39: [827, 1, "Urnoos"],
          41: [803, 4, "Oroutia"],
          42: [801, 2, "Denootia"],
          44: [524, 1, "Thifios"],
          45: [525, 3, "Uskeos"],
          47: [531, 1, "Rydiios"],
          48: [530, 4, "Ustoios"],
          49: [529, 1, "Essuitia"],
          51: [493, 1, "Sayatia"],
          52: [491, 3, "Phatios"],
          55: [482, 3, "Wouhios"],
          56: [483, 4, "Naezios"],
          57: [485, 2, "Inaouos"],
          59: [755, 4, "Itotia"],
          60: [754, 1, "Steciios"],
          62: [747, 2, "Awoetia"],
          63: [745, 4, "Enthuos"],
          65: [1054, 1, "Thucaios"],
          66: [1055, 2, "Riatiios"],
          72: [1049, 2, "Chomeios"],
          73: [1050, 3, "Tasios"],
          83: [1913, 4, "Phupaos"],
          84: [1914, 1, "Nilloos"],
          86: [2413, 2, "Boesios"],
          87: [2411, 3, "Delitia"],
          88: [2410, 2, "Rotheyos"],
          90: [3111, 2, "Cridios"],
          91: [3110, 1, "Tadios"],
          94: [3121, 2, "Chraynios"],
          95: [3123, 1, "Elmatia"],
          97: [3816, 2, "Dounios"],
          98: [3817, 3, "Anoos"],
        },
        68: {
          1: [5139, 3, "Denoos"],
          2: [5140, 4, "Tilios"],
          10: [4055, 4, "Lanios"],
          11: [4054, 2, "Kimeuos"],
          13: [3405, 2, "Thriagios"],
          14: [3402, 3, "Zhaixeios"],
          15: [3400, 1, "Aldios"],
          16: [3398, 3, "Stanyos"],
          17: [3396, 1, "Yeroos"],
          26: [2076, 1, "Sulitia"],
          27: [2074, 3, "Zaleos"],
          29: [1623, 3, "Osaeos"],
          30: [1622, 2, "Brisios"],
          38: [829, 4, "Rizeios"],
          39: [828, 2, "Thralios"],
          41: [804, 1, "Roinaos"],
          42: [802, 3, "Foeneos"],
          52: [497, 1, "Faecios"],
          53: [494, 2, "Viamios"],
          59: [757, 2, "Deldaios"],
          60: [756, 3, "Treehios"],
          65: [1056, 4, "Hoifios"],
          66: [1057, 3, "Kaekaos"],
          68: [1064, 1, "Cafios"],
          69: [1065, 2, "Brautiios"],
          70: [1068, 1, "Swosaios"],
          72: [1051, 4, "Sedios"],
          73: [1052, 1, "Chrerreios"],
          75: [1506, 4, "Threruos"],
          76: [1504, 1, "Yytyios"],
          77: [1502, 3, "Borios"],
          78: [1500, 2, "Crihoos"],
          79: [1498, 3, "Wecios"],
          81: [1919, 4, "Chrerios"],
          82: [1916, 3, "Swaniios"],
          83: [1915, 2, "Kienduos"],
          90: [3112, 3, "Tonutia"],
          91: [3113, 4, "Cusoios"],
          93: [3125, 2, "Jupios"],
          94: [3124, 4, "Delaos"],
          97: [3818, 4, "Heigoios"],
        },
        69: {
          1: [5137, 1, "Reneos"],
          2: [5138, 2, "Rhierios"],
          4: [4671, 4, "Snithiios"],
          5: [4669, 2, "Rolios"],
          7: [4071, 3, "Bofaios"],
          8: [4070, 1, "Zowios"],
          10: [4053, 3, "Mymeos"],
          11: [4051, 1, "Risatia"],
          13: [3404, 1, "Siraios"],
          14: [3403, 4, "Slaluios"],
          19: [2645, 1, "Ormetia"],
          20: [2644, 3, "Laesios"],
          21: [2639, 2, "Disios"],
          22: [2637, 3, "Eldaeos"],
          24: [2080, 1, "Chyckoos"],
          25: [2078, 3, "Llefeios"],
          26: [2077, 2, "Snynuios"],
          27: [2075, 4, "Mucios"],
          29: [1621, 1, "Llosios"],
          30: [1620, 4, "Eldautia"],
          32: [1612, 4, "Readeos"],
          33: [1610, 2, "Slumaios"],
          35: [1148, 3, "Rakeyos"],
          36: [1145, 4, "Chaetia"],
          41: [807, 2, "Queyfios"],
          42: [809, 4, "Chardiios"],
          44: [795, 2, "Rayeatia"],
          45: [793, 4, "Zukyos"],
          46: [791, 2, "Deleios"],
          47: [789, 4, "Bluldios"],
          49: [783, 3, "Snefios"],
          50: [781, 2, "Roorios"],
          52: [496, 4, "Aldeatia"],
          53: [495, 3, "Stutaios"],
          55: [767, 1, "Hukios"],
          56: [766, 3, "Omauos"],
          57: [763, 2, "Chredeios"],
          59: [758, 1, "Voriios"],
          60: [759, 4, "Ackoeos"],
          61: [760, 1, "Doedyios"],
          63: [1062, 2, "Worautia"],
          64: [1058, 3, "Clatios"],
          65: [1059, 1, "Dubios"],
          68: [1066, 3, "Reerdoos"],
          69: [1067, 4, "Aldiatia"],
          70: [1069, 2, "Goneios"],
          75: [1507, 3, "Arayos"],
          76: [1505, 2, "Adautia"],
          77: [1503, 4, "Enoios"],
          78: [1501, 1, "Keewios"],
          79: [1499, 4, "Ustyos"],
          81: [1920, 2, "Endatia"],
          82: [1918, 1, "Engios"],
          83: [1917, 4, "Rhiphaios"],
          85: [2414, 3, "Vowaos"],
          86: [2415, 4, "Hinoos"],
          88: [3116, 3, "Desuios"],
          89: [3115, 2, "Ardutia"],
          90: [3114, 1, "Zifuos"],
          93: [3126, 1, "Snureios"],
          94: [3127, 3, "Cheatia"],
          96: [3820, 2, "Ackaos"],
          97: [3819, 1, "Nysiatia"],
          99: [4427, 2, "Tryvios"],
          100: [4428, 3, "Ightaytia"],
        },
        70: {
          1: [5135, 3, "Luzeios"],
          2: [5136, 4, "Cykoos"],
          4: [4672, 1, "Beucaios"],
          5: [4670, 3, "Thruxios"],
          7: [4069, 2, "Phirroios"],
          8: [4068, 4, "Luirdiios"],
          10: [4052, 2, "Theraitia"],
          11: [4050, 4, "Tanoitia"],
          16: [3389, 3, "Nocios"],
          17: [3387, 1, "Tytios"],
          19: [2642, 2, "Dooxios"],
          20: [2640, 4, "Tietoos"],
          21: [2638, 1, "Lleikaios"],
          22: [2636, 4, "Hyphuos"],
          24: [2081, 2, "Schuroios"],
          25: [2079, 4, "Raisiios"],
          32: [1613, 1, "Dreynios"],
          33: [1611, 3, "Trecios"],
          35: [1147, 2, "Rayaytia"],
          36: [1146, 1, "Chraymios"],
          37: [1144, 3, "Nyutia"],
          38: [1141, 4, "Iroos"],
          40: [812, 1, "Camios"],
          41: [808, 3, "Kinotia"],
          42: [810, 1, "Dilaos"],
          44: [796, 3, "Echotia"],
          45: [794, 1, "Cukios"],
          46: [792, 3, "Aruos"],
          47: [790, 1, "Kaisios"],
          49: [784, 4, "Huyios"],
          50: [782, 1, "Echyos"],
          55: [768, 2, "Kahyos"],
          56: [765, 4, "Adaitia"],
          57: [764, 1, "Mosaytia"],
          60: [762, 3, "Eroios"],
          61: [761, 2, "Inautia"],
          63: [1063, 1, "Quorios"],
          64: [1060, 4, "Zhusaios"],
          65: [1061, 2, "Lloyios"],
          67: [1070, 3, "Sussaios"],
          68: [1071, 2, "Breafuios"],
          72: [1509, 1, "Hineios"],
          73: [1508, 4, "Nepios"],
          85: [2416, 1, "Dayvios"],
          86: [2417, 2, "Creesoos"],
          88: [3118, 1, "Osooos"],
          89: [3117, 4, "Ceipaios"],
          90: [3119, 3, "Dikyos"],
          92: [3129, 1, "Shoivios"],
          93: [3128, 4, "Endauos"],
          94: [3132, 2, "Sesaos"],
          96: [3822, 4, "Tokios"],
          97: [3821, 3, "Doiwaios"],
          99: [4429, 4, "Saldoios"],
          100: [4430, 1, "Tukios"],
        },
        71: {
          1: [5133, 1, "Dreroios"],
          2: [5134, 2, "Hotoios"],
          4: [4675, 4, "Rodaios"],
          5: [4673, 2, "Esteos"],
          7: [4067, 1, "Wheygios"],
          8: [4066, 3, "Seynoios"],
          11: [4048, 2, "Thrayhios"],
          12: [4046, 4, "Blihios"],
          14: [3392, 2, "Stashoos"],
          15: [3390, 4, "Smeymios"],
          16: [3388, 2, "Chromiios"],
          17: [3386, 4, "Hineaos"],
          19: [2643, 3, "Queaos"],
          20: [2641, 1, "Aleoetia"],
          27: [2068, 3, "Warautia"],
          28: [2060, 1, "Estitia"],
          30: [1618, 2, "Asheos"],
          31: [1616, 4, "Siereos"],
          32: [1614, 2, "Achutia"],
          37: [1143, 2, "Neirios"],
          38: [1142, 1, "Oseuos"],
          40: [813, 4, "Retios"],
          41: [811, 2, "Omutia"],
          46: [800, 2, "Athytia"],
          47: [799, 4, "Staltaos"],
          49: [786, 2, "Phogoios"],
          50: [785, 3, "Acheyos"],
          52: [776, 1, "Droorios"],
          53: [773, 2, "Kinuos"],
          57: [769, 3, "Royios"],
          58: [771, 2, "Engoios"],
          67: [1072, 1, "Cereos"],
          68: [1073, 4, "Mypuios"],
          70: [1513, 1, "Rishuos"],
          71: [1512, 4, "Chriphuios"],
          72: [1510, 2, "Nayaios"],
          73: [1511, 3, "Zheywoos"],
          74: [1516, 4, "Snaunios"],
          76: [1933, 1, "Brosios"],
          77: [1934, 2, "Kiawios"],
          79: [1926, 2, "Isaitia"],
          80: [1925, 1, "Tririos"],
          81: [1922, 2, "Lysuios"],
          82: [1921, 1, "Rakeos"],
          84: [2419, 4, "Pereitia"],
          85: [2418, 3, "Whykios"],
          92: [3130, 2, "Nyeos"],
          93: [3131, 3, "Sylios"],
          94: [3133, 1, "Tixios"],
          99: [4431, 2, "Hataos"],
          100: [4432, 3, "Bleyroios"],
        },
        72: {
          4: [4676, 1, "Slynios"],
          5: [4674, 3, "Ormotia"],
          8: [4064, 4, "Chricyos"],
          9: [4062, 1, "Eldeeos"],
          11: [4049, 3, "Ribios"],
          12: [4047, 1, "Caykios"],
          14: [3393, 3, "Bituos"],
          15: [3391, 1, "Umutia"],
          22: [2631, 2, "Estutia"],
          23: [2629, 4, "Rakyos"],
          24: [2627, 2, "Waruos"],
          25: [2625, 4, "Whegios"],
          27: [2069, 4, "Cliraios"],
          28: [2061, 2, "Iaeyos"],
          30: [1619, 3, "Reunyios"],
          31: [1617, 1, "Dossoios"],
          32: [1615, 3, "Raynios"],
          34: [1602, 4, "Negoos"],
          35: [1600, 2, "Gipios"],
          37: [1149, 4, "Cheshiios"],
          38: [1150, 3, "Slatios"],
          43: [1131, 4, "Sluzios"],
          44: [1130, 2, "Nautoos"],
          49: [788, 4, "Nyitia"],
          50: [787, 1, "Naylaios"],
          52: [775, 4, "Shotios"],
          53: [774, 3, "Stuinios"],
          54: [780, 1, "Rihyos"],
          55: [777, 3, "Moreyos"],
          57: [770, 4, "Silios"],
          58: [772, 1, "Rhulios"],
          60: [1088, 3, "Aleeos"],
          61: [1086, 1, "Soixios"],
          62: [1083, 2, "Yeritia"],
          64: [1074, 1, "Mepios"],
          65: [1075, 2, "Thrileos"],
          70: [1514, 2, "Polatia"],
          71: [1515, 3, "Nesaios"],
          73: [1517, 1, "Leatoos"],
          74: [1518, 2, "Kiyios"],
          76: [1935, 3, "Etoutia"],
          77: [1936, 4, "Swotoios"],
          79: [1928, 4, "Taycios"],
          80: [1927, 3, "Trosteios"],
          81: [1924, 4, "Elmoos"],
          82: [1923, 3, "Sayooos"],
          84: [2420, 1, "Bitios"],
          85: [2421, 2, "Lertaos"],
          86: [2422, 3, "Nyautia"],
          87: [2423, 4, "Polutia"],
          89: [3134, 2, "Tuiraios"],
          90: [3135, 1, "Deleeos"],
          96: [3823, 3, "Phejios"],
          97: [3825, 1, "Sayoutia"],
          99: [4433, 4, "Ildios"],
          100: [4434, 1, "Zhihios"],
        },
        73: {
          1: [5131, 1, "Lleepoios"],
          2: [5132, 2, "Nihoios"],
          4: [4682, 4, "Moroos"],
          5: [4678, 2, "Zhoizios"],
          6: [4680, 4, "Phynios"],
          8: [4065, 3, "Wareitia"],
          9: [4063, 2, "Dafios"],
          11: [4061, 4, "Suilios"],
          12: [4060, 2, "Bureios"],
          14: [3395, 4, "Loinyios"],
          15: [3394, 2, "Loreatia"],
          17: [3376, 4, "Seytios"],
          18: [3374, 2, "Slyhios"],
          20: [2634, 1, "Aleios"],
          21: [2632, 3, "Slulios"],
          22: [2630, 1, "Gisios"],
          23: [2628, 3, "Umios"],
          24: [2626, 1, "Rothoios"],
          25: [2624, 3, "Acheitia"],
          27: [2072, 2, "Chonios"],
          28: [2070, 1, "Kinutia"],
          34: [1603, 1, "Unteios"],
          35: [1601, 3, "Awotia"],
          37: [1151, 2, "Loxeios"],
          38: [1152, 1, "Etouos"],
          40: [1135, 2, "Threnios"],
          41: [1133, 4, "Streeviios"],
          43: [1132, 1, "Shewios"],
          44: [1128, 3, "Troxios"],
          45: [1126, 1, "Swauluos"],
          46: [1124, 3, "Nauyios"],
          47: [1123, 1, "Dagios"],
          54: [779, 2, "Chreltuios"],
          55: [778, 4, "Birios"],
          60: [1087, 2, "Enthotia"],
          61: [1085, 4, "Samootia"],
          62: [1084, 3, "Ildetia"],
          64: [1076, 3, "Whonios"],
          65: [1077, 4, "Jotios"],
          66: [1079, 3, "Struvios"],
          67: [1081, 1, "Chebios"],
          69: [1522, 4, "Isotia"],
          70: [1521, 3, "Quytios"],
          76: [1937, 1, "Toriaos"],
          77: [1938, 2, "Trarduos"],
          79: [1929, 1, "Osaetia"],
          80: [1930, 2, "Schiecuios"],
          86: [2425, 2, "Kollios"],
          87: [2424, 1, "Oseos"],
          89: [3136, 4, "Nisios"],
          90: [3137, 3, "Liavios"],
          91: [3140, 4, "Savyios"],
          92: [3141, 3, "Lilios"],
          94: [3829, 1, "Onuitia"],
          95: [3827, 3, "Whohoos"],
          96: [3824, 4, "Baneos"],
          97: [3826, 2, "Umuios"],
          99: [4435, 2, "Jysios"],
          100: [4436, 3, "Bomios"],
        },
        74: {
          1: [5128, 4, "Veseuos"],
          2: [5129, 3, "Stuidiios"],
          4: [4683, 1, "Iriaos"],
          5: [4679, 3, "Snixios"],
          6: [4681, 1, "Blilios"],
          17: [3377, 1, "Retyos"],
          18: [3375, 3, "Slamios"],
          20: [2635, 2, "Atyos"],
          21: [2633, 4, "Sayoios"],
          27: [2073, 3, "Mobeos"],
          28: [2071, 2, "Deybyos"],
          30: [2056, 4, "Jeurios"],
          31: [2058, 1, "Trynios"],
          33: [1608, 2, "Schotoios"],
          34: [1606, 4, "Whehiios"],
          35: [1604, 2, "Kaduos"],
          40: [1136, 3, "Alditia"],
          41: [1134, 1, "Rilyos"],
          44: [1129, 2, "Angouos"],
          45: [1127, 4, "Snesuios"],
          46: [1125, 2, "Keahios"],
          47: [1121, 4, "Teiwuios"],
          48: [1119, 2, "Syneios"],
          50: [1117, 4, "Nyuios"],
          51: [1115, 2, "Laseios"],
          52: [1112, 3, "Zuqiios"],
          57: [1096, 1, "Niefiios"],
          58: [1095, 4, "Tirios"],
          61: [1089, 1, "Lihios"],
          62: [1090, 2, "Wotios"],
          65: [1078, 1, "Boedios"],
          66: [1080, 2, "Stiaruios"],
          67: [1082, 4, "Suleos"],
          69: [1524, 2, "Issotia"],
          70: [1523, 1, "Quaudios"],
          72: [1944, 3, "Roheos"],
          73: [1945, 4, "Tyrduos"],
          75: [1941, 1, "Rodayos"],
          76: [1939, 3, "Ingaios"],
          77: [1940, 4, "Sackeos"],
          79: [1931, 3, "Chreacoios"],
          80: [1932, 4, "Byndaios"],
          82: [2430, 2, "Naehios"],
          83: [2426, 3, "Rothatia"],
          84: [2427, 4, "Ildoeos"],
          90: [3138, 2, "Bleuyaos"],
          91: [3139, 1, "Poloos"],
          92: [3142, 2, "Erotia"],
          94: [3830, 2, "Wegoios"],
          95: [3828, 4, "Denitia"],
        },
        75: {
          1: [5127, 1, "Reunios"],
          2: [5130, 2, "Trannoos"],
          8: [4663, 3, "Oretia"],
          9: [4662, 2, "Moreetia"],
          10: [4661, 3, "Bleemios"],
          12: [4040, 1, "Jiarios"],
          13: [4038, 3, "Vesios"],
          15: [3385, 3, "Garaytia"],
          16: [3383, 1, "Diazios"],
          17: [3380, 2, "Nouriios"],
          18: [3378, 4, "Slisiios"],
          23: [2623, 4, "Curoos"],
          24: [2621, 2, "Augheatia"],
          25: [2619, 4, "Doopios"],
          30: [2055, 3, "Geidios"],
          31: [2053, 2, "Leruos"],
          33: [1609, 3, "Tranios"],
          34: [1607, 1, "Nomios"],
          35: [1605, 3, "Schatios"],
          37: [1594, 3, "Cateos"],
          38: [1593, 2, "Ruirios"],
          41: [1139, 2, "Bribeos"],
          42: [1137, 4, "Iaiatia"],
          47: [1122, 3, "Hadios"],
          48: [1120, 1, "Lloukiios"],
          50: [1118, 3, "Daidios"],
          51: [1114, 1, "Thrarios"],
          52: [1113, 4, "Dekyos"],
          53: [1110, 1, "Serutia"],
          54: [1108, 3, "Macios"],
          55: [1106, 1, "Tureetia"],
          57: [1097, 2, "Bresuios"],
          58: [1098, 3, "Stroodiios"],
          59: [1099, 2, "Samytia"],
          62: [1091, 4, "Tysoios"],
          63: [1092, 3, "Ranyios"],
          72: [1946, 1, "Coicyos"],
          73: [1947, 2, "Omaytia"],
          75: [1942, 2, "Bocoos"],
          76: [1943, 3, "Ightytia"],
          82: [2431, 4, "Lereos"],
          83: [2428, 1, "Strypoios"],
          84: [2429, 2, "Tiereos"],
          85: [2432, 1, "Aleetia"],
          87: [3144, 4, "Tylios"],
          88: [3143, 3, "Voevios"],
          97: [4449, 2, "Queetia"],
          98: [4450, 3, "Dokyios"],
        },
        76: {
          1: [5126, 3, "Thrareios"],
          2: [5122, 4, "Geunios"],
          3: [5121, 3, "Sleebios"],
          5: [5118, 4, "Zhatoios"],
          6: [5119, 2, "Soegios"],
          8: [4664, 1, "Staunios"],
          9: [4665, 4, "Noilios"],
          10: [4666, 1, "Gourryos"],
          12: [4041, 2, "Guzoos"],
          13: [4039, 4, "Aldaos"],
          15: [3384, 2, "Toleios"],
          16: [3382, 4, "Ackoos"],
          17: [3381, 3, "Snoizios"],
          18: [3379, 1, "Niajiios"],
          20: [3363, 2, "Streikios"],
          21: [3361, 4, "Swufoios"],
          23: [2622, 3, "Zhuikios"],
          24: [2620, 1, "Sysiios"],
          25: [2618, 3, "Caebiios"],
          26: [2617, 2, "Sulytia"],
          27: [2615, 4, "Quayos"],
          28: [2613, 2, "Kenios"],
          30: [2057, 4, "Lidaos"],
          31: [2054, 1, "Oldatia"],
          37: [1595, 1, "Rynutia"],
          38: [1591, 4, "Kychoios"],
          39: [1589, 3, "Chronoos"],
          41: [1140, 3, "Liteios"],
          42: [1138, 1, "Bofios"],
          44: [1578, 1, "Shyitia"],
          45: [1579, 2, "Layiios"],
          52: [1116, 3, "Rayyos"],
          53: [1111, 2, "Cossyios"],
          54: [1109, 4, "Drarios"],
          55: [1107, 2, "Imatia"],
          57: [1105, 1, "Quotoos"],
          58: [1101, 4, "Chrockaos"],
          59: [1100, 1, "Crolios"],
          60: [1102, 3, "Whuwuios"],
          62: [1094, 1, "Mosuos"],
          63: [1093, 2, "Swauxuos"],
          65: [1534, 1, "Etyos"],
          66: [1533, 4, "Nonoos"],
          68: [1529, 4, "Belaitia"],
          69: [1526, 2, "Delauos"],
          70: [1525, 4, "Ghaootia"],
          72: [1948, 3, "Catyios"],
          73: [1949, 4, "Loroos"],
          78: [2439, 2, "Crokaos"],
          79: [2436, 3, "Stretuos"],
          80: [2435, 2, "Nelios"],
          84: [2434, 3, "Kineos"],
          85: [2433, 4, "Shuxios"],
          87: [3146, 2, "Ackietia"],
          88: [3145, 1, "Ougheyos"],
          90: [3831, 1, "Onaitia"],
          91: [3833, 3, "Iaootia"],
          92: [3835, 1, "Tiewios"],
          93: [3837, 3, "Sayaeos"],
          94: [3839, 1, "Leadios"],
          95: [3841, 3, "Loenios"],
          97: [4451, 4, "Draoitia"],
          98: [4452, 1, "Enthoos"],
        },
        77: {
          1: [5125, 1, "Yauleios"],
          2: [5123, 2, "Schaywuios"],
          3: [5124, 1, "Homyios"],
          5: [5117, 3, "Jainoos"],
          6: [5120, 1, "Whafaios"],
          9: [4668, 2, "Smabaios"],
          10: [4667, 3, "Zholaios"],
          12: [4042, 3, "Geystiios"],
          13: [4044, 1, "Wheynios"],
          20: [3364, 3, "Warotia"],
          21: [3362, 1, "Viboios"],
          26: [2616, 1, "Snoxios"],
          27: [2614, 3, "Erietia"],
          28: [2612, 1, "Aughios"],
          30: [2059, 3, "Mailyos"],
          31: [2051, 4, "Chuchoios"],
          32: [2049, 1, "Clebios"],
          34: [2047, 2, "Zheitoos"],
          35: [2046, 4, "Crewios"],
          38: [1592, 2, "Nayteos"],
          39: [1590, 1, "Reebios"],
          44: [1581, 4, "Nusiios"],
          45: [1580, 3, "Kuchiios"],
          47: [1576, 2, "Throssaios"],
          48: [1574, 1, "Bonios"],
          49: [1572, 4, "Daehuos"],
          50: [1571, 3, "Athoios"],
          59: [1104, 2, "Tinaitia"],
          60: [1103, 4, "Hyzeios"],
          65: [1536, 3, "Nausios"],
          66: [1535, 2, "Schulyios"],
          68: [1530, 1, "Cyrroos"],
          69: [1527, 3, "Jacios"],
          70: [1528, 1, "Tewaos"],
          72: [1950, 1, "Llusios"],
          73: [1951, 2, "Swiexios"],
          74: [1952, 3, "Midios"],
          75: [1955, 2, "Phiasaios"],
          77: [2441, 3, "Swimoos"],
          78: [2440, 4, "Iaotia"],
          79: [2438, 1, "Engoos"],
          80: [2437, 4, "Whoihios"],
          81: [2446, 1, "Hosios"],
          82: [2447, 4, "Stujios"],
          87: [3148, 4, "Gosios"],
          88: [3147, 3, "Rigeos"],
          90: [3832, 2, "Chesuos"],
          91: [3834, 4, "Bruseos"],
          92: [3836, 2, "Slulaos"],
          93: [3838, 4, "Blolios"],
          94: [3840, 2, "Yelaos"],
          95: [3842, 4, "Rheseios"],
          97: [4453, 2, "Ashoos"],
          98: [4454, 3, "Moinniios"],
        },
        78: {
          5: [5116, 2, "Mabios"],
          6: [5114, 4, "Echaos"],
          7: [5112, 1, "Ranoetia"],
          12: [4043, 4, "Polytia"],
          13: [4045, 2, "Quaiyoios"],
          15: [4036, 3, "Shajios"],
          16: [4034, 1, "Brubiios"],
          17: [4028, 3, "Ereios"],
          18: [4026, 1, "Leumios"],
          20: [3367, 2, "Stiniios"],
          21: [3365, 4, "Laubios"],
          23: [3348, 2, "Smeusios"],
          24: [3347, 3, "Bloeseios"],
          31: [2052, 2, "Hatouos"],
          32: [2050, 3, "Quetios"],
          34: [2048, 1, "Yeroios"],
          35: [2044, 3, "Deleos"],
          36: [2043, 1, "Aughoitia"],
          39: [1598, 4, "Suindios"],
          40: [1596, 2, "Warytia"],
          42: [1588, 3, "Josios"],
          43: [1585, 4, "Lleuhuos"],
          44: [1582, 1, "Bloenios"],
          45: [1583, 2, "Zounnaos"],
          47: [1577, 4, "Angoios"],
          48: [1575, 3, "Emaitia"],
          49: [1573, 2, "Samoos"],
          50: [1569, 1, "Rakootia"],
          51: [1567, 3, "Stehios"],
          53: [1565, 1, "Keletia"],
          54: [1563, 2, "Maubios"],
          56: [1556, 3, "Iratia"],
          57: [1555, 2, "Tidiios"],
          62: [1544, 2, "Cawyios"],
          63: [1543, 3, "Usteetia"],
          64: [1538, 4, "Rerios"],
          65: [1537, 1, "Takios"],
          66: [1541, 4, "Toneatia"],
          68: [1531, 2, "Liarios"],
          69: [1532, 4, "Dredaios"],
          74: [1953, 4, "Tyrios"],
          75: [1954, 1, "Keachuos"],
          77: [2442, 1, "Kecios"],
          78: [2443, 2, "Ashoetia"],
          80: [2444, 3, "Sterios"],
          81: [2445, 2, "Suleeos"],
          82: [2448, 3, "Pefios"],
          84: [3152, 3, "Mivaos"],
          85: [3151, 2, "Cremios"],
          87: [3150, 2, "Uskeeos"],
          88: [3149, 1, "Finios"],
          97: [4455, 4, "Pethyos"],
          98: [4456, 1, "Smonuos"],
        },
        79: {
          2: [5398, 3, "Hunios"],
          3: [5399, 2, "Iaeos"],
          5: [5115, 1, "Derdyos"],
          6: [5113, 3, "Dazios"],
          7: [5111, 2, "Iaauos"],
          9: [5100, 3, "Thoirios"],
          10: [5099, 2, "Vereytia"],
          15: [4037, 4, "Doeluos"],
          16: [4035, 2, "Whiwios"],
          17: [4029, 4, "Snusteios"],
          18: [4027, 2, "Nuitaios"],
          20: [3368, 3, "Ryrios"],
          21: [3366, 1, "Kodios"],
          23: [3349, 1, "Brobios"],
          24: [3346, 4, "Liexios"],
          25: [3344, 2, "Risitia"],
          26: [3342, 4, "Essotia"],
          28: [2609, 3, "Wodyios"],
          29: [2608, 2, "Athios"],
          35: [2045, 2, "Hinuitia"],
          36: [2042, 4, "Tinitia"],
          37: [2041, 3, "Coelios"],
          39: [1599, 3, "Reineos"],
          40: [1597, 1, "Treixuios"],
          42: [1587, 1, "Threkios"],
          43: [1586, 2, "Untyos"],
          44: [1584, 3, "Seyckoos"],
          50: [1570, 2, "Risoetia"],
          51: [1568, 4, "Zhafyos"],
          53: [1566, 4, "Feykeos"],
          54: [1564, 3, "Ormeos"],
          55: [1561, 1, "Renios"],
          56: [1558, 4, "Neeniios"],
          57: [1557, 1, "Strokaos"],
          59: [1549, 3, "Aleuos"],
          60: [1547, 1, "Swockoios"],
          62: [1545, 4, "Sackyos"],
          63: [1546, 1, "Peroeos"],
          64: [1539, 2, "Newoos"],
          65: [1540, 3, "Smakios"],
          66: [1542, 2, "Untutia"],
          71: [1956, 1, "Beurios"],
          72: [1957, 2, "Foephios"],
          84: [3154, 1, "Aleaos"],
          85: [3153, 4, "Palios"],
          90: [3843, 1, "Timios"],
          91: [3845, 2, "Zhefoios"],
          93: [4437, 4, "Wopios"],
          94: [4439, 2, "Thrikios"],
          96: [4458, 3, "Gonios"],
          97: [4457, 2, "Taleos"],
        },
        80: {
          2: [5397, 1, "Zeyraos"],
          3: [5396, 4, "Voraios"],
          9: [5102, 1, "Naubiios"],
          10: [5101, 4, "Whaykaios"],
          12: [4658, 4, "Seiruios"],
          13: [4657, 2, "Nykios"],
          16: [4032, 3, "Daroios"],
          17: [4030, 1, "Nidios"],
          20: [3369, 4, "Neceios"],
          25: [3345, 1, "Undeyos"],
          26: [3343, 3, "Turdyos"],
          28: [2610, 1, "Achoeos"],
          29: [2605, 4, "Shyuitia"],
          30: [2604, 2, "Kyhios"],
          32: [2601, 4, "Rurios"],
          33: [2600, 3, "Ashyos"],
          36: [2039, 1, "Laurios"],
          37: [2038, 2, "Enuos"],
          46: [2016, 1, "Voratia"],
          47: [2014, 2, "Quilyos"],
          48: [2012, 1, "Poleaos"],
          55: [1562, 2, "Vayruios"],
          56: [1560, 3, "Ranaos"],
          57: [1559, 2, "Aryos"],
          59: [1550, 4, "Polotia"],
          60: [1548, 2, "Swaydoos"],
          68: [1964, 4, "Woriatia"],
          69: [1960, 1, "Gophaios"],
          70: [1961, 2, "Kesios"],
          71: [1958, 3, "Nileios"],
          72: [1959, 4, "Nintyos"],
          74: [2483, 3, "Nobios"],
          75: [2484, 2, "Whoyios"],
          77: [3176, 4, "Riloutia"],
          78: [3178, 2, "Zaitios"],
          79: [3180, 4, "Ranoitia"],
          81: [3168, 2, "Denoetia"],
          82: [3167, 1, "Strookoos"],
          84: [3156, 2, "Awuios"],
          85: [3155, 3, "Yealios"],
          86: [3159, 1, "Struluios"],
          87: [3160, 3, "Rhoneos"],
          89: [3847, 1, "Laltoios"],
          90: [3844, 3, "Eratia"],
          91: [3846, 4, "Atuos"],
          93: [4438, 1, "Trebeos"],
          94: [4440, 3, "Thresios"],
          96: [4460, 1, "Ineoios"],
          97: [4459, 4, "Itautia"],
          99: [4461, 1, "Esseutia"],
          100: [4462, 2, "Aldeios"],
        },
        81: {
          3: [5395, 2, "Ardyos"],
          4: [5393, 1, "Oreetia"],
          5: [5391, 2, "Chroideos"],
          7: [5110, 1, "Ceetuos"],
          8: [5108, 4, "Disoos"],
          9: [5104, 3, "Droerios"],
          10: [5103, 2, "Vurios"],
          12: [4659, 1, "Jaysios"],
          13: [4650, 3, "Statios"],
          14: [4649, 2, "Tanaos"],
          16: [4033, 4, "Tytaos"],
          17: [4031, 2, "Ashaitia"],
          19: [3371, 2, "Clanuios"],
          20: [3370, 1, "Cytoos"],
          22: [3358, 3, "Naerios"],
          23: [3357, 2, "Meusios"],
          28: [2611, 2, "Daraos"],
          29: [2607, 3, "Pephyios"],
          30: [2606, 1, "Tinaios"],
          32: [2602, 1, "Royuos"],
          33: [2599, 2, "Siloios"],
          34: [2598, 1, "Sitoos"],
          36: [2040, 3, "Ghauos"],
          37: [2036, 4, "Swardeios"],
          38: [2034, 2, "Taiotia"],
          40: [2032, 4, "Strialeos"],
          41: [2030, 2, "Dreimios"],
          42: [2028, 4, "Toolloios"],
          43: [2022, 2, "Snoduos"],
          44: [2020, 4, "Cosios"],
          46: [2017, 3, "Whaerroos"],
          47: [2015, 4, "Hinotia"],
          48: [2013, 3, "Sotoos"],
          49: [2009, 1, "Swokoos"],
          50: [2007, 3, "Samaeos"],
          52: [2e3, 4, "Rynoetia"],
          53: [1999, 3, "Haytios"],
          59: [1551, 1, "Loixuios"],
          60: [1553, 3, "Ackeytia"],
          62: [1980, 3, "Sloroios"],
          63: [1979, 2, "Pikiios"],
          65: [1968, 1, "Straidios"],
          66: [1969, 3, "Uskeuos"],
          68: [1965, 2, "Stipios"],
          69: [1962, 3, "Slarios"],
          70: [1963, 4, "Carios"],
          74: [2482, 1, "Vewyos"],
          75: [2485, 4, "Necaios"],
          77: [3177, 1, "Tholios"],
          78: [3179, 3, "Poleutia"],
          79: [3181, 1, "Trasios"],
          81: [3170, 4, "Blasios"],
          82: [3169, 3, "Tachuos"],
          84: [3158, 1, "Thaudios"],
          85: [3157, 4, "Nouryios"],
          86: [3161, 2, "Whicaos"],
          87: [3162, 4, "Snyghaos"],
          89: [3848, 4, "Striamoos"],
          90: [3849, 2, "Cerotia"],
          91: [3850, 1, "Cruhios"],
          93: [4441, 4, "Lydaos"],
          94: [4443, 2, "Breetiios"],
          99: [4463, 3, "Smynios"],
          100: [4464, 4, "Hoesios"],
        },
        82: {
          4: [5394, 3, "Rucios"],
          5: [5392, 4, "Eldeytia"],
          7: [5109, 3, "Cerietia"],
          8: [5107, 2, "Cheeatia"],
          9: [5106, 1, "Quaootia"],
          10: [5105, 4, "Foicuios"],
          12: [4660, 2, "Ackios"],
          13: [4652, 4, "Yeybios"],
          14: [4651, 1, "Ormiaos"],
          19: [3372, 3, "Zhymios"],
          20: [3373, 4, "Asaetia"],
          22: [3359, 4, "Meymios"],
          23: [3356, 1, "Lutoios"],
          24: [3354, 3, "Etieos"],
          25: [3352, 1, "Stoumeos"],
          26: [3350, 3, "Sayuos"],
          33: [2596, 3, "Peritia"],
          34: [2595, 4, "Chaeuos"],
          37: [2037, 3, "Tutios"],
          38: [2035, 1, "Blostuios"],
          40: [2033, 1, "Smointoios"],
          41: [2031, 3, "Anaos"],
          42: [2029, 1, "Skeloos"],
          43: [2023, 3, "Fuyyos"],
          44: [2021, 1, "Cedios"],
          46: [2018, 1, "Nysotia"],
          47: [2019, 2, "Draytia"],
          49: [2010, 2, "Cheoutia"],
          50: [2008, 4, "Itooos"],
          52: [2002, 2, "Kimoetia"],
          53: [2001, 1, "Vortiios"],
          54: [2003, 2, "Yiveios"],
          56: [1989, 1, "Emitia"],
          57: [1987, 3, "Luluos"],
          59: [1552, 2, "Kaliatia"],
          60: [1554, 4, "Radeutia"],
          62: [1982, 1, "Ryhuios"],
          63: [1981, 4, "Siarios"],
          65: [1970, 4, "Tehyios"],
          66: [1971, 2, "Rahios"],
          68: [1966, 1, "Enthaos"],
          69: [1967, 4, "Thereaos"],
          72: [2461, 1, "Nanios"],
          73: [2458, 3, "Gegios"],
          74: [2481, 2, "Iaeios"],
          79: [3182, 2, "Tonuos"],
          82: [3171, 1, "Kaucoios"],
          93: [4442, 1, "Sykios"],
          94: [4444, 3, "Heisios"],
          96: [4472, 4, "Queeutia"],
          97: [4471, 3, "Taykios"],
          98: [4466, 2, "Eldoutia"],
          99: [4465, 1, "Dunyos"],
          100: [4474, 2, "Binnoos"],
        },
        83: {
          13: [4654, 3, "Tanietia"],
          14: [4653, 2, "Noosaos"],
          16: [4648, 1, "Kairios"],
          17: [4647, 3, "Brockeios"],
          23: [3360, 2, "Emaios"],
          24: [3355, 4, "Ciefios"],
          25: [3353, 2, "Mehuos"],
          26: [3351, 4, "Sepaos"],
          28: [3339, 2, "Tageos"],
          29: [3338, 1, "Lirios"],
          30: [3333, 4, "Heduios"],
          31: [3332, 3, "Echeatia"],
          33: [2597, 2, "Swicoios"],
          34: [2593, 1, "Dilios"],
          35: [2591, 2, "Endytia"],
          52: [2006, 4, "Dylios"],
          53: [2005, 3, "Benuos"],
          54: [2004, 4, "Enthios"],
          56: [1990, 2, "Quookios"],
          57: [1988, 4, "Radaeos"],
          62: [1984, 3, "Rakeeos"],
          63: [1983, 2, "Teatios"],
          65: [1972, 1, "Honitia"],
          66: [1973, 3, "Deniaos"],
          71: [2465, 1, "Donios"],
          72: [2462, 2, "Athietia"],
          73: [2460, 4, "Watios"],
          76: [2486, 1, "Sytuios"],
          77: [2488, 2, "Anatia"],
          79: [3183, 3, "Lereytia"],
          80: [3184, 4, "Niazios"],
          82: [3172, 2, "Chaeos"],
          83: [3173, 3, "Tesios"],
          85: [3851, 4, "Kalutia"],
          86: [3853, 2, "Phaylios"],
          88: [4479, 3, "Inaaytia"],
          89: [4477, 4, "Susios"],
          90: [4475, 2, "Dareeos"],
          92: [4446, 1, "Emauos"],
          93: [4445, 4, "Honios"],
          94: [4473, 2, "Sopiios"],
          96: [4470, 2, "Tatios"],
          97: [4469, 1, "Shurios"],
          98: [4468, 4, "Feajios"],
          99: [4467, 3, "Bresoos"],
        },
        84: {
          4: [5408, 2, "Eldaitia"],
          5: [5407, 1, "Schonios"],
          6: [5404, 2, "Rihiios"],
          7: [5402, 4, "Drurios"],
          8: [5400, 3, "Sliruios"],
          10: [5384, 4, "Lejios"],
          11: [5383, 2, "Tanitia"],
          13: [4656, 4, "Yeretia"],
          14: [4655, 1, "Adoutia"],
          16: [4643, 4, "Moulios"],
          17: [4641, 2, "Stahaios"],
          18: [4639, 4, "Stywoios"],
          20: [4020, 4, "Rynaos"],
          21: [4019, 3, "Rayutia"],
          28: [3341, 4, "Untytia"],
          29: [3340, 3, "Dewios"],
          30: [3335, 2, "Bliefios"],
          31: [3334, 1, "Smesios"],
          33: [2603, 3, "Kinios"],
          34: [2594, 4, "Theretia"],
          35: [2592, 3, "Heyaos"],
          37: [2583, 2, "Kipaos"],
          38: [2580, 3, "Kaleos"],
          39: [2579, 4, "Kaqyos"],
          41: [2567, 3, "Swildoios"],
          42: [2566, 2, "Lyryios"],
          44: [2559, 2, "Zhaldyos"],
          45: [2558, 1, "Ladios"],
          46: [2555, 2, "Shunnaos"],
          47: [2554, 1, "Mudaios"],
          49: [2553, 4, "Cizios"],
          50: [2552, 3, "Atitia"],
          57: [1992, 3, "Dreloios"],
          58: [1991, 1, "Leraos"],
          59: [1996, 3, "Hichoios"],
          60: [1995, 1, "Rynaetia"],
          62: [1986, 1, "Huroos"],
          63: [1985, 4, "Belitia"],
          65: [1974, 4, "Dakoos"],
          66: [1975, 2, "Tremaios"],
          67: [1978, 4, "Sninios"],
          69: [2469, 1, "Uskitia"],
          70: [2466, 3, "Aughetia"],
          71: [2464, 4, "Quirios"],
          75: [2490, 4, "Domaios"],
          76: [2487, 3, "Rayoetia"],
          77: [2489, 4, "Niloios"],
          79: [3186, 2, "Luyios"],
          80: [3185, 1, "Aneetia"],
          82: [3175, 1, "Deteios"],
          83: [3174, 4, "Fyphyios"],
          85: [3852, 1, "Untoetia"],
          86: [3854, 3, "Athotia"],
          88: [4480, 2, "Dabuios"],
          89: [4478, 1, "Kelaitia"],
          90: [4476, 3, "Oruos"],
          92: [4448, 3, "Delios"],
          93: [4447, 2, "Tramios"],
        },
        85: {
          4: [5409, 3, "Clinios"],
          5: [5406, 4, "Irios"],
          6: [5405, 3, "Biseios"],
          7: [5403, 1, "Rhenios"],
          8: [5401, 2, "Toibios"],
          10: [5386, 3, "Irutia"],
          11: [5385, 1, "Snowios"],
          16: [4644, 1, "Holios"],
          17: [4642, 3, "Brabios"],
          18: [4640, 1, "Jideios"],
          20: [4021, 1, "Taseaos"],
          21: [4018, 2, "Shuchuios"],
          22: [4017, 1, "Shyeutia"],
          23: [4014, 2, "Gotios"],
          25: [3997, 3, "Wareuos"],
          26: [3996, 2, "Snolios"],
          30: [3337, 4, "Ramyios"],
          31: [3336, 3, "Blabios"],
          37: [2584, 4, "Waretia"],
          38: [2582, 1, "Tonaetia"],
          39: [2581, 2, "Stutios"],
          41: [2569, 1, "Whybios"],
          42: [2568, 4, "Sleypios"],
          44: [2561, 4, "Yeybeos"],
          45: [2560, 3, "Vorytia"],
          46: [2557, 4, "Lloosios"],
          47: [2556, 3, "Yakios"],
          49: [2551, 2, "Swistios"],
          50: [2550, 1, "Boelios"],
          51: [2547, 2, "Strosios"],
          52: [2546, 1, "Womiios"],
          54: [2545, 2, "Noophaos"],
          55: [2543, 4, "Quaaeos"],
          57: [1994, 2, "Shianios"],
          58: [1993, 4, "Sathiios"],
          59: [1998, 2, "Ranotia"],
          60: [1997, 4, "Tapios"],
          66: [1976, 1, "Quaylios"],
          67: [1977, 3, "Chroweios"],
          69: [2470, 4, "Adoetia"],
          70: [2467, 2, "Taqoos"],
          71: [2468, 1, "Rukaios"],
          73: [2494, 4, "Dyneatia"],
          74: [2493, 3, "Schorios"],
          75: [2491, 1, "Rothios"],
          76: [2492, 2, "Yikios"],
          77: [2497, 1, "Loudoios"],
          85: [3855, 4, "Drerdoos"],
          86: [3857, 2, "Dyqeios"],
          88: [4481, 4, "Hotoos"],
          89: [4482, 2, "Teifios"],
          95: [4983, 1, "Chriayios"],
          96: [4984, 3, "Skelouos"],
          97: [4986, 4, "Oughaos"],
        },
        86: {
          3: [5411, 1, "Bekyos"],
          4: [5410, 2, "Fesios"],
          10: [5388, 4, "Ashetia"],
          11: [5387, 2, "Rothotia"],
          13: [5097, 4, "Ineatia"],
          14: [5096, 3, "Levios"],
          16: [4645, 2, "Aldaeos"],
          17: [4646, 4, "Droelteos"],
          22: [4016, 4, "Stemios"],
          23: [4015, 3, "Nyseitia"],
          25: [3998, 4, "Suimyos"],
          26: [3995, 1, "Taneitia"],
          27: [3993, 3, "Ineyos"],
          28: [3992, 2, "Lliexaos"],
          33: [3325, 2, "Atheutia"],
          34: [3323, 4, "Reexios"],
          36: [2586, 1, "Phosoios"],
          37: [2585, 2, "Aleutia"],
          41: [2571, 3, "Scheufaos"],
          42: [2570, 2, "Dusios"],
          44: [2563, 2, "Ashitia"],
          45: [2562, 1, "Engitia"],
          51: [2549, 4, "Weduios"],
          52: [2548, 3, "Bluinaios"],
          54: [2544, 3, "Ildaetia"],
          55: [2542, 1, "Danetia"],
          62: [2518, 2, "Aleaetia"],
          63: [2517, 4, "Queryos"],
          64: [2515, 2, "Zastuios"],
          73: [2495, 1, "Phetios"],
          74: [2496, 2, "Wytios"],
          79: [3188, 4, "Hydios"],
          80: [3189, 3, "Riasyios"],
          81: [3192, 2, "Lordyos"],
          82: [3193, 3, "Taneos"],
          84: [3859, 4, "Nyootia"],
          85: [3856, 1, "Sayotia"],
          86: [3858, 3, "Vutios"],
          88: [4484, 1, "Enthitia"],
          89: [4483, 3, "Honeos"],
          91: [4968, 4, "Sowoos"],
          92: [4969, 1, "Araeos"],
          94: [4979, 1, "Adoos"],
          95: [4981, 4, "Citeios"],
          96: [4985, 2, "Haykios"],
          97: [4987, 1, "Ildieos"],
        },
        87: {
          3: [5412, 4, "Leruios"],
          4: [5413, 3, "Ightuios"],
          6: [5418, 2, "Rakouos"],
          7: [5415, 3, "Cisyios"],
          8: [5414, 4, "Arduos"],
          10: [5390, 1, "Lloroos"],
          11: [5389, 3, "Ranitia"],
          13: [5098, 1, "Achios"],
          14: [5095, 2, "Bywios"],
          19: [4632, 2, "Undotia"],
          20: [4631, 3, "Therotia"],
          22: [4024, 2, "Roryos"],
          23: [4022, 1, "Chauos"],
          28: [3991, 1, "Eldieos"],
          29: [3987, 4, "Kaleetia"],
          30: [3985, 2, "Essoeos"],
          31: [3983, 4, "Kediios"],
          33: [3326, 3, "Shelios"],
          34: [3324, 1, "Soryos"],
          36: [2588, 4, "Wherios"],
          37: [2587, 3, "Visios"],
          39: [2575, 3, "Vuvios"],
          40: [2574, 2, "Tureutia"],
          41: [2573, 1, "Throtaios"],
          42: [2572, 4, "Loreaos"],
          44: [2565, 4, "Elduios"],
          45: [2564, 3, "Angoutia"],
          47: [3286, 1, "Lyeoos"],
          48: [3283, 3, "Shaekios"],
          49: [3282, 1, "Chaexios"],
          54: [2540, 4, "Rayiatia"],
          55: [2538, 2, "Yifios"],
          56: [2536, 4, "Latoios"],
          57: [2534, 2, "Echeeos"],
          59: [2522, 3, "Marios"],
          60: [2521, 2, "Neycuios"],
          62: [2520, 3, "Pasuios"],
          63: [2519, 1, "Hatotia"],
          64: [2516, 3, "Rynauos"],
          65: [2511, 2, "Thieyios"],
          66: [2510, 4, "Eldouos"],
          67: [2507, 3, "Atetia"],
          68: [2506, 4, "Rovios"],
          70: [2499, 4, "Denetia"],
          71: [2498, 3, "Naleos"],
          76: [3197, 3, "Zholoos"],
          77: [3196, 2, "Shyios"],
          79: [3190, 2, "Shautios"],
          80: [3191, 1, "Lazios"],
          81: [3194, 4, "Etaetia"],
          82: [3195, 1, "Choedios"],
          84: [3860, 3, "Turetia"],
          85: [3861, 2, "Tegios"],
          91: [4970, 3, "Tirrios"],
          92: [4971, 2, "Sereyos"],
          94: [4980, 2, "Chraestios"],
          95: [4982, 3, "Nyseeos"],
        },
        88: {
          6: [5419, 4, "Taiauos"],
          7: [5417, 1, "Theroios"],
          8: [5416, 2, "Etaos"],
          14: [5093, 4, "Nebuos"],
          15: [5091, 2, "Ildoios"],
          16: [5089, 4, "Nareos"],
          17: [5087, 2, "Cranoos"],
          19: [4634, 4, "Uskoos"],
          20: [4633, 1, "Samitia"],
          22: [4025, 3, "Gysuos"],
          23: [4023, 4, "Sulaos"],
          25: [4e3, 3, "Ireuos"],
          26: [3999, 2, "Llilliios"],
          29: [3988, 1, "Strenuos"],
          30: [3986, 3, "Yutoios"],
          31: [3984, 1, "Eteuos"],
          33: [3329, 2, "Slylyos"],
          34: [3327, 4, "Rhirios"],
          36: [2590, 1, "Venoos"],
          37: [2589, 2, "Radotia"],
          39: [2577, 1, "Tujuos"],
          40: [2576, 4, "Losios"],
          41: [2578, 3, "Drabuos"],
          47: [3287, 2, "Yorios"],
          48: [3285, 4, "Keywios"],
          49: [3284, 2, "Kissaios"],
          51: [3271, 1, "Snyhios"],
          52: [3270, 4, "Labios"],
          54: [2541, 1, "Isautia"],
          55: [2539, 3, "Kaceos"],
          56: [2537, 1, "Rhiatheos"],
          57: [2535, 3, "Chehios"],
          59: [2524, 1, "Tharios"],
          60: [2523, 4, "Taphoios"],
          66: [2512, 1, "Ledeios"],
          67: [2509, 2, "Etooos"],
          68: [2508, 1, "Schuirios"],
          70: [2501, 2, "Realtyios"],
          71: [2500, 1, "Moruos"],
          73: [3211, 2, "Liebios"],
          74: [3210, 1, "Rehuos"],
          76: [3198, 4, "Achootia"],
          77: [3199, 1, "Anguios"],
          87: [4491, 3, "Vayloos"],
          88: [4493, 1, "Maupyios"],
          90: [4973, 1, "Lidios"],
          91: [4972, 4, "Chrehyios"],
          97: [5047, 3, "Hatuos"],
          98: [5049, 2, "Reutios"],
        },
        89: {
          2: [5608, 2, "Ardatia"],
          3: [5607, 1, "Sneereios"],
          5: [5425, 3, "Essatia"],
          6: [5424, 2, "Llinyios"],
          8: [5420, 4, "Tauneos"],
          9: [5421, 3, "Zydios"],
          11: [5381, 1, "Omouos"],
          12: [5382, 2, "Nileos"],
          14: [5094, 1, "Deekaos"],
          15: [5092, 3, "Deheos"],
          16: [5090, 1, "Reyghyios"],
          17: [5088, 3, "Zoltaios"],
          19: [4636, 3, "Swuyuos"],
          20: [4635, 2, "Comaios"],
          25: [4002, 1, "Elmaos"],
          26: [4001, 4, "Engaetia"],
          27: [4005, 1, "Sizios"],
          30: [3990, 4, "Bloifios"],
          31: [3989, 2, "Orotia"],
          33: [3330, 3, "Chradios"],
          34: [3328, 1, "Aroetia"],
          43: [3301, 4, "Clejios"],
          44: [3299, 2, "Zhajios"],
          45: [3298, 1, "Creenios"],
          48: [3289, 1, "Danytia"],
          49: [3288, 3, "Inaoios"],
          51: [3273, 3, "Roemios"],
          52: [3272, 2, "Rydoos"],
          59: [2526, 3, "Doegoios"],
          60: [2525, 2, "Peurdoios"],
          61: [2527, 4, "Ziaghuios"],
          63: [3234, 2, "Sauloios"],
          64: [3233, 3, "Zhilios"],
          70: [2503, 4, "Pereuos"],
          71: [2502, 3, "Lyeyos"],
          73: [3213, 4, "Taneatia"],
          74: [3212, 3, "Skelauos"],
          76: [3201, 3, "Ramyos"],
          77: [3200, 2, "Phuikaos"],
          78: [3204, 4, "Clandoios"],
          79: [3206, 1, "Quyrios"],
          81: [3863, 2, "Shoosios"],
          82: [3864, 3, "Winios"],
          84: [4485, 1, "Oughutia"],
          85: [4487, 3, "Shaenaios"],
          86: [4489, 1, "Ghaayos"],
          87: [4492, 4, "Dronaos"],
          88: [4494, 2, "Ateios"],
          90: [4975, 2, "Kinaos"],
          91: [4974, 3, "Honeuos"],
          92: [4978, 2, "Deexaios"],
          94: [5009, 4, "Biecios"],
          95: [5010, 1, "Chasoios"],
          97: [5048, 4, "Aldoos"],
          98: [5050, 1, "Lihaos"],
        },
        90: {
          2: [5606, 4, "Keleitia"],
          3: [5605, 3, "Eldytia"],
          5: [5426, 4, "Perytia"],
          6: [5427, 1, "Peruos"],
          8: [5423, 1, "Wheukoios"],
          9: [5422, 2, "Bracheios"],
          11: [5379, 4, "Queeatia"],
          12: [5378, 3, "Wharios"],
          19: [4638, 1, "Tootios"],
          20: [4637, 4, "Awatia"],
          22: [4622, 2, "Vawios"],
          23: [4621, 3, "Lorietia"],
          26: [4003, 2, "Celluos"],
          27: [4004, 3, "Nalatia"],
          28: [4006, 2, "Mosetia"],
          36: [3318, 1, "Napyios"],
          37: [3315, 3, "Thrudoios"],
          38: [3314, 1, "Isuitia"],
          40: [3306, 1, "Lovios"],
          41: [3305, 4, "Whyhios"],
          43: [3302, 1, "Zaindaios"],
          44: [3300, 3, "Pelios"],
          45: [3296, 4, "Peroutia"],
          46: [3295, 2, "Fysaos"],
          51: [3275, 1, "Yusios"],
          52: [3274, 4, "Direos"],
          54: [3264, 1, "Hisyos"],
          55: [3262, 3, "Cheaos"],
          56: [3260, 1, "Lyeytia"],
          58: [2531, 3, "Queeitia"],
          59: [2530, 4, "Pasios"],
          60: [2529, 1, "Ranuios"],
          61: [2528, 3, "Tronios"],
          63: [3236, 1, "Riliios"],
          64: [3235, 4, "Lemaios"],
          65: [3237, 1, "Nasoios"],
          67: [3231, 2, "Buroos"],
          68: [3232, 1, "Zhenios"],
          70: [2505, 2, "Hateetia"],
          71: [2504, 1, "Breyrios"],
          73: [3215, 2, "Enoeos"],
          74: [3214, 1, "Llasaios"],
          76: [3202, 4, "Mideos"],
          77: [3203, 1, "Swaecios"],
          78: [3205, 3, "Seuleios"],
          79: [3207, 2, "Nalouos"],
          81: [3862, 1, "Lalaios"],
          82: [3865, 4, "Reqaos"],
          84: [4486, 2, "Boivyos"],
          85: [4488, 4, "Vesuitia"],
          86: [4490, 2, "Siaxios"],
          91: [4976, 1, "Zhykios"],
          92: [4977, 4, "Smivios"],
          94: [5008, 3, "Oldaos"],
          95: [5011, 2, "Ightaeos"],
          98: [5051, 2, "Iteos"],
          99: [5052, 3, "Pabeos"],
        },
        91: {
          1: [5611, 1, "Shyuos"],
          2: [5604, 2, "Unteetia"],
          3: [5603, 1, "Losiios"],
          11: [5380, 1, "Estetia"],
          12: [5377, 2, "Saellaios"],
          13: [5375, 4, "Cydios"],
          14: [5373, 2, "Polaios"],
          16: [5363, 2, "Blofios"],
          17: [5362, 1, "Blouvios"],
          22: [4623, 1, "Chrurtios"],
          23: [4620, 4, "Kayduios"],
          24: [4619, 1, "Emietia"],
          27: [4008, 4, "Garoos"],
          28: [4007, 1, "Relios"],
          29: [4011, 4, "Nyeios"],
          30: [4012, 3, "Seryos"],
          32: [3974, 4, "Jelios"],
          33: [3972, 2, "Dedios"],
          35: [3320, 3, "Tradios"],
          36: [3319, 2, "Duirdiios"],
          37: [3317, 4, "Kelaios"],
          38: [3316, 2, "Geunuios"],
          40: [3308, 3, "Lladaos"],
          41: [3307, 2, "Lloebios"],
          45: [3297, 3, "Enthaeos"],
          46: [3294, 1, "Herios"],
          47: [3291, 4, "Cakoos"],
          48: [3290, 1, "Topios"],
          50: [3278, 4, "Ryneitia"],
          51: [3277, 3, "Ardoios"],
          52: [3276, 2, "Dynytia"],
          54: [3265, 2, "Naleios"],
          55: [3263, 4, "Geedios"],
          56: [3261, 2, "Ingoos"],
          58: [2532, 1, "Maidios"],
          59: [2533, 2, "Worayos"],
          64: [3239, 3, "Nikios"],
          65: [3238, 2, "Unditia"],
          67: [3230, 4, "Reileos"],
          68: [3229, 3, "Serouos"],
          73: [3216, 3, "Sleyyoos"],
          78: [3209, 1, "Neidaos"],
          79: [3208, 4, "Straefios"],
          81: [3866, 3, "Cealios"],
          82: [3867, 2, "Worietia"],
          88: [4500, 1, "Lakeios"],
          89: [4502, 2, "Stiarios"],
          95: [5016, 3, "Undoos"],
          96: [5017, 4, "Osauos"],
          98: [5054, 1, "Shesuos"],
          99: [5053, 4, "Deneatia"],
        },
        92: {
          1: [5610, 4, "Denaeos"],
          2: [5609, 3, "Neejios"],
          5: [5596, 2, "Zimoios"],
          6: [5594, 4, "Lialloos"],
          8: [5569, 3, "Seyrios"],
          9: [5568, 2, "Voukios"],
          13: [5376, 1, "Lipios"],
          14: [5374, 3, "Lloodios"],
          16: [5365, 4, "Skeleeos"],
          17: [5364, 3, "Mandoos"],
          19: [5084, 1, "Imitia"],
          20: [5085, 4, "Turaos"],
          22: [4630, 2, "Snimyos"],
          23: [4624, 3, "Narios"],
          24: [4618, 2, "Clytios"],
          25: [4617, 3, "Quelios"],
          28: [4009, 3, "Thranios"],
          29: [4010, 2, "Iseitia"],
          30: [4013, 1, "Kimeatia"],
          32: [3975, 1, "Echatia"],
          33: [3973, 3, "Aseios"],
          35: [3321, 4, "Maystiios"],
          36: [3322, 1, "Dreekios"],
          41: [3309, 4, "Hegios"],
          42: [3310, 1, "Onios"],
          43: [3311, 2, "Aritia"],
          45: [3304, 4, "Ceyaos"],
          46: [3303, 2, "Gumuios"],
          47: [3293, 3, "Boenios"],
          48: [3292, 2, "Lakios"],
          50: [3279, 2, "Dysios"],
          51: [3280, 1, "Supios"],
          52: [3281, 4, "Snockios"],
          54: [3267, 1, "Asoitia"],
          55: [3266, 3, "Ustaos"],
          61: [3249, 1, "Nysatia"],
          62: [3248, 4, "Teamios"],
          64: [3247, 1, "Rhonios"],
          65: [3246, 4, "Slezios"],
          67: [3226, 2, "Bicios"],
          68: [3225, 1, "Llukios"],
          69: [3222, 2, "Traevaos"],
          70: [3221, 1, "Skeleos"],
          72: [3218, 1, "Piecaios"],
          73: [3217, 4, "Zhisios"],
          75: [3885, 1, "Schaebuios"],
          76: [3884, 4, "Dotios"],
          81: [3868, 1, "Nutios"],
          82: [3869, 4, "Nyseyos"],
          83: [3873, 1, "Smooneos"],
          84: [3875, 2, "Traisios"],
          86: [4495, 4, "Dyneytia"],
          87: [4497, 3, "Ardautia"],
          88: [4499, 4, "Rilios"],
          89: [4501, 3, "Smugiios"],
          90: [4503, 4, "Lyeuitia"],
          92: [4996, 1, "Phayniios"],
          93: [4997, 2, "Atheos"],
          95: [5022, 1, "Meroios"],
          96: [5023, 2, "Poulios"],
          98: [5057, 3, "Yybiios"],
          99: [5055, 2, "Roojios"],
        },
        93: {
          1: [5613, 3, "Rurdaios"],
          2: [5612, 2, "Noweios"],
          4: [5598, 4, "Chaeatia"],
          5: [5597, 3, "Therautia"],
          6: [5595, 1, "Mohios"],
          8: [5570, 4, "Beloos"],
          9: [5567, 1, "Beunios"],
          10: [5566, 4, "Raleios"],
          11: [5564, 2, "Ghaaos"],
          16: [5367, 2, "Bosoios"],
          17: [5366, 1, "Hayzios"],
          19: [5082, 3, "Swahios"],
          20: [5081, 2, "Vesaos"],
          24: [4629, 4, "Pharios"],
          25: [4616, 1, "Ceraitia"],
          26: [4615, 2, "Zeusios"],
          32: [3976, 2, "Itoutia"],
          33: [3978, 4, "Loinnaios"],
          38: [3966, 1, "Launeios"],
          39: [3965, 4, "Rhawoos"],
          42: [3313, 4, "Chralios"],
          43: [3312, 3, "Senios"],
          54: [3269, 2, "Katios"],
          55: [3268, 4, "Domios"],
          57: [3257, 1, "Issetia"],
          58: [3256, 4, "Leirios"],
          59: [3253, 1, "Yerutia"],
          60: [3252, 4, "Taneuos"],
          61: [3251, 3, "Emyos"],
          62: [3250, 2, "Sereeos"],
          67: [3227, 3, "Ceuzios"],
          68: [3228, 4, "Deanios"],
          69: [3223, 3, "Seudios"],
          70: [3224, 4, "Banaeos"],
          72: [3219, 2, "Beeryios"],
          73: [3220, 3, "Sloipyios"],
          75: [3887, 3, "Taiaos"],
          76: [3886, 2, "Olduitia"],
          78: [3877, 3, "Onoetia"],
          79: [3876, 2, "Quiroios"],
          82: [3871, 2, "Loroeos"],
          83: [3872, 3, "Shaulaios"],
          84: [3874, 4, "Taiiaos"],
          86: [4496, 1, "Bylios"],
          87: [4498, 2, "Kimeitia"],
          89: [4505, 1, "Pimoios"],
          90: [4504, 2, "Tiaetia"],
          92: [4998, 3, "Zysaos"],
          93: [4999, 4, "Ineetia"],
          98: [5058, 1, "Soikoios"],
          99: [5056, 4, "Saeheios"],
        },
        94: {
          4: [5599, 1, "Toratia"],
          5: [5600, 2, "Mumios"],
          10: [5565, 3, "Janeios"],
          11: [5563, 1, "Daraeos"],
          12: [5561, 3, "Zykaios"],
          13: [5559, 1, "Vythyios"],
          15: [5370, 1, "Dyhios"],
          16: [5369, 4, "Meyfios"],
          17: [5368, 3, "Iruos"],
          19: [5083, 4, "Enutia"],
          20: [5080, 1, "Gaunios"],
          21: [5078, 3, "Inaeatia"],
          22: [5077, 2, "Dreerios"],
          26: [4625, 3, "Yykuos"],
          27: [4626, 4, "Seruos"],
          29: [4613, 1, "Shosiios"],
          30: [4611, 3, "Jienios"],
          32: [3977, 3, "Loejios"],
          33: [3979, 1, "Smeneios"],
          34: [3981, 3, "Croilios"],
          36: [3970, 4, "Naesios"],
          37: [3968, 3, "Nydaios"],
          38: [3967, 2, "Tayzios"],
          39: [3964, 3, "Tinaos"],
          40: [3961, 2, "Lloocyios"],
          45: [3950, 2, "Aretia"],
          46: [3949, 1, "Deusios"],
          48: [3936, 4, "Schuseios"],
          49: [3935, 3, "Juldeos"],
          51: [3933, 4, "Ryckoos"],
          52: [3932, 3, "Saycios"],
          57: [3259, 3, "Ateos"],
          58: [3258, 2, "Skelios"],
          59: [3255, 3, "Hunuios"],
          60: [3254, 2, "Omeutia"],
          64: [3911, 3, "Lumios"],
          65: [3910, 2, "Kimytia"],
          75: [3889, 1, "Phiwios"],
          76: [3888, 4, "Whealloos"],
          78: [3879, 1, "Cutios"],
          79: [3878, 4, "Darooos"],
          80: [3880, 2, "Tanaios"],
          92: [5e3, 1, "Tiaautia"],
          93: [5001, 2, "Chroemios"],
          95: [5036, 4, "Snimios"],
          96: [5038, 2, "Essutia"],
        },
        95: {
          1: [5624, 1, "Sydios"],
          2: [5625, 4, "Lysios"],
          4: [5602, 4, "Sainios"],
          5: [5601, 3, "Pediios"],
          7: [5585, 1, "Lorios"],
          8: [5584, 4, "Ighteitia"],
          10: [5572, 4, "Aneos"],
          11: [5571, 2, "Llanios"],
          12: [5562, 4, "Tresios"],
          13: [5560, 2, "Tanatia"],
          15: [5371, 3, "Neugios"],
          16: [5372, 2, "Naloutia"],
          21: [5079, 4, "Yykios"],
          22: [5076, 1, "Draunios"],
          23: [5073, 4, "Cheeuos"],
          24: [5072, 2, "Vuroios"],
          26: [4627, 1, "Blotios"],
          27: [4628, 2, "Risaitia"],
          29: [4612, 4, "Ineautia"],
          30: [4610, 2, "Duyios"],
          33: [3980, 2, "Wiasios"],
          34: [3982, 4, "Zeyios"],
          36: [3971, 2, "Osuos"],
          37: [3969, 1, "Slerios"],
          39: [3963, 4, "Munneios"],
          40: [3962, 1, "Imetia"],
          42: [3959, 3, "Fialaos"],
          43: [3958, 2, "Swolios"],
          44: [3957, 1, "Woruios"],
          45: [3952, 4, "Zyfaios"],
          46: [3951, 3, "Pupios"],
          48: [3937, 1, "Sinoios"],
          49: [3938, 2, "Sohoios"],
          51: [3934, 1, "Moreeos"],
          52: [3931, 2, "Sourios"],
          53: [3930, 1, "Cuvios"],
          54: [3927, 2, "Kaloos"],
          55: [3926, 1, "Bifios"],
          62: [3914, 2, "Bozios"],
          63: [3913, 1, "Cladios"],
          64: [3912, 4, "Yeraios"],
          65: [3909, 1, "Issayos"],
          66: [3906, 2, "Yereos"],
          67: [3905, 1, "Gosoos"],
          69: [3901, 1, "Isuos"],
          70: [3899, 3, "Noekiios"],
          71: [3897, 1, "Eldaios"],
          72: [3895, 3, "Slykoos"],
          74: [3892, 4, "Rhekyos"],
          75: [3891, 3, "Quordeios"],
          76: [3890, 2, "Ildietia"],
          78: [3883, 2, "Tayboos"],
          79: [3881, 3, "Fukyos"],
          80: [3882, 1, "Chrifiios"],
          82: [4506, 4, "Esseytia"],
          83: [4509, 2, "Zhacios"],
          84: [4510, 1, "Sewios"],
          85: [4513, 3, "Rilaetia"],
          87: [4988, 1, "Asheetia"],
          88: [4989, 2, "Undeytia"],
          90: [5005, 1, "Yozaos"],
          91: [5004, 2, "Tundoos"],
          92: [5002, 3, "Lelaios"],
          93: [5003, 4, "Hacios"],
          95: [5037, 1, "Engouos"],
          96: [5039, 3, "Cloloios"],
          97: [5044, 1, "Atuios"],
          98: [5045, 4, "Nyotia"],
        },
        96: {
          1: [5622, 2, "Zusios"],
          2: [5621, 3, "Fuinios"],
          7: [5587, 3, "Clutaos"],
          8: [5586, 2, "Athitia"],
          18: [5360, 1, "Deexios"],
          19: [5359, 4, "Worotia"],
          22: [5086, 2, "Atheeos"],
          23: [5075, 3, "Strilios"],
          24: [5074, 1, "Tigios"],
          30: [4609, 1, "Toonios"],
          31: [4606, 3, "Rilaos"],
          42: [3960, 1, "Throimios"],
          43: [3956, 4, "Wumios"],
          44: [3955, 3, "Kynios"],
          45: [3954, 2, "Areios"],
          46: [3953, 1, "Crelios"],
          48: [3940, 4, "Cowios"],
          49: [3939, 3, "Redios"],
          54: [3929, 4, "Cesaos"],
          55: [3928, 3, "Liakuios"],
          57: [3923, 1, "Tyruos"],
          58: [3922, 4, "Kotios"],
          59: [3919, 1, "Ruisiios"],
          60: [3918, 4, "Smeildaios"],
          62: [3915, 3, "Thacios"],
          63: [3916, 4, "Shaisios"],
          64: [3917, 2, "Clotios"],
          66: [3908, 4, "Woekeios"],
          67: [3907, 3, "Beleutia"],
          69: [3902, 2, "Isios"],
          70: [3900, 4, "Whoraos"],
          71: [3898, 2, "Ceroeos"],
          72: [3896, 4, "Nyios"],
          74: [3893, 1, "Vefoos"],
          75: [3894, 2, "Nuneos"],
          82: [4507, 1, "Smalios"],
          83: [4508, 3, "Cledios"],
          84: [4511, 4, "Aroos"],
          85: [4512, 2, "Claehoios"],
          87: [4990, 3, "Inaoos"],
          88: [4991, 4, "Untaos"],
          90: [5007, 4, "Thrihios"],
          91: [5006, 3, "Chreasaios"],
          96: [5040, 4, "Chruwios"],
          97: [5043, 2, "Endetia"],
          98: [5046, 3, "Ageeetia"],
        },
        97: {
          1: [5623, 4, "Lluroios"],
          2: [5620, 1, "Dumaos"],
          3: [5618, 2, "Slaheos"],
          4: [5616, 1, "Steuzios"],
          5: [5614, 2, "Roivaos"],
          7: [5589, 1, "Oriatia"],
          8: [5588, 4, "Stretheios"],
          9: [5592, 3, "Sheceos"],
          11: [5582, 1, "Draeatia"],
          12: [5574, 4, "Buruos"],
          13: [5573, 1, "Clehios"],
          15: [5558, 3, "Deeyios"],
          16: [5557, 2, "Nomaos"],
          18: [5361, 3, "Getios"],
          19: [5357, 2, "Yaycios"],
          20: [5356, 1, "Beigios"],
          26: [5064, 2, "Nuneios"],
          27: [5062, 4, "Mosuios"],
          28: [5059, 2, "Sharios"],
          30: [4608, 2, "Emeaos"],
          31: [4607, 4, "Meamaos"],
          32: [4602, 3, "Booduios"],
          33: [4601, 2, "Echayos"],
          35: [4599, 2, "Chroyyos"],
          36: [4594, 1, "Radoos"],
          37: [4593, 4, "Roreios"],
          39: [4584, 2, "Smuvios"],
          40: [4583, 1, "Lyeeutia"],
          49: [3941, 1, "Rekios"],
          50: [3942, 2, "Whijaos"],
          51: [3945, 4, "Lajios"],
          52: [3946, 3, "Therios"],
          57: [3925, 3, "Qualios"],
          58: [3924, 2, "Onutia"],
          59: [3921, 3, "Aditia"],
          60: [3920, 2, "Ardiatia"],
          71: [3904, 1, "Lifiios"],
          72: [3903, 3, "Coekios"],
          77: [4518, 4, "Chrateos"],
          78: [4520, 3, "Phulyos"],
          79: [4522, 4, "Echauos"],
          80: [4524, 2, "Etietia"],
          84: [4515, 1, "Verootia"],
          85: [4514, 3, "Lusios"],
          87: [4992, 1, "Mosoitia"],
          88: [4993, 2, "Naraios"],
          93: [5032, 2, "Elmutia"],
          94: [5033, 4, "Toriatia"],
          96: [5041, 1, "Reisios"],
          97: [5042, 3, "Drihios"],
        },
        98: {
          3: [5619, 3, "Ightieos"],
          4: [5617, 4, "Lloekoios"],
          5: [5615, 3, "Doulios"],
          7: [5591, 3, "Bopios"],
          8: [5590, 2, "Nytuos"],
          9: [5593, 1, "Zhysios"],
          11: [5583, 2, "Degios"],
          12: [5576, 3, "Aldatia"],
          13: [5575, 2, "Thraudyos"],
          15: [5556, 1, "Asoos"],
          16: [5555, 4, "Queurios"],
          19: [5358, 3, "Nesios"],
          20: [5355, 4, "Dyloios"],
          21: [5352, 3, "Cheotia"],
          22: [5351, 4, "Angooos"],
          23: [5348, 1, "Rendiios"],
          24: [5347, 4, "Leritia"],
          26: [5065, 3, "Kinaios"],
          27: [5063, 1, "Ackautia"],
          28: [5060, 3, "Trytios"],
          31: [4614, 2, "Whartiios"],
          32: [4604, 1, "Regios"],
          33: [4603, 4, "Saihuos"],
          35: [4600, 4, "Cranios"],
          36: [4596, 3, "Slobios"],
          37: [4595, 2, "Keilaios"],
          39: [4586, 4, "Thratyios"],
          40: [4585, 3, "Clouxoios"],
          41: [4588, 2, "Voroos"],
          42: [4590, 4, "Thupios"],
          44: [4580, 3, "Darios"],
          45: [4579, 2, "Chacoios"],
          46: [4576, 3, "Lakiios"],
          47: [4575, 2, "Uskios"],
          49: [3944, 4, "Hatetia"],
          50: [3943, 3, "Rynytia"],
          51: [3947, 1, "Kineitia"],
          52: [3948, 2, "Chrehios"],
          54: [4559, 2, "Elmietia"],
          55: [4560, 4, "Ageuos"],
          62: [4555, 1, "Quoghyios"],
          63: [4553, 2, "Tyxios"],
          64: [4551, 1, "Sweifios"],
          65: [4549, 2, "Lyeeos"],
          66: [4547, 1, "Taieuos"],
          68: [4540, 2, "Foukios"],
          69: [4539, 3, "Schokios"],
          74: [4531, 4, "Rhielaios"],
          75: [4532, 1, "Rotheos"],
          77: [4519, 1, "Adieos"],
          78: [4521, 2, "Eldatia"],
          79: [4523, 1, "Nyntuios"],
          80: [4525, 3, "Swessoos"],
          81: [4528, 2, "Ranootia"],
          82: [4529, 3, "Notios"],
          84: [4517, 4, "Jeykios"],
          85: [4516, 2, "Yeerios"],
          87: [4994, 3, "Fybios"],
          88: [4995, 4, "Uskatia"],
          90: [5024, 1, "Chroudios"],
          91: [5026, 3, "Taulaios"],
          92: [5028, 1, "Tonios"],
          93: [5030, 3, "Modios"],
          94: [5034, 1, "Ighteatia"],
        },
        99: {
          12: [5579, 4, "Seadios"],
          13: [5577, 1, "Suwuios"],
          16: [5553, 2, "Phohios"],
          17: [5551, 3, "Whoerraos"],
          21: [5354, 1, "Saehios"],
          22: [5353, 2, "Nysitia"],
          23: [5350, 3, "Aweyos"],
          24: [5349, 2, "Emotia"],
          28: [5068, 4, "Coilios"],
          29: [5070, 1, "Trekoos"],
          36: [4598, 1, "Kinitia"],
          37: [4597, 4, "Yagios"],
          39: [4592, 2, "Heudios"],
          40: [4587, 1, "Jokios"],
          41: [4589, 3, "Lluhios"],
          42: [4591, 1, "Dearios"],
          44: [4582, 1, "Dathaios"],
          45: [4581, 4, "Duisoios"],
          46: [4578, 1, "Alduios"],
          47: [4577, 4, "Michaios"],
          54: [4561, 3, "Turiatia"],
          55: [4562, 1, "Dajios"],
          56: [4563, 2, "Sayetia"],
          57: [4565, 4, "Sulotia"],
          58: [4567, 2, "Jeduios"],
          59: [4569, 4, "Slierios"],
          60: [4571, 2, "Iryos"],
          62: [4556, 4, "Theriatia"],
          63: [4554, 3, "Verytia"],
          64: [4552, 4, "Slaydoos"],
          65: [4550, 3, "Samoetia"],
          66: [4548, 4, "Iroeos"],
          68: [4542, 4, "Shymios"],
          69: [4541, 1, "Rhethoos"],
          70: [4545, 2, "Ghaotia"],
          72: [4536, 1, "Sletios"],
          73: [4535, 2, "Emoutia"],
          74: [4534, 3, "Undeos"],
          75: [4533, 2, "Batyos"],
          80: [4526, 4, "Rakaeos"],
          81: [4527, 1, "Basaios"],
          82: [4530, 4, "Foisoos"],
          90: [5025, 2, "Caufios"],
          91: [5027, 4, "Pholios"],
          92: [5029, 2, "Troucios"],
          93: [5031, 4, "Oughuos"],
          94: [5035, 2, "Honeatia"],
        },
        100: {
          12: [5581, 3, "Stodeios"],
          13: [5580, 2, "Myraios"],
          16: [5554, 4, "Nousaos"],
          17: [5552, 1, "Sulootia"],
          28: [5069, 3, "Raykios"],
          29: [5071, 2, "Phoirios"],
          54: [4574, 2, "Skelitia"],
          55: [4573, 4, "Jidios"],
          56: [4564, 3, "Kunios"],
          57: [4566, 1, "Awuos"],
          58: [4568, 3, "Maebios"],
          59: [4570, 1, "Cryhios"],
          60: [4572, 3, "Tanotia"],
          65: [4558, 2, "Saemaios"],
          66: [4557, 1, "Sigoios"],
          68: [4544, 2, "Eneaos"],
          69: [4543, 3, "Bikios"],
          70: [4546, 4, "Dodios"],
          72: [4537, 4, "Garetia"],
          73: [4538, 3, "Swudios"],
        },
      };
    },
  }),
  "undefined" == typeof ZJS && (ZJS = {}),
  (function (e) {
    function t() {
      o--;
    }
    var o = 0,
      i = 0,
      s = !window.XDomainRequest,
      n = ["s1.ikalogs.ru", "s2.ikalogs.ru", "s3.ikalogs.ru"];
    ZJS.Ajax = {
      _updateURL: function (e) {
        return (
          (e = 0 == e.indexOf("/") ? e : "/" + e),
          LocalJS.config.external_static &&
            s &&
            (e.indexOf(".ejs") > 0 || e.indexOf(".js") > 0) &&
            (e = "//" + n[i % n.length] + e),
          e
        );
      },
      getJSON: function (s, n) {
        e.ajax({
          url: ZJS.Ajax._updateURL(s),
          headers: { e: !0 },
          async: !0,
          dataType: "json",
          error: n,
          success: n,
          complete: t,
        }),
          o++,
          i++;
      },
      getJSONSync: function (s, n) {
        e.ajax({
          url: ZJS.Ajax._updateURL(s),
          headers: { e: !0 },
          async: !1,
          dataType: "json",
          error: n,
          success: n,
          complete: t,
        }),
          o++,
          i++;
      },
      getText: function (s, n) {
        e.ajax({
          url: ZJS.Ajax._updateURL(s),
          async: !0,
          dataType: "text",
          error: n,
          success: n,
          complete: t,
        }),
          o++,
          i++;
      },
      getTextSync: function (s, n) {
        e.ajax({
          url: ZJS.Ajax._updateURL(s),
          async: !1,
          dataType: "text",
          error: n,
          success: n,
          complete: t,
        }),
          o++,
          i++;
      },
      getTextSyncE: function (s, n) {
        e.ajax({
          url: ZJS.Ajax._updateURL(s),
          headers: { e: !0 },
          async: !1,
          dataType: "text",
          error: n,
          success: n,
          complete: t,
        }),
          o++,
          i++;
      },
      postJSON: function (s, n, a) {
        e.ajax({
          url: ZJS.Ajax._updateURL(s),
          headers: { e: !0 },
          data: n,
          async: !0,
          type: "POST",
          error: a,
          success: a,
          dataType: "json",
          complete: t,
        }),
          o++,
          i++;
      },
      postText: function (s, n, a) {
        e.ajax({
          url: ZJS.Ajax._updateURL(s),
          headers: { e: !0 },
          data: n,
          async: !0,
          type: "POST",
          error: a,
          success: a,
          dataType: "json",
          complete: t,
        }),
          o++,
          i++;
      },
      isLoading: function () {
        return o > 0;
      },
    };
  })(jQuery),
  "undefined" == typeof ZJS && (ZJS = {}),
  (ZJS.EventEmitter = function () {
    this.handlers = [];
  }),
  (ZJS.EventEmitter.prototype = {
    addEventListener: function (e, t, o, i) {
      return (
        "undefined" == typeof this.handlers[e] && (this.handlers[e] = []),
        this.handlers[e].push([o || null, t, i || []]),
        !0
      );
    },
    removeListener: function (e, t) {
      if ("undefined" == typeof this.handlers[e]) return !1;
      for (var o = 0; o < this.handlers[e].length; o++)
        if (this.handlers[e][o][1] == t)
          return this.handlers[e].splice(o, 1), !0;
      return !1;
    },
    removeEvent: function (e) {
      "undefined" != typeof this.handlers[e] && (this.handlers[e] = []);
    },
    emit: function (e, t) {
      "undefined" == typeof this.handlers[e] && (this.handlers[e] = []),
        (t = t || []);
      for (var o = 0; o < this.handlers[e].length; o++) {
        for (
          var i = this.handlers[e][o][0] || window,
            s = this.handlers[e][o][1],
            n = this._cloneArguments(e, o),
            a = t.length - 1;
          a > -1;
          a--
        )
          n.unshift(t[a]);
        "string" == typeof s ? i[s].apply(i, n) : s.apply(i, n);
      }
    },
    _cloneArguments: function (e, t) {
      for (var o = [], i = this.handlers[e][t][2], s = 0; s < i.length; s++)
        o.push(i[s]);
      return o;
    },
    __dummy: null,
  }),
  "undefined" == typeof ZJS && (ZJS = {}),
  (ZJS.Front = function () {
    ZJS.Front.Page.call(this),
      (this._router = null),
      (this._dispatcher = null),
      (this._requset = null),
      (this._response = null),
      (this._front = this),
      (this._layout = null),
      (this._content = null),
      (this._layout_id = "layout"),
      (this._content_id = "content"),
      (this._hash = "-1"),
      (this._lastPath = "-1"),
      this.watch("layout", this.watch_layout, this._replaceLayout, this),
      this.watch("content", this.watch_content, this._replaceContent, this);
  }),
  (ZJS.Front.prototype = {
    watch_content: ["layout", "module", "controller", "action"],
    watch_layout: ["layout"],
    _layout_dir: "js/local/layout",
    _content_dir: "js/local/page",
    getId: function () {
      return "ZJS.Front";
    },
    getDummy: function () {
      return document.body;
    },
    getDispatcher: function () {
      return (
        null == this._dispatcher &&
          (this._dispatcher = new ZJS.Front.Dispatcher(
            this._layout_dir,
            this._content_dir
          )),
        this._dispatcher
      );
    },
    setDispatcher: function (e) {
      this._dispatcher = e;
    },
    getRouter: function () {
      return (
        null == this._router && (this._router = new ZJS.Front.Router()),
        this._router
      );
    },
    setRouter: function (e) {
      this._router = e;
    },
    getRequest: function () {
      return (
        null == this._requset && (this._requset = new ZJS.Front.Request()),
        this._requset
      );
    },
    setRequest: function (e) {
      this._requset = e;
    },
    getResponse: function () {
      return (
        null == this._response && (this._response = new ZJS.Front.Response()),
        this._response
      );
    },
    setResponse: function (e) {
      this._response = e;
    },
    getLayout: function () {
      return this._layout;
    },
    change: function (e, t) {
      var o = Array.prototype.slice.call(arguments);
      (t = o.pop()), (e = o.pop());
      var i = this._createRequest(e),
        s = this._createResponse();
      if (this._hash == i.getHash()) return void t(i, s);
      (this._hash = i.getHash()),
        this.setRequest(i),
        this.setResponse(s),
        this.emit("pre dispatch"),
        this._lastPath != ZJS.Navigation.getCurrentPath() &&
          ((this._lastPath = ZJS.Navigation.getCurrentPath()), this.updateGA());
      try {
        this.dispatchLoop(i, s, t);
      } catch (n) {
        (s.exception = n), t(i, s);
      }
    },
    updateGA: function () {
      "undefined" != typeof ga &&
        (ga("create", "UA-78049001-1", "auto"),
        ga("send", "pageview", this._lastPath));
    },
    dispatchLoop: function (e, t, o) {
      var i = this;
      e.setDispatched(!0),
        this.getRouter().route(e),
        this.dispatch(function () {
          i.getRequest().isDispatched()
            ? (i.repaint(), i.afterDispatch(), o(e, t), i.emit("post dispatch"))
            : i.dispatchLoop(e, t, o);
        });
    },
    _createRequest: function (e) {
      return new ZJS.Front.Request(e);
    },
    _createResponse: function () {
      return new ZJS.Front.Response();
    },
    _replaceLayout: function (e) {
      this._destroy.push(this._layout);
      var t = this,
        o = this.getRequest(),
        i = this.getResponse();
      delete this._module[0],
        this.getDispatcher().dispatchLayout(o, i, function (o) {
          (t._layout = t._createModule(o)),
            (t._module[0] = { module: t._layout, container_id: t._layout_id }),
            t._layout.dispatch(e);
        });
    },
    _replaceContent: function (e) {
      this._destroy.push(this._content);
      var t = this,
        o = this.getRequest(),
        i = this.getResponse();
      delete this._module[1],
        this.getDispatcher().dispatchContent(o, i, function (o) {
          (t._content = t._createModule(o)),
            (t._module[1] = {
              module: t._content,
              container_id: t._content_id,
            }),
            t._content.dispatch(e);
        });
    },
  }),
  (ZJS.Front.Page = function () {
    ZJS.EventEmitter.call(this),
      (this._front = null),
      (this._parent = null),
      (this._module = []),
      (this._watch = []),
      (this._widget = []),
      (this._data = null),
      (this._dummy = null),
      (this._local_vars = {}),
      (this._destroy = []),
      (this._interval = []),
      (this._timeout = []),
      (this._is_dispaching = !1),
      (this._is_rendering = !1),
      (this._is_rendered = !1),
      (this._is_appended = !1);
  }),
  (ZJS.Front.Page.prototype = {
    page_url: "",
    template: "",
    menu: "",
    id: function (e, t) {
      return this._is_dispaching || "undefined" != typeof t
        ? jQuery("*[id=" + e + "]", t || this.getDummy())
        : jQuery("#" + e);
    },
    initMenu: function () {
      "" != this.menu &&
        LocalJS.MenuTops &&
        LocalJS.MenuTops.selectMenu(this.menu);
    },
    setFront: function (e) {
      this._front = e;
    },
    setParent: function (e) {
      this._parent = e;
    },
    getPageUrl: function () {
      return this.page_url;
    },
    getTemplate: function () {
      return this.template;
    },
    isRendered: function () {
      return this._is_rendered;
    },
    setRendered: function (e) {
      this._is_rendered = e;
      for (var t = 0, o = this._module.length; o > t; t++)
        this._module[t].module.setRendered(e);
    },
    addModule: function (e, t) {
      return this._module.push({ module: e, container_id: t }), e;
    },
    removeModule: function (e) {
      for (var t = [], o = 0; o < this._module.length; o++)
        this._module[o].module !== e
          ? t.push(this._module[o])
          : this._destroy.push(e);
      this._module = t;
    },
    addWidget: function (e) {
      return this._widget.push(e), e;
    },
    watch: function (e, t, o, i) {
      this._watch[e] = { vars: this._collectVars(t), callback: o, scope: i };
    },
    unwatch: function (e) {
      delete this._watch[e];
    },
    getRequest: function () {
      return (
        this._ajax_requset || (this._ajax_requset = new ZJS.Request()),
        this._ajax_requset
      );
    },
    getDummy: function () {
      return (
        null == this._dummy && (this._dummy = this._createDummy()), this._dummy
      );
    },
    init: function () {
      var e = this.getTemplate();
      e && ZJS.Templater.preload(e);
    },
    destroy: function () {
      for (var e = 0, t = this._module.length; t > e; e++)
        this._module[e].module.destroy();
      (this._module = []), this.selfDestroy();
    },
    selfDestroy: function () {
      var e, t;
      for (e = 0, t = this._interval.length; t > e; e++)
        clearInterval(this._interval[e]);
      for (e = 0, t = this._timeout.length; t > e; e++)
        clearTimeout(this._timeout[e]);
      for (e = 0, t = this._widget.length; t > e; e++)
        this._widget[e] && this._widget[e].destroy(), (this._widget[e] = null);
    },
    query: function (e, t) {
      var o = this._front.getRequest();
      if ("object" == typeof e) var i = o.updateQuery(e);
      else var i = o.getPath() + (e.length > 0 ? "?" + e : "");
      this.forward(i, function () {
        ZJS.Navigation.go("#" + i), t && t();
      });
    },
    forward: function (e, t) {
      if (this._is_dispaching) {
        var o = this._front.getRequest();
        o.setDispatched(!1), o.setHash(e);
      } else this._front.change(e, t || function () {});
    },
    dispatch: function (e) {
      (this._is_dispaching = !0), this.prepare();
      var t = this._module.length,
        o = 2,
        i = function () {
          0 == --o && e();
        };
      this.runWatchAndUpdate(i);
      for (var s = 0; t > s; s++)
        this._module[s] &&
          !this._module[s].module._is_dispaching &&
          (o++, this._module[s].module.dispatch(i));
      i();
    },
    runWatchAndUpdate: function (e) {
      var t = 1,
        o =
          (this._front.getRequest().getParams(),
          function () {
            0 == --t && e();
          });
      for (var i in this._watch)
        if (!this._checkVars(this._watch[i]) || !this.isRendered()) {
          t++;
          var s = this._watch[i].scope;
          this._watch[i].callback.call(s, o);
        }
      this.isRendered() ? this.update(o) : (this.selfDestroy(), this.render(o));
    },
    update: function (e) {
      this.updatePage(), e();
    },
    render: function (e) {
      (this._is_rendering = !0), this.retrievePageData(e);
    },
    repaint: function () {
      var e,
        t = this._module.length;
      for (e = 0; t > e; e++)
        this._module[e].module.repaint(),
          this._module[e].module._is_appended ||
            ((this._module[e].module._is_appended = !0),
            this._replaceNode(
              this._module[e].container_id,
              this._module[e].module.getDummy()
            ));
      for (e = 0, t = this._destroy.length; t > e; e++)
        this._destroy[e] && this._destroy[e].destroy();
      this._destroy = [];
    },
    repaintModule: function (e) {
      for (t = 0; t < this._destroy.length; t++)
        this._destroy[t] && this._destroy[t].destroy();
      this._destroy = [];
      var t,
        o = this._module.length;
      for (e.repaint(), t = 0; o > t; t++)
        if (this._module[t].module == e) {
          (this._module[t].module._is_appended = !0),
            this._replaceNode(
              this._module[t].container_id,
              this._module[t].module.getDummy()
            );
          break;
        }
      e.afterDispatch(), e.emit("post dispatch");
    },
    afterDispatch: function () {
      var e,
        t = this._module.length;
      for (e = 0; t > e; e++) this._module[e].module.afterDispatch();
      (this._is_dispaching = !1), this.setupElements();
    },
    retrievePageData: function (e) {
      var t = this,
        o = this.getPageUrl();
      o
        ? ZJS.Ajax.getJSON(o, function (o, i) {
            t.acceptPageData(o, i, e);
          })
        : this.updateDummy({}, e);
    },
    acceptPageData: function (e, t, o) {
      "success" == t
        ? e && e.response && "200" !== e.response
          ? (403 == e.response && e.homepage
              ? (LocalJS.loader.showFailed(LocalJS.Lang.get("main.error_403")),
                LocalJS.SwitchUser.setHomepage(e.homepage),
                ZJS.Navigation.home())
              : this.forward("error/" + e.response + "/"),
            o())
          : this.updateDummy(e, o)
        : (this.forward("error/500/"), o());
    },
    setTitle: function (e) {
      var t = this._front.getRequest(),
        o = "yes" == t.getParam("autotitle") ? !0 : !1;
      !e &&
        t &&
        "" != t.getParam("module") &&
        o &&
        (e = LocalJS.Lang.get("title." + t.getParam("module"))),
        e && $(document).attr("title", e);
    },
    updateDummy: function (e, t) {
      if (((this._data = this.setupData(e)), this.getTemplate())) {
        var o = ZJS.Utils.merge(e, this._local_vars || {});
        this.getDummy().innerHTML = ZJS.Templater.render(this.getTemplate(), o);
      }
      this.setTitle(), this.setupPage();
      $("a", this.getDummy()).click(function (e) {
        var t = $(this).attr("href");
        t.length > 2 &&
          0 == t.indexOf("#") &&
          (e.preventDefault(), ZJS.Navigation.go(t));
      }),
        (this._is_rendered = !0),
        (this._is_rendering = !1),
        t();
    },
    prepare: function () {},
    setupData: function (e) {
      return e;
    },
    setupPage: function () {},
    updatePage: function () {},
    setupElements: function () {},
    reload: function (e) {
      this._parent._reloadModule(this, e || function () {});
    },
    doreload: function (e, t) {
      this._reloadModule(e || this, t || function () {});
    },
    _createDummy: function () {
      return document.createElement("div");
    },
    _createModule: function (e) {
      var t = new e();
      return (
        t.setFront(this._front), t.setParent(this), t.init(), t.initMenu(), t
      );
    },
    _findModule: function (e) {
      for (var t = 0, o = this._module.length; o > t; t++)
        if (e === this._module[t].module) return this._module[t];
    },
    _reloadModule: function (e, t) {
      var o = this,
        i = this._findModule(e);
      i.module.render(function () {
        o._replaceNode(i.container_id, i.module.getDummy()), t();
      });
    },
    _replaceNode: function (e, t) {
      var o = this.id(e).get(0);
      if (o) {
        for (; o.hasChildNodes(); ) o.removeChild(o.firstChild);
        o.appendChild(t);
      }
    },
    _collectVars: function (e) {
      for (
        var t = {},
          o = this._front.getRequest().getParams(),
          i = 0,
          s = e.length;
        s > i;
        i++
      )
        "undefined" == typeof t[e[i]]
          ? (t[e[i]] = o[e[i]])
          : "array" == typeof t[e[i]]
          ? t[e[i]].push(o[e[i]])
          : (t[e[i]] = [t[e[i]].valueOf(), o[e[i]]]);
      return t;
    },
    _checkVars: function (e) {
      var t = !0,
        o = this._front.getRequest().getParams(),
        i = [];
      for (var s in e.vars)
        i.push(s), (o[s] || e.vars[s]) && o[s] != e.vars[s] && (t = !1);
      return t || (e.vars = this._collectVars(i)), t;
    },
  }),
  ZJS.Utils.inherit(ZJS.Front.Page, ZJS.EventEmitter),
  ZJS.Utils.inherit(ZJS.Front, ZJS.Front.Page),
  (ZJS.Front.Request = function (e) {
    (this._dispatched = !1), this.setHash(e || ZJS.Navigation.getCurrentHash());
  }),
  (ZJS.Front.Request.prototype = {
    setHash: function (e) {
      (this._hash = e),
        (this._query = this.parseQueryString(this.getQueryString())),
        (this._params = {}),
        this.addParams(this._query, !1);
    },
    getHash: function () {
      return this._hash;
    },
    getPath: function () {
      return -1 == this._hash.indexOf("?")
        ? this._hash
        : this._hash.substr(0, this._hash.indexOf("?"));
    },
    getQueryString: function () {
      return -1 == this._hash.indexOf("?")
        ? ""
        : this._hash.substr(this._hash.indexOf("?") + 1);
    },
    getQuery: function (e) {
      return this._query[e] || "";
    },
    getParams: function () {
      return this._params;
    },
    clearParams: function () {
      (this._params = {}), this.addParams(this._query, !1);
    },
    getParam: function (e) {
      return this._params[e] || "";
    },
    setParam: function (e, t) {
      this._params[e] = t;
    },
    hasParam: function (e) {
      return void 0 != this._params[e];
    },
    addParams: function (e, t) {
      for (var o in e)
        (t || "undefined" == typeof this._params[o]) &&
          (this._params[o] = e[o]);
    },
    isDispatched: function () {
      return this._dispatched;
    },
    setDispatched: function (e) {
      this._dispatched = e;
    },
    parseHash: function (e) {
      return -1 != e.indexOf("#") && (e = e.substr(e.indexOf("#") + 1)), e;
    },
    updateQuery: function (e) {
      for (var t in e) this._query[t] = e[t];
      var o = [];
      for (t in this._query)
        if (this._query[t] instanceof Array)
          for (var i = 0; i < this._query[t].length; i++)
            o.push(t + "=" + this._query[t][i]);
        else null !== this._query[t] && o.push(t + "=" + this._query[t]);
      return (
        (o = o.join("&")),
        o.length > 0 ? this.getPath() + "?" + o : this.getPath()
      );
    },
    parseQueryString: function (e) {
      if (0 == e.length) return {};
      for (
        var t = {}, o = e.replace("+", " ").split("&"), i = 0;
        i < o.length;
        i++
      ) {
        var s = o[i].split("="),
          n = decodeURIComponent(s[0]),
          a = 2 == s.length ? decodeURIComponent(s[1]) : "";
        "undefined" == typeof t[n]
          ? (t[n] = a)
          : t[n] instanceof Array
          ? t[n].push(a)
          : (t[n] = [t[n].valueOf(), a]);
      }
      return t;
    },
  }),
  (ZJS.Front.Response = function () {
    (this._exception = null), (this._isRedirect = !1), (this._redirect = "");
  }),
  (ZJS.Front.Response.prototype = {
    setRedirect: function (e) {
      this._redirect = e;
    },
    getException: function () {
      return this._exception;
    },
    setException: function (e) {
      this._exception = e;
    },
  }),
  (ZJS.Front.Router = function () {
    this._routes = [];
  }),
  (ZJS.Front.Router.prototype = {
    addRoute: function (e) {
      this._routes.push(e);
    },
    route: function (e) {
      e.clearParams();
      for (
        var t = !1, o = e.getPath(), i = this._routes.length - 1, s = i;
        s > -1;
        s--
      ) {
        var n = this._routes[s],
          a = n.match(o);
        if (a !== !1) {
          (t = !0), e.addParams(a, !0);
          break;
        }
      }
      if (!t) throw new Error("No route matched the request " + o);
    },
  }),
  (ZJS.Front.Route = function (e, t, o) {
    (this._route = ZJS.Utils.trim(e, this.urlDelimiter)),
      (this._defaults = t || {}),
      (this._reqs = o || {}),
      (this._parts = []),
      (this._variables = {}),
      (this._staticCount = 0),
      this._parseRoute(this._route);
  }),
  (ZJS.Front.Route.prototype = {
    urlDelimiter: "/",
    urlVariable: ":",
    match: function (e) {
      var t,
        o = 0,
        i = {},
        s = {};
      if (((e = ZJS.Utils.trim(e, this.urlDelimiter)), "" !== e)) {
        var n = e.split(new RegExp(this.urlDelimiter));
        for (t = 0; t < n.length; t++) {
          var a = n[t];
          if (void 0 === this._parts[t]) return !1;
          if ("*" == this._parts[t]) {
            i = this._collectWildcardData(e, t);
            break;
          }
          var r = this._variables[t],
            u = this._parts[t];
          if (void 0 == r && u != a) return !1;
          if (u instanceof RegExp && !u.test(a)) return !1;
          void 0 != r ? (s[r] = a) : o++;
        }
      }
      if (this._staticCount != o) return !1;
      var l = ZJS.Utils.merge(s, i, this._defaults);
      for (t in this._variables) {
        var h = this._variables[t];
        if (void 0 == l[h]) return !1;
      }
      return l;
    },
    _isVar: function (e) {
      return this.urlVariable == e.charAt(0);
    },
    _getVarName: function (e) {
      return e.substr(1);
    },
    _parseRoute: function (e) {
      for (
        var t = e.split(new RegExp(this.urlDelimiter)), o = 0;
        o < t.length;
        o++
      )
        if (this._isVar(t[o])) {
          var i = this._getVarName(t[o]);
          (this._parts[o] = this._reqs[i] ? this._reqs[i] : null),
            (this._variables[o] = i);
        } else (this._parts[o] = t[o]), "*" !== t[o] && this._staticCount++;
    },
    _collectWildcardData: function (e, t) {
      for (var o = [], i = t; i < e.length; i += 2) {
        var s = e[i];
        o[s] || this._defaults[s] || (o[s] = e[i + 1] || null);
      }
      return o;
    },
  }),
  (ZJS.Front.Dispatcher = function (e, t) {
    (this._layout_dir = e), (this._content_dir = t);
  }),
  (ZJS.Front.Dispatcher.prototype = {
    default_module: "default",
    default_content: "index",
    default_action: "index",
    dispatchContent: function (e, t, o) {
      var i = this;
      ZJS.Loader.require(this._getContentPath(e), function () {
        var s = ZJS.Utils.extractClass(i._getContentName(e));
        s instanceof Function || (t.exception = new Error("Content not found")),
          o(s);
      });
    },
    dispatchLayout: function (e, t, o) {
      var i = this;
      ZJS.Loader.require(this._getLayoutPath(e), function () {
        var s = ZJS.Utils.extractClass(i._getLayoutClass(e));
        s instanceof Function || (t.exception = new Error("Layout not found")),
          o(s);
      });
    },
    _getLayoutPath: function (e) {
      var t = e.getParam("layout");
      return (
        t || (t = 0 == e._hash.indexOf("error") ? "error" : "main"),
        this._layout_dir + "/" + t + ".js"
      );
    },
    _getLayoutClass: function (e) {
      var t = e.getParam("layout") || "main";
      return "LocalJS.Layout." + ZJS.Utils.ucfirst(t.toLowerCase());
    },
    _getContentPath: function (e) {
      var t = e.getParam("role") || "default",
        o = e.getParam("module") || "default",
        i = e.getParam("content") || "index";
      return (
        "" +
        this._content_dir +
        "/" +
        t.toLowerCase() +
        "/" +
        o.toLowerCase() +
        "/" +
        i.toLowerCase() +
        ".js"
      );
    },
    _getContentName: function (e) {
      var t = e.getParam("role") || "default",
        o = e.getParam("module") || "default",
        i = e.getParam("content") || "index";
      return (
        "LocalJS.Page." +
        ZJS.Utils.ucfirst(t.toLowerCase()) +
        "." +
        ZJS.Utils.ucfirst(o.toLowerCase()) +
        "." +
        ZJS.Utils.ucfirst(i.toLowerCase())
      );
    },
  }),
  "undefined" == typeof ZJS && (ZJS = {}),
  (function () {
    function e() {
      return !0;
    }
    var t = [];
    ZJS.Loader = {
      innerGMapsCallback: null,
      GMapsCallback: function () {
        ZJS.Loader.innerGMapsCallback();
      },
      require: function (o, i, s) {
        (i = i || e),
          this._isLoaded(o) ? i.call(s) : (t.push(o), this._load1(o, i, s));
      },
      require_gmaps: function (o, i) {
        (o = o || e),
          this._isLoaded("gmaps")
            ? o.call(i)
            : (t.push("gmaps"), this._load_gmaps(o, i));
      },
      include: function (e) {
        this._isLoaded(e) || (t.push(e), this._load2(e));
      },
      _isLoaded: function (e) {
        for (var o = 0; o < t.length; o++) if (t[o] == e) return !0;
        return !1;
      },
      _load1: function (e, t, o) {
        var i = this,
          s = function (e) {
            "string" == typeof e
              ? (i._exec(e), t.call(o))
              : (LocalJS.loader.hideAll(),
                LocalJS.front.change("error/404/", function () {}));
          };
        ZJS.Ajax.getText([e, "?", LocalJS.config.js_version].join(""), s);
      },
      _load2: function (e) {
        ZJS.Ajax.getTextSync(
          [e, "?", LocalJS.config.js_version].join(""),
          this._exec
        );
      },
      _load_gmaps: function (e, t) {
        (ZJS.Loader.innerGMapsCallback = function () {
          e.call(t);
        }),
          $("body").append(
            '<script type="text/javascript" src="//maps.google.com/maps/api/js?sensor=false&callback=ZJS.Loader.GMapsCallback"></script>'
          );
      },
      _exec: function (e) {
        try {
          window.execScript ? window.execScript(e) : eval.call(window, e);
        } catch (t) {
          LocalJS.loader.hideAll(),
            LocalJS.front.change("error/404/", function () {});
        }
      },
    };
  })(),
  "undefined" == typeof ZJS && (ZJS = {}),
  (function (e) {
    var t = function () {
      if (
        (ZJS.EventEmitter.call(this),
        (this.historyAPI = !(!window.history || !history.pushState)),
        this.historyAPI)
      ) {
        (this.last_hash = this.getCurrentHash()), this.initAPI();
        var e = window.location.hash;
        0 == e.indexOf("#") && this.go(e);
      } else {
        if (window.location.pathname && window.location.pathname.length > 1)
          return (
            (e = window.location.pathname.substr(1)),
            window.location.search && (e += window.location.search),
            void (window.location = "/#" + e)
          );
        this.last_hash = this.getCurrentHash();
        var t = window.location.href.replace(/(\?.*?)#/, "#");
        t != window.location.href && (window.location.href = t),
          this.loopStart();
      }
    };
    (t.prototype = {
      EVENT_CHANGE: "change",
      initAPI: function () {
        e(window).on(
          "popstate",
          function (e) {
            e.preventDefault(),
              this.last_hash != this.getCurrentHash() &&
                ((this.last_hash = this.getCurrentHash()),
                this.emit(this.EVENT_CHANGE));
          }.bind(this)
        );
      },
      loopStart: function () {
        var t = document.documentMode;
        "onhashchange" in window && ("undefined" == typeof t || t > 7)
          ? e(window).on(
              "hashchange",
              function () {
                this.emit(this.EVENT_CHANGE);
              }.bind(this)
            )
          : this.loop();
      },
      loop: function () {
        this.getCurrentHash() != this.last_hash &&
          ((this.last_hash = this.getCurrentHash()),
          this.emit(this.EVENT_CHANGE)),
          setTimeout(this.loop.bind(this), 200);
      },
      getCurrentHash: function () {
        var e = "";
        return (
          this.historyAPI
            ? ((e = window.location.pathname + window.location.search),
              0 == e.indexOf("/") && (e = e.substr(1)))
            : ((e = window.location.hash),
              -1 != e.indexOf("#") && (e = e.substr(1))),
          e
        );
      },
      getCurrentPath: function () {
        var e = this.getCurrentHash();
        return -1 == e.indexOf("?") ? e : e.substr(0, e.indexOf("?"));
      },
      getCurrentQuery: function () {
        if (this.historyAPI) {
          var e = window.location.search;
          return "" != e && (e = e.substr(1)), e;
        }
        var t = this.getCurrentHash();
        return -1 == t.indexOf("?") ? "" : t.substr(t.indexOf("?") + 1);
      },
      getParseCurrentQuery: function () {
        var t = {},
          o = this.getCurrentQuery();
        if ("" != o) {
          var i = o.split("&");
          e.each(
            i,
            function (e, o) {
              var i = o.split("=");
              "undefined" == typeof t[i[0]]
                ? (t[i[0]] = decodeURIComponent(i[1]))
                : t[i[0]] instanceof Array
                ? t[i[0]].push(decodeURIComponent(i[1]))
                : ((t[i[0]] = [t[i[0]]]),
                  t[i[0]].push(decodeURIComponent(i[1])));
            }.bind(this)
          );
        }
        return t;
      },
      getNewCurrentQuery: function () {
        var t,
          o = this.getParseCurrentQuery(),
          i = [];
        return (
          e.each(o, function (e, o) {
            if (o instanceof Array)
              for (t = 0; t < o.length; t++)
                i.push(e + "=" + encodeURIComponent(o[t]));
            else i.push(e + "=" + encodeURIComponent(o));
          }),
          i.join("&")
        );
      },
      home: function () {
        this.go("#" + LocalJS.SwitchUser.getHomepage());
      },
      go: function (e, t) {
        t && "" != t && ((t = this.objectToQuery(t)), (e += "?" + t)),
          (e = e.replace("?&", "?")),
          0 == e.indexOf("#")
            ? this.historyAPI
              ? (history.pushState(null, null, "/" + e.substr(1)),
                (this.last_hash = this.getCurrentHash()),
                this.emit(this.EVENT_CHANGE))
              : ((window.location.hash = e.substr(1)),
                (this.last_hash = this.getCurrentHash()),
                this.emit(this.EVENT_CHANGE))
            : (window.location.href = e);
      },
      relogin: function () {
        this.go(
          "/?return=%s".format(
            encodeURIComponent(ZJS.Navigation.getCurrentHash())
          )
        );
      },
      reload: function (e) {
        LocalJS.front.setRendered(!1),
          (e = e
            ? e.indexOf("#") > -1
              ? e.substr(1)
              : e
            : this.getCurrentHash()),
          e || (e = "toplist"),
          e && ((LocalJS.front._hash = "-1"), this.go("#" + e));
      },
      redirect: function (e) {
        var t = window.location.href.substr(
          0,
          window.location.href.indexOf("#") - 1
        );
        window.location.replace(t + e);
      },
      objectToQuery: function (t) {
        var o = [];
        return (
          e.each(t, function (e, t) {
            if (t instanceof Array)
              for (var i = 0; i < t.length; i++)
                o.push(e + "=" + encodeURIComponent(t[i]));
            else o.push(e + "=" + encodeURIComponent(t));
          }),
          (t = o.join("&"))
        );
      },
      setQueryParams: function (e) {
        return (
          (e = this.objectToQuery(e)),
          this.getCurrentQuery() == e
            ? ""
            : void this.go(
                "" == e
                  ? "#" + this.getCurrentPath()
                  : "#" + this.getCurrentPath() + "?" + e
              )
        );
      },
      parseQueryString: function (e) {
        if (0 == e.length) return {};
        for (
          var t = {}, o = e.replace("+", " ").split("&"), i = 0;
          i < o.length;
          i++
        ) {
          var s = o[i].split("="),
            n = decodeURIComponent(s[0]),
            a = 2 == s.length ? decodeURIComponent(s[1]) : "";
          "undefined" == typeof t[n]
            ? (t[n] = a)
            : t[n] instanceof Array
            ? t[n].push(a)
            : (t[n] = [t[n].valueOf(), a]);
        }
        return t;
      },
      __dummy: null,
    }),
      ZJS.Utils.inherit(t, ZJS.EventEmitter),
      (ZJS.Navigation = new t());
  })(jQuery),
  "undefined" == typeof ZJS && (ZJS = {}),
  (function (e) {
    (ZJS.Request = function () {
      ZJS.EventEmitter.call(this), (this.request_counter = 0);
    }),
      (ZJS.Request.prototype = {
        EVENT_START: "start",
        EVENT_ERROR: "error",
        EVENT_COMPLETE: "complete",
        getJSON: function (t, o, i) {
          e.ajax({
            url: ZJS.Ajax._updateURL(t),
            headers: { e: !0 },
            async: "undefined" == typeof i ? !0 : i,
            error: function (e, t) {
              this._callback(e, t, o);
            }.bind(this),
            success: function (e, t) {
              this._callback(e, t, o);
            }.bind(this),
            dataType: "json",
            complete: this._finish.bind(this),
          }),
            this.request_counter++,
            this.emit(this.EVENT_START);
        },
        getText: function (t, o, i) {
          e.ajax({
            url: ZJS.Ajax._updateURL(t),
            headers: { e: !0 },
            async: void 0 == i ? !0 : i,
            error: function (e, t) {
              this._callback(e, t, o);
            }.bind(this),
            success: function (e, t) {
              this._callback(e, t, o);
            }.bind(this),
            dataType: "text",
            complete: this._finish.bind(this),
          }),
            this.request_counter++,
            this.emit(this.EVENT_START);
        },
        postJSON: function (t, o, i, s) {
          e.ajax({
            url: ZJS.Ajax._updateURL(t),
            headers: { e: !0 },
            data: o,
            type: "POST",
            error: function (e, t) {
              this._callback(e, t, i);
            }.bind(this),
            success: function (e, t) {
              this._callback(e, t, i);
            }.bind(this),
            dataType: "json",
            complete: this._finish.bind(this),
            async: "undefined" == typeof s ? !0 : s,
          }),
            this.request_counter++,
            this.emit(this.EVENT_START);
        },
        postText: function (t, o, i) {
          e.ajax({
            url: ZJS.Ajax._updateURL(t),
            headers: { e: !0 },
            data: o,
            type: "POST",
            error: function (e, t) {
              this._callback(e, t, i);
            }.bind(this),
            success: function (e, t) {
              this._callback(e, t, i);
            }.bind(this),
            dataType: "text",
            complete: this._finish.bind(this),
          }),
            this.request_counter++,
            this.emit(this.EVENT_START);
        },
        isLoading: function () {
          return this.request_counter > 0;
        },
        _callback: function (e, t, o) {
          if (e && e.response && 403 == e.response)
            (this._is_dispaching = !1),
              LocalJS.front.change("error/403/", function () {});
          else {
            if (e && e.response && 666 == e.response)
              return void ZJS.Navigation.relogin();
            if (e && e.response && 6666 == e.response)
              return ZJS.Navigation.go("#pub/profile/"), !1;
          }
          o && o(e, t);
        },
        _finish: function () {
          this.request_counter--, this.emit(this.EVENT_COMPLETE);
        },
        _error: function () {
          this.emit(this.EVENT_ERROR);
        },
      }),
      ZJS.Utils.inherit(ZJS.Request, ZJS.EventEmitter);
  })(jQuery),
  "undefined" == typeof ZJS && (ZJS = {}),
  (ZJS.Templater = {
    prefix: "",
    _compilled: {},
    _loaded: {},
    preload: function (e) {
      var t = [this.prefix, e, "?", LocalJS.config.js_version].join("");
      ZJS.Ajax.getText(
        t,
        function (e) {
          this._loaded[t] = e;
        }.bind(this)
      );
    },
    lget: function (e, t) {
      return LocalJS.Lang.get(e, t || !1);
    },
    nget: function (e, t) {
      return LocalJS.Lang.nget(e, t);
    },
    num: function (e, t) {
      return ZJS.Utils.formatNumber(e, t);
    },
    esc: function (e) {
      return _.escape(e);
    },
    render: function (e, t) {
      (t = t || {}),
        (t.role = LocalJS.front.getRequest().getParam("role")),
        (t.lget = this.lget),
        (t.nget = this.nget),
        (t.num = this.num),
        (t.esc = this.esc);
      var o = [this.prefix, e, "?", LocalJS.config.js_version].join("");
      return (
        this._compilled[o] ||
          (this._loaded[o]
            ? ((this._compilled[o] = _.template(this._loaded[o])),
              delete this._loaded[o])
            : ZJS.Ajax.getTextSync(
                o,
                function (e) {
                  this._compilled[o] = _.template(e);
                }.bind(this)
              )),
        this._compilled[o](t)
      );
    },
  }),
  "undefined" == typeof ZJS && (ZJS = {}),
  (ZJS.LocalStorage = {
    set: function (e, t, o) {
      var i = new Date(),
        s = { value: t, expire: o ? i.getTime() + 1e3 * o : 0 };
      localStorage
        ? localStorage.setItem(e, JSON.stringify(s))
        : window.localStorage &&
          window.localStorage.setItem(e, JSON.stringify(s));
    },
    get: function (e) {
      var t = new Date(),
        o = this.__get(e);
      return (
        o &&
          o.expire > 0 &&
          o.expire < t.getTime() &&
          (ZJS.LocalStorage.remove(e), (o = !1)),
        o ? o.value : !1
      );
    },
    __get: function (e) {
      var t = !1;
      return (
        localStorage
          ? localStorage.getItem(e) &&
            (t = $.parseJSON(localStorage.getItem(e)))
          : window.localStorage &&
            window.localStorage.getItem(e) &&
            (t = $.parseJSON(window.localStorage.getItem(e))),
        t
      );
    },
    remove: function (e) {
      localStorage
        ? localStorage.removeItem(e)
        : window.localStorage && window.localStorage.removeItem(e);
    },
  }),
  "undefined" == typeof ZJS && (ZJS = {}),
  (function (e) {
    (ZJS.Form = function (e) {
      ZJS.EventEmitter.call(this),
        (e = e.get(0)),
        (this.form = e),
        (this.rules = {}),
        (this.errors = {}),
        (this.action = ""),
        (this.method = "post"),
        (this.childs = []),
        (this.defaultValues = this.getValues()),
        this._parseForm(),
        this._setupEvents();
    }),
      (ZJS.Form.translate = function (e) {
        return e;
      }),
      (ZJS.Form.prototype = {
        EVENT_RESET: "reset",
        EVENT_SUBMIT: "submit",
        EVENT_ERROR: "error",
        EVENT_FAILURE: "failure",
        EVENT_SUCCESS: "success",
        EVENT_COMPLETE: "complete",
        request: null,
        _needEnterSubmit: !0,
        destroy: function () {},
        save: function () {
          this.submit(!0);
        },
        submit: function (e) {
          this.clearErrors(),
            this.validate()
              ? ("" != this.action && this._sendRequset(e),
                this.emit(this.EVENT_SUBMIT))
              : (this.setErrors(this.getErrors()), this.emit(this.EVENT_ERROR));
        },
        reset: function () {
          this.clearForm(),
            this.clearErrors(),
            this.setErrors({}),
            this._setValues(this.defaultValues),
            this.emit(this.EVENT_RESET);
        },
        needEnterSubmit: function (e) {
          this._needEnterSubmit = e;
        },
        validate: function () {
          this.errors = {};
          var t,
            o,
            i,
            s,
            n = !1,
            a = this;
          e.each(this.rules, function (r, u) {
            if (
              ((o = a.form.elements[r] || a.form.elements[r + "[]"]),
              o && o.nodeName && o.name != r)
            ) {
              o = void 0;
              for (var l = 0; l < a.form.elements.length; l++)
                if (a.form.elements[l].name == r) {
                  o = a.form.elements[l];
                  break;
                }
            }
            void 0 != o &&
              ((i = a._getElementValue(o)),
              (s = !1),
              e.each(u, function (e, o) {
                s ||
                  ((t = a._createValidator(e, o)),
                  t.validate(i) ||
                    ((a.errors[r] = t.getError()), (n = !0), (s = !0)));
              }));
          });
          for (var r = 0; r < this.childs.length; r++)
            this.childs[r].validate() ||
              (e.extend(this.errors, this.childs[r].getErrors()), (n = !0));
          var u = this.userValidate(this.errors);
          return !n && u;
        },
        userValidate: function () {
          return !0;
        },
        serializeArray: function () {
          var t,
            o = this.getValues(),
            i = {};
          return (
            e.each(o, function (e, o) {
              if (o instanceof Array)
                for (i[e] = [], t = 0; t < o.length; t++) i[e].push(o[t]);
              else i[e] = o;
            }),
            i
          );
        },
        serialize: function () {
          var t,
            o = this.getValues(),
            i = [];
          return (
            e.each(o, function (e, o) {
              if (o instanceof Array)
                for (t = 0; t < o.length; t++)
                  i.push(e + "=" + encodeURIComponent(o[t]));
              else i.push(e + "=" + encodeURIComponent(o));
            }),
            i.join("&")
          );
        },
        clearForm: function () {
          e("input:text", this.form).val(""),
            e("input:checkbox", this.form).attr("checked", !1),
            e("input:radio[checked]", this.form).attr("checked", !1),
            e("select option[selected]", this.form).attr("selected", !1);
        },
        getForm: function () {
          return this.form;
        },
        getErrors: function () {
          return this.errors;
        },
        setErrors: function (t) {
          var o,
            i = this;
          (this.errors = t),
            e.each(this.errors, function (t, s) {
              "" != s &&
                ((o = i.form.elements[t]),
                "object" == typeof s
                  ? e.each(s, function (e, s) {
                      i.renderError(o, s, t);
                    })
                  : i.renderError(o, s, t));
            });
        },
        setError: function (e, t) {
          this.errors[e] = t;
        },
        addSubForm: function (e, t) {
          var o = new ZJS.Form.SubForm(this.form, e);
          return (
            t.rules && o.setValidationRules(t.rules),
            t.enable && o.enable(),
            this.childs.push(o),
            o
          );
        },
        _setValues: function (t) {
          var o = this;
          e.each(t, function (e, t) {
            o._setElementValuePrepare(e, t);
          });
        },
        setValues: function (e) {
          this.reset(), this._setValues(e);
        },
        _setElementValuePrepare: function (t, o) {
          if (o instanceof Array) {
            var i = this.form.elements[t] || this.form.elements[t + "[]"];
            this._setElementValue(i, o);
          } else if ("object" == typeof o && null != o) {
            var s = t,
              n = this;
            e.each(o, function (e, o) {
              (s = t + "[" + e + "]"), n._setElementValuePrepare(s, o);
            });
          } else this._setElementValue(this.form.elements[t], o);
        },
        setValidationRules: function (e) {
          this.rules = e || {};
        },
        getValue: function (e) {
          var t = this.form.elements[e];
          return t ? this._getElementValue(t) : null;
        },
        getValues: function () {
          for (var e, t = {}, o = 0; o < this.form.elements.length; o++) {
            var i = this.form.elements[o];
            i.name.length > 0 &&
              ((e = this._getElementValue(i)),
              null != e &&
                (t[i.name] instanceof Array
                  ? t[i.name].push(e)
                  : "undefined" != typeof t[i.name]
                  ? ((t[i.name] = [t[i.name]]), t[i.name].push(e))
                  : (t[i.name] = e)));
          }
          return t;
        },
        setRequest: function (e) {
          this.request = e;
        },
        getRequest: function () {
          return (
            null == this.request && (this.request = new ZJS.Request()),
            this.request
          );
        },
        renderError: function (e, t) {
          e.parentNode.insertBefore(document.createTextNode(t), e.nextSibling);
        },
        addInnerForm: function (e) {
          this.childs.push(e);
        },
        clearErrors: function () {},
        _parseForm: function () {
          (this.action = this.form.getAttribute("action")),
            (this.method =
              "string" == typeof this.form.getAttribute("method")
                ? this.form.getAttribute("method").toLowerCase()
                : "post");
        },
        _setupEvents: function () {
          var t = this;
          (this.__reset = function (e) {
            e.preventDefault(), t.reset();
          }),
            (this.__submit = function (e) {
              e.preventDefault(), t.submit();
            }),
            (this.__enterSubmit = function (e) {
              t._needEnterSubmit
                ? 13 == e.keyCode && (e.preventDefault(), t.submit())
                : !e.ctrlKey ||
                  (10 != e.keyCode && 13 != e.keyCode) ||
                  (e.preventDefault(), t.submit());
            }),
            e(this.form).bind("reset", this.__reset),
            e(this.form).bind("submit", this.__submit),
            e(this.form).bind("keypress", this.__enterSubmit);
        },
        _sendRequset: function (e) {
          var t = e ? LocalJS.loader.showSaver() : LocalJS.loader.showLoader();
          "post" == this.method
            ? ZJS.Ajax.postJSON(
                this.action,
                this.serialize(),
                function (e) {
                  this._requestResult(e, t);
                }.bind(this)
              )
            : ZJS.Ajax.getJSON(
                this.action + "?" + this.serialize(),
                function (e) {
                  this._requestResult(e, t);
                }.bind(this)
              );
        },
        _requestResult: function (e, t) {
          LocalJS.loader.hideLoader(t),
            e.status && "ok" == e.status
              ? this.emit(this.EVENT_SUCCESS, [e])
              : e.status &&
                "failure" == e.status &&
                (this.setErrors(e.elem_error || e.elem_errors || {}),
                this.emit(this.EVENT_FAILURE, [e])),
            this.emit(this.EVENT_COMPLETE, [e]);
        },
        _createValidator: function (e, t) {
          return new ZJS.Form.Validator[e](this, t);
        },
        _setElementValue: function (e, t) {
          if (e && "string" != typeof e) {
            var o, i, s, n;
            if (
              "undefined" != typeof e.length &&
              "undefined" == typeof e.nodeName
            )
              if (
                ((n = e[0].nodeName.toLowerCase()),
                "input" == n && "radio" == e[0].type)
              ) {
                for (o = 0; o < e.length; o++) e[o].checked = !1;
                for (o = 0; o < e.length; o++)
                  if (e[o].value == t) {
                    e[o].checked = !0;
                    break;
                  }
              } else if ("input" == n && "checkbox" == e[0].type)
                for (
                  t instanceof Array || (t = [t.valueOf()]), o = 0;
                  o < e.length;
                  o++
                )
                  for (i = 0; i < t.length; i++)
                    e[o].value == t[i] && (e[o].checked = !0);
              else if (t instanceof Array)
                for (o = 0; o < t.length; o++)
                  this._setElementValue(e[o], t[o]);
              else this._setElementValue(e[0], t);
            else if (((n = e.nodeName.toLowerCase()), "input" == n))
              (s = e.type.toLowerCase()),
                "checkbox" == s
                  ? (e.checked = 0 != t)
                  : "radio" == s
                  ? (e.checked = t == e.value)
                  : (e.value = t);
            else if ("textarea" == n) e.value = t;
            else if ("select" == n)
              if (t instanceof Array)
                for (o = 0; o < e.options.length; o++)
                  for (i = 0; i < t.length; i++)
                    e.options[o].value == t[i] && (e.options[o].selected = !0);
              else
                for (o = 0; o < e.options.length; o++)
                  if (e.options[o].value == t) {
                    e.options[o].selected = !0;
                    break;
                  }
          }
        },
        _getElementValue: function (e) {
          var t,
            o,
            i,
            s,
            n = null;
          if (
            "undefined" != typeof e.length &&
            "undefined" == typeof e.nodeName
          )
            if (
              ((i = e[0].nodeName.toLowerCase()),
              "input" == i && "radio" == e[0].type)
            ) {
              for (t = 0; t < e.length; t++)
                if (e[t].checked) {
                  n = e[t].value;
                  break;
                }
            } else
              for (n = [], t = 0; t < e.length; t++)
                (s = this._getElementValue(e[t])), null != s && n.push(s);
          else if (((i = e.nodeName.toLowerCase()), "input" == i))
            (o = e.type.toLowerCase()),
              "radio" == o || "checkbox" == o
                ? e.checked && (n = e.value)
                : (n = e.value);
          else if ("textarea" == i) n = e.value;
          else if ("select" == i)
            if (e.getAttribute("multiple"))
              for (n = [], t = 0; t < e.options.length; t++)
                e.options[t].selected && n.push(e.options[t].value);
            else
              for (t = 0; t < e.options.length; t++)
                e.options[t].selected && (n = e.options[t].value);
          return n;
        },
        __dummy: null,
      }),
      ZJS.Utils.inherit(ZJS.Form, ZJS.EventEmitter),
      (ZJS.Form.SubForm = function (e) {
        ZJS.EventEmitter.call(this),
          (this.form = e),
          (this.rules = {}),
          (this.errors = {}),
          (this.action = ""),
          (this.method = "post"),
          (this.childs = []),
          (this.state = "disable");
      }),
      (ZJS.Form.SubForm.prototype = {
        validate: function () {
          return "disable" == this.state
            ? !0
            : ZJS.Form.prototype.validate.call(this);
        },
        enable: function () {
          this.state = "enable";
        },
        disable: function () {
          this.state = "disable";
        },
        __dummy: null,
      }),
      ZJS.Utils.inherit(ZJS.Form.SubForm, ZJS.Form),
      (ZJS.Form.Validator = {}),
      (ZJS.Form.Validator.Abstract = function (e, t) {
        (this.error = ""), (this.form = e), (this.options = t);
      }),
      (ZJS.Form.Validator.Abstract.prototype = {
        validate: function () {
          return !0;
        },
        getError: function () {
          return this.error;
        },
      }),
      (ZJS.Form.Validator.not_empty = function (e, t) {
        ZJS.Form.Validator.Abstract.call(this, e, t);
      }),
      (ZJS.Form.Validator.not_empty.prototype = {
        error_empty: "This field is required",
        validate: function (e) {
          return e && 0 != e.length
            ? !0
            : ((this.error = ZJS.Form.translate(this.error_empty)), !1);
        },
      }),
      ZJS.Utils.inherit(
        ZJS.Form.Validator.not_empty,
        ZJS.Form.Validator.Abstract
      ),
      (ZJS.Form.Validator.string_length = function (e, t) {
        ZJS.Form.Validator.Abstract.call(this, e, t);
      }),
      (ZJS.Form.Validator.string_length.prototype = {
        error_max: "value is too long",
        error_min: "value is too short",
        validate: function (e) {
          return this.options.max > 0 && e.length > this.options.max
            ? ((this.error = ZJS.Form.translate(
                this.error_max,
                this.options.max
              )),
              (this.error = this.error.replace("%d", this.options.max)),
              !1)
            : this.options.min > 0 &&
              e.length > 0 &&
              e.length < this.options.min
            ? ((this.error = ZJS.Form.translate(
                this.error_min,
                this.options.min
              )),
              (this.error = this.error.replace("%d", this.options.min)),
              !1)
            : !0;
        },
      }),
      ZJS.Utils.inherit(
        ZJS.Form.Validator.string_length,
        ZJS.Form.Validator.Abstract
      ),
      (ZJS.Form.Validator.digits = function (e, t) {
        ZJS.Form.Validator.Abstract.call(this, e, t);
      }),
      (ZJS.Form.Validator.digits.prototype = {
        error_wrong: "Field may contain only digits",
        validate: function (e) {
          var t = 0 == e.replace(/^\s*\-?[0-9]+\s*$/, "").length;
          return t
            ? !0
            : ((this.error = ZJS.Form.translate(this.error_wrong)), !1);
        },
      }),
      ZJS.Utils.inherit(ZJS.Form.Validator.digits, ZJS.Form.Validator.Abstract),
      (ZJS.Form.Validator["float"] = function (e, t) {
        ZJS.Form.Validator.Abstract.call(this, e, t);
      }),
      (ZJS.Form.Validator["float"].prototype = {
        error_wrong: "Field may contain only float num",
        validate: function (e) {
          if (0 == e.length) return !0;
          var t = parseFloat(e.replace(",", "."));
          return t === !1 || t > 18e13
            ? ((this.error = ZJS.Form.translate(this.error_wrong)), !1)
            : !0;
        },
      }),
      ZJS.Utils.inherit(
        ZJS.Form.Validator["float"],
        ZJS.Form.Validator.Abstract
      ),
      (ZJS.Form.Validator.email_address = function (e, t) {
        ZJS.Form.Validator.Abstract.call(this, e, t);
      }),
      (ZJS.Form.Validator.email_address.prototype = {
        error_wrong: "Field value must be valid email",
        validate: function (e) {
          var t = e.match(/^\s*[-0-9a-zA-Z\._]+@[-\.0-9a-z]+\.[a-z]{2,4}\s*$/);
          return e.length > 0 && !t
            ? ((this.error = ZJS.Form.translate(this.error_wrong)), !1)
            : !0;
        },
      }),
      ZJS.Utils.inherit(
        ZJS.Form.Validator.email_address,
        ZJS.Form.Validator.Abstract
      ),
      (ZJS.Form.Validator.alnum = function (e, t) {
        ZJS.Form.Validator.Abstract.call(this, e, t);
      }),
      (ZJS.Form.Validator.alnum.prototype = {
        error_wrong: "Field may contain only letters and digits",
        validate: function (e) {
          var t = 0 == e.replace(/[-a-zA-Z0-9]/, "").length;
          return t
            ? !0
            : ((this.error = ZJS.Form.translate(this.error_wrong)), !1);
        },
      }),
      ZJS.Utils.inherit(ZJS.Form.Validator.alnum, ZJS.Form.Validator.Abstract),
      (ZJS.Form.Validator.hostname = function (e, t) {
        ZJS.Form.Validator.Abstract.call(this, e, t);
      }),
      (ZJS.Form.Validator.hostname.prototype = {
        error_wrong: "Field value must be valid hostname",
        validate: function (e) {
          var t = e.match(
            /^(([a-zA-Zа-яА-Я0-9]|[a-zA-Zа-яА-Я0-9][a-zA-Zа-яА-Я0-9\-]*[a-zA-Zа-яА-Я0-9])\.)*([A-Za-zа-яА-Я]|[A-Za-zа-яА-Я][A-Za-zа-яА-Я0-9\-]*[A-Za-zа-яА-Я0-9])$/
          );
          return t
            ? !0
            : ((this.error = ZJS.Form.translate(this.error_wrong)), !1);
        },
      }),
      ZJS.Utils.inherit(
        ZJS.Form.Validator.hostname,
        ZJS.Form.Validator.Abstract
      ),
      (ZJS.Form.Validator.date = function (e, t) {
        ZJS.Form.Validator.Abstract.call(this, e, t);
      }),
      (ZJS.Form.Validator.date.prototype = {
        error_wrong: "Field value must be valid date",
        validate: function (e) {
          if ("" == e) return !0;
          var t = e.match(/\d{2}\.\d{2}\.\d{4}$/, "");
          return t
            ? !0
            : ((this.error = ZJS.Form.translate(this.error_wrong)), !1);
        },
      }),
      ZJS.Utils.inherit(ZJS.Form.Validator.date, ZJS.Form.Validator.Abstract),
      (ZJS.Form.Validator.inarray = function (e, t) {
        ZJS.Form.Validator.Abstract.call(this, e, t);
      }),
      (ZJS.Form.Validator.inarray.prototype = {
        error_wrong: "Field have wrong value",
        validate: function (e) {
          if (null == e) return !0;
          if (0 == e.length) return !0;
          for (var t = 0; t < this.options.haystack.length; t++)
            if (this.options.haystack[t] == e) return !0;
          return (this.error = ZJS.Form.translate(this.error_wrong)), !1;
        },
      }),
      ZJS.Utils.inherit(
        ZJS.Form.Validator.inarray,
        ZJS.Form.Validator.Abstract
      ),
      (ZJS.Form.Validator.regex = function (e, t) {
        ZJS.Form.Validator.Abstract.call(this, e, t);
      }),
      (ZJS.Form.Validator.regex.prototype = {
        error_wrong: "Field have wrong value",
        validate: function (e) {
          var t = new RegExp(this.options.pattern, "i");
          return e.length > 0 && !t.test(e)
            ? ((this.error = ZJS.Form.translate(this.error_wrong)), !1)
            : !0;
        },
      }),
      ZJS.Utils.inherit(ZJS.Form.Validator.regex, ZJS.Form.Validator.Abstract),
      (ZJS.Form.Validator.url = function (e, t) {
        ZJS.Form.Validator.Abstract.call(this, e, t);
      }),
      (ZJS.Form.Validator.url.prototype = {
        error_wrong: "Please enter valid URL",
        validate: function (e) {
          var t = new RegExp(this.options.pattern, "i");
          return e.length > 0 && !t.test(e)
            ? ((this.error = ZJS.Form.translate(this.error_wrong)), !1)
            : !0;
        },
      }),
      ZJS.Utils.inherit(ZJS.Form.Validator.url, ZJS.Form.Validator.Abstract),
      (ZJS.Form.Validator.password_confirm = function (e, t) {
        ZJS.Form.Validator.Abstract.call(this, e, t);
      }),
      (ZJS.Form.Validator.password_confirm.prototype = {
        error_wrong: "Password confirm does not match",
        validate: function (e) {
          return e != this.form.getValue(this.options.confirm_key)
            ? ((this.error = ZJS.Form.translate(this.error_wrong)), !1)
            : !0;
        },
      }),
      ZJS.Utils.inherit(
        ZJS.Form.Validator.password_confirm,
        ZJS.Form.Validator.Abstract
      ),
      (ZJS.Form.Validator.userlogin_check = function (e, t) {
        ZJS.Form.Validator.Abstract.call(this, e, t);
      }),
      (ZJS.Form.Validator.userlogin_check.prototype = {
        error_wrong: "User login already exist",
        validate: function (e) {
          var t = this.form.getValue(this.options.user_key),
            o = null;
          return (
            ZJS.Ajax.getJSONSync(
              this.options.url + "?id=" + t + "&check=" + encodeURIComponent(e),
              function (e) {
                o = e;
              }
            ),
            o && "ok" == o.status
              ? !0
              : ((this.error = ZJS.Form.translate(this.error_wrong)), !1)
          );
        },
      }),
      ZJS.Utils.inherit(
        ZJS.Form.Validator.userlogin_check,
        ZJS.Form.Validator.Abstract
      );
  })(jQuery),
  "undefined" == typeof ZJS && (ZJS = {}),
  (function () {
    function e() {
      sessionStorage.getItem("adblock") && (o = !1), (i = !0), r();
    }
    function t() {
      $(".adblock .close").click(function (e) {
        e.preventDefault(),
          $(".adblock").remove(),
          sessionStorage.setItem("adblock", 1),
          (o = !1);
      });
    }
    var o = !0,
      i = !1,
      s = !1,
      n = 2,
      a = [],
      r = function () {
        if (0 == --n) {
          s = !0;
          for (var e = 0; e < a.length; e++) a[e]();
          a = [];
        }
      };
    if (true) e();
    else {
      var u = new FuckAdBlock({ checkOnLoad: !0 });
      u.onDetected(e), u.onNotDetected(r);
    }
    ZJS.Ad = {
      showShort: function () {
        if (!s) return void a.push(ZJS.Ad.showShort);
        if (o && 0 != $("#content").length) {
          var e = $("#gad_short");
          e.length > 0 &&
            (i
              ? ($(e)
                  .empty()
                  .append(
                    ZJS.Templater.render("/common/antiblock/antiblock.ejs")
                  ),
                t())
              : (ZJS.Ad._showAd("gad_short", 3, "posterHorizontal"),
                ZJS.Ad._showAd("short-ad", 5, "posterVertical", 2)));
        }
      },
      showMap: function () {
        if (!s) return void a.push(ZJS.Ad.showMap);
        if (o && 0 != $("#content").length) {
          var e = $("#gad_map");
          e.length > 0 &&
            (i
              ? ($(e)
                  .empty()
                  .append(
                    ZJS.Templater.render("/common/antiblock/antiblock.ejs")
                  ),
                t())
              : ZJS.Ad._showAd("gad_map", 1));
        }
      },
      showBottom: function () {
        if (!s) return void a.push(ZJS.Ad.showBottom);
        if (o && 0 != $("#content").length) {
          var e = $("#gad_bottom");
          0 == e.length
            ? ((e = $('<div class="gad_bottom" id="gad_bottom"></div>')),
              $("#content").append(e),
              i
                ? $(e)
                    .empty()
                    .append(
                      ZJS.Templater.render("/common/antiblock/antiblock.ejs")
                    )
                : ZJS.Ad._showAd("gad_bottom", 2))
            : i
            ? $(e)
                .empty()
                .append(ZJS.Templater.render("/common/antiblock/antiblock.ejs"))
            : ZJS.Ad._showAd("gad_bottom", 2),
            t();
        }
      },
      _showAd: function (e) {
        $("#" + e).html(
          '<ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-5004408345374968" data-ad-slot="1000344232" data-ad-format="auto"></ins>'
        ),
          (adsbygoogle = window.adsbygoogle || []).push({});
      },
      _iframe: function (e, t, o) {
        return (
          '<iframe src="' +
          e +
          '" frameBorder="0" width="' +
          t +
          '" height="' +
          o +
          '" marginWidth="0" marginHeight="0" scrolling="no" style="border: 0px; margin: 0px; padding: 0px; width: ' +
          t +
          "px; height: " +
          o +
          'px;"></iframe>'
        );
      },
    };
  })(),
  "undefined" == typeof ZJS && (ZJS = {}),
  (function (e) {
    e(window).error(function () {
      LocalJS.loader.hideAll();
    });
  })(jQuery),
  this.JSON || (this.JSON = {}),
  (function () {
    function f(e) {
      return 10 > e ? "0" + e : e;
    }
    function quote(e) {
      return (
        (escapable.lastIndex = 0),
        escapable.test(e)
          ? '"' +
            e.replace(escapable, function (e) {
              var t = meta[e];
              return "string" == typeof t
                ? t
                : "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4);
            }) +
            '"'
          : '"' + e + '"'
      );
    }
    function str(e, t) {
      var o,
        i,
        s,
        n,
        a,
        r = gap,
        u = t[e];
      switch (
        (u &&
          "object" == typeof u &&
          "function" == typeof u.toJSON &&
          (u = u.toJSON(e)),
        "function" == typeof rep && (u = rep.call(t, e, u)),
        typeof u)
      ) {
        case "string":
          return quote(u);
        case "number":
          return isFinite(u) ? String(u) : "null";
        case "boolean":
        case "null":
          return String(u);
        case "object":
          if (!u) return "null";
          if (
            ((gap += indent),
            (a = []),
            "[object Array]" === Object.prototype.toString.apply(u))
          ) {
            for (n = u.length, o = 0; n > o; o += 1) a[o] = str(o, u) || "null";
            return (
              (s =
                0 === a.length
                  ? "[]"
                  : gap
                  ? "[\n" + gap + a.join(",\n" + gap) + "\n" + r + "]"
                  : "[" + a.join(",") + "]"),
              (gap = r),
              s
            );
          }
          if (rep && "object" == typeof rep)
            for (n = rep.length, o = 0; n > o; o += 1)
              (i = rep[o]),
                "string" == typeof i &&
                  ((s = str(i, u)),
                  s && a.push(quote(i) + (gap ? ": " : ":") + s));
          else
            for (i in u)
              Object.hasOwnProperty.call(u, i) &&
                ((s = str(i, u)),
                s && a.push(quote(i) + (gap ? ": " : ":") + s));
          return (
            (s =
              0 === a.length
                ? "{}"
                : gap
                ? "{\n" + gap + a.join(",\n" + gap) + "\n" + r + "}"
                : "{" + a.join(",") + "}"),
            (gap = r),
            s
          );
      }
    }
    "function" != typeof Date.prototype.toJSON &&
      ((Date.prototype.toJSON = function () {
        return isFinite(this.valueOf())
          ? this.getUTCFullYear() +
              "-" +
              f(this.getUTCMonth() + 1) +
              "-" +
              f(this.getUTCDate()) +
              "T" +
              f(this.getUTCHours()) +
              ":" +
              f(this.getUTCMinutes()) +
              ":" +
              f(this.getUTCSeconds()) +
              "Z"
          : null;
      }),
      (String.prototype.toJSON =
        Number.prototype.toJSON =
        Boolean.prototype.toJSON =
          function () {
            return this.valueOf();
          }));
    var cx =
        /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
      escapable =
        /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
      gap,
      indent,
      meta = {
        "\b": "\\b",
        "	": "\\t",
        "\n": "\\n",
        "\f": "\\f",
        "\r": "\\r",
        '"': '\\"',
        "\\": "\\\\",
      },
      rep;
    "function" != typeof JSON.stringify &&
      (JSON.stringify = function (e, t, o) {
        var i;
        if (((gap = ""), (indent = ""), "number" == typeof o))
          for (i = 0; o > i; i += 1) indent += " ";
        else "string" == typeof o && (indent = o);
        if (
          ((rep = t),
          t &&
            "function" != typeof t &&
            ("object" != typeof t || "number" != typeof t.length))
        )
          throw new Error("JSON.stringify");
        return str("", { "": e });
      }),
      "function" != typeof JSON.parse &&
        (JSON.parse = function (text, reviver) {
          function walk(e, t) {
            var o,
              i,
              s = e[t];
            if (s && "object" == typeof s)
              for (o in s)
                Object.hasOwnProperty.call(s, o) &&
                  ((i = walk(s, o)), void 0 !== i ? (s[o] = i) : delete s[o]);
            return reviver.call(e, t, s);
          }
          var j;
          if (
            ((text = String(text)),
            (cx.lastIndex = 0),
            cx.test(text) &&
              (text = text.replace(cx, function (e) {
                return (
                  "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
                );
              })),
            /^[\],:{}\s]*$/.test(
              text
                .replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@")
                .replace(
                  /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
                  "]"
                )
                .replace(/(?:^|:|,)(?:\s*\[)+/g, "")
            ))
          )
            return (
              (j = eval("(" + text + ")")),
              "function" == typeof reviver ? walk({ "": j }, "") : j
            );
          throw new SyntaxError("JSON.parse");
        });
  })(),
  "undefined" == typeof ZJS && (ZJS = {}),
  "undefined" == typeof ZJS.Widget && (ZJS.Widget = {}),
  (ZJS.Widget.Abstract = function () {
    ZJS.EventEmitter.call(this);
  }),
  (ZJS.Widget.Abstract.prototype = {
    config: {},
    getConfig: function (e) {
      return this.config[e] || "";
    },
  }),
  ZJS.Utils.inherit(ZJS.Widget.Abstract, ZJS.EventEmitter),
  "undefined" == typeof ZJS && (ZJS = {}),
  "undefined" == typeof ZJS.Widget && (ZJS.Widget = {}),
  (function (e) {
    (ZJS.Widget.Window = function (e, t) {
      ZJS.Widget.Abstract.call(this);
      var o = this;
      (this.root = null),
        (this.background = null),
        (this.is_open = !1),
        (this.is_build = !1),
        (this.title = t || "Untitled window"),
        (this.content = e || "&nbsp;"),
        (this.__clickCloseButton = function (e) {
          return o._clickCloseButton(e);
        }),
        (this.__keyPressEsc = function (e) {
          return o._keyPressEsc(e);
        });
    }),
      (ZJS.Widget.Window.EVENT_BUILD = "build"),
      (ZJS.Widget.Window.EVENT_OPEN = "open"),
      (ZJS.Widget.Window.EVENT_CLOSE = "close"),
      (ZJS.Widget.Window.prototype = {
        EVENT_BUILD: ZJS.Widget.Window.EVENT_BUILD,
        EVENT_OPEN: ZJS.Widget.Window.EVENT_OPEN,
        EVENT_CLOSE: ZJS.Widget.Window.EVENT_CLOSE,
        width: "auto",
        height: "auto",
        window_tpl:
          '<div id="window" class="popupMessage"><table><tr class="header"><td class="left"></td><td class="middle"><span><a href="" class="close"></a></span><h3></h3></td><td class="right"></td></tr><tr class="body"><td class="left"></td><td class="middle"></td><td class="right"></td></tr><tr class="footer"><td class="left"></td><td class="middle"></td><td class="right"></td></tr></table></div>',
        background_tpl: '<div class="window_bg"></div>',
        build: function () {
          (this.is_build = !0),
            (this.root = e(this.window_tpl)),
            e(this.root).css({ width: this.width }),
            e(".header h3", this.root).text(this.title),
            "auto" != this.height &&
              e(this.root).css({ height: 2 * this.height + "px" }),
            e(".body .middle", this.root).html(this.content),
            (this.background = e(this.background_tpl)),
            e(".close", this.root).bind("click", this.__clickCloseButton),
            e("body").bind("keydown", this.__keyPressEsc),
            e("body").append(this.background),
            e("body").append(this.root),
            this.emit(this.EVENT_BUILD);
        },
        setTitle: function (t) {
          (this.title = t), e(".header h3", this.root).html(this.title);
        },
        destroy: function () {
          e(this.root).length > 0 &&
            (e(this.root).remove(), e(this.background).remove());
        },
        update: function (t) {
          (this.content = t),
            this.root && e(".popupContent", this.root).html(this.content);
        },
        open: function () {
          this.is_build
            ? e(".body .middle", this.root).html(this.content)
            : this.build(),
            e(this.root).show(),
            (this.is_open = !0),
            e(this.background)
              .css({
                width: e(window).width() + "px",
                height: e(window).height() + "px",
              })
              .show(),
            this.emit(this.EVENT_OPEN);
        },
        close: function () {
          (this.is_open = !1),
            e(this.root).hide(),
            e(this.background).hide(),
            this.emit(this.EVENT_CLOSE);
        },
        move: function (t, o) {
          e(this.root).css({
            top: Math.max(0, t) + "px",
            left: Math.max(0, o) + "px",
          });
        },
        centralize: function () {
          var t = this.isOpen();
          t || this.open();
          var o = e(window).height() / 2 - e(this.root).height() / 2,
            i =
              e(window).width() / 2 -
              e(this.root).width() / 2 +
              (document.documentElement.scrollLeft || document.body.scrollLeft);
          e(this.root).css({
            top: Math.max(0, o) + "px",
            left: Math.max(0, i) + "px",
          }),
            e(this.root)
              .find(".needscroll")
              .css({ maxHeight: e(window).height() - 115, overflowY: "auto" }),
            t || this.close();
        },
        isOpen: function () {
          return this.is_open;
        },
        _clickCloseButton: function (e) {
          this.close(), e.preventDefault();
        },
        _keyPressEsc: function (e) {
          27 == e.keyCode && this.close();
        },
        __dummy: null,
      }),
      ZJS.Utils.inherit(ZJS.Widget.Window, ZJS.Widget.Abstract);
  })(jQuery),
  "undefined" == typeof LocalJS && (LocalJS = {}),
  "undefined" == typeof LocalJS.Widget && (LocalJS.Widget = {}),
  (LocalJS.Widget.Abstract = function (e) {
    ZJS.EventEmitter.call(this), (this._options = e || {}), this.init();
  }),
  (LocalJS.Widget.Abstract.prototype = {
    _options: {},
    _config: {},
    _is_dispaching: !0,
    init: function () {},
    config: function (e) {
      return this._config[e] || "";
    },
    dispatch: function (e) {
      e && e();
    },
  }),
  ZJS.Utils.inherit(LocalJS.Widget.Abstract, ZJS.EventEmitter),
  "undefined" == typeof LocalJS && (LocalJS = {}),
  (function () {
    LocalJS.Lang = {
      _data: {},
      get: function (e, t) {
        return t && "cs_CZ" == LocalJS.config.language
          ? this.czechHach(e, t)
          : this._data[e] || e;
      },
      has: function (e) {
        return e in this._data;
      },
      nget: function (e, t) {
        if (this._data[e + "#plural"]) {
          var o = this._data[e + "#plural"].split("|");
          return o[this._pluralIndex(t)];
        }
        return this._data[e] || e;
      },
      setData: function (e) {
        this._data = e;
      },
      _pluralIndex: function (e) {
        if ("ru_RU" == LocalJS.config.language) {
          if (("" + e).length > 1) {
            var t = parseInt(("" + e).substring(("" + e).length - 2));
            if (t > 10 && 20 > t) return 2;
            e = parseInt(("" + e).substring(("" + e).length - 1));
          }
          return 1 == e ? 0 : e > 1 && 5 > e ? 1 : 2;
        }
        return e >= -1 && 1 >= e ? 0 : 1;
      },
      czechHach: function (e, t) {
        if (this._data[e + "#plural"]) {
          var o = this._data[e + "#plural"].split("|");
          return o[(t >= 2 && 4 >= t) || (t >= 100 && 199 >= t) ? 1 : 0];
        }
        return this._data[e] || e;
      },
    };
  })();
var GlobalRoutes = [
  new ZJS.Front.Route(":module/:content/", {
    role: "user",
    module: "toplist",
    content: "index",
    layout: "main",
  }),
  new ZJS.Front.Route("translator/", {
    role: "translator",
    module: "index",
    content: "index",
    layout: "main",
  }),
  new ZJS.Front.Route(
    "tools/:tab/",
    { role: "user", module: "tools", content: "main", layout: "main" },
    { tab: /military|wonder|map/ }
  ),
  new ZJS.Front.Route(
    "room/:tab/",
    {
      role: "user",
      module: "room",
      content: "index",
      layout: "main",
      tab: "report",
    },
    { tab: /report|ally|profile|fav|userbar/ }
  ),
  new ZJS.Front.Route(
    "support/:id/",
    { role: "user", module: "support", content: "view", layout: "main" },
    { id: /^\d+$/ }
  ),
  new ZJS.Front.Route("scripts/", {
    role: "user",
    module: "scripts",
    content: "index",
    layout: "main",
  }),
  new ZJS.Front.Route(
    "report/:rep_id/:round/",
    {
      role: "user",
      module: "report",
      content: "index",
      layout: "main",
      rep_id: "failed",
      round: 0,
    },
    { round: /^\d+$/ }
  ),
  new ZJS.Front.Route("auth/:module/:content/", {
    role: "auth",
    module: "reg",
    content: "index",
    layout: "main",
    menu: "#auth/reg",
  }),
  new ZJS.Front.Route(
    "auth/restore/:code/",
    {
      role: "auth",
      module: "restore",
      content: "index",
      layout: "main",
      code: "",
    },
    { code: /[a-z0-9]{16}/ }
  ),
  new ZJS.Front.Route(
    "news/:id/",
    {
      role: "news",
      module: "index",
      content: "index",
      layout: "main",
      id: "none",
    },
    { id: /^\d+$/ }
  ),
  new ZJS.Front.Route("donate/", {
    role: "donate",
    module: "index",
    content: "index",
    layout: "main",
  }),
  new ZJS.Front.Route("donate/thanks/", {
    role: "donate",
    module: "index",
    content: "thanks",
    layout: "main",
  }),
  new ZJS.Front.Route("dev/:tab/", {
    role: "dev",
    module: "index",
    content: "index",
    layout: "main",
    menu: "#dev",
    tab: "stat",
  }),
  new ZJS.Front.Route("error/:content/", {
    role: "default",
    module: "error",
    layout: "error",
  }),
];
"undefined" == typeof LocalJS && (LocalJS = {}),
  "undefined" == typeof LocalJS.Page && (LocalJS.Page = {}),
  (function (e) {
    (LocalJS.Page.Common = function () {
      ZJS.Front.Page.call(this);
    }),
      (LocalJS.Page.Common.prototype = {
        getId: function () {
          return "LocalJS.Page.Common";
        },
        createForm: function (e) {
          var t;
          return (
            (t = new ZJS.Form("string" == typeof e ? this.id(e) : e)),
            (t.renderError = this._renderError),
            (t.clearErrors = this._clearErrors),
            t
          );
        },
        _renderError: function (t, o, i) {
          if (
            (LocalJS.Lang.has("form." + o) &&
              (o = LocalJS.Lang.get("form." + o)),
            t || (t = e("input[name='" + i + "[]']", this.form).get(0)),
            t)
          ) {
            var s = e(t, this.form).parent().addClass("error");
            e("span.error_form", s).text(o),
              e(t, this.form).on("focus", function () {
                e(s).addClass("focused");
              }),
              e(t, this.form).on("blur", function () {
                "" == e(this).val() && e(s).removeClass("focused");
              });
          }
        },
        _clearErrors: function () {
          var t = e(".error", this.form);
          e("input, select, textarea", t).off("focus").off("blur"),
            e(t).removeClass("error").removeClass("focused");
        },
        __dummy: null,
      }),
      ZJS.Utils.inherit(LocalJS.Page.Common, ZJS.Front.Page);
  })(jQuery),
  "undefined" == typeof LocalJS && (LocalJS = {}),
  "undefined" == typeof LocalJS.Module && (LocalJS.Module = {}),
  (function (e) {
    (LocalJS.Module.MenuTop = function () {
      (this.base = ZJS.Front.Page.prototype), ZJS.Front.Page.call(this);
    }),
      (LocalJS.Module.MenuTop.prototype = {
        page_url: "layout/menu/gettop/",
        template: "module/menu/top.ejs",
        getId: function () {
          return "LocalJS.Module.MenuTop";
        },
        init: function () {
          (this._is_init = !1), (this._updateMenu = "");
        },
        selfDestroy: function () {},
        setupPage: function () {
          (this._is_init = !0),
            "" != this._updateMenu && this.selectMenu(this._updateMenu);
        },
        setupElements: function () {
          var e = "",
            t = this._front.getRequest().getParams();
          t &&
            t.content &&
            "" != t.content &&
            t.module &&
            "" != t.module &&
            (e =
              t.menu && "" != t.menu
                ? (0 != t.menu.indexOf("#") ? "#" : "") + t.menu
                : "#" +
                  t.module +
                  "/" +
                  ("index" != t.content ? t.content + "/" : "")),
            this.selectMenu(e);
        },
        selectMenu: function (t) {
          if (!this._is_init) return void (this._updateMenu = t);
          if (!t || "#" == t || "" == t) return !1;
          e("._menu_button.active", this.getDummy()).removeClass("active"),
            e("._menu_button", this.getDummy()).each(function () {
              var o = e(this).parent();
              e(o).attr("href") &&
                0 == e(o).attr("href").indexOf(t) &&
                e(this).addClass("active");
            });
        },
        getTemplate: function () {
          return this.template;
        },
        __dummy: null,
      }),
      ZJS.Utils.inherit(LocalJS.Module.MenuTop, ZJS.Front.Page);
  })(jQuery),
  "undefined" == typeof LocalJS && (LocalJS = {}),
  "undefined" == typeof LocalJS.Module && (LocalJS.Module = {}),
  (function (e) {
    (LocalJS.Module.SwitchUser = function (e, t) {
      (this.base = ZJS.Front.Page.prototype),
        LocalJS.Page.Common.call(this, e, t);
    }),
      (LocalJS.Module.SwitchUser.prototype = {
        page_url: "layout/user/get/",
        EVENT_SWITCH: "switch",
        getId: function () {
          return "LocalJS.Module.SwitchUser";
        },
        init: function () {
          this._timeout = !1;
        },
        setupPage: function () {
          if (
            (this.id("su_news").click(
              function () {
                this._data.news &&
                  "undefined" != typeof window.localStorage &&
                  localStorage.setItem("news" + this._data.news, 1),
                  ZJS.Navigation.go("#news");
              }.bind(this)
            ),
            this._data.news &&
              "undefined" != typeof window.localStorage &&
              !localStorage.getItem("news" + this._data.news) &&
              this._flashNews(),
            this._data && this._data.mode)
          )
            if ("login" == this._data.mode) {
              this._createRegWindow(),
                this._createForgotWindow(),
                this._blockEvns(this.id("login_login"), this.id("login_box"));
              var e = new ZJS.Form(this.id("login_form"));
              e.addEventListener("complete", this._login, this),
                this.id("login_button").click(
                  function () {
                    this._timeout && this._clearTimeout(), e.submit();
                  }.bind(this)
                ),
                this.id("login_reg").click(
                  function (e) {
                    e.preventDefault(), this._openRegWindow();
                  }.bind(this)
                ),
                this.id("login_forgot").click(
                  function (e) {
                    e.preventDefault(), this._openForgotWindow();
                  }.bind(this)
                );
            } else
              this._createProfileWindow(),
                this.id("user_logout").click(
                  function (e) {
                    e.preventDefault();
                    var t = LocalJS.loader.showLoader();
                    LocalJS.request.getJSON(
                      "/auth/login/logout/",
                      function (e) {
                        LocalJS.loader.hide(t),
                          ZJS.Navigation.reload(e.homepage);
                      }
                    );
                  }.bind(this)
                ),
                this.id("show_profile").click(
                  function (e) {
                    e.preventDefault(), this._openProfileWindow();
                  }.bind(this)
                );
          this._createLangs();
        },
        getUserId: function () {
          return this._data.user_id;
        },
        getRoleId: function () {
          return this._data.role_id;
        },
        getRole: function () {
          return this._data.rolename;
        },
        getHomepage: function () {
          return this._data.homepage;
        },
        setHomepage: function (e) {
          e && (this._data.homepage = e);
        },
        getTemplate: function () {
          if (this._data && this._data.mode) {
            var e = "module/switch_user/" + this._data.mode + ".ejs";
            return e;
          }
          return "";
        },
        is_logged: function () {
          return this._data && this._data.mode && "user" == this._data.mode;
        },
        _flashNews: function () {
          this._data.news &&
            (localStorage.getItem("news" + this._data.news)
              ? this.id("su_news").removeClass("new_news")
              : (this.id("su_news").toggleClass("new_news"),
                setTimeout(this._flashNews.bind(this), 500)));
        },
        _createRegWindow: function () {
          (this._win_reg = new LocalJS.Widget.Window({ width: "auto" })),
            this.addWidget(this._win_reg);
        },
        _createForgotWindow: function () {
          (this._win_forgot = new LocalJS.Widget.Window({ width: "auto" })),
            this.addWidget(this._win_forgot);
        },
        _createProfileWindow: function () {
          (this._win_profile = new LocalJS.Widget.Window({ width: "auto" })),
            this.addWidget(this._win_profile);
        },
        _openRegWindow: function () {
          var e = "auth/reg/reg.ejs",
            t = ZJS.Templater.render(e, {});
          this._win_reg.setTitle(LocalJS.Lang.get("main.Reg")),
            this._win_reg.update(t),
            this._win_reg.open(),
            this._win_reg.centralize(),
            this._initRegWindow();
        },
        _openForgotWindow: function () {
          var e = "auth/forgot/forgot.ejs",
            t = ZJS.Templater.render(e, {});
          this._win_forgot.setTitle(LocalJS.Lang.get("main.Forgot")),
            this._win_forgot.update(t),
            this._win_forgot.open(),
            this._win_forgot.centralize(),
            this._initForgotWindow();
        },
        _openProfileWindow: function () {
          var e = "auth/user/profile.ejs",
            t = ZJS.Templater.render(e, {});
          this._win_profile.setTitle(LocalJS.Lang.get("main.Profile")),
            this._win_profile.update(t),
            this._win_profile.open(),
            this._win_profile.centralize(),
            this._initProfileWindow();
        },
        _initRegWindow: function () {
          var t = this.createForm("form_reg");
          t.setValidationRules(this._data.form_rules.reg),
            t.addEventListener(
              "success",
              function (e) {
                this._win_reg.close(), this._login(e);
              },
              this
            ),
            e("#save_button", this._win_reg.getDummy()).click(function (e) {
              e.preventDefault(), t.save();
            }),
            e("#cancel", this._win_reg.getDummy()).click(
              function (e) {
                e.preventDefault(), this._win_reg.close();
              }.bind(this)
            );
        },
        _initForgotWindow: function () {
          var t = this.createForm("form_forgot");
          t.setValidationRules(this._data.form_rules.forgot),
            t.addEventListener(
              "success",
              function () {
                this._win_forgot.close(),
                  LocalJS.loader.showSuccess(
                    LocalJS.Lang.get("main.Restore_password_mail")
                  );
              },
              this
            ),
            t.addEventListener(
              "complete",
              function (t) {
                "failed" == t.status &&
                  e(".error_form", this._win_forgot.getDummy())
                    .html(LocalJS.Lang.get("main." + t.msg))
                    .parent()
                    .addClass("error");
              },
              this
            ),
            e("#save_button", this._win_forgot.getDummy()).click(function (e) {
              e.preventDefault(), t.save();
            }),
            e("#cancel", this._win_forgot.getDummy()).click(
              function (e) {
                e.preventDefault(), this._win_forgot.close();
              }.bind(this)
            );
        },
        _initProfileWindow: function () {
          var t = this.createForm("form_profile");
          t.setValidationRules(this._data.form_rules.profile),
            t.addEventListener(
              "success",
              function (e) {
                this._win_profile.close(), ZJS.Navigation.reload(e.homepage);
              },
              this
            ),
            t.setValues(this._data.form),
            e("#save_button", this._win_profile.getDummy()).click(function (e) {
              e.preventDefault(), t.save();
            }),
            e("#cancel", this._win_profile.getDummy()).click(
              function (e) {
                e.preventDefault(), this._win_profile.close();
              }.bind(this)
            );
        },
        _clearTimeout: function () {
          this.id("error").fadeOut("fast"), clearTimeout(this._timeout);
        },
        _login: function (t) {
          if (t && "ok" == t.status)
            e("#lang_title").hide(),
              t.language != LocalJS.config.language
                ? this._changeLang(t.locale)
                : ZJS.Navigation.reload(t.homepage);
          else {
            e('input[name="login"]', this.id("login_form")).val(""),
              e('input[name="pass"]', this.id("login_form")).val("");
            var o = this.id("error");
            0 == o.length &&
              ((o = e('<div id="error" class="flash_box"></div>')),
              e(o).click(
                function () {
                  this._clearTimeout();
                }.bind(this)
              ),
              e("body").append(o)),
              e(o)
                .fadeIn("slow")
                .text(
                  LocalJS.Lang.get("" != t.msg ? t.msg : "auth.email_not_found")
                ),
              (this._timeout = setTimeout(
                function () {
                  e(o).fadeOut("slow");
                }.bind(this),
                3e3
              ));
          }
        },
        _blockEvns: function (t, o) {
          e(t).mousedown(
            function () {
              e(o).is(":visible") ? this._hide(t, o) : this._show(t, o);
            }.bind(this)
          ),
            e(t)
              .on(
                "mouseover",
                function () {
                  this._rmEvents(t, o);
                }.bind(this)
              )
              .on(
                "mouseout",
                function () {
                  this._addEvents(t, o);
                }.bind(this)
              );
        },
        _createLangs: function () {
          var t = e(".lang_changer", this.getDummy());
          e(t).text(this._data.langs[LocalJS.config.language].lang_title),
            (this._lang_box = e('<div class="lang_box"></div>')),
            e.each(
              this._data.langs,
              function (o, i) {
                if (o != LocalJS.config.language) {
                  var s = e("<div>" + i.lang_title + "</div>");
                  e(this._lang_box).append(s),
                    e(s).on(
                      "click",
                      function () {
                        this._hide(t, this._lang_box);
                        var o = LocalJS.loader.showLoader();
                        LocalJS.request.postJSON(
                          "/layout/user/changelang/",
                          { lang: i.lang_id },
                          function (t) {
                            LocalJS.loader.hide(o),
                              t &&
                                t.status &&
                                "ok" == t.status &&
                                (e(this._lang_box).remove(),
                                e("#lang_title").hide(),
                                this._changeLang(t.locale));
                          }.bind(this)
                        );
                      }.bind(this)
                    );
                }
              }.bind(this)
            ),
            e("body").append(this._lang_box),
            this._blockEvns(t, this._lang_box);
        },
        _show: function (t, o) {
          e(t).addClass("active");
          var i = { left: Math.floor(e(t).offset().left - 10) },
            s = e("#lang_title");
          0 == s.length &&
            ((s = e('<div class="lang_box_title" id="lang_title"></div>')),
            e("body").append(s)),
            e(s).html(e(t).html()).css(i).show(),
            e(o).hasClass("login_box") &&
              ((i.left -= e(o).parent().offset().left),
              (i.left = Math.floor(i.left))),
            e(o)
              .css(i)
              .show()
              .on(
                "mouseover",
                function () {
                  this._rmEvents(t, o);
                }.bind(this)
              )
              .on(
                "mouseout",
                function () {
                  this._addEvents(t, o);
                }.bind(this)
              );
        },
        _hide: function (t, o) {
          e(t).removeClass("active"),
            this._rmEvents(t, o),
            Math.floor(e(t).offset().left - 10) ==
              Math.floor(e("#lang_title").offset().left) &&
              e("#lang_title").hide(),
            e(o).hide();
        },
        _addEvents: function (t, o) {
          e(o).is(":visible") &&
            e("body").on(
              "mousedown",
              function () {
                this._hide(t, o);
              }.bind(this)
            );
        },
        _rmEvents: function (t, o) {
          e(o).is(":visible") && e("body").off("mousedown");
        },
        _changeLang: function (e) {
          e || (e = LocalJS.config.language);
          var t = LocalJS.loader.showLoader();
          ZJS.Ajax.getText(
            "/js/local/i18n/" +
              e +
              "/main.js?" +
              Math.ceil(999999 * Math.random()),
            function (o) {
              LocalJS.loader.hide(t),
                (LocalJS.config.language = e),
                ZJS.Loader._exec(o),
                ZJS.Navigation.reload();
            }.bind(this)
          );
        },
        __dummy: null,
      }),
      ZJS.Utils.inherit(LocalJS.Module.SwitchUser, LocalJS.Page.Common);
  })(jQuery),
  "undefined" == typeof LocalJS && (LocalJS = {}),
  "undefined" == typeof LocalJS.Module && (LocalJS.Module = {}),
  (function (e) {
    (LocalJS.Module.Report = function () {
      ZJS.Front.Page.call(this);
    }),
      (LocalJS.Module.Report.prototype = {
        EVENT_BUILD: "build",
        EVENT_REBUILD: "rebuild",
        EVENT_BUILD_ROW: "build_row",
        EVENT_CHECKBOX_CLICK: "checkbox",
        _step: 25,
        _defaultStep: 25,
        _needshowall: !1,
        page_url: "common/report/index/",
        excel_url: "common/report/excel/",
        _hide_per_page: !1,
        getId: function () {
          return "LocalJS.Module.Report";
        },
        getPage: function () {
          return this._page;
        },
        showAll: function (e) {
          this._needshowall = e;
        },
        getCountRows: function () {
          return parseInt(this._total);
        },
        hidePerPage: function () {
          this._hide_per_page = !0;
        },
        getData: function () {
          return this._data;
        },
        setPage: function (e) {
          this._page = e && e > 0 ? e : this._page;
        },
        setLimit: function (e) {
          (this._step = e && e > 0 ? e : this._step),
            (this._defaultStep = this._step);
        },
        setReport: function (e) {
          this._report = e;
        },
        getReport: function () {
          return this._report;
        },
        setMainTemplate: function (e) {
          (this._main_tpl = e), ZJS.Templater.preload(this._main_tpl);
        },
        setMBodyTemplate: function (e, t) {
          (this._mdody_tpl = e),
            ZJS.Templater.preload(this._mdody_tpl),
            t && (this.__need_rows = t);
        },
        setBodyTemplate: function (e) {
          (this._body_tpl = e), ZJS.Templater.preload(this._body_tpl);
        },
        setSummaryTemplate: function (e) {
          (this._summary_tpl = e), ZJS.Templater.preload(this._summary_tpl);
        },
        setDefaultSort: function (e, t) {
          (this._default_sort = e || ""),
            (this._default_order = t || "asc"),
            (this._sort = this._default_sort),
            (this._order = this._default_order);
        },
        setDefaultParams: function (e) {
          (this._default_params = e), (this._params = this._default_params);
        },
        setNeedRows: function (e) {
          "" != this._mdody_tpl && (this.__need_rows = e);
        },
        setHidden: function (e) {
          this._hidden = e;
        },
        getHidden: function () {
          return this._hidden || {};
        },
        getRowId: function () {
          var t = [],
            o = e('input[name="row_id"]:checked', this.getDummy());
          return (
            e.each(o, function (e, o) {
              t.push(o.value);
            }),
            t
          );
        },
        getRowValue: function (t) {
          var o = [];
          return (
            e("tr", this.getDummy())
              .has('input[name="row_id"]:checked')
              .each(function (e, i) {
                o.push(i.data[t]);
              }),
            o
          );
        },
        addForm: function (e) {
          e.length > 0 && (e = e[0]),
            e instanceof ZJS.Form && (e = e.getForm()),
            this._forms.push(e),
            this._setupKeys(),
            this._setupWatch();
        },
        addBodyWidget: function (e) {
          this._body_wigets.push(e);
        },
        getTemplate: function () {
          return this._main_tpl;
        },
        downloadExcel: function () {
          var e = [];
          e.push("report=" + encodeURIComponent(this._report)),
            e.push("order=" + encodeURIComponent(this._order)),
            e.push("sort=" + encodeURIComponent(this._sort)),
            e.push("query=" + encodeURIComponent(this._buildQuery())),
            window.open(this.excel_url + "?" + e.join("&"));
        },
        selfDestroy: function () {
          this._destroyBodyWidgets(),
            ZJS.Front.Page.prototype.selfDestroy.call(this);
        },
        init: function () {
          (this._forms = []),
            (this._query = ""),
            (this._hidden = {}),
            (this._sort = ""),
            (this._order = "desc"),
            (this._page = 1),
            (this._params = {}),
            (this._keys = []),
            (this._default_sort = ""),
            (this._default_order = "desc"),
            (this._default_params = {}),
            (this._report = ""),
            (this._main_tpl = ""),
            (this._mdody_tpl = ""),
            (this._body_tpl = ""),
            (this._summary_tpl = ""),
            (this._controls = {}),
            (this.__need_rows = !1),
            (this._total = 0),
            (this._summary = null),
            (this._body_wigets = []),
            (this._names = {
              page: "page",
              sort: "sort",
              order: "order",
              step: "limit",
            }),
            (this._query = this._front.getRequest().getQueryString()),
            this._updateFromQuery(this._query);
        },
        retrievePageData: function (e) {
          var t = this,
            o = (this._page - 1) * this._step,
            i = this._step;
          this.request(o, i, function (o) {
            t.updateDummy(o, e);
          });
        },
        setupPage: function () {
          (this._total = (this._data.body && this._data.body.rows_count) || 0),
            (this._summary =
              (this._data.body && this._data.body.summary) || null),
            this._setupKeys(),
            this._setupWatch(),
            this._updateFromQuery(this._query),
            this._initHeaderFilters(),
            this._initHeaderCheckbox(),
            this._initHeaderSort(),
            this._initFooterPager(),
            this._rebuild(this._data),
            this.emit(this.EVENT_BUILD);
        },
        setupElements: function () {
          e(".table-filters input", this.getDummy())
            .hide()
            .each(function () {
              var t = e(this),
                o = t.parent().width();
              (o = 32 > o ? 32 : o),
                t.parent().parent().css("width", o),
                t.parent().css("width", o + "px"),
                t.css("width", o - 19 + "px");
            })
            .show();
        },
        filter: function () {
          var e = this._getQueryFromForms();
          this.query(e);
        },
        request: function (e, t, o) {
          this._last_state = {
            report: this._report,
            params: this._params,
            hidden: this._hidden,
            order: this._order,
            sort: this._sort,
            page: this._page,
          };
          var i = {
            report: this._report,
            query: this._buildQuery(),
            order: this._order,
            sort: this._sort,
            start: e,
            limit: t,
          };
          this.getRequest().postJSON(this.getPageUrl(), i, o);
        },
        reload: function (e, t) {
          this._updateState(e || function () {}, t || !1);
        },
        hasRows: function () {
          return 0 == this._total;
        },
        _buildQuery: function () {
          var e,
            t = [],
            o = ZJS.Navigation.parseQueryString(this._query);
          for (e in this._params) "" != e && (o[e] = this._params[e]);
          for (e in this._hidden) "" != e && (o[e] = this._hidden[e]);
          for (e in o) t.push(e + "=" + o[e]);
          return (
            o.sort && (this._sort = o.sort),
            o.order && (this._order = o.order),
            t.join("&")
          );
        },
        _build: function (t) {
          if (!this._checkOnError(t)) return !1;
          var o,
            i = this,
            s = this.getDummy(),
            n = this._body_tpl;
          if ("" != this._mdody_tpl) {
            var a = 0;
            e.each(this.__need_rows, function () {
              a++;
            });
            var r = e(
              ZJS.Templater.render(this._mdody_tpl, {
                row: t.body.one_row,
                td: this.__need_rows,
                count_td: a,
              })
            );
            e("table.rich-table", s).empty().append(r), this._initFooterPager();
          }
          var u = e("tbody.rich-data", s).get(0);
          e.each(t.body.rows, function (t, s) {
            (s.params = i._data.params),
              i.__need_rows && (s.td = i.__need_rows);
            var a = ZJS.Templater.render(n, s);
            e(u).append(a),
              (o =
                3 == u.lastChild.nodeType
                  ? u.lastChild.previousSibling
                  : u.lastChild),
              e(o)
                .bind("mouseover", function () {
                  e(this).css("background-color", "#f8e5b1");
                })
                .bind("mouseout", function () {
                  e(this).css("background-color", "");
                }),
              (o.data = s),
              i.emit(i.EVENT_BUILD_ROW, [o, s]);
          }),
            this.emit(this.EVENT_CHANGED);
        },
        _apbuild: function (e) {
          this._build(e), this._initState(), this.emit(this.EVENT_REBUILD);
        },
        _checkOnError: function (e) {
          if (e) {
            if (e.body && e.body.rows) return !0;
            if (e.response && 403 == e.response)
              return this.forward("error/403/"), !1;
          }
          return (
            LocalJS.loader.showFailed(LocalJS.Lang.get("error.report")),
            LocalJS.config.display_errors &&
              window.console &&
              console.log(e.response),
            !1
          );
        },
        _rebuild: function (t) {
          if (!this._checkOnError(t)) return !1;
          (this._data.body = t.body),
            t.body && t.body.rows_count && (this._total = t.body.rows_count),
            t.body && t.body.summary && (this._summary = t.body.summary),
            this._destroyBodyWidgets(),
            e("tbody.rich-data", this.getDummy()).empty(),
            this._build(t),
            this._buildSummary(),
            this._buildNoData(),
            this._initState();
          var o = Math.ceil(this._total / this._step);
          this._updatePager(),
            e(".count_pages", this.getDummy())
              .parent()
              .html(
                LocalJS.Lang.get("main.out_of", o) +
                  ' <span class="bold count_pages">' +
                  o +
                  "</span>"
              ),
            this.emit(this.EVENT_REBUILD);
        },
        _buildSummary: function () {
          if (!this._summary_tpl) return !1;
          if (!this._summary) return !1;
          var t = ZJS.Utils.merge(this._summary, this._local_vars || {});
          this.__need_rows && (t.td = this.__need_rows);
          var o = ZJS.Templater.render(this._summary_tpl, t);
          e("tbody.rich-summary", this.getDummy()).html(o);
        },
        _buildNoData: function () {
          if (0 == this._total) {
            var t =
              "<tr class='no-data'><td colspan='" +
              this._getColumnCount() +
              "'>" +
              LocalJS.Lang.get("main.Not_found") +
              "</td></tr>";
            e("tbody.rich-data", this.getDummy()).html(t),
              e("tbody.rich-summary", this.getDummy()).hide();
          } else e("tbody.rich-summary", this.getDummy()).show();
        },
        _initState: function () {
          this._initStateSort(),
            this._initStateFilter(),
            this._initStateFooter();
        },
        _initStateFilter: function () {
          var t = this,
            o = this.getDummy(),
            i = ZJS.Navigation.parseQueryString(this._query);
          e.each(this._controls, function (e, o) {
            o.setValue(t._params[e] || "");
          }),
            e(".table-filters select", this.getDummy()).val(""),
            e.each(i, function (t, i) {
              e(".table-filters select[name='" + t + "']", o).val(i);
            });
        },
        _initStateFooter: function () {
          var t = this.getDummy(),
            o = this._total - this._page * this._step;
          e("tr.last", t).removeClass("last"),
            0 == this.step || 0 >= o
              ? e(".add-button-tr", t).parent().hide()
              : (e(".add-button-more", t).html(Math.min(this._step, o)),
                e(".add-button-rest", t).html(o),
                e(".add-button-tr", t).parent().show(),
                e("tbody.rich-data > tr:last", t).addClass("last"));
        },
        _initStateSort: function () {
          var t = this.getDummy();
          e("thead td[class~='sort-on']", t)
            .removeClass("sort-on")
            .addClass("sort"),
            e("thead b", t).removeClass("sort-up").removeClass("sort-down"),
            this._sort && this._initSortColumn(this._sort, this._order);
        },
        _initSortColumn: function (e, t) {
          var o = this._getColumnByField(e),
            i = this._getAnchorByField(e);
          o.hasClass("sort-on") || o.removeClass("sort").addClass("sort-on"),
            "desc" == t
              ? i.removeClass("sort-up").addClass("sort-down")
              : i.removeClass("sort-down").addClass("sort-up");
        },
        _initHeaderFilters: function () {
          function t(e) {
            var t = {};
            (t[e.getName()] = encodeURIComponent(e.getValue())),
              (i._page = 1),
              (t[i._names.page] = i._page),
              i.query(t, function () {
                e.focus();
              });
          }
          function o() {
            var t = {};
            (t[this.name] = e(this).val()),
              (i._page = 1),
              (t[i._names.page] = i._page),
              i.query(t);
          }
          var i = this;
          e(".table-filters input[type='text']", this.getDummy()).each(
            function () {
              var e = i.addWidget(new LocalJS.Widget.CrossInput(this));
              e.addEventListener("submit", t),
                e.addEventListener("clear", t),
                (i._controls[this.name] = e);
            }
          ),
            e(".table-filters select", this.getDummy()).bind("change", o);
        },
        _initHeaderSort: function () {
          var t = e("td.sort, td.sort-on", this.getDummy());
          t.children("b").bind("click", this._sortToggle.bind(this));
        },
        _initHeaderCheckbox: function () {
          (this._head_checkbox = e("input[name='*']", this.getDummy())),
            this._head_checkbox.length > 0 &&
              (this.addEventListener(
                "build_row",
                function (t) {
                  var o = e("input[name='row_id']", t);
                  o.prop("checked", this._head_checkbox.prop("checked")),
                    o.change(
                      function (e) {
                        this.emit(this.EVENT_CHECKBOX_CLICK, [
                          e.target.checked,
                          e.target.value,
                        ]),
                          this._checkHeadCheckbox();
                      }.bind(this)
                    );
                },
                this
              ),
              this._head_checkbox.change(
                function () {
                  var t = this,
                    o = this._head_checkbox.prop("checked");
                  e("input[name='row_id']", this.getDummy())
                    .prop("checked", o)
                    .each(function () {
                      t.emit(t.EVENT_CHECKBOX_CLICK, [o, e(this).val()]);
                    });
                }.bind(this)
              ));
        },
        _checkHeadCheckbox: function () {
          var t = e("input[name='row_id']", this.getDummy()),
            o = t.length,
            i = t.filter(":checked").length;
          o == i
            ? this._head_checkbox.prop("checked", !0)
            : this._head_checkbox.prop("checked", !1);
        },
        _initFooterPager: function () {
          var t = this,
            o = ZJS.Utils.sortArray([25, 50, 100, this._step]);
          o = ZJS.Utils.uniqueArray(o);
          var i = e("tbody.rich-paging", this.getDummy()),
            s = e(
              ZJS.Templater.render("common/report/pager.ejs", {
                page_limit: o,
                page_count: Math.ceil(this._total / this._step),
                showAll: this._needshowall,
              })
            ),
            n = e("td:first", s);
          n.attr("colspan", this._getColumnCount()),
            i.empty().append(s),
            this._hide_per_page &&
              (e(".line-per-page", i).hide(),
              e(".pageselect", i).css("marginRight", 0),
              e(".pagecount1", i).css("marginRight", 0)),
            e(".line-per-page a[limit=" + this._step + "]", i).addClass(
              "currentpage"
            ),
            e(".line-per-page a", i).click(function (o) {
              o.preventDefault(),
                e(this).hasClass("currentpage") ||
                  (e(".currentpage", i).removeClass("currentpage"),
                  e(this).addClass("currentpage"),
                  t._gotoPage(1, e(this).attr("limit")));
            }),
            e(".pagerbutton-container button", i).click(function () {
              e(this).prop("disabled") ||
                t._gotoPage(
                  e(this).hasClass("next")
                    ? parseInt(t._page) + 1
                    : parseInt(t._page) - 1
                );
            }),
            e("select[name=page]", i).change(function () {
              t._gotoPage(e(this).val());
            }),
            this._updatePager();
        },
        _updatePager: function () {
          var t = e("tbody.rich-paging", this.getDummy());
          e('select[name="page"]', t).val(this._page),
            e(".pagerbutton-container button.back", t).prop(
              "disabled",
              this._page <= 1
            ),
            e(".pagerbutton-container button.next", t).prop(
              "disabled",
              this._page >= Math.ceil(this._total / this._step)
            );
          var o = Math.ceil(this._total / this._step);
          if (
            (1 >= o
              ? this._total > 0
                ? (e(t).show(),
                  e(".pagecount1", t).show(),
                  e(".pagerbutton-container", t).hide(),
                  e(".pageselect", t).hide())
                : e(t).hide()
              : (e(t).show(),
                e(".pagecount1", t).hide(),
                e(".pagerbutton-container", t).show(),
                e(".pageselect", t).show()),
            o != e(".count_pages", t).text())
          ) {
            e(".count_pages", t).text(o);
            for (var i = [], s = 1; o >= s; s++)
              i.push('<option value="' + s + '">' + s + "</option>");
            e('select[name="page"]', t)[0].innerHTML = i.join("");
          }
        },
        _gotoPage: function (t, o) {
          if (this._page == t && (!o || parseInt(this._step) == parseInt(o)))
            return !1;
          this._page = t;
          var i = {};
          (i[this._names.page] = this._page),
            o &&
              (("all" == o && this._needshowall) || !isNaN(o)) &&
              ("all" == o
                ? ((this._step = this._total), (i[this._names.step] = "all"))
                : ((this._step = parseInt(o)),
                  (i[this._names.step] = parseInt(o)))),
            this.query(
              i,
              function () {
                e("html, body").animate(
                  { scrollTop: e(this.getDummy()).offset().top },
                  250
                );
              }.bind(this)
            ),
            this._updatePager();
        },
        _sortToggle: function (t) {
          var o = e(t.target || t.srcElement),
            i = o.attr("class");
          (this._sort = i
            .replace(" sort-up", "")
            .replace(" sort-down", "")
            .replace("field_", "")),
            (this._order = o.hasClass("sort-down") ? "asc" : "desc");
          var s = {};
          (s[this._names.sort] = this._sort),
            (s[this._names.order] = this._order),
            this.query(s);
        },
        _updateState: function (e, t) {
          if (!this.isRendered()) return e(), !1;
          (this._query = this._front.getRequest().getQueryString()),
            this._updateFromQuery(this._query);
          {
            var o,
              i,
              s = this;
            this._report == this._last_state.report &&
              this._order == this._last_state.order &&
              this._sort == this._last_state.sort &&
              this._isParamsEquals(this._hidden, this._last_state.hidden) &&
              this._isParamsEquals(this._params, this._last_state.params);
          }
          (o = t ? t - 1 : (this._page - 1) * this._step), (i = this._step);
          var n = LocalJS.loader.showLoader();
          this.request(o, i, function (t) {
            s._rebuild(t), s._updatePager(), LocalJS.loader.hideLoader(n), e();
          });
        },
        _updateFromQuery: function (t) {
          var o = this,
            i = this._front.getRequest().parseQueryString(t);
          (this._sort = this._default_sort),
            (this._order = this._default_order),
            (this._params = this._copyParams(this._default_params)),
            e.each(i, function (e, t) {
              e == o._names.sort
                ? (o._sort = t)
                : e == o._names.order
                ? (o._order = t)
                : e == o._names.page
                ? (o._page = t)
                : e == o._names.step
                ? (t == this._defaultStep ||
                    25 == t ||
                    50 == t ||
                    100 == t ||
                    (this._needshowall && "all" == t)) &&
                  (o._step = this._needshowall && "all" == t ? this._total : t)
                : o._inKeys(e) && (o._params[e] = t);
            });
        },
        _setupKeys: function () {
          this._keys = [];
          for (
            var e = this._getFormElements(), t = {}, o = 0, i = e.length;
            i > o;
            o++
          )
            t[e[o].name] || (this._keys.push(e[o].name), (t[e[o].name] = !0));
        },
        _setupWatch: function () {
          var e = [].concat(this._keys);
          e.push(this._names.page),
            e.push(this._names.sort),
            e.push(this._names.order),
            e.push(this._names.step),
            this.watch("update", e, this._updateState, this);
        },
        _getFormElements: function () {
          for (
            var e = this._getElementsBySelector(
                "input, select",
                this.getDummy()
              ),
              t = 0;
            t < this._forms.length;
            t++
          )
            e = e.concat(
              this._getElementsBySelector("input, select", this._forms[t])
            );
          return e;
        },
        _getQueryFromForms: function () {
          var t = [];
          t[t.length] = e("input, select", this.getDummy()).serialize();
          for (var o = 0; o < this._forms.length; o++)
            t[t.length] = e("input, select", this._forms[o]).serialize();
          (this._page = 1), t.slice(2, 1);
          var i = t.join("&");
          return (i = i.replace(/page=(\d+)/, "page=1"));
        },
        _getElementsBySelector: function (t, o) {
          var i = e(t, o).serializeArray();
          return (
            e(t, o).each(function () {
              if (/checkbox/i.test(this.type)) {
                var t = e(this).val(),
                  o = this.name;
                null !== t &&
                  (e.isArray(t)
                    ? (i = i.concat(
                        e.map(t, function (e) {
                          return { name: o, value: e };
                        })
                      ))
                    : i.push({ name: o, value: t }));
              }
            }),
            i
          );
        },
        _getColumnByField: function (t) {
          return e("td:has(b[class='field_" + t + "'])", this.getDummy());
        },
        _getAnchorByField: function (t) {
          return e("b[class='field_" + t + "']", this.getDummy());
        },
        _destroyBodyWidgets: function () {
          for (var e = 0, t = this._body_wigets.length; t > e; e++)
            this._body_wigets[e].destroy();
          this._body_wigets = [];
        },
        _inKeys: function (t) {
          var o = !1;
          return (
            e(this._keys).each(function (e, i) {
              return i == t ? ((o = !0), !1) : void 0;
            }),
            o
          );
        },
        _isParamsEquals: function (t, o, i) {
          var s = !0;
          return (
            e.each(o, function (e, o) {
              return (
                t[e] == i && (s = !1),
                (s = s && t[e].toString() == o.toString())
              );
            }),
            s
              ? (e.each(t, function (e, t) {
                  return (
                    o[e] == i && (s = !1),
                    (s = s && o[e].toString() == t.toString())
                  );
                }),
                s)
              : !1
          );
        },
        _getColumnCount: function () {
          var t = 0;
          return (
            e("thead tr:first td", this.getDummy()).each(function () {
              var e = this.getAttribute("colspan");
              t += e > 1 ? parseInt(e) : 1;
            }),
            t
          );
        },
        _copyParams: function (e) {
          var t = {};
          for (var o in e) t[o] = e[o];
          return t;
        },
        __dummy: null,
      }),
      ZJS.Utils.inherit(LocalJS.Module.Report, ZJS.Front.Page);
  })(jQuery),
  Array.prototype.indexOf ||
    (Array.prototype.indexOf = function (e) {
      return $.inArray(e, this);
    }),
  "undefined" == typeof LocalJS && (LocalJS = {}),
  "undefined" == typeof LocalJS.Widget && (LocalJS.Widget = {}),
  (function () {
    (LocalJS.Widget.Window = function (e, t) {
      (this._window = null),
        (this._title = t),
        LocalJS.Widget.Abstract.call(this, e);
    }),
      (LocalJS.Widget.Window.prototype = {
        init: function () {
          (this._window = new ZJS.Widget.Window("", this._title)),
            this._options.width && (this._window.width = this._options.width);
        },
        destroy: function () {
          this._window && this._window.destroy(), (this._window = null);
        },
        addEventListener: function (e, t, o, i) {
          this._window.addEventListener(e, t, o, i);
        },
        setTitle: function (e) {
          (this._title = e), this._window.setTitle(e);
        },
        getDummy: function () {
          return this._window.root;
        },
        open: function () {
          this._window.open();
        },
        close: function () {
          this._window.close();
        },
        update: function (e) {
          this._window.update(e);
        },
        centralize: function () {
          this._window.centralize();
        },
        __dummy: null,
      }),
      ZJS.Utils.inherit(LocalJS.Widget.Window, LocalJS.Widget.Abstract);
  })(jQuery),
  "undefined" == typeof LocalJS && (LocalJS = {}),
  "undefined" == typeof LocalJS.Widget && (LocalJS.Widget = {}),
  (function (e) {
    (LocalJS.Widget.ButtonDropDown = function (e) {
      (this.root = e), LocalJS.Widget.Abstract.call(this);
    }),
      (LocalJS.Widget.ButtonDropDown.prototype = {
        init: function () {
          e(this.root).on(
            "mouseup",
            function () {
              this._show();
            }.bind(this)
          ),
            (this._params = []),
            (this._items = []);
        },
        setParams: function () {
          this._params = arguments;
        },
        addAction: function (e, t, o) {
          this._items.push([e, t, o]);
        },
        _show: function () {
          var t = e("#drop_box");
          0 == t.length &&
            ((t = e('<div id="drop_box" class="drop_box"></div>')),
            e("body").append(t)),
            e(t).empty(),
            e.each(
              this._items,
              function (o, i) {
                var s = e("<div>" + i[0] + "</div>");
                e(t).append(s),
                  e(s).click(
                    function () {
                      this._emit(i[1], i[2]);
                    }.bind(this)
                  );
              }.bind(this)
            );
          var o = e(this.root).offset();
          e(t)
            .show()
            .css({ top: o.top + 31, left: o.left + 38 - e(t).width() })
            .on("mouseover", this._rmEvents.bind(this))
            .on("mouseout", this._addEvents.bind(this)),
            e(this.root)
              .on("mouseover", this._rmEvents.bind(this))
              .on("mouseout", this._addEvents.bind(this));
        },
        _hide: function () {
          e("#drop_box").hide(),
            this._rmEvents(),
            e(this.root).off("mouseover").off("mouseout");
        },
        _addEvents: function () {
          e("body").on(
            "mousedown",
            function () {
              this._hide();
            }.bind(this)
          );
        },
        _rmEvents: function () {
          e("body").off("mousedown");
        },
        _emit: function (e, t) {
          var o = this._cloneArguments(this._params);
          this._hide(), e.apply(t, o);
        },
        _cloneArguments: function (t) {
          var o = [];
          return (
            e.each(
              t[0],
              function (e, t) {
                o.push(t);
              }.bind(this)
            ),
            o
          );
        },
        destroy: function () {},
        getDummy: function () {
          return this.root;
        },
        __dummy: null,
      }),
      ZJS.Utils.inherit(LocalJS.Widget.ButtonDropDown, LocalJS.Widget.Abstract);
  })(jQuery),
  "undefined" == typeof LocalJS && (LocalJS = {}),
  "undefined" == typeof LocalJS.Widget && (LocalJS.Widget = {}),
  (function (e) {
    (LocalJS.Widget.CrossInput = function (e) {
      ZJS.Widget.Abstract.call(this), (this.input = e), (this.cross = null);
      var t = this;
      (this.__keyUp = function (e) {
        t._keyUp(e);
      }),
        this._build(),
        this._setupEvents(),
        this._setupState();
    }),
      (LocalJS.Widget.CrossInput.EVENT_SUBMIT = "submit"),
      (LocalJS.Widget.CrossInput.EVENT_CLEAR = "clear"),
      (LocalJS.Widget.CrossInput.EVENT_KEYUP = "keyup"),
      (LocalJS.Widget.CrossInput.prototype = {
        EVENT_SUBMIT: LocalJS.Widget.CrossInput.EVENT_SUBMIT,
        EVENT_CLEAR: LocalJS.Widget.CrossInput.EVENT_CLEAR,
        EVENT_KEYUP: LocalJS.Widget.CrossInput.EVENT_KEYUP,
        setValue: function (e) {
          (this.input.value = e), this._toggleCross();
        },
        getValue: function () {
          return this.input.value;
        },
        getName: function () {
          return this.input.name;
        },
        focus: function () {
          this.input.focus();
        },
        destroy: function () {
          e(this.input).unbind("keydown", this.__keyup);
          var t = this.cross.parentNode;
          t.removeChild(this.cross),
            t.parentNode.appendChild(this.input),
            t.parentNode.removeChild(t);
        },
        _build: function () {
          e(this.input).wrap('<div class="input-container" />'),
            e(this.input).after(
              '<i style="display: inline;" class="clear-ico"></i>'
            ),
            (this.cross = e(this.input).next("i").get(0));
        },
        _setupEvents: function () {
          e(this.input).bind("keydown", this.__keyUp),
            e(this.cross).bind("click", this._clear.bind(this));
        },
        _setupState: function () {
          this._toggleCross();
        },
        _keyUp: function (e) {
          return (
            this._toggleCross(e),
            13 == (e.keyCode || e.which)
              ? (this.emit(this.EVENT_SUBMIT, [this]), e.preventDefault(), !1)
              : void this.emit(this.EVENT_KEYUP)
          );
        },
        _clear: function () {
          (this.input.value = ""),
            this.input.focus(),
            this._toggleCross(),
            this.emit(this.EVENT_CLEAR, [this]);
        },
        _toggleCross: function (t) {
          var o = e(this.input).val().length;
          t &&
            (8 == t.keyCode || t.keyCode >= 32) &&
            (o = 8 == t.keyCode ? o - 1 : o + 1),
            1 > o ? e(this.cross).hide() : e(this.cross).show();
        },
        __dummy: null,
      }),
      ZJS.Utils.inherit(LocalJS.Widget.CrossInput, ZJS.Widget.Abstract);
  })(jQuery),
  "undefined" == typeof LocalJS && (LocalJS = {}),
  "undefined" == typeof LocalJS.Widget && (LocalJS.Widget = {}),
  (function (e) {
    (LocalJS.Widget.Changer = function (t, o, i) {
      (this._elem = t),
        (this._selected = o ? o : e(t).val()),
        (this._hide_selected = i ? !0 : !1),
        LocalJS.Widget.Abstract.call(this);
    }),
      (LocalJS.Widget.Changer.prototype = {
        EVENT_CHANGE: "change",
        init: function () {
          var t = this;
          (this._interval = null), (this._elements = {});
          var o =
            0 == e("option", this._elem).length &&
            e("span", this._elem).length > 0
              ? "span"
              : "option";
          (this.__event = function () {
            t._hide();
          }),
            (this._changer = e('<div class="changer_box"></div>')),
            e("body").append(this._changer);
          var i = !1;
          (this._renderText = ""),
            e.each(e(o, this._elem), function () {
              if ("span" == o && !e(this).data("value")) return !0;
              var s = "option" == o ? e(this).val() : e(this).data("value");
              i || (i = s), (t._elements[s] = e(this).html());
            }),
            this._elements[this._selected] || (this._selected = i),
            (this._container = e(
              '<span class="changer_title radius5 gradientBeige b" style="line-height: 14px;">' +
                this._elements[this._selected] +
                ' <span class="arrow">&nbsp;</span></span>'
            )),
            (this._input = e(
              '<input type="hidden" name="' +
                ("option" == o
                  ? e(this._elem).attr("name")
                  : e(this._elem).data("name")) +
                '" value="' +
                this._selected +
                '" />'
            )),
            (this._changer_title = e('<div class="changer_box_title"></div>')),
            e("body").append(this._changer_title),
            e(this._elem).before(this._container).before(this._input).remove(),
            e(this._container)
              .hover(
                function () {
                  e(this)
                    .addClass("title_hover")
                    .find("span")
                    .css("backgroundPosition", "center right");
                },
                function () {
                  e(this)
                    .removeClass("title_hover")
                    .find("span")
                    .css("backgroundPosition", "center left");
                }
              )
              .css("color", "#542C0F"),
            e(this._container).on(
              "mousedown",
              function () {
                this._rmEvents(),
                  setTimeout(this._addEvents.bind(this), 10),
                  this._show(),
                  e(this._container)
                    .removeClass("title_hover")
                    .find("span")
                    .css("backgroundPosition", "center left");
              }.bind(this)
            );
        },
        _rebuild: function () {},
        _addEvents: function () {
          e("body").on("mousedown", this.__event);
        },
        _rmEvents: function () {
          e("body").off("mousedown", this.__event);
        },
        getValue: function () {
          return this._selected;
        },
        setValue: function (e) {
          this._selected != e && this._select(e, !0);
        },
        setIndex: function (t) {
          var o = 0,
            i = 0;
          e.each(
            this._elements,
            function (e) {
              return o == t ? ((i = e), !1) : void o++;
            }.bind(this)
          ),
            this._select(i, !0);
        },
        setItems: function (t) {
          (this._elements = {}),
            e.each(
              t,
              function (e, t) {
                this._elements[e] = t;
              }.bind(this)
            );
        },
        _select: function (t, o) {
          e(".selected", this._changer).removeClass("selected"),
            e(".changer_item_" + t, this._changer).addClass("selected"),
            e(this._container).html(
              this._elements[t] + ' <span class="arrow">&nbsp;</span>'
            ),
            (this._selected = t),
            e(this._input).val(t),
            o || (this._hide(), this.emit(this.EVENT_CHANGE, [t]));
        },
        _show: function () {
          var t = e(this._container).offset(),
            o = { left: t.left, top: t.top + 18 };
          e(this._changer).empty(),
            e.each(
              this._elements,
              function (t, o) {
                if (!this._hide_selected || this._selected != t) {
                  var i = e(
                    '<div class="changer_item_' + t + '">' + o + "</div>"
                  );
                  e(this._changer).append(i);
                }
                e(i).click(
                  function () {
                    this._select(t);
                  }.bind(this)
                );
              }.bind(this)
            ),
            this._select(this._selected, !0),
            e(this._changer)
              .css(o)
              .css({ minWidth: 150, top: t.top + 20 })
              .show()
              .on("mouseover", this._rmEvents.bind(this))
              .on("mouseout", this._addEvents.bind(this)),
            (o.top -= 18),
            e(this._changer_title)
              .html(e(this._container).html())
              .css(o)
              .width(e(this._container).width())
              .show(),
            e(this._changer).width() < e(this._changer_title).width() + 30 &&
              e(this._changer).css(
                "minWidth",
                e(this._changer_title).width() + 30
              );
        },
        _hide: function () {
          this._rmEvents(),
            e(this._changer_title).hide(),
            e(this._changer).hide();
        },
        destroy: function () {
          e(this._changer).remove(), e(this._changer_title).remove();
        },
        getDummy: function () {
          return this._changer.root;
        },
        __dummy: null,
      }),
      ZJS.Utils.inherit(LocalJS.Widget.Changer, LocalJS.Widget.Abstract);
  })(jQuery);
var ZeroClipboard = {
  version: "1.0.7",
  clients: {},
  moviePath: "/js/zeroclipboard/ZeroClipboard.swf",
  nextId: 1,
  $: function (e) {
    return (
      "string" == typeof e && (e = document.getElementById(e)),
      e.addClass ||
        ((e.hide = function () {
          this.style.display = "none";
        }),
        (e.show = function () {
          this.style.display = "";
        }),
        (e.addClass = function (e) {
          this.removeClass(e), (this.className += " " + e);
        }),
        (e.removeClass = function (e) {
          for (
            var t = this.className.split(/\s+/), o = -1, i = 0;
            i < t.length;
            i++
          )
            t[i] == e && ((o = i), (i = t.length));
          return (
            o > -1 && (t.splice(o, 1), (this.className = t.join(" "))), this
          );
        }),
        (e.hasClass = function (e) {
          return !!this.className.match(new RegExp("\\s*" + e + "\\s*"));
        })),
      e
    );
  },
  setMoviePath: function (e) {
    this.moviePath = e;
  },
  dispatch: function (e, t, o) {
    var i = this.clients[e];
    i && i.receiveEvent(t, o);
  },
  register: function (e, t) {
    this.clients[e] = t;
  },
  getDOMObjectPosition: function (e, t) {
    for (
      var o = {
        left: 0,
        top: 0,
        width: e.width ? e.width : e.offsetWidth,
        height: e.height ? e.height : e.offsetHeight,
      };
      e && e != t;

    )
      (o.left += e.offsetLeft), (o.top += e.offsetTop), (e = e.offsetParent);
    return o;
  },
  Client: function (e) {
    (this.handlers = {}),
      (this.id = ZeroClipboard.nextId++),
      (this.movieId = "ZeroClipboardMovie_" + this.id),
      ZeroClipboard.register(this.id, this),
      e && this.glue(e);
  },
};
ZeroClipboard.Client.prototype = {
  id: 0,
  ready: !1,
  movie: null,
  clipText: "",
  handCursorEnabled: !0,
  cssEffects: !0,
  handlers: null,
  glue: function (e, t, o) {
    this.domElement = ZeroClipboard.$(e);
    var i = 99;
    this.domElement.style.zIndex &&
      (i = parseInt(this.domElement.style.zIndex, 10) + 1),
      "string" == typeof t
        ? (t = ZeroClipboard.$(t))
        : "undefined" == typeof t &&
          (t = document.getElementsByTagName("body")[0]);
    var s = ZeroClipboard.getDOMObjectPosition(this.domElement, t);
    this.div = document.createElement("div");
    var n = this.div.style;
    if (
      ((n.position = "absolute"),
      (n.left = "" + s.left + "px"),
      (n.top = "" + s.top + "px"),
      (n.width = "" + s.width + "px"),
      (n.height = "" + s.height + "px"),
      (n.zIndex = i),
      "object" == typeof o)
    )
      for (addedStyle in o) n[addedStyle] = o[addedStyle];
    t.appendChild(this.div),
      (this.div.innerHTML = this.getHTML(s.width, s.height));
  },
  getHTML: function (e, t) {
    var o = "",
      i = "id=" + this.id + "&width=" + e + "&height=" + t;
    if (navigator.userAgent.match(/MSIE/)) {
      var s = location.href.match(/^https/i) ? "https://" : "http://";
      o +=
        '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="' +
        s +
        'download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" width="' +
        e +
        '" height="' +
        t +
        '" id="' +
        this.movieId +
        '" align="middle"><param name="allowScriptAccess" value="always" /><param name="allowFullScreen" value="false" /><param name="movie" value="' +
        ZeroClipboard.moviePath +
        '" /><param name="loop" value="false" /><param name="menu" value="false" /><param name="quality" value="best" /><param name="bgcolor" value="#ffffff" /><param name="flashvars" value="' +
        i +
        '"/><param name="wmode" value="transparent"/></object>';
    } else
      o +=
        '<embed id="' +
        this.movieId +
        '" src="' +
        ZeroClipboard.moviePath +
        '" loop="false" menu="false" quality="best" bgcolor="#ffffff" width="' +
        e +
        '" height="' +
        t +
        '" name="' +
        this.movieId +
        '" align="middle" allowScriptAccess="always" allowFullScreen="false" type="application/x-shockwave-flash" pluginspage="//www.macromedia.com/go/getflashplayer" flashvars="' +
        i +
        '" wmode="transparent" />';
    return o;
  },
  hide: function () {
    this.div && (this.div.style.left = "-2000px");
  },
  show: function () {
    this.reposition();
  },
  destroy: function () {
    if (this.domElement && this.div) {
      this.hide(), (this.div.innerHTML = "");
      var e = document.getElementsByTagName("body")[0];
      try {
        e.removeChild(this.div);
      } catch (t) {}
      (this.domElement = null), (this.div = null);
    }
  },
  reposition: function (e) {
    if (
      (e &&
        ((this.domElement = ZeroClipboard.$(e)),
        this.domElement || this.hide()),
      this.domElement && this.div)
    ) {
      var t = ZeroClipboard.getDOMObjectPosition(this.domElement),
        o = this.div.style;
      (o.left = "" + t.left + "px"), (o.top = "" + t.top + "px");
    }
  },
  setText: function (e) {
    (this.clipText = e), this.ready && this.movie.setText(e);
  },
  addEventListener: function (e, t) {
    (e = e.toString().toLowerCase().replace(/^on/, "")),
      this.handlers[e] || (this.handlers[e] = []),
      this.handlers[e].push(t);
  },
  setHandCursor: function (e) {
    (this.handCursorEnabled = e), this.ready && this.movie.setHandCursor(e);
  },
  setCSSEffects: function (e) {
    this.cssEffects = !!e;
  },
  receiveEvent: function (e, t) {
    switch ((e = e.toString().toLowerCase().replace(/^on/, ""))) {
      case "load":
        if (
          ((this.movie = document.getElementById(this.movieId)), !this.movie)
        ) {
          var o = this;
          return void setTimeout(function () {
            o.receiveEvent("load", null);
          }, 1);
        }
        if (
          !this.ready &&
          navigator.userAgent.match(/Firefox/) &&
          navigator.userAgent.match(/Windows/)
        ) {
          var o = this;
          return (
            setTimeout(function () {
              o.receiveEvent("load", null);
            }, 100),
            void (this.ready = !0)
          );
        }
        (this.ready = !0),
          this.movie.setText(this.clipText),
          this.movie.setHandCursor(this.handCursorEnabled);
        break;
      case "mouseover":
        this.domElement &&
          this.cssEffects &&
          (this.domElement.addClass("hover"),
          this.recoverActive && this.domElement.addClass("active"));
        break;
      case "mouseout":
        this.domElement &&
          this.cssEffects &&
          ((this.recoverActive = !1),
          this.domElement.hasClass("active") &&
            (this.domElement.removeClass("active"), (this.recoverActive = !0)),
          this.domElement.removeClass("hover"));
        break;
      case "mousedown":
        this.domElement &&
          this.cssEffects &&
          this.domElement.addClass("active");
        break;
      case "mouseup":
        this.domElement &&
          this.cssEffects &&
          (this.domElement.removeClass("active"), (this.recoverActive = !1));
    }
    if (this.handlers[e])
      for (var i = 0, s = this.handlers[e].length; s > i; i++) {
        var n = this.handlers[e][i];
        "function" == typeof n
          ? n(this, t)
          : "object" == typeof n && 2 == n.length
          ? n[0][n[1]](this, t)
          : "string" == typeof n && window[n](this, t);
      }
  },
};
