import "../scss/style.scss";
import audioPlayers from "./files/audioPlayers.js";
import burger from "./files/burger.js";
import headerScroll from "./files/headerScroll.js";
import sectNav from "./files/sectNav.js";
import { sectScroll } from "./files/sectScroll.js";
import sliders from "./files/sliders.js";
import sortTours from "./files/sortTours.js";
import tab from "./files/tab.js";
import teamAudio from "./files/teamAudio.js";

document.addEventListener("DOMContentLoaded", () => {
  burger();
  tab();
  audioPlayers();
  sliders();
  headerScroll();
  sectScroll();
  sectNav();
  teamAudio();
  sortTours();

  Fancybox.bind("[data-fancybox]");
});
