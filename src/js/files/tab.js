export default function tab() {
  const buttons = document.querySelectorAll("[data-tab-btn]");

  if (buttons.length) {
    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const container = btn.closest(".tabs");
        const tabId = btn.dataset.tabBtn;
        const allButtons = container
          .querySelector(".tabs-nav")
          .querySelectorAll("[data-tab-btn]");
        const allTabs = Array.from(
          container.querySelector(".tabs-content").children,
        ).filter((child) => child.hasAttribute("data-tab"));

        const currentTab = container.querySelector(`[data-tab="${tabId}"]`);

        allTabs.forEach((t) => {
          t.classList.remove("_show");
          t.classList.remove("_active");
        });

        currentTab.classList.add("_active");
        setTimeout(() => {
          currentTab.classList.add("_show");
        }, 150);

        allButtons.forEach((b) => b.classList.remove("_active"));
        btn.classList.add("_active");
      });
    });
  }
}
