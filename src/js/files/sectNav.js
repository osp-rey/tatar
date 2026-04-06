export default function sectNav() {
  const sectNav = document.querySelector(".sect-nav");

  if (sectNav) {
    const sectNavBody = sectNav.querySelector(".sect-nav__body");
    const toggleBtn = document.querySelector(".sect-nav-toggle");

    toggleBtn.addEventListener("click", () => {
      if (sectNav.classList.contains("_active")) {
        sectNav.classList.remove("_active");
        toggleBtn.textContent = "Концерты";

        setTimeout(() => {
          sectNavBody.style.display = "none";
        }, 300);
      } else {
        sectNav.classList.add("_active");
        sectNavBody.style.display = "block";
        toggleBtn.textContent = "Закрыть";
        
        setTimeout(() => {
        }, 300);
      }
    });
  }
}
