!function ($) {
    const hovers = "a:not(.no-hover), .gform_button, button, .do-hover, .filter .label, .filter .dropdown li, input[type=text], input[type=email]";
    function findWidest() {
        let maxWidth = 0;
        if ($(".remove-breaks").length) {
            let widest;
            $(".remove-breaks p").each((function () {
                const $element = $(this);
                $element.width() > maxWidth && (maxWidth = $element.width(),
                    widest = $element)
            }
            )),
                widest && widest.addClass("widest")
        }
    }
    function getLinesOfTitle($el) {
        let texts = [];
        return $el.find(".line-inner").each(((i, e) => texts.push($(e).text()))),
            texts.join("\n")
    }
    function removeBreaks(wasAjax) {
        $(".remove-breaks, .sld-down-heading, .carousel-sld-heading, .reveal-on-screen, .reveal-in-footer").each(((indx, el) => {
            const $header = $(el)
                , isInitial = !$header.find(".line-outer").length;
            let startLines, isRevealed = !1;
            startLines = isInitial ? "" : getLinesOfTitle($header);
            let $wc, innerTexts = [], html = $header.data("orig-html");
            html ? (isRevealed = $header.find(".line-inner.reveal").length,
                $wc = $header.clone().html(html)) : ($wc = $header,
                    $header.data("orig-html", $header.html()));
            let otherHeader = $header.clone();
            if (otherHeader.css("visibility", "none"),
                otherHeader.css({
                    visibility: "none",
                    position: "fixed",
                    top: "-100vh",
                    left: "-100vw"
                }),
                $("body").append(otherHeader),
                otherHeader.width($header.width()),
                $header.hasClass("remove-breaks")) {
                let didSplit = !1;
                $wc.find("p").each(((i, e) => {
                    otherHeader.text($(e).text());
                    otherHeader.height() >= 1.8 * parseInt($header.css("line-height").replace("px", "")) && (didSplit = !0)
                }
                )),
                    didSplit ? innerTexts.push($header.text()) : $wc.find("p").each(((i, e) => {
                        innerTexts.push($(e).text().trim())
                    }
                    ))
            } else {
                const withoutStartOrEndNewlines = $wc.text().replace(/^\s+|\s+$/g, "");
                innerTexts = withoutStartOrEndNewlines.split("/n").map((str => str.trim()))
            }
            let fullTexts = [];
            innerTexts.forEach((text => {
                let currentHeight = 0
                    , startIndex = null
                    , words = text.split(" ");
                const ranges = [];
                for (let i = 0; i < words.length; i++) {
                    let innerText = words.slice(0, i + 1).join(" ") + " ";
                    otherHeader.text(innerText);
                    let height = otherHeader.height();
                    height != currentHeight && ((startIndex || 0 === startIndex) && ranges.push([startIndex, i]),
                        startIndex = i,
                        currentHeight = height)
                }
                otherHeader.remove(),
                    ranges.push([startIndex, text.length]),
                    ranges.forEach((r => {
                        fullTexts.push(`<span class="line-outer"><span class="line-inner ${isRevealed ? "reveal" : ""}">${words.slice(r[0], r[1]).join(" ") + " "}</span></span>`)
                    }
                    ))
            }
            ));
            startLines !== getLinesOfTitle($(fullTexts.join(""))) && ($header.addClass("lines-changed"),
                $header.html(fullTexts.join("")))
        }
        )),
            wasAjax ? window.dispatchEvent(new CustomEvent("breaksRemovedAjax", {
                detail: {
                    going: "mad"
                }
            })) : window.dispatchEvent(new CustomEvent("breaksRemovedDefault", {
                detail: {
                    going: "mad"
                }
            }))
    }
    $((function () {
        findWidest(),
            removeBreaks(!1),
            function () {
                options = {
                    outerWidth: 30,
                    outerHeight: 30,
                    hoverItemMove: !1,
                    defaultCursor: !1
                };
                var newCursorDOM = document.createElement("div");
                newCursorDOM.setAttribute("id", "magicMouseCursor"),
                    document.body.appendChild(newCursorDOM);
                let cursorDOM = document.getElementById("magicMouseCursor")
                    , isTouch = !1;
                if ($("body").on("touchstart touchmove", (function (event) {
                    $("#magicPointer").hide(),
                        isTouch = !0
                }
                )),
                    $("body").on("mouseleave", (function (event) {
                        isTouch = !1,
                            $("#magicPointer").show()
                    }
                    )),
                    $("body").on("mouseenter", hovers, (function (event) {
                        isTouch || ($("#magicPointer").is(":hidden") && $("#magicPointer").show(),
                            circleMove_mouseEnterHover($(this)[0]),
                            $(this).addClass("is-hover"),
                            $(this).trigger("SaffronHoverStart"),
                            $(this).siblings(".post-info").length && $(this).siblings(".post-info").children(".title-link").addClass("is-hover"),
                            $(this).find(".link-arrow-icon").addClass("is-hover"),
                            $(this).hasClass("thinking-item-hover") && $(this).parents().siblings().children(".thinking-item-hover").addClass("is-hover"))
                    }
                    )),
                    $("body").on("mouseleave", hovers, (function () {
                        $(this)[0].style.transform = "translate3d(0,0,0)",
                            circleMove_mouseLeaveHover(),
                            $(this).removeClass("is-hover"),
                            $(this).trigger("SaffronHoverEnd"),
                            $(this).siblings(".post-info").length && $(this).siblings(".post-info").children(".title-link").removeClass("is-hover"),
                            $(this).find(".link-arrow-icon").removeClass("is-hover"),
                            $(this).hasClass("thinking-item-hover") && $(this).parents().siblings().children(".thinking-item-hover").removeClass("is-hover")
                    }
                    )),
                    !options.defaultCursor) {
                    document.body.style.cursor = "none";
                    var newPointerDOM = document.createElement("div");
                    newPointerDOM.setAttribute("id", "magicPointer"),
                        document.body.appendChild(newPointerDOM);
                    var pointerDOM = document.getElementById("magicPointer")
                }
                if (cursorDOM) {
                    cursorDOM.style.width = options.outerWidth + "px",
                        cursorDOM.style.height = options.outerHeight + "px";
                    var cursorOuterWidth = options.outerWidth
                        , cursorOuterHeight = options.outerHeight
                        , originalCursorWidth = options.outerWidth
                        , originalCursorHeight = options.outerHeight
                }
                var outerX = 0
                    , outerY = 0
                    , pointerX = 0
                    , pointerY = 0
                    , stopFlag = !1;
                window.addEventListener("mousemove", (function (event) {
                    $("#magicPointer").is(":hidden") && !isTouch && $("#magicPointer").show(),
                        pointerX = event.clientX,
                        pointerY = event.clientY,
                        setTimeout((() => {
                            stopFlag || (outerX = event.clientX - cursorOuterWidth / 2,
                                outerY = event.clientY - cursorOuterHeight / 2)
                        }
                        ), 50)
                }
                )),
                    circleMove_mouseEnterHover = item => {
                        if (stopFlag = !0,
                            cursorDOM) {
                            cursorDOM.style.transition = "width 0.3s, height 0.3s, border-radius 0.2s",
                                cursorDOM.classList.add("is-hover");
                            var elementPos = event.currentTarget.getBoundingClientRect();
                            outerX = elementPos.left,
                                outerY = elementPos.top,
                                cursorOuterWidth = elementPos.width,
                                cursorOuterHeight = elementPos.height
                        }
                        pointerDOM && ("email" != item.type && "text" != item.type || pointerDOM.classList.add("is-input"),
                            ($(item).hasClass("hamburger") && $(item).hasClass("open") || $(item).hasClass("modal-close-action") || $(item).hasClass("lightbox-close")) && pointerDOM.classList.add("is-close"),
                            pointerDOM.classList.add("is-hover"))
                    }
                    ;
                const circleMove_mouseLeaveHover = () => {
                    stopFlag = !1,
                        cursorDOM && (cursorOuterWidth = originalCursorWidth,
                            cursorOuterHeight = originalCursorHeight,
                            cursorDOM.style.transition = "width 0.3s, height 0.3s, border-radius 0.2s",
                            cursorDOM.classList.remove("cursor-square"),
                            cursorDOM.classList.remove("is-hover")),
                        pointerDOM && (pointerDOM.classList.remove("is-hover"),
                            pointerDOM.classList.remove("is-input"),
                            pointerDOM.classList.remove("is-close"))
                }
                    ;
                var bgStack = [];
                function initMagicMouseBg($container = null, findClass = "magic-mouse-bg") {
                    let bgElements = null;
                    bgElements = $container ? $container.find(`.${findClass}:not('.mm-bg-initted')`) : $(`.${findClass}:not('.mm-bg-initted')`),
                        bgElements.each(((index, item) => {
                            $(item);
                            pointerDOM && (item.addEventListener("mouseenter", (event => {
                                bgStack.push(item),
                                    pointerDOM.classList.remove("over-dark"),
                                    pointerDOM.classList.remove("over-yellow"),
                                    pointerDOM.classList.remove("over-light"),
                                    pointerDOM.classList.remove("over-prev-slide"),
                                    pointerDOM.classList.remove("over-next-slide"),
                                    item.classList.contains("featured-thinking-item") && (item.classList.contains("slick-current") || ($(item).prev().hasClass("slick-current") ? pointerDOM.classList.add("over-next-slide") : pointerDOM.classList.add("over-prev-slide"))),
                                    item.classList.contains("magic-mouse-bg-dark") ? pointerDOM.classList.add("over-dark") : item.classList.contains("magic-mouse-bg-yellow") ? pointerDOM.classList.add("over-yellow") : item.classList.contains("magic-mouse-bg-light") && pointerDOM.classList.add("over-light")
                            }
                            )),
                                item.addEventListener("mouseleave", (event => {
                                    bgStack = bgStack.filter((e => e !== item));
                                    var parent = $(item).parents(".magic-mouse-bg");
                                    pointerDOM.classList.remove("over-dark"),
                                        pointerDOM.classList.remove("over-yellow"),
                                        pointerDOM.classList.remove("over-light"),
                                        parent.length > 0 ? parent.hasClass("magic-mouse-bg-dark") ? pointerDOM.classList.add("over-dark") : parent.hasClass("magic-mouse-bg-yellow") ? pointerDOM.classList.add("over-yellow") : pointerDOM.classList.add("over-light") : pointerDOM.classList.add("over-light")
                                }
                                )))
                        }
                        )),
                        bgElements.addClass("mm-bg-initted")
                }
                initMagicMouseBg(),
                    window.addEventListener("modalContentAdded", (function (event) {
                        initMagicMouseBg(event.detail.$el)
                    }
                    )),
                    window.addEventListener("slickContentAdded", (function (event) {
                        initMagicMouseBg(null, "featured-thinking-item")
                    }
                    ));
                var movement = () => {
                    cursorDOM && (cursorDOM.style.transform = "matrix(1, 0, 0, 1, " + outerX + ", " + outerY + ")",
                        cursorDOM.style.width = cursorOuterWidth + "px",
                        cursorDOM.style.height = cursorOuterHeight + "px"),
                        pointerDOM && (pointerDOM.style.transform = "matrix(1, 0, 0, 1, " + pointerX + ", " + pointerY + ") translate3d(-50%, -50%, 0)"),
                        requestAnimationFrame(movement)
                }
                    ;
                requestAnimationFrame(movement)
            }()
    }
    )),
        window.addEventListener("windowResizeEnd", (() => {
            removeBreaks(!1)
        }
        )),
        window.addEventListener("ajaxLoadEnd", (event => {
            event.detail && "mad" == event.detail.going && (findWidest(),
                removeBreaks(!0))
        }
        ))
}(jQuery);
