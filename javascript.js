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
  
    mapboxgl.accessToken =
      "pk.eyJ1Ijoicm9iLXRlc3RiZWQiLCJhIjoiY2xzYXJtZGhoMDd6MjJpb2E4dDFybm9tdiJ9.Ye7pk5xEmhcPA7eNp7tpUA";
    var map = new mapboxgl.Map({
      container: "map_another_wrapper", // container ID
      style: "mapbox://styles/rob-testbed/clsarva7m00t701ql64m5bsq2", // style URL
      center: [-0.240947, 51.494106], // starting position [lng, lat]
      zoom: 15, // starting zoom
      scrollZoom: false, // Disable map zooming with the scroll wheel
      dragPan: false, // Disable map panning by dragging
      touchZoomRotate: false, // Disable map zooming and rotating by touch
      focusAfterOpen: false,
    });
    var stateMarkers = {
      mapState1: [],
      mapState2: [],
      mapState3: [],
    };
  
    $(document).ready(function () {
      // Initialize an empty object to hold the markers
      // Function to scrape data and populate stateMarkers
      function scrapeData() {
        // Define the mapping between IDs and stateMarkers keys
        var idToStateMap = {
          fiveMinState: "mapState1",
          tenMinState: "mapState2",
          fifMinState: "mapState3",
        };
  
        // Iterate over each state ID
        $.each(idToStateMap, function (id, stateKey) {
          $("#" + id + " .map_info_wrapper").each(function () {
            var name = $(this).find(".map_info_name").text().trim();
            var link = $(this).find(".map_info_link").attr("href").trim();
            var lat = parseFloat($(this).find(".map_info_lat").text().trim());
            var long = parseFloat($(this).find(".map_info_long").text().trim());
            var active = $(this).find(".map_info_active").text();
            var activeState = active === "true" ? true : false;
            var marker = {
              coordinates: [long, lat],
              name: name,
              googleMapsUrl: link,
              activeState: activeState,
            };
  
            // Add the marker to the corresponding state in stateMarkers
            stateMarkers[stateKey].push(marker);
          });
        });
      }
  
      // Call scrapeData after the page has fully loaded
      scrapeData();
    });
  
    function addMarkersForState(state) {
      // Remove existing markers if any
      if (window.currentMarkers) {
        window.currentMarkers.forEach(function (marker) {
          marker.remove();
        });
      }
      window.currentMarkers = [];
  
      // Add new markers for the specified state
      if (stateMarkers[state]) {
        stateMarkers[state].forEach(function (markerData) {
          // Create a new div element for the default marker, and resize it
          var markerDiv = document.createElement("div");
          markerDiv.style.width = "18px";
          markerDiv.style.height = "26px";
          markerDiv.style.backgroundSize = "contain"; // Adjusts the icon to fit the div
          markerDiv.className = "mapboxgl-marker"; // Ensure it has Mapbox's default styles
  
          // Optionally customize further (e.g., adding background color)
          markerDiv.style.backgroundImage = `url("https://uploads-ssl.webflow.com/65dc8bd2aa4af4c4177edf9d/663bb2662895c0e73f6dd1f5_Subtract.svg")`;
  
          var nameLink = `<a href="${markerData.googleMapsUrl}" target="_blank" style="font-family: 'Rector'; font-size: 0.75rem; color: var(--theme--text); text-decoration: none; outline: none;">${markerData.name}</a>`;
          var marker = new mapboxgl.Marker(markerDiv) // Set pin color
            .setLngLat(markerData.coordinates)
            .setPopup(
              new mapboxgl.Popup({ offset: 30 }) // Add popups
                .setHTML(nameLink)
            )
            .addTo(map);
          if (markerData.activeState) {
            marker.togglePopup();
          }
          window.currentMarkers.push(marker);
        });
      }
    }
  
    var permanentPin = {
      coordinates: [-0.240947, 51.494106], // Example coordinates
      name: "Hamlet Gardens",
      googleMapsUrl: "https://maps.app.goo.gl/Px5ctUwYWtuZP3Uq7",
      iconUrl:
        "https://uploads-ssl.webflow.com/65dc8bd2aa4af4c4177edf9d/663bade8e93468967b4aff87_Group%20574.svg",
    };
  
    function addPermanentPin() {
      // Create a new div element for the custom marker
      var markerDiv = document.createElement("div");
      markerDiv.style.width = "32px";
      markerDiv.style.height = "42px";
      markerDiv.style.backgroundImage = `url(${permanentPin.iconUrl})`;
      markerDiv.style.backgroundSize = "cover";
  
      // Create the marker with the custom div
      var marker = new mapboxgl.Marker(markerDiv)
        .setLngLat(permanentPin.coordinates)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }).setHTML(
            `<a href="${permanentPin.googleMapsUrl}" target="_blank" style="font-family: 'Rector'; font-size: 0.75rem; color: var(--theme--text); text-decoration: none; outline: none;">${permanentPin.name}</a>`
          )
        )
        .addTo(map);
    }
    addPermanentPin(); // Add the permanent pin to the map
  
    function mapInit() {
      map.flyTo({
        center: [-0.240947, 51.494106],
        zoom: 14,
        essential: true, // this animation is considered essential with respect to prefers-reduced-motion
      });
  
      $(".map_icon").each(function () {
        if ($(this).css("marginLeft") !== "0rem") {
          $(this).animate(
            {
              marginLeft: "-2.5625rem",
            },
            300
          );
        }
      });
      $(".map_icon.first").animate(
        {
          marginLeft: "0rem",
        },
        300
      );
  
      $(".map_item").css("background", ""); // Reset all backgrounds
      $(".map_item.first").css("background", "#fff"); // Ensure the first item has a white background
  
      addMarkersForState("mapState1");
    }
  
    $(document).ready(function (e) {
      mapInit();
  
      if ("scrollRestoration" in history) {
        history.scrollRestoration = "manual";
      }
      $("html, body").scrollTop(0);
    });
  
    $("#mapState1").click(function () {
      mapInit();
      $(this).css("background", "#fff"); // Set the background of the clicked state to white
    });
  
    $("#mapState2").click(function () {
      map.flyTo({
        center: [-0.240947, 51.494106],
        zoom: 13.5,
        essential: true,
      });
      $(".map_icon").each(function () {
        if ($(this).css("marginLeft") !== "0rem") {
          $(this).animate(
            {
              marginLeft: "-2.5625rem",
            },
            300
          );
        }
      });
      $(this).find(".map_icon").animate(
        {
          marginLeft: "0rem",
        },
        300
      );
      addMarkersForState("mapState2");
      $(".map_item").css("background", ""); // Reset all backgrounds
      $(this).css("background", "#fff"); // Set the background of the clicked state to white
    });
  
    $("#mapState3").click(function () {
      map.flyTo({
        center: [-0.240947, 51.494106],
        zoom: 12.5,
        essential: true,
      });
      $(".map_icon").each(function () {
        if ($(this).css("marginLeft") !== "0rem") {
          $(this).animate(
            {
              marginLeft: "-2.5625rem",
            },
            300
          );
        }
      });
      $(this).find(".map_icon").animate(
        {
          marginLeft: "0rem",
        },
        300
      );
      addMarkersForState("mapState3");
      $(".map_item").css("background", ""); // Reset all backgrounds
      $(this).css("background", "#fff"); // Set the background of the clicked state to white
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