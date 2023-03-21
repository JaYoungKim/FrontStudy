!function ($) {
  window.app || (window.app = {}),
    $((function () {
      window.app.stickySideNav.init()
    }
    )),
    window.addEventListener("ajaxLoadEnd", (function (event) {
      event.detail && "mad" == event.detail.going && window.app.stickySideNav.init()
    }
    )),
    window.app.stickySideNav = {
      isScrolling: !1,
      stickyNavPos: 0,
      stickyNavWidth: 0,
      init() {
        $(window).off("scroll.stickyNav"),
          document.removeEventListener("startScrollLocked", this.lockScroll),
          document.removeEventListener("endScrollLocked", this.endLockScroll),
          document.removeEventListener("endUnlockScroll", this.endUnlockScroll),
          this.stickySideNav(),
          window.addEventListener("startScrollLocked", this.startLockScroll),
          window.addEventListener("endScrollLocked", this.endLockScroll),
          window.addEventListener("endUnlockScroll", this.endUnlockScroll)
      },
      startLockScroll() {
        const sideNav = $(".sticky-side-nav ul");
        sideNav.length && (self.stickyNavPos = sideNav.position().top,
          self.stickyNavWidth = sideNav.width())
      },
      endLockScroll() {
        $(".sticky-side-nav ul").css({
          top: self.stickyNavPos,
          width: self.stickyNavWidth
        })
      },
      endUnlockScroll() {
        $(".sticky-side-nav ul").css({
          top: "",
          width: ""
        })
      },
      stickySideNav() {
        $(".sticky-side-nav li").length > 0 && $(".sticky-side-nav li").on("click", (el => {
          const itemId = $(el.currentTarget).data("id");
          this.setStickyActive(itemId),
            this.isScrolling = !0;
          const scrollOffset = -1 * $(".sticky-side-nav").css("margin-top").replace("px", "") - 140;
          $(`.sticky-item[data-id=${itemId}]`).velocity("scroll", {
            offset: scrollOffset,
            complete: () => {
              this.isScrolling = !1
            }
            ,
            duration: 500
          })
        }
        )),
          $(window).on("scroll.stickyNav", (() => {
            if (!this.isScrolling && $(".sticky-item").length) {
              let activeStickyItem = $(".sticky-item").first();
              $(".sticky-item").each((function () {
                $(this).offset().top - $(window).scrollTop() <= 140 && (activeStickyItem = $(this))
              }
              )),
                void 0 !== activeStickyItem.data("id") && this.setStickyActive(activeStickyItem.data("id"))
            }
          }
          ))
      },
      setStickyActive(activeId) {
        this.isScrolling || ($(".sticky-side-nav li").removeClass("active"),
          $(`.sticky-side-nav li[data-id=${activeId}]`).addClass("active"))
      }
    }
}(jQuery);
