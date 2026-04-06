export default function sortTours() {
  const sortButtons = document.querySelectorAll(".s-tours .sort-btn");

  if (sortButtons.length) {
    const items = Array.from(document.querySelectorAll(".s-tours__item"));
    const btnMore = document.querySelector(".s-tours__btn-more");
    const toursGrid = document.querySelector(".s-tours__grid");

    // Функция сортировки по городам (алфавит)
    function sortByCity() {
      items.sort((a, b) => {
        const cityA = a.getAttribute("data-city");
        const cityB = b.getAttribute("data-city");
        return cityA.localeCompare(cityB, "ru");
      });

      // Перерисовываем элементы в новом порядке
      items.forEach((item) => redrawing(item));
    }

    // Функция сортировки по датам
    function sortByDate() {
      items.sort((a, b) => {
        const dateA = parseDate(a.getAttribute("data-date"));
        const dateB = parseDate(b.getAttribute("data-date"));
        return dateA - dateB;
      });

      // Перерисовываем элементы в новом порядке
      items.forEach((item) => redrawing(item));
    }

    // Вспомогательная функция для парсинга даты (DD.MM.YYYY)
    function parseDate(dateString) {
      const [day, month, year] = dateString.split(".");
      return new Date(year, month - 1, day);
    }

    // Функция обновления активного состояния кнопок
    function setActiveSort(activeButton) {
      sortButtons.forEach((btn) => {
        btn.classList.remove("_active");
      });
      activeButton.classList.add("_active");
    }

    // Обработчики событий для кнопок сортировки
    sortButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const sortType = button.dataset.sortType;

        if (sortType === "city") {
          sortByCity();
          setActiveSort(button);
        } else if (sortType === "date") {
          sortByDate();
          setActiveSort(button);
        }
      });
    });

    // Функция для изначальной сортировки (по умолчанию - по городам)
    function initSort() {
      sortByCity();
      const cityButton = Array.from(sortButtons).find(
        (btn) => btn.dataset.sortType === "city",
      );
      if (cityButton) {
        cityButton.classList.add("_active");
      }
    }

    // Функция плавной перерисовки
    function redrawing(item) {
      item.style.opacity = "0";
      item.style.transform = "translateY(-20px)";
      toursGrid.appendChild(item);

      setTimeout(() => {
        item.style.opacity = "1";
        item.style.transform = "translateY(0)";
      }, 200);
    }

    btnMore.addEventListener("click", () => {
      items.forEach((item) => {
        item.style.display = "block";
      });
      btnMore.remove();
    });

    initSort();
  }
}
