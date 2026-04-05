export default function headerScroll() {
  const header = document.querySelector(".header");

  if (header) {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    let lastScrollTop = 0;
    handlerScroll();

    window.addEventListener("scroll", () => {
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      handlerScroll();

      lastScrollTop = scrollTop;
    });

    function handlerScroll() {
      if (scrollTop > 0) {
        header.classList.add("_scroll");
      } else {
        header.classList.remove("_scroll");
      }
    }
  }
}
