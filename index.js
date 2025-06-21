document.addEventListener("DOMContentLoaded", function () {
  const video = document.getElementById("onceVideo");
  const content = document.querySelector(".site-content");

  window.addEventListener("load", () => {
    setTimeout(() => {
      const img = document.querySelector(".img_sec");
      img.classList.add("visible");
    }, 2000); 
  });


  Promise.all([
    new Promise((resolve) => video.addEventListener("ended", resolve)),
    new Promise((resolve) => window.addEventListener("load", resolve)),
  ]).then(() => {
    content.classList.add("visible");
    document.body.style.overflow = "auto";
  });

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;

    document.querySelectorAll(".parallax").forEach((el) => {
      const speed = parseFloat(el.dataset.speed) || 0.3;

      // Устанавливаем индивидуальный угол поворота по классу
      let rotateDeg = 0;
      if (el.classList.contains("img_first")) {
        rotateDeg = 120;
      } else if (el.classList.contains("img_sec")) {
        rotateDeg = -80;
      } else if (el.classList.contains("image_flower")) {
        rotateDeg = -10;
      } else if (el.classList.contains("rose")) {
        rotateDeg = -45;
      } else if (el.classList.contains("flower_3")) {
        rotateDeg = -90;
      } else if (el.classList.contains("owner_img")) {
        rotateDeg = -150;
      }

      el.style.transform = `translateY(${
        scrollY * speed
      }px) rotate(${rotateDeg}deg)`;
    });
  });

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
    button.textContent = "||";
  };

  button.addEventListener("click", () => {
    if (isPlaying) {
      music.pause();
      button.textContent = "▶︎";
    } else {
      music.play();
      button.textContent = "||";
    }
    isPlaying = !isPlaying;
  });

  const initPlayOnce = () => {
    startMusic();
    document.removeEventListener("click", initPlayOnce);
  };

  document.addEventListener("click", initPlayOnce);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  });

  const elements = document.querySelectorAll(".timer_wrapper, .countdown");

  elements.forEach((el) => {
    observer.observe(el);
  });
});
