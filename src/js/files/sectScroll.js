export function sectScroll() {
  // Получаем все секции
  const sections = document.querySelectorAll(".sect");

  if (sections.length) {
    let currentSection = 0;
    let isScrolling = false;

    // Функция для обновления активной секции
    function updateActiveSection(index) {
      // Обновляем классы active для секций
      sections.forEach((section, i) => {
        if (i === index) {
          section.classList.add("active");
        } else {
          section.classList.remove("active");
        }
      });
    }

    // Функция для плавного скролла к секции
    function scrollToSection(index) {
      if (isScrolling) return;
      if (index < 0 || index >= sections.length) return;

      isScrolling = true;
      currentSection = index;

      // Используем GSAP ScrollToPlugin для плавной анимации
      gsap.to(window, {
        duration: 0.8,
        scrollTo: {
          y: sections[index],
          offsetY: 0,
        },
        ease: "power2.inOut",
        onComplete: () => {
          setTimeout(() => {
            isScrolling = false;
          }, 100);
        },
      });

      updateActiveSection(index);
    }

    // Функция для определения текущей секции при скролле
    function detectCurrentSection() {
      if (isScrolling) return;

      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;

      // Определяем, какая секция сейчас в центре экрана
      let newIndex = 0;
      for (let i = 0; i < sections.length; i++) {
        const sectionTop = sections[i].offsetTop;
        const sectionBottom = sectionTop + sections[i].offsetHeight;
        const centerPosition = scrollPosition + windowHeight / 2;

        if (centerPosition >= sectionTop && centerPosition <= sectionBottom) {
          newIndex = i;
          break;
        }
      }

      if (newIndex !== currentSection) {
        currentSection = newIndex;
        updateActiveSection(currentSection);

        // Небольшая анимация для контента
        gsap.fromTo(
          sections[currentSection].querySelector(".content"),
          { scale: 0.95, opacity: 0.5 },
          { duration: 0.5, scale: 1, opacity: 1, ease: "back.out(0.3)" },
        );
      }
    }

    // Обработчик колесика мыши
    function handleWheel(e) {
      if (isScrolling) {
        e.preventDefault();
        return;
      }

      const delta = e.deltaY;
      let newSection = currentSection;

      if (delta > 0 && currentSection < sections.length - 1) {
        // Скролл вниз
        newSection = currentSection + 1;
      } else if (delta < 0 && currentSection > 0) {
        // Скролл вверх
        newSection = currentSection - 1;
      } else {
        return;
      }

      e.preventDefault();
      scrollToSection(newSection);
    }

    // Обработчик клавиш (стрелки вверх/вниз)
    function handleKeydown(e) {
      if (isScrolling) return;

      if (e.key === "ArrowDown" && currentSection < sections.length - 1) {
        e.preventDefault();
        scrollToSection(currentSection + 1);
      } else if (e.key === "ArrowUp" && currentSection > 0) {
        e.preventDefault();
        scrollToSection(currentSection - 1);
      }
    }

    // Функция для предотвращения накопления событий скролла
    function debounce(func, wait) {
      let timeout;
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    }

    // Инициализация
    function init() {
      // Активируем первую секцию
      updateActiveSection(0);

      // Добавляем обработчики событий
      window.addEventListener("wheel", handleWheel, { passive: false });
      window.addEventListener("keydown", handleKeydown);
      window.addEventListener("scroll", debounce(detectCurrentSection, 100));

      // Добавляем анимацию при загрузке для первой секции
      gsap.fromTo(
        sections[0].querySelector(".content"),
        { y: 50, opacity: 0 },
        { duration: 1, y: 0, opacity: 1, ease: "back.out(0.5)" },
      );

      // Предотвращаем стандартный скролл только когда используем нашу навигацию
      // Но позволяем пользователю скроллить мышкой для определения секции
      setTimeout(() => {
        detectCurrentSection();
      }, 100);
    }

    // Запускаем инициализацию после полной загрузки страницы
    window.addEventListener("load", init);

    // Для мобильных устройств: отключаем нашу кастомную навигацию,
    // так как на мобильных лучше использовать стандартный скролл
    if ("ontouchstart" in window) {
      window.removeEventListener("wheel", handleWheel);
      const style = document.createElement("style");
      style.textContent = `
                  .section {
                      scroll-snap-align: start;
                  }
                  body {
                      scroll-snap-type: y mandatory;
                      overflow-y: scroll;
                      height: 100vh;
                  }
                  .nav-dots, .scroll-hint {
                      display: none;
                  }
              `;
      document.head.appendChild(style);
    }
  }
}
