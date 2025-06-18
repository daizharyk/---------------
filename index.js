document.addEventListener("DOMContentLoaded", function () {
  // Счётчик
  function updateCountdown() {
    const now = new Date();
    const targetDate = new Date("2025-08-16T00:00:00");
    const diff = targetDate - now;

    if (diff <= 0) {
      document.querySelector(".countdown").innerHTML = "Той басталды!";
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;
  }

  setInterval(updateCountdown, 1000);
  updateCountdown();

  const music = document.getElementById("bgMusic");
  const button = document.getElementById("musicToggle");
  const label = document.querySelector(".music-label");

  let isPlaying = false;

  const startMusic = () => {
    music.play();
    isPlaying = true;
    button.textContent = "⏸";
  };

  button.addEventListener("click", () => {
    if (isPlaying) {
      music.pause();
      button.textContent = "▶";
    } else {
      music.play();
      button.textContent = "⏸";
    }
    isPlaying = !isPlaying;
  });

  const initPlayOnce = () => {
    startMusic();
    document.removeEventListener("click", initPlayOnce);
  };

  document.addEventListener("click", initPlayOnce);
});
