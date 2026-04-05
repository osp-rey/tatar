export default function burger() {
  const burger = document.querySelector("#burger");

  if (burger) {
    const btnOpen = document.querySelector("#burger-open");
    const btnClose = document.querySelector("#burger-close");
    const burgerOverlay = document.querySelector("#burger-overlay");
    const navItems = burger.querySelectorAll(".burger__list a");

    navItems.forEach((item) => {
      item.addEventListener("click", handleClose);
    });

    burgerOverlay.addEventListener("click", handleClose);

    btnOpen.addEventListener("click", handleOpen);

    btnClose.addEventListener("click", handleClose);

    function handleOpen() {
      document.body.classList.add("body-hidden");
      burger.classList.add("_open");
      burgerOverlay.classList.add("_active");
    }
    function handleClose() {
      document.body.classList.remove("body-hidden");
      burger.classList.remove("_open");
      burgerOverlay.classList.remove("_active");
    }
  }
}
