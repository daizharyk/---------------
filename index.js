document.addEventListener("DOMContentLoaded", function () {
  window.addEventListener("pageshow", function (event) {
    if (event.persisted) {
      window.location.reload();
    }
  });

  const video = document.getElementById("onceVideo");
  const content = document.querySelector(".site-content");

  // Плавное появление изображения
  window.addEventListener("load", () => {
    const img = document.querySelector(".img_sec");
    if (img) {
      setTimeout(() => {
        img.classList.add("visible");
      }, 2000);
    }
  });

  Promise.all([
    new Promise((resolve) => video.addEventListener("ended", resolve)),
    new Promise((resolve) => window.addEventListener("load", resolve)),
  ]).then(() => {
    content.classList.add("visible");
    document.body.style.overflow = "auto";
  });

  // Parallax эффект при скролле
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;

    document.querySelectorAll(".parallax").forEach((el) => {
      if (!el) return;

      const speed = parseFloat(el.dataset.speed) || 0.3;
      let rotateDeg = 0;

      if (el.classList.contains("img_first")) rotateDeg = 120;
      else if (el.classList.contains("img_sec")) rotateDeg = -80;
      else if (el.classList.contains("image_flower")) rotateDeg = -10;
      else if (el.classList.contains("rose")) rotateDeg = -45;
      else if (el.classList.contains("flower_3")) rotateDeg = -90;
      else if (el.classList.contains("owner_img")) rotateDeg = -150;

      el.style.transform = `translateY(${
        scrollY * speed
      }px) rotate(${rotateDeg}deg)`;
    });
  });

  // Таймер
  function updateCountdown() {
    const countdownWrapper = document.querySelector(".countdown");
    if (!countdownWrapper) return;

    const now = new Date();
    const targetDate = new Date("2025-08-16T00:00:00");
    const diff = targetDate - now;

    if (diff <= 0) {
      countdownWrapper.innerHTML = "Той басталды!";
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    const el = (id) => document.getElementById(id);
    if (el("days")) el("days").textContent = days;
    if (el("hours")) el("hours").textContent = hours;
    if (el("minutes")) el("minutes").textContent = minutes;
    if (el("seconds")) el("seconds").textContent = seconds;
  }

  setInterval(updateCountdown, 1000);
  updateCountdown();

  // Музыка
  const music = document.getElementById("bgMusic");
  const button = document.getElementById("musicToggle");

  if (music && button) {
    let isPlaying = false;

    const startMusic = () => {
      music.play().catch(() => {}); // на случай авто-блокировки
      isPlaying = true;
      button.textContent = "||";
    };

    button.addEventListener("click", () => {
      if (isPlaying) {
        music.pause();
        button.textContent = "▶︎";
      } else {
        music.play().catch(() => {});
        button.textContent = "||";
      }
      isPlaying = !isPlaying;
    });

    const initPlayOnce = () => {
      startMusic();
      document.removeEventListener("click", initPlayOnce);
    };

    document.addEventListener("click", initPlayOnce);
  }

  // Появление таймера при скролле
  const elements = document.querySelectorAll(".timer_wrapper, .countdown");

  if (elements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    });

    elements.forEach((el) => {
      if (el) observer.observe(el);
    });
  }
});
