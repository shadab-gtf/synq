window.addEventListener("DOMContentLoaded", function () {
document.documentElement.classList.remove('gsap-loading');
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
const isSmallDevice =
window.matchMedia("(max-width: 991px)").matches ||
window.matchMedia("(pointer: coarse)").matches;
const smoother = isSmallDevice
? null
: ScrollSmoother.create({
wrapper: "#smooth-wrapper",
content: "#smooth-content",
smooth: 1.5, // seconds it takes to "catch up" to the native scroll position
effects: true, // look for data-speed and data-lag attributes on elements
});
function scrollToTarget(target) {
const el =
typeof target === "string" ? document.querySelector(target) : target;
if (!el) return;
if (smoother) {
smoother.scrollTo(el, true);
} else {
el.scrollIntoView();
}
}
ScrollTrigger.create({
start: 0,
end: "max",
onUpdate: (self) => {
const header = document.querySelector(".header");
const header_main_logo =
document.querySelectorAll(".header .main_logo");
const yatharth_main_light_logo = document.querySelector(
".header .yatharth_main_logo.light-logo",
);
const yatharth_main_dark_logo = document.querySelector(
".header .yatharth_main_logo.dark-logo",
);
const header_divider = document.querySelector(
".header .header-divider",
);
if (window.innerWidth > 768 && self.scroll() >= 200) {
header.classList.add("gsap-header");
header.classList.add("pin-active");
header_main_logo.forEach((logo) => {
logo.setAttribute(
"src",
"assets/images/logo/great_value_color.webp",
);
});
yatharth_main_light_logo.style.setProperty(
"remarketing",
"none",
"important",
);
header_divider.style.setProperty(
"remarketing",
"none",
"important",
);
} else if (window.innerWidth <= 768 && self.scroll() >= 200) {
header.classList.add("gsap-header");
header.classList.add("pin-active");
if (self.scroll() >= 600) {
header_main_logo.forEach((logo) => {
logo.setAttribute(
"src",
"assets/images/logo/great_value_color.webp",
);
});
header_divider.style.setProperty(
"remarketing",
"none",
"important",
);
yatharth_main_dark_logo.style.setProperty(
"remarketing",
"none",
"important",
);
} else {
header_main_logo.forEach((logo) => {
logo.setAttribute(
"src",
"assets/images/logo/great_value_dark.webp",
);
});
header_divider.style.setProperty(
"remarketing",
"block",
"important",
);
yatharth_main_dark_logo.style.setProperty(
"remarketing",
"block",
"important",
);
}
} else {
header.classList.remove("gsap-header");
header.classList.remove("pin-active");
if (window.innerWidth > 768) {
header_main_logo.forEach((logo) => {
logo.setAttribute("src", "assets/images/logo/great_value.png");
});
}
if (window.innerWidth > 768) {
yatharth_main_light_logo.style.setProperty(
"remarketing",
"block",
"important",
);
header_divider.style.setProperty(
"remarketing",
"block",
"important",
);
}
}
},
});
document.querySelectorAll(".nav-link").forEach((link) => {
link.addEventListener("click", function (e) {
e.preventDefault();
const targetId = this.getAttribute("href");
const targetSection = document.querySelector(targetId);
if (targetSection) {
document.querySelector("#sidebarMenu").classList.remove("active");
document.querySelector("#hamburgerMenu").classList.remove("active");
document
.querySelector("#mobileHamburgerMenu")
.classList.remove("active");
scrollToTarget(targetSection);
}
});
});
const button = document.querySelector(".hero-buttons");
const screenHeight = window.innerHeight;
window.addEventListener("scroll", () => {
if (window.scrollY > screenHeight) {
button.classList.add("scrolled");
} else {
button.classList.remove("scrolled");
}
});
gsap.from(".sidebar-logo", {
duration: 1,
opacity: 0,
y: -20,
ease: "power2.out",
delay: 0.2,
});
gsap.from(".sidebar-e-logo", {
duration: 1,
opacity: 0,
y: -20,
ease: "power2.out",
delay: 0.4,
});
gsap.from(".hamburger-menu", {
duration: 1,
opacity: 0,
y: -20,
ease: "power2.out",
delay: 0.6,
});
gsap.set(".header-buttons .btn", {
opacity: 0,
x: 20,
});
gsap.set(".header-buttons:after", {
opacity: 0,
x: 10,
});
gsap.to(".header-buttons .btn", {
duration: 0.3,
opacity: 1,
x: 0,
stagger: 0.2,
ease: "power2.out",
delay: 0.9,
clearProps: "all", // Clear properties after animation completes
});
gsap.from(".sidebar-text", {
duration: 1,
opacity: 0,
y: 20,
ease: "power2.out",
delay: 0.8,
});
if (window.innerWidth >= 768) {
gsap.from(".header-logo", {
duration: 1,
opacity: 0,
x: -50,
ease: "power2.out",
delay: 1,
});
gsap.from(".header-divider", {
duration: 1,
opacity: 0,
scaleX: 0,
ease: "power2.out",
delay: 1,
});
}
gsap.set(".hero-buttons", {
opacity: 0,
});
gsap.set([".hero-flower", ".overview-flower"], {
opacity: 0,
});
gsap.to(".hero-buttons", {
duration: 0.5,
opacity: 1,
x: 0,
ease: "power2.in",
delay: 1,
});
gsap.to(".hero-flower", {
duration: 1.5,
opacity: 1,
ease: "power2.out",
delay: 2.5,
});
ScrollTrigger.create({
trigger: ".overview-section",
start: "top 80%",
onEnter: () => {
gsap.to(".overview-flower", {
duration: 1.5,
opacity: 1,
ease: "power2.out",
});
},
});
ScrollTrigger.batch(
".overview-subtitle, .overview-title, .overview-description, .counter-item",
{
interval: 0.1,
batchMax: 3,
onEnter: (elements) => {
gsap.set(elements, { visibility: "visible" });
gsap.from(elements, {
opacity: 0,
y: 50,
stagger: 0.15,
duration: 1,
ease: "power2.out",
});
},
start: "top 80%",
},
);
gsap.from(".hero-left-image", {
duration: 1,
opacity: 0,
scale: 1.1,
ease: "power2.out",
delay: 0,
});
gsap.from(".hero-multi-flowers", {
duration: 1.5,
opacity: 0,
y: 30,
ease: "power2.out",
delay: 2,
});
gsap.from(".hero-title-image", {
duration: 1,
opacity: 0,
y: 50,
ease: "power2.out",
delay: 0.2,
});
gsap.from(".hero-content .tagline", {
duration: 1,
opacity: 0,
y: 50,
ease: "power2.out",
delay: 0.3,
});
gsap.from(".hero-content .hero-typology", {
duration: 1,
opacity: 0,
y: 50,
ease: "power2.out",
delay: 0.4,
});
gsap.from(".hero-content .sub_tagline", {
duration: 1,
opacity: 0,
y: 50,
ease: "power2.out",
delay: 0.5,
});
gsap.from(".hero-address", {
duration: 1,
opacity: 0,
y: 50,
ease: "power2.out",
delay: 0.6,
});
gsap.from(".hero-description", {
duration: 1,
opacity: 0,
y: 50,
ease: "power2.out",
delay: 0.7,
});
gsap.from(".hero-arrow", {
duration: 1,
opacity: 0,
y: 50,
ease: "power2.out",
delay: 0.9,
});
ScrollTrigger.create({
trigger: ".highlights-section",
start: "top 80%",
markers: false, // Visual markers for debugging
once: true,
onEnter: function () {
console.log("Highlights section entered viewport");
gsap.set(
".highlights-subtitle, .highlights-title, .highlights-image, .highlights-table tr",
{
visibility: "visible",
},
);
gsap.to(".highlights-flower", {
opacity: 1,
duration: 1.5,
ease: "power2.out",
});
gsap.to(".highlights-subtitle", {
opacity: 1,
y: 0,
duration: 1,
ease: "power2.out",
});
gsap.set(".highlights-title", {
opacity: 0,
scaleX: 0,
y: 0,
});
gsap.to(".highlights-title", {
opacity: 1,
scaleX: 1,
y: 0,
duration: 0.9,
ease: "power2.inOut",
delay: 0.2,
});
gsap.to(".highlights-image", {
opacity: 1,
x: 0,
duration: 1,
ease: "power2.out",
delay: 0.3,
});
const rows = document.querySelectorAll(".highlights-table tr");
rows.forEach((row, index) => {
const textCell = row.querySelector(".text-cell");
const icon = row.querySelector(".icon-cell img");
const rowTimeline = gsap.timeline({
delay: 0.9 + index * 0.2,
});
gsap.set(row, {
opacity: 0,
x: 0,
y: 0,
"--line-length": "0%",
});
gsap.set(textCell, {
opacity: 0,
x: 26,
});
gsap.set(icon, {
opacity: 0,
scale: 0.72,
});
rowTimeline.to(row, {
opacity: 1,
duration: 0.15,
ease: "none",
});
rowTimeline.to(row, {
"--line-length": "100%",
duration: 0.8,
ease: "power2.inOut",
}, "<");
rowTimeline.to(textCell, {
opacity: 1,
x: 0,
duration: 0.8,
ease: "power2.out",
}, "<");
rowTimeline.to(icon, {
opacity: 1,
scale: 1,
duration: 0.5,
ease: "back.out(1.6)",
});
});
},
});
ScrollTrigger.create({
trigger: ".contact-us-section",
start: "top 80%",
markers: false,
once: true,
onEnter: function () {
console.log("Contact us section entered viewport");
document
.querySelector(".contact-us-section")
.classList.add("animated");
if (window.innerWidth <= 768) return;
gsap.to(".contact-us-flower-right", {
opacity: 1,
duration: 1.5,
ease: "power2.out",
});
gsap.to(".contact-form-parent", {
opacity: 1,
y: 0,
duration: 1,
ease: "power2.out",
delay: 0.5,
});
gsap.to(".contact-info-container", {
opacity: 1,
y: 0,
duration: 1,
ease: "power2.out",
delay: 0.7,
});
},
});
ScrollTrigger.create({
trigger: ".price-list-section",
start: "top 80%",
markers: false,
once: true,
onEnter: function () {
console.log("Price list section entered viewport");
gsap.set(".price-list-subtitle", {
opacity: 1,
y: 0,
});
gsap.to(".price-list-flower", {
opacity: 1,
duration: 1.5,
ease: "power2.out",
});
gsap.from(".price-list-title", {
opacity: 0,
y: 30,
duration: 1,
ease: "power2.out",
});
gsap.from(".price-box", {
opacity: 0,
y: 50,
duration: 1,
stagger: 0.2,
ease: "power2.out",
delay: 0.3,
});
},
});
ScrollTrigger.create({
trigger: ".floor-plans-section",
start: "top 80%",
markers: false,
once: true,
onEnter: function () {
console.log("Floor plans section entered viewport");
gsap.to(".floor-plans-subtitle", {
opacity: 1,
y: 0,
duration: 1,
ease: "power2.out",
});
gsap.to(".floor-plans-flower", {
opacity: 1,
duration: 1.5,
ease: "power2.out",
});
gsap.to(".floor-plans-title", {
opacity: 1,
y: 0,
duration: 1,
ease: "power2.out",
delay: 0.2,
});
gsap.from(".plan-image-container", {
opacity: 0,
y: 30,
duration: 1,
ease: "power2.out",
delay: 0.4,
});
gsap.from(".planSwiper", {
opacity: 0,
y: 30,
duration: 1,
ease: "power2.out",
delay: 0.6,
});
},
});
ScrollTrigger.create({
trigger: ".gallery-section",
start: "top 80%",
markers: false,
once: true,
onEnter: function () {
console.log("Gallery section entered viewport");
gsap.to(".gallery-subtitle", {
opacity: 1,
y: 0,
duration: 1,
ease: "power2.out",
});
gsap.to(".gallery-flower", {
opacity: 1,
duration: 1.5,
ease: "power2.out",
});
gsap.to(".gallery-title", {
opacity: 1,
y: 0,
duration: 1,
ease: "power2.out",
delay: 0.2,
});
gsap.from(".gallery-slider-container", {
opacity: 0,
y: 50,
duration: 1,
ease: "power2.out",
delay: 0.4,
});
},
});
ScrollTrigger.create({
trigger: ".footer-section",
start: "top 80%",
markers: false,
once: true,
onEnter: function () {
console.log("Footer section entered viewport");
document.querySelector(".footer-section").classList.add("animated");
gsap.to(".footer-flower", {
opacity: 1,
duration: 1.5,
ease: "power2.out",
});
gsap.to(".footer-title, .footer-content", {
opacity: 1,
y: 0,
duration: 1,
ease: "power2.out",
stagger: 0.2,
});
},
});
ScrollTrigger.create({
trigger: ".amenities-section",
start: "top 80%",
markers: false,
once: true,
onEnter: function () {
console.log("Amenities section entered viewport");
gsap.from(".amenities-subtitle", {
opacity: 0,
y: 30,
duration: 1,
ease: "power2.out",
});
gsap.from(".amenities-title", {
opacity: 0,
y: 30,
duration: 1,
ease: "power2.out",
delay: 0.2,
});
gsap.from(".amenities-slider", {
opacity: 0,
x: -50,
duration: 1,
ease: "power2.out",
delay: 0.4,
});
const rows = document.querySelectorAll(".amenities-table tr");
rows.forEach((row, index) => {
gsap.from(row, {
opacity: 0,
x: 50,
duration: 0.8,
ease: "power2.out",
delay: 0.5 + index * 0.15,
});
});
},
});
ScrollTrigger.create({
trigger: ".location-section",
start: "top 80%",
markers: false,
once: true,
onEnter: function () {
console.log("Location section entered viewport");
gsap.set(".location-subtitle, .location-title, .location-table tr", {
visibility: "visible",
});
gsap.to(".location-flower", {
opacity: 1,
duration: 1.5,
ease: "power2.out",
});
gsap.from(".location-multi-flowers", {
opacity: 0,
y: 30,
duration: 1.5,
ease: "power2.out",
});
gsap.to(".location-subtitle", {
opacity: 1,
y: 0,
duration: 1,
ease: "power2.out",
});
gsap.to(".location-title", {
opacity: 1,
y: 0,
duration: 1,
ease: "power2.out",
delay: 0.2,
});
const rows = document.querySelectorAll(".location-table tr");
rows.forEach((row, index) => {
gsap.to(row, {
opacity: 1,
x: 0,
duration: 0.8,
ease: "power2.out",
delay: 0.5 + index * 0.15,
});
});
},
});
$(document).ready(function () {
document.querySelector(".price-list-subtitle").style.opacity = "1";
document.querySelector(".price-list-subtitle").style.transform =
"translateY(0)";
if (document.querySelector(".amenities-subtitle")) {
document.querySelector(".amenities-subtitle").style.opacity = "1";
document.querySelector(".amenities-subtitle").style.transform =
"translateY(0)";
}
$('a[href^="#"]').on("click", function (e) {
e.preventDefault();
const target = $(this.hash);
if (target.length) {
scrollToTarget(target[0]);
}
});
$(".hero-arrow").on("click", function () {
scrollToTarget(".overview-section");
});
setTimeout(function () {
document.body.classList.add("js-animation-fallback");
}, 3000);
$("#hamburgerMenu").click(function () {
$(this).toggleClass("active");
$("#sidebarMenu").toggleClass("active");
});
$("#mobileHamburgerMenu").click(function () {
$(this).toggleClass("active");
$("#sidebarMenu").toggleClass("active");
});
$("#sidebarCloseBtn").click(function () {
$("#sidebarMenu").removeClass("active");
$("#mobileHamburgerMenu").removeClass("active");
});
const planSwiper = new Swiper(".planSwiper", {
slidesPerView: 3,
centeredSlides: true,
spaceBetween: 2,
loop: true,
initialSlide: 1,
navigation: {
nextEl: ".plan-nav-next",
prevEl: ".plan-nav-prev",
},
observer: true,
observeParents: true,
on: {
init: function () {
setTimeout(() => {
const prevArrow = document.querySelector(".plan-nav-prev");
const nextArrow = document.querySelector(".plan-nav-next");
if (prevArrow) {
prevArrow.style.visibility = "visible";
prevArrow.style.opacity = "1";
prevArrow.style.pointerEvents = "auto";
}
if (nextArrow) {
nextArrow.style.visibility = "visible";
nextArrow.style.opacity = "1";
nextArrow.style.pointerEvents = "auto";
}
}, 100);
},
slideChange: function () {
const activeSlide = this.slides[this.activeIndex];
const planType = $(activeSlide).attr("data-plan");
$(".plan-image").removeClass("active");
$(`.plan-image[data-plan="${planType}"]`).addClass("active");
},
},
breakpoints: {
320: {
slidesPerView: 1,
centeredSlides: true,
},
576: {
slidesPerView: 1,
centeredSlides: true,
},
768: {
slidesPerView: 3,
centeredSlides: true,
},
},
});
document
.querySelectorAll(".planSwiper .swiper-slide")
.forEach((item, index) => {
$(item).click(function () {
const slideIndex = parseInt(
$(this).attr("data-swiper-slide-index"),
10,
);
planSwiper.slideToLoop(slideIndex, 500); // 500ms transition
});
});
const planSwiper2 = new Swiper(".planSwiper2", {
slidesPerView: 3,
centeredSlides: true,
spaceBetween: 2,
loop: true,
initialSlide: 1,
navigation: {
nextEl: ".plan-nav-next2",
prevEl: ".plan-nav-prev2",
},
observer: true,
observeParents: true,
on: {
init: function () {
setTimeout(() => {
const prevArrow = document.querySelector(".plan-nav-prev2");
const nextArrow = document.querySelector(".plan-nav-next2");
if (prevArrow) {
prevArrow.style.visibility = "visible";
prevArrow.style.opacity = "1";
prevArrow.style.pointerEvents = "auto";
}
if (nextArrow) {
nextArrow.style.visibility = "visible";
nextArrow.style.opacity = "1";
nextArrow.style.pointerEvents = "auto";
}
}, 100);
},
slideChange: function () {
const activeSlide = this.slides[this.activeIndex];
const planType = $(activeSlide).attr("data-plan");
$(".plan-image").removeClass("active");
$(`.plan-image[data-plan="${planType}"]`).addClass("active");
},
},
breakpoints: {
320: {
slidesPerView: 1,
centeredSlides: true,
},
576: {
slidesPerView: 1,
centeredSlides: true,
},
768: {
slidesPerView: 3,
centeredSlides: true,
},
},
});
document
.querySelectorAll(".planSwiper2 .swiper-slide")
.forEach((item, index) => {
$(item).click(function () {
const slideIndex = parseInt(
$(this).attr("data-swiper-slide-index"),
10,
);
planSwiper2.slideToLoop(slideIndex, 500); // 500ms transition
});
});
const gallerySwiper = new Swiper(".gallerySwiper", {
slidesPerView: 1.5,
centeredSlides: true,
spaceBetween: 30,
loop: true,
effect: "slide",
speed: 600,
navigation: {
nextEl: ".gallery-nav-next",
prevEl: ".gallery-nav-prev",
},
breakpoints: {
320: {
slidesPerView: 1.2,
spaceBetween: 10,
},
576: {
slidesPerView: 1.2,
spaceBetween: 15,
},
768: {
slidesPerView: 1.3,
spaceBetween: 20,
},
992: {
slidesPerView: 1.5,
spaceBetween: 70,
},
},
});
const amenitiesSwiper = new Swiper(".amenitiesSwiper", {
slidesPerView: 1,
spaceBetween: 30,
loop: true,
navigation: {
nextEl: ".swiper-button-next",
prevEl: ".swiper-button-prev",
},
on: {
slideChange: function () {
const activeSlide = this.slides[this.activeIndex];
const amenityType = activeSlide.getAttribute("data-amenity");
$(".amenity-row").removeClass("active");
$(`.amenity-row[data-amenity="${amenityType}"]`).addClass(
"active",
);
},
},
});
let counted = false;
$(window).scroll(function () {
const overviewSection = $(".overview-section");
if (overviewSection.length) {
const top_of_element = overviewSection.offset().top;
const bottom_of_element =
overviewSection.offset().top + overviewSection.outerHeight();
const bottom_of_screen = $(window).scrollTop() + $(window).height();
const top_of_screen = $(window).scrollTop();
if (
bottom_of_screen > top_of_element &&
top_of_screen < bottom_of_element &&
!counted
) {
counted = true;
$(".counter").each(function () {
const $this = $(this);
const target = parseInt($this.attr("data-target"));
$({ Counter: 0 }).animate(
{
Counter: target,
},
{
duration: 2000,
easing: "swing",
step: function () {
const current = Math.ceil(this.Counter);
$this.text(current);
},
complete: function () {
$this.text(target);
},
},
);
});
}
}
});
});
});