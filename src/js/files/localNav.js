export default function localNav() {
  const containers = document.querySelectorAll(".local-nav");

  if (containers.length) {
    containers.forEach((container) => {
      const buttons = container.querySelectorAll("a");

      buttons.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          e.preventDefault();
          const idSect = btn.getAttribute("href");
          const sect = document.querySelector(idSect);

          sect?.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest",
          });
        });
      });
    });
  }

  const sections = document.querySelectorAll(".sect");

  if (sections.length) {
    const arrItems = [];

    if (containers.length) {
      containers.forEach(container => {
        const items = Array.from(container.querySelectorAll("a"));
        items.forEach(i => arrItems.push(i));
      })
    }

    const options = {
      root: null,
      rootMargin: "0px",
      scrollMargin: "0px",
      threshold: 0.01,
    };
    sections.forEach((section) => {
      const id = section.id;

      if (id) {
        function callback(entries, observer) {
          entries.forEach((entry) => {
            const target = entry.target;

            if (entry.isIntersecting) {
              arrItems.forEach(i => i.classList.remove("_active"))
              const currentItems = arrItems.filter(item => item.getAttribute("href") === `#${id}`);
              console.log(section)

              if (currentItems.length) {
                currentItems.forEach((i) => i.classList.add("_active"));
              }

              observer.unobserve(target);
            }
          });
        }

        const observer = new IntersectionObserver(callback, options);

        observer.observe(section);
      }
    });
  }
}
