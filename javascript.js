/* eslint-disable no-undef*/
function debounce(func, wait, immediate) {
    var timeout;
    return function () {
      var context = this,
        args = arguments;
      var later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }
  
  $(document).ready(function () {
    var $datePickerInput = $('[data-toggle="datepicker"]');
    var $datepickerContainerM = $(".datepicker-container");
    $('[data-toggle="datepicker"]').datepicker({
      format: "dd/mm/yyyy",
      // Assuming the datepicker library triggers a 'show' event
      show: function () {
        var $datepickerContainer = $(".datepicker-container");
  
        // Modify this selector based on your datepicker's container
        if (!$datepickerContainer.find("#confirmDateButton").length) {
          // Avoid adding multiple buttons
          var $button = $("<button/>", {
            text: "Confirm",
            id: "confirmDateButton",
            class: "button date",
          }).on("click", function () {
            $datepickerContainer.fadeOut();
          });
          $datepickerContainer.append($button); // Append the button to the datepicker container
        }
        $("#hg__intended_move_date").click(function () {
          $datepickerContainer.fadeIn();
          $('[data-toggle="datepicker"]').datepicker("show");
        });
  
        // Prevent the datepicker from closing when clicking inside the container
        $datepickerContainer.on("click", function (event) {
          event.stopPropagation();
        });
      },
    });
  
    // Close the datepicker when clicking outside
    $(document).on("click", function (event) {
      var $datepickerContainer = $(".datepicker-container");
      if (
        !$datepickerContainer.is(event.target) &&
        $datepickerContainer.has(event.target).length === 0 &&
        !$(event.target).closest('[data-toggle="datepicker"]').length
      ) {
        $datepickerContainer.fadeOut();
      }
    });
  
    // Ensure the datepicker opens when the input field is clicked
    $("#hg__intended_move_date").click(function (event) {
      event.stopPropagation(); // Prevent the document click event from firing
      $(".datepicker-container").fadeIn();
      $('[data-toggle="datepicker"]').datepicker("show");
    });
  
    if (window.innerWidth < 768) {
      $('[data-toggle="datepicker"]').attr("readonly", "readonly");
    }
  });
  
  class MenuObserver {
    constructor() {
      this.colorTheme = [];
      this.nav = document.querySelector(".nav_component");
      this.sections = document.querySelectorAll('[class^="section"]');
      this.navHeight = this.nav.offsetHeight;
      // Initialize color theme once without waiting for init to be called
      this.initializeColorTheme();
      // Store the observer in the class to access it in both init and destroy methods
      this.observer = null;
    }
  
    initializeColorTheme() {
      const htmlStyles = getComputedStyle(document.documentElement);
      const targetStylesheet = document.querySelector(".page_code_color style");
      const regex = /--([^:\s]+):\s*var\(--([^)]+)\);/g;
      this.colorTheme.push({});
      if (targetStylesheet) {
        const rules =
          targetStylesheet.sheet.cssRules || targetStylesheet.sheet.rules;
        for (const rule of rules) {
          if (
            rule.cssText.includes("data-theme=") &&
            !rule.cssText.includes(`data-theme="inherit"`)
          ) {
            const styleObject = {};
            let match;
            while ((match = regex.exec(rule.cssText)) !== null) {
              const key = "--" + match[1];
              const value = htmlStyles.getPropertyValue("--" + match[2]);
              styleObject[key] = value;
            }
            this.colorTheme.push(styleObject);
          }
        }
      }
    }
  
    init() {
      this.initializeObserver();
    }
  
    destroy() {
      if (this.observer) {
        this.observer.disconnect();
      }
      // Optionally reset the nav's theme or perform other cleanup tasks
      this.nav.removeAttribute("data-theme");
    }
  
    initializeObserver() {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const targetTheme = entry.target.getAttribute("data-theme");
              const navRect = this.nav.getBoundingClientRect();
              const sectionRect = entry.target.getBoundingClientRect();
              const isNavBottomTouchingSection =
                navRect.bottom >= sectionRect.top &&
                navRect.bottom <= sectionRect.bottom;
              const isNavTopTouchingSection =
                navRect.top >= sectionRect.top &&
                navRect.top <= sectionRect.bottom;
  
              if (isNavBottomTouchingSection || isNavTopTouchingSection) {
                this.nav.setAttribute(
                  "data-theme",
                  targetTheme === "inherit" ? "dark" : "light"
                );
                // Assuming gsap.from() is correctly configured elsewhere
                gsap.from(this.nav, {
                  ...this.colorTheme[targetTheme === "inherit" ? 2 : 1],
                });
              }
            }
          });
        },
        {
          root: null,
          rootMargin: `-${this.navHeight}px 0px -${this.navHeight}px 0px`,
          threshold: [0, 1],
        }
      );
  
      this.sections.forEach((section) => this.observer.observe(section));
    }
  
    reloadObserver() {
      if (this.observer) {
        this.observer.disconnect(); // Ensure we clean up before re-initializing
        this.sections.forEach((section) => this.observer.observe(section));
      }
    }
  }
  
  $(document).ready(function () {
    // Check if the media query is true
    function createScrollTrigger(triggerElement, timeline) {
      ScrollTrigger.refresh();
      ScrollTrigger.create({
        trigger: triggerElement,
        start: "top bottom",
      });
      // Play tl when scrolled into view (60% from top of screen)
      ScrollTrigger.create({
        trigger: triggerElement,
        start: "top 95%",
        onEnter: () => timeline.play(),
      });
      setTimeout(function () {
        gsap.set("[text-split]", { opacity: 1 });
      }, 200);
    }
    function headingAnimation(heading) {
      let typeSplit = new SplitType(heading, {
        types: "words, chars",
        tagName: "span",
      });
  
      $(heading).each(function (index) {
        let tl = gsap.timeline({ paused: true });
        tl.from($(this).find(".char"), {
          yPercent: 100,
          duration: 0.6,
          ease: "power3.out",
          stagger: { amount: 0.6 },
        });
        createScrollTrigger($(this), tl);
      });
  
      gsap.set(heading, { opacity: 1 });
    }
    function animatePage() {
      headingAnimation("[words-slide-up]");
  
      var overlay = $(".overlay");
      var nav = $("#nav");
      var h1 = $("#h1");
  
      overlay.animate({ top: "-120%" }, 750, function () {
        setTimeout(function () {
          headingAnimation(h1);
          gsap.fromTo(
            nav,
            {
              opacity: 0,
              y: -60,
              duration: 0.4,
              delay: 0.6,
              ease: "power3.out",
            },
            {
              opacity: 1,
              y: 0,
            }
          );
        }, 150);
      });
  
      overlay.animate({ top: "120%" }, 0);
    }
  
    animatePage();
    $(
      ".nav_menu_link, .nav_brand, .button.is-text-icon, .nav_dropdown_link, .button.is-nav, .button.is-mobile-menu"
    ).each(function () {
      $(this).on("click", function (e) {
        e.preventDefault();
        var pageUrl = $(this).attr("href");
        var overlay = $(".overlay");
        var nav = $("#nav");
        gsap.to(nav, {
          opacity: 0,
          y: -60,
          duration: 0.35,
          delay: 0.2,
          ease: "power3.out",
        });
        overlay.animate({ top: "0%" }, 750, function () {
          window.location.href = pageUrl;
        });
      });
    });
  });
  
  function initPage() {
    var init = false;
    const menuObserver = new MenuObserver();
  
    menuObserver.reloadObserver();
    menuObserver.init();
  
    var swiperG;
    var swiperL;
    function swiperCard() {
      if (window.innerWidth <= 991) {
        if (!init) {
          init = true;
          swiperG = new Swiper(".mobile_slider_bottom", {
            direction: "horizontal",
            spaceBetween: 16,
            autoHeight: false,
            preloadImages: false,
            lazy: { loadPrevNext: true },
            slidesPerView: "auto",
          });
          const sliders = document.querySelectorAll(".mobile_slider");
  
          sliders.forEach((slider) => {
            // Initialize Swiper for each element
            swiperL = new Swiper(slider, {
              direction: "horizontal",
              spaceBetween: 16,
              autoHeight: false,
              preloadImages: false,
              lazy: { loadPrevNext: true },
              slidesPerView: "auto",
            });
          });
        }
      } else if (init) {
        swiperG.destroy();
        swiperL.destroy();
        init = false;
      }
    }
    swiperCard();
  
    gsap.registerPlugin(ScrollTrigger);
  
    // gsap.to(".footer_box", {
    //   pin: true,
    //   scrollTrigger: {
    //     trigger: ".footer_box",
    //     start: "center bottom",
    //     end: "bottom bottom",
    //   },
    // });
  
    window.addEventListener("resize", swiperCard());
  
    function disableScroll() {
      document.body.style.overflow = "hidden";
    }
    function enableScroll() {
      document.body.style.overflow = "auto";
    }
  
    $(".OPENER").on("click", function () {
      disableScroll();
    }),
      $(".CLOSER").on("click", function () {
        enableScroll();
      }),
      $(window).on("resize", function () {
        enableScroll();
        swiperCard();
      });

  
    document.addEventListener("DOMContentLoaded", function () {
      var form = document.querySelector("#firstForm");
  
      form.addEventListener("submit", function (e) {
        e.preventDefault(); // Prevent the default form submission
        // Capture the form data
        var firstname = document.querySelector("#firstname").value;
        var lastname = document.querySelector("#lastname").value;
        var mobilephone = document.querySelector("#mobilephone").value;
        var email = document.querySelector("#email").value;
  
        var expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 14); // Set to two weeks from now
        var expires = "; expires=" + expiryDate.toUTCString();
  
        // Store the data in cookies with expiration and SameSite attribute
        document.cookie =
          "firstname=" +
          encodeURIComponent(firstname) +
          "; path=/" +
          expires +
          "; SameSite=Lax";
        document.cookie =
          "lastname=" +
          encodeURIComponent(lastname) +
          "; path=/" +
          expires +
          "; SameSite=Lax";
        document.cookie =
          "mobilephone=" +
          encodeURIComponent(mobilephone) +
          "; path=/" +
          expires +
          "; SameSite=Lax";
        document.cookie =
          "email=" +
          encodeURIComponent(email) +
          "; path=/" +
          expires +
          "; SameSite=Lax";
  
        // Redirect to the /enquire page
        window.location.href = "/enquire";
      });
    });
  
    function exploreSwiper(s) {
      const swiper = new Swiper(s, {
        loop: true,
  
        effect: "fade",
        fadeEffect: {
          crossFade: true, // Enable crossFade for smoother transition
        },
        // Add navigation with custom arrows
        navigation: {
          nextEl: ".explore-next",
          prevEl: ".explore-prev",
        },
        on: {
          init: function () {
            const totalSlides = this.slides.length; // Get total number of slides
            updateSlideNumberDisplay(this.realIndex + 1, totalSlides); // Pass totalSlides as a second parameter
            displaySlideNumberDisplay(totalSlides);
          },
          slideChange: function () {
            const totalSlides = this.slides.length; // Get total number of slides
            updateSlideNumberDisplay(this.realIndex + 1, totalSlides); // Pass totalSlides as a second parameter
            displaySlideNumberDisplay(totalSlides);
          },
        },
      });
    }
  
    exploreSwiper(".explore_swiper");
  
    function displaySlideNumberDisplay(totalSlides) {
      // Update the text of the .slide_number element
      $(".slide_number").text(totalSlides);
    }
    // Function to update the displayed slide number
    function updateSlideNumberDisplay(number) {
      document.getElementById("currentSlideDisplay").innerText = number;
    }
  }
  
  initPage();
