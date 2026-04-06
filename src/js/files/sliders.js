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
      autoplay: {
        delay: 5000
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

  const contactsSlider = document.querySelector(".s-contacts__slider");

  if (contactsSlider) {
    const swiper = new Swiper(contactsSlider, {
      speed: 900,
      slidesPerView: "auto",
      spaceBetween: 30,
      autoplay: {
        delay: 4000
      }
    })
  }
}


