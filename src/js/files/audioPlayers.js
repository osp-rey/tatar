export default function audioPlayers() {
  class APlayer {
    constructor(selector) {
      this.player = null;
      this.src = "";
      this.audio = null;
      this._isPlaying = false;
      this._progress = 0;

      if (typeof selector === "string") {
        this.player = document.querySelector(selector);
      } else {
        this.player = selector;
      }
      if (this.player) {
        this.src = this.player.dataset.src;
        this.playBtn = this.player.querySelector(".a-player-btn");
        this.progressbar = this.player.querySelector(".a-player-progressbar");
        this.progressbarRange = this.progressbar.querySelector(
          ".a-player-progressbar-range",
        );
        this.currentTimeHtml = this.player.querySelector(
          ".a-player-time-current",
        );
        this.fullTimeHtml = this.player.querySelector(".a-player-time-full");

        this.init();
      }
    }

    set isPlaying(value) {
      this._isPlaying = value;
      if (value) {
        this.player.classList.add("_playing");
      } else {
        this.player.classList.remove("_playing");
      }
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
      this.audio.addEventListener("loadedmetadata", () =>
        this.updateFullTime(),
      );
      this.audio.addEventListener("loadeddata", () => {
        this.updateFullTime();
      });
      this.progressbarRange.addEventListener("change", (e) =>
        this.changeAudio(e),
      );
    }

    createPlayer() {
      this.audio = new Audio(this.src);
    }

    togglePlayer() {
      if (this.isPlaying) {
        this.pause();
      } else {
        this.play();
      }
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
      this.progress = Math.round((currentTime / duration) * 100);

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
      this.currentTimeHtml.textContent = this.formatTime(
        this.audio.currentTime,
      );
    }
    changeAudio(e) {
      const progressPercent = +e.target.value;

      const newTime = (progressPercent / 100) * this.audio.duration;
      this.audio.currentTime = newTime;
    }
  }

  const players = document.querySelectorAll(".a-player");

  if (players.length) {
    players.forEach((player) => {
      const aPlayer = new APlayer(player);
    });
  }
}
