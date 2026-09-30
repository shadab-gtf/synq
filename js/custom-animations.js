(function () {
  "use strict";

  var doc = document;
  var isSmallDevice =
    window.matchMedia("(max-width: 991px)").matches ||
    window.matchMedia("(pointer: coarse)").matches;

  // Sections use content-visibility:auto; render them all before jumping so positions are exact.
  function renderAllSections() {
    doc.documentElement.classList.add("cv-off");
  }

  function scrollToTarget(target) {
    var el = typeof target === "string" ? doc.querySelector(target) : target;
    if (!el) return;
    renderAllSections();
    el.scrollIntoView(isSmallDevice ? undefined : { behavior: "smooth" });
  }

  if (location.hash.length > 1) {
    var hashTarget = doc.getElementById(location.hash.slice(1));
    if (hashTarget) {
      renderAllSections();
      window.addEventListener("load", function () { hashTarget.scrollIntoView(); });
    }
  }

  /* ---------- Header state on scroll ---------- */
  var header = doc.querySelector(".header");
  var mainLogos = doc.querySelectorAll(".header .main_logo");
  var heroButton = doc.querySelector(".hero-buttons");
  var screenHeight = window.innerHeight;

  // srcset takes priority over src, so the desktop logo's srcset is dropped while another logo is shown.
  var logoSrcsets = [];
  for (var li = 0; li < mainLogos.length; li++) logoSrcsets.push(mainLogos[li].getAttribute("srcset"));

  function setLogoSrc(src) {
    for (var i = 0; i < mainLogos.length; i++) {
      var logo = mainLogos[i];
      if (logo.getAttribute("src") === src) continue;
      var srcset = logoSrcsets[i];
      if (srcset && srcset.indexOf(src + " ") === 0) logo.setAttribute("srcset", srcset);
      else logo.removeAttribute("srcset");
      logo.setAttribute("src", src);
    }
  }

  function updateOnScroll() {
    var y = window.scrollY;
    var wide = window.innerWidth > 768;
    if (y >= 200) {
      header.classList.add("gsap-header", "pin-active");
      setLogoSrc("assets/images/logo/great_value_dark.webp");
    } else {
      header.classList.remove("gsap-header", "pin-active");
      if (wide) setLogoSrc("assets/images/logo/great-value-211.webp");
    }
    if (heroButton) heroButton.classList.toggle("scrolled", y > screenHeight);
  }

  var scrollQueued = false;
  window.addEventListener(
    "scroll",
    function () {
      if (scrollQueued) return;
      scrollQueued = true;
      requestAnimationFrame(function () {
        scrollQueued = false;
        updateOnScroll();
      });
    },
    { passive: true }
  );
  if (window.scrollY > 0) updateOnScroll();

  /* ---------- Scroll reveal (section top reaches 80% of viewport) ---------- */
  var revealSections = doc.querySelectorAll(
    ".overview-section, .highlights-section, .gallery-section, .price-list-section, .location-section, .floor-plans-section, .contact-us-section, .footer-section"
  );

  function reveal(section) {
    section.classList.add("is-inview");
    if (section.matches(".contact-us-section, .footer-section")) section.classList.add("animated");
  }

  if ("IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting || entry.boundingClientRect.bottom <= 0) {
            reveal(entry.target);
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -20% 0px" }
    );
    revealSections.forEach(function (s) { revealObserver.observe(s); });
  } else {
    revealSections.forEach(reveal);
  }

  /* ---------- Menu & in-page navigation ---------- */
  var sidebarMenu = doc.getElementById("sidebarMenu");
  var hamburger = doc.getElementById("hamburgerMenu");
  var mobileHamburger = doc.getElementById("mobileHamburgerMenu");

  hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("active");
    sidebarMenu.classList.toggle("active");
  });
  mobileHamburger.addEventListener("click", function () {
    mobileHamburger.classList.toggle("active");
    sidebarMenu.classList.toggle("active");
  });
  doc.getElementById("sidebarCloseBtn").addEventListener("click", function () {
    sidebarMenu.classList.remove("active");
    mobileHamburger.classList.remove("active");
  });

  doc.addEventListener("click", function (e) {
    var link = e.target.closest ? e.target.closest('a[href^="#"]') : null;
    if (!link) return;
    var target = link.hash && doc.querySelector(link.hash);
    e.preventDefault();
    if (!target) return;
    if (link.classList.contains("nav-link")) {
      sidebarMenu.classList.remove("active");
      hamburger.classList.remove("active");
      mobileHamburger.classList.remove("active");
    }
    scrollToTarget(target);
  });

  /* ---------- jQuery, Bootstrap and the query form: loaded after first paint ---------- */
  var vendorsReady = false;
  var vendorsLoading = null;
  var vendorCallbacks = [];

  function loadScript(src) {
    return new Promise(function (resolve) {
      var script = doc.createElement("script");
      script.src = src;
      script.async = false; // execute in insertion order
      script.onload = script.onerror = resolve;
      doc.body.appendChild(script);
    });
  }

  function onVendorsReady(fn) {
    if (vendorsReady) fn();
    else vendorCallbacks.push(fn);
  }

  function loadVendors() {
    if (vendorsLoading) return vendorsLoading;
    vendorsLoading = Promise.all([
      loadScript("assets/js/jquery-3.7.1.min.js"),
      loadScript("assets/js/bootstrap.min.js"),
      loadScript("js/queryform.min.ssl.js?v=3"),
    ]).then(function () {
      vendorsReady = true;
      if (window.initQueryForms) window.initQueryForms();
      var remote = doc.createElement("script");
      remote.src = "https://api2.gtftech.com/scripts/queryform.min.ssl.js?v=" + new Date().getTime();
      doc.body.appendChild(remote);
      vendorCallbacks.splice(0).forEach(function (fn) { fn(); });
    });
    return vendorsLoading;
  }

  ["pointerdown", "touchstart", "keydown", "wheel", "scroll", "mousemove"].forEach(function (type) {
    window.addEventListener(type, loadVendors, { once: true, passive: true });
  });
  window.addEventListener("load", function () { setTimeout(loadVendors, 2500); });

  // A click that lands before Bootstrap is ready (modal, tab, slider, form submit) is replayed once it loads.
  doc.addEventListener(
    "click",
    function (e) {
      if (vendorsReady) return;
      var el = e.target.closest ? e.target.closest("[data-bs-toggle], [data-bs-slide], .submit-btn") : null;
      if (!el) return;
      var toggle = el.getAttribute("data-bs-toggle");
      if (!(toggle === "modal" && el.closest("a[href]"))) e.preventDefault();
      e.stopPropagation();
      loadVendors().then(function () {
        if (toggle === "modal") {
          var modal = doc.querySelector(el.getAttribute("data-bs-target"));
          if (modal) bootstrap.Modal.getOrCreateInstance(modal).show();
        } else if (toggle === "tab") {
          bootstrap.Tab.getOrCreateInstance(el).show();
        } else {
          el.click();
        }
      });
    },
    true
  );

  /* ---------- Fancybox, loaded on first use ---------- */
  var fancyboxLoading = null;
  function loadFancybox() {
    if (fancyboxLoading) return fancyboxLoading;
    fancyboxLoading = Promise.all([
      new Promise(function (resolve) {
        var link = doc.createElement("link");
        link.rel = "stylesheet";
        link.href = "assets/vendor/fancybox/fancybox.css";
        link.onload = link.onerror = resolve;
        doc.head.appendChild(link);
      }),
      new Promise(function (resolve) {
        var script = doc.createElement("script");
        script.src = "assets/vendor/fancybox/fancybox.umd.js";
        script.onload = script.onerror = resolve;
        doc.body.appendChild(script);
      }),
    ]);
    return fancyboxLoading;
  }

  doc.addEventListener(
    "click",
    function (e) {
      var opener = e.target.closest ? e.target.closest("[data-fancybox]") : null;
      if (!opener || window.Fancybox) return;
      e.preventDefault();
      e.stopPropagation();
      loadFancybox().then(function () {
        if (window.Fancybox) opener.click();
      });
    },
    true
  );
  ["pointerdown", "touchstart", "keydown"].forEach(function (type) {
    window.addEventListener(type, loadFancybox, { once: true, passive: true });
  });

  /* ---------- Carousels (Bootstrap) with peeking neighbour slides ---------- */
  function initPeekCarousel(el, options) {
    if (!el) return null;
    var inner = el.querySelector(".carousel-inner");
    var items = Array.prototype.slice.call(inner.children);
    var count = items.length;
    var carousel = null;
    onVendorsReady(function () {
      carousel = bootstrap.Carousel.getOrCreateInstance(el, {
        interval: false,
        ride: false,
        wrap: true,
        touch: true,
        keyboard: true,
      });
    });

    function addNeighbours(index) {
      var item = items[(index + count) % count];
      if (item.hasNeighbours) return;
      item.hasNeighbours = true;
      var i = items.indexOf(item);
      [["gs-p1", i - 1], ["gs-n1", i + 1]].forEach(function (pair) {
        var sourceIndex = (pair[1] + count) % count;
        var clone = items[sourceIndex].querySelector(".gs-self").cloneNode(true);
        clone.classList.remove("gs-self");
        clone.classList.add(pair[0]);
        clone.setAttribute("aria-hidden", "true");
        clone.setAttribute("data-source", sourceIndex);
        clone.querySelectorAll("[data-fancybox]").forEach(function (a) {
          a.removeAttribute("data-fancybox");
          a.setAttribute("tabindex", "-1");
        });
        if (options.eagerImages) {
          clone.querySelectorAll('img[loading="lazy"]').forEach(function (img) {
            img.removeAttribute("loading");
          });
        }
        item.appendChild(clone);
      });
    }

    function activeIndex() {
      return items.indexOf(inner.querySelector(".carousel-item.active"));
    }

    function prepareAround(index) {
      addNeighbours(index);
      addNeighbours(index - 1);
      addNeighbours(index + 1);
    }

    el.addEventListener("slide.bs.carousel", function (e) {
      addNeighbours(items.indexOf(e.relatedTarget));
      if (options.onChange) options.onChange(e.relatedTarget);
    });
    el.addEventListener("slid.bs.carousel", function () {
      if (el.neighboursReady) prepareAround(activeIndex());
    });

    el.addEventListener("click", function (e) {
      var clone = e.target.closest(".gs-p1, .gs-n1");
      if (!clone) return;
      e.preventDefault();
      if (!options.onNeighbourClick) return;
      var run = function () {
        options.onNeighbourClick(clone, items[+clone.getAttribute("data-source")], carousel);
      };
      if (carousel) run();
      else loadVendors().then(run);
    });

    function ready() {
      el.neighboursReady = true;
      prepareAround(activeIndex());
    }

    if (options.prepareWhenNear && "IntersectionObserver" in window) {
      var nearObserver = new IntersectionObserver(
        function (entries) {
          if (entries[0].isIntersecting) {
            nearObserver.disconnect();
            ready();
          }
        },
        { rootMargin: "600px 0px" }
      );
      nearObserver.observe(el);
    } else {
      ready();
    }

    return { inner: inner, items: items };
  }

  initPeekCarousel(doc.getElementById("galleryCarousel"), {
    eagerImages: true,
    prepareWhenNear: true,
    onNeighbourClick: function (clone, sourceItem) {
      var original = sourceItem.querySelector("[data-fancybox]");
      if (original) original.click();
    },
  });

  initPeekCarousel(doc.getElementById("planCarousel"), {
    onChange: function (nextItem) {
      var plan = nextItem.getAttribute("data-plan");
      doc.querySelectorAll(".plan-image").forEach(function (a) {
        a.classList.toggle("active", a.getAttribute("data-plan") === plan);
      });
    },
    onNeighbourClick: function (clone, sourceItem, carousel) {
      if (clone.classList.contains("gs-p1")) carousel.prev();
      else carousel.next();
    },
  });
})();
