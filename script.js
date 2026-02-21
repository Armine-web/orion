const sideLines = document.querySelectorAll(".sideLine");
const sideLinesContainer = document.querySelector(".side-lines");
const roomsSection = document.querySelector(".rooms");

function updateLines() {
  const vh = window.innerHeight;
  const scrollY = window.scrollY;

  if (!sideLinesContainer || !roomsSection) return;

  const roomsRect = roomsSection.getBoundingClientRect();
  const roomsTop = roomsRect.top + scrollY;
  const roomsHeight = roomsSection.offsetHeight;
  const roomsBottom = roomsTop + roomsHeight;

  const scrollStart = roomsTop - vh;
  const scrollEnd = roomsBottom;
  const scrollRange = scrollEnd - scrollStart;

  let progress = 0;
  if (scrollRange > 0) {
    progress = ((scrollY - scrollStart) / scrollRange) * 1.1;
  }

  progress = Math.max(0, Math.min(1, progress));

  if (scrollY >= scrollEnd) {
    progress = 1;
  }

  sideLines.forEach((line, index) => {
    const delay = index * 0.01;
    const lineProgress = Math.max(0, Math.min(1, progress - delay));

    const finalProgress = progress >= 1 ? 1 : lineProgress;

    line.style.transform = `scaleY(${finalProgress})`;
    line.style.opacity = finalProgress > 0 ? "1" : "0";
  });
}

window.addEventListener("scroll", updateLines);
window.addEventListener("resize", updateLines);

updateLines();

/////////////////
const elements = document.querySelectorAll(".animate");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  {
    threshold: 0.2,
  },
);

elements.forEach((el) => observer.observe(el));

////////////////////////////

function setLanguage(lang) {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const keys = el.getAttribute("data-i18n").split(".");
    let value = translations[lang];

    keys.forEach(k => {
      value = value?.[k];
    });

    if (value) {
      el.textContent = value;
    }
  });

  localStorage.setItem("lang", lang);
}

setLanguage(localStorage.getItem("lang") || "hy");

///////////////
const langElements = document.querySelectorAll(".lang-switcher .lang");

langElements.forEach(el => {
  el.addEventListener("click", () => {
    const lang = el.dataset.lang;

    langElements.forEach(el => el.classList.remove("active"));
    el.classList.add("active");

    setLanguage(lang);
  });
});

const savedLang = localStorage.getItem("lang") || "hy";
setLanguage(savedLang);

langElements.forEach(el => {
  if (el.dataset.lang === savedLang) el.classList.add("active");
});