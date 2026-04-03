import "../scss/style.scss";
import audioPlayers from "./files/audioPlayers.js";
import burger from "./files/burger.js";
import tab from "./files/tab.js";

document.addEventListener("DOMContentLoaded", () => {
  burger();
  tab();
  audioPlayers();
});
