export default function sectNav() {
  const sectNav = document.querySelector(".sect-nav");

  if (sectNav) {
    const toggleBtn = document.querySelector(".sect-nav-toggle");

    toggleBtn.addEventListener("click", () => {
      if (sectNav.classList.contains("_active")) {
        sectNav.classList.remove("_active");
        toggleBtn.textContent = "Концерты";
      } else {
        sectNav.classList.add("_active");
        toggleBtn.textContent = "Закрыть";
      }
    });
  }
}
