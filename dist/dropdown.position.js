/**
 * bootstrap: v3.14.1
 * version: 1.0.32
 */
!(function (t) {
  "use strict";
  var e = ".dropdown-backdrop",
    n = '[data-toggle="dropdown"]',
    o = function (e) {
      t(e).on("click.bs.dropdown", this.toggle);
    };

  function r(e) {
    var n = e.attr("data-target");
    n ||
      (n =
        (n = e.attr("href")) &&
        /#[A-Za-z]/.test(n) &&
        n.replace(/.*(?=#[^\s]*$)/, ""));
    var o = "#" !== n ? t(document).find(n) : null;
    return o && o.length ? o : e.parent();
  }

  function a(o) {
    (o && 3 === o.which) ||
      (t(e).remove(),
      t(n).each(function () {
        var e = t(this),
          n = r(e),
          a = {
            relatedTarget: this,
          };
        n.hasClass("open") &&
          ((o &&
            "click" == o.type &&
            /input|textarea/i.test(o.target.tagName) &&
            t.contains(n[0], o.target)) ||
            (n.trigger((o = t.Event("hide.bs.dropdown", a))),
            o.isDefaultPrevented() ||
              (e.attr("aria-expanded", "false"),
              n
                .removeClass("open")
                .trigger(t.Event("hidden.bs.dropdown", a)))));
      }));
  }

  function menuPosition(e) {
    var ele = t(e),
      $dropdown = ele.parent(),
      $dropdownMenu = ele.siblings(".dropdown-menu"),
      $closestdropdownMenu = ele.closest(".dropdown-menu"),
      offset = $dropdown.offset(),
      eleWidth = $dropdown.outerWidth(),
      menuWidth = $dropdownMenu.outerWidth(),
      bodyWidth = t(window).outerWidth(),
      pl = 0,
      pr = 0;
    menuWidth = menuWidth > bodyWidth ? bodyWidth : menuWidth;
    if ($closestdropdownMenu) {
      pl = $closestdropdownMenu.css("padding-left");
      pr = $closestdropdownMenu.css("padding-right");
    }
    if (menuWidth && bodyWidth > 768) {
      var css = {},
        left = offset ? offset.left : 0,
        rightSpace = bodyWidth - left;
      if ($dropdown.is(".dropup-center, .dropdown-center")) {
        css = {
          "max-width": bodyWidth + "px",
          right: "auto",
        };
        if ($dropdown.attr("full-width") === "true") {
          css.width = bodyWidth + "px";
          menuWidth = bodyWidth;
        }
        var moveLeft = (menuWidth - eleWidth) / 2;
        moveLeft = moveLeft > left ? left : moveLeft;
        css.left = "-" + moveLeft + "px";
      } else if ($dropdown.hasClass("dropstart")) {
        var maxWidth = (left < menuWidth ? rightSpace - eleWidth : left) - 10;
        if (left - 5 < menuWidth) {
          css = {
            "max-width": maxWidth + "px",
            left: "calc(100% + 5px)",
            right: "auto",
            margin: "0 0 0 " + pr,
          };
        } else {
          css = {
            "max-width": maxWidth + "px",
            right: "calc(100% + 5px)",
            left: "auto",
            margin: "0 " + pl + " 0 0",
          };
        }
      } else if ($dropdown.hasClass("dropend")) {
        if ($closestdropdownMenu.length) {
          var width = $closestdropdownMenu.outerWidth();
          rightSpace = rightSpace - width;
        } else {
          rightSpace = rightSpace - eleWidth;
        }
        var maxWidth = (rightSpace < menuWidth ? left : rightSpace) - 10;
        if (rightSpace - 5 < menuWidth) {
          css = {
            "max-width": maxWidth + "px",
            right: "calc(100% + 5px)",
            left: "auto",
            margin: "0 " + pl + " 0 0",
          };
        } else {
          css = {
            "max-width": maxWidth + "px",
            left: "calc(100% + 5px)",
            right: "auto",
            margin: "0 0 0 " + pr,
          };
        }
      } else {
        if (rightSpace < menuWidth) {
          css = {
            "max-width": bodyWidth + "px",
            left: "-" + (menuWidth - rightSpace) + "px",
            right: "auto",
          };
        }
      }
      $dropdownMenu.css(css);
    }
  }
  (o.VERSION = "3.4.1"),
    (o.prototype.toggle = function (e) {
      var n = t(this);
      if (!n.is(".disabled, :disabled")) {
        var o = r(n),
          d = o.hasClass("open");
        menuPosition(n);
        if ((a(), !d)) {
          "ontouchstart" in document.documentElement &&
            !o.closest(".navbar-nav").length &&
            t(document.createElement("div"))
              .addClass("dropdown-backdrop")
              .insertAfter(t(this))
              .on("click", a);
          var i = {
            relatedTarget: this,
          };
          if (
            (o.trigger((e = t.Event("show.bs.dropdown", i))),
            e.isDefaultPrevented())
          )
            return;
          n.trigger("focus").attr("aria-expanded", "true"),
            o.toggleClass("open").trigger(t.Event("shown.bs.dropdown", i));
        }
        return !1;
      }
    }),
    (o.prototype.keydown = function (e) {
      if (
        /(38|40|27|32)/.test(e.which) &&
        !/input|textarea/i.test(e.target.tagName)
      ) {
        var o = t(this);
        if (
          (e.preventDefault(),
          e.stopPropagation(),
          !o.is(".disabled, :disabled"))
        ) {
          var a = r(o),
            d = a.hasClass("open");
          if ((!d && 27 != e.which) || (d && 27 == e.which))
            return (
              27 == e.which && a.find(n).trigger("focus"), o.trigger("click")
            );
          var i = a.find(".dropdown-menu li:not(.disabled):visible a");
          if (i.length) {
            var s = i.index(e.target);
            38 == e.which && s > 0 && s--,
              40 == e.which && s < i.length - 1 && s++,
              ~s || (s = 0),
              i.eq(s).trigger("focus");
          }
        }
      }
    });
  var d = t.fn.dropdown;
  (t.fn.dropdown = function (e) {
    return this.each(function () {
      var n = t(this),
        r = n.data("bs.dropdown");
      r || n.data("bs.dropdown", (r = new o(this))),
        "string" == typeof e && r[e].call(n);
    });
  }),
    (t.fn.dropdown.Constructor = o),
    (t.fn.dropdown.noConflict = function () {
      return (t.fn.dropdown = d), this;
    }),
    t(document)
      .on("click.bs.dropdown.data-api", a)
      .on("click.bs.dropdown.data-api", n, o.prototype.toggle)
      .on("keydown.bs.dropdown.data-api", n, o.prototype.keydown)
      .on("keydown.bs.dropdown.data-api", ".dropdown-menu", o.prototype.keydown)
      .on(
        "click.bs.dropdown.data-api",
        `.dropdown form, .dropdown[data-auto-close='outside'] .dropdown-menu, .dropdown[data-auto-close='false'] .dropdown-menu,.dropdown[data-auto-close='outside'] ${n}`,
        function (e) {
          e.stopPropagation();
          var $ele = $(e.currentTarget);
          if ($ele.is(n)) {
            var $parent = $ele.parent(),
              $dropdown = $parent.parents().closest(".dropdown");
            if ($dropdown.length) {
              $dropdown.addClass("open");
            }
          }
        }
      )
      .on("mouseover.bs.dropdown.data-api", ".dropdown", (e) => {
        e.currentTarget.childNodes.forEach((ele) => {
          if ($(ele.currentTarget).is(n)) {
            menuPosition(ele);
          }
        });
      }),
    t(window).on("resize", () => {
      $(".dropdown.open").removeClass("open");
      $(".dropdown-menu[style]").removeAttr("style");
    });
})(jQuery);

