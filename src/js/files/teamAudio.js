export default function teamAudio() {
  const buttons = document.querySelectorAll(".card-team__btn");

  if (buttons.length) {
    let audio = null;
    let currentButton = null;
    buttons.forEach((btn) => {
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
