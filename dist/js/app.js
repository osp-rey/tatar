(() => {
    "use strict";
    function audioPlayers() {
        class APlayer {
            constructor(selector) {
                this.player = null;
                this.src = "";
                this.audio = null;
                this._isPlaying = false;
                this._progress = 0;
                if (typeof selector === "string") this.player = document.querySelector(selector); else this.player = selector;
                if (this.player) {
                    this.src = this.player.dataset.src;
                    this.playBtn = this.player.querySelector(".a-player-btn");
                    this.progressbar = this.player.querySelector(".a-player-progressbar");
                    this.progressbarRange = this.progressbar.querySelector(".a-player-progressbar-range");
                    this.currentTimeHtml = this.player.querySelector(".a-player-time-current");
                    this.fullTimeHtml = this.player.querySelector(".a-player-time-full");
                    this.init();
                }
            }
            set isPlaying(value) {
                this._isPlaying = value;
                if (value) this.player.classList.add("_playing"); else this.player.classList.remove("_playing");
            }
            get isPlaying() {
                return this._isPlaying;
            }
            set progress(value) {
                this._progress = value;
                this.progressbar.style = `--progress: ${value}%`;
            }
            get progress() {
                return this._progress;
            }
            init() {
                this.createPlayer();
                this.playBtn.addEventListener("click", () => this.togglePlayer());
                this.audio.addEventListener("timeupdate", () => this.updateProgress());
                this.audio.addEventListener("ended", () => this.ended());
                this.audio.addEventListener("loadedmetadata", () => this.updateFullTime());
                this.audio.addEventListener("loadeddata", () => {
                    this.updateFullTime();
                });
                this.progressbarRange.addEventListener("change", e => this.changeAudio(e));
            }
            createPlayer() {
                this.audio = new Audio(this.src);
            }
            togglePlayer() {
                if (this.isPlaying) this.pause(); else this.play();
            }
            play() {
                this.isPlaying = true;
                this.audio.play();
            }
            pause() {
                this.isPlaying = false;
                this.audio.pause();
            }
            ended() {
                this.isPlaying = false;
                this.audio.currentTime = 0;
            }
            updateProgress() {
                const currentTime = this.audio.currentTime;
                const duration = this.audio.duration;
                this.progress = Math.round(currentTime / duration * 100);
                this.updateCurrentTime();
            }
            formatTime(seconds) {
                if (isNaN(seconds)) return "00:00";
                const minutes = Math.floor(seconds / 60);
                const remainingSeconds = Math.floor(seconds % 60);
                const formatMinutes = minutes.toString().padStart(2, "0");
                const formatSeconds = remainingSeconds.toString().padStart(2, "0");
                return `${formatMinutes}:${formatSeconds}`;
            }
            updateFullTime() {
                this.fullTimeHtml.textContent = this.formatTime(this.audio.duration);
            }
            updateCurrentTime() {
                this.currentTimeHtml.textContent = this.formatTime(this.audio.currentTime);
            }
            changeAudio(e) {
                const progressPercent = +e.target.value;
                const newTime = progressPercent / 100 * this.audio.duration;
                this.audio.currentTime = newTime;
            }
        }
        const players = document.querySelectorAll(".a-player");
        if (players.length) players.forEach(player => {
            new APlayer(player);
        });
    }
    function burger() {
        const burger = document.querySelector("#burger");
        if (burger) {
            const btnOpen = document.querySelector("#burger-open");
            const btnClose = document.querySelector("#burger-close");
            const burgerOverlay = document.querySelector("#burger-overlay");
            const navItems = burger.querySelectorAll(".burger__list a");
            navItems.forEach(item => {
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
            function updateHeightBurger() {
                burger.style.maxHeight = `${window.visualViewport.height}px`;
            }
            window.visualViewport.addEventListener("resize", updateHeightBurger);
            window.visualViewport.addEventListener("scroll", updateHeightBurger);
            updateHeightBurger();
        }
    }
    function headerScroll() {
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
                if (scrollTop > 0) header.classList.add("_scroll"); else header.classList.remove("_scroll");
            }
        }
    }
    function localNav() {
        const containers = document.querySelectorAll(".local-nav");
        if (containers.length) containers.forEach(container => {
            const buttons = container.querySelectorAll("a");
            buttons.forEach(btn => {
                btn.addEventListener("click", e => {
                    e.preventDefault();
                    const idSect = btn.getAttribute("href");
                    const sect = document.querySelector(idSect);
                    sect?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                        inline: "nearest"
                    });
                });
            });
        });
        const sections = document.querySelectorAll(".sect");
        if (sections.length) {
            const arrItems = [];
            if (containers.length) containers.forEach(container => {
                const items = Array.from(container.querySelectorAll("a"));
                items.forEach(i => arrItems.push(i));
            });
            const options = {
                root: null,
                rootMargin: "0px",
                scrollMargin: "0px",
                threshold: .01
            };
            sections.forEach(section => {
                const id = section.id;
                if (id) {
                    function callback(entries, observer) {
                        entries.forEach(entry => {
                            entry.target;
                            if (entry.isIntersecting) {
                                arrItems.forEach(i => i.classList.remove("_active"));
                                const currentItems = arrItems.filter(item => item.getAttribute("href") === `#${id}`);
                                if (currentItems.length) currentItems.forEach(i => i.classList.add("_active"));
                            }
                        });
                    }
                    const observer = new IntersectionObserver(callback, options);
                    observer.observe(section);
                }
            });
        }
    }
    function mediaAdaptive() {
        function DynamicAdapt(type) {
            this.type = type;
        }
        DynamicAdapt.prototype.init = function() {
            const _this = this;
            this.оbjects = [];
            this.daClassname = "_dynamic_adapt_";
            this.nodes = document.querySelectorAll("[data-da]");
            for (let i = 0; i < this.nodes.length; i++) {
                const node = this.nodes[i];
                const data = node.dataset.da.trim();
                const dataArray = data.split(",");
                const оbject = {};
                оbject.element = node;
                оbject.parent = node.parentNode;
                оbject.destination = document.querySelector(dataArray[0].trim());
                оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
                оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
                оbject.index = this.indexInParent(оbject.parent, оbject.element);
                this.оbjects.push(оbject);
            }
            this.arraySort(this.оbjects);
            this.mediaQueries = Array.prototype.map.call(this.оbjects, function(item) {
                return "(" + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
            }, this);
            this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function(item, index, self) {
                return Array.prototype.indexOf.call(self, item) === index;
            });
            for (let i = 0; i < this.mediaQueries.length; i++) {
                const media = this.mediaQueries[i];
                const mediaSplit = String.prototype.split.call(media, ",");
                const matchMedia = window.matchMedia(mediaSplit[0]);
                const mediaBreakpoint = mediaSplit[1];
                const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function(item) {
                    return item.breakpoint === mediaBreakpoint;
                });
                matchMedia.addListener(function() {
                    _this.mediaHandler(matchMedia, оbjectsFilter);
                });
                this.mediaHandler(matchMedia, оbjectsFilter);
            }
        };
        DynamicAdapt.prototype.mediaHandler = function(matchMedia, оbjects) {
            if (matchMedia.matches) for (let i = 0; i < оbjects.length; i++) {
                const оbject = оbjects[i];
                оbject.index = this.indexInParent(оbject.parent, оbject.element);
                this.moveTo(оbject.place, оbject.element, оbject.destination);
            } else for (let i = 0; i < оbjects.length; i++) {
                const оbject = оbjects[i];
                if (оbject.element.classList.contains(this.daClassname)) this.moveBack(оbject.parent, оbject.element, оbject.index);
            }
        };
        DynamicAdapt.prototype.moveTo = function(place, element, destination) {
            element.classList.add(this.daClassname);
            if (place === "last" || place >= destination.children.length) {
                destination.insertAdjacentElement("beforeend", element);
                return;
            }
            if (place === "first") {
                destination.insertAdjacentElement("afterbegin", element);
                return;
            }
            destination.children[place].insertAdjacentElement("beforebegin", element);
        };
        DynamicAdapt.prototype.moveBack = function(parent, element, index) {
            element.classList.remove(this.daClassname);
            if (parent.children[index] !== void 0) parent.children[index].insertAdjacentElement("beforebegin", element); else parent.insertAdjacentElement("beforeend", element);
        };
        DynamicAdapt.prototype.indexInParent = function(parent, element) {
            const array = Array.prototype.slice.call(parent.children);
            return Array.prototype.indexOf.call(array, element);
        };
        DynamicAdapt.prototype.arraySort = function(arr) {
            if (this.type === "min") Array.prototype.sort.call(arr, function(a, b) {
                if (a.breakpoint === b.breakpoint) {
                    if (a.place === b.place) return 0;
                    if (a.place === "first" || b.place === "last") return -1;
                    if (a.place === "last" || b.place === "first") return 1;
                    return a.place - b.place;
                }
                return a.breakpoint - b.breakpoint;
            }); else {
                Array.prototype.sort.call(arr, function(a, b) {
                    if (a.breakpoint === b.breakpoint) {
                        if (a.place === b.place) return 0;
                        if (a.place === "first" || b.place === "last") return 1;
                        if (a.place === "last" || b.place === "first") return -1;
                        return b.place - a.place;
                    }
                    return b.breakpoint - a.breakpoint;
                });
                return;
            }
        };
        const da = new DynamicAdapt("max");
        da.init();
    }
    function sectScroll() {
        const sections = document.querySelectorAll(".sect");
        if (sections.length) {
            let currentSection = 0;
            let isScrolling = false;
            function updateActiveSection(index) {
                sections.forEach((section, i) => {
                    if (i === index) section.classList.add("active"); else section.classList.remove("active");
                });
            }
            function scrollToSection(index) {
                if (isScrolling) return;
                if (index < 0 || index >= sections.length) return;
                isScrolling = true;
                currentSection = index;
                gsap.to(window, {
                    duration: .8,
                    scrollTo: {
                        y: sections[index],
                        offsetY: 0
                    },
                    ease: "power2.inOut",
                    onComplete: () => {
                        setTimeout(() => {
                            isScrolling = false;
                        }, 100);
                    }
                });
                updateActiveSection(index);
            }
            function detectCurrentSection() {
                if (isScrolling) return;
                const scrollPosition = window.scrollY;
                const windowHeight = window.innerHeight;
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
                    gsap.fromTo(sections[currentSection].querySelector(".content"), {
                        scale: .95,
                        opacity: .5
                    }, {
                        duration: .5,
                        scale: 1,
                        opacity: 1,
                        ease: "back.out(0.3)"
                    });
                }
            }
            function handleWheel(e) {
                if (isScrolling) {
                    e.preventDefault();
                    return;
                }
                const delta = e.deltaY;
                let newSection = currentSection;
                if (delta > 0 && currentSection < sections.length - 1) newSection = currentSection + 1; else if (delta < 0 && currentSection > 0) newSection = currentSection - 1; else return;
                e.preventDefault();
                scrollToSection(newSection);
            }
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
            function init() {
                updateActiveSection(0);
                window.addEventListener("wheel", handleWheel, {
                    passive: false
                });
                window.addEventListener("keydown", handleKeydown);
                window.addEventListener("scroll", debounce(detectCurrentSection, 100));
                gsap.fromTo(sections[0].querySelector(".content"), {
                    y: 50,
                    opacity: 0
                }, {
                    duration: 1,
                    y: 0,
                    opacity: 1,
                    ease: "back.out(0.5)"
                });
                setTimeout(() => {
                    detectCurrentSection();
                }, 100);
            }
            window.addEventListener("load", init);
            if ("ontouchstart" in window) {
                window.removeEventListener("wheel", handleWheel);
                const style = document.createElement("style");
                style.textContent = `\n                  .section {\n                      scroll-snap-align: start;\n                  }\n                  body {\n                      scroll-snap-type: y mandatory;\n                      overflow-y: scroll;\n                      height: 100vh;\n                  }\n                  .nav-dots, .scroll-hint {\n                      display: none;\n                  }\n              `;
                document.head.appendChild(style);
            }
        }
    }
    function sliders() {
        const teamSlider = document.querySelector(".s-team__slider");
        if (teamSlider) {
            new Swiper(teamSlider, {
                speed: 900,
                spaceBetween: 15,
                slidesPerView: 1,
                scrollbar: {
                    el: ".s-team .slider-scrollbar",
                    draggable: true
                },
                autoplay: {
                    delay: 5e3
                },
                breakpoints: {
                    992: {
                        spaceBetween: 20,
                        slidesPerView: 4
                    },
                    768: {
                        spaceBetween: 20,
                        slidesPerView: 3
                    },
                    420: {
                        spaceBetween: 15,
                        slidesPerView: 2
                    }
                }
            });
        }
        const contactsSlider = document.querySelector(".s-contacts__slider");
        if (contactsSlider) {
            new Swiper(contactsSlider, {
                speed: 900,
                slidesPerView: "auto",
                spaceBetween: 15,
                autoplay: {
                    delay: 4e3
                },
                breakpoints: {
                    768: {
                        spaceBetween: 20,
                        slidesPerView: "auto"
                    }
                }
            });
        }
        const gallerySliders = document.querySelectorAll(".s-gallery__slider");
        if (gallerySliders.length) gallerySliders.forEach(slider => {
            new Swiper(slider, {
                speed: 900,
                slidesPerView: 1,
                spaceBetween: 15,
                autoplay: {
                    delay: 4500
                },
                navigation: {
                    prevEl: slider.querySelector(".slider-arrow._prev"),
                    nextEl: slider.querySelector(".slider-arrow._next")
                },
                breakpoints: {
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 20
                    },
                    576: {
                        slidesPerView: 2,
                        spaceBetween: 15
                    }
                }
            });
        });
    }
    function sortTours() {
        const sortButtons = document.querySelectorAll(".s-tours .sort-btn");
        if (sortButtons.length) {
            const items = Array.from(document.querySelectorAll(".s-tours__item"));
            const btnMore = document.querySelector(".s-tours__btn-more");
            const toursGrid = document.querySelector(".s-tours__grid");
            function sortByCity() {
                items.sort((a, b) => {
                    const cityA = a.getAttribute("data-city");
                    const cityB = b.getAttribute("data-city");
                    return cityA.localeCompare(cityB, "ru");
                });
                items.forEach(item => redrawing(item));
            }
            function sortByDate() {
                items.sort((a, b) => {
                    const dateA = parseDate(a.getAttribute("data-date"));
                    const dateB = parseDate(b.getAttribute("data-date"));
                    return dateA - dateB;
                });
                items.forEach(item => redrawing(item));
            }
            function parseDate(dateString) {
                const [day, month, year] = dateString.split(".");
                return new Date(year, month - 1, day);
            }
            function setActiveSort(activeButton) {
                sortButtons.forEach(btn => {
                    btn.classList.remove("_active");
                });
                activeButton.classList.add("_active");
            }
            sortButtons.forEach(button => {
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
            function initSort() {
                sortByCity();
                const cityButton = Array.from(sortButtons).find(btn => btn.dataset.sortType === "city");
                if (cityButton) cityButton.classList.add("_active");
            }
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
                items.forEach(item => {
                    item.style.display = "block";
                });
                btnMore.remove();
            });
            initSort();
        }
    }
    function tab() {
        const buttons = document.querySelectorAll("[data-tab-btn]");
        if (buttons.length) buttons.forEach(btn => {
            btn.addEventListener("click", () => {
                const container = btn.closest(".tabs");
                const tabId = btn.dataset.tabBtn;
                const allButtons = container.querySelector(".tabs-nav").querySelectorAll("[data-tab-btn]");
                const allTabs = Array.from(container.querySelector(".tabs-content").children).filter(child => child.hasAttribute("data-tab"));
                const currentTab = container.querySelector(`[data-tab="${tabId}"]`);
                allTabs.forEach(t => {
                    t.classList.remove("_show");
                    t.classList.remove("_active");
                });
                currentTab.classList.add("_active");
                setTimeout(() => {
                    currentTab.classList.add("_show");
                }, 150);
                allButtons.forEach(b => b.classList.remove("_active"));
                btn.classList.add("_active");
            });
        });
    }
    function teamAudio() {
        const buttons = document.querySelectorAll(".card-team__btn");
        if (buttons.length) {
            let audio = null;
            let currentButton = null;
            buttons.forEach(btn => {
                btn.addEventListener("click", () => {
                    if (currentButton !== btn) {
                        if (audio) {
                            audio.currentTime = 0;
                            audio.pause();
                            audio = null;
                        }
                        audio = new Audio(btn.dataset.audioUrl);
                        currentButton?.classList.remove("_active");
                        currentButton = btn;
                    }
                    if (btn.classList.contains("_active")) {
                        btn.classList.remove("_active");
                        audio.pause();
                    } else {
                        btn.classList.add("_active");
                        audio.play();
                    }
                    audio.addEventListener("ended", () => {
                        audio.currentTime = 0;
                        audio.pause();
                        audio = null;
                        currentButton.classList.remove("_active");
                        currentButton = null;
                    });
                });
            });
        }
    }
    document.addEventListener("DOMContentLoaded", () => {
        burger();
        tab();
        audioPlayers();
        sliders();
        headerScroll();
        sectScroll();
        teamAudio();
        sortTours();
        localNav();
        mediaAdaptive();
        Fancybox.bind("[data-fancybox]");
    });
})();