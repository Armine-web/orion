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
  }
);

elements.forEach((el) => observer.observe(el));