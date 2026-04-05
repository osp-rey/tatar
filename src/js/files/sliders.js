export default function sliders() {
  const teamSlider = document.querySelector(".s-team__slider");

  if (teamSlider) {
    const swiper = new Swiper(teamSlider, {
      speed: 900,
      spaceBetween: 20,
      slidesPerView: "auto",
      scrollbar: {
        el: ".s-team .slider-scrollbar",
        draggable: true,
      },
      breakpoints: {
        992: {
          spaceBetween: 20,
          slidesPerView: 4,
        },
        768: {
          spaceBetween: 20,
          slidesPerView: 3,
        },
      },
    });
  }
}
